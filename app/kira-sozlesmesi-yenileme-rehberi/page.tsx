import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kira Sözleşmesi Yenileme Rehberi | Otomatik Yenileme ve Şartlar | Söylemesi Bizden',
  description:
    'Kira sözleşmesi yenileme: otomatik uzama koşulları, yenileme döneminde artış sınırı, şartları değiştirme ve tahliye hakları.',
};

const YENILEME_TURLERI = [
  {
    tur: 'Belirsiz Süreli Sözleşmede Otomatik Uzama',
    aciklama: 'Belirsiz süreli kira sözleşmeleri, taraflarca feshedilmediği sürece belirsiz süreyle devam eder. Fesih için kiracı 3 ay, kiraya veren 6 ay önceden bildirimde bulunmalıdır.',
    kanun: 'TBK md. 347/2',
  },
  {
    tur: 'Belirli Süreli Sözleşmede Otomatik Uzama',
    aciklama: 'Belirli süreli kira sözleşmesini kiracı tahliye etmezse sözleşme aynı koşullarda 1 yıl daha uzar. Kiraya veren süre bitiminde tek taraflı sona erdiremez.',
    kanun: 'TBK md. 347/1',
  },
  {
    tur: 'Yenileme Döneminde Kira Artışı',
    aciklama: 'Her yenileme döneminde artış TÜFE oranını aşamaz; konut kiralarında yasal tavan %25 olarak uygulanmaktadır. Taraflar daha düşük oran kararlaştırabilir.',
    kanun: 'TBK md. 344 + 7409 sayılı Kanun',
  },
  {
    tur: '10 Yıl Tamamlanma Durumu',
    aciklama: '10 yıllık kira dönemi tamamlandığında kiraya veren herhangi bir gerekçe göstermeksizin, yenileme döneminin bitiminden en az 3 ay önceden bildirerek sözleşmeye son verebilir.',
    kanun: 'TBK md. 347/1 son cümle',
  },
];

const YENILEME_ADIMLARI = [
  { adim: 1, baslik: 'Sözleşme Süresini Kontrol Edin', aciklama: 'Sözleşmenin bitiş tarihini ve "otomatik yenileme" ya da "fesih bildirimi" koşullarını okuyun.' },
  { adim: 2, baslik: 'Artış Oranını Müzakere Edin', aciklama: 'Yenileme öncesinde TÜFE ve yasal tavan üzerinden artış oranını yazılı olarak kararlaştırın.' },
  { adim: 3, baslik: 'Koşul Değişikliği İçin Mutabakat Belgesi', aciklama: 'Kira bedeli dışında diğer koşulları değiştirmek isterseniz ek protokol veya yeni sözleşme düzenleyin.' },
  { adim: 4, baslik: 'Yeni Sözleşme Düzenleme Kararı', aciklama: 'Taraflar isterlerse mevcut sözleşmeyi sona erdirerek güncel koşullarla yeni bir sözleşme yapabilir.' },
  { adim: 5, baslik: 'Yazılı Bildirim Yükümlülüğü', aciklama: 'Sözleşmeyi sona erdirmek isteyen taraf yasal süre içinde iadeli taahhütlü posta veya noter kanalıyla bildirimde bulunmalıdır.' },
];

const SURELER_TABLOSU = [
  { durum: 'Kiracı fesih bildirimi (belirsiz süreli)', sure: '3 ay önceden', taraf: 'Kiracı' },
  { durum: 'Kiraya veren fesih bildirimi (belirsiz süreli)', sure: '6 ay önceden', taraf: 'Kiraya Veren' },
  { durum: 'Belirli süreli — süre bitiminde tahliye', sure: '15 gün önceden', taraf: 'Kiracı' },
  { durum: 'Malikin konut ihtiyacı nedeniyle tahliye', sure: 'Sözleşme bitiminden 3 ay önce', taraf: 'Kiraya Veren' },
  { durum: '10. yıl tamamlanması — tahliye bildirimi', sure: 'Yenileme döneminden 3 ay önce', taraf: 'Kiraya Veren' },
];

