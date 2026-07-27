import prisma from '@/lib/prisma';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { ArrowLeft, Activity, ArrowRight, Users, Clock, DoorOpen } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function DealsPage() {
  const session = await getServerSession(authOptions);
  const me = session?.user?.email
    ? await prisma.user.findUnique({ where: { email: session.user.email } })
    : null;

  const deals = await prisma.dealRoom.findMany({
    orderBy: { createdAt: 'desc' },
    where: me ? { OR: [{ buyerId: me.id }, { sellerId: me.id }] } : undefined,
    include: {
      listing: true,
      buyer: true,
      seller: true,
    },
  });

  const open = deals.filter(d => d.status === 'OPEN').length;
  const inProgress = deals.filter(d => d.status === 'IN_PROGRESS').length;
  const closed = deals.filter(d => d.status === 'CLOSED').length;

  const statusConfig: Record<string, { label: string; className: string }> = {
    OPEN:        { label: 'AÇIK',      className: 'bg-[#F0FDF8] text-[#00C49F] border border-[#00C49F]/20' },
    IN_PROGRESS: { label: 'DEVAM',     className: 'bg-amber-50 text-amber-600 border border-amber-200' },
    CLOSED:      { label: 'KAPANDI',   className: 'bg-gray-100 text-gray-500 border border-gray-200' },
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-gray-900">
      <div className="max-w-7xl mx-auto px-8 py-10 space-y-8">

        <div className="flex items-center justify-between">
          <div>
            <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-700 transition-colors mb-3">
              <ArrowLeft size={14} /> Dashboard
            </Link>
            <h1 className="text-3xl font-bold tracking-tight">Anlaşma Odaları</h1>
            <p className="text-sm text-gray-500 mt-1">
              {me ? 'Katıldığınız anlaşmalar' : 'Tüm anlaşmalar'} · {deals.length} adet
            </p>
          </div>
        </div>

        {/* İstatistikler */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'AÇIK', value: open, color: 'text-[#00C49F]' },
            { label: 'DEVAM EDIYOR', value: inProgress, color: 'text-amber-600' },
            { label: 'KAPANDI', value: closed, color: 'text-gray-400' },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-5">
              <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-[9px] font-bold tracking-widest text-gray-400 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Deal Listesi */}
        <div className="space-y-4">
          {deals.map(deal => {
            const cfg = statusConfig[deal.status] ?? statusConfig.OPEN;
            return (
              <div key={deal.id} className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md transition-all group">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-[#F0FDF8] flex items-center justify-center text-[#00C49F]">
                      <Activity size={18} />
                    </div>
                    <div>
                      <Link href={`/listing/${deal.listingId}`} className="text-base font-semibold text-gray-900 hover:text-[#00C49F] transition-colors">
                        {deal.listing.title}
                      </Link>
                      <p className="text-xs text-gray-400 font-mono mt-0.5">{deal.id.slice(0, 16)}...</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold tracking-widest ${cfg.className}`}>
                      {cfg.label}
                    </span>
                    <Link
                      href={`/boardroom/${deal.id}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#00C49F] text-white rounded-full text-[10px] font-bold tracking-widest hover:bg-[#00a882] transition-colors"
                    >
                      <DoorOpen size={11} /> Odaya Gir
                    </Link>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-50">
                  <div className="flex items-center gap-2">
                    <Users size={13} className="text-gray-400" />
                    <div>
                      <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Alıcı</p>
                      <p className="text-xs font-semibold text-gray-900 mt-0.5">{deal.buyer.name ?? deal.buyer.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={13} className="text-gray-400" />
                    <div>
                      <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Satıcı</p>
                      <p className="text-xs font-semibold text-gray-900 mt-0.5">{deal.seller.name ?? deal.seller.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={13} className="text-gray-400" />
                    <div>
                      <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Tarih</p>
                      <p className="text-xs font-semibold text-gray-900 mt-0.5">{new Date(deal.createdAt).toLocaleDateString('tr-TR')}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {deals.length === 0 && (
            <div className="bg-white rounded-3xl border border-dashed border-gray-200 py-20 text-center">
              <Activity size={32} className="text-gray-300 mx-auto mb-3" />
              <p className="text-gray-400 text-sm">Açık anlaşma odası bulunmamaktadır.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
