'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
  X,
  SlidersHorizontal,
  ChevronDown,
  RotateCcw,
} from 'lucide-react';

interface Props {
  currentQ?: string;
  currentListingType?: string;
  currentPropertyType?: string;
  currentStatus?: string;
  currentMinPrice?: string;
  currentMaxPrice?: string;
  currentMinRooms?: string;
  currentMinArea?: string;
  currentMaxArea?: string;
  currentCity?: string;
  currentSort?: string;
  currentHasElevator?: string;
  currentHasParking?: string;
  currentHasGarden?: string;
}

const PROPERTY_TYPES = [
  { label: 'Konut', value: 'KONUT' },
  { label: 'Ticari', value: 'TİCARİ' },
  { label: 'Arazi', value: 'ARAZI' },
  { label: 'Ofis', value: 'OFİS' },
  { label: 'Depo', value: 'DEPO' },
];

const ROOMS_OPTIONS = [
  { label: '1+', value: '1' },
  { label: '2+', value: '2' },
  { label: '3+', value: '3' },
  { label: '4+', value: '4' },
  { label: '5+', value: '5' },
];

const SORT_OPTIONS = [
  { label: 'En Yeni', value: 'newest' },
  { label: 'Fiyat (Artan)', value: 'price_asc' },
  { label: 'Fiyat (Azalan)', value: 'price_desc' },
  { label: 'Alan (Artan)', value: 'area_asc' },
];

