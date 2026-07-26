import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { ArrowLeft, BarChart3, TrendingUp, Tag, Eye } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AnalyticsPage() {
  const [
    listingsByType,
    listingsByStatus,
    offersByStatus,
    topListings,
    recentActivity,
    avgPriceResult,
  ] = await Promise.all([
    prisma.listing.groupBy({ by: ['propertyType'], _count: true }),
    prisma.listing.groupBy({ by: ['status'], _count: true }),
    prisma.offer.groupBy({ by: ['status'], _count: true }),
    prisma.listing.findMany({
      orderBy: { views: 'desc' },
      take: 5,
      select: { id: true, title: true, views: true, price: true, status: true },
    }),
    prisma.listing.findMany({
      orderBy: { createdAt: 'desc' },
      take: 3,
      select: { id: true, title: true, createdAt: true },
    }),
    prisma.listing.aggregate({ _avg: { price: true } }),
  ]);

  const totalListings = listingsByStatus.reduce((s, l) => s + l._count, 0);
  const totalOffers = offersByStatus.reduce((s, o) => s + o._count, 0);
  const avgPrice = avgPriceResult._avg.price ?? 0;

  const statusLabel: Record<string, string> = {
    ACTIVE: 'Aktif',
    PENDING: 'Beklemede',
    SOLD: 'Satıldı',
  };
  const statusColor: Record<string, string> = {
    ACTIVE: 'text-green-600 bg-green-50',
    PENDING: 'text-amber-600 bg-amber-50',
    SOLD: 'text-gray-500 bg-gray-100',
  };
  const offerLabel: Record<string, string> = {
    PENDING: 'Beklemede',
    ACCEPTED: 'Kabul Edildi',
    REJECTED: 'Reddedildi',
  };
  const offerColor: Record<string, string> = {
    PENDING: 'text-amber-600 bg-amber-50',
    ACCEPTED: 'text-green-600 bg-green-50',
    REJECTED: 'text-red-600 bg-red-50',
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans">
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 font-medium transition-colors"
          >
            <ArrowLeft size={15} />
            Dashboard
          </Link>
          <span className="text-gray-300">|</span>
          <h1 className="text-xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
            <BarChart3 size={20} className="text-[#00C49F]" />
            Analitik
          </h1>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Toplam İlan</p>
            <p className="text-3xl font-extrabold text-gray-900">{totalListings}</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Toplam Teklif</p>
            <p className="text-3xl font-extrabold text-gray-900">{totalOffers}</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Ortalama Fiyat</p>
            <p className="text-3xl font-extrabold text-gray-900">
              {avgPrice.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 })}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">

          {/* Durum Dağılımı */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-sm font-bold text-gray-700 mb-4 flex items-center gap-2">
              <TrendingUp size={15} className="text-[#00C49F]" />
              İlan Durum Dağılımı
            </h2>
            <div className="space-y-3">
              {listingsByStatus.length === 0 ? (
                <p className="text-sm text-gray-400">Veri yok.</p>
              ) : (
                listingsByStatus.map((row) => (
                  <div key={row.status} className="flex items-center justify-between">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusColor[row.status] ?? 'bg-gray-100 text-gray-500'}`}>
                      {statusLabel[row.status] ?? row.status}
                    </span>
                    <span className="text-sm font-bold text-gray-800">{row._count}</span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Teklif Durum Dağılımı */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-sm font-bold text-gray-700 mb-4 flex items-center gap-2">
              <Tag size={15} className="text-[#00C49F]" />
              Teklif Durum Dağılımı
            </h2>
            <div className="space-y-3">
              {offersByStatus.length === 0 ? (
                <p className="text-sm text-gray-400">Veri yok.</p>
              ) : (
                offersByStatus.map((row) => (
                  <div key={row.status} className="flex items-center justify-between">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${offerColor[row.status] ?? 'bg-gray-100 text-gray-500'}`}>
                      {offerLabel[row.status] ?? row.status}
                    </span>
                    <span className="text-sm font-bold text-gray-800">{row._count}</span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Mülk Tipi Dağılımı */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-sm font-bold text-gray-700 mb-4 flex items-center gap-2">
              <BarChart3 size={15} className="text-[#00C49F]" />
              Mülk Tipi Dağılımı
            </h2>
            <div className="space-y-3">
              {listingsByType.length === 0 ? (
                <p className="text-sm text-gray-400">Veri yok.</p>
              ) : (
                listingsByType.map((row) => (
                  <div key={row.propertyType} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 font-medium">{row.propertyType}</span>
                    <span className="text-sm font-bold text-gray-800">{row._count}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* En Çok Görüntülenen İlanlar */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
          <h2 className="text-sm font-bold text-gray-700 mb-4 flex items-center gap-2">
            <Eye size={15} className="text-[#00C49F]" />
            En Çok Görüntülenen 5 İlan
          </h2>
          {topListings.length === 0 ? (
            <p className="text-sm text-gray-400">Veri yok.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-2 px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Başlık</th>
                    <th className="text-left py-2 px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Fiyat</th>
                    <th className="text-left py-2 px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Durum</th>
                    <th className="text-right py-2 px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Görüntülenme</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {topListings.map((listing) => (
                    <tr key={listing.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-3 font-semibold text-gray-800 max-w-[260px] truncate">
                        <Link href={`/listing/${listing.id}`} className="hover:text-[#00C49F] transition-colors">
                          {listing.title}
                        </Link>
                      </td>
                      <td className="py-3 px-3 text-gray-600 whitespace-nowrap">
                        {listing.price.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 })}
                      </td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${statusColor[listing.status] ?? 'bg-gray-100 text-gray-500'}`}>
                          {statusLabel[listing.status] ?? listing.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right font-bold text-gray-800">{listing.views.toLocaleString('tr-TR')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Son Eklenen İlanlar */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-sm font-bold text-gray-700 mb-4">Son Eklenen İlanlar</h2>
          {recentActivity.length === 0 ? (
            <p className="text-sm text-gray-400">Veri yok.</p>
          ) : (
            <div className="space-y-3">
              {recentActivity.map((item) => (
                <div key={item.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                  <Link href={`/listing/${item.id}`} className="text-sm font-semibold text-gray-800 hover:text-[#00C49F] transition-colors truncate max-w-xs">
                    {item.title}
                  </Link>
                  <span className="text-xs text-gray-400 whitespace-nowrap ml-4">
                    {new Date(item.createdAt).toLocaleDateString('tr-TR')}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
