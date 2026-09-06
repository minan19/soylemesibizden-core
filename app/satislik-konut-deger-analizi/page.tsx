import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Satılık Konut Değer Analizi Rehberi | Fiyat Tespiti | Söylemesi Bizden',
  description:
    'Satılık ev için doğru fiyat nasıl belirlenir? Karşılaştırmalı piyasa analizi, ekspertiz, değer artırma yöntemleri ve fiyatlama stratejileri.',
};

const DEGER_ETKENLER = [
  {
    kategori: 'Konum',
    etkenler: [
      { etken: 'Semt / Mahalle presitji', etki: 'Yüksek', aciklama: 'Aynı binada bile adres değeri %10-20 fark yaratabilir' },
      { etken: 'Toplu taşıma mesafesi', etki: 'Yüksek', aciklama: 'Metro/metrobüs 500m altı fiyatı %5-10 artırır' },
      { etken: 'Okul kalitesi yakınlığı', etki: 'Orta', aciklama: 'Okul çağı nüfusun yoğun olduğu bölgelerde önemli' },
      { etken: 'Park ve yeşil alan', etki: 'Orta', aciklama: 'Parkın yanı başındaki daireler %3-7 primin' },
    ],
  },
  {
    kategori: 'Fiziksel Özellikler',
    etkenler: [
      { etken: 'Kat / Cephe', etki: 'Yüksek', aciklama: 'Üst katlar ve güney cephe %5-15 primli' },
      { etken: 'Brüt/Net alan oranı', etki: 'Yüksek', aciklama: 'Net 90m² ile 120m²brüt aynı fiyata çıkabilir' },
      { etken: 'Bina yaşı ve renovasyon', etki: 'Orta', aciklama: 'Yeni bina veya komple tadilat %10-20 prim' },
      { etken: 'Asansör / Otopark', etki: 'Orta', aciklama: 'Olmayanlara %5-10 değer düşümü' },
    ],
  },
  {
    kategori: 'Piyasa Koşulları',
    etkenler: [
      { etken: 'Bölgede satış süresi', etki: 'Yüksek', aciklama: '30 gün altı hızlı bölge, üstü durağan piyasa' },
      { etken: 'Mevsimsel talep', etki: 'Orta', aciklama: 'Bahar-erken yaz fiyat zirvesi; kış dip' },
      { etken: 'Faiz oranları', etki: 'Yüksek', aciklama: 'Yüksek faiz alıcı kitleni daraltır, fiyat baskısı yapar' },
      { etken: 'Bölgedeki yeni projeler', etki: 'Düşük', aciklama: 'Yakında teslim sıfır konut rekabeti' },
    ],
  },
];

const FIYAT_BELIRLEME_ADIMLARI = [
  { adim: 1, baslik: 'Karşılaştırmalı Piyasa Analizi (CMA)', aciklama: 'Son 3-6 ayda aynı bölgede satılan benzer konutları inceleyin. En az 3-5 karşılaştırmalı satış bulun. Fiyat aralığını hesaplayın.' },
  { adim: 2, baslik: 'Ekspertiz Raporu', aciklama: 'SPK lisanslı değerleme şirketinden bağımsız ekspertiz raporu alın. Bu rapor hem fiyat referansı hem de alıcının bankasına sunulacak belgedir.' },
  { adim: 3, baslik: 'Maliyet Analizi', aciklama: 'İnşaat maliyeti, arsa değeri ve genel piyasa trendlerini birleştiren maliyet yaklaşımı gerçek değeri ortaya koyar.' },
  { adim: 4, baslik: 'Fiyat Bantlarını Belirleyin', aciklama: 'İstediğiniz fiyat, müzakere payı bırakacağınız teklif tabanı ve kabul edeceğiniz minimum fiyatı önceden belirleyin.' },
  { adim: 5, baslik: 'Süre Planı Yapın', aciklama: 'İlk 2 hafta: Değer üzerinde fiyat → müzakere payı. 4. hafta: Yeniden fiyatlandırma değerlendirin. 8. hafta: Piyasa geribildirimini dikkate alın.' },
];

const DEGER_ARTIRMA_YONTEMLERI = [
  { yontem: 'Boya ve Temizlik', maliyet: '5.000–15.000 ₺', beklenenGetiri: 'Fiyat tepkisi %2–5', not: 'En yüksek ROI\'lı iyileştirme' },
  { yontem: 'Depolama ve Düzenleme', maliyet: '1.000–3.000 ₺', beklenenGetiri: 'Görsel etki büyük', not: 'Ev staging satış hızlandırır' },
  { yontem: 'Küçük Tamiratlar', maliyet: '3.000–10.000 ₺', beklenenGetiri: 'Pazarlık gerekçesini ortadan kaldırır', not: 'Damlayan musluk, çıkık parket' },
  { yontem: 'Mutfak Yüzey Yenileme', maliyet: '10.000–30.000 ₺', beklenenGetiri: 'Değer %3–8 artış', not: 'Kapak değişimi, tezgah' },
  { yontem: 'Banyo Yenileme', maliyet: '15.000–40.000 ₺', beklenenGetiri: 'Değer %3–6 artış', not: 'Seramik, armatür, ayna' },
];

