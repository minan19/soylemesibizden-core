import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import Link from 'next/link';
import {
  User, ArrowLeft, FileText, Handshake, Database,
  MapPin, Calendar, TrendingUp, ArrowRight, Shield,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

function formatCurrency(val: number): string {
  if (val >= 1e9) return (val / 1e9).toFixed(2) + ' Milyar ₺';
  if (val >= 1e6) return (val / 1e6).toFixed(2) + ' Milyon ₺';
  return val.toLocaleString('tr-TR') + ' ₺';
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }).format(date);
}

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect('/login');

  const userId = (session.user as { id?: string }).id;
  if (!userId) redirect('/login');

  const [user, myListings, myOffers, myAssets] = await Promise.all([
    prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, email: true, role: true, createdAt: true },
    }),
    prisma.listing.findMany({
      where: { ownerId: userId },
      orderBy: { createdAt: 'desc' },
      take: 5,
    }),
    prisma.offer.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 5,
      include: { listing: { select: { id: true, title: true, priceAmount: true } } },
    }),
    prisma.asset.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    }),
  ]);

  if (!user) redirect('/login');

  const totalListingValue = myListings.reduce((s, l) => s + l.priceAmount, 0);
  const totalAssetValue = myAssets.reduce((s, a) => s + a.value, 0);
  const totalPortfolio = totalListingValue + totalAssetValue;

  const stats = [
    { label: 'İlanlarım', value: myListings.length, icon: FileText, color: '#00C49F', href: '/listings' },
    { label: 'Tekliflerim', value: myOffers.length, icon: Handshake, color: '#3B82F6', href: '/offers' },
    { label: 'Varlıklarım', value: myAssets.length, icon: Database, color: '#8B5CF6', href: '/assets' },
    { label: 'Portföy Değeri', value: formatCurrency(totalPortfolio), icon: TrendingUp, color: '#D4AF37', href: '/assets', isString: true },
  ];

  const initials = (user.name ?? user.email).slice(0, 2).toUpperCase();

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-[#0F172A]">
      <nav className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-gray-100 h-20 flex items-center justify-between px-10">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="flex items-center gap-2 text-[11px] font-bold text-gray-400 hover:text-[#0F172A] transition-colors">
            <ArrowLeft size={16} /> Dashboard
          </Link>
          <span className="text-gray-200">·</span>
          <div className="flex items-center gap-2">
            <User size={16} className="text-[#00C49F]" />
            <span className="text-[11px] font-bold">Profilim</span>
          </div>
        </div>
        {user.role === 'ADMIN' && (
          <Link href="/admin" className="px-5 py-2.5 bg-[#0F172A] text-white text-[11px] font-black rounded-full hover:bg-[#1E293B] transition-all">
            ADMIN PANELİ
          </Link>
        )}
      </nav>

      <div className="max-w-6xl mx-auto px-8 py-10 space-y-8">
        {/* PROFILE HEADER */}
        <div className="bg-white rounded-[40px] border border-gray-100 p-10 shadow-[0_4px_24px_rgba(0,0,0,0.02)] flex items-center gap-8">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#00C49F] to-[#00A887] flex items-center justify-center shadow-lg shadow-[#00C49F]/20 shrink-0">
            <span className="text-3xl font-black text-white">{initials}</span>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-3xl font-black tracking-tighter">{user.name ?? 'Sovereign Üyesi'}</h1>
              {user.role === 'ADMIN' && (
                <span className="flex items-center gap-1 text-[10px] font-black px-3 py-1 rounded-full bg-amber-50 text-amber-500">
                  <Shield size={10} /> ADMIN
                </span>
              )}
            </div>
            <p className="text-gray-500 font-semibold mb-3">{user.email}</p>
            <p className="flex items-center gap-1.5 text-[11px] text-gray-400">
              <Calendar size={11} />
              Üyelik: {formatDate(user.createdAt)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Sovereign IQ</p>
            <p className="text-4xl font-black text-[#00C49F]">98.4</p>
            <p className="text-[11px] text-gray-400 mt-1">Güven Skoru</p>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-4 gap-5">
          {stats.map((s) => (
            <Link key={s.label} href={s.href} className="group bg-white rounded-3xl border border-gray-100 p-7 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)] transition-all block">
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center mb-4" style={{ backgroundColor: `${s.color}15` }}>
                <s.icon size={20} style={{ color: s.color }} />
              </div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{s.label}</p>
              <p className="text-2xl font-black" style={{ color: s.color }}>
                {s.isString ? s.value : s.value.toLocaleString('tr-TR')}
              </p>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* MY LISTINGS */}
          <div className="col-span-6">
            <div className="bg-white rounded-[32px] border border-gray-100 overflow-hidden shadow-sm">
              <div className="flex items-center justify-between px-8 py-6 border-b border-gray-50">
                <h2 className="text-[11px] font-black tracking-widest uppercase">Son İlanlarım</h2>
                <Link href="/listings" className="text-[11px] font-bold text-[#00C49F] hover:underline flex items-center gap-1">
                  Tümü <ArrowRight size={12} />
                </Link>
              </div>
              {myListings.length === 0 ? (
                <div className="p-10 text-center text-gray-400 italic text-sm">
                  Henüz ilan oluşturmadınız.
                  <Link href="/admin/listings/new" className="block mt-2 text-[#00C49F] font-bold not-italic hover:underline">İlan Ekle →</Link>
                </div>
              ) : (
                <div className="divide-y divide-gray-50">
                  {myListings.map((l) => (
                    <Link key={l.id} href={`/listing/${l.id}`} className="flex items-center justify-between px-8 py-5 hover:bg-[#F8FAFC] transition-colors group">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-[#F0FDF8] flex items-center justify-center shrink-0">
                          <FileText size={15} className="text-[#00C49F]" />
                        </div>
                        <div>
                          <p className="font-bold text-sm group-hover:text-[#00C49F] transition-colors">{l.title}</p>
                          {l.location && (
                            <p className="flex items-center gap-1 text-[10px] text-gray-400">
                              <MapPin size={9} /> {l.location}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-black text-sm">{formatCurrency(l.priceAmount)}</p>
                        <span className={`text-[9px] font-black px-2 py-0.5 rounded-full ${l.status === 'ACTIVE' ? 'bg-[#F0FDF8] text-[#00C49F]' : 'bg-gray-100 text-gray-400'}`}>
                          {l.status}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* MY OFFERS */}
          <div className="col-span-6">
            <div className="bg-white rounded-[32px] border border-gray-100 overflow-hidden shadow-sm">
              <div className="flex items-center justify-between px-8 py-6 border-b border-gray-50">
                <h2 className="text-[11px] font-black tracking-widest uppercase">Son Tekliflerim</h2>
                <Link href="/offers" className="text-[11px] font-bold text-[#00C49F] hover:underline flex items-center gap-1">
                  Tümü <ArrowRight size={12} />
                </Link>
              </div>
              {myOffers.length === 0 ? (
                <div className="p-10 text-center text-gray-400 italic text-sm">
                  Henüz teklif vermediniz.
                  <Link href="/listings" className="block mt-2 text-[#00C49F] font-bold not-italic hover:underline">İlan Bul →</Link>
                </div>
              ) : (
                <div className="divide-y divide-gray-50">
                  {myOffers.map((o) => (
                    <Link key={o.id} href={`/listing/${o.listing.id}`} className="flex items-center justify-between px-8 py-5 hover:bg-[#F8FAFC] transition-colors group">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                          <Handshake size={15} className="text-blue-500" />
                        </div>
                        <div>
                          <p className="font-bold text-sm group-hover:text-[#00C49F] transition-colors">{o.listing.title}</p>
                          <p className="text-[10px] text-gray-400">{formatDate(o.createdAt)}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-black text-sm">{formatCurrency(o.amount)}</p>
                        <span className={`text-[9px] font-black px-2 py-0.5 rounded-full ${
                          o.status === 'ACCEPTED' ? 'bg-[#F0FDF8] text-[#00C49F]' :
                          o.status === 'REJECTED' ? 'bg-red-50 text-red-400' :
                          'bg-yellow-50 text-yellow-500'}`}>
                          {o.status}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
