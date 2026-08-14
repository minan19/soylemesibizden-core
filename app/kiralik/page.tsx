import prisma from '@/lib/prisma';
import Link from 'next/link';
import { Metadata } from 'next';
import {
  Key, MapPin, Bed, Maximize2, ArrowRight, CheckCircle2,
  Building2, Home, Search, Star,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Kiralık Ev ve Daireler | Söylemesi Bizden',
  description: 'Türkiye\'de kiralık ev, daire, ofis ve ticari alan ilanları. Şehir bazlı kiralık konut araması.',
};

const CITIES = ['İstanbul', 'Ankara', 'İzmir', 'Antalya', 'Bursa', 'Bodrum', 'Adana', 'Mersin'];

function avg(arr: number[]) {
  return arr.length > 0 ? Math.round(arr.reduce((a, b) => a + b, 0) / arr.length) : 0;
}

export default async function KiralikPage() {
  const where = { status: 'ACTIVE' as const, listingType: 'KİRALIK' };

  const [listings, totalCount, cityStats, priceRanges, propertyTypes] = await Promise.all([
    prisma.listing.findMany({
      where,
      orderBy: [{ isVerified: 'desc' }, { views: 'desc' }],
      take: 12,
      select: {
        id: true, title: true, price: true, city: true, district: true, neighborhood: true,
        rooms: true, area: true, isVerified: true, photos: true, propertyType: true,
        createdAt: true, hasElevator: true, hasParking: true, hasGarden: true,
      },
    }),
    prisma.listing.count({ where }),
    prisma.listing.groupBy({
      by: ['city'],
      where: { ...where, city: { in: CITIES } },
      _count: true,
      _avg: { price: true },
      _min: { price: true },
      orderBy: { _count: { city: 'desc' } },
    }),
    prisma.listing.groupBy({
      by: ['rooms'],
      where: { ...where, rooms: { not: null } },
      _count: true,
      _avg: { price: true },
      orderBy: { _count: { rooms: 'desc' } },
    }),
    prisma.listing.groupBy({
      by: ['propertyType'],
      where,
      _count: true,
      _avg: { price: true },
      orderBy: { _count: { propertyType: 'desc' } },
    }),
  ]);

  const cityMap = new Map(cityStats.map(c => [c.city, c]));
  const allKiralikPrices: number[] = [];
  for (const c of cityStats) if (c._avg.price) allKiralikPrices.push(c._avg.price);

  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      {/* Hero */}
      <section className="bg-gradient-to-br from-violet-900 via-violet-800 to-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="flex items-center gap-2 bg-violet-500/20 border border-violet-400/30 text-violet-200 text-xs font-bold px-4 py-1.5 rounded-full w-fit mb-5">
            <Key size={12} /> {totalCount.toLocaleString('tr-TR')} Kiralık İlan
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">
            Kiralık Ev &amp; Daireler
          </h1>
          <p className="text-violet-200 text-sm max-w-xl leading-relaxed mb-6">
            Türkiye genelinde binlerce doğrulanmış kiralık konut, ofis ve ticari alan.
            Şehir, oda sayısı ve bütçenize göre filtreleyin.
          </p>

          {/* City quick filters */}
          <div className="flex flex-wrap gap-2">
            {CITIES.map(city => {
              const g = cityMap.get(city);
              return (
                <Link
                  key={city}
                  href={`/listings?listingType=KİRALIK&city=${encodeURIComponent(city)}`}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-xs font-semibold transition-colors"
                >
                  {city}
                  {g && <span className="text-[9px] bg-violet-400/30 px-1.5 py-0.5 rounded-full">{g._count}</span>}
                </Link>
              );
            })}
            <Link
              href="/listings?listingType=KİRALIK"
              className="flex items-center gap-1 px-3 py-1.5 bg-white text-violet-800 rounded-full text-xs font-bold"
            >
              <Search size={11} /> Tümünü Ara
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">

        {/* Price overview by city */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {cityStats.slice(0, 4).map(c => (
            <Link
              key={c.city}
              href={`/listings?listingType=KİRALIK&city=${encodeURIComponent(c.city ?? '')}`}
              className="group bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md hover:border-violet-200 transition-all"
            >
              <div className="flex items-center gap-1.5 mb-2">
                <MapPin size={12} className="text-violet-500" />
                <span className="text-sm font-bold text-gray-800 group-hover:text-violet-700 transition-colors">{c.city}</span>
              </div>
              <p className="text-xs text-gray-400">{c._count} ilan</p>
              {c._avg.price && (
                <p className="text-sm font-black text-gray-900 mt-1 font-mono">
                  ₺{Math.round(c._avg.price).toLocaleString('tr-TR')}<span className="text-xs font-normal text-gray-400">/ay</span>
                </p>
              )}
              {c._min.price && (
                <p className="text-[10px] text-violet-500 font-semibold">Min: ₺{c._min.price!.toLocaleString('tr-TR')}</p>
              )}
            </Link>
          ))}
        </div>

        {/* Price by room type */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Bed size={15} className="text-violet-500" /> Oda Sayısına Göre Ortalama Kira
          </h2>
          <div className="flex flex-wrap gap-3">
            {priceRanges.filter(r => r.rooms != null && r._avg.price).slice(0, 6).map(r => (
              <Link
                key={r.rooms}
                href={`/listings?listingType=KİRALIK&minRooms=${r.rooms}`}
                className="group flex flex-col items-center justify-center p-4 bg-gray-50 hover:bg-violet-50 border border-gray-100 hover:border-violet-200 rounded-2xl min-w-[90px] transition-all"
              >
                <span className="text-lg font-black text-gray-800 group-hover:text-violet-700">{r.rooms}+</span>
                <span className="text-[9px] text-gray-400 font-medium mb-1">Oda</span>
                <span className="text-xs font-bold text-violet-600">
                  ₺{Math.round(r._avg.price!).toLocaleString('tr-TR')}
                </span>
                <span className="text-[9px] text-gray-400">{r._count} ilan</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Property type breakdown */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Building2 size={15} className="text-violet-500" /> Mülk Türüne Göre
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {propertyTypes.slice(0, 5).map(pt => (
              <Link
                key={pt.propertyType}
                href={`/listings?listingType=KİRALIK&propertyType=${encodeURIComponent(pt.propertyType)}`}
                className="group p-3 bg-gray-50 hover:bg-violet-50 border border-transparent hover:border-violet-200 rounded-xl transition-all text-center"
              >
                <p className="text-sm font-bold text-gray-800 group-hover:text-violet-700 transition-colors">{pt.propertyType}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">{pt._count} ilan</p>
                {pt._avg.price && (
                  <p className="text-[10px] text-violet-500 font-semibold mt-0.5">
                    ₺{Math.round(pt._avg.price).toLocaleString('tr-TR')}/ay
                  </p>
                )}
              </Link>
            ))}
          </div>
        </div>

        {/* Featured Rentals */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2">
              <Star size={15} className="text-violet-500" /> Öne Çıkan Kiralık İlanlar
            </h2>
            <Link
              href="/listings?listingType=KİRALIK"
              className="flex items-center gap-1 text-xs font-semibold text-violet-600 hover:text-violet-800 transition-colors"
            >
              Tümü <ArrowRight size={13} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {listings.map(listing => (
              <Link
                key={listing.id}
                href={`/listing/${listing.id}`}
                className="group bg-white rounded-2xl border border-gray-100 hover:shadow-lg hover:border-violet-200 transition-all overflow-hidden"
              >
                <div className="relative h-40 bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden">
                  {listing.photos.length > 0 ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={listing.photos[0]}
                      alt={listing.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Home size={28} className="text-slate-300" />
                    </div>
                  )}
                  {listing.isVerified && (
                    <span className="absolute top-2 left-2 bg-white/90 text-[#00C49F] text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5 shadow-sm">
                      <CheckCircle2 size={8} /> Onaylı
                    </span>
                  )}
                  <span className="absolute top-2 right-2 bg-violet-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                    KİRALIK
                  </span>
                </div>
                <div className="p-4">
                  <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">{listing.propertyType}</p>
                  <h3 className="text-sm font-bold text-gray-900 line-clamp-1 group-hover:text-violet-700 transition-colors mb-1">{listing.title}</h3>
                  {(listing.district || listing.city) && (
                    <p className="flex items-center gap-1 text-xs text-gray-400 mb-2">
                      <MapPin size={10} />{[listing.neighborhood, listing.district, listing.city].filter(Boolean).join(', ')}
                    </p>
                  )}
                  <div className="flex gap-3 mb-3">
                    {listing.rooms != null && (
                      <span className="flex items-center gap-1 text-xs text-gray-500">
                        <Bed size={11} /> {listing.rooms} oda
                      </span>
                    )}
                    {listing.area != null && (
                      <span className="flex items-center gap-1 text-xs text-gray-500">
                        <Maximize2 size={11} /> {listing.area} m²
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-50 pt-3">
                    <div>
                      <p className="text-base font-black text-gray-900 font-mono">₺{listing.price.toLocaleString('tr-TR')}</p>
                      <p className="text-[9px] text-gray-400">aylık kira</p>
                    </div>
                    <ArrowRight size={15} className="text-gray-300 group-hover:text-violet-500 transition-colors" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Renter guide CTA */}
        <div className="bg-gradient-to-r from-violet-600 to-violet-800 rounded-2xl p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-black mb-1">Ev Kiralamadan Önce Okuyun</h3>
            <p className="text-violet-200 text-sm">Sözleşme, depozito ve yasal haklarınız hakkında kapsamlı rehber.</p>
          </div>
          <Link
            href="/rehber/kiralama-rehberi"
            className="flex items-center gap-2 px-6 py-3 bg-white text-violet-700 text-sm font-bold rounded-xl hover:bg-violet-50 transition-colors shrink-0"
          >
            Kiralama Rehberi <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </main>
  );
}
