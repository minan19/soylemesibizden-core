'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Scale, ArrowRight, TrendingUp, Star } from 'lucide-react';

const fmt = (n: number) => n.toLocaleString('tr-TR');

type CityData = {
  avgM2Price: number;
  avgRent2plus1: number;
  grossYield: number;
  yoyPriceChange: number;
  livingCostIndex: number;
  population: number;
  investmentScore: number;
  transportScore: number;
  safetyScore: number;
  amenityScore: number;
  pros: string[];
  cons: string[];
};

const CITY_DATA: Record<string, CityData> = {
  'İstanbul': {
    avgM2Price: 58000, avgRent2plus1: 28000, grossYield: 3.5, yoyPriceChange: 62,
    livingCostIndex: 100, population: 16000000, investmentScore: 8.2,
    transportScore: 9, safetyScore: 7, amenityScore: 10,
    pros: ['En yüksek likidite', 'Güçlü kira talebi', 'Uluslararası çekim merkezi'],
    cons: ['En yüksek giriş maliyeti', 'Düşük kira getirisi', 'Yüksek yaşam maliyeti'],
  },
  'İzmir': {
    avgM2Price: 35000, avgRent2plus1: 19000, grossYield: 3.9, yoyPriceChange: 55,
    livingCostIndex: 72, population: 4500000, investmentScore: 7.8,
    transportScore: 8, safetyScore: 8.5, amenityScore: 8.5,
    pros: ['Deniz manzaralı premium segment', 'Turizm talebi', 'Yüksek yaşam kalitesi'],
    cons: ['İstanbul\'dan sonra pahalı', 'Sınırlı iş piyasası', 'Sismik risk'],
  },
  'Ankara': {
    avgM2Price: 24000, avgRent2plus1: 14000, grossYield: 4.2, yoyPriceChange: 48,
    livingCostIndex: 60, population: 5700000, investmentScore: 7.0,
    transportScore: 8, safetyScore: 8, amenityScore: 7.5,
    pros: ['Kamu istihdamı talebi', 'Makul giriş maliyeti', 'İstikrarlı kira talebi'],
    cons: ['Daha düşük değer artış potansiyeli', 'Daha az turist talebi', 'Karasal iklim'],
  },
  'Antalya': {
    avgM2Price: 38000, avgRent2plus1: 21000, grossYield: 4.0, yoyPriceChange: 70,
    livingCostIndex: 68, population: 2600000, investmentScore: 8.0,
    transportScore: 7, safetyScore: 8, amenityScore: 8,
    pros: ['Yabancı yatırımcı talebi', 'Turizm kira geliri', 'Hızlı değer artışı'],
    cons: ['Sezonsal kira dalgalanması', 'Depreme açık bölge', 'Altyapı baskısı'],
  },
  'Bursa': {
    avgM2Price: 28000, avgRent2plus1: 13000, grossYield: 3.4, yoyPriceChange: 45,
    livingCostIndex: 58, population: 3100000, investmentScore: 6.8,
    transportScore: 7, safetyScore: 8.5, amenityScore: 7,
    pros: ['Sanayi yakınlığı', 'Makul yaşam maliyeti', 'İstanbul\'a kolay erişim'],
    cons: ['Görece düşük kira getirisi', 'Hava kalitesi sorunları', 'Daha yavaş piyasa'],
  },
  'Muğla': {
    avgM2Price: 65000, avgRent2plus1: 22000, grossYield: 2.4, yoyPriceChange: 58,
    livingCostIndex: 75, population: 1000000, investmentScore: 7.5,
    transportScore: 6, safetyScore: 9, amenityScore: 8,
    pros: ['Lüks segment ve yabancı talep', 'Turizm yazlık geliri', 'Doğa ve deniz'],
    cons: ['En düşük kira getirisi', 'Sezonsal piyasa', 'Ulaşım sınırlılığı'],
  },
  'Mersin': {
    avgM2Price: 20000, avgRent2plus1: 11000, grossYield: 3.9, yoyPriceChange: 42,
    livingCostIndex: 52, population: 1900000, investmentScore: 6.5,
    transportScore: 7, safetyScore: 7.5, amenityScore: 6.5,
    pros: ['En uygun fiyatlı kıyı şehri', 'Liman ekonomisi', 'Deniz iklimi'],
    cons: ['Daha yavaş değer artışı', 'Altyapı gelişim sürecinde', 'Daha düşük likidite'],
  },
  'Konya': {
    avgM2Price: 16000, avgRent2plus1: 9500, grossYield: 4.3, yoyPriceChange: 38,
    livingCostIndex: 45, population: 2300000, investmentScore: 6.0,
    transportScore: 6, safetyScore: 9, amenityScore: 6,
    pros: ['En düşük giriş maliyeti', 'En yüksek güvenlik skoru', 'Gıda ve tarım merkezi'],
    cons: ['En yavaş değer artışı', 'Daha düşük likidite', 'Sınırlı uluslararası talep'],
  },
};

