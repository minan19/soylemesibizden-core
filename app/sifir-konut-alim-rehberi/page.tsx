import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sıfır Konut Alım Rehberi 2025 | Müteahhit Seçimi ve Teslim Süreci | Söylemesi Bizden',
  description:
    'Sıfır konut alımı: müteahhit araştırması, ön satış sözleşmesi, kat irtifakı, teslim kontrol listesi ve yasal güvenceler.',
};

const AVANTAJLAR_DEZAVANTAJLAR = [
  {
    baslik: 'Avantajlar',
    maddeler: [
      'Yeni yapı — modern altyapı, enerji verimliliği, A/B EKB sınıfı',
      'Kişiselleştirme imkânı — kat planı, malzeme seçenekleri (projeye göre)',
      'Garanti hakları — yapı müteahhidi 5 yıl ayıp garantisi',
      'Düşük bakım maliyeti — ilk yıllarda bakım-onarım gideri minimumda',
      'KDV avantajı — 150 m² altında %1 KDV (konut)',
      'Kira muafiyeti — kendi evine taşınma planı yapanlara yüksek getiri',
    ],
    renk: 'emerald',
  },
  {
    baslik: 'Riskler',
    maddeler: [
      'Proje iptal veya iflas riski — teslim garantisi olmayabilir',
      'Teslim gecikmesi — Türkiye\'de ortalama 6–24 ay gecikme yaygındır',
      'Temsili görselle fark — teslim edilen bağımsız bölüm vaatlerden farklı olabilir',
      'Kredi faiz riski — uzun inşaat dönemi boyunca taksit ödenirken faiz değişebilir',
      'Isı yalıtım/ses sorunları — yeni yapıda bile kalite farkı büyük',
      'Sosyal çevre henüz oluşmamış — site tam doluluğa ulaşana dek eksik altyapı',
    ],
    renk: 'rose',
  },
];

const ON_SATIS_SOZLESMESI = [
  { madde: 'Bağımsız bölüm numarası ve tapu kaydı bilgisi', zorunlu: true },
  { madde: 'Net ve brüt m² — kat planı eki ile birlikte', zorunlu: true },
  { madde: 'Toplam satış bedeli ve ödeme planı', zorunlu: true },
  { madde: 'Tahmini teslim tarihi ve gecikme cezası', zorunlu: true },
  { madde: 'Cayma hakkı (bireysel tüketici için 14 gün)', zorunlu: true },
  { madde: 'İnşaat standardı ve malzeme teknik şartnamesi', zorunlu: true },
  { madde: 'Kat irtifakı veya kat mülkiyeti tesis taahhüdü', zorunlu: true },
  { madde: 'Sigorta ve yapı denetim bilgileri', zorunlu: false },
  { madde: 'Ortak alan ve sosyal tesis taahhütleri', zorunlu: false },
  { madde: 'Tapu devri koşulları', zorunlu: false },
];

const MUTEAHHIT_ARASTIRMA = [
  { kontrol: 'Yapı Denetim Sicil Kaydı', nereden: 'Çevre Şehircilik Bakanlığı e-denetim sistemi', onem: 'Kritik' },
  { kontrol: 'Vergi Borcu Yokluğu', nereden: 'Gelir İdaresi Başkanlığı (e-devlet)', onem: 'Kritik' },
  { kontrol: 'SGK Borcu', nereden: 'SGK sorgu (e-devlet)', onem: 'Yüksek' },
  { kontrol: 'İcra ve Haciz Kaydı', nereden: 'UYAP yargı sistemleri veya avukat aracılığıyla', onem: 'Yüksek' },
  { kontrol: 'Referans Projeler', nereden: 'Fiilen teslim edilmiş proje sakinleriyle görüşme', onem: 'Yüksek' },
  { kontrol: 'İnşaat Ruhsatı', nereden: 'Belediye yapı ruhsat birimi', onem: 'Kritik' },
  { kontrol: 'Banka Teminat Mektubu', nereden: 'Müteahhitten talep et', onem: 'Orta' },
];

const TESLIM_KONTROL = [
  'Bağımsız bölüm numarasının tapuyla ve sözleşmeyle uyumunu kontrol et',
  'Net m² ölçümünü bizzat veya yetkili teknik uzmanla yaptır',
  'Tüm su ve elektrik tesisatını çalıştırarak test et',
  'Kapı ve pencere kasaları, kilit sistemleri eksiksiz mi kontrol et',
  'Duvarlarda çatlak, rutubet ve sıva kusurlarını belgele (fotoğraf/video)',
  'Mutfak ve banyo malzemelerinin şartnamedeki ürünlerle uyumunu doğrula',
  'Isıtma ve soğutma sistemlerini çalıştır, etkinliğini ölç',
  'Ortak alan ve asansörün teslimatta çalışır durumda olduğunu teyit et',
  'İskan ruhsatının alınmış olduğunu belgeden teyit et',
  'Ayıp listesi (punch list) düzenle ve müteahhide imzalat',
];

