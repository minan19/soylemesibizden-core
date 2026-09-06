import { Metadata } from 'next';
import Link from 'next/link';
import {
  Shield, CheckCircle, AlertTriangle, ArrowRight, Home,
  FileText, TrendingUp, Calculator, Info,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Konut Sigortası Rehberi | Kapsamlı Bilgi | Söylemesi Bizden',
  description:
    'Konut sigortası nasıl yapılır, neleri kapsar? DASK zorunlu deprem sigortasına ek olarak isteğe bağlı konut sigortasının avantajları, kapsam detayları ve prim faktörleri.',
};

const COVERAGE_TYPES = [
  {
    title: 'Yangın & Duman',
    icon: '🔥',
    desc: 'Yangın, duman, patlama ve infilaktan kaynaklanan yapısal hasarlar.',
    covered: true,
  },
  {
    title: 'Su Baskını',
    icon: '💧',
    desc: 'Tesisat patlaması, komşu daireden gelen su hasarı.',
    covered: true,
  },
  {
    title: 'Hırsızlık & Soygun',
    icon: '🔐',
    desc: 'Kırılarak girme sonucu kaybedilen eşya ve hasar.',
    covered: true,
  },
  {
    title: 'Fırtına & Dolu',
    icon: '🌪',
    desc: 'Şiddetli hava koşulları, çatı ve cam hasarları.',
    covered: true,
  },
  {
    title: 'Cam Kırılması',
    icon: '🪟',
    desc: 'Pencere, balkon camı ve sabit cam yüzeylerin kırılması.',
    covered: true,
  },
  {
    title: 'Elektronik Cihaz',
    icon: '📺',
    desc: 'Voltaj dalgalanması veya mekanik arızadan kaynaklanan hasar (ek paket).',
    covered: false,
  },
  {
    title: 'Kira Kaybı',
    icon: '🏠',
    desc: 'Hasar nedeniyle kiraya verilemeyen mülkün kira geliri kaybı (ek paket).',
    covered: false,
  },
  {
    title: 'Sorumluluk',
    icon: '⚖️',
    desc: 'Komşuya verilen su/yangın hasarı için üçüncü şahıs sorumluluğu.',
    covered: true,
  },
];

const FACTORS = [
  { label: 'Yapı tipi', detail: 'Betonarme < çelik < yığma; eski bina = yüksek prim' },
  { label: 'Sigorta değeri (m² × birim maliyet)', detail: 'Genellikle ₺20.000–₺35.000/m²' },
  { label: 'Konum / risk bölgesi', detail: 'Deprem, taşkın, hırsızlık risk skoru' },
  { label: 'Muafiyet tutarı', detail: 'Yüksek muafiyet → düşük prim' },
  { label: 'Seçilen kapsam genişliği', detail: 'Temel < gelişmiş < kapsamlı paket' },
  { label: 'Bina yaşı ve kat sayısı', detail: 'Yeni bina = düşük prim; çok katlı = değişken' },
];

const CLAIM_STEPS = [
  {
    step: 1,
    title: 'Hasarı Belgele',
    desc: 'Fotoğraf ve video çekin. Hırsızlıkta mutlaka şikayet tutanağı alın.',
  },
  {
    step: 2,
    title: 'Sigorta Şirketini Ara',
    desc: '7/24 hasar hattını veya dijital kanalı kullanarak hasarı bildirin. Gecikme muafiyet riskini artırır.',
  },
  {
    step: 3,
    title: 'Ekspertiz',
    desc: 'Şirket, lisanslı bir eksper gönderir. Eşya listesi ve fatura/bono talep edilebilir.',
  },
  {
    step: 4,
    title: 'Hasar Tazminatı',
    desc: 'Eksper raporu onaylandıktan sonra 15 iş günü içinde ödeme yapılmalıdır (sigorta mevzuatı gereği).',
  },
];

const TIPS = [
  'DASK zorunludur; konut sigortası isteğe bağlıdır — ancak birlikte değerlendirilmelidir.',
  'Sigorta değerini gerçek yapı maliyetiyle tutun; düşük bildirirseniz eksik sigorta cezası uygulanır.',
  'Eşya için ayrı "ev içeriği" sigortası yaptırabilirsiniz.',
  'Yıllık ödeme genellikle aylık ödemeye kıyasla %5–10 tasarruf sağlar.',
  'Poliçe başlamadan önce mevcut hasarları sigorta şirketine bildirin; aksi hâlde hasar reddedilebilir.',
  'Aynı poliçede bina + içerik + sorumluluk bir arada alınırsa genellikle indirim uygulanır.',
];

