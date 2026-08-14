import prisma from '@/lib/prisma';
import Link from 'next/link';
import { Metadata } from 'next';
import {
  TrendingUp, MapPin, Building2, Home, BarChart2,
  ArrowRight, Eye, Users, Activity, Key, ShieldCheck,
} from 'lucide-react';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Türkiye Gayrimenkul Piyasası 2026 | Söylemesi Bizden',
  description: 'Türkiye\'de şehir bazlı konut fiyatları, kira getirileri, piyasa trendleri ve yatırım fırsatları. 2026 gayrimenkul piyasası verileri.',
};

function avg(arr: number[]) {
  return arr.length > 0 ? Math.round(arr.reduce((a, b) => a + b, 0) / arr.length) : 0;
}

export default async function PiyasaPage() {
  const [
    allListings,
    totalActive,
    totalSatilik,
    totalKiralik,
    propertyTypes,
    recentCount,
    totalUsers,
    totalOffers,
  ] = await Promise.all([
    prisma.listing.findMany({
      where: { status: 'ACTIVE' },
      select: { city: true, district: true, listingType: true, propertyType: true, price: true, area: true, rooms: true, views: true, createdAt: true },
    }),
    prisma.listing.count({ where: { status: 'ACTIVE' } }),
    prisma.listing.count({ where: { status: 'ACTIVE', listingType: 'SATILIK' } }),
    prisma.listing.count({ where: { status: 'ACTIVE', listingType: 'KİRALIK' } }),
    prisma.listing.groupBy({ by: ['propertyType'], where: { status: 'ACTIVE' }, _count: true, _avg: { price: true }, orderBy: { _count: { propertyType: 'desc' } } }),
    prisma.listing.count({ where: { status: 'ACTIVE', createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } } }),
    prisma.user.count(),
    prisma.offer.count(),
  ]);

  // City stats
  type CS = { satilik: number[]; kiralik: number[]; count: number; views: number };
  const cityMap = new Map<string, CS>();
  for (const l of allListings) {
    if (!l.city) continue;
    const e = cityMap.get(l.city) ?? { satilik: [], kiralik: [], count: 0, views: 0 };
    e.count++;
    e.views += l.views;
    if (l.listingType === 'SATILIK' && l.price > 0) e.satilik.push(l.price);
    if (l.listingType === 'KİRALIK' && l.price > 0) e.kiralik.push(l.price);
    cityMap.set(l.city, e);
  }
  const cityStats = Array.from(cityMap.entries())
    .map(([city, s]) => ({
      city,
      count: s.count,
      views: s.views,
      satilikAvg: avg(s.satilik),
      kiralikAvg: avg(s.kiralik),
      satilikCount: s.satilik.length,
      kiralikCount: s.kiralik.length,
      yieldPct: s.satilik.length > 0 && s.kiralik.length > 0
        ? +((avg(s.kiralik) * 12 / avg(s.satilik)) * 100).toFixed(1)
        : null,
    }))
    .filter(c => c.count >= 2)
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  // Area-based price/m² by city
  const pricePerM2ByCity = new Map<string, number[]>();
  for (const l of allListings) {
    if (!l.city || !l.area || l.area <= 0 || l.listingType !== 'SATILIK') continue;
    const arr = pricePerM2ByCity.get(l.city) ?? [];
    arr.push(Math.round(l.price / l.area));
    pricePerM2ByCity.set(l.city, arr);
  }

  // Monthly trend (last 6 months)
  const months: Record<string, { satilik: number; kiralik: number }> = {};
  const now = new Date();
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    months[key] = { satilik: 0, kiralik: 0 };
  }
  for (const l of allListings) {
    const d = new Date(l.createdAt);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    if (months[key]) {
      if (l.listingType === 'SATILIK') months[key].satilik++;
      else if (l.listingType === 'KİRALIK') months[key].kiralik++;
    }
  }
  const monthlyTrend = Object.entries(months).map(([k, v]) => ({
    label: new Date(k + '-01').toLocaleDateString('tr-TR', { month: 'short', year: '2-digit' }),
    ...v,
    total: v.satilik + v.kiralik,
  }));
  const maxMonthly = Math.max(...monthlyTrend.map(m => m.total), 1);

  // Overall price stats
  const allSatilikPrices = allListings.filter(l => l.listingType === 'SATILIK' && l.price > 0).map(l => l.price);
  const allKiralikPrices = allListings.filter(l => l.listingType === 'KİRALIK' && l.price > 0).map(l => l.price);
  const satilikMedian = allSatilikPrices.length > 0
    ? allSatilikPrices.sort((a, b) => a - b)[Math.floor(allSatilikPrices.length / 2)]
    : 0;
  const kiralikMedian = allKiralikPrices.length > 0
    ? allKiralikPrices.sort((a, b) => a - b)[Math.floor(allKiralikPrices.length / 2)]
    : 0;

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">

        {/* Header */}
        <div className="flex items-start justify-between flex-wrap gap-3">
          <div>
            <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-700 transition-colors mb-3">
              ← Ana Sayfa
            </Link>
            <h1 className="text-3xl font-black tracking-tight text-gray-900">Türkiye Gayrimenkul Piyasası</h1>
            <p className="text-sm text-gray-500 mt-1">Platformumuzdan derlenen canlı istatistikler · 2026</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Link href="/market-radar" className="px-4 py-2 text-xs font-bold border border-gray-200 rounded-xl text-gray-600 hover:border-[#00C49F] hover:text-[#00C49F] transition-colors">
              Detaylı Radar
            </Link>
            <Link href="/istatistikler" className="px-4 py-2 text-xs font-bold border border-gray-200 rounded-xl text-gray-600 hover:border-[#00C49F] hover:text-[#00C49F] transition-colors">
              Platform İstatistikleri
            </Link>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { icon: Building2, label: 'Aktif İlan', value: totalActive.toLocaleString('tr-TR'), color: 'text-[#00C49F]', bg: 'bg-[#F0FDF8]' },
            { icon: Home, label: 'Satılık', value: totalSatilik.toLocaleString('tr-TR'), color: 'text-blue-600', bg: 'bg-blue-50' },
            { icon: Key, label: 'Kiralık', value: totalKiralik.toLocaleString('tr-TR'), color: 'text-violet-600', bg: 'bg-violet-50' },
            { icon: Activity, label: 'Bu Hafta Eklenen', value: `+${recentCount}`, color: 'text-amber-600', bg: 'bg-amber-50' },
          ].map(k => (
            <div key={k.label} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <div className={`w-10 h-10 ${k.bg} rounded-xl flex items-center justify-center mb-3`}>
                <k.icon size={18} className={k.color} />
              </div>
              <p className="text-xl font-black text-gray-900">{k.value}</p>
              <p className="text-xs text-gray-400 font-medium mt-0.5">{k.label}</p>
            </div>
          ))}
        </div>

        {/* Price overview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: 'Satılık Medyan Fiyat', value: satilikMedian, note: 'Tüm satılık ilanlar', color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Kiralık Medyan Fiyat', value: kiralikMedian, note: 'Tüm kiralık ilanlar (aylık)', color: 'text-violet-600', bg: 'bg-violet-50' },
            {
              label: 'Ortalama Kira Getirisi',
              value: null,
              custom: satilikMedian > 0 && kiralikMedian > 0
                ? `%${((kiralikMedian * 12 / satilikMedian) * 100).toFixed(1)}`
                : '—',
              note: 'Yıllık brüt kira/satış değeri',
              color: 'text-[#00C49F]',
              bg: 'bg-[#F0FDF8]',
            },
          ].map(item => (
            <div key={item.label} className={`rounded-2xl border border-gray-100 p-6 shadow-sm bg-white`}>
              <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-2">{item.label}</p>
              <p className={`text-2xl font-black font-mono ${item.color}`}>
                {item.custom ?? (item.value ? `₺${item.value.toLocaleString('tr-TR')}` : '—')}
              </p>
              <p className="text-xs text-gray-400 mt-1">{item.note}</p>
            </div>
          ))}
        </div>

        {/* City Comparison Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-50 flex items-center gap-2">
            <MapPin size={16} className="text-[#00C49F]" />
            <h2 className="text-sm font-bold text-gray-900">Şehir Bazlı Piyasa Verileri</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50">
                  <th className="text-left px-6 py-3">Şehir</th>
                  <th className="text-right px-4 py-3">İlan</th>
                  <th className="text-right px-4 py-3">Satılık Ort.</th>
                  <th className="text-right px-4 py-3">Kiralık Ort.</th>
                  <th className="text-right px-4 py-3">₺/m²</th>
                  <th className="text-right px-4 py-3">Getiri</th>
                  <th className="text-right px-6 py-3">Görüntülenme</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {cityStats.map((c, i) => {
                  const m2arr = pricePerM2ByCity.get(c.city);
                  const m2avg = m2arr ? avg(m2arr) : null;
                  return (
                    <tr key={c.city} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-3.5">
                        <Link href={`/sehir/${encodeURIComponent(c.city)}`} className="flex items-center gap-2 font-semibold text-gray-800 hover:text-[#00C49F] transition-colors">
                          <span className="text-gray-300 text-xs w-4">{i + 1}</span>
                          {c.city}
                        </Link>
                      </td>
                      <td className="px-4 py-3.5 text-right font-mono text-gray-700">{c.count}</td>
                      <td className="px-4 py-3.5 text-right font-mono text-gray-700">
                        {c.satilikAvg ? `₺${Math.round(c.satilikAvg / 1000)}K` : '—'}
                      </td>
                      <td className="px-4 py-3.5 text-right font-mono text-gray-700">
                        {c.kiralikAvg ? `₺${c.kiralikAvg.toLocaleString('tr-TR')}` : '—'}
                      </td>
                      <td className="px-4 py-3.5 text-right font-mono text-gray-700">
                        {m2avg ? `₺${m2avg.toLocaleString('tr-TR')}` : '—'}
                      </td>
                      <td className="px-4 py-3.5 text-right">
                        {c.yieldPct ? (
                          <span className={`text-xs font-bold px-2 py-1 rounded-full ${c.yieldPct >= 4 ? 'bg-[#F0FDF8] text-[#00C49F]' : c.yieldPct >= 3 ? 'bg-amber-50 text-amber-600' : 'bg-gray-100 text-gray-500'}`}>
                            %{c.yieldPct}
                          </span>
                        ) : '—'}
                      </td>
                      <td className="px-6 py-3.5 text-right font-mono text-gray-500 text-xs">
                        {c.views.toLocaleString('tr-TR')} <Eye size={10} className="inline text-gray-300 ml-0.5" />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Monthly trend chart */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-5">
            <BarChart2 size={16} className="text-[#00C49F]" />
            <h2 className="text-sm font-bold text-gray-900">Son 6 Ay İlan Trendi</h2>
          </div>
          <div className="flex items-end gap-3 h-32">
            {monthlyTrend.map(m => (
              <div key={m.label} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full flex flex-col justify-end gap-0.5" style={{ height: '100px' }}>
                  <div
                    className="w-full bg-blue-400 rounded-t-sm"
                    style={{ height: `${maxMonthly > 0 ? (m.satilik / maxMonthly) * 80 : 0}px`, minHeight: m.satilik > 0 ? '2px' : '0' }}
                    title={`Satılık: ${m.satilik}`}
                  />
                  <div
                    className="w-full bg-violet-400 rounded-t-sm"
                    style={{ height: `${maxMonthly > 0 ? (m.kiralik / maxMonthly) * 80 : 0}px`, minHeight: m.kiralik > 0 ? '2px' : '0' }}
                    title={`Kiralık: ${m.kiralik}`}
                  />
                </div>
                <p className="text-[9px] text-gray-400 font-medium">{m.label}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4 mt-3">
            <span className="flex items-center gap-1.5 text-[10px] text-gray-400"><span className="w-2.5 h-2.5 rounded-sm bg-blue-400 inline-block" /> Satılık</span>
            <span className="flex items-center gap-1.5 text-[10px] text-gray-400"><span className="w-2.5 h-2.5 rounded-sm bg-violet-400 inline-block" /> Kiralık</span>
          </div>
        </div>

        {/* Property type breakdown */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-5">
            <Building2 size={16} className="text-[#00C49F]" />
            <h2 className="text-sm font-bold text-gray-900">Mülk Türü Dağılımı</h2>
          </div>
          <div className="space-y-3">
            {propertyTypes.slice(0, 6).map(pt => {
              const pct = totalActive > 0 ? Math.round((pt._count / totalActive) * 100) : 0;
              return (
                <div key={pt.propertyType} className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-gray-700 w-16 shrink-0">{pt.propertyType}</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-2">
                    <div className="h-2 rounded-full bg-[#00C49F]" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="text-xs text-gray-500 w-12 text-right shrink-0">{pt._count} ({pct}%)</span>
                  {pt._avg.price && (
                    <span className="text-xs font-mono text-gray-400 w-24 text-right shrink-0">
                      Ort. ₺{Math.round(pt._avg.price / 1000)}K
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Platform stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: Users, label: 'Kayıtlı Kullanıcı', value: totalUsers, color: 'text-blue-600', bg: 'bg-blue-50' },
            { icon: Activity, label: 'Toplam Teklif', value: totalOffers, color: 'text-amber-600', bg: 'bg-amber-50' },
            { icon: ShieldCheck, label: 'Toplam İlan', value: totalActive + (totalSatilik + totalKiralik - totalActive), color: 'text-[#00C49F]', bg: 'bg-[#F0FDF8]' },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm flex items-center gap-4">
              <div className={`w-10 h-10 ${s.bg} rounded-xl flex items-center justify-center`}>
                <s.icon size={18} className={s.color} />
              </div>
              <div>
                <p className="text-xl font-black text-gray-900">{s.value.toLocaleString('tr-TR')}</p>
                <p className="text-xs text-gray-400">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-black text-white mb-1">Piyasayı Yakından Takip Edin</h3>
            <p className="text-slate-400 text-sm">İlanları kaydedin, fiyat değişimlerini izleyin, yatırım kararlarınızı veriye dayandırın.</p>
          </div>
          <div className="flex gap-3 flex-wrap shrink-0">
            <Link href="/listings" className="px-5 py-2.5 bg-[#00C49F] hover:bg-[#00a882] text-white text-sm font-bold rounded-xl transition-colors flex items-center gap-2">
              İlanları Keşfet <ArrowRight size={14} />
            </Link>
            <Link href="/hesaplama" className="px-5 py-2.5 border border-slate-600 text-slate-300 hover:border-slate-400 text-sm font-bold rounded-xl transition-colors">
              Hesaplama Araçları
            </Link>
          </div>
        </div>

        <p className="text-xs text-gray-400 text-center">
          Veriler Söylemesi Bizden platformundaki aktif ilanlardan derlenmektedir. Son güncelleme: {new Date().toLocaleDateString('tr-TR')}.
        </p>
      </div>
    </main>
  );
}
