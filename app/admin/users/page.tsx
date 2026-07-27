import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { ArrowLeft, Users } from 'lucide-react';
import ChangeRoleButton from '@/components/ChangeRoleButton';

export const dynamic = 'force-dynamic';

export default async function AdminUsersPage() {
  const [users, totalCount, adminCount, conciergeCount] = await Promise.all([
    prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        _count: { select: { listings: true, offers: true, favorites: true } },
      },
    }),
    prisma.user.count(),
    prisma.user.count({ where: { role: 'ADMIN' } }),
    prisma.user.count({ where: { role: 'CONCIERGE' } }),
  ]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans">
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Link
              href="/admin/dashboard"
              className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 font-medium transition-colors"
            >
              <ArrowLeft size={15} />
              Admin Panel
            </Link>
            <span className="text-gray-300">|</span>
            <h1 className="text-xl font-extrabold text-gray-900 tracking-tight">
              Kullanıcı Yönetimi
              <span className="ml-2 text-base font-semibold text-gray-400">({totalCount} kullanıcı)</span>
            </h1>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Toplam Kullanıcı', value: totalCount, color: 'text-gray-800', bg: 'bg-gray-50' },
            { label: 'Admin', value: adminCount, color: 'text-green-700', bg: 'bg-green-50' },
            { label: 'Concierge', value: conciergeCount, color: 'text-blue-700', bg: 'bg-blue-50' },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center gap-4">
              <div className={`w-10 h-10 ${s.bg} rounded-xl flex items-center justify-center`}>
                <Users size={18} className={s.color} />
              </div>
              <div>
                <p className={`text-2xl font-extrabold ${s.color}`}>{s.value}</p>
                <p className="text-xs text-gray-400 font-semibold">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {['Kullanıcı', 'Email', 'Rol', 'İlan', 'Teklif', 'Favori', 'Üyelik', ''].map((h) => (
                    <th
                      key={h}
                      className="px-5 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {users.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-5 py-12 text-center text-sm text-gray-400">
                      Henüz kullanıcı bulunmuyor.
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                            user.role === 'ADMIN' ? 'bg-green-100 text-green-700' :
                            user.role === 'CONCIERGE' ? 'bg-blue-100 text-blue-700' :
                            'bg-[#00C49F] text-white'
                          }`}>
                            {(user.name ?? user.email ?? 'U')[0].toUpperCase()}
                          </div>
                          <span className="font-semibold text-gray-800">{user.name ?? '—'}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-gray-500 text-xs">{user.email}</td>
                      <td className="px-5 py-4">
                        <ChangeRoleButton userId={user.id} currentRole={user.role as 'USER' | 'ADMIN' | 'CONCIERGE'} />
                      </td>
                      <td className="px-5 py-4 text-center font-semibold text-gray-700">
                        {user._count.listings}
                      </td>
                      <td className="px-5 py-4 text-center font-semibold text-gray-700">
                        {user._count.offers}
                      </td>
                      <td className="px-5 py-4 text-center font-semibold text-gray-700">
                        {user._count.favorites}
                      </td>
                      <td className="px-5 py-4 text-gray-400 whitespace-nowrap text-xs">
                        {new Date(user.createdAt).toLocaleDateString('tr-TR')}
                      </td>
                      <td className="px-5 py-4 text-right">
                        <Link
                          href={`/admin/users/${user.id}`}
                          className="text-xs text-[#00C49F] hover:text-[#00a882] font-semibold transition-colors"
                        >
                          Detay →
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
