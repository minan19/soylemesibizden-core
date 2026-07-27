import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect, notFound } from 'next/navigation';
import {
  ArrowLeft,
  Eye,
  Heart,
  TrendingUp,
  MessageSquare,
  Clock,
  CheckCircle,
  XCircle,
  BarChart2,
  MapPin,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

function formatPrice(p: number) {
  return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(p);
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const listing = await prisma.listing.findUnique({ where: { id: params.id }, select: { title: true } });
  return { title: `Analitik — ${listing?.title ?? 'İlan'} | Söylemesi Bizden` };
}

export default async function ListingAnalyticsPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) redirect('/login');

  const me = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!me) redirect('/login');

  const listing = await prisma.listing.findUnique({
    where: { id: params.id },
    include: {
      _count: { select: { offers: true, favorites: true, inquiries: true } },
      offers: {
        orderBy: { createdAt: 'desc' },
        take: 10,
        include: { user: { select: { name: true, email: true } } },
      },
      inquiries: {
        orderBy: { createdAt: 'desc' },
        take: 5,
        select: { id: true, name: true, email: true, createdAt: true, message: true },
      },
    },
  });

  if (!listing) notFound();
  if (listing.ownerId !== me.id && me.role !== 'ADMIN') redirect('/my-listings');

  const pendingOffers = listing.offers.filter(o => o.status === 'PENDING').length;
  const acceptedOffers = listing.offers.filter(o => o.status === 'ACCEPTED').length;
  const rejectedOffers = listing.offers.filter(o => o.status === 'REJECTED').length;
  const avgOffer = listing.offers.length > 0
    ? listing.offers.reduce((s, o) => s + o.amount, 0) / listing.offers.length
    : 0;
  const highestOffer = listing.offers.length > 0 ? Math.max(...listing.offers.map(o => o.amount)) : 0;

  const statusOfferConfig: Record<string, { label: string; cls: string; Icon: typeof Clock }> = {
    PENDING:  { label: 'Beklemede', cls: 'bg-amber-50 text-amber-700', Icon: Clock },
    ACCEPTED: { label: 'Kabul',     cls: 'bg-green-50 text-green-700', Icon: CheckCircle },
    REJECTED: { label: 'Red',       cls: 'bg-red-50 text-red-600',     Icon: XCircle },
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-5xl mx-auto px-8 py-10 space-y-8">

        {/* Header */}
        <div>
          <Link href="/my-listings" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-700 transition-colors mb-3">
            <ArrowLeft size={14} /> İlanlarım
          </Link>
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#F0FDF8] flex items-center justify-center text-[#00C49F] shrink-0">
                <BarChart2 size={20} />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 line-clamp-2">{listing.title}</h1>
                <p className="text-sm text-gray-400 mt-1 flex items-center gap-1">
                  {listing.location || listing.city
                    ? <><MapPin size={12} /> {listing.location ?? listing.city}</>
                    : 'Konum belirtilmemiş'}
                </p>
              </div>
            </div>
            <div className="shrink-0">
              <Link
                href={`/listing/${listing.id}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 border border-gray-200 text-gray-600 text-sm font-semibold rounded-xl hover:bg-gray-50 transition-colors"
              >
                İlanı Görüntüle
              </Link>
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Görüntülenme', value: listing.views.toLocaleString('tr-TR'), icon: <Eye size={18} />, color: 'text-gray-900', bg: 'bg-gray-50' },
            { label: 'Favori', value: listing._count.favorites, icon: <Heart size={18} />, color: 'text-rose-500', bg: 'bg-rose-50' },
            { label: 'Teklif', value: listing._count.offers, icon: <TrendingUp size={18} />, color: 'text-[#00C49F]', bg: 'bg-[#F0FDF8]' },
            { label: 'Başvuru', value: listing._count.inquiries, icon: <MessageSquare size={18} />, color: 'text-amber-600', bg: 'bg-amber-50' },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-5">
              <div className={`w-9 h-9 ${s.bg} rounded-xl flex items-center justify-center ${s.color} mb-3`}>
                {s.icon}
              </div>
              <p className={`text-2xl font-extrabold ${s.color}`}>{s.value}</p>
              <p className="text-[10px] font-bold tracking-widest text-gray-400 mt-1 uppercase">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Offer breakdown */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
            <h2 className="text-[10px] font-bold tracking-widest text-[#00C49F] uppercase flex items-center gap-2">
              <TrendingUp size={12} /> Teklif Analizi
            </h2>

            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Bekleyen', value: pendingOffers, cls: 'text-amber-600 bg-amber-50' },
                { label: 'Kabul',    value: acceptedOffers, cls: 'text-green-700 bg-green-50' },
                { label: 'Reddedilen', value: rejectedOffers, cls: 'text-red-500 bg-red-50' },
              ].map(s => (
                <div key={s.label} className={`rounded-xl p-3 text-center ${s.cls}`}>
                  <p className="text-xl font-extrabold">{s.value}</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest mt-0.5 opacity-70">{s.label}</p>
                </div>
              ))}
            </div>

            {listing.offers.length > 0 && (
              <div className="border-t border-gray-50 pt-4 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">İlan Fiyatı</span>
                  <span className="font-bold text-gray-700">{formatPrice(listing.price)}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">Ortalama Teklif</span>
                  <span className="font-bold text-[#00C49F]">{formatPrice(avgOffer)}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">En Yüksek Teklif</span>
                  <span className="font-bold text-green-600">{formatPrice(highestOffer)}</span>
                </div>
                {highestOffer > 0 && (
                  <div className="flex items-center justify-between text-xs pt-1 border-t border-gray-50">
                    <span className="text-gray-400">En Yüksek / Fiyat</span>
                    <span className={`font-bold ${highestOffer >= listing.price ? 'text-green-600' : 'text-red-500'}`}>
                      {Math.round((highestOffer / listing.price) * 100)}%
                    </span>
                  </div>
                )}
              </div>
            )}

            {listing.offers.length === 0 && (
              <p className="text-xs text-gray-400 text-center py-4">Henüz teklif gelmedi.</p>
            )}
          </div>

          {/* Recent inquiries */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="text-[10px] font-bold tracking-widest text-[#00C49F] uppercase flex items-center gap-2 mb-4">
              <MessageSquare size={12} /> Son Başvurular
            </h2>
            {listing.inquiries.length === 0 ? (
              <p className="text-xs text-gray-400 text-center py-4">Henüz başvuru gelmedi.</p>
            ) : (
              <div className="space-y-3">
                {listing.inquiries.map(inq => (
                  <div key={inq.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                    <div className="w-7 h-7 rounded-full bg-[#F0FDF8] flex items-center justify-center text-[#00C49F] text-xs font-bold shrink-0">
                      {inq.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-xs font-semibold text-gray-800">{inq.name}</p>
                        <p className="text-[10px] text-gray-400">{new Date(inq.createdAt).toLocaleDateString('tr-TR')}</p>
                      </div>
                      <p className="text-[11px] text-gray-500 line-clamp-2 mt-0.5">{inq.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Recent offers table */}
        {listing.offers.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-50">
              <h2 className="text-[10px] font-bold tracking-widest text-[#00C49F] uppercase">Son Teklifler</h2>
            </div>
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  {['Teklif Sahibi', 'Miktar', 'Fark', 'Durum', 'Tarih'].map(h => (
                    <th key={h} className="px-5 py-3 text-left text-[10px] font-semibold text-gray-400 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {listing.offers.map(offer => {
                  const diff = offer.amount - listing.price;
                  const diffPct = Math.round((diff / listing.price) * 100);
                  const cfg = statusOfferConfig[offer.status] ?? statusOfferConfig.PENDING;
                  const StatusIcon = cfg.Icon;
                  return (
                    <tr key={offer.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-3">
                        <p className="font-semibold text-xs text-gray-800">{offer.user.name ?? '—'}</p>
                        <p className="text-[10px] text-gray-400">{offer.user.email}</p>
                      </td>
                      <td className="px-5 py-3 font-mono font-bold text-xs text-gray-900">{formatPrice(offer.amount)}</td>
                      <td className={`px-5 py-3 text-xs font-bold ${diff > 0 ? 'text-green-600' : diff < 0 ? 'text-red-500' : 'text-gray-400'}`}>
                        {diff > 0 ? '+' : ''}{diffPct}%
                      </td>
                      <td className="px-5 py-3">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${cfg.cls}`}>
                          <StatusIcon size={10} /> {cfg.label}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-[10px] text-gray-400">
                        {new Date(offer.createdAt).toLocaleDateString('tr-TR')}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
