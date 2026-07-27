import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { ArrowLeft, Activity, Clock, CheckCircle, DoorOpen } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminDealsPage() {
  const [deals, openCount, inProgressCount, closedCount] = await Promise.all([
    prisma.dealRoom.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        listing: { select: { id: true, title: true, price: true } },
        buyer: { select: { name: true, email: true } },
        seller: { select: { name: true, email: true } },
      },
    }),
    prisma.dealRoom.count({ where: { status: 'OPEN' } }),
    prisma.dealRoom.count({ where: { status: 'IN_PROGRESS' } }),
    prisma.dealRoom.count({ where: { status: 'CLOSED' } }),
  ]);

  const statusConfig: Record<string, { label: string; cls: string }> = {
    OPEN:        { label: 'Açık',       cls: 'bg-amber-50 text-amber-700' },
    IN_PROGRESS: { label: 'Müzakerede', cls: 'bg-blue-50 text-blue-700' },
    CLOSED:      { label: 'Tamamlandı', cls: 'bg-green-50 text-green-700' },
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans">
      <div className="max-w-7xl mx-auto px-6 py-10">

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
            Anlaşma Odaları
            <span className="ml-2 text-base font-semibold text-gray-400">({deals.length} adet)</span>
          </h1>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Açık', value: openCount, color: 'text-amber-600', bg: 'bg-amber-50', Icon: Clock },
            { label: 'Müzakerede', value: inProgressCount, color: 'text-blue-700', bg: 'bg-blue-50', Icon: Activity },
            { label: 'Tamamlandı', value: closedCount, color: 'text-green-700', bg: 'bg-green-50', Icon: CheckCircle },
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
                  {['İlan', 'Fiyat', 'Alıcı', 'Satıcı', 'Durum', 'Tarih', ''].map((h) => (
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
                {deals.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-5 py-12 text-center text-sm text-gray-400">
                      Henüz anlaşma odası bulunmuyor.
                    </td>
                  </tr>
                ) : (
                  deals.map((deal) => {
                    const cfg = statusConfig[deal.status] ?? statusConfig.OPEN;
                    return (
                      <tr key={deal.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-5 py-4 max-w-[200px]">
                          <Link href={`/listing/${deal.listing.id}`} className="text-xs font-semibold text-[#00C49F] hover:underline line-clamp-2">
                            {deal.listing.title}
                          </Link>
                        </td>
                        <td className="px-5 py-4 font-mono text-xs text-gray-600 whitespace-nowrap">
                          {deal.listing.price.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 })}
                        </td>
                        <td className="px-5 py-4">
                          <p className="font-semibold text-gray-800 text-xs">{deal.buyer.name ?? '—'}</p>
                          <p className="text-[10px] text-gray-400">{deal.buyer.email}</p>
                        </td>
                        <td className="px-5 py-4">
                          <p className="font-semibold text-gray-800 text-xs">{deal.seller.name ?? '—'}</p>
                          <p className="text-[10px] text-gray-400">{deal.seller.email}</p>
                        </td>
                        <td className="px-5 py-4">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold ${cfg.cls}`}>
                            {cfg.label}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-gray-400 whitespace-nowrap text-xs">
                          {new Date(deal.createdAt).toLocaleDateString('tr-TR')}
                        </td>
                        <td className="px-5 py-4">
                          <Link
                            href={`/boardroom/${deal.id}`}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F0FDF8] text-[#00C49F] rounded-lg text-[10px] font-bold hover:bg-[#00C49F] hover:text-white transition-colors"
                          >
                            <DoorOpen size={11} /> Odaya Gir
                          </Link>
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
