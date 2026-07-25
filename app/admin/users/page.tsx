import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      _count: { select: { listings: true, offers: true } },
    },
  });

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
        <div className="flex items-center gap-4 mb-8">
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
            <span className="ml-2 text-base font-semibold text-gray-400">({users.length} kullanıcı)</span>
          </h1>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {['Kullanıcı', 'Email', 'Rol', 'İlan Sayısı', 'Teklif Sayısı', 'Üyelik Tarihi'].map((h) => (
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
                    <td colSpan={6} className="px-5 py-12 text-center text-sm text-gray-400">
                      Henüz kullanıcı bulunmuyor.
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#00C49F] text-white flex items-center justify-center text-xs font-bold shrink-0">
                            {(user.name ?? user.email ?? 'U')[0].toUpperCase()}
                          </div>
                          <span className="font-semibold text-gray-800">{user.name ?? '—'}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-gray-500">{user.email}</td>
                      <td className="px-5 py-4">{roleBadge(user.role)}</td>
                      <td className="px-5 py-4 text-center font-semibold text-gray-700">
                        {user._count.listings}
                      </td>
                      <td className="px-5 py-4 text-center font-semibold text-gray-700">
                        {user._count.offers}
                      </td>
                      <td className="px-5 py-4 text-gray-400 whitespace-nowrap text-xs">
                        {new Date(user.createdAt).toLocaleDateString('tr-TR')}
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
