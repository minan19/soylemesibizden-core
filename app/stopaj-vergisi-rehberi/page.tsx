import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, AlertTriangle, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Stopaj Vergisi Rehberi | Kira Stopajı, Gayrimenkul Vergileri | Söylemesi Bizden',
  description:
    'Kira stopaj vergisi nedir, ne zaman ödenir? İşyeri kiralarında %20 stopaj, konut kiralarında vergi beyanı ve muafiyet sınırları hakkında kapsamlı rehber.',
};

const STOPAJ_TURLERI = [
  {
    tur: 'İşyeri Kira Stopajı',
    oran: '%20',
    kimOder: 'Kiracı (kurumsal)',
    nasil: 'Kiracı kurumsal ise brüt kira üzerinden %20 stopaj keserek vergi dairesine öder; mal sahibine kalan net kira verilir.',
    ornek: 'Brüt kira: 50.000 ₺ → Stopaj: 10.000 ₺ → Net ödeme: 40.000 ₺',
  },
  {
    tur: 'Konut Kira Geliri Vergisi',
    oran: 'Dilimli (%15–%40)',
    kimOder: 'Mal sahibi (beyan yoluyla)',
    nasil: 'Konut kiralarında stopaj yoktur; mal sahibi yıllık gelir vergisi beyannamesi ile beyan eder. 2024 istisna tutarı: 33.000 ₺.',
    ornek: 'Yıllık kira: 120.000 ₺ – İstisna: 33.000 ₺ = Vergiye tabi: 87.000 ₺',
  },
  {
    tur: 'Gayrimenkul Sermaye İradı',
    oran: '%15–%40',
    kimOder: 'Mal sahibi',
    nasil: 'Kira gelirleri Gelir Vergisi Kanunu kapsamında "Gayrimenkul Sermaye İradı" olarak beyan edilir.',
    ornek: 'Götürü gider yöntemi: Beyan edilen gelirin %15\'i gider sayılır.',
  },
];

const ISTISNA_BILGISI = [
  { yil: 2024, tutarTL: 33000, aciklama: '2024 yılı konut kira geliri istisna tutarı; bu tutara kadar gelir vergisi ödenmez.' },
  { yil: 2023, tutarTL: 21000, aciklama: '2023 yılı istisna tutarı' },
  { yil: 2022, tutarTL: 9500, aciklama: '2022 yılı istisna tutarı' },
  { yil: 2021, tutarTL: 7000, aciklama: '2021 yılı istisna tutarı' },
];

const VERGI_DILIMLERI_2024 = [
  { aralik: '0 – 110.000 ₺', oran: '%15' },
  { aralik: '110.001 – 230.000 ₺', oran: '%20' },
  { aralik: '230.001 – 580.000 ₺', oran: '%27' },
  { aralik: '580.001 – 3.000.000 ₺', oran: '%35' },
  { aralik: '3.000.001 ₺ ve üzeri', oran: '%40' },
];

const GIDER_YONTEMLERI = [
  {
    yontem: 'Götürü Gider',
    oran: '%15',
    avantaj: 'Belge gerekmez; basit hesaplama',
    dezavantaj: 'Gerçek giderler yüksekse dezavantajlı',
    kimIcinUygun: 'Giderleri düşük olanlar için',
  },
  {
    yontem: 'Gerçek Gider',
    oran: 'Belgeye dayalı',
    avantaj: 'Faiz, amortisman, tamir, sigorta, vergi giderleri düşülür',
    dezavantaj: 'Belge toplamak ve beyan karmaşıklığı',
    kimIcinUygun: 'Kredili alımlar ve yüksek giderliler için',
  },
];

const BEYAN_TAKVIMI = [
  { is: 'Yıllık Gelir Vergisi Beyannamesi', tarih: 'Mart sonu', aciklama: 'Bir önceki yılın kira gelirleri Mart ayı sonuna kadar beyan edilir.' },
  { is: 'İlk Taksit Ödemesi', tarih: 'Mart sonu', aciklama: 'Hesaplanan verginin birinci taksiti beyanname ile ödenir.' },
  { is: 'İkinci Taksit Ödemesi', tarih: 'Temmuz sonu', aciklama: 'Kalan verginin ikinci taksiti Temmuz ayı sonuna kadar ödenir.' },
  { is: 'İşyeri Stopaj Beyanı', tarih: 'Aylık (26. gün)', aciklama: 'Muhtasar beyanname ile aylık olarak verilir.' },
];

