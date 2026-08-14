import { Metadata } from 'next';
import Link from 'next/link';
import {
  Home, ArrowLeft, ArrowRight, CheckCircle2, AlertCircle, TrendingUp,
  FileText, Camera, Users, DollarSign, Clock, Shield, Star, Lightbulb,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Satıcı Rehberi: Evinizi Nasıl Satarsınız? | Söylemesi Bizden',
  description:
    'Türkiye\'de gayrimenkul satış süreci: fiyatlama, ilan hazırlama, pazarlık, tapu işlemleri ve vergi yükümlülükleri. Adım adım satıcı rehberi.',
};

const STEPS = [
  {
    num: 1,
    icon: DollarSign,
    title: 'Doğru Fiyat Belirleyin',
    color: 'text-[#00C49F]',
    bg: 'bg-[#F0FDF8]',
    border: 'border-[#00C49F]/20',
    content: `Yanlış fiyatlandırma, satış sürecini ya gereksiz uzatır ya da maddi kayba yol açar. Piyasa değerini gerçekçi biçimde belirlemek kritiktir.`,
    items: [
      'Aynı bölgede son 3-6 ayda satılan benzer mülkleri inceleyin',
      'Belediye rayiç bedeli, piyasa fiyatını tam yansıtmaz; sadece referans alın',
      'Değerleme uzmanından (SPK lisanslı) resmi ekspertiz raporu alın',
      'Satış fiyatını %5-8 daha yüksek koyun; pazarlık payı bırakın',
      'Piyasa trendini değerlendirin: yükselen piyasada sakin beklemek avantaj sağlar',
    ],
    tip: 'Bölge Karşılaştırma aracımızla ₺/m² verilerini inceleyin.',
    tipHref: '/mahalle-analizi',
  },
  {
    num: 2,
    icon: Home,
    title: 'Mülkü Satışa Hazırlayın',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    content: `İyi hazırlanmış bir mülk, daha hızlı ve daha yüksek fiyata satılır. "Home staging" (evin satışa hazırlanması) değeri %5-15 artırabilir.`,
    items: [
      'Küçük onarımları yapın: akan musluk, çatlak duvar, kırık fayans',
      'Ev sahibinin kişisel eşyalarını azaltın; alıcının kendini ev sahibi gibi hissetmesi gerekir',
      'Temizlik ve boya: en yüksek ROI sağlayan iyileştirmeler bunlardır',
      'Fotoğraf çekimi için doğal ışık saatlerini tercih edin (genelde 10:00-14:00)',
      'Kötü kokular (sigara, nem, evcil hayvan) satışı engelleyen en kritik faktördür',
    ],
    tip: 'Profesyonel fotoğraf çekimi, ilan görüntülenme sayısını 3 katına çıkarır.',
  },
  {
    num: 3,
    icon: Camera,
    title: 'Etkili İlan Hazırlayın',
    color: 'text-violet-600',
    bg: 'bg-violet-50',
    border: 'border-violet-200',
    content: `İlanınız potansiyel alıcıların ilk karşılaştığı yerdir. İlk 3 fotoğraf ve ilk 2 satır belirleyicidir.`,
    items: [
      'En az 8-12 yüksek çözünürlüklü fotoğraf ekleyin (salon, mutfak, yatak odaları, banyo, balkon, dış cephe)',
      'Başlıkta konum + özellik + avantaj üçlemesini kullanın ("Kadıköy\'de Metro Yakını, 3+1 Deniz Manzaralı")',
      'Alan (m²), kat, bina yaşı, iskan bilgisini mutlaka yazın',
      'DASK, aidat, yakıt türü gibi maliyetleri belirtin',
      'Video turu veya 3D sanal tur eklemek görüntülenmeyi %40 artırır',
    ],
    tip: 'İlanınızı birden fazla platformda yayınlayın; Söylemesi Bizden\'de ilan girmek ücretsizdir.',
    tipHref: '/create-listing',
  },
  {
    num: 4,
    icon: Users,
    title: 'Alıcılarla Görüşmeler Yönetin',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    content: `Görüşme süreci, satışın en kritik halkasıdır. Hazırlıklı ve esnek olmak fark yaratır.`,
    items: [
      'Ev gösterimlerinde mülkten uzak durun; alıcıların rahat gezmesine izin verin',
      'Tüm soruları dürüstçe yanıtlayın; gizlenen kusurlar hukuki sorun çıkarabilir',
      'Birden fazla alıcıyla eş zamanlı görüşün; rekabet ortamı fiyatı yükseltir',
      'Teklifler için son yanıt tarihi belirleyin (genelde 48-72 saat)',
      'Sadece fiyata değil, ödeme planı ve tapu tarihine de dikkat edin',
    ],
    tip: 'Emlak danışmanı kullanıyorsanız, tüm görüşmeleri danışman üzerinden yürütün.',
  },
  {
    num: 5,
    icon: TrendingUp,
    title: 'Pazarlık ve Teklif Değerlendirme',
    color: 'text-orange-600',
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    content: `İyi bir pazarlık, her iki tarafın da razı olduğu ve ilerlemeyi mümkün kılan bir uzlaşma sürecidir.`,
    items: [
      'İlk teklife hemen "evet" ya da "hayır" demeyin; karşı teklif yapın',
      'Minimum kabul edeceğiniz fiyatı önceden belirleyin ve buna sadık kalın',
      'Teklif eden alıcının finansman durumunu öğrenin (nakit mi, kredi mi?)',
      'Banka onaylı alıcılar, nakit alıcılar kadar güvenilirdir; tapu tarihi önemlidir',
      'Küçük tavizler verin: beyaz eşya, depo, otopark dahil etmek anlaşmayı kolaylaştırır',
    ],
  },
  {
    num: 6,
    icon: FileText,
    title: 'Hukuki Süreç ve Sözleşme',
    color: 'text-rose-600',
    bg: 'bg-rose-50',
    border: 'border-rose-200',
    content: `Satış öncesinde mutlaka noter ve tapu süreçlerini doğru yönetin; sözleşme hataları ağır yaptırımlara yol açabilir.`,
    items: [
      'Gayrimenkul satış vaadi sözleşmesi noterden yapılır; tapu devri yerini tutmaz',
      'Tapu devri için DASK poliçesinin aktif olması zorunludur',
      'Beyan edilmeyen ayıplar (gizli kusur), satıcıyı hukuki sorumlu kılar',
      'Yabancı alıcılar için döviz alım belgesi (DAB) ve tapu izni gerekebilir',
      'Kentsel dönüşüm kapsamındaki yapılarda ek belgeler gerekir',
    ],
    tip: 'Tapu harcı ve alım maliyetlerini önceden hesaplayın.',
    tipHref: '/tapu-masrafi',
  },
  {
    num: 7,
    icon: Shield,
    title: 'Vergi ve Maliyetler',
    color: 'text-slate-600',
    bg: 'bg-slate-50',
    border: 'border-slate-200',
    content: `Gayrimenkul satışında karşılaşabileceğiniz vergi ve giderleri önceden hesaplayın; sürpriz maliyetler bütçeyi etkileyebilir.`,
    items: [
      'Tapu harcı: satış bedelinin %2\'si satıcı tarafından ödenir',
      'Değer artış kazancı vergisi: 5 yıldan kısa sürede satışta, alım-satım farkı üzerinden gelir vergisi uygulanır',
      'Beş yılı dolduran mülklerde değer artış kazancı gelir vergisinden muaftır',
      'Döner sermaye ve TKGM ücreti satıcıya aittir (≈ ₺1.500-2.000)',
      'Emlakçı komisyonu genelde %2 + KDV (%20) her iki taraftan alınır',
    ],
  },
];

