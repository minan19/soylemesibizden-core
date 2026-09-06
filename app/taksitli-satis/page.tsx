import { Metadata } from 'next';
import Link from 'next/link';
import {
  CreditCard, CheckCircle, AlertTriangle, ArrowRight, Clock, FileText, ShieldCheck,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Taksitli Gayrimenkul Satışı Rehberi | Sözleşme, Haklar, Riskler | Söylemesi Bizden',
  description:
    'Taksitli gayrimenkul satışında alıcı ve satıcı hakları, sözleşme zorunlulukları, ön ödeme, temerrüt ve tapu devri süreci.',
};

const COMPARISON = [
  { aspect: 'Tapu Devri', taksitli: 'Genellikle son taksitte veya sözleşmede belirtilen tarihte', normal: 'Ödeme ile eş zamanlı devir' },
  { aspect: 'Faiz', taksitli: 'Yasal faiz veya anlaşmalı faiz oranı uygulanabilir', normal: 'Banka faizi ayrıca yürür' },
  { aspect: 'Cayma Hakkı', taksitli: 'TKHK md. 8 kapsamında 14 gün cayma hakkı (tüketici ise)', normal: 'Cayma anlaşmayla belirlenir' },
  { aspect: 'Temerrüt', taksitli: 'Müteahhit iki taksiti atlayan alıcının sözleşmesini feshedebilir', normal: 'Tapu iptal davası gündeme gelir' },
  { aspect: 'İpotek', taksitli: 'Satıcı tapu üzerinde ipotek şerhi koyabilir', normal: 'İpotek olmadan temiz devir' },
  { aspect: 'Vergi', taksitli: 'Tapu devri ertelendiğinde KDV doğumu ertelenebilir', normal: 'Tapu ile KDV beyanı yapılır' },
];

const RIGHTS = [
  { title: 'TKHK Cayma Hakkı', desc: 'Tüketici olarak devre mülk ve ön ödemeli projeler için 14 gün içinde gerekçesiz cayma hakkı mevcuttur.' },
  { title: 'Ön Ödeme İadesi', desc: 'Satıcı cayar veya teslimi geciktirirse ön ödeme banka faiziyle iade edilmelidir.' },
  { title: 'Geç Teslim Tazminatı', desc: 'Projenin geç tesliminde alıcı, gecikmeli süre başına kira eşdeğeri tazminat talep edebilir.' },
  { title: 'Tapu Devri Güvencesi', desc: 'Tüm taksitler ödenmeden satıcı tapuyu devretmekten kaçınıyorsa ifa davası açılabilir.' },
  { title: 'Kısmi İfa', desc: 'Alıcı kısmen ödeme yapmışsa, orantılı bağımsız bölüm hissesi talep edilebilir.' },
];

const RISKS = [
  { risk: 'Müteahhit İflası', mitigation: 'Banka teminat mektubu veya garanti belgesi talep edin. İnşaat sigortasını kontrol edin.' },
  { risk: 'Proje Değişikliği', mitigation: 'Sözleşmeye "proje değişikliği halinde iade" maddesi ekletin.' },
  { risk: 'Tapu Gecikmesi', mitigation: 'İskan alınmadan tapu devri yapılamaz; iskan sürecini müteahhitten yazılı olarak öğrenin.' },
  { risk: 'Faiz Yükü', mitigation: 'Banka kredisiyle karşılaştırın; taksitli satış daha pahalı olabilir.' },
  { risk: 'Şerh Sorunu', mitigation: 'Tapuda ipotek, şerh olup olmadığını tapu siciline sorgulayarak teyit edin.' },
];

const CHECKLIST = [
  'Sözleşmenin noter onaylı olduğunu kontrol edin.',
  'Taksit tutarları, vadeleri ve faiz oranı yazılı şekilde belirtilmeli.',
  'İskan tarihini ve gecikme tazminatı maddesini sözleşmede arayın.',
  'Tapu devir tarihinin açıkça yazılı olduğunu teyit edin.',
  'Müteahhidin garanti belgesi veya banka teminat mektubu sunmasını isteyin.',
  'Teslim öncesinde tapu sicili üzerindeki şerh ve ipotekleri sorgulayın.',
  'Cayma hakkınızı kullanma süresini (14 gün) kaçırmayın.',
];

