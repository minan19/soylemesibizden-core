import { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, AlertTriangle, ArrowRight, Calculator } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Stopaj Vergisi Rehberi | Gayrimenkul Kira Stopajı | Söylemesi Bizden',
  description:
    'Gayrimenkulde stopaj vergisi: kira stopajı oranları, kiracının kesme yükümlülüğü, beyan zorunluluğu ve ödeme takvimi hakkında kapsamlı rehber.',
};

const STOPAJ_ORANLARI = [
  { tur: 'Konut Kirası (Bireysel Kiracı)', oran: '%0', aciklama: 'Bireysel (gerçek kişi) kiracılar stopaj kesmez; mal sahibi yıllık beyanname verir.' },
  { tur: 'Konut Kirası (Kurumsal Kiracı)', oran: '%20', aciklama: 'Şirket veya kurum kiracılar kira ödemesi üzerinden %20 stopaj keserek vergi dairesine yatırır.' },
  { tur: 'İşyeri Kirası (Tüm Kiracılar)', oran: '%20', aciklama: 'Hem bireysel hem kurumsal kiracılar işyeri kira ödemelerinde %20 stopaj keser.' },
  { tur: 'Arsa Kirası', oran: '%20', aciklama: 'Arsa kira ödemeleri stopaja tabidir; kira sözleşmesinde açıkça belirtilmesi önerilir.' },
  { tur: 'Kat Karşılığı (Arsa Payı)', oran: '%20', aciklama: 'Müteahhide bırakılan kat ya da daire değeri üzerinden stopaj kesintisi uygulanabilir.' },
];

const BEYAN_TAKVIMI = [
  { islem: 'Yıllık Kira Geliri Beyanı', tarih: '1 Mart – 31 Mart', aciklama: 'Mal sahipleri, bir önceki takvim yılına ait kira gelirlerini Mart ayında Gelir İdaresi\'ne beyan eder.' },
  { islem: 'Stopaj Muhtasar Beyanname', tarih: 'Her ay 26\'sına kadar', aciklama: 'Stopaj kesen kurumsal kiracılar, her ay muhtasar beyanname vererek kestikleri stopajı öder.' },
  { islem: '1. Taksit Vergi Ödemesi', tarih: '31 Mart', aciklama: 'Yıllık beyanname üzerinden hesaplanan verginin birinci taksiti Mart sonuna kadar ödenir.' },
  { islem: '2. Taksit Vergi Ödemesi', tarih: '31 Temmuz', aciklama: 'Yıllık beyanname üzerinden hesaplanan verginin ikinci taksiti Temmuz sonuna kadar ödenir.' },
];

const MUAFIYET_VE_AVANTAJLAR = [
  { konu: 'Konut Kira İstisnası', aciklama: '2024 yılı için 33.000 ₺ konut kira geliri yıllık istisnadan yararlanır; bu tutarın altında kalan gelirler beyan edilmez.' },
  { konu: 'Götürü Gider Yöntemi', aciklama: 'Kira gelirinden %15 götürü gider indirimi yapılarak vergi matrahı azaltılabilir; belge toplama yükümlülüğü ortadan kalkar.' },
  { konu: 'Gerçek Gider Yöntemi', aciklama: 'Tapu harcı, faiz giderleri, tadilat, sigorta ve amortisman giderleri gerçek tutarlarıyla indirilebilir; belgeli olması şart.' },
  { konu: '5 Yıl Değer Artış Muafiyeti', aciklama: 'Konutu 5 yıldan fazla elde tutarak satan malikin değer artış kazancı vergiye tabi tutulmaz.' },
];

const SIKCA_HATA = [
  { hata: 'Bireysel Kiracıdan Stopaj Beklemek', aciklama: 'Konut kirasında bireysel kiracı stopaj kesmez; mal sahibi yıllık beyanname yükümlüsüdür. Bu yanlış anlaşılma sık yapılan hatadır.' },
  { hata: 'Beyan Yapmamak', aciklama: 'Kira gelirini beyan etmemek vergi ziyaı cezası ve gecikme faiziyle sonuçlanır. Vergi daireleri banka veri paylaşımıyla tespiti artırmaktadır.' },
  { hata: 'İstisna Tutarını Yanlış Uygulamak', aciklama: 'İstisna tutarı her yıl güncellenir. Birden fazla konut kirası için toplu gelir üzerinden tek istisna hakkı kullanılır.' },
  { hata: 'Götürü / Gerçek Gider Karma Kullanmak', aciklama: 'İki yöntemden biri seçildikten sonra o yıl için değiştirilemez; yılın başında hangi yöntemi kullanacağınıza karar verin.' },
];

