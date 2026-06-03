'use client';

import { useState } from 'react';
import { LayoutGrid, Map } from 'lucide-react';
import dynamic from 'next/dynamic';

// SSR'da Leaflet çalışmaz — lazy load
const ListingsMap = dynamic(() => import('@/components/ListingsMap'), {
  ssr: false,
  loading: () => (
    <div className="h-[560px] bg-gray-50 rounded-[32px] flex items-center justify-center border border-gray-100">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-[#00C49F] border-t-transparent rounded-full animate-spin" />
        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Harita Yükleniyor...</p>
      </div>
    </div>
  ),
});

interface MapListing {
  id: string;
  title: string;
  priceAmount: number;
  location: string | null;
  propertyType: string;
  status: string;
}

interface Props {
  listings: MapListing[];
  gridComponent?: React.ReactNode;
}

export default function ListingsViewToggle({ listings, gridComponent }: Props) {
  const [view, setView] = useState<'grid' | 'map'>('grid');

  return (
    <div className="flex flex-col gap-6 col-span-9">
      {/* TOGGLE BUTTONS */}
      <div className="flex items-center bg-gray-100 rounded-full p-1 gap-1 w-fit">
        <button
          onClick={() => setView('grid')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-black transition-all ${
            view === 'grid'
              ? 'bg-white text-[#0F172A] shadow-sm'
              : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <LayoutGrid size={14} /> LİSTE
        </button>
        <button
          onClick={() => setView('map')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-black transition-all ${
            view === 'map'
              ? 'bg-white text-[#0F172A] shadow-sm'
              : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <Map size={14} /> HARİTA
        </button>
      </div>

      {/* GRID VIEW */}
      {view === 'grid' && gridComponent}

      {/* MAP VIEW */}
      {view === 'map' && <ListingsMap listings={listings} />}
    </div>
  );
}
