import { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, AlertTriangle, ArrowRight, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Konut Sigortası Rehberi 2024 | DASK, Konut Güvencesi, Teminatlar | Söylemesi Bizden',
  description:
    'Konut sigortası türleri, DASK zorunlu deprem sigortası, teminat kapsamları ve hasar başvurusu hakkında kapsamlı rehber.',
};

const SIGORTA_TURLERI = [
  {
    tur: 'DASK (Zorunlu Deprem Sigortası)',
    zorunlu: true,
    kapsam: 'Deprem, yangın/patlama (deprem kaynaklı), tsunami ve yer kayması sonrası yapısal hasarlar',
    sinir: 'Yapı değeri tavan: 2024 için yaklaşık 770.000 ₺; üzeri isteğe bağlı sigorta ile tamamlanır',
    kimYaptirir: 'Tüm binadaki bağımsız bölüm sahipleri; tapuya kayıtlı zorunlu tescil',
  },
  {
    tur: 'Konut Sigortası (İsteğe Bağlı)',
    zorunlu: false,
    kapsam: 'Yangın, hırsızlık, su baskını, fırtına, cam kırığı, eşya, 3. şahıs mali mesuliyet',
    sinir: 'Belirsiz; taşınan değer ve poliçe limitine göre değişir',
    kimYaptirir: 'Mal sahibi ve/veya kiracı (eşya güvencesi için kiracı da yaptırabilir)',
  },
  {
    tur: 'Kredi Bağlantılı Konut Sigortası',
    zorunlu: false,
    kapsam: 'Banka zorunlu kılar; temel yangın ve deprem teminatı genellikle dahildir',
    sinir: 'Kredi miktarı kadar yapı güvencesi; ekspertiz değeriyle orantılı',
    kimYaptirir: 'Konut kredisi kullananlar; banka genellikle sigorta şirketini önerir',
  },
];

const TEMINATLAR = [
  { teminat: 'Yangın ve Duman', aciklama: 'Yangın, çıkan duman ve ısı hasarı', dahil: true },
  { teminat: 'Hırsızlık', aciklama: 'Kırarak/zorla girme ile yapılan hırsızlık', dahil: true },
  { teminat: 'Su Baskını/Sel', aciklama: 'Dışarıdan gelen su ve sel hasarı', dahil: false },
  { teminat: 'Fırtına ve Dolu', aciklama: 'Fırtına, rüzgar ve dolu kaynaklı hasar', dahil: true },
  { teminat: 'Cam Kırığı', aciklama: 'Pencere, vitrin camı kırılması', dahil: true },
  { teminat: 'Ev Eşyası', aciklama: 'Mobilya, elektronik, beyaz eşya güvencesi', dahil: false },
  { teminat: 'Kira Kaybı', aciklama: 'Hasar nedeniyle kullanılamayan dönemde kira kaybı', dahil: false },
  { teminat: '3. Şahıs Mesuliyet', aciklama: 'Komşuya verilen su hasarı ve benzeri durumlar', dahil: true },
];

const HASAR_SURECI = [
  { adim: 'Hasarı Bildirin', sure: 'Hemen', aciklama: 'Sigorta şirketine telefon veya mobil uygulama üzerinden hasar ihbarı yapın. İhbar tarihi sigorta süresine dahildir.' },
  { adim: 'Hasar Ekspertizi', sure: '1–5 gün', aciklama: 'Sigortacı bir eksper görevlendirir. Eksper hasarı inceler, tutanağı düzenler.' },
  { adim: 'Belge Tamamlama', sure: '1–2 hafta', aciklama: 'Faturalar, fotoğraflar, tamir teklifleri ve diğer belgeler teslim edilir.' },
  { adim: 'Hasar Ödemesi', sure: '15–30 gün', aciklama: 'Onaylanan hasar tutarı, poliçe muafiyet düşüldükten sonra banka hesabınıza aktarılır.' },
];

const PRATIK_IPUCLARI = [
  { ipucu: 'Sigorta değerini doğru belirleyin', aciklama: 'Yapı değerini güncel yeniden inşa maliyetiyle belirleyin; düşük sigortalama durumunda hasarın yalnızca bir bölümü ödenir (müşterek sigorta ilkesi).' },
  { ipucu: 'Eşya envanteri tutun', aciklama: 'Değerli eşyaların fotoğraf ve makbuzlarını saklayın; hırsızlık ve yangın hasarında ispat kolaylaşır.' },
  { ipucu: 'Muafiyet tutarını bilin', aciklama: 'Her poliçede "muafiyet" adlı öz risk dilimi vardır; bu tutarın altındaki hasarlar ödenmez.' },
  { ipucu: 'Yıllık yenileme yapın', aciklama: 'Enflasyon nedeniyle yapı değeri yükselir; poliçeyi her yıl güncel değerle yenileyin.' },
];

export default function KonutSigortasiRehberiPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <Shield size={13} /> Konut Sigortası
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Konut Sigortası Rehberi 2024
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            DASK zorunlu deprem sigortası, konut güvencesi teminatları ve hasar başvurusu hakkında kapsamlı rehber.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-[#00C49F]">3 Tür</p>
              <p className="text-xs text-gray-400">Sigorta çeşidi</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">Zorunlu</p>
              <p className="text-xs text-gray-400">DASK</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-400">4 Adım</p>
              <p className="text-xs text-gray-400">Hasar süreci</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* Sigorta Türleri */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Konut Sigorta Türleri</h2>
          <div className="space-y-4">
            {SIGORTA_TURLERI.map((s, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <div className="flex items-start justify-between mb-2">
                  <p className="text-xs font-black text-gray-900">{s.tur}</p>
                  {s.zorunlu && <span className="text-[10px] bg-rose-50 text-rose-600 font-black px-2 py-0.5 rounded shrink-0">Zorunlu</span>}
                </div>
                <p className="text-[10px] text-gray-600 leading-relaxed mb-1"><span className="font-bold">Kapsam:</span> {s.kapsam}</p>
                <p className="text-[10px] text-gray-600 leading-relaxed mb-1"><span className="font-bold">Limit:</span> {s.sinir}</p>
                <p className="text-[10px] text-gray-500"><span className="font-bold">Kim yaptırır:</span> {s.kimYaptirir}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Teminatlar */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4">Standart Teminatlar</h2>
          <div className="space-y-2">
            {TEMINATLAR.map((t, i) => (
              <div key={i} className="flex items-start gap-3 py-2 border-b border-gray-50 last:border-0">
                <CheckCircle size={12} className={`shrink-0 mt-0.5 ${t.dahil ? 'text-[#00C49F]' : 'text-gray-200'}`} />
                <div className="flex-1">
                  <p className="text-xs font-black text-gray-900">{t.teminat}</p>
                  <p className="text-[10px] text-gray-500">{t.aciklama}</p>
                </div>
                <span className={`text-[10px] font-black shrink-0 ${t.dahil ? 'text-[#00C49F]' : 'text-gray-300'}`}>
                  {t.dahil ? 'Genellikle dahil' : 'Ek teminat'}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Hasar Süreci */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Hasar Başvurusu Süreci</h2>
          <div className="space-y-3">
            {HASAR_SURECI.map((a, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#00C49F] text-white text-[10px] font-black flex items-center justify-center shrink-0">{i + 1}</div>
                    <p className="text-xs font-black text-gray-900">{a.adim}</p>
                  </div>
                  <span className="text-[10px] bg-amber-50 text-amber-600 font-black px-2 py-0.5 rounded">{a.sure}</span>
                </div>
                <p className="text-[10px] text-gray-600 leading-relaxed ml-8">{a.aciklama}</p>
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
                <p className="text-[10px] text-gray-600 leading-relaxed col-span-2">{p.aciklama}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Uyarı */}
        <section className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <AlertTriangle size={14} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 leading-relaxed">
            <span className="font-black">DASK Zorunluluğu:</span> DASK olmayan taşınmazlarda tapu devri, kredi kullanımı ve yapı ruhsatı işlemleri engellenebilir. Yenilemeyi ihmal etmeyin.
          </p>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Araçlar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/dask-hesaplayici', label: 'DASK Prim Hesaplayıcı' },
              { href: '/deprem-sigorta-hesaplayici', label: 'Deprem Sigorta Hesaplayıcı' },
              { href: '/kentsel-donusum-rehberi', label: 'Kentsel Dönüşüm Rehberi' },
              { href: '/deprem-riski', label: 'Deprem Riski Rehberi' },
              { href: '/aidat-hesaplayici', label: 'Aidat Hesaplayıcı' },
              { href: '/tapu-masrafi', label: 'Tapu Masrafı Hesaplayıcı' },
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
