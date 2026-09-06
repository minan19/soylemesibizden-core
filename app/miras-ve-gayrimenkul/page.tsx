import { Metadata } from 'next';
import Link from 'next/link';
import {
  FileText, Users, Shield, AlertTriangle, CheckCircle,
  ArrowRight, Home, Scale,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Miras ve Gayrimenkul | Veraset, İntikal, Tapu | Söylemesi Bizden',
  description:
    'Gayrimenkul mirasında yasal süreç: veraset ilamı, tapu intikali, mirasçı hakları, saklı pay, miras paylaşımı ve veraset vergisi. Türk miras hukuku rehberi.',
};

const HEIR_SHARES = [
  {
    situation: 'Eş + Çocuk(lar)',
    spouse: '1/4',
    children: '3/4 (eşit paylaşım)',
    note: 'Eşin en az 1/4 hakkı vardır; çocuk sayısı arttıkça eşin payı değişmez.',
  },
  {
    situation: 'Eş (çocuksuz) + Ebeveynler',
    spouse: '1/2',
    children: '1/2 (ebeveynlere)',
    note: 'Çocuk yoksa ebeveynler ikinci zümre mirasçısıdır.',
  },
  {
    situation: 'Eş + Kardeşler (ebeveyn yok)',
    spouse: '3/4',
    children: '1/4 (kardeşlere)',
    note: 'Ebeveyn ve çocuk yoksa kardeşler üçüncü zümre olarak girer.',
  },
  {
    situation: 'Yalnızca Çocuklar',
    spouse: '—',
    children: 'Tamamı (eşit paylaşım)',
    note: 'Eş yoksa mülkün tamamı çocuklara eşit pay ile geçer.',
  },
];

