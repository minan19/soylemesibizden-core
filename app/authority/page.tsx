import prisma from '@/lib/prisma';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck, Users, Building2, Key, Lock } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AuthorityPage() {
  const [totalUsers, adminCount, conciergeCount, totalListings, verifiedListings] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { role: 'ADMIN' } }),
    prisma.user.count({ where: { role: 'CONCIERGE' } }),
    prisma.listing.count(),
    prisma.listing.count({ where: { isVerified: true } }),
  ]);

  const recentUsers = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    take: 8,
    select: { id: true, name: true, email: true, role: true, createdAt: true },
  });

  const roleConfig: Record<string, { label: string; className: string }> = {
    ADMIN: { label: 'Admin', className: 'bg-[#F0FDF8] text-[#00C49F] border border-[#00C49F]/20' },
    CONCIERGE: { label: 'Konsiyerj', className: 'bg-blue-50 text-blue-600 border border-blue-100' },
    USER: { label: 'Kullanıcı', className: 'bg-gray-100 text-gray-500 border border-gray-200' },
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-5xl mx-auto px-8 py-10 space-y-8">

        <div>
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-700 transition-colors mb-3">
            <ArrowLeft size={14} /> Dashboard
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F0FDF8] flex items-center justify-center text-[#00C49F]">
              <ShieldCheck size={18} />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Otorite Matrisi</h1>
              <p className="text-xs text-gray-400 mt-0.5">Kullanıcı rolleri, erişim seviyeleri ve sistem yetkileri</p>
            </div>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'TOPLAM KULLANICI', value: totalUsers, icon: <Users size={16} />, color: 'text-gray-900' },
            { label: 'ADMİN', value: adminCount, icon: <Key size={16} />, color: 'text-[#00C49F]' },
            { label: 'KONSİYERJ', value: conciergeCount, icon: <Lock size={16} />, color: 'text-blue-500' },
            { label: 'ONAYLANMIŞ İLAN', value: verifiedListings, icon: <Building2 size={16} />, color: 'text-gray-900' },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-5">
              <div className={`${s.color} mb-2`}>{s.icon}</div>
              <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-[9px] font-bold tracking-widest text-gray-400 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Role Distribution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="text-[10px] font-bold tracking-widest text-[#00C49F] uppercase mb-5">Rol Dağılımı</h2>
            <div className="space-y-4">
              {[
                { role: 'ADMIN', count: adminCount, total: totalUsers },
                { role: 'CONCIERGE', count: conciergeCount, total: totalUsers },
                { role: 'USER', count: totalUsers - adminCount - conciergeCount, total: totalUsers },
              ].map(({ role, count, total }) => {
                const rc = roleConfig[role];
                const pct = total > 0 ? Math.round((count / total) * 100) : 0;
                return (
                  <div key={role}>
                    <div className="flex items-center justify-between mb-1">
                      <span className={`inline-block px-2 py-0.5 text-[10px] font-bold rounded-full ${rc.className}`}>
                        {rc.label}
                      </span>
                      <span className="text-xs font-bold text-gray-700">{count} (%{pct})</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div className="bg-[#00C49F] h-2 rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="text-[10px] font-bold tracking-widest text-[#00C49F] uppercase mb-5">Erişim Protokolleri</h2>
            <div className="space-y-3">
              {[
                { label: 'İlan Yönetimi', roles: 'ADMIN', ok: true },
                { label: 'Kullanıcı Yönetimi', roles: 'ADMIN', ok: true },
                { label: 'Danışmanlık Vakası', roles: 'ADMIN + CONCIERGE', ok: true },
                { label: 'Anlaşma Odası', roles: 'Tüm Kullanıcılar', ok: true },
                { label: 'Teklif Verme', roles: 'Kayıtlı Kullanıcılar', ok: true },
                { label: 'Admin Paneli', roles: 'Sadece ADMIN', ok: true },
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                  <span className="text-sm font-medium text-gray-700">{item.label}</span>
                  <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{item.roles}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Users */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-50">
            <h2 className="text-[10px] font-bold tracking-widest text-[#00C49F] uppercase">Son Kayıtlı Kullanıcılar</h2>
          </div>
          <div className="divide-y divide-gray-50">
            {recentUsers.map(user => {
              const rc = roleConfig[user.role] ?? roleConfig.USER;
              return (
                <div key={user.id} className="flex items-center gap-4 px-6 py-4">
                  <div className="w-9 h-9 rounded-xl bg-[#F0FDF8] flex items-center justify-center text-[#00C49F] text-sm font-bold shrink-0">
                    {(user.name ?? user.email ?? '?').charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">{user.name ?? '—'}</p>
                    <p className="text-xs text-gray-400">{user.email}</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${rc.className}`}>{rc.label}</span>
                  <span className="text-xs text-gray-400">{new Date(user.createdAt).toLocaleDateString('tr-TR')}</span>
                </div>
              );
            })}
            {recentUsers.length === 0 && (
              <p className="px-6 py-8 text-sm text-gray-400 text-center">Kullanıcı bulunamadı.</p>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <Link href="/admin/users" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#00C49F] text-white text-sm font-semibold rounded-xl hover:bg-[#00B090] transition-colors">
            <Users size={14} /> Tüm Kullanıcıları Yönet
          </Link>
        </div>
      </div>
    </main>
  );
}
