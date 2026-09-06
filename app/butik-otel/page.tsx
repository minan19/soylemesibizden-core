import { Metadata } from 'next';
import Link from 'next/link';
import { Star, TrendingUp, AlertTriangle, ArrowRight, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Butik Otel Yatırımı | Turizm Lisansı, Getiri Analizi, Bölge | Söylemesi Bizden',
  description:
    'Butik otel yatırımı: Kültür ve Turizm Bakanlığı lisansı, bölge bazlı doluluk ve RevPAR analizi, maliyet ve getiri hesabı.',
};

const BOLGE_ANALIZI = [
  { bolge: 'Bodrum', oda: '20–40', revpar: '4.500 ₺', doluluk: '%72', adr: '6.500 ₺', not: 'Premium. Yabancı turist yoğun.' },
  { bolge: 'Alaçatı', oda: '10–20', revpar: '5.200 ₺', doluluk: '%68', adr: '7.800 ₺', not: 'Lifestyle & gastronomi odak.' },
  { bolge: 'Fethiye / Kayaköy', oda: '8–20', revpar: '3.200 ₺', doluluk: '%65', adr: '5.000 ₺', not: 'Doğa turizmi + İngiliz turist.' },
  { bolge: 'Kapadokya', oda: '10–20', revpar: '4.800 ₺', doluluk: '%70', adr: '7.000 ₺', not: 'Yıl boyu turizm. Kaya oda prim.' },
  { bolge: 'İstanbul — Tarihi Yarımada', oda: '15–30', revpar: '5.500 ₺', doluluk: '%78', adr: '7.200 ₺', not: 'Yüksek doluluk, sıkı lisans.' },
];

const LISANS_ASAMALARI = [
  { adim: '1. Ön İzin', aciklama: 'Kültür ve Turizm Bakanlığı\'na turizm amaçlı tesis başvurusu. Bölge, kapasite ve sınıf belirlenir. Mimari proje gerekli.' },
  { adim: '2. İnşaat / Dönüşüm', aciklama: 'Ruhsatlı yapı üzerinde otel standartlarına uygun donanım: yangın sistemi, erişilebilirlik, teknik altyapı.' },
  { adim: '3. Sınıf Tespiti', aciklama: 'Bakanlık müfettişi yerinde inceleme yapar; yıldız/özel tesis sınıfı belirlenir. Oda sayısı ve donanım kıstasları etkiler.' },
  { adim: '4. Turizm İşletmesi Belgesi', aciklama: 'Nihai belge; ticari faaliyet için zorunlu. Belge olmadan yasal olarak turizm tesisi işletilemez.' },
  { adim: '5. Yenileme', aciklama: 'Belge her yıl vize ile yenilenir; standartlar değişirse yeniden teftiş gerekebilir.' },
];

const GETIRI_HESABI = [
  { kalem: 'Toplam Yatırım (20 oda × 25m²)', deger: '30.000.000 ₺', aciklama: '500 m² × 60.000 ₺/m² otel düzeyinde' },
  { kalem: 'Yıllık Brüt Gelir', deger: '18.000.000 ₺', aciklama: '20 oda × 250 gece × 3.600 ₺/gece ortlm.' },
  { kalem: 'İşletme Giderleri (%45)', deger: '−8.100.000 ₺', aciklama: 'Personel, gıda, enerji, bakım, komisyon' },
  { kalem: 'Faiz Giderleri (%50 kredi)', deger: '−2.400.000 ₺', aciklama: '15M × %16 yıllık faiz' },
  { kalem: 'EBITDA', deger: '7.500.000 ₺', aciklama: 'Faiz-Vergi-Amortisman öncesi' },
  { kalem: 'Net Gelir (vergi sonrası tahm.)', deger: '5.250.000 ₺', aciklama: '%30 efektif vergi sonrası' },
];

const MALIYET_KALEMLERI = [
  { kalem: 'İnşaat / Tadilat', oran: '%50–60', aciklama: 'Otel kalitesinde yapı maliyeti m² başına 45.000–80.000 ₺.' },
  { kalem: 'FF&E (Mobilya/Demirbaş)', oran: '%15–20', aciklama: 'Oda başına 150.000–400.000 ₺ lüks düzeyine göre.' },
  { kalem: 'Lisans ve Bürokratik', oran: '%3–5', aciklama: 'Turizm belgesi, yangın, sağlık, belediye harçları.' },
  { kalem: 'İşletme Sermayesi', oran: '%10–15', aciklama: 'İlk 6–12 aylık operasyon için dönen sermaye rezervi.' },
  { kalem: 'Pazarlama ve OTA', oran: '%5–8', aciklama: 'Booking.com, Airbnb (%12–18 komisyon) ve dijital pazarlama.' },
];

const RISKLER = [
  'Sezonsal doluluk boşlukları — düşük sezonda operasyon maliyeti sabit',
  'Turizm krizleri (pandemi, siyasi gerginlik) anında gelir kaybı',
  'Personel bulma ve tutma zorluğu turizm bölgelerinde',
  'Platform komisyonları kâr marjını erodur (%15–25)',
  'Kur riski — maliyet TL, gelir kısmen döviz',
  'Yenileme yükümlülüğü — her 5–7 yılda FF&E yenilemesi',
];

