import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q')?.trim();
  if (!q || q.length < 2) return NextResponse.json({ suggestions: [] });

  const [listings, cities, districts, neighborhoods] = await Promise.all([
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
      select: { id: true, title: true, city: true, district: true, price: true, listingType: true, propertyType: true },
      orderBy: { views: 'desc' },
      take: 5,
    }),
    prisma.listing.findMany({
      where: { status: 'ACTIVE', city: { contains: q, mode: 'insensitive' } },
      select: { city: true },
      distinct: ['city'],
      take: 3,
    }),
    prisma.listing.findMany({
      where: { status: 'ACTIVE', district: { contains: q, mode: 'insensitive' } },
      select: { district: true, city: true },
      distinct: ['district'],
      take: 3,
    }),
    prisma.listing.findMany({
      where: { status: 'ACTIVE', neighborhood: { contains: q, mode: 'insensitive' } },
      select: { neighborhood: true, city: true },
      distinct: ['neighborhood'],
      take: 2,
    }),
  ]);

  const citySuggestions = cities
    .map(l => l.city)
    .filter((c): c is string => !!c)
    .map(city => ({
      type: 'city' as const,
      label: city,
      sublabel: 'Şehir',
      href: `/sehir/${encodeURIComponent(city)}`,
    }));

  const districtSuggestions = districts
    .filter(l => l.district)
    .map(l => ({
      type: 'city' as const,
      label: l.district!,
      sublabel: l.city ? `İlçe · ${l.city}` : 'İlçe',
      href: l.city
        ? `/ilce/${encodeURIComponent(l.city)}/${encodeURIComponent(l.district!)}`
        : `/listings?q=${encodeURIComponent(l.district!)}`,
    }));

  const neighborhoodSuggestions = neighborhoods
    .filter(l => l.neighborhood)
    .map(l => ({
      type: 'city' as const,
      label: l.neighborhood!,
      sublabel: l.city ? `Mahalle · ${l.city}` : 'Mahalle',
      href: `/listings?neighborhood=${encodeURIComponent(l.neighborhood!)}${l.city ? `&city=${encodeURIComponent(l.city)}` : ''}`,
    }));

  const listingSuggestions = listings.map(l => ({
    type: 'listing' as const,
    label: l.title,
    sublabel: [l.city, l.district].filter(Boolean).join(', ') + ` · ${l.listingType} · ₺${l.price.toLocaleString('tr-TR')}`,
    href: `/listing/${l.id}`,
  }));

  const seen = new Set<string>();
  const deduped = [...citySuggestions, ...districtSuggestions, ...neighborhoodSuggestions, ...listingSuggestions]
    .filter(s => {
      if (seen.has(s.href)) return false;
      seen.add(s.href);
      return true;
    })
    .slice(0, 8);

  return NextResponse.json({ suggestions: deduped });
}
