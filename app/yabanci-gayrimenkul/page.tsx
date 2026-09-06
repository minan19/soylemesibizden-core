import { Metadata } from 'next';
import Link from 'next/link';
import {
  Globe, FileText, Shield, Home, TrendingUp, AlertTriangle,
  CheckCircle, Info, ArrowRight, Star, Key, CreditCard,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Yabancıların Türkiye\'de Gayrimenkul Alması | Tam Rehber | Söylemesi Bizden',
  description:
    'Yabancı uyrukluların Türkiye\'de mülk satın alma rehberi: gerekli belgeler, DAB zorunluluğu, askerlik izni, Türk vatandaşlığı yatırım yolu ve vergi yükümlülükleri.',
};

const ALLOWED_COUNTRIES = [
  'ABD', 'Almanya', 'İngiltere', 'Fransa', 'Hollanda', 'Belçika',
  'İsviçre', 'Avustralya', 'Kanada', 'Japonya', 'Güney Kore',
  'Suudi Arabistan', 'BAE', 'Katar', 'Rusya', 'Ukrayna',
  'İran (kısıtlı)', 'Irak (kısıtlı)', 'Azerbaycan', 'Özbekistan',
];

const RESTRICTED_NOTE = 'Suriye, Ermenistan, Küba, Kuzey Kore ve bazı ülke vatandaşları tapu alamaz. Askeri yasak bölgelerde yabancılara satış kısıtlıdır.';

const REQUIRED_DOCS = [
  { icon: '🛂', label: 'Pasaport (noter onaylı Türkçe tercümesi)', required: true },
  { icon: '🔢', label: 'Türk Vergi Kimlik Numarası (ücretsiz alınır)', required: true },
  { icon: '🏦', label: 'Türk bankasında TL hesabı', required: true },
  { icon: '💱', label: 'DAB (Döviz Alım Belgesi)', required: true },
  { icon: '📋', label: 'Zorunlu deprem sigortası (DASK)', required: true },
  { icon: '🏠', label: 'Tapu harcı dekontu', required: true },
  { icon: '📷', label: 'Biyometrik fotoğraf (6 adet)', required: true },
  { icon: '👤', label: 'Yeminli tercüman (anlaşmazlık durumunda)', required: false },
];

const PROCESS_STEPS = [
  {
    step: 1,
    title: 'Vergi Kimlik Numarası Al',
    desc: 'Herhangi bir Türk vergi dairesine pasaportunuzla başvurun. Aynı gün 10 haneli numara verilir. Ücretsizdir.',
    color: 'bg-[#00C49F]/10 border-[#00C49F]/30',
    iconColor: 'text-[#00C49F]',
    duration: '1 gün',
  },
  {
    step: 2,
    title: 'Türk Bankasında Hesap Aç',
    desc: 'Pasaport ve vergi numarasıyla Türk bankasında hesap açın. İş Bankası, Garanti ve Yapı Kredi yabancılara kolaylık sağlar.',
    color: 'bg-blue-50 border-blue-200',
    iconColor: 'text-blue-600',
    duration: '1-2 gün',
  },
  {
    step: 3,
    title: 'DAB (Döviz Alım Belgesi)',
    desc: 'Yurt dışından transfer ettiğiniz dövizi Türk lirasına çevirin. Banka size DAB düzenler. Tapu işlemi için zorunludur.',
    color: 'bg-amber-50 border-amber-200',
    iconColor: 'text-amber-600',
    duration: '1 gün',
    note: '2023\'den itibaren zorunlu: satış bedelinin tamamı DAB ile belgelenmeli.',
  },
  {
    step: 4,
    title: 'Tapu Randevusu',
    desc: 'ALO 181 veya e-randevu.tkgm.gov.tr üzerinden Tapu Müdürlüğü randevusu alın. Yoğun dönemlerde 2-4 hafta önceden rezervasyon gerekebilir.',
    color: 'bg-violet-50 border-violet-200',
    iconColor: 'text-violet-600',
    duration: '1-4 hafta randevu bekleme',
  },
  {
    step: 5,
    title: 'Askerlik Bölgesi Kontrolü',
    desc: '2012 öncesi gerekli olan bireysel askerlik izni kaldırıldı. Ancak mülk; ordu, radar veya kıyı yasak bölgelerinde olmamalı. Tapu müdürlüğü koordinat kontrolü yapar.',
    color: 'bg-rose-50 border-rose-200',
    iconColor: 'text-rose-600',
    duration: '3-10 iş günü (otomatik sistem)',
  },
  {
    step: 6,
    title: 'Tapu Devri',
    desc: 'Tüm belgelerle tapu müdürlüğüne gelin. Alıcı ve satıcı veya vekilleri birlikte hazır olmalı. Tapu harcı (%4, her iki tarafça paylaşılır) peşin ödenir.',
    color: 'bg-green-50 border-green-200',
    iconColor: 'text-green-600',
    duration: 'Yarım gün',
  },
];