const YASAL_GUVENCELER = [
  {
    guvence: 'Tüketici Kanunu Cayma Hakkı',
    kapsam: 'Ön satış sözleşmesinden 14 gün içinde sebebsiz cayma hakkı',
    kanun: '6502 sayılı TKK',
  },
  {
    guvence: 'Ayıp Garantisi',
    kapsam: 'Teslimden itibaren 5 yıl yapı müteahhidi sorumluluğu; gizli ayıplar için süre uzar',
    kanun: 'TBK md. 474–479',
  },
  {
    guvence: 'Teslim Gecikmesi Tazminatı',
    kapsam: 'Sözleşmede belirtilen tarihi aşan her gün için gecikme tazminatı talep hakkı',
    kanun: 'Sözleşme hükmü + TBK',
  },
  {
    guvence: 'Yapı Denetim Sistemi',
    kapsam: 'Bağımsız yapı denetim kuruluşu zorunlu; proje aşamalarını denetler',
    kanun: '4708 sayılı Yapı Denetim Kanunu',
  },
];

export default function SifirKonutAlimRehberiPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <p className="text-[#00C49F] text-xs font-bold mb-3 uppercase tracking-widest">Alıcı Rehberi 2025</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">Sıfır Konut Alım Rehberi</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            Müteahhit araştırmasından ön satış sözleşmesine, teslim kontrolünden yasal güvencelere: yeni konut alımı rehberi.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-4">Avantajlar ve Riskler</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {AVANTAJLAR_DEZAVANTAJLAR.map((blok, i) => (
              <div key={i} className={`rounded-xl p-4 border ${blok.renk === 'emerald' ? 'border-emerald-100 bg-emerald-50/30' : 'border-rose-100 bg-rose-50/20'}`}>
                <p className={`text-xs font-black mb-3 ${blok.renk === 'emerald' ? 'text-emerald-700' : 'text-rose-700'}`}>{blok.baslik}</p>
                <ul className="space-y-1.5">
                  {blok.maddeler.map((m, j) => (
                    <li key={j} className="text-[10px] text-gray-600 flex gap-2">
                      <span className={`shrink-0 ${blok.renk === 'emerald' ? 'text-emerald-500' : 'text-rose-400'}`}>{blok.renk === 'emerald' ? '✓' : '✗'}</span>
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm overflow-x-auto">
          <h2 className="text-base font-black text-gray-900 mb-1">Müteahhit Araştırma Kontrolleri</h2>
          <p className="text-xs text-gray-400 mb-4">Satın almadan önce bu kontrolleri mutlaka yapın.</p>
          <table className="w-full text-[10px] min-w-[400px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 font-black text-gray-500">Kontrol</th>
                <th className="text-center py-2 font-black text-gray-500">Kaynak</th>
                <th className="text-right py-2 font-black text-[#00C49F]">Önem</th>
              </tr>
            </thead>
            <tbody>
              {MUTEAHHIT_ARASTIRMA.map((k, i) => (
                <tr key={i} className="border-b border-gray-50 last:border-0">
                  <td className="py-2 font-black text-gray-900">{k.kontrol}</td>
                  <td className="py-2 text-center text-gray-500">{k.nereden}</td>
                  <td className={`py-2 text-right font-bold ${k.onem === 'Kritik' ? 'text-rose-500' : k.onem === 'Yüksek' ? 'text-amber-500' : 'text-gray-400'}`}>{k.onem}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-4">Ön Satış Sözleşmesi Zorunlu Maddeleri</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {ON_SATIS_SOZLESMESI.map((m, i) => (
              <div key={i} className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50">
                <div className={`w-4 h-4 border-2 rounded shrink-0 flex items-center justify-center ${m.zorunlu ? 'border-[#00C49F] bg-[#00C49F]' : 'border-gray-300'}`}>
                  {m.zorunlu && <span className="text-white text-[8px]">✓</span>}
                </div>
                <p className="text-[11px] text-gray-700">{m.madde}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-4">Teslim Kontrol Listesi</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {TESLIM_KONTROL.map((t, i) => (
              <div key={i} className="flex items-start gap-2 p-2 rounded-lg hover:bg-gray-50">
                <div className="w-4 h-4 border-2 border-[#00C49F] rounded shrink-0 mt-0.5" />
                <p className="text-[11px] text-gray-700">{t}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-4">Yasal Güvenceler</h2>
          <div className="space-y-3">
            {YASAL_GUVENCELER.map((g, i) => (
              <div key={i} className="border border-gray-100 rounded-xl p-4">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs font-black text-gray-900">{g.guvence}</p>
                  <span className="text-[9px] text-[#00C49F] font-bold shrink-0 ml-3">{g.kanun}</span>
                </div>
                <p className="text-[11px] text-gray-500">{g.kapsam}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
          <p className="text-xs font-black text-amber-700 mb-2">Kritik Uyarı</p>
          <p className="text-[11px] text-amber-600 leading-relaxed">
            Ön satış aşamasında en sık yapılan hata sözleşmeyi okumadan imzalamaktır. Gecikme cezası, cayma hakkı süresi ve ayıp ihbar yükümlülüğü gibi maddeler tapu tescilinden sonra değiştirilemez. Büyük bir taahhüt öncesinde bir gayrimenkul avukatından sözleşme incelemesi yaptırmanız maliyetinizin en verimli kullanımı olacaktır.
          </p>
        </div>

      </div>
    </main>
  );
}
