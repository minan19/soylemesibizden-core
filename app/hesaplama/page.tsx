import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowLeft, Calculator, Home, TrendingUp, Info, DollarSign, BarChart2 } from 'lucide-react';
import CalculatorsClient from './CalculatorsClient';
import MortgagePartners from '@/components/MortgagePartners';

export const metadata: Metadata = {
  title: 'Gayrimenkul Hesaplama Araçları | Söylemesi Bizden',
  description: 'Konut kredisi hesaplama, kira getirisi analizi, kira vs satın alma karşılaştırması. Ücretsiz gayrimenkul finansal araçları.',
};

export default function HesaplamaPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">

        {/* Header */}
        <div>
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-700 transition-colors mb-3">
            <ArrowLeft size={14} /> Ana Sayfa
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#F0FDF8] flex items-center justify-center">
              <Calculator size={24} className="text-[#00C49F]" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">Hesaplama Araçları</h1>
              <p className="text-sm text-gray-500 mt-0.5">Gayrimenkul kararlarınızı sayılarla destekleyin</p>
            </div>
          </div>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            {
              icon: Home,
              title: 'Konut Kredisi',
              desc: 'Aylık taksit ve toplam ödeme hesaplaması',
              color: 'text-[#00C49F]',
              bg: 'bg-[#F0FDF8]',
            },
            {
              icon: Calculator,
              title: 'Kira vs Satın Al',
              desc: 'Uzun vadede hangisi daha avantajlı?',
              color: 'text-blue-600',
              bg: 'bg-blue-50',
            },
            {
              icon: TrendingUp,
              title: 'Kira Getirisi',
              desc: 'Yatırım getirinizi ve geri ödeme süresini öğrenin',
              color: 'text-amber-600',
              bg: 'bg-amber-50',
            },
            {
              icon: DollarSign,
              title: 'Tapu & Vergiler',
              desc: 'Tapu harcı, KDV ve ek maliyetleri hesaplayın',
              color: 'text-red-500',
              bg: 'bg-red-50',
            },
            {
              icon: BarChart2,
              title: 'Yatırım ROI',
              desc: 'Toplam yatırım getirisi ve nakit akışı analizi',
              color: 'text-purple-600',
              bg: 'bg-purple-50',
            },
          ].map(card => (
            <div key={card.title} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <div className={`w-10 h-10 ${card.bg} rounded-xl flex items-center justify-center mb-3`}>
                <card.icon size={18} className={card.color} />
              </div>
              <p className="text-sm font-bold text-gray-900 mb-1">{card.title}</p>
              <p className="text-xs text-gray-400">{card.desc}</p>
            </div>
          ))}
        </div>

        {/* Main calculators */}
        <CalculatorsClient />

        {/* Bank comparison */}
        <MortgagePartners />

        {/* Disclaimer */}
        <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-2xl p-4">
          <Info size={16} className="text-blue-400 shrink-0 mt-0.5" />
          <p className="text-xs text-blue-600 leading-relaxed">
            Bu hesaplama araçları yalnızca bilgilendirme amaçlıdır. Gerçek kredi koşulları bankadan bankaya ve bireysel koşullara göre değişir.
            Yatırım kararı vermeden önce bir finansal danışmana başvurmanızı öneririz.
          </p>
        </div>

        {/* Specialized calculators */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">Uzman Hesaplama Araçları</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { href: '/tapu-masrafi', label: 'Tapu Masrafı', desc: 'Tüm alım maliyetleri' },
              { href: '/emlak-vergisi', label: 'Emlak Vergisi', desc: 'Konut/işyeri/arsa' },
              { href: '/kira-artis-hesaplama', label: 'Kira Artış', desc: 'TÜİK TÜFE + %25 tavan' },
              { href: '/yatirim-analizi', label: 'Yatırım ROI', desc: 'Getiri analizi + al/kirala' },
              { href: '/portfoy', label: 'Portföy Takibi', desc: 'Gayrimenkul portföyüm' },
              { href: '/valuation', label: 'Değerleme Aracı', desc: 'Bölge fiyat analizi' },
              { href: '/odeme-plani', label: 'Ödeme Planı', desc: 'Ay ay anapara + faiz' },
              { href: '/kredi-karsilastirma', label: 'Kredi Karşılaştır', desc: '4 senaryo yan yana' },
              { href: '/dask-hesaplayici', label: 'DASK Hesapla', desc: 'Deprem sigortası primi' },
              { href: '/kira-geliri-vergisi', label: 'Kira Vergisi', desc: '2024 gelir vergisi' },
              { href: '/kira-mi-satin-mi', label: 'Kira mı Satın mı?', desc: '30 yıl projeksiyon' },
              { href: '/pesinat-plani', label: 'Peşinat Planı', desc: 'Ne zaman ev alabilirim?' },
            ].map(l => (
              <Link
                key={l.href}
                href={l.href}
                className="group p-4 bg-gray-50 hover:bg-[#F0FDF8] border border-gray-100 hover:border-[#00C49F]/40 rounded-xl transition-all"
              >
                <p className="text-sm font-bold text-gray-800 group-hover:text-[#00C49F] transition-colors">{l.label}</p>
                <p className="text-xs text-gray-400 mt-0.5">{l.desc}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Related links */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Araçlar</h3>
          <div className="flex flex-wrap gap-3">
            {[
              { href: '/valuation', label: 'Değerleme Aracı' },
              { href: '/market-radar', label: 'Piyasa Radarı' },
              { href: '/listings?sort=price_asc', label: 'Uygun Fiyatlı İlanlar' },
              { href: '/listings?listingType=KİRALIK', label: 'Kiralık İlanlar' },
              { href: '/fiyat-trendi', label: 'Fiyat Trendi' },
              { href: '/mahalle-analizi', label: 'Mahalle Analizi' },
            ].map(l => (
              <Link
                key={l.href}
                href={l.href}
                className="px-4 py-2 bg-gray-50 hover:bg-[#F0FDF8] border border-gray-200 hover:border-[#00C49F] rounded-xl text-xs font-semibold text-gray-600 hover:text-[#00C49F] transition-all"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
