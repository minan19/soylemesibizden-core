import { Metadata } from 'next';
import Link from 'next/link';
import {
  MapPin, FileText, CreditCard, Search, CheckCircle,
  AlertTriangle, ArrowRight, Building2, Home,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Belediye Hizmetleri Rehberi | Emlak Vergisi, İmar, Tapu | Söylemesi Bizden',
  description:
    'Gayrimenkule ilişkin belediye hizmetleri: emlak vergisi ödeme, yapı ruhsatı, imar durumu belgesi, iskan belgesi, çevre temizlik vergisi ve e-belediye işlemleri.',
};

const SERVICES = [
  {
    title: 'Emlak Vergisi Ödeme',
    icon: CreditCard,
    color: 'text-[#00C49F]',
    bg: 'bg-[#F0FDF8]',
    border: 'border-[#00C49F]/20',
    desc: 'Her yıl Mayıs ve Kasım aylarında iki eşit taksit hâlinde ödenir. Büyükşehirlerde belediyeye, diğerlerinde ilçe belediyesine.',
    steps: [
      'Belediyenin e-belediye portaline ya da veznelerine gidin',
      'TC kimlik numarası veya parsel bilgisiyle sorgulama yapın',
      'Kredi kartı, EFT veya tahsilat makinesiyle ödeme yapın',
      'Makbuzu saklayın (tapu işlemleri sırasında istenir)',
    ],
    online: 'Büyükşehir belediyelerinin çoğunda mobil uygulama veya e-belediye portalinden yapılabilir.',
  },
  {
    title: 'Çevre Temizlik Vergisi',
    icon: Home,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    desc: 'Konutlar için su faturasıyla birlikte yıllık olarak tahsil edilir. İşyerleri için ise ayrı bildirim yapılması gerekir.',
    steps: [
      'Su faturanızı kontrol edin — çevre temizlik vergisi genellikle burada görünür',
      'Fatura üzerinden otomatik olarak kesilir',
      'Tapu devri öncesinde borç sorgulaması şart',
    ],
    online: 'İSKİ, ASKI gibi su idarelerinin web sitelerinden sorgulanabilir.',
  },
  {
    title: 'İmar Durumu Belgesi',
    icon: MapPin,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    desc: 'Arsa veya mülk için belediyeden alınan, TAKS/KAKS ve inşaat koşullarını gösteren belge. Parsel bazlı sorgulanır.',
    steps: [
      'Belediye imar müdürlüğüne dilekçeyle başvurun',
      'Tapu fotokopisi ve parsel bilgisini ekleyin',
      'Harç ödeyerek belgeyi alın (ortalama 3-10 iş günü)',
    ],
    online: 'Bazı büyükşehir belediyeleri e-imar portalinden online sorgu imkânı sunmaktadır.',
  },
  {
    title: 'Yapı Ruhsatı',
    icon: Building2,
    color: 'text-violet-600',
    bg: 'bg-violet-50',
    border: 'border-violet-200',
    desc: 'Yeni bina inşaatı, tadilat veya ek yapı için belediyeden alınır. Ruhsatsız yapılar yıkım emriyle karşılaşabilir.',
    steps: [
      'Mimari proje ve zemin etüdü hazırlatın (lisanslı mühendis)',
      'E-devlet veya belediye imar müdürlüğüne başvurun',
      'Teknik inceleme sonrası harç ödenip ruhsat alınır',
      'Yapı tamamlandığında iskan belgesi alınmalıdır',
    ],
    online: 'E-yapı.gov.tr (e-devlet entegrasyonu) üzerinden proje başvurusu yapılabilir.',
  },
  {
    title: 'İskan (Yapı Kullanma İzin) Belgesi',
    icon: CheckCircle,
    color: 'text-rose-600',
    bg: 'bg-rose-50',
    border: 'border-rose-200',
    desc: 'Binanın kullanıma hazır olduğunu belgeleyen ve kat mülkiyetine geçiş için zorunlu olan belge. İskansız binalarda tapu kat irtifakı olarak kalır.',
    steps: [
      'Yapı tamamlandıktan sonra belediyeye başvurun',
      'Belediye teknik ekibi yerinde inceleme yapar',
      'DASK zorunlu deprem sigortası zorunludur',
      'İskan alındıktan sonra kat mülkiyeti tapusuna dönüşüm yapılır',
    ],
    online: 'E-devlet entegrasyonlu ilçe belediyelerinde online takip yapılabilir.',
  },
  {
    title: 'Parsel Sorgulama (e-Tapu)',
    icon: Search,
    color: 'text-gray-600',
    bg: 'bg-gray-50',
    border: 'border-gray-200',
    desc: 'Tapu kayıt bilgileri, ipotek ve şerhleri e-tapu.gov.tr veya TKGM mobil uygulamasından sorgulanabilir.',
    steps: [
      'e-tapu.gov.tr veya "e-Tapu" uygulamasını açın',
      'TC kimlik veya adres bilgisiyle giriş yapın',
      'Parsel/ada numarasını girerek tapu kaydını sorgulayın',
      'İpotek, haciz, şerh durumunu kontrol edin',
    ],
    online: 'Tamamen online. Mobil uygulama 7/24 kullanılabilir.',
  },
];

