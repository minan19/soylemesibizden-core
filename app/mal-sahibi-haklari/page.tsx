import { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, AlertTriangle, ArrowRight, Home } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Mal Sahibi Hakları Rehberi | Tahliye, Kira Artışı, Hasar | Söylemesi Bizden',
  description:
    'Ev sahiplerinin yasal hakları: tahliye sebepleri ve süreçleri, kira artışı, mülkü kullanma ihtiyacı, hasar tazminatı ve kötü kiracıya karşı hukuki yollar.',
};

const MAL_SAHIBI_HAKLARI = [
  { hak: 'Kira Artışı Yapma', aciklama: 'Yıllık kira artışını yasal sınır (2024: %25 TÜFE tavanı) çerçevesinde uygulamak; sözleşmede düzenleme yoksa TÜFE oranı esas alınır.' },
  { hak: 'Taşınmazı İnceleme', aciklama: 'Kiracıya önceden bildirim yaparak (48–72 saat) makul aralıklarla mülkü inceleme hakkına sahipsiniz; anlık baskın giremezsiniz.' },
  { hak: 'Depozito Kesintisi', aciklama: 'Kiracının verdiği hasar veya ödenmemiş borçlar için depozitoya yasal olarak el koyabilir, mahsup yapabilirsiniz.' },
  { hak: 'Hasar Tazminatı', aciklama: 'Depozitoyu aşan zararlar için icra veya mahkeme yoluyla tazminat talep etme hakkınız mevcuttur.' },
  { hak: 'Tahliye Davası Açma', aciklama: 'Yasal tahliye sebeplerinden biri gerçekleştiğinde mahkeme yoluyla tahliye talep edebilirsiniz.' },
  { hak: 'Sözleşme Yenilememe', aciklama: '10 yıllık uzama dönemini dolduran kiracıya, sözleşme bitiminde 3 ay önceden bildirimde bulunarak fesih yapabilirsiniz.' },
];

const TAHLIYE_SEBEPLERI = [
  { sebep: 'Kira Borcunu Ödememe', aciklama: 'Kiracı, yazılı ihtara rağmen kirayı ödemezse 30 gün içinde tahliye davası açılabilir; iki haklı ihtar yeterlidir (TBK m.352).', sure: '30 Gün' },
  { sebep: 'Mal Sahibinin Konut İhtiyacı', aciklama: 'Mal sahibi veya birinci derece yakını taşınmazda oturmak isterse, sözleşme bitiminde 1 ay önceden ihtar göndererek tahliye talep edebilir.', sure: 'Sözleşme Bitimi' },
  { sebep: 'Esaslı Tamir / Yıkım', aciklama: 'Yapının yıkılması veya esaslı onarım gerektirmesi halinde kiracı tahliye edilebilir; tahliyeden sonra 3 yıl aynı kiracıya kiralamak zorunluluğu var.', sure: 'İnşaat Süresi' },
  { sebep: 'Sözleşmeye Aykırı Kullanım', aciklama: 'Kiracının mülkü sözleşme dışında (ticari amaçla veya zarar verecek şekilde) kullanması tahliye gerekçesidir.', sure: 'İhtar Sonrası' },
  { sebep: 'Taşınmazın Satılması', aciklama: 'Satış tek başına tahliye nedeni değildir; yeni malik mevcut sözleşmeye uymak zorundadır ve ancak yasal süreler içinde tahliye talep edebilir.', sure: '6 Ay Sonra' },
];

const TAHLIYE_SURECI = [
  { adim: 'Yazılı İhtar (Noter)', aciklama: 'Tahliye isteğini noter ihtarnamesiyle kiracıya tebliğ edin; bu yasal sürecin başlangıcıdır.' },
  { adim: 'İhtara Yanıt Bekleme', aciklama: 'Kiracıya ihtar tebliğ tarihinden itibaren sözleşmede veya kanunda öngörülen süreyi tanıyın.' },
  { adim: 'Arabuluculuk (Zorunlu)', aciklama: 'Tahliye davası öncesinde arabuluculuk zorunludur; uzlaşılırsa mahkemesiz çözüm sağlanır.' },
  { adim: 'Sulh Hukuk Mahkemesi', aciklama: 'Arabuluculukta uzlaşılamazsa Sulh Hukuk Mahkemesi\'ne tahliye davası açılır.' },
  { adim: 'İcra Takibi', aciklama: 'Mahkeme kararı kesinleştikten sonra kiracı çıkmazsa icra müdürlüğüne başvurulur; zorla tahliye yapılır.' },
];

