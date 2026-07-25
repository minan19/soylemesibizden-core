import prisma from '@/lib/prisma';
import ListingsClient from './ListingsClient';

export const dynamic = 'force-dynamic';

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
  } = searchParams;

  // Build the price range filter once so we can combine gte + lte cleanly
  const priceFilter: { gte?: number; lte?: number } = {};
  if (minPrice) priceFilter.gte = Number(minPrice);
  if (maxPrice) priceFilter.lte = Number(maxPrice);
  const hasPriceFilter = Object.keys(priceFilter).length > 0;

  const listings = await prisma.listing.findMany({
    where: {
      ...(q
        ? {
            OR: [
              { title: { contains: q, mode: 'insensitive' } },
              { description: { contains: q, mode: 'insensitive' } },
              { location: { contains: q, mode: 'insensitive' } },
            ],
          }
        : {}),
      ...(status && status !== 'ALL' ? { status } : {}),
      ...(propertyType && propertyType !== 'ALL' ? { propertyType } : {}),
      ...(listingType && listingType !== 'ALL' ? { listingType } : {}),
      ...(hasPriceFilter ? { price: priceFilter } : {}),
      ...(minRooms ? { rooms: { gte: Number(minRooms) } } : {}),
      ...(city ? { city: { contains: city, mode: 'insensitive' } } : {}),
    },
    orderBy:
      sort === 'price_asc'
        ? { price: 'asc' }
        : sort === 'price_desc'
        ? { price: 'desc' }
        : sort === 'area_asc'
        ? { area: 'asc' }
        : { createdAt: 'desc' },
    include: {
      owner: { select: { name: true, email: true } },
    },
  });

  const counts = await prisma.listing.groupBy({
    by: ['status'],
    _count: true,
  });

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-gray-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10 space-y-8">
        <header className="flex items-start justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Kritik Varlıklar
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {listings.length} ilan bulundu
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
        />
      </div>
    </main>
  );
}