const PRATIK_BILGILER = [
  { baslik: 'Yenileme = Eski Koşullar', aciklama: 'Kira otomatik uzadığında önceki sözleşme koşulları geçerlidir; kiraya veren tek taraflı yeni koşul dayatamaz.' },
  { baslik: 'Sözlü Artış Anlaşması Geçersiz', aciklama: 'Kira artışına ilişkin anlaşmalar yazılı yapılmalıdır. Sözlü anlaşmalar ispat sorunu yaratır.' },
  { baslik: 'Depozitoyu Yenilemeyin', aciklama: 'Sözleşme yenilendiğinde mevcut depozito geçerliliğini korur; kiraya veren yeni depozito talep edemez.' },
  { baslik: 'Tahliye Taahhüdü Tehlikesi', aciklama: 'Sözleşme yenilenmeden önce imzalanan boş tarihli tahliye taahhütnamesi yasal olarak geçerliliğini koruyabilir; imzalamadan önce hukuki danışmanlık alın.' },
];

export default function KiraSozlesmesiYenilemePage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <p className="text-[#00C49F] text-xs font-bold mb-3 uppercase tracking-widest">Kiracı Rehberi</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">Kira Sözleşmesi Yenileme Rehberi</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            Kira sözleşmesi otomatik uzama koşulları, yenileme döneminde artış sınırı ve fesih bildirimleri.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">

        {/* Yenileme Türleri */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-1">Sözleşme Yenileme Türleri</h2>
          <p className="text-xs text-gray-400 mb-5">Kira sözleşmesinin nasıl uzadığı veya sona erdiği.</p>
          <div className="space-y-4">
            {YENILEME_TURLERI.map((y, i) => (
              <div key={i} className="border border-gray-100 rounded-xl p-4">
                <div className="flex items-start justify-between mb-2">
                  <p className="text-xs font-black text-gray-900">{y.tur}</p>
                  <span className="text-[9px] text-gray-400 shrink-0 ml-2">{y.kanun}</span>
                </div>
                <p className="text-[11px] text-gray-600 leading-relaxed">{y.aciklama}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bildirim Süreleri Tablosu */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm overflow-x-auto">
          <h2 className="text-base font-black text-gray-900 mb-1">Yasal Bildirim Süreleri</h2>
          <p className="text-xs text-gray-400 mb-5">Fesih ve tahliye bildirimlerinde hangi süre uygulanır?</p>
          <table className="w-full text-[10px] min-w-[400px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 font-black text-gray-500">Durum</th>
                <th className="text-center py-2 font-black text-gray-500">Süre</th>
                <th className="text-right py-2 font-black text-[#00C49F]">Taraf</th>
              </tr>
            </thead>
            <tbody>
              {SURELER_TABLOSU.map((s, i) => (
                <tr key={i} className="border-b border-gray-50 last:border-0">
                  <td className="py-2 font-black text-gray-900">{s.durum}</td>
                  <td className="py-2 text-center font-bold text-amber-500">{s.sure}</td>
                  <td className="py-2 text-right font-black text-[#00C49F]">{s.taraf}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Yenileme Adımları */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-1">Yenileme Süreci</h2>
          <p className="text-xs text-gray-400 mb-5">Kira sözleşmesi yenileme veya değiştirme adımları.</p>
          <div className="space-y-4">
            {YENILEME_ADIMLARI.map((a) => (
              <div key={a.adim} className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-[#00C49F] text-white text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">{a.adim}</span>
                <div>
                  <p className="text-xs font-black text-gray-900 mb-0.5">{a.baslik}</p>
                  <p className="text-[11px] text-gray-500 leading-relaxed">{a.aciklama}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pratik Bilgiler */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-1">Pratik Bilgiler</h2>
          <p className="text-xs text-gray-400 mb-5">Yenileme sürecinde dikkat edilmesi gerekenler.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PRATIK_BILGILER.map((b, i) => (
              <div key={i} className="border border-gray-100 rounded-xl p-4">
                <p className="text-xs font-black text-gray-900 mb-1">{b.baslik}</p>
                <p className="text-[11px] text-gray-500 leading-relaxed">{b.aciklama}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}
