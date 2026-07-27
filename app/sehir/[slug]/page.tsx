import prisma from '@/lib/prisma';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import {
  MapPin, Building2, TrendingUp, Home, Tag,
  ArrowRight, CheckCircle, Eye,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const city = decodeURIComponent(params.slug);
  const count = await prisma.listing.count({ where: { city: { equals: city, mode: 'insensitive' }, status: 'ACTIVE' } });
  if (count === 0) return { title: 'Şehir Bulunamadı' };
  return {
    title: `${city} İlanları | Söylemesi Bizden`,
    description: `${city} şehrinde ${count} aktif gayrimenkul ilanı. Satılık, kiralık konut, ticari alan, arazi ilanları.`,
    openGraph: { title: `${city} İlanları`, description: `${city} şehrinde ${count} ilan`, type: 'website' },
  };
}

export default async function CityPage({ params }: { params: { slug: string } }) {
  const city = decodeURIComponent(params.slug);

  const [totalActive, stats, byType, byListingType, topDistricts, recentListings] = await Promise.all([
    prisma.listing.count({ where: { city: { equals: city, mode: 'insensitive' }, status: 'ACTIVE' } }),
    prisma.listing.aggregate({
      where: { city: { equals: city, mode: 'insensitive' }, status: 'ACTIVE' },
      _avg: { price: true, area: true },
      _min: { price: true },
      _max: { price: true },
    }),
    prisma.listing.groupBy({
      by: ['propertyType'],
      where: { city: { equals: city, mode: 'insensitive' }, status: 'ACTIVE' },
      _count: true,
      _avg: { price: true },
      orderBy: { _count: { propertyType: 'desc' } },
    }),
    prisma.listing.groupBy({
      by: ['listingType'],
      where: { city: { equals: city, mode: 'insensitive' }, status: 'ACTIVE' },
      _count: true,
      orderBy: { _count: { listingType: 'desc' } },
    }),
    prisma.listing.groupBy({
      by: ['district'],
      where: { city: { equals: city, mode: 'insensitive' }, status: 'ACTIVE', district: { not: null } },
      _count: true,
      orderBy: { _count: { district: 'desc' } },
      take: 8,
    }),
    prisma.listing.findMany({
      where: { city: { equals: city, mode: 'insensitive' }, status: 'ACTIVE' },
      orderBy: { createdAt: 'desc' },
      take: 9,
      select: {
        id: true, title: true, price: true, city: true, district: true, neighborhood: true,
        rooms: true, area: true, listingType: true, propertyType: true,
        isVerified: true, photos: true, views: true, createdAt: true,
      },
    }),
  ]);

  if (totalActive === 0) notFound();

  const avgPrice = stats._avg.price;
  const avgArea = stats._avg.area;
  const maxDistrict = Math.max(...topDistricts.map(d => d._count), 1);

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-6 py-10 space-y-10">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-gray-400">
          <Link href="/" className="hover:text-[#00C49F] transition-colors">Ana Sayfa</Link>
          <span>/</span>
          <Link href="/listings" className="hover:text-[#00C49F] transition-colors">İlanlar</Link>
          <span>/</span>
          <span className="text-gray-600 font-medium">{city}</span>
        </nav>

        {/* Header */}
        <header>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-[#F0FDF8] flex items-center justify-center">
              <MapPin className="w-6 h-6 text-[#00C49F]" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{city} İlanları</h1>
              <p className="text-sm text-gray-500 mt-0.5">{totalActive} aktif ilan bulunuyor</p>
            </div>
          </div>
          <Link
            href={`/listings?city=${encodeURIComponent(city)}`}
            className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 bg-[#00C49F] hover:bg-[#00a882] text-white text-sm font-bold rounded-xl transition-colors"
          >
            Tüm İlanları Listele <ArrowRight size={14} />
          </Link>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            {
              label: 'Ort. Fiyat',
              value: avgPrice ? `${Math.round(avgPrice).toLocaleString('tr-TR')} ₺` : '—',
              icon: TrendingUp, color: 'text-[#00C49F]', bg: 'bg-[#F0FDF8]',
            },
            {
              label: 'En Düşük',
              value: stats._min.price ? `${Math.round(stats._min.price).toLocaleString('tr-TR')} ₺` : '—',
              icon: Tag, color: 'text-blue-600', bg: 'bg-blue-50',
            },
            {
              label: 'En Yüksek',
              value: stats._max.price ? `${Math.round(stats._max.price).toLocaleString('tr-TR')} ₺` : '—',
              icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-50',
            },
            {
              label: 'Ort. Alan',
              value: avgArea ? `${Math.round(avgArea)} m²` : '—',
              icon: Home, color: 'text-orange-600', bg: 'bg-orange-50',
            },
          ].map(stat => (
            <div key={stat.label} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <div className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center mb-3`}>
                <stat.icon size={18} className={stat.color} />
              </div>
              <p className="text-lg font-bold text-gray-900 mb-0.5">{stat.value}</p>
              <p className="text-xs text-gray-400 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* 3 columns: property types, listing types, top districts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Property Types */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h3 className="text-sm font-bold text-gray-900 mb-4">Mülk Türleri</h3>
            <div className="space-y-3">
              {byType.map(t => (
                <Link
                  key={t.propertyType}
                  href={`/listings?city=${encodeURIComponent(city)}&propertyType=${encodeURIComponent(t.propertyType)}`}
                  className="flex items-center justify-between group"
                >
                  <span className="text-sm text-gray-700 group-hover:text-[#00C49F] transition-colors font-medium">
                    {t.propertyType}
                  </span>
                  <div className="flex items-center gap-2">
                    {t._avg.price && (
                      <span className="text-xs text-gray-400">{Math.round(t._avg.price).toLocaleString('tr-TR')} ₺</span>
                    )}
                    <span className="text-xs font-bold text-[#00C49F] bg-[#F0FDF8] px-2 py-0.5 rounded-full">
                      {t._count}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Listing Types */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h3 className="text-sm font-bold text-gray-900 mb-4">İlan Türleri</h3>
            <div className="space-y-4">
              {byListingType.map(lt => (
                <Link
                  key={lt.listingType}
                  href={`/listings?city=${encodeURIComponent(city)}&listingType=${encodeURIComponent(lt.listingType)}`}
                  className="flex items-center justify-between group"
                >
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-700 group-hover:text-[#00C49F] transition-colors font-medium">
                        {lt.listingType}
                      </span>
                      <span className="text-sm font-bold text-gray-900">{lt._count}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5">
                      <div
                        className="bg-[#00C49F] h-1.5 rounded-full transition-all"
                        style={{ width: `${Math.round((lt._count / totalActive) * 100)}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {Math.round((lt._count / totalActive) * 100)}% toplam içinde
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Top Districts */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h3 className="text-sm font-bold text-gray-900 mb-4">Popüler İlçeler</h3>
            <div className="space-y-2.5">
              {topDistricts.map(d => d.district && (
                <Link
                  key={d.district}
                  href={`/listings?city=${encodeURIComponent(city)}&q=${encodeURIComponent(d.district)}`}
                  className="flex items-center gap-3 group"
                >
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-700 group-hover:text-[#00C49F] transition-colors font-medium">
                        {d.district}
                      </span>
                      <span className="text-xs font-semibold text-gray-500">{d._count}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1">
                      <div
                        className="bg-[#00C49F]/60 h-1 rounded-full"
                        style={{ width: `${Math.round((d._count / maxDistrict) * 100)}%` }}
                      />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Listings */}
        <div>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-gray-900">Son Eklenen İlanlar</h2>
            <Link
              href={`/listings?city=${encodeURIComponent(city)}`}
              className="text-sm font-semibold text-[#00C49F] hover:underline flex items-center gap-1"
            >
              Tümünü Gör <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {recentListings.map(listing => (
              <Link
                key={listing.id}
                href={`/listing/${listing.id}`}
                className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg hover:border-[#00C49F]/20 transition-all"
              >
                <div className="w-full h-40 bg-gradient-to-br from-slate-100 to-slate-200 relative overflow-hidden">
                  {listing.photos[0] ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={listing.photos[0]} alt={listing.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Building2 size={28} className="text-slate-300" />
                    </div>
                  )}
                  {listing.isVerified && (
                    <span className="absolute top-2 left-2 bg-white/90 text-[#00C49F] text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5">
                      <CheckCircle size={9} /> Onaylı
                    </span>
                  )}
                </div>

                <div className="p-4">
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${listing.listingType === 'KİRALIK' ? 'bg-violet-50 text-violet-600' : 'bg-[#F0FDF8] text-[#00C49F]'}`}>
                      {listing.listingType}
                    </span>
                    <span className="text-[10px] text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full font-semibold">
                      {listing.propertyType}
                    </span>
                  </div>
                  <h3 className="font-semibold text-sm text-gray-900 line-clamp-2 mb-2 group-hover:text-[#00C49F] transition-colors">
                    {listing.title}
                  </h3>
                  {listing.district && (
                    <p className="flex items-center gap-1 text-xs text-gray-400 mb-2">
                      <MapPin size={10} /> {listing.district}
                    </p>
                  )}
                  <div className="flex gap-2 mb-3">
                    {listing.rooms != null && <span className="text-xs text-gray-500 bg-gray-50 px-2 py-0.5 rounded-md">{listing.rooms} oda</span>}
                    {listing.area != null && <span className="text-xs text-gray-500 bg-gray-50 px-2 py-0.5 rounded-md">{listing.area} m²</span>}
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                    <span className="font-bold text-sm text-gray-900">₺ {listing.price.toLocaleString('tr-TR')}</span>
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                      <Eye size={11} /> {listing.views}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Quick filters for this city */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">{city} İçin Hızlı Filtreler</h3>
          <div className="flex flex-wrap gap-2">
            {['SATILIK', 'KİRALIK'].flatMap(lt =>
              ['KONUT', 'TİCARİ', 'ARAZI', 'OFİS'].map(pt => (
                <Link
                  key={`${lt}-${pt}`}
                  href={`/listings?city=${encodeURIComponent(city)}&listingType=${encodeURIComponent(lt)}&propertyType=${encodeURIComponent(pt)}`}
                  className="px-3 py-1.5 bg-gray-50 hover:bg-[#F0FDF8] border border-gray-200 hover:border-[#00C49F] rounded-xl text-xs font-semibold text-gray-600 hover:text-[#00C49F] transition-all"
                >
                  {lt} {pt}
                </Link>
              ))
            )}
          </div>
        </div>

      </div>
    </main>
  );
}
