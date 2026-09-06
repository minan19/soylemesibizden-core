import { Metadata } from 'next';
import Link from 'next/link';
import { Search, CheckCircle, AlertTriangle, ArrowRight, Scale } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Gayrimenkul Değerleme Rehberi | SPK Ekspertiz, Yöntemler | Söylemesi Bizden',
  description:
    'Gayrimenkul değerleme: emsal karşılaştırma, gelir kapitalizasyonu, maliyet yöntemi. SPK lisanslı ekspertiz süreci ve değeri etkileyen faktörler.',
};

const DEGERLEME_YONTEMLERI = [
  {
    yontem: 'Emsal Karşılaştırma Yöntemi',
    aciklama: 'Aynı bölgede benzer özelliklere sahip satılmış veya piyasadaki mülklerin fiyatlarıyla karşılaştırma yapılır. En yaygın ve güvenilir yöntem.',
    uygun: 'Konut, arsa, ticari gayrimenkul',
    hassasiyet: 'Yüksek (yeterli emsal varsa)',
    spkKullanimi: 'Sık',
  },
  {
    yontem: 'Gelir Kapitalizasyonu Yöntemi',
    aciklama: 'Mülkün gelecekte üretmesi beklenen net kira geliri, bir kapitalizasyon oranıyla bugünkü değere indirgenir. Kiralık ticari mülkler için idealdir.',
    uygun: 'Kiralık ticari, otel, alışveriş merkezi',
    hassasiyet: 'Orta–Yüksek (kira verisi gerektir)',
    spkKullanimi: 'Ticari mülklerde',
  },
  {
    yontem: 'Maliyet (İkame) Yöntemi',
    aciklama: 'Arsa değeri + yapıyı yeniden inşa etme maliyeti — fiziksel ve ekonomik amortisman. Özel yapılar için kullanılır.',
    uygun: 'Fabrika, özel bina, sigorta değerlemesi',
    hassasiyet: 'Orta (amortisman tahmini subjektiftir)',
    spkKullanimi: 'Nadir',
  },
  {
    yontem: 'İndirgenmiş Nakit Akışı (DCF)',
    aciklama: 'Gelecek dönemlerdeki nakit akışları iskonto oranıyla bugüne indirgenerek yatırım değeri hesaplanır. Karmaşık ama kapsamlı.',
    uygun: 'Büyük yatırım portföyleri, GYO\'lar',
    hassasiyet: 'Çok Yüksek (varsayımlara hassas)',
    spkKullanimi: 'Kurumsal yatırımlarda',
  },
];

const DEGER_FAKTORLERI = [
  { faktor: 'Konum (Lokasyon)', agirlik: 'Çok Yüksek', aciklama: 'Metro mesafesi, okul-hastane yakınlığı, semt prestiji. En belirleyici tek faktör.' },
  { faktor: 'Alan ve Kat Düzeni', agirlik: 'Yüksek', aciklama: 'Net m², oda sayısı, tavan yüksekliği, cephe (güney/kuzey), kat yüksekliği.' },
  { faktor: 'Bina Yaşı ve Durumu', agirlik: 'Yüksek', aciklama: 'Depreme dayanıklılık, son tadilat, ısı yalıtımı, asansör/otopark varlığı.' },
  { faktor: 'İmar Durumu', agirlik: 'Orta–Yüksek', aciklama: 'Konut mu ticari mi? KAKS/TAKS kısıtları mülkün geliştirme potansiyelini belirler.' },
  { faktor: 'Piyasa Koşulları', agirlik: 'Orta', aciklama: 'Faiz ortamı, arz/talep dengesi, bölgedeki son satışlar ve beklentiler.' },
  { faktor: 'Hukuki Durum', agirlik: 'Kritik', aciklama: 'Tapu türü, ipotek/haciz varlığı, kat mülkiyeti/irtifakı. Değeri doğrudan etkiler.' },
];

