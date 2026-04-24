import Link from 'next/link';
import prisma from '@/lib/prisma';
import { LayoutGrid, Radar, Lock, Shield, Zap, Bell, Globe, Moon, ShieldCheck, Mic, Crosshair, TrendingUp, ArrowRight, Activity } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function SovereignDashboard() {
  const [listings, totalListings, totalOffers, totalDeals, totalAssets] = await Promise.all([
    prisma.listing.findMany({ take: 3, orderBy: { createdAt: 'desc' } }),
    prisma.listing.count(),
    prisma.offer.count(),
    prisma.dealRoom.count(),
    prisma.asset.count(),
  ]);

  return (
    <div className="flex h-screen bg-[#F8FAFC] text-[#0F172A] font-sans overflow-hidden">
      
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col flex-shrink-0 z-10 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
        <div className="h-20 flex items-center px-8 border-b border-gray-50">
          <span className="text-sm font-bold tracking-[0.2em]">SÖYLEMESİBİZDEN</span>
        </div>
        <nav className="flex-1 py-6 px-4 space-y-2">
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 bg-[#F0FDF8] text-[#00C49F] rounded-xl text-sm font-semibold tracking-wide transition-colors">
            <LayoutGrid size={18} /> MASTER TERMINAL
          </Link>
          <Link href="/listings" className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-xl text-sm font-medium tracking-wide transition-colors">
            <TrendingUp size={18} /> İLANLAR
          </Link>
          <Link href="/market-radar" className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-xl text-sm font-medium tracking-wide transition-colors">
            <Radar size={18} /> MARKET RADAR
          </Link>
          <Link href="/dark-pool" className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-xl text-sm font-medium tracking-wide transition-colors">
            <Lock size={18} /> DARK POOL
          </Link>
          <Link href="/deals" className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-xl text-sm font-medium tracking-wide transition-colors">
            <Activity size={18} /> ANLAŞMALAR
          </Link>
          <Link href="/legal-vault" className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-xl text-sm font-medium tracking-wide transition-colors">
            <Shield size={18} /> LEGAL VAULT
          </Link>
          <Link href="/intelligence" className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-xl text-sm font-medium tracking-wide transition-colors">
            <Crosshair size={18} /> İSTİHBARAT
          </Link>
          <Link href="/api-portal" className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-xl text-sm font-medium tracking-wide transition-colors">
            <Zap size={18} /> API PORTAL
          </Link>
          <Link href="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-xl text-sm font-medium tracking-wide transition-colors">
            <ShieldCheck size={18} /> ADMİN
          </Link>
        </nav>
      </aside>

      <main className="flex-1 flex flex-col relative">
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex items-center gap-2 px-4 py-1.5 bg-[#F0FDF8] text-[#00C49F] rounded-full border border-[#00C49F]/20">
            <ShieldCheck size={14} />
            <span className="text-[10px] font-bold tracking-widest uppercase">Secure Session</span>
          </div>
          
          <div className="flex items-center gap-6">
            <button className="text-gray-400 hover:text-gray-900 transition-colors"><Bell size={20} /></button>
            <div className="flex items-center gap-3 px-4 py-1.5 border border-gray-200 rounded-full text-xs font-medium text-gray-500">
              <Globe size={14} />
              <span className="text-[#00C49F] font-semibold">TR</span>
              <span>EN</span>
              <span>AR</span>
              <span>RU</span>
            </div>
            <button className="p-2 border border-gray-200 rounded-full text-gray-400 hover:text-gray-900 transition-colors"><Moon size={16} /></button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto space-y-8">

            {/* İstatistik Kartları */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'TOPLAM İLAN', value: totalListings, icon: <LayoutGrid size={16} />, href: '/listings' },
                { label: 'AKTİF TEKLİF', value: totalOffers, icon: <TrendingUp size={16} />, href: '/offers' },
                { label: 'ANLAŞMA ODASI', value: totalDeals, icon: <Activity size={16} />, href: '/deals' },
                { label: 'VARLIK', value: totalAssets, icon: <Shield size={16} />, href: '/assets' },
              ].map(stat => (
                <Link key={stat.label} href={stat.href}
                  className="bg-white p-5 rounded-2xl border border-gray-100 hover:border-[#00C49F]/30 hover:shadow-md transition-all group">
                  <div className="flex justify-between items-start mb-3">
                    <div className="text-[#00C49F]">{stat.icon}</div>
                    <ArrowRight size={14} className="text-gray-300 group-hover:text-[#00C49F] transition-colors" />
                  </div>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-[9px] font-bold tracking-widest text-gray-400 mt-1">{stat.label}</p>
                </Link>
              ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              <div className="xl:col-span-2 space-y-8">
                <div>
                  <h1 className="text-3xl font-semibold tracking-tight text-[#0F172A]">Master Hub</h1>
                  <Link href="/listings" className="mt-3 inline-flex items-center gap-1 text-xs text-[#00C49F] font-semibold hover:underline">
                    Tüm ilanları gör <ArrowRight size={12} />
                  </Link>
                </div>
                <div className="space-y-4">
                  {listings.length > 0 ? listings.map((listing) => (
                    <Link key={listing.id} href={`/listing/${listing.id}`} className="p-6 bg-white rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300 flex flex-col gap-4 block">
                      <div className="flex justify-between items-start">
                        <span className="px-3 py-1 bg-gray-50 border border-gray-200 rounded-full text-[10px] font-bold tracking-widest text-gray-600 uppercase">{listing.status}</span>
                        <span className="flex items-center gap-1 text-[#00C49F] text-xs font-bold tracking-wide"><Activity size={14}/> AKTİF</span>
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold text-[#0F172A]">{listing.title}</h2>
                        <p className="text-sm text-gray-500 font-medium mt-1 flex items-center gap-1">
                          <Crosshair size={14}/> {listing.location || "Lokasyon Gizli"}
                        </p>
                      </div>
                      <div className="flex justify-between items-center mt-2 border-t border-gray-50 pt-4">
                        <span className="text-2xl font-bold tracking-tight text-[#0F172A]">₺ {listing.price.toLocaleString('tr-TR')}</span>
                        <ArrowRight size={18} className="text-[#00C49F]" />
                      </div>
                    </Link>
                  )) : (
                    <div className="p-8 bg-white rounded-3xl border border-dashed border-gray-200 flex items-center justify-center text-gray-400 font-medium">
                      Radarda ilan bulunamadı.
                    </div>
                  )}
                </div>
              </div>{/* xl:col-span-2 */}

            <div className="space-y-6">
              <div className="p-6 bg-white rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.03)] relative overflow-hidden">
                <div className="flex justify-between items-start mb-6">
                  <span className="text-[10px] font-bold tracking-widest text-[#00C49F] uppercase flex items-center gap-2">
                    <Mic size={12} /> SPATIAL VOICE COMMAND
                  </span>
                  <div className="w-8 h-8 rounded-full bg-[#F0FDF8] text-[#00C49F] flex items-center justify-center"><Mic size={14}/></div>
                </div>
                <h3 className="text-2xl font-semibold leading-tight mb-8">Sinirsel Komuta<br/>Merkezi</h3>
                
                <div className="h-12 w-full bg-gray-50 rounded-xl mb-8 flex items-center justify-center relative overflow-hidden">
                   <div className="w-3/4 border-b-2 border-[#00C49F] border-dashed opacity-50 animate-pulse"></div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl mb-4">
                  <span className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">SESLİ ANALİZ<br/>DURUMU</span>
                  <span className="text-[10px] font-bold tracking-widest text-[#00C49F] uppercase text-right">IDENTIFIED:<br/>MUSTAFA_INAN</span>
                </div>

                <div className="flex items-center justify-center gap-2 p-3 border border-gray-100 rounded-2xl text-xs font-bold tracking-wide">
                  <ShieldCheck size={14} className="text-[#00C49F]" /> HAPTIC FEEDBACK: READY <Zap size={14} className="text-[#00C49F]" />
                </div>
              </div>

              <div className="p-6 bg-white rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.03)]">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[10px] font-bold tracking-widest text-[#00C49F] uppercase flex items-center gap-2">
                    <Globe size={12} /> GEOSPATIAL COMMAND CENTER
                  </span>
                  <div className="w-8 h-8 rounded-full bg-gray-50 text-[#00C49F] flex items-center justify-center"><Crosshair size={14}/></div>
                </div>
                <h3 className="text-xl font-semibold mb-6">Küresel Varlık Projeksiyonu</h3>
                <div className="h-32 bg-gray-50 rounded-2xl border border-dashed border-gray-200"></div>
              </div>

              <div className="p-6 bg-white rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.03)]">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[10px] font-bold tracking-widest text-[#00C49F] uppercase flex items-center gap-2">
                    <TrendingUp size={12} /> ELITE TREASURY V2
                  </span>
                </div>
                <div className="flex items-end justify-between">
                  <h3 className="text-xl font-semibold">Küresel<br/>Likidite</h3>
                  <div className="px-3 py-1.5 bg-[#F0FDF8] text-[#00C49F] rounded-xl text-[10px] font-bold tracking-widest uppercase flex items-center gap-1">
                    <Zap size={12}/> SYSTEM_SOLVENCY: 100%
                  </div>
                </div>
              </div>

            </div>{/* xl:col-span-2 */}
            </div>{/* xl:grid-cols-3 */}
          </div>{/* space-y-8 */}
        </div>
      </main>
    </div>
  );
}
