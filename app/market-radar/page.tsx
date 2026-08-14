import prisma from '@/lib/prisma';
import Link from 'next/link';
import { ArrowLeft, Activity, Eye, BarChart2, TrendingUp, MapPin, ArrowRight } from 'lucide-react';

export const dynamic = 'force-dynamic';

function formatPrice(price: number) {
  return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(price);
}

export default async function MarketRadarPage() {
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  const [activeCount, totalCount, allListings, recentListings, topViewedListings, recentMonthlyListings] = await Promise.all([
    prisma.listing.count({ where: { status: 'ACTIVE' } }),
    prisma.listing.count(),
    prisma.listing.findMany({
      where: { status: 'ACTIVE' },
      select: { city: true, propertyType: true, listingType: true, price: true, area: true },
    }),
    prisma.listing.findMany({
      orderBy: { createdAt: 'desc' },
      take: 6,
      select: { id: true, title: true, price: true, city: true, propertyType: true, listingType: true, createdAt: true },
    }),
    prisma.listing.findMany({
      orderBy: { views: 'desc' },
      take: 5,
      select: { id: true, title: true, price: true, views: true, city: true },
    }),
    prisma.listing.findMany({
      where: { createdAt: { gte: sixMonthsAgo } },
      select: { createdAt: true, listingType: true },
      orderBy: { createdAt: 'asc' },
    }),
  ]);

  const activeRate = totalCount > 0 ? Math.round((activeCount / totalCount) * 100) : 0;

  // City distribution + avg prices by listing type
  type CityStats = { count: number; satilikPrices: number[]; kiralikPrices: number[] };
  const cityMap = new Map<string, CityStats>();
  for (const l of allListings) {
    if (!l.city) continue;
    const entry = cityMap.get(l.city) ?? { count: 0, satilikPrices: [], kiralikPrices: [] };
    entry.count++;
    if (l.listingType === 'SATILIK') entry.satilikPrices.push(l.price);
    else if (l.listingType === 'KİRALIK') entry.kiralikPrices.push(l.price);
    cityMap.set(l.city, entry);
  }
  const avg = (arr: number[]) => arr.length > 0 ? Math.round(arr.reduce((a, b) => a + b, 0) / arr.length) : null;
  const listingsByCity = Array.from(cityMap.entries())
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 8)
    .map(([city, s]) => ({
      city, count: s.count,
      satilikAvg: avg(s.satilikPrices),
      kiralikAvg: avg(s.kiralikPrices),
      satilikCount: s.satilikPrices.length,
      kiralikCount: s.kiralikPrices.length,
    }));
  const maxCityCount = listingsByCity[0]?.count ?? 1;

  // Average price by property type
  const typeMap = new Map<string, number[]>();
  const typeAreaMap = new Map<string, number[]>();
  for (const l of allListings) {
    const arr = typeMap.get(l.propertyType) ?? [];
    arr.push(l.price);
    typeMap.set(l.propertyType, arr);
    if (l.area && l.area > 0) {
      const areaArr = typeAreaMap.get(l.propertyType) ?? [];
      areaArr.push(l.price / l.area);
      typeAreaMap.set(l.propertyType, areaArr);
    }
  }
  const avgPriceByType = Array.from(typeMap.entries())
    .map(([type, prices]) => ({
      propertyType: type,
      avgPrice: Math.round(prices.reduce((s, p) => s + p, 0) / prices.length),
      avgPricePerM2: typeAreaMap.has(type) ? Math.round(typeAreaMap.get(type)!.reduce((a, b) => a + b, 0) / typeAreaMap.get(type)!.length) : null,
      count: prices.length,
    }))
    .sort((a, b) => b.avgPrice - a.avgPrice);

  // Monthly trend — last 6 months
  const MONTH_NAMES = ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'];
  const monthlyMap = new Map<string, { satilik: number; kiralik: number }>();
  for (const l of recentMonthlyListings) {
    const d = new Date(l.createdAt);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    const entry = monthlyMap.get(key) ?? { satilik: 0, kiralik: 0 };
    if (l.listingType === 'SATILIK') entry.satilik++;
    else if (l.listingType === 'KİRALIK') entry.kiralik++;
    monthlyMap.set(key, entry);
  }
  const monthlyTrend = Array.from(monthlyMap.entries())
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([key, v]) => {
      const [year, month] = key.split('-');
      return { label: `${MONTH_NAMES[parseInt(month) - 1]} ${year.slice(2)}`, ...v, total: v.satilik + v.kiralik };
    });
  const maxMonthly = Math.max(...monthlyTrend.map(m => m.total), 1);

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-5xl mx-auto px-8 py-10 space-y-8">

        <div>
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-700 transition-colors mb-3">
            <ArrowLeft size={14} /> Dashboard
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F0FDF8] flex items-center justify-center text-[#00C49F]">
              <Activity size={18} />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Piyasa Radar</h1>
              <p className="text-xs text-gray-400 mt-0.5">Gerçek zamanlı piyasa istatistikleri ve ilan analizi</p>
            </div>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'TOPLAM İLAN', value: totalCount, icon: <BarChart2 size={16} />, color: 'text-gray-900' },
            { label: 'AKTİF İLAN', value: activeCount, icon: <TrendingUp size={16} />, color: 'text-[#00C49F]' },
            { label: 'AKTİF ORAN', value: `%${activeRate}`, icon: <Activity size={16} />, color: 'text-gray-900' },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-5">
              <div className={`${s.color} mb-2`}>{s.icon}</div>
              <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-[9px] font-bold tracking-widest text-gray-400 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Two-column section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* City distribution */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="text-[10px] font-bold tracking-widest text-[#00C49F] uppercase mb-5 flex items-center gap-2">
              <MapPin size={12} /> Şehir Bazlı İlan Dağılımı
            </h2>
            {listingsByCity.length === 0 ? (
              <p className="text-gray-400 text-sm">Şehir verisi bulunamadı.</p>
            ) : (
              <div className="space-y-4">
                {listingsByCity.map(({ city, count }) => (
                  <Link key={city} href={`/sehir/${encodeURIComponent(city)}`} className="flex items-center gap-3 group">
                    <span className="text-xs font-semibold text-gray-600 w-24 shrink-0 truncate group-hover:text-[#00C49F] transition-colors">{city}</span>
                    <div className="flex-1 bg-gray-100 rounded-full h-2">
                      <div
                        className="bg-[#00C49F] h-2 rounded-full transition-all"
                        style={{ width: `${Math.round((count / maxCityCount) * 100)}%` }}
                      />
                    </div>
                    <span className="text-xs font-bold text-gray-700 w-6 text-right">{count}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Property type & avg price */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="text-[10px] font-bold tracking-widest text-[#00C49F] uppercase mb-5">
              Mülk Tipi & Ortalama Fiyat
            </h2>
            {avgPriceByType.length === 0 ? (
              <p className="text-gray-400 text-sm">Veri bulunamadı.</p>
            ) : (
              <div className="divide-y divide-gray-50">
                {avgPriceByType.map(({ propertyType, avgPrice, avgPricePerM2, count }) => (
                  <div key={propertyType} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{propertyType}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{count} ilan{avgPricePerM2 ? ` · ${avgPricePerM2.toLocaleString('tr-TR')} ₺/m²` : ''}</p>
                    </div>
                    <p className="text-sm font-bold text-[#00C49F]">{formatPrice(avgPrice)}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* City avg price table */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-50 flex items-center gap-2">
            <TrendingUp size={14} className="text-[#00C49F]" />
            <h2 className="text-[10px] font-bold tracking-widest text-[#00C49F] uppercase">
              Şehir Bazlı Ortalama Fiyat Karşılaştırması
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-[9px] font-bold text-gray-400 uppercase tracking-widest">Şehir</th>
                  <th className="px-6 py-3 text-right text-[9px] font-bold text-gray-400 uppercase tracking-widest">Satılık Ort.</th>
                  <th className="px-6 py-3 text-right text-[9px] font-bold text-gray-400 uppercase tracking-widest">Kiralık Ort.</th>
                  <th className="px-6 py-3 text-right text-[9px] font-bold text-gray-400 uppercase tracking-widest">Toplam</th>
                  <th className="px-6 py-3 text-right text-[9px] font-bold text-gray-400 uppercase tracking-widest"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {listingsByCity.map(r => (
                  <tr key={r.city} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-3.5 text-sm font-semibold text-gray-800">{r.city}</td>
                    <td className="px-6 py-3.5 text-sm text-right">
                      {r.satilikAvg ? (
                        <span className="font-bold text-blue-600">{formatPrice(r.satilikAvg)}</span>
                      ) : <span className="text-gray-300">—</span>}
                      {r.satilikCount > 0 && <span className="text-[10px] text-gray-400 ml-1">({r.satilikCount})</span>}
                    </td>
                    <td className="px-6 py-3.5 text-sm text-right">
                      {r.kiralikAvg ? (
                        <span className="font-bold text-violet-600">{formatPrice(r.kiralikAvg)}</span>
                      ) : <span className="text-gray-300">—</span>}
                      {r.kiralikCount > 0 && <span className="text-[10px] text-gray-400 ml-1">({r.kiralikCount})</span>}
                    </td>
                    <td className="px-6 py-3.5 text-sm text-right font-semibold text-gray-700">{r.count}</td>
                    <td className="px-6 py-3.5 text-right">
                      <Link href={`/sehir/${encodeURIComponent(r.city)}`} className="text-[#00C49F] hover:text-[#00a882] transition-colors">
                        <ArrowRight size={13} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Monthly trend */}
        {monthlyTrend.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="text-[10px] font-bold tracking-widest text-[#00C49F] uppercase mb-5 flex items-center gap-2">
              <Activity size={12} /> Son 6 Ay — Aylık İlan Trendi
            </h2>
            <div className="flex items-end gap-2 h-32">
              {monthlyTrend.map(m => (
                <div key={m.label} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-[9px] text-gray-500 font-bold">{m.total}</span>
                  <div className="w-full flex flex-col gap-0.5" style={{ height: `${Math.round((m.total / maxMonthly) * 96)}px` }}>
                    <div className="flex-none bg-blue-400 rounded-t" style={{ height: `${m.total > 0 ? Math.round((m.satilik / m.total) * 100) : 50}%` }} />
                    <div className="flex-1 bg-violet-400 rounded-b" />
                  </div>
                  <span className="text-[9px] text-gray-400 font-medium">{m.label}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-50">
              <span className="flex items-center gap-1.5 text-[10px] text-gray-500"><span className="w-3 h-3 rounded-sm bg-blue-400 inline-block" /> Satılık</span>
              <span className="flex items-center gap-1.5 text-[10px] text-gray-500"><span className="w-3 h-3 rounded-sm bg-violet-400 inline-block" /> Kiralık</span>
            </div>
          </div>
        )}

        {/* Recent listings */}
        <div>
          <h2 className="text-[10px] font-bold tracking-widest text-[#00C49F] uppercase mb-4">Son Eklenen İlanlar</h2>
          {recentListings.length === 0 ? (
            <p className="text-gray-400 text-sm">İlan bulunamadı.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {recentListings.map(listing => (
                <Link key={listing.id} href={`/listing/${listing.id}`}
                  className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md hover:border-[#00C49F]/20 transition-all">
                  <p className="text-sm font-bold text-gray-900 mb-1 line-clamp-2 leading-snug">{listing.title}</p>
                  <p className="text-xs text-gray-400 mb-4">
                    {listing.city ?? '—'} · {listing.propertyType} · {listing.listingType}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold text-[#00C49F]">{formatPrice(listing.price)}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(listing.createdAt).toLocaleDateString('tr-TR')}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Top viewed listings */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-50 flex items-center gap-2">
            <Eye size={14} className="text-[#00C49F]" />
            <h2 className="text-[10px] font-bold tracking-widest text-[#00C49F] uppercase">
              En Çok Görüntülenen İlanlar
            </h2>
          </div>
          {topViewedListings.length === 0 ? (
            <p className="p-6 text-gray-400 text-sm">Veri bulunamadı.</p>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-[9px] font-bold text-gray-400 uppercase tracking-widest w-10">#</th>
                  <th className="px-6 py-3 text-left text-[9px] font-bold text-gray-400 uppercase tracking-widest">İlan</th>
                  <th className="px-6 py-3 text-left text-[9px] font-bold text-gray-400 uppercase tracking-widest">Şehir</th>
                  <th className="px-6 py-3 text-right text-[9px] font-bold text-gray-400 uppercase tracking-widest">Fiyat</th>
                  <th className="px-6 py-3 text-right text-[9px] font-bold text-gray-400 uppercase tracking-widest">Görüntülenme</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {topViewedListings.map((listing, idx) => (
                  <tr key={listing.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-400 font-medium">{idx + 1}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-800 max-w-xs">
                      <Link href={`/listing/${listing.id}`} className="line-clamp-1 hover:text-[#00C49F] transition-colors">
                        {listing.title}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{listing.city ?? '—'}</td>
                    <td className="px-6 py-4 text-sm font-bold text-[#00C49F] text-right">{formatPrice(listing.price)}</td>
                    <td className="px-6 py-4 text-sm text-gray-700 text-right font-semibold">
                      {listing.views.toLocaleString('tr-TR')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </main>
  );
}