const CITIZENSHIP_FACTS = [
  { label: 'Minimum yatırım tutarı', value: '$400,000 USD' },
  { label: 'Mülk tutma süresi', value: '3 yıl (satılamaz)' },
  { label: 'Başvuru süreci', value: '3–6 ay' },
  { label: 'Aile kapsamı', value: 'Eş + 18 yaş altı çocuklar' },
  { label: 'Birden fazla mülk', value: 'Toplam değer $400,000+ olabilir' },
  { label: 'Gerekli belge', value: 'Değerleme raporu zorunlu' },
];

const RESIDENCE_PERMIT = [
  'Türkiye\'de herhangi bir değerde mülk sahibi yabancılar kısa dönem oturma izni alabilir.',
  'İlk başvuru: 1 yıl; yenilenebilir (mülk sahipliği devam ettiği sürece).',
  'Emekli yabancılar da aynı yolla oturma izni başvurusu yapabilir.',
  'Başvuru için: İl Göç İdaresi Müdürlüğü veya e-ikamet.goc.gov.tr',
  'Sağlık sigortası (SGK veya özel) zorunludur.',
];

const TAX_ITEMS = [
  {
    title: 'Tapu Harcı',
    rate: '%4',
    desc: 'Satış değeri üzerinden. Alıcı ve satıcı arasında %2 + %2 olarak paylaşılır.',
    color: 'text-[#00C49F]',
  },
  {
    title: 'Emlak Vergisi',
    rate: '%0.1 – %0.6',
    desc: 'Yıllık. Konut için %0.1–0.2; büyükşehirlerde 2 katı. Belediyeye ödenir.',
    color: 'text-blue-600',
  },
  {
    title: 'Kira Geliri Vergisi',
    rate: '%15 – %40',
    desc: 'Türkiye\'de elde edilen kira geliri, yıllık beyanname ile bildirilir. Dar mükellef olarak kira tevkifatı %20.',
    color: 'text-amber-600',
  },
  {
    title: 'Değer Artış Kazancı',
    rate: '%15 – %40',
    desc: '5 yıldan kısa sürede satışta kâr vergilendirilir. 5 yıl tutarsanız değer artış kazancı vergisinden muafsınız.',
    color: 'text-violet-600',
  },
  {
    title: 'KDV',
    rate: '%1 veya %20',
    desc: 'Müteahhitten ilk alım. 150 m² altı konutlarda %1; üstünde veya yeniden satışlarda %20. Yabancılara bazı muafiyetler var.',
    color: 'text-rose-600',
  },
];

