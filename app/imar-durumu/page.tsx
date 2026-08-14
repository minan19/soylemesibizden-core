import { Metadata } from 'next';
import Link from 'next/link';
import {
  MapPin, CheckCircle2, AlertCircle, ArrowRight, FileText,
  Building2, Info, Lightbulb, BookOpen,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'İmar Durumu Nedir? Nasıl Sorgulanır? | Söylemesi Bizden',
  description:
    'İmar durumu sorgulama, imar planı türleri, TAKS/KAKS oranları, yapı ruhsatı ve iskan belgesi hakkında kapsamlı rehber. Arsa ve konut yatırımcıları için.',
};

const IMAR_TYPES = [
  { type: 'Konut Alanı (Konut İmarı)', color: 'bg-green-100 text-green-800 border-green-200', desc: 'Mesken yapımına uygun. TAKS ve KAKS değerleri belirlenmişse kaç katlı bina yapılabileceği buradan hesaplanır.' },
  { type: 'Ticari Alan', color: 'bg-blue-100 text-blue-800 border-blue-200', desc: 'Alışveriş merkezi, ofis, dükkan gibi ticari yapılara izin verilir. Bazı bölgelerde karma kullanım mümkündür.' },
  { type: 'Ayrık Nizam', color: 'bg-purple-100 text-purple-800 border-purple-200', desc: 'Komşu binalara bitişik olmayan, dört tarafı boş bırakılarak yapılan bina tipi.' },
  { type: 'Bitişik Nizam', color: 'bg-amber-100 text-amber-800 border-amber-200', desc: 'Komşu parsellere bitişik bina yapımına izin verilen bölge. Geleneksel kent dokusunda yaygın.' },
  { type: 'Yeşil Alan / Park', color: 'bg-emerald-100 text-emerald-800 border-emerald-200', desc: 'Yapılaşmaya kapalı alan. Bu tür parseller üzerine bina yapılamaz.' },
  { type: 'Tarım Arazisi', color: 'bg-lime-100 text-lime-800 border-lime-200', desc: 'Yapılaşmaya büyük ölçüde kapalıdır. Tarımsal yapılar (depo, sera) koşullara bağlı izin alabilir.' },
  { type: 'Sanayi Alanı', color: 'bg-slate-100 text-slate-800 border-slate-200', desc: 'Fabrika, depo, atölye gibi endüstriyel tesisler için ayrılmış bölge.' },
  { type: 'Turizm Alanı', color: 'bg-orange-100 text-orange-800 border-orange-200', desc: 'Otel, tatil köyü, turizm tesisi yapımına izin verilir. Bazı bölgelerde konut yasaktır.' },
];

const HOW_TO_QUERY = [
  {
    step: 1,
    title: 'e-Devlet Üzerinden Sorgulama',
    desc: 'turkiye.gov.tr\'de "İmar Durum Bilgisi" hizmetine giriş yapın. Tapu bilgilerinizi girerek ilçe belediyesinin sistemine yönlendirilirsiniz.',
    icon: '🖥️',
  },
  {
    step: 2,
    title: 'Belediye İmar Müdürlüğü',
    desc: 'Mülkün bağlı olduğu belediyenin imar ve şehircilik müdürlüğüne bizzat başvurabilirsiniz. Tapu fotokopisi ile imar durumu belgesi alınır.',
    icon: '🏛️',
  },
  {
    step: 3,
    title: 'Belediye Web Sitesi & CBS Haritaları',
    desc: 'Büyükşehirlerde (İstanbul, Ankara, İzmir) Coğrafi Bilgi Sistemi (CBS) haritaları üzerinden parselin imar durumunu harita arayüzüyle görebilirsiniz.',
    icon: '🗺️',
  },
  {
    step: 4,
    title: 'Değerleme Uzmanı',
    desc: 'SPK lisanslı değerleme uzmanı, tapu bilgisinden resmi imar durumunu öğrenerek ekspertiz raporuna ekler.',
    icon: '📋',
  },
];

