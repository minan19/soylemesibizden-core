'use client';

import { useState, useMemo } from 'react';
import { Receipt, ChevronDown, Info, CheckCircle2 } from 'lucide-react';

// 2024 income tax brackets (Turkey)
const BRACKETS_2024 = [
  { limit: 110_000, rate: 0.15 },
  { limit: 230_000, rate: 0.20 },
  { limit: 870_000, rate: 0.27 },
  { limit: 3_000_000, rate: 0.35 },
  { limit: Infinity, rate: 0.40 },
];

// 2024 rental income exemption for residential properties
const ISTISNA_2024 = 33_000;

// Götürü (lump sum) expense deduction rate
const GOTURU_RATE = 0.15;

function calcTax(taxableIncome: number): number {
  if (taxableIncome <= 0) return 0;
  let prev = 0;
  let tax = 0;
  for (const b of BRACKETS_2024) {
    if (taxableIncome <= prev) break;
    const slice = Math.min(taxableIncome - prev, b.limit - prev);
    tax += slice * b.rate;
    prev = b.limit;
    if (b.limit === Infinity) break;
  }
  return tax;
}

function fmt(n: number) {
  return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(n);
}

function fmtPct(n: number) {
  return n.toFixed(1) + '%';
}

const QUICK_RENTS = [10_000, 20_000, 30_000, 50_000, 75_000];

