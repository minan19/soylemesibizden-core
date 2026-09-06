import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Konut Onarım Maliyet Rehberi 2025 | Tadilat Fiyatları | Söylemesi Bizden',
  description:
    'Türkiye\'de konut onarım ve tadilat maliyetleri 2025: boya, banyo, mutfak, döşeme, elektrik, sıhhi tesisat tahmini fiyat listesi.',
};

const ONARIM_KATEGORILER = [
  {
    kategori: 'Boya ve Badana',
    isler: [
      { is: 'Boya (iç, m²)', fiyat: '80–150 ₺', sure: '1–3 gün (100m²)', not: 'İşçilik dahil, boya hariç' },
      { is: 'Dış cephe boyası (m²)', fiyat: '200–400 ₺', sure: 'Bina büyüklüğüne göre', not: 'İskelato + güvenlik' },
      { is: 'Alçı sıva düzeltme (m²)', fiyat: '150–300 ₺', sure: '1–2 gün', not: 'Hasarın büyüklüğüne bağlı' },
      { is: 'Duvar kâğıdı sökme+yenileme (m²)', fiyat: '120–250 ₺', sure: '1–2 gün', not: 'Materyal dahil' },
    ],
  },
  {
    kategori: 'Banyo Yenileme',
    isler: [
      { is: 'Komple banyo renovasyonu', fiyat: '50.000–120.000 ₺', sure: '1–2 hafta', not: 'Seramik+armatür+işçilik' },
      { is: 'Seramik değişimi (m²)', fiyat: '300–600 ₺', sure: '2–3 gün', not: 'Materyal dahil' },
      { is: 'Klozet değişimi', fiyat: '3.000–8.000 ₺', sure: '2–4 saat', not: 'İşçilik + materyal' },
      { is: 'Duş kabin montajı', fiyat: '8.000–25.000 ₺', sure: '1 gün', not: 'Kabin fiyatına göre' },
      { is: 'Su tesisatı yenileme', fiyat: '20.000–50.000 ₺', sure: '2–3 gün', not: 'Tüm hat değişimi' },
    ],
  },
  {
    kategori: 'Mutfak Yenileme',
    isler: [
      { is: 'Mutfak dolabı (komple)', fiyat: '40.000–150.000 ₺', sure: '3–5 gün', not: 'Ölçüye özel, montaj dahil' },
      { is: 'Tezgah değişimi (m)', fiyat: '3.000–10.000 ₺', sure: '1 gün', not: 'Granit/kompozit' },
      { is: 'Mutfak kapak yenileme', fiyat: '10.000–30.000 ₺', sure: '1–2 gün', not: 'Kapaklar + menteşe' },
      { is: 'Ankastre set değişimi', fiyat: '15.000–40.000 ₺', sure: 'Yarım gün', not: 'Cihaz fiyatı dahil' },
    ],
  },
  {
    kategori: 'Döşeme ve Parke',
    isler: [
      { is: 'Laminat parke (m²)', fiyat: '200–400 ₺', sure: '1–2 gün (100m²)', not: 'Materyal + işçilik' },
      { is: 'Masif parke (m²)', fiyat: '500–1.200 ₺', sure: '2–3 gün (100m²)', not: 'Kaliteye bağlı' },
      { is: 'Seramik döşeme (m²)', fiyat: '250–500 ₺', sure: '2–3 gün', not: 'Materyal dahil' },
      { is: 'Parke zımparalama-vernikleme (m²)', fiyat: '100–200 ₺', sure: '1–2 gün', not: 'İşçilik + malzeme' },
    ],
  },
  {
    kategori: 'Elektrik ve Aydınlatma',
    isler: [
      { is: 'Komple elektrik tesisat yenileme', fiyat: '30.000–80.000 ₺', sure: '3–5 gün', not: '3+1 daire için' },
      { is: 'Sigorta paneli yenileme', fiyat: '3.000–8.000 ₺', sure: 'Yarım gün', not: 'Kaçak akım dahil' },
      { is: 'Priz/anahtar değişimi (adet)', fiyat: '200–500 ₺', sure: 'Dakika', not: 'İşçilik dahil' },
      { is: 'LED aydınlatma montajı (spot)', fiyat: '200–400 ₺/adet', sure: 'Dakika', not: 'Armatür fiyatı ayrı' },
    ],
  },
  {
    kategori: 'Isıtma ve Kombi',
    isler: [
      { is: 'Kombi değişimi', fiyat: '20.000–50.000 ₺', sure: 'Yarım gün', not: 'Cihaz + işçilik' },
      { is: 'Radyatör değişimi (adet)', fiyat: '2.000–5.000 ₺', sure: '1–2 saat', not: 'Materyal + montaj' },
      { is: 'Doğalgaz tesisatı yenileme', fiyat: '8.000–20.000 ₺', sure: '1 gün', not: 'Daire içi hat' },
      { is: 'Yerden ısıtma (m²)', fiyat: '400–800 ₺', sure: 'Projeye göre', not: 'Materyal + işçilik' },
    ],
  },
];

