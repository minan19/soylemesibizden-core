import prisma from '@/lib/prisma';
import Link from 'next/link';
import { Metadata } from 'next';
import { MapPin, TrendingUp, Building2, Star, ArrowRight, Home, Eye } from 'lucide-react';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Mahalle Analizi | En Popüler Mahalleler | Söylemesi Bizden',
  description:
    'Türkiye\'nin en popüler mahallelerinde fiyat analizi. Ortalama fiyat, ₺/m², ilan yoğunluğu ve piyasa aktivitesi.',
};

function scoreColor(score: number) {
  if (score >= 80) return 'text-green-600 bg-green-50 border-green-200';
  if (score >= 60) return 'text-[#00C49F] bg-[#F0FDF8] border-[#00C49F]/30';
  if (score >= 40) return 'text-amber-600 bg-amber-50 border-amber-200';
  return 'text-gray-500 bg-gray-50 border-gray-200';
}

export default async function MahalleAnaliziPage() {
  // Top neighborhoods by listing count
  const neighborhoods = await prisma.listing.groupBy({
    by: ['neighborhood', 'district', 'city'],
    where: {
      status: 'ACTIVE',
      neighborhood: { not: null },
      city: { not: null },
      price: { gt: 0 },
    },
    _count: true,
    _avg: { price: true, area: true, views: true },
    _min: { price: true },
    _max: { price: true },
    orderBy: { _count: { neighborhood: 'desc' } },
    take: 40,
  });

  // Also fetch verified counts per neighborhood
  const verifiedCounts = await prisma.listing.groupBy({
    by: ['neighborhood'],
    where: {
      status: 'ACTIVE',
      neighborhood: { not: null },
      isVerified: true,
    },
    _count: true,
  });
  const verifiedMap = new Map(verifiedCounts.map(v => [v.neighborhood, v._count]));

  // Compute scores (0-100) based on:
  // - count (density score, up to 30 pts)
  // - verified ratio (up to 30 pts)
  // - views average (activity score, up to 20 pts)
  // - price premium vs median (market score, up to 20 pts)
  const maxCount = Math.max(...neighborhoods.map(n => n._count), 1);
  const maxViews = Math.max(...neighborhoods.map(n => n._avg.views ?? 0), 1);
  const medianPrice = neighborhoods.length > 0
    ? neighborhoods.map(n => n._avg.price ?? 0).sort((a, b) => a - b)[Math.floor(neighborhoods.length / 2)]
    : 1;

  const scored = neighborhoods.map(n => {
    const count = n._count;
    const avgPrice = n._avg.price ?? 0;
    const avgViews = n._avg.views ?? 0;
    const verified = verifiedMap.get(n.neighborhood ?? '') ?? 0;
    const verifiedRatio = count > 0 ? verified / count : 0;
    const avgArea = n._avg.area ?? 0;
    const pricePerM2 = avgArea > 0 ? Math.round(avgPrice / avgArea) : 0;

    const densityScore = Math.round((count / maxCount) * 30);
    const verifiedScore = Math.round(verifiedRatio * 30);
    const activityScore = Math.round((avgViews / maxViews) * 20);
    // Price premium: +20 pts if significantly above median, 10 pts if near median, 0 if below
    const priceRatio = medianPrice > 0 ? avgPrice / medianPrice : 1;
    const priceScore = priceRatio > 1.5 ? 20 : priceRatio > 1.1 ? 15 : priceRatio > 0.9 ? 10 : 5;

    const totalScore = densityScore + verifiedScore + activityScore + priceScore;

    return { ...n, avgPrice, avgViews, avgArea, pricePerM2, verifiedRatio, totalScore, verified };
  }).sort((a, b) => b.totalScore - a.totalScore);

  const topNeighborhoods = scored.slice(0, 20);

  // Group by city for city-level summary
  const cityMap = new Map<string, { count: number; avgPrice: number; neighborhoods: number }>();
  for (const n of scored) {
    const city = n.city ?? 'Diğer';
    const existing = cityMap.get(city) ?? { count: 0, avgPrice: 0, neighborhoods: 0 };
    cityMap.set(city, {
      count: existing.count + n._count,
      avgPrice: existing.avgPrice + n.avgPrice * n._count,
      neighborhoods: existing.neighborhoods + 1,
    });
  }
  const cityStats = Array.from(cityMap.entries())
    .map(([city, d]) => ({ city, count: d.count, avgPrice: d.count > 0 ? Math.round(d.avgPrice / d.count) : 0, neighborhoods: d.neighborhoods }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);

  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-800 to-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-6 py-14">
          <div className="flex items-center gap-2 bg-white/10 border border-white/20 text-white/80 text-xs font-bold px-4 py-1.5 rounded-full w-fit mb-5">
            <MapPin size={12} /> Mahalle Bazlı Analiz
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">
            Mahalle Analizi
          </h1>
          <p className="text-slate-400 text-sm max-w-xl leading-relaxed mb-6">
            Türkiye&apos;nin en aktif mahallelerinde fiyat yoğunluğu, doğrulama oranı ve piyasa
            aktivitesi skorlaması. Doğru mahalleye doğru fiyatla ulaşın.
          </p>
          <div className="flex flex-wrap gap-4 text-sm">
            {[
              { label: 'Analiz Edilen Mahalle', value: scored.length },
              { label: 'Toplam İlan', value: scored.reduce((s, n) => s + n._count, 0).toLocaleString('tr-TR') },
              { label: 'Şehir', value: cityStats.length },
            ].map(s => (
              <div key={s.label} className="bg-white/5 border border-white/10 rounded-xl px-5 py-3">
                <p className="text-lg font-black text-white">{s.value}</p>
                <p className="text-xs text-slate-400">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">

        {/* City summary */}
        {cityStats.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {cityStats.map(c => (
              <Link
                key={c.city}
                href={`/sehir/${encodeURIComponent(c.city)}`}
                className="group bg-white rounded-2xl border border-gray-100 p-4 hover:shadow-md hover:border-[#00C49F]/30 transition-all text-center"
              >
                <MapPin size={14} className="text-[#00C49F] mx-auto mb-1" />
                <p className="text-sm font-bold text-gray-800 group-hover:text-[#00C49F] transition-colors">{c.city}</p>
                <p className="text-xs text-gray-400 mt-0.5">{c.neighborhoods} mahalle</p>
                <p className="text-xs font-bold text-gray-600 mt-1">
                  ₺{Math.round(c.avgPrice / 1000).toLocaleString('tr-TR')}K ort.
                </p>
              </Link>
            ))}
          </div>
        )}

        {/* Top neighborhoods table */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-50">
            <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2">
              <Star size={15} className="text-amber-500" /> En Aktif Mahalleler — Aktivite Skoru
            </h2>
            <p className="text-xs text-gray-400 mt-1">İlan yoğunluğu, doğrulama oranı ve piyasa aktivitesine göre hesaplanmıştır.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-6 py-3 text-gray-400 font-semibold">#</th>
                  <th className="text-left px-4 py-3 text-gray-400 font-semibold">Mahalle</th>
                  <th className="text-left px-4 py-3 text-gray-400 font-semibold">İlçe / Şehir</th>
                  <th className="text-right px-4 py-3 text-gray-400 font-semibold">İlan</th>
                  <th className="text-right px-4 py-3 text-gray-400 font-semibold">Ort. Fiyat</th>
                  <th className="text-right px-4 py-3 text-gray-400 font-semibold">₺/m²</th>
                  <th className="text-right px-4 py-3 text-gray-400 font-semibold">Görüntüleme</th>
                  <th className="text-right px-6 py-3 text-gray-400 font-semibold">Skor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {topNeighborhoods.map((n, idx) => (
                  <tr key={`${n.neighborhood}-${n.city}`} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-3.5">
                      {idx === 0 ? <span className="text-amber-500 font-black">🥇</span>
                        : idx === 1 ? <span className="text-gray-400 font-black">🥈</span>
                        : idx === 2 ? <span className="text-orange-400 font-black">🥉</span>
                        : <span className="text-gray-400">{idx + 1}</span>}
                    </td>
                    <td className="px-4 py-3.5">
                      <Link
                        href={`/listings?neighborhood=${encodeURIComponent(n.neighborhood ?? '')}&city=${encodeURIComponent(n.city ?? '')}`}
                        className="font-bold text-gray-800 hover:text-[#00C49F] transition-colors"
                      >
                        {n.neighborhood}
                      </Link>
                    </td>
                    <td className="px-4 py-3.5 text-gray-500">
                      {[n.district, n.city].filter(Boolean).join(' / ')}
                    </td>
                    <td className="px-4 py-3.5 text-right font-semibold text-gray-700">{n._count}</td>
                    <td className="px-4 py-3.5 text-right font-bold text-gray-900">
                      ₺{Math.round(n.avgPrice / 1000).toLocaleString('tr-TR')}K
                    </td>
                    <td className="px-4 py-3.5 text-right font-semibold text-[#00C49F]">
                      {n.pricePerM2 > 0 ? `₺${n.pricePerM2.toLocaleString('tr-TR')}` : '—'}
                    </td>
                    <td className="px-4 py-3.5 text-right text-gray-500 flex items-center justify-end gap-1">
                      <Eye size={10} /> {Math.round(n.avgViews)}
                    </td>
                    <td className="px-6 py-3.5 text-right">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-black border ${scoreColor(n.totalScore)}`}>
                        {n.totalScore}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Score methodology */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h3 className="text-sm font-bold text-gray-900 mb-4">Skor Metodolojisi</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'İlan Yoğunluğu', desc: 'Mahalledeki aktif ilan sayısı', max: '30 puan' },
              { label: 'Doğrulama Oranı', desc: 'Onaylı ilan oranı', max: '30 puan' },
              { label: 'Piyasa Aktivitesi', desc: 'Ortalama görüntülenme sayısı', max: '20 puan' },
              { label: 'Fiyat Segmenti', desc: 'Medyan fiyata göre konumlanma', max: '20 puan' },
            ].map(s => (
              <div key={s.label} className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs font-bold text-gray-800">{s.label}</p>
                <p className="text-[10px] text-gray-400 mt-1">{s.desc}</p>
                <p className="text-[10px] font-black text-[#00C49F] mt-2">Maks: {s.max}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { href: '/listings', label: 'İlanlara Göz At', icon: Home },
            { href: '/piyasa', label: 'Piyasa Verileri', icon: TrendingUp },
            { href: '/sehir', label: 'Şehir Sayfaları', icon: Building2 },
          ].map(t => (
            <Link
              key={t.href}
              href={t.href}
              className="group bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md hover:border-[#00C49F]/30 transition-all flex items-center gap-4"
            >
              <div className="w-10 h-10 bg-[#F0FDF8] rounded-xl flex items-center justify-center shrink-0">
                <t.icon size={18} className="text-[#00C49F]" />
              </div>
              <p className="text-sm font-bold text-gray-800 group-hover:text-[#00C49F] transition-colors flex-1">{t.label}</p>
              <ArrowRight size={14} className="text-gray-300 group-hover:text-[#00C49F] transition-colors shrink-0" />
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
