import { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, AlertTriangle, ArrowRight, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Arsa Yatırım Rehberi | İmar Durumu, Değer Artışı | Söylemesi Bizden',
  description:
    'Arsa yatırımı nasıl yapılır? İmar durumu sorgulama, tarla/arsa farkı, değer artış potansiyeli, satın alma riskleri ve getiri analizi rehberi.',
};

const ARSA_TURLERI = [
  { tur: 'İmarlı Arsa', tanim: 'Belediye imar planında yapılaşmaya açık, yapı ruhsatı alınabilen arsa.', getiri: 'Yüksek', renk: 'text-emerald-600' },
  { tur: 'İmarsız Arsa (Tarla)', tanim: 'İmar planı dışında kalan, üzerine yapı yapılamayan, genellikle tarımsal amaçlı kullanılan taşınmaz.', getiri: 'Spekülatif', renk: 'text-amber-500' },
  { tur: 'Sanayi Arsası', tanim: 'İmar planında sanayi bölgesi olarak ayrılmış, fabrika/depo gibi yapılara uygun arsa.', getiri: 'Orta-Yüksek', renk: 'text-blue-500' },
  { tur: 'Ticari Arsa', tanim: 'Ticari imar iznine sahip, AVM, ofis veya dükkan inşaatına uygun taşınmaz.', getiri: 'Yüksek', renk: 'text-[#00C49F]' },
  { tur: 'Köy İçi Arsa', tanim: 'Köy yerleşik alanında kalan, bazı yapılaşma hakları olan ancak belediye imar planı kapsamında olmayan arsa.', getiri: 'Düşük-Orta', renk: 'text-gray-500' },
];

const SATIN_ALMA_ADIMLARI = [
  { adim: 'İmar Durumu Sorgulama', aciklama: 'İlgili belediyenin imar müdürlüğünden veya e-Devlet\'ten arsanın imar durumunu, TAKS/KAKS (yapılaşma oranları) ve plan notlarını öğrenin.', sure: '1–3 Gün' },
  { adim: 'Tapu Sorgulama', aciklama: 'Tapuda ipotek, haciz, şerh, orman, Hazine sınırı gibi kısıtlar olup olmadığını tapu sicilinden kontrol edin. Kadastro haritasıyla sınırları doğrulayın.', sure: '1 Gün' },
  { adim: 'Altyapı ve Konum Analizi', aciklama: 'Arsanın yol bağlantısı, elektrik/su/kanalizasyon altyapısı ve ana arterlerle mesafesi değer ve inşaat maliyetini doğrudan etkiler.', sure: '1 Hafta' },
  { adim: 'Değerleme ve Fiyat Analizi', aciklama: 'Çevre arsaların satış fiyatlarını ve ₺/m² ortalamalarını inceleyin. Bağımsız bir ekspertizden değer raporu alın.', sure: '3–5 Gün' },
  { adim: 'Hukuki Durum Kontrolü', aciklama: 'Orman arazisi, sit alanı, kıyı kenar çizgisi, askeri yasak bölge, enerji hattı güzergahı gibi kısıtlar araştırılmalıdır.', sure: '3–7 Gün' },
  { adim: 'Satış ve Tapu Devri', aciklama: 'Tüm kontroller tamamlandıktan sonra noter satış vaadi sözleşmesi imzalayın; tapu müdürlüğünde devri gerçekleştirin.', sure: '1–2 Hafta' },
];

const DEGER_ARTIS_FAKTORLERI = [
  { faktor: 'İmar Planı Revizyonu', aciklama: 'İmarsız arsa veya düşük yoğunluklu arsanın yüksek yoğunluklu imar planına alınması değeri katlar; en güçlü getiri kaynağıdır.' },
  { faktor: 'Ulaşım Altyapısı', aciklama: 'Metro, otoyol veya köprü gibi ulaşım yatırımlarının güzergahına yakın arsalar başvuru sürecinden önce kat kat değer kazanabilir.' },
  { faktor: 'Sanayi/OSB Yatırımı', aciklama: 'Organize sanayi bölgesi veya büyük fabrika duyurusu çevre arsa fiyatlarını ciddi ölçüde artırır.' },
  { faktor: 'Şehirleşme ve Nüfus Artışı', aciklama: 'Büyüyen şehirlerin çeper bölgelerindeki arsalar uzun vadede güçlü değer artışı sağlar; ancak süre 10–20 yıl olabilir.' },
  { faktor: 'Turizm Bölgesi Kararı', aciklama: 'Turistik tesis yapımına açılan kıyı veya dağlık bölgelerdeki arsalar kısa sürede hızlı değer artışı yaşayabilir.' },
];

