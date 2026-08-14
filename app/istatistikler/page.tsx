import prisma from '@/lib/prisma';
import Link from 'next/link';
import { Metadata } from 'next';
import {
  BarChart2,
  TrendingUp,
  Home,
  MapPin,
  ArrowRight,
  Building2,
  DollarSign,
  Users,
  Eye,
  Star,
} from 'lucide-react';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Platform İstatistikleri | Söylemesi Bizden',
  description: 'Türkiye genelindeki gayrimenkul piyasası verileri. Şehir bazlı ilan sayıları, ortalama fiyatlar, piyasa trendleri.',
};

export default async function IstatistiklerPage() {
  const [
    totalListings,
    totalUsers,
    totalOffers,
    totalViews,
    totalFavorites,
    activeListings,
    satilikCount,
    kiralikCount,
    cityStats,
    propertyTypeStats,
    recentListingsPerMonth,
    priceStats,
    topCities,
  ] = await Promise.all([
    prisma.listing.count(),
    prisma.user.count(),
    prisma.offer.count(),
    prisma.listing.aggregate({ _sum: { views: true } }),
    prisma.favorite.count(),
    prisma.listing.count({ where: { status: 'ACTIVE' } }),
    prisma.listing.count({ where: { listingType: 'SATILIK', status: 'ACTIVE' } }),
    prisma.listing.count({ where: { listingType: 'KİRALIK', status: 'ACTIVE' } }),
    // City distribution
    prisma.listing.groupBy({
      by: ['city'],
      where: { status: 'ACTIVE', city: { not: null } },
      _count: { id: true },
      _avg: { price: true },
      orderBy: { _count: { id: 'desc' } },
      take: 10,
    }),
    // Property type distribution
    prisma.listing.groupBy({
      by: ['propertyType'],
      where: { status: 'ACTIVE' },
      _count: { id: true },
      _avg: { price: true },
      orderBy: { _count: { id: 'desc' } },
    }),
    // Last 6 months monthly counts
    prisma.listing.findMany({
      where: {
        status: 'ACTIVE',
        createdAt: { gte: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000) },
      },
      select: { createdAt: true },
    }),
    // Price stats for active listings
    prisma.listing.aggregate({
      where: { status: 'ACTIVE', price: { gt: 0 } },
      _avg: { price: true },
      _min: { price: true },
      _max: { price: true },
    }),
    // Top cities with listing type breakdown
    prisma.listing.groupBy({
      by: ['city', 'listingType'],
      where: { status: 'ACTIVE', city: { not: null } },
      _count: { id: true },
      _avg: { price: true },
      orderBy: { _count: { id: 'desc' } },
      take: 30,
    }),
  ]);

  // Process monthly data
  const MONTHS = ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'];
  const monthlyMap = new Map<string, number>();
  const now = new Date();
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    monthlyMap.set(`${d.getFullYear()}-${d.getMonth()}`, 0);
  }
  for (const l of recentListingsPerMonth) {
    const d = new Date(l.createdAt);
    const key = `${d.getFullYear()}-${d.getMonth()}`;
    if (monthlyMap.has(key)) monthlyMap.set(key, (monthlyMap.get(key) ?? 0) + 1);
  }
  const monthlyData = Array.from(monthlyMap.entries()).map(([key, count]) => {
    const [yr, mo] = key.split('-').map(Number);
    return { label: MONTHS[mo], count };
  });
  const maxMonthly = Math.max(...monthlyData.map(d => d.count), 1);

  // Process city stats with SATILIK/KİRALIK split
  const cityMap = new Map<string, { total: number; satilik: number; kiralik: number; satilikAvg: number | null; kiralikAvg: number | null }>();
  for (const r of topCities) {
    if (!r.city) continue;
    if (!cityMap.has(r.city)) cityMap.set(r.city, { total: 0, satilik: 0, kiralik: 0, satilikAvg: null, kiralikAvg: null });
    const entry = cityMap.get(r.city)!;
    entry.total += r._count.id;
    if (r.listingType === 'SATILIK') {
      entry.satilik = r._count.id;
      entry.satilikAvg = r._avg.price ? Math.round(r._avg.price) : null;
    } else if (r.listingType === 'KİRALIK') {
      entry.kiralik = r._count.id;
      entry.kiralikAvg = r._avg.price ? Math.round(r._avg.price) : null;
    }
  }
  const topCityList = Array.from(cityMap.entries())
    .sort((a, b) => b[1].total - a[1].total)
    .slice(0, 8);

  const maxCityCount = Math.max(...topCityList.map(([, v]) => v.total), 1);

  const ptTotal = propertyTypeStats.reduce((s, r) => s + r._count.id, 0);

  const PT_COLORS: Record<string, string> = {
    KONUT: 'bg-[#00C49F]',
    TİCARİ: 'bg-blue-500',
    ARAZI: 'bg-amber-500',
    OFİS: 'bg-violet-500',
    DEPO: 'bg-gray-400',
    ARSA: 'bg-orange-500',
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-6 py-10 space-y-10">

        {/* Header */}
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-[#F0FDF8] flex items-center justify-center">
                <BarChart2 size={20} className="text-[#00C49F]" />
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">Platform İstatistikleri</h1>
            </div>
            <p className="text-gray-500 text-sm max-w-xl">
              Söylemesi Bizden platformundaki canlı gayrimenkul piyasası verilerine göre güncel istatistikler.
            </p>
          </div>
          <Link
            href="/listings"
            className="flex items-center gap-2 px-4 py-2.5 bg-[#00C49F] text-white text-sm font-bold rounded-xl hover:bg-[#00a882] transition-colors"
          >
            İlanlara Git <ArrowRight size={14} />
          </Link>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { label: 'Toplam İlan', value: totalListings.toLocaleString('tr-TR'), icon: <Home size={16} />, color: 'text-[#00C49F]' },
            { label: 'Aktif İlan', value: activeListings.toLocaleString('tr-TR'), icon: <Star size={16} />, color: 'text-green-500' },
            { label: 'Kullanıcı', value: totalUsers.toLocaleString('tr-TR'), icon: <Users size={16} />, color: 'text-blue-500' },
            { label: 'Teklif', value: totalOffers.toLocaleString('tr-TR'), icon: <TrendingUp size={16} />, color: 'text-violet-500' },
            { label: 'Görüntüleme', value: (totalViews._sum.views ?? 0).toLocaleString('tr-TR'), icon: <Eye size={16} />, color: 'text-amber-500' },
            { label: 'Favori', value: totalFavorites.toLocaleString('tr-TR'), icon: <Star size={16} />, color: 'text-rose-500' },
          ].map(kpi => (
            <div key={kpi.label} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
              <div className={`mb-2 ${kpi.color}`}>{kpi.icon}</div>
              <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
              <p className="text-xs text-gray-400 font-medium mt-0.5">{kpi.label}</p>
            </div>
          ))}
        </div>

        {/* Price overview */}
        {priceStats._avg.price && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-5">
              <DollarSign size={18} className="text-[#00C49F]" />
              <h2 className="text-lg font-bold text-gray-900">Fiyat Aralığı (Aktif İlanlar)</h2>
            </div>
            <div className="grid grid-cols-3 gap-6">
              {[
                { label: 'Ortalama', value: Math.round(priceStats._avg.price!), color: 'text-gray-900' },
                { label: 'En Düşük', value: Math.round(priceStats._min.price ?? 0), color: 'text-[#00C49F]' },
                { label: 'En Yüksek', value: Math.round(priceStats._max.price ?? 0), color: 'text-gray-700' },
              ].map(stat => (
                <div key={stat.label}>
                  <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1">{stat.label}</p>
                  <p className={`text-2xl font-bold font-mono ${stat.color}`}>
                    ₺{stat.value.toLocaleString('tr-TR')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* İlan Tipi Dağılımı */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <Building2 size={18} className="text-[#00C49F]" />
                <h2 className="text-lg font-bold text-gray-900">Mülk Türü Dağılımı</h2>
              </div>
              <div className="flex items-center gap-3 text-xs font-semibold">
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full bg-[#00C49F] inline-block" />
                  Satılık {satilikCount.toLocaleString('tr-TR')}
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full bg-violet-500 inline-block" />
                  Kiralık {kiralikCount.toLocaleString('tr-TR')}
                </span>
              </div>
            </div>
            <div className="space-y-3">
              {propertyTypeStats.map(pt => {
                const pct = ptTotal > 0 ? Math.round((pt._count.id / ptTotal) * 100) : 0;
                return (
                  <div key={pt.propertyType}>
                    <div className="flex items-center justify-between text-xs font-semibold text-gray-600 mb-1">
                      <span>{pt.propertyType}</span>
                      <span className="text-gray-400">{pt._count.id.toLocaleString('tr-TR')} ilan ({pct}%)</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${PT_COLORS[pt.propertyType] ?? 'bg-gray-400'}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Monthly trend */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-5">
              <TrendingUp size={18} className="text-[#00C49F]" />
              <h2 className="text-lg font-bold text-gray-900">Son 6 Ay — İlan Trendi</h2>
            </div>
            <div className="flex items-end gap-2 h-32">
              {monthlyData.map(({ label, count }) => {
                const heightPct = maxMonthly > 0 ? (count / maxMonthly) * 100 : 0;
                return (
                  <div key={label} className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-[10px] font-bold text-gray-600">{count > 0 ? count : ''}</span>
                    <div className="w-full flex items-end" style={{ height: '80px' }}>
                      <div
                        className="w-full bg-[#00C49F] rounded-t-md transition-all"
                        style={{ height: `${Math.max(heightPct, 4)}%` }}
                        title={`${label}: ${count} ilan`}
                      />
                    </div>
                    <span className="text-[10px] text-gray-400 font-medium">{label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* City table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-50 flex items-center gap-2">
            <MapPin size={18} className="text-[#00C49F]" />
            <h2 className="text-lg font-bold text-gray-900">Şehir Bazlı İlan Dağılımı</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Şehir</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Toplam</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Satılık</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Kiralık</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Ort. Satış</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Ort. Kira</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Pay</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {topCityList.map(([city, data]) => {
                  const pct = Math.round((data.total / activeListings) * 100);
                  return (
                    <tr key={city} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <Link
                          href={`/sehir/${encodeURIComponent(city)}`}
                          className="font-semibold text-gray-900 hover:text-[#00C49F] transition-colors flex items-center gap-1"
                        >
                          {city}
                          <ArrowRight size={12} className="text-gray-300" />
                        </Link>
                      </td>
                      <td className="px-6 py-4 font-bold text-gray-800">{data.total.toLocaleString('tr-TR')}</td>
                      <td className="px-6 py-4">
                        <span className="text-[#00C49F] font-semibold">{data.satilik.toLocaleString('tr-TR')}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-violet-600 font-semibold">{data.kiralik.toLocaleString('tr-TR')}</span>
                      </td>
                      <td className="px-6 py-4 text-gray-600 font-mono text-xs">
                        {data.satilikAvg ? `₺${data.satilikAvg.toLocaleString('tr-TR')}` : '—'}
                      </td>
                      <td className="px-6 py-4 text-gray-600 font-mono text-xs">
                        {data.kiralikAvg ? `₺${data.kiralikAvg.toLocaleString('tr-TR')}` : '—'}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-[#00C49F] rounded-full"
                              style={{ width: `${(data.total / maxCityCount) * 100}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-400 font-semibold">{pct}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-wrap gap-3">
          <Link
            href="/market-radar"
            className="flex items-center gap-2 px-5 py-3 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:border-[#00C49F] hover:text-[#00C49F] transition-colors"
          >
            <BarChart2 size={16} /> Piyasa Radarı
          </Link>
          <Link
            href="/listings"
            className="flex items-center gap-2 px-5 py-3 bg-[#00C49F] text-white rounded-xl text-sm font-bold hover:bg-[#00a882] transition-colors"
          >
            <Home size={16} /> Tüm İlanları Gör
          </Link>
        </div>

      </div>
    </main>
  );
}
