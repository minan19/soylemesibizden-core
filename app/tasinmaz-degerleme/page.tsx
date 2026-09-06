import { Metadata } from 'next';
import Link from 'next/link';
import {
  Scale, CheckCircle, AlertTriangle, ArrowRight, FileText, TrendingUp,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Taşınmaz Değerleme Yöntemleri Rehberi | Emsal, Gelir, Maliyet | Söylemesi Bizden',
  description:
    'SPK lisanslı taşınmaz değerlemesi nasıl yapılır? Emsal karşılaştırma, gelir indirgeme ve maliyet yöntemleri, kullanım alanları.',
};

const YONTEMLER = [
  {
    isim: 'Emsal Karşılaştırma Yöntemi',
    uygulanir: 'Konut, arsa, ticari',
    nasil: 'Benzer özelliklerdeki yakın zamanda satılmış emsal taşınmazlar seçilir; değerleme konusu taşınmazla karşılaştırılır.',
    avantaj: 'Piyasa gerçekliğini doğrudan yansıtır; en yaygın ve anlaşılır yöntem.',
    dezavantaj: 'Yeterli emsal yoksa veya piyasa ince ise güvenilirlik düşer.',
    ornekKullanim: 'İpotek değerlemesi, tapu harç matrahı, satış fiyatı belirleme.',
  },
  {
    isim: 'Gelir İndirgeme (Kapitalizasyon) Yöntemi',
    uygulanir: 'Kira geliri olan konut, AVM, ofis, depo',
    nasil: 'Taşınmazın ürettiği net gelir (NOI) piyasa kapitalizasyon oranına (cap rate) bölünür.',
    avantaj: 'Yatırım değerini doğrudan ölçer; gelir getiren varlıklar için objektif.',
    dezavantaj: 'Cap rate tahmini subjektif; gelir değişkenliği güvenilirliği etkiler.',
    ornekKullanim: 'Yatırımcı satın alma kararı, GYO portföy değerlemesi.',
  },
  {
    isim: 'Maliyet Yöntemi',
    uygulanir: 'Özel kullanım, yeni inşaat, sigorta',
    nasil: 'Arsa değeri + yeniden yapım maliyeti − birikmiş amortisman.',
    avantaj: 'Emsal olmayan özgün yapılar için tek güvenilir yöntem.',
    dezavantaj: 'Amortisman hesabı subjektif; piyasa değeriyle örtüşmeyebilir.',
    ornekKullanim: 'Okullar, fabrikalar, tarihi yapılar, sigorta değerlemesi.',
  },
  {
    isim: 'İskontolu Nakit Akışı (DCF)',
    uygulanir: 'Büyük yatırım projeleri, karma kullanım',
    nasil: 'Gelecekteki nakit akışları piyasa iskonto oranıyla bugüne indirgenir; NPV hesaplanır.',
    avantaj: 'Çok dönemli projeksiyonlar için en kapsamlı analiz.',
    dezavantaj: 'Girdi hassasiyeti yüksek; yanlış iskonto oranı büyük sapma yaratır.',
    ornekKullanim: 'Proje finansmanı, satın alma-birleşme işlemleri.',
  },
];

const DEGERLEME_SURECI = [
  { adim: 'Görev Tanımı', detay: 'Amaç, değerleme tarihi ve kullanılacak değer tanımı (piyasa değeri, kira değeri, sigorta değeri) belirlenir.' },
  { adim: 'Veri Toplama', detay: 'Tapu kayıtları, imar durumu, yapı ruhsatı, iskan, kira sözleşmesi, yönetim planı.' },
  { adim: 'Fiziksel İnceleme', detay: 'Değerleme uzmanı taşınmazı yerinde inceler; yapı durumu, konum, komşular değerlendirilir.' },
  { adim: 'Piyasa Araştırması', detay: 'Emsal satışlar, kira anlaşmaları, arz-talep dengesi analizi.' },
  { adim: 'Yöntem Seçimi ve Hesaplama', detay: 'Bir veya birden fazla yöntem uygulanır; sonuçlar uzlaştırılır.' },
  { adim: 'Rapor Hazırlama', detay: 'SPK standartlarında 25+ sayfalık rapor; uluslararası değerleme standartları (IVS/EVS) referansı.' },
];

const SPK_KURALLAR = [
  'Değerleme uzmanı SPK lisanslı ve bağımsız olmalı; değerleme konusuyla çıkar çatışması olmamalı.',
  'Raporlar 3 yıl geçerli (ipotek değerlemelerinde yenileme daha kısa tutulabilir).',
  'Halka açık GYO ve GYF portföyleri yılda en az bir kez bağımsız değerlemeye tabi tutulur.',
  'Banka ipotek değerlemelerinde BDDK kılavuzuna uygun yöntem zorunlu.',
  'Değerleme raporunda en az iki yöntem uygulanmalı; sonuçlar uzlaştırılarak tek değer verilir.',
];