const RISKLER = [
  { risk: 'Spekülatif Fiyat', aciklama: '"Buraya yol gelecek, imar açılacak" vaadleriyle fahiş fiyatlardan satılan arsalar beklenen değer artışını sağlamayabilir; defalarca kontrol edin.' },
  { risk: 'Uzun Nakitsizlik Süresi', aciklama: 'Arsa kira geliri üretmez; tüm getiri değer artışına dayalıdır. Acil nakit ihtiyacında hızla satılması güç olabilir.' },
  { risk: 'İmar Riski', aciklama: 'İmar planları değişebilir; bugün yapılaşmaya uygun arsa yarın yeşil alan veya yol güzergahına alınabilir.' },
  { risk: 'Kadastro Anlaşmazlığı', aciklama: 'Sınır ihtilafları veya kişi adına kayıtlı arsa için aile üyelerinin itirazları tapu devrini karmaşıklaştırabilir.' },
  { risk: 'Vergi Yükü', aciklama: 'Arsa için emlak vergisi ödenir; kentsel dönüşüm veya kamulaştırma durumunda bedel takdiri değer altında kalabilir.' },
];

const PRATIK_BILGILER = [
  { bilgi: 'Tarla-Arsa Ayrımı', detay: 'Vergi kanununda tarla (tarım arazisi) ve arsa farklı değerlenir. İmarlı arsa yüksek KDV ve tapu harcına tabidir; tarla tarımsal muafiyetten yararlanabilir.' },
  { bilgi: '5 Yıl Vergisi', detay: 'Arsayı 5 yıldan kısa sürede satarsanız değer artış kazancı vergisi (gelir vergisi) ödemeniz gerekir; 5 yılı tamamlamak muafiyet sağlar.' },
  { bilgi: 'Belediye Sınırı', detay: 'Belediye sınırları genişlerse imarsız tarlanız imar planına alınabilir; ancak imar planına alınmak için ek yapılaşma koşulları gerekebilir.' },
  { bilgi: 'Ortak Alım', detay: 'Büyük arsalarda birden fazla yatırımcının ortaklaşa alması riski dağıtır; ancak ilerideki ortaklık giderimi süreçleri zahmetli olabilir.' },
];

export default function ArsaYatirimRehberiPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <MapPin size={13} /> Arsa Yatırımı
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Arsa Yatırım Rehberi
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            Arsa türleri, imar durumu sorgulama, değer artış faktörleri, satın alma adımları ve yatırım riskleri hakkında kapsamlı rehber.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-[#00C49F]">5 Yıl</p>
              <p className="text-xs text-gray-400">Vergi muafiyet süresi</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">5 Tür</p>
              <p className="text-xs text-gray-400">Arsa kategorisi</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-400">6 Adım</p>
              <p className="text-xs text-gray-400">Satın alma süreci</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* Arsa Türleri */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4">Arsa Türleri</h2>
          <div className="space-y-3">
            {ARSA_TURLERI.map((a, i) => (
              <div key={i} className="grid grid-cols-3 gap-2 py-2 border-b border-gray-50 last:border-0 items-start">
                <div>
                  <p className="text-xs font-black text-gray-900">{a.tur}</p>
                  <p className={`text-[10px] font-black ${a.renk}`}>{a.getiri} Getiri</p>
                </div>
                <p className="text-[10px] text-gray-600 leading-relaxed col-span-2">{a.tanim}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Satın Alma Adımları */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Arsa Satın Alma Adımları</h2>
          <div className="space-y-3">
            {SATIN_ALMA_ADIMLARI.map((a, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                <div className="flex items-start justify-between mb-1">
                  <div className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-[#00C49F] text-white text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">{i + 1}</div>
                    <p className="text-xs font-black text-gray-900">{a.adim}</p>
                  </div>
                  <span className="text-[10px] bg-amber-50 text-amber-600 font-black px-2 py-0.5 rounded shrink-0">{a.sure}</span>
                </div>
                <p className="text-[10px] text-gray-600 leading-relaxed mt-1 ml-7">{a.aciklama}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Değer Artış Faktörleri */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle size={14} className="text-[#00C49F]" /> Değer Artış Faktörleri
          </h2>
          <div className="space-y-3">
            {DEGER_ARTIS_FAKTORLERI.map((f, i) => (
              <div key={i} className="grid grid-cols-3 gap-2 py-2 border-b border-gray-50 last:border-0">
                <p className="text-xs font-black text-[#00C49F]">{f.faktor}</p>
                <p className="text-[10px] text-gray-600 leading-relaxed col-span-2">{f.aciklama}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Riskler */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Yatırım Riskleri</h2>
          <div className="space-y-3">
            {RISKLER.map((r, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                <p className="text-xs font-black text-rose-500 mb-1">{r.risk}</p>
                <p className="text-[10px] text-gray-600 leading-relaxed">{r.aciklama}</p>
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
            <span className="font-black">Uyarı:</span> Arsa yatırımı yüksek potansiyel getiri sunarken yüksek risk de barındırır. Kira geliri olmadan uzun süre beklemek gerekebilir; acil nakit ihtiyacı olanlar için uygun bir yatırım değildir.
          </p>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Araçlar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/tapu-masrafi', label: 'Tapu Masrafı Hesaplayıcı' },
              { href: '/yatirim-analizi', label: 'Yatırım ROI Analizi' },
              { href: '/emlak-vergisi', label: 'Emlak Vergisi Hesaplayıcı' },
              { href: '/kentsel-donusum-rehberi', label: 'Kentsel Dönüşüm Rehberi' },
              { href: '/piyasa', label: 'Türkiye Piyasa Verileri' },
              { href: '/rehber/yatirim-rehberi', label: 'Yatırım Rehberi' },
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
