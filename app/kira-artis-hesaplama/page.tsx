import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, TrendingUp, Scale, ArrowRight } from 'lucide-react';
import KiraArtisClient from './KiraArtisClient';

export const metadata: Metadata = {
  title: 'Kira Artış Hesaplama 2024 | TÜFE + %25 Tavan | Söylemesi Bizden',
  description:
    'Türkiye\'de yasal kira artış oranını hesaplayın. TÜİK 12 aylık TÜFE ortalaması, %25 tavan uygulaması, yıllık projeksiyon.',
};

export default function KiraArtisPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">

        {/* Header */}
        <div>
          <Link href="/hesaplama" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-700 transition-colors mb-3">
            <ArrowLeft size={14} /> Hesaplama Araçları
          </Link>
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-violet-50 flex items-center justify-center shrink-0">
              <TrendingUp size={26} className="text-violet-500" />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tight text-gray-900">Kira Artış Hesaplayıcı</h1>
              <p className="text-gray-500 mt-1 text-sm max-w-xl">
                TÜİK 12 aylık TÜFE ortalaması ve yasal %25 tavan kuralına göre kira artış oranını
                hesaplayın. Kiracı ve ev sahibi hakları.
              </p>
            </div>
          </div>
        </div>

        {/* Quick summary cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              title: 'TBK 344. Madde',
              desc: 'Kira artışı, önceki yılın 12 aylık TÜFE ortalamasını geçemez.',
              color: 'border-violet-200 bg-violet-50',
              icon: Scale,
            },
            {
              title: '%25 Geçici Tavan',
              desc: '2022 yılında başlayan geçici düzenleme ile kira artışı en fazla %25 olabilir.',
              color: 'border-amber-200 bg-amber-50',
              icon: TrendingUp,
            },
            {
              title: 'Yıllık Yenileme',
              desc: 'Kira sözleşmeleri en erken 1 yıl sonra yenilenir ve artış uygulanabilir.',
              color: 'border-blue-200 bg-blue-50',
              icon: ArrowRight,
            },
          ].map(c => (
            <div key={c.title} className={`rounded-2xl border p-5 ${c.color}`}>
              <c.icon size={18} className="text-gray-600 mb-2" />
              <p className="text-sm font-bold text-gray-800">{c.title}</p>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>

        {/* Interactive calculator */}
        <KiraArtisClient />

        {/* Related links */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { href: '/rehber/kiralama-rehberi', label: 'Kiralama Rehberi', desc: 'Sözleşme, depozito ve haklar' },
            { href: '/kiralik', label: 'Kiralık İlanlar', desc: 'Güncel kiralık mülkler' },
            { href: '/emlak-vergisi', label: 'Emlak Vergisi', desc: 'Yıllık vergi hesaplaması' },
          ].map(t => (
            <Link
              key={t.href}
              href={t.href}
              className="group bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md hover:border-violet-200 transition-all"
            >
              <p className="text-sm font-bold text-gray-800 group-hover:text-violet-700 transition-colors">{t.label}</p>
              <p className="text-xs text-gray-400 mt-1">{t.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
