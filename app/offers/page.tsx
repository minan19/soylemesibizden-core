import prisma from '@/lib/prisma';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { ArrowLeft, TrendingUp, CheckCircle, XCircle, Clock, ArrowRight, Inbox } from 'lucide-react';
import OfferActions from '@/components/OfferActions';

export const dynamic = 'force-dynamic';

const statusConfig: Record<string, { label: string; cls: string; icon: React.ReactNode }> = {
  PENDING:  { label: 'BEKLEMEDE', cls: 'bg-amber-50 text-amber-600 border border-amber-200',      icon: <Clock size={12} /> },
  ACCEPTED: { label: 'KABUL',     cls: 'bg-[#F0FDF8] text-[#00C49F] border border-[#00C49F]/20', icon: <CheckCircle size={12} /> },
  REJECTED: { label: 'RED',       cls: 'bg-red-50 text-red-500 border border-red-200',            icon: <XCircle size={12} /> },
};

export default async function OffersPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    const offers = await prisma.offer.findMany({
      orderBy: { createdAt: 'desc' },
      include: { listing: { select: { id: true, title: true } }, user: { select: { name: true, email: true } } },
    });
    return (
      <GuestView
        offers={offers.map(o => ({ ...o, listingTitle: o.listing.title, userName: o.user.name ?? o.user.email }))}
      />
    );
  }

  const me = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!me) return null;

  const [outgoing, incoming] = await Promise.all([
    prisma.offer.findMany({
      where: { userId: me.id },
      orderBy: { createdAt: 'desc' },
      include: { listing: { select: { id: true, title: true } } },
    }),
    prisma.offer.findMany({
      where: { listing: { ownerId: me.id } },
      orderBy: { createdAt: 'desc' },
      include: {
        listing: { select: { id: true, title: true } },
        user: { select: { name: true, email: true } },
      },
    }),
  ]);

  const pendingCount = outgoing.filter(o => o.status === 'PENDING').length;
  const acceptedCount = outgoing.filter(o => o.status === 'ACCEPTED').length;

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-gray-900">
      <div className="max-w-5xl mx-auto px-8 py-10 space-y-8">

        <div className="flex items-center justify-between">
          <div>
            <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-700 transition-colors mb-3">
              <ArrowLeft size={14} /> Dashboard
            </Link>
            <h1 className="text-3xl font-bold tracking-tight">Teklifler</h1>
            <p className="text-sm text-gray-500 mt-1">{outgoing.length} teklif verdiniz</p>
          </div>
          <Link href="/listings" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#00C49F] hover:bg-[#00a882] text-white text-sm font-bold rounded-xl transition-colors">
            <TrendingUp size={15} /> Yeni Teklif Ver
          </Link>
        </div>

        {/* İstatistikler */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'TOPLAM', value: outgoing.length, color: 'text-gray-900' },
            { label: 'BEKLEMEDE', value: pendingCount, color: 'text-amber-600' },
            { label: 'KABUL EDİLDİ', value: acceptedCount, color: 'text-[#00C49F]' },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-5">
              <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-[9px] font-bold tracking-widest text-gray-400 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Gelen Teklifler */}
        {incoming.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Inbox size={16} className="text-[#00C49F]" />
              <h2 className="text-sm font-bold tracking-widest text-gray-400 uppercase">
                İlanlarıma Gelen Teklifler
              </h2>
              <span className="px-2 py-0.5 bg-amber-50 text-amber-600 text-[10px] font-bold rounded-full">
                {incoming.filter(o => o.status === 'PENDING').length} beklemede
              </span>
            </div>
            <div className="space-y-3">
              {incoming.map(offer => (
                <div key={offer.id} className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center justify-between hover:shadow-md transition-all">
                  <div>
                    <p className="text-lg font-bold text-gray-900 font-mono">
                      ₺ {offer.amount.toLocaleString('tr-TR')}
                    </p>
                    <Link href={`/listing/${offer.listing.id}`} className="text-sm text-gray-500 hover:text-[#00C49F] transition-colors">
                      {offer.listing.title}
                    </Link>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {offer.user.name ?? offer.user.email} · {new Date(offer.createdAt).toLocaleDateString('tr-TR')}
                    </p>
                  </div>
                  <OfferActions offerId={offer.id} currentStatus={offer.status} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Verdiğim Teklifler */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={16} className="text-gray-400" />
            <h2 className="text-sm font-bold tracking-widest text-gray-400 uppercase">Verdiğim Teklifler</h2>
          </div>
          <div className="space-y-3">
            {outgoing.map(offer => {
              const cfg = statusConfig[offer.status] ?? statusConfig.PENDING;
              return (
                <div key={offer.id} className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center justify-between hover:shadow-md transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#F0FDF8] flex items-center justify-center text-[#00C49F]">
                      <TrendingUp size={18} />
                    </div>
                    <div>
                      <p className="text-base font-bold text-gray-900 font-mono">
                        ₺ {offer.amount.toLocaleString('tr-TR')}
                      </p>
                      <Link href={`/listing/${offer.listing.id}`} className="text-sm text-gray-500 hover:text-[#00C49F] transition-colors">
                        {offer.listing.title}
                      </Link>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {new Date(offer.createdAt).toLocaleDateString('tr-TR')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold ${cfg.cls}`}>
                      {cfg.icon} {cfg.label}
                    </span>
                    <ArrowRight size={14} className="text-gray-300 group-hover:text-[#00C49F] transition-colors" />
                  </div>
                </div>
              );
            })}
            {outgoing.length === 0 && (
              <div className="bg-white rounded-2xl border border-dashed border-gray-200 py-12 text-center">
                <p className="text-gray-400 text-sm">Henüz teklif vermediniz.</p>
                <Link href="/listings" className="mt-3 inline-flex items-center gap-1 text-xs text-[#00C49F] font-semibold hover:underline">
                  İlanlara göz at <ArrowRight size={12} />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

function GuestView({ offers }: { offers: { id: string; amount: number; status: string; listingId: string; listingTitle: string; userName: string; createdAt: Date }[] }) {
  const total = offers.length;
  const pending = offers.filter(o => o.status === 'PENDING').length;
  const accepted = offers.filter(o => o.status === 'ACCEPTED').length;

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-gray-900">
      <div className="max-w-5xl mx-auto px-8 py-10 space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Teklif Akışı</h1>
          <p className="text-sm text-gray-500 mt-1">{total} teklif</p>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'TOPLAM', value: total, color: 'text-gray-900' },
            { label: 'BEKLEMEDE', value: pending, color: 'text-amber-600' },
            { label: 'KABUL', value: accepted, color: 'text-[#00C49F]' },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-5">
              <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-[9px] font-bold tracking-widest text-gray-400 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
        <div className="space-y-3">
          {offers.map(o => {
            const cfg = statusConfig[o.status] ?? statusConfig.PENDING;
            return (
              <div key={o.id} className="bg-white rounded-2xl border border-gray-100 p-5 flex justify-between items-center">
                <div>
                  <p className="font-bold font-mono">₺ {o.amount.toLocaleString('tr-TR')}</p>
                  <Link href={`/listing/${o.listingId}`} className="text-sm text-gray-500 hover:text-[#00C49F]">{o.listingTitle}</Link>
                  <p className="text-xs text-gray-400 mt-0.5">{o.userName} · {new Date(o.createdAt).toLocaleDateString('tr-TR')}</p>
                </div>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold ${cfg.cls}`}>
                  {cfg.icon} {cfg.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
