import { Metadata } from 'next';
import Link from 'next/link';
import {
  TrendingUp, TrendingDown, ArrowRight, Info,
  Calculator, BarChart2, Building2,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Konut Kredisi Faiz Takip | Güncel Banka Oranları | Söylemesi Bizden',
  description:
    'Türkiye\'deki bankaların güncel konut kredisi faiz oranları, aylık taksit karşılaştırması, tarihsel faiz trendi ve TCMB politika faizinin konut kredisine etkisi.',
};

const RATES_DATA = [
  { bank: 'Ziraat Bankası', monthly: 3.29, annual: 39.48, type: 'Kamu', special: 'İlk Konut %20 İndirim', badge: 'Kamu' },
  { bank: 'Halkbank', monthly: 3.35, annual: 40.2, type: 'Kamu', special: '', badge: 'Kamu' },
  { bank: 'Vakıfbank', monthly: 3.39, annual: 40.68, type: 'Kamu', special: 'Esnaf Özel Oran', badge: 'Kamu' },
  { bank: 'İş Bankası', monthly: 3.45, annual: 41.4, type: 'Özel', special: 'Maximum Kart Müşterisi İndirimi', badge: 'Özel' },
  { bank: 'Garanti BBVA', monthly: 3.49, annual: 41.88, type: 'Özel', special: '', badge: 'Özel' },
  { bank: 'Yapı Kredi', monthly: 3.52, annual: 42.24, type: 'Özel', special: 'Dijital Kanal İndirimi', badge: 'Özel' },
  { bank: 'Akbank', monthly: 3.55, annual: 42.6, type: 'Özel', special: '', badge: 'Özel' },
  { bank: 'QNB Finansbank', monthly: 3.59, annual: 43.08, type: 'Özel', special: '', badge: 'Yabancı' },
];

const TREND_DATA = [
  { month: 'Oca 2024', rate: 2.50 },
  { month: 'Şub 2024', rate: 2.82 },
  { month: 'Mar 2024', rate: 3.05 },
  { month: 'Nis 2024', rate: 3.20 },
  { month: 'May 2024', rate: 3.35 },
  { month: 'Haz 2024', rate: 3.45 },
  { month: 'Tem 2024', rate: 3.55 },
  { month: 'Ağu 2024', rate: 3.60 },
  { month: 'Eyl 2024', rate: 3.50 },
  { month: 'Eki 2024', rate: 3.45 },
  { month: 'Kas 2024', rate: 3.40 },
  { month: 'Ara 2024', rate: 3.29 },
];

const maxRate = Math.max(...TREND_DATA.map(d => d.rate));
const minRate = Math.min(...RATES_DATA.map(r => r.monthly));

const PAYMENT_EXAMPLES = [
  { amount: 1000000, label: '₺1M', payments: RATES_DATA.slice(0, 4).map(r => ({
    bank: r.bank,
    payment120: Math.round((1000000 * r.monthly / 100 * Math.pow(1 + r.monthly / 100, 120)) / (Math.pow(1 + r.monthly / 100, 120) - 1)),
  }))},
];

function calcPayment(p: number, monthlyRate: number, months: number) {
  const r = monthlyRate / 100;
  return Math.round((p * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1));
}

const fmt = (n: number) => n.toLocaleString('tr-TR');

const TIPS = [
  'Kamu bankaları (Ziraat, Halk, Vakıf) genellikle özel bankalara kıyasla %0.2–0.5 daha düşük oran sunar.',
  'Dijital başvuru (internet bankacılığı) ile şube başvurusuna kıyasla ek indirim alabilirsiniz.',
  'Borçlu puanı (kredi notu) yüksek müşterilere (1500+) bankaların özel oran verdiği bilinmektedir.',
  'İlk konut alımında bazı kamu bankaları faiz sübvansiyonu uygulayabilmektedir.',
  'Faiz oranı pazarlık konusudur; birden fazla bankadan teklif alın ve kıyaslayın.',
  'Değişken faizli kredilerde TCMB politika faizi değiştiğinde taksit güncellenir — dikkatli olun.',
];

const badgeColors: Record<string, string> = {
  'Kamu': 'bg-[#00C49F]/10 text-[#00C49F]',
  'Özel': 'bg-blue-100 text-blue-700',
  'Yabancı': 'bg-violet-100 text-violet-700',
};

