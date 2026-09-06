'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Calculator, TrendingUp, ArrowRight, CheckCircle, AlertTriangle, Info } from 'lucide-react';

const fmt = (n: number) => n.toLocaleString('tr-TR');

const INTEREST_RATE = 3.5; // monthly % (≈ 42% annual)
const MAX_DTI = 0.40; // debt-to-income: max 40% of net income for total debt
const TAPU_RATE = 0.04;
const DASK_FIXED = 1500;
const NOTARY_FIXED = 3000;

function calcMonthlyPayment(principal: number, monthlyRate: number, months: number) {
  if (monthlyRate === 0) return principal / months;
  return (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
}

export default function ButcePlanlayiciClient() {
  const [netIncome, setNetIncome] = useState(50000);
  const [otherDebt, setOtherDebt] = useState(0);
  const [savings, setSavings] = useState(500000);
  const [loanMonths, setLoanMonths] = useState(120);
  const [annualRate, setAnnualRate] = useState(INTEREST_RATE);
  const [downPct, setDownPct] = useState(20);

  const result = useMemo(() => {
    const monthlyRate = annualRate / 100 / 12;
    const maxDebtPayment = netIncome * MAX_DTI - otherDebt;
    if (maxDebtPayment <= 0) return null;

    // Max loan from income
    const maxLoanByIncome =
      maxDebtPayment * (Math.pow(1 + monthlyRate, loanMonths) - 1) /
      (monthlyRate * Math.pow(1 + monthlyRate, loanMonths));

    // Closing costs from savings
    const estimatedPrice = savings / (downPct / 100) * 1.1; // rough estimate
    const closingCosts = estimatedPrice * TAPU_RATE + DASK_FIXED + NOTARY_FIXED;
    const availableForDown = Math.max(0, savings - closingCosts);

    // Max price from savings
    const maxPriceBySavings = availableForDown / (downPct / 100);

    // Loan from savings-based price
    const loanFromSavings = maxPriceBySavings * (1 - downPct / 100);
    const paymentForLoan = calcMonthlyPayment(loanFromSavings, monthlyRate, loanMonths);

    // Determine binding constraint
    const byIncome = maxLoanByIncome + availableForDown;
    const bySavings = maxPriceBySavings;
    const maxPrice = Math.min(byIncome, bySavings);

    const actualLoan = maxPrice * (1 - downPct / 100);
    const actualDown = maxPrice * (downPct / 100);
    const actualPayment = calcMonthlyPayment(actualLoan, monthlyRate, loanMonths);
    const actualClosing = maxPrice * TAPU_RATE + DASK_FIXED + NOTARY_FIXED;
    const totalCash = actualDown + actualClosing;
    const totalInterest = actualPayment * loanMonths - actualLoan;
    const dti = (actualPayment + otherDebt) / netIncome;

    const incomeConstrained = byIncome < bySavings;

    return {
      maxPrice,
      actualDown,
      actualLoan,
      actualPayment,
      actualClosing,
      totalCash,
      totalInterest,
      dti,
      incomeConstrained,
      paymentForLoan,
      savingsOk: totalCash <= savings,
    };
  }, [netIncome, otherDebt, savings, loanMonths, annualRate, downPct]);

  const monthsLabel = loanMonths === 60 ? '5 yıl' : loanMonths === 120 ? '10 yıl' : loanMonths === 180 ? '15 yıl' : loanMonths === 240 ? '20 yıl' : `${loanMonths} ay`;

  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-4">
            <Calculator size={13} /> Bütçe Planlayıcı
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">Ne Kadar Ev Alabilirim?</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            Geliriniz, birikimleriniz ve kredi vadesi girilerek alabileceğiniz maksimum konut fiyatı,
            aylık taksit ve toplam maliyet hesaplanır.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* Inputs */}
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm space-y-5">
              <h2 className="text-sm font-black text-gray-900">Bilgilerinizi Girin</h2>

              {/* Net income */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Aylık Net Gelir
                  <span className="ml-2 font-normal text-gray-400">₺{fmt(netIncome)}</span>
                </label>
                <input
                  type="range"
                  min={10000} max={500000} step={5000}
                  value={netIncome}
                  onChange={e => setNetIncome(Number(e.target.value))}
                  className="w-full accent-[#00C49F]"
                />
                <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                  <span>₺10.000</span><span>₺500.000</span>
                </div>
              </div>

              {/* Other debt */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Mevcut Diğer Kredi Ödemesi
                  <span className="ml-2 font-normal text-gray-400">₺{fmt(otherDebt)}/ay</span>
                </label>
                <input
                  type="range"
                  min={0} max={30000} step={500}
                  value={otherDebt}
                  onChange={e => setOtherDebt(Number(e.target.value))}
                  className="w-full accent-[#00C49F]"
                />
                <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                  <span>₺0</span><span>₺30.000</span>
                </div>
              </div>

              {/* Savings */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Toplam Birikimim
                  <span className="ml-2 font-normal text-gray-400">₺{fmt(savings)}</span>
                </label>
                <input
                  type="range"
                  min={50000} max={5000000} step={50000}
                  value={savings}
                  onChange={e => setSavings(Number(e.target.value))}
                  className="w-full accent-[#00C49F]"
                />
                <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                  <span>₺50.000</span><span>₺5.000.000</span>
                </div>
              </div>

              {/* Down payment pct */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Peşinat Oranı
                  <span className="ml-2 font-normal text-gray-400">%{downPct}</span>
                </label>
                <input
                  type="range"
                  min={10} max={50} step={5}
                  value={downPct}
                  onChange={e => setDownPct(Number(e.target.value))}
                  className="w-full accent-[#00C49F]"
                />
                <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                  <span>%10 (min)</span><span>%50</span>
                </div>
              </div>

              {/* Loan months */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">Kredi Vadesi</label>
                <div className="grid grid-cols-4 gap-1">
                  {[60, 120, 180, 240].map(m => (
                    <button
                      key={m}
                      onClick={() => setLoanMonths(m)}
                      className={`text-xs py-1.5 rounded-lg font-bold transition-all ${loanMonths === m ? 'bg-[#00C49F] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    >
                      {m / 12}y
                    </button>
                  ))}
                </div>
              </div>

              {/* Rate */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Aylık Faiz Oranı
                  <span className="ml-2 font-normal text-gray-400">%{annualRate} / ay ({(annualRate * 12).toFixed(1)}% yıllık)</span>
                </label>
                <input
                  type="range"
                  min={1} max={6} step={0.1}
                  value={annualRate}
                  onChange={e => setAnnualRate(Number(e.target.value))}
                  className="w-full accent-[#00C49F]"
                />
                <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                  <span>%1/ay</span><span>%6/ay</span>
                </div>
              </div>
            </div>
          </div>

          {/* Result */}
          <div className="lg:col-span-3 space-y-4">
            {result ? (
              <>
                {/* Max price */}
                <div className="bg-gradient-to-br from-[#00C49F] to-[#00a882] rounded-2xl p-6 text-white">
                  <p className="text-xs text-white/70 mb-1">Alabileceğiniz Maksimum Konut Fiyatı</p>
                  <p className="text-4xl font-black mb-3">₺{fmt(Math.round(result.maxPrice))}</p>
                  <div className="flex items-center gap-2">
                    {result.incomeConstrained
                      ? <><AlertTriangle size={13} /><span className="text-xs text-white/80">Gelir kısıtı belirleyici</span></>
                      : <><CheckCircle size={13} /><span className="text-xs text-white/80">Birikim kısıtı belirleyici</span></>
                    }
                  </div>
                </div>

                {/* Key metrics */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Aylık Taksit', value: `₺${fmt(Math.round(result.actualPayment))}`, color: 'text-gray-900' },
                    { label: 'Peşinat', value: `₺${fmt(Math.round(result.actualDown))}`, color: 'text-gray-900' },
                    { label: 'Kredi Tutarı', value: `₺${fmt(Math.round(result.actualLoan))}`, color: 'text-blue-600' },
                    { label: 'Tapu + DASK + Noter', value: `₺${fmt(Math.round(result.actualClosing))}`, color: 'text-amber-600' },
                  ].map(m => (
                    <div key={m.label} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                      <p className="text-[10px] text-gray-400 mb-1">{m.label}</p>
                      <p className={`text-lg font-black ${m.color}`}>{m.value}</p>
                    </div>
                  ))}
                </div>

                {/* Cash needed */}
                <div className={`rounded-xl border p-4 ${result.savingsOk ? 'bg-[#F0FDF8] border-[#00C49F]/20' : 'bg-rose-50 border-rose-200'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-gray-700">Gereken Toplam Nakit</span>
                    <span className={`text-sm font-black ${result.savingsOk ? 'text-[#00C49F]' : 'text-rose-600'}`}>
                      ₺{fmt(Math.round(result.totalCash))}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-gray-500">Birikimleriniz</span>
                    <span className="text-xs font-semibold text-gray-700">₺{fmt(savings)}</span>
                  </div>
                  {result.savingsOk
                    ? <div className="flex items-center gap-2 text-xs text-[#00C49F] font-semibold">
                        <CheckCircle size={12} /> Birikimleriniz yeterli
                      </div>
                    : <div className="flex items-center gap-2 text-xs text-rose-600 font-semibold">
                        <AlertTriangle size={12} /> Eksik: ₺{fmt(Math.round(result.totalCash - savings))} — peşinat oranını düşürün
                      </div>
                  }
                </div>

                {/* DTI bar */}
                <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-gray-700">Borç/Gelir Oranı (DTI)</span>
                    <span className={`text-sm font-black ${result.dti <= 0.35 ? 'text-[#00C49F]' : result.dti <= 0.40 ? 'text-amber-500' : 'text-rose-600'}`}>
                      %{(result.dti * 100).toFixed(0)}
                    </span>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${result.dti <= 0.35 ? 'bg-[#00C49F]' : result.dti <= 0.40 ? 'bg-amber-400' : 'bg-rose-500'}`}
                      style={{ width: `${Math.min(100, result.dti * 100 / 0.5 * 100).toFixed(0)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                    <span>%0</span>
                    <span className="text-amber-500">%40 maks.</span>
                    <span>%50+</span>
                  </div>
                </div>

                {/* Total cost summary */}
                <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                  <h3 className="text-xs font-bold text-gray-900 mb-3">Toplam Maliyet Özeti</h3>
                  <div className="space-y-2">
                    {[
                      { label: 'Konut fiyatı', value: fmt(Math.round(result.maxPrice)), color: 'text-gray-900' },
                      { label: `Kredi faizi (${monthsLabel})`, value: fmt(Math.round(result.totalInterest)), color: 'text-rose-600' },
                      { label: 'Tapu harcı + DASK + noter', value: fmt(Math.round(result.actualClosing)), color: 'text-amber-600' },
                    ].map(r => (
                      <div key={r.label} className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">{r.label}</span>
                        <span className={`text-xs font-bold ${r.color}`}>₺{r.value}</span>
                      </div>
                    ))}
                    <div className="border-t border-gray-100 pt-2 flex justify-between items-center">
                      <span className="text-xs font-bold text-gray-900">Gerçek Toplam Maliyet</span>
                      <span className="text-sm font-black text-gray-900">
                        ₺{fmt(Math.round(result.maxPrice + result.totalInterest + result.actualClosing))}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Tips */}
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <div className="flex items-start gap-2">
                    <Info size={14} className="text-amber-600 shrink-0 mt-0.5" />
                    <div className="text-xs text-amber-800 space-y-1">
                      <p className="font-bold mb-1">Hesaplama Hakkında</p>
                      <p>• Bankalar genellikle taksiti net gelirin %40&apos;ını geçirmiyor.</p>
                      <p>• Min. %10 peşinat zorunludur; %20 peşinatta uygun faiz verilir.</p>
                      <p>• Kapatma maliyetleri tahminidir; değerleme raporu (~₺5.000) dahil değildir.</p>
                      <p>• Faiz oranı bankalara göre değişir; güncel oran için bankanızla görüşün.</p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-rose-50 border border-rose-200 rounded-2xl p-6 text-center">
                <AlertTriangle size={28} className="text-rose-500 mx-auto mb-3" />
                <p className="text-sm font-bold text-rose-800">Mevcut borç yüküyle kredi almak mümkün değil.</p>
                <p className="text-xs text-rose-600 mt-1">Diğer kredi ödemelerini azaltın veya gelirinizi artırın.</p>
              </div>
            )}

            {/* CTA links */}
            <div className="grid grid-cols-2 gap-3">
              <Link href="/hesaplama" className="group bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition-all flex items-center gap-3">
                <Calculator size={16} className="text-[#00C49F]" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-gray-900">Konut Kredisi</p>
                  <p className="text-[10px] text-gray-400">Detaylı hesaplama</p>
                </div>
                <ArrowRight size={12} className="text-gray-300 group-hover:text-gray-600 transition-colors shrink-0" />
              </Link>
              <Link href="/pesinat-plani" className="group bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition-all flex items-center gap-3">
                <TrendingUp size={16} className="text-blue-600" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-gray-900">Peşinat Planla</p>
                  <p className="text-[10px] text-gray-400">Ne zaman hazır olursunuz?</p>
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
