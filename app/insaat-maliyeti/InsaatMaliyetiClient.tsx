'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Building2, ArrowRight, Info, AlertTriangle } from 'lucide-react';

const fmt = (n: number) => n.toLocaleString('tr-TR', { maximumFractionDigits: 0 });

type BuildingType = 'economy' | 'standard' | 'luxury' | 'villa' | 'commercial';

const BUILDING_TYPES: Record<BuildingType, { label: string; baseM2: number; desc: string }> = {
  economy: { label: 'Ekonomik Konut', baseM2: 7500, desc: 'Basit malzeme ve işçilik, toplu konut kalitesi' },
  standard: { label: 'Standart Konut', baseM2: 12000, desc: 'Orta segment malzeme, yalıtım, çift cam' },
  luxury: { label: 'Lüks Konut', baseM2: 20000, desc: 'Yüksek kalite malzeme, yüksek tavan, villa sınıfı' },
  villa: { label: 'Müstakil Villa', baseM2: 25000, desc: 'Havuz hazırlığı, peyzaj, premium dış cephe' },
  commercial: { label: 'Ticari / Ofis', baseM2: 15000, desc: 'Asma tavan, güçlü tesisatlı ticari yapı' },
};

const COST_BREAKDOWN = [
  { label: 'Kaba İnşaat (temel, taşıyıcı, çatı)', pct: 0.35 },
  { label: 'İnce İşçilik (sıva, seramik, boya)', pct: 0.25 },
  { label: 'Mekanik Tesisat (sıhhi, ısıtma, klima)', pct: 0.15 },
  { label: 'Elektrik ve Zayıf Akım', pct: 0.10 },
  { label: 'Doğrama (kapı, pencere, cam)', pct: 0.08 },
  { label: 'Asansör ve Ortak Alanlar', pct: 0.07 },
];

const EXTRAS = [
  { id: 'underfloor', label: 'Yerden Isıtma', addM2: 800 },
  { id: 'solar', label: 'Güneş Enerjisi (PV)', addM2: 600 },
  { id: 'smart', label: 'Akıllı Ev Sistemi', addM2: 500 },
  { id: 'pool', label: 'Yüzme Havuzu', addFixed: 500000 },
  { id: 'garage', label: 'Kapalı Otopark', addFixed: 150000 },
  { id: 'elevator', label: 'Asansör (2-4 kat)', addFixed: 200000 },
  { id: 'insulation', label: 'Isı/Ses Yalıtımı (premium)', addM2: 400 },
];

