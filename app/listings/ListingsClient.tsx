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
  Eye,
  Layers,
  ExternalLink,
  LayoutGrid,
  List,
} from 'lucide-react';
import CompareButton from '@/components/CompareButton';

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
  views: number;
  createdAt: Date | string;
  owner: { name: string | null; email: string };
  _count?: { favorites: number };
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
  currentMinArea?: string;
  currentMaxArea?: string;
  currentCity?: string;
  currentNeighborhood?: string;
  currentHasElevator?: string;
  currentHasParking?: string;
  currentHasGarden?: string;
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
  { label: 'Favoriler', value: 'favored' },
  { label: 'Teklif', value: 'offers' },
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
  currentMinArea,
  currentMaxArea,
  currentCity,
  currentNeighborhood,
  currentHasElevator,
  currentHasParking,
  currentHasGarden,
  hideFilters = false,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const [q, setQ] = useState(currentQ ?? '');
  const [priceMin, setPriceMin] = useState(currentMinPrice ?? '');
  const [priceMax, setPriceMax] = useState(currentMaxPrice ?? '');
  const [areaMin, setAreaMin] = useState(currentMinArea ?? '');
  const [areaMax, setAreaMax] = useState(currentMaxArea ?? '');
  const [quickView, setQuickView] = useState<Listing | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

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
      minArea: areaMin || undefined,
      maxArea: areaMax || undefined,
      city: currentCity || undefined,
      neighborhood: currentNeighborhood || undefined,
      hasElevator: currentHasElevator || undefined,
      hasParking: currentHasParking || undefined,
      hasGarden: currentHasGarden || undefined,
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

          {/* Row 3b — neighborhood filter (visible only when a city is selected) */}
          {currentCity && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400 font-medium shrink-0">Mahalle:</span>
              <input
                type="text"
                defaultValue={currentNeighborhood ?? ''}
                placeholder="Mahalle adı…"
                className="w-44 px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#00C49F] transition-colors"
                onKeyDown={e => {
                  if (e.key === 'Enter') push({ neighborhood: (e.currentTarget.value || undefined) });
                }}
              />
              {currentNeighborhood && (
                <button
                  onClick={() => push({ neighborhood: undefined })}
                  className="text-xs text-gray-400 hover:text-red-500 transition-colors"
                >
                  ✕
                </button>
              )}
            </div>
          )}

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

          {/* Row 4b — area filter */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-gray-400 font-medium shrink-0">Alan (m²):</span>
            <input
              type="number"
              value={areaMin}
              onChange={e => setAreaMin(e.target.value)}
              placeholder="Min"
              className="w-24 px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#00C49F] transition-colors"
            />
            <span className="text-gray-300">—</span>
            <input
              type="number"
              value={areaMax}
              onChange={e => setAreaMax(e.target.value)}
              placeholder="Maks"
              className="w-24 px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#00C49F] transition-colors"
            />
            <button
              onClick={() => push({ minArea: areaMin || undefined, maxArea: areaMax || undefined })}
              className="px-3 py-2 text-xs font-semibold bg-[#00C49F] hover:bg-[#00a882] text-white rounded-xl transition-colors"
            >
              Uygula
            </button>
            {(areaMin || areaMax) && (
              <button onClick={() => { setAreaMin(''); setAreaMax(''); push({ minArea: undefined, maxArea: undefined }); }} className="text-gray-400 hover:text-gray-700">
                <X size={14} />
              </button>
            )}
          </div>

          {/* Row 5 — amenities */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs text-gray-400 font-medium shrink-0">Özellik:</span>
            {[
              { key: 'hasElevator', label: 'Asansör', active: currentHasElevator === '1' },
              { key: 'hasParking', label: 'Otopark', active: currentHasParking === '1' },
              { key: 'hasGarden', label: 'Bahçe', active: currentHasGarden === '1' },
            ].map(f => (
              <button
                key={f.key}
                onClick={() => push({ [f.key]: f.active ? undefined : '1' })}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                  f.active
                    ? 'bg-[#00C49F] text-white border-[#00C49F]'
                    : 'bg-white text-gray-500 border-gray-200 hover:border-[#00C49F]/50'
                }`}
              >
                {f.label}
              </button>
            ))}
            {(currentHasElevator || currentHasParking || currentHasGarden) && (
              <button
                onClick={() => push({ hasElevator: undefined, hasParking: undefined, hasGarden: undefined })}
                className="text-xs text-gray-400 hover:text-gray-700 flex items-center gap-1"
              >
                <X size={12} /> Temizle
              </button>
            )}
          </div>
        </div>
      )}

      {/* ── Active filter chips ───────────────────────────────────────── */}
      {(() => {
        const chips: Array<{ label: string; clearKey: Record<string, undefined> }> = [];
        if (currentQ) chips.push({ label: `"${currentQ}"`, clearKey: { q: undefined } });
        if (currentCity) chips.push({ label: currentCity, clearKey: { city: undefined } });
        if (currentNeighborhood) chips.push({ label: currentNeighborhood, clearKey: { neighborhood: undefined } });
        if (activeListingType !== 'ALL') chips.push({ label: activeListingType, clearKey: { listingType: undefined } });
        if (activePropertyType !== 'ALL') chips.push({ label: activePropertyType, clearKey: { propertyType: undefined } });
        if (activeMinRooms) chips.push({ label: `${activeMinRooms}+ oda`, clearKey: { minRooms: undefined } });
        if (priceMin || priceMax) chips.push({ label: `${priceMin || '0'} – ${priceMax || '∞'} ₺`, clearKey: { minPrice: undefined, maxPrice: undefined } });
        if (areaMin || areaMax) chips.push({ label: `${areaMin || '0'} – ${areaMax || '∞'} m²`, clearKey: { minArea: undefined, maxArea: undefined } });
        if (currentHasElevator === '1') chips.push({ label: 'Asansör', clearKey: { hasElevator: undefined } });
        if (currentHasParking === '1') chips.push({ label: 'Otopark', clearKey: { hasParking: undefined } });
        if (currentHasGarden === '1') chips.push({ label: 'Bahçe', clearKey: { hasGarden: undefined } });
        if (chips.length === 0) return null;
        return (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-gray-400 font-medium">Aktif filtreler:</span>
            {chips.map((chip, i) => (
              <button
                key={i}
                onClick={() => push(chip.clearKey as Record<string, string | undefined>)}
                className="flex items-center gap-1.5 px-3 py-1 bg-[#00C49F]/10 text-[#00C49F] text-xs font-semibold rounded-full border border-[#00C49F]/30 hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-colors"
              >
                {chip.label} <X size={11} />
              </button>
            ))}
            <button
              onClick={() => push({
                q: undefined, city: undefined, neighborhood: undefined,
                listingType: undefined, propertyType: undefined, minRooms: undefined,
                minPrice: undefined, maxPrice: undefined, minArea: undefined, maxArea: undefined,
                hasElevator: undefined, hasParking: undefined, hasGarden: undefined,
              })}
              className="text-xs text-gray-400 hover:text-gray-700 font-semibold underline transition-colors"
            >
              Tümünü temizle
            </button>
          </div>
        );
      })()}

      {/* ── View toggle ───────────────────────────────────────────────── */}
      <div className="flex items-center justify-end gap-1">
        <button
          onClick={() => setViewMode('grid')}
          className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-[#00C49F] text-white' : 'bg-white border border-gray-200 text-gray-400 hover:text-gray-700'}`}
          title="Izgara görünümü"
        >
          <LayoutGrid size={15} />
        </button>
        <button
          onClick={() => setViewMode('list')}
          className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-[#00C49F] text-white' : 'bg-white border border-gray-200 text-gray-400 hover:text-gray-700'}`}
          title="Liste görünümü"
        >
          <List size={15} />
        </button>
      </div>

      {/* ── Listing grid / list ───────────────────────────────────────── */}
      <div
        className={`${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5' : 'flex flex-col gap-3'} transition-opacity duration-200 ${
          isPending ? 'opacity-40 pointer-events-none' : 'opacity-100'
        }`}
      >
        {listings.map(listing => (
          viewMode === 'list' ? (
            /* List view card */
            <div key={listing.id} className="relative group bg-white border border-gray-100 rounded-2xl hover:shadow-md hover:border-[#00C49F]/20 transition-all overflow-hidden flex">
              <Link href={`/listing/${listing.id}`} className="flex flex-1 min-w-0">
                {/* Thumbnail */}
                <div className="w-28 sm:w-40 h-28 flex-shrink-0 bg-gradient-to-br from-slate-100 to-slate-200 relative overflow-hidden">
                  {listing.photos.length > 0 ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={listing.photos[0]} alt={listing.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center"><Building2 size={22} className="text-slate-300" /></div>
                  )}
                  {listing.isVerified && (
                    <span className="absolute top-1 left-1 bg-white/90 text-[#00C49F] text-[9px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                      <CheckCircle2 size={8} /> Onaylı
                    </span>
                  )}
                </div>
                {/* Content */}
                <div className="flex-1 p-4 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${STATUS_COLOR[listing.status] ?? 'bg-gray-100 text-gray-500'}`}>{STATUS_LABEL[listing.status] ?? listing.status}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${LISTING_TYPE_COLOR[listing.listingType] ?? 'bg-gray-100 text-gray-600'}`}>{listing.listingType}</span>
                      <span className="text-[10px] text-gray-400 font-medium">{listing.propertyType}</span>
                    </div>
                    <h2 className="text-sm font-bold text-gray-900 line-clamp-1 group-hover:text-[#00C49F] transition-colors">{listing.title}</h2>
                    {(listing.location || listing.city) && (
                      <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                        <MapPin size={9} className="shrink-0" />
                        {listing.location ?? listing.city}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center justify-between mt-2 flex-wrap gap-2">
                    <div className="flex gap-3">
                      {listing.rooms != null && <span className="text-xs text-gray-500">{listing.rooms} oda</span>}
                      {listing.area != null && <span className="text-xs text-gray-500">{listing.area} m²</span>}
                      {listing.views > 0 && <span className="text-xs text-gray-400">{listing.views} 👁</span>}
                    </div>
                    <span className="text-base font-bold text-gray-900 font-mono">₺ {listing.price.toLocaleString('tr-TR')}</span>
                  </div>
                </div>
              </Link>
              <div className="flex items-center pr-3 shrink-0">
                <CompareButton listingId={listing.id} />
              </div>
            </div>
          ) : (
          <div key={listing.id} className="relative group">
          <Link
            href={`/listing/${listing.id}`}
            className="block bg-white border border-gray-100 rounded-2xl hover:shadow-lg hover:border-[#00C49F]/20 transition-all overflow-hidden"
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
              {!listing.isVerified && new Date().getTime() - new Date(listing.createdAt).getTime() < 3 * 24 * 60 * 60 * 1000 && (
                <span className="absolute top-2 right-2 bg-amber-400 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                  YENİ
                </span>
              )}
              {/* Quick view hover button */}
              <button
                onClick={e => { e.preventDefault(); setQuickView(listing); }}
                className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/10 transition-colors"
              >
                <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 text-gray-800 text-xs font-bold px-3 py-1.5 rounded-full shadow flex items-center gap-1.5">
                  <Eye size={12} /> Hızlı Bak
                </span>
              </button>
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
              <div className="flex items-center gap-2 text-xs text-gray-400">
                {listing.views > 0 && (
                  <span>{listing.views.toLocaleString('tr-TR')} 👁</span>
                )}
                {(listing._count?.favorites ?? 0) > 0 && (
                  <span>{listing._count!.favorites} ♡</span>
                )}
              </div>
            </div>
            </div>{/* /p-5 */}
          </Link>
          <div className="absolute bottom-4 right-4 z-10">
            <CompareButton listingId={listing.id} />
          </div>
          </div>
          ) /* end grid view card */
        ))}

        {listings.length === 0 && (
          <div className="col-span-3 py-24 text-center">
            <Building2 className="w-12 h-12 text-gray-200 mx-auto mb-4" />
            <p className="text-gray-600 font-semibold text-base mb-1">Sonuç bulunamadı</p>
            <p className="text-gray-400 text-sm mb-6">Arama kriterlerinize uygun ilan mevcut değil.</p>
            <a href="/listings" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#00C49F] text-white text-sm font-bold rounded-xl hover:bg-[#00a882] transition-colors">
              Tüm İlanları Gör
            </a>
          </div>
        )}
      </div>

      {/* ── Quick View Modal ──────────────────────────────────────────── */}
      {quickView && (
        <div
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
          onClick={() => setQuickView(null)}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Photo */}
            <div className="relative w-full h-56 bg-gradient-to-br from-slate-100 to-slate-200">
              {quickView.photos.length > 0 ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={quickView.photos[0]} alt={quickView.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Building2 size={40} className="text-slate-300" />
                </div>
              )}
              <button
                onClick={() => setQuickView(null)}
                className="absolute top-3 right-3 bg-white/90 hover:bg-white rounded-full p-1.5 shadow text-gray-600 hover:text-gray-900 transition-colors"
              >
                <X size={16} />
              </button>
              <div className="absolute bottom-3 left-3 flex gap-1.5">
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${STATUS_COLOR[quickView.status] ?? 'bg-gray-100 text-gray-500'}`}>
                  {STATUS_LABEL[quickView.status] ?? quickView.status}
                </span>
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${LISTING_TYPE_COLOR[quickView.listingType] ?? 'bg-gray-100 text-gray-600'}`}>
                  {quickView.listingType}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{quickView.propertyType}</p>
                <h3 className="text-lg font-bold text-gray-900 leading-snug mb-1">{quickView.title}</h3>
                {(quickView.location || quickView.city) && (
                  <p className="text-xs text-gray-400 flex items-center gap-1">
                    <MapPin size={11} />
                    {quickView.location ?? quickView.city}
                  </p>
                )}
              </div>

              {/* Key specs */}
              <div className="flex flex-wrap gap-3">
                {quickView.rooms != null && (
                  <span className="flex items-center gap-1.5 text-xs text-gray-600 bg-gray-50 px-3 py-1.5 rounded-xl font-medium">
                    <Bed size={12} className="text-gray-400" /> {quickView.rooms} oda
                  </span>
                )}
                {quickView.area != null && (
                  <span className="flex items-center gap-1.5 text-xs text-gray-600 bg-gray-50 px-3 py-1.5 rounded-xl font-medium">
                    <Maximize2 size={12} className="text-gray-400" /> {quickView.area} m²
                  </span>
                )}
                {quickView.views > 0 && (
                  <span className="flex items-center gap-1.5 text-xs text-gray-400 bg-gray-50 px-3 py-1.5 rounded-xl font-medium">
                    <Eye size={12} /> {quickView.views.toLocaleString('tr-TR')}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-sm text-gray-500 line-clamp-3 leading-relaxed">{quickView.description}</p>

              {/* Price + CTA */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div>
                  <p className="text-2xl font-bold text-[#00C49F]">
                    {quickView.price.toLocaleString('tr-TR')} ₺
                  </p>
                  {quickView.area && quickView.area > 0 && (
                    <p className="text-xs text-gray-400 mt-0.5">
                      {Math.round(quickView.price / quickView.area).toLocaleString('tr-TR')} ₺/m²
                    </p>
                  )}
                </div>
                <Link
                  href={`/listing/${quickView.id}`}
                  className="flex items-center gap-2 px-5 py-2.5 bg-[#00C49F] hover:bg-[#00a882] text-white text-sm font-bold rounded-xl transition-colors"
                >
                  <ExternalLink size={14} /> İlana Git
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
