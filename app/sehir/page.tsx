import prisma from '@/lib/prisma';
import Link from 'next/link';
import { Metadata } from 'next';
import { MapPin, Building2, TrendingUp, ArrowRight, Home } from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Şehirlere Göre İlanlar | Söylemesi Bizden',
  description: 'Türkiye\'nin tüm şehirlerinde gayrimenkul ilanları. Şehir bazlı fiyat analizi, ilçe dağılımı ve aktif ilanlar.',
};

export default async function CitiesIndexPage() {
  const cities = await prisma.listing.groupBy({
    by: ['city'],
    where: { status: 'ACTIVE', city: { not: null } },
    _count: { id: true },
    _avg: { price: true },
    _min: { price: true },
    orderBy: { _count: { id: 'desc' } },
  });

  const cityData = cities.filter(c => c.city);
  const totalActive = cityData.reduce((acc, c) => acc + c._count.id, 0);

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-6 py-10 space-y-10">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-gray-400">
          <Link href="/" className="hover:text-[#00C49F] transition-colors">Ana Sayfa</Link>
          <span>/</span>
          <Link href="/listings" className="hover:text-[#00C49F] transition-colors">İlanlar</Link>
          <span>/</span>
          <span className="text-gray-600 font-medium">Şehirler</span>
        </nav>

        {/* Header */}
        <header className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#F0FDF8] flex items-center justify-center">
              <MapPin className="w-6 h-6 text-[#00C49F]" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Şehirlere Göre İlanlar</h1>
              <p className="text-sm text-gray-500 mt-0.5">
                {cityData.length} şehirde {totalActive.toLocaleString('tr-TR')} aktif ilan
              </p>
            </div>
          </div>
          <Link
            href="/listings"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#00C49F] hover:bg-[#00a882] text-white text-sm font-bold rounded-xl transition-colors"
          >
            Tüm İlanlar <ArrowRight size={14} />
          </Link>
        </header>

        {/* Top 3 cities highlight */}
        {cityData.length >= 3 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {cityData.slice(0, 3).map((c, i) => (
              <Link
                key={c.city}
                href={`/sehir/${encodeURIComponent(c.city!)}`}
                className="relative group bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:border-[#00C49F]/25 transition-all overflow-hidden"
              >
                <div className="absolute top-4 right-4 text-5xl font-black text-gray-50 select-none">
                  {i + 1}
                </div>
                <div className="w-10 h-10 rounded-xl bg-[#F0FDF8] flex items-center justify-center mb-4">
                  <MapPin size={18} className="text-[#00C49F]" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-[#00C49F] transition-colors">
                  {c.city}
                </h2>
                <p className="text-sm text-gray-500 mb-3">
                  {c._count.id.toLocaleString('tr-TR')} aktif ilan
                </p>
                {c._avg.price && (
                  <p className="text-xs text-gray-400">
                    Ort. fiyat:{' '}
                    <span className="font-bold text-gray-700">
                      {Math.round(c._avg.price).toLocaleString('tr-TR')} ₺
                    </span>
                  </p>
                )}
                <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-[#00C49F]">
                  İlanları Gör <ArrowRight size={12} />
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Full cities grid */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-5">Tüm Şehirler</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {cityData.map(c => (
              <Link
                key={c.city}
                href={`/sehir/${encodeURIComponent(c.city!)}`}
                className="group bg-white border border-gray-100 rounded-2xl p-4 hover:shadow-md hover:border-[#00C49F]/20 transition-all flex items-center gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center shrink-0 group-hover:bg-[#F0FDF8] transition-colors">
                  <Building2 size={16} className="text-gray-300 group-hover:text-[#00C49F] transition-colors" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-sm group-hover:text-[#00C49F] transition-colors truncate">
                    {c.city}
                  </p>
                  <p className="text-xs text-gray-400">
                    {c._count.id} ilan
                    {c._avg.price
                      ? ` · ${Math.round(c._avg.price / 1000000) > 0
                          ? `${(c._avg.price / 1000000).toFixed(1)}M ₺`
                          : `${Math.round(c._avg.price / 1000)}K ₺`
                        } ort.`
                      : ''}
                  </p>
                </div>
                <ArrowRight size={14} className="text-gray-200 group-hover:text-[#00C49F] shrink-0 transition-colors" />
              </Link>
            ))}
          </div>
        </div>

        {/* Stats summary */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm text-center">
            <p className="text-3xl font-bold text-gray-900 mb-1">{cityData.length}</p>
            <p className="text-sm text-gray-500">Şehir</p>
          </div>
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm text-center">
            <p className="text-3xl font-bold text-[#00C49F] mb-1">{totalActive.toLocaleString('tr-TR')}</p>
            <p className="text-sm text-gray-500">Aktif İlan</p>
          </div>
          {cityData[0] && (
            <div className="bg-[#F0FDF8] border border-[#00C49F]/20 rounded-2xl p-5 shadow-sm text-center col-span-2 sm:col-span-1">
              <div className="flex items-center justify-center gap-2 mb-1">
                <TrendingUp size={20} className="text-[#00C49F]" />
                <p className="text-xl font-bold text-gray-900">{cityData[0].city}</p>
              </div>
              <p className="text-sm text-gray-500">En çok ilan</p>
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 text-center">
          <Home size={32} className="text-[#00C49F] mx-auto mb-3" />
          <h3 className="text-xl font-bold text-white mb-2">Hayalinizdeki Mülkü Bulun</h3>
          <p className="text-slate-400 text-sm mb-5 max-w-md mx-auto">
            Gelişmiş arama araçlarıyla şehir, bütçe ve özellik bazlı filtreleme yapın.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/listings"
              className="px-5 py-2.5 bg-[#00C49F] hover:bg-[#00a882] text-white text-sm font-bold rounded-xl transition-colors"
            >
              İlanları Keşfet
            </Link>
            <Link
              href="/valuation"
              className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white text-sm font-bold rounded-xl transition-colors border border-white/20"
            >
              Değerleme Yap
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}
