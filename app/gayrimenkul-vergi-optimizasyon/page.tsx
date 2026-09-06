import { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, AlertTriangle, ArrowRight, TrendingDown } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Gayrimenkul Vergi Optimizasyonu | Yasal Tasarruf Yöntemleri | Söylemesi Bizden',
  description:
    'Gayrimenkul yatırımlarında yasal vergi optimizasyonu: istisna ve muafiyetler, gider indirimleri, en uygun satış zamanlaması rehberi.',
};

const MUAFIYET_VE_ISTISNALAR = [
  {
    baslik: '5 Yıl Elde Tutma İstisnası',
    aciklama: 'Konut veya işyerini edindikten 5 yıl sonra satarsanız değer artış kazancı vergisinden tamamen muafsınız. Bu süre, tapu tescil tarihinden itibaren hesaplanır.',
    tasarruf: 'Tam Muafiyet',
  },
  {
    baslik: 'Birinci Konut İstisnası (KDV)',
    aciklama: '150 m² ve altındaki konutlarda (ilk alımda) %1 indirimli KDV uygulanır; 150 m² üzerinde %20 standart oran geçerlidir.',
    tasarruf: '%1 KDV (150 m²↓)',
  },
  {
    baslik: 'GYO / GYF Vergi Avantajı',
    aciklama: 'GYO hisselerini 2 yıldan uzun süre tutarsanız değer artış kazancı vergisinden muafsınız. GYO temettüsünde yalnızca %10 stopaj kesilir.',
    tasarruf: '2 Yıl Sonra Muaf',
  },
  {
    baslik: 'Miras Yoluyla Edinim',
    aciklama: 'Miras yoluyla edinilen taşınmazlarda elde tutma süresi yasal mirasçıya geçer; ödenen veraset vergisi maliyet bedeline eklenerek vergi matrahı düşürülür.',
    tasarruf: 'Maliyet Yükseltme',
  },
];

const GIDER_INDIRIMLERI = [
  { gider: 'Tapu Harcı ve Masrafları', aciklama: 'Alım sırasında ödenen tapu harcı, döner sermaye ve noter masrafları maliyet bedeline eklenir; vergi matrahını düşürür.' },
  { gider: 'Emlakçı Komisyonu', aciklama: 'Satış sırasında ödenen emlakçı komisyonu (alıcı veya satıcı payı) vergiden düşülebilir.' },
  { gider: 'Tadilat ve Onarım', aciklama: 'Taşınmazın değerini artıran tadilat masrafları belgelenmesi koşuluyla maliyet bedeline eklenir.' },
  { gider: 'Banka Faizi', aciklama: 'Konut kredisi faizi, "gerçek gider" yöntemi seçilmesi halinde kira gelirinden düşülebilir.' },
  { gider: 'Sigorta Primleri', aciklama: 'DASK ve konut sigortası primleri gerçek gider yönteminde kira gelirinden indirilebilir.' },
  { gider: 'Amortisman', aciklama: 'Kiraya verilen bina için yıllık %2 amortisman gideri düşülebilir (arsa değeri hariç).' },
];

const ZAMANLAMA_STRATEJISI = [
  { strateji: '5. Yıl Dolduktan Sonra Sat', aciklama: 'Tapu tescil tarihinden 5 tam yıl geçmeden satış yapmayın; değer artış kazancı vergisi %15\'e kadar çıkabilir.' },
  { strateji: 'Düşük Gelir Yılında Sat', aciklama: 'Emeklilik, ücretsiz izin veya düşük gelirli bir yılda satış yaparak vergi dilimini düşürün.' },
  { strateji: 'Götürü Gider vs Gerçek Gider Hesabı', aciklama: 'Kira gelirinizden her yıl %15 götürü gider veya gerçek giderleri seçin; yüksek gider varsa gerçek yöntem avantajlıdır.' },
  { strateji: 'Yıl Sonu Satışı', aciklama: 'Aralık yerine Ocak\'ta satış yapmak, bir yıl sonraki enflasyon endeksinden yararlanmanızı sağlar.' },
];

