'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Home, ArrowRight, TrendingUp, CheckCircle, AlertTriangle, Info } from 'lucide-react';

const fmt = (n: number) => n.toLocaleString('tr-TR');

const CITY_PRICES: Record<string, number> = {
  'İstanbul': 58000,
  'İzmir': 35000,
  'Ankara': 24000,
  'Antalya': 38000,
  'Bursa': 28000,
  'Muğla': 65000,
  'Mersin': 20000,
  'Kocaeli': 26000,
  'Konya': 16000,
  'Gaziantep': 15000,
  'Diğer': 18000,
};

const ADJUSTMENTS = [
  { id: 'elevator', label: 'Asansör Var', delta: +0.03 },
  { id: 'parking', label: 'Otopark / Garaj', delta: +0.05 },
  { id: 'garden', label: 'Bahçe / Teras', delta: +0.04 },
  { id: 'pool', label: 'Yüzme Havuzu', delta: +0.08 },
  { id: 'sea_view', label: 'Deniz Manzarası', delta: +0.15 },
  { id: 'renovated', label: 'Komple Yenilenmiş', delta: +0.10 },
  { id: 'old_building', label: '20+ Yıl Bina Yaşı', delta: -0.10 },
  { id: 'ground_floor', label: 'Zemin Kat', delta: -0.05 },
  { id: 'no_elevator_high', label: 'Asansörsüz 4+ Kat', delta: -0.08 },
  { id: 'main_road_noise', label: 'Ana Yol Gürültüsü', delta: -0.06 },
];

