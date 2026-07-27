import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Building2, CheckCircle, Users, Clock, ArrowUpRight, Plus } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const [
    listingCount,
    userCount,
    offerCount,
    recentListings,
    recentUsers,
    recentOffers,
    activeListings,
    pendingOffers,
    pendingListings,
  ] = await Promise.all([
    prisma.listing.count(),
    prisma.user.count(),
    prisma.offer.count(),
    prisma.listing.findMany({
      take: 8,
      orderBy: { createdAt: 'desc' },
      include: { owner: { select: { name: true, email: true } } },
    }),
    prisma.user.findMany({
      take: 6,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.offer.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: {
        listing: { select: { title: true } },
        user: { select: { name: true } },
      },
    }),
    prisma.listing.count({ where: { status: 'ACTIVE' } }),
    prisma.offer.count({ where: { status: 'PENDING' } }),
    prisma.listing.count({ where: { status: 'PENDING' } }),
  ]);

  const today = new Date().toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const statusBadge = (status: string) => {
    const map: Record<string, string> = {
      ACTIVE: 'bg-green-100 text-green-700',
      PENDING: 'bg-amber-100 text-amber-700',
      SOLD: 'bg-gray-100 text-gray-600',
      ACCEPTED: 'bg-green-100 text-green-700',
      REJECTED: 'bg-red-100 text-red-600',
    };
    const labelMap: Record<string, string> = {
      ACTIVE: 'Aktif',
      PENDING: 'Beklemede',
      SOLD: 'Satıldı',
      ACCEPTED: 'Kabul',
      REJECTED: 'Red',
    };
    return (
      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${map[status] ?? 'bg-gray-100 text-gray-500'}`}>
        {labelMap[status] ?? status}
      </span>
    );
  };

  const roleBadge = (role: string) => {
    const map: Record<string, string> = {
      ADMIN: 'bg-green-100 text-green-700',
      CONCIERGE: 'bg-blue-100 text-blue-700',
      USER: 'bg-gray-100 text-gray-600',
    };
    return (
      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${map[role] ?? 'bg-gray-100 text-gray-500'}`}>
        {role}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans">
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Admin Komuta Merkezi</h1>
            <p className="text-sm text-gray-400 mt-1">{today}</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/admin/create-asset"
              className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 text-sm font-semibold px-5 py-2.5 rounded-xl border border-gray-200 transition-colors"
            >
              <Plus size={16} />
              Varlık Ekle
            </Link>
            <Link
              href="/admin/create-listing"
              className="inline-flex items-center gap-2 bg-[#00C49F] hover:bg-[#00b38e] text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
            >
              <Plus size={16} />
              YENİ İLAN
            </Link>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Toplam İlan</span>
              <Building2 size={20} className="text-gray-300" />
            </div>
            <div className="text-3xl font-extrabold text-gray-900">{listingCount}</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Aktif İlan</span>
              <CheckCircle size={20} className="text-[#00C49F]" />
            </div>
            <div className="text-3xl font-extrabold text-[#00C49F]">{activeListings}</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Kullanıcılar</span>
              <Users size={20} className="text-gray-300" />
            </div>
            <div className="text-3xl font-extrabold text-gray-900">{userCount}</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Bekleyen Teklif</span>
              <Clock size={20} className="text-amber-400" />
            </div>
            <div className="text-3xl font-extrabold text-amber-500">{pendingOffers}</div>
          </div>
        </div>

        {/* Pending listings alert */}
        {pendingListings > 0 && (
          <Link href="/admin/listings" className="flex items-center gap-4 bg-amber-50 border border-amber-200 rounded-2xl px-6 py-4 mb-6 hover:bg-amber-100 transition-colors">
            <Clock size={18} className="text-amber-600 shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-bold text-amber-800">Onay Bekleyen {pendingListings} İlan</p>
              <p className="text-xs text-amber-600">Kullanıcılar tarafından gönderilen ilanlar admin onayı bekliyor.</p>
            </div>
            <ArrowUpRight size={16} className="text-amber-600" />
          </Link>
        )}

        {/* Bottom section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Recent Listings Table (col-span-2) */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="text-sm font-bold text-gray-700">Son İlanlar</h2>
              <Link href="/admin/listings" className="text-xs font-semibold text-[#00C49F] hover:underline">
                Tüm İlanları Yönet →
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    {['Başlık', 'Sahip', 'Fiyat', 'Durum', 'Tarih', ''].map((h) => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {recentListings.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-4 py-8 text-center text-sm text-gray-400">
                        Henüz ilan bulunmuyor.
                      </td>
                    </tr>
                  ) : (
                    recentListings.map((listing) => (
                      <tr key={listing.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 font-semibold text-gray-800 max-w-[180px] truncate">
                          {listing.title}
                        </td>
                        <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                          {listing.owner?.name ?? listing.owner?.email ?? '—'}
                        </td>
                        <td className="px-4 py-3 font-semibold text-gray-800 whitespace-nowrap">
                          {listing.price.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 })}
                        </td>
                        <td className="px-4 py-3">{statusBadge(listing.status)}</td>
                        <td className="px-4 py-3 text-gray-400 whitespace-nowrap text-xs">
                          {new Date(listing.createdAt).toLocaleDateString('tr-TR')}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <Link href={`/listing/${listing.id}`} className="text-[#00C49F] hover:text-[#00b38e] transition-colors">
                            <ArrowUpRight size={16} />
                          </Link>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-6">

            {/* Recent Users */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <h2 className="text-sm font-bold text-gray-700">Son Kullanıcılar</h2>
                <Link href="/admin/users" className="text-xs font-semibold text-[#00C49F] hover:underline">
                  Kullanıcıları Yönet →
                </Link>
              </div>
              <ul className="divide-y divide-gray-50">
                {recentUsers.length === 0 ? (
                  <li className="px-6 py-4 text-sm text-gray-400 text-center">Henüz kullanıcı yok.</li>
                ) : (
                  recentUsers.map((user) => (
                    <li key={user.id} className="flex items-center gap-3 px-6 py-3">
                      <div className="w-8 h-8 rounded-full bg-[#00C49F] text-white flex items-center justify-center text-xs font-bold shrink-0">
                        {(user.name ?? user.email ?? 'U')[0].toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-800 truncate">{user.name ?? '—'}</p>
                        <p className="text-xs text-gray-400 truncate">{user.email}</p>
                      </div>
                      {roleBadge(user.role)}
                    </li>
                  ))
                )}
              </ul>
            </div>

            {/* Recent Offers */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-sm font-bold text-gray-700">Son Teklifler</h2>
              </div>
              <ul className="divide-y divide-gray-50">
                {recentOffers.length === 0 ? (
                  <li className="px-6 py-4 text-sm text-gray-400 text-center">Henüz teklif yok.</li>
                ) : (
                  recentOffers.map((offer) => (
                    <li key={offer.id} className="px-6 py-3">
                      <div className="flex items-center justify-between mb-0.5">
                        <p className="text-sm font-semibold text-gray-800 truncate max-w-[140px]">
                          {offer.listing?.title ?? '—'}
                        </p>
                        {statusBadge(offer.status)}
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-gray-400">{offer.user?.name ?? '—'}</p>
                        <p className="text-xs font-bold text-gray-700">
                          {offer.amount.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 })}
                        </p>
                      </div>
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
