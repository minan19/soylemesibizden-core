import prisma from '@/lib/prisma';
import Link from 'next/link';
import { ArrowLeft, TrendingUp, CheckCircle, XCircle, Clock, ArrowRight } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function OffersPage() {
  const offers = await prisma.offer.findMany({
    orderBy: { createdAt: 'desc' },
    include: { listing: true, user: true },
  });

  const total = offers.length;
  const pending = offers.filter(o => o.status === 'PENDING').length;
  const accepted = offers.filter(o => o.status === 'ACCEPTED').length;
  const rejected = offers.filter(o => o.status === 'REJECTED').length;

  const statusConfig: Record<string, { label: string; className: string; icon: React.ReactNode }> = {
    PENDING:  { label: 'BEKLEMEDE', className: 'bg-amber-50 text-amber-600 border border-amber-200',   icon: <Clock size={12} /> },
    ACCEPTED: { label: 'KABUL',     className: 'bg-[#F0FDF8] text-[#00C49F] border border-[#00C49F]/20', icon: <CheckCircle size={12} /> },
    REJECTED: { label: 'RED',       className: 'bg-red-50 text-red-500 border border-red-200',         icon: <XCircle size={12} /> },
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-gray-900">
      <div className="max-w-7xl mx-auto px-8 py-10 space-y-8">

        <div className="flex items-center justify-between">
          <div>
            <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-700 transition-colors mb-3">
              <ArrowLeft size={14} /> Dashboard
            </Link>
            <h1 className="text-3xl font-bold tracking-tight">Teklif Akışı</h1>
            <p className="text-sm text-gray-500 mt-1">{total} teklif</p>
          </div>
          <Link href="/listings" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#00C49F] hover:bg-[#00a882] text-white text-sm font-bold rounded-xl transition-colors">
            <TrendingUp size={15} /> Yeni Teklif Ver
          </Link>
        </div>

        {/* İstatistikler */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'TOPLAM', value: total, color: 'text-gray-900' },
            { label: 'BEKLEMEDE', value: pending, color: 'text-amber-600' },
            { label: 'KABUL EDİLDİ', value: accepted, color: 'text-[#00C49F]' },
            { label: 'REDDEDİLDİ', value: rejected, color: 'text-red-500' },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-5">
              <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-[9px] font-bold tracking-widest text-gray-400 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Teklif Listesi */}
        <div className="space-y-3">
          {offers.map(offer => {
            const cfg = statusConfig[offer.status] ?? statusConfig.PENDING;
            return (
              <div key={offer.id} className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center justify-between hover:shadow-md transition-all group">
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-xl bg-[#F0FDF8] flex items-center justify-center text-[#00C49F]">
                    <TrendingUp size={20} />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-900 font-mono">
                      ₺ {offer.amount.toLocaleString('tr-TR')}
                    </p>
                    <p className="text-sm text-gray-500 mt-0.5">
                      <Link href={`/listing/${offer.listingId}`} className="hover:text-[#00C49F] transition-colors">
                        {offer.listing.title}
                      </Link>
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {offer.user.name ?? offer.user.email} · {new Date(offer.createdAt).toLocaleDateString('tr-TR')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold tracking-widest ${cfg.className}`}>
                    {cfg.icon} {cfg.label}
                  </span>
                  <ArrowRight size={16} className="text-gray-300 group-hover:text-[#00C49F] transition-colors" />
                </div>
              </div>
            );
          })}

          {offers.length === 0 && (
            <div className="bg-white rounded-3xl border border-dashed border-gray-200 py-20 text-center">
              <TrendingUp size={32} className="text-gray-300 mx-auto mb-3" />
              <p className="text-gray-400 text-sm">Henüz teklif bulunmamaktadır.</p>
              <Link href="/listings" className="mt-4 inline-flex items-center gap-1 text-xs text-[#00C49F] font-semibold hover:underline">
                İlanlara göz at <ArrowRight size={12} />
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