export default function SatilikEvDegeriClient() {
  const [city, setCity] = useState('İstanbul');
  const [area, setArea] = useState(120);
  const [rooms, setRooms] = useState('3+1');
  const [floor, setFloor] = useState<'low' | 'mid' | 'high'>('mid');
  const [selected, setSelected] = useState<string[]>([]);

  const toggleAdj = (id: string) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const result = useMemo(() => {
    const baseM2 = CITY_PRICES[city] ?? 18000;

    // Floor adjustment
    const floorDelta = floor === 'high' ? 0.05 : floor === 'low' ? -0.03 : 0;

    // Adjustments from toggles
    const adjDelta = ADJUSTMENTS.filter(a => selected.includes(a.id)).reduce((s, a) => s + a.delta, 0);

    const adjustedM2 = baseM2 * (1 + floorDelta + adjDelta);
    const estimatedValue = area * adjustedM2;

    const low = estimatedValue * 0.90;
    const high = estimatedValue * 1.12;

    const annualRentEstimate = estimatedValue * 0.045; // ~4.5% gross yield
    const monthlyRentEstimate = annualRentEstimate / 12;

    return {
      baseM2,
      adjustedM2,
      estimatedValue,
      low,
      high,
      monthlyRentEstimate,
      annualRentEstimate,
    };
  }, [city, area, floor, selected]);

  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-4">
            <Home size={13} /> Değerleme Aracı
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">Evimin Değeri Ne Kadar?</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            Şehir, m², konum ve özelliklerinizi girin; piyasa bazlı tahmini değer aralığını öğrenin.
            Satış fiyatı belirlemek için başlangıç noktanız.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* Input */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm space-y-5">
              <h2 className="text-sm font-black text-gray-900">Mülk Bilgileri</h2>

              {/* City */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Şehir</label>
                <select
                  value={city}
                  onChange={e => setCity(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:border-[#00C49F]"
                >
                  {Object.keys(CITY_PRICES).map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Area */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Net Alan (m²)
                  <span className="ml-2 font-normal text-gray-400">{area} m²</span>
                </label>
                <input type="range" min={30} max={500} step={5} value={area}
                  onChange={e => setArea(Number(e.target.value))} className="w-full accent-[#00C49F]" />
                <div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>30</span><span>500 m²</span></div>
              </div>

              {/* Rooms */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">Oda Sayısı</label>
                <div className="grid grid-cols-4 gap-1">
                  {['1+1', '2+1', '3+1', '4+1'].map(r => (
                    <button key={r} onClick={() => setRooms(r)}
                      className={`text-xs py-1.5 rounded-lg font-bold transition-all ${rooms === r ? 'bg-[#00C49F] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              {/* Floor */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">Kat Konumu</label>
                <div className="grid grid-cols-3 gap-1">
                  {[
                    { value: 'low', label: 'Alt Kat' },
                    { value: 'mid', label: 'Orta' },
                    { value: 'high', label: 'Üst Kat' },
                  ].map(f => (
                    <button key={f.value} onClick={() => setFloor(f.value as 'low' | 'mid' | 'high')}
                      className={`text-xs py-1.5 rounded-lg font-bold transition-all ${floor === f.value ? 'bg-[#00C49F] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <h2 className="text-xs font-black text-gray-900 mb-3">Özellikler</h2>
              <div className="space-y-2">
                {ADJUSTMENTS.map(a => (
                  <button
                    key={a.id}
                    onClick={() => toggleAdj(a.id)}
                    className={`w-full flex items-center justify-between p-2.5 rounded-lg text-xs transition-all ${selected.includes(a.id) ? 'bg-[#F0FDF8] border border-[#00C49F]/30' : 'bg-gray-50 border border-transparent hover:border-gray-200'}`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-md border-2 flex items-center justify-center ${selected.includes(a.id) ? 'bg-[#00C49F] border-[#00C49F]' : 'border-gray-300'}`}>
                        {selected.includes(a.id) && <CheckCircle size={10} className="text-white" />}
                      </div>
                      <span className="text-gray-700">{a.label}</span>
                    </div>
                    <span className={`font-black text-[10px] ${a.delta > 0 ? 'text-[#00C49F]' : 'text-rose-500'}`}>
                      {a.delta > 0 ? '+' : ''}{(a.delta * 100).toFixed(0)}%
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-3 space-y-4">

            {/* Main value */}
            <div className="bg-gradient-to-br from-[#00C49F] to-[#00a882] rounded-2xl p-6 text-white">
              <p className="text-xs text-white/70 mb-1">Tahmini Piyasa Değeri</p>
              <p className="text-4xl font-black mb-2">₺{fmt(Math.round(result.estimatedValue))}</p>
              <p className="text-xs text-white/70">
                Aralık: ₺{fmt(Math.round(result.low))} — ₺{fmt(Math.round(result.high))}
              </p>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                <p className="text-[10px] text-gray-400 mb-1">Bölge Ortalama ₺/m²</p>
                <p className="text-xl font-black text-gray-900">₺{fmt(result.baseM2)}</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                <p className="text-[10px] text-gray-400 mb-1">Mülkünüz ₺/m²</p>
                <p className="text-xl font-black text-[#00C49F]">₺{fmt(Math.round(result.adjustedM2))}</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                <p className="text-[10px] text-gray-400 mb-1">Tahmini Kira Değeri</p>
                <p className="text-xl font-black text-blue-600">₺{fmt(Math.round(result.monthlyRentEstimate))}/ay</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                <p className="text-[10px] text-gray-400 mb-1">Brüt Kira Getirisi</p>
                <p className="text-xl font-black text-amber-600">%4.5</p>
              </div>
            </div>

            {/* Value range bar */}
            <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
              <h3 className="text-xs font-black text-gray-900 mb-3">Değer Aralığı</h3>
              <div className="relative h-4 bg-gray-100 rounded-full overflow-hidden">
                <div className="absolute inset-y-0 left-[8%] right-[10%] bg-gradient-to-r from-[#00C49F]/30 to-[#00C49F] rounded-full" />
                <div className="absolute inset-y-0 w-1 bg-white rounded-full" style={{ left: '50%' }} />
              </div>
              <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                <span>₺{fmt(Math.round(result.low))}</span>
                <span className="text-[#00C49F] font-bold">₺{fmt(Math.round(result.estimatedValue))}</span>
                <span>₺{fmt(Math.round(result.high))}</span>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
              <AlertTriangle size={14} className="text-amber-600 shrink-0 mt-0.5" />
              <div className="text-xs text-amber-700 space-y-1">
                <p className="font-bold">Bu tahmin algoritmik bir göstergedir.</p>
                <p>Kesin değer için: (1) SPK lisanslı ekspertiz raporu, (2) Yakın çevredeki satış fiyatları karşılaştırması, (3) Emlak danışmanı görüşü alınmalıdır.</p>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
              <h3 className="text-xs font-black text-gray-900 mb-3 flex items-center gap-2">
                <TrendingUp size={13} className="text-[#00C49F]" /> Satış Fiyatını Etkileyen Faktörler
              </h3>
              <div className="space-y-2">
                {[
                  'Yakın çevredeki son 3 aydaki gerçekleşen satış fiyatları en güvenilir referanstır.',
                  '₺/m² bölge ortalamasının %15+ üzerindeki fiyatlar satış süresini uzatır.',
                  'İlk listeleme fiyatı kritiktir — düşük başlamak piyasadan sinyal alınmasını engeller.',
                  'Tapu harcı, komisyon ve KDV toplam alım maliyetinin %8-10\'unu oluşturur.',
                ].map((t, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <Info size={11} className="text-[#00C49F] shrink-0 mt-0.5" />
                    <p className="text-[10px] text-gray-600 leading-relaxed">{t}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="grid grid-cols-2 gap-3">
              <Link href="/valuation" className="group bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition-all flex items-center gap-3">
                <Home size={16} className="text-[#00C49F] shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-gray-900">Gelişmiş Değerleme</p>
                  <p className="text-[10px] text-gray-400">Bölge bazlı fiyat analizi</p>
                </div>
                <ArrowRight size={12} className="text-gray-300 group-hover:text-gray-600 transition-colors shrink-0" />
              </Link>
              <Link href="/kira-getiri-hesaplayici" className="group bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition-all flex items-center gap-3">
                <TrendingUp size={16} className="text-blue-600 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-gray-900">Kira Getirisi Hesapla</p>
                  <p className="text-[10px] text-gray-400">Yatırım analizi</p>
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
