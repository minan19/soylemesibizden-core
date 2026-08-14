'use client';

import { useState, useMemo } from 'react';
import { Info, TrendingUp } from 'lucide-react';

function fmt(n: number) {
  return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(n);
}

// TÜİK 12-aylık TÜFE ortalamaları (yaklaşık — 2023-2024 verileri)
// Gerçek uygulamada TÜİK API'den çekilmeli
const TUFE_RATES: Record<string, number> = {
  '2024-01': 64.86, '2024-02': 67.07, '2024-03': 68.50, '2024-04': 69.80,
  '2024-05': 75.45, '2024-06': 71.60, '2024-07': 61.78, '2024-08': 52.00,
  '2024-09': 49.38, '2024-10': 48.58, '2024-11': 47.09, '2024-12': 44.38,
  '2023-01': 57.68, '2023-02': 55.18, '2023-03': 50.51, '2023-04': 43.68,
  '2023-05': 39.59, '2023-06': 38.21, '2023-07': 47.83, '2023-08': 58.94,
  '2023-09': 61.53, '2023-10': 61.36, '2023-11': 61.98, '2023-12': 64.77,
};

const MONTHS_TR = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
  'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];

export default function KiraArtisClient() {
  const [currentRent, setCurrentRent] = useState('');
  const [renewalYear, setRenewalYear] = useState(new Date().getFullYear().toString());
  const [renewalMonth, setRenewalMonth] = useState((new Date().getMonth() + 1).toString());
  const [cap25, setCap25] = useState(true); // %25 tavan (2022-2024 arası yasal düzenleme)
  const [yearsAhead, setYearsAhead] = useState('3');

  const result = useMemo(() => {
    const rent = parseFloat(currentRent) || 0;
    if (rent <= 0) return null;

    const year = parseInt(renewalYear) || 2024;
    const month = parseInt(renewalMonth) || 1;
    const ahead = parseInt(yearsAhead) || 3;

    // Find TÜFE rate for this month
    const key = `${year}-${String(month).padStart(2, '0')}`;
    const tufeRate = TUFE_RATES[key] ?? 44.38; // fallback to latest known
    const effectiveRate = cap25 ? Math.min(tufeRate, 25) : tufeRate;

    // Compute year-by-year progression
    const years = [];
    let r = rent;
    for (let y = 0; y < ahead; y++) {
      const y_rate = cap25 ? Math.min(tufeRate * Math.pow(0.9, y), 25) : tufeRate * Math.pow(0.9, y);
      const increase = r * y_rate / 100;
      const newRent = r + increase;
      const annualIncrease = increase * 12;
      years.push({
        yearNum: y + 1,
        rate: y_rate,
        increase,
        newRent,
        annualIncrease,
        totalPaid: newRent * 12,
      });
      r = newRent;
    }

    const newRent1 = rent * (1 + effectiveRate / 100);
    const monthlyIncrease = newRent1 - rent;

    return {
      tufeRate,
      effectiveRate,
      newRent1,
      monthlyIncrease,
      annualSavingVsMax: cap25 && tufeRate > 25 ? (tufeRate - 25) / 100 * rent * 12 : 0,
      years,
    };
  }, [currentRent, renewalYear, renewalMonth, cap25, yearsAhead]);

  const availableKeys = Object.keys(TUFE_RATES).sort().reverse();

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
        <div className="flex items-center gap-2 mb-1">
          <TrendingUp size={17} className="text-violet-500" />
          <h2 className="text-sm font-bold text-gray-900">Kira Artış Hesaplama</h2>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Mevcut Aylık Kira (₺)</label>
          <input
            type="text"
            value={currentRent}
            onChange={e => setCurrentRent(e.target.value)}
            placeholder="Örn: 25000"
            className="w-full px-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-violet-400 transition-colors font-mono"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {[10000, 15000, 20000, 25000, 35000, 50000].map(v => (
            <button
              key={v}
              onClick={() => setCurrentRent(v.toString())}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                currentRent === v.toString()
                  ? 'bg-violet-500 text-white border-violet-500'
                  : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-violet-300'
              }`}
            >
              ₺{(v / 1000).toFixed(0)}K
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Yenileme Yılı</label>
            <select
              value={renewalYear}
              onChange={e => setRenewalYear(e.target.value)}
              className="w-full px-3 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-violet-400 transition-colors"
            >
              {['2023', '2024', '2025'].map(y => <option key={y}>{y}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Yenileme Ayı</label>
            <select
              value={renewalMonth}
              onChange={e => setRenewalMonth(e.target.value)}
              className="w-full px-3 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-violet-400 transition-colors"
            >
              {MONTHS_TR.map((m, i) => <option key={i + 1} value={i + 1}>{m}</option>)}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Gelecek Projeksiyon (yıl)</label>
            <select
              value={yearsAhead}
              onChange={e => setYearsAhead(e.target.value)}
              className="w-full px-3 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-violet-400 transition-colors"
            >
              {['1', '2', '3', '5'].map(y => <option key={y}>{y}</option>)}
            </select>
          </div>
          <div className="flex items-center">
            <label className="flex items-center gap-2 cursor-pointer mt-4" onClick={() => setCap25(!cap25)}>
              <div className={`w-10 h-5 rounded-full relative transition-colors ${cap25 ? 'bg-violet-500' : 'bg-gray-200'}`}>
                <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${cap25 ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </div>
              <span className="text-xs font-semibold text-gray-700">%25 Tavan Uygula</span>
            </label>
          </div>
        </div>
      </div>

      {result ? (
        <div className="space-y-4">
          {/* Main result */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'TÜİK TÜFE (12 ay ort.)', value: `%${result.tufeRate.toFixed(2)}`, color: 'text-gray-900' },
              { label: 'Uygulanan Artış Oranı', value: `%${result.effectiveRate.toFixed(2)}`, color: 'text-violet-600' },
              { label: 'Yeni Kira (1. yıl)', value: fmt(result.newRent1), color: 'text-[#00C49F]' },
              { label: 'Aylık Artış Tutarı', value: fmt(result.monthlyIncrease), color: 'text-amber-600' },
            ].map(m => (
              <div key={m.label} className="bg-white rounded-2xl border border-gray-100 p-5 text-center">
                <p className={`text-xl font-black ${m.color}`}>{m.value}</p>
                <p className="text-xs text-gray-400 mt-1">{m.label}</p>
              </div>
            ))}
          </div>

          {cap25 && result.annualSavingVsMax > 0 && (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-4 flex gap-3">
              <TrendingUp size={16} className="text-green-600 shrink-0 mt-0.5" />
              <p className="text-xs text-green-700">
                <span className="font-bold">%25 tavan sayesinde yıllık tasarruf: {fmt(result.annualSavingVsMax)}</span><br />
                Tavan uygulanmasaydı TÜFE oranında (%{result.tufeRate.toFixed(1)}) artış yapılabilirdi.
              </p>
            </div>
          )}

          {/* Year-by-year projection */}
          {result.years.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h3 className="text-sm font-bold text-gray-900 mb-4">Yıllık Projeksiyon</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left py-2 pr-4 text-gray-400 font-semibold">Yıl</th>
                      <th className="text-right py-2 pr-4 text-gray-400 font-semibold">Artış Oranı</th>
                      <th className="text-right py-2 pr-4 text-gray-400 font-semibold">Aylık Artış</th>
                      <th className="text-right py-2 pr-4 text-gray-400 font-semibold">Yeni Kira</th>
                      <th className="text-right py-2 text-gray-400 font-semibold">Yıllık Toplam</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    <tr>
                      <td className="py-3 pr-4 font-semibold text-gray-600">Şu an</td>
                      <td className="py-3 pr-4 text-right">—</td>
                      <td className="py-3 pr-4 text-right">—</td>
                      <td className="py-3 pr-4 text-right font-bold text-gray-900">{fmt(parseFloat(currentRent) || 0)}</td>
                      <td className="py-3 text-right font-semibold text-gray-600">{fmt((parseFloat(currentRent) || 0) * 12)}</td>
                    </tr>
                    {result.years.map(y => (
                      <tr key={y.yearNum} className={y.yearNum === 1 ? 'bg-violet-50/50' : ''}>
                        <td className="py-3 pr-4 font-bold text-gray-800">{y.yearNum}. Yıl</td>
                        <td className="py-3 pr-4 text-right font-semibold text-violet-600">%{y.rate.toFixed(1)}</td>
                        <td className="py-3 pr-4 text-right font-semibold text-amber-600">+{fmt(y.increase)}</td>
                        <td className="py-3 pr-4 text-right font-black text-[#00C49F]">{fmt(y.newRent)}</td>
                        <td className="py-3 text-right font-semibold text-gray-700">{fmt(y.totalPaid)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center">
          <TrendingUp size={40} className="text-gray-200 mx-auto mb-3" />
          <p className="text-gray-400 text-sm">Mevcut aylık kira tutarını girin</p>
        </div>
      )}

      {/* Legal info */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 flex gap-3">
        <Info size={16} className="text-blue-600 shrink-0 mt-0.5" />
        <div className="text-xs text-blue-800 space-y-1.5">
          <p className="font-bold">Yasal Düzenleme Hakkında</p>
          <p>• Türk Borçlar Kanunu&apos;nun 344. maddesi, kira artışını önceki yılın 12 aylık TÜFE ortalamasıyla sınırlar.</p>
          <p>• 2022-2024 yılları arasında geçici %25 tavan uygulandı. Güncel durum için hukuk danışmanınıza başvurun.</p>
          <p>• TÜİK verileri gerçek zamanlı değil; resmi TÜFE için TÜİK web sitesini kontrol edin.</p>
          <p>• Bu hesaplama bilgi amaçlıdır, hukuki tavsiye niteliği taşımaz.</p>
        </div>
      </div>
    </div>
  );
}
