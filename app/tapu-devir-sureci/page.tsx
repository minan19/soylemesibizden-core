import { Metadata } from 'next';
import Link from 'next/link';
import {
  FileText, CheckCircle, AlertTriangle, ArrowRight,
  Home, CreditCard, Users, Shield,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Tapu Devir Süreci | Adım Adım Rehber | Söylemesi Bizden',
  description:
    'Gayrimenkul tapu devri nasıl yapılır? Gerekli belgeler, tapu harcı, randevu alma, ipotek sorgulama ve kat mülkiyeti kontrolü dahil eksiksiz tapu işlemleri rehberi.',
};

const PROCESS_STEPS = [
  {
    step: 1,
    title: 'Tapu Sorgulama ve Durum Kontrolü',
    desc: 'e-tapu.gov.tr veya TKGM mobil uygulaması üzerinden mülkün tapu kaydını sorgulayın. İpotek, haciz, şerh veya kısıtlama olmadığını doğrulayın.',
    docs: [],
    warning: 'Satıcının rızası olmadan da tapu durumu sorgulanabilir — bu bir kamu hizmetidir.',
    color: 'bg-[#F0FDF8] border-[#00C49F]/20',
    iconColor: 'text-[#00C49F]',
    duration: '5 dakika',
  },
  {
    step: 2,
    title: 'Kat Mülkiyeti ve İskan Kontrolü',
    desc: 'Tapunun "kat irtifakı" mı yoksa "kat mülkiyeti" mi olduğunu kontrol edin. Kat mülkiyeti tapusu iskan (oturum izni) alındığını gösterir ve daha güvenlidir.',
    docs: [],
    warning: 'Kat irtifakı tapusu yapım aşamasında alınan belgedir. İskanlı mülk tercih edin.',
    color: 'bg-blue-50 border-blue-200',
    iconColor: 'text-blue-600',
    duration: 'Aynı gün',
  },
  {
    step: 3,
    title: 'Satış Anlaşması ve Senet',
    desc: 'Alıcı ve satıcı arasında ön sözleşme veya satış vaadi sözleşmesi yapabilir (noter onaylı). Bu sözleşme satıcıyı bağlar; tapu devrine kadar güvence sağlar.',
    docs: ['Taslak satış vaadi sözleşmesi', 'Kapora makbuzu (varsa)'],
    warning: 'İmzalı adi yazılı sözleşmeler tapu dairesi tarafından tanınmaz; noter onaylı olmalı.',
    color: 'bg-amber-50 border-amber-200',
    iconColor: 'text-amber-600',
    duration: '1-3 gün',
  },
  {
    step: 4,
    title: 'Değerleme Raporu',
    desc: 'Tapu Müdürlüğü, tüm işlemler için SPK lisanslı değerleme şirketinden değerleme raporu ister. Yabancı alımlarda zorunlu; yerli alımlarda isteğe bağlıydı ancak uygulamada çoğunlukla talep edilir.',
    docs: ['SPK lisanslı değerleme şirketi listesi için SPK resmi sitesi'],
    warning: 'Değerleme raporunun süresi 3 aydır. Tarihi geçmiş rapor kabul edilmez.',
    color: 'bg-violet-50 border-violet-200',
    iconColor: 'text-violet-600',
    duration: '2-5 iş günü',
  },
  {
    step: 5,
    title: 'Tapu Harcını Hesapla ve Hazırla',
    desc: 'Satış bedeli üzerinden %4 tapu harcı ödenir. Satıcı ve alıcı eşit (her biri %2) paylaşır — ancak bu sözleşmeyle değiştirilebilir. Döner sermaye harcı ayrıca ödenir.',
    docs: ['Tapu harcı dekontu (Gelir İdaresi veya PTT)'],
    warning: 'Tapu harcı beyan edilen satış bedelinden değil, değerleme raporundaki değerin yüksek olanından hesaplanır.',
    color: 'bg-rose-50 border-rose-200',
    iconColor: 'text-rose-600',
    duration: 'Randevu günü',
  },
  {
    step: 6,
    title: 'Tapu Randevusu Al',
    desc: 'ALO 181 hattı veya e-randevu.tkgm.gov.tr üzerinden tapu müdürlüğüne randevu alın. Yoğun dönemlerde 2-4 hafta bekleme olabilir. Randevu saatinden önce tüm belgelerinizi hazır edin.',
    docs: [],
    warning: 'Randevu saatine 15-20 dakika erken gidin. Eksik belge durumunda işlem iptal edilebilir.',
    color: 'bg-green-50 border-green-200',
    iconColor: 'text-green-600',
    duration: '1-4 hafta bekleme',
  },
  {
    step: 7,
    title: 'Tapu Müdürlüğünde Devir',
    desc: 'Alıcı ve satıcı (veya yetkili vekilleri) birlikte tapu müdürlüğünde hazır olur. Memur tapu kaydını inceler, belgeler kontrol edilir, taraflar imzalar ve tapu yeni sahibine tescil edilir.',
    docs: [
      'Nüfus cüzdanı / pasaport (her iki taraf)',
      'Tapu harcı ödeme makbuzu',
      'Değerleme raporu',
      'DASK poliçesi (yeni mülk için)',
      'Vekaletname (vekil üzerinden işlem yapılacaksa)',
    ],
    warning: '',
    color: 'bg-[#F0FDF8] border-[#00C49F]/30',
    iconColor: 'text-[#00C49F]',
    duration: '1-2 saat',
  },
];