export default function ButikOtelPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <Star size={13} /> Butik Otel Yatırımı
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Butik Otel Yatırım Rehberi
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            Bölge bazlı RevPAR analizi, Kültür Bakanlığı lisans süreci, maliyet kalemleri ve yatırım getirisi.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-[#00C49F]">5.500 ₺</p>
              <p className="text-xs text-gray-400">İstanbul RevPAR</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">%72</p>
              <p className="text-xs text-gray-400">Bodrum doluluk</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-400">5 Adım</p>
              <p className="text-xs text-gray-400">Turizm belgesi süreci</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* Bölge Analizi */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Bölge Bazlı Performans Analizi</h2>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="grid grid-cols-5 gap-1 px-4 py-2 bg-gray-50 text-[9px] font-black text-gray-500 uppercase">
              <span className="col-span-2">Bölge</span>
              <span className="text-right">RevPAR</span>
              <span className="text-right">Doluluk</span>
              <span className="text-right">ADR</span>
            </div>
            {BOLGE_ANALIZI.map((b, i) => (
              <div key={i} className="grid grid-cols-5 gap-1 px-4 py-3 border-t border-gray-50">
                <div className="col-span-2">
                  <p className="text-xs font-black text-gray-900">{b.bolge}</p>
                  <p className="text-[10px] text-gray-400">{b.not}</p>
                </div>
                <p className="text-[10px] font-black text-[#00C49F] text-right self-center">{b.revpar}</p>
                <p className="text-[10px] font-bold text-gray-700 text-right self-center">{b.doluluk}</p>
                <p className="text-[10px] font-bold text-gray-700 text-right self-center">{b.adr}</p>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-gray-400 mt-2">* RevPAR = Oda Başına Gelir. ADR = Ortalama Günlük Oda Ücreti. 2024 yüksek sezon tahmini.</p>
        </section>

        {/* Lisans Süreci */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Turizm İşletmesi Belgesi Süreci</h2>
          <div className="space-y-3">
            {LISANS_ASAMALARI.map((a, i) => (
              <div key={i} className="flex gap-4 bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                <div className="w-8 h-8 rounded-full bg-[#00C49F] text-white text-xs font-black flex items-center justify-center shrink-0">{i + 1}</div>
                <div>
                  <p className="text-xs font-black text-gray-900 mb-1">{a.adim}</p>
                  <p className="text-[10px] text-gray-600 leading-relaxed">{a.aciklama}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Getiri Hesabı */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-1 flex items-center gap-2">
            <TrendingUp size={14} className="text-[#00C49F]" /> Örnek Getiri Hesabı (20 Odalı Bodrum Butik Otel)
          </h2>
          <p className="text-[10px] text-gray-400 mb-4">30M ₺ toplam yatırım, %50 banka kredisi senaryosu</p>
          <div className="space-y-2">
            {GETIRI_HESABI.map((g, i) => (
              <div key={i} className={`flex items-center justify-between py-2 border-b border-gray-50 last:border-0 ${i === GETIRI_HESABI.length - 1 ? 'bg-[#F0FDF8] rounded-lg px-3' : ''}`}>
                <div>
                  <p className={`text-xs font-black ${i === GETIRI_HESABI.length - 1 ? 'text-[#00C49F]' : 'text-gray-900'}`}>{g.kalem}</p>
                  <p className="text-[9px] text-gray-400">{g.aciklama}</p>
                </div>
                <p className={`text-xs font-black ${g.deger.startsWith('-') ? 'text-rose-600' : i === GETIRI_HESABI.length - 1 ? 'text-[#00C49F]' : 'text-gray-800'}`}>{g.deger}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Maliyet Kalemleri */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Yatırım Maliyet Kalemleri</h2>
          <div className="space-y-3">
            {MALIYET_KALEMLERI.map((m, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs font-black text-gray-900">{m.kalem}</p>
                  <span className="text-[10px] bg-amber-50 text-amber-600 font-black px-2 py-0.5 rounded">{m.oran}</span>
                </div>
                <p className="text-[10px] text-gray-600 leading-relaxed">{m.aciklama}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Riskler */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle size={14} className="text-[#00C49F]" /> Temel Riskler
          </h2>
          <div className="space-y-2">
            {RISKLER.map((r, i) => (
              <div key={i} className="flex items-start gap-2 py-2 border-b border-gray-50 last:border-0">
                <div className="w-2 h-2 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                <p className="text-xs text-gray-700 leading-relaxed">{r}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Uyarı */}
        <section className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <AlertTriangle size={14} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 leading-relaxed">
            <span className="font-black">Önemli:</span> Butik otel yatırımı uzun vadeli ve operasyona bağımlı bir iştir. Turizm işletmesi belgesi olmadan faaliyet yasal değildir. Mülk alımı veya tadilat başlamadan önce KTB bölge müdürlüğüne ön görüşme talebiyle başvurun.
          </p>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Araçlar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/turizm-yatirimi', label: 'Turizm Yatırımı Analizi' },
              { href: '/tatil-konutu', label: 'Tatil Konutu Yatırımı' },
              { href: '/yatirim-analizi', label: 'Yatırım ROI Analizi' },
              { href: '/kira-geliri-vergisi', label: 'Kira Geliri Vergisi' },
              { href: '/vergi-planlama', label: 'Vergi Planlama' },
              { href: '/rehber/yatirim-rehberi', label: 'Yatırım Rehberi' },
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