const CHECKLIST = [
  'Tapu senedi (arsa payı dahil)',
  'DASK poliçesi (güncel ve aktif)',
  'İskan belgesi (yapı kullanma izin belgesi)',
  'Enerji kimlik belgesi (EKB)',
  'Aidat borcu yoktur yazısı (apartman yönetiminden)',
  'Emlak vergi borcu yoktur belgesi (belediyeden)',
  'SGK borcu yoktur belgesi (kat malikleri için geçerli)',
  'Vekaletname (yetkili temsilci varsa)',
];

const MISTAKES = [
  { title: 'Aşırı yüksek fiyat', desc: 'Satışı aylarca uzatır; alıcılar fiyat düşürülmüş ilanı "sorunlu" görür.' },
  { title: 'Az fotoğraf', desc: 'Az ya da kalitesiz fotoğraflar, alıcının görmeden geçmesine neden olur.' },
  { title: 'Gizli ayıplar', desc: 'Nem, çatlak, sızıntı bildirilmezse hukuki sorumluluk doğar.' },
  { title: 'Tapu masraflarını ihmal etmek', desc: 'Harç ve vergiler hesaba katılmadan "net satış fiyatı" belirlenmez.' },
  { title: 'Tek kanalla satış', desc: 'Yalnızca bir platformda ilan açmak potansiyel alıcı havuzunu daraltır.' },
];

