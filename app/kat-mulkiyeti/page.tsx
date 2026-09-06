import { Metadata } from 'next';
import Link from 'next/link';
import {
  Building2, CheckCircle, AlertTriangle, ArrowRight, Clock, FileText,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Kat Mülkiyeti ve Kat İrtifakı Rehberi | Söylemesi Bizden',
  description:
    'Kat mülkiyeti ile kat irtifakı arasındaki farklar, dönüşüm süreci, site yönetimi, ortak alanlar ve kat malikleri kurulu hakları.',
};

const COMPARISON = [
  { aspect: 'Tanım', irtirak: 'Bina tamamlanmadan önce alınan geçici tapu', mulkiyet: 'İskan sonrası tam bağımsız bölüm tapusu' },
  { aspect: 'İskan durumu', irtirak: 'İskan belgesi yok', mulkiyet: 'İskan belgesi mevcut' },
  { aspect: 'Banka kredisi', irtirak: 'Bazı bankalar kabul etmez veya yüksek faiz uygular', mulkiyet: 'Normal koşullarda kredi verilir' },
  { aspect: 'Daire numarası', irtirak: 'Bağımsız bölüm numarası atanır ama onaylanmamıştır', mulkiyet: 'Kesinleşmiş bağımsız bölüm numarası' },
  { aspect: 'Resmi numara', irtirak: 'Yok (kapı numarası gayri resmî)', mulkiyet: 'Adrese dayalı nüfus sistemi kaydı' },
  { aspect: 'Sigorta', irtirak: 'DASK yaptırılabilir; tam konut sigortasında sorun çıkabilir', mulkiyet: 'Tüm sigortalar sorunsuz yapılır' },
  { aspect: 'Dönüşüm', irtirak: 'İskan alındıktan sonra kat mülkiyetine geçilir', mulkiyet: '—' },
];

const CONVERSION_STEPS = [
  { step: '1', title: 'İskan (Yapı Kullanma İzni) Al', desc: 'Bina tamamlanınca belediyeye başvurulur; teknik inceleme sonrası izin verilir.', duration: '1-3 ay' },
  { step: '2', title: 'Yönetim Planı Hazırla', desc: 'Tüm kat maliklerinin imzaladığı yönetim planı noter onaylanmalıdır.', duration: '1-2 hafta' },
  { step: '3', title: 'Tapu Müdürlüğüne Başvur', desc: 'İskan, yönetim planı ve daire listesiyle tapu dairesine başvurun.', duration: '1-5 iş günü' },
  { step: '4', title: 'Harç Öde', desc: 'Dönüşüm harcı makul düzeydedir (değer üzerinden binde 4.55).', duration: '1 gün' },
  { step: '5', title: 'Kat Mülkiyeti Tapusunu Al', desc: 'Tüm bağımsız bölümler için ayrı tapu verilir.', duration: '1 gün' },
];

const RIGHTS = [
  { title: 'Kat Malikleri Kurulu', desc: 'Tüm malikler en az yılda bir toplanır. Yönetici seçimi, bütçe, tadilat kararları bu kurulda alınır.' },
  { title: 'Oy Oranı', desc: 'Olağan kararlar arsa payı üzerinden hesaplanan 2/3 çoğunlukla, güçlendirme ve dönüşüm için 2/3 tam oy aranır.' },
  { title: 'Aidat Zorunluluğu', desc: 'Kat Mülkiyeti Kanunu md. 20-22 uyarınca arsa payıyla orantılı aidat ödemek her malikin yükümlülüğüdür.' },
  { title: 'Ortak Alan Kullanımı', desc: 'Bahçe, merdiven, asansör, çatı ortak alandır; hiçbir malik tekbaşına tadilat yapamaz.' },
  { title: 'Kiracının Hakları', desc: 'Kiracı kat malikleri kuruluna katılamaz; ancak gürültü, temizlik gibi iç yönetmelik kurallarına uymak zorundadır.' },
];

