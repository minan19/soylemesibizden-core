import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { ArrowLeft, Users, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import ChangeRoleButton from '@/components/ChangeRoleButton';

export const dynamic = 'force-dynamic';

const PAGE_SIZE = 20;

function buildUrl(p: number, q?: string, role?: string) {
  const sp = new URLSearchParams();
  if (q) sp.set('q', q);
  if (role && role !== 'ALL') sp.set('role', role);
  if (p > 1) sp.set('page', String(p));
  const qs = sp.toString();
  return `/admin/users${qs ? '?' + qs : ''}`;
}

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: { q?: string; page?: string; role?: string };
}) {
  const { q, role } = searchParams;
  const currentPage = Math.max(1, parseInt(searchParams.page ?? '1') || 1);
  const skip = (currentPage - 1) * PAGE_SIZE;

  const where = {
    ...(q ? {
      OR: [
        { name: { contains: q, mode: 'insensitive' as const } },
        { email: { contains: q, mode: 'insensitive' as const } },
      ],
    } : {}),
    ...(role && role !== 'ALL' ? { role } : {}),
  };

  const [users, totalCount, adminCount, conciergeCount, userCount] = await Promise.all([
    prisma.user.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip,
      take: PAGE_SIZE,
      include: {
        _count: { select: { listings: true, offers: true, favorites: true } },
      },
    }),
    prisma.user.count({ where }),
    prisma.user.count({ where: { role: 'ADMIN' } }),
    prisma.user.count({ where: { role: 'CONCIERGE' } }),
    prisma.user.count({ where: { role: 'USER' } }),
  ]);

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans">
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Link href="/admin/dashboard" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 font-medium transition-colors">
              <ArrowLeft size={15} /> Admin Panel
            </Link>
            <span className="text-gray-300">|</span>
            <h1 className="text-xl font-extrabold text-gray-900 tracking-tight">
              Kullanıcı Yönetimi
              <span className="ml-2 text-base font-semibold text-gray-400">({totalCount} kullanıcı)</span>
            </h1>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Toplam', value: totalCount, color: 'text-gray-800', bg: 'bg-gray-50', filterRole: undefined },
            { label: 'Kullanıcı', value: userCount, color: 'text-gray-700', bg: 'bg-gray-50', filterRole: 'USER' },
            { label: 'Admin', value: adminCount, color: 'text-green-700', bg: 'bg-green-50', filterRole: 'ADMIN' },
            { label: 'Concierge', value: conciergeCount, color: 'text-blue-700', bg: 'bg-blue-50', filterRole: 'CONCIERGE' },
          ].map((s) => (
            <Link key={s.label} href={buildUrl(1, q, s.filterRole)} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center gap-4 hover:border-[#00C49F]/30 transition-colors">
              <div className={`w-10 h-10 ${s.bg} rounded-xl flex items-center justify-center`}>
                <Users size={18} className={s.color} />
              </div>
              <div>
                <p className={`text-2xl font-extrabold ${s.color}`}>{s.value}</p>
                <p className="text-xs text-gray-400 font-semibold">{s.label}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Search + Role Filter */}
        <div className="flex gap-3 mb-6 flex-wrap">
          <form method="get" action="/admin/users" className="flex gap-2 flex-1 min-w-64">
            {role && role !== 'ALL' && <input type="hidden" name="role" value={role} />}
            <div className="relative flex-1">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                name="q"
                defaultValue={q ?? ''}
                placeholder="İsim veya email ara…"
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#00C49F] bg-white"
              />
            </div>
            <button type="submit" className="px-4 py-2 bg-[#00C49F] text-white text-sm font-semibold rounded-xl hover:bg-[#00a882] transition-colors">
              Ara
            </button>
          </form>
          <div className="flex gap-2">
            {[
              { label: 'Tümü', val: 'ALL' },
              { label: 'USER', val: 'USER' },
              { label: 'ADMIN', val: 'ADMIN' },
              { label: 'CONCIERGE', val: 'CONCIERGE' },
            ].map(({ label, val }) => (
              <Link
                key={val}
                href={buildUrl(1, q, val === 'ALL' ? undefined : val)}
                className={`px-3 py-2 text-xs font-semibold rounded-xl border transition-colors ${
                  (role ?? 'ALL') === val
                    ? 'bg-[#00C49F] text-white border-[#00C49F]'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-[#00C49F]/50'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {['Kullanıcı', 'Email', 'Rol', 'İlan', 'Teklif', 'Favori', 'Üyelik', ''].map((h) => (
                    <th key={h} className="px-5 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {users.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-5 py-12 text-center text-sm text-gray-400">
                      Kullanıcı bulunamadı.
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
                      <td className="px-5 py-4 text-center font-semibold text-gray-700">{user._count.listings}</td>
                      <td className="px-5 py-4 text-center font-semibold text-gray-700">{user._count.offers}</td>
                      <td className="px-5 py-4 text-center font-semibold text-gray-700">{user._count.favorites}</td>
                      <td className="px-5 py-4 text-gray-400 whitespace-nowrap text-xs">
                        {new Date(user.createdAt).toLocaleDateString('tr-TR')}
                      </td>
                      <td className="px-5 py-4 text-right">
                        <Link href={`/admin/users/${user.id}`} className="text-xs text-[#00C49F] hover:text-[#00a882] font-semibold transition-colors">
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

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              {skip + 1}–{Math.min(skip + PAGE_SIZE, totalCount)} / {totalCount} kullanıcı
            </p>
            <div className="flex items-center gap-2">
              {currentPage > 1 && (
                <Link href={buildUrl(currentPage - 1, q, role)} className="flex items-center gap-1 px-3 py-1.5 text-sm font-semibold bg-white border border-gray-200 rounded-xl hover:border-[#00C49F] hover:text-[#00C49F] transition-colors">
                  <ChevronLeft size={14} /> Önceki
                </Link>
              )}
              <span className="px-3 py-1.5 text-sm text-gray-600">{currentPage} / {totalPages}</span>
              {currentPage < totalPages && (
                <Link href={buildUrl(currentPage + 1, q, role)} className="flex items-center gap-1 px-3 py-1.5 text-sm font-semibold bg-white border border-gray-200 rounded-xl hover:border-[#00C49F] hover:text-[#00C49F] transition-colors">
                  Sonraki <ChevronRight size={14} />
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
