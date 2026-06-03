import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import Link from 'next/link';
import {
  Terminal, Users, FileText, Handshake, Shield,
  Plus, Trash2, Edit3, CheckCircle, XCircle, Clock,
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

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user || (session.user as { role?: string }).role !== 'ADMIN') {
    redirect('/dashboard');
  }

  const [
    totalListings,
    totalUsers,
    totalOffers,
    totalDeals,
    totalAssets,
    portfolioValue,
    recentListings,
    recentUsers,
    pendingOffers,
  ] = await Promise.all([
    prisma.listing.count(),
    prisma.user.count(),
    prisma.offer.count(),
    prisma.dealRoom.count(),
    prisma.asset.count(),
    prisma.listing.aggregate({ _sum: { priceAmount: true } }),
    prisma.listing.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      include: { owner: { select: { name: true, email: true } } },
    }),
    prisma.user.findMany({
      take: 8,
      orderBy: { createdAt: 'desc' },
      select: { id: true, name: true, email: true, role: true, createdAt: true },
    }),
    prisma.offer.count({ where: { status: 'PENDING' } }),
  ]);

  const pv = portfolioValue._sum.priceAmount ?? 0;

  const stats = [
    { label: 'Toplam İlan', value: totalListings, icon: FileText, color: '#00C49F', bg: '#F0FDF8' },
    { label: 'Kullanıcılar', value: totalUsers, icon: Users, color: '#3B82F6', bg: '#EFF6FF' },
    { label: 'Teklifler', value: totalOffers, icon: Handshake, color: '#D4AF37', bg: '#FFFBEB', sub: `${pendingOffers} bekleyen` },
    { label: 'Anlaşmalar', value: totalDeals, icon: Shield, color: '#8B5CF6', bg: '#F5F3FF' },
    { label: 'Varlıklar', value: totalAssets, icon: Shield, color: '#EC4899', bg: '#FDF2F8' },
    { label: 'Portföy', value: formatCurrency(pv), icon: Terminal, color: '#0F172A', bg: '#F8FAFC', isString: true },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-[#0F172A]">
      {/* TOPBAR */}
      <nav className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-gray-100 h-20 flex items-center justify-between px-10">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-xl bg-[#0F172A] flex items-center justify-center">
            <Terminal size={16} className="text-[#00C49F]" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">Admin Panel</p>
            <h1 className="text-lg font-black tracking-tight">Sovereign Control</h1>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/admin/listings/new"
            className="flex items-center gap-2 px-5 py-2.5 bg-[#00C49F] text-white text-[11px] font-black rounded-full hover:bg-[#00A887] transition-all"
          >
            <Plus size={14} /> YENİ İLAN
          </Link>
          <Link
            href="/dashboard"
            className="px-5 py-2.5 border border-gray-200 text-[11px] font-bold rounded-full hover:bg-gray-50 transition-all"
          >
            DASHBOARD
          </Link>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-8 py-10 space-y-10">
        {/* STAT GRID */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-white rounded-3xl border border-gray-100 p-8 shadow-[0_4px_24px_rgba(0,0,0,0.02)]"
            >
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5" style={{ backgroundColor: s.bg }}>
                <s.icon size={22} style={{ color: s.color }} />
              </div>
              <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-2">{s.label}</p>
              <p className="text-3xl font-black tracking-tighter" style={{ color: s.color }}>
                {s.isString ? s.value : s.value.toLocaleString('tr-TR')}
              </p>
              {'sub' in s && s.sub && (
                <p className="text-[10px] text-gray-400 mt-1">{s.sub}</p>
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* LISTINGS TABLE */}
          <div className="col-span-8">
            <div className="bg-white rounded-[32px] border border-gray-100 overflow-hidden shadow-sm">
              <div className="flex items-center justify-between px-8 py-6 border-b border-gray-50">
                <h2 className="text-sm font-black tracking-widest uppercase">İlan Yönetimi</h2>
                <Link
                  href="/admin/listings/new"
                  className="flex items-center gap-1.5 text-[11px] font-bold text-[#00C49F] hover:underline"
                >
                  <Plus size={12} /> Yeni İlan
                </Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#F8FAFC] border-b border-gray-100">
                    <tr>
                      {['İlan Adı', 'Tür', 'Fiyat', 'Durum', 'Tarih', 'İşlem'].map((h) => (
                        <th
                          key={h}
                          className="px-6 py-4 text-left text-[10px] font-black tracking-widest text-gray-400 uppercase"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {recentListings.map((listing) => (
                      <tr key={listing.id} className="hover:bg-[#F8FAFC] transition-colors">
                        <td className="px-6 py-4">
                          <p className="font-bold text-sm truncate max-w-[180px]">{listing.title}</p>
                          <p className="text-[10px] text-gray-400">{listing.owner?.name ?? '—'}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-[10px] font-black tracking-widest px-2 py-1 bg-gray-100 text-gray-500 rounded-full">
                            {listing.propertyType}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-bold text-sm">
                          {formatCurrency(listing.priceAmount)}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`text-[9px] font-black tracking-widest px-2 py-1 rounded-full uppercase ${
                              listing.status === 'ACTIVE'
                                ? 'bg-[#F0FDF8] text-[#00C49F]'
                                : listing.status === 'SOLD'
                                ? 'bg-red-50 text-red-400'
                                : 'bg-yellow-50 text-yellow-500'
                            }`}
                          >
                            {listing.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-[11px] text-gray-400">
                          {formatDate(listing.createdAt)}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Link
                              href={`/admin/listings/${listing.id}/edit`}
                              className="p-2 rounded-xl bg-[#F0FDF8] text-[#00C49F] hover:bg-[#00C49F] hover:text-white transition-all"
                            >
                              <Edit3 size={14} />
                            </Link>
                            <Link
                              href={`/listing/${listing.id}`}
                              className="p-2 rounded-xl bg-gray-100 text-gray-500 hover:bg-gray-200 transition-all"
                            >
                              <FileText size={14} />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* USERS TABLE */}
          <div className="col-span-4">
            <div className="bg-white rounded-[32px] border border-gray-100 overflow-hidden shadow-sm">
              <div className="px-8 py-6 border-b border-gray-50">
                <h2 className="text-sm font-black tracking-widest uppercase">Kullanıcılar</h2>
              </div>
              <div className="divide-y divide-gray-50">
                {recentUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between px-6 py-4 hover:bg-[#F8FAFC] transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#F0FDF8] flex items-center justify-center shrink-0">
                        <span className="text-[12px] font-black text-[#00C49F]">
                          {(user.name ?? user.email)[0].toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="text-[12px] font-bold truncate max-w-[120px]">
                          {user.name ?? user.email}
                        </p>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          {user.role === 'ADMIN' ? (
                            <span className="flex items-center gap-1 text-[9px] font-black text-amber-500 bg-amber-50 px-2 py-0.5 rounded-full">
                              <CheckCircle size={8} /> ADMIN
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 text-[9px] font-black text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">
                              <Clock size={8} /> USER
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <p className="text-[10px] text-gray-300">{formatDate(user.createdAt)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