const SPK_SURECI = [
  { adim: '1. Başvuru', aciklama: 'SPK lisanslı değerleme şirketiyle sözleşme imzalanır. Ücret tapu değeri ve mülk tipine göre değişir (genellikle 2.500–10.000 ₺).' },
  { adim: '2. Saha Ziyareti', aciklama: 'Eksper mülkü yerinde inceler; fotoğraflar, ölçümler, bina durumu kayıt altına alınır.' },
  { adim: '3. Veri Toplama', aciklama: 'Tapu bilgileri, imar durumu, emsal satışlar, kira sözleşmeleri ve piyasa verileri derlenir.' },
  { adim: '4. Analiz', aciklama: 'Seçilen yöntemler uygulanır; sonuçlar koordinasyon edilerek nihai değer belirlenir.' },
  { adim: '5. Rapor', aciklama: 'SPK standartlarına uygun rapor hazırlanır (genellikle 5–10 iş günü). Banka kredisi için zorunludur.' },
];

const EMSAL_KARSILASTIRMA = [
  { kriter: 'Lokasyon benzerliği', agirlik: '%30–40', aciklama: 'Aynı mahalle veya çok yakın bölge; cadde/sokak farkı bile %10–15 etki yapar.' },
  { kriter: 'Alan benzerliği', agirlik: '%20–25', aciklama: '±20% alan farkı kabul edilebilir; daha fazla sapma düzeltme katsayısı gerektirir.' },
  { kriter: 'Yaş / Kalite', agirlik: '%15–20', aciklama: 'Bina yaşı, tadilat durumu ve yapı kalitesi emsal düzeltmesini etkiler.' },
  { kriter: 'Kat ve Cephe', agirlik: '%10–15', aciklama: 'Üst katlar ve güney cephe genellikle %5–15 prim taşır.' },
  { kriter: 'Satış tarihi', agirlik: '%5–10', aciklama: '6 ay önceki satışlar enflasyon düzeltmesiyle güncellenir.' },
];

const PRATIK_IPUCU = [
  'Bankanın ekspertiz değeri ile piyasa değeri farklı olabilir; ekspertiz değeri genellikle daha muhafazakardır.',
  'Satış fiyatını tapu beyan değerinin çok altında göstermek yaptırım riskidir; emsal değer esastır.',
  'Değerleme raporunda yapılan varsayımları ve kullanılan emsal satışları okuyun.',
  'Aynı mülk için farklı SPK şirketlerinden ±10–20% farklı değer çıkabilir; ikinci görüş alınabilir.',
  'Kentsel dönüşüm bölgelerinde riskli yapı tespiti sonrası değer ani düşüş gösterebilir.',
];

