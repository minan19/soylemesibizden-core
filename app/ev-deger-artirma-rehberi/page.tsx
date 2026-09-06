import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ev Değer Artırma Rehberi 2025 | Satış Öncesi İyileştirmeler | Söylemesi Bizden',
  description:
    'Evinizin değerini artırmak için pratik iyileştirmeler: mutfak, banyo, cephe, bahçe ve enerji verimliliği yatırımları ve tahmini getiri oranları.',
};

const IYILESTIRMELER = [
  {
    alan: 'Mutfak Yenileme',
    yatirim: '20.000–80.000 ₺',
    degerArtis: '%5–10',
    roi: '%120–180',
    sure: '3–7 gün',
    oncelik: 'Çok Yüksek',
    ipucu: 'Kapakları yenilemek tam tadilat yerine %50 daha ucuz; etkisi benzer.',
  },
  {
    alan: 'Banyo Renovasyonu',
    yatirim: '30.000–100.000 ₺',
    degerArtis: '%3–8',
    roi: '%100–150',
    sure: '5–10 gün',
    oncelik: 'Çok Yüksek',
    ipucu: 'Fayans, armatür ve aydınlatma değişimi komple renovasyona alternatif olabilir.',
  },
  {
    alan: 'Boya / Badana',
    yatirim: '8.000–25.000 ₺',
    degerArtis: '%2–5',
    roi: '%200–400',
    sure: '2–5 gün',
    oncelik: 'Yüksek',
    ipucu: 'En yüksek ROI\'li iyileştirme. Nötr renkler (beyaz, açık gri) tercih edin.',
  },
  {
    alan: 'Zemin / Parke',
    yatirim: '15.000–50.000 ₺',
    degerArtis: '%3–6',
    roi: '%100–160',
    sure: '2–4 gün',
    oncelik: 'Yüksek',
    ipucu: 'Eski parkeyi zımparalamak yenisiyle değiştirmekten çok daha ekonomik.',
  },
  {
    alan: 'Cephe / Dış Görünüm',
    yatirim: '5.000–30.000 ₺',
    degerArtis: '%2–5',
    roi: '%150–250',
    sure: '1–3 gün',
    oncelik: 'Yüksek',
    ipucu: 'İlk izlenimi oluşturur; kapı değişimi ve bahçe düzenlemesi hızlı değer katar.',
  },
  {
    alan: 'Pencere / Isı Yalıtımı',
    yatirim: '20.000–60.000 ₺',
    degerArtis: '%3–7',
    roi: '%100–130',
    sure: '3–5 gün',
    oncelik: 'Orta–Yüksek',
    ipucu: 'Hem satış fiyatını hem de EKB sınıfını artırır; kira getiriyi de iyileştirir.',
  },
  {
    alan: 'Akıllı Ev Sistemleri',
    yatirim: '5.000–20.000 ₺',
    degerArtis: '%1–3',
    roi: '%80–120',
    sure: '1 gün',
    oncelik: 'Orta',
    ipucu: 'Genç alıcı profilinde beklenti artıyor; termostat ve güvenlik kamerası önce.',
  },
  {
    alan: 'Bahçe / Teras Düzenlemesi',
    yatirim: '5.000–25.000 ₺',
    degerArtis: '%2–5',
    roi: '%120–200',
    sure: '1–3 gün',
    oncelik: 'Orta',
    ipucu: 'Teras ve bahçeli dairelerde trendi artırır; ahşap döşeme ve bitki ile hızlı etki.',
  },
];

const KACININ_MASRAFLARI = [
  { masraf: 'Havuz / Jakuzi Kurulumu', neden: 'Bakım maliyeti yüksek; alıcıların büyük çoğunluğu ekstra masraf olarak görür.' },
  { masraf: 'Özel Aydınlatma / Dekorasyon', neden: 'Alıcının zevkine uymayabilir; nötr tercihler daha geniş kitleye ulaşır.' },
  { masraf: 'Yüksek Teknoloji Tadilat', neden: 'Piyasa değerine oranla maliyeti aşan yenilemeler geri dönüş sağlamaz.' },
  { masraf: 'Bölge Ortalamasını Aşan Kalite', neden: 'Çevresindeki konutların üzerinde tadilat yapılan mülk genellikle prim bedelini geri almaz.' },
];

