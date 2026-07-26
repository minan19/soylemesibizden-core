import prisma from '@/lib/prisma';
import Link from 'next/link';
import { ArrowLeft, Globe, TrendingUp, MapPin, BarChart2 } from 'lucide-react';

export const dynamic = 'force-dynamic';

function formatPrice(price: number) {
  return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(price);
}

export default async function RadarPage() {
  const [allActiveListings, totalCount] = await Promise.all([
    prisma.listing.findMany({
      where: { status: 'ACTIVE', city: { not: null } },
      select: { city: true, price: true, area: true, propertyType: true, listingType: true },
    }),
    prisma.listing.count({ where: { status: 'ACTIVE' } }),
  ]);

  // City-based aggregation
  type CityData = { prices: number[]; areas: number[] };
  const cityMap = new Map<string, CityData>();
  for (const l of allActiveListings) {
    if (!l.city) continue;
    const existing = cityMap.get(l.city) ?? { prices: [], areas: [] };
    existing.prices.push(l.price);
    if (l.area) existing.areas.push(l.area);
    cityMap.set(l.city, existing);
  }

  const cityStats = Array.from(cityMap.entries())
    .map(([city, data]) => {
      const avgPrice = Math.round(data.prices.reduce((s, p) => s + p, 0) / data.prices.length);
      const avgPricePerM2 = data.areas.length > 0
        ? Math.round(data.prices.slice(0, data.areas.length).reduce((s, p) => s + p, 0) / data.areas.reduce((s, a) => s + a, 0))
        : null;
      return { city, count: data.prices.length, avgPrice, avgPricePerM2 };
    })
    .sort((a, b) => b.avgPrice - a.avgPrice)
    .slice(0, 12);

  const maxAvgPrice = cityStats[0]?.avgPrice ?? 1;

  // Listing type distribution
  const typeMap = new Map<string, number>();
  for (const l of allActiveListings) {
    typeMap.set(l.listingType, (typeMap.get(l.listingType) ?? 0) + 1);
  }
  const listingTypeStats = Array.from(typeMap.entries())
    .map(([type, count]) => ({ type, count, pct: Math.round((count / (allActiveListings.length || 1)) * 100) }))
    .sort((a, b) => b.count - a.count);

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-5xl mx-auto px-8 py-10 space-y-8">

        <div>
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-700 transition-colors mb-3">
            <ArrowLeft size={14} /> Dashboard
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F0FDF8] flex items-center justify-center text-[#00C49F]">
              <Globe size={18} />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Piyasa Heatmap</h1>
              <p className="text-xs text-gray-400 mt-0.5">Şehir bazlı fiyat dağılımı ve piyasa dinamikleri</p>
            </div>
          </div>
        </div>

        {/* Summary stat */}
        <div className="bg-[#F0FDF8] rounded-2xl border border-[#00C49F]/20 p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#00C49F] flex items-center justify-center text-white shrink-0">
            <BarChart2 size={20} />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900">
              {cityStats.length} şehir · {totalCount} aktif ilan taranıyor
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              En yüksek ortalama: {cityStats[0] ? `${cityStats[0].city} — ${formatPrice(cityStats[0].avgPrice)}` : '—'}
            </p>
          </div>
        </div>

        {/* Heatmap bars */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-[10px] font-bold tracking-widest text-[#00C49F] uppercase mb-6 flex items-center gap-2">
            <MapPin size={12} /> Şehir Bazlı Ortalama Fiyat Radar
          </h2>
          {cityStats.length === 0 ? (
            <p className="text-gray-400 text-sm">Yeterli şehir verisi bulunamadı.</p>
          ) : (
            <div className="space-y-4">
              {cityStats.map(({ city, count, avgPrice, avgPricePerM2 }) => {
                const barPct = Math.round((avgPrice / maxAvgPrice) * 100);
                const intensity = barPct > 80 ? 'bg-[#00C49F]' : barPct > 60 ? 'bg-blue-400' : barPct > 40 ? 'bg-amber-400' : 'bg-gray-300';
                return (
                  <div key={city}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-semibold text-gray-800 w-28 truncate">{city}</span>
                        <span className="text-[10px] text-gray-400">{count} ilan</span>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-bold text-gray-900">{formatPrice(avgPrice)}</span>
                        {avgPricePerM2 && (
                          <span className="text-[10px] text-gray-400 ml-2">₺{avgPricePerM2.toLocaleString('tr-TR')}/m²</span>
                        )}
                      </div>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2.5">
                      <div className={`${intensity} h-2.5 rounded-full transition-all`} style={{ width: `${barPct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Legend */}
          <div className="flex items-center gap-6 mt-6 pt-5 border-t border-gray-50">
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Sinyal</p>
            {[
              { label: 'YÜKSEK', color: 'bg-[#00C49F]' },
              { label: 'ORTA-YÜKSEK', color: 'bg-blue-400' },
              { label: 'ORTA', color: 'bg-amber-400' },
              { label: 'DÜŞÜK', color: 'bg-gray-300' },
            ].map(({ label, color }) => (
              <div key={label} className="flex items-center gap-1.5">
                <div className={`w-3 h-3 rounded-full ${color}`} />
                <span className="text-[9px] font-bold text-gray-500">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Listing type distribution */}
        {listingTypeStats.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="text-[10px] font-bold tracking-widest text-[#00C49F] uppercase mb-5 flex items-center gap-2">
                <TrendingUp size={12} /> İlan Türü Dağılımı
              </h2>
              <div className="space-y-4">
                {listingTypeStats.map(({ type, count, pct }) => (
                  <div key={type}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-semibold text-gray-700">{type}</span>
                      <span className="text-xs font-bold text-[#00C49F]">{count} ilan (%{pct})</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div className="bg-[#00C49F] h-2 rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="text-[10px] font-bold tracking-widest text-[#00C49F] uppercase mb-5">
                En Pahalı Şehirler (Top 5)
              </h2>
              <div className="divide-y divide-gray-50">
                {cityStats.slice(0, 5).map(({ city, avgPrice }, idx) => (
                  <div key={city} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-black w-5 text-center ${idx === 0 ? 'text-[#00C49F]' : 'text-gray-400'}`}>
                        {idx + 1}
                      </span>
                      <span className="text-sm font-semibold text-gray-800">{city}</span>
                    </div>
                    <span className="text-sm font-bold text-gray-900">{formatPrice(avgPrice)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
