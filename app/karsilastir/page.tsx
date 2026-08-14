import prisma from '@/lib/prisma';
import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowLeft, MapPin, TrendingUp, Building2, Home, ArrowRight, BarChart3 } from 'lucide-react';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ searchParams }: { searchParams: { a?: string; b?: string } }): Promise<Metadata> {
  const cityA = searchParams.a ?? '';
  const cityB = searchParams.b ?? '';
  if (cityA && cityB) {
    return {
      title: `${cityA} vs ${cityB} Karşılaştırma | Söylemesi Bizden`,
      description: `${cityA} ve ${cityB} arasında gayrimenkul fiyat ve ilan karşılaştırması.`,
    };
  }
  return {
    title: 'Bölge Karşılaştırma Aracı | Söylemesi Bizden',
    description: 'İki şehir veya ilçeyi gayrimenkul fiyatları, ilan sayısı ve piyasa verileriyle karşılaştırın.',
  };
}

async function getStats(city: string) {
  if (!city.trim()) return null;
  const where = {
    status: 'ACTIVE' as const,
    OR: [
      { city: { equals: city, mode: 'insensitive' as const } },
      { district: { equals: city, mode: 'insensitive' as const } },
    ],
  };
  const [total, agg, byType, byListingType, topListings] = await Promise.all([
    prisma.listing.count({ where }),
    prisma.listing.aggregate({
      where,
      _avg: { price: true, area: true },
      _min: { price: true },
      _max: { price: true },
    }),
    prisma.listing.groupBy({
      by: ['propertyType'],
      where,
      _count: true,
      _avg: { price: true },
      orderBy: { _count: { propertyType: 'desc' } },
      take: 4,
    }),
    prisma.listing.groupBy({
      by: ['listingType'],
      where,
      _count: true,
    }),
    prisma.listing.findMany({
      where,
      orderBy: { views: 'desc' },
      take: 3,
      select: { id: true, title: true, price: true, area: true, rooms: true, photos: true, listingType: true },
    }),
  ]);
  return { total, agg, byType, byListingType, topListings, query: city };
}

const POPULAR = ['İstanbul', 'Ankara', 'İzmir', 'Antalya', 'Bursa', 'Beşiktaş', 'Kadıköy', 'Çankaya', 'Bornova', 'Muratpaşa'];