const DASK_DIFF = [
  { aspect: 'Kapsam', dask: 'Yalnızca deprem ve tsunami', konut: 'Yangın, su, hırsızlık, fırtına ve daha fazlası' },
  { aspect: 'Zorunluluk', dask: 'Evet — kanunla zorunlu', konut: 'Hayır — isteğe bağlı' },
  { aspect: 'Teminat üst limiti', dask: '₺640.000 (2024)', konut: 'Poliçe değerine göre sınırsız' },
  { aspect: 'Eşya kapsamı', dask: 'Kapsamaz', konut: 'Ek paketle kapsanabilir' },
  { aspect: 'Kim öder?', dask: 'Zorunlu; tapu/elektrik/su aboneliğinde istenir', konut: 'Gönüllü; mülk sahibi talep eder' },
];

export default function KonutSigortasiPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <Shield size={13} /> Sigorta Rehberi
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Konut Sigortası Rehberi
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            DASK zorunlu deprem sigortasının ötesinde, konutunuzu yangın, su baskını, hırsızlık ve
            daha fazlasına karşı korumanın eksiksiz rehberi.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-[#00C49F]">₺500</p>
              <p className="text-xs text-gray-400">Ortalama yıllık prim</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">8</p>
              <p className="text-xs text-gray-400">Ana kapsam türü</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">15</p>
              <p className="text-xs text-gray-400">Gün hasar ödeme süresi</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* DASK vs Konut comparison */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-2">DASK vs Konut Sigortası</h2>
          <p className="text-sm text-gray-500 mb-5">
            Bu iki ürün birbirini tamamlar; birinin kapsamadığını diğeri kapatır.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left p-3 font-bold text-gray-600 rounded-tl-xl">Konu</th>
                  <th className="text-left p-3 font-bold text-[#00C49F]">DASK</th>
                  <th className="text-left p-3 font-bold text-blue-600 rounded-tr-xl">Konut Sigortası</th>
                </tr>
              </thead>
              <tbody>
                {DASK_DIFF.map((row, i) => (
                  <tr key={row.aspect} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="p-3 font-semibold text-gray-700">{row.aspect}</td>
                    <td className="p-3 text-gray-600">{row.dask}</td>
                    <td className="p-3 text-gray-600">{row.konut}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex items-start gap-2 bg-[#F0FDF8] border border-[#00C49F]/20 rounded-xl p-4">
            <Info size={14} className="text-[#00C49F] shrink-0 mt-0.5" />
            <p className="text-xs text-gray-600">
              DASK olmadan elektrik, doğalgaz veya su aboneliği yapılamaz. Konut sigortasının zorunluluğu yoktur,
              ancak mortgage kredisi kullanıyorsanız banka genellikle konut sigortası şartı koşar.
            </p>
          </div>
        </section>

        {/* Coverage types */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-2">Konut Sigortası Neleri Kapsar?</h2>
          <p className="text-sm text-gray-500 mb-5">
            Standart paketler genellikle aşağıdaki teminatlara sahiptir. ✓ olanlar standart, ✗ olanlar ek paket ile alınabilir.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {COVERAGE_TYPES.map(c => (
              <div
                key={c.title}
                className={`bg-white rounded-xl border p-4 shadow-sm flex items-start gap-3 ${c.covered ? 'border-gray-100' : 'border-dashed border-gray-200'}`}
              >
                <span className="text-xl shrink-0">{c.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <p className="text-xs font-bold text-gray-900">{c.title}</p>
                    {c.covered
                      ? <CheckCircle size={13} className="text-[#00C49F] shrink-0" />
                      : <span className="text-[9px] bg-amber-100 text-amber-700 font-bold px-1.5 py-0.5 rounded-full shrink-0">Ek Paket</span>
                    }
                  </div>
                  <p className="text-[10px] text-gray-500 leading-relaxed">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Prim factors */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-lg font-black text-gray-900 mb-4">Prim Tutarını Etkileyen Faktörler</h2>
          <div className="space-y-3">
            {FACTORS.map((f, i) => (
              <div key={i} className="flex items-start gap-4 py-2 border-b border-gray-50 last:border-0">
                <div className="w-5 h-5 rounded-full bg-[#F0FDF8] border border-[#00C49F]/20 flex items-center justify-center shrink-0">
                  <span className="text-[9px] font-black text-[#00C49F]">{i + 1}</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900">{f.label}</p>
                  <p className="text-[10px] text-gray-500 mt-0.5">{f.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Claim process */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-5">Hasar Bildirimi Nasıl Yapılır?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CLAIM_STEPS.map(s => (
              <div key={s.step} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-xl bg-[#00C49F] flex items-center justify-center">
                    <span className="text-xs font-black text-white">{s.step}</span>
                  </div>
                  <h3 className="text-sm font-bold text-gray-900">{s.title}</h3>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tips */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-5">Akıllı Sigorta İpuçları</h2>
          <div className="space-y-3">
            {TIPS.map((tip, i) => (
              <div key={i} className="flex items-start gap-3 bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                <CheckCircle size={15} className="text-[#00C49F] shrink-0 mt-0.5" />
                <p className="text-xs text-gray-600 leading-relaxed">{tip}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Warning */}
        <section className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
          <div className="flex items-start gap-3">
            <AlertTriangle size={18} className="text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-bold text-amber-800 mb-2">Eksik Sigorta (Underinsurance) Uyarısı</h3>
              <p className="text-xs text-amber-700 leading-relaxed">
                Binanızın gerçek yapı maliyetinin altında sigorta değeri bildirirseniz, hasar anında
                tazminat orantılı olarak azalır. Örneğin ₺2.000.000 değerindeki konuta ₺1.000.000
                sigorta değeri biçilirse, hasar ödemesi %50 oranında düşürülür.
              </p>
            </div>
          </div>
        </section>

        {/* CTAs */}
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link href="/dask-hesaplayici" className="group bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-all flex flex-col gap-3">
              <Shield size={20} className="text-[#00C49F]" />
              <div>
                <p className="text-sm font-bold text-gray-900 mb-1">DASK Prim Hesapla</p>
                <p className="text-xs text-gray-500">Zorunlu deprem sigortası</p>
              </div>
              <ArrowRight size={13} className="text-gray-300 group-hover:text-gray-600 transition-colors mt-auto" />
            </Link>
            <Link href="/tapu-masrafi" className="group bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-all flex flex-col gap-3">
              <FileText size={20} className="text-blue-600" />
              <div>
                <p className="text-sm font-bold text-gray-900 mb-1">Tapu Masrafı Hesapla</p>
                <p className="text-xs text-gray-500">Alım toplam maliyeti</p>
              </div>
              <ArrowRight size={13} className="text-gray-300 group-hover:text-gray-600 transition-colors mt-auto" />
            </Link>
            <Link href="/hesaplama" className="group bg-gradient-to-br from-[#00C49F] to-[#00a882] rounded-2xl p-5 hover:shadow-md transition-all flex flex-col gap-3">
              <Calculator size={20} className="text-white" />
              <div>
                <p className="text-sm font-bold text-white mb-1">Tüm Hesaplama Araçları</p>
                <p className="text-xs text-white/70">Kredi, vergi, kira ve daha fazlası</p>
              </div>
              <ArrowRight size={13} className="text-white/60 group-hover:text-white transition-colors mt-auto" />
            </Link>
          </div>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp size={15} className="text-[#00C49F]" /> İlgili Konular
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/dask-hesaplayici', label: 'DASK Prim Hesaplayıcı' },
              { href: '/emlak-vergisi', label: 'Emlak Vergisi Hesaplayıcı' },
              { href: '/rehber/ev-satin-alma', label: 'Ev Satın Alma Rehberi' },
              { href: '/imar-durumu', label: 'İmar Durumu Rehberi' },
              { href: '/kentsel-donusum', label: 'Kentsel Dönüşüm Rehberi' },
              { href: '/yabanci-gayrimenkul', label: 'Yabancı Alıcı Rehberi' },
            ].map(l => (
              <Link
                key={l.href}
                href={l.href}
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
