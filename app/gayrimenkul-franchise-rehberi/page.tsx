import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gayrimenkul Franchise Rehberi 2025 | Emlak Ofisi Açma | Söylemesi Bizden',
  description:
    'Gayrimenkul franchise: Türkiye\'nin büyük emlak markaları, başlangıç maliyetleri, komisyon yapısı ve bağımsız ofis karşılaştırması.',
};

const FRANCHISE_MARKALAR = [
  {
    marka: 'RE/MAX',
    koken: 'ABD kökenli, Türkiye\'de 1990\'dan beri',
    ilkYatirim: '150.000–300.000 ₺',
    royalti: 'Komisyonun %6–8\'i',
    agOffice: '800+ ofis (Türkiye)',
    gucu: 'Global marka bilinirliği, geniş eğitim ağı',
  },
  {
    marka: 'Century 21',
    koken: 'ABD kökenli, Türkiye\'de aktif',
    ilkYatirim: '100.000–250.000 ₺',
    royalti: 'Komisyonun %6\'sı',
    agOffice: '200+ ofis (Türkiye)',
    gucu: 'Global ağ, sabit marka standardı',
  },
  {
    marka: 'Coldwell Banker',
    koken: 'ABD kökenli, Türkiye\'de faaliyet',
    ilkYatirim: '120.000–280.000 ₺',
    royalti: 'Komisyonun %5–7\'si',
    agOffice: '150+ ofis (Türkiye)',
    gucu: 'Lüks segment odaklı',
  },
  {
    marka: 'ERA Real Estate',
    koken: 'ABD kökenli',
    ilkYatirim: '80.000–200.000 ₺',
    royalti: 'Komisyonun %5–6\'sı',
    agOffice: '100+ ofis (Türkiye)',
    gucu: 'Daha düşük başlangıç maliyeti',
  },
  {
    marka: 'Turyap',
    koken: 'Türkiye kökenli',
    ilkYatirim: '60.000–150.000 ₺',
    royalti: 'Komisyonun %5\'i',
    agOffice: '500+ ofis (Türkiye)',
    gucu: 'Yerel piyasa bilgisi, düşük royalti',
  },
];

const MALIYET_KALEMLERI = [
  { kalem: 'Franchise Giriş Ücreti', aralik: '50.000–150.000 ₺', aciklama: 'Tek seferlik marka lisans bedeli' },
  { kalem: 'Ofis Kira Teminatı', aralik: '2–3 aylık kira', aciklama: 'Lokasyona göre değişir' },
  { kalem: 'Ofis Dekor / Donanım', aralik: '50.000–120.000 ₺', aciklama: 'Marka standardına uygun düzenleme' },
  { kalem: 'İlk Pazarlama Bütçesi', aralik: '20.000–50.000 ₺', aciklama: 'Yerel tanıtım, dijital reklam' },
  { kalem: 'Yazılım / CRM Lisansı', aralik: '5.000–15.000 ₺/yıl', aciklama: 'Emlak yönetim yazılımı' },
  { kalem: 'Eğitim ve Sertifikasyon', aralik: '10.000–30.000 ₺', aciklama: 'Franchise eğitim programları' },
  { kalem: 'İşletme Sermayesi (6 ay)', aralik: '100.000–200.000 ₺', aciklama: 'Başabaş noktasına kadar nakit' },
];

const FRANCHISE_VS_BAGIMSIZ = [
  {
    kriter: 'Marka Bilinirliği',
    franchise: 'Anında güven ve tanınırlık',
    bagimsiz: 'Sıfırdan oluşturulması gerekir',
    avantaj: 'Franchise',
  },
  {
    kriter: 'Başlangıç Maliyeti',
    franchise: 'Daha yüksek (giriş ücreti + royalti)',
    bagimsiz: 'Daha düşük; esnek bütçe',
    avantaj: 'Bağımsız',
  },
  {
    kriter: 'Eğitim / Destek',
    franchise: 'Yapılandırılmış program ve mentorlik',
    bagimsiz: 'Kendi kendinize öğrenme',
    avantaj: 'Franchise',
  },
  {
    kriter: 'Komisyon Payı',
    franchise: 'Royalti kesintisi (%5–8)',
    bagimsiz: 'Tüm komisyon ofiste kalır',
    avantaj: 'Bağımsız',
  },
  {
    kriter: 'Operasyonel Özgürlük',
    franchise: 'Marka standartlarına uymak zorunlu',
    bagimsiz: 'Tam özgürlük, kendi modelini kur',
    avantaj: 'Bağımsız',
  },
  {
    kriter: 'Referans Ağı',
    franchise: 'Ulusal / uluslararası yönlendirme ağı',
    bagimsiz: 'Kişisel ağa bağımlı',
    avantaj: 'Franchise',
  },
];