const IPUCLARI = [
  { ipucu: 'Birden Fazla Teklif Alın', aciklama: 'En az 3 farklı ustadan yazılı fiyat teklifi alın. En ucuz her zaman en iyi değildir.' },
  { ipucu: 'Referans Kontrol Edin', aciklama: 'Ustanın daha önce çalıştığı müşterileri arayın. Fotoğraflı işler isteyin.' },
  { ipucu: 'Yazılı Sözleşme Yapın', aciklama: 'İş kapsamı, materyal detayı, süre ve ödeme planını yazılı belirleyin.' },
  { ipucu: 'Proje Yönetimi', aciklama: 'Komple tadilatta bir proje yöneticisi maliyeti %5-10 artırır ama zaman ve kalite tasarrufu sağlar.' },
  { ipucu: 'Mevsim Tercihi', aciklama: 'Kış aylarında tadilat ustaları daha uygun fiyat verebilir; yaz sezonu yoğun dönemdir.' },
  { ipucu: 'Malzeme Alımı', aciklama: 'Seramik, parke gibi malzemeleri kendiniz alarak işçilik fiyatı üzerinden pazarlık yapabilirsiniz.' },
];

export default function KonutOnarimMaliyetRehberiPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <p className="text-[#00C49F] text-xs font-bold mb-3 uppercase tracking-widest">Tadilat Rehberi 2025</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">Konut Onarım Maliyet Rehberi</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            2025 yılı güncel konut tadilat ve onarım maliyetleri: boya, banyo, mutfak, döşeme, elektrik ve ısıtma kategori fiyatları.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">

        {ONARIM_KATEGORILER.map((kat, ki) => (
          <div key={ki} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm overflow-x-auto">
            <h2 className="text-base font-black text-gray-900 mb-4">{kat.kategori}</h2>
            <table className="w-full text-[10px] min-w-[440px]">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-2 font-black text-gray-500">İş Kalemi</th>
                  <th className="text-center py-2 font-black text-gray-500">Fiyat Aralığı</th>
                  <th className="text-center py-2 font-black text-gray-500">Süre</th>
                  <th className="text-right py-2 font-black text-[#00C49F]">Not</th>
                </tr>
              </thead>
              <tbody>
                {kat.isler.map((is, ii) => (
                  <tr key={ii} className="border-b border-gray-50 last:border-0">
                    <td className="py-2 font-black text-gray-900">{is.is}</td>
                    <td className="py-2 text-center font-bold text-[#00C49F]">{is.fiyat}</td>
                    <td className="py-2 text-center font-bold text-gray-500">{is.sure}</td>
                    <td className="py-2 text-right font-bold text-gray-400">{is.not}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-4">Tasarruf ve Kalite İpuçları</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {IPUCLARI.map((ip, i) => (
              <div key={i} className="border border-gray-100 rounded-xl p-4">
                <p className="text-xs font-black text-gray-900 mb-1">{ip.ipucu}</p>
                <p className="text-[11px] text-gray-500 leading-relaxed">{ip.aciklama}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
          <p className="text-xs font-black text-amber-700 mb-2">Önemli Not</p>
          <p className="text-[11px] text-amber-600 leading-relaxed">
            Bu fiyatlar 2025 yılı Türkiye ortalaması referans değerleridir. Bölge, malzeme kalitesi ve iş yoğunluğuna göre %30-50 sapma olabilir. İstanbul, İzmir ve Ankara&apos;da işçilik maliyetleri şehir dışı bölgelere göre %20-40 daha yüksek olabilmektedir. Kaçak tadilat için binanın yönetim planı ve belediye ruhsat kurallarına dikkat edin.
          </p>
        </div>

      </div>
    </main>
  );
}
