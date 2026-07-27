import Link from 'next/link';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { LayoutGrid, Radar, Lock, Shield, Zap, Bell, Globe, Moon, ShieldCheck, Crosshair, TrendingUp, ArrowRight, Activity, CheckCircle, Clock, MessageSquare } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function SovereignDashboard() {
  const session = await getServerSession(authOptions);

  const sessionUser = session?.user as { name?: string | null; email?: string | null; role?: string } | undefined;
  const isAdmin = sessionUser?.role === 'ADMIN';

  const me = sessionUser?.email ? await prisma.user.findUnique({ where: { email: sessionUser.email } }) : null;

  const [listings, totalListings, totalOffers, totalDeals, totalAssets, recentOffers, openCases, myPendingOffers] = await Promise.all([
    prisma.listing.findMany({ take: 3, where: { status: 'ACTIVE' }, orderBy: { views: 'desc' } }),
    prisma.listing.count({ where: { status: 'ACTIVE' } }),
    me ? prisma.offer.count({ where: { userId: me.id } }) : prisma.offer.count(),
    me ? prisma.dealRoom.count({ where: { OR: [{ buyerId: me.id }, { sellerId: me.id }] } }) : prisma.dealRoom.count(),
    me ? prisma.asset.count({ where: { userId: me.id } }) : prisma.asset.count(),
    prisma.offer.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: { listing: { select: { title: true } }, user: { select: { name: true } } },
    }),
    prisma.advisoryCase.count({ where: { status: 'OPEN', ...(me ? { userId: me.id } : {}) } }),
    me ? prisma.offer.count({ where: { userId: me.id, status: 'PENDING' } }) : Promise.resolve(0),
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
          <Link href={isAdmin ? '/admin/create-listing' : '/create-listing'} className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-xl text-sm font-medium tracking-wide transition-colors">
            <Zap size={18} /> YENİ İLAN
          </Link>
          {isAdmin && (
            <Link href="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-xl text-sm font-medium tracking-wide transition-colors">
              <ShieldCheck size={18} /> ADMİN
            </Link>
          )}
        </nav>
      </aside>

      <main className="flex-1 flex flex-col relative">
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex items-center gap-2 px-4 py-1.5 bg-[#F0FDF8] text-[#00C49F] rounded-full border border-[#00C49F]/20">
            <ShieldCheck size={14} />
            <span className="text-[10px] font-bold tracking-widest uppercase">Secure Session</span>
          </div>
          
          <div className="flex items-center gap-6">
            {session?.user?.name && (
              <span className="text-xs font-semibold text-gray-700 tracking-wide">
                {session.user.name}
              </span>
            )}
            <Link href="/notifications" className="relative text-gray-400 hover:text-[#00C49F] transition-colors">
              <Bell size={20} />
              {myPendingOffers > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 text-white text-[8px] font-black rounded-full flex items-center justify-center">
                  {myPendingOffers > 9 ? '9+' : myPendingOffers}
                </span>
              )}
            </Link>
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
                { label: 'AKTİF İLAN', value: totalListings, icon: <LayoutGrid size={16} />, href: '/listings' },
                { label: me ? 'TEKLİFLERİM' : 'TOPLAM TEKLİF', value: totalOffers, icon: <TrendingUp size={16} />, href: '/offers' },
                { label: 'ANLAŞMALAR', value: totalDeals, icon: <Activity size={16} />, href: '/deals' },
                { label: me ? 'VARLIKLARIM' : 'TOPLAM VARLIK', value: totalAssets, icon: <Shield size={16} />, href: '/assets' },
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
              {/* Recent Offers */}
              <div className="p-6 bg-white rounded-3xl border border-gray-100">
                <div className="flex justify-between items-center mb-5">
                  <span className="text-[10px] font-bold tracking-widest text-[#00C49F] uppercase flex items-center gap-2">
                    <TrendingUp size={12} /> Son Teklifler
                  </span>
                  <Link href="/offers" className="text-[10px] font-bold text-gray-400 hover:text-[#00C49F] transition-colors flex items-center gap-1">
                    Tümü <ArrowRight size={10} />
                  </Link>
                </div>
                {recentOffers.length === 0 ? (
                  <p className="text-xs text-gray-400 text-center py-4">Henüz teklif yok</p>
                ) : (
                  <div className="space-y-3">
                    {recentOffers.map(offer => (
                      <div key={offer.id} className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full shrink-0 ${
                          offer.status === 'ACCEPTED' ? 'bg-[#00C49F]' :
                          offer.status === 'REJECTED' ? 'bg-red-400' : 'bg-amber-400'
                        }`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-gray-800 truncate">{offer.listing.title}</p>
                          <p className="text-[10px] text-gray-400">{offer.user.name ?? '—'} · ₺{offer.amount.toLocaleString('tr-TR')}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Quick Actions */}
              <div className="p-6 bg-white rounded-3xl border border-gray-100">
                <span className="text-[10px] font-bold tracking-widest text-[#00C49F] uppercase flex items-center gap-2 mb-5">
                  <Zap size={12} /> Hızlı İşlemler
                </span>
                <div className="space-y-2">
                  {[
                    { label: 'Yeni İlan Ekle', href: '/create-listing', icon: <Crosshair size={14} /> },
                    { label: 'Favorilerimi Gör', href: '/favorites', icon: <Globe size={14} /> },
                    { label: 'Tekliflerimi İncele', href: '/offers', icon: <TrendingUp size={14} /> },
                    { label: 'Güvenlik Merkezi', href: '/security', icon: <ShieldCheck size={14} /> },
                  ].map(item => (
                    <Link key={item.href} href={item.href}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#F0FDF8] text-gray-600 hover:text-[#00C49F] transition-colors group">
                      <div className="text-gray-400 group-hover:text-[#00C49F] transition-colors">{item.icon}</div>
                      <span className="text-xs font-semibold">{item.label}</span>
                      <ArrowRight size={12} className="ml-auto text-gray-300 group-hover:text-[#00C49F] transition-colors" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Advisory Cases */}
              <div className="p-6 bg-white rounded-3xl border border-gray-100">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] font-bold tracking-widest text-[#00C49F] uppercase flex items-center gap-2">
                    <MessageSquare size={12} /> Danışmanlık
                  </span>
                  <Link href="/concierge" className="text-[10px] font-bold text-gray-400 hover:text-[#00C49F] transition-colors flex items-center gap-1">
                    Git <ArrowRight size={10} />
                  </Link>
                </div>
                <div className="flex items-center gap-3">
                  {openCases > 0 ? (
                    <>
                      <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500">
                        <Clock size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">{openCases} açık vaka</p>
                        <p className="text-[10px] text-gray-400">Yanıt bekliyor</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-10 h-10 rounded-xl bg-[#F0FDF8] flex items-center justify-center text-[#00C49F]">
                        <CheckCircle size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">Tüm vakalar çözüldü</p>
                        <p className="text-[10px] text-gray-400">Açık talep yok</p>
                      </div>
                    </>
                  )}
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