const BASARI_FAKTÖRLERI = [
  { faktör: 'Lokasyon Seçimi', detay: 'Yüksek görünürlük, hedef kitle yoğunluğu, rekabet analizi yapılmış bölge' },
  { faktör: 'Danışman Kalitesi', detay: 'Satış becerisinin yanı sıra hukuki bilgi, müzakere ve müşteri ilişkileri yönetimi' },
  { faktör: 'Dijital Varlık', detay: 'Google Ads, sosyal medya ve büyük gayrimenkul platformlarında aktif ilan yönetimi' },
  { faktör: 'Nişe Odaklanma', detay: 'Lüks, yabancı alıcı, yatırım veya belirli bir ilçe gibi uzmanlık alanı belirlemek farklılaşma sağlar' },
  { faktör: 'Müşteri Referansı', detay: 'İlk 12 ayda memnun müşteri referansları büyümenin temel motoru olur' },
  { faktör: 'Nakit Yönetimi', detay: 'Komisyon tahsilat gecikmeleri için 3–6 aylık işletme sermayesi zorunludur' },
];

export default function GayrimenkulFranchiseRehberiPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <p className="text-[#00C49F] text-xs font-bold mb-3 uppercase tracking-widest">Girişimci Rehberi 2025</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">Gayrimenkul Franchise Rehberi</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            Türkiye&apos;nin büyük emlak franchise markaları, başlangıç maliyetleri, bağımsız ofis karşılaştırması ve başarı faktörleri.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-4">Türkiye&apos;deki Büyük Franchise Markaları</h2>
          <div className="space-y-3">
            {FRANCHISE_MARKALAR.map((m, i) => (
              <div key={i} className="border border-gray-100 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-black text-gray-900">{m.marka}</p>
                  <span className="text-[9px] text-gray-400 shrink-0 ml-3">{m.agOffice}</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[10px] mb-2">
                  <div>
                    <p className="text-gray-400">İlk Yatırım</p>
                    <p className="font-bold text-gray-700">{m.ilkYatirim}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Royalti</p>
                    <p className="font-bold text-[#00C49F]">{m.royalti}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Köken</p>
                    <p className="font-bold text-gray-700">{m.koken}</p>
                  </div>
                </div>
                <p className="text-[10px] text-emerald-600 font-bold">+ {m.gucu}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm overflow-x-auto">
          <h2 className="text-base font-black text-gray-900 mb-1">Başlangıç Maliyet Kalemleri</h2>
          <p className="text-xs text-gray-400 mb-4">Franchise ofisi açmak için ortalama bütçe kalemleri.</p>
          <table className="w-full text-[10px] min-w-[400px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 font-black text-gray-500">Kalem</th>
                <th className="text-center py-2 font-black text-[#00C49F]">Aralık</th>
                <th className="text-right py-2 font-black text-gray-500">Açıklama</th>
              </tr>
            </thead>
            <tbody>
              {MALIYET_KALEMLERI.map((k, i) => (
                <tr key={i} className="border-b border-gray-50 last:border-0">
                  <td className="py-2 font-black text-gray-900">{k.kalem}</td>
                  <td className="py-2 text-center font-bold text-[#00C49F]">{k.aralik}</td>
                  <td className="py-2 text-right text-gray-400">{k.aciklama}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm overflow-x-auto">
          <h2 className="text-base font-black text-gray-900 mb-4">Franchise vs Bağımsız Ofis</h2>
          <table className="w-full text-[10px] min-w-[440px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 font-black text-gray-500">Kriter</th>
                <th className="text-center py-2 font-black text-[#00C49F]">Franchise</th>
                <th className="text-center py-2 font-black text-gray-500">Bağımsız</th>
                <th className="text-right py-2 font-black text-gray-400">Kazanan</th>
              </tr>
            </thead>
            <tbody>
              {FRANCHISE_VS_BAGIMSIZ.map((r, i) => (
                <tr key={i} className="border-b border-gray-50 last:border-0">
                  <td className="py-2 font-black text-gray-900">{r.kriter}</td>
                  <td className="py-2 text-center text-gray-600">{r.franchise}</td>
                  <td className="py-2 text-center text-gray-600">{r.bagimsiz}</td>
                  <td className={`py-2 text-right font-bold ${r.avantaj === 'Franchise' ? 'text-[#00C49F]' : 'text-amber-500'}`}>{r.avantaj}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-4">Başarı Faktörleri</h2>
          <div className="space-y-3">
            {BASARI_FAKTÖRLERI.map((f, i) => (
              <div key={i} className="flex gap-3 py-2 border-b border-gray-50 last:border-0">
                <p className="text-[10px] font-black text-gray-700 w-32 shrink-0">{f.faktör}</p>
                <p className="text-[11px] text-gray-500">{f.detay}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
          <p className="text-xs font-black text-blue-700 mb-2">Yeni Girişimciye Tavsiye</p>
          <p className="text-[11px] text-blue-600 leading-relaxed">
            Franchise modeli, hızlı marka tanınırlığı ve yapılandırılmış destek sayesinde ilk yıl riskini azaltır; ancak royalti maliyeti uzun vadede karlılığı etkiler. Tecrübeli bir danışman veya ofis yöneticisi olarak önce bir franchise bünyesinde çalışmak, bağımsız ofis açmadan önce piyasayı tanımanın en düşük maliyetli yoludur.
          </p>
        </div>

      </div>
    </main>
  );
}
