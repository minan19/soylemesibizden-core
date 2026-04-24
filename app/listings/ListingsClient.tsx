'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useState, useTransition } from 'react';
import Link from 'next/link';
import { Search, SlidersHorizontal, MapPin, ArrowRight, X } from 'lucide-react';

interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string | null;
  status: string;
  owner: { name: string | null; email: string };
}

interface Props {
  listings: Listing[];
  currentQ?: string;
  currentStatus?: string;
  currentSort?: string;
}

export default function ListingsClient({ listings, currentQ, currentStatus, currentSort }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [q, setQ] = useState(currentQ ?? '');

  const updateParams = (params: Record<string, string | undefined>) => {
    const sp = new URLSearchParams();
    if (params.q) sp.set('q', params.q);
    if (params.status && params.status !== 'ALL') sp.set('status', params.status);
    if (params.sort && params.sort !== 'newest') sp.set('sort', params.sort);
    startTransition(() => router.push(`${pathname}?${sp.toString()}`));
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
  ];

  const activeStatus = currentStatus ?? 'ALL';
  const activeSort = currentSort ?? 'newest';

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 flex flex-wrap gap-4 items-center shadow-sm">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={q}
            onChange={e => setQ(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && updateParams({ q, status: activeStatus, sort: activeSort })}
            placeholder="İlan ara... (Enter ile)"
            className="w-full pl-10 pr-10 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#00C49F] transition-colors"
          />
          {q && (
            <button onClick={() => { setQ(''); updateParams({ status: activeStatus, sort: activeSort }); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700">
              <X size={14} />
            </button>
          )}
        </div>

        {/* Status */}
        <div className="flex gap-1 bg-gray-50 rounded-xl p-1">
          {STATUS_OPTIONS.map(opt => (
            <button
              key={opt.value}
              onClick={() => updateParams({ q, status: opt.value, sort: activeSort })}
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

        {/* Sort */}
        <div className="flex gap-1 items-center">
          <SlidersHorizontal size={14} className="text-gray-400" />
          <div className="flex gap-1 bg-gray-50 rounded-xl p-1">
            {SORT_OPTIONS.map(opt => (
              <button
                key={opt.value}
                onClick={() => updateParams({ q, status: activeStatus, sort: opt.value })}
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

      {/* Grid */}
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 transition-opacity ${isPending ? 'opacity-50' : 'opacity-100'}`}>
        {listings.map(listing => (
          <Link
            key={listing.id}
            href={`/listing/${listing.id}`}
            className="group bg-white p-6 border border-gray-100 rounded-2xl hover:shadow-lg hover:border-[#00C49F]/20 transition-all"
          >
            <div className="flex justify-between items-start mb-3">
              <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wider ${
                listing.status === 'ACTIVE' ? 'bg-[#F0FDF8] text-[#00C49F]' :
                listing.status === 'SOLD' ? 'bg-gray-100 text-gray-500' :
                'bg-amber-50 text-amber-600'
              }`}>
                {listing.status === 'ACTIVE' ? 'AKTİF' : listing.status === 'SOLD' ? 'SATILDI' : 'BEKLEMEDE'}
              </span>
              <ArrowRight size={16} className="text-gray-300 group-hover:text-[#00C49F] transition-colors" />
            </div>
            <h2 className="text-base font-semibold text-gray-900 mb-1 line-clamp-1">{listing.title}</h2>
            {listing.location && (
              <p className="text-xs text-gray-400 flex items-center gap-1 mb-3">
                <MapPin size={11} /> {listing.location}
              </p>
            )}
            <p className="text-xs text-gray-500 line-clamp-2 mb-4">{listing.description}</p>
            <div className="flex justify-between items-center pt-3 border-t border-gray-50">
              <span className="text-lg font-bold text-gray-900 font-mono">
                ₺ {listing.price.toLocaleString('tr-TR')}
              </span>
              <span className="text-xs text-gray-400">{listing.owner.name ?? listing.owner.email}</span>
            </div>
          </Link>
        ))}

        {listings.length === 0 && (
          <div className="col-span-3 py-20 text-center">
            <p className="text-gray-400 text-sm">Arama kriterlerine uygun ilan bulunamadı.</p>
          </div>
        )}
      </div>
    </div>
  );
}
