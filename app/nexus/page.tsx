import prisma from '@/lib/prisma';
import Link from 'next/link';
import { ArrowLeft, Globe, Network, TrendingUp, Users, Building2, Activity, ArrowRight } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function NexusPage() {
  const [listingCount, userCount, offerCount, assetCount, dealCount, caseCount] = await Promise.all([
    prisma.listing.count({ where: { status: 'ACTIVE' } }),
    prisma.user.count(),
    prisma.offer.count(),
    prisma.asset.count(),
    prisma.dealRoom.count(),
    prisma.advisoryCase.count(),
  ]);

  const modules = [
    { label: 'Aktif İlanlar', value: listingCount, href: '/listings', icon: <Building2 size={18} />, color: 'text-[#00C49F]', bg: 'bg-[#F0FDF8]' },
    { label: 'Kullanıcılar', value: userCount, href: '/admin/users', icon: <Users size={18} />, color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'Teklifler', value: offerCount, href: '/offers', icon: <TrendingUp size={18} />, color: 'text-amber-500', bg: 'bg-amber-50' },
    { label: 'Varlıklar', value: assetCount, href: '/assets', icon: <Network size={18} />, color: 'text-purple-500', bg: 'bg-purple-50' },
    { label: 'Anlaşma Odaları', value: dealCount, href: '/deals', icon: <Activity size={18} />, color: 'text-rose-500', bg: 'bg-rose-50' },
    { label: 'Danışmanlık', value: caseCount, href: '/concierge', icon: <Globe size={18} />, color: 'text-gray-600', bg: 'bg-gray-50' },
  ];

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-5xl mx-auto px-8 py-10 space-y-8">

        <div>
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-700 transition-colors mb-3">
            <ArrowLeft size={14} /> Dashboard
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F0FDF8] flex items-center justify-center text-[#00C49F]">
              <Network size={18} />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Ekosistem Nexus</h1>
              <p className="text-xs text-gray-400 mt-0.5">Platform modülleri ve bağlantı durumu</p>
            </div>
          </div>
        </div>

        {/* Modül Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {modules.map(m => (
            <Link key={m.label} href={m.href}
              className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md hover:border-[#00C49F]/20 transition-all group">
              <div className={`w-10 h-10 rounded-xl ${m.bg} flex items-center justify-center ${m.color} mb-4`}>
                {m.icon}
              </div>
              <p className={`text-3xl font-black ${m.color}`}>{m.value}</p>
              <p className="text-sm font-semibold text-gray-700 mt-1">{m.label}</p>
              <div className="flex items-center gap-1 mt-3 text-xs text-gray-400 group-hover:text-[#00C49F] transition-colors">
                Modüle Git <ArrowRight size={11} />
              </div>
            </Link>
          ))}
        </div>

        {/* Durum */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-[10px] font-bold tracking-widest text-[#00C49F] uppercase mb-5">Sistem Durumu</h2>
          <div className="space-y-3">
            {[
              { name: 'Veritabanı Bağlantısı', status: 'Canlı', ok: true },
              { name: 'Kimlik Doğrulama (NextAuth)', status: 'Aktif', ok: true },
              { name: 'API Katmanı', status: 'Aktif', ok: true },
              { name: 'Fotoğraf Upload', status: 'Yakında', ok: false },
              { name: 'E-posta Bildirimleri', status: 'Yakında', ok: false },
              { name: 'Gerçek Zamanlı Güncellemeler', status: 'Planlananlar', ok: false },
            ].map(s => (
              <div key={s.name} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <span className="text-sm font-medium text-gray-700">{s.name}</span>
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                  s.ok ? 'bg-[#F0FDF8] text-[#00C49F]' : 'bg-gray-100 text-gray-500'
                }`}>
                  {s.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
