import prisma from '@/lib/prisma';
import Link from 'next/link';
import { Metadata } from 'next';
import {
  Star, MapPin, Bed, Maximize2, ArrowRight, CheckCircle2,
  Building2, ShieldCheck, Crown, Eye,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Lüks Gayrimenkul | Premium Konutlar | Söylemesi Bizden',
  description: 'Türkiye\'nin en prestijli lüks konut ve gayrimenkul ilanları. Premium villalar, deniz manzaralı rezidanslar, en yüksek kalite.',
};

// Luxury threshold: top 10% of active listings by price
async function getLuxuryThreshold(): Promise<number> {
  const count = await prisma.listing.count({ where: { status: 'ACTIVE', price: { gt: 0 } } });
  if (count === 0) return 5000000;
  const skip = Math.floor(count * 0.9);
  const listing = await prisma.listing.findFirst({
    where: { status: 'ACTIVE', price: { gt: 0 } },
    orderBy: { price: 'asc' },
    skip,
    select: { price: true },
  });
  return Math.max(listing?.price ?? 5000000, 3000000);
}

export default async function LuksPage() {
  const threshold = await getLuxuryThreshold();
  const where = { status: 'ACTIVE' as const, price: { gte: threshold } };

  const [listings, totalCount, verifiedCount, cityStats] = await Promise.all([
    prisma.listing.findMany({
      where,
      orderBy: [{ isVerified: 'desc' }, { price: 'desc' }],
      take: 12,
      select: {
        id: true, title: true, price: true, city: true, district: true, neighborhood: true,
        rooms: true, area: true, isVerified: true, photos: true, propertyType: true,
        listingType: true, views: true, hasElevator: true, hasParking: true, hasGarden: true,
        buildingAge: true,
      },
    }),
    prisma.listing.count({ where }),
    prisma.listing.count({ where: { ...where, isVerified: true } }),
    prisma.listing.groupBy({
      by: ['city'],
      where: { ...where, city: { not: null } },
      _count: true,
      _avg: { price: true },
      orderBy: { _count: { city: 'desc' } },
      take: 6,
    }),
  ]);

  const avgPrice = listings.length > 0
    ? Math.round(listings.reduce((s, l) => s + l.price, 0) / listings.length)
    : 0;

  return (
    <main className="min-h-screen bg-[#0A0F1E]">

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/30 via-[#0A0F1E] to-[#0A0F1E]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
        <div className="relative max-w-6xl mx-auto px-6 py-20">
          <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold px-4 py-1.5 rounded-full w-fit mb-6">
            <Crown size={12} /> Premium Koleksiyon · {totalCount} İlan
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-4">
            Lüks Gayrimenkul<br />
            <span className="text-amber-400">Premium Koleksiyon</span>
          </h1>
          <p className="text-slate-400 text-sm max-w-xl leading-relaxed mb-8">
            Türkiye&apos;nin en prestijli konumlarında seçkin konutlar, villalar ve rezidanslar.
            ₺{Math.round(threshold / 1000000).toLocaleString('tr-TR')}M ve üzeri fiyat segmenti.
          </p>
          <div className="flex flex-wrap gap-4 text-sm">
            {[
              { label: 'Premium İlan', value: totalCount },
              { label: 'Doğrulanmış', value: verifiedCount },
              { label: 'Ortalama Fiyat', value: `₺${Math.round(avgPrice / 1000000 * 10) / 10}M` },
              { label: 'Şehir', value: cityStats.length },
            ].map(s => (
              <div key={s.label} className="bg-white/5 border border-white/10 rounded-xl px-5 py-3">
                <p className="text-lg font-black text-amber-400">{s.value}</p>
                <p className="text-xs text-slate-400">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">

        {/* City distribution */}
        {cityStats.length > 0 && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
              <MapPin size={15} className="text-amber-400" /> Premium Segment Şehir Dağılımı
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {cityStats.map(c => (
                <Link
                  key={c.city}
                  href={`/listings?city=${encodeURIComponent(c.city ?? '')}&minPrice=${threshold}&sort=price_desc`}
                  className="group p-4 bg-white/5 hover:bg-amber-500/10 border border-white/10 hover:border-amber-500/30 rounded-xl transition-all"
                >
                  <p className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">{c.city}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{c._count} premium ilan</p>
                  {c._avg.price && (
                    <p className="text-xs text-amber-400 font-bold mt-1">
                      Ort. ₺{Math.round(c._avg.price / 1000000 * 10) / 10}M
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Listings Grid */}
        <div>
          <h2 className="text-sm font-bold text-white mb-5 flex items-center gap-2">
            <Star size={15} className="text-amber-400" /> Seçkin İlanlar
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {listings.map(listing => (
              <Link
                key={listing.id}
                href={`/listing/${listing.id}`}
                className="group bg-white/5 border border-white/10 hover:border-amber-500/30 hover:shadow-xl hover:shadow-amber-500/5 transition-all overflow-hidden rounded-2xl"
              >
                {/* Photo */}
                <div className="relative h-48 bg-slate-800 overflow-hidden">
                  {listing.photos.length > 0 ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={listing.photos[0]}
                      alt={listing.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Building2 size={32} className="text-slate-600" />
                    </div>
                  )}
                  {/* Overlay badges */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 flex gap-1.5">
                    {listing.isVerified && (
                      <span className="bg-amber-500 text-black text-[9px] font-black px-2 py-0.5 rounded-full flex items-center gap-0.5">
                        <ShieldCheck size={8} /> PREMIUM
                      </span>
                    )}
                    {listing.buildingAge === 0 && (
                      <span className="bg-[#00C49F] text-black text-[9px] font-black px-2 py-0.5 rounded-full">SIFIR</span>
                    )}
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <p className="text-lg font-black text-white">
                      ₺{(listing.price / 1000000).toFixed(1)}M
                    </p>
                    {listing.area && listing.area > 0 && (
                      <p className="text-[10px] text-white/70">
                        {Math.round(listing.price / listing.area).toLocaleString('tr-TR')} ₺/m²
                      </p>
                    )}
                  </div>
                  {listing.views > 0 && (
                    <div className="absolute top-3 right-3 flex items-center gap-1 text-white/70 text-[10px]">
                      <Eye size={10} /> {listing.views}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4">
                  <p className="text-[9px] font-bold text-amber-400/70 uppercase tracking-widest mb-1">
                    {listing.propertyType} · {listing.listingType}
                  </p>
                  <h3 className="text-sm font-bold text-white line-clamp-1 group-hover:text-amber-400 transition-colors mb-1">
                    {listing.title}
                  </h3>
                  {(listing.district || listing.city) && (
                    <p className="flex items-center gap-1 text-xs text-slate-400 mb-3">
                      <MapPin size={10} className="text-amber-400/50" />
                      {[listing.neighborhood, listing.district, listing.city].filter(Boolean).join(', ')}
                    </p>
                  )}

                  <div className="flex gap-3 mb-3">
                    {listing.rooms != null && (
                      <span className="flex items-center gap-1 text-xs text-slate-400">
                        <Bed size={11} className="text-amber-400/50" /> {listing.rooms} oda
                      </span>
                    )}
                    {listing.area != null && (
                      <span className="flex items-center gap-1 text-xs text-slate-400">
                        <Maximize2 size={11} className="text-amber-400/50" /> {listing.area} m²
                      </span>
                    )}
                  </div>

                  {/* Amenities */}
                  <div className="flex gap-1.5 flex-wrap">
                    {listing.hasElevator && <span className="text-[9px] text-amber-400/80 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full font-bold">Asansör</span>}
                    {listing.hasParking && <span className="text-[9px] text-amber-400/80 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full font-bold">Otopark</span>}
                    {listing.hasGarden && <span className="text-[9px] text-amber-400/80 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full font-bold">Bahçe</span>}
                    {listing.isVerified && <CheckCircle2 size={11} className="text-amber-400 mt-0.5" />}
                  </div>

                  <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between">
                    <span className="text-xs text-slate-500 font-medium">{listing.listingType}</span>
                    <ArrowRight size={14} className="text-slate-600 group-hover:text-amber-400 transition-colors" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-amber-500/10 to-amber-600/5 border border-amber-500/20 rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-black text-white mb-1">Tüm Premium İlanları İnceleyin</h3>
            <p className="text-slate-400 text-sm">
              ₺{Math.round(threshold / 1000000)}M ve üzeri tüm satılık ve kiralık ilanlar.
            </p>
          </div>
          <div className="flex gap-3 flex-wrap shrink-0">
            <Link
              href={`/listings?minPrice=${threshold}&sort=price_desc`}
              className="flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-black text-sm font-bold rounded-xl transition-colors"
            >
              Tüm Lüks İlanlar <ArrowRight size={14} />
            </Link>
            <Link
              href="/concierge"
              className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/20 text-white text-sm font-bold rounded-xl transition-colors"
            >
              Özel Danışmanlık
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
