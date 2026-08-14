import prisma from '@/lib/prisma';
import Link from 'next/link';
import { Metadata } from 'next';
import {
  Home, MapPin, Bed, Maximize2, ArrowRight, CheckCircle2,
  Building2, Key, TrendingUp, ShieldCheck, Calculator,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Satılık Ev ve Konutlar | Söylemesi Bizden',
  description: 'Türkiye\'de satılık ev, daire, villa ve arazi ilanları. Şehir bazlı satılık konut araması, fiyat karşılaştırması.',
};

const CITIES = ['İstanbul', 'Ankara', 'İzmir', 'Antalya', 'Bursa', 'Bodrum', 'Adana', 'Kocaeli'];

export default async function SatilikPage() {
  const where = { status: 'ACTIVE' as const, listingType: 'SATILIK' };

  const [listings, totalCount, cityStats, priceRanges, propertyTypes] = await Promise.all([
    prisma.listing.findMany({
      where,
      orderBy: [{ isVerified: 'desc' }, { views: 'desc' }],
      take: 12,
      select: {
        id: true, title: true, price: true, city: true, district: true, neighborhood: true,
        rooms: true, area: true, buildingAge: true, isVerified: true, photos: true,
        propertyType: true, createdAt: true, hasElevator: true, hasParking: true,
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
      orderBy: { rooms: 'asc' },
    }),
    prisma.listing.groupBy({
      by: ['propertyType'],
      where,
      _count: true,
      _avg: { price: true },
      orderBy: { _count: { propertyType: 'desc' } },
    }),
  ]);

  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-bold px-4 py-1.5 rounded-full w-fit mb-5">
            <Home size={12} /> {totalCount.toLocaleString('tr-TR')} Satılık İlan
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">
            Satılık Ev &amp; Konutlar
          </h1>
          <p className="text-blue-200 text-sm max-w-xl leading-relaxed mb-6">
            Türkiye genelinde binlerce doğrulanmış satılık konut, villa, arazi ve ticari alan.
            Hayalinizdeki mülke doğru fiyatla ulaşın.
          </p>
          <div className="flex flex-wrap gap-2">
            {CITIES.map(city => {
              const g = cityStats.find(cg => cg.city === city);
              return (
                <Link
                  key={city}
                  href={`/listings?listingType=SATILIK&city=${encodeURIComponent(city)}`}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-xs font-semibold transition-colors"
                >
                  {city}
                  {g && <span className="text-[9px] bg-blue-400/30 px-1.5 py-0.5 rounded-full">{g._count}</span>}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">

        {/* City price cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {cityStats.slice(0, 4).map(c => (
            <Link
              key={c.city}
              href={`/listings?listingType=SATILIK&city=${encodeURIComponent(c.city ?? '')}`}
              className="group bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md hover:border-blue-200 transition-all"
            >
              <div className="flex items-center gap-1.5 mb-2">
                <MapPin size={12} className="text-blue-500" />
                <span className="text-sm font-bold text-gray-800 group-hover:text-blue-700 transition-colors">{c.city}</span>
              </div>
              <p className="text-xs text-gray-400">{c._count} ilan</p>
              {c._avg.price && (
                <p className="text-sm font-black text-gray-900 mt-1 font-mono">
                  ₺{Math.round(c._avg.price / 1000)}K
                </p>
              )}
              {c._min.price && (
                <p className="text-[10px] text-blue-500 font-semibold">
                  Min: ₺{(c._min.price! / 1000).toFixed(0)}K
                </p>
              )}
            </Link>
          ))}
        </div>

        {/* Budget ranges */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp size={15} className="text-blue-500" /> Bütçe Aralığına Göre
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: '< 1M ₺', min: '', max: '1000000', desc: 'Uygun fiyatlı' },
              { label: '1M – 3M ₺', min: '1000000', max: '3000000', desc: 'Orta segment' },
              { label: '3M – 8M ₺', min: '3000000', max: '8000000', desc: 'Üst segment' },
              { label: '8M+ ₺', min: '8000000', max: '', desc: 'Lüks & prestijli' },
            ].map(r => (
              <Link
                key={r.label}
                href={`/listings?listingType=SATILIK${r.min ? `&minPrice=${r.min}` : ''}${r.max ? `&maxPrice=${r.max}` : ''}`}
                className="group p-4 bg-gray-50 hover:bg-blue-50 border border-gray-100 hover:border-blue-200 rounded-xl transition-all text-center"
              >
                <p className="text-sm font-black text-gray-800 group-hover:text-blue-700 transition-colors">{r.label}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">{r.desc}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Room type filters */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Bed size={15} className="text-blue-500" /> Oda Sayısına Göre Ortalama Fiyat
          </h2>
          <div className="flex flex-wrap gap-3">
            {priceRanges.filter(r => r.rooms != null && r._avg.price).slice(0, 6).map(r => (
              <Link
                key={r.rooms}
                href={`/listings?listingType=SATILIK&minRooms=${r.rooms}`}
                className="group flex flex-col items-center justify-center p-4 bg-gray-50 hover:bg-blue-50 border border-gray-100 hover:border-blue-200 rounded-2xl min-w-[90px] transition-all"
              >
                <span className="text-lg font-black text-gray-800 group-hover:text-blue-700">{r.rooms}+</span>
                <span className="text-[9px] text-gray-400 font-medium mb-1">Oda</span>
                <span className="text-xs font-bold text-blue-600">
                  ₺{Math.round(r._avg.price! / 1000)}K
                </span>
                <span className="text-[9px] text-gray-400">{r._count} ilan</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Property types */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Building2 size={15} className="text-blue-500" /> Mülk Türüne Göre
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {propertyTypes.slice(0, 5).map(pt => (
              <Link
                key={pt.propertyType}
                href={`/listings?listingType=SATILIK&propertyType=${encodeURIComponent(pt.propertyType)}`}
                className="group p-3 bg-gray-50 hover:bg-blue-50 border border-transparent hover:border-blue-200 rounded-xl transition-all text-center"
              >
                <p className="text-sm font-bold text-gray-800 group-hover:text-blue-700 transition-colors">{pt.propertyType}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">{pt._count} ilan</p>
                {pt._avg.price && (
                  <p className="text-[10px] text-blue-500 font-semibold mt-0.5">
                    Ort. ₺{Math.round(pt._avg.price / 1000)}K
                  </p>
                )}
              </Link>
            ))}
          </div>
        </div>

        {/* Featured listings */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-gray-900">Öne Çıkan Satılık İlanlar</h2>
            <Link
              href="/listings?listingType=SATILIK"
              className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors"
            >
              Tümü <ArrowRight size={13} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {listings.map(listing => (
              <Link
                key={listing.id}
                href={`/listing/${listing.id}`}
                className="group bg-white rounded-2xl border border-gray-100 hover:shadow-lg hover:border-blue-200 transition-all overflow-hidden"
              >
                <div className="relative h-40 bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden">
                  {listing.photos.length > 0 ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={listing.photos[0]} alt={listing.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center"><Home size={28} className="text-slate-300" /></div>
                  )}
                  {listing.isVerified && (
                    <span className="absolute top-2 left-2 bg-white/90 text-[#00C49F] text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5 shadow-sm">
                      <CheckCircle2 size={8} /> Onaylı
                    </span>
                  )}
                  {listing.buildingAge === 0 && (
                    <span className="absolute top-2 right-2 bg-[#00C49F] text-white text-[9px] font-bold px-2 py-0.5 rounded-full">SIFIR</span>
                  )}
                  {listing.buildingAge == null || (listing.buildingAge > 0) ? (
                    <span className="absolute top-2 right-2 bg-blue-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">SATILIK</span>
                  ) : null}
                </div>
                <div className="p-4">
                  <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">{listing.propertyType}</p>
                  <h3 className="text-sm font-bold text-gray-900 line-clamp-1 group-hover:text-blue-700 transition-colors mb-1">{listing.title}</h3>
                  {(listing.district || listing.city) && (
                    <p className="flex items-center gap-1 text-xs text-gray-400 mb-2">
                      <MapPin size={10} />{[listing.neighborhood, listing.district, listing.city].filter(Boolean).join(', ')}
                    </p>
                  )}
                  <div className="flex gap-3 mb-2">
                    {listing.rooms != null && <span className="flex items-center gap-1 text-xs text-gray-500"><Bed size={11} /> {listing.rooms} oda</span>}
                    {listing.area != null && <span className="flex items-center gap-1 text-xs text-gray-500"><Maximize2 size={11} /> {listing.area} m²</span>}
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-50 pt-3">
                    <div>
                      <p className="text-base font-black text-gray-900 font-mono">₺{listing.price.toLocaleString('tr-TR')}</p>
                      {listing.area && listing.area > 0 && (
                        <p className="text-[9px] text-gray-400">{Math.round(listing.price / listing.area).toLocaleString('tr-TR')} ₺/m²</p>
                      )}
                    </div>
                    <ArrowRight size={15} className="text-gray-300 group-hover:text-blue-500 transition-colors" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Useful links */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { href: '/hesaplama', icon: Calculator, label: 'Kredi Hesaplayıcı', desc: 'Aylık taksit ve toplam ödeme' },
            { href: '/valuation', icon: TrendingUp, label: 'Değerleme Aracı', desc: 'Bölge bazlı fiyat analizi' },
            { href: '/rehber/ev-satin-alma', icon: ShieldCheck, label: 'Satın Alma Rehberi', desc: 'Tapu, kredi ve yasal süreç' },
          ].map(t => (
            <Link
              key={t.href}
              href={t.href}
              className="group bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md hover:border-blue-200 transition-all flex items-center gap-4"
            >
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                <t.icon size={18} className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-800 group-hover:text-blue-700 transition-colors">{t.label}</p>
                <p className="text-xs text-gray-400">{t.desc}</p>
              </div>
              <ArrowRight size={13} className="ml-auto text-gray-300 group-hover:text-blue-500 transition-colors shrink-0" />
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
