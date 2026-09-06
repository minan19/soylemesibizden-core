'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Calculator, TrendingDown, ArrowRight, Info, RefreshCw } from 'lucide-react';

const fmt = (n: number) =>
  n.toLocaleString('tr-TR', { minimumFractionDigits: 0, maximumFractionDigits: 0 });

function calcMonthly(principal: number, annualRate: number, months: number): number {
  if (annualRate === 0) return principal / months;
  const r = annualRate / 100 / 12;
  return (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
}

function buildSchedule(
  principal: number,
  annualRate: number,
  months: number,
  extraMonthly: number,
): { month: number; payment: number; interest: number; principalPaid: number; balance: number }[] {
  const r = annualRate / 100 / 12;
  const base = calcMonthly(principal, annualRate, months);
  const rows = [];
  let balance = principal;
  let m = 0;
  while (balance > 0.5 && m < months) {
    m++;
    const interest = balance * r;
    const principalPaid = Math.min(base - interest + extraMonthly, balance);
    const payment = interest + principalPaid;
    balance = Math.max(0, balance - principalPaid);
    rows.push({ month: m, payment, interest, principalPaid, balance });
  }
  return rows;
}

export default function MortgageSimulatorClient() {
  const [loanAmount, setLoanAmount] = useState(2000000);
  const [annualRate, setAnnualRate] = useState(2.5);
  const [termYears, setTermYears] = useState(120);
  const [extraMonthly, setExtraMonthly] = useState(0);
  const [refiRate, setRefiRate] = useState(2.0);
  const [refiMonth, setRefiMonth] = useState(24);
  const [tab, setTab] = useState<'summary' | 'schedule' | 'refi'>('summary');

  const schedule = useMemo(
    () => buildSchedule(loanAmount, annualRate, termYears, extraMonthly),
    [loanAmount, annualRate, termYears, extraMonthly],
  );

  const baseSchedule = useMemo(
    () => buildSchedule(loanAmount, annualRate, termYears, 0),
    [loanAmount, annualRate, termYears],
  );

  const baseMonthly = useMemo(() => calcMonthly(loanAmount, annualRate, termYears), [loanAmount, annualRate, termYears]);

  const totalPaid = schedule.reduce((s, r) => s + r.payment, 0);
  const totalInterest = totalPaid - loanAmount;
  const baseTotalInterest = baseSchedule.reduce((s, r) => s + r.interest, 0);
  const interestSaved = baseTotalInterest - totalInterest;
  const monthsSaved = baseSchedule.length - schedule.length;

  // Refinansman analizi
  const refiSchedule = useMemo(() => {
    if (refiMonth >= schedule.length) return [];
    const balanceAtRefi = schedule[refiMonth - 1]?.balance ?? 0;
    const remainingMonths = termYears - refiMonth;
    return buildSchedule(balanceAtRefi, refiRate, remainingMonths, 0);
  }, [schedule, refiMonth, refiRate, termYears]);

  const refiNewMonthly = useMemo(() => {
    if (refiMonth >= schedule.length) return 0;
    const balanceAtRefi = schedule[refiMonth - 1]?.balance ?? 0;
    return calcMonthly(balanceAtRefi, refiRate, termYears - refiMonth);
  }, [schedule, refiMonth, refiRate, termYears]);

  const refiTotalInterest = refiSchedule.reduce((s, r) => s + r.interest, 0);
  const origRemainingInterest = schedule.slice(refiMonth).reduce((s, r) => s + r.interest, 0);
  const refiSaving = origRemainingInterest - refiTotalInterest;

  const TABS = [
    { id: 'summary', label: 'Özet' },
    { id: 'schedule', label: 'Ödeme Planı' },
    { id: 'refi', label: 'Refinansman' },
  ] as const;

  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-5xl mx-auto px-6 py-14">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-4">
            <Calculator size={13} /> Hesaplama Aracı
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">Gelişmiş Mortgage Simülatörü</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            Erken ödeme tasarrufu, refinansman analizi ve tam ödeme planı. Birden fazla senaryoyu karşılaştırın.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Inputs */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm space-y-5">
              <h2 className="text-sm font-black text-gray-900">Kredi Bilgileri</h2>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Kredi Tutarı <span className="font-normal text-gray-400">₺{fmt(loanAmount)}</span>
                </label>
                <input type="range" min={250000} max={10000000} step={50000} value={loanAmount}
                  onChange={e => setLoanAmount(Number(e.target.value))} className="w-full accent-[#00C49F]" />
                <div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>250K</span><span>10M</span></div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Yıllık Faiz Oranı <span className="font-normal text-gray-400">%{annualRate.toFixed(2)}/ay</span>
                </label>
                <input type="range" min={0.5} max={5} step={0.05} value={annualRate}
                  onChange={e => setAnnualRate(Number(e.target.value))} className="w-full accent-[#00C49F]" />
                <div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>%0.50</span><span>%5.00</span></div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">Vade (Ay)</label>
                <div className="grid grid-cols-4 gap-1">
                  {[60, 120, 180, 240].map(m => (
                    <button key={m} onClick={() => setTermYears(m)}
                      className={`text-xs py-1.5 rounded-lg font-bold transition-all ${termYears === m ? 'bg-[#00C49F] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Ekstra Aylık Ödeme <span className="font-normal text-gray-400">₺{fmt(extraMonthly)}</span>
                </label>
                <input type="range" min={0} max={50000} step={500} value={extraMonthly}
                  onChange={e => setExtraMonthly(Number(e.target.value))} className="w-full accent-[#00C49F]" />
                <div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>0</span><span>₺50K/ay</span></div>
              </div>
            </div>

            <div className="flex items-start gap-2 bg-blue-50 border border-blue-200 rounded-xl p-3">
              <Info size={12} className="text-blue-500 shrink-0 mt-0.5" />
              <p className="text-[10px] text-blue-700 leading-relaxed">Ekstra ödeme anapara üzerinden düşülür; hem vade kısalır hem toplam faiz azalır.</p>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-2 space-y-4">

            {/* Tabs */}
            <div className="flex gap-1 bg-gray-100 p-1 rounded-xl">
              {TABS.map(t => (
                <button key={t.id} onClick={() => setTab(t.id)}
                  className={`flex-1 text-xs font-bold py-2 rounded-lg transition-all ${tab === t.id ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                  {t.label}
                </button>
              ))}
            </div>

            {tab === 'summary' && (
              <div className="space-y-3">
                <div className="bg-gradient-to-br from-[#00C49F] to-[#00a882] rounded-2xl p-5 text-white">
                  <p className="text-xs text-white/70 mb-1">Aylık Taksit</p>
                  <p className="text-4xl font-black mb-1">₺{fmt(Math.round(baseMonthly + extraMonthly))}</p>
                  <p className="text-xs text-white/70">Standart: ₺{fmt(Math.round(baseMonthly))} + Ekstra: ₺{fmt(extraMonthly)}</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                    <p className="text-[10px] text-gray-400 mb-1">Toplam Geri Ödeme</p>
                    <p className="text-xl font-black text-gray-900">₺{fmt(Math.round(totalPaid))}</p>
                  </div>
                  <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                    <p className="text-[10px] text-gray-400 mb-1">Toplam Faiz</p>
                    <p className="text-xl font-black text-rose-600">₺{fmt(Math.round(totalInterest))}</p>
                  </div>
                  <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                    <p className="text-[10px] text-gray-400 mb-1">Gerçek Vade</p>
                    <p className="text-xl font-black text-[#00C49F]">{schedule.length} ay</p>
                    {monthsSaved > 0 && <p className="text-[10px] text-gray-400">{monthsSaved} ay kısaldı</p>}
                  </div>
                  <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                    <p className="text-[10px] text-gray-400 mb-1">Faiz Tasarrufu</p>
                    <p className="text-xl font-black text-[#00C49F]">₺{fmt(Math.round(Math.max(0, interestSaved)))}</p>
                  </div>
                </div>

                {/* Faiz vs Anapara bar */}
                <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                  <h3 className="text-xs font-black text-gray-900 mb-3">Ödeme Dağılımı</h3>
                  <div className="flex h-5 rounded-full overflow-hidden">
                    <div className="bg-[#00C49F]" style={{ width: `${(loanAmount / totalPaid * 100).toFixed(1)}%` }} />
                    <div className="bg-rose-400 flex-1" />
                  </div>
                  <div className="flex justify-between text-[10px] mt-2">
                    <span className="text-[#00C49F] font-bold">Anapara %{(loanAmount / totalPaid * 100).toFixed(0)}</span>
                    <span className="text-rose-500 font-bold">Faiz %{(totalInterest / totalPaid * 100).toFixed(0)}</span>
                  </div>
                </div>
              </div>
            )}

            {tab === 'schedule' && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto max-h-[480px] overflow-y-auto">
                  <table className="w-full text-[10px]">
                    <thead className="bg-gray-50 border-b border-gray-100 sticky top-0">
                      <tr>
                        <th className="text-left px-3 py-2 font-black text-gray-700">Ay</th>
                        <th className="text-right px-3 py-2 font-black text-gray-700">Taksit</th>
                        <th className="text-right px-3 py-2 font-black text-gray-700">Faiz</th>
                        <th className="text-right px-3 py-2 font-black text-gray-700">Anapara</th>
                        <th className="text-right px-3 py-2 font-black text-gray-700">Kalan</th>
                      </tr>
                    </thead>
                    <tbody>
                      {schedule.filter((_, i) => i % 3 === 0 || i === schedule.length - 1).map((r) => (
                        <tr key={r.month} className={r.month % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="px-3 py-2 text-gray-600">{r.month}</td>
                          <td className="px-3 py-2 text-right font-bold text-gray-800">₺{fmt(Math.round(r.payment))}</td>
                          <td className="px-3 py-2 text-right text-rose-500">₺{fmt(Math.round(r.interest))}</td>
                          <td className="px-3 py-2 text-right text-[#00C49F]">₺{fmt(Math.round(r.principalPaid))}</td>
                          <td className="px-3 py-2 text-right text-gray-600">₺{fmt(Math.round(r.balance))}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-[10px] text-gray-400 px-3 py-2 border-t border-gray-100">Her 3. ay gösterilmektedir. Toplam {schedule.length} ay.</p>
              </div>
            )}

            {tab === 'refi' && (
              <div className="space-y-4">
                <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm space-y-4">
                  <h3 className="text-sm font-black text-gray-900 flex items-center gap-2">
                    <RefreshCw size={14} className="text-[#00C49F]" /> Refinansman Analizi
                  </h3>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Refinansman Ayı <span className="font-normal text-gray-400">{refiMonth}. ay</span>
                    </label>
                    <input type="range" min={6} max={Math.min(termYears - 12, 84)} step={6} value={refiMonth}
                      onChange={e => setRefiMonth(Number(e.target.value))} className="w-full accent-[#00C49F]" />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Yeni Faiz Oranı <span className="font-normal text-gray-400">%{refiRate.toFixed(2)}/ay</span>
                    </label>
                    <input type="range" min={0.5} max={5} step={0.05} value={refiRate}
                      onChange={e => setRefiRate(Number(e.target.value))} className="w-full accent-[#00C49F]" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                    <p className="text-[10px] text-gray-400 mb-1">Yeni Taksit</p>
                    <p className="text-xl font-black text-[#00C49F]">₺{fmt(Math.round(refiNewMonthly))}</p>
                    <p className="text-[10px] text-gray-400">Eski: ₺{fmt(Math.round(baseMonthly))}</p>
                  </div>
                  <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                    <p className="text-[10px] text-gray-400 mb-1">Faiz Tasarrufu</p>
                    <p className={`text-xl font-black ${refiSaving > 0 ? 'text-[#00C49F]' : 'text-rose-500'}`}>
                      {refiSaving > 0 ? '+' : ''}₺{fmt(Math.round(refiSaving))}
                    </p>
                  </div>
                  <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm col-span-2">
                    <p className="text-[10px] text-gray-400 mb-1">{refiMonth}. ayda kalan anapara</p>
                    <p className="text-xl font-black text-gray-900">
                      ₺{fmt(Math.round(schedule[Math.min(refiMonth - 1, schedule.length - 1)]?.balance ?? 0))}
                    </p>
                  </div>
                </div>

                {refiSaving > 0 ? (
                  <div className="flex items-start gap-3 bg-[#F0FDF8] border border-[#00C49F]/20 rounded-xl p-4">
                    <TrendingDown size={14} className="text-[#00C49F] shrink-0 mt-0.5" />
                    <p className="text-xs text-gray-700 leading-relaxed">
                      {refiMonth}. ayda refinansman yaparsanız toplam <span className="font-black text-[#00C49F]">₺{fmt(Math.round(refiSaving))}</span> faiz tasarrufu elde edersiniz. Yeni taksitiniz <span className="font-bold">₺{fmt(Math.round(refiNewMonthly))}</span> olacak.
                    </p>
                  </div>
                ) : (
                  <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
                    <RefreshCw size={14} className="text-amber-600 shrink-0 mt-0.5" />
                    <p className="text-xs text-amber-700 leading-relaxed">Mevcut faiz oranı seçilen yeni orandan daha avantajlı görünüyor. Refinansman maliyetlerini de hesaba katın.</p>
                  </div>
                )}
              </div>
            )}

            {/* CTAs */}
            <div className="grid grid-cols-2 gap-3">
              <Link href="/odeme-plani" className="group bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition-all flex items-center gap-3">
                <Calculator size={16} className="text-[#00C49F] shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-gray-900">Ödeme Planı</p>
                  <p className="text-[10px] text-gray-400">Ay ay anapara + faiz</p>
                </div>
                <ArrowRight size={12} className="text-gray-300 group-hover:text-gray-600 transition-colors shrink-0" />
              </Link>
              <Link href="/kredi-karsilastirma" className="group bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition-all flex items-center gap-3">
                <TrendingDown size={16} className="text-blue-600 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-gray-900">Kredi Karşılaştır</p>
                  <p className="text-[10px] text-gray-400">4 senaryo yan yana</p>
                </div>
                <ArrowRight size={12} className="text-gray-300 group-hover:text-gray-600 transition-colors shrink-0" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