export default function InsaatMaliyetiClient() {
  const [buildingType, setBuildingType] = useState<BuildingType>('standard');
  const [area, setArea] = useState(150);
  const [floors, setFloors] = useState(1);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [landCost, setLandCost] = useState(0);
  const [profitPct, setProfitPct] = useState(20);

  const toggleExtra = (id: string) => {
    setSelectedExtras(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const result = useMemo(() => {
    const totalArea = area * floors;
    const { baseM2 } = BUILDING_TYPES[buildingType];

    const extraM2 = EXTRAS.filter(e => selectedExtras.includes(e.id) && e.addM2).reduce((s, e) => s + (e.addM2 ?? 0), 0);
    const extraFixed = EXTRAS.filter(e => selectedExtras.includes(e.id) && e.addFixed).reduce((s, e) => s + (e.addFixed ?? 0), 0);

    const constructionM2 = baseM2 + extraM2;
    const constructionCost = totalArea * constructionM2 + extraFixed;
    const projectCost = constructionCost * 0.05; // mimarlık + mühendislik
    const permitCost = totalArea * 200; // ruhsat ve harç tahmini
    const totalWithoutLand = constructionCost + projectCost + permitCost;
    const totalWithLand = totalWithoutLand + landCost;
    const totalWithProfit = totalWithLand * (1 + profitPct / 100);
    const salePriceM2 = totalWithProfit / totalArea;

    return {
      totalArea,
      constructionM2,
      constructionCost,
      projectCost,
      permitCost,
      totalWithoutLand,
      totalWithLand,
      totalWithProfit,
      salePriceM2,
    };
  }, [buildingType, area, floors, selectedExtras, landCost, profitPct]);

  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-5xl mx-auto px-6 py-14">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-4">
            <Building2 size={13} /> Hesaplama Aracı
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">İnşaat Maliyet Hesaplayıcı</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            Konut, villa veya ticari yapı için m² bazlı inşaat maliyeti tahmini. Ekstra özellikler, arazi maliyeti ve kâr marjı dahil.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Inputs */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm space-y-5">
              <h2 className="text-sm font-black text-gray-900">Yapı Bilgileri</h2>

              {/* Building type */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">Yapı Türü</label>
                <div className="space-y-1.5">
                  {(Object.entries(BUILDING_TYPES) as [BuildingType, typeof BUILDING_TYPES[BuildingType]][]).map(([key, val]) => (
                    <button key={key} onClick={() => setBuildingType(key)}
                      className={`w-full text-left p-2.5 rounded-xl text-xs transition-all ${buildingType === key ? 'bg-[#F0FDF8] border border-[#00C49F]/30 text-[#00C49F]' : 'bg-gray-50 border border-transparent hover:border-gray-200 text-gray-700'}`}
                    >
                      <span className="font-bold">{val.label}</span>
                      <span className="block text-[10px] mt-0.5 opacity-70">{val.desc} · ₺{fmt(val.baseM2)}/m²</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Area */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Kat Alanı (m²) <span className="font-normal text-gray-400">{area} m²</span>
                </label>
                <input type="range" min={50} max={1000} step={10} value={area}
                  onChange={e => setArea(Number(e.target.value))} className="w-full accent-[#00C49F]" />
              </div>

              {/* Floors */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">Kat Adedi</label>
                <div className="grid grid-cols-4 gap-1">
                  {[1, 2, 3, 4].map(f => (
                    <button key={f} onClick={() => setFloors(f)}
                      className={`text-xs py-1.5 rounded-lg font-bold transition-all ${floors === f ? 'bg-[#00C49F] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {/* Land cost */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Arazi Maliyeti <span className="font-normal text-gray-400">₺{fmt(landCost)}</span>
                </label>
                <input type="range" min={0} max={10000000} step={100000} value={landCost}
                  onChange={e => setLandCost(Number(e.target.value))} className="w-full accent-[#00C49F]" />
              </div>

              {/* Profit */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Kâr Marjı <span className="font-normal text-gray-400">%{profitPct}</span>
                </label>
                <input type="range" min={0} max={60} step={5} value={profitPct}
                  onChange={e => setProfitPct(Number(e.target.value))} className="w-full accent-[#00C49F]" />
              </div>
            </div>

            {/* Extras */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <h3 className="text-xs font-black text-gray-900 mb-3">Ekstra Özellikler</h3>
              <div className="space-y-2">
                {EXTRAS.map(e => (
                  <button key={e.id} onClick={() => toggleExtra(e.id)}
                    className={`w-full flex items-center justify-between p-2.5 rounded-lg text-xs transition-all ${selectedExtras.includes(e.id) ? 'bg-[#F0FDF8] border border-[#00C49F]/30' : 'bg-gray-50 border border-transparent hover:border-gray-200'}`}>
                    <span className="text-gray-700">{e.label}</span>
                    <span className="text-[#00C49F] font-bold text-[10px]">
                      {e.addM2 ? `+₺${fmt(e.addM2)}/m²` : `+₺${fmt(e.addFixed ?? 0)}`}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-2 space-y-4">

            {/* Main result */}
            <div className="bg-gradient-to-br from-[#00C49F] to-[#00a882] rounded-2xl p-6 text-white">
              <p className="text-xs text-white/70 mb-1">Toplam Proje Maliyeti (arazi + inşaat + kâr)</p>
              <p className="text-4xl font-black mb-2">₺{fmt(Math.round(result.totalWithProfit))}</p>
              <p className="text-xs text-white/70">Tahmini satış fiyatı ₺{fmt(Math.round(result.salePriceM2))}/m² · Toplam Alan {result.totalArea} m²</p>
            </div>

            {/* Detail metrics */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                <p className="text-[10px] text-gray-400 mb-1">İnşaat Birim Fiyatı</p>
                <p className="text-xl font-black text-gray-900">₺{fmt(result.constructionM2)}/m²</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                <p className="text-[10px] text-gray-400 mb-1">Ham İnşaat Maliyeti</p>
                <p className="text-xl font-black text-[#00C49F]">₺{fmt(Math.round(result.constructionCost))}</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                <p className="text-[10px] text-gray-400 mb-1">Proje + Ruhsat</p>
                <p className="text-xl font-black text-blue-600">₺{fmt(Math.round(result.projectCost + result.permitCost))}</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                <p className="text-[10px] text-gray-400 mb-1">Arazi Maliyeti</p>
                <p className="text-xl font-black text-amber-600">₺{fmt(landCost)}</p>
              </div>
            </div>

            {/* Breakdown bar */}
            <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
              <h3 className="text-xs font-black text-gray-900 mb-3">İnşaat Maliyet Dağılımı</h3>
              <div className="space-y-2">
                {COST_BREAKDOWN.map(c => (
                  <div key={c.label} className="flex items-center gap-3">
                    <span className="text-[10px] text-gray-600 w-48 shrink-0">{c.label}</span>
                    <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#00C49F] rounded-full" style={{ width: `${c.pct * 100}%` }} />
                    </div>
                    <span className="text-[10px] font-bold text-gray-700 w-12 text-right">%{(c.pct * 100).toFixed(0)}</span>
                    <span className="text-[10px] text-[#00C49F] font-bold w-28 text-right">
                      ₺{fmt(Math.round(result.constructionCost * c.pct))}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Warning */}
            <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
              <AlertTriangle size={14} className="text-amber-600 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-700 leading-relaxed">
                <span className="font-black">Bu tahmin algoritmik bir göstergedir.</span> Gerçek maliyet; malzeme fiyatları, işçilik bölgesi, zemin koşulları ve proje detaylarına göre %20-40 sapma gösterebilir. Kesin teklif için müteahhitten yazılı maliyet analizi alın.
              </p>
            </div>

            {/* Info */}
            <div className="flex items-start gap-2 bg-blue-50 border border-blue-200 rounded-xl p-3">
              <Info size={12} className="text-blue-500 shrink-0 mt-0.5" />
              <p className="text-[10px] text-blue-700 leading-relaxed">Birim fiyatlar 2024 Türkiye ortalaması baz alınmıştır. İstanbul ve büyükşehirlerde %15-25 prim, kırsal bölgelerde %10-15 indirim uygulanabilir.</p>
            </div>

            {/* CTAs */}
            <div className="grid grid-cols-2 gap-3">
              <Link href="/arsa-yatirimi" className="group bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition-all flex items-center gap-3">
                <Building2 size={16} className="text-[#00C49F] shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-gray-900">Arsa Yatırımı</p>
                  <p className="text-[10px] text-gray-400">İmar türleri rehberi</p>
                </div>
                <ArrowRight size={12} className="text-gray-300 group-hover:text-gray-600 shrink-0" />
              </Link>
              <Link href="/yatirim-npv" className="group bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition-all flex items-center gap-3">
                <Building2 size={16} className="text-blue-600 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-gray-900">NBD / NPV Hesapla</p>
                  <p className="text-[10px] text-gray-400">Yatırım getirisi analizi</p>
                </div>
                <ArrowRight size={12} className="text-gray-300 group-hover:text-gray-600 shrink-0" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
