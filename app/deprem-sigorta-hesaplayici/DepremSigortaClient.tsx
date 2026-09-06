'use client';

import { useState, useMemo } from 'react';

const RISK_BOLGESI: Record<string, number> = {
  '1. Derece (İstanbul, Düzce, Adapazarı)': 2.20,
  '2. Derece (İzmir, Bursa, Kocaeli)': 1.55,
  '3. Derece (Ankara, Samsun, Trabzon)': 1.10,
  '4. Derece (Konya, Erzurum, Malatya)': 0.70,
  '5. Derece (Düşük riskli bölgeler)': 0.44,
};

const YAPI_TURU: Record<string, number> = {
  'Çelik/Betonarme (1999 sonrası)': 1.0,
  'Betonarme (1999 öncesi)': 1.4,
  'Yığma (Tuğla/Taş)': 1.6,
  'Prefabrik': 1.2,
  'Ahşap': 0.9,
};

const KAT_KATSAYI: Record<string, number> = {
  'Bodrum / Zemin': 1.25,
  '1–3. Kat': 1.0,
  '4–7. Kat': 1.15,
  '8+. Kat': 1.30,
};

export default function DepremSigortaClient() {
  const [alan, setAlan] = useState(100);
  const [riskBolgesi, setRiskBolgesi] = useState('1. Derece (İstanbul, Düzce, Adapazarı)');
  const [yapiTuru, setYapiTuru] = useState('Çelik/Betonarme (1999 sonrası)');
  const [katDurumu, setKatDurumu] = useState('1–3. Kat');
  const [yapimYili, setYapimYili] = useState(2005);

  const hesap = useMemo(() => {
    const bazPrim = RISK_BOLGESI[riskBolgesi] ?? 1.0;
    const yapiKat = YAPI_TURU[yapiTuru] ?? 1.0;
    const katKat = KAT_KATSAYI[katDurumu] ?? 1.0;
    const yasPrim = yapimYili < 1980 ? 1.5 : yapimYili < 1999 ? 1.2 : 1.0;

    const yillikPrim = alan * bazPrim * yapiKat * katKat * yasPrim;
    const aylikPrim = yillikPrim / 12;
    const yenidenInsaatM2 = 15000;
    const sigortaBedeli = alan * yenidenInsaatM2;
    const muafiyet = sigortaBedeli * 0.02;

    return { yillikPrim, aylikPrim, sigortaBedeli, muafiyet };
  }, [alan, riskBolgesi, yapiTuru, katDurumu, yapimYili]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">

      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h2 className="text-sm font-black text-gray-900 mb-5">Sigorta Bilgileri</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

          <div>
            <label className="text-xs font-black text-gray-700 block mb-1">Daire Alanı (m²)</label>
            <input type="number" value={alan} onChange={e => setAlan(Number(e.target.value))} step={5} min={30} max={500}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm font-bold focus:outline-none focus:border-[#00C49F]" />
          </div>

          <div>
            <label className="text-xs font-black text-gray-700 block mb-1">Deprem Risk Bölgesi</label>
            <select value={riskBolgesi} onChange={e => setRiskBolgesi(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm font-bold focus:outline-none focus:border-[#00C49F]">
              {Object.keys(RISK_BOLGESI).map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>

          <div>
            <label className="text-xs font-black text-gray-700 block mb-1">Yapı Türü</label>
            <select value={yapiTuru} onChange={e => setYapiTuru(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm font-bold focus:outline-none focus:border-[#00C49F]">
              {Object.keys(YAPI_TURU).map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>

          <div>
            <label className="text-xs font-black text-gray-700 block mb-1">Kat Konumu</label>
            <select value={katDurumu} onChange={e => setKatDurumu(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm font-bold focus:outline-none focus:border-[#00C49F]">
              {Object.keys(KAT_KATSAYI).map(k => <option key={k} value={k}>{k}</option>)}
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="text-xs font-black text-gray-700 block mb-1">Yapım Yılı: {yapimYili}</label>
            <input type="range" min={1950} max={2024} step={1} value={yapimYili} onChange={e => setYapimYili(Number(e.target.value))}
              className="w-full accent-[#00C49F]" />
            <div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>1950</span><span>2024</span></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Yıllık DASK Primi', value: `${Math.round(hesap.yillikPrim).toLocaleString('tr-TR')} ₺` },
          { label: 'Aylık Prim', value: `${Math.round(hesap.aylikPrim).toLocaleString('tr-TR')} ₺` },
          { label: 'Sigorta Bedeli', value: `${Math.round(hesap.sigortaBedeli / 1000)}K ₺` },
          { label: 'Hasar Muafiyeti', value: `%2 / ${Math.round(hesap.muafiyet).toLocaleString('tr-TR')} ₺` },
        ].map((k, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm text-center">
            <p className="text-[10px] text-gray-500 mb-1">{k.label}</p>
            <p className="text-sm font-black text-[#00C49F]">{k.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-800 leading-relaxed">
        <span className="font-black">Not:</span> Bu hesaplama yaklaşık bir tahmindir. Gerçek prim, sigortacının güncel tarifesine ve bina değerleme raporuna göre farklılaşabilir. DASK zorunlu sigorta olup yaptırılmaması durumunda tapu işlemleri yapılmaz.
      </div>

    </div>
  );
}
