import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gayrimenkul Değerleme Yöntemleri 2025 | Ekspertiz ve Piyasa Değeri | Söylemesi Bizden',
  description:
    'Gayrimenkul değerleme: emsal karşılaştırma, gelir kapitalizasyonu, maliyet yaklaşımı yöntemleri, SPK lisanslı ekspertiz ve fiyat etkenleri.',
};

const DEGERLEME_YONTEMLERI = [
  {
    yontem: 'Emsal Karşılaştırma (Pazar Yaklaşımı)',
    aciklama: 'Benzer özellikteki mülklerin son satış fiyatları karşılaştırılarak değer belirlenir. En yaygın ve en güvenilir yöntemdir.',
    kullanim: 'Konut, arsa, ticari mülk',
    avantaj: 'Piyasa gerçekliğini doğrudan yansıtır',
    dezavantaj: 'Yeterli emsal bulunamazsa güvenilirliği düşer',
    kimUygular: 'Bankalar, SPK lisanslı uzmanlar, bireyler',
  },
  {
    yontem: 'Gelir Kapitalizasyonu (Gelir Yaklaşımı)',
    aciklama: 'Mülkün ürettiği veya üretebileceği net kira geliri, piyasa kapitalizasyon oranına (cap rate) bölünerek değer hesaplanır.',
    kullanim: 'Kira getirisi olan ticari mülk, apartman',
    avantaj: 'Yatırım mülkleri için en anlamlı yöntem',
    dezavantaj: 'Cap rate tahmini sübjektif olabilir',
    kimUygular: 'Kurumsal yatırımcılar, GYO\'lar, bankalar',
  },
  {
    yontem: 'Maliyet Yaklaşımı',
    aciklama: 'Arsa değeri + yapı inşaat maliyeti – fiziksel/fonksiyonel yıpranma hesaplanarak toplam değer bulunur.',
    kullanim: 'Yeni yapılar, özel amaçlı mülkler, sigortacılık',
    avantaj: 'Emsal az olduğunda kullanılabilir',
    dezavantaj: 'Eski yapılarda yıpranma tespiti güçtür',
    kimUygular: 'Sigorta şirketleri, inşaat projeleri, SPK uzmanlar',
  },
  {
    yontem: 'Artık Değer (Geliştirme Yaklaşımı)',
    aciklama: 'Mülkün geliştirme sonrası tahmini değerinden geliştirme maliyeti çıkarılarak ham arsa veya proje değeri hesaplanır.',
    kullanim: 'Arsa, kentsel dönüşüm projeleri',
    avantaj: 'Geliştirme potansiyelini kapsar',
    dezavantaj: 'Uzun vadeli tahminlere bağlı; yüksek belirsizlik',
    kimUygular: 'Müteahhitler, proje geliştiriciler',
  },
];

const FIYAT_ETKENLERI = [
  { etken: 'Konum ve Ulaşım', agirlik: '%25–35', detay: 'Metro/otobüs durağı mesafesi, cadde cephesi, ilçe prestiji' },
  { etken: 'Alan ve Oda Sayısı', agirlik: '%15–20', detay: 'Brüt m², net kullanım alanı, oda düzeni' },
  { etken: 'Bina Yaşı ve Durumu', agirlik: '%10–15', detay: 'İnşaat yılı, tadilat geçmişi, asansör, ısıtma sistemi' },
  { etken: 'Kat ve Cephe', agirlik: '%5–10', detay: 'Yüksek kat, güney cephesi, deniz/park manzarası' },
  { etken: 'Sosyal Çevre', agirlik: '%10–15', detay: 'Okul kalitesi, alışveriş erişimi, güvenlik algısı' },
  { etken: 'Yasal Durum', agirlik: '%5–10', detay: 'Tapu türü, imar durumu, ipotek/haciz varlığı' },
  { etken: 'Piyasa Koşulları', agirlik: '%10–20', detay: 'Faiz ortamı, arz-talep dengesi, mevsimsellik' },
];

const SPK_EKSPERTIZ_SURECI = [
  { adim: 'Başvuru ve Görevlendirme', sure: '1–2 gün', aciklama: 'Banka veya müşteri SPK lisanslı değerleme şirketine başvurur; uzman görevlendirilir.' },
  { adim: 'Yerinde İnceleme', sure: '1 gün', aciklama: 'Uzman mülkü fiziksel olarak inceler; fotoğraf çeker, ölçüm alır, yapı durumunu değerlendirir.' },
  { adim: 'Tapu ve İmar Araştırması', sure: '1–2 gün', aciklama: 'Tapu sicil kayıtları, imar planı, yapı ruhsatı ve iskan belgesi araştırılır.' },
  { adim: 'Emsal ve Piyasa Analizi', sure: '1–2 gün', aciklama: 'Bölgede son 6–12 ayda gerçekleşmiş emsal satışlar ve kira değerleri derlenir.' },
  { adim: 'Rapor Yazımı ve Onay', sure: '1–2 gün', aciklama: 'Değerleme raporu hazırlanır, ikinci uzman veya sorumlu değerleme uzmanı tarafından onaylanır.' },
  { adim: 'Teslimat', sure: 'Toplam: 5–10 gün', aciklama: 'Rapor bankaya veya müşteriye PDF formatında iletilir; BDDK sistemine yüklenir.' },
];

