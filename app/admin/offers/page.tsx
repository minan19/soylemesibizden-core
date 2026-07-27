import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { ArrowLeft, TrendingUp, Clock, CheckCircle, XCircle } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminOffersPage() {
  const [offers, pendingCount, acceptedCount, rejectedCount] = await Promise.all([
    prisma.offer.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        listing: { select: { id: true, title: true, price: true } },
        user: { select: { name: true, email: true } },
      },
    }),
    prisma.offer.count({ where: { status: 'PENDING' } }),
    prisma.offer.count({ where: { status: 'ACCEPTED' } }),
    prisma.offer.count({ where: { status: 'REJECTED' } }),
  ]);

  const statusConfig: Record<string, { label: string; cls: string; Icon: typeof Clock }> = {
    PENDING:  { label: 'Beklemede', cls: 'bg-amber-50 text-amber-700',  Icon: Clock },
    ACCEPTED: { label: 'Kabul',     cls: 'bg-green-50 text-green-700',  Icon: CheckCircle },
    REJECTED: { label: 'Red',       cls: 'bg-red-50 text-red-600',      Icon: XCircle },
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans">
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/admin/dashboard"
            className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 font-medium transition-colors"
          >
            <ArrowLeft size={15} />
            Admin Panel
          </Link>
          <span className="text-gray-300">|</span>
          <h1 className="text-xl font-extrabold text-gray-900 tracking-tight">
            Teklif Yönetimi
            <span className="ml-2 text-base font-semibold text-gray-400">({offers.length} adet)</span>
          </h1>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Beklemede', value: pendingCount, color: 'text-amber-600', bg: 'bg-amber-50', Icon: Clock },
            { label: 'Kabul Edildi', value: acceptedCount, color: 'text-green-700', bg: 'bg-green-50', Icon: CheckCircle },
            { label: 'Reddedildi', value: rejectedCount, color: 'text-red-600', bg: 'bg-red-50', Icon: XCircle },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center gap-4">
              <div className={`w-10 h-10 ${s.bg} rounded-xl flex items-center justify-center`}>
                <s.Icon size={18} className={s.color} />
              </div>
              <div>
                <p className={`text-2xl font-extrabold ${s.color}`}>{s.value}</p>
                <p className="text-xs text-gray-400 font-semibold">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {['Kullanıcı', 'İlan', 'İlan Fiyatı', 'Teklif', 'Fark', 'Durum', 'Tarih'].map((h) => (
                    <th
                      key={h}
                      className="px-5 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {offers.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-5 py-12 text-center text-sm text-gray-400">
                      Henüz teklif bulunmuyor.
                    </td>
                  </tr>
                ) : (
                  offers.map((offer) => {
                    const diff = offer.amount - offer.listing.price;
                    const diffPct = Math.round((diff / offer.listing.price) * 100);
                    const cfg = statusConfig[offer.status] ?? statusConfig.PENDING;
                    const StatusIcon = cfg.Icon;
                    return (
                      <tr key={offer.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-5 py-4">
                          <p className="font-semibold text-gray-800">{offer.user.name ?? '—'}</p>
                          <p className="text-xs text-gray-400">{offer.user.email}</p>
                        </td>
                        <td className="px-5 py-4 max-w-[180px]">
                          <Link href={`/listing/${offer.listing.id}`} className="text-xs font-semibold text-[#00C49F] hover:underline line-clamp-2">
                            {offer.listing.title}
                          </Link>
                        </td>
                        <td className="px-5 py-4 font-mono text-xs text-gray-600 whitespace-nowrap">
                          {offer.listing.price.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 })}
                        </td>
                        <td className="px-5 py-4 font-mono font-bold text-gray-900 whitespace-nowrap">
                          {offer.amount.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 })}
                        </td>
                        <td className={`px-5 py-4 text-xs font-bold whitespace-nowrap ${diff > 0 ? 'text-green-600' : diff < 0 ? 'text-red-500' : 'text-gray-400'}`}>
                          {diff > 0 ? '+' : ''}{diffPct}%
                        </td>
                        <td className="px-5 py-4">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${cfg.cls}`}>
                            <StatusIcon size={10} /> {cfg.label}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-gray-400 whitespace-nowrap text-xs">
                          {new Date(offer.createdAt).toLocaleDateString('tr-TR')}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
