import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Apartman Yönetimi Rehberi | Aidat ve Site Yönetimi | Söylemesi Bizden',
  description:
    'Apartman yönetimi: yönetici seçimi, aidat hesaplama, olağan ve olağanüstü toplantı, ortak gider dağılımı, yasal haklar (Kat Mülkiyeti Kanunu).',
};

const YONETIM_YAPISI = [
  {
    baslik: 'Yönetici Seçimi',
    aciklama: 'Yönetici, kat maliklerinin salt çoğunluğu (en az yarı + 1) ile seçilir. Yönetici kat maliki olmak zorunda değildir; dışarıdan profesyonel yönetici atanabilir.',
    kanun: 'KMK md. 34',
  },
  {
    baslik: 'Denetçi / Denetim Kurulu',
    aciklama: 'Sekiz ve daha fazla bağımsız bölümlü yapılarda denetçi ya da denetim kurulu seçimi zorunludur. Denetçi yöneticinin hesaplarını ve işlemlerini denetler.',
    kanun: 'KMK md. 41',
  },
  {
    baslik: 'Olağan Genel Kurul',
    aciklama: 'Her takvim yılının ilk üç ayı içinde yapılması zorunludur. Toplantı günden en az 15 gün önce tüm kat maliklerine yazılı bildirim yapılmalıdır.',
    kanun: 'KMK md. 29',
  },
  {
    baslik: 'Olağanüstü Genel Kurul',
    aciklama: 'Yönetici, gerekli gördüğünde ya da kat maliklerinin beşte birinin yazılı talebi üzerine her zaman olağanüstü toplantı çağrısı yapabilir.',
    kanun: 'KMK md. 29/2',
  },
];

const AIDAT_TURLERI = [
  { tur: 'İşletme Gideri', aciklama: 'Asansör bakımı, temizlik, ortak alan elektrik, personel ücreti, sigorta.' },
  { tur: 'Avans Ödemesi', aciklama: 'Büyük tamir veya yenileme için önceden toplanan fon. Yönetim planında belirtilir.' },
  { tur: 'Olağanüstü Gider', aciklama: 'Ani çatı tamiri, deprem hasarı gibi plansız büyük harcamalar için ek aidat.' },
  { tur: 'Bakım Fonu', aciklama: 'Uzun vadeli bina bakımı için biriktirilen yedek akçe. Karar gerektirirse oy çokluğu aranır.' },
];

const GIDER_DAGILIM = [
  { yontem: 'Arsa Payı', aciklama: 'En yaygın yöntem; her dairenin tapudaki arsa payı oranında ödeme yapılır.', avantaj: 'Hukuki güvenceli' },
  { yontem: 'Eşit Pay', aciklama: 'Tüm daireler eşit miktarda öder; küçük daire sahipleri için avantajlı.', avantaj: 'Hesaplaması kolay' },
  { yontem: 'Karma Sistem', aciklama: 'Sabit giderler eşit, değişken giderler arsa payıyla paylaştırılır.', avantaj: 'Dengeli' },
];

const YUKUMLULUKLER = [
  { taraf: 'Yönetici', yükümlülük: 'Yıllık hesap raporu hazırlamak ve genel kurula sunmak.' },
  { taraf: 'Yönetici', yükümlülük: 'Ortak giderleri tahsil etmek; ödemeyen kat malikine karşı yasal takip başlatmak.' },
  { taraf: 'Kat Maliki', yükümlülük: 'Tespit edilen aidatı zamanında ödemek; gecikme faizinden sorumlu olmak.' },
  { taraf: 'Kat Maliki', yükümlülük: 'Bağımsız bölümde diğer kat maliklerini rahatsız edecek faaliyette bulunmamak.' },
  { taraf: 'Kiracı', yükümlülük: 'Ortak alanlara zarar vermemek; yönetim tarafından kat malikine yönlendirilen taleplere uymak.' },
];

const PRATIK_BILGILER = [
  { baslik: 'Aidat Ödemeyen Kat Maliki', aciklama: 'Ödemeyen kat malikine aylık %5 gecikme faizi uygulanır. İcra veya dava yoluna gidilebilir (KMK md. 20).' },
  { baslik: 'Ortak Alan Değişikliği', aciklama: 'Ortak alanlarda esaslı değişiklik (bölme, ekleme vb.) tüm kat maliklerinin onayını gerektirir.' },
  { baslik: 'Yönetim Planı', aciklama: 'Yönetim planı tapuya tescil edilir; tüm malikler ve kiracılar için bağlayıcıdır. Değiştirmek için beşte dört oy gerekir.' },
  { baslik: 'Bağımsız Bölüm Kullanımı', aciklama: 'Daireler yönetim planında yazan amaca uygun kullanılmalıdır. Konut için tescilli yerde ticari faaliyet yasaktır.' },
  { baslik: 'Asansör Bakımı', aciklama: 'Asansör periyodik bakımı yönetici sorumluluğundadır; ihmal durumunda yönetici hukuken sorumlu tutulabilir.' },
  { baslik: 'Sigorta Zorunluluğu', aciklama: 'DASK (zorunlu deprem sigortası) tüm bağımsız bölümler için zorunludur. Ortak yapı sigortası yönetim kararıyla yapılır.' },
];

export default function ApartmanYonetimiRehberiPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <p className="text-[#00C49F] text-xs font-bold mb-3 uppercase tracking-widest">Konut Yönetimi</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">Apartman Yönetimi Rehberi</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            Yönetici seçimi, aidat dağılımı, toplantı kuralları ve kat maliki haklarına dair kapsamlı rehber.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">

        {/* Yönetim Yapısı */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-1">Yönetim Yapısı ve Organlar</h2>
          <p className="text-xs text-gray-400 mb-5">Kat Mülkiyeti Kanunu çerçevesinde yönetici ve denetçi seçimi.</p>
          <div className="space-y-4">
            {YONETIM_YAPISI.map((y, i) => (
              <div key={i} className="border border-gray-100 rounded-xl p-4">
                <div className="flex items-start justify-between mb-2">
                  <p className="text-xs font-black text-gray-900">{y.baslik}</p>
                  <span className="text-[9px] text-gray-400 shrink-0 ml-2">{y.kanun}</span>
                </div>
                <p className="text-[11px] text-gray-600 leading-relaxed">{y.aciklama}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Aidat Türleri */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-1">Aidat Türleri</h2>
          <p className="text-xs text-gray-400 mb-5">Ortak giderlerin hangi başlıklar altında toplanacağı.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {AIDAT_TURLERI.map((a, i) => (
              <div key={i} className="border border-gray-100 rounded-xl p-4">
                <p className="text-xs font-black text-[#00C49F] mb-1">{a.tur}</p>
                <p className="text-[11px] text-gray-600 leading-relaxed">{a.aciklama}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Gider Dağılım Yöntemleri */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm overflow-x-auto">
          <h2 className="text-base font-black text-gray-900 mb-1">Gider Dağılım Yöntemleri</h2>
          <p className="text-xs text-gray-400 mb-5">Aidat hesaplamada kullanılan başlıca yöntemler.</p>
          <table className="w-full text-[10px] min-w-[360px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 font-black text-gray-500">Yöntem</th>
                <th className="text-left py-2 font-black text-gray-500">Açıklama</th>
                <th className="text-right py-2 font-black text-[#00C49F]">Avantaj</th>
              </tr>
            </thead>
            <tbody>
              {GIDER_DAGILIM.map((g, i) => (
                <tr key={i} className="border-b border-gray-50 last:border-0">
                  <td className="py-2 font-black text-gray-900 w-32">{g.yontem}</td>
                  <td className="py-2 font-bold text-gray-600">{g.aciklama}</td>
                  <td className="py-2 text-right font-black text-[#00C49F] w-28">{g.avantaj}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Yükümlülükler */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm overflow-x-auto">
          <h2 className="text-base font-black text-gray-900 mb-1">Tarafların Yükümlülükleri</h2>
          <p className="text-xs text-gray-400 mb-5">Yönetici, kat maliki ve kiracının sorumlulukları.</p>
          <table className="w-full text-[10px] min-w-[360px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 font-black text-gray-500">Taraf</th>
                <th className="text-left py-2 font-black text-gray-500">Yükümlülük</th>
              </tr>
            </thead>
            <tbody>
              {YUKUMLULUKLER.map((y, i) => (
                <tr key={i} className="border-b border-gray-50 last:border-0">
                  <td className={`py-2 font-black w-28 ${y.taraf === 'Yönetici' ? 'text-[#00C49F]' : y.taraf === 'Kat Maliki' ? 'text-blue-500' : 'text-gray-500'}`}>{y.taraf}</td>
                  <td className="py-2 font-bold text-gray-600">{y.yükümlülük}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pratik Bilgiler */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-1">Pratik Bilgiler</h2>
          <p className="text-xs text-gray-400 mb-5">Apartman yönetiminde sık karşılaşılan durumlar.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PRATIK_BILGILER.map((b, i) => (
              <div key={i} className="border border-gray-100 rounded-xl p-4">
                <p className="text-xs font-black text-gray-900 mb-1">{b.baslik}</p>
                <p className="text-[11px] text-gray-500 leading-relaxed">{b.aciklama}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
          <p className="text-xs font-black text-amber-700 mb-2">Hukuki Uyarı</p>
          <p className="text-[11px] text-amber-600 leading-relaxed">
            Bu sayfa genel bilgi amaçlıdır. Apartman yönetimi uyuşmazlıklarında bir avukattan veya Kat Mülkiyeti Kanunu konusunda uzman bir hukuk danışmanından profesyonel destek almanız önerilir.
          </p>
        </div>

      </div>
    </main>
  );
}
