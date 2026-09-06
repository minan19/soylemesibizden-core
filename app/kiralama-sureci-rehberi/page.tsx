import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kiralama Süreci Rehberi | Adım Adım | Söylemesi Bizden',
  description:
    'Türkiye\'de kira süreci rehberi: ilan araştırması, ön görüşme, sözleşme, depozito ve taşınma adımları. Kiracı ve mal sahibi için pratik bilgiler.',
};

const ADIMLAR = [
  {
    adim: 1,
    baslik: 'İlan Araştırması ve Bütçe',
    sure: '1–2 hafta',
    aciklama: 'İhtiyaçlarınıza uygun konut tipini ve bütçeyi belirleyin. Kira gelirin %30\'unu aşmamalı. Farklı platformlarda aynı bölgeyi karşılaştırın.',
    kontroller: ['Ulaşım güzergahı hesapla', 'Aidat miktarını sor', 'Bölge kira ortalamasını araştır', 'Bütçede toplam maliyeti (aidat+kira) hesapla'],
  },
  {
    adim: 2,
    baslik: 'Ön Görüşme ve Ziyaret',
    sure: '3–7 gün',
    aciklama: 'Daireyi gündüz saatlerinde ziyaret edin. Komşuları, yönetimi ve binanın genel durumunu değerlendirin. Fotoğraf çekin.',
    kontroller: ['Nem ve rutubet kontrol et', 'Su tesisatını test et', 'Asansör ve ortak alan durumunu gör', 'Gürültü seviyesini ölç', 'İnternet altyapısını sor'],
  },
  {
    adim: 3,
    baslik: 'Müzakere ve Koşulların Belirlenmesi',
    sure: '1–3 gün',
    aciklama: 'Kira bedelini, artış oranını, depozito miktarını ve sözleşme süresini müzakere edin. Her anlaşmayı yazılı belgeleyin.',
    kontroller: ['Kira artış oranını netleştir (TÜFE bağlı)', 'Depozito tutarını ve iadesini belirle', 'Aidat sorumluluğunu netleştir', 'Onarım sorumluluklarını yaz'],
  },
  {
    adim: 4,
    baslik: 'Sözleşme Hazırlama ve İmzalama',
    sure: '1–2 gün',
    aciklama: 'Kira sözleşmesi noterde veya adi yazılı şekilde düzenlenebilir. Tüm tarafların imzalaması ve her sayfanın paraflanması şarttır.',
    kontroller: ['Tüm tarafların kimlik bilgisi', 'Kiralık mülkün tam adresi ve tapu bilgisi', 'Kira başlangıç tarihi', 'Fesih koşulları', 'Kefil varsa kefil beyanı'],
  },
  {
    adim: 5,
    baslik: 'Depozito ve Ön Ödeme',
    sure: '1 gün',
    aciklama: 'Depozito makbuz karşılığı ödenmeli; ideal olarak bloke hesaba yatırılmalıdır. Peşin kira varsa bunu da belgelendirin.',
    kontroller: ['Makbuz veya havale belgesi al', 'Banka hesap bilgisini kaydet', 'Ödeme tarihini kaydet'],
  },
  {
    adim: 6,
    baslik: 'Taşınma ve Demirbaş Tutanağı',
    sure: '1 gün',
    aciklama: 'Taşınma günü evin mevcut durumunu fotoğrafla belgeleyin. Her iki tarafça imzalanan demirbaş tutanağı ilerideki anlaşmazlıkları önler.',
    kontroller: ['Her odanın fotoğrafını çek', 'Mevcut hasarları tutanağa yaz', 'Sayaç okumalarını kaydet (doğalgaz, elektrik, su)', 'Anahtarları teslim al', 'Demirbaş listesini yap'],
  },
];

const BELGELER = [
  { belge: 'Nüfus cüzdanı / Pasaport', kimden: 'Kiracı ve Mal Sahibi', zorunlu: true },
  { belge: 'Gelir belgesi / Maaş bordrosu', kimden: 'Kiracı', zorunlu: true },
  { belge: 'Tapu senedi fotokopisi', kimden: 'Mal Sahibi', zorunlu: true },
  { belge: 'Kefil kimlik ve beyanı', kimden: 'Kefil', zorunlu: false },
  { belge: 'Vergi levhası (serbest meslek)', kimden: 'Kiracı (varsa)', zorunlu: false },
  { belge: 'Banka hesap özeti', kimden: 'Kiracı', zorunlu: false },
  { belge: 'İkametgah belgesi (eski ev)', kimden: 'Kiracı', zorunlu: false },
];