const DEGERLEME_MALIYET = [
  { tur: 'Bireysel Konut (standart)', maliyet: '3.000–6.000 ₺', sure: '5–7 iş günü' },
  { tur: 'Ticari Mülk (dükkan/ofis)', maliyet: '5.000–12.000 ₺', sure: '7–10 iş günü' },
  { tur: 'Arsa / Tarla', maliyet: '4.000–8.000 ₺', sure: '7–10 iş günü' },
  { tur: 'Lüks Konut / Villa', maliyet: '8.000–20.000 ₺', sure: '10–15 iş günü' },
  { tur: 'Alışveriş Merkezi / Büyük Ticari', maliyet: '20.000–100.000+ ₺', sure: '15–30 iş günü' },
];

export default function GayrimenkulDegerlemeYontemleriPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <p className="text-[#00C49F] text-xs font-bold mb-3 uppercase tracking-widest">Değerleme Rehberi 2025</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">Gayrimenkul Değerleme Yöntemleri</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            Pazar karşılaştırması, gelir kapitalizasyonu ve maliyet yaklaşımı: hangi yöntem ne zaman kullanılır, SPK ekspertizi nasıl işler.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-4">Değerleme Yöntemleri</h2>
          <div className="space-y-4">
            {DEGERLEME_YONTEMLERI.map((d, i) => (
              <div key={i} className="border border-gray-100 rounded-xl p-4">
                <p className="text-xs font-black text-gray-900 mb-2">{d.yontem}</p>
                <p className="text-[11px] text-gray-500 mb-3">{d.aciklama}</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[10px]">
                  <div>
                    <p className="text-gray-400 mb-0.5">Kullanım Alanı</p>
                    <p className="font-bold text-gray-700">{d.kullanim}</p>
                  </div>
                  <div>
                    <p className="text-emerald-500 mb-0.5">+ Avantaj</p>
                    <p className="font-bold text-gray-700">{d.avantaj}</p>
                  </div>
                  <div>
                    <p className="text-rose-400 mb-0.5">− Dezavantaj</p>
                    <p className="font-bold text-gray-700">{d.dezavantaj}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm overflow-x-auto">
          <h2 className="text-base font-black text-gray-900 mb-1">Fiyat Etkenleri ve Ağırlıkları</h2>
          <p className="text-xs text-gray-400 mb-5">Tipik konut değerlemesinde her faktörün yaklaşık payı.</p>
          <table className="w-full text-[10px] min-w-[400px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 font-black text-gray-500">Etken</th>
                <th className="text-center py-2 font-black text-[#00C49F]">Ağırlık</th>
                <th className="text-right py-2 font-black text-gray-500">Detay</th>
              </tr>
            </thead>
            <tbody>
              {FIYAT_ETKENLERI.map((e, i) => (
                <tr key={i} className="border-b border-gray-50 last:border-0">
                  <td className="py-2 font-black text-gray-900">{e.etken}</td>
                  <td className="py-2 text-center font-bold text-[#00C49F]">{e.agirlik}</td>
                  <td className="py-2 text-right text-gray-400">{e.detay}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-4">SPK Ekspertiz Süreci</h2>
          <div className="space-y-3">
            {SPK_EKSPERTIZ_SURECI.map((s, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-6 h-6 rounded-full bg-[#00C49F] text-white text-[10px] font-black flex items-center justify-center shrink-0">{i + 1}</div>
                  {i < SPK_EKSPERTIZ_SURECI.length - 1 && <div className="w-px flex-1 bg-gray-100 mt-1" />}
                </div>
                <div className="pb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-xs font-black text-gray-900">{s.adim}</p>
                    <span className="text-[9px] text-[#00C49F] font-bold">{s.sure}</span>
                  </div>
                  <p className="text-[11px] text-gray-500">{s.aciklama}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm overflow-x-auto">
          <h2 className="text-base font-black text-gray-900 mb-4">Değerleme Raporu Maliyetleri</h2>
          <table className="w-full text-[10px] min-w-[380px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 font-black text-gray-500">Mülk Türü</th>
                <th className="text-center py-2 font-black text-gray-500">Maliyet</th>
                <th className="text-right py-2 font-black text-[#00C49F]">Süre</th>
              </tr>
            </thead>
            <tbody>
              {DEGERLEME_MALIYET.map((m, i) => (
                <tr key={i} className="border-b border-gray-50 last:border-0">
                  <td className="py-2 font-black text-gray-900">{m.tur}</td>
                  <td className="py-2 text-center font-bold text-gray-600">{m.maliyet}</td>
                  <td className="py-2 text-right text-gray-400">{m.sure}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
          <p className="text-xs font-black text-amber-700 mb-2">Önemli Not</p>
          <p className="text-[11px] text-amber-600 leading-relaxed">
            Banka kredi süreçlerinde SPK lisanslı değerleme zorunludur; banka kendi anlaşmalı şirketini atar ve maliyeti genellikle alıcıya yansıtılır. Özel amaçlı değerleme yaptırmak isteyenler SPK&apos;nın lisanslı kuruluşlar listesinden doğrulama yapmalıdır. Değerleme raporu yalnızca hazırlandığı tarih itibarıyla geçerlidir; piyasa koşullarındaki hızlı değişimlerde yeni rapor gerekebilir.
          </p>
        </div>

      </div>
    </main>
  );
}
