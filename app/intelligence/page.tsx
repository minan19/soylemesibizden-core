import prisma from '@/lib/prisma';
import Link from 'next/link';
import { ArrowLeft, BrainCircuit, TrendingUp, CheckCircle, Activity, BarChart2 } from 'lucide-react';

export const dynamic = 'force-dynamic';

function formatPrice(price: number | null | undefined) {
  if (price == null) return '—';
  return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(price);
}

const statusConfig: Record<string, { label: string; className: string }> = {
  PENDING: { label: 'Beklemede', className: 'bg-yellow-50 text-yellow-700 border border-yellow-100' },
  ACCEPTED: { label: 'Kabul', className: 'bg-[#F0FDF8] text-[#00C49F] border border-[#00C49F]/20' },
  REJECTED: { label: 'Red', className: 'bg-red-50 text-red-700 border border-red-100' },
};

export default async function IntelligencePage() {
  const [priceStats, activeListings, allOffers, recentOffers] = await Promise.all([
    prisma.listing.aggregate({
      _avg: { price: true },
      _min: { price: true },
      _max: { price: true },
    }),
    prisma.listing.count({ where: { status: 'ACTIVE' } }),
    prisma.offer.findMany({ select: { status: true } }),
    prisma.offer.findMany({
      orderBy: { createdAt: 'desc' },
      take: 8,
      include: {
        listing: { select: { title: true, price: true } },
        user: { select: { name: true } },
      },
    }),
  ]);

  // Offer status breakdown
  const statusMap = new Map<string, number>();
  for (const o of allOffers) {
    statusMap.set(o.status, (statusMap.get(o.status) ?? 0) + 1);
  }
  const offerAcceptanceData = Array.from(statusMap.entries()).map(([status, count]) => ({ status, count }));
  const total = allOffers.length;
  const accepted = statusMap.get('ACCEPTED') ?? 0;
  const acceptanceRate = total > 0 ? Math.round((accepted / total) * 100) : 0;

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-5xl mx-auto px-8 py-10 space-y-8">

        <div>
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-700 transition-colors mb-3">
            <ArrowLeft size={14} /> Dashboard
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F0FDF8] flex items-center justify-center text-[#00C49F]">
              <BrainCircuit size={18} />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">İstihbarat Modülü</h1>
              <p className="text-xs text-gray-400 mt-0.5">Teklif akışı, fiyat aralıkları ve piyasa dinamikleri</p>
            </div>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'KABUL ORANI', value: `%${acceptanceRate}`, icon: <CheckCircle size={15} />, color: 'text-[#00C49F]', sub: `${accepted} / ${total} teklif` },
            { label: 'AKTİF İLAN', value: activeListings, icon: <Activity size={15} />, color: 'text-gray-900', sub: 'aktif' },
            { label: 'ORT. FİYAT', value: formatPrice(priceStats._avg.price), icon: <BarChart2 size={15} />, color: 'text-gray-900', sub: null },
            { label: 'MAKS FİYAT', value: formatPrice(priceStats._max.price), icon: <TrendingUp size={15} />, color: 'text-gray-900', sub: null },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-5">
              <div className={`${s.color} mb-2`}>{s.icon}</div>
              <p className={`text-xl font-bold ${s.color} leading-tight`}>{s.value}</p>
              {s.sub && <p className="text-[9px] text-gray-400 mt-0.5">{s.sub}</p>}
              <p className="text-[9px] font-bold tracking-widest text-gray-400 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Offer flow table */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-50 flex items-center gap-2">
              <Activity size={14} className="text-[#00C49F]" />
              <h2 className="text-[10px] font-bold tracking-widest text-[#00C49F] uppercase">Teklif Akışı</h2>
            </div>
            {recentOffers.length === 0 ? (
              <p className="p-6 text-gray-400 text-sm">Henüz teklif bulunmuyor.</p>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-[9px] font-bold text-gray-400 uppercase tracking-widest">İlan</th>
                    <th className="px-6 py-3 text-left text-[9px] font-bold text-gray-400 uppercase tracking-widest">Kullanıcı</th>
                    <th className="px-6 py-3 text-right text-[9px] font-bold text-gray-400 uppercase tracking-widest">Tutar</th>
                    <th className="px-6 py-3 text-left text-[9px] font-bold text-gray-400 uppercase tracking-widest">Durum</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {recentOffers.map(offer => {
                    const sc = statusConfig[offer.status] ?? { label: offer.status, className: 'bg-gray-50 text-gray-600 border border-gray-100' };
                    return (
                      <tr key={offer.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-3 max-w-[180px]">
                          <p className="text-sm font-semibold text-gray-900 line-clamp-1">{offer.listing.title}</p>
                          <p className="text-xs text-gray-400">{formatPrice(offer.listing.price)}</p>
                        </td>
                        <td className="px-6 py-3 text-sm text-gray-600">{offer.user.name ?? '—'}</td>
                        <td className="px-6 py-3 text-sm font-bold text-[#00C49F] text-right whitespace-nowrap">
                          {formatPrice(offer.amount)}
                        </td>
                        <td className="px-6 py-3">
                          <span className={`inline-block px-2 py-0.5 text-[10px] font-bold rounded-full ${sc.className}`}>
                            {sc.label}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>

          {/* Market summary + offer breakdown */}
          <div className="space-y-4">
            <div className="bg-[#F0FDF8] rounded-2xl border border-[#00C49F]/20 p-5">
              <h2 className="text-[10px] font-bold tracking-widest text-[#00C49F] uppercase mb-3">Piyasa Özeti</h2>
              <p className="text-xs text-gray-600 leading-relaxed">
                Platformda <span className="font-bold text-gray-900">{activeListings}</span> aktif ilan bulunmaktadır.
                Teklif kabul oranı <span className="font-bold text-[#00C49F]">%{acceptanceRate}</span> ile seyrediyor;
                toplam <span className="font-bold text-gray-900">{total}</span> teklif değerlendirilmiştir.
              </p>
            </div>

            {offerAcceptanceData.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-100 p-5">
                <h2 className="text-[10px] font-bold tracking-widest text-[#00C49F] uppercase mb-4">Teklif Dağılımı</h2>
                <div className="space-y-3">
                  {offerAcceptanceData.map(({ status, count }) => {
                    const sc = statusConfig[status] ?? { label: status, className: 'bg-gray-50 text-gray-600 border border-gray-100' };
                    const pct = total > 0 ? Math.round((count / total) * 100) : 0;
                    return (
                      <div key={status}>
                        <div className="flex items-center justify-between mb-1">
                          <span className={`inline-block px-2 py-0.5 text-[10px] font-bold rounded-full ${sc.className}`}>
                            {sc.label}
                          </span>
                          <span className="text-xs font-bold text-gray-700">{count} (%{pct})</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-1.5">
                          <div className="bg-[#00C49F] h-1.5 rounded-full" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
