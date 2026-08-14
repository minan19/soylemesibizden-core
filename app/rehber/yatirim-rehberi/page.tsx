import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowLeft, TrendingUp, CheckCircle2, BarChart2, Calculator, MapPin, Info } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Gayrimenkul Yatırım Rehberi | Söylemesi Bizden',
  description: 'Türkiye\'de gayrimenkul yatırımında kira getirisi hesaplama, konum seçimi, portföy çeşitlendirmesi ve ROI stratejileri.',
};

const YIELD_CITIES = [
  { city: 'İzmir', pct: '4.2–5.8', trend: 'up' },
  { city: 'Antalya', pct: '3.8–5.2', trend: 'up' },
  { city: 'İstanbul', pct: '2.5–4.0', trend: 'flat' },
  { city: 'Ankara', pct: '3.5–5.0', trend: 'up' },
  { city: 'Bursa', pct: '3.2–4.5', trend: 'flat' },
  { city: 'Bodrum', pct: '4.0–6.5', trend: 'up' },
];

const METRICS = [
  {
    id: 'getiri',
    label: 'Kira Getirisi (Brüt)',
    formula: '(Yıllık Kira / Alış Fiyatı) × 100',
    example: '72.000 ₺ / yıl ÷ 2.000.000 ₺ = %3.6',
    color: 'text-[#00C49F]',
    bg: 'bg-[#F0FDF8]',
  },
  {
    id: 'roi',
    label: 'Toplam ROI (10 yıl)',
    formula: '(Değer Artışı + Kira Gelirleri − Giderler) / Alış Fiyatı',
    example: 'Değer: %150 artış + Kira: %36 = %186 ROI',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
  {
    id: 'geri-odeme',
    label: 'Geri Ödeme Süresi',
    formula: 'Alış Fiyatı / Yıllık Net Kira Geliri',
    example: '2.000.000 ₺ ÷ 64.800 ₺ = ~31 yıl (brüt %3.6)',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
  },
];

const TIPS = [
  'Ulaşım akslarına (metro, metrobüs) yakın mülkler daha kolay kiralanır.',
  'Üniversite çevresindeki stüdyo ve 1+1\'ler düşük boş kalma oranı gösterir.',
  'Sıfır binalarda ilk 5 yılda bakım maliyeti minimumdur.',
  'Kiracı profili istikrarlı kira gelirini doğrudan etkiler.',
  'Turistik bölgelerde kısa dönem kiralama yıllık getiriyi 2× artırabilir.',
  'Büyük şehirlerde AVM çevresindeki konutlar değer artışında öne geçer.',
];

const EXPENSES = [
  { item: 'Tapu harcı', value: '%4 (alıcı + satıcı %2+%2)' },
  { item: 'Ekspertiz ücreti', value: '₺1.500 – ₺3.000' },
  { item: 'Yıllık vergi (Emlak)', value: 'Değerin %0.1–0.3\'ü' },
  { item: 'Yönetim komisyonu', value: 'Kira bedelinin %8–12\'si' },
  { item: 'DASK + konut sigortası', value: 'Yıllık ₺2.000 – ₺5.000' },
  { item: 'Boş kalma riski', value: 'Ortalama yılda 1–2 ay' },
];

export default function YatirimRehberiPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-3xl mx-auto px-6 py-10 space-y-8">

        {/* Header */}
        <div>
          <Link href="/rehber" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-700 transition-colors mb-3">
            <ArrowLeft size={14} /> Rehberler
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center">
              <TrendingUp size={22} className="text-amber-600" />
            </div>
            <div>
              <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">Rehber · 10 dk okuma</span>
              <h1 className="text-2xl font-black tracking-tight text-gray-900 mt-0.5">Gayrimenkul Yatırım Rehberi</h1>
            </div>
          </div>
        </div>

        {/* Intro */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <p className="text-gray-600 leading-relaxed text-sm">
            Türkiye&apos;de gayrimenkul, yüksek enflasyon dönemlerinde en güçlü servet koruma araçlarından biri
            olmayı sürdürmektedir. Bu rehber, kira getirisi hesaplamadan konum seçimine, vergilerden
            portföy stratejisine kadar yatırımcının ihtiyaç duyduğu temel kavramları açıklıyor.
          </p>
        </div>

        {/* Key metrics */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-gray-900">Temel Yatırım Metrikleri</h2>
          {METRICS.map(m => (
            <div key={m.id} id={m.id} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <div className={`inline-flex items-center gap-2 ${m.bg} ${m.color} text-xs font-bold px-3 py-1.5 rounded-full mb-3`}>
                <BarChart2 size={12} /> {m.label}
              </div>
              <p className="text-xs text-gray-400 font-mono bg-gray-50 rounded-lg px-3 py-2 mb-2">{m.formula}</p>
              <p className="text-xs text-gray-500"><span className="font-semibold text-gray-700">Örnek:</span> {m.example}</p>
            </div>
          ))}
        </div>

        {/* City yields */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <MapPin size={16} className="text-[#00C49F]" />
            <h2 className="text-sm font-bold text-gray-900">Şehir Bazlı Brüt Kira Getirisi (2026 Tahmini)</h2>
          </div>
          <div className="space-y-2">
            {YIELD_CITIES.map(c => (
              <div key={c.city} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <span className="text-sm font-semibold text-gray-800 w-20 shrink-0">{c.city}</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full bg-[#00C49F]"
                    style={{ width: `${(parseFloat(c.pct) / 7) * 100}%` }}
                  />
                </div>
                <span className="text-xs font-bold text-gray-700 w-20 text-right shrink-0">%{c.pct}</span>
                <span className="text-xs">{c.trend === 'up' ? '↑' : '→'}</span>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-gray-400 mt-3">* Tahmini brüt değerler. Net getiri giderler düşüldükten sonra %1-1.5 daha düşük olabilir.</p>
        </div>

        {/* Investment tips */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-bold text-gray-900 mb-4">Yatırımcı İpuçları</h2>
          <ul className="space-y-2.5">
            {TIPS.map((tip, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
                <CheckCircle2 size={13} className="text-[#00C49F] shrink-0 mt-0.5" />
                {tip}
              </li>
            ))}
          </ul>
        </div>

        {/* Hidden costs */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-bold text-gray-900 mb-4">Gizli Maliyetler ve Giderler</h2>
          <div className="space-y-2">
            {EXPENSES.map(e => (
              <div key={e.item} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <span className="text-sm text-gray-600">{e.item}</span>
                <span className="text-sm font-semibold text-gray-800">{e.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-2xl p-4">
          <Info size={16} className="text-blue-400 shrink-0 mt-0.5" />
          <p className="text-xs text-blue-600 leading-relaxed">
            Bu rehber bilgilendirme amaçlıdır. Getiri oranları piyasa koşullarına göre değişir.
            Yatırım kararı vermeden önce bağımsız bir mali danışmana ve vergi uzmanına başvurun.
          </p>
        </div>

        {/* Tools */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">Yatırım Araçları</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { href: '/hesaplama', icon: Calculator, label: 'Kira Getirisi Hesaplayıcı' },
              { href: '/market-radar', icon: BarChart2, label: 'Piyasa Radarı' },
              { href: '/listings?sort=price_asc&listingType=SATILIK', icon: TrendingUp, label: 'Fiyata Göre Sırala' },
              { href: '/valuation', icon: MapPin, label: 'Mülk Değerleme' },
            ].map(t => (
              <Link
                key={t.href}
                href={t.href}
                className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-amber-50 border border-transparent hover:border-amber-100 transition-all group"
              >
                <t.icon size={15} className="text-gray-400 group-hover:text-amber-600 transition-colors" />
                <span className="text-xs font-semibold text-gray-600 group-hover:text-amber-700 transition-colors">{t.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-2">
          <Link href="/rehber/kiralama-rehberi" className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-700 transition-colors">
            <ArrowLeft size={14} /> Kiralama Rehberi
          </Link>
          <Link href="/rehber" className="flex items-center gap-2 text-sm text-[#00C49F] hover:text-[#00a882] font-semibold transition-colors">
            Tüm Rehberler →
          </Link>
        </div>
      </div>
    </main>
  );
}
