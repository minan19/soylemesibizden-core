import { Metadata } from 'next';
import Link from 'next/link';
import {
  Users, CheckCircle, AlertTriangle, ArrowRight, Clock, FileText, Scale,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Hisseli Tapu Rehberi | Ortak Mülkiyet, Şufa Hakkı | Söylemesi Bizden',
  description:
    'Hisseli tapu nedir, nasıl alınıp satılır? Şufa hakkı, ortaklığın giderilmesi davası, bölünme ve paylı mülkiyet hakları.',
};

const TYPES = [
  {
    title: 'Paylı Mülkiyet (Müşterek Mülkiyet)',
    desc: 'Birden fazla kişinin belirli paylarla (1/2, 1/3 gibi) aynı taşınmazda malik olması. Her malikin payı tapuya kaydedilir.',
    examples: ['Miras yoluyla intikal eden gayrimenkul', 'Birlikte satın alınan arsa', 'Ortak yatırım mülkleri'],
    color: 'text-[#00C49F]', bg: 'bg-[#F0FDF8]', border: 'border-[#00C49F]/20',
  },
  {
    title: 'İştirak Halinde Mülkiyet',
    desc: 'Payları ayrıştırılmamış ortak mülkiyet. Aile şirketi veya tereke (miras ortaklığı) örneği. Mirasçıların paylaşım kararı almadan önce ki durum.',
    examples: ['Henüz paylaşılmamış miras', 'Aile şirketi gayrimenkulleri', 'Tereke malı'],
    color: 'text-violet-600', bg: 'bg-violet-50', border: 'border-violet-200',
  },
];

const SUFA_HAKKI = [
  { point: 'Nedir?', detail: 'Paylı mülkiyette bir paydaşın payını satmak istediğinde, diğer paydaşların öncelikli satın alma hakkı.' },
  { point: 'Yasal Dayanak', detail: 'Medeni Kanun md. 732: Paydaşların, üçüncü kişiye yapılacak satışta şufa (öncelikli alım) hakkı mevcuttur.' },
  { point: 'Kullanım Süresi', detail: '3 ay içinde kullanılmalıdır; satışın öğrenildiği tarihten itibaren süre işler.' },
  { point: 'Fiyat', detail: 'Şufa kullanan paydaş, üçüncü kişiye yapılan satış fiyatı ve koşullarını kabul etmek zorundadır.' },
  { point: 'İhbar Zorunluluğu', detail: 'Satıcı paydaş, diğer paydaşlara noter ihtarnamesi ile bildirimde bulunmalıdır.' },
];

const ORTAKLIK_GIDERILMESI = [
  { step: '1', title: 'Uzlaşı Girişimi', desc: 'Önce diğer paydaşlarla satış veya bölünme konusunda uzlaşmayı deneyin.', duration: '1-4 hafta' },
  { step: '2', title: 'Sulh Hukuk Davası', desc: 'Anlaşma sağlanamazsa sulh hukuk mahkemesinde izale-i şüyu (ortaklığın giderilmesi) davası açılır.', duration: '6-18 ay' },
  { step: '3', title: 'Bilirkişi İncelemesi', detail: 'Mahkeme, taşınmazın bölünüp bölünemeyeceğini bilirkişiye inceletir.', duration: '2-4 ay' },
  { step: '4', title: 'Bölünme veya İhale', desc: 'Bölünebiliyorsa paylar ayrılır; bölünemiyorsa taşınmaz icra yoluyla açık artırmaya çıkarılır.', duration: '3-6 ay' },
  { step: '5', title: 'Pay Dağıtımı', desc: 'Satış bedeli paydaşlar arasında hisselerine göre paylaştırılır.', duration: '1-2 ay' },
];

const RISKS = [
  { risk: 'Diğer Paydaşın Tapu Şerhi', desc: 'Bir paydaş taşınmazı satmak istediğinde, diğer paydaşların şerhi işlemi engelleyebilir.' },
  { risk: 'Banka Finansmanı Güçlüğü', desc: 'Bankalar hisseli tapılı mülkler için kredi vermekte çekingen davranır veya ek teminat ister.' },
  { risk: 'Anlaşmazlık Riski', desc: 'Ortak mülkte tadilat, kiralama veya satış konusunda her paydaş söz hakkı taşır.' },
  { risk: 'Miras Yoluyla Karmaşıklık', desc: 'Her kuşakta paylardaki bölünme artar; 20-30 kişilik paydaş durumları ortaya çıkabilir.' },
];

