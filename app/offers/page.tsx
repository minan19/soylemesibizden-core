import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import Link from 'next/link';
import OfferStatusButton from '@/components/OfferStatusButton';
import {
  Handshake, ArrowLeft, Calendar, TrendingUp,
  CheckCircle, XCircle, Clock, ArrowRight,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

function formatCurrency(val: number): string {
  if (val >= 1e9) return (val / 1e9).toFixed(2) + ' Milyar ₺';
  if (val >= 1e6) return (val / 1e6).toFixed(2) + ' Milyon ₺';
  return val.toLocaleString('tr-TR') + ' ₺';
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'short', year: 'numeric' }).format(date);
}

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; Icon: React.ElementType }> = {
  PENDING: { label: 'Beklemede', color: '#F59E0B', bg: '#FFFBEB', Icon: Clock },
  ACCEPTED: { label: 'Kabul Edildi', color: '#00C49F', bg: '#F0FDF8', Icon: CheckCircle },
  REJECTED: { label: 'Reddedildi', color: '#EF4444', bg: '#FEF2F2', Icon: XCircle },
  COUNTERED: { label: 'Karşı Teklif', color: '#8B5CF6', bg: '#F5F3FF', Icon: TrendingUp },
};

export default async function OffersPage() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as { id?: string } | undefined)?.id;

  const offers = await prisma.offer.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      listing: { select: { id: true, title: true, priceAmount: true, ownerId: true } },
      user: { select: { id: true, name: true, email: true } },
    },
  });

  const myOffers = userId ? offers.filter((o) => o.userId === userId) : [];
  const receivedOffers = userId
    ? offers.filter((o) => o.listing.ownerId === userId && o.userId !== userId)
    : [];
  const allOffers = userId ? null : offers; // Admin görünümü için

  const stats = [
    { label: 'Toplam Teklif', value: offers.length, color: '#00C49F' },
    { label: 'Bekleyen', value: offers.filter((o) => o.status === 'PENDING').length, color: '#F59E0B' },
    { label: 'Kabul Edilen', value: offers.filter((o) => o.status === 'ACCEPTED').length, color: '#00C49F' },
    { label: 'Reddedilen', value: offers.filter((o) => o.status === 'REJECTED').length, color: '#EF4444' },
  ];

  const renderOfferCard = (offer: typeof offers[0], isOwner: boolean) => {
    const cfg = STATUS_CONFIG[offer.status] ?? STATUS_CONFIG.PENDING;
    const pctDiff = ((offer.amount - offer.listing.priceAmount) / offer.listing.priceAmount * 100).toFixed(1);
    return (
      <div key={offer.id} className="bg-white rounded-[28px] border border-gray-100 p-7 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.05)] transition-all">
        <div className="flex items-start justify-between mb-5">
          <div>
            <Link href={`/listing/${offer.listing.id}`} className="font-bold text-[#0F172A] hover:text-[#00C49F] transition-colors text-base leading-tight">
              {offer.listing.title}
            </Link>
            <p className="text-[11px] text-gray-400 mt-1 flex items-center gap-1">
              <Calendar size={11} /> {formatDate(offer.createdAt)}
            </p>
          </div>
          <span className="flex items-center gap-1.5 text-[10px] font-black px-3 py-1.5 rounded-full" style={{ color: cfg.color, backgroundColor: cfg.bg }}>
            <cfg.Icon size={11} /> {cfg.label}
          </span>
        </div>

        <div className="flex items-end justify-between mb-5">
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Teklif</p>
            <p className="text-2xl font-black tracking-tight text-[#0F172A]">{formatCurrency(offer.amount)}</p>
            <p className={`text-[11px] font-bold mt-1 ${Number(pctDiff) < 0 ? 'text-[#00C49F]' : 'text-amber-500'}`}>
              İlan fiyatının {Number(pctDiff) < 0 ? `%${Math.abs(Number(pctDiff))} altında` : `%${pctDiff} üzerinde`}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">İlan Fiyatı</p>
            <p className="text-lg font-bold text-gray-400">{formatCurrency(offer.listing.priceAmount)}</p>
          </div>
        </div>

        <div className="border-t border-gray-50 pt-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#F0FDF8] flex items-center justify-center">
                <span className="text-[10px] font-black text-[#00C49F]">
                  {(offer.user?.name ?? offer.user?.email ?? 'A')[0].toUpperCase()}
                </span>
              </div>
              <span className="text-[12px] font-semibold text-gray-600">
                {offer.user?.name ?? offer.user?.email ?? 'Anonim'}
              </span>
            </div>
            {isOwner && offer.status === 'PENDING' && (
              <OfferStatusButton offerId={offer.id} />
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-[#0F172A]">
      <nav className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-gray-100 h-20 flex items-center justify-between px-10">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="flex items-center gap-2 text-[11px] font-bold text-gray-400 hover:text-[#0F172A] transition-colors">
            <ArrowLeft size={16} /> Dashboard
          </Link>
          <span className="text-gray-200">·</span>
          <div className="flex items-center gap-2">
            <Handshake size={16} className="text-[#00C49F]" />
            <span className="text-[11px] font-bold">Teklif Merkezi</span>
          </div>
        </div>
        <Link href="/listings" className="px-5 py-2.5 bg-[#0F172A] text-white text-[11px] font-black rounded-full hover:bg-[#1E293B] transition-all">
          İLAN ARA
        </Link>
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

        {userId ? (
          <div className="grid grid-cols-12 gap-8">
            {/* ALINAN TEKLİFLER */}
            <div className="col-span-6">
              <h2 className="text-[11px] font-black tracking-widest text-gray-400 uppercase mb-5 flex items-center gap-2">
                <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
                Alınan Teklifler ({receivedOffers.length})
              </h2>
              <div className="space-y-4">
                {receivedOffers.length === 0 ? (
                  <div className="bg-white rounded-[28px] border border-gray-100 p-10 text-center text-gray-400 italic text-sm">
                    Henüz teklif almadınız.
                  </div>
                ) : (
                  receivedOffers.map((o) => renderOfferCard(o, true))
                )}
              </div>
            </div>

            {/* VERDİĞİM TEKLİFLER */}
            <div className="col-span-6">
              <h2 className="text-[11px] font-black tracking-widest text-gray-400 uppercase mb-5 flex items-center gap-2">
                <span className="w-2 h-2 bg-[#00C49F] rounded-full animate-pulse" />
                Verdiğim Teklifler ({myOffers.length})
              </h2>
              <div className="space-y-4">
                {myOffers.length === 0 ? (
                  <div className="bg-white rounded-[28px] border border-gray-100 p-10 text-center text-gray-400 italic text-sm">
                    Henüz teklif vermediniz.
                    <Link href="/listings" className="block mt-3 text-[#00C49F] font-bold hover:underline">
                      İlan Ara →
                    </Link>
                  </div>
                ) : (
                  myOffers.map((o) => renderOfferCard(o, false))
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <h2 className="text-[11px] font-black tracking-widest text-gray-400 uppercase mb-5">
              Tüm Teklifler ({offers.length})
            </h2>
            <div className="grid grid-cols-2 gap-5">
              {offers.map((o) => renderOfferCard(o, false))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
