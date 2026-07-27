'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useState, useTransition } from 'react';
import Link from 'next/link';
import {
  Search,
  SlidersHorizontal,
  MapPin,
  ArrowRight,
  X,
  CheckCircle2,
  Bed,
  Maximize2,
  Building2,
} from 'lucide-react';

export interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string | null;
  city: string | null;
  status: string;
  propertyType: string;
  listingType: string;
  rooms: number | null;
  area: number | null;
  isVerified: boolean;
  photos: string[];
  owner: { name: string | null; email: string };
}

export interface FilterParams {
  currentQ?: string;
  currentStatus?: string;
  currentSort?: string;
  currentPropertyType?: string;
  currentListingType?: string;
  currentMinPrice?: string;
  currentMaxPrice?: string;
  currentMinRooms?: string;
  currentCity?: string;
}

interface Props extends FilterParams {
  listings: Listing[];
  /** When true the filter bar is hidden — useful for the search page which has its own sidebar */
  hideFilters?: boolean;
}

const STATUS_LABEL: Record<string, string> = {
  ACTIVE: 'AKTİF',
  SOLD: 'SATILDI',
  PENDING: 'BEKLEMEDE',
};

const STATUS_COLOR: Record<string, string> = {
  ACTIVE: 'bg-[#F0FDF8] text-[#00C49F]',
  SOLD: 'bg-gray-100 text-gray-500',
  PENDING: 'bg-amber-50 text-amber-600',
};

const LISTING_TYPE_COLOR: Record<string, string> = {
  SATILIK: 'bg-blue-50 text-blue-600',
  KİRALIK: 'bg-violet-50 text-violet-600',
};

const STATUS_OPTIONS = [
  { label: 'Tümü', value: 'ALL' },
  { label: 'Aktif', value: 'ACTIVE' },
  { label: 'Beklemede', value: 'PENDING' },
  { label: 'Satıldı', value: 'SOLD' },
];

const SORT_OPTIONS = [
  { label: 'En Yeni', value: 'newest' },
  { label: 'Fiyat ↑', value: 'price_asc' },
  { label: 'Fiyat ↓', value: 'price_desc' },
  { label: 'Alan ↑', value: 'area_asc' },
  { label: 'Popüler', value: 'views' },
];

const PROPERTY_TYPES = [
  { label: 'Tümü', value: 'ALL' },
  { label: 'Konut', value: 'KONUT' },
  { label: 'Ticari', value: 'TİCARİ' },
  { label: 'Arazi', value: 'ARAZI' },
  { label: 'Ofis', value: 'OFİS' },
  { label: 'Depo', value: 'DEPO' },
];

const ROOMS_OPTIONS = [
  { label: 'Tümü', value: '' },
  { label: '1+', value: '1' },
  { label: '2+', value: '2' },
  { label: '3+', value: '3' },
  { label: '4+', value: '4' },
  { label: '5+', value: '5' },
];

