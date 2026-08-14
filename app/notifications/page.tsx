'use server';

import prisma from '@/lib/prisma';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import {
  Bell,
  TrendingUp,
  CheckCircle,
  XCircle,
  Heart,
  MessageSquare,
  ArrowRight,
  Clock,
  DoorOpen,
  Filter,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

type NotifType = 'offer_received' | 'offer_accepted' | 'offer_rejected' | 'inquiry_received' | 'favorite_received' | 'deal_created';

interface Notif {
  id: string;
  type: NotifType;
  title: string;
  subtitle: string;
  href: string;
  date: Date;
}

const TAB_CONFIG: { value: NotifType | 'all'; label: string; icon: string }[] = [
  { value: 'all', label: 'Tümü', icon: '🔔' },
  { value: 'offer_received', label: 'Teklifler', icon: '💰' },
  { value: 'offer_accepted', label: 'Kabul', icon: '✅' },
  { value: 'offer_rejected', label: 'Red', icon: '❌' },
  { value: 'inquiry_received', label: 'Başvurular', icon: '📩' },
  { value: 'favorite_received', label: 'Favoriler', icon: '❤️' },
  { value: 'deal_created', label: 'Anlaşmalar', icon: '🤝' },
];

function timeAgo(date: Date) {
  const diffMs = Date.now() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return 'Az önce';
  if (diffMin < 60) return `${diffMin} dakika önce`;
  const diffH = Math.floor(diffMin / 60);
  if (diffH < 24) return `${diffH} saat önce`;
  const diffD = Math.floor(diffH / 24);
  return `${diffD} gün önce`;
}

function getDateGroup(date: Date): 'today' | 'week' | 'earlier' {
  const now = Date.now();
  const diffMs = now - date.getTime();
  const diffH = diffMs / (1000 * 60 * 60);
  if (diffH < 24) return 'today';
  if (diffH < 24 * 7) return 'week';
  return 'earlier';
}

const GROUP_LABELS: Record<string, string> = {
  today: 'Bugün',
  week: 'Bu Hafta',
  earlier: 'Daha Önce',
};

export default async function NotificationsPage({
  searchParams,
}: {
  searchParams: { tab?: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) redirect('/login');

  const me = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!me) redirect('/login');

  const cutoff = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const activeTab = (searchParams.tab as NotifType | 'all') ?? 'all';

  const [offersOnMyListings, myOffersUpdated, inquiriesOnMyListings, favoritesOnMyListings, dealRoomsAsParty] =
    await Promise.all([
      prisma.offer.findMany({
        where: { listing: { ownerId: me.id }, createdAt: { gte: cutoff } },
        orderBy: { createdAt: 'desc' },
        take: 20,
        include: {
          listing: { select: { id: true, title: true } },
          user: { select: { name: true, email: true } },
        },
      }),
      prisma.offer.findMany({
        where: { userId: me.id, status: { not: 'PENDING' }, updatedAt: { gte: cutoff } },
        orderBy: { updatedAt: 'desc' },
        take: 10,
        include: { listing: { select: { id: true, title: true } } },
      }),
      prisma.inquiry.findMany({
        where: { listing: { ownerId: me.id }, createdAt: { gte: cutoff } },
        orderBy: { createdAt: 'desc' },
        take: 10,
        include: { listing: { select: { id: true, title: true } } },
      }),
      prisma.favorite.findMany({
        where: { listing: { ownerId: me.id }, createdAt: { gte: cutoff } },
        orderBy: { createdAt: 'desc' },
        take: 10,
        include: {
          listing: { select: { id: true, title: true } },
          user: { select: { name: true, email: true } },
        },
      }),
      prisma.dealRoom.findMany({
        where: { OR: [{ buyerId: me.id }, { sellerId: me.id }], createdAt: { gte: cutoff } },
        orderBy: { createdAt: 'desc' },
        take: 10,
        include: { listing: { select: { id: true, title: true } } },
      }),
    ]);

  const allNotifs: Notif[] = [];

  for (const o of offersOnMyListings) {
    allNotifs.push({
      id: `offer-in-${o.id}`,
      type: 'offer_received',
      title: 'Yeni teklif aldınız',
      subtitle: `${o.user.name ?? o.user.email} — ${o.listing.title} için ₺${o.amount.toLocaleString('tr-TR')} teklif verdi`,
      href: `/offers`,
      date: o.createdAt,
    });
  }

  for (const o of myOffersUpdated) {
    allNotifs.push({
      id: `offer-status-${o.id}`,
      type: o.status === 'ACCEPTED' ? 'offer_accepted' : 'offer_rejected',
      title: o.status === 'ACCEPTED' ? 'Teklifiniz kabul edildi!' : 'Teklifiniz reddedildi',
      subtitle: `${o.listing.title} — ₺${o.amount.toLocaleString('tr-TR')}`,
      href: `/listing/${o.listing.id}`,
      date: o.updatedAt,
    });
  }

  for (const inq of inquiriesOnMyListings) {
    allNotifs.push({
      id: `inq-${inq.id}`,
      type: 'inquiry_received',
      title: 'Yeni başvuru',
      subtitle: `${inq.name} — ${inq.listing.title} hakkında mesaj gönderdi`,
      href: `/listing/${inq.listing.id}`,
      date: inq.createdAt,
    });
  }

  for (const fav of favoritesOnMyListings) {
    allNotifs.push({
      id: `fav-${fav.id}`,
      type: 'favorite_received',
      title: 'İlanınız favorilere eklendi',
      subtitle: `${fav.user.name ?? fav.user.email} — ${fav.listing.title}`,
      href: `/listing/${fav.listing.id}`,
      date: fav.createdAt,
    });
  }

  for (const deal of dealRoomsAsParty) {
    allNotifs.push({
      id: `deal-${deal.id}`,
      type: 'deal_created',
      title: 'Yeni anlaşma odası açıldı',
      subtitle: deal.listing.title,
      href: `/boardroom/${deal.id}`,
      date: deal.createdAt,
    });
  }

  allNotifs.sort((a, b) => b.date.getTime() - a.date.getTime());

  // Count per type for badge display
  const counts: Record<string, number> = { all: allNotifs.length };
  for (const n of allNotifs) {
    counts[n.type] = (counts[n.type] ?? 0) + 1;
  }

  const notifs = activeTab === 'all' ? allNotifs : allNotifs.filter(n => n.type === activeTab);

  // Group by date
  const groups: { key: string; label: string; items: Notif[] }[] = [];
  const seen = new Set<string>();
  for (const n of notifs) {
    const gk = getDateGroup(n.date);
    if (!seen.has(gk)) {
      seen.add(gk);
      groups.push({ key: gk, label: GROUP_LABELS[gk], items: [] });
    }
    groups[groups.length - 1].items.push(n);
  }

  const iconMap: Record<NotifType, React.ReactNode> = {
    offer_received:   <TrendingUp size={16} className="text-[#00C49F]" />,
    offer_accepted:   <CheckCircle size={16} className="text-[#00C49F]" />,
    offer_rejected:   <XCircle size={16} className="text-red-500" />,
    inquiry_received: <MessageSquare size={16} className="text-blue-500" />,
    favorite_received:<Heart size={16} className="text-pink-500" />,
    deal_created:     <DoorOpen size={16} className="text-amber-500" />,
  };

  const bgMap: Record<NotifType, string> = {
    offer_received:   'bg-[#F0FDF8]',
    offer_accepted:   'bg-[#F0FDF8]',
    offer_rejected:   'bg-red-50',
    inquiry_received: 'bg-blue-50',
    favorite_received:'bg-pink-50',
    deal_created:     'bg-amber-50',
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-3xl mx-auto px-6 py-10 space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F0FDF8] flex items-center justify-center text-[#00C49F]">
              <Bell size={18} />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-gray-900 tracking-tight">Bildirimler</h1>
              <p className="text-xs text-gray-400">Son 30 günlük aktivite</p>
            </div>
          </div>
          {allNotifs.length > 0 && (
            <span className="bg-[#00C49F] text-white text-xs font-bold px-2.5 py-1 rounded-full">
              {allNotifs.length}
            </span>
          )}
        </div>

        {/* Type Filter Tabs */}
        {allNotifs.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 p-3 shadow-sm">
            <div className="flex items-center gap-1 mb-2 px-1">
              <Filter size={11} className="text-gray-400" />
              <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Filtrele</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {TAB_CONFIG.filter(t => t.value === 'all' || (counts[t.value] ?? 0) > 0).map(tab => {
                const isActive = activeTab === tab.value;
                const count = counts[tab.value] ?? 0;
                return (
                  <Link
                    key={tab.value}
                    href={tab.value === 'all' ? '/notifications' : `/notifications?tab=${tab.value}`}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-[#00C49F] text-white shadow-sm'
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <span>{tab.icon}</span>
                    <span>{tab.label}</span>
                    {count > 0 && (
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                        isActive ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-500'
                      }`}>
                        {count}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Notification List */}
        {notifs.length === 0 ? (
          <div className="bg-white rounded-2xl border border-dashed border-gray-200 py-20 text-center">
            <Bell size={32} className="text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">
              {activeTab === 'all' ? 'Henüz bildirim yok' : 'Bu kategoride bildirim yok'}
            </p>
            <p className="text-gray-400 text-sm mt-1">Son 30 günde yeni aktivite bulunmuyor.</p>
            {activeTab !== 'all' && (
              <Link href="/notifications" className="mt-4 inline-block text-xs font-semibold text-[#00C49F] hover:text-[#00a882] transition-colors">
                ← Tüm bildirimlere dön
              </Link>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {groups.map(group => (
              <div key={group.key}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">{group.label}</span>
                  <div className="flex-1 h-px bg-gray-100" />
                  <span className="text-[10px] font-semibold text-gray-300">{group.items.length}</span>
                </div>
                <div className="space-y-2">
                  {group.items.map((n) => (
                    <Link
                      key={n.id}
                      href={n.href}
                      className="flex items-start gap-4 bg-white rounded-2xl border border-gray-100 px-5 py-4 hover:shadow-md hover:border-gray-200 transition-all group"
                    >
                      <div className={`w-9 h-9 rounded-xl ${bgMap[n.type]} flex items-center justify-center shrink-0 mt-0.5`}>
                        {iconMap[n.type]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-gray-900">{n.title}</p>
                        <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{n.subtitle}</p>
                        <p className="text-[10px] text-gray-400 mt-1 flex items-center gap-1">
                          <Clock size={10} /> {timeAgo(n.date)}
                        </p>
                      </div>
                      <ArrowRight size={14} className="text-gray-300 group-hover:text-[#00C49F] transition-colors shrink-0 mt-1" />
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
