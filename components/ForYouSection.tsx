'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Sparkles, Building2, MapPin, ArrowRight, CheckCircle } from 'lucide-react';

interface Listing {
  id: string;
  title: string;
  price: number;
  city: string | null;
  district: string | null;
  rooms: number | null;
  area: number | null;
  listingType: string;
  propertyType: string;
  isVerified: boolean;
  photos: string[];
}

const STORAGE_KEY = 'sbd_recent_views';

export default function ForYouSection() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [city, setCity] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const recent = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
      const recentCity = recent.find((r: { city?: string }) => r.city)?.city ?? null;
      if (!recentCity) return;
      setCity(recentCity);
      fetch(`/api/listings?city=${encodeURIComponent(recentCity)}&status=ACTIVE&sort=views&limit=6`)
        .then(r => r.ok ? r.json() : null)
        .then(data => {
          if (data?.listings) setListings(data.listings.slice(0, 6));
        })
        .catch(() => {});
    } catch { /* noop */ }
  }, []);

  if (!mounted || listings.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-14">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#00C49F]" />
          <div>
            <h2 className="text-xl font-bold text-gray-900">Bana Özel</h2>
            {city && <p className="text-xs text-gray-400">{city} bölgesindeki popüler ilanlar</p>}
          </div>
        </div>
        {city && (
          <Link
            href={`/sehir/${encodeURIComponent(city)}`}
            className="text-[#00C49F] font-semibold text-sm hover:underline flex items-center gap-1"
          >
            {city} İlanları <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-200">
        {listings.map(listing => (
          <Link
            key={listing.id}
            href={`/listing/${listing.id}`}
            className="flex-shrink-0 w-60 bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg hover:border-[#00C49F]/20 transition-all group"
          >
            <div className="w-full h-36 bg-gradient-to-br from-slate-100 to-slate-200 relative overflow-hidden">
              {listing.photos[0] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={listing.photos[0]} alt={listing.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Building2 size={24} className="text-slate-300" />
                </div>
              )}
              {listing.isVerified && (
                <span className="absolute top-2 left-2 bg-white/90 text-[#00C49F] text-[9px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                  <CheckCircle size={8} /> Onaylı
                </span>
              )}
              <span className={`absolute bottom-2 left-2 text-[9px] font-bold px-2 py-0.5 rounded-full ${listing.listingType === 'KİRALIK' ? 'bg-violet-500 text-white' : 'bg-[#00C49F] text-white'}`}>
                {listing.listingType}
              </span>
            </div>
            <div className="p-3">
              <p className="text-xs font-bold text-gray-900 line-clamp-2 leading-snug mb-1 group-hover:text-[#00C49F] transition-colors">
                {listing.title}
              </p>
              {(listing.city || listing.district) && (
                <p className="flex items-center gap-1 text-[10px] text-gray-400 mb-2">
                  <MapPin size={9} />
                  {[listing.district, listing.city].filter(Boolean).join(', ')}
                </p>
              )}
              <div className="flex gap-1.5 mb-2">
                {listing.rooms != null && <span className="text-[10px] text-gray-500 bg-gray-50 px-1.5 py-0.5 rounded">{listing.rooms} oda</span>}
                {listing.area != null && <span className="text-[10px] text-gray-500 bg-gray-50 px-1.5 py-0.5 rounded">{listing.area} m²</span>}
              </div>
              <p className="text-sm font-bold text-[#00C49F]">{listing.price.toLocaleString('tr-TR')} ₺</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
