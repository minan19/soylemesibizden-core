import { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, AlertTriangle, ArrowRight, Scale } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Sözleşme İptal ve Cayma Hakkı Rehberi | Gayrimenkul | Söylemesi Bizden',
  description:
    'Gayrimenkul satış sözleşmesini iptal etme, cayma hakkı, cezai şart ve ön sözleşmeden dönme koşulları hakkında kapsamlı rehber.',
};

const CAYMA_HAKLARI = [
  {
    durum: 'Ön Sözleşmeden (Satış Vaadi) Cayma',
    sure: 'Genellikle sözleşmede belirlenir',
    kosul: 'Sözleşmede cayma cezası varsa o ödenir; yoksa alınan kaparo iade edilir.',
    taraf: 'Hem alıcı hem satıcı',
  },
  {
    durum: 'Mesafeli Satış (Fuar, Tanıtım Toplantısı)',
    sure: '14 gün cayma hakkı',
    kosul: 'Tüketici kanunu kapsamında mesafeli satışlarda 14 günlük cayma hakkı kullanılabilir.',
    taraf: 'Alıcı',
  },
  {
    durum: 'Ayıplı Mal (Gizli Kusur)',
    sure: '2 yıl garanti, 5 yıl hak düşürücü süre',
    kosul: 'Satın alınan taşınmazda gizli kusur (yapısal hasar, iskan yokluğu vb.) çıkması halinde sözleşme feshedilebilir.',
    taraf: 'Alıcı',
  },
  {
    durum: 'İnşaat Gecikmesi / Teslim Etmeme',
    sure: 'Sözleşmede belirlenen süreyi aşınca',
    kosul: 'Müteahhit teslim tarihine uymaz veya iflas ederse alıcı sözleşmeden dönüp ödediği bedeli faiz ile talep edebilir.',
    taraf: 'Alıcı',
  },
  {
    durum: 'Kira Sözleşmesi Feshi (Kiraya Veren)',
    sure: '3 ay önceden ihtar',
    kosul: 'TBK m.347: Kiraya veren, yasal sebepler olmadan sözleşme bitiminde feshedemez; 10 yıl dolduktan sonra fesih hakkı doğar.',
    taraf: 'Kiraya veren',
  },
];

const CEZAI_SART = [
  { durum: 'Alıcı Cayarsa', sonuc: 'Ödenen kaparo/pey akçesi satıcıda kalır.' },
  { durum: 'Satıcı Cayarsa', sonuc: 'Alıcıya alınan kaparonun 2 katı ödenir (TBK m. 178).' },
  { durum: 'Müteahhit Gecikirse', sonuc: 'Sözleşmedeki gecikme cezası (m²/gün) devreye girer; bu genellikle çok düşük kalabilir.' },
  { durum: 'Sözleşmede Cezai Şart Yoksa', sonuc: 'Mahkeme kanalıyla oluşan zararın ispatı gerekir; süreç uzar.' },
];

const IPTAL_SURECI = [
  { adim: 'Sözleşmeyi İnceleyin', aciklama: 'Cayma ve fesih koşullarını, cezai şartı ve sürelerini netleştirin.' },
  { adim: 'Yazılı Bildirim Gönderin', aciklama: 'İptal veya cayma iradesi noter aracılığıyla karşı tarafa tebliğ edilmelidir.' },
  { adim: 'Kapora/Bedel İadesini Talep Edin', aciklama: 'Yasal hakka dayanarak iade talep edin; reddedilirse icra veya mahkeme yoluna gidin.' },
  { adim: 'Uzlaşma veya Arabuluculuk', aciklama: 'Dava öncesi arabulucu aracılığıyla hızlı çözüm sağlanabilir.' },
  { adim: 'Dava Açın', aciklama: 'Anlaşmazlık çözümsüz kalırsa Asliye Hukuk veya Sulh Hukuk Mahkemesi\'ne dava açılabilir.' },
];