export default function GayrimenkulDegerlemePage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <Search size={13} /> Gayrimenkul Değerleme
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Gayrimenkul Değerleme Rehberi
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            SPK lisanslı ekspertiz süreci, değerleme yöntemleri ve mülk değerini etkileyen faktörler.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-[#00C49F]">4</p>
              <p className="text-xs text-gray-400">Değerleme yöntemi</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">5–10</p>
              <p className="text-xs text-gray-400">Gün rapor süresi</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-400">SPK</p>
              <p className="text-xs text-gray-400">Lisanslı ekspertiz</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* Yöntemler */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Değerleme Yöntemleri</h2>
          <div className="space-y-4">
            {DEGERLEME_YONTEMLERI.map((y, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <p className="text-xs font-black text-gray-900 mb-2">{y.yontem}</p>
                <p className="text-[10px] text-gray-600 mb-3 leading-relaxed">{y.aciklama}</p>
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-gray-50 rounded-lg p-2">
                    <p className="text-[9px] text-gray-400 font-bold mb-0.5">Uygun Mülk</p>
                    <p className="text-[10px] text-gray-700">{y.uygun}</p>
                  </div>
                  <div className="bg-[#F0FDF8] rounded-lg p-2">
                    <p className="text-[9px] text-[#00C49F] font-bold mb-0.5">Hassasiyet</p>
                    <p className="text-[10px] text-gray-700">{y.hassasiyet}</p>
                  </div>
                  <div className="bg-amber-50 rounded-lg p-2">
                    <p className="text-[9px] text-amber-600 font-bold mb-0.5">SPK Kullanımı</p>
                    <p className="text-[10px] text-gray-700">{y.spkKullanimi}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Değer Faktörleri */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Değeri Etkileyen Faktörler</h2>
          <div className="space-y-3">
            {DEGER_FAKTORLERI.map((f, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                <div className="flex items-start justify-between mb-1">
                  <p className="text-xs font-black text-gray-900">{f.faktor}</p>
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded ml-2 shrink-0 ${
                    f.agirlik === 'Çok Yüksek' ? 'bg-rose-50 text-rose-600' :
                    f.agirlik === 'Yüksek' ? 'bg-amber-50 text-amber-600' :
                    f.agirlik === 'Kritik' ? 'bg-purple-50 text-purple-600' :
                    'bg-gray-100 text-gray-600'
                  }`}>{f.agirlik}</span>
                </div>
                <p className="text-[10px] text-gray-600 leading-relaxed">{f.aciklama}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SPK Süreci */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">SPK Lisanslı Ekspertiz Süreci</h2>
          <div className="space-y-3">
            {SPK_SURECI.map((s, i) => (
              <div key={i} className="flex gap-4 bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                <div className="w-8 h-8 rounded-full bg-[#00C49F] text-white text-xs font-black flex items-center justify-center shrink-0">{i + 1}</div>
                <div>
                  <p className="text-xs font-black text-gray-900 mb-1">{s.adim}</p>
                  <p className="text-[10px] text-gray-600 leading-relaxed">{s.aciklama}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Emsal Karşılaştırma Ağırlıkları */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <Scale size={14} className="text-[#00C49F]" /> Emsal Karşılaştırma Kriterleri
          </h2>
          <div className="space-y-3">
            {EMSAL_KARSILASTIRMA.map((e, i) => (
              <div key={i} className="py-2 border-b border-gray-50 last:border-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs font-black text-gray-900">{e.kriter}</p>
                  <span className="text-[10px] bg-[#F0FDF8] text-[#00C49F] font-black px-2 py-0.5 rounded">{e.agirlik}</span>
                </div>
                <p className="text-[10px] text-gray-600 leading-relaxed">{e.aciklama}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pratik İpuçları */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle size={14} className="text-[#00C49F]" /> Pratik İpuçları
          </h2>
          <div className="space-y-2">
            {PRATIK_IPUCU.map((ip, i) => (
              <div key={i} className="flex items-start gap-2 py-2 border-b border-gray-50 last:border-0">
                <CheckCircle size={12} className="text-[#00C49F] shrink-0 mt-0.5" />
                <p className="text-xs text-gray-700 leading-relaxed">{ip}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Uyarı */}
        <section className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <AlertTriangle size={14} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 leading-relaxed">
            <span className="font-black">Önemli:</span> Banka kredi sürecinde zorunlu olan ekspertiz, mülkün satışına izin vermek veya değerini onaylamak anlamına gelmez. Ekspertiz değeri piyasa değerinden %10–30 sapabilir; alım kararını tek başına belirlemeyin.
          </p>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Araçlar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/ekspertiz-raporu', label: 'Ekspertiz Raporu Rehberi' },
              { href: '/ev-degerleme', label: 'Ev Değerleme Rehberi' },
              { href: '/tasinmaz-degerleme', label: 'Taşınmaz Değerleme' },
              { href: '/konut-analizi', label: 'Konut Yatırım Analizi' },
              { href: '/emlak-piyasasi', label: 'Emlak Piyasası' },
              { href: '/yatirim-analizi', label: 'Yatırım Analizi' },
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
