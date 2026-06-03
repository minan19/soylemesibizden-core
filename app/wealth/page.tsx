import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import Link from 'next/link';
import {
  ArrowLeft, TrendingUp, Shield, Wallet, BarChart3,
  MapPin, AlertTriangle, CheckCircle, ArrowRight, PieChart,
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export const dynamic = 'force-dynamic';

const ASSET_TYPE_LABELS: Record<string, string> = {
  RESIDENTIAL: 'Konut',
  COMMERCIAL:  'Ticari',
  LAND:        'Arsa',
  INDUSTRIAL:  'Endüstriyel',
};

const ASSET_TYPE_COLORS: Record<string, string> = {
  RESIDENTIAL: '#00C49F',
  COMMERCIAL:  '#3B82F6',
  LAND:        '#F59E0B',
  INDUSTRIAL:  '#8B5CF6',
};

function hhi(values: number[]): number {
  const total = values.reduce((a, b) => a + b, 0);
  if (total === 0) return 0;
  return values.reduce((sum, v) => sum + Math.pow(v / total, 2), 0);
}

function diversificationGrade(score: number): { label: string; color: string } {
  if (score < 0.25) return { label: 'Mükemmel Çeşitlendirme', color: '#00C49F' };
  if (score < 0.40) return { label: 'İyi Çeşitlendirme', color: '#3B82F6' };
  if (score < 0.60) return { label: 'Orta Çeşitlendirme', color: '#F59E0B' };
  return { label: 'Zayıf Çeşitlendirme', color: '#EF4444' };
}

export default async function WealthPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect('/login');

  const userId = (session.user as { id?: string }).id!;

  const [assets, listings, offers] = await Promise.all([
    prisma.asset.findMany({
      where: { userId },
      orderBy: { value: 'desc' },
    }),
    prisma.listing.findMany({
      where: { ownerId: userId },
      include: { _count: { select: { offers: true } } },
      orderBy: { priceAmount: 'desc' },
    }),
    prisma.offer.findMany({
      where: { userId, status: 'ACCEPTED' },
      include: { listing: { select: { title: true, priceAmount: true } } },
    }),
  ]);

  // Portföy hesaplamaları
  const assetTotalValue = assets.reduce((s, a) => s + a.value, 0);
  const listingTotalValue = listings.reduce((s, l) => s + l.priceAmount, 0);
  const totalPortfolioValue = assetTotalValue + listingTotalValue;

  // Tip dağılımı (asset)
  const typeDist: Record<string, number> = {};
  for (const a of assets) {
    typeDist[a.type] = (typeDist[a.type] ?? 0) + a.value;
  }
  for (const l of listings) {
    typeDist[l.propertyType] = (typeDist[l.propertyType] ?? 0) + l.priceAmount;
  }

  const hhiScore = hhi(Object.values(typeDist));
  const divGrade = diversificationGrade(hhiScore);

  // Lokasyon dağılımı
  const locDist: Record<string, number> = {};
  for (const l of listings) {
    const loc = l.location?.split(',')[0]?.trim() ?? 'Bilinmiyor';
    locDist[loc] = (locDist[loc] ?? 0) + l.priceAmount;
  }
  for (const a of assets) {
    const loc = a.location?.split(',')[0]?.trim() ?? 'Bilinmiyor';
    locDist[loc] = (locDist[loc] ?? 0) + a.value;
  }
  const topLocations = Object.entries(locDist)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  // Tahmini yıllık kira (basit — residential %4.5, commercial %6)
  const estimatedYearlyRent = listings.reduce((s, l) => {
    const rate = l.propertyType === 'COMMERCIAL' ? 0.062 : 0.045;
    return s + l.priceAmount * rate;
  }, 0);
  const estimatedMonthlyRent = estimatedYearlyRent / 12;

  // Öneriler
  const recommendations: string[] = [];
  if (hhiScore > 0.6) recommendations.push('Portföyünüz yoğunlaşmış — farklı mülk tipleri veya şehirlere çeşitlendirme düşünün.');
  const istanbulShare = (locDist['İstanbul'] ?? 0) / totalPortfolioValue;
  if (istanbulShare > 0.8) recommendations.push('Portföyünüzün büyük çoğunluğu İstanbul\'da — coğrafi çeşitlendirme riski azaltır.');
  if (listings.length === 0 && assets.length > 0) recommendations.push('Aktif ilan eklemeniz portföyünüzün görünürlüğünü artırır.');
  if (totalPortfolioValue > 0 && estimatedYearlyRent / totalPortfolioValue < 0.03) {
    recommendations.push('Tahmini getiri %3\'ün altında — daha yüksek getirili mülk tipleri değerlendirilebilir.');
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-[#0F172A]">
      {/* Navbar */}
      <nav className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-gray-100 h-20 flex items-center justify-between px-10">
        <Link href="/dashboard" className="text-[11px] font-bold tracking-[0.35em] uppercase">
          SÖYLEMESİ<span className="text-[#00C49F]">BİZDEN</span>
        </Link>
        <Link href="/dashboard" className="flex items-center gap-2 text-[11px] font-bold text-gray-400 hover:text-[#0F172A] transition-colors">
          <ArrowLeft size={14} /> Dashboard
        </Link>
      </nav>

      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* Header */}
        <div className="mb-10">
          <p className="text-[10px] font-black tracking-widest uppercase text-[#00C49F] mb-2">SOVEREIGN WEALTH</p>
          <h1 className="text-4xl font-black tracking-tighter">
            Portföy Dashboardı
          </h1>
        </div>

        {/* Net Worth Hero */}
        <div className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] rounded-[40px] p-10 mb-8 text-white">
          <div className="grid grid-cols-4 gap-8">
            <div className="col-span-2">
              <p className="text-[10px] font-black tracking-widest uppercase text-slate-500 mb-3">TOPLAM PORTFÖY DEĞERİ</p>
              <p className="text-6xl font-black tracking-tighter text-white mb-2">
                {formatCurrency(totalPortfolioValue)}
              </p>
              <p className="text-[11px] text-slate-500">
                {assets.length} varlık + {listings.length} ilan
              </p>
            </div>
            <div className="border-l border-slate-800 pl-8">
              <p className="text-[10px] font-black tracking-widest uppercase text-slate-500 mb-3">AYLIK KİRA GELİRİ</p>
              <p className="text-3xl font-black text-[#00C49F]">{formatCurrency(estimatedMonthlyRent)}</p>
              <p className="text-[11px] text-slate-500">Tahmini brüt</p>
            </div>
            <div className="border-l border-slate-800 pl-8">
              <p className="text-[10px] font-black tracking-widest uppercase text-slate-500 mb-3">ÇEŞİTLENDİRME</p>
              <p className="text-3xl font-black" style={{ color: divGrade.color }}>{divGrade.label}</p>
              <p className="text-[11px] text-slate-500">HHI: {hhiScore.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {/* Sol: Tip Dağılımı */}
          <div className="col-span-2 space-y-6">

            {/* Stat Cards */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Aktif İlan', value: listings.length.toString(), icon: BarChart3, color: '#00C49F' },
                { label: 'Kayıtlı Varlık', value: assets.length.toString(), icon: Shield, color: '#3B82F6' },
                { label: 'Kabul Edilen Teklif', value: offers.length.toString(), icon: Wallet, color: '#D4AF37' },
              ].map(({ label, value, icon: Icon, color }) => (
                <div key={label} className="bg-white rounded-[24px] border border-gray-100 p-6 shadow-sm">
                  <div className="w-10 h-10 rounded-2xl flex items-center justify-center mb-4" style={{ backgroundColor: color + '15' }}>
                    <Icon size={18} style={{ color }} />
                  </div>
                  <p className="text-3xl font-black tracking-tighter" style={{ color }}>{value}</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">{label}</p>
                </div>
              ))}
            </div>

            {/* Tip Dağılımı Tablosu */}
            <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-8 py-6 border-b border-gray-50 flex items-center gap-3">
                <PieChart size={18} className="text-[#00C49F]" />
                <h2 className="text-sm font-black tracking-tight">Mülk Tipi Dağılımı</h2>
              </div>
              <div className="p-6 space-y-4">
                {Object.entries(typeDist)
                  .sort(([, a], [, b]) => b - a)
                  .map(([type, value]) => {
                    const share = totalPortfolioValue > 0 ? value / totalPortfolioValue : 0;
                    const color = ASSET_TYPE_COLORS[type] ?? '#94A3B8';
                    return (
                      <div key={type}>
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
                            <span className="text-[12px] font-bold text-[#0F172A]">
                              {ASSET_TYPE_LABELS[type] ?? type}
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="text-[12px] font-black text-[#0F172A]">{formatCurrency(value)}</span>
                            <span className="text-[10px] text-gray-400 ml-2">{(share * 100).toFixed(1)}%</span>
                          </div>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all"
                            style={{ width: `${share * 100}%`, backgroundColor: color }}
                          />
                        </div>
                      </div>
                    );
                  })}
                {Object.keys(typeDist).length === 0 && (
                  <p className="text-sm text-gray-400 text-center py-4">Henüz varlık eklenmemiş.</p>
                )}
              </div>
            </div>

            {/* İlan Listesi */}
            {listings.length > 0 && (
              <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
                <div className="px-8 py-6 border-b border-gray-50 flex items-center justify-between">
                  <h2 className="text-sm font-black tracking-tight">İlanlarım</h2>
                  <Link href="/listings" className="text-[11px] font-bold text-[#00C49F] hover:underline flex items-center gap-1">
                    Tümü <ArrowRight size={12} />
                  </Link>
                </div>
                <div className="divide-y divide-gray-50">
                  {listings.slice(0, 5).map((l) => (
                    <Link key={l.id} href={`/listing/${l.id}`}
                      className="flex items-center justify-between px-8 py-5 hover:bg-[#F8FAFC] transition-all group">
                      <div>
                        <p className="text-sm font-bold group-hover:text-[#00C49F] transition-colors">{l.title}</p>
                        {l.location && (
                          <p className="text-[11px] text-gray-400 flex items-center gap-1 mt-0.5">
                            <MapPin size={10} /> {l.location}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="font-black text-[#0F172A]">{formatCurrency(l.priceAmount)}</p>
                        <p className="text-[10px] text-gray-400">{l._count.offers} teklif</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sağ: Lokasyon + Öneriler */}
          <div className="space-y-6">
            {/* Lokasyon Dağılımı */}
            <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-50 flex items-center gap-3">
                <MapPin size={15} className="text-[#00C49F]" />
                <h2 className="text-sm font-black tracking-tight">Lokasyon Dağılımı</h2>
              </div>
              <div className="p-6 space-y-3">
                {topLocations.length === 0 ? (
                  <p className="text-sm text-gray-400 text-center py-2">Veri yok.</p>
                ) : (
                  topLocations.map(([loc, val]) => {
                    const share = totalPortfolioValue > 0 ? val / totalPortfolioValue : 0;
                    return (
                      <div key={loc}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[11px] font-bold text-[#0F172A] truncate max-w-[120px]">{loc}</span>
                          <span className="text-[10px] font-bold text-gray-400">{(share * 100).toFixed(0)}%</span>
                        </div>
                        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-[#00C49F] rounded-full" style={{ width: `${share * 100}%` }} />
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* AI Öneriler */}
            <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-50 flex items-center gap-3">
                <TrendingUp size={15} className="text-[#00C49F]" />
                <h2 className="text-sm font-black tracking-tight">Sovereign Öneriler</h2>
              </div>
              <div className="p-6 space-y-3">
                {recommendations.length === 0 ? (
                  <div className="flex items-start gap-2">
                    <CheckCircle size={14} className="text-[#00C49F] shrink-0 mt-0.5" />
                    <p className="text-[11px] text-gray-600">Portföyünüz dengeli görünüyor.</p>
                  </div>
                ) : (
                  recommendations.map((r, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <AlertTriangle size={14} className="text-amber-400 shrink-0 mt-0.5" />
                      <p className="text-[11px] text-gray-600 leading-relaxed">{r}</p>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Hızlı Linkler */}
            <div className="space-y-2">
              {[
                { label: 'Varlık Ekle', href: '/assets', color: '#00C49F' },
                { label: 'Yeni İlan', href: '/admin/listings/new', color: '#3B82F6' },
                { label: 'AI Değerleme', href: '/valuation', color: '#8B5CF6' },
              ].map(({ label, href, color }) => (
                <Link key={label} href={href}
                  className="flex items-center justify-between px-5 py-3.5 bg-white border border-gray-100 rounded-2xl hover:border-gray-200 shadow-sm transition-all group">
                  <span className="text-[12px] font-bold" style={{ color }}>{label}</span>
                  <ArrowRight size={14} className="text-gray-300 group-hover:text-gray-400" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