const PRATIK_BILGI = [
  { bilgi: 'Kapora ile Pey Akçesi Farkı', detay: 'Kapora, iki tarafın sözleşmeyi garanti etmesine yönelik ödemedir. Pey akçesi ise tek taraflı cayma bedelidir. Hangi kavramın kullanıldığı sonucu etkiler.' },
  { bilgi: 'Tapu Devri Sonrası', detay: 'Tapu devri gerçekleştikten sonra sadece ayıp veya sözleşmeye aykırılık nedeniyle dava yoluna gidilebilir; basit cayma hakkı ortadan kalkar.' },
  { bilgi: 'Ön Ödemeli Konut', detay: '6502 sayılı Tüketici Koruma Kanunu kapsamındaki ön ödemeli konut satışlarında 24 aylık teslim garantisi ve yasal cayma hakkı mevcuttur.' },
  { bilgi: 'Zamanaşımı', detay: 'Sözleşme feshinden kaynaklanan tazminat davası genellikle 5 yıllık zamanaşımına tabidir.' },
];

export default function SozlesmeIptalCaymaPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <Scale size={13} /> Sözleşme İptali
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Sözleşme İptal ve Cayma Hakkı Rehberi
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            Gayrimenkul satış, ön sözleşme ve kira sözleşmelerinde cayma hakkı, cezai şartlar ve iptal süreci.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-[#00C49F]">5 Durum</p>
              <p className="text-xs text-gray-400">Cayma senaryosu</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">14 Gün</p>
              <p className="text-xs text-gray-400">Mesafeli satış hakkı</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-400">2x</p>
              <p className="text-xs text-gray-400">Satıcı cayarsa</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* Cayma Hakları */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Cayma Hakları</h2>
          <div className="space-y-3">
            {CAYMA_HAKLARI.map((c, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                <div className="flex items-start justify-between mb-1">
                  <p className="text-xs font-black text-[#00C49F]">{c.durum}</p>
                  <span className="text-[10px] bg-amber-50 text-amber-600 font-black px-2 py-0.5 rounded shrink-0">{c.sure}</span>
                </div>
                <p className="text-[10px] text-gray-600 leading-relaxed mb-1">{c.kosul}</p>
                <p className="text-[10px] text-gray-400">Kullanan taraf: <span className="font-bold text-gray-600">{c.taraf}</span></p>
              </div>
            ))}
          </div>
        </section>

        {/* Cezai Şart */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4">Cezai Şart Sonuçları</h2>
          <div className="space-y-3">
            {CEZAI_SART.map((c, i) => (
              <div key={i} className="grid grid-cols-2 gap-2 py-2 border-b border-gray-50 last:border-0">
                <p className="text-xs font-black text-gray-900">{c.durum}</p>
                <p className="text-xs text-gray-600 leading-relaxed">{c.sonuc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* İptal Süreci */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Sözleşme İptal Süreci</h2>
          <div className="space-y-3">
            {IPTAL_SURECI.map((a, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-[#00C49F] text-white text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">{i + 1}</div>
                  <div>
                    <p className="text-xs font-black text-gray-900">{a.adim}</p>
                    <p className="text-[10px] text-gray-600 leading-relaxed mt-0.5">{a.aciklama}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pratik Bilgi */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle size={14} className="text-[#00C49F]" /> Pratik Bilgiler
          </h2>
          <div className="space-y-3">
            {PRATIK_BILGI.map((p, i) => (
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
            <span className="font-black">Önemli:</span> Sözleşme iptali karmaşık hukuki süreçler içerir; hak kaybı yaşamamak için bir gayrimenkul avukatından destek alın.
          </p>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Araçlar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/tahliye-sureci', label: 'Tahliye Süreci Rehberi' },
              { href: '/kira-tespit-davasi-rehberi', label: 'Kira Tespit Davası Rehberi' },
              { href: '/kiraci-haklari', label: 'Kiracı Hakları' },
              { href: '/mal-sahibi-haklari', label: 'Mal Sahibi Hakları' },
              { href: '/tapu-devir-rehberi', label: 'Tapu Devir Rehberi' },
              { href: '/kira-sozlesmesi-hazirlama', label: 'Kira Sözleşmesi Hazırlama' },
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