const WARNINGS = [
  {
    icon: AlertTriangle,
    title: 'Değerleme Raporu Zorunlu',
    desc: 'Tüm yabancı alımlarda lisanslı SPK değerleme şirketi raporu zorunludur. Tapu müdürlüğü rayiç değerin altında satışa onay vermez.',
  },
  {
    icon: AlertTriangle,
    title: 'Kat İrtifakı ≠ Kat Mülkiyeti',
    desc: 'Kat irtifakı tapusu "yapım aşaması" belgesidir. Oturum ruhsatı alınmış, kat mülkiyetine dönüşmüş tapu tercih edin.',
  },
  {
    icon: AlertTriangle,
    title: 'İpotek Kontrolü',
    desc: 'Tapu sicilinde ipotek, haciz veya şerh varlığını mutlaka kontrol edin. E-tapu.gov.tr üzerinden sorgulayabilirsiniz.',
  },
  {
    icon: AlertTriangle,
    title: 'Yetkili Tapu Sorgulama',
    desc: 'Tapu yoklamak için yalnızca tkgm.gov.tr veya resmi tapu müdürlükleri kullanın. Üçüncü taraf platformlar yanıltıcı olabilir.',
  },
];

export default function YabanciGayrimenkulPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <Globe size={13} /> Yabancı Alıcı Rehberi
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4 leading-tight">
            Yabancıların Türkiye&apos;de<br />Gayrimenkul Alması
          </h1>
          <p className="text-gray-300 text-sm max-w-2xl leading-relaxed mb-8">
            Pasaportunuzla Türkiye&apos;de mülk alabilirsiniz. Bu rehberde gerekli belgeler, DAB zorunluluğu,
            vatandaşlık yatırım yolu ve vergi yükümlülüklerini adım adım açıklıyoruz.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-[#00C49F]">180+</p>
              <p className="text-xs text-gray-400">Alım Hakkı Olan Ülke</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">$400K</p>
              <p className="text-xs text-gray-400">Vatandaşlık Eşiği</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">%4</p>
              <p className="text-xs text-gray-400">Tapu Harcı</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-400">5 yıl</p>
              <p className="text-xs text-gray-400">Değer Artış Vergisi Muafiyeti</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* Which countries */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-2">Hangi Ülkeler Alım Yapabilir?</h2>
          <p className="text-sm text-gray-500 mb-4">
            Türkiye, karşılıklılık ilkesine göre 180+ ülke vatandaşına tapu hakkı tanımaktadır.
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {ALLOWED_COUNTRIES.map(c => (
              <span key={c} className="text-xs bg-[#F0FDF8] border border-[#00C49F]/20 text-[#00C49F] font-semibold px-3 py-1 rounded-full">
                {c}
              </span>
            ))}
          </div>
          <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
            <AlertTriangle size={16} className="text-amber-600 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-800 leading-relaxed">{RESTRICTED_NOTE}</p>
          </div>
        </section>

        {/* Required docs */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-2">Gerekli Belgeler</h2>
          <p className="text-sm text-gray-500 mb-5">
            Tapu devri günü yanınızda bulunması gereken belgeler:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {REQUIRED_DOCS.map(doc => (
              <div
                key={doc.label}
                className={`flex items-center gap-3 rounded-xl border p-4 ${doc.required ? 'bg-white border-gray-100' : 'bg-gray-50 border-dashed border-gray-200'}`}
              >
                <span className="text-xl">{doc.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-gray-800 leading-tight">{doc.label}</p>
                  {!doc.required && (
                    <p className="text-[10px] text-gray-400 mt-0.5">Duruma göre gerekebilir</p>
                  )}
                </div>
                {doc.required
                  ? <CheckCircle size={14} className="text-[#00C49F] shrink-0" />
                  : <Info size={14} className="text-gray-300 shrink-0" />
                }
              </div>
            ))}
          </div>
        </section>

        {/* Process */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-2">Adım Adım Tapu Alma Süreci</h2>
          <p className="text-sm text-gray-500 mb-6">Ortalama toplam süre: 2–6 hafta</p>
          <div className="space-y-4">
            {PROCESS_STEPS.map(s => (
              <div key={s.step} className={`rounded-2xl border p-5 ${s.color}`}>
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm">
                    <span className={`text-sm font-black ${s.iconColor}`}>{s.step}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-3 mb-1">
                      <h3 className="text-sm font-bold text-gray-900">{s.title}</h3>
                      <span className="text-[10px] bg-white/70 text-gray-500 px-2 py-0.5 rounded-full border border-white shrink-0">
                        {s.duration}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">{s.desc}</p>
                    {s.note && (
                      <div className="mt-2 flex items-start gap-1.5">
                        <Info size={11} className="text-amber-500 shrink-0 mt-0.5" />
                        <p className="text-[10px] text-amber-700 font-semibold">{s.note}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* DAB detail */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#F0FDF8] flex items-center justify-center">
              <CreditCard size={20} className="text-[#00C49F]" />
            </div>
            <div>
              <h2 className="text-base font-black text-gray-900">DAB (Döviz Alım Belgesi) Nedir?</h2>
              <p className="text-xs text-gray-500">2023'ten itibaren zorunlu</p>
            </div>
          </div>
          <div className="space-y-3 text-sm text-gray-600 leading-relaxed">
            <p>
              Yurt dışından gönderilen dövizin Türkiye&apos;de TL&apos;ye çevrildiğini belgeleyen resmi belgedir.
              Merkez Bankası direktifi gereği, yabancı alıcıların satış bedelinin <strong>tamamını</strong> DAB ile belgelemesi zorunludur.
            </p>
            <p>
              DAB olmadan tapu müdürlüğü işlem yapmaz. Dövizi Türk bankasına transfer ettirip TL&apos;ye
              çevirdiğinizde banka otomatik olarak DAB düzenler.
            </p>
            <div className="bg-[#F0FDF8] rounded-xl p-4 border border-[#00C49F]/20">
              <p className="text-xs font-bold text-[#00C49F] mb-1">Pratik Not</p>
              <p className="text-xs text-gray-600">
                Satış bedelinin bir kısmı farklı zaman dilimlerinde gönderildiyse, her transfer için ayrı DAB alınmalı
                ve toplam tutarın ilan edilen satış bedeline eşit olduğu belgelenmelidir.
              </p>
            </div>
          </div>
        </section>

        {/* Turkish citizenship */}
        <section>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
              <Star size={20} className="text-amber-600" />
            </div>
            <div>
              <h2 className="text-xl font-black text-gray-900">Gayrimenkul Yoluyla Türk Vatandaşlığı</h2>
              <p className="text-sm text-gray-500">Yatırım Yoluyla Vatandaşlık Programı</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
            {CITIZENSHIP_FACTS.map(f => (
              <div key={f.label} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                <p className="text-[10px] text-gray-400 mb-1">{f.label}</p>
                <p className="text-sm font-black text-gray-900">{f.value}</p>
              </div>
            ))}
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
            <h3 className="text-sm font-bold text-amber-800 mb-3">Başvuru Süreci</h3>
            <ol className="space-y-2">
              {[
                'SPK lisanslı bir değerleme şirketinden $400,000+ değerleme raporu alın',
                'Tapu devri yapın ve 3 yıl şerh düşürün (satış yasağı)',
                'İl Göç İdaresi\'ne vatandaşlık başvurusu yapın',
                'Güvenlik soruşturması ve Nüfus Müdürlüğü işlemleri (3–6 ay)',
                'Türk pasaportu ve kimlik kartı alın',
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-600 text-white text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-xs text-amber-800 leading-relaxed">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Residence permit */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
              <Key size={20} className="text-blue-600" />
            </div>
            <div>
              <h2 className="text-base font-black text-gray-900">Oturma İzni (İkamet İzni)</h2>
              <p className="text-xs text-gray-500">Vatandaşlık gerektirmez</p>
            </div>
          </div>
          <ul className="space-y-2">
            {RESIDENCE_PERMIT.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle size={14} className="text-blue-500 shrink-0 mt-0.5" />
                <p className="text-xs text-gray-600 leading-relaxed">{item}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Tax */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-2">Vergi Yükümlülükleri</h2>
          <p className="text-sm text-gray-500 mb-5">
            Yabancı alıcılar da Türk gayrimenkul vergilerine tabidir.
          </p>
          <div className="space-y-3">
            {TAX_ITEMS.map(t => (
              <div key={t.title} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm flex items-start gap-4">
                <div className="shrink-0 text-right">
                  <p className={`text-lg font-black ${t.color}`}>{t.rate}</p>
                </div>
                <div className="w-px bg-gray-100 self-stretch" />
                <div>
                  <p className="text-sm font-bold text-gray-900 mb-1">{t.title}</p>
                  <p className="text-xs text-gray-500 leading-relaxed">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 bg-[#F0FDF8] border border-[#00C49F]/20 rounded-xl p-4">
            <p className="text-xs text-[#00C49F] font-bold mb-1">Dar Mükellef Beyannamesi</p>
            <p className="text-xs text-gray-600 leading-relaxed">
              Türkiye&apos;de yerleşik olmayan yabancılar &quot;dar mükellef&quot;tir. Kira geliri için yıllık beyanname
              verilir; kira tevkifatı %20 olarak kaynakta kesilir. Beyanname verirseniz fazla kesintiyi iade alabilirsiniz.
            </p>
          </div>
        </section>

        {/* Warnings */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-5">Dikkat Edilmesi Gerekenler</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {WARNINGS.map(w => (
              <div key={w.title} className="bg-white rounded-xl border border-rose-100 p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <w.icon size={15} className="text-rose-500" />
                  <h3 className="text-sm font-bold text-gray-900">{w.title}</h3>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              href="/listings"
              className="group bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-all flex flex-col gap-3"
            >
              <Home size={22} className="text-[#00C49F]" />
              <div>
                <p className="text-sm font-bold text-gray-900 mb-1">İlanları Gör</p>
                <p className="text-xs text-gray-500">Türkiye geneli satılık ilanlar</p>
              </div>
              <ArrowRight size={14} className="text-gray-300 group-hover:text-gray-600 transition-colors mt-auto" />
            </Link>
            <Link
              href="/tapu-masrafi"
              className="group bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-all flex flex-col gap-3"
            >
              <FileText size={22} className="text-blue-600" />
              <div>
                <p className="text-sm font-bold text-gray-900 mb-1">Tapu Masrafı Hesapla</p>
                <p className="text-xs text-gray-500">Toplam alım maliyetini öğren</p>
              </div>
              <ArrowRight size={14} className="text-gray-300 group-hover:text-gray-600 transition-colors mt-auto" />
            </Link>
            <Link
              href="/concierge"
              className="group bg-gradient-to-br from-[#00C49F] to-[#00a882] rounded-2xl p-5 hover:shadow-md transition-all flex flex-col gap-3"
            >
              <Shield size={22} className="text-white" />
              <div>
                <p className="text-sm font-bold text-white mb-1">Danışman Talebi</p>
                <p className="text-xs text-white/70">Yabancı alıcı uzmanı</p>
              </div>
              <ArrowRight size={14} className="text-white/60 group-hover:text-white transition-colors mt-auto" />
            </Link>
          </div>
        </section>

        {/* Related guides */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp size={15} className="text-[#00C49F]" /> İlgili Rehberler
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/rehber/ev-satin-alma', label: 'Ev Satın Alma Rehberi' },
              { href: '/tapu-masrafi', label: 'Tapu Masrafı Hesaplayıcı' },
              { href: '/dask-hesaplayici', label: 'DASK Prim Hesaplayıcı' },
              { href: '/emlak-vergisi', label: 'Emlak Vergisi Hesaplayıcı' },
              { href: '/kira-geliri-vergisi', label: 'Kira Geliri Vergisi' },
              { href: '/yatirim-analizi', label: 'Yatırım ROI Analizi' },
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