const SATIS_ONCESI_KONTROL = [
  'Küçük çatlakları ve boyaları düzelt',
  'Tüm ampulleri çalışır durumda bırak',
  'Sızdıran musluk ve armatürleri tamir et',
  'Kapı ve dolap menteşelerini yağla',
  'Duvarları temizle, leke gider',
  'Zemin ve halıları temizlet',
  'Koku kaynaklarını ortadan kaldır (havalandır)',
  'Fazla eşya ve kişisel eşyaları depoya kaldır',
  'Dış cephe ve giriş kapısını temizle',
  'Balkon / terasın görünümünü iyileştir',
];

export default function EvDegerArtirmaRehberiPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <p className="text-[#00C49F] text-xs font-bold mb-3 uppercase tracking-widest">Satış Rehberi 2025</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">Ev Değer Artırma Rehberi</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            Satış veya kiralama öncesi evinizin değerini artıracak iyileştirmeler: yatırım, değer artışı ve ROI tahminleri.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-4">İyileştirme Kategorileri ve Getiri</h2>
          <div className="space-y-4">
            {IYILESTIRMELER.map((iy, i) => (
              <div key={i} className="border border-gray-100 rounded-xl p-4">
                <div className="flex items-start justify-between mb-2">
                  <p className="text-xs font-black text-gray-900">{iy.alan}</p>
                  <span className={`text-[8px] font-black px-1.5 py-0.5 rounded shrink-0 ml-3 ${iy.oncelik === 'Çok Yüksek' ? 'bg-emerald-500 text-white' : iy.oncelik === 'Yüksek' ? 'bg-[#00C49F] text-white' : 'bg-amber-100 text-amber-700'}`}>{iy.oncelik}</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-2">
                  <div>
                    <p className="text-[9px] text-gray-400">Maliyet</p>
                    <p className="text-[10px] font-bold text-gray-700">{iy.yatirim}</p>
                  </div>
                  <div>
                    <p className="text-[9px] text-gray-400">Değer Artışı</p>
                    <p className="text-[10px] font-bold text-[#00C49F]">{iy.degerArtis}</p>
                  </div>
                  <div>
                    <p className="text-[9px] text-gray-400">ROI</p>
                    <p className="text-[10px] font-bold text-emerald-600">{iy.roi}</p>
                  </div>
                  <div>
                    <p className="text-[9px] text-gray-400">Süre</p>
                    <p className="text-[10px] font-bold text-gray-500">{iy.sure}</p>
                  </div>
                </div>
                <p className="text-[10px] text-gray-400 italic">{iy.ipucu}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-4">Kaçınılması Gereken Masraflar</h2>
          <div className="space-y-3">
            {KACININ_MASRAFLARI.map((k, i) => (
              <div key={i} className="border border-rose-100 rounded-xl p-4 bg-rose-50/20">
                <p className="text-xs font-black text-rose-700 mb-1">{k.masraf}</p>
                <p className="text-[11px] text-gray-500">{k.neden}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-4">Satış Öncesi Kontrol Listesi</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {SATIS_ONCESI_KONTROL.map((s, i) => (
              <div key={i} className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50">
                <div className="w-4 h-4 border-2 border-[#00C49F] rounded shrink-0" />
                <p className="text-[11px] text-gray-700">{s}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5">
          <p className="text-xs font-black text-emerald-700 mb-2">Temel Kural</p>
          <p className="text-[11px] text-emerald-600 leading-relaxed">
            Ev değeri artışı için en yüksek ROI&apos;li iyileştirmeler sırasıyla: boya (%200-400 ROI), mutfak kapak yenileme ve zemin temizliğidir. Büyük yatırım yapmadan önce piyasa değerini ve alıcı beklentilerini bir emlak danışmanıyla gözden geçirin.
          </p>
        </div>

      </div>
    </main>
  );
}
