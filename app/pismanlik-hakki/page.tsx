import { Metadata } from 'next';
import Link from 'next/link';
import {
  AlertTriangle, CheckCircle, ArrowRight, Clock, ShieldCheck, XCircle,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Gayrimenkul Pişmanlık Hakkı ve Cayma | Söylemesi Bizden',
  description:
    'Gayrimenkul satışında pişmanlık hakkı, cayma bedeli, kapora, kaparo iade koşulları ve hukuki süreç. Alıcı ve satıcı hakları.',
};

const SCENARIOS = [
  {
    title: 'Alıcı Caydığında',
    icon: XCircle,
    color: 'text-rose-600',
    bg: 'bg-rose-50',
    border: 'border-rose-200',
    items: [
      'Ödenen kapora (pey akçesi) satıcıda kalır.',
      'Ön sözleşmede cayma cezası varsa ek tazminat ödenir.',
      'Satıcının somut zararı varsa BK md. 179-180 kapsamında ek talep gelebilir.',
      'Tapu dairesinde imza atılmadan önce vazgeçilebilir — tapu devri gerçekleştiyse iade davası gerekir.',
    ],
  },
  {
    title: 'Satıcı Caydığında',
    icon: XCircle,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    items: [
      'Alınan kaparo iki katıyla iade edilir (BK md. 177).',
      'Satıcı ayrıca kâr kaybı ve taşınma giderleri gibi somut zararları tazmin etmek zorundadır.',
      'Alıcı, sözleşmenin aynen ifasını (tapu devrini) mahkemeden talep edebilir.',
      'Satıcı tüketici ise ek TKHK yaptırımları uygulanabilir.',
    ],
  },
  {
    title: 'Müteahhit / Proje Cayması',
    icon: XCircle,
    color: 'text-violet-600',
    bg: 'bg-violet-50',
    border: 'border-violet-200',
    items: [
      'Yapı ruhsatı iptal veya proje değişikliği durumunda alıcı sözleşmeden cayabilir.',
      'Ön ödemeler, banka faizi dahil tam iade edilmelidir.',
      'TKHK md. 8: tüketicinin 14 gün cayma hakkı (devre mülk, kat karşılığı projelerde).',
      'İnşaat firmasının iflasında garanti belgesi/teminat mektubu devreye girer.',
    ],
  },
];

const KAPORA_RULES = [
  { rule: 'Pey akçesi (kaparo)', detail: 'Cayde zarar olmaksızın alıcıda kalır. BK md. 177.' },
  { rule: 'Cayma akçesi (ceza şartı)', detail: 'Her iki tarafın cayma bedeli sözleşmede ayrıca belirlenir.' },
  { rule: 'Yazılılık zorunluluğu', detail: 'Taşınmaz satış vaadi sözleşmesi noter onaylı olmalıdır. Aksi hâlde geçersizdir.' },
  { rule: 'Zamanaşımı', detail: 'Cayma hakkından doğan tazminat davası 10 yıllık genel zamanaşımına tabidir.' },
  { rule: 'Yüzde sınırı', detail: 'Yargıtay kararlarına göre kapora satış bedelinin %10-20\'sini aşarsa tenkis edilebilir.' },
];

const PROCESS_STEPS = [
  {
    step: '1',
    title: 'Durum Tespiti',
    desc: 'Sözleşmenin türünü (pey akçeli mi, ceza şartlı mı) ve tapu devir durumunu belirleyin.',
    duration: '1 gün',
  },
  {
    step: '2',
    title: 'İhtarname Gönder',
    desc: 'Noter aracılığıyla karşı tarafa "cayma ihtarı" gönderin. Hukuki süreç bu noktada başlar.',
    duration: '1-3 gün',
  },
  {
    step: '3',
    title: 'İade Talebi',
    desc: 'Kapora iadesi veya tazminat için yazılı başvuru yapın. Karşı tarafın 7-15 gün süresi vardır.',
    duration: '7-15 gün',
  },
  {
    step: '4',
    title: 'Arabuluculuk',
    desc: 'Anlaşmazlıkta önce zorunlu arabuluculuk, ardından dava yoluna gidilir.',
    duration: '3-6 hafta',
  },
  {
    step: '5',
    title: 'Sulh Hukuk / Asliye Mahkemesi',
    desc: 'Tazminat miktarına göre sulh hukuk veya asliye hukuk mahkemesine başvurun.',
    duration: '6-24 ay',
  },
];