const METRICS = [
  { key: 'avgM2Price', label: 'Ort. ₺/m² (Satış)', format: (v: number) => `₺${fmt(v)}`, higherIsBetter: false },
  { key: 'avgRent2plus1', label: 'Ort. 2+1 Kira/ay', format: (v: number) => `₺${fmt(v)}`, higherIsBetter: true },
  { key: 'grossYield', label: 'Brüt Kira Getirisi', format: (v: number) => `%${v.toFixed(1)}`, higherIsBetter: true },
  { key: 'yoyPriceChange', label: 'Yıllık Fiyat Artışı', format: (v: number) => `+%${v}`, higherIsBetter: true },
  { key: 'livingCostIndex', label: 'Yaşam Maliyeti (İST=100)', format: (v: number) => v.toString(), higherIsBetter: false },
  { key: 'population', label: 'Nüfus', format: (v: number) => `${(v / 1000000).toFixed(1)}M`, higherIsBetter: true },
  { key: 'investmentScore', label: 'Yatırım Skoru', format: (v: number) => `${v}/10`, higherIsBetter: true },
  { key: 'transportScore', label: 'Ulaşım Skoru', format: (v: number) => `${v}/10`, higherIsBetter: true },
  { key: 'safetyScore', label: 'Güvenlik Skoru', format: (v: number) => `${v}/10`, higherIsBetter: true },
  { key: 'amenityScore', label: 'Yaşam Kalitesi', format: (v: number) => `${v}/10`, higherIsBetter: true },
] as const;

const CITIES = Object.keys(CITY_DATA);

export default function BolgeKarsilastirClient() {
  const [selected, setSelected] = useState<[string, string, string]>(['İstanbul', 'İzmir', 'Ankara']);

  const updateCity = (idx: number, city: string) => {
    setSelected(prev => {
      const next = [...prev] as [string, string, string];
      next[idx] = city;
      return next;
    });
  };

  const data = selected.map(c => CITY_DATA[c]);

  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-5xl mx-auto px-6 py-14">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-4">
            <Scale size={13} /> Analiz Aracı
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">Bölge Karşılaştırma Aracı</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            Üç şehri gayrimenkul fiyatı, kira getirisi, yaşam maliyeti ve yatırım skoru açısından yan yana karşılaştırın.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">

        {/* Şehir seçimi */}
        <div className="grid grid-cols-3 gap-4">
          {selected.map((city, idx) => (
            <div key={idx}>
              <label className="block text-xs font-bold text-gray-700 mb-1">Şehir {idx + 1}</label>
              <select
                value={city}
                onChange={e => updateCity(idx, e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-800 focus:outline-none focus:border-[#00C49F] bg-white"
              >
                {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          ))}
        </div>

        {/* Metrik Tablosu */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-4 py-3 font-black text-gray-700">Metrik</th>
                  {selected.map((city, i) => (
                    <th key={i} className="text-right px-4 py-3 font-black text-gray-900">{city}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {METRICS.map((m, mi) => {
                  const values = data.map(d => d[m.key] as number);
                  const best = m.higherIsBetter ? Math.max(...values) : Math.min(...values);
                  return (
                    <tr key={mi} className={mi % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 font-bold text-gray-700">{m.label}</td>
                      {values.map((v, vi) => (
                        <td key={vi} className={`px-4 py-3 text-right font-bold ${v === best ? 'text-[#00C49F]' : 'text-gray-700'}`}>
                          {v === best && <Star size={9} className="inline mr-1 text-[#00C49F]" />}
                          {m.format(v)}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="text-[10px] text-gray-400 px-4 py-2 border-t border-gray-100">Yeşil değer: o metrikte en iyi performans gösteren şehir.</p>
        </div>

        {/* Yatırım Skoru Bar */}
        <div className="grid grid-cols-3 gap-4">
          {selected.map((city, i) => {
            const d = data[i];
            return (
              <div key={city} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <h3 className="text-sm font-black text-gray-900 mb-1">{city}</h3>
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#00C49F] rounded-full" style={{ width: `${d.investmentScore * 10}%` }} />
                  </div>
                  <span className="text-xs font-black text-[#00C49F]">{d.investmentScore}/10</span>
                </div>
                <p className="text-[10px] font-black text-green-600 mb-1">Artılar:</p>
                {d.pros.map((p, pi) => (
                  <p key={pi} className="text-[10px] text-gray-600 leading-relaxed flex items-start gap-1">
                    <TrendingUp size={9} className="text-green-500 shrink-0 mt-0.5" /> {p}
                  </p>
                ))}
                <p className="text-[10px] font-black text-rose-500 mb-1 mt-2">Eksiler:</p>
                {d.cons.map((c, ci) => (
                  <p key={ci} className="text-[10px] text-gray-600 leading-relaxed flex items-start gap-1">
                    <TrendingUp size={9} className="text-rose-400 shrink-0 mt-0.5 rotate-180" /> {c}
                  </p>
                ))}
              </div>
            );
          })}
        </div>

        {/* Related */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Araçlar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/karsilastir', label: 'İlan Karşılaştırma' },
              { href: '/yatirim-bolgesi', label: 'En İyi Yatırım Bölgeleri' },
              { href: '/kira-haritasi', label: 'Kira Fiyat Rehberi' },
              { href: '/mahalle-analizi', label: 'Mahalle Analizi' },
              { href: '/yatirim-npv', label: 'NBD / NPV Hesaplayıcı' },
              { href: '/sehir', label: 'Şehir Sayfaları' },
            ].map(l => (
              <Link key={l.href} href={l.href}
                className="flex items-center gap-2 p-3 rounded-xl bg-gray-50 hover:bg-[#F0FDF8] border border-transparent hover:border-[#00C49F]/20 transition-all group"
              >
                <ArrowRight size={12} className="text-gray-300 group-hover:text-[#00C49F] transition-colors shrink-0" />
                <span className="text-xs text-gray-700 group-hover:text-[#00C49F] font-medium transition-colors">{l.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
