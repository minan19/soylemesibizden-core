import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { z } from 'zod';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { getEids } from '@/lib/eids';
import { checkRateLimit } from '@/lib/ratelimit';

export const dynamic = 'force-dynamic';

/**
 * POST /api/ilanlar · 14.08.2026 (TRT)
 *
 * ILAN OLUSTURMA — EIDS KAPISI BURADA.
 *
 * Kritik guvenlik ilkesi: istemciden gelen "yetkim var" iddiasina
 * ASLA guvenilmez. /api/eids/tasinmaz on gosterim icindir; burada
 * yetki SIFIRDAN yeniden sorgulanir ve kayit o sorgunun sonucuyla
 * olusturulur.
 *
 * Ilan TASLAK olarak acilir. Yayina alma ayri bir adimdir; mock
 * kaynakli yetkiyle production'da yayina alinamaz (lib/eids zaten
 * production'da mock saglayiciyi reddediyor).
 */

const govde = z.object({
  tasinmazNo: z.string().trim().regex(/^\d{6,}$/, 'Geçersiz taşınmaz numarası.'),
  turu: z.enum(['SATILIK', 'KIRALIK']),
  tipi: z.enum(['KONUT', 'ISYERI', 'ARSA', 'BINA', 'DEVREMULK']),
  baslik: z.string().trim().min(10, 'Başlık en az 10 karakter olmalı.').max(160),
  aciklama: z.string().trim().max(4000).optional(),

  // PARA: istemci LIRA gonderir, sunucu KURUSA cevirir (CC #6).
  // Kesirli lira kabul edilmez — yuvarlama belirsizligi olusmasin.
  fiyatLira: z.number().int('Fiyat tam sayı TL olmalı.').positive().max(50_000_000_000),

  odaSayisi: z.string().trim().max(10).optional(),
  binaYasi: z.number().int().min(0).max(200).optional(),
  kat: z.number().int().min(-5).max(100).optional(),
  esyali: z.boolean().default(false),
  netM2: z.number().int().positive().max(100_000).optional(),
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

    const rl = await checkRateLimit(`ilan-olustur:${kullaniciId}`, {
      limit: 10,
      window: '10 m',
    });
    if (!rl.success) {
      return NextResponse.json(
        { error: 'Çok fazla ilan denemesi. Lütfen sonra tekrar deneyin.' },
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
    const g = ayristirilan.data;

    const kullanici = await prisma.kullanici.findUnique({
      where: { id: kullaniciId },
      select: { id: true, eidsKullaniciKodu: true, rol: true, ofisId: true },
    });
    if (!kullanici?.eidsKullaniciKodu) {
      return NextResponse.json(
        { error: 'EİDS kimlik doğrulaması yapılmamış.' },
        { status: 403 }
      );
    }

    const eids = getEids();

    // ── KAPI 1: tapu kaydi gercekten var mi ──────────────────────
    const tapu = await eids.tasinmazSorgula(g.tasinmazNo);
    if (!tapu.bulundu || !tapu.ilKodu || !tapu.ilceAd || !tapu.mahalleAd) {
      return NextResponse.json(
        { error: 'Bu taşınmaz numarası EİDS kayıtlarında bulunamadı.' },
        { status: 404 }
      );
    }

    // ── KAPI 2: yetki — istemciden gelene bakilmaz, yeniden sorulur ──
    const yetki = await eids.yetkiSorgula({
      eidsKullaniciKodu: kullanici.eidsKullaniciKodu,
      tasinmazNo: g.tasinmazNo,
    });
    if (!yetki.yetkili) {
      return NextResponse.json(
        {
          error: 'Bu taşınmaz için ilan verme yetkiniz bulunmuyor.',
          detay: yetki.redSebebi ?? undefined,
        },
        { status: 403 }
      );
    }

    // ── KAPI 3: mukerrer ilan — bir tasinmaz = bir kart ───────────
    const mevcut = await prisma.ilan.findFirst({
      where: {
        tasinmaz: { tasinmazNo: g.tasinmazNo },
        durumu: { in: ['YAYINDA', 'MODERASYONDA', 'TEYIT_BEKLIYOR'] },
      },
      select: { id: true },
    });
    if (mevcut) {
      return NextResponse.json(
        {
          error: 'Bu taşınmaz için zaten yayında bir ilan var.',
          detay:
            'Bir taşınmaz numarası için aynı anda tek ilan bulunabilir. Mevcut ilana ofis olarak eklenebilirsiniz.',
          mevcutIlanId: mevcut.id,
        },
        { status: 409 }
      );
    }

    const fiyatKurus = BigInt(g.fiyatLira) * 100n;

    // Tek islem: mahalle + tasinmaz + yetki + ilan + ilk fiyat kaydi.
    // Yarim kalmis kayit olusmasin.
    const ilan = await prisma.$transaction(async (tx) => {
      const mahalle = await tx.mahalle.upsert({
        where: {
          ilKodu_ilceAd_mahalleAd: {
            ilKodu: tapu.ilKodu!,
            ilceAd: tapu.ilceAd!,
            mahalleAd: tapu.mahalleAd!,
          },
        },
        update: {},
        create: {
          ilKodu: tapu.ilKodu!,
          ilAd: String(tapu.ilKodu),
          ilceAd: tapu.ilceAd!,
          mahalleAd: tapu.mahalleAd!,
        },
      });

      const tasinmaz = await tx.tasinmaz.upsert({
        where: { tasinmazNo: g.tasinmazNo },
        update: {
          ada: tapu.ada,
          parsel: tapu.parsel,
          brutM2: tapu.brutM2,
          ...(g.netM2 ? { netM2: g.netM2 } : {}),
        },
        create: {
          tasinmazNo: g.tasinmazNo,
          tipi: g.tipi,
          ada: tapu.ada,
          parsel: tapu.parsel,
          mahalleId: mahalle.id,
          brutM2: tapu.brutM2,
          netM2: g.netM2,
        },
      });

      const yetkiKaydi = await tx.eidsYetki.create({
        data: {
          tasinmazId: tasinmaz.id,
          turu: yetki.turu ?? 'MALIK',
          durumu: 'GECERLI',
          eidsKullaniciKodu: kullanici.eidsKullaniciKodu!,
          eidsReferansNo: yetki.referansNo,
          baslangic: yetki.baslangic ?? new Date(),
          bitis: yetki.bitis ?? new Date(Date.now() + 90 * 86_400_000),
          // Kaynak EIDS'ten ne dondiyse o. Elle GERCEK yazilmaz.
          kaynak: yetki.kaynak,
        },
      });

      // Canlilik teyidi: yetki bitisi ile 30 gun sonrasindan hangisi
      // once geliyorsa teyit son tarihi odur.
      const otuzGun = new Date(Date.now() + 30 * 86_400_000);
      const yetkiBitis = yetki.bitis ?? otuzGun;
      const teyitSonTarih = yetkiBitis < otuzGun ? yetkiBitis : otuzGun;

      const yeniIlan = await tx.ilan.create({
        data: {
          tasinmazId: tasinmaz.id,
          yetkiId: yetkiKaydi.id,
          sahibiId: kullanici.id,
          ofisId: kullanici.ofisId,
          turu: g.turu,
          durumu: 'TASLAK', // yayina alma ayri adim
          baslik: g.baslik,
          aciklama: g.aciklama,
          fiyatKurus,
          odaSayisi: g.odaSayisi,
          binaYasi: g.binaYasi,
          kat: g.kat,
          esyali: g.esyali,
          teyitSonTarih,
        },
        select: { id: true, durumu: true, baslik: true },
      });

      // Fiyat gecmisi ilk gunden baslar; sonradan geriye doldurulamaz.
      await tx.fiyatGecmisi.create({
        data: {
          ilanId: yeniIlan.id,
          eskiFiyatKurus: null,
          yeniFiyatKurus: fiyatKurus,
        },
      });

      return yeniIlan;
    });

    return NextResponse.json(
      {
        ...ilan,
        yetkiKaynagi: yetki.kaynak,
        uyari:
          yetki.kaynak === 'MOCK'
            ? 'Bu yetki MOCK sağlayıcıdan üretilmiştir. İlan "DOĞRULANMAMIŞ — TEST VERİSİ" olarak işaretlenir.'
            : undefined,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('[ilanlar POST]', error);
    return NextResponse.json({ error: 'İlan oluşturulamadı.' }, { status: 500 });
  }
}