const DOCS = [
  { doc: 'Nüfus cüzdanı veya pasaport', who: 'Her iki taraf' },
  { doc: 'Tapu harcı ve döner sermaye dekontu', who: 'Alıcı (genellikle)' },
  { doc: 'SPK değerleme raporu', who: 'Satıcı veya alıcı hazırlatır' },
  { doc: 'DASK (Zorunlu Deprem Sigortası) poliçesi', who: 'Alıcı' },
  { doc: 'Vekaletname (noter onaylı)', who: 'Vekil atanmışsa' },
  { doc: 'Satış bedeli banka transferi dekontu', who: 'Alıcı' },
  { doc: 'Yabancılar için DAB belgesi', who: 'Yabancı alıcı' },
  { doc: 'Şirket adına alımlarda imza sirküleri', who: 'Kurumsal alıcı' },
];

const COSTS = [
  { item: 'Tapu Harcı (alıcı payı)', rate: '%2', calc: '₺3.000.000 mülk → ₺60.000' },
  { item: 'Tapu Harcı (satıcı payı)', rate: '%2', calc: 'Genellikle alıcıya yüklenir' },
  { item: 'Döner Sermaye Harcı', rate: 'Sabit', calc: '~₺2.000–₺4.000 (yıla göre değişir)' },
  { item: 'SPK Değerleme Raporu', rate: 'Sabit', calc: '₺3.000–₺8.000 (bölge ve m²\'ye göre)' },
  { item: 'DASK Poliçesi', rate: 'Prim', calc: '₺500–₺3.000 (mülk ve risk bölgesine göre)' },
  { item: 'Çevre Temizlik Vergisi (borç varsa)', rate: 'Belediyeye göre', calc: 'Tapu devri öncesi ödenmeli' },
];

const WARNINGS = [
  'Satıcının belediye vergi borcu varsa tapu devri yapılmaz — satıcıdan ödeme alındıktan sonra devam edin.',
  'İpotek şerhli mülkte banka onayı gerekir; önce ipotek fekki (kaldırılması) yapılmalıdır.',
  'Tapu devri sırasında satıcı hayatta olmalıdır — aksi hâlde veraset yoluyla işlem yapılır.',
  'Aynı gün birden fazla tapu devri yapılıyorsa (zincir işlem) tapu müdürlüğüyle önceden koordine edin.',
  'Tapuda gösterilen satış bedeli gerçek olmayan bedelse (düşük gösterme) vergi incelemesine konu olabilir.',
];

