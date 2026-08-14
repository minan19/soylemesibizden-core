'use client';

import { useState, useMemo } from 'react';
import { Building2, Home, Landmark, Info } from 'lucide-react';

function fmt(n: number) {
  return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(n);
}

type PropertyKind = 'konut' | 'isyeri' | 'arsa' | 'arazi';
type BelediType = 'buyuksehir' | 'il_ilce' | 'koy';

const RATES: Record<PropertyKind, Record<BelediType, number>> = {
  konut:    { buyuksehir: 0.002, il_ilce: 0.001, koy: 0.001 },
  isyeri:   { buyuksehir: 0.004, il_ilce: 0.002, koy: 0.002 },
  arsa:     { buyuksehir: 0.006, il_ilce: 0.003, koy: 0.003 },
  arazi:    { buyuksehir: 0.002, il_ilce: 0.001, koy: 0.0005 },
};

const KIND_LABELS: Record<PropertyKind, string> = {
  konut: 'Konut / Daire', isyeri: 'İşyeri / Dükkan', arsa: 'Arsa', arazi: 'Arazi / Tarla',
};

const BELEDI_LABELS: Record<BelediType, string> = {
  buyuksehir: 'Büyükşehir Belediyesi', il_ilce: 'İl / İlçe Belediyesi', koy: 'Köy / Kasaba Tüzelkişiliği',
};

