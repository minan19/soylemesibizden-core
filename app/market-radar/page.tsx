import prisma from '@/lib/prisma';
import Link from 'next/link';
import { ArrowLeft, Activity, Eye, BarChart2, TrendingUp, MapPin } from 'lucide-react';

export const dynamic = 'force-dynamic';

function formatPrice(price: number) {
  return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(price);
}

export default async function MarketRadarPage() {
  const [activeCount, totalCount, allListings, recentListings, topViewedListings] = await Promise.all([
    prisma.listing.count({ where: { status: 'ACTIVE' } }),
    prisma.listing.count(),
    prisma.listing.findMany({
      where: { status: 'ACTIVE' },
      select: { city: true, propertyType: true, price: true },
    }),
    prisma.listing.findMany({
      orderBy: { createdAt: 'desc' },
      take: 6,
      select: { id: true, title: true, price: true, city: true, propertyType: true, listingType: true, createdAt: true },
    }),
    prisma.listing.findMany({
      orderBy: { views: 'desc' },
      take: 5,
      select: { id: true, title: true, price: true, views: true, city: true },
    }),
  ]);

  const activeRate = totalCount > 0 ? Math.round((activeCount / totalCount) * 100) : 0;

  // City distribution
  const cityMap = new Map<string, number>();
  for (const l of allListings) {
    if (l.city) cityMap.set(l.city, (cityMap.get(l.city) ?? 0) + 1);
  }
  const listingsByCity = Array.from(cityMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([city, count]) => ({ city, count }));
  const maxCityCount = listingsByCity[0]?.count ?? 1;

  // Average price by property type
  const typeMap = new Map<string, number[]>();
  for (const l of allListings) {
    const arr = typeMap.get(l.propertyType) ?? [];
    arr.push(l.price);
    typeMap.set(l.propertyType, arr);
  }
  const avgPriceByType = Array.from(typeMap.entries())
    .map(([type, prices]) => ({
      propertyType: type,
      avgPrice: Math.round(prices.reduce((s, p) => s + p, 0) / prices.length),
      count: prices.length,
    }))
    .sort((a, b) => b.avgPrice - a.avgPrice);

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-5xl mx-auto px-8 py-10 space-y-8">

        <div>
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-700 transition-colors mb-3">
            <ArrowLeft size={14} /> Dashboard
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F0FDF8] flex items-center justify-center text-[#00C49F]">
              <Activity size={18} />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Piyasa Radar</h1>
              <p className="text-xs text-gray-400 mt-0.5">Gerçek zamanlı piyasa istatistikleri ve ilan analizi</p>
            </div>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'TOPLAM İLAN', value: totalCount, icon: <BarChart2 size={16} />, color: 'text-gray-900' },
            { label: 'AKTİF İLAN', value: activeCount, icon: <TrendingUp size={16} />, color: 'text-[#00C49F]' },
            { label: 'AKTİF ORAN', value: `%${activeRate}`, icon: <Activity size={16} />, color: 'text-gray-900' },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-5">
              <div className={`${s.color} mb-2`}>{s.icon}</div>
              <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-[9px] font-bold tracking-widest text-gray-400 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Two-column section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* City distribution */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="text-[10px] font-bold tracking-widest text-[#00C49F] uppercase mb-5 flex items-center gap-2">
              <MapPin size={12} /> Şehir Bazlı İlan Dağılımı
            </h2>
            {listingsByCity.length === 0 ? (
              <p className="text-gray-400 text-sm">Şehir verisi bulunamadı.</p>
            ) : (
              <div className="space-y-4">
                {listingsByCity.map(({ city, count }) => (
                  <div key={city} className="flex items-center gap-3">
                    <span className="text-xs font-semibold text-gray-600 w-24 shrink-0 truncate">{city}</span>
                    <div className="flex-1 bg-gray-100 rounded-full h-2">
                      <div
                        className="bg-[#00C49F] h-2 rounded-full transition-all"
                        style={{ width: `${Math.round((count / maxCityCount) * 100)}%` }}
                      />
                    </div>
                    <span className="text-xs font-bold text-gray-700 w-6 text-right">{count}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Property type & avg price */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="text-[10px] font-bold tracking-widest text-[#00C49F] uppercase mb-5">
              Mülk Tipi & Ortalama Fiyat
            </h2>
            {avgPriceByType.length === 0 ? (
              <p className="text-gray-400 text-sm">Veri bulunamadı.</p>
            ) : (
              <div className="divide-y divide-gray-50">
                {avgPriceByType.map(({ propertyType, avgPrice, count }) => (
                  <div key={propertyType} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{propertyType}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{count} ilan</p>
                    </div>
                    <p className="text-sm font-bold text-[#00C49F]">{formatPrice(avgPrice)}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Recent listings */}
        <div>
          <h2 className="text-[10px] font-bold tracking-widest text-[#00C49F] uppercase mb-4">Son Eklenen İlanlar</h2>
          {recentListings.length === 0 ? (
            <p className="text-gray-400 text-sm">İlan bulunamadı.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {recentListings.map(listing => (
                <Link key={listing.id} href={`/listing/${listing.id}`}
                  className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md hover:border-[#00C49F]/20 transition-all">
                  <p className="text-sm font-bold text-gray-900 mb-1 line-clamp-2 leading-snug">{listing.title}</p>
                  <p className="text-xs text-gray-400 mb-4">
                    {listing.city ?? '—'} · {listing.propertyType} · {listing.listingType}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold text-[#00C49F]">{formatPrice(listing.price)}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(listing.createdAt).toLocaleDateString('tr-TR')}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Top viewed listings */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-50 flex items-center gap-2">
            <Eye size={14} className="text-[#00C49F]" />
            <h2 className="text-[10px] font-bold tracking-widest text-[#00C49F] uppercase">
              En Çok Görüntülenen İlanlar
            </h2>
          </div>
          {topViewedListings.length === 0 ? (
            <p className="p-6 text-gray-400 text-sm">Veri bulunamadı.</p>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-[9px] font-bold text-gray-400 uppercase tracking-widest w-10">#</th>
                  <th className="px-6 py-3 text-left text-[9px] font-bold text-gray-400 uppercase tracking-widest">İlan</th>
                  <th className="px-6 py-3 text-left text-[9px] font-bold text-gray-400 uppercase tracking-widest">Şehir</th>
                  <th className="px-6 py-3 text-right text-[9px] font-bold text-gray-400 uppercase tracking-widest">Fiyat</th>
                  <th className="px-6 py-3 text-right text-[9px] font-bold text-gray-400 uppercase tracking-widest">Görüntülenme</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {topViewedListings.map((listing, idx) => (
                  <tr key={listing.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-400 font-medium">{idx + 1}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-800 max-w-xs">
                      <Link href={`/listing/${listing.id}`} className="line-clamp-1 hover:text-[#00C49F] transition-colors">
                        {listing.title}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{listing.city ?? '—'}</td>
                    <td className="px-6 py-4 text-sm font-bold text-[#00C49F] text-right">{formatPrice(listing.price)}</td>
                    <td className="px-6 py-4 text-sm text-gray-700 text-right font-semibold">
                      {listing.views.toLocaleString('tr-TR')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </main>
  );
}
