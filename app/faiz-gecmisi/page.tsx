import { Metadata } from 'next';
import Link from 'next/link';
import { TrendingUp, TrendingDown, ArrowRight, Info } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Konut Kredisi Faiz Geçmişi | Türkiye Tarihsel Mortgage Oranları | Söylemesi Bizden',
  description:
    'Türkiye konut kredisi faiz oranlarının tarihsel seyri 2015-2024. Yıllık en düşük / en yüksek banka faizleri, TCMB politika faizi karşılaştırması.',
};

const YEARLY_DATA = [
  { year: 2015, low: 1.00, high: 1.20, tcmb: 7.50, note: 'Faiz görece istikrarlı' },
  { year: 2016, low: 0.99, high: 1.25, tcmb: 8.00, note: 'Darbe girişimi sonrası belirsizlik' },
  { year: 2017, low: 0.95, high: 1.35, tcmb: 8.00, note: 'TL değer kaybı baskısı' },
  { year: 2018, low: 1.20, high: 1.80, tcmb: 24.00, note: 'Kur krizi — faizler yüksek zirve' },
  { year: 2019, low: 0.80, high: 1.60, tcmb: 12.00, note: 'TCMB faiz indirimi — kredi canlandı' },
  { year: 2020, low: 0.64, high: 1.50, tcmb: 17.00, note: 'Pandemi: tarihi düşük 0.64%' },
  { year: 2021, low: 0.90, high: 1.85, tcmb: 14.00, note: 'TCMB faiz kesimleri — enflasyon baskısı' },
  { year: 2022, low: 0.89, high: 1.59, tcmb: 9.00, note: 'Hedef dışı faiz politikası' },
  { year: 2023, low: 1.84, high: 3.40, tcmb: 42.50, note: 'Ortodoks dönüş — Mayıs sonrası sıkılaşma' },
  { year: 2024, low: 2.40, high: 3.20, tcmb: 45.00, note: 'Faiz zirve — yüksek konut kredisi maliyeti' },
];

const MONTHLY_2024 = [
  { month: 'Oca', avg: 3.20 },
  { month: 'Şub', avg: 3.18 },
  { month: 'Mar', avg: 3.10 },
  { month: 'Nis', avg: 3.05 },
  { month: 'May', avg: 2.90 },
  { month: 'Haz', avg: 2.75 },
  { month: 'Tem', avg: 2.65 },
  { month: 'Ağu', avg: 2.55 },
  { month: 'Eyl', avg: 2.50 },
  { month: 'Eki', avg: 2.45 },
  { month: 'Kas', avg: 2.42 },
  { month: 'Ara', avg: 2.40 },
];

const INSIGHTS = [
  {
    icon: TrendingDown,
    color: 'text-[#00C49F]',
    bg: 'bg-[#F0FDF8]',
    title: 'Tarihsel En Düşük',
    value: '%0.64/ay',
    detail: 'Temmuz 2020 — Pandemi döneminde TCMB teşvik politikası',
  },
  {
    icon: TrendingUp,
    color: 'text-rose-600',
    bg: 'bg-rose-50',
    title: 'Tarihsel En Yüksek',
    value: '%3.40/ay',
    detail: 'Aralık 2023 — Ortodoks para politikasına dönüş zirvesi',
  },
  {
    icon: TrendingUp,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    title: '10 Yıl Ortalaması',
    value: '~%1.65/ay',
    detail: '2015-2024 arası ağırlıklı ortalama konut kredisi faizi',
  },
];

const TIPS = [
  'Faiz oranı düştüğünde mevcut kredinizi yeniden yapılandırın (refinansman); %0.20 fark bile 10 yılda onlarca bin lira tasarruf sağlar.',
  'TCMB politika faizi ile konut kredisi faizi arasında genellikle 12-18 aylık gecikme vardır.',
  'Sabit faizli kredi, yüksek volatiliteli dönemlerde dalgalanma riskinden korur.',
  'Kısa vadeli (5-7 yıl) krediler, uzun vadelilere kıyasla %10-20 daha az toplam faiz ödemesi anlamına gelir.',
  'Banka pazarlığı: birden fazla bankadan teklif alın; aynı günde %0.10-0.20 fark bulunabilir.',
];

