'use client';

import { useState, useMemo } from 'react';

const YAPI_SINIFI: Record<string, { min: number; max: number; label: string }> = {
  'ekonomik': { min: 8000, max: 12000, label: 'Ekonomik' },
  'orta': { min: 12000, max: 18000, label: 'Orta Sınıf' },
  'lüks': { min: 18000, max: 28000, label: 'Lüks' },
  'ultra': { min: 28000, max: 45000, label: 'Ultra Lüks' },
};

type SinifKey = keyof typeof YAPI_SINIFI;

const EKLENTI_MALIYETLER = {
  'Asansör (2 durak)': 350000,
  'Yerden Isıtma': 200,
  'Akıllı Ev Sistemi': 150,
  'Isı Pompası': 120000,
  'Güneş Paneli (5kW)': 180000,
  'Havuz': 800000,
};

type EklentiKey = keyof typeof EKLENTI_MALIYETLER;

export default function InsaatMaliyetiClient() {
  const [alan, setAlan] = useState(150);
  const [katSayisi, setKatSayisi] = useState(1);
  const [yapiSinifi, setYapiSinifi] = useState<SinifKey>('orta');
  const [arsaDahil, setArsaDahil] = useState(false);
  const [arsaFiyati, setArsaFiyati] = useState(1500000);
  const [eklentiler, setEklentiler] = useState<Partial<Record<EklentiKey, boolean>>>({});

  const toggleEklenti = (e: EklentiKey) => {
    setEklentiler(prev => ({ ...prev, [e]: !prev[e] }));
  };

  const hesap = useMemo(() => {
    const sinif = YAPI_SINIFI[yapiSinifi];
    const ortaM2 = (sinif.min + sinif.max) / 2;
    const toplamAlan = alan * katSayisi;

    const yapiMaliyeti = toplamAlan * ortaM2;
    const muhendislikMimari = yapiMaliyeti * 0.08;
    const iskan = yapiMaliyeti * 0.03;
    const beklenmedik = yapiMaliyeti * 0.10;

    let eklentiToplam = 0;
    (Object.keys(eklentiler) as EklentiKey[]).forEach(k => {
      if (eklentiler[k]) {
        const val = EKLENTI_MALIYETLER[k];
        // m² bazlı olanlar alan ile çarpılır
        eklentiToplam += val < 10000 ? val * toplamAlan : val;
      }
    });

    const arsa = arsaDahil ? arsaFiyati : 0;
    const toplam = yapiMaliyeti + muhendislikMimari + iskan + beklenmedik + eklentiToplam + arsa;
    const m2Maliyet = toplam / toplamAlan;

    return {
      toplamAlan,
      yapiMaliyeti,
      muhendislikMimari,
      iskan,
      beklenmedik,
      eklentiToplam,
      arsa,
      toplam,
      m2Maliyet,
      minToplam: (sinif.min * toplamAlan) * 1.21 + eklentiToplam + arsa,
      maxToplam: (sinif.max * toplamAlan) * 1.21 + eklentiToplam + arsa,
    };
  }, [alan, katSayisi, yapiSinifi, arsaDahil, arsaFiyati, eklentiler]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">

      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h2 className="text-sm font-black text-gray-900 mb-5">İnşaat Bilgileri</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

          <div>
            <label className="text-xs font-black text-gray-700 block mb-1">Kat Alanı (m²)</label>
            <input type="number" value={alan} onChange={e => setAlan(Number(e.target.value))} step={10} min={50}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm font-bold focus:outline-none focus:border-[#00C49F]" />
          </div>

          <div>
            <label className="text-xs font-black text-gray-700 block mb-1">Kat Sayısı: {katSayisi}</label>
            <input type="range" min={1} max={10} step={1} value={katSayisi} onChange={e => setKatSayisi(Number(e.target.value))}
              className="w-full accent-[#00C49F]" />
          </div>

          <div className="sm:col-span-2">
            <label className="text-xs font-black text-gray-700 block mb-2">Yapı Sınıfı</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(Object.keys(YAPI_SINIFI) as SinifKey[]).map(s => (
                <button key={s} onClick={() => setYapiSinifi(s)}
                  className={`py-2 rounded-xl text-xs font-black border transition-all ${yapiSinifi === s ? 'bg-[#00C49F] text-white border-[#00C49F]' : 'bg-white text-gray-600 border-gray-200'}`}>
                  {YAPI_SINIFI[s].label}
                  <br />
                  <span className="text-[10px] opacity-80">{YAPI_SINIFI[s].min.toLocaleString('tr-TR')}–{YAPI_SINIFI[s].max.toLocaleString('tr-TR')} ₺/m²</span>
                </button>
              ))}
            </div>
          </div>

          <div className="sm:col-span-2">
            <label className="text-xs font-black text-gray-700 block mb-2">Eklentiler</label>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(EKLENTI_MALIYETLER) as EklentiKey[]).map(e => (
                <button key={e} onClick={() => toggleEklenti(e)}
                  className={`text-[10px] font-black px-3 py-1.5 rounded-full border transition-all ${eklentiler[e] ? 'bg-[#00C49F] text-white border-[#00C49F]' : 'bg-white text-gray-600 border-gray-200'}`}>
                  {e}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 sm:col-span-2">
            <button onClick={() => setArsaDahil(!arsaDahil)}
              className={`w-10 h-5 rounded-full transition-all relative ${arsaDahil ? 'bg-[#00C49F]' : 'bg-gray-200'}`}>
              <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all ${arsaDahil ? 'left-5' : 'left-0.5'}`} />
            </button>
            <label className="text-xs font-black text-gray-700">Arsa Maliyeti Dahil Et</label>
          </div>

          {arsaDahil && (
            <div className="sm:col-span-2">
              <label className="text-xs font-black text-gray-700 block mb-1">Arsa Fiyatı (₺)</label>
              <input type="number" value={arsaFiyati} onChange={e => setArsaFiyati(Number(e.target.value))} step={100000} min={0}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm font-bold focus:outline-none focus:border-[#00C49F]" />
            </div>
          )}
        </div>
      </div>

      {/* Özet */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {[
          { label: 'Toplam Alan', value: `${hesap.toplamAlan} m²` },
          { label: 'Tahmini Maliyet', value: `${Math.round(hesap.toplam).toLocaleString('tr-TR')} ₺` },
          { label: 'Ortalama m² Maliyet', value: `${Math.round(hesap.m2Maliyet).toLocaleString('tr-TR')} ₺/m²` },
        ].map((k, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm text-center">
            <p className="text-[10px] text-gray-500 mb-1">{k.label}</p>
            <p className="text-sm font-black text-[#00C49F]">{k.value}</p>
          </div>
        ))}
      </div>

      {/* Detay */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h2 className="text-sm font-black text-gray-900 mb-4">Maliyet Dağılımı</h2>
        <div className="space-y-2">
          {[
            { label: 'Yapı Maliyeti', value: hesap.yapiMaliyeti },
            { label: 'Mühendislik / Mimari (%8)', value: hesap.muhendislikMimari },
            { label: 'İskan ve İzin (%3)', value: hesap.iskan },
            { label: 'Beklenmedik Giderler (%10)', value: hesap.beklenmedik },
            { label: 'Eklentiler', value: hesap.eklentiToplam },
            ...(arsaDahil ? [{ label: 'Arsa', value: hesap.arsa }] : []),
          ].map((r, i) => {
            const pct = hesap.toplam > 0 ? (r.value / hesap.toplam) * 100 : 0;
            return (
              <div key={i} className="flex items-center gap-3">
                <span className="text-[10px] font-black text-gray-600 w-48 shrink-0">{r.label}</span>
                <div className="flex-1 bg-gray-100 rounded-full h-2.5">
                  <div className="bg-[#00C49F] h-2.5 rounded-full" style={{ width: `${pct}%` }} />
                </div>
                <span className="text-[10px] font-black text-gray-700 w-28 text-right shrink-0">{Math.round(r.value).toLocaleString('tr-TR')} ₺</span>
              </div>
            );
          })}
        </div>
        <div className="mt-4 pt-3 border-t border-gray-100">
          <div className="flex justify-between items-center">
            <span className="text-xs font-black text-gray-500">Min–Max Aralığı</span>
            <span className="text-xs font-black text-gray-700">{Math.round(hesap.minToplam).toLocaleString('tr-TR')} ₺ — {Math.round(hesap.maxToplam).toLocaleString('tr-TR')} ₺</span>
          </div>
        </div>
      </div>

    </div>
  );
}
