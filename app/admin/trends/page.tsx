import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { ArrowLeft, TrendingUp, Users, Building2, MessageSquare, BarChart3 } from 'lucide-react';

export const dynamic = 'force-dynamic';

function startOfDay(d: Date) {
  const c = new Date(d);
  c.setHours(0, 0, 0, 0);
  return c;
}

function daysAgo(n: number) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return startOfDay(d);
}

async function countPerDay(
  model: 'listing' | 'user' | 'offer' | 'inquiry',
  days: number,
) {
  const result: { date: string; count: number }[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const from = daysAgo(i);
    const to = new Date(from);
    to.setDate(to.getDate() + 1);
    let count = 0;
    if (model === 'listing') count = await prisma.listing.count({ where: { createdAt: { gte: from, lt: to } } });
    else if (model === 'user') count = await prisma.user.count({ where: { createdAt: { gte: from, lt: to } } });
    else if (model === 'offer') count = await prisma.offer.count({ where: { createdAt: { gte: from, lt: to } } });
    else if (model === 'inquiry') count = await prisma.inquiry.count({ where: { createdAt: { gte: from, lt: to } } });
    result.push({ date: from.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' }), count });
  }
  return result;
}

function BarChart({ data, color }: { data: { date: string; count: number }[]; color: string }) {
  const max = Math.max(...data.map(d => d.count), 1);
  return (
    <div className="flex items-end gap-1 h-20 mt-2">
      {data.map(d => (
        <div key={d.date} className="flex-1 flex flex-col items-center gap-1 group relative">
          <div className="w-full flex-1 flex items-end">
            <div
              className={`w-full rounded-t ${color} transition-all`}
              style={{ height: `${Math.max(4, Math.round((d.count / max) * 64))}px` }}
            />
          </div>
          <span className="text-[8px] text-gray-400 text-center leading-none">
            {d.date.replace(' ', '\n')}
          </span>
          {d.count > 0 && (
            <span className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[9px] font-bold px-1 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              {d.count}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

export default async function AdminTrendsPage() {
  const session = await getServerSession(authOptions);
  const role = (session?.user as { role?: string })?.role;
  if (role !== 'ADMIN') redirect('/');

  const DAYS = 14;

  const [listingTrend, userTrend, offerTrend, inquiryTrend, totals] = await Promise.all([
    countPerDay('listing', DAYS),
    countPerDay('user', DAYS),
    countPerDay('offer', DAYS),
    countPerDay('inquiry', DAYS),
    Promise.all([
      prisma.listing.count(),
      prisma.user.count(),
      prisma.offer.count(),
      prisma.inquiry.count(),
      prisma.listing.count({ where: { createdAt: { gte: daysAgo(7) } } }),
      prisma.user.count({ where: { createdAt: { gte: daysAgo(7) } } }),
      prisma.offer.count({ where: { createdAt: { gte: daysAgo(7) } } }),
      prisma.inquiry.count({ where: { createdAt: { gte: daysAgo(7) } } }),
    ]),
  ]);

  const [totalListings, totalUsers, totalOffers, totalInquiries,
    weekListings, weekUsers, weekOffers, weekInquiries] = totals;

  const charts = [
    {
      label: 'Yeni İlanlar',
      icon: Building2,
      data: listingTrend,
      color: 'bg-[#00C49F]',
      total: totalListings,
      week: weekListings,
      textColor: 'text-[#00C49F]',
    },
    {
      label: 'Yeni Kullanıcılar',
      icon: Users,
      data: userTrend,
      color: 'bg-blue-500',
      total: totalUsers,
      week: weekUsers,
      textColor: 'text-blue-500',
    },
    {
      label: 'Yeni Teklifler',
      icon: TrendingUp,
      data: offerTrend,
      color: 'bg-amber-400',
      total: totalOffers,
      week: weekOffers,
      textColor: 'text-amber-600',
    },
    {
      label: 'Yeni Başvurular',
      icon: MessageSquare,
      data: inquiryTrend,
      color: 'bg-purple-500',
      total: totalInquiries,
      week: weekInquiries,
      textColor: 'text-purple-600',
    },
  ];

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">

        {/* Header */}
        <div className="flex items-center gap-4">
          <Link href="/admin/dashboard" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 font-medium transition-colors">
            <ArrowLeft size={15} /> Admin Panel
          </Link>
          <span className="text-gray-300">|</span>
          <div className="flex items-center gap-2">
            <BarChart3 size={18} className="text-[#00C49F]" />
            <h1 className="text-xl font-extrabold text-gray-900 tracking-tight">Platform Trendleri</h1>
          </div>
          <span className="ml-auto text-xs text-gray-400">Son {DAYS} gün</span>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {charts.map(c => (
            <div key={c.label} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <c.icon size={16} className={c.textColor} />
                <span className="text-xs font-bold text-gray-500">{c.label}</span>
              </div>
              <p className={`text-2xl font-bold ${c.textColor} mb-0.5`}>{c.total.toLocaleString('tr-TR')}</p>
              <p className="text-xs text-gray-400">
                Son 7 gün: <span className="font-semibold text-gray-700">+{c.week}</span>
              </p>
            </div>
          ))}
        </div>

        {/* Trend charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {charts.map(c => (
            <div key={c.label} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <c.icon size={14} className={c.textColor} />
                  <h3 className="text-sm font-bold text-gray-900">{c.label}</h3>
                </div>
                <span className="text-xs text-gray-400">Son {DAYS} gün</span>
              </div>
              <BarChart data={c.data} color={c.color} />
            </div>
          ))}
        </div>

        {/* Top performers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Most active listing types */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h3 className="text-sm font-bold text-gray-900 mb-4">İlan Türü Dağılımı</h3>
            {await (async () => {
              const byType = await prisma.listing.groupBy({
                by: ['listingType'],
                _count: true,
                orderBy: { _count: { listingType: 'desc' } },
              });
              const max = Math.max(...byType.map(t => t._count), 1);
              return (
                <div className="space-y-3">
                  {byType.map(t => (
                    <div key={t.listingType}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-semibold text-gray-700">{t.listingType}</span>
                        <span className="text-gray-500">{t._count}</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-1.5">
                        <div className="bg-[#00C49F] h-1.5 rounded-full" style={{ width: `${Math.round((t._count / max) * 100)}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              );
            })()}
          </div>

          {/* Top cities by listing count */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h3 className="text-sm font-bold text-gray-900 mb-4">En Aktif Şehirler</h3>
            {await (async () => {
              const byCities = await prisma.listing.groupBy({
                by: ['city'],
                where: { city: { not: null } },
                _count: true,
                orderBy: { _count: { city: 'desc' } },
                take: 6,
              });
              const max = Math.max(...byCities.map(c => c._count), 1);
              return (
                <div className="space-y-3">
                  {byCities.map(c => (
                    <div key={c.city}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-semibold text-gray-700">{c.city}</span>
                        <span className="text-gray-500">{c._count} ilan</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-1.5">
                        <div className="bg-blue-400 h-1.5 rounded-full" style={{ width: `${Math.round((c._count / max) * 100)}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              );
            })()}
          </div>
        </div>

        {/* Quick links */}
        <div className="flex flex-wrap gap-3">
          {[
            { href: '/admin/listings', label: 'İlan Yönetimi' },
            { href: '/admin/users', label: 'Kullanıcılar' },
            { href: '/admin/offers', label: 'Teklifler' },
            { href: '/admin/inquiries', label: 'Başvurular' },
            { href: '/api/admin/export', label: 'CSV İndir' },
          ].map(l => (
            <Link
              key={l.href}
              href={l.href}
              className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs font-semibold text-gray-600 hover:border-[#00C49F] hover:text-[#00C49F] transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
