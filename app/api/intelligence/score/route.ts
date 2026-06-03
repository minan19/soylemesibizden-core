import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { computeScore } from '@/lib/investmentScore';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const scoreSchema = z.object({
  listingId: z.string().min(1, 'İlan ID zorunludur.'),
});

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Oturum gereklidir.' }, { status: 401 });
    }

    const body = await request.json();
    const parsed = scoreSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
    }

    const listing = await prisma.listing.findUnique({
      where: { id: parsed.data.listingId },
      include: { _count: { select: { offers: true } } },
    });

    if (!listing) {
      return NextResponse.json({ error: 'İlan bulunamadı.' }, { status: 404 });
    }

    // İlanın kaç gündür yayında olduğunu hesapla
    const daysOnMarket = Math.floor(
      (Date.now() - new Date(listing.createdAt).getTime()) / (1000 * 60 * 60 * 24)
    );

    const score = computeScore({
      priceAmount: listing.priceAmount,
      area: listing.area,
      location: listing.location ?? '',
      propertyType: listing.propertyType,
      status: listing.status,
      description: listing.description,
      offerCount: listing._count.offers,
      daysOnMarket,
    });

    // Skoru DB'ye kaydet (JSON alanı — sonraki isteklerde cache)
    await prisma.listing.update({
      where: { id: listing.id },
      data: { score: score as object },
    }).catch(() => null); // Hata kritik değil

    return NextResponse.json({ score, listingId: listing.id });
  } catch (error) {
    console.error('[Score API]', error);
    return NextResponse.json({ error: 'Puan hesaplanamadı.' }, { status: 500 });
  }
}

// Toplu skor hesaplama (admin / cron için)
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const userRole = (session?.user as { role?: string } | null)?.role;
    if (userRole !== 'ADMIN') {
      return NextResponse.json({ error: 'Yetki gereklidir.' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const limit = Math.min(Number(searchParams.get('limit') ?? 20), 100);

    // Skoru olmayan ilanları bul — JSON null Prisma'da JsonNullValueFilter ile
    const { Prisma: PrismaNamespace } = await import('@prisma/client');
    const listings = await prisma.listing.findMany({
      where: { score: { equals: PrismaNamespace.JsonNull } },
      take: limit,
    });
    // offer sayısı için ayrı sorgula
    const withOfferCounts = await Promise.all(listings.map(async (l) => {
      const offerCount = await prisma.offer.count({ where: { listingId: l.id } });
      return { ...l, _offerCount: offerCount };
    }));

    let updated = 0;
    for (const listing of withOfferCounts) {
      const daysOnMarket = Math.floor(
        (Date.now() - new Date(listing.createdAt).getTime()) / (1000 * 60 * 60 * 24)
      );
      const score = computeScore({
        priceAmount: listing.priceAmount,
        area: listing.area,
        location: listing.location ?? '',
        propertyType: listing.propertyType,
        status: listing.status,
        description: listing.description,
        offerCount: listing._offerCount,
        daysOnMarket,
      });
      await prisma.listing.update({
        where: { id: listing.id },
        data: { score: score as object },
      }).catch(() => null);
      updated++;
    }

    return NextResponse.json({ updated, total: listings.length });
  } catch (error) {
    console.error('[Score Bulk]', error);
    return NextResponse.json({ error: 'Toplu skor hesaplanamadı.' }, { status: 500 });
  }
}