const PRATIK_BILGILER = [
  { bilgi: 'Giriş Tutanağı', detay: 'Kiracıya teslim günü fotoğraflı tutanak düzenleyin; hasar ispat sürecinizi kolaylaştırır.' },
  { bilgi: 'Yazılı Sözleşme', detay: 'Sözlü kira sözleşmesi yasal olarak geçerli olsa da ispat güçlüğü nedeniyle yazılı sözleşme zorunludur.' },
  { bilgi: 'Kira Banka Havalesi', detay: 'Kiraları banka hesabınıza aldığınızı belgeleyin; ödenmeme iddiasında ispat kolaylaşır.' },
  { bilgi: 'İki Haklı İhtar Kuralı', detay: 'Bir kira yılı içinde iki farklı ayda ödeme gecikirse iki haklı ihtar tamamlanır; bu tahliye için yeterli yasal dayanak oluşturur.' },
];

export default function MalSahibiHaklariPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <Home size={13} /> Mal Sahibi Hakları
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Mal Sahibi Hakları Rehberi
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            Ev sahibinin yasal hakları, tahliye sebepleri, süreç adımları ve kötü kiracıya karşı başvuru yolları.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-[#00C49F]">5 Adım</p>
              <p className="text-xs text-gray-400">Tahliye süreci</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">2 İhtar</p>
              <p className="text-xs text-gray-400">Kira borcunda yeterli</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-400">TBK 352</p>
              <p className="text-xs text-gray-400">Yasal dayanak</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* Temel Haklar */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle size={14} className="text-[#00C49F]" /> Temel Mal Sahibi Hakları
          </h2>
          <div className="space-y-2">
            {MAL_SAHIBI_HAKLARI.map((h, i) => (
              <div key={i} className="flex items-start gap-3 py-2 border-b border-gray-50 last:border-0">
                <CheckCircle size={12} className="text-[#00C49F] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-black text-gray-900">{h.hak}</p>
                  <p className="text-[10px] text-gray-500 mt-0.5">{h.aciklama}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tahliye Sebepleri */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Yasal Tahliye Sebepleri</h2>
          <div className="space-y-3">
            {TAHLIYE_SEBEPLERI.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                <div className="flex items-start justify-between mb-1">
                  <p className="text-xs font-black text-[#00C49F]">{t.sebep}</p>
                  <span className="text-[10px] bg-amber-50 text-amber-600 font-black px-2 py-0.5 rounded shrink-0">{t.sure}</span>
                </div>
                <p className="text-[10px] text-gray-600 leading-relaxed">{t.aciklama}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tahliye Süreci */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4">Tahliye Süreci</h2>
          <div className="space-y-3">
            {TAHLIYE_SURECI.map((a, i) => (
              <div key={i} className="flex items-start gap-2 py-2 border-b border-gray-50 last:border-0">
                <div className="w-5 h-5 rounded-full bg-[#00C49F] text-white text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">{i + 1}</div>
                <div>
                  <p className="text-xs font-black text-gray-900">{a.adim}</p>
                  <p className="text-[10px] text-gray-600 leading-relaxed mt-0.5">{a.aciklama}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pratik Bilgiler */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4">Pratik Bilgiler</h2>
          <div className="space-y-3">
            {PRATIK_BILGILER.map((p, i) => (
              <div key={i} className="grid grid-cols-3 gap-2 py-2 border-b border-gray-50 last:border-0">
                <p className="text-xs font-black text-[#00C49F]">{p.bilgi}</p>
                <p className="text-[10px] text-gray-600 leading-relaxed col-span-2">{p.detay}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Uyarı */}
        <section className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <AlertTriangle size={14} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 leading-relaxed">
            <span className="font-black">Önemli:</span> Kiracıyı zorla çıkarmak, kapısına kilit vurmak veya su/elektriği kesmek hukuka aykırıdır ve cezai yaptırıma yol açabilir. Her durumda yasal yolları tercih edin.
          </p>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Araçlar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/kiraci-haklari', label: 'Kiracı Hakları' },
              { href: '/tahliye-sureci', label: 'Tahliye Süreci Rehberi' },
              { href: '/depozito-yonetimi', label: 'Depozito Yönetimi Rehberi' },
              { href: '/kira-artis-hesaplama', label: 'Kira Artış Hesaplayıcı' },
              { href: '/kira-geliri-vergisi', label: 'Kira Geliri Vergisi' },
              { href: '/sozlesme-iptal-cayma', label: 'Sözleşme İptal Rehberi' },
            ].map(l => (
              <Link key={l.href} href={l.href}
                className="flex items-center gap-2 p-3 rounded-xl bg-gray-50 hover:bg-[#F0FDF8] border border-transparent hover:border-[#00C49F]/20 transition-all group"
              >
                <ArrowRight size={12} className="text-gray-300 group-hover:text-[#00C49F] transition-colors shrink-0" />
                <span className="text-xs text-gray-700 group-hover:text-[#00C49F] font-medium transition-colors">{l.label}</span>
              </Link>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}
