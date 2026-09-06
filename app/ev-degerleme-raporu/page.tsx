import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ev Değerleme Raporu (Ekspertiz) | SPK Lisanslı | Söylemesi Bizden',
  description:
    'Gayrimenkul ekspertiz ve değerleme raporu: SPK lisanslı değerleme uzmanı, rapor içeriği, maliyet ve banka kredisinde kullanım şartları.',
};

const DEGERLEME_YONTEMLERI = [
  {
    yontem: 'Emsal Karşılaştırma',
    kullanim: 'Konut, arsa',
    aciklama: 'Aynı bölgede yakın zamanda satılan benzer taşınmazların fiyatları karşılaştırılır. En yaygın yöntemdir.',
    avantaj: 'Piyasa gerçekçiliği yüksek',
  },
  {
    yontem: 'Gelir Kapitalizasyonu',
    kullanim: 'Kira getirili taşınmaz',
    aciklama: 'Yıllık kira geliri belirlenen kapitalizasyon oranıyla değere çevrilir. Yatırım amaçlı taşınmazlarda kullanılır.',
    avantaj: 'Yatırım değerini yansıtır',
  },
  {
    yontem: 'Maliyet Yöntemi',
    kullanim: 'Özel amaçlı yapılar',
    aciklama: 'Arsa değeri + yeniden inşa maliyeti - yıpranma payı formülüyle değer tespit edilir.',
    avantaj: 'Nadir veya özgün yapılar için uygun',
  },
];

const RAPOR_ICERIGI = [
  { madde: 'Taşınmaz kimlik bilgileri (tapu, ada, parsel)', zorunlu: true },
  { madde: 'Bölge ve piyasa analizi', zorunlu: true },
  { madde: 'Taşınmazın fiziksel özellikleri', zorunlu: true },
  { madde: 'Değerleme yöntemi ve gerekçesi', zorunlu: true },
  { madde: 'Emsal işlem karşılaştırması', zorunlu: true },
  { madde: 'Değer tespiti ve sonuç', zorunlu: true },
  { madde: 'SPK lisanslı uzman imzası ve kaşesi', zorunlu: true },
  { madde: 'Fotoğraflar', zorunlu: true },
  { madde: 'Tapu kaydı ve imar durumu ekleri', zorunlu: false },
];

const MALIYET_TABLOSU = [
  { tip: 'Konut (100 m² altı)', fiyat: '3.000–6.000 ₺', sure: '2–5 iş günü' },
  { tip: 'Konut (100–200 m²)', fiyat: '5.000–10.000 ₺', sure: '3–7 iş günü' },
  { tip: 'Villa / Müstakil', fiyat: '8.000–20.000 ₺', sure: '5–10 iş günü' },
  { tip: 'Ticari / Ofis', fiyat: '7.000–25.000 ₺', sure: '5–10 iş günü' },
  { tip: 'Arsa', fiyat: '4.000–12.000 ₺', sure: '3–7 iş günü' },
];

const KULLANIM_ALANLARI = [
  { alan: 'Banka Konut Kredisi', aciklama: 'Bankalar, kredi verirken SPK lisanslı bir firmadan bağımsız ekspertiz raporu zorunlu tutar. Kredi tutarı rapordaki değerin %70–80\'i ile sınırlanır.' },
  { alan: 'Satış/Alım Müzakeresi', aciklama: 'Bağımsız bir ekspertiz raporu, fiyat müzakeresinde güçlü bir referans noktası oluşturur.' },
  { alan: 'Miras Taksimatı', aciklama: 'Mirasçılar arasındaki pay hesabında taşınmazın adil değerini belirler.' },
  { alan: 'Sigorta Değeri Tespiti', aciklama: 'Yangın, deprem gibi hasarlarda tazminat hesabı için sigorta şirketleri değerleme raporu isteyebilir.' },
  { alan: 'Ortak Mülkiyet Çözümü', aciklama: 'Hisseli taşınmazlarda ortaklar arasındaki uzlaşmada değerin resmi tespiti önem taşır.' },
  { alan: 'Mahkeme Süreçleri', aciklama: 'Kamulaştırma, mülkiyet anlaşmazlığı veya boşanma davalarında mahkeme taşınmaz değeri için ekspertiz ister.' },
];