export default function StopajVergisiRehberiPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <Calculator size={13} /> Stopaj Vergisi
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Stopaj Vergisi Rehberi
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            Gayrimenkul kira stopajı oranları, kiracının kesme yükümlülüğü, beyan takvimi ve vergi avantajları.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-[#00C49F]">%20</p>
              <p className="text-xs text-gray-400">İşyeri kira stopajı</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">33.000 ₺</p>
              <p className="text-xs text-gray-400">2024 konut istisnası</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-400">31 Mart</p>
              <p className="text-xs text-gray-400">Beyan ve taksit tarihi</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* Stopaj Oranları */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm overflow-x-auto">
          <h2 className="text-sm font-black text-gray-900 mb-4">Stopaj Oranları</h2>
          <table className="w-full text-[10px] min-w-[400px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 font-black text-gray-500">Kira Türü</th>
                <th className="text-center py-2 font-black text-[#00C49F]">Oran</th>
                <th className="text-left py-2 font-black text-gray-500">Açıklama</th>
              </tr>
            </thead>
            <tbody>
              {STOPAJ_ORANLARI.map((s, i) => (
                <tr key={i} className="border-b border-gray-50 last:border-0">
                  <td className="py-2 font-black text-gray-900">{s.tur}</td>
                  <td className="py-2 text-center font-black text-[#00C49F]">{s.oran}</td>
                  <td className="py-2 text-gray-600">{s.aciklama}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Beyan Takvimi */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Beyan ve Ödeme Takvimi</h2>
          <div className="space-y-3">
            {BEYAN_TAKVIMI.map((b, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                <div className="flex items-start justify-between mb-1">
                  <p className="text-xs font-black text-gray-900">{b.islem}</p>
                  <span className="text-[10px] bg-amber-50 text-amber-600 font-black px-2 py-0.5 rounded shrink-0">{b.tarih}</span>
                </div>
                <p className="text-[10px] text-gray-600 leading-relaxed">{b.aciklama}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Muafiyet ve Avantajlar */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle size={14} className="text-[#00C49F]" /> Muafiyet ve Vergi Avantajları
          </h2>
          <div className="space-y-3">
            {MUAFIYET_VE_AVANTAJLAR.map((m, i) => (
              <div key={i} className="grid grid-cols-3 gap-2 py-2 border-b border-gray-50 last:border-0">
                <p className="text-xs font-black text-[#00C49F]">{m.konu}</p>
                <p className="text-[10px] text-gray-600 leading-relaxed col-span-2">{m.aciklama}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Sık Hatalar */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Sık Yapılan Hatalar</h2>
          <div className="space-y-3">
            {SIKCA_HATA.map((h, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                <p className="text-xs font-black text-rose-500 mb-1">{h.hata}</p>
                <p className="text-[10px] text-gray-600 leading-relaxed">{h.aciklama}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Uyarı */}
        <section className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <AlertTriangle size={14} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 leading-relaxed">
            <span className="font-black">Önemli:</span> Vergi mevzuatı her yıl değişebilir. İstisna tutarları, stopaj oranları ve beyan tarihleri için ilgili yılın Gelir İdaresi Başkanlığı duyurularını takip edin veya mali müşavirinizle görüşün.
          </p>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Araçlar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/kira-geliri-vergisi', label: 'Kira Geliri Vergisi Hesaplayıcı' },
              { href: '/gayrimenkul-vergi-optimizasyon', label: 'Vergi Optimizasyonu Rehberi' },
              { href: '/net-kira-hesaplayici', label: 'Net Kira Hesaplayıcı' },
              { href: '/emlak-vergisi', label: 'Emlak Vergisi Hesaplayıcı' },
              { href: '/tapu-masrafi', label: 'Tapu Masrafı Hesaplayıcı' },
              { href: '/rehber/satici-rehberi', label: 'Satıcı Rehberi' },
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