const TIPS = [
  'Sözleşme imzalanmadan önce her maddeyi okuyun; "pey akçesi" ile "ceza şartı" hukuki olarak farklıdır.',
  'Kapora miktarını yazılı ve makbuzla ödeyin; elden nakit ödeme ispat güçlüğü yaratır.',
  'Tapu devri tamamlanana kadar yasal cayma hakkınız korunur; devir sonrası sözleşme iptali dava sürecini gerektirir.',
  'Müteahhit projelerinde "garanti belgesi" veya "banka teminat mektubu" talep edin.',
  'Sözleşmedeki cayma cezası abartılı ise BK md. 182/II uyarınca hâkimden indirim talep edebilirsiniz.',
];

export default function PismanlikHakkiPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <AlertTriangle size={13} /> Hukuki Rehber
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Gayrimenkul Pişmanlık Hakkı ve Cayma
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            Satış vaadi sözleşmesinden alıcı veya satıcı caydığında ne olur? Kapora iade koşulları,
            cayma bedeli, tazminat ve hukuki adımlar.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-rose-400">2x</p>
              <p className="text-xs text-gray-400">Satıcı cayarsa kapora</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">10 yıl</p>
              <p className="text-xs text-gray-400">Zamanaşımı süresi</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-400">Noter</p>
              <p className="text-xs text-gray-400">Zorunlu onay</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* Cayma Senaryoları */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-5">Cayma Senaryoları</h2>
          <div className="space-y-4">
            {SCENARIOS.map(s => (
              <div key={s.title} className={`bg-white rounded-2xl border ${s.border} p-5 shadow-sm`}>
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center shrink-0`}>
                    <s.icon size={20} className={s.color} />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-gray-900 mb-3">{s.title}</h3>
                    <ul className="space-y-2">
                      {s.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle size={12} className="text-[#00C49F] shrink-0 mt-0.5" />
                          <p className="text-xs text-gray-600 leading-relaxed">{item}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Kapora Kuralları */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Kapora Hukuki Kuralları</h2>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full text-xs">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-4 py-3 font-black text-gray-700">Kural</th>
                  <th className="text-left px-4 py-3 font-black text-gray-700">Açıklama</th>
                </tr>
              </thead>
              <tbody>
                {KAPORA_RULES.map((r, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-4 py-3 font-bold text-gray-800 whitespace-nowrap">{r.rule}</td>
                    <td className="px-4 py-3 text-gray-600 leading-relaxed">{r.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Hukuki Süreç */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-5">Hukuki Süreç Adımları</h2>
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

        {/* Tips */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <ShieldCheck size={15} className="text-[#00C49F]" /> Pratik İpuçları
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
            <span className="font-black">Bu rehber genel hukuki bilgi amaçlıdır.</span> Somut durumunuz için bir gayrimenkul avukatına veya noterden onaylı sözleşme uzmanlığına başvurun.
          </p>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Araçlar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/tapu-devir-sureci', label: 'Tapu Devir Süreci' },
              { href: '/tapu-masrafi', label: 'Tapu Masrafı Hesaplayıcı' },
              { href: '/kira-sozlesmesi', label: 'Kira Sözleşmesi Rehberi' },
              { href: '/miras-ve-gayrimenkul', label: 'Miras ve Gayrimenkul' },
              { href: '/rehber/ev-satin-alma', label: 'Ev Satın Alma Rehberi' },
              { href: '/emlak-komisyonu', label: 'Emlak Komisyonu Hesapla' },
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
