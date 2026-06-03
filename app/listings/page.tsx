import prisma from '@/lib/prisma';
import Link from 'next/link';
import { Suspense } from 'react';
import {
  MapPin, ArrowRight, Activity, SlidersHorizontal,
  Search, TrendingUp, Building2, Leaf, Home, LucideIcon,
} from 'lucide-react';
import ListingsFilter from '@/components/ListingsFilter';
import ListingsViewToggle from '@/components/ListingsViewToggle';
import ListingCompareButton from '@/components/ListingCompareButton';
import CompareBar from '@/components/CompareBar';

export const dynamic = 'force-dynamic';

function formatCurrency(val: number): string {
  if (val >= 1e9) return (val / 1e9).toFixed(2) + ' Milyar ₺';
  if (val >= 1e6) return (val / 1e6).toFixed(2) + ' Milyon ₺';
  if (val >= 1e3) return (val / 1e3).toFixed(0) + 'K ₺';
  return val.toLocaleString('tr-TR') + ' ₺';
}

const PROPERTY_ICONS: Record<string, LucideIcon> = {
  RESIDENTIAL: Home,
  COMMERCIAL: Building2,
  LAND: Leaf,
  INDUSTRIAL: TrendingUp,
};

interface SearchParams {
  q?: string;
  type?: string;
  sort?: string;
  minPrice?: string;
  maxPrice?: string;
}