const TERMS = [
  { term: 'TAKS (Taban Alanı Katsayısı)', def: 'Yapının taban alanının parselin alanına oranıdır. TAKS = 0.30 ise arsanın en fazla %30\'u zemin katta kapatılabilir.' },
  { term: 'KAKS (Kat Alanı Katsayısı) / Emsal', def: 'Toplam inşaat alanının parsel alanına oranıdır. KAKS = 1.5 ise 500 m² arsaya 750 m² toplam inşaat yapılabilir.' },
  { term: 'Çekme Mesafesi (Setback)', def: 'Binanın parsel sınırından ne kadar içeride başlaması gerektiğini belirtir. Ön, arka, yan bahçe mesafeleri olarak uygulanır.' },
  { term: 'Kat Yüksekliği', def: 'İmar planında her kata izin verilen maksimum yüksekliktir. Yapının silueti ve gölge etkileri bu sınır belirlenir.' },
  { term: 'Kadastro Parseli', def: 'Tapu kaydındaki resmi mülk sınırları. İmar parseli farklı olabilir; birleşme veya ayırma işlemlerinde değişebilir.' },
  { term: 'Yapı Ruhsatı', def: 'İnşaata başlamadan önce belediyeden alınması zorunlu izin belgesi. İmar şartlarına uygun proje onaylandıktan sonra verilir.' },
  { term: 'İskan (Yapı Kullanma İzni)', def: 'Binanın projeye uygun tamamlandığını belgeleyen resmi izin. İskansız binalarda doğalgaz ve su aboneliği açılamaz.' },
];

const WARNINGS = [
  { title: 'İmar Planı Değişebilir', desc: 'Belediyeler imar planlarını revize edebilir. "İmar var" diyerek satılan arsalarda plan revizyonuyla değer ve kullanım değişebilir.' },
  { title: 'Ön İzin ≠ Ruhsat', desc: 'İmar durumu alınması, yapı ruhsatı alabileceğiniz anlamına gelmez. Proje, zemin etüdü ve diğer belgeler de gerekir.' },
  { title: 'Kentsel Dönüşüm Bölgesi', desc: 'Riskli alan kapsamındaki yapılarda tapu devri kısıtlaması olabilir; özel prosedürler geçerlidir.' },
  { title: 'Tarım Dışı Arazi İzni', desc: 'Tarım arazileri üzerine konut yapımı için Tarım Bakanlığı\'ndan "tarım dışı kullanım izni" alınması gerekir.' },
];