const QUICK_LINKS = [
  { label: 'e-Tapu Sorgu (TKGM)', url: 'https://www.tkgm.gov.tr' },
  { label: 'Yapı Ruhsatı (e-Devlet)', url: 'https://www.turkiye.gov.tr' },
  { label: 'e-İmar Portalı (İBB)', url: 'https://www.ibb.istanbul/hizmetler' },
  { label: 'Emlak Vergisi (GİB)', url: 'https://www.gib.gov.tr' },
];

const IMPORTANT_NOTES = [
  'Tapu devri yapılmadan önce belediyeye olan tüm borçların (emlak vergisi, çevre temizlik vergisi) sıfırlanması zorunludur.',
  'İskansız (kat irtifaklı) mülklerde banka konut kredisi vermeyebilir veya daha yüksek faiz uygulayabilir.',
  'Ruhsatsız veya aykırı yapılar kentsel dönüşüm sürecinde hak kaybına yol açabilir.',
  'Belediye harçları şehir ve hizmete göre değişir; mutlaka ilgili belediyeyi arayın.',
];

export default function BelediyeHizmetleriPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <Building2 size={13} /> Belediye Rehberi
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Belediye Hizmetleri Rehberi
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            Emlak vergisi ödemesinden yapı ruhsatına, imar durumu belgesinden iskan iznine
            kadar gayrimenkule ilişkin tüm belediye işlemlerinin adım adım rehberi.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-[#00C49F]">6</p>
              <p className="text-xs text-gray-400">Temel hizmet</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">Online</p>
              <p className="text-xs text-gray-400">E-belediye portalları</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-400">Mayıs/Kas</p>
              <p className="text-xs text-gray-400">Vergi ödeme dönemi</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* Services */}
        <section className="space-y-5">
          {SERVICES.map(s => (
            <div key={s.title} className={`bg-white rounded-2xl border ${s.border} p-5 shadow-sm`}>
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center shrink-0`}>
                  <s.icon size={20} className={s.color} />
                </div>
                <div className="flex-1">
                  <h2 className="text-base font-black text-gray-900 mb-1">{s.title}</h2>
                  <p className="text-xs text-gray-500 leading-relaxed mb-3">{s.desc}</p>

                  <div className="space-y-1.5 mb-3">
                    {s.steps.map((step, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className={`text-[9px] font-black w-4 h-4 rounded-full ${s.bg} ${s.color} flex items-center justify-center shrink-0 mt-0.5`}>
                          {i + 1}
                        </span>
                        <p className="text-xs text-gray-600 leading-relaxed">{step}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-start gap-2 bg-gray-50 rounded-lg p-2">
                    <CheckCircle size={11} className="text-[#00C49F] shrink-0 mt-0.5" />
                    <p className="text-[10px] text-gray-500 leading-relaxed">
                      <span className="font-bold">Online:</span> {s.online}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Important notes */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Önemli Uyarılar</h2>
          <div className="space-y-3">
            {IMPORTANT_NOTES.map((note, i) => (
              <div key={i} className="flex items-start gap-3 bg-white rounded-xl border border-amber-100 p-4 shadow-sm">
                <AlertTriangle size={14} className="text-amber-500 shrink-0 mt-0.5" />
                <p className="text-xs text-gray-600 leading-relaxed">{note}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Related tools */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Araçlar ve Rehberler</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/emlak-vergisi', label: 'Emlak Vergisi Hesaplayıcı' },
              { href: '/imar-durumu', label: 'İmar Durumu Rehberi' },
              { href: '/tapu-devir-sureci', label: 'Tapu Devir Süreci' },
              { href: '/kentsel-donusum', label: 'Kentsel Dönüşüm Rehberi' },
              { href: '/tapu-masrafi', label: 'Tapu Masrafı Hesaplayıcı' },
              { href: '/dask-hesaplayici', label: 'DASK Prim Hesaplayıcı' },
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
