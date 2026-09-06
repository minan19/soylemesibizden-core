import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kira Depozito İade Rehberi | Kiracı Hakları | Söylemesi Bizden',
  description:
    'Kira depozitosu iade süreci: yasal iade süresi, kesinti yapılabilecek durumlar, ihtarname nasıl gönderilir ve depozito iade davası.',
};

const YASAL_CERCEVE = [
  {
    baslik: 'İade Süresi',
    icerik: 'Kiracı tahliyeden sonra ev sahibi depozitoyu yasal faizi ile birlikte geri vermekle yükümlüdür. TBK\'da belirli bir süre yazılmamış olsa da uygulama 1 ay içinde iade şeklindedir; aksi halde faiz işler.',
    kanun: 'TBK md. 342',
  },
  {
    baslik: 'Depozito Tavanı',
    icerik: 'Konut kiralarında depozito konut kirası için en fazla 3 aylık kira bedeli olabilir. Bu sınırı aşan depozito talebi geçersizdir.',
    kanun: 'TBK md. 342/1',
  },
  {
    baslik: 'Kira Borçlarına Mahsup',
    icerik: 'Ödenmemiş kira, kullanım bedeli veya yan giderler depozito tutarından mahsup edilebilir; kalan miktar kiracıya iade edilir.',
    kanun: 'TBK genel hükümler',
  },
  {
    baslik: 'Zarar Kesintisi',
    icerik: 'Kiracının kusurlu davranışından doğan, olağan kullanım aşımı niteliğindeki zararlar depozitodan kesilebilir. Normal yıpranma (amortisman) kesinti konusu yapılamaz.',
    kanun: 'TBK md. 334',
  },
];

const KESINTI_YAPILABILIR = [
  { durum: 'Kiraya borçlu kalınan aylar', gecerli: true },
  { durum: 'Kiracının neden olduğu duvar çatlağı / delik', gecerli: true },
  { durum: 'Sigara yanıkları ve kalıcı lekeler', gecerli: true },
  { durum: 'Kırılan cam, fayans, lavabo', gecerli: true },
  { durum: 'Sulh mahkemesinin belirlediği hasar tazminatı', gecerli: true },
  { durum: 'Normal boya solması / eskime', gecerli: false },
  { durum: 'Halı veya zemin doğal yıpranması', gecerli: false },
  { durum: 'Kapı ve mobilya normal eskimesi', gecerli: false },
  { durum: 'Estetik yenileme veya boya maliyeti', gecerli: false },
];

const IADE_SURECI = [
  { adim: 1, baslik: 'Teslim Tutanağı Hazırlayın', aciklama: 'Evin tahliyesinde her iki tarafın imzaladığı teslim tutanağı düzenleyin; fotoğraf ve video kayıt alın.' },
  { adim: 2, baslik: 'Kira Borcunuzu Sıfırlayın', aciklama: 'Tahliyeden önce tüm kira, aidat ve fatura borçlarını kapatın; açık borç depozitoya sayılır.' },
  { adim: 3, baslik: '1 Ay Bekleyin', aciklama: 'Tahliyeden sonra 1 ay içinde ev sahibi depozitoyu iade etmelidir.' },
  { adim: 4, baslik: 'İhtarname Gönderin', aciklama: 'İade yapılmamışsa noter aracılığıyla 7 günlük süre vererek iadeyı talep edin.' },
  { adim: 5, baslik: 'Sulh Hukuk Mahkemesi', aciklama: 'İhtarnameye rağmen iade yapılmamışsa Sulh Hukuk Mahkemesi\'nde alacak davası açabilirsiniz. Depozito tutarına yasal faiz de eklenecektir.' },
];

const PRATIK_BILGILER = [
  { baslik: 'Banka Havalesi ile Ödeme', aciklama: 'Depozito nakit yerine banka havalesi ile ödenirse, ödeme belgesi ispat kolaylığı sağlar.' },
  { baslik: 'Giriş Fotoğrafı', aciklama: 'Kiraya girerken evin her odasının fotoğrafını çekin ve tarih damgalı olarak saklayın. Çıkış fotoğrafıyla karşılaştırma yapar.' },
  { baslik: 'İnterim Hesap', aciklama: 'Depozito kira sözleşmesiyle birlikte ayrı bir hesaba yatırılırsa her iki taraf için güvence oluşturur.' },
  { baslik: 'Tüketici Hakem Heyeti', aciklama: 'Küçük miktardaki depozito anlaşmazlıklarında İl Tüketici Hakem Heyeti\'ne başvurabilirsiniz; ücretsiz ve hızlıdır.' },
];

export default function KiraDepozitoIadeRehberiPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <p className="text-[#00C49F] text-xs font-bold mb-3 uppercase tracking-widest">Kiracı Rehberi</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">Kira Depozito İade Rehberi</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            Tahliye sonrası depozitonuzu nasıl geri alırsınız? Yasal haklar, kesinti kuralları ve ihtarname süreci.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">

        {/* Yasal Çerçeve */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-1">Yasal Çerçeve</h2>
          <p className="text-xs text-gray-400 mb-5">Kira depozitosu konusundaki temel yasal düzenlemeler.</p>
          <div className="space-y-4">
            {YASAL_CERCEVE.map((z, i) => (
              <div key={i} className="border border-gray-100 rounded-xl p-4">
                <div className="flex items-start justify-between mb-2">
                  <p className="text-xs font-black text-gray-900">{z.baslik}</p>
                  <span className="text-[9px] font-black text-gray-400 shrink-0 ml-2">{z.kanun}</span>
                </div>
                <p className="text-[11px] text-gray-600 leading-relaxed">{z.icerik}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Kesinti Tablosu */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-1">Depozitodan Kesilip Kesilmeyeceği</h2>
          <p className="text-xs text-gray-400 mb-5">Hangi zararlar kesintiye konu olur, hangisi olamaz?</p>
          <div className="space-y-2">
            {KESINTI_YAPILABILIR.map((k, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[9px] font-black ${k.gecerli ? 'bg-rose-100 text-rose-600' : 'bg-emerald-100 text-emerald-600'}`}>
                  {k.gecerli ? '✕' : '✓'}
                </span>
                <p className={`text-[11px] ${k.gecerli ? 'text-gray-900 font-bold' : 'text-gray-500'}`}>{k.durum}</p>
                {!k.gecerli && <span className="text-[9px] text-emerald-500 font-black shrink-0">Kesilemez</span>}
              </div>
            ))}
          </div>
        </div>

        {/* İade Süreci */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-1">Depozito İade Süreci</h2>
          <p className="text-xs text-gray-400 mb-5">Depozito alamamak durumunda adım adım ne yapmalısınız?</p>
          <div className="space-y-4">
            {IADE_SURECI.map((a) => (
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
          <p className="text-xs text-gray-400 mb-5">Depozito sorunlarını önlemek için öneriler.</p>
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