const ISSUES = [
  { issue: 'Ortak Alan İşgali', desc: 'Bir malikin balkon veya çatıyı kapatması hukuka aykırıdır; diğer malikler dava açabilir.' },
  { issue: 'Aidat Borcu', desc: 'Borçlu maliki ipotek koyarak takip etmek mümkündür; yönetici icra yoluna başvurabilir.' },
  { issue: 'Yönetici Seçimi', desc: 'Yönetici seçilememişse herhangi bir malik sulh hukuk mahkemesinden atanmasını isteyebilir.' },
  { issue: 'İzinsiz Tadilat', desc: 'Komşu dairenin taşıyıcı duvarına dokunan değişiklikler suç teşkil eder ve tazminat doğurur.' },
];

export default function KatMulkiyetiPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-violet-500/20 border border-violet-500/30 text-violet-300 text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <Building2 size={13} /> Hukuki Rehber
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Kat Mülkiyeti ve Kat İrtifakı Rehberi
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            Kat irtifakı ile kat mülkiyeti arasındaki temel farklar, irtifaktan mülkiyete geçiş süreci,
            site yönetimi, kat malikleri kurulu ve sık yaşanan anlaşmazlıklar.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-violet-400">KMK</p>
              <p className="text-xs text-gray-400">Kat Mülkiyeti Kanunu</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">2/3</p>
              <p className="text-xs text-gray-400">Karar çoğunluğu</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-400">İskan</p>
              <p className="text-xs text-gray-400">Mülkiyete geçiş şartı</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* Karşılaştırma Tablosu */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Kat İrtifakı vs Kat Mülkiyeti</h2>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="text-left px-4 py-3 font-black text-gray-700">Özellik</th>
                    <th className="text-left px-4 py-3 font-black text-amber-600">Kat İrtifakı</th>
                    <th className="text-left px-4 py-3 font-black text-violet-600">Kat Mülkiyeti</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map((c, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 font-bold text-gray-800">{c.aspect}</td>
                      <td className="px-4 py-3 text-amber-700 leading-relaxed">{c.irtirak}</td>
                      <td className="px-4 py-3 text-violet-700 leading-relaxed">{c.mulkiyet}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Dönüşüm Süreci */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-5">İrtifaktan Mülkiyete Geçiş</h2>
          <div className="space-y-3">
            {CONVERSION_STEPS.map(s => (
              <div key={s.step} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-violet-600 text-white flex items-center justify-center text-xs font-black shrink-0">
                  {s.step}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-3 mb-1">
                    <h3 className="text-sm font-black text-gray-900">{s.title}</h3>
                    <span className="flex items-center gap-1 text-[10px] text-gray-400 whitespace-nowrap">
                      <Clock size={10} /> {s.duration}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Haklar */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Kat Maliki Hakları ve Yükümlülükleri</h2>
          <div className="space-y-3">
            {RIGHTS.map((r, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm flex items-start gap-3">
                <CheckCircle size={14} className="text-violet-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-black text-gray-900 mb-0.5">{r.title}</p>
                  <p className="text-xs text-gray-600 leading-relaxed">{r.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Sık Sorunlar */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Sık Yaşanan Anlaşmazlıklar</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ISSUES.map((issue, i) => (
              <div key={i} className="bg-white rounded-xl border border-amber-100 p-4 shadow-sm">
                <div className="flex items-start gap-3">
                  <AlertTriangle size={13} className="text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-black text-gray-900 mb-1">{issue.issue}</p>
                    <p className="text-[10px] text-gray-600 leading-relaxed">{issue.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Warning */}
        <section className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <AlertTriangle size={14} className="text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-700 space-y-1">
            <p className="font-black">Kat irtifaklı mülk alırken nelere dikkat edin?</p>
            <p>İskan alınıp alınmadığını belediyeden teyit edin. İskan olmayan binanın kat mülkiyetine dönüşüm süreci belirsizdir ve sizi ileride sorunlu bırakabilir. Müteahhitten iskan tarihini yazılı olarak talep edin.</p>
          </div>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Araçlar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/tapu-devir-sureci', label: 'Tapu Devir Süreci' },
              { href: '/belediye-hizmetleri', label: 'Belediye Hizmetleri Rehberi' },
              { href: '/aidat-hesaplayici', label: 'Aidat Hesaplayıcı' },
              { href: '/kentsel-donusum', label: 'Kentsel Dönüşüm Rehberi' },
              { href: '/dask-hesaplayici', label: 'DASK Prim Hesaplayıcı' },
              { href: '/enerji-kimlik-belgesi', label: 'Enerji Kimlik Belgesi (EKB)' },
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
