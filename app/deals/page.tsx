import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import Link from 'next/link';
import {
  Shield, ArrowLeft, Calendar, Users,
  CheckCircle, XCircle, Clock, Zap, ArrowRight,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'short', year: 'numeric' }).format(date);
}

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; Icon: React.ElementType }> = {
  OPEN: { label: 'Açık', color: '#00C49F', bg: '#F0FDF8', Icon: Zap },
  IN_PROGRESS: { label: 'Devam Ediyor', color: '#3B82F6', bg: '#EFF6FF', Icon: Clock },
  CLOSED: { label: 'Kapandı', color: '#8B5CF6', bg: '#F5F3FF', Icon: CheckCircle },
  CANCELLED: { label: 'İptal', color: '#EF4444', bg: '#FEF2F2', Icon: XCircle },
};

export default async function DealsPage() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as { id?: string } | undefined)?.id;

  const deals = await prisma.dealRoom.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      listing: { select: { id: true, title: true, priceAmount: true } },
      buyer: { select: { id: true, name: true, email: true } },
      seller: { select: { id: true, name: true, email: true } },
    },
  });

  const myDeals = userId
    ? deals.filter((d) => d.buyerId === userId || d.sellerId === userId)
    : deals;

  const stats = [
    { label: 'Toplam Anlaşma', value: deals.length, color: '#00C49F' },
    { label: 'Açık', value: deals.filter((d) => d.status === 'OPEN').length, color: '#3B82F6' },
    { label: 'Devam Eden', value: deals.filter((d) => d.status === 'IN_PROGRESS').length, color: '#F59E0B' },
    { label: 'Kapandı', value: deals.filter((d) => d.status === 'CLOSED').length, color: '#8B5CF6' },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-[#0F172A]">
      <nav className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-gray-100 h-20 flex items-center justify-between px-10">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="flex items-center gap-2 text-[11px] font-bold text-gray-400 hover:text-[#0F172A] transition-colors">
            <ArrowLeft size={16} /> Dashboard
          </Link>
          <span className="text-gray-200">·</span>
          <div className="flex items-center gap-2">
            <Shield size={16} className="text-[#00C49F]" />
            <span className="text-[11px] font-bold">Anlaşma Odaları</span>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-8 py-10 space-y-10">
        {/* STATS */}
        <div className="grid grid-cols-4 gap-5">
          {stats.map((s) => (
            <div key={s.label} className="bg-white rounded-3xl border border-gray-100 p-7 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">{s.label}</p>
              <p className="text-3xl font-black" style={{ color: s.color }}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* DEALS LIST */}
        <div>
          <h2 className="text-[11px] font-black tracking-widest text-gray-400 uppercase mb-5 flex items-center gap-2">
            <span className="w-2 h-2 bg-[#00C49F] rounded-full animate-pulse" />
            {userId ? 'Anlaşmalarım' : 'Tüm Anlaşma Odaları'} ({myDeals.length})
          </h2>

          {myDeals.length === 0 ? (
            <div className="bg-white rounded-[40px] border border-gray-100 p-20 text-center">
              <Shield size={48} className="text-gray-200 mx-auto mb-6" />
              <p className="text-lg font-bold text-gray-400">Henüz anlaşma odanız bulunmuyor.</p>
              <Link href="/listings" className="block mt-4 text-[#00C49F] font-bold hover:underline">
                İlanları İncele →
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {myDeals.map((deal) => {
                const cfg = STATUS_CONFIG[deal.status] ?? STATUS_CONFIG.OPEN;
                return (
                  <div key={deal.id} className="bg-white rounded-[32px] border border-gray-100 p-8 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] transition-all">
                    {/* STATUS + DATE */}
                    <div className="flex items-center justify-between mb-5">
                      <span className="flex items-center gap-1.5 text-[10px] font-black px-3 py-1.5 rounded-full" style={{ color: cfg.color, backgroundColor: cfg.bg }}>
                        <cfg.Icon size={11} /> {cfg.label}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] text-gray-400">
                        <Calendar size={11} /> {formatDate(deal.createdAt)}
                      </span>
                    </div>

                    {/* LISTING */}
                    <Link href={`/listing/${deal.listing.id}`} className="block mb-5">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">İlan</p>
                      <h3 className="font-black text-lg text-[#0F172A] hover:text-[#00C49F] transition-colors">
                        {deal.listing.title}
                      </h3>
                    </Link>

                    {/* PARTIES */}
                    <div className="grid grid-cols-2 gap-4 mb-5">
                      <div className="bg-[#F8FAFC] rounded-2xl p-4">
                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">Alıcı</p>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                            <span className="text-[11px] font-black text-blue-600">
                              {(deal.buyer?.name ?? deal.buyer?.email ?? 'A')[0].toUpperCase()}
                            </span>
                          </div>
                          <p className="text-[12px] font-bold truncate">{deal.buyer?.name ?? deal.buyer?.email ?? '—'}</p>
                        </div>
                      </div>
                      <div className="bg-[#F8FAFC] rounded-2xl p-4">
                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">Satıcı</p>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-[#F0FDF8] flex items-center justify-center shrink-0">
                            <span className="text-[11px] font-black text-[#00C49F]">
                              {(deal.seller?.name ?? deal.seller?.email ?? 'S')[0].toUpperCase()}
                            </span>
                          </div>
                          <p className="text-[12px] font-bold truncate">{deal.seller?.name ?? deal.seller?.email ?? '—'}</p>
                        </div>
                      </div>
                    </div>

                    {/* DEAL ID */}
                    <div className="border-t border-gray-50 pt-4">
                      <p className="text-[10px] font-mono text-gray-300">
                        ID: {deal.id.slice(0, 16)}…
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