export default function SaticiRehberiPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-800 to-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <div className="flex items-center gap-2 mb-4">
            <Link href="/rehber" className="text-slate-400 text-xs hover:text-white transition-colors flex items-center gap-1">
              <ArrowLeft size={12} /> Rehber Merkezi
            </Link>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
              <Home size={22} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tight">Satıcı Rehberi</h1>
              <p className="text-slate-400 text-sm mt-0.5">7 adım · 15 dk okuma</p>
            </div>
          </div>
          <p className="text-slate-300 text-sm max-w-xl leading-relaxed">
            Türkiye&apos;de gayrimenkul satmak için bilmeniz gereken her şey. Fiyatlamadan tapu devrine,
            pazarlıktan vergi yükümlülüklerine kadar eksiksiz rehber.
          </p>

          {/* Quick stats */}
          <div className="grid grid-cols-3 gap-4 mt-8">
            {[
              { label: 'Ortalama Satış Süresi', value: '45-90 gün', sub: 'aktif pazarlama ile' },
              { label: 'Tapu Harcı (Satıcı)', value: '%2', sub: 'satış bedeli üzerinden' },
              { label: 'Değer Artış Vergisi', value: '5+ Yıl', sub: 'muafiyet süresi' },
            ].map(s => (
              <div key={s.label} className="bg-white/5 rounded-xl p-3 border border-white/10">
                <p className="text-xs text-slate-400 mb-1">{s.label}</p>
                <p className="text-xl font-black text-white">{s.value}</p>
                <p className="text-[10px] text-slate-500 mt-0.5">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-10 space-y-6">

        {/* Steps */}
        {STEPS.map(step => (
          <div
            key={step.num}
            className={`bg-white rounded-2xl border ${step.border} p-6`}
          >
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-2xl ${step.bg} flex items-center justify-center shrink-0`}>
                <step.icon size={22} className={step.color} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold text-gray-400">ADIM {step.num}</span>
                </div>
                <h2 className="text-base font-black text-gray-900 mb-2">{step.title}</h2>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">{step.content}</p>
                <ul className="space-y-2">
                  {step.items.map(item => (
                    <li key={item} className="flex items-start gap-2 text-xs text-gray-600">
                      <CheckCircle2 size={13} className={`${step.color} shrink-0 mt-0.5`} />
                      {item}
                    </li>
                  ))}
                </ul>
                {step.tip && (
                  <div className="mt-4 flex items-start gap-2 bg-[#F0FDF8] border border-[#00C49F]/20 rounded-xl p-3">
                    <Lightbulb size={13} className="text-[#00C49F] shrink-0 mt-0.5" />
                    <p className="text-xs text-[#00C49F] font-medium">
                      {step.tip}
                      {step.tipHref && (
                        <>
                          {' '}
                          <Link href={step.tipHref} className="underline hover:no-underline">
                            Dene
                          </Link>
                        </>
                      )}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Document checklist */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <FileText size={15} className="text-[#00C49F]" /> Tapu İçin Gerekli Belgeler
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {CHECKLIST.map(doc => (
              <div key={doc} className="flex items-center gap-2 text-xs text-gray-700 py-1.5 border-b border-gray-50 last:border-0">
                <div className="w-4 h-4 rounded border-2 border-[#00C49F]/40 flex items-center justify-center shrink-0">
                  <div className="w-2 h-2 rounded-sm bg-[#00C49F]/30" />
                </div>
                {doc}
              </div>
            ))}
          </div>
          <p className="text-[10px] text-gray-400 mt-4">* Tapu Müdürlüğü şartlar güncellediğinde listeyi doğrulayın.</p>
        </div>

        {/* Common mistakes */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <AlertCircle size={15} className="text-rose-500" /> Sık Yapılan Hatalar
          </h2>
          <div className="space-y-3">
            {MISTAKES.map((m, i) => (
              <div key={m.title} className="flex items-start gap-3 p-3 bg-rose-50 rounded-xl border border-rose-100">
                <span className="w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <div>
                  <p className="text-xs font-bold text-rose-700">{m.title}</p>
                  <p className="text-xs text-rose-600 mt-0.5">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Rating tips */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
          <h2 className="text-sm font-black text-amber-900 mb-3 flex items-center gap-2">
            <Star size={14} className="text-amber-500" /> Uzman İpuçları
          </h2>
          <div className="space-y-2 text-xs text-amber-800">
            {[
              'Kış aylarında (Ocak-Şubat) ilanlar azalır; alıcı rekabeti düşer — fiyat tavizine hazır olun.',
              'Bahar (Mart-Mayıs) piyasanın en hareketli dönemidir; yüksek fiyatla çıkın.',
              'Satış sözleşmesinde "tapu devir tarihi" mutlaka yazılsın; belirsiz "en kısa sürede" ifadesinden kaçının.',
              'Birden fazla emlakçıyla çalışıyorsanız "açık yetki" yerine "münhasır yetki" tercih edin; motivasyon artar.',
              'Online değerleme araçları yol gösterici olabilir ama resmi ekspertizin yerine geçmez.',
            ].map(tip => (
              <div key={tip} className="flex gap-2">
                <CheckCircle2 size={12} className="text-amber-500 shrink-0 mt-0.5" />
                <p>{tip}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { href: '/tapu-masrafi', label: 'Tapu Masrafı Hesapla', desc: 'Toplam satış maliyetini öğren', icon: FileText },
            { href: '/valuation', label: 'Değerleme Aracı', desc: 'Mülkünüzün değerini tahmin edin', icon: TrendingUp },
            { href: '/create-listing', label: 'İlan Ver', desc: 'Ücretsiz ilan oluştur', icon: Home },
          ].map(t => (
            <Link
              key={t.href}
              href={t.href}
              className="group bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md hover:border-[#00C49F]/30 transition-all flex items-center gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-[#F0FDF8] flex items-center justify-center shrink-0">
                <t.icon size={18} className="text-[#00C49F]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-800 group-hover:text-[#00C49F] transition-colors">{t.label}</p>
                <p className="text-xs text-gray-400">{t.desc}</p>
              </div>
              <ArrowRight size={14} className="text-gray-300 group-hover:text-[#00C49F] transition-colors shrink-0" />
            </Link>
          ))}
        </div>

        {/* Other guides */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h3 className="text-sm font-bold text-gray-900 mb-4">Diğer Rehberler</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { href: '/rehber/ev-satin-alma', label: 'Ev Satın Alma', sub: '8 dk okuma' },
              { href: '/rehber/kiralama-rehberi', label: 'Kiralama Rehberi', sub: '6 dk okuma' },
              { href: '/rehber/yatirim-rehberi', label: 'Yatırım Rehberi', sub: '10 dk okuma' },
            ].map(g => (
              <Link
                key={g.href}
                href={g.href}
                className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-[#F0FDF8] border border-transparent hover:border-[#00C49F]/20 transition-all group"
              >
                <div>
                  <p className="text-xs font-bold text-gray-800 group-hover:text-[#00C49F] transition-colors">{g.label}</p>
                  <p className="text-[10px] text-gray-400">{g.sub}</p>
                </div>
                <ArrowRight size={13} className="text-gray-300 group-hover:text-[#00C49F] transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
