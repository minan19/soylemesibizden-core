import prisma from '@/lib/prisma';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import ListingsClient from '@/app/listings/ListingsClient';
import SearchFilterSidebar from './SearchFilterSidebar';

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
  minArea?: string;
  maxArea?: string;
  city?: string;
  hasElevator?: string;
  hasParking?: string;
  hasGarden?: string;
};

export default async function SearchPage({
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
    minArea,
    maxArea,
    city,
    hasElevator,
    hasParking,
    hasGarden,
  } = searchParams;

  // Price filter — combine gte + lte into one object
  const priceFilter: { gte?: number; lte?: number } = {};
  if (minPrice) priceFilter.gte = Number(minPrice);
  if (maxPrice) priceFilter.lte = Number(maxPrice);
  const hasPriceFilter = Object.keys(priceFilter).length > 0;

  // Area filter
  const areaFilter: { gte?: number; lte?: number } = {};
  if (minArea) areaFilter.gte = Number(minArea);
  if (maxArea) areaFilter.lte = Number(maxArea);
  const hasAreaFilter = Object.keys(areaFilter).length > 0;

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
      ...(hasAreaFilter ? { area: areaFilter } : {}),
      ...(minRooms ? { rooms: { gte: Number(minRooms) } } : {}),
      ...(city ? { city: { contains: city, mode: 'insensitive' } } : {}),
      ...(hasElevator === 'true' ? { hasElevator: true } : {}),
      ...(hasParking === 'true' ? { hasParking: true } : {}),
      ...(hasGarden === 'true' ? { hasGarden: true } : {}),
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

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-gray-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">

        {/* ── Page header ─────────────────────────────────────────── */}
        <header className="mb-8">
          <Link
            href="/listings"
            className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-600 transition-colors mb-4"
          >
            <ArrowLeft size={13} />
            İlanlara dön
          </Link>
          <div className="flex items-end justify-between flex-wrap gap-3">
            <div>
              <p className="text-[11px] font-bold text-[#00C49F] uppercase tracking-widest mb-1">
                Gelişmiş Arama
              </p>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                İlan Ara
              </h1>
            </div>
            <div className="bg-white border border-gray-100 rounded-2xl px-4 py-2.5 shadow-sm">
              <span className="text-2xl font-bold text-gray-900 font-mono">
                {listings.length}
              </span>
              <span className="text-sm text-gray-400 ml-2">ilan bulundu</span>
            </div>
          </div>
        </header>

        {/* ── Body: sidebar + results ─────────────────────────────── */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">

          {/* Left sidebar — client component */}
          <SearchFilterSidebar
            currentQ={q}
            currentListingType={listingType}
            currentPropertyType={propertyType}
            currentStatus={status}
            currentMinPrice={minPrice}
            currentMaxPrice={maxPrice}
            currentMinRooms={minRooms}
            currentMinArea={minArea}
            currentMaxArea={maxArea}
            currentCity={city}
            currentSort={sort}
            currentHasElevator={hasElevator}
            currentHasParking={hasParking}
            currentHasGarden={hasGarden}
          />

          {/* Right results — listing grid only, filters live in sidebar */}
          <section className="flex-1 min-w-0">
            {listings.length === 0 && (
              <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-sm">
                <p className="text-gray-400 text-sm mb-2">
                  Arama kriterlerine uygun ilan bulunamadı.
                </p>
                <Link
                  href="/search"
                  className="text-xs text-[#00C49F] hover:underline font-medium"
                >
                  Filtreleri temizle
                </Link>
              </div>
            )}
            {listings.length > 0 && (
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
                hideFilters
              />
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
