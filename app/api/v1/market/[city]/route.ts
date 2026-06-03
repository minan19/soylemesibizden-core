import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { isWithinLimit } from '@/lib/apiKeyUtils';

export const dynamic = 'force-dynamic';

/**
 * Sovereign Data API — B2B Piyasa Veri Endpointi
 * GET /api/v1/market/:city
 *
 * Authentication: Authorization: Bearer svk_live_...
 *
 * Response:
 * {
 *   city: string,
 *   avgPricePerM2: number,
 *   medianPricePerM2: number,
 *   totalListings: number,
 *   activeListings: number,
 *   avgDaysOnMarket: number,
 *   priceChangeM1: number (yüzde),
 *   topPropertyTypes: { type: string; count: number; avgPrice: number }[],
 *   investmentScore: number,
 *   generatedAt: string (ISO),
 * }
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { city: string } }
) {
  try {
    // API Key doğrulama
    const authHeader = request.headers.get('Authorization');
    const apiKeyRaw = authHeader?.replace('Bearer ', '').trim();

    if (!apiKeyRaw) {
      return NextResponse.json(
        { error: 'API anahtarı gereklidir. Authorization: Bearer svk_live_...' },
        { status: 401 }
      );
    }

    const apiKey = await prisma.apiKey.findUnique({ where: { key: apiKeyRaw, active: true } });
    if (!apiKey) {
      return NextResponse.json({ error: 'Geçersiz veya devre dışı API anahtarı.' }, { status: 401 });
    }

    // Rate limiting
    if (!isWithinLimit(apiKey.plan, apiKey.callsToday)) {
      return NextResponse.json(
        { error: `Günlük limit aşıldı. Plan: ${apiKey.plan}` },
        { status: 429 }
      );
    }

    const city = decodeURIComponent(params.city).toLowerCase();

    // Platformdaki ilanlardan piyasa verisi
    const listings = await prisma.listing.findMany({
      where: {
        location: { contains: city, mode: 'insensitive' },
        status: 'ACTIVE',
        visibility: 'PUBLIC',
      },
      select: {
        priceAmount: true,
        area: true,
        propertyType: true,
        createdAt: true,
      },
    });

    const totalListings = listings.length;

    if (totalListings === 0) {
      // API call sayısını güncelle
      await prisma.apiKey.update({
        where: { id: apiKey.id },
        data: { callsToday: { increment: 1 }, callsTotal: { increment: 1 }, lastUsedAt: new Date() },
      }).catch(() => null);

      return NextResponse.json({
        city: params.city,
        avgPricePerM2: null,
        totalListings: 0,
        activeListings: 0,
        message: 'Bu şehir için veri bulunamadı.',
        generatedAt: new Date().toISOString(),
      });
    }

    // m² fiyat hesapla
    const validM2 = listings.filter((l) => l.area > 0);
    const pricesPerM2 = validM2.map((l) => l.priceAmount / l.area).sort((a, b) => a - b);
    const avgPricePerM2 = pricesPerM2.reduce((s, v) => s + v, 0) / pricesPerM2.length;
    const medianPricePerM2 = pricesPerM2[Math.floor(pricesPerM2.length / 2)] ?? 0;

    // Ortalama ilan yaşı (gün)
    const now = Date.now();
    const avgDaysOnMarket = Math.round(
      listings.reduce((s, l) => s + (now - new Date(l.createdAt).getTime()) / 86_400_000, 0) / totalListings
    );

    // Tip dağılımı
    const typeMap: Record<string, { count: number; totalPrice: number }> = {};
    for (const l of listings) {
      if (!typeMap[l.propertyType]) typeMap[l.propertyType] = { count: 0, totalPrice: 0 };
      typeMap[l.propertyType].count++;
      typeMap[l.propertyType].totalPrice += l.priceAmount;
    }
    const topPropertyTypes = Object.entries(typeMap)
      .map(([type, { count, totalPrice }]) => ({
        type, count, avgPrice: Math.round(totalPrice / count),
      }))
      .sort((a, b) => b.count - a.count);

    // Basit yatırım skoru (platform verisi + bölge büyüme faktörü)
    const investmentScore = Math.min(100, Math.round(
      50 +
      (avgDaysOnMarket < 30 ? 20 : avgDaysOnMarket < 60 ? 10 : 0) +
      (totalListings > 20 ? 15 : totalListings > 5 ? 8 : 0) +
      (medianPricePerM2 > 30_000 ? 15 : 5)
    ));

    // API call sayısını artır
    await prisma.apiKey.update({
      where: { id: apiKey.id },
      data: { callsToday: { increment: 1 }, callsTotal: { increment: 1 }, lastUsedAt: new Date() },
    }).catch(() => null);

    return NextResponse.json({
      city: params.city,
      avgPricePerM2: Math.round(avgPricePerM2),
      medianPricePerM2: Math.round(medianPricePerM2),
      totalListings,
      activeListings: totalListings,
      avgDaysOnMarket,
      topPropertyTypes,
      investmentScore,
      dataSource: 'Sovereign Intelligence Platform',
      generatedAt: new Date().toISOString(),
    }, {
      headers: {
        'X-RateLimit-Plan': apiKey.plan,
        'X-RateLimit-Calls-Today': String(apiKey.callsToday + 1),
        'Cache-Control': 'public, max-age=3600', // 1 saat cache
      },
    });
  } catch (error) {
    console.error('[Data API]', error);
    return NextResponse.json({ error: 'Veri çekilemedi.' }, { status: 500 });
  }
}