export default function ListingsClient({
  listings,
  currentQ,
  currentStatus,
  currentSort,
  currentPropertyType,
  currentListingType,
  currentMinPrice,
  currentMaxPrice,
  currentMinRooms,
  currentCity,
  hideFilters = false,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const [q, setQ] = useState(currentQ ?? '');
  const [priceMin, setPriceMin] = useState(currentMinPrice ?? '');
  const [priceMax, setPriceMax] = useState(currentMaxPrice ?? '');

  const activeStatus = currentStatus ?? 'ALL';
  const activeSort = currentSort ?? 'newest';
  const activePropertyType = currentPropertyType ?? 'ALL';
  const activeListingType = currentListingType ?? 'ALL';
  const activeMinRooms = currentMinRooms ?? '';

  /** Build and push a new URL from current state + any overrides */
  const push = (overrides: Record<string, string | undefined>) => {
    const state: Record<string, string | undefined> = {
      q: q || undefined,
      status: activeStatus !== 'ALL' ? activeStatus : undefined,
      sort: activeSort !== 'newest' ? activeSort : undefined,
      propertyType: activePropertyType !== 'ALL' ? activePropertyType : undefined,
      listingType: activeListingType !== 'ALL' ? activeListingType : undefined,
      minPrice: priceMin || undefined,
      maxPrice: priceMax || undefined,
      minRooms: activeMinRooms || undefined,
      city: currentCity || undefined,
    };
    const merged = { ...state, ...overrides };
    const sp = new URLSearchParams();
    Object.entries(merged).forEach(([k, v]) => {
      if (v) sp.set(k, v);
    });
    startTransition(() => router.push(`${pathname}?${sp.toString()}`));
  };

  const clearPrice = () => {
    setPriceMin('');
    setPriceMax('');
    push({ minPrice: undefined, maxPrice: undefined });
  };

  return (
    <div className="space-y-6">
      {/* ── Filter bar (hidden in search mode) ─────────────────────────── */}
      {!hideFilters && (
        <div className="bg-white rounded-2xl border border-gray-100 p-4 space-y-3 shadow-sm">
          {/* Row 1 — search + sort */}
          <div className="flex flex-wrap gap-3 items-center">
            <div className="relative flex-1 min-w-[180px]">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={q}
                onChange={e => setQ(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && push({ q: q || undefined })}
                placeholder="İlan ara… (Enter ile)"
                className="w-full pl-10 pr-10 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#00C49F] transition-colors"
              />
              {q && (
                <button
                  onClick={() => { setQ(''); push({ q: undefined }); }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <SlidersHorizontal size={14} className="text-gray-400" />
              <div className="flex gap-0.5 bg-gray-50 rounded-xl p-1">
                {SORT_OPTIONS.map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => push({ sort: opt.value !== 'newest' ? opt.value : undefined })}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                      activeSort === opt.value
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-400 hover:text-gray-700'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Row 2 — listing type + status + property type + rooms */}
          <div className="flex flex-wrap gap-3 items-center">
            {/* Listing type */}
            <div className="flex gap-0.5 bg-gray-50 rounded-xl p-1 shrink-0">
              {[
                { label: 'Tümü', value: 'ALL' },
                { label: 'Satılık', value: 'SATILIK' },
                { label: 'Kiralık', value: 'KİRALIK' },
              ].map(opt => (
                <button
                  key={opt.value}
                  onClick={() => push({ listingType: opt.value !== 'ALL' ? opt.value : undefined })}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    activeListingType === opt.value
                      ? 'bg-[#00C49F] text-white shadow-sm'
                      : 'text-gray-400 hover:text-gray-700'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {/* Status */}
            <div className="flex gap-0.5 bg-gray-50 rounded-xl p-1 shrink-0">
              {STATUS_OPTIONS.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => push({ status: opt.value !== 'ALL' ? opt.value : undefined })}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    activeStatus === opt.value
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-400 hover:text-gray-700'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {/* Property type chips */}
            <div className="flex gap-1 flex-wrap">
              {PROPERTY_TYPES.map(pt => (
                <button
                  key={pt.value}
                  onClick={() => push({ propertyType: pt.value !== 'ALL' ? pt.value : undefined })}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                    activePropertyType === pt.value
                      ? 'bg-[#00C49F]/10 border-[#00C49F] text-[#00C49F]'
                      : 'bg-white border-gray-200 text-gray-500 hover:border-[#00C49F]/50 hover:text-gray-700'
                  }`}
                >
                  {pt.label}
                </button>
              ))}
            </div>

            {/* Min rooms */}
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="text-xs text-gray-400 font-medium">Oda:</span>
              <div className="flex gap-0.5 bg-gray-50 rounded-xl p-1">
                {ROOMS_OPTIONS.map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => push({ minRooms: opt.value || undefined })}
                    className={`px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                      activeMinRooms === opt.value
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-400 hover:text-gray-700'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Row 3 — city quick filter */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-gray-400 font-medium shrink-0">Şehir:</span>
            {['İstanbul', 'Ankara', 'İzmir', 'Antalya', 'Bursa'].map(c => (
              <button
                key={c}
                onClick={() => push({ city: currentCity === c ? undefined : c })}
                className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all border ${
                  currentCity === c
                    ? 'bg-[#00C49F] text-white border-[#00C49F]'
                    : 'bg-white text-gray-500 border-gray-200 hover:border-[#00C49F]/50'
                }`}
              >
                {c}
              </button>
            ))}
            {currentCity && !['İstanbul', 'Ankara', 'İzmir', 'Antalya', 'Bursa'].includes(currentCity) && (
              <span className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-[#00C49F] text-white border border-[#00C49F]">
                {currentCity}
              </span>
            )}
          </div>

          {/* Row 4 — price range */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-gray-400 font-medium shrink-0">Fiyat (₺):</span>
            <input
              type="number"
              value={priceMin}
              onChange={e => setPriceMin(e.target.value)}
              placeholder="Min"
              className="w-28 px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#00C49F] transition-colors"
            />
            <span className="text-gray-300">—</span>
            <input
              type="number"
              value={priceMax}
              onChange={e => setPriceMax(e.target.value)}
              placeholder="Maks"
              className="w-28 px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#00C49F] transition-colors"
            />
            <button
              onClick={() => push({ minPrice: priceMin || undefined, maxPrice: priceMax || undefined })}
              className="px-3 py-2 text-xs font-semibold bg-[#00C49F] hover:bg-[#00a882] text-white rounded-xl transition-colors"
            >
              Uygula
            </button>
            {(priceMin || priceMax) && (
              <button onClick={clearPrice} className="text-gray-400 hover:text-gray-700">
                <X size={14} />
              </button>
            )}
          </div>
        </div>
      )}

      {/* ── Listing grid ──────────────────────────────────────────────── */}
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 transition-opacity duration-200 ${
          isPending ? 'opacity-40 pointer-events-none' : 'opacity-100'
        }`}
      >
        {listings.map(listing => (
          <Link
            key={listing.id}
            href={`/listing/${listing.id}`}
            className="group bg-white border border-gray-100 rounded-2xl hover:shadow-lg hover:border-[#00C49F]/20 transition-all overflow-hidden"
          >
            {/* Photo thumbnail */}
            <div className="w-full h-40 bg-gradient-to-br from-slate-100 to-slate-200 relative overflow-hidden">
              {listing.photos.length > 0 ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={listing.photos[0]}
                  alt={listing.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Building2 size={28} className="text-slate-300" />
                </div>
              )}
              {listing.isVerified && (
                <span className="absolute top-2 left-2 bg-white/90 text-[#00C49F] text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5 shadow-sm">
                  <CheckCircle2 size={9} /> Onaylı
                </span>
              )}
            </div>

            <div className="p-5">
            {/* Badge row */}
            <div className="flex justify-between items-start mb-2.5">
              <div className="flex flex-wrap gap-1.5">
                <span
                  className={`text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wider ${
                    STATUS_COLOR[listing.status] ?? 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {STATUS_LABEL[listing.status] ?? listing.status}
                </span>
                <span
                  className={`text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wider ${
                    LISTING_TYPE_COLOR[listing.listingType] ?? 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {listing.listingType}
                </span>
              </div>
              <ArrowRight
                size={16}
                className="text-gray-300 group-hover:text-[#00C49F] transition-colors shrink-0 mt-0.5"
              />
            </div>

            {/* Property type */}
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
              {listing.propertyType}
            </p>

            <h2 className="text-base font-semibold text-gray-900 mb-1 line-clamp-1">{listing.title}</h2>

            {(listing.location || listing.city) && (
              <p className="text-xs text-gray-400 flex items-center gap-1 mb-2">
                <MapPin size={11} className="shrink-0" />
                {listing.location ?? listing.city}
              </p>
            )}

            <p className="text-xs text-gray-500 line-clamp-2 mb-3">{listing.description}</p>

            {/* Rooms / Area chips */}
            {(listing.rooms != null || listing.area != null) && (
              <div className="flex gap-3 mb-3">
                {listing.rooms != null && (
                  <span className="flex items-center gap-1 text-xs text-gray-500 font-medium">
                    <Bed size={12} className="text-gray-400" />
                    {listing.rooms} oda
                  </span>
                )}
                {listing.area != null && (
                  <span className="flex items-center gap-1 text-xs text-gray-500 font-medium">
                    <Maximize2 size={12} className="text-gray-400" />
                    {listing.area} m²
                  </span>
                )}
              </div>
            )}

            <div className="flex justify-between items-center pt-3 border-t border-gray-50">
              <span className="text-lg font-bold text-gray-900 font-mono">
                ₺ {listing.price.toLocaleString('tr-TR')}
              </span>
              <span className="text-xs text-gray-400 truncate max-w-[100px]">
                {listing.owner.name ?? listing.owner.email}
              </span>
            </div>
            </div>{/* /p-5 */}
          </Link>
        ))}

        {listings.length === 0 && (
          <div className="col-span-3 py-24 text-center">
            <p className="text-gray-400 text-sm">Arama kriterlerine uygun ilan bulunamadı.</p>
          </div>
        )}
      </div>
    </div>
  );
}
