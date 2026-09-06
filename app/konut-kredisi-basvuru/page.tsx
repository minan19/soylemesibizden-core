import { Metadata } from 'next';
import Link from 'next/link';
import { CreditCard, CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Konut Kredisi Başvuru Rehberi 2024 | Belgeler, Süreç, Kredi Skoru | Söylemesi Bizden',
  description:
    'Konut kredisi başvuru rehberi: gerekli belgeler, kredi skoru, banka seçimi, LTV oranı ve başvuru süreci adım adım.',
};

const BASVURU_ADIMLARI = [
  {
    adim: '1. Kredi Limitini Belirle',
    aciklama: 'Bankaların LTV (Loan-to-Value) oranı genellikle %80 (ilk konut) veya %75\'tir. Aylık taksit net gelirinizin %40\'ını geçemez.',
  },
  {
    adim: '2. Belgeleri Hazırla',
    aciklama: 'Gelir, kimlik ve tapu belgelerini toplayın. Eksik belge başvuruyu geciktirir; tam liste için başvurduğunuz bankayla önceden iletişime geçin.',
  },
  {
    adim: '3. Birden Fazla Bankaya Başvur',
    aciklama: '2–3 bankaya aynı anda başvurabilirsiniz. Çoklu kredi başvurusu kısa vadede kredi skorunu düşürür ancak en iyi faizi bulmak için gereklidir.',
  },
  {
    adim: '4. Ekspertiz Süreci',
    aciklama: 'Banka, SPK lisanslı ekspertiz ister. Ekspertiz değeri satış fiyatının altında çıkarsa kredi tutarı ekspertize göre belirlenir.',
  },
  {
    adim: '5. Sigorta Yaptır',
    aciklama: 'DASK (zorunlu) ve konut sigortası banka onayından önce yapılmalıdır. Hayat sigortası bazı bankalarda zorunlu, diğerlerinde önerilen.',
  },
  {
    adim: '6. Sözleşme ve Tapu',
    aciklama: 'Kredi sözleşmesini imzalayın; aynı gün tapu devri gerçekleşir. Banka mülk üzerine ipotek tesis eder.',
  },
];

const BELGELER = [
  { kategori: 'Kimlik', belgeler: ['Nüfus cüzdanı / Pasaport fotokopisi', 'SGK kayıt belgesi'] },
  { kategori: 'Gelir (Çalışanlar)', belgeler: ['İşveren maaş bordrosu (son 3 ay)', 'SGK hizmet dökümü', 'İşveren yazısı (aylık net maaş)'] },
  { kategori: 'Gelir (Serbest Meslek)', belgeler: ['Vergi levhası', 'Son 2 yıl beyanname', 'Muhasebeci onaylı gelir tablosu'] },
  { kategori: 'Mülk', belgeler: ['Tapu fotokopisi (veya alım sözleşmesi)', 'İskan belgesi (yapı kullanım izni)', 'Kat mülkiyet/irtifak belgesi'] },
];

const KREDI_SKORU_BILGISI = [
  { aralik: '1900+', durum: 'Mükemmel', aciklama: 'En düşük faiz ve en yüksek kredi limitine erişim' },
  { aralik: '1700–1900', durum: 'İyi', aciklama: 'Çoğu bankadan onay; rekabetçi faiz' },
  { aralik: '1500–1700', durum: 'Orta', aciklama: 'Onay alınabilir; kefil veya ek teminat istenebilir' },
  { aralik: '1200–1500', durum: 'Düşük', aciklama: 'Onay güçleşir; yüksek faiz veya red' },
  { aralik: '1200 Altı', durum: 'Çok Düşük', aciklama: 'Banka kredisi çok zor; özel çözümler gerekir' },
];

const KREDI_SKORU_IYILESTIRME = [
  'Mevcut kredi kartı limitinin %30\'unun altında kullanın',
  'Düzenli ve zamanında ödeme yapın; gecikme skorunuzu düşürür',
  'Kullanmadığınız ancak aktif kartları kapatmayın (limit geçmişi pozitif)',
  'Kısa sürede çok fazla kredi başvurusu yapmaktan kaçının',
  'Bireysel veya ticari kredi borcunuzu azaltın',
];

