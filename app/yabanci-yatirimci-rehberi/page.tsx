import { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, AlertTriangle, ArrowRight, Globe } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Yabancı Yatırımcı Rehberi | Türkiye\'de Gayrimenkul Alma | Söylemesi Bizden',
  description:
    'Yabancı uyruklu kişilerin Türkiye\'de gayrimenkul satın alma koşulları, vatandaşlık programı, gerekli belgeler ve vergi rehberi.',
};

const SATIN_ALMA_HAKKINA_SAHIP = [
  { ulke: 'AB ve Çoğu Ülke Vatandaşları', kural: 'Karşılıklılık ilkesi kapsamında (183 ülke vatandaşı) tapu tescilinde herhangi bir kısıt olmadan satın alabilir.' },
  { ulke: 'Kısıtlı Ülkeler', kural: 'Suriye, Kıbrıs Rum Kesimi, Ermenistan, Küba ve Kuzey Kore vatandaşları satın alamaz; bazı ülkelerde kısmi kısıt uygulanabilir.' },
  { ulke: 'Mütekabiliyet Dışı Ülkeler', kural: 'Mütekabiliyet ilkesi dışında kalan ülke vatandaşları için Çevre, Şehircilik ve İklim Değişikliği Bakanlığı izni gerekebilir.' },
];

const VATANDASLIK_PROGRAMI = [
  { kriter: 'Minimum Yatırım', deger: '400.000 USD', aciklama: 'Tek veya birden fazla taşınmaz alımıyla bu eşiğe ulaşılabilir.' },
  { kriter: 'Elde Tutma Süresi', deger: '3 Yıl', aciklama: 'Taşınmazı 3 yıl boyunca satmamayı taahhüt etmeniz gerekir; tapu şerhine işlenir.' },
  { kriter: 'Değerleme Zorunluluğu', deger: 'SPK Lisanslı', aciklama: 'Değerleme, Sermaye Piyasası Kurulu (SPK) lisanslı bir ekspertiz şirketince yapılır.' },
  { kriter: 'Başvuru Süresi', deger: '3–6 Ay', aciklama: 'Eksiksiz başvurularda vatandaşlık kararı 3–6 ay içinde açıklanır.' },
  { kriter: 'Tapu + Döviz Beyanı', deger: 'Zorunlu', aciklama: 'Dövizin Türkiye\'ye getirildiğine dair BDDK belgesi ve resmi döviz kuru beyanı zorunludur.' },
];

const GEREKLI_BELGELER = [
  { belge: 'Pasaport (noter onaylı Türkçe tercümesi)', zorunlu: true },
  { belge: 'Yabancı Kimlik Numarası (YKN)', zorunlu: true },
  { belge: 'Tapu (Satıcının tapu senedi aslı)', zorunlu: true },
  { belge: 'DASK Poliçesi', zorunlu: true },
  { belge: 'Türkçe çevirilmiş banka dekontu / döviz belgesi', zorunlu: true },
  { belge: 'SPK onaylı değerleme raporu', zorunlu: true },
  { belge: 'Vekaletname (varsa, noter onaylı)', zorunlu: false },
  { belge: 'Vergi kimlik numarası (Türkiye vergi dairesinden)', zorunlu: true },
];

const VERGI_BILGISI = [
  { vergi: 'Tapu Harcı', oran: '%4', aciklama: 'Alıcı ve satıcı %2+%2 paylaşır; Türk vatandaşlarıyla aynı.' },
  { vergi: 'Emlak Vergisi', oran: '%0.1–%0.3', aciklama: 'Konut için %0.1–%0.2; ticari için %0.2–%0.4 (büyükşehirde x2).' },
  { vergi: 'Kira Geliri Vergisi', oran: '%15–%40', aciklama: 'Kira geliri Türkiye\'de vergilendirilir; götürü (%15) veya gerçek gider yöntemi seçilebilir.' },
  { vergi: 'Değer Artış Vergisi', oran: '5 yıl muaf', aciklama: '5 yıldan sonra satış; Türk vatandaşlarıyla aynı koşullar.' },
  { vergi: 'KDV', oran: '%1 / %20', aciklama: '150 m² altında %1, üzerinde %20; yabancılara KDV istisnası yok.' },
];