export default function TapuDevirSureciPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <Home size={13} /> Tapu Rehberi
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Tapu Devir Süreci
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            Sorgulama ve kontrolden devir tescil işlemine kadar gayrimenkul alım-satımındaki
            tapu sürecinin 7 adımı, gerekli belgeler ve maliyet dökümü.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-[#00C49F]">7</p>
              <p className="text-xs text-gray-400">İşlem adımı</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">%4</p>
              <p className="text-xs text-gray-400">Toplam tapu harcı</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-400">1-2 saat</p>
              <p className="text-xs text-gray-400">Devir işlemi</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* Steps */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-6">Adım Adım Tapu Devir Süreci</h2>
          <div className="space-y-4">
            {PROCESS_STEPS.map(s => (
              <div key={s.step} className={`rounded-2xl border p-5 ${s.color}`}>
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm">
                    <span className={`text-sm font-black ${s.iconColor}`}>{s.step}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <h3 className="text-sm font-black text-gray-900">{s.title}</h3>
                      <span className="text-[10px] bg-white/70 text-gray-500 px-2 py-0.5 rounded-full border shrink-0">
                        {s.duration}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed mb-2">{s.desc}</p>
                    {s.docs.length > 0 && (
                      <div className="space-y-1 mb-2">
                        {s.docs.map(d => (
                          <div key={d} className="flex items-center gap-2">
                            <CheckCircle size={11} className="text-[#00C49F] shrink-0" />
                            <p className="text-[10px] text-gray-600">{d}</p>
                          </div>
                        ))}
                      </div>
                    )}
                    {s.warning && (
                      <div className="flex items-start gap-1.5 mt-2">
                        <AlertTriangle size={11} className="text-amber-500 shrink-0 mt-0.5" />
                        <p className="text-[10px] text-amber-700">{s.warning}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Required docs */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#F0FDF8] flex items-center justify-center">
              <FileText size={20} className="text-[#00C49F]" />
            </div>
            <h2 className="text-lg font-black text-gray-900">Gerekli Belgeler</h2>
          </div>
          <div className="space-y-2">
            {DOCS.map(d => (
              <div key={d.doc} className="flex items-center justify-between gap-4 py-2 border-b border-gray-50 last:border-0">
                <div className="flex items-center gap-2">
                  <CheckCircle size={13} className="text-[#00C49F] shrink-0" />
                  <span className="text-xs text-gray-700">{d.doc}</span>
                </div>
                <span className="text-[10px] text-gray-400 shrink-0">{d.who}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Costs */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-5">Tapu Devir Maliyetleri</h2>
          <div className="space-y-2">
            {COSTS.map(c => (
              <div key={c.item} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm flex items-center gap-4">
                <div className="w-16 text-right shrink-0">
                  <p className="text-sm font-black text-[#00C49F]">{c.rate}</p>
                </div>
                <div className="w-px bg-gray-100 self-stretch" />
                <div className="flex-1">
                  <p className="text-xs font-bold text-gray-900">{c.item}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{c.calc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Link href="/tapu-masrafi" className="flex items-center gap-2 bg-[#F0FDF8] border border-[#00C49F]/20 rounded-xl p-4 hover:shadow-sm transition-all group">
              <CreditCard size={16} className="text-[#00C49F] shrink-0" />
              <span className="text-sm font-bold text-[#00C49F] flex-1">Toplam tapu masrafını hesapla →</span>
              <ArrowRight size={14} className="text-[#00C49F]/50 group-hover:text-[#00C49F] transition-colors" />
            </Link>
          </div>
        </section>

        {/* Warnings */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Dikkat Edilmesi Gerekenler</h2>
          <div className="space-y-3">
            {WARNINGS.map((w, i) => (
              <div key={i} className="flex items-start gap-3 bg-white rounded-xl border border-amber-100 p-4 shadow-sm">
                <AlertTriangle size={14} className="text-amber-500 shrink-0 mt-0.5" />
                <p className="text-xs text-gray-600 leading-relaxed">{w}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Key facts */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-lg font-black text-gray-900 mb-4">Bilmeniz Gerekenler</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: Shield, title: 'Kat Mülkiyeti vs Kat İrtifakı', desc: 'Kat mülkiyeti tapusu iskanlı demektir. Kat irtifakı hâlâ yapım aşamasındaki mülke ait tapu belgesidir.', color: 'text-[#00C49F]', bg: 'bg-[#F0FDF8]' },
              { icon: Users, title: 'Paylı/İştirak Mülkiyet', desc: 'Birden fazla kişi adına kayıtlı mülk için tüm hissedarların imzası gerekir. Tek tarafın satışı mümkün değildir.', color: 'text-blue-600', bg: 'bg-blue-50' },
              { icon: FileText, title: 'Vekaletname', desc: 'Tapu devri işlemi için noterden özel yetkili vekaletname alınmalıdır. Genel vekalet yeterli olmayabilir.', color: 'text-amber-600', bg: 'bg-amber-50' },
              { icon: Home, title: 'Belediye İlişiksizlik Belgesi', desc: 'Satıcının emlak vergisi ve çevre temizlik vergisi borcu olmaması gerekir. Aksi hâlde tapu devri bloke olur.', color: 'text-violet-600', bg: 'bg-violet-50' },
            ].map(f => (
              <div key={f.title} className={`rounded-xl ${f.bg} p-4`}>
                <div className="flex items-center gap-2 mb-2">
                  <f.icon size={15} className={f.color} />
                  <h3 className="text-xs font-black text-gray-900">{f.title}</h3>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link href="/tapu-masrafi" className="group bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-all flex flex-col gap-3">
              <CreditCard size={20} className="text-[#00C49F]" />
              <div>
                <p className="text-sm font-bold text-gray-900 mb-1">Tapu Masrafı Hesapla</p>
                <p className="text-xs text-gray-500">Tüm alım maliyetleri</p>
              </div>
              <ArrowRight size={13} className="text-gray-300 group-hover:text-gray-600 transition-colors mt-auto" />
            </Link>
            <Link href="/rehber/ev-satin-alma" className="group bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-all flex flex-col gap-3">
              <Home size={20} className="text-blue-600" />
              <div>
                <p className="text-sm font-bold text-gray-900 mb-1">Ev Satın Alma Rehberi</p>
                <p className="text-xs text-gray-500">Tam alım süreci</p>
              </div>
              <ArrowRight size={13} className="text-gray-300 group-hover:text-gray-600 transition-colors mt-auto" />
            </Link>
            <Link href="/yabanci-gayrimenkul" className="group bg-gradient-to-br from-[#00C49F] to-[#00a882] rounded-2xl p-5 hover:shadow-md transition-all flex flex-col gap-3">
              <Shield size={20} className="text-white" />
              <div>
                <p className="text-sm font-bold text-white mb-1">Yabancı Alıcı Rehberi</p>
                <p className="text-xs text-white/70">DAB ve özel koşullar</p>
              </div>
              <ArrowRight size={13} className="text-white/60 group-hover:text-white transition-colors mt-auto" />
            </Link>
          </div>
        </section>

      </div>
    </main>
  );
}
