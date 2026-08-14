'use client';

import { useState, useMemo } from 'react';
import { Shield, Info, ChevronDown } from 'lucide-react';

// DASK risk zones (deprem riski)
const RISK_ZONES = [
  { value: '1', label: '1. Derece Deprem Bölgesi', desc: 'Marmara, Ege, Doğu Anadolu (en yüksek risk)', factor: 1.0 },
  { value: '2', label: '2. Derece Deprem Bölgesi', desc: 'İç Anadolu kuzey, Karadeniz sahil', factor: 0.75 },
  { value: '3', label: '3. Derece Deprem Bölgesi', desc: 'İç Anadolu orta', factor: 0.55 },
  { value: '4', label: '4. Derece Deprem Bölgesi', desc: 'Güneydoğu Anadolu', factor: 0.40 },
  { value: '5', label: '5. Derece Deprem Bölgesi', desc: 'Orta ve Doğu Karadeniz iç kesimleri', factor: 0.25 },
];

const BUILDING_TYPES = [
  { value: 'celik', label: 'Çelik karkas', factor: 0.70 },
  { value: 'beton_6', label: 'Betonarme (6 kat altı)', factor: 1.0 },
  { value: 'beton_7', label: 'Betonarme (7+ kat)', factor: 1.15 },
  { value: 'yigilma', label: 'Yığma taş/tuğla', factor: 1.30 },
  { value: 'diger', label: 'Diğer yapı türleri', factor: 1.45 },
];

// Base premium rate (per 1000 TL coverage) — illustrative, not official
const BASE_RATE_PER_1000 = 1.8;

// Construction cost per m² by zone (indicative)
const COST_PER_M2: Record<string, number> = {
  '1': 12000,
  '2': 11000,
  '3': 10500,
  '4': 10000,
  '5': 9500,
};

function fmt(n: number) {
  return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(n);
}

export default function DaskClient() {
  const [area, setArea] = useState(100);
  const [zone, setZone] = useState('1');
  const [buildingType, setBuildingType] = useState('beton_6');
  const [floors, setFloors] = useState(4);

  const selectedZone = RISK_ZONES.find(z => z.value === zone)!;
  const selectedBuilding = BUILDING_TYPES.find(b => b.value === buildingType)!;

  const result = useMemo(() => {
    const costPerM2 = COST_PER_M2[zone];
    const teminatBedeli = area * costPerM2;
    const maxTeminat = 640_000; // 2024 DASK üst sınırı (gösterge)
    const effectiveTeminat = Math.min(teminatBedeli, maxTeminat);

    const basePremium = (effectiveTeminat / 1000) * BASE_RATE_PER_1000;
    const zoneAdj = basePremium * selectedZone.factor;
    const typeAdj = zoneAdj * selectedBuilding.factor;
    const annualPremium = Math.max(typeAdj, 150); // min ₺150

    return {
      teminatBedeli,
      effectiveTeminat,
      annualPremium,
      monthlyEquiv: annualPremium / 12,
      isCapped: teminatBedeli > maxTeminat,
      maxTeminat,
    };
  }, [area, zone, selectedZone.factor, selectedBuilding.factor]);

  return (
    <div className="space-y-6">
      {/* Inputs */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h2 className="text-sm font-black text-gray-900 mb-5 flex items-center gap-2">
          <Shield size={15} className="text-[#00C49F]" /> Sigorta Bilgileri
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Area */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Brüt Alan (m²)</label>
            <input
              type="number"
              value={area}
              onChange={e => setArea(Math.max(20, Math.min(1000, Number(e.target.value))))}
              min={20}
              max={1000}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-bold text-gray-800 focus:outline-none focus:border-[#00C49F] focus:ring-2 focus:ring-[#00C49F]/10"
            />
            <p className="text-[10px] text-gray-400 mt-1">20 – 1000 m² arası</p>
          </div>

          {/* Floors */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Bina Kat Sayısı</label>
            <input
              type="number"
              value={floors}
              onChange={e => {
                const f = Math.max(1, Math.min(40, Number(e.target.value)));
                setFloors(f);
                if (f >= 7 && buildingType === 'beton_6') setBuildingType('beton_7');
                if (f < 7 && buildingType === 'beton_7') setBuildingType('beton_6');
              }}
              min={1}
              max={40}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-bold text-gray-800 focus:outline-none focus:border-[#00C49F] focus:ring-2 focus:ring-[#00C49F]/10"
            />
          </div>

          {/* Zone */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Deprem Risk Bölgesi</label>
            <div className="relative">
              <select
                value={zone}
                onChange={e => setZone(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-800 focus:outline-none focus:border-[#00C49F] focus:ring-2 focus:ring-[#00C49F]/10 appearance-none bg-white"
              >
                {RISK_ZONES.map(z => (
                  <option key={z.value} value={z.value}>{z.label}</option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
            <p className="text-[10px] text-gray-400 mt-1">{selectedZone.desc}</p>
          </div>

          {/* Building type */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Yapı Türü</label>
            <div className="relative">
              <select
                value={buildingType}
                onChange={e => setBuildingType(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-800 focus:outline-none focus:border-[#00C49F] focus:ring-2 focus:ring-[#00C49F]/10 appearance-none bg-white"
              >
                {BUILDING_TYPES.map(b => (
                  <option key={b.value} value={b.value}>{b.label}</option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="bg-gradient-to-br from-[#00C49F] to-[#00a882] rounded-2xl p-6 text-white">
        <h2 className="text-sm font-black mb-5 opacity-80">Hesaplama Sonucu</h2>
        <div className="grid grid-cols-2 gap-4 mb-5">
          <div>
            <p className="text-xs opacity-70 mb-1">Yapı Teminat Bedeli</p>
            <p className="text-2xl font-black">{fmt(result.teminatBedeli)}</p>
            {result.isCapped && (
              <p className="text-[10px] opacity-60 mt-0.5">
                ↓ Tavan: {fmt(result.maxTeminat)}
              </p>
            )}
          </div>
          <div>
            <p className="text-xs opacity-70 mb-1">Tahmini Yıllık Prim</p>
            <p className="text-2xl font-black">{fmt(result.annualPremium)}</p>
            <p className="text-[10px] opacity-60 mt-0.5">≈ {fmt(result.monthlyEquiv)} / ay</p>
          </div>
        </div>

        <div className="bg-white/10 rounded-xl p-4 border border-white/20">
          <div className="grid grid-cols-3 gap-3 text-xs">
            <div className="text-center">
              <p className="opacity-60 mb-1">Bölge</p>
              <p className="font-black">{zone}. Derece</p>
            </div>
            <div className="text-center border-x border-white/20">
              <p className="opacity-60 mb-1">Alan</p>
              <p className="font-black">{area} m²</p>
            </div>
            <div className="text-center">
              <p className="opacity-60 mb-1">Yapı Türü</p>
              <p className="font-black">{selectedBuilding.label.split(' ')[0]}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Info note */}
      <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-2xl p-4">
        <Info size={14} className="text-amber-500 shrink-0 mt-0.5" />
        <p className="text-xs text-amber-700 leading-relaxed">
          Bu hesaplama gösterge niteliğindedir. Resmi DASK primi bölge, bina yaşı, kat konumu ve sigorta şirketine göre değişir.
          Kesin prim için DASK.org.tr üzerinden teklif alın. 2024 teminat üst sınırı ₺640.000 olup her yıl güncellenir.
        </p>
      </div>
    </div>
  );
}
