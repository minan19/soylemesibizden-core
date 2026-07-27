'use client';

import { useRouter } from 'next/navigation';
import { useState, FormEvent } from 'react';
import { Search } from 'lucide-react';

interface Props {
  defaultCity?: string;
  defaultPropertyType?: string;
  defaultRooms?: string;
  defaultArea?: string;
  defaultListingType?: string;
}

const CITIES = ['İstanbul', 'Ankara', 'İzmir', 'Antalya', 'Bursa', 'Adana', 'Konya', 'Mersin'];
const PROPERTY_TYPES = ['KONUT', 'TİCARİ', 'ARAZI', 'OFİS', 'DEPO'];
const LISTING_TYPES = ['SATILIK', 'KİRALIK'];

export default function ValuationForm({
  defaultCity,
  defaultPropertyType,
  defaultRooms,
  defaultArea,
  defaultListingType,
}: Props) {
  const router = useRouter();
  const [city, setCity] = useState(defaultCity ?? '');
  const [propertyType, setPropertyType] = useState(defaultPropertyType ?? 'KONUT');
  const [rooms, setRooms] = useState(defaultRooms ?? '');
  const [area, setArea] = useState(defaultArea ?? '');
  const [listingType, setListingType] = useState(defaultListingType ?? 'SATILIK');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const sp = new URLSearchParams();
    if (city) sp.set('city', city);
    sp.set('propertyType', propertyType);
    sp.set('listingType', listingType);
    if (rooms) sp.set('rooms', rooms);
    if (area) sp.set('area', area);
    router.push(`/valuation?${sp.toString()}`);
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
      <h2 className="text-sm font-bold text-gray-800 mb-1">Mülk Bilgilerini Girin</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div>
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 block">Şehir</label>
          <input
            type="text"
            value={city}
            onChange={e => setCity(e.target.value)}
            list="valuation-cities"
            placeholder="Şehir seçin"
            className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#00C49F] bg-gray-50"
            required
          />
          <datalist id="valuation-cities">
            {CITIES.map(c => <option key={c} value={c} />)}
          </datalist>
        </div>

        <div>
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 block">Mülk Tipi</label>
          <select
            value={propertyType}
            onChange={e => setPropertyType(e.target.value)}
            className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#00C49F] bg-gray-50"
          >
            {PROPERTY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        <div>
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 block">İlan Tipi</label>
          <select
            value={listingType}
            onChange={e => setListingType(e.target.value)}
            className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#00C49F] bg-gray-50"
          >
            {LISTING_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        <div>
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 block">Oda Sayısı</label>
          <input
            type="number"
            value={rooms}
            onChange={e => setRooms(e.target.value)}
            placeholder="ör. 3"
            min="1"
            max="20"
            className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#00C49F] bg-gray-50"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 block">Alan (m²)</label>
          <input
            type="number"
            value={area}
            onChange={e => setArea(e.target.value)}
            placeholder="ör. 120"
            min="1"
            className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#00C49F] bg-gray-50"
            required
          />
        </div>

        <div className="flex items-end">
          <button
            type="submit"
            className="w-full py-2.5 bg-[#00C49F] text-white text-sm font-bold rounded-xl hover:bg-[#00a882] transition-colors flex items-center justify-center gap-2"
          >
            <Search size={14} /> Değerle
          </button>
        </div>
      </div>
    </form>
  );
}