const PROCESS_STEPS = [
  { step: '1', title: 'Ön Sözleşme Hazırlat', desc: 'Noterde ön satış sözleşmesi veya bağlayıcı satış vaadi düzenlenir.', duration: '1 gün' },
  { step: '2', title: 'Ön Ödeme Yap', desc: 'Belirlenen peşinat/ön ödeme (genellikle %20-30) makbuzla ödenir.', duration: '1 gün' },
  { step: '3', title: 'Taksit Takvimini Takip Et', desc: 'Her taksitin zamanında ödenmesi sözleşmeyi geçerli tutar; gecikmelerde faiz işler.', duration: 'Süregelen' },
  { step: '4', title: 'İskan ve Teslim', desc: 'Müteahhit iskanı alır, bağımsız bölümü teslim eder.', duration: 'Proje süresine bağlı' },
  { step: '5', title: 'Son Taksit ve Tapu', desc: 'Son ödeme yapılır, tapu noter veya tapu müdürlüğünde devredilir.', duration: '1-5 iş günü' },
];

export default function TaksitliSatisPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <CreditCard size={13} /> Hukuki Rehber
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Taksitli Gayrimenkul Satışı Rehberi
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            Taksitli alım satımda alıcı ve satıcı hakları, sözleşme zorunlulukları, cayma hakkı,
            temerrüt durumları ve tapu devri süreci.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-[#00C49F]">14 gün</p>
              <p className="text-xs text-gray-400">Cayma hakkı süresi</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">TKHK</p>
              <p className="text-xs text-gray-400">Tüketici koruması</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-400">Noter</p>
              <p className="text-xs text-gray-400">Sözleşme zorunluluğu</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* Karşılaştırma */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Taksitli vs Normal Satış</h2>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="text-left px-4 py-3 font-black text-gray-700">Özellik</th>
                    <th className="text-left px-4 py-3 font-black text-[#00C49F]">Taksitli Satış</th>
                    <th className="text-left px-4 py-3 font-black text-blue-600">Normal Satış</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map((c, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 font-bold text-gray-800">{c.aspect}</td>
                      <td className="px-4 py-3 text-gray-600 leading-relaxed">{c.taksitli}</td>
                      <td className="px-4 py-3 text-gray-600 leading-relaxed">{c.normal}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Alıcı Hakları */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Alıcı Hakları</h2>
          <div className="space-y-3">
            {RIGHTS.map((r, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm flex items-start gap-3">
                <CheckCircle size={14} className="text-[#00C49F] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-black text-gray-900 mb-0.5">{r.title}</p>
                  <p className="text-xs text-gray-600 leading-relaxed">{r.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Riskler ve Önlemler */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Riskler ve Önlemler</h2>
          <div className="space-y-3">
            {RISKS.map((r, i) => (
              <div key={i} className="bg-white rounded-xl border border-amber-100 p-4 shadow-sm">
                <div className="flex items-start gap-3">
                  <AlertTriangle size={13} className="text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-black text-gray-900 mb-1">{r.risk}</p>
                    <p className="text-[10px] text-gray-600 leading-relaxed">{r.mitigation}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Süreç */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-5">Taksitli Satış Süreci</h2>
          <div className="space-y-3">
            {PROCESS_STEPS.map(s => (
              <div key={s.step} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#00C49F] text-white flex items-center justify-center text-xs font-black shrink-0">
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

        {/* Kontrol Listesi */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <ShieldCheck size={14} className="text-[#00C49F]" /> Sözleşme Kontrol Listesi
          </h2>
          <ul className="space-y-2.5">
            {CHECKLIST.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="w-4 h-4 rounded border-2 border-[#00C49F] flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle size={10} className="text-[#00C49F]" />
                </span>
                <p className="text-xs text-gray-700 leading-relaxed">{item}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Warning */}
        <section className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <AlertTriangle size={14} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-700 leading-relaxed">
            <span className="font-black">Devre mülk satışında ekstra dikkat:</span> Devre mülk (timeshare) sözleşmeleri özel TKHK hükümlerine tabidir. Cayma hakkı 14 gündür ve satıcı bu süre içinde herhangi bir bedel talep edemez.
          </p>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Araçlar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/pismanlik-hakki', label: 'Pişmanlık Hakkı ve Cayma' },
              { href: '/tapu-devir-sureci', label: 'Tapu Devir Süreci' },
              { href: '/tapu-masrafi', label: 'Tapu Masrafı Hesaplayıcı' },
              { href: '/odeme-plani', label: 'Ödeme Planı Simülatörü' },
              { href: '/mortgage-simulatoru', label: 'Gelişmiş Mortgage Simülatörü' },
              { href: '/rehber/ev-satin-alma', label: 'Ev Satın Alma Rehberi' },
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
