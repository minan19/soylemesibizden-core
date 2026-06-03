import prisma from '@/lib/prisma';
import Link from 'next/link';
import {
  LayoutGrid, TrendingUp, Activity, Shield, ArrowRight,
  MapPin, BarChart3, Users, FileText, Handshake, Brain, GitCompare,
  CreditCard, Wallet, Lock, Network, Code, Building2, Radio,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

function formatCurrency(val: number): string {
  if (val >= 1e12) return (val / 1e12).toFixed(2) + ' Trilyon ₺';
  if (val >= 1e9) return (val / 1e9).toFixed(2) + ' Milyar ₺';
  if (val >= 1e6) return (val / 1e6).toFixed(2) + ' Milyon ₺';
  if (val >= 1e3) return (val / 1e3).toFixed(0) + ' K ₺';
  return val.toLocaleString('tr-TR') + ' ₺';
}

export default async function DashboardPage() {
  const [
    totalListings,
    totalAssets,
    totalOffers,
    activeListings,
    recentListings,
    totalPortfolioValue,
  ] = await Promise.all([
    prisma.listing.count(),
    prisma.asset.count(),
    prisma.offer.count(),
    prisma.listing.count({ where: { status: 'ACTIVE' } }),
    prisma.listing.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: { owner: { select: { name: true, email: true } } },
    }),
    prisma.listing.aggregate({ _sum: { priceAmount: true } }),
  ]);

  const portfolioValue = totalPortfolioValue._sum.priceAmount ?? 0;

  const stats = [
    {
      label: 'Toplam İlan',
      value: totalListings.toString(),
      sub: `${activeListings} aktif`,
      icon: FileText,
      color: '#00C49F',
      bg: '#F0FDF8',
    },
    {
      label: 'Portföy Değeri',
      value: formatCurrency(portfolioValue),
      sub: 'Toplam varlık',
      icon: TrendingUp,
      color: '#3B82F6',
      bg: '#EFF6FF',
    },
    {
      label: 'Toplam Teklif',
      value: totalOffers.toString(),
      sub: 'Bekleyen + Kabul',
      icon: Handshake,
      color: '#D4AF37',
      bg: '#FFFBEB',
    },
    {
      label: 'Varlık Kaydı',
      value: totalAssets.toString(),
      sub: 'Kayıtlı varlık',
      icon: Shield,
      color: '#8B5CF6',
      bg: '#F5F3FF',
    },
  ];

  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans antialiased overflow-hidden text-[#0F172A]">
      {/* SIDEBAR */}
      <aside className="w-72 bg-white border-r border-gray-100 flex flex-col shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-30">
        <div className="h-20 flex items-center px-10 border-b border-gray-50">
          <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#0F172A]">
            SÖYLEMESİ<span className="text-[#00C49F]">BİZDEN</span>
          </span>
        </div>
        <nav className="flex-1 py-8 px-6 space-y-1 overflow-y-auto">
          <p className="text-[10px] font-bold text-gray-400 tracking-[0.2em] mb-4 px-5 uppercase">
            Ana Panel
          </p>
          <Link
            href="/dashboard"
            className="flex items-center gap-4 px-5 py-4 bg-[#F0FDF8] text-[#00C49F] rounded-2xl text-[12px] font-bold tracking-wider"
          >
            <LayoutGrid size={18} /> MASTER TERMINAL
          </Link>
          {[
            { n: 'İLANLAR', i: <FileText size={18} />, href: '/listings' },
            { n: 'TEKLİFLER', i: <Handshake size={18} />, href: '/offers' },
            { n: 'VARLIKLAR', i: <Shield size={18} />, href: '/assets' },
            { n: 'AI DEĞERLEME', i: <Brain size={18} />, href: '/valuation' },
            { n: 'KARŞILAŞTIR', i: <GitCompare size={18} />, href: '/listings' },
            { n: 'ANALİZ & RAPOR', i: <BarChart3 size={18} />, href: '/analytics' },
            { n: 'PORTFÖY', i: <Wallet size={18} />, href: '/wealth' },
            { n: 'DARK POOL', i: <Lock size={18} />, href: '/dark-pool' },
            { n: 'YATIRIMCI', i: <Network size={18} />, href: '/investor-network' },
            { n: 'API PORTAL', i: <Code size={18} />, href: '/api-portal' },
            { n: 'İNŞAAT', i: <Building2 size={18} />, href: '/construction' },
            { n: 'PİYASA RADAR', i: <Radio size={18} />, href: '/market-radar' },
            { n: 'FRANCHISE', i: <Network size={18} />, href: '/franchise' },
            { n: 'PLANLAR', i: <CreditCard size={18} />, href: '/pricing' },
          ].map((item) => (
            <Link
              key={item.n}
              href={item.href}
              className="flex items-center gap-4 px-5 py-4 text-gray-400 text-[12px] font-semibold tracking-wider hover:bg-gray-50 rounded-2xl transition-all"
            >
              {item.i} {item.n}
            </Link>
          ))}
        </nav>
      </aside>

      <main className="flex-1 flex flex-col bg-[#F8FAFC] overflow-hidden">
        {/* TOPBAR */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-12 z-20 shrink-0">
          <div>
            <p className="text-[10px] font-bold text-gray-400 tracking-[0.3em] uppercase">
              Sovereign Intelligence
            </p>
            <h1 className="text-xl font-black tracking-tighter">Master Terminal</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#00C49F] animate-pulse" />
            <span className="text-[11px] font-bold text-[#00C49F] tracking-widest">SYSTEM ACTIVE</span>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-10">
          {/* STAT CARDS */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {stats.map((s) => (
              <div
                key={s.label}
                className="bg-white rounded-3xl border border-gray-100 p-8 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)] transition-all group"
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: s.bg }}
                >
                  <s.icon size={22} style={{ color: s.color }} />
                </div>
                <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-2">
                  {s.label}
                </p>
                <p className="text-2xl font-black tracking-tighter" style={{ color: s.color }}>
                  {s.value}
                </p>
                <p className="text-[10px] font-semibold text-gray-300 mt-1">{s.sub}</p>
              </div>
            ))}
          </div>

          {/* RECENT LISTINGS */}
          <div className="bg-white rounded-[40px] border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.03)] overflow-hidden">
            <div className="flex items-center justify-between px-10 py-8 border-b border-gray-50">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 bg-[#00C49F] rounded-full animate-pulse" />
                <h2 className="text-sm font-black tracking-widest uppercase">Son Eklenen İlanlar</h2>
              </div>
              <Link
                href="/listings"
                className="flex items-center gap-2 text-[11px] font-bold text-[#00C49F] hover:underline"
              >
                Tümünü Gör <ArrowRight size={14} />
              </Link>
            </div>

            {recentListings.length === 0 ? (
              <div className="p-10 text-center text-gray-300 italic text-sm">
                Henüz ilan eklenmemiştir.
              </div>
            ) : (
              <div className="divide-y divide-gray-50">
                {recentListings.map((listing) => (
                  <Link
                    key={listing.id}
                    href={`/listing/${listing.id}`}
                    className="flex items-center justify-between px-10 py-6 hover:bg-[#F8FAFC] transition-all group"
                  >
                    <div className="flex items-center gap-6">
                      <div className="w-12 h-12 rounded-2xl bg-[#F0FDF8] flex items-center justify-center shrink-0">
                        <Activity size={20} className="text-[#00C49F]" />
                      </div>
                      <div>
                        <p className="font-bold text-[#0F172A] group-hover:text-[#00C49F] transition-colors">
                          {listing.title}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          {listing.location && (
                            <span className="flex items-center gap-1 text-[11px] font-semibold text-gray-400">
                              <MapPin size={11} /> {listing.location}
                            </span>
                          )}
                          <span className="text-[10px] font-bold text-gray-300">·</span>
                          <span className="text-[11px] font-bold text-gray-400 uppercase">
                            {listing.propertyType}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-8">
                      <div className="text-right">
                        <p className="font-black text-[#0F172A] tracking-tight">
                          {formatCurrency(listing.priceAmount)}
                        </p>
                        <span
                          className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                            listing.status === 'ACTIVE'
                              ? 'bg-[#F0FDF8] text-[#00C49F]'
                              : 'bg-gray-100 text-gray-400'
                          }`}
                        >
                          {listing.status}
                        </span>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-[#00C49F] transition-all">
                        <ArrowRight size={14} className="text-gray-300 group-hover:text-white transition-colors" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* INTELLIGENCE PULSE */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="p-8 bg-gradient-to-br from-[#00C49F] to-[#00A887] rounded-[32px] text-white shadow-lg shadow-[#00C49F]/20">
              <p className="text-[10px] font-bold tracking-widest opacity-70 uppercase mb-4">
                Sovereign IQ
              </p>
              <p className="text-4xl font-black tracking-tighter">
                {totalListings > 0 ? '98.4' : '—'}
              </p>
              <p className="text-[11px] font-semibold opacity-60 mt-2">
                Ortalama Güven Skoru
              </p>
            </div>
            <div className="p-8 bg-white border border-gray-100 rounded-[32px] shadow-sm">
              <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-4">
                Aktif Varlıklar
              </p>
              <p className="text-4xl font-black tracking-tighter text-[#0F172A]">
                {activeListings}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <Users size={12} className="text-[#00C49F]" />
                <p className="text-[11px] font-semibold text-gray-400">
                  {totalListings} toplam ilan
                </p>
              </div>
            </div>
            <div className="p-8 bg-[#0F172A] rounded-[32px] text-white">
              <p className="text-[10px] font-bold tracking-widest text-slate-500 uppercase mb-4">
                System Status
              </p>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 bg-[#00C49F] rounded-full animate-pulse" />
                <p className="text-sm font-black text-[#00C49F] tracking-wider">AUTONOMOUS ACTIVE</p>
              </div>
              <p className="text-[10px] text-slate-500 font-mono">
                v2.8.4-SOVEREIGN
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
