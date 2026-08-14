import prisma from '@/lib/prisma';
import Link from 'next/link';
import { Metadata } from 'next';
import { TrendingUp, Home, BarChart2, ArrowRight } from 'lucide-react';
import InvestCalcClient from './InvestCalcClient';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Yatırım Analizi | ROI Hesaplayıcı & Al mı Kirala mı? | Söylemesi Bizden',
  description:
    'Gayrimenkul yatırım getiri analizi, net kira getirisi, sermaye kazancı ve toplam ROI hesaplaması. Al mı kirala mı karşılaştırması.',
};

export default async function YatirimAnaliziPage() {
  // Fetch real yield data by city for the benchmark section
  const cityYields = await prisma.listing.groupBy({
    by: ['city'],
    where: { status: 'ACTIVE', price: { gt: 0 }, city: { not: null } },
    _avg: { price: true },
    _count: true,
    orderBy: { _count: { city: 'desc' } },
    take: 8,
  });

  // Compute city-level rental yield by comparing SATILIK avg to KİRALIK avg
  const cityRents = await prisma.listing.groupBy({
    by: ['city'],
    where: { status: 'ACTIVE', listingType: 'KİRALIK', price: { gt: 0 }, city: { not: null } },
    _avg: { price: true },
  });
  const rentsMap = new Map(cityRents.map(r => [r.city, r._avg.price ?? 0]));

  const citySaleAvg = await prisma.listing.groupBy({
    by: ['city'],
    where: { status: 'ACTIVE', listingType: 'SATILIK', price: { gt: 0 }, city: { not: null } },
    _avg: { price: true },
    _count: true,
    orderBy: { _count: { city: 'desc' } },
    take: 8,
  });

  const benchmarks = citySaleAvg
    .filter(c => c.city && rentsMap.get(c.city ?? '') && (c._avg.price ?? 0) > 0)
    .map(c => {
      const avgSale = c._avg.price ?? 0;
      const avgRent = rentsMap.get(c.city ?? '') ?? 0;
      const grossYield = avgSale > 0 ? ((avgRent * 12) / avgSale) * 100 : 0;
      const payback = grossYield > 0 ? 100 / grossYield : 0;
      return { city: c.city ?? '', avgSale, avgRent, grossYield, payback, count: c._count };
    })
    .filter(b => b.grossYield > 0)
    .sort((a, b) => b.grossYield - a.grossYield);

  const maxYield = Math.max(...benchmarks.map(b => b.grossYield), 1);

  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      {/* Hero */}
      <section className="bg-gradient-to-br from-green-900 via-green-800 to-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="flex items-center gap-2 bg-green-500/20 border border-green-400/30 text-green-200 text-xs font-bold px-4 py-1.5 rounded-full w-fit mb-5">
            <TrendingUp size={12} /> Yatırım Analizi Araçları
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">
            Gayrimenkul Yatırım Analizi
          </h1>
          <p className="text-green-200 text-sm max-w-xl leading-relaxed mb-8">
            Kira getirisi, sermaye kazancı ve toplam ROI hesaplaması. Satın almak mı yoksa
            kiralamak mı daha avantajlı? Verilerle karar verin.
          </p>

          {/* Platform stats */}
          {benchmarks.length > 0 && (
            <div className="flex flex-wrap gap-4">
              {[
                { label: 'En yüksek kira getirisi', value: `%${benchmarks[0].grossYield.toFixed(1)}`, sub: benchmarks[0].city },
                { label: 'Ortalama getiri', value: `%${(benchmarks.reduce((s, b) => s + b.grossYield, 0) / benchmarks.length).toFixed(1)}`, sub: 'Tüm şehirler' },
                { label: 'Analiz edilen şehir', value: benchmarks.length, sub: 'Gerçek veri' },
              ].map(s => (
                <div key={s.label} className="bg-white/10 border border-white/20 rounded-xl px-5 py-3">
                  <p className="text-xl font-black text-green-300">{s.value}</p>
                  <p className="text-xs text-green-200/70">{s.label}</p>
                  {s.sub && <p className="text-[10px] text-green-300/60 mt-0.5">{s.sub}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">

        {/* City yield benchmarks */}
        {benchmarks.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="text-sm font-bold text-gray-900 mb-5 flex items-center gap-2">
              <BarChart2 size={15} className="text-green-600" /> Şehir Bazlı Kira Getiri Kıyaslaması
            </h2>
            <p className="text-xs text-gray-400 mb-5">Brüt kira getirisi = Yıllık kira / Satış fiyatı. Gerçek platform verisi.</p>
            <div className="space-y-3">
              {benchmarks.map((b, i) => {
                const barW = Math.round((b.grossYield / maxYield) * 100);
                const yieldColor = b.grossYield > 5 ? 'text-green-600' : b.grossYield > 3 ? 'text-amber-600' : 'text-red-500';
                return (
                  <div key={b.city} className="flex items-center gap-4">
                    <div className="w-5 text-xs text-gray-400 shrink-0">{i + 1}</div>
                    <Link
                      href={`/sehir/${encodeURIComponent(b.city)}`}
                      className="w-24 shrink-0 text-xs font-bold text-gray-800 hover:text-green-700 transition-colors"
                    >
                      {b.city}
                    </Link>
                    <div className="flex-1 bg-gray-100 rounded-full h-2.5">
                      <div className="h-2.5 rounded-full bg-green-500" style={{ width: `${barW}%` }} />
                    </div>
                    <div className={`w-12 text-right text-xs font-black shrink-0 ${yieldColor}`}>
                      %{b.grossYield.toFixed(1)}
                    </div>
                    <div className="w-24 text-right shrink-0">
                      <p className="text-[10px] text-gray-400">Amorti: {b.payback.toFixed(1)} yıl</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-50 flex gap-6 text-xs text-gray-400">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-green-500 inline-block" /> %5+ İyi getiri</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-400 inline-block" /> %3-5 Orta</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-400 inline-block" /> &lt;%3 Düşük</span>
            </div>
          </div>
        )}

        {/* City detail table */}
        {benchmarks.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6 overflow-x-auto">
            <h2 className="text-sm font-bold text-gray-900 mb-4">Fiyat Karşılaştırma Tablosu</h2>
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-2 pr-4 text-gray-400 font-semibold">Şehir</th>
                  <th className="text-right py-2 pr-4 text-gray-400 font-semibold">Ort. Satış</th>
                  <th className="text-right py-2 pr-4 text-gray-400 font-semibold">Ort. Kira/ay</th>
                  <th className="text-right py-2 pr-4 text-gray-400 font-semibold">Brüt Getiri</th>
                  <th className="text-right py-2 text-gray-400 font-semibold">Amortisman</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {benchmarks.map(b => (
                  <tr key={b.city} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 pr-4">
                      <Link href={`/listings?city=${encodeURIComponent(b.city)}&listingType=SATILIK`} className="font-bold text-gray-800 hover:text-green-700 transition-colors">
                        {b.city}
                      </Link>
                    </td>
                    <td className="py-3 pr-4 text-right font-semibold text-gray-700">
                      ₺{Math.round(b.avgSale / 1000).toLocaleString('tr-TR')}K
                    </td>
                    <td className="py-3 pr-4 text-right font-semibold text-gray-700">
                      ₺{Math.round(b.avgRent).toLocaleString('tr-TR')}
                    </td>
                    <td className="py-3 pr-4 text-right">
                      <span className={`font-black ${b.grossYield > 5 ? 'text-green-600' : b.grossYield > 3 ? 'text-amber-600' : 'text-red-500'}`}>
                        %{b.grossYield.toFixed(1)}
                      </span>
                    </td>
                    <td className="py-3 text-right text-gray-500">{b.payback.toFixed(1)} yıl</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Interactive calculator */}
        <InvestCalcClient />

        {/* Related links */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { href: '/fiyat-trendi', label: 'Fiyat Trendi', desc: 'Aylık fiyat değişimleri' },
            { href: '/valuation', label: 'Değerleme Aracı', desc: 'Mülk değer analizi' },
            { href: '/rehber/yatirim-rehberi', label: 'Yatırım Rehberi', desc: 'Adım adım yatırım rehberi' },
          ].map(t => (
            <Link
              key={t.href}
              href={t.href}
              className="group bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md hover:border-green-200 transition-all flex items-center gap-4"
            >
              <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center shrink-0">
                <TrendingUp size={17} className="text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-gray-800 group-hover:text-green-700 transition-colors">{t.label}</p>
                <p className="text-xs text-gray-400">{t.desc}</p>
              </div>
              <ArrowRight size={14} className="text-gray-300 group-hover:text-green-500 transition-colors shrink-0" />
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