const PRATIK_IPUCLARI = [
  { ipucu: 'Döviz Getirme Belgesi', detay: 'Vatandaşlık başvurusu için dövizi Türk bankasında bozdurduğunuzu gösteren "Döviz Alım Belgesi" (DAB) zorunludur.' },
  { ipucu: 'Türkçe Tercüme', detay: 'Tüm yabancı belgeler noter onaylı Türkçe tercüme ile birlikte tapu müdürlüğüne ibraz edilmelidir.' },
  { ipucu: 'Yerel Avukat', detay: 'Türkiye\'de gayrimenkul satın alan yabancıların Türk hukuku konusunda uzmanlaşmış yerel avukat tutması şiddetle önerilir.' },
  { ipucu: 'YKN Zorunluluğu', detay: 'Tapu işlemi yapabilmek için İl Göç İdaresi Müdürlüğü\'nden Yabancı Kimlik Numarası (YKN) alınması zorunludur.' },
];

export default function YabanciYatirimciRehberiPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <Globe size={13} /> Yabancı Yatırımcı
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Yabancı Yatırımcı Rehberi
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            Türkiye&apos;de gayrimenkul satın alma koşulları, vatandaşlık programı, gerekli belgeler ve vergi bilgisi.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-[#00C49F]">183</p>
              <p className="text-xs text-gray-400">İzin verilen ülke</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">$400K</p>
              <p className="text-xs text-gray-400">Vatandaşlık eşiği</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-400">3 Yıl</p>
              <p className="text-xs text-gray-400">Elde tutma şartı</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* Satın Alma Hakkı */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Satın Alma Hakkına Sahip Olanlar</h2>
          <div className="space-y-3">
            {SATIN_ALMA_HAKKINA_SAHIP.map((s, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                <p className="text-xs font-black text-[#00C49F] mb-1">{s.ulke}</p>
                <p className="text-[10px] text-gray-600 leading-relaxed">{s.kural}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Vatandaşlık Programı */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4">Yatırım Yoluyla Vatandaşlık Programı</h2>
          <div className="space-y-3">
            {VATANDASLIK_PROGRAMI.map((v, i) => (
              <div key={i} className="grid grid-cols-3 gap-2 py-2 border-b border-gray-50 last:border-0">
                <p className="text-xs font-black text-gray-900">{v.kriter}</p>
                <p className="text-xs font-black text-[#00C49F]">{v.deger}</p>
                <p className="text-[10px] text-gray-600 leading-relaxed">{v.aciklama}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Gerekli Belgeler */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle size={14} className="text-[#00C49F]" /> Gerekli Belgeler
          </h2>
          <div className="space-y-2">
            {GEREKLI_BELGELER.map((b, i) => (
              <div key={i} className="flex items-center gap-2 py-1.5 border-b border-gray-50 last:border-0">
                <CheckCircle size={11} className={b.zorunlu ? 'text-[#00C49F]' : 'text-gray-300'} />
                <p className="text-xs text-gray-700">{b.belge}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Vergi Bilgisi */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Vergi Bilgisi</h2>
          <div className="space-y-3">
            {VERGI_BILGISI.map((v, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                <div className="flex items-start justify-between mb-1">
                  <p className="text-xs font-black text-gray-900">{v.vergi}</p>
                  <span className="text-[10px] bg-[#F0FDF8] text-[#00C49F] font-black px-2 py-0.5 rounded shrink-0">{v.oran}</span>
                </div>
                <p className="text-[10px] text-gray-600 leading-relaxed">{v.aciklama}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pratik İpuçları */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4">Pratik İpuçları</h2>
          <div className="space-y-3">
            {PRATIK_IPUCLARI.map((p, i) => (
              <div key={i} className="grid grid-cols-3 gap-2 py-2 border-b border-gray-50 last:border-0">
                <p className="text-xs font-black text-[#00C49F]">{p.ipucu}</p>
                <p className="text-[10px] text-gray-600 leading-relaxed col-span-2">{p.detay}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Uyarı */}
        <section className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <AlertTriangle size={14} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 leading-relaxed">
            <span className="font-black">Önemli:</span> Vatandaşlık başvuru koşulları ve mütekabiliyet ülke listesi değişkendir. Güncel bilgi için Çevre, Şehircilik ve İklim Değişikliği Bakanlığı resmi sitesi ile İçişleri Bakanlığı Göç İdaresi Genel Müdürlüğü duyurularını takip edin.
          </p>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Araçlar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/tapu-devir-rehberi', label: 'Tapu Devir Rehberi' },
              { href: '/tapu-masrafi', label: 'Tapu Masrafı Hesaplayıcı' },
              { href: '/kira-geliri-vergisi', label: 'Kira Geliri Vergisi Hesaplayıcı' },
              { href: '/piyasa-raporu-2025', label: 'Piyasa Raporu 2025' },
              { href: '/gayrimenkul-yatirim-fonu-rehberi', label: 'GYO / GYF Rehberi' },
              { href: '/yatirim-analizi', label: 'Yatırım ROI Hesaplayıcı' },
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