export default function FaizGecmisiPage() {
  const maxHigh = Math.max(...YEARLY_DATA.map(d => d.high));
  const maxMonthly = Math.max(...MONTHLY_2024.map(d => d.avg));

  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <TrendingUp size={13} /> Piyasa Verisi
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Konut Kredisi Faiz Geçmişi
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            Türkiye konut kredisi faiz oranlarının 2015-2024 tarihsel seyri. Yıllık en düşük/en yüksek
            değerler ve TCMB politika faizi karşılaştırması.
          </p>
          <div className="flex flex-wrap gap-4">
            {INSIGHTS.map(i => (
              <div key={i.title} className="bg-white/10 rounded-xl px-5 py-3">
                <p className={`text-xl font-black ${i.color.replace('text-', 'text-')}`}>{i.value}</p>
                <p className="text-xs text-gray-400">{i.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-12 space-y-12">

        {/* Yıllık Tablo */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Yıllık Faiz Aralıkları (2015-2024)</h2>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="text-left px-4 py-3 font-black text-gray-700">Yıl</th>
                    <th className="text-right px-4 py-3 font-black text-[#00C49F]">En Düşük (%/ay)</th>
                    <th className="text-right px-4 py-3 font-black text-rose-600">En Yüksek (%/ay)</th>
                    <th className="text-right px-4 py-3 font-black text-amber-600">TCMB (%)</th>
                    <th className="text-left px-4 py-3 font-black text-gray-700">Not</th>
                  </tr>
                </thead>
                <tbody>
                  {YEARLY_DATA.map((d, i) => (
                    <tr key={d.year} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 font-black text-gray-900">{d.year}</td>
                      <td className="px-4 py-3 text-right font-bold text-[#00C49F]">%{d.low.toFixed(2)}</td>
                      <td className="px-4 py-3 text-right font-bold text-rose-500">%{d.high.toFixed(2)}</td>
                      <td className="px-4 py-3 text-right text-amber-600 font-bold">%{d.tcmb.toFixed(2)}</td>
                      <td className="px-4 py-3 text-gray-500 text-[10px]">{d.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 2024 Aylık Bar Grafik */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">2024 Aylık Ortalama Faiz (%/ay)</h2>
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-end gap-2 h-32">
              {MONTHLY_2024.map(d => (
                <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-[9px] text-gray-600 font-bold">%{d.avg.toFixed(2)}</span>
                  <div
                    className="w-full rounded-t-md bg-gradient-to-t from-[#00C49F] to-[#00e5b8]"
                    style={{ height: `${(d.avg / maxMonthly) * 90}%` }}
                  />
                  <span className="text-[9px] text-gray-400">{d.month}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Yıllık bar (düşük vs yüksek) */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Yıllık Faiz Bandı Görselleştirmesi</h2>
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-3">
            {YEARLY_DATA.map(d => (
              <div key={d.year} className="flex items-center gap-3">
                <span className="text-xs font-black text-gray-700 w-10 shrink-0">{d.year}</span>
                <div className="flex-1 h-5 bg-gray-100 rounded-full overflow-hidden relative">
                  <div
                    className="absolute inset-y-0 rounded-full bg-gradient-to-r from-[#00C49F] to-rose-400"
                    style={{
                      left: `${(d.low / maxHigh) * 100}%`,
                      width: `${((d.high - d.low) / maxHigh) * 100}%`,
                    }}
                  />
                </div>
                <span className="text-[10px] text-gray-500 w-20 shrink-0 text-right">%{d.low}–%{d.high}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Tips */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <Info size={14} className="text-[#00C49F]" /> Faiz Döngüsünde Akıllı Kararlar
          </h2>
          <ul className="space-y-3">
            {TIPS.map((tip, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-[#F0FDF8] text-[#00C49F] text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                <p className="text-xs text-gray-600 leading-relaxed">{tip}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Araçlar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/faiz-takip', label: 'Anlık Faiz Takip' },
              { href: '/mortgage-simulatoru', label: 'Gelişmiş Mortgage Simülatörü' },
              { href: '/banka-kredileri', label: 'Banka Kredisi Karşılaştır' },
              { href: '/kredi-karsilastirma', label: 'Kredi Karşılaştırma (4 Senaryo)' },
              { href: '/odeme-plani', label: 'Ödeme Planı Simülatörü' },
              { href: '/kira-mi-satin-mi', label: 'Kira mı, Satın mı?' },
            ].map(l => (
              <Link key={l.href} href={l.href}
                className="flex items-center gap-2 p-3 rounded-xl bg-gray-50 hover:bg-[#F0FDF8] border border-transparent hover:border-[#00C49F]/20 transition-all group"
              >
                <ArrowRight size={12} className="text-gray-300 group-hover:text-[#00C49F] transition-colors shrink-0" />
                <span className="text-xs text-gray-700 group-hover:text-[#00C49F] font-medium transition-colors">{l.label}</span>
              </Link>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}
