import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { redirect, notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import Link from 'next/link';
import { ArrowLeft, Lock, Eye, Shield, MapPin, Activity, Crown } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import DarkPoolNdaGate from '@/components/DarkPoolNdaGate';

export const dynamic = 'force-dynamic';

export default async function DarkPoolPage() {
  // Feature-flagged: Dark Pool kapsam dışı
  if (process.env.NEXT_PUBLIC_FF_DARK_POOL !== 'true') {
    notFound();
  }

  const session = await getServerSession(authOptions);
  if (!session?.user) redirect('/login');

  const userId = (session.user as { id?: string }).id!;
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { plan: true, darkPoolNda: true },
  });

  const userRole = (session.user as { role?: string }).role;
  const hasAccess = user?.plan === 'SOVEREIGN' || userRole === 'ADMIN';
  const ndaSigned = Boolean(user?.darkPoolNda);

  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-[#0F172A] font-sans flex flex-col items-center justify-center text-center px-8">
        <div className="w-20 h-20 rounded-[28px] bg-[#D4AF37]/10 flex items-center justify-center mb-8">
          <Crown size={36} className="text-[#D4AF37]" />
        </div>
        <p className="text-[10px] font-black tracking-widest uppercase text-[#D4AF37] mb-3">ERİŞİM KISITLI</p>
        <h1 className="text-4xl font-black tracking-tighter text-white mb-4">Dark Pool</h1>
        <p className="text-gray-400 text-sm max-w-sm mb-8 leading-relaxed">
          Dark Pool erişimi yalnızca <span className="text-[#D4AF37] font-bold">Sovereign Plan</span> üyelerine açıktır.
        </p>
        <Link href="/pricing"
          className="px-8 py-4 bg-[#D4AF37] text-[#0F172A] text-[11px] font-black tracking-widest uppercase rounded-2xl hover:bg-[#B8960C] transition-all">
          Sovereign Plana Geç
        </Link>
        <Link href="/dashboard" className="mt-4 text-[11px] font-bold text-gray-600 hover:text-gray-400 transition-colors">← Dashboard</Link>
      </div>
    );
  }

  if (!ndaSigned) return <DarkPoolNdaGate userId={userId} />;

  const listings = await prisma.listing.findMany({
    where: { visibility: 'DARK_POOL', status: 'ACTIVE' },
    include: { owner: { select: { name: true } }, _count: { select: { offers: true } } },
    orderBy: { priceAmount: 'desc' },
  });

  const totalValue = listings.reduce((s, l) => s + l.priceAmount, 0);

  return (
    <div className="min-h-screen bg-[#0F172A] font-sans text-white">
      <nav className="sticky top-0 z-30 bg-[#0A0F1C]/95 backdrop-blur border-b border-white/5 h-20 flex items-center justify-between px-10">
        <div className="flex items-center gap-3">
          <Lock size={14} className="text-[#D4AF37]" />
          <span className="text-[11px] font-bold tracking-[0.35em] uppercase">SÖYLEMESİ<span className="text-[#D4AF37]">BİZDEN</span></span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#D4AF37]/10 rounded-full border border-[#D4AF37]/20">
            <Crown size={11} className="text-[#D4AF37]" />
            <span className="text-[9px] font-black tracking-widest uppercase text-[#D4AF37]">Sovereign Access</span>
          </div>
          <Link href="/dashboard" className="flex items-center gap-2 text-[11px] font-bold text-slate-500 hover:text-white transition-colors">
            <ArrowLeft size={14} /> Dashboard
          </Link>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-8 py-12">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-[18px] bg-[#D4AF37]/10 flex items-center justify-center">
              <Eye size={22} className="text-[#D4AF37]" />
            </div>
            <div>
              <p className="text-[9px] font-black tracking-widest uppercase text-[#D4AF37]">SOVEREIGN DARK POOL</p>
              <h1 className="text-3xl font-black tracking-tighter">Off-Market Fırsatlar</h1>
            </div>
          </div>
          <p className="text-slate-400 text-sm max-w-xl leading-relaxed">
            Bu ilanlar kamuya açık değildir. NDA imzaladığınız için erişebiliyorsunuz.
          </p>
          <div className="flex items-center gap-8 mt-6">
            {[
              { label: 'Gizli İlan', value: listings.length.toString() },
              { label: 'Toplam Değer', value: formatCurrency(totalValue) },
              { label: 'Erişim', value: 'NDA İmzalı ✓' },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="text-[9px] font-black tracking-widest uppercase text-slate-600 mb-1">{label}</p>
                <p className="text-xl font-black text-[#D4AF37]">{value}</p>
              </div>
            ))}
          </div>
        </div>

        {listings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <Lock size={48} className="text-slate-700 mb-6" />
            <p className="text-lg font-bold text-slate-500">Şu an aktif Dark Pool ilanı yok.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {listings.map((listing) => (
              <Link key={listing.id} href={`/listing/${listing.id}`}
                className="group block bg-white/4 hover:bg-white/7 border border-white/8 hover:border-[#D4AF37]/30 rounded-[28px] p-8 transition-all duration-300">
                <div className="flex items-start justify-between gap-6">
                  <div className="flex items-start gap-5 flex-1">
                    <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/10 flex items-center justify-center shrink-0">
                      <Shield size={20} className="text-[#D4AF37]" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-[9px] font-black tracking-widest px-2.5 py-1 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] uppercase border border-[#D4AF37]/20">🔒 DARK POOL</span>
                        <span className="text-[9px] font-black tracking-widest px-2.5 py-1 rounded-full bg-white/8 text-slate-400 uppercase">{listing.propertyType}</span>
                      </div>
                      <h2 className="text-xl font-bold text-white group-hover:text-[#D4AF37] transition-colors mb-2">{listing.title}</h2>
                      {listing.description && <p className="text-sm text-slate-500 line-clamp-1 mb-3">{listing.description}</p>}
                      <div className="flex items-center gap-4">
                        {listing.location && (
                          <span className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
                            <MapPin size={11} /> {listing.location}
                          </span>
                        )}
                        <span className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
                          <Activity size={11} className="text-[#D4AF37]" /> {listing.area.toLocaleString('tr-TR')} m²
                        </span>
                        {listing.owner?.name && <span className="text-[11px] font-semibold text-slate-600">{listing.owner.name}</span>}
                      </div>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-2xl font-black tracking-tighter text-white">{formatCurrency(listing.priceAmount)}</p>
                    <p className="text-[10px] font-semibold text-slate-600 mt-0.5">
                      {listing.area > 0 ? `${formatCurrency(listing.priceAmount / listing.area)} / m²` : '—'}
                    </p>
                    <p className="text-[10px] text-slate-600 mt-1">{listing._count.offers} teklif</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-12 border-t border-white/5 pt-8 text-center">
          <p className="text-[10px] text-slate-700 leading-relaxed max-w-xl mx-auto">
            Bu ilanlar NDA kapsamında paylaşılmaktadır. Üçüncü tarafla paylaşılması hukuki ihlal sayılır.
          </p>
        </div>
      </div>
    </div>
  );
}
