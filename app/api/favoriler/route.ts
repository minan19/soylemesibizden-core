import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { z } from 'zod';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { checkRateLimit } from '@/lib/ratelimit';

export const dynamic = 'force-dynamic';

/**
 * /api/favoriler · 15.08.2026 (TRT)
 *
 * GET  — kullanicinin favorileri
 * POST — favoriye ekle / cikar (toggle)
 *
 * Favoriler PASIFLESMIS ilanlari da tutar ve GOSTERIR. Kullanici
 * begendigi ilanin neden dustugunu gorebilmeli; sessizce listeden
 * silmek, "ilan kayboldu" hissi yaratir — tam da rakiplerde sikayet
 * konusu olan davranis.
 */

const govde = z.object({ ilanId: z.string().uuid('Geçersiz ilan.') });

export async function GET() {
  const session = await getServerSession(authOptions);
  const kullaniciId = (session?.user as { id?: string } | undefined)?.id;
  if (!kullaniciId) {
    return NextResponse.json({ error: 'Oturum gereklidir.' }, { status: 401 });
  }

  const favoriler = await prisma.favori.findMany({
    where: { kullaniciId },
    orderBy: { eklendi: 'desc' },
    select: {
      eklendi: true,
      ilan: {
        select: {
          id: true, baslik: true, fiyatKurus: true, durumu: true,
          otomatikPasifTs: true,
          tasinmaz: {
            select: {
              brutM2: true,
              mahalle: { select: { ilceAd: true, mahalleAd: true } },
            },
          },
        },
      },
    },
    take: 200,
  });

  return NextResponse.json(
    favoriler.map((f) => ({
      eklendi: f.eklendi,
      id: f.ilan.id,
      baslik: f.ilan.baslik,
      // BigInt JSON'a dogrudan yazilamaz.
      fiyatKurus: f.ilan.fiyatKurus.toString(),
      durumu: f.ilan.durumu,
      yayindaMi: f.ilan.durumu === 'YAYINDA',
      otomatikPasifTs: f.ilan.otomatikPasifTs,
      brutM2: f.ilan.tasinmaz.brutM2,
      konum: `${f.ilan.tasinmaz.mahalle.ilceAd} / ${f.ilan.tasinmaz.mahalle.mahalleAd}`,
    }))
  );
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const kullaniciId = (session?.user as { id?: string } | undefined)?.id;
    if (!kullaniciId) {
      return NextResponse.json({ error: 'Oturum gereklidir.' }, { status: 401 });
    }

    const rl = await checkRateLimit(`favori:${kullaniciId}`, { limit: 60, window: '10 m' });
    if (!rl.success) {
      return NextResponse.json({ error: 'Çok fazla istek.' }, { status: 429 });
    }

    const ayristirilan = govde.safeParse(await request.json());
    if (!ayristirilan.success) {
      return NextResponse.json(
        { error: ayristirilan.error.issues[0].message },
        { status: 400 }
      );
    }
    const { ilanId } = ayristirilan.data;

    const ilan = await prisma.ilan.findUnique({
      where: { id: ilanId },
      select: { id: true },
    });
    if (!ilan) {
      return NextResponse.json({ error: 'İlan bulunamadı.' }, { status: 404 });
    }

    const mevcut = await prisma.favori.findUnique({
      where: { kullaniciId_ilanId: { kullaniciId, ilanId } },
      select: { id: true },
    });

    if (mevcut) {
      await prisma.favori.delete({ where: { id: mevcut.id } });
      return NextResponse.json({ favoride: false });
    }

    await prisma.favori.create({ data: { kullaniciId, ilanId } });
    return NextResponse.json({ favoride: true }, { status: 201 });
  } catch (error) {
    console.error('[favoriler POST]', error);
    return NextResponse.json({ error: 'İşlem yapılamadı.' }, { status: 500 });
  }
}