const PROCESS_STEPS = [
  {
    step: 1,
    title: 'Veraset İlamı Al',
    desc: 'Sulh hukuk mahkemesine veya notere başvurun. Nüfus kayıtları esas alınarak mirasçılar ve payları belirlenir.',
    duration: '1–4 hafta',
    icon: FileText,
    color: 'text-[#00C49F]',
    bg: 'bg-[#F0FDF8]',
  },
  {
    step: 2,
    title: 'İntikal Talebi',
    desc: 'Veraset ilamı + ölüm belgesi + mirasçı kimlik bilgileriyle tapu müdürlüğüne başvuru yapılır.',
    duration: '1–2 hafta',
    icon: Home,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
  {
    step: 3,
    title: 'Veraset Vergisi Beyanı',
    desc: 'Ölüm tarihinden itibaren 4 ay içinde vergi dairesine veraset ve intikal vergisi beyannamesi verilmeli.',
    duration: '4 aylık süre',
    icon: Scale,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
  },
  {
    step: 4,
    title: 'Tapu Tescili',
    desc: 'Vergi borcu olmadığına dair ilişiksizlik belgesi alındıktan sonra tapu müdürlüğü intikali tescil eder.',
    duration: '3–5 iş günü',
    icon: Shield,
    color: 'text-violet-600',
    bg: 'bg-violet-50',
  },
  {
    step: 5,
    title: 'Miras Paylaşımı (İsteğe Bağlı)',
    desc: 'Mirasçılar anlaşarak paylaşma (taksim) yapabilir. Anlaşmazlıkta sulh hukuk mahkemesi devreye girer.',
    duration: 'Değişken',
    icon: Users,
    color: 'text-rose-600',
    bg: 'bg-rose-50',
  },
];

const SAKLI_PAY = [
  { heir: 'Her çocuk', share: 'Yasal payın 1/2\'si' },
  { heir: 'Ebeveynler (çocuk yoksa)', share: 'Yasal payın 1/4\'ü' },
  { heir: 'Eş', share: 'Yasal payın tamamı (kısıtlanamaz)' },
];

const TAX_BRACKETS = [
  { bracket: 'İlk ₺1.183.000', rate: '%1' },
  { bracket: '₺1.183.001 – ₺2.506.000', rate: '%3' },
  { bracket: '₺2.506.001 – ₺5.012.000', rate: '%5' },
  { bracket: '₺5.012.001 – ₺10.024.000', rate: '%7' },
  { bracket: '₺10.024.001 ve üzeri', rate: '%10' },
];

const WARNINGS = [
  'Mirasçılar arasında anlaşma olmadan mülk satılamaz (iştirak hâlinde mülkiyet).',
  'Vasiyetname noterden onaylı olmalı; el yazılı vasiyetname geçerli ama risklidir.',
  'Yurt dışında yaşayan mirasçılar apostilli belgeler ve yetkili tercüman gerektirir.',
  'Tapu intikali için vergi borcunun sıfırlanması (ilişiksizlik belgesi) zorunludur.',
  'Birden fazla mülk varsa her biri için ayrı tapu intikali işlemi yapılmalıdır.',
];

export default function MirasVeGayrimenkulPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <FileText size={13} /> Hukuki Rehber
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Miras ve Gayrimenkul
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            Türk miras hukukunda veraset ilamı, tapu intikali, mirasçı hakları, saklı pay
            ve veraset vergisi süreçlerinin kapsamlı rehberi.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-[#00C49F]">4 ay</p>
              <p className="text-xs text-gray-400">Vergi beyanname süresi</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">%1–10</p>
              <p className="text-xs text-gray-400">Veraset vergisi oranı</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-400">1/2</p>
              <p className="text-xs text-gray-400">Çocuk saklı payı</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* Heir shares */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-2">Yasal Miras Payları</h2>
          <p className="text-sm text-gray-500 mb-5">
            Türk Medeni Kanunu&apos;na göre mirasçı zümreleri ve mülk paylaşımı:
          </p>
          <div className="space-y-3">
            {HEIR_SHARES.map(h => (
              <div key={h.situation} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                <p className="text-xs font-black text-gray-900 mb-2">{h.situation}</p>
                <div className="flex gap-4 mb-2">
                  <div className="flex-1">
                    <p className="text-[10px] text-gray-400 mb-0.5">Eş</p>
                    <p className="text-sm font-black text-[#00C49F]">{h.spouse}</p>
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] text-gray-400 mb-0.5">Diğer mirasçılar</p>
                    <p className="text-sm font-black text-blue-600">{h.children}</p>
                  </div>
                </div>
                <p className="text-[10px] text-gray-400 italic">{h.note}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Process */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-2">Tapu İntikal Süreci</h2>
          <p className="text-sm text-gray-500 mb-6">Vefat sonrası gayrimenkulün mirasçılara devri için izlenecek adımlar</p>
          <div className="space-y-4">
            {PROCESS_STEPS.map(s => (
              <div key={s.step} className={`rounded-2xl border p-5 ${s.bg} border-opacity-40`}
                style={{ borderColor: 'rgba(0,0,0,0.08)' }}>
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm">
                    <span className={`text-sm font-black ${s.color}`}>{s.step}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-3 mb-1">
                      <h3 className="text-sm font-bold text-gray-900">{s.title}</h3>
                      <span className="text-[10px] bg-white/80 text-gray-500 px-2 py-0.5 rounded-full border shrink-0">
                        {s.duration}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Saklı pay */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-lg font-black text-gray-900 mb-2">Saklı Pay (Mahfuz Hisse)</h2>
          <p className="text-sm text-gray-500 mb-4">
            Vasiyetname ile dahi bu paylar elinden alınamaz. Saklı pay ihlali hâlinde
            mirasçılar <strong>tenkis davası</strong> açabilir.
          </p>
          <div className="space-y-2">
            {SAKLI_PAY.map(s => (
              <div key={s.heir} className="flex items-center justify-between p-3 rounded-xl bg-[#F0FDF8] border border-[#00C49F]/20">
                <span className="text-xs font-semibold text-gray-700">{s.heir}</span>
                <span className="text-xs font-black text-[#00C49F]">{s.share}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl p-3">
            <AlertTriangle size={13} className="text-amber-600 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-800">
              Eşin saklı payı Türk hukukunda özel koruma altındadır — yasal mirasının tamamı kısıtlanamaz.
            </p>
          </div>
        </section>

        {/* Tax */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-2">Veraset ve İntikal Vergisi</h2>
          <p className="text-sm text-gray-500 mb-5">
            2024 yılı için artan oranlı vergi dilimleri (her mirasçının aldığı pay üzerinden hesaplanır):
          </p>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left p-3 font-bold text-gray-600">Miras Payı Dilimi</th>
                  <th className="text-right p-3 pr-4 font-bold text-gray-600">Vergi Oranı</th>
                </tr>
              </thead>
              <tbody>
                {TAX_BRACKETS.map((b, i) => (
                  <tr key={b.bracket} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="p-3 text-gray-600">{b.bracket}</td>
                    <td className={`p-3 pr-4 text-right font-black ${i === 0 ? 'text-[#00C49F]' : i < 3 ? 'text-blue-600' : 'text-rose-600'}`}>
                      {b.rate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-3 bg-[#F0FDF8] border border-[#00C49F]/20 rounded-xl p-3">
            <p className="text-xs text-gray-600">
              <span className="font-bold text-[#00C49F]">İndirim:</span> Eşe ve alt soya (çocuk, torun) yapılan intikallerde vergi 1/2 oranında uygulanır.
              Ana-babaya intikallerde de aynı indirim geçerlidir.
            </p>
          </div>
        </section>

        {/* Warnings */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Dikkat Edilmesi Gerekenler</h2>
          <div className="space-y-2">
            {WARNINGS.map((w, i) => (
              <div key={i} className="flex items-start gap-3 bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                <AlertTriangle size={14} className="text-amber-500 shrink-0 mt-0.5" />
                <p className="text-xs text-gray-600 leading-relaxed">{w}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Vasiyetname */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-lg font-black text-gray-900 mb-3">Vasiyetname ile Planlama</h2>
          <div className="space-y-3">
            {[
              { title: 'Resmi Vasiyetname', desc: 'Noterde düzenlenir. İki tanık, noter onayı gerekir. En güvenli yöntem.', icon: CheckCircle, color: 'text-[#00C49F]' },
              { title: 'El Yazılı Vasiyetname', desc: 'Tamamen kişinin el yazısıyla; tarih, yer ve imza şart. Bilgisayarda yazılamaz. Kaybolma/tahrif riski yüksek.', icon: AlertTriangle, color: 'text-amber-500' },
              { title: 'Sözlü Vasiyetname', desc: 'Yalnızca ölüm tehlikesi veya ulaşım engeli gibi olağanüstü hâllerde geçerli. 30 gün içinde resmî şekle dönüştürülmeli.', icon: AlertTriangle, color: 'text-rose-500' },
            ].map(v => (
              <div key={v.title} className="flex items-start gap-3 p-3 rounded-xl bg-gray-50">
                <v.icon size={14} className={`${v.color} shrink-0 mt-0.5`} />
                <div>
                  <p className="text-xs font-bold text-gray-900 mb-0.5">{v.title}</p>
                  <p className="text-xs text-gray-500 leading-relaxed">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Rehberler</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/rehber/ev-satin-alma', label: 'Ev Satın Alma Rehberi' },
              { href: '/rehber/satici-rehberi', label: 'Satıcı Rehberi' },
              { href: '/tapu-masrafi', label: 'Tapu Masrafı Hesaplayıcı' },
              { href: '/emlak-vergisi', label: 'Emlak Vergisi Hesaplayıcı' },
              { href: '/imar-durumu', label: 'İmar Durumu Rehberi' },
              { href: '/yabanci-gayrimenkul', label: 'Yabancı Alıcı Rehberi' },
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
