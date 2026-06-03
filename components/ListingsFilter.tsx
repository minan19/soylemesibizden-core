'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useCallback } from 'react';
import { Search, X } from 'lucide-react';

interface ListingsFilterProps {
  currentQ: string;
  currentType: string;
  currentSort: string;
  currentMinPrice: number;
  currentMaxPrice: number;
  propertyTypes: string[];
}

const SORT_OPTIONS = [
  { label: 'En Yeni', value: 'newest' },
  { label: 'Fiyat ↑', value: 'price_asc' },
  { label: 'Fiyat ↓', value: 'price_desc' },
];

const TYPE_LABELS: Record<string, string> = {
  RESIDENTIAL: 'Konut',
  COMMERCIAL: 'Ticari',
  LAND: 'Arazi',
  INDUSTRIAL: 'Endüstriyel',
};

export default function ListingsFilter({
  currentQ,
  currentType,
  currentSort,
  currentMinPrice,
  currentMaxPrice,
  propertyTypes,
}: ListingsFilterProps) {
  const router = useRouter();
  const pathname = usePathname();

  const update = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams();
      if (currentQ) params.set('q', currentQ);
      if (currentType) params.set('type', currentType);
      if (currentSort !== 'newest') params.set('sort', currentSort);
      if (currentMinPrice > 0) params.set('minPrice', String(currentMinPrice));
      if (currentMaxPrice > 0) params.set('maxPrice', String(currentMaxPrice));

      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }

      router.push(`${pathname}?${params.toString()}`);
    },
    [currentQ, currentType, currentSort, currentMinPrice, currentMaxPrice, pathname, router]
  );

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const input = form.elements.namedItem('q') as HTMLInputElement;
    update('q', input.value);
  };

  const clearAll = () => {
    router.push(pathname);
  };

  const hasFilters = currentQ || currentType || currentSort !== 'newest' || currentMinPrice > 0 || currentMaxPrice > 0;

  return (
    <div className="space-y-7">
      {/* SEARCH */}
      <form onSubmit={handleSearch}>
        <p className="text-[10px] font-black tracking-widest text-gray-400 uppercase mb-3">Arama</p>
        <div className="relative">
          <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
          <input
            name="q"
            type="text"
            defaultValue={currentQ}
            placeholder="İlan adı..."
            className="w-full pl-9 pr-4 py-3 text-[12px] font-semibold bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-[#00C49F]/40 focus:bg-white transition-all"
          />
        </div>
      </form>

      {/* SORT */}
      <div>
        <p className="text-[10px] font-black tracking-widest text-gray-400 uppercase mb-3">Sıralama</p>
        <div className="space-y-1">
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => update('sort', opt.value)}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-[12px] font-semibold transition-all ${
                currentSort === opt.value
                  ? 'bg-[#F0FDF8] text-[#00C49F] font-bold'
                  : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* PROPERTY TYPE */}
      <div>
        <p className="text-[10px] font-black tracking-widest text-gray-400 uppercase mb-3">Varlık Tipi</p>
        <div className="space-y-1">
          <button
            onClick={() => update('type', '')}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-[12px] font-semibold transition-all ${
              !currentType
                ? 'bg-[#F0FDF8] text-[#00C49F] font-bold'
                : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            Tümü
          </button>
          {propertyTypes.map((t) => (
            <button
              key={t}
              onClick={() => update('type', t)}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-[12px] font-semibold transition-all ${
                currentType === t
                  ? 'bg-[#F0FDF8] text-[#00C49F] font-bold'
                  : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              {TYPE_LABELS[t] ?? t}
            </button>
          ))}
        </div>
      </div>

      {/* PRICE RANGE */}
      <div>
        <p className="text-[10px] font-black tracking-widest text-gray-400 uppercase mb-3">
          Fiyat Aralığı (₺)
        </p>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            placeholder="Min"
            defaultValue={currentMinPrice > 0 ? currentMinPrice : ''}
            onChange={(e) => update('minPrice', e.target.value)}
            className="w-full px-3 py-2.5 text-[12px] font-semibold bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-[#00C49F]/40 transition-all"
          />
          <input
            type="number"
            placeholder="Max"
            defaultValue={currentMaxPrice > 0 ? currentMaxPrice : ''}
            onChange={(e) => update('maxPrice', e.target.value)}
            className="w-full px-3 py-2.5 text-[12px] font-semibold bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-[#00C49F]/40 transition-all"
          />
        </div>
      </div>

      {/* CLEAR FILTERS */}
      {hasFilters && (
        <button
          onClick={clearAll}
          className="w-full flex items-center justify-center gap-2 py-3 border border-red-100 text-red-400 text-[11px] font-bold rounded-2xl hover:bg-red-50 transition-all"
        >
          <X size={14} /> Filtreleri Temizle
        </button>
      )}
    </div>
  );
}
