import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Lock, ShieldCheck, FileText, ArrowLeft, Calendar } from 'lucide-react';

export const dynamic = 'force-dynamic';

function formatPrice(price: number) {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    minimumFractionDigits: 0,
  }).format(price);
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat('tr-TR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; className: string }> = {
    OPEN: { label: 'Açık', className: 'bg-green-100 text-green-700' },
    IN_PROGRESS: { label: 'Devam Ediyor', className: 'bg-blue-100 text-blue-700' },
    CLOSED: { label: 'Kapandı', className: 'bg-slate-100 text-slate-600' },
  };
  const s = map[status] ?? { label: status, className: 'bg-gray-100 text-gray-600' };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${s.className}`}>
      {s.label}
    </span>
  );
}

export default async function LegalVaultPage() {
  const deals = await prisma.dealRoom.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      listing: { select: { id: true, title: true, price: true } },
      buyer: { select: { name: true, email: true } },
      seller: { select: { name: true, email: true } },
    },
  });

  const open = deals.filter(d => d.status === 'OPEN').length;
  const closed = deals.filter(d => d.status === 'CLOSED').length;

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="mb-10">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 transition-colors mb-6"
          >
            <ArrowLeft size={16} />
            Dashboard
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 bg-[#00C49F]/10 rounded-xl">
              <Lock size={24} className="text-[#00C49F]" />
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Legal Vault</h1>
          </div>
          <p className="text-slate-500 text-base font-medium">Hukuki sözleşme kasası</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {[
            { label: 'Toplam Anlaşma', value: deals.length, color: 'text-slate-900' },
            { label: 'Açık', value: open, color: 'text-green-600' },
            { label: 'Kapandı', value: closed, color: 'text-slate-500' },
          ].map(stat => (
            <div
              key={stat.label}
              className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6"
            >
              <p className="text-sm text-slate-500 font-medium mb-1">{stat.label}</p>
              <p className={`text-3xl font-extrabold ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Deal cards */}
        {deals.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-16 text-center">
            <FileText size={40} className="mx-auto mb-4 text-slate-300" />
            <p className="text-slate-500 font-medium">Kayıtlı hukuki anlaşma bulunamadı.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {deals.map(deal => (
              <div
                key={deal.id}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col gap-4"
              >
                {/* Title row */}
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-[#00C49F]/10 rounded-xl flex-shrink-0">
                    <ShieldCheck size={20} className="text-[#00C49F]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/listing/${deal.listing.id}`}
                      className="font-bold text-slate-900 hover:text-[#00C49F] transition-colors line-clamp-1 text-base"
                    >
                      {deal.listing.title}
                    </Link>
                    <p className="text-sm text-slate-400 font-semibold mt-0.5">
                      {formatPrice(deal.listing.price)}
                    </p>
                  </div>
                  <StatusBadge status={deal.status} />
                </div>

                {/* Parties */}
                <div className="flex gap-4 text-sm">
                  <div className="flex-1">
                    <p className="text-xs text-slate-400 font-medium uppercase tracking-wide mb-0.5">
                      Alıcı
                    </p>
                    <p className="text-slate-700 font-semibold truncate">
                      {deal.buyer.name ?? deal.buyer.email}
                    </p>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-slate-400 font-medium uppercase tracking-wide mb-0.5">
                      Satıcı
                    </p>
                    <p className="text-slate-700 font-semibold truncate">
                      {deal.seller.name ?? deal.seller.email}
                    </p>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                  <span className="inline-flex items-center gap-1.5 text-xs text-slate-400">
                    <Calendar size={13} />
                    {formatDate(deal.createdAt)}
                  </span>
                  <button
                    disabled
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 bg-slate-100 px-3 py-1.5 rounded-lg cursor-not-allowed"
                  >
                    <FileText size={13} />
                    Sözleşme Görüntüle
                    <span className="text-[10px] bg-slate-200 px-1.5 py-0.5 rounded-full">Yakında</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
