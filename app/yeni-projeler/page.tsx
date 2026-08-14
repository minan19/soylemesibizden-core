import prisma from '@/lib/prisma';
import Link from 'next/link';
import { Metadata } from 'next';
import {
  Building2, MapPin, Maximize2, Bed, CheckCircle2,
  ArrowRight, Sparkles, TrendingUp, Home,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Yeni Projeler ve Sıfır Binalar | Söylemesi Bizden',
  description: 'Türkiye\'de yeni inşaat projeleri, sıfır konut ve modern yapılar. 2025-2026 yeni bina ilanları.',
};

const CITIES = ['İstanbul', 'Ankara', 'İzmir', 'Antalya', 'Bursa', 'Bodrum', 'Mersin', 'Kocaeli'];

export default async function YeniProjelerPage() {
  const where = {
    status: 'ACTIVE' as const,
    listingType: 'SATILIK',
    OR: [
      { buildingAge: { lte: 3 } },
      { buildingAge: null, createdAt: { gte: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000) } },
    ],
  };

  const [listings, cityGroups, totalCount] = await Promise.all([
    prisma.listing.findMany({
      where,
      orderBy: [{ buildingAge: 'asc' }, { views: 'desc' }],
      take: 24,
      select: {
        id: true, title: true, price: true, city: true, district: true, neighborhood: true,
        rooms: true, area: true, floor: true, totalFloors: true, buildingAge: true,
        isVerified: true, photos: true, views: true, propertyType: true, listingType: true,
        createdAt: true, hasElevator: true, hasParking: true,
        owner: { select: { name: true, id: true } },
      },
    }),
    prisma.listing.groupBy({
      by: ['city'],
      where: { ...where, city: { in: CITIES } },
      _count: true,
      _avg: { price: true },
      orderBy: { _count: { city: 'desc' } },
    }),
    prisma.listing.count({ where }),
  ]);

  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-800 to-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full w-fit mb-5">
            <Sparkles size={12} /> Yeni Projeler &amp; Sıfır Binalar
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">
            Yeni İnşaat Projeleri<br />
            <span className="text-[#00C49F]">&amp; Sıfır Konutlar</span>
          </h1>
          <p className="text-slate-300 text-sm max-w-lg leading-relaxed mb-6">
            Türkiye&apos;nin önde gelen şehirlerinde yeni inşaat projeleri ve sıfır bina
            daireleri. Modern yapılar, asansör, otopark ve tüm olanaklarla.
          </p>
          <div className="flex flex-wrap gap-2">
            {CITIES.map(city => {
              const g = cityGroups.find(cg => cg.city === city);
              if (!g) return null;
              return (
                <Link
                  key={city}
                  href={`/yeni-projeler?city=${encodeURIComponent(city)}`}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-xs font-semibold transition-colors"
                >
                  {city}
                  <span className="bg-[#00C49F]/30 text-[#00C49F] px-1.5 py-0.5 rounded-full text-[9px] font-black">
                    {g._count}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { icon: Building2, label: 'Aktif Proje', value: totalCount, color: 'text-[#00C49F]', bg: 'bg-[#F0FDF8]' },
            { icon: Home, label: 'Şehir', value: cityGroups.filter(g => g._count > 0).length, color: 'text-blue-600', bg: 'bg-blue-50' },
            { icon: TrendingUp, label: 'Sıfır Bina', value: listings.filter(l => l.buildingAge === 0).length, color: 'text-amber-600', bg: 'bg-amber-50' },
            { icon: CheckCircle2, label: 'Doğrulanmış', value: listings.filter(l => l.isVerified).length, color: 'text-purple-600', bg: 'bg-purple-50' },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
              <div className={`w-9 h-9 ${s.bg} rounded-xl flex items-center justify-center mb-2`}>
                <s.icon size={16} className={s.color} />
              </div>
              <p className="text-xl font-black text-gray-900">{s.value}</p>
              <p className="text-[10px] text-gray-400 font-medium">{s.label}</p>
            </div>
          ))}
        </div>

        {/* City breakdown */}
        {cityGroups.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <h2 className="text-sm font-bold text-gray-900 mb-4">Şehre Göre Projeler</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {cityGroups.slice(0, 8).map(cg => (
                <Link
                  key={cg.city}
                  href={`/listings?city=${encodeURIComponent(cg.city ?? '')}&listingType=SATILIK&maxBuildingAge=3`}
                  className="group p-3 bg-gray-50 rounded-xl hover:bg-[#F0FDF8] border border-transparent hover:border-[#00C49F]/20 transition-all"
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <MapPin size={11} className="text-[#00C49F]" />
                    <span className="text-sm font-bold text-gray-800 group-hover:text-[#00C49F] transition-colors">{cg.city}</span>
                  </div>
                  <p className="text-[10px] text-gray-400">{cg._count} proje</p>
                  {cg._avg.price && (
                    <p className="text-[10px] font-semibold text-gray-600 mt-0.5">
                      Ort. ₺{Math.round(cg._avg.price / 1000)}K
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Listings Grid */}
        <div>
          <h2 className="text-sm font-bold text-gray-900 mb-4">{totalCount} Yeni Proje</h2>
          {listings.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
              <Building2 size={40} className="text-gray-200 mx-auto mb-3" />
              <p className="text-gray-400 text-sm">Henüz yeni proje ilanı bulunmuyor.</p>
              <Link href="/listings?listingType=SATILIK" className="text-[#00C49F] text-sm font-semibold mt-2 inline-block">
                Tüm satılık ilanları gör →
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {listings.map(listing => (
                <Link
                  key={listing.id}
                  href={`/listing/${listing.id}`}
                  className="group bg-white rounded-2xl border border-gray-100 hover:shadow-lg hover:border-[#00C49F]/20 transition-all overflow-hidden"
                >
                  {/* Photo */}
                  <div className="relative h-44 bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden">
                    {listing.photos.length > 0 ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={listing.photos[0]}
                        alt={listing.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Building2 size={32} className="text-slate-300" />
                      </div>
                    )}
                    {/* Badges overlay */}
                    <div className="absolute top-2 left-2 flex gap-1.5 flex-wrap">
                      {listing.buildingAge === 0 && (
                        <span className="bg-[#00C49F] text-white text-[9px] font-black px-2 py-0.5 rounded-full flex items-center gap-0.5">
                          <Sparkles size={8} /> SIFIR
                        </span>
                      )}
                      {listing.buildingAge != null && listing.buildingAge > 0 && listing.buildingAge <= 3 && (
                        <span className="bg-blue-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full">
                          {listing.buildingAge} YAŞ
                        </span>
                      )}
                      {listing.isVerified && (
                        <span className="bg-white/90 text-[#00C49F] text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5">
                          <CheckCircle2 size={8} /> Onaylı
                        </span>
                      )}
                    </div>
                    {listing.propertyType && (
                      <span className="absolute top-2 right-2 bg-black/50 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                        {listing.propertyType}
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="text-sm font-bold text-gray-900 line-clamp-1 group-hover:text-[#00C49F] transition-colors mb-1">
                      {listing.title}
                    </h3>

                    {(listing.neighborhood || listing.district || listing.city) && (
                      <p className="flex items-center gap-1 text-xs text-gray-400 mb-2">
                        <MapPin size={10} />
                        {[listing.neighborhood, listing.district, listing.city].filter(Boolean).join(', ')}
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
                      {listing.floor != null && listing.totalFloors != null && (
                        <span className="text-xs text-gray-400">{listing.floor}/{listing.totalFloors}. kat</span>
                      )}
                    </div>

                    {/* Amenity chips */}
                    <div className="flex gap-1.5 mb-3 flex-wrap">
                      {listing.hasElevator && (
                        <span className="text-[9px] font-bold px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full">Asansör</span>
                      )}
                      {listing.hasParking && (
                        <span className="text-[9px] font-bold px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full">Otopark</span>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                      <div>
                        <p className="text-base font-black text-gray-900 font-mono">
                          ₺{listing.price.toLocaleString('tr-TR')}
                        </p>
                        {listing.area && listing.area > 0 && (
                          <p className="text-[10px] text-gray-400">
                            {Math.round(listing.price / listing.area).toLocaleString('tr-TR')} ₺/m²
                          </p>
                        )}
                      </div>
                      <ArrowRight size={16} className="text-gray-300 group-hover:text-[#00C49F] transition-colors" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-gray-900 mb-1">Tüm Satılık İlanları İnceleyin</h3>
            <p className="text-sm text-gray-400">Daha fazla konut, ticari alan ve arazi ilanı için tüm listeye bakın.</p>
          </div>
          <Link
            href="/listings?listingType=SATILIK"
            className="flex items-center gap-2 px-5 py-2.5 bg-[#00C49F] hover:bg-[#00a882] text-white text-sm font-bold rounded-xl transition-colors shrink-0"
          >
            Tüm İlanlar <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </main>
  );
}