const FIYATLAMA_HATALARI = [
  { hata: 'Duygusal Fiyatlama', aciklama: 'Satın alma maliyetinizi veya anısal değeri fiyata yansıtmak piyasa dışı fiyata neden olur.' },
  { hata: 'İlk Hafta Çok Yüksek Fiyat', aciklama: 'Piyasada görünür olduğunuz ilk 7-14 gün en kritik dönemdir. Yüksek fiyat bu fırsatı öldürür.' },
  { hata: 'Kademeli İndirimler', aciklama: 'Küçük indirimler güven zedeler. Tek büyük fiyat düzeltmesi daha etkilidir.' },
  { hata: 'Sezon Dışı Bekleme', aciklama: 'Kışta listeleyen satıcı az olduğundan rekabet avantajı elde edilebilir.' },
  { hata: 'Tadilat Maliyetini Fiyata Yansıtmak', aciklama: 'Yapılan tadilat maliyetinin tamamı fiyata eklenemez; piyasa değeri esas alınır.' },
];

export default function SatislikKonutDegerAnaliziPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <p className="text-[#00C49F] text-xs font-bold mb-3 uppercase tracking-widest">Satıcı Rehberi</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">Satılık Konut Değer Analizi</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            Evinizi satmadan önce doğru fiyatı belirleyin: değer etkenleri, fiyatlama stratejileri ve değer artırma yöntemleri.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">

        {/* Değer Etkenler */}
        {DEGER_ETKENLER.map((k, ki) => (
          <div key={ki} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm overflow-x-auto">
            <h2 className="text-base font-black text-gray-900 mb-4">{k.kategori} Etkenler</h2>
            <table className="w-full text-[10px] min-w-[400px]">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-2 font-black text-gray-500">Etken</th>
                  <th className="text-center py-2 font-black text-gray-500">Etki</th>
                  <th className="text-right py-2 font-black text-gray-500">Açıklama</th>
                </tr>
              </thead>
              <tbody>
                {k.etkenler.map((e, ei) => (
                  <tr key={ei} className="border-b border-gray-50 last:border-0">
                    <td className="py-2 font-black text-gray-900">{e.etken}</td>
                    <td className="py-2 text-center">
                      <span className={`text-[9px] font-black px-1.5 py-0.5 rounded ${e.etki === 'Yüksek' ? 'bg-rose-50 text-rose-500' : e.etki === 'Orta' ? 'bg-amber-50 text-amber-500' : 'bg-gray-50 text-gray-400'}`}>{e.etki}</span>
                    </td>
                    <td className="py-2 text-right font-bold text-gray-400 max-w-xs">{e.aciklama}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}

        {/* Fiyat Belirleme Adımları */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-5">Fiyat Belirleme Süreci</h2>
          <div className="space-y-4">
            {FIYAT_BELIRLEME_ADIMLARI.map((a) => (
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

        {/* Değer Artırma */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm overflow-x-auto">
          <h2 className="text-base font-black text-gray-900 mb-1">Satış Öncesi Değer Artırma</h2>
          <p className="text-xs text-gray-400 mb-5">Düşük maliyetle yüksek getiri sağlayan iyileştirmeler.</p>
          <table className="w-full text-[10px] min-w-[440px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 font-black text-gray-500">Yöntem</th>
                <th className="text-center py-2 font-black text-gray-500">Maliyet</th>
                <th className="text-center py-2 font-black text-gray-500">Beklenen Getiri</th>
                <th className="text-right py-2 font-black text-[#00C49F]">Not</th>
              </tr>
            </thead>
            <tbody>
              {DEGER_ARTIRMA_YONTEMLERI.map((y, i) => (
                <tr key={i} className="border-b border-gray-50 last:border-0">
                  <td className="py-2 font-black text-gray-900">{y.yontem}</td>
                  <td className="py-2 text-center font-bold text-gray-600">{y.maliyet}</td>
                  <td className="py-2 text-center font-bold text-emerald-600">{y.beklenenGetiri}</td>
                  <td className="py-2 text-right font-bold text-gray-400">{y.not}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Hatalar */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-4">Fiyatlama Hataları</h2>
          <div className="space-y-3">
            {FIYATLAMA_HATALARI.map((h, i) => (
              <div key={i} className="border border-rose-100 rounded-xl p-4 bg-rose-50/30">
                <p className="text-xs font-black text-rose-700 mb-1">{h.hata}</p>
                <p className="text-[11px] text-gray-600">{h.aciklama}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}
