import prisma from '@/lib/prisma';
import Link from 'next/link';
import { ArrowLeft, TrendingUp, Users, BarChart2, Activity, Target, DollarSign } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Analitik | Admin | Söylemesi Bizden' };

function formatPrice(n: number) {
  return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(n);
}

export default async function AdminAnalyticsPage() {
  const [
    allListings,
    allOffers,
    allUsers,
    allInquiries,
    acceptedOffers,
    soldListings,
    topCityListings,
    propertyTypeStats,
    listingTypeStats,
    last30dListings,
    last30dOffers,
    last30dUsers,
  ] = await Promise.all([
    prisma.listing.findMany({ select: { price: true, city: true, propertyType: true, listingType: true, status: true, area: true } }),
    prisma.offer.count(),
    prisma.user.count(),
    prisma.inquiry.count(),
    prisma.offer.count({ where: { status: 'ACCEPTED' } }),
    prisma.listing.count({ where: { status: 'SOLD' } }),
    prisma.listing.groupBy({ by: ['city'], _count: { id: true }, orderBy: { _count: { id: 'desc' } }, take: 8, where: { city: { not: null } } }),
    prisma.listing.groupBy({ by: ['propertyType'], _count: { id: true }, _avg: { price: true }, orderBy: { _count: { id: 'desc' } } }),
    prisma.listing.groupBy({ by: ['listingType'], _count: { id: true }, _avg: { price: true } }),
    prisma.listing.count({ where: { createdAt: { gte: new Date(Date.now() - 30 * 86400000) } } }),
    prisma.offer.count({ where: { createdAt: { gte: new Date(Date.now() - 30 * 86400000) } } }),
    prisma.user.count({ where: { createdAt: { gte: new Date(Date.now() - 30 * 86400000) } } }),
  ]);

  const totalListings = allListings.length;
  const activeListings = allListings.filter(l => l.status === 'ACTIVE').length;
  const offerConversion = allOffers > 0 ? ((acceptedOffers / allOffers) * 100).toFixed(1) : '0';
  const saleConversion = totalListings > 0 ? ((soldListings / totalListings) * 100).toFixed(1) : '0';

  const avgPrice = totalListings > 0
    ? Math.round(allListings.reduce((s, l) => s + l.price, 0) / totalListings)
    : 0;

  const listingsWithArea = allListings.filter(l => l.area && l.area > 0);
  const avgPricePerSqm = listingsWithArea.length > 0
    ? Math.round(listingsWithArea.reduce((s, l) => s + (l.price / l.area!), 0) / listingsWithArea.length)
    : 0;

  const maxCityCount = topCityListings[0]?._count.id ?? 1;

  const statCards = [
    { label: 'Toplam Kullanıcı', value: allUsers, sub: `+${last30dUsers} son 30 gün`, icon: <Users size={18} />, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Toplam İlan', value: totalListings, sub: `+${last30dListings} son 30 gün`, icon: <BarChart2 size={18} />, color: 'text-[#00C49F]', bg: 'bg-[#F0FDF8]' },
    { label: 'Toplam Teklif', value: allOffers, sub: `+${last30dOffers} son 30 gün`, icon: <Activity size={18} />, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Toplam Başvuru', value: allInquiries, sub: `Müşteri ilgisi`, icon: <Target size={18} />, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Teklif Dönüşümü', value: `%${offerConversion}`, sub: `${acceptedOffers} kabul / ${allOffers} toplam`, icon: <TrendingUp size={18} />, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Satış Oranı', value: `%${saleConversion}`, sub: `${soldListings} satış / ${totalListings} ilan`, icon: <TrendingUp size={18} />, color: 'text-[#00C49F]', bg: 'bg-[#F0FDF8]' },
    { label: 'Ort. Fiyat', value: formatPrice(avgPrice), sub: 'Tüm aktif ilanlar', icon: <DollarSign size={18} />, color: 'text-gray-700', bg: 'bg-gray-50' },
    { label: 'Ort. ₺/m²', value: formatPrice(avgPricePerSqm), sub: `${listingsWithArea.length} ilan baz alındı`, icon: <DollarSign size={18} />, color: 'text-gray-700', bg: 'bg-gray-50' },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">
        <div>
          <Link href="/admin/dashboard" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-700 transition-colors mb-3">
            <ArrowLeft size={14} /> Admin Dashboard
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F0FDF8] flex items-center justify-center text-[#00C49F]">
              <BarChart2 size={18} />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Platform Analitik</h1>
              <p className="text-xs text-gray-400 mt-0.5">Gerçek zamanlı performans ve dönüşüm metrikleri</p>
            </div>
          </div>
        </div>

        {/* Stat Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {statCards.map(card => (
            <div key={card.label} className="bg-white rounded-2xl border border-gray-100 p-5">
              <div className={`w-8 h-8 rounded-xl ${card.bg} flex items-center justify-center ${card.color} mb-3`}>
                {card.icon}
              </div>
              <p className={`text-2xl font-bold ${card.color} mb-0.5`}>{card.value}</p>
              <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400">{card.label}</p>
              <p className="text-xs text-gray-400 mt-1">{card.sub}</p>
            </div>
          ))}
        </div>

        {/* Activity KPIs */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-[10px] font-bold tracking-widest text-[#00C49F] uppercase mb-4">Son 30 Gün Aktivite</h2>
          <div className="grid grid-cols-3 gap-6">
            {[
              { label: 'Yeni Kullanıcı', value: last30dUsers, total: allUsers, color: '#3B82F6' },
              { label: 'Yeni İlan', value: last30dListings, total: totalListings, color: '#00C49F' },
              { label: 'Yeni Teklif', value: last30dOffers, total: allOffers, color: '#F59E0B' },
            ].map(item => (
              <div key={item.label}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-gray-600">{item.label}</span>
                  <span className="text-sm font-bold" style={{ color: item.color }}>{item.value}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-2 rounded-full transition-all"
                    style={{
                      width: item.total > 0 ? `${Math.min(100, Math.round((item.value / item.total) * 100))}%` : '0%',
                      backgroundColor: item.color,
                    }}
                  />
                </div>
                <p className="text-[10px] text-gray-400 mt-1">
                  Toplam {item.total} içinden %{item.total > 0 ? Math.round((item.value / item.total) * 100) : 0}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* City Distribution */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="text-[10px] font-bold tracking-widest text-[#00C49F] uppercase mb-4">Şehir Dağılımı</h2>
            {topCityListings.length === 0 ? (
              <p className="text-gray-400 text-sm">Veri yok.</p>
            ) : (
              <div className="space-y-3">
                {topCityListings.map(row => (
                  <div key={row.city} className="flex items-center gap-3">
                    <span className="text-xs font-semibold text-gray-600 w-24 shrink-0 truncate">{row.city}</span>
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-2 rounded-full bg-[#00C49F]"
                        style={{ width: `${Math.round((row._count.id / maxCityCount) * 100)}%` }}
                      />
                    </div>
                    <span className="text-xs font-bold text-gray-700 w-8 text-right">{row._count.id}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Property Type Stats */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="text-[10px] font-bold tracking-widest text-[#00C49F] uppercase mb-4">Mülk Tipi & Ortalama Fiyat</h2>
            <div className="divide-y divide-gray-50">
              {propertyTypeStats.map(row => (
                <div key={row.propertyType} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{row.propertyType}</p>
                    <p className="text-xs text-gray-400">{row._count.id} ilan</p>
                  </div>
                  <p className="text-sm font-bold text-[#00C49F]">
                    {row._avg.price ? formatPrice(Math.round(row._avg.price)) : '—'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Listing Type Breakdown */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-[10px] font-bold tracking-widest text-[#00C49F] uppercase mb-4">İlan Tipi Analizi</h2>
          <div className="grid grid-cols-2 gap-6">
            {listingTypeStats.map(row => (
              <div key={row.listingType} className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold ${
                  row.listingType === 'SATILIK' ? 'bg-[#F0FDF8] text-[#00C49F]' : 'bg-blue-50 text-blue-600'
                }`}>
                  {row.listingType === 'SATILIK' ? 'SAT' : 'KİR'}
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-800">{row.listingType}</p>
                  <p className="text-xs text-gray-400">{row._count.id} ilan</p>
                  <p className="text-xs font-semibold text-[#00C49F] mt-0.5">
                    Ort. {row._avg.price ? formatPrice(Math.round(row._avg.price)) : '—'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active vs Total */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-[10px] font-bold tracking-widest text-[#00C49F] uppercase mb-4">İlan Durum Özeti</h2>
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Aktif', value: activeListings, pct: totalListings > 0 ? Math.round((activeListings / totalListings) * 100) : 0, color: '#00C49F' },
              { label: 'Satıldı', value: soldListings, pct: totalListings > 0 ? Math.round((soldListings / totalListings) * 100) : 0, color: '#6B7280' },
              { label: 'Beklemede', value: totalListings - activeListings - soldListings, pct: totalListings > 0 ? Math.round(((totalListings - activeListings - soldListings) / totalListings) * 100) : 0, color: '#F59E0B' },
            ].map(item => (
              <div key={item.label} className="text-center p-4 bg-gray-50 rounded-xl">
                <p className="text-2xl font-bold" style={{ color: item.color }}>{item.value}</p>
                <p className="text-xs font-semibold text-gray-600 mt-1">{item.label}</p>
                <p className="text-xs text-gray-400 mt-0.5">%{item.pct}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