const HIZLAR_MALIYETLER = [
  { tip: 'Konut Değerlemesi (Banka/İpotek)', sure: '3–5 iş günü', maliyet: '₺1.500–₺3.500' },
  { tip: 'Ticari Gayrimenkul', sure: '5–10 iş günü', maliyet: '₺3.000–₺8.000' },
  { tip: 'Arsa Değerlemesi', sure: '3–7 iş günü', maliyet: '₺2.500–₺6.000' },
  { tip: 'Büyük Proje / GYO Portföyü', sure: '15–30 iş günü', maliyet: '₺15.000+' },
];

export default function TasinmazDegerlemePage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <Scale size={13} /> Değerleme Rehberi
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Taşınmaz Değerleme Yöntemleri
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            SPK lisanslı değerleme, emsal karşılaştırma, gelir indirgeme, maliyet ve DCF yöntemleri —
            hangi yöntem ne zaman kullanılır?
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-[#00C49F]">4</p>
              <p className="text-xs text-gray-400">Ana değerleme yöntemi</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">SPK</p>
              <p className="text-xs text-gray-400">Denetim otoritesi</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-400">3 Yıl</p>
              <p className="text-xs text-gray-400">Rapor geçerlilik süresi</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* Değerleme Yöntemleri */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Değerleme Yöntemleri</h2>
          <div className="space-y-4">
            {YONTEMLER.map((y, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <div className="flex items-start gap-3 mb-3">
                  <div className="bg-[#F0FDF8] text-[#00C49F] text-[10px] font-black px-2 py-1 rounded-lg shrink-0">{i + 1}</div>
                  <div>
                    <p className="text-xs font-black text-gray-900">{y.isim}</p>
                    <p className="text-[10px] text-gray-500">Uygulanır: {y.uygulanir}</p>
                  </div>
                </div>
                <p className="text-[10px] text-gray-600 leading-relaxed mb-2">{y.nasil}</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div className="bg-[#F0FDF8] rounded-lg p-2">
                    <p className="text-[10px] text-[#00C49F] font-bold mb-0.5">Avantaj</p>
                    <p className="text-[10px] text-gray-600">{y.avantaj}</p>
                  </div>
                  <div className="bg-rose-50 rounded-lg p-2">
                    <p className="text-[10px] text-rose-600 font-bold mb-0.5">Dezavantaj</p>
                    <p className="text-[10px] text-gray-600">{y.dezavantaj}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2">
                    <p className="text-[10px] text-gray-500 font-bold mb-0.5">Örnek Kullanım</p>
                    <p className="text-[10px] text-gray-600">{y.ornekKullanim}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Değerleme Süreci */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Değerleme Raporu Hazırlama Süreci</h2>
          <div className="space-y-3">
            {DEGERLEME_SURECI.map((s, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm flex items-start gap-3">
                <div className="bg-[#F0FDF8] text-[#00C49F] text-[10px] font-black px-2 py-1 rounded-lg shrink-0">{i + 1}</div>
                <div>
                  <p className="text-xs font-black text-gray-900 mb-0.5">{s.adim}</p>
                  <p className="text-[10px] text-gray-600 leading-relaxed">{s.detay}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Hız ve Maliyet */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Değerleme Süresi ve Maliyeti</h2>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full text-xs">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-4 py-3 font-black text-gray-700">Değerleme Türü</th>
                  <th className="text-left px-4 py-3 font-black text-gray-700">Süre</th>
                  <th className="text-left px-4 py-3 font-black text-[#00C49F]">Tahmini Maliyet</th>
                </tr>
              </thead>
              <tbody>
                {HIZLAR_MALIYETLER.map((r, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-4 py-3 font-bold text-gray-800">{r.tip}</td>
                    <td className="px-4 py-3 text-gray-600">{r.sure}</td>
                    <td className="px-4 py-3 font-bold text-[#00C49F]">{r.maliyet}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* SPK Kurallar */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle size={14} className="text-[#00C49F]" /> SPK Değerleme Standartları
          </h2>
          <ul className="space-y-2.5">
            {SPK_KURALLAR.map((r, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle size={11} className="text-[#00C49F] shrink-0 mt-0.5" />
                <p className="text-[10px] text-gray-600 leading-relaxed">{r}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Warning */}
        <section className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <AlertTriangle size={14} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 leading-relaxed">
            <span className="font-black">Önemli:</span> Banka ipotek değerlemesi için bankanın anlaşmalı ekspertiz firmalarından biri kullanılmalıdır. Bireysel olarak yaptırılan değerleme raporu bankalar tarafından kabul edilmeyebilir.
          </p>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Araçlar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/ekspertiz-raporu', label: 'Ekspertiz Raporu Rehberi' },
              { href: '/valuation', label: 'Değerleme Aracı' },
              { href: '/satilik-ev-degeri', label: 'Ev Değeri Hesapla' },
              { href: '/yatirim-npv', label: 'NPV / IRR Hesaplayıcı' },
              { href: '/yatirim-getiri-simulatoru', label: 'Yatırım Getiri Simülatörü' },
              { href: '/konut-sigortasi', label: 'Konut Sigortası Rehberi' },
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