export default function EvDegerlemRaporuPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <p className="text-[#00C49F] text-xs font-bold mb-3 uppercase tracking-widest">Değerleme Rehberi</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">Ev Değerleme Raporu (Ekspertiz)</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            SPK lisanslı değerleme raporu nedir, nasıl alınır, içeriği nedir ve hangi durumlarda gereklidir?
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">

        {/* Değerleme Yöntemleri */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-1">Değerleme Yöntemleri</h2>
          <p className="text-xs text-gray-400 mb-5">Ekspertiz raporunda hangi yöntem kullanılır?</p>
          <div className="space-y-4">
            {DEGERLEME_YONTEMLERI.map((y, i) => (
              <div key={i} className="border border-gray-100 rounded-xl p-4">
                <div className="flex items-start justify-between mb-2">
                  <p className="text-xs font-black text-gray-900">{y.yontem}</p>
                  <span className="text-[9px] font-black bg-[#00C49F] text-white px-2 py-0.5 rounded-full shrink-0 ml-2">{y.kullanim}</span>
                </div>
                <p className="text-[11px] text-gray-600 leading-relaxed mb-1">{y.aciklama}</p>
                <p className="text-[10px] text-[#00C49F] font-black">✓ {y.avantaj}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Rapor İçeriği */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-1">Rapor İçeriği</h2>
          <p className="text-xs text-gray-400 mb-5">SPK standartlarına göre ekspertiz raporunda yer alması gereken bilgiler.</p>
          <div className="space-y-2">
            {RAPOR_ICERIGI.map((m, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${m.zorunlu ? 'bg-[#00C49F]' : 'bg-gray-200'}`}>
                  <span className="text-white text-[8px] font-black">{m.zorunlu ? '✓' : 'o'}</span>
                </span>
                <p className={`text-[11px] ${m.zorunlu ? 'font-bold text-gray-900' : 'text-gray-500'}`}>{m.madde}</p>
                {!m.zorunlu && <span className="text-[9px] text-gray-400">(opsiyonel)</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Maliyet Tablosu */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm overflow-x-auto">
          <h2 className="text-base font-black text-gray-900 mb-1">Ekspertiz Raporu Maliyeti</h2>
          <p className="text-xs text-gray-400 mb-5">2024 piyasa fiyat aralıkları ve ortalama hazırlama süresi.</p>
          <table className="w-full text-[10px] min-w-[340px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 font-black text-gray-500">Taşınmaz Tipi</th>
                <th className="text-center py-2 font-black text-gray-500">Fiyat Aralığı</th>
                <th className="text-right py-2 font-black text-[#00C49F]">Süre</th>
              </tr>
            </thead>
            <tbody>
              {MALIYET_TABLOSU.map((m, i) => (
                <tr key={i} className="border-b border-gray-50 last:border-0">
                  <td className="py-2 font-black text-gray-900">{m.tip}</td>
                  <td className="py-2 text-center font-bold text-gray-600">{m.fiyat}</td>
                  <td className="py-2 text-right font-black text-[#00C49F]">{m.sure}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Kullanım Alanları */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-1">Ne Zaman Değerleme Raporu Gerekir?</h2>
          <p className="text-xs text-gray-400 mb-5">Ekspertiz raporunun zorunlu veya faydalı olduğu durumlar.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {KULLANIM_ALANLARI.map((k, i) => (
              <div key={i} className="border border-gray-100 rounded-xl p-4">
                <p className="text-xs font-black text-gray-900 mb-1">{k.alan}</p>
                <p className="text-[11px] text-gray-500 leading-relaxed">{k.aciklama}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
          <p className="text-xs font-black text-blue-700 mb-2">SPK Lisanslı Değerleme Uzmanı</p>
          <p className="text-[11px] text-blue-600 leading-relaxed">
            Banka kredileri için kullanılacak ekspertiz raporları yalnızca Sermaye Piyasası Kurulu (SPK) lisanslı Gayrimenkul Değerleme Uzmanları tarafından hazırlanabilir. SPK lisanslı kuruluş listesine SPK&apos;nın resmi web sitesinden ulaşabilirsiniz. Lisanssız raporlar bankalar tarafından kabul edilmez.
          </p>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-6 text-center">
          <p className="text-white font-black text-sm mb-1">Konutunuzun değerini hemen tahmin edin</p>
          <p className="text-gray-300 text-xs mb-4">Konut Değer Tahmini aracımızla bölge ve özelliklerinize göre değer tahmini alın.</p>
          <a href="/konut-deger-tahmini" className="inline-block bg-[#00C49F] text-white text-xs font-black px-5 py-2.5 rounded-full hover:bg-[#00a882] transition-colors">
            Değer Tahmini Yap
          </a>
        </div>

      </div>
    </main>
  );
}