const DIKKAT_NOKTALAR = [
  { uyari: 'Geriye Dönük Tarhiyat', aciklama: 'Beyan dışı kira geliri 5 yıl geriye dönük vergi ve ceza getirebilir; pişmanlıkla beyan daha az cezalıdır.' },
  { uyari: 'Emsal Kira Bedeli', aciklama: 'Emsalin altında kira gösterilirse vergi dairesi emsal kira bedelini esas alır (Gelir Vergisi Kanunu m.73).' },
  { uyari: 'Enflasyon Endekslemesi', aciklama: 'Değer artış kazancında maliyet bedeli yeniden değerleme katsayısıyla (ÜFE) artırılabilir; bu matrahı düşürür.' },
  { uyari: 'Vergi Danışmanı Zorunluluğu', aciklama: 'Birden fazla mülk, yüksek değerli satış veya miras gibi durumlarda mutlaka YMM veya mali müşavirden destek alın.' },
];

export default function GayrimenkulVergiOptimizasyonPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <TrendingDown size={13} /> Vergi Optimizasyon
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Gayrimenkul Vergi Optimizasyonu
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            Yasal muafiyet ve istisnalar, gider indirimleri ve satış zamanlaması stratejileri ile vergi yükünüzü minimize edin.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-[#00C49F]">5 Yıl</p>
              <p className="text-xs text-gray-400">Tam muafiyet eşiği</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">%15</p>
              <p className="text-xs text-gray-400">Götürü gider oranı</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-400">%2</p>
              <p className="text-xs text-gray-400">Bina amortismanı</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* Muafiyet ve İstisnalar */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Muafiyet ve İstisnalar</h2>
          <div className="space-y-3">
            {MUAFIYET_VE_ISTISNALAR.map((m, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                <div className="flex items-start justify-between mb-1">
                  <p className="text-xs font-black text-gray-900">{m.baslik}</p>
                  <span className="text-[10px] bg-[#F0FDF8] text-[#00C49F] font-black px-2 py-0.5 rounded shrink-0">{m.tasarruf}</span>
                </div>
                <p className="text-[10px] text-gray-600 leading-relaxed">{m.aciklama}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Gider İndirimleri */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle size={14} className="text-[#00C49F]" /> İndirilebilir Giderler
          </h2>
          <div className="space-y-2">
            {GIDER_INDIRIMLERI.map((g, i) => (
              <div key={i} className="flex items-start gap-3 py-2 border-b border-gray-50 last:border-0">
                <CheckCircle size={12} className="text-[#00C49F] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-black text-gray-900">{g.gider}</p>
                  <p className="text-[10px] text-gray-500 mt-0.5">{g.aciklama}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Zamanlama Stratejisi */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Zamanlama Stratejileri</h2>
          <div className="space-y-3">
            {ZAMANLAMA_STRATEJISI.map((z, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                <p className="text-xs font-black text-[#00C49F] mb-1">{z.strateji}</p>
                <p className="text-[10px] text-gray-600 leading-relaxed">{z.aciklama}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Dikkat Noktaları */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4">Dikkat Edilmesi Gereken Noktalar</h2>
          <div className="space-y-3">
            {DIKKAT_NOKTALAR.map((d, i) => (
              <div key={i} className="grid grid-cols-3 gap-2 py-2 border-b border-gray-50 last:border-0">
                <p className="text-xs font-black text-rose-500">{d.uyari}</p>
                <p className="text-[10px] text-gray-600 leading-relaxed col-span-2">{d.aciklama}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Uyarı */}
        <section className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <AlertTriangle size={14} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 leading-relaxed">
            <span className="font-black">Önemli:</span> Bu rehber genel bilgi amaçlıdır. Kişisel durumunuza uygun vergi optimizasyonu için yeminli mali müşavir (YMM) veya serbest muhasebeci mali müşavirden (SMMM) destek alın.
          </p>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Araçlar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/kira-geliri-vergisi', label: 'Kira Geliri Vergisi Hesaplayıcı' },
              { href: '/stopaj-vergisi-rehberi', label: 'Stopaj Vergisi Rehberi' },
              { href: '/deger-artis-vergisi', label: 'Değer Artış Vergisi' },
              { href: '/emlak-vergisi', label: 'Emlak Vergisi Hesaplayıcı' },
              { href: '/amortisman-hesaplayici', label: 'Amortisman Hesaplayıcı' },
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