const DIKKAT_EDILECEKLER = [
  { konu: 'LTV Oranı', aciklama: 'Maksimum %80 (2024). Mülk değerinin %20\'si peşin ödenmeli.' },
  { konu: 'Değişken vs. Sabit Faiz', aciklama: 'Sabit faiz: bütçe öngörülebilir. Değişken faiz: düşüşe döneminde avantajlı ama kur ve TCMB politikasına bağlı.' },
  { konu: 'Erken Ödeme', aciklama: '2024: Bankalara ödenen anapara için %2 erken ödeme komisyonu mümkün. Sözleşmeyi dikkatlice okuyun.' },
  { konu: 'Hayat Sigortası', aciklama: 'Zorunlu değilse banka hayat sigortasını sözleşmeye ekleyebilir; kendi seçtiğiniz sigorta daha ucuz olabilir.' },
  { konu: 'Dosya Ücreti', aciklama: 'Kredi tutarının %1–2\'si arasında dosya ücreti alınabilir. "Ücretsiz" teklifleri FAZ dışı diğer maliyetler için karşılaştırın.' },
];

export default function KonutKredisiBasvuruPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <CreditCard size={13} /> Konut Kredisi Başvurusu
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Konut Kredisi Başvuru Rehberi 2024
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            Gerekli belgeler, kredi skoru, LTV oranı ve başvuru süreci hakkında kapsamlı rehber.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-[#00C49F]">%80</p>
              <p className="text-xs text-gray-400">Maks. LTV oranı</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">%40</p>
              <p className="text-xs text-gray-400">Maks. taksit/gelir</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-400">1700+</p>
              <p className="text-xs text-gray-400">İyi kredi skoru</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* Başvuru Adımları */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Başvuru Süreci</h2>
          <div className="space-y-3">
            {BASVURU_ADIMLARI.map((a, i) => (
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

        {/* Gerekli Belgeler */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Gerekli Belgeler</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {BELGELER.map((b, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <p className="text-xs font-black text-gray-900 mb-3">{b.kategori}</p>
                <div className="space-y-2">
                  {b.belgeler.map((belge, j) => (
                    <div key={j} className="flex items-start gap-2">
                      <CheckCircle size={12} className="text-[#00C49F] shrink-0 mt-0.5" />
                      <p className="text-[10px] text-gray-700">{belge}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Kredi Skoru */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4">Kredi Skoru Aralıkları</h2>
          <div className="space-y-2">
            {KREDI_SKORU_BILGISI.map((k, i) => (
              <div key={i} className="grid grid-cols-3 gap-2 py-2 border-b border-gray-50 last:border-0">
                <p className="text-xs font-black text-gray-900">{k.aralik}</p>
                <span className={`text-[10px] font-black px-2 py-0.5 rounded self-start ${
                  k.durum === 'Mükemmel' ? 'bg-[#F0FDF8] text-[#00C49F]' :
                  k.durum === 'İyi' ? 'bg-blue-50 text-blue-600' :
                  k.durum === 'Orta' ? 'bg-amber-50 text-amber-600' :
                  'bg-rose-50 text-rose-600'
                }`}>{k.durum}</span>
                <p className="text-[10px] text-gray-500 leading-relaxed">{k.aciklama}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Kredi Skoru İyileştirme */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle size={14} className="text-[#00C49F]" /> Kredi Skoru İyileştirme
          </h2>
          <div className="space-y-2">
            {KREDI_SKORU_IYILESTIRME.map((k, i) => (
              <div key={i} className="flex items-start gap-2 py-2 border-b border-gray-50 last:border-0">
                <CheckCircle size={12} className="text-[#00C49F] shrink-0 mt-0.5" />
                <p className="text-xs text-gray-700 leading-relaxed">{k}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Dikkat Edilecekler */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Dikkat Edilecek Konular</h2>
          <div className="space-y-3">
            {DIKKAT_EDILECEKLER.map((d, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                <p className="text-xs font-black text-gray-900 mb-1">{d.konu}</p>
                <p className="text-[10px] text-gray-600 leading-relaxed">{d.aciklama}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Uyarı */}
        <section className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <AlertTriangle size={14} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 leading-relaxed">
            <span className="font-black">Önemli:</span> Konut kredisi başvurusu öncesi toplam maliyeti hesaplayın: faiz, dosya ücreti, sigorta ve tapu masrafları. Farklı bankaların Yıllık Maliyet Oranı (YMO) değerlerini karşılaştırmak, sadece faiz oranını karşılaştırmaktan daha doğru bir karar vermenizi sağlar.
          </p>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Araçlar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/mortgage-simulatoru', label: 'Mortgage Simülatörü' },
              { href: '/banka-kredileri', label: 'Banka Kredileri Karşılaştırma' },
              { href: '/odeme-plani', label: 'Ödeme Planı Simülatörü' },
              { href: '/konut-kredisi-rehberi', label: 'Konut Kredisi Rehberi' },
              { href: '/satinalma-maliyeti', label: 'Satın Alma Maliyeti' },
              { href: '/ev-alma-rehberi', label: 'Ev Alma Rehberi' },
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