const MALIYET_KALEMLERI = [
  { kalem: 'Depozito', miktar: '2–3 aylık kira', not: 'Sözleşme sonunda iade edilir' },
  { kalem: 'İlk kira ödemesi', miktar: '1 aylık kira', not: 'Genellikle peşin istenir' },
  { kalem: 'Taşıma masrafı', miktar: '2.000–10.000 ₺', not: 'Ev büyüklüğüne bağlı' },
  { kalem: 'Bağlantı / Abonelik', miktar: '500–2.000 ₺', not: 'Elektrik, su, doğalgaz devri' },
  { kalem: 'Kilit değiştirme', miktar: '200–500 ₺', not: 'Önerilir ama zorunlu değil' },
];

export default function KiralamaSureciRehberiPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <p className="text-[#00C49F] text-xs font-bold mb-3 uppercase tracking-widest">Kiracı Rehberi</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">Kiralama Süreci Rehberi</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            İlan araştırmasından taşınmaya kadar kiralama sürecinin her adımı: kontrol listeleri, belgeler ve maliyet kalemleri.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">

        {/* Adımlar */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-5">Kiralama Adımları</h2>
          <div className="space-y-5">
            {ADIMLAR.map((a) => (
              <div key={a.adim} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <span className="w-8 h-8 rounded-full bg-[#00C49F] text-white text-[11px] font-black flex items-center justify-center shrink-0">{a.adim}</span>
                  {a.adim < ADIMLAR.length && <div className="w-0.5 flex-1 bg-gray-100 mt-2" />}
                </div>
                <div className="flex-1 pb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-xs font-black text-gray-900">{a.baslik}</p>
                    <span className="text-[9px] text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded">{a.sure}</span>
                  </div>
                  <p className="text-[11px] text-gray-500 leading-relaxed mb-3">{a.aciklama}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {a.kontroller.map((k, ki) => (
                      <div key={ki} className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded border border-[#00C49F] shrink-0" />
                        <span className="text-[10px] text-gray-600">{k}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Belgeler */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm overflow-x-auto">
          <h2 className="text-base font-black text-gray-900 mb-1">Gerekli Belgeler</h2>
          <p className="text-xs text-gray-400 mb-5">Kira sözleşmesi için hazırlanması gereken belgeler.</p>
          <table className="w-full text-[10px] min-w-[400px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 font-black text-gray-500">Belge</th>
                <th className="text-center py-2 font-black text-gray-500">Kimden</th>
                <th className="text-right py-2 font-black text-gray-500">Zorunlu</th>
              </tr>
            </thead>
            <tbody>
              {BELGELER.map((b, i) => (
                <tr key={i} className="border-b border-gray-50 last:border-0">
                  <td className="py-2 font-black text-gray-900">{b.belge}</td>
                  <td className="py-2 text-center font-bold text-gray-600">{b.kimden}</td>
                  <td className="py-2 text-right">
                    {b.zorunlu ? (
                      <span className="text-[9px] font-black text-[#00C49F] bg-[#00C49F]/10 px-1.5 py-0.5 rounded">Zorunlu</span>
                    ) : (
                      <span className="text-[9px] font-black text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded">İsteğe Bağlı</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Maliyet Kalemleri */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-4">Taşınma Maliyet Kalemleri</h2>
          <div className="space-y-3">
            {MALIYET_KALEMLERI.map((m, i) => (
              <div key={i} className="flex items-start justify-between border border-gray-100 rounded-xl p-3">
                <div>
                  <p className="text-xs font-black text-gray-900">{m.kalem}</p>
                  <p className="text-[10px] text-gray-500">{m.not}</p>
                </div>
                <span className="text-[11px] font-black text-[#00C49F] shrink-0 ml-4">{m.miktar}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
          <p className="text-xs font-black text-amber-700 mb-2">Önemli: Vergi Yükümlülüğü</p>
          <p className="text-[11px] text-amber-600 leading-relaxed">
            Kira ödemelerinizi banka havalesiyle yapın. Nakit kira ödemelerinde mal sahibinin vergi bildirimi yükümlülüğü bulunmaktadır. Kiracı olarak banka transferi dekontu, ileride doğabilecek uyuşmazlıklarda ispat gücü taşır.
          </p>
        </div>

      </div>
    </main>
  );
}