export default async function KarsilastirPage({ searchParams }: { searchParams: { a?: string; b?: string } }) {
  const a = searchParams.a?.trim() ?? '';
  const b = searchParams.b?.trim() ?? '';

  const [statsA, statsB] = await Promise.all([getStats(a), getStats(b)]);

  const maxAvg = Math.max(
    statsA?.agg._avg.price ?? 0,
    statsB?.agg._avg.price ?? 0,
    1,
  );

  function StatBar({ value, max, color }: { value: number; max: number; color: string }) {
    const w = Math.round((value / max) * 100);
    return (
      <div className="flex items-center gap-2 mt-1">
        <div className="flex-1 bg-gray-100 rounded-full h-2">
          <div className={`h-2 rounded-full ${color}`} style={{ width: `${w}%` }} />
        </div>
        <span className="text-xs font-bold text-gray-700 w-16 text-right shrink-0">
          {Math.round(value).toLocaleString('tr-TR')} ₺
        </span>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">

        {/* Header */}
        <div>
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-700 mb-3 transition-colors">
            <ArrowLeft size={14} /> Ana Sayfa
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-[#F0FDF8] flex items-center justify-center">
              <BarChart3 size={22} className="text-[#00C49F]" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Bölge Karşılaştırma</h1>
              <p className="text-sm text-gray-500 mt-0.5">İki şehir veya ilçeyi yan yana karşılaştırın</p>
            </div>
          </div>
        </div>

        {/* Search Form */}
        <form method="get" className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Bölge A</label>
              <div className="relative">
                <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#00C49F]" />
                <input
                  type="text"
                  name="a"
                  defaultValue={a}
                  placeholder="Örn: İstanbul, Beşiktaş..."
                  className="w-full pl-9 pr-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#00C49F] transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Bölge B</label>
              <div className="relative">
                <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500" />
                <input
                  type="text"
                  name="b"
                  defaultValue={b}
                  placeholder="Örn: Ankara, Kadıköy..."
                  className="w-full pl-9 pr-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-blue-400 transition-colors"
                />
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-3 bg-[#00C49F] hover:bg-[#00a882] text-white text-sm font-bold rounded-xl transition-colors"
          >
            Karşılaştır
          </button>
        </form>

        {/* Quick picks */}
        {!a && !b && (
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Popüler Seçimler</p>
            <div className="flex flex-wrap gap-2">
              {[
                ['İstanbul', 'Ankara'],
                ['İzmir', 'Antalya'],
                ['Beşiktaş', 'Kadıköy'],
                ['Çankaya', 'Keçiören'],
              ].map(([x, y]) => (
                <Link
                  key={`${x}-${y}`}
                  href={`/karsilastir?a=${encodeURIComponent(x)}&b=${encodeURIComponent(y)}`}
                  className="px-3 py-1.5 bg-white border border-gray-200 hover:border-[#00C49F] hover:text-[#00C49F] rounded-xl text-xs font-semibold text-gray-600 transition-all"
                >
                  {x} vs {y}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {(statsA || statsB) && (
          <>
            {/* Side by side header */}
            <div className="grid grid-cols-2 gap-4">
              {[{ stats: statsA, label: a, color: 'text-[#00C49F]', bg: 'bg-[#F0FDF8]', border: 'border-[#00C49F]/30', bar: 'bg-[#00C49F]' },
                { stats: statsB, label: b, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200', bar: 'bg-blue-500' }].map(({ stats, label, color, bg, border }) => (
                <div key={label} className={`bg-white rounded-2xl border ${border} p-5 shadow-sm`}>
                  <div className={`flex items-center gap-2 mb-4`}>
                    <div className={`w-8 h-8 ${bg} rounded-xl flex items-center justify-center shrink-0`}>
                      <MapPin size={14} className={color} />
                    </div>
                    <h2 className={`text-lg font-bold ${color}`}>{label}</h2>
                  </div>
                  {!stats ? (
                    <p className="text-sm text-gray-400">Sonuç bulunamadı</p>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Aktif İlan</span>
                        <span className="font-bold text-gray-900">{stats.total.toLocaleString('tr-TR')}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Ort. Fiyat</span>
                        <span className="font-bold text-gray-900">
                          {stats.agg._avg.price ? `${Math.round(stats.agg._avg.price).toLocaleString('tr-TR')} ₺` : '—'}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">En Düşük</span>
                        <span className="font-bold text-[#00C49F]">
                          {stats.agg._min.price ? `${Math.round(stats.agg._min.price).toLocaleString('tr-TR')} ₺` : '—'}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">En Yüksek</span>
                        <span className="font-bold text-gray-700">
                          {stats.agg._max.price ? `${Math.round(stats.agg._max.price).toLocaleString('tr-TR')} ₺` : '—'}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Ort. Alan</span>
                        <span className="font-bold text-gray-900">
                          {stats.agg._avg.area ? `${Math.round(stats.agg._avg.area)} m²` : '—'}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Average price comparison bar */}
            {statsA?.agg._avg.price != null && statsB?.agg._avg.price != null && (
              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <h3 className="text-sm font-bold text-gray-900 mb-4">Ortalama Fiyat Karşılaştırması</h3>
                <div className="space-y-4">
                  {[
                    { label: a, value: statsA.agg._avg.price, color: 'bg-[#00C49F]' },
                    { label: b, value: statsB.agg._avg.price, color: 'bg-blue-500' },
                  ].map(({ label, value, color }) => (
                    <div key={label}>
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span className="font-semibold">{label}</span>
                        <span>{Math.round(value).toLocaleString('tr-TR')} ₺</span>
                      </div>
                      <StatBar value={value} max={maxAvg} color={color} />
                    </div>
                  ))}
                  <p className="text-xs text-gray-400 mt-2">
                    {statsA.agg._avg.price > statsB.agg._avg.price
                      ? `${a}, ${b}'dan %${Math.round(((statsA.agg._avg.price - statsB.agg._avg.price) / statsB.agg._avg.price) * 100)} daha pahalı`
                      : statsB.agg._avg.price > statsA.agg._avg.price
                      ? `${b}, ${a}'dan %${Math.round(((statsB.agg._avg.price - statsA.agg._avg.price) / statsA.agg._avg.price) * 100)} daha pahalı`
                      : 'Fiyatlar eşit'}
                  </p>
                </div>
              </div>
            )}

            {/* Property type breakdown */}
            {(statsA?.byType.length || statsB?.byType.length) ? (
              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <h3 className="text-sm font-bold text-gray-900 mb-4">Mülk Türü Dağılımı</h3>
                <div className="grid grid-cols-2 gap-8">
                  {[{ stats: statsA, label: a, color: 'text-[#00C49F]', badge: 'bg-[#F0FDF8] text-[#00C49F]' },
                    { stats: statsB, label: b, color: 'text-blue-600', badge: 'bg-blue-50 text-blue-700' }].map(({ stats, label, color, badge }) => (
                    <div key={label}>
                      <p className={`text-xs font-bold ${color} mb-3`}>{label}</p>
                      <div className="space-y-2">
                        {stats?.byType.map(t => (
                          <div key={t.propertyType} className="flex items-center justify-between text-sm">
                            <span className="text-gray-700">{t.propertyType}</span>
                            <div className="flex items-center gap-2">
                              {t._avg.price && (
                                <span className="text-xs text-gray-400">{Math.round(t._avg.price / 1000)}K ₺</span>
                              )}
                              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${badge}`}>{t._count}</span>
                            </div>
                          </div>
                        ))}
                        {!stats?.byType.length && <p className="text-xs text-gray-400">Veri yok</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {/* Listing type */}
            {(statsA?.byListingType.length || statsB?.byListingType.length) ? (
              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <h3 className="text-sm font-bold text-gray-900 mb-4">Satılık / Kiralık Dağılımı</h3>
                <div className="grid grid-cols-2 gap-8">
                  {[{ stats: statsA, label: a }, { stats: statsB, label: b }].map(({ stats, label }) => (
                    <div key={label}>
                      <p className="text-xs font-bold text-gray-500 mb-3">{label}</p>
                      {stats?.byListingType.map(lt => (
                        <div key={lt.listingType} className="flex justify-between text-sm mb-2">
                          <span className="text-gray-700">{lt.listingType}</span>
                          <span className="font-bold text-gray-900">
                            {lt._count}
                            {stats.total > 0 && (
                              <span className="text-xs text-gray-400 ml-1">
                                (%{Math.round((lt._count / stats.total) * 100)})
                              </span>
                            )}
                          </span>
                        </div>
                      ))}
                      {!stats?.byListingType.length && <p className="text-xs text-gray-400">Veri yok</p>}
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {/* Top listings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[{ stats: statsA, label: a, color: 'text-[#00C49F]' }, { stats: statsB, label: b, color: 'text-blue-600' }].map(({ stats, label, color }) => (
                <div key={label} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                  <h3 className={`text-sm font-bold ${color} mb-4`}>{label} — En Çok Görüntülenen</h3>
                  <div className="space-y-3">
                    {stats?.topListings.map(l => (
                      <Link key={l.id} href={`/listing/${l.id}`} className="flex items-center gap-3 group">
                        <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                          {l.photos[0] ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={l.photos[0]} alt={l.title} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Building2 size={14} className="text-gray-300" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-gray-800 line-clamp-1 group-hover:text-[#00C49F] transition-colors">{l.title}</p>
                          <p className="text-xs font-bold text-gray-900 mt-0.5">{l.price.toLocaleString('tr-TR')} ₺</p>
                        </div>
                        <ArrowRight size={12} className="text-gray-300 shrink-0" />
                      </Link>
                    ))}
                    {!stats?.topListings.length && <p className="text-xs text-gray-400">Ilan bulunamadı</p>}
                  </div>
                  {stats && stats.total > 0 && (
                    <Link
                      href={`/listings?city=${encodeURIComponent(label)}`}
                      className={`mt-4 block text-center text-xs font-semibold ${color} hover:underline`}
                    >
                      Tüm {stats.total} ilanı gör →
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {/* Popular compare suggestions */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp size={14} className="text-[#00C49F]" />
            Popüler Bölgeler
          </h3>
          <div className="flex flex-wrap gap-2">
            {POPULAR.map(city => (
              <Link
                key={city}
                href={`/sehir/${encodeURIComponent(city)}`}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 hover:bg-[#F0FDF8] border border-gray-200 hover:border-[#00C49F] rounded-xl text-xs font-semibold text-gray-600 hover:text-[#00C49F] transition-all"
              >
                <Home size={10} />
                {city}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
