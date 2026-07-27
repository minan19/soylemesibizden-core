import prisma from '@/lib/prisma';
import Link from 'next/link';
import { Metadata } from 'next';
import ListingsClient from './ListingsClient';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ searchParams }: { searchParams: { city?: string; propertyType?: string; listingType?: string; q?: string } }): Promise<Metadata> {
  const parts: string[] = [];
  if (searchParams.city) parts.push(searchParams.city);
  if (searchParams.propertyType) parts.push(searchParams.propertyType);
  if (searchParams.listingType) parts.push(searchParams.listingType);
  if (searchParams.q) parts.push(`"${searchParams.q}"`);
  const title = parts.length > 0
    ? `${parts.join(' · ')} İlanları | Söylemesi Bizden`
    : 'Tüm İlanlar | Söylemesi Bizden';
  const description = parts.length > 0
    ? `${parts.join(', ')} için ${searchParams.listingType === 'KİRALIK' ? 'kiralık' : 'satılık'} gayrimenkul ilanları.`
    : 'Türkiye\'nin en güncel gayrimenkul ilanları. Konut, ticari, arazi, satılık ve kiralık ilanlar.';
  return { title, description, openGraph: { title, description, type: 'website' } };
}

const PAGE_SIZE = 24;

type SearchParams = {
  q?: string;
  status?: string;
  sort?: string;
  propertyType?: string;
  listingType?: string;
  minPrice?: string;
  maxPrice?: string;
  minRooms?: string;
  city?: string;
  page?: string;
  hasElevator?: string;
  hasParking?: string;
  hasGarden?: string;
};

export default async function ListingsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const {
    q,
    status,
    sort,
    propertyType,
    listingType,
    minPrice,
    maxPrice,
    minRooms,
    city,
    page,
    hasElevator,
    hasParking,
    hasGarden,
  } = searchParams;

  const currentPage = Math.max(1, parseInt(page ?? '1') || 1);
  const skip = (currentPage - 1) * PAGE_SIZE;

  // Build the price range filter once so we can combine gte + lte cleanly
  const priceFilter: { gte?: number; lte?: number } = {};
  if (minPrice) priceFilter.gte = Number(minPrice);
  if (maxPrice) priceFilter.lte = Number(maxPrice);
  const hasPriceFilter = Object.keys(priceFilter).length > 0;

  const where = {
    ...(q
      ? {
          OR: [
            { title: { contains: q, mode: 'insensitive' as const } },
            { description: { contains: q, mode: 'insensitive' as const } },
            { location: { contains: q, mode: 'insensitive' as const } },
          ],
        }
      : {}),
    ...(status && status !== 'ALL' ? { status } : {}),
    ...(propertyType && propertyType !== 'ALL' ? { propertyType } : {}),
    ...(listingType && listingType !== 'ALL' ? { listingType } : {}),
    ...(hasPriceFilter ? { price: priceFilter } : {}),
    ...(minRooms ? { rooms: { gte: Number(minRooms) } } : {}),
    ...(city ? { city: { contains: city, mode: 'insensitive' as const } } : {}),
    ...(hasElevator === '1' ? { hasElevator: true } : {}),
    ...(hasParking === '1' ? { hasParking: true } : {}),
    ...(hasGarden === '1' ? { hasGarden: true } : {}),
  };

  const orderBy =
    sort === 'price_asc'
      ? { price: 'asc' as const }
      : sort === 'price_desc'
      ? { price: 'desc' as const }
      : sort === 'area_asc'
      ? { area: 'asc' as const }
      : sort === 'views'
      ? { views: 'desc' as const }
      : { createdAt: 'desc' as const };

  const [listings, totalCount, counts] = await Promise.all([
    prisma.listing.findMany({
      where,
      orderBy,
      skip,
      take: PAGE_SIZE,
      include: {
        owner: { select: { name: true, email: true } },
        _count: { select: { favorites: true } },
      },
    }),
    prisma.listing.count({ where }),
    prisma.listing.groupBy({ by: ['status'], _count: true }),
  ]);

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  const buildPageUrl = (p: number) => {
    const sp = new URLSearchParams();
    if (q) sp.set('q', q);
    if (status && status !== 'ALL') sp.set('status', status);
    if (sort && sort !== 'newest') sp.set('sort', sort);
    if (propertyType && propertyType !== 'ALL') sp.set('propertyType', propertyType);
    if (listingType && listingType !== 'ALL') sp.set('listingType', listingType);
    if (minPrice) sp.set('minPrice', minPrice);
    if (maxPrice) sp.set('maxPrice', maxPrice);
    if (minRooms) sp.set('minRooms', minRooms);
    if (city) sp.set('city', city);
    if (hasElevator) sp.set('hasElevator', hasElevator);
    if (hasParking) sp.set('hasParking', hasParking);
    if (hasGarden) sp.set('hasGarden', hasGarden);
    if (p > 1) sp.set('page', String(p));
    const qs = sp.toString();
    return `/listings${qs ? '?' + qs : ''}`;
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-gray-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10 space-y-8">
        <header className="flex items-start justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              {q ? `"${q}" için sonuçlar` : city ? `${city} İlanları` : 'Tüm İlanlar'}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {totalCount} ilan bulundu
              {totalPages > 1 && ` · Sayfa ${currentPage} / ${totalPages}`}
            </p>
          </div>
          <div className="flex gap-2 flex-wrap">
            {counts.map(c => (
              <span
                key={c.status}
                className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs font-semibold text-gray-600"
              >
                {c.status}{' '}
                <span className="text-[#00C49F]">{c._count}</span>
              </span>
            ))}
          </div>
        </header>

        <ListingsClient
          listings={listings}
          currentQ={q}
          currentStatus={status}
          currentSort={sort}
          currentPropertyType={propertyType}
          currentListingType={listingType}
          currentMinPrice={minPrice}
          currentMaxPrice={maxPrice}
          currentMinRooms={minRooms}
          currentCity={city}
          currentHasElevator={hasElevator}
          currentHasParking={hasParking}
          currentHasGarden={hasGarden}
        />

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 pt-4">
            {currentPage > 1 && (
              <Link
                href={buildPageUrl(currentPage - 1)}
                className="px-4 py-2 text-sm font-semibold bg-white border border-gray-200 rounded-xl hover:border-[#00C49F] hover:text-[#00C49F] transition-colors"
              >
                ← Önceki
              </Link>
            )}
            {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
              let p: number;
              if (totalPages <= 7) {
                p = i + 1;
              } else if (currentPage <= 4) {
                p = i + 1;
              } else if (currentPage >= totalPages - 3) {
                p = totalPages - 6 + i;
              } else {
                p = currentPage - 3 + i;
              }
              return (
                <Link
                  key={p}
                  href={buildPageUrl(p)}
                  className={`w-10 h-10 flex items-center justify-center text-sm font-semibold rounded-xl transition-colors ${
                    p === currentPage
                      ? 'bg-[#00C49F] text-white'
                      : 'bg-white border border-gray-200 text-gray-600 hover:border-[#00C49F] hover:text-[#00C49F]'
                  }`}
                >
                  {p}
                </Link>
              );
            })}
            {currentPage < totalPages && (
              <Link
                href={buildPageUrl(currentPage + 1)}
                className="px-4 py-2 text-sm font-semibold bg-white border border-gray-200 rounded-xl hover:border-[#00C49F] hover:text-[#00C49F] transition-colors"
              >
                Sonraki →
              </Link>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