export default async function ListingsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const q = searchParams.q ?? '';
  const type = searchParams.type ?? '';
  const sort = searchParams.sort ?? 'newest';
  const minPrice = Number(searchParams.minPrice ?? 0);
  const maxPrice = Number(searchParams.maxPrice ?? 0);

  const where: Record<string, unknown> = {};
  if (q) where.title = { contains: q, mode: 'insensitive' };
  if (type) where.propertyType = type;
  if (minPrice > 0 || maxPrice > 0) {
    where.priceAmount = {
      ...(minPrice > 0 ? { gte: minPrice } : {}),
      ...(maxPrice > 0 ? { lte: maxPrice } : {}),
    };
  }

  const orderBy =
    sort === 'price_asc' ? { priceAmount: 'asc' as const } :
    sort === 'price_desc' ? { priceAmount: 'desc' as const } :
    { createdAt: 'desc' as const };

  const [listings, total] = await Promise.all([
    prisma.listing.findMany({
      where,
      orderBy,
      include: { owner: { select: { name: true } } },
    }),
    prisma.listing.count({ where }),
  ]);

  const propertyTypes = ['RESIDENTIAL', 'COMMERCIAL', 'LAND', 'INDUSTRIAL'];

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-[#0F172A]">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-gray-100 h-20 flex items-center justify-between px-10">
        <Link href="/dashboard" className="text-[11px] font-bold tracking-[0.35em] uppercase">
          SÖYLEMESİ<span className="text-[#00C49F]">BİZDEN</span>
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-[11px] font-bold text-gray-400">
            <span className="text-[#0F172A]">{total}</span> ilan bulundu
          </span>
          <Link
            href="/dashboard"
            className="px-5 py-2.5 bg-[#0F172A] text-white text-[11px] font-bold rounded-full tracking-widest hover:bg-[#1E293B] transition-all"
          >
            DASHBOARD
          </Link>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-8 py-10 grid grid-cols-12 gap-10">
        {/* FILTER SIDEBAR */}
        <aside className="col-span-3">
          <div className="bg-white rounded-[28px] border border-gray-100 shadow-sm p-8 sticky top-28">
            <div className="flex items-center gap-3 mb-8">
              <SlidersHorizontal size={18} className="text-[#00C49F]" />
              <h3 className="text-[11px] font-black tracking-widest uppercase">Filtreler</h3>
            </div>
            <Suspense>
              <ListingsFilter
                currentQ={q}
                currentType={type}
                currentSort={sort}
                currentMinPrice={minPrice}
                currentMaxPrice={maxPrice}
                propertyTypes={propertyTypes}
              />
            </Suspense>
          </div>
        </aside>

        {/* LISTINGS GRID */}
        <main className="col-span-9">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-[10px] font-bold text-[#00C49F] tracking-widest uppercase mb-1">
                INTEL TERMINAL
              </p>
              <h1 className="text-2xl font-black tracking-tighter">
                Kritik Varlıklar{' '}
                <span className="text-gray-300 text-lg font-semibold">({total})</span>
              </h1>
            </div>
            <div className="flex items-center gap-4">
              {q && (
                <Link
                  href="/listings"
                  className="text-[11px] font-bold text-red-400 hover:underline"
                >
                  Aramayı Temizle
                </Link>
              )}
            </div>
          </div>

          {listings.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 text-center">
              <Search size={48} className="text-gray-200 mb-6" />
              <p className="text-lg font-bold text-gray-400">Sonuç bulunamadı.</p>
              <p className="text-sm text-gray-300 mt-2">Filtreleri değiştirerek tekrar deneyin.</p>
              <Link
                href="/listings"
                className="mt-6 px-6 py-3 bg-[#00C49F] text-white text-[11px] font-bold rounded-full hover:bg-[#00A887] transition-all"
              >
                TÜM İLANLAR
              </Link>
            </div>
          ) : (
            <Suspense>
              <ListingsViewToggle
                listings={listings.map(l => ({ id: l.id, title: l.title, priceAmount: l.priceAmount, location: l.location, propertyType: l.propertyType, status: l.status }))}
                gridComponent={
                  <div className="grid gap-5">
                    {listings.map((listing) => {
                      const IconComponent = PROPERTY_ICONS[listing.propertyType] ?? Building2;
                      return (
                        <Link
                          key={listing.id}
                          href={`/listing/${listing.id}`}
                          className="group block bg-white rounded-[32px] border border-gray-100 p-8 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] hover:border-[#00C49F]/20 transition-all duration-300"
                        >
                          <div className="flex items-start justify-between gap-6">
                            <div className="flex items-start gap-5 flex-1">
                              <div className="w-14 h-14 rounded-2xl bg-[#F0FDF8] flex items-center justify-center shrink-0 group-hover:bg-[#00C49F] transition-colors">
                                <IconComponent
                                  size={24}
                                  className="text-[#00C49F] group-hover:text-white transition-colors"
                                />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <span className="text-[9px] font-black tracking-widest px-3 py-1 rounded-full bg-gray-100 text-gray-500 uppercase">
                                    {listing.propertyType}
                                  </span>
                                  <span
                                    className={`text-[9px] font-black tracking-widest px-3 py-1 rounded-full uppercase ${
                                      listing.status === 'ACTIVE'
                                        ? 'bg-[#F0FDF8] text-[#00C49F]'
                                        : listing.status === 'SOLD'
                                        ? 'bg-red-50 text-red-400'
                                        : 'bg-yellow-50 text-yellow-500'
                                    }`}
                                  >
                                    {listing.status}
                                  </span>
                                </div>
                                <h2 className="text-xl font-bold group-hover:text-[#00C49F] transition-colors mb-1">
                                  {listing.title}
                                </h2>
                                {listing.description && (
                                  <p className="text-sm text-gray-400 line-clamp-1 mb-3">
                                    {listing.description}
                                  </p>
                                )}
                                <div className="flex items-center gap-4">
                                  {listing.location && (
                                    <span className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-400">
                                      <MapPin size={12} /> {listing.location}
                                    </span>
                                  )}
                                  <span className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-400">
                                    <Activity size={12} className="text-[#00C49F]" />
                                    {listing.area.toLocaleString('tr-TR')} m²
                                  </span>
                                  {listing.owner?.name && (
                                    <span className="text-[11px] font-semibold text-gray-400">
                                      Sahibi: {listing.owner.name}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-4 shrink-0">
                              <div className="text-right">
                                <p className="text-2xl font-black tracking-tighter text-[#0F172A]">
                                  {formatCurrency(listing.priceAmount)}
                                </p>
                                <p className="text-[10px] font-semibold text-gray-400 mt-0.5">
                                  Değerleme Fiyatı
                                </p>
                              </div>
                              <ListingCompareButton listingId={listing.id} />
                              <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-[#00C49F] transition-all">
                                <ArrowRight
                                  size={16}
                                  className="text-gray-300 group-hover:text-white transition-colors"
                                />
                              </div>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                }
              />
            </Suspense>
          )}
        </main>
      </div>

      {/* Floating Compare Bar */}
      <CompareBar />
    </div>
  );
}
