import prisma from '@/lib/prisma';
import Link from 'next/link';
import { Metadata } from 'next';
import { TrendingUp, TrendingDown, MapPin, BarChart2, ArrowRight, Minus } from 'lucide-react';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Fiyat Trendi | Aylık Gayrimenkul Fiyat Analizi | Söylemesi Bizden',
  description:
    'Türkiye\'de gayrimenkul fiyatlarının aylık trendi. Şehir bazlı satılık ve kiralık fiyat değişimleri, piyasa eğilimleri.',
};

function monthLabel(d: Date) {
  return d.toLocaleDateString('tr-TR', { month: 'short', year: '2-digit' });
}

function pctChange(a: number, b: number): number {
  if (b === 0) return 0;
  return ((a - b) / b) * 100;
}

export default async function FiyatTrendiPage() {
  const now = new Date();
  const monthsBack = 12;

  // Build month buckets (last 12 months)
  const months: Date[] = [];
  for (let i = monthsBack - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push(d);
  }

  // Fetch all active listings with price and createdAt for the last 13 months (for calculations)
  const since = new Date(now.getFullYear(), now.getMonth() - monthsBack, 1);

  const [allListings, cityGrouped, typeTotals] = await Promise.all([
    prisma.listing.findMany({
      where: { status: 'ACTIVE', price: { gt: 0 }, createdAt: { gte: since } },
      select: { price: true, createdAt: true, listingType: true, city: true, area: true },
      orderBy: { createdAt: 'asc' },
    }),
    // City-level aggregation for current listings
    prisma.listing.groupBy({
      by: ['city'],
      where: { status: 'ACTIVE', price: { gt: 0 }, city: { not: null } },
      _count: true,
      _avg: { price: true },
      orderBy: { _count: { city: 'desc' } },
      take: 8,
    }),
    prisma.listing.groupBy({
      by: ['listingType'],
      where: { status: 'ACTIVE', price: { gt: 0 } },
      _count: true,
      _avg: { price: true },
    }),
  ]);

  // Bucket listings by month
  type MonthBucket = { avg: number; count: number; avgSatilik: number; cntSatilik: number; avgKiralik: number; cntKiralik: number };
  const buckets: MonthBucket[] = months.map(() => ({ avg: 0, count: 0, avgSatilik: 0, cntSatilik: 0, avgKiralik: 0, cntKiralik: 0 }));
  const tempSums = months.map(() => ({ sum: 0, cnt: 0, sumS: 0, cntS: 0, sumK: 0, cntK: 0 }));

  for (const l of allListings) {
    const d = new Date(l.createdAt);
    const idx = months.findIndex(m => m.getFullYear() === d.getFullYear() && m.getMonth() === d.getMonth());
    if (idx === -1) continue;
    tempSums[idx].sum += l.price;
    tempSums[idx].cnt++;
    if (l.listingType === 'SATILIK') { tempSums[idx].sumS += l.price; tempSums[idx].cntS++; }
    if (l.listingType === 'KİRALIK') { tempSums[idx].sumK += l.price; tempSums[idx].cntK++; }
  }
  for (let i = 0; i < months.length; i++) {
    const t = tempSums[i];
    buckets[i].avg = t.cnt > 0 ? Math.round(t.sum / t.cnt) : 0;
    buckets[i].count = t.cnt;
    buckets[i].avgSatilik = t.cntS > 0 ? Math.round(t.sumS / t.cntS) : 0;
    buckets[i].cntSatilik = t.cntS;
    buckets[i].avgKiralik = t.cntK > 0 ? Math.round(t.sumK / t.cntK) : 0;
    buckets[i].cntKiralik = t.cntK;
  }

  // Find chart max for scaling
  const maxSatilik = Math.max(...buckets.map(b => b.avgSatilik), 1);
  const maxKiralik = Math.max(...buckets.map(b => b.avgKiralik), 1);

  // Compute m²-based averages for top cities
  const cityM2 = cityGrouped.map(c => {
    const cityListings = allListings.filter(l => l.city === c.city && l.area && l.area > 0 && l.listingType === 'SATILIK');
    const avgM2 = cityListings.length > 0
      ? Math.round(cityListings.reduce((s, l) => s + l.price / (l.area!), 0) / cityListings.length)
      : 0;
    return { city: c.city, count: c._count, avgPrice: Math.round(c._avg.price ?? 0), avgM2 };
  });

  // Month-over-month change (last vs previous)
  const lastMonth = buckets[buckets.length - 1];
  const prevMonth = buckets[buckets.length - 2];
  const momChange = pctChange(lastMonth.avg, prevMonth.avg);
  const momSChange = pctChange(lastMonth.avgSatilik, prevMonth.avgSatilik);
  const momKChange = pctChange(lastMonth.avgKiralik, prevMonth.avgKiralik);

  // 3-month change
  const threeMonthsAgo = buckets[buckets.length - 4];
  const qChange = pctChange(lastMonth.avg, threeMonthsAgo.avg);

  // 12-month change
  const yearAgo = buckets[0];
  const yoyChange = pctChange(lastMonth.avg, yearAgo.avg);

  const satilikTotal = typeTotals.find(t => t.listingType === 'SATILIK');
  const kiralikTotal = typeTotals.find(t => t.listingType === 'KİRALIK');

  function TrendIcon({ pct }: { pct: number }) {
    if (pct > 0.5) return <TrendingUp size={14} className="text-red-500" />;
    if (pct < -0.5) return <TrendingDown size={14} className="text-green-500" />;
    return <Minus size={14} className="text-gray-400" />;
  }

  function TrendBadge({ pct }: { pct: number }) {
    const color = pct > 0.5 ? 'text-red-600 bg-red-50' : pct < -0.5 ? 'text-green-600 bg-green-50' : 'text-gray-500 bg-gray-100';
    return (
      <span className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full ${color}`}>
        <TrendIcon pct={pct} />
        {pct > 0 ? '+' : ''}{pct.toFixed(1)}%
      </span>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="flex items-center gap-2 bg-white/10 border border-white/20 text-white/80 text-xs font-bold px-4 py-1.5 rounded-full w-fit mb-5">
            <BarChart2 size={12} /> Piyasa Verileri · Son 12 Ay
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">
            Gayrimenkul Fiyat Trendi
          </h1>
          <p className="text-slate-400 text-sm max-w-xl leading-relaxed mb-8">
            Türkiye&apos;deki satılık ve kiralık mülklerde son 12 ayın fiyat değişimleri.
            Aylık ortalama, şehir karşılaştırması ve piyasa eğilimleri.
          </p>

          {/* KPI cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Aylık Değişim', pct: momChange, sub: 'Genel ortalama' },
              { label: '3 Aylık Değişim', pct: qChange, sub: '3 ay öncesine göre' },
              { label: 'Yıllık Değişim', pct: yoyChange, sub: '12 ay öncesine göre' },
              { label: 'Satılık Aylık', pct: momSChange, sub: 'SATILIK ortalama' },
            ].map(item => (
              <div key={item.label} className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <p className="text-xs text-slate-400 mb-2">{item.label}</p>
                <div className="flex items-center gap-2">
                  <TrendIcon pct={item.pct} />
                  <p className={`text-2xl font-black ${item.pct > 0.5 ? 'text-red-400' : item.pct < -0.5 ? 'text-green-400' : 'text-white'}`}>
                    {item.pct > 0 ? '+' : ''}{item.pct.toFixed(1)}%
                  </p>
                </div>
                <p className="text-xs text-slate-500 mt-1">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">

        {/* Satılık chart */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                <TrendingUp size={15} className="text-blue-500" /> Satılık Ortalama Fiyat Trendi
              </h2>
              <p className="text-xs text-gray-400 mt-0.5">Son 12 ay — aylık ortalama satılık fiyat</p>
            </div>
            {satilikTotal && (
              <div className="text-right">
                <p className="text-lg font-black text-gray-900">
                  ₺{Math.round((satilikTotal._avg.price ?? 0) / 1000).toLocaleString('tr-TR')}K
                </p>
                <p className="text-xs text-gray-400">Güncel ort.</p>
              </div>
            )}
          </div>
          <div className="flex items-end gap-1 h-40">
            {buckets.map((b, i) => {
              const h = maxSatilik > 0 ? Math.round((b.avgSatilik / maxSatilik) * 100) : 0;
              const isLast = i === buckets.length - 1;
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1" title={`${monthLabel(months[i])}: ₺${Math.round(b.avgSatilik / 1000)}K`}>
                  <div className="w-full flex items-end justify-center" style={{ height: '120px' }}>
                    <div
                      className={`w-full rounded-t-sm transition-all ${isLast ? 'bg-blue-500' : 'bg-blue-200'}`}
                      style={{ height: h > 0 ? `${Math.max(h, 3)}%` : '3px' }}
                    />
                  </div>
                  <p className="text-[8px] text-gray-400 text-center leading-tight">{monthLabel(months[i])}</p>
                </div>
              );
            })}
          </div>
          {/* Legend */}
          <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-gray-50">
            {buckets.filter((_, i) => i % 3 === 2 || i === buckets.length - 1).map((b, _, arr) => {
              const idx = buckets.indexOf(b);
              if (b.avgSatilik === 0) return null;
              return (
                <div key={idx} className="text-xs">
                  <span className="text-gray-400">{monthLabel(months[idx])}: </span>
                  <span className="font-bold text-gray-700">₺{Math.round(b.avgSatilik / 1000).toLocaleString('tr-TR')}K</span>
                  {idx > 0 && buckets[idx - 1].avgSatilik > 0 && (
                    <span className="ml-1">
                      <TrendBadge pct={pctChange(b.avgSatilik, buckets[idx - 1].avgSatilik)} />
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Kiralık chart */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                <TrendingUp size={15} className="text-violet-500" /> Kiralık Ortalama Fiyat Trendi
              </h2>
              <p className="text-xs text-gray-400 mt-0.5">Son 12 ay — aylık ortalama kiralık fiyat</p>
            </div>
            {kiralikTotal && (
              <div className="text-right">
                <p className="text-lg font-black text-gray-900">
                  ₺{Math.round(kiralikTotal._avg.price ?? 0).toLocaleString('tr-TR')}
                </p>
                <p className="text-xs text-gray-400">Güncel ort./ay</p>
              </div>
            )}
          </div>
          <div className="flex items-end gap-1 h-40">
            {buckets.map((b, i) => {
              const h = maxKiralik > 0 ? Math.round((b.avgKiralik / maxKiralik) * 100) : 0;
              const isLast = i === buckets.length - 1;
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1" title={`${monthLabel(months[i])}: ₺${Math.round(b.avgKiralik).toLocaleString('tr-TR')}`}>
                  <div className="w-full flex items-end justify-center" style={{ height: '120px' }}>
                    <div
                      className={`w-full rounded-t-sm transition-all ${isLast ? 'bg-violet-500' : 'bg-violet-200'}`}
                      style={{ height: h > 0 ? `${Math.max(h, 3)}%` : '3px' }}
                    />
                  </div>
                  <p className="text-[8px] text-gray-400 text-center leading-tight">{monthLabel(months[i])}</p>
                </div>
              );
            })}
          </div>
          {momKChange !== 0 && (
            <div className="flex gap-2 mt-3 pt-3 border-t border-gray-50">
              <span className="text-xs text-gray-400">Aylık değişim:</span>
              <TrendBadge pct={momKChange} />
            </div>
          )}
        </div>

        {/* City price comparison */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-sm font-bold text-gray-900 mb-5 flex items-center gap-2">
            <MapPin size={15} className="text-[#00C49F]" /> Şehir Bazlı Fiyat Karşılaştırması
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-2 pr-6 text-gray-400 font-semibold">Şehir</th>
                  <th className="text-right py-2 pr-6 text-gray-400 font-semibold">İlan</th>
                  <th className="text-right py-2 pr-6 text-gray-400 font-semibold">Ort. Fiyat</th>
                  <th className="text-right py-2 pr-6 text-gray-400 font-semibold">₺/m²</th>
                  <th className="text-left py-2 text-gray-400 font-semibold">Bant</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {cityM2.map((c, i) => {
                  const maxAvg = Math.max(...cityM2.map(x => x.avgPrice), 1);
                  const barW = Math.round((c.avgPrice / maxAvg) * 100);
                  return (
                    <tr key={c.city} className="hover:bg-gray-50 transition-colors">
                      <td className="py-3 pr-6">
                        <Link href={`/sehir/${encodeURIComponent(c.city ?? '')}`} className="font-bold text-gray-800 hover:text-[#00C49F] transition-colors flex items-center gap-1.5">
                          {i === 0 && <span className="text-amber-500">★</span>}
                          {c.city}
                        </Link>
                      </td>
                      <td className="py-3 pr-6 text-right text-gray-500">{c.count.toLocaleString('tr-TR')}</td>
                      <td className="py-3 pr-6 text-right font-bold text-gray-900">
                        ₺{Math.round(c.avgPrice / 1000).toLocaleString('tr-TR')}K
                      </td>
                      <td className="py-3 pr-6 text-right font-semibold text-[#00C49F]">
                        {c.avgM2 > 0 ? `₺${c.avgM2.toLocaleString('tr-TR')}` : '—'}
                      </td>
                      <td className="py-3">
                        <div className="w-full bg-gray-100 rounded-full h-2">
                          <div className="h-2 rounded-full bg-[#00C49F]" style={{ width: `${barW}%` }} />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Volume by month */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-sm font-bold text-gray-900 mb-5 flex items-center gap-2">
            <BarChart2 size={15} className="text-amber-500" /> Aylık İlan Hacmi
          </h2>
          <div className="flex items-end gap-1 h-28">
            {buckets.map((b, i) => {
              const maxCnt = Math.max(...buckets.map(x => x.count), 1);
              const h = Math.round((b.count / maxCnt) * 100);
              const isLast = i === buckets.length - 1;
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1" title={`${monthLabel(months[i])}: ${b.count} ilan`}>
                  <div className="w-full flex items-end justify-center" style={{ height: '90px' }}>
                    <div
                      className={`w-full rounded-t-sm ${isLast ? 'bg-amber-400' : 'bg-amber-100'}`}
                      style={{ height: h > 0 ? `${Math.max(h, 3)}%` : '3px' }}
                    />
                  </div>
                  <p className="text-[8px] text-gray-400 text-center leading-tight">{monthLabel(months[i])}</p>
                </div>
              );
            })}
          </div>
          <p className="text-xs text-gray-400 mt-3">
            Toplam kayıtlı ilan: <span className="font-bold text-gray-700">{allListings.length.toLocaleString('tr-TR')}</span>
          </p>
        </div>

        {/* CTA */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { href: '/piyasa', label: 'Piyasa Verileri', desc: 'Detaylı piyasa analizi', icon: BarChart2 },
            { href: '/valuation', label: 'Değerleme Aracı', desc: 'Mülkünüzü değerlendirin', icon: TrendingUp },
            { href: '/listings', label: 'Tüm İlanlar', desc: 'Şimdi araştır', icon: ArrowRight },
          ].map(t => (
            <Link
              key={t.href}
              href={t.href}
              className="group bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md hover:border-[#00C49F]/30 transition-all flex items-center gap-4"
            >
              <div className="w-10 h-10 bg-[#F0FDF8] rounded-xl flex items-center justify-center shrink-0">
                <t.icon size={18} className="text-[#00C49F]" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-800 group-hover:text-[#00C49F] transition-colors">{t.label}</p>
                <p className="text-xs text-gray-400">{t.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
