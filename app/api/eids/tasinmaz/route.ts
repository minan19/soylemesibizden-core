import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { z } from 'zod';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { getEids } from '@/lib/eids';
import { checkRateLimit } from '@/lib/ratelimit';

export const dynamic = 'force-dynamic';

/**
 * POST /api/eids/tasinmaz · 14.08.2026 (TRT)
 *
 * Ilan verme akisinin BIRINCI adimi: tasinmaz numarasindan tapu
 * bilgisini ve ilan verme yetkisini sorgular.
 *
 * Bu uc nokta yalnizca ON GOSTERIM icindir. Donen "yetkili: true"
 * bilgisi ilan olusturmak icin YETERLI DEGILDIR — POST /api/ilanlar
 * yetkiyi kendi icinde YENIDEN sorgular. Istemciden gelen hicbir
 * yetki iddiasina guvenilmez.
 */

const govde = z.object({
  tasinmazNo: z
    .string()
    .trim()
    .regex(/^\d{6,}$/, 'Taşınmaz numarası en az 6 haneli olmalıdır.'),
});

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Oturum gereklidir.' }, { status: 401 });
    }

    const kullaniciId = (session.user as { id?: string }).id;
    if (!kullaniciId) {
      return NextResponse.json({ error: 'Oturum geçersiz.' }, { status: 401 });
    }

    // Tapu sorgusu maliyetli ve kotali bir dis servistir.
    const rl = await checkRateLimit(`eids:${kullaniciId}`, { limit: 20, window: '1 m' });
    if (!rl.success) {
      return NextResponse.json(
        { error: 'Çok fazla sorgu. Lütfen bir dakika bekleyin.' },
        { status: 429 }
      );
    }

    const ayristirilan = govde.safeParse(await request.json());
    if (!ayristirilan.success) {
      return NextResponse.json(
        { error: ayristirilan.error.issues[0].message },
        { status: 400 }
      );
    }
    const { tasinmazNo } = ayristirilan.data;

    const kullanici = await prisma.kullanici.findUnique({
      where: { id: kullaniciId },
      select: { eidsKullaniciKodu: true, kimlikDogrulandi: true },
    });

    if (!kullanici?.eidsKullaniciKodu) {
      return NextResponse.json(
        {
          error: 'EİDS kimlik doğrulaması yapılmamış.',
          detay:
            'İlan verebilmek için önce e-Devlet üzerinden kimlik doğrulaması yapılmalıdır.',
        },
        { status: 403 }
      );
    }

    const eids = getEids();

    // 1. Tapu bilgisi
    const tapu = await eids.tasinmazSorgula(tasinmazNo);
    if (!tapu.bulundu) {
      return NextResponse.json(
        { bulundu: false, error: 'Bu taşınmaz numarası bulunamadı.' },
        { status: 404 }
      );
    }

    // 2. Mukerrer kontrolu — bir tasinmaz = bir kart.
    //    Ayni tasinmaz icin YAYINDA ilan varsa yenisi acilamaz.
    const mevcutIlan = await prisma.ilan.findFirst({
      where: {
        tasinmaz: { tasinmazNo },
        durumu: { in: ['YAYINDA', 'MODERASYONDA', 'TEYIT_BEKLIYOR'] },
      },
      select: { id: true },
    });

    // 3. Yetki sorgusu
    const yetki = await eids.yetkiSorgula({
      eidsKullaniciKodu: kullanici.eidsKullaniciKodu,
      tasinmazNo,
    });

    return NextResponse.json({
      bulundu: true,
      tapu: {
        tasinmazNo: tapu.tasinmazNo,
        ada: tapu.ada,
        parsel: tapu.parsel,
        ilKodu: tapu.ilKodu,
        ilceAd: tapu.ilceAd,
        mahalleAd: tapu.mahalleAd,
        brutM2: tapu.brutM2,
      },
      yetki: {
        yetkili: yetki.yetkili,
        turu: yetki.turu ?? null,
        redSebebi: yetki.redSebebi ?? null,
        bitis: yetki.bitis ?? null,
      },
      // Kaynak her zaman aciktir; arayuz MOCK ise etiketlemek ZORUNDA.
      kaynak: yetki.kaynak,
      mukerrer: Boolean(mevcutIlan),
    });
  } catch (error) {
    console.error('[eids/tasinmaz]', error);
    // EIDS erisilemiyorsa uydurma cevap DONMEZ.
    return NextResponse.json(
      { error: 'EİDS sorgusu yapılamadı. Lütfen daha sonra tekrar deneyin.' },
      { status: 502 }
    );
  }
}