export default function ImarDurumuPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-800 to-slate-900 text-white">
        <div className="max-w-5xl mx-auto px-6 py-14">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
              <MapPin size={22} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tight">İmar Durumu Rehberi</h1>
              <p className="text-slate-400 text-sm mt-0.5">Sorgulama · Plan Türleri · TAKS/KAKS · Ruhsat</p>
            </div>
          </div>
          <p className="text-slate-300 text-sm max-w-xl leading-relaxed">
            Arsa veya konut alırken imar durumu en kritik unsurdur. Bu rehberde imar durumunu nasıl sorgulayacağınızı,
            plan türlerini ve TAKS/KAKS değerlerini öğrenebilirsiniz.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">

        {/* How to query */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-sm font-black text-gray-900 mb-5 flex items-center gap-2">
            <FileText size={15} className="text-[#00C49F]" /> İmar Durumu Nasıl Sorgulanır?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {HOW_TO_QUERY.map(s => (
              <div key={s.step} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{s.icon}</span>
                  <div>
                    <p className="text-xs font-black text-gray-900 mb-1">{s.step}. {s.title}</p>
                    <p className="text-xs text-gray-500 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-start gap-2 bg-[#F0FDF8] border border-[#00C49F]/20 rounded-xl p-3">
            <Lightbulb size={13} className="text-[#00C49F] shrink-0 mt-0.5" />
            <p className="text-xs text-[#00C49F]">
              Satın almadan önce mutlaka <strong>resmi imar durumu belgesi</strong> alın; satıcının sözlü beyanına güvenmeyin.
            </p>
          </div>
        </div>

        {/* Plan types */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-sm font-black text-gray-900 mb-5 flex items-center gap-2">
            <Building2 size={15} className="text-blue-500" /> İmar Planı Türleri
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {IMAR_TYPES.map(t => (
              <div key={t.type} className={`rounded-xl border p-4 ${t.color}`}>
                <p className="text-xs font-black mb-1">{t.type}</p>
                <p className="text-[11px] leading-relaxed opacity-80">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Key terms */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-sm font-black text-gray-900 mb-5 flex items-center gap-2">
            <BookOpen size={15} className="text-violet-500" /> Temel Terimler
          </h2>
          <div className="space-y-3">
            {TERMS.map(t => (
              <div key={t.term} className="flex gap-4 py-3 border-b border-gray-50 last:border-0">
                <div className="w-1.5 rounded-full bg-[#00C49F] shrink-0 mt-1 self-stretch" />
                <div>
                  <p className="text-xs font-black text-gray-900 mb-1">{t.term}</p>
                  <p className="text-xs text-gray-500 leading-relaxed">{t.def}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Example calculation */}
        <div className="bg-[#F0FDF8] border border-[#00C49F]/20 rounded-2xl p-6">
          <h2 className="text-sm font-black text-[#00C49F] mb-4 flex items-center gap-2">
            <CheckCircle2 size={15} /> Örnek Hesaplama: TAKS & KAKS
          </h2>
          <div className="bg-white rounded-xl border border-[#00C49F]/20 p-5">
            <p className="text-xs text-gray-600 mb-4">
              <strong>Senaryo:</strong> 300 m² arsa · TAKS: 0.30 · KAKS (Emsal): 1.50 · 3 kat izinli
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-3 bg-[#F0FDF8] rounded-xl">
                <p className="text-gray-500 mb-1">Taban Alanı (TAKS × Parsel)</p>
                <p className="text-lg font-black text-[#00C49F]">90 m²</p>
                <p className="text-gray-400">0.30 × 300 m²</p>
              </div>
              <div className="p-3 bg-[#F0FDF8] rounded-xl">
                <p className="text-gray-500 mb-1">Toplam İnşaat (KAKS × Parsel)</p>
                <p className="text-lg font-black text-[#00C49F]">450 m²</p>
                <p className="text-gray-400">1.50 × 300 m²</p>
              </div>
              <div className="p-3 bg-[#F0FDF8] rounded-xl">
                <p className="text-gray-500 mb-1">Brüt Kat Alanı (450 / 3 kat)</p>
                <p className="text-lg font-black text-[#00C49F]">150 m² / kat</p>
                <p className="text-gray-400">maks. 3 katlı</p>
              </div>
            </div>
            <p className="text-[10px] text-gray-400 mt-3">* Gerçek proje çekme mesafeleri ve bodrum katı durumu değerlere yansımaz. Mutlaka belediyeye danışın.</p>
          </div>
        </div>

        {/* Warnings */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-sm font-black text-gray-900 mb-5 flex items-center gap-2">
            <AlertCircle size={15} className="text-rose-500" /> Dikkat Edilmesi Gerekenler
          </h2>
          <div className="space-y-3">
            {WARNINGS.map(w => (
              <div key={w.title} className="flex items-start gap-3 p-4 bg-rose-50 border border-rose-100 rounded-xl">
                <AlertCircle size={13} className="text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-rose-700">{w.title}</p>
                  <p className="text-xs text-rose-600 mt-0.5 leading-relaxed">{w.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Process steps */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-sm font-black text-gray-900 mb-5">Ruhsat Alma Süreci</h2>
          <div className="flex flex-col sm:flex-row gap-3">
            {[
              { num: 1, label: 'İmar Durumu Belgesi', sub: 'Belediye İmar Müdürlüğü' },
              { num: 2, label: 'Zemin Etüdü', sub: 'Jeolojik rapor' },
              { num: 3, label: 'Proje Hazırlama', sub: 'Mimar + Mühendis' },
              { num: 4, label: 'Proje Onayı', sub: 'Belediye incelemesi' },
              { num: 5, label: 'Yapı Ruhsatı', sub: 'İnşaata başlayabilirsiniz' },
              { num: 6, label: 'İskan', sub: 'Bina tamamlandıktan sonra' },
            ].map((s, idx, arr) => (
              <div key={s.num} className="flex items-center gap-2 flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div className="w-8 h-8 rounded-full bg-[#00C49F] text-white text-xs font-black flex items-center justify-center shrink-0">
                    {s.num}
                  </div>
                  <p className="text-[10px] font-bold text-gray-800 mt-2 text-center">{s.label}</p>
                  <p className="text-[9px] text-gray-400 text-center">{s.sub}</p>
                </div>
                {idx < arr.length - 1 && (
                  <ArrowRight size={14} className="text-gray-200 shrink-0 hidden sm:block" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Info tip */}
        <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-2xl p-4">
          <Info size={14} className="text-amber-500 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-700 leading-relaxed">
            İmar durumu sorgulama ve ruhsat süreçleri belediyeye göre farklılık gösterebilir.
            Kesin bilgi için ilgili belediyenin imar müdürlüğüne ya da bir gayrimenkul hukuku uzmanına danışın.
          </p>
        </div>

        {/* Related */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { href: '/gayrimenkul-sozlugu', label: 'Gayrimenkul Sözlüğü', desc: 'Tüm terimler ve tanımlar' },
            { href: '/rehber/ev-satin-alma', label: 'Ev Satın Alma Rehberi', desc: 'Adım adım satın alma süreci' },
            { href: '/valuation', label: 'Değerleme Aracı', desc: 'Mülk fiyat analizi' },
          ].map(t => (
            <Link
              key={t.href}
              href={t.href}
              className="group bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md hover:border-[#00C49F]/30 transition-all flex items-center gap-4"
            >
              <div className="flex-1">
                <p className="text-sm font-bold text-gray-800 group-hover:text-[#00C49F] transition-colors">{t.label}</p>
                <p className="text-xs text-gray-400">{t.desc}</p>
              </div>
              <ArrowRight size={14} className="text-gray-300 group-hover:text-[#00C49F] transition-colors shrink-0" />
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
