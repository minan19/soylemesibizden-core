import prisma from '@/lib/prisma';
import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowLeft, Users, Building2, TrendingUp, Star, MapPin, Phone, Mail } from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Emlak Danışmanları | Söylemesi Bizden',
  description: 'Söylemesi Bizden platformundaki onaylı emlak danışmanları. Uzman danışmanlarla iletişime geçin.',
};

export default async function AgentsPage() {
  const agents = await prisma.user.findMany({
    where: {
      OR: [
        { role: 'CONCIERGE' },
        { role: 'ADMIN' },
      ],
    },
    include: {
      _count: {
        select: {
          listings: { where: { status: 'ACTIVE' } },
        },
      },
      listings: {
        where: { status: 'ACTIVE' },
        select: { price: true },
        take: 100,
      },
    },
    orderBy: { createdAt: 'asc' },
  });

  const regularAgents = agents.filter(a => a.role === 'CONCIERGE');
  const allWithStats = agents.map(agent => ({
    ...agent,
    avgPrice: agent.listings.length > 0
      ? Math.round(agent.listings.reduce((s, l) => s + l.price, 0) / agent.listings.length)
      : null,
  }));

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">

        {/* Header */}
        <div>
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-700 transition-colors mb-3">
            <ArrowLeft size={14} /> Ana Sayfa
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#F0FDF8] flex items-center justify-center">
              <Users size={24} className="text-[#00C49F]" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">Emlak Danışmanları</h1>
              <p className="text-sm text-gray-500 mt-0.5">{regularAgents.length > 0 ? regularAgents.length : allWithStats.length} onaylı danışman</p>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-3 gap-4">
          {[
            {
              label: 'Toplam Danışman',
              value: allWithStats.length,
              icon: Users,
              color: 'text-[#00C49F]',
              bg: 'bg-[#F0FDF8]',
            },
            {
              label: 'Aktif İlan',
              value: allWithStats.reduce((s, a) => s + a._count.listings, 0),
              icon: Building2,
              color: 'text-blue-600',
              bg: 'bg-blue-50',
            },
            {
              label: 'Uzman Danışman',
              value: regularAgents.length,
              icon: Star,
              color: 'text-amber-600',
              bg: 'bg-amber-50',
            },
          ].map(stat => (
            <div key={stat.label} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <div className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center mb-3`}>
                <stat.icon size={18} className={stat.color} />
              </div>
              <p className={`text-2xl font-bold ${stat.color} mb-0.5`}>{stat.value}</p>
              <p className="text-xs text-gray-400 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        {allWithStats.length === 0 ? (
          <div className="bg-white rounded-2xl border border-dashed border-gray-200 py-20 text-center">
            <Users size={36} className="text-gray-200 mx-auto mb-4" />
            <p className="text-gray-500 font-semibold">Henüz danışman yok</p>
            <p className="text-gray-400 text-sm mt-1">Admin panelinden kullanıcılara Concierge rolü verin.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {allWithStats.map(agent => (
              <Link
                key={agent.id}
                href={`/user/${agent.id}`}
                className="group bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md hover:border-[#00C49F]/30 transition-all"
              >
                {/* Avatar */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#00C49F] to-[#00a882] flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                    {(agent.name ?? agent.email ?? 'U')[0].toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="font-bold text-gray-900 group-hover:text-[#00C49F] transition-colors truncate">
                      {agent.name ?? agent.email}
                    </h2>
                    {agent.name && (
                      <p className="text-xs text-gray-400 truncate">{agent.email}</p>
                    )}
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        agent.role === 'ADMIN'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-[#F0FDF8] text-[#00C49F]'
                      }`}>
                        {agent.role === 'ADMIN' ? 'ADMİN' : 'DANIŞMAN'}
                      </span>
                      {agent._count.listings > 0 && (
                        <span className="text-[10px] text-gray-400">
                          {agent._count.listings} aktif ilan
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-gray-50 rounded-xl p-3 text-center">
                    <p className="text-lg font-bold text-[#00C49F]">{agent._count.listings}</p>
                    <p className="text-[10px] text-gray-400 font-medium">Aktif İlan</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3 text-center">
                    {agent.avgPrice ? (
                      <>
                        <p className="text-xs font-bold text-gray-700 leading-tight">
                          {Math.round(agent.avgPrice / 1000)}K ₺
                        </p>
                        <p className="text-[10px] text-gray-400 font-medium">Ort. Fiyat</p>
                      </>
                    ) : (
                      <>
                        <p className="text-lg font-bold text-gray-300">—</p>
                        <p className="text-[10px] text-gray-400 font-medium">Ort. Fiyat</p>
                      </>
                    )}
                  </div>
                </div>

                {/* Contact */}
                <div className="flex items-center gap-2 pt-3 border-t border-gray-50">
                  {agent.phone && (
                    <a
                      href={`tel:${agent.phone}`}
                      onClick={e => e.stopPropagation()}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F0FDF8] text-[#00C49F] text-xs font-semibold rounded-lg hover:bg-[#00C49F] hover:text-white transition-colors"
                    >
                      <Phone size={11} /> Ara
                    </a>
                  )}
                  <a
                    href={`mailto:${agent.email}`}
                    onClick={e => e.stopPropagation()}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 text-gray-600 text-xs font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <Mail size={11} /> E-posta
                  </a>
                  <span className="ml-auto text-[#00C49F] text-xs font-semibold group-hover:underline">
                    Profil →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* CTA for agents */}
        <div className="bg-gradient-to-r from-[#00C49F] to-[#00a882] rounded-2xl p-8 text-white text-center">
          <h2 className="text-xl font-bold mb-2">Siz de Danışman Olun</h2>
          <p className="text-white/80 text-sm mb-5 max-w-md mx-auto">
            Söylemesi Bizden platformunda danışman olarak yer alın, ilanlarınızı yönetin ve müşterilerinize ulaşın.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#00C49F] text-sm font-bold rounded-xl hover:bg-[#F0FDF8] transition-colors"
          >
            <Users size={15} /> Başvuru Yap
          </Link>
        </div>
      </div>
    </main>
  );
}