export default function EmlakVergisiClient() {
  const [assessedValue, setAssessedValue] = useState('');
  const [kind, setKind] = useState<PropertyKind>('konut');
  const [beledi, setBeledi] = useState<BelediType>('buyuksehir');
  const [isFirstHome, setIsFirstHome] = useState(false);
  const [ownershipPct, setOwnershipPct] = useState('100');

  const result = useMemo(() => {
    const val = parseFloat(assessedValue.replace(/[.,]/g, '')) || 0;
    if (val <= 0) return null;

    const ownPct = (parseFloat(ownershipPct) || 100) / 100;
    const ownedValue = val * ownPct;

    let rate = RATES[kind][beledi];
    // İlk konut istisnası (2024 yılı için — büyükşehirlerde ilk 2M TL istisna)
    const exemptionLimit = isFirstHome && kind === 'konut' ? 2_000_000 : 0;
    const taxableValue = Math.max(ownedValue - exemptionLimit, 0);
    const annualTax = taxableValue * rate;
    const firstInstallment = annualTax / 2;
    const secondInstallment = annualTax / 2;

    return {
      val, ownedValue, rate, exemptionLimit, taxableValue,
      annualTax, firstInstallment, secondInstallment,
      rateLabel: `%${(rate * 100).toFixed(1)}`,
    };
  }, [assessedValue, kind, beledi, isFirstHome, ownershipPct]);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
        <div className="flex items-center gap-2 mb-1">
          <Landmark size={17} className="text-amber-500" />
          <h2 className="text-sm font-bold text-gray-900">Emlak Vergisi Hesaplama</h2>
        </div>

        {/* Rayiç değer */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Rayiç / Beyan Değeri (₺)</label>
          <input
            type="text"
            value={assessedValue}
            onChange={e => setAssessedValue(e.target.value)}
            placeholder="Örn: 3500000"
            className="w-full px-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-amber-400 transition-colors font-mono"
          />
          <p className="text-[10px] text-gray-400 mt-1">Tapu değeriniz veya belediye rayiç bedeli girin.</p>
        </div>

        {/* Hızlı seçim */}
        <div className="flex flex-wrap gap-2">
          {[1000000, 2000000, 3500000, 5000000, 8000000].map(v => (
            <button
              key={v}
              onClick={() => setAssessedValue(v.toString())}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                assessedValue === v.toString()
                  ? 'bg-amber-500 text-white border-amber-500'
                  : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-amber-400/50'
              }`}
            >
              ₺{(v / 1_000_000).toFixed(1)}M
            </button>
          ))}
        </div>

        {/* Mülk türü */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-2">Mülk Türü</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {(Object.keys(KIND_LABELS) as PropertyKind[]).map(k => (
              <button
                key={k}
                onClick={() => setKind(k)}
                className={`py-2.5 px-3 rounded-xl border text-xs font-semibold transition-all ${
                  kind === k
                    ? 'bg-amber-500 text-white border-amber-500'
                    : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-amber-400/50'
                }`}
              >
                {KIND_LABELS[k]}
              </button>
            ))}
          </div>
        </div>

        {/* Belediye türü */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-2">Belediye Türü</label>
          <div className="flex flex-col sm:flex-row gap-2">
            {(Object.keys(BELEDI_LABELS) as BelediType[]).map(b => (
              <button
                key={b}
                onClick={() => setBeledi(b)}
                className={`flex-1 py-2.5 px-4 rounded-xl border text-xs font-semibold transition-all text-left sm:text-center ${
                  beledi === b
                    ? 'bg-amber-500 text-white border-amber-500'
                    : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-amber-400/50'
                }`}
              >
                {BELEDI_LABELS[b]}
              </button>
            ))}
          </div>
        </div>

        {/* Hisse oranı */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Sahiplik Oranı (%)</label>
          <input
            type="number"
            value={ownershipPct}
            onChange={e => setOwnershipPct(e.target.value)}
            min="1"
            max="100"
            className="w-32 px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-amber-400 transition-colors"
          />
          <p className="text-[10px] text-gray-400 mt-1">Birden fazla hissedar varsa kendi payınızı girin (1-100).</p>
        </div>

        {/* İlk konut istisnası */}
        {kind === 'konut' && (
          <label className="flex items-start gap-3 cursor-pointer" onClick={() => setIsFirstHome(!isFirstHome)}>
            <div className={`mt-0.5 w-10 h-5 rounded-full relative transition-colors shrink-0 ${isFirstHome ? 'bg-amber-500' : 'bg-gray-200'}`}>
              <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${isFirstHome ? 'translate-x-5' : 'translate-x-0.5'}`} />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-700">İlk Konut İstisnası Uygula</p>
              <p className="text-[10px] text-gray-400 mt-0.5">2024 yılı için ilk konut istisna tutarı: ₺2.000.000</p>
            </div>
          </label>
        )}
      </div>

      {/* Results */}
      {result ? (
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Yıllık Vergi', value: fmt(result.annualTax), sub: `Oran: ${result.rateLabel}`, highlight: true },
              { label: '1. Taksit (Mayıs)', value: fmt(result.firstInstallment), sub: 'Mayıs' },
              { label: '2. Taksit (Kasım)', value: fmt(result.secondInstallment), sub: 'Kasım' },
              { label: 'Aylık Karşılık', value: fmt(result.annualTax / 12), sub: 'Referans' },
            ].map(m => (
              <div key={m.label} className={`rounded-2xl p-5 text-center border ${m.highlight ? 'bg-amber-50 border-amber-200' : 'bg-white border-gray-100'}`}>
                <p className={`text-xl font-black ${m.highlight ? 'text-amber-900' : 'text-gray-900'}`}>{m.value}</p>
                <p className={`text-xs mt-1 ${m.highlight ? 'text-amber-700 font-bold' : 'text-gray-400'}`}>{m.label}</p>
                {m.sub && <p className="text-[10px] text-gray-400 mt-0.5">{m.sub}</p>}
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Hesaplama Detayı</h3>
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between"><span className="text-gray-500">Beyan / Rayiç Değer</span><span className="font-bold">{fmt(result.val)}</span></div>
              {result.ownedValue !== result.val && (
                <div className="flex justify-between"><span className="text-gray-500">Sahiplik (%{ownershipPct}) payı</span><span className="font-bold">{fmt(result.ownedValue)}</span></div>
              )}
              {result.exemptionLimit > 0 && (
                <div className="flex justify-between text-green-700"><span>İlk konut istisnası</span><span className="font-bold">- {fmt(result.exemptionLimit)}</span></div>
              )}
              <div className="flex justify-between pt-2 border-t border-gray-50"><span className="text-gray-500">Vergiye esas değer</span><span className="font-bold">{fmt(result.taxableValue)}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Vergi oranı</span><span className="font-bold">{result.rateLabel}</span></div>
              <div className="flex justify-between pt-2 border-t border-gray-50">
                <span className="font-black text-gray-900">Yıllık Emlak Vergisi</span>
                <span className="font-black text-amber-700">{fmt(result.annualTax)}</span>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex gap-3">
            <Info size={16} className="text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-800 space-y-1.5">
              <p className="font-bold">Önemli Bilgiler</p>
              <p>• Emlak vergisi her yıl Mayıs ve Kasım aylarında iki eşit taksitte ödenir.</p>
              <p>• Rayiç bedel, belediyenin belirlediği vergi değeridir; satış fiyatından farklı olabilir.</p>
              <p>• Geç ödeme durumunda aylık %2,5 gecikme faizi uygulanır.</p>
              <p>• Bu hesaplama yaklaşıktır. Kesin rakam için ilgili belediyeyi arayın.</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center">
          <Landmark size={40} className="text-gray-200 mx-auto mb-3" />
          <p className="text-gray-400 text-sm">Hesaplama için rayiç değeri girin</p>
        </div>
      )}
    </div>
  );
}
