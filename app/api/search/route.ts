import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q')?.trim();
  if (!q || q.length < 2) return NextResponse.json({ suggestions: [] });

  const [listings, cities] = await Promise.all([
    prisma.listing.findMany({
      where: {
        status: 'ACTIVE',
        OR: [
          { title: { contains: q, mode: 'insensitive' } },
          { city: { contains: q, mode: 'insensitive' } },
          { district: { contains: q, mode: 'insensitive' } },
          { neighborhood: { contains: q, mode: 'insensitive' } },
        ],
      },
      select: { id: true, title: true, city: true, price: true, listingType: true, propertyType: true },
      orderBy: { views: 'desc' },
      take: 5,
    }),
    prisma.listing.findMany({
      where: { status: 'ACTIVE', city: { contains: q, mode: 'insensitive' } },
      select: { city: true },
      distinct: ['city'],
      take: 3,
    }),
  ]);

  const citySuggestions = cities
    .map(l => l.city)
    .filter((c): c is string => !!c)
    .map(city => ({ type: 'city' as const, label: city, href: `/listings?city=${encodeURIComponent(city)}` }));

  const listingSuggestions = listings.map(l => ({
    type: 'listing' as const,
    label: l.title,
    sublabel: `${l.city ?? ''} · ${l.listingType} · ₺${l.price.toLocaleString('tr-TR')}`,
    href: `/listing/${l.id}`,
  }));

  return NextResponse.json({ suggestions: [...citySuggestions, ...listingSuggestions] });
}