export default function StopajVergisiRehberiPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <CheckCircle size={13} /> Vergi Rehberi
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Stopaj Vergisi ve Kira Geliri Vergisi Rehberi
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            İşyeri kira stopajı, konut kira geliri beyanı, istisna tutarları ve vergi dilimleri hakkında kapsamlı bilgi.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-[#00C49F]">%20</p>
              <p className="text-xs text-gray-400">İşyeri stopajı</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">33.000 ₺</p>
              <p className="text-xs text-gray-400">2024 konut istisnası</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-400">Mart</p>
              <p className="text-xs text-gray-400">Beyan ayı</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* Stopaj Türleri */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Stopaj ve Vergi Türleri</h2>
          <div className="space-y-4">
            {STOPAJ_TURLERI.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <div className="flex items-start justify-between mb-2">
                  <p className="text-xs font-black text-gray-900">{t.tur}</p>
                  <span className="text-xs font-black text-[#00C49F] shrink-0">{t.oran}</span>
                </div>
                <p className="text-[10px] text-gray-500 mb-2">Kim öder: <span className="font-bold text-gray-700">{t.kimOder}</span></p>
                <p className="text-[10px] text-gray-600 leading-relaxed mb-2">{t.nasil}</p>
                <div className="bg-gray-50 rounded-lg p-2">
                  <p className="text-[10px] font-black text-[#00C49F]">Örnek: {t.ornek}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Vergi Dilimleri */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4">2024 Yılı Gelir Vergisi Dilimleri</h2>
          <div className="space-y-2">
            {VERGI_DILIMLERI_2024.map((d, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <p className="text-xs text-gray-700">{d.aralik}</p>
                <span className="text-xs font-black text-[#00C49F]">{d.oran}</span>
              </div>
            ))}
          </div>
        </section>

        {/* İstisna Tablosu */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4">Konut Kira İstisna Tutarları</h2>
          <div className="space-y-2">
            {ISTISNA_BILGISI.map((b, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <span className="text-xs font-bold text-gray-700">{b.yil}</span>
                <span className="text-xs font-black text-[#00C49F]">{b.tutarTL.toLocaleString('tr-TR')} ₺</span>
              </div>
            ))}
          </div>
        </section>

        {/* Gider Yöntemleri */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Gider İndirimi Yöntemleri</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {GIDER_YONTEMLERI.map((g, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <p className="text-sm font-black text-[#00C49F] mb-1">{g.yontem}</p>
                <p className="text-xs font-bold text-gray-500 mb-3">İndirim Oranı: {g.oran}</p>
                <p className="text-[10px] text-green-600 mb-1">✓ {g.avantaj}</p>
                <p className="text-[10px] text-rose-500 mb-2">✗ {g.dezavantaj}</p>
                <p className="text-[10px] text-gray-500 font-bold">{g.kimIcinUygun}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Beyan Takvimi */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4">Beyan ve Ödeme Takvimi</h2>
          <div className="space-y-3">
            {BEYAN_TAKVIMI.map((b, i) => (
              <div key={i} className="grid grid-cols-4 gap-2 py-2 border-b border-gray-50 last:border-0">
                <div className="col-span-2">
                  <p className="text-xs font-black text-gray-900">{b.is}</p>
                  <p className="text-[10px] text-[#00C49F] font-bold">{b.tarih}</p>
                </div>
                <p className="text-[10px] text-gray-600 leading-relaxed col-span-2">{b.aciklama}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Uyarı */}
        <section className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <AlertTriangle size={14} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 leading-relaxed">
            <span className="font-black">Önemli:</span> Bu rehber genel bilgi amaçlıdır. Vergi yükümlülüklerinizi belirlemek için bir mali müşavir veya vergi danışmanından destek alın. Vergi mevzuatı yıllık değişebilir.
          </p>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Araçlar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/kira-geliri-vergisi', label: 'Kira Geliri Vergisi Hesaplayıcı' },
              { href: '/gayrimenkul-vergi-optimizasyon', label: 'Vergi Optimizasyon Rehberi' },
              { href: '/deger-artis-vergisi', label: 'Değer Artış Kazancı Vergisi' },
              { href: '/emlak-vergisi', label: 'Emlak Vergisi Hesaplayıcı' },
              { href: '/tapu-masrafi', label: 'Tapu Masrafı Hesaplayıcı' },
              { href: '/net-kira-hesaplayici', label: 'Net Kira Geliri Hesaplayıcı' },
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