export default function KiraVergisiClient() {
  const [monthlyRent, setMonthlyRent] = useState(20_000);
  const [method, setMethod] = useState<'goturu' | 'gercek'>('goturu');
  const [actualExpenses, setActualExpenses] = useState(30_000);
  const [isFirstHome, setIsFirstHome] = useState(true);
  const [hasOtherIncome, setHasOtherIncome] = useState(false);
  const [otherIncome, setOtherIncome] = useState(500_000);

  const result = useMemo(() => {
    const annualRent = monthlyRent * 12;

    // Apply residential exemption for first home if conditions met
    const istisna = isFirstHome ? Math.min(ISTISNA_2024, annualRent) : 0;
    const afterIstisna = annualRent - istisna;

    // Expense deduction
    let expenseDeduction = 0;
    if (method === 'goturu') {
      expenseDeduction = afterIstisna * GOTURU_RATE;
    } else {
      expenseDeduction = actualExpenses;
    }

    const taxableRent = Math.max(afterIstisna - expenseDeduction, 0);

    // Add other income for progressive bracket calculation
    const totalTaxable = taxableRent + (hasOtherIncome ? otherIncome : 0);
    const taxOnTotal = calcTax(totalTaxable);
    const taxOnOther = hasOtherIncome ? calcTax(otherIncome) : 0;
    const taxOnRent = taxOnTotal - taxOnOther;

    const effectiveRate = taxableRent > 0 ? (taxOnRent / taxableRent) * 100 : 0;
    const netRent = annualRent - taxOnRent;
    const monthlyNet = netRent / 12;

    return {
      annualRent,
      istisna,
      afterIstisna,
      expenseDeduction,
      taxableRent,
      taxOnRent: Math.max(taxOnRent, 0),
      effectiveRate: Math.max(effectiveRate, 0),
      netRent: Math.max(netRent, 0),
      monthlyNet,
    };
  }, [monthlyRent, method, actualExpenses, isFirstHome, hasOtherIncome, otherIncome]);

  return (
    <div className="space-y-6">
      {/* Inputs */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h2 className="text-sm font-black text-gray-900 mb-5 flex items-center gap-2">
          <Receipt size={15} className="text-[#00C49F]" /> Kira Bilgileri
        </h2>

        {/* Monthly rent */}
        <div className="mb-5">
          <label className="block text-xs font-bold text-gray-700 mb-1">Aylık Kira Geliri (₺)</label>
          <input
            type="number"
            value={monthlyRent}
            onChange={e => setMonthlyRent(Math.max(1000, Number(e.target.value)))}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-bold text-gray-800 focus:outline-none focus:border-[#00C49F] focus:ring-2 focus:ring-[#00C49F]/10 mb-2"
          />
          <div className="flex flex-wrap gap-1.5">
            {QUICK_RENTS.map(r => (
              <button
                key={r}
                onClick={() => setMonthlyRent(r)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${monthlyRent === r ? 'bg-[#00C49F] text-white' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
              >
                ₺{r.toLocaleString('tr-TR')}
              </button>
            ))}
          </div>
          <p className="text-[10px] text-gray-400 mt-1.5">Yıllık gelir: {fmt(monthlyRent * 12)}</p>
        </div>

        {/* Method */}
        <div className="mb-5">
          <label className="block text-xs font-bold text-gray-700 mb-2">Gider Yöntemi</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setMethod('goturu')}
              className={`px-4 py-3 rounded-xl border text-left transition-all ${method === 'goturu' ? 'border-[#00C49F] bg-[#F0FDF8]' : 'border-gray-200 hover:border-gray-300'}`}
            >
              <p className="text-xs font-bold text-gray-800">Götürü Gider (%15)</p>
              <p className="text-[10px] text-gray-500 mt-0.5">Belge gerekmez</p>
            </button>
            <button
              onClick={() => setMethod('gercek')}
              className={`px-4 py-3 rounded-xl border text-left transition-all ${method === 'gercek' ? 'border-[#00C49F] bg-[#F0FDF8]' : 'border-gray-200 hover:border-gray-300'}`}
            >
              <p className="text-xs font-bold text-gray-800">Gerçek Gider</p>
              <p className="text-[10px] text-gray-500 mt-0.5">Belge/fatura ile</p>
            </button>
          </div>
        </div>

        {/* Real expenses input */}
        {method === 'gercek' && (
          <div className="mb-5">
            <label className="block text-xs font-bold text-gray-700 mb-1">Yıllık Giderler (₺)</label>
            <input
              type="number"
              value={actualExpenses}
              onChange={e => setActualExpenses(Math.max(0, Number(e.target.value)))}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-bold text-gray-800 focus:outline-none focus:border-[#00C49F] focus:ring-2 focus:ring-[#00C49F]/10"
            />
            <p className="text-[10px] text-gray-400 mt-1">Aidat, bakım, sigorta, kredi faizi, amortisman vb.</p>
          </div>
        )}

        {/* Toggles */}
        <div className="space-y-3">
          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <p className="text-xs font-bold text-gray-700">Mesken istisnası uygula</p>
              <p className="text-[10px] text-gray-400">2024: ₺33.000 konut kira geliri istisnası</p>
            </div>
            <button
              onClick={() => setIsFirstHome(p => !p)}
              className={`relative w-10 h-5 rounded-full transition-colors ${isFirstHome ? 'bg-[#00C49F]' : 'bg-gray-200'}`}
            >
              <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${isFirstHome ? 'translate-x-5' : ''}`} />
            </button>
          </label>
          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <p className="text-xs font-bold text-gray-700">Başka gelir var mı?</p>
              <p className="text-[10px] text-gray-400">Maaş, serbest meslek vb. — dilim etkisi için</p>
            </div>
            <button
              onClick={() => setHasOtherIncome(p => !p)}
              className={`relative w-10 h-5 rounded-full transition-colors ${hasOtherIncome ? 'bg-[#00C49F]' : 'bg-gray-200'}`}
            >
              <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${hasOtherIncome ? 'translate-x-5' : ''}`} />
            </button>
          </label>
          {hasOtherIncome && (
            <div className="ml-0">
              <label className="block text-xs font-bold text-gray-700 mb-1">Diğer Yıllık Gelir (₺)</label>
              <input
                type="number"
                value={otherIncome}
                onChange={e => setOtherIncome(Math.max(0, Number(e.target.value)))}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-bold text-gray-800 focus:outline-none focus:border-[#00C49F] focus:ring-2 focus:ring-[#00C49F]/10"
              />
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="bg-gradient-to-br from-[#00C49F] to-[#009e80] rounded-2xl p-6 text-white">
        <h2 className="text-sm font-black mb-5 opacity-80">Hesaplama Sonucu (2024)</h2>
        <div className="grid grid-cols-2 gap-4 mb-5">
          <div>
            <p className="text-xs opacity-70 mb-1">Ödenecek Vergi</p>
            <p className="text-3xl font-black">{fmt(result.taxOnRent)}</p>
            <p className="text-xs opacity-60 mt-0.5">Efektif oran: {fmtPct(result.effectiveRate)}</p>
          </div>
          <div>
            <p className="text-xs opacity-70 mb-1">Net Aylık Gelir</p>
            <p className="text-3xl font-black">{fmt(result.monthlyNet)}</p>
            <p className="text-xs opacity-60 mt-0.5">Yıllık net: {fmt(result.netRent)}</p>
          </div>
        </div>

        {/* Breakdown */}
        <div className="bg-white/10 rounded-xl p-4 space-y-2 text-xs border border-white/20">
          <div className="flex justify-between">
            <span className="opacity-70">Yıllık brüt kira</span>
            <span className="font-bold">{fmt(result.annualRent)}</span>
          </div>
          {result.istisna > 0 && (
            <div className="flex justify-between">
              <span className="opacity-70">Mesken istisnası</span>
              <span className="font-bold text-green-300">−{fmt(result.istisna)}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="opacity-70">Gider indirimi ({method === 'goturu' ? '%15 götürü' : 'gerçek'})</span>
            <span className="font-bold text-green-300">−{fmt(result.expenseDeduction)}</span>
          </div>
          <div className="flex justify-between border-t border-white/20 pt-2">
            <span className="opacity-70">Vergiye tabi gelir</span>
            <span className="font-bold">{fmt(result.taxableRent)}</span>
          </div>
          <div className="flex justify-between">
            <span className="opacity-70">Gelir vergisi</span>
            <span className="font-black text-yellow-300">{fmt(result.taxOnRent)}</span>
          </div>
        </div>
      </div>

      {/* Tax brackets reference */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h3 className="text-sm font-black text-gray-900 mb-4">2024 Gelir Vergisi Dilimleri</h3>
        <div className="space-y-2">
          {[
            { range: '0 – ₺110.000', rate: '%15', active: result.taxableRent > 0 },
            { range: '₺110.001 – ₺230.000', rate: '%20', active: result.taxableRent > 110_000 },
            { range: '₺230.001 – ₺870.000', rate: '%27', active: result.taxableRent > 230_000 },
            { range: '₺870.001 – ₺3.000.000', rate: '%35', active: result.taxableRent > 870_000 },
            { range: '₺3.000.001 ve üzeri', rate: '%40', active: result.taxableRent > 3_000_000 },
          ].map(b => (
            <div
              key={b.range}
              className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs ${b.active ? 'bg-[#F0FDF8] border border-[#00C49F]/20' : 'bg-gray-50'}`}
            >
              <div className="flex items-center gap-2">
                {b.active && <CheckCircle2 size={12} className="text-[#00C49F]" />}
                <span className={b.active ? 'font-bold text-gray-800' : 'text-gray-400'}>{b.range}</span>
              </div>
              <span className={`font-black ${b.active ? 'text-[#00C49F]' : 'text-gray-400'}`}>{b.rate}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-2xl p-4">
        <Info size={14} className="text-amber-500 shrink-0 mt-0.5" />
        <p className="text-xs text-amber-700 leading-relaxed">
          Bu hesaplama 2024 yılı için gösterge niteliğindedir. Gerçek vergi, Gelir Vergisi Kanunu hükümleri,
          GİB güncellemeleri ve bireysel koşullarınıza göre farklılık gösterebilir. Kesin hesap için
          mali müşavir veya GİB&apos;e başvurun.
        </p>
      </div>
    </div>
  );
}