export default function SearchFilterSidebar({
  currentQ,
  currentListingType,
  currentPropertyType,
  currentStatus,
  currentMinPrice,
  currentMaxPrice,
  currentMinRooms,
  currentMinArea,
  currentMaxArea,
  currentCity,
  currentSort,
  currentHasElevator,
  currentHasParking,
  currentHasGarden,
}: Props) {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Local filter state — initialised from current URL params
  const [q, setQ] = useState(currentQ ?? '');
  const [listingType, setListingType] = useState(currentListingType ?? 'ALL');
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState<string[]>(
    currentPropertyType && currentPropertyType !== 'ALL'
      ? currentPropertyType.split(',').filter(Boolean)
      : [],
  );
  const [status, setStatus] = useState(currentStatus ?? 'ALL');
  const [priceMin, setPriceMin] = useState(currentMinPrice ?? '');
  const [priceMax, setPriceMax] = useState(currentMaxPrice ?? '');
  const [minRooms, setMinRooms] = useState(currentMinRooms ?? '');
  const [areaMin, setAreaMin] = useState(currentMinArea ?? '');
  const [areaMax, setAreaMax] = useState(currentMaxArea ?? '');
  const [city, setCity] = useState(currentCity ?? '');
  const [sort, setSort] = useState(currentSort ?? 'newest');
  const [hasElevator, setHasElevator] = useState(currentHasElevator === 'true');
  const [hasParking, setHasParking] = useState(currentHasParking === 'true');
  const [hasGarden, setHasGarden] = useState(currentHasGarden === 'true');

  const togglePropertyType = (value: string) => {
    setSelectedPropertyTypes(prev =>
      prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value],
    );
  };

  const applyFilters = () => {
    const sp = new URLSearchParams();
    if (q) sp.set('q', q);
    if (listingType !== 'ALL') sp.set('listingType', listingType);
    if (selectedPropertyTypes.length > 0) sp.set('propertyType', selectedPropertyTypes.join(','));
    if (status !== 'ALL') sp.set('status', status);
    if (priceMin) sp.set('minPrice', priceMin);
    if (priceMax) sp.set('maxPrice', priceMax);
    if (minRooms) sp.set('minRooms', minRooms);
    if (areaMin) sp.set('minArea', areaMin);
    if (areaMax) sp.set('maxArea', areaMax);
    if (city) sp.set('city', city);
    if (sort !== 'newest') sp.set('sort', sort);
    if (hasElevator) sp.set('hasElevator', 'true');
    if (hasParking) sp.set('hasParking', 'true');
    if (hasGarden) sp.set('hasGarden', 'true');
    startTransition(() => router.push(`/search?${sp.toString()}`));
    setMobileOpen(false);
  };

  const clearFilters = () => {
    setQ('');
    setListingType('ALL');
    setSelectedPropertyTypes([]);
    setStatus('ALL');
    setPriceMin('');
    setPriceMax('');
    setMinRooms('');
    setAreaMin('');
    setAreaMax('');
    setCity('');
    setSort('newest');
    setHasElevator(false);
    setHasParking(false);
    setHasGarden(false);
    startTransition(() => router.push('/search'));
    setMobileOpen(false);
  };

  const hasActiveFilters =
    q ||
    listingType !== 'ALL' ||
    selectedPropertyTypes.length > 0 ||
    status !== 'ALL' ||
    priceMin ||
    priceMax ||
    minRooms ||
    areaMin ||
    areaMax ||
    city ||
    sort !== 'newest' ||
    hasElevator ||
    hasParking ||
    hasGarden;

  const panel = (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-5 shadow-sm">

      {/* ── Text search ──────────────────────────────── */}
      <div className="relative">
        <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={q}
          onChange={e => setQ(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && applyFilters()}
          placeholder="İlan başlığı, açıklama..."
          className="w-full pl-10 pr-9 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#00C49F] transition-colors"
        />
        {q && (
          <button
            onClick={() => setQ('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
          >
            <X size={13} />
          </button>
        )}
      </div>

      {/* ── Listing type ─────────────────────────────── */}
      <div>
        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
          İlan Tipi
        </p>
        <div className="flex gap-1.5">
          {[
            { label: 'Tümü', value: 'ALL' },
            { label: 'Satılık', value: 'SATILIK' },
            { label: 'Kiralık', value: 'KİRALIK' },
          ].map(opt => (
            <button
              key={opt.value}
              onClick={() => setListingType(opt.value)}
              className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
                listingType === opt.value
                  ? 'bg-[#00C49F] text-white'
                  : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Property type ────────────────────────────── */}
      <div>
        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
          Mülk Tipi
        </p>
        <div className="grid grid-cols-2 gap-1.5">
          {PROPERTY_TYPES.map(pt => (
            <label
              key={pt.value}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl border cursor-pointer transition-all text-xs font-medium ${
                selectedPropertyTypes.includes(pt.value)
                  ? 'bg-[#00C49F]/10 border-[#00C49F] text-[#00C49F]'
                  : 'bg-white border-gray-200 text-gray-500 hover:border-[#00C49F]/40'
              }`}
            >
              <input
                type="checkbox"
                className="sr-only"
                checked={selectedPropertyTypes.includes(pt.value)}
                onChange={() => togglePropertyType(pt.value)}
              />
              <span
                className={`w-3.5 h-3.5 rounded flex items-center justify-center shrink-0 border ${
                  selectedPropertyTypes.includes(pt.value)
                    ? 'bg-[#00C49F] border-[#00C49F]'
                    : 'border-gray-300'
                }`}
              >
                {selectedPropertyTypes.includes(pt.value) && (
                  <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                    <path d="M1 3l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </span>
              {pt.label}
            </label>
          ))}
        </div>
      </div>

      {/* ── Price range ──────────────────────────────── */}
      <div>
        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
          Fiyat Aralığı (₺)
        </p>
        <div className="flex gap-2 items-center">
          <input
            type="number"
            value={priceMin}
            onChange={e => setPriceMin(e.target.value)}
            placeholder="Min"
            className="flex-1 min-w-0 px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#00C49F] transition-colors"
          />
          <span className="text-gray-300 text-sm shrink-0">—</span>
          <input
            type="number"
            value={priceMax}
            onChange={e => setPriceMax(e.target.value)}
            placeholder="Maks"
            className="flex-1 min-w-0 px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#00C49F] transition-colors"
          />
        </div>
      </div>

      {/* ── Min rooms ────────────────────────────────── */}
      <div>
        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
          Min. Oda Sayısı
        </p>
        <div className="flex gap-1.5">
          <button
            onClick={() => setMinRooms('')}
            className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
              minRooms === ''
                ? 'bg-[#00C49F] text-white'
                : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
            }`}
          >
            Tümü
          </button>
          {ROOMS_OPTIONS.map(opt => (
            <button
              key={opt.value}
              onClick={() => setMinRooms(opt.value)}
              className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
                minRooms === opt.value
                  ? 'bg-[#00C49F] text-white'
                  : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Area range ───────────────────────────────── */}
      <div>
        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
          Alan Aralığı (m²)
        </p>
        <div className="flex gap-2 items-center">
          <input
            type="number"
            value={areaMin}
            onChange={e => setAreaMin(e.target.value)}
            placeholder="Min"
            className="flex-1 min-w-0 px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#00C49F] transition-colors"
          />
          <span className="text-gray-300 text-sm shrink-0">—</span>
          <input
            type="number"
            value={areaMax}
            onChange={e => setAreaMax(e.target.value)}
            placeholder="Maks"
            className="flex-1 min-w-0 px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#00C49F] transition-colors"
          />
        </div>
      </div>

      {/* ── City ─────────────────────────────────────── */}
      <div>
        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
          Şehir
        </p>
        <input
          type="text"
          value={city}
          onChange={e => setCity(e.target.value)}
          placeholder="Örn: İstanbul, Ankara..."
          className="w-full px-3 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#00C49F] transition-colors"
        />
      </div>

      {/* ── Features ─────────────────────────────────── */}
      <div>
        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
          Özellikler
        </p>
        <div className="space-y-2">
          {[
            { label: 'Asansör', state: hasElevator, set: setHasElevator },
            { label: 'Otopark', state: hasParking, set: setHasParking },
            { label: 'Bahçe', state: hasGarden, set: setHasGarden },
          ].map(feat => (
            <label
              key={feat.label}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <span
                className={`w-4 h-4 rounded border shrink-0 flex items-center justify-center transition-all ${
                  feat.state
                    ? 'bg-[#00C49F] border-[#00C49F]'
                    : 'border-gray-300 group-hover:border-[#00C49F]'
                }`}
              >
                {feat.state && (
                  <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                    <path d="M1 3l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </span>
              <input
                type="checkbox"
                className="sr-only"
                checked={feat.state}
                onChange={e => feat.set(e.target.checked)}
              />
              <span className="text-sm text-gray-600">{feat.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* ── Sort ─────────────────────────────────────── */}
      <div>
        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
          Sıralama
        </p>
        <div className="relative">
          <SlidersHorizontal
            size={13}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            className="w-full appearance-none pl-8 pr-8 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#00C49F] transition-colors cursor-pointer"
          >
            {SORT_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown
            size={13}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
        </div>
      </div>

      {/* ── Action buttons ───────────────────────────── */}
      <div className="flex gap-2 pt-1">
        <button
          onClick={applyFilters}
          className="flex-1 py-2.5 text-sm font-semibold bg-[#00C49F] hover:bg-[#00a882] text-white rounded-xl transition-colors"
        >
          Ara
        </button>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl transition-colors"
          >
            <RotateCcw size={13} />
            Temizle
          </button>
        )}
      </div>
    </div>
  );

  return (
    <aside className="lg:w-72 lg:shrink-0">
      {/* Mobile toggle ────────────────────── */}
      <button
        className="lg:hidden w-full flex items-center justify-between bg-white rounded-2xl border border-gray-100 px-4 py-3 mb-3 shadow-sm text-sm font-semibold text-gray-700"
        onClick={() => setMobileOpen(prev => !prev)}
      >
        <span className="flex items-center gap-2">
          <SlidersHorizontal size={15} className="text-[#00C49F]" />
          Filtreler
          {hasActiveFilters && (
            <span className="w-2 h-2 rounded-full bg-[#00C49F]" />
          )}
        </span>
        <ChevronDown
          size={16}
          className={`text-gray-400 transition-transform ${mobileOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Desktop: always visible. Mobile: collapsible. */}
      <div className={`${mobileOpen ? 'block' : 'hidden'} lg:block`}>
        {panel}
      </div>
    </aside>
  );
}