const TIPS = [
  'Hisseli arsa satın almadan önce tüm paydaşlarla tanışın; anlaşmazlık ihtimalini değerlendirin.',
  'Şufa hakkınızı kullanmak için satışı öğrenir öğrenmez noter kanalıyla bildirim yapın; 3 aylık süre kesindir.',
  'Ortaklığın giderilmesi davası sonuçlanana kadar uzun sürebilir; acele gereken durumlarda uzlaşı yolunu tercih edin.',
  'Hisseli mülkü sat-kirala modeliyle değerlendirmek için diğer paydaşların onayı şarttır.',
  'Miras yoluyla edinilen hisseli mülklerde tapu paylaşımı (intikal) yapmadan kira geliri tahsilatı sorunlu olabilir.',
];

export default function HisseliTapuPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-violet-500/20 border border-violet-500/30 text-violet-300 text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <Users size={13} /> Hukuki Rehber
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Hisseli Tapu Rehberi
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            Ortak mülkiyet türleri, şufa (öncelikli alım) hakkı, ortaklığın giderilmesi davası ve
            hisseli tapu alırken dikkat edilmesi gerekenler.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-violet-400">3 ay</p>
              <p className="text-xs text-gray-400">Şufa hakkı süresi</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">MK 732</p>
              <p className="text-xs text-gray-400">Yasal dayanak</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-400">İzale</p>
              <p className="text-xs text-gray-400">Ortaklığı giderme davası</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* Mülkiyet Türleri */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-5">Ortak Mülkiyet Türleri</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {TYPES.map(t => (
              <div key={t.title} className={`bg-white rounded-2xl border ${t.border} p-5 shadow-sm`}>
                <h3 className={`text-sm font-black mb-2 ${t.color}`}>{t.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed mb-3">{t.desc}</p>
                <p className="text-[10px] font-black text-gray-500 mb-1">Örnekler:</p>
                {t.examples.map((e, i) => (
                  <div key={i} className="flex items-start gap-1.5">
                    <CheckCircle size={10} className={`${t.color} shrink-0 mt-0.5`} />
                    <p className="text-[10px] text-gray-600">{e}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* Şufa Hakkı */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Şufa (Öncelikli Alım) Hakkı</h2>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full text-xs">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-4 py-3 font-black text-gray-700">Konu</th>
                  <th className="text-left px-4 py-3 font-black text-gray-700">Açıklama</th>
                </tr>
              </thead>
              <tbody>
                {SUFA_HAKKI.map((s, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-4 py-3 font-bold text-gray-800 whitespace-nowrap">{s.point}</td>
                    <td className="px-4 py-3 text-gray-600 leading-relaxed">{s.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Ortaklığın Giderilmesi */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-5">Ortaklığın Giderilmesi (İzale-i Şüyu) Davası</h2>
          <div className="space-y-3">
            {ORTAKLIK_GIDERILMESI.map(s => (
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
                  <p className="text-xs text-gray-600 leading-relaxed">{s.desc ?? ''}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Riskler */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Hisseli Tapu Riskleri</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {RISKS.map((r, i) => (
              <div key={i} className="bg-white rounded-xl border border-amber-100 p-4 shadow-sm flex items-start gap-3">
                <AlertTriangle size={13} className="text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-black text-gray-900 mb-0.5">{r.risk}</p>
                  <p className="text-[10px] text-gray-600 leading-relaxed">{r.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* İpuçları */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <Scale size={14} className="text-[#00C49F]" /> Pratik İpuçları
          </h2>
          <ul className="space-y-3">
            {TIPS.map((tip, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-[#F0FDF8] text-[#00C49F] text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                <p className="text-xs text-gray-600 leading-relaxed">{tip}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Warning */}
        <section className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <AlertTriangle size={14} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-700 leading-relaxed">
            <span className="font-black">Hisseli arsa ve tarım arazisi alırken ekstra dikkat:</span> Tarım Kanunu ve arazi parçalama kısıtlamaları nedeniyle küçük hisseli tarım arsaları bölünemez; satış da kısıtlamalara tabidir.
          </p>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Araçlar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/miras-ve-gayrimenkul', label: 'Miras ve Gayrimenkul' },
              { href: '/tapu-devir-sureci', label: 'Tapu Devir Süreci' },
              { href: '/arsa-yatirimi', label: 'Arsa Yatırımı Rehberi' },
              { href: '/kat-mulkiyeti', label: 'Kat Mülkiyeti Rehberi' },
              { href: '/pismanlik-hakki', label: 'Pişmanlık Hakkı ve Cayma' },
              { href: '/kentsel-donusum', label: 'Kentsel Dönüşüm Rehberi' },
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