export default function FaizTakipPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <TrendingUp size={13} /> Faiz Takip
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Konut Kredisi Faiz Oranları
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-6">
            Türkiye&apos;nin önde gelen bankalarının güncel konut kredisi faiz oranları, aylık taksit
            karşılaştırması ve yıllık faiz trendi.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-[#00C49F]">%{minRate.toFixed(2)}/ay</p>
              <p className="text-xs text-gray-400">En düşük oran</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">8</p>
              <p className="text-xs text-gray-400">Karşılaştırılan banka</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-400">Ara 2024</p>
              <p className="text-xs text-gray-400">Son güncelleme</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-12 space-y-12">

        {/* Disclaimer */}
        <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <Info size={15} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 leading-relaxed">
            Aşağıdaki faiz oranları bilgilendirme amaçlı örnek verilerdir. Gerçek oranlar bankadan bankaya,
            müşteri profiline ve kredi miktarına göre değişir. Kesin teklif için bankanızla iletişime geçin.
          </p>
        </div>

        {/* Rate table */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-5">Banka Faiz Oranları Karşılaştırması</h2>
          <div className="space-y-3">
            {RATES_DATA.map((r, i) => (
              <div key={r.bank} className={`bg-white rounded-xl border p-4 shadow-sm flex items-center gap-4 ${i === 0 ? 'border-[#00C49F]/30 ring-1 ring-[#00C49F]/20' : 'border-gray-100'}`}>
                {i === 0 && (
                  <div className="absolute ml-0 -mt-8">
                    <span className="text-[9px] bg-[#00C49F] text-white px-2 py-0.5 rounded-full font-black">En Düşük</span>
                  </div>
                )}
                <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center shrink-0">
                  <Building2 size={16} className="text-gray-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-sm font-black text-gray-900">{r.bank}</p>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-black ${badgeColors[r.badge]}`}>{r.badge}</span>
                  </div>
                  {r.special && <p className="text-[10px] text-[#00C49F] font-semibold">{r.special}</p>}
                </div>
                <div className="text-right shrink-0">
                  <p className="text-lg font-black text-gray-900">%{r.monthly.toFixed(2)}<span className="text-xs font-normal text-gray-400">/ay</span></p>
                  <p className="text-[10px] text-gray-400">%{r.annual.toFixed(2)} yıllık</p>
                </div>
                <div className="text-right shrink-0 pl-4 border-l border-gray-100">
                  <p className="text-xs text-gray-500">₺1M / 10 yıl</p>
                  <p className="text-sm font-black text-blue-600">₺{fmt(calcPayment(1000000, r.monthly, 120))}/ay</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Trend chart */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-2">2024 Yıllık Faiz Trendi</h2>
          <p className="text-sm text-gray-500 mb-5">Ziraat Bankası referans faiz oranı (aylık, %)</p>
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-end gap-1 h-32">
              {TREND_DATA.map(d => {
                const heightPct = (d.rate / maxRate) * 100;
                const isLast = d.month === TREND_DATA[TREND_DATA.length - 1].month;
                return (
                  <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                    <p className={`text-[8px] font-bold ${isLast ? 'text-[#00C49F]' : 'text-gray-400'}`}>%{d.rate}</p>
                    <div
                      className={`w-full rounded-t-md ${isLast ? 'bg-[#00C49F]' : 'bg-blue-200'}`}
                      style={{ height: `${heightPct.toFixed(0)}%` }}
                    />
                  </div>
                );
              })}
            </div>
            <div className="flex gap-1 mt-1">
              {TREND_DATA.map(d => (
                <div key={d.month} className="flex-1 text-center">
                  <p className="text-[7px] text-gray-400 leading-tight">{d.month.split(' ')[0]}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-4">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <TrendingDown size={13} className="text-[#00C49F]" />
                <span>Ara 2024 sonu itibarıyla düşüş eğilimi</span>
              </div>
            </div>
          </div>
        </section>

        {/* Example payments for different amounts */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-5">Farklı Tutarlarda Aylık Taksit (10 Yıl)</h2>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left p-3 font-bold text-gray-600">Kredi Tutarı</th>
                  {RATES_DATA.slice(0, 4).map(r => (
                    <th key={r.bank} className="text-right p-3 font-bold text-gray-600">{r.bank.split(' ')[0]}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[500000, 1000000, 2000000, 3000000, 5000000].map((amount, i) => (
                  <tr key={amount} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="p-3 font-black text-gray-800">₺{fmt(amount)}</td>
                    {RATES_DATA.slice(0, 4).map(r => (
                      <td key={r.bank} className="p-3 text-right font-semibold text-blue-600">
                        ₺{fmt(calcPayment(amount, r.monthly, 120))}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Tips */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Düşük Faiz Almak İçin İpuçları</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {TIPS.map((tip, i) => (
              <div key={i} className="flex items-start gap-3 bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                <TrendingDown size={13} className="text-[#00C49F] shrink-0 mt-0.5" />
                <p className="text-xs text-gray-600 leading-relaxed">{tip}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link href="/hesaplama" className="group bg-gradient-to-br from-[#00C49F] to-[#00a882] rounded-2xl p-5 hover:shadow-md transition-all flex flex-col gap-3">
              <Calculator size={20} className="text-white" />
              <div>
                <p className="text-sm font-bold text-white mb-1">Kredi Hesapla</p>
                <p className="text-xs text-white/70">Taksit ve toplam faiz</p>
              </div>
              <ArrowRight size={13} className="text-white/60 group-hover:text-white transition-colors mt-auto" />
            </Link>
            <Link href="/banka-kredileri" className="group bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-all flex flex-col gap-3">
              <Building2 size={20} className="text-blue-600" />
              <div>
                <p className="text-sm font-bold text-gray-900 mb-1">Banka Kredisi Karşılaştır</p>
                <p className="text-xs text-gray-500">8 banka detaylı karşılaştırma</p>
              </div>
              <ArrowRight size={13} className="text-gray-300 group-hover:text-gray-600 transition-colors mt-auto" />
            </Link>
            <Link href="/kredi-karsilastirma" className="group bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-all flex flex-col gap-3">
              <BarChart2 size={20} className="text-amber-600" />
              <div>
                <p className="text-sm font-bold text-gray-900 mb-1">4 Senaryo Karşılaştır</p>
                <p className="text-xs text-gray-500">Yan yana kredi analizi</p>
              </div>
              <ArrowRight size={13} className="text-gray-300 group-hover:text-gray-600 transition-colors mt-auto" />
            </Link>
          </div>
        </section>

      </div>
    </main>
  );
}
