import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowLeft, Home, CheckCircle2, AlertTriangle, Info, Calculator, FileText, TrendingUp } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Ev Satın Alma Rehberi | Söylemesi Bizden',
  description: 'Türkiye\'de ev satın alırken bilmeniz gereken her şey. Bütçe, kredi, tapu işlemleri, müzakere taktikleri ve yaygın hatalar.',
};

const STEPS = [
  {
    n: '01',
    title: 'Bütçenizi Belirleyin',
    color: 'text-[#00C49F]',
    bg: 'bg-[#F0FDF8]',
    content: [
      'Toplam bütçenizin maksimum %40\'ı kadar aylık taksit ödeyin.',
      'Tapu harcı (%4), noter masrafları ve taşınma giderlerini dahil edin.',
      'Minimum %20 peşinat hazırlayın — bazı bankalar %30+ ister.',
      'Acil fon olarak ev değerinin %5-10\'unu kenarda tutun.',
    ],
  },
  {
    n: '02',
    title: 'Konut Kredisi Sürecini Başlatın',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    content: [
      'En az 3 farklı bankadan fiyat teklifi alın.',
      'Kredi notunuzu önceden öğrenin ve mümkünse iyileştirin.',
      'Sabit vs değişken faiz farkını anlayın.',
      'Ekspertiz raporunu banka aracılığıyla yaptırın.',
    ],
  },
  {
    n: '03',
    title: 'Doğru Mülkü Araştırın',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    content: [
      'İskan belgesi (yapı kullanma izni) mutlaka kontrol edin.',
      'Tapu kaydında ipotek, haciz veya şerh olup olmadığını sorgulayın.',
      'Binanın deprem bölgesi sınıflamasını öğrenin.',
      'Kat mülkiyeti vs kat irtifakı farkını anlayın.',
    ],
  },
  {
    n: '04',
    title: 'Tapu İşlemleri',
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    content: [
      'Tapu Müdürlüğü\'ne her iki taraf bizzat katılır.',
      'DASK (zorunlu deprem sigortası) olmadan tapu devredilemez.',
      'Tapuya beyan edilen değer üzerinden %4 tapu harcı ödenir.',
      'Hatalı beyan için ağır cezalar söz konusudur.',
    ],
  },
];

const MISTAKES = [
  'Bütçe üstü harcama yaparak acil rezervsiz kalmak',
  'Tapu sicilini araştırmadan satın almak',
  'Proje aşamasındaki konutlarda kaparo kaybetmek',
  'Kat irtifaklı tapu ile kat mülkiyeti tapusunu karıştırmak',
  'İskan belgesi olmayan yapı satın almak',
  'Tek bankadan kredi teklifi alarak karşılaştırmamak',
];

export default function EvSatinAlmaPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-3xl mx-auto px-6 py-10 space-y-8">

        {/* Back + breadcrumb */}
        <div>
          <Link href="/rehber" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-700 transition-colors mb-3">
            <ArrowLeft size={14} /> Rehberler
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#F0FDF8] flex items-center justify-center">
              <Home size={22} className="text-[#00C49F]" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#00C49F] uppercase tracking-widest">Rehber · 8 dk okuma</span>
              <h1 className="text-2xl font-black tracking-tight text-gray-900 mt-0.5">Ev Satın Alma Rehberi</h1>
            </div>
          </div>
        </div>

        {/* Intro */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <p className="text-gray-600 leading-relaxed text-sm">
            Türkiye&apos;de ev satın almak hem heyecan verici hem de karmaşık bir süreçtir.
            Bu rehber, ilk evinizi alacak olanlar için bütçe planlamasından tapu tesciline kadar
            tüm adımları sıralıyor. Her aşamada pratik ipuçları ve gerçek hayat tuzaklarından
            kaçınma yolları bulacaksınız.
          </p>
        </div>

        {/* Steps */}
        {STEPS.map(step => (
          <div key={step.n} id={step.n === '04' ? 'tapu' : undefined} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-2xl ${step.bg} flex items-center justify-center shrink-0`}>
                <span className={`text-lg font-black ${step.color}`}>{step.n}</span>
              </div>
              <div className="flex-1">
                <h2 className="text-base font-bold text-gray-900 mb-3">{step.title}</h2>
                <ul className="space-y-2">
                  {step.content.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
                      <CheckCircle2 size={14} className={`${step.color} shrink-0 mt-0.5`} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}

        {/* Common mistakes */}
        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle size={18} className="text-amber-600" />
            <h2 className="text-sm font-bold text-amber-800">Yaygın Hatalar</h2>
          </div>
          <ul className="space-y-2">
            {MISTAKES.map((m, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-amber-700">
                <span className="text-amber-500 font-black mt-0.5">✕</span>
                {m}
              </li>
            ))}
          </ul>
        </div>

        {/* Info box */}
        <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-2xl p-4">
          <Info size={16} className="text-blue-400 shrink-0 mt-0.5" />
          <p className="text-xs text-blue-600 leading-relaxed">
            <strong>Not:</strong> Bu rehber genel bilgi amaçlıdır. Tapu ve hukuki süreçler için bir gayrimenkul avukatına veya
            lisanslı emlak danışmanına başvurmanızı öneririz. Bilgiler 2026 yılı mevzuatına göredir.
          </p>
        </div>

        {/* Related tools */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Araçlar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { href: '/hesaplama', icon: Calculator, label: 'Kredi Hesaplayıcı' },
              { href: '/valuation', icon: TrendingUp, label: 'Değerleme Aracı' },
              { href: '/listings?listingType=SATILIK', icon: FileText, label: 'Satılık İlanlar' },
            ].map(t => (
              <Link
                key={t.href}
                href={t.href}
                className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-[#F0FDF8] border border-transparent hover:border-[#00C49F]/20 transition-all group"
              >
                <t.icon size={15} className="text-gray-400 group-hover:text-[#00C49F] transition-colors" />
                <span className="text-xs font-semibold text-gray-600 group-hover:text-[#00C49F] transition-colors">{t.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-2">
          <Link href="/rehber" className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-700 transition-colors">
            <ArrowLeft size={14} /> Tüm Rehberler
          </Link>
          <Link href="/rehber/kiralama-rehberi" className="flex items-center gap-2 text-sm text-[#00C49F] hover:text-[#00a882] font-semibold transition-colors">
            Kiralama Rehberi →
          </Link>
        </div>
      </div>
    </main>
  );
}
