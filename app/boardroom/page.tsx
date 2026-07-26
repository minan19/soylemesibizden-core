import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Gavel, TrendingUp, ArrowRight, ArrowLeft, Clock, CheckCircle } from 'lucide-react';

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

const STATUS_MAP: Record<string, { label: string; badge: string }> = {
  OPEN: { label: 'Açık', badge: 'bg-green-100 text-green-700' },
  IN_PROGRESS: { label: 'Devam Ediyor', badge: 'bg-blue-100 text-blue-700' },
  CLOSED: { label: 'Kapandı', badge: 'bg-slate-100 text-slate-600' },
};

function StatusBadge({ status }: { status: string }) {
  const s = STATUS_MAP[status] ?? { label: status, badge: 'bg-gray-100 text-gray-600' };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${s.badge}`}>
      {s.label}
    </span>
  );
}

export default async function BoardroomPage() {
  const rooms = await prisma.dealRoom.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      listing: { select: { id: true, title: true, price: true, city: true } },
      buyer: { select: { name: true, email: true } },
      seller: { select: { name: true, email: true } },
    },
  });

  const open = rooms.filter(r => r.status === 'OPEN').length;
  const inProgress = rooms.filter(r => r.status === 'IN_PROGRESS').length;
  const closed = rooms.filter(r => r.status === 'CLOSED').length;

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
              <Gavel size={24} className="text-[#00C49F]" />
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Boardroom</h1>
          </div>
          <p className="text-slate-500 text-base font-medium">Anlaşma müzakere odaları</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex items-center gap-4">
            <div className="p-2.5 bg-green-50 rounded-xl">
              <Clock size={18} className="text-green-500" />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Açık</p>
              <p className="text-3xl font-extrabold text-green-600">{open}</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex items-center gap-4">
            <div className="p-2.5 bg-blue-50 rounded-xl">
              <TrendingUp size={18} className="text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Devam Ediyor</p>
              <p className="text-3xl font-extrabold text-blue-600">{inProgress}</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex items-center gap-4">
            <div className="p-2.5 bg-slate-50 rounded-xl">
              <CheckCircle size={18} className="text-slate-400" />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Kapandı</p>
              <p className="text-3xl font-extrabold text-slate-500">{closed}</p>
            </div>
          </div>
        </div>

        {/* Room cards */}
        {rooms.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-16 text-center">
            <Gavel size={40} className="mx-auto mb-4 text-slate-300" />
            <p className="text-slate-500 font-medium">Kayıtlı müzakere odası bulunamadı.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {rooms.map(room => (
              <Link
                key={room.id}
                href={`/boardroom/${room.id}`}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col gap-4 hover:shadow-md hover:border-[#00C49F]/30 transition-all group"
              >
                {/* Title row */}
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-[#00C49F]/10 rounded-xl flex-shrink-0">
                    <Gavel size={18} className="text-[#00C49F]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-slate-900 line-clamp-1 text-base group-hover:text-[#00C49F] transition-colors">
                      {room.listing.title}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-sm font-semibold text-slate-500">
                        {formatPrice(room.listing.price)}
                      </span>
                      {room.listing.city && (
                        <span className="text-xs text-slate-400">• {room.listing.city}</span>
                      )}
                    </div>
                  </div>
                  <StatusBadge status={room.status} />
                </div>

                {/* Parties */}
                <div className="flex gap-4 text-sm">
                  <div className="flex-1">
                    <p className="text-xs text-slate-400 font-medium uppercase tracking-wide mb-0.5">
                      Alıcı
                    </p>
                    <p className="text-slate-700 font-semibold truncate">
                      {room.buyer.name ?? room.buyer.email}
                    </p>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-slate-400 font-medium uppercase tracking-wide mb-0.5">
                      Satıcı
                    </p>
                    <p className="text-slate-700 font-semibold truncate">
                      {room.seller.name ?? room.seller.email}
                    </p>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                  <span className="inline-flex items-center gap-1.5 text-xs text-slate-400">
                    <Clock size={13} />
                    {formatDate(room.createdAt)}
                  </span>
                  <ArrowRight
                    size={16}
                    className="text-slate-300 group-hover:text-[#00C49F] transition-colors"
                  />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
