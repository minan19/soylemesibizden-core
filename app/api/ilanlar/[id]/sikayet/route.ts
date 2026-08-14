import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { z } from 'zod';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { checkRateLimit } from '@/lib/ratelimit';
import { teyideZorlarMi, TEYIDE_ZORLAYAN_TURLER } from '@/lib/sikayet';

export const dynamic = 'force-dynamic';

/**
 * POST /api/ilanlar/[id]/sikayet · 14.08.2026 (TRT)
 *
 * Sikayet kaydi acar ve gerekiyorsa ILANI OTOMATIK TEYIDE ZORLAR.
 *
 * "Satildi ama hala yayinda" veya "yem ilan" sikayeti iki FARKLI
 * kullanicidan gelirse ilan TEYIT_BEKLIYOR'a alinir. Sahibi teyit
 * etmezse canlilik gorevi onu duserir. Boylece sistem, moderator
 * karar vermeyi beklemeden kendini temizler.
 *
 * Ilan SILINMEZ, yalnizca teyit ISTENIR — yanlis alarmin bedeli
 * ilan sahibi icin bir tiktir. Bu denge kasitli: tek kisinin kotu
 * niyetle rakip ilani dusurmesi engellenirken, gercek sorunun
 * cozumu de bes kisiyi beklemez.
 */

const govde = z.object({
  turu: z.enum([
    'SATILDI_HALA_YAYINDA',
    'YANLIS_FIYAT',
    'YANLIS_KONUM',
    'YEM_ILAN',
    'SAHTE_GORSEL',
    'YETKISIZ_ILAN',
    'DIGER',
  ]),
  aciklama: z.string().trim().max(2000).optional(),
});

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    const kullaniciId = (session?.user as { id?: string } | undefined)?.id;
    if (!kullaniciId) {
      return NextResponse.json(
        { error: 'Şikâyet için oturum gereklidir.' },
        { status: 401 }
      );
    }

    // Sikayet ucuz olmali ama sinirsiz degil — kotuye kullanim
    // rakip ilani dusurmenin yolu olmasin.
    const rl = await checkRateLimit(`sikayet:${kullaniciId}`, {
      limit: 10,
      window: '1 h',
    });
    if (!rl.success) {
      return NextResponse.json(
        { error: 'Çok fazla şikâyet gönderdiniz. Lütfen sonra tekrar deneyin.' },
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
    const { turu, aciklama } = ayristirilan.data;

    const ilan = await prisma.ilan.findUnique({
      where: { id: params.id },
      select: { id: true, durumu: true, sahibiId: true },
    });
    if (!ilan) {
      return NextResponse.json({ error: 'İlan bulunamadı.' }, { status: 404 });
    }

    // Kendi ilanini sikayet etmek anlamsiz; teyit yolu var.
    if (ilan.sahibiId === kullaniciId) {
      return NextResponse.json(
        { error: 'Kendi ilanınızı şikâyet edemezsiniz.' },
        { status: 409 }
      );
    }

    // Ayni kullanici ayni ilana ayni turden ACIK sikayet acmis mi
    const mevcut = await prisma.sikayet.findFirst({
      where: { ilanId: ilan.id, bildirenId: kullaniciId, turu, kapanisTs: null },
      select: { id: true },
    });
    if (mevcut) {
      return NextResponse.json(
        { error: 'Bu ilan için aynı türde açık şikâyetiniz zaten var.' },
        { status: 409 }
      );
    }

    const sikayet = await prisma.sikayet.create({
      data: { ilanId: ilan.id, bildirenId: kullaniciId, turu, aciklama },
      select: { id: true, turu: true, acilisTs: true },
    });

    // ── Otomatik etki ────────────────────────────────────────────
    let teyideAlindi = false;

    if (TEYIDE_ZORLAYAN_TURLER.includes(turu)) {
      // FARKLI kullanici sayisi — ayni kisinin tekrari sayilmaz.
      const bildirenler = await prisma.sikayet.findMany({
        where: { ilanId: ilan.id, turu, kapanisTs: null },
        select: { bildirenId: true },
        distinct: ['bildirenId'],
      });

      if (
        teyideZorlarMi(turu, bildirenler.length) &&
        ilan.durumu === 'YAYINDA'
      ) {
        await prisma.ilan.update({
          where: { id: ilan.id },
          data: {
            durumu: 'TEYIT_BEKLIYOR',
            // Teyit penceresi 3 gun. Teyit gelmezse canlilik gorevi duserir.
            teyitSonTarih: new Date(Date.now() + 3 * 86_400_000),
          },
        });
        teyideAlindi = true;
      }
    }

    return NextResponse.json(
      {
        ...sikayet,
        teyideAlindi,
        bilgi: teyideAlindi
          ? 'Bu ilan için birden fazla bildirim geldi. İlan sahibinden teyit istendi; teyit gelmezse ilan otomatik olarak yayından kalkacak.'
          : 'Şikâyetiniz kaydedildi. Sonuç ilan sayfasında görünecek.',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('[sikayet]', error);
    return NextResponse.json({ error: 'Şikâyet kaydedilemedi.' }, { status: 500 });
  }
}
