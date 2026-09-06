'use client';

import { useState, useMemo } from 'react';

const SEHIR_ORTALAMA: Record<string, { min: number; max: number }> = {
  'İstanbul — Avrupa Merkez': { min: 25000, max: 60000 },
  'İstanbul — Anadolu': { min: 18000, max: 45000 },
  'İstanbul — Çevre İlçeler': { min: 10000, max: 25000 },
  'Ankara — Merkez': { min: 12000, max: 30000 },
  'İzmir — Merkez': { min: 15000, max: 38000 },
  'Antalya': { min: 13000, max: 32000 },
  'Bursa': { min: 8000, max: 20000 },
  'Diğer Şehirler': { min: 5000, max: 15000 },
};

export default function KiraButcePlanlayiciClient() {
  const [aylikGelir, setAylikGelir] = useState(50000);
  const [sehir, setSehir] = useState('Ankara — Merkez');
  const [oda, setOda] = useState('2+1');
  const [diger, setDiger] = useState({
    yiyecek: 8000,
    ulasim: 3000,
    faturalar: 2000,
    saglik: 1000,
    eglence: 2000,
    diger: 1500,
  });

  const kiraButce = useMemo(() => {
    const genelGider = Object.values(diger).reduce((a, b) => a + b, 0);
    const onerilKira = Math.round(aylikGelir * 0.30);
    const maxKira = Math.round(aylikGelir * 0.40);
    const kiraHarcandiktan = aylikGelir - onerilKira - genelGider;
    const maksBirikimKirali = aylikGelir - maxKira - genelGider;
    const { min: piyasaMin, max: piyasaMax } = SEHIR_ORTALAMA[sehir] ?? { min: 5000, max: 15000 };

    const odaKatsayi: Record<string, number> = {
      '1+0': 0.75, '1+1': 1.0, '2+1': 1.35, '3+1': 1.70, '4+1': 2.10,
    };
    const kat = odaKatsayi[oda] ?? 1.0;
    const tahminiMinKira = Math.round(piyasaMin * kat);
    const tahminiMaxKira = Math.round(piyasaMax * kat);

    const uyum = tahminiMinKira <= onerilKira ? 'uygun' : tahminiMinKira <= maxKira ? 'zorlanabilir' : 'zor';

    return {
      onerilKira, maxKira, genelGider, kiraHarcandiktan, maksBirikimKirali,
      tahminiMinKira, tahminiMaxKira, uyum,
    };
  }, [aylikGelir, sehir, oda, diger]);

  const handleDiger = (key: keyof typeof diger, val: number) => {
    setDiger(prev => ({ ...prev, [key]: val }));
  };

  const uyumRenk = { uygun: 'text-emerald-500', zorlanabilir: 'text-amber-500', zor: 'text-rose-500' };
  const uyumLabel = { uygun: '✓ Bütçenize Uygun', zorlanabilir: '⚠ Zorlayabilir', zor: '✗ Bütçenizi Aşıyor' };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

        {/* Sol: Parametreler */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-4">
          <h2 className="text-sm font-black text-gray-900">Kira Tercihleri</h2>

          <div>
            <label className="text-xs font-black text-gray-700 block mb-1">Aylık Net Gelir (₺)</label>
            <input type="number" value={aylikGelir} onChange={e => setAylikGelir(Number(e.target.value))} step={2500} min={5000}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm font-bold focus:outline-none focus:border-[#00C49F]" />
          </div>

          <div>
            <label className="text-xs font-black text-gray-700 block mb-1">Bölge</label>
            <select value={sehir} onChange={e => setSehir(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm font-bold focus:outline-none focus:border-[#00C49F] bg-white">
              {Object.keys(SEHIR_ORTALAMA).map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div>
            <label className="text-xs font-black text-gray-700 block mb-1">Oda Sayısı</label>
            <div className="flex gap-2 flex-wrap">
              {['1+0', '1+1', '2+1', '3+1', '4+1'].map(o => (
                <button key={o} onClick={() => setOda(o)}
                  className={`text-xs font-black px-3 py-1.5 rounded-full border transition-colors ${oda === o ? 'bg-[#00C49F] text-white border-[#00C49F]' : 'bg-white text-gray-500 border-gray-200'}`}>
                  {o}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Sağ: Diğer Giderler */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-3">
          <h2 className="text-sm font-black text-gray-900">Aylık Diğer Giderler</h2>
          {(Object.entries(diger) as [keyof typeof diger, number][]).map(([key, val]) => (
            <div key={key}>
              <label className="text-xs font-black text-gray-700 block mb-0.5 capitalize">{
                key === 'yiyecek' ? 'Yiyecek / Market' :
                key === 'ulasim' ? 'Ulaşım' :
                key === 'faturalar' ? 'Faturalar' :
                key === 'saglik' ? 'Sağlık' :
                key === 'eglence' ? 'Eğlence' : 'Diğer'
              }</label>
              <input type="number" value={val} onChange={e => handleDiger(key, Number(e.target.value))} step={500} min={0}
                className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-xs font-bold focus:outline-none focus:border-[#00C49F]" />
            </div>
          ))}
        </div>
      </div>

      {/* Sonuç */}
      <div className="bg-white rounded-2xl border border-[#00C49F]/30 p-6 shadow-sm">
        <h2 className="text-sm font-black text-gray-900 mb-4">Kira Bütçe Analizi</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
          {[
            { label: 'Önerilen Maks. Kira (%30)', value: `${kiraButce.onerilKira.toLocaleString('tr-TR')} ₺`, color: 'text-[#00C49F]' },
            { label: 'Maks. Kira Limiti (%40)', value: `${kiraButce.maxKira.toLocaleString('tr-TR')} ₺`, color: 'text-amber-500' },
            { label: 'Toplam Diğer Gider', value: `${kiraButce.genelGider.toLocaleString('tr-TR')} ₺`, color: 'text-gray-700' },
            { label: '%30 Kiradan Sonra Birikim', value: `${kiraButce.kiraHarcandiktan.toLocaleString('tr-TR')} ₺`, color: kiraButce.kiraHarcandiktan >= 0 ? 'text-emerald-500' : 'text-rose-500' },
            { label: 'Piyasa Kira Tahmini', value: `${kiraButce.tahminiMinKira.toLocaleString('tr-TR')}–${kiraButce.tahminiMaxKira.toLocaleString('tr-TR')} ₺`, color: 'text-blue-500' },
            { label: 'Bütçe Uyumu', value: uyumLabel[kiraButce.uyum], color: uyumRenk[kiraButce.uyum] },
          ].map((k, i) => (
            <div key={i} className="bg-gray-50 rounded-xl p-3 text-center">
              <p className="text-[10px] text-gray-500 mb-1">{k.label}</p>
              <p className={`text-xs font-black ${k.color}`}>{k.value}</p>
            </div>
          ))}
        </div>

        {/* Gider dağılımı bar */}
        <div className="space-y-1.5">
          {[
            { label: `Kira (%30)`, tutar: kiraButce.onerilKira, color: 'bg-[#00C49F]' },
            { label: 'Yiyecek', tutar: diger.yiyecek, color: 'bg-blue-400' },
            { label: 'Ulaşım', tutar: diger.ulasim, color: 'bg-purple-400' },
            { label: 'Faturalar', tutar: diger.faturalar, color: 'bg-amber-400' },
            { label: 'Diğer', tutar: diger.saglik + diger.eglence + diger.diger, color: 'bg-gray-400' },
          ].map((b, i) => {
            const pct = Math.min((b.tutar / aylikGelir) * 100, 100);
            return (
              <div key={i} className="flex items-center gap-3">
                <span className="text-[10px] font-black text-gray-500 w-24 shrink-0">{b.label}</span>
                <div className="flex-1 bg-gray-100 rounded-full h-2">
                  <div className={`${b.color} h-2 rounded-full`} style={{ width: `${pct}%` }} />
                </div>
                <span className="text-[10px] font-black text-gray-600 w-20 text-right shrink-0">{b.tutar.toLocaleString('tr-TR')} ₺</span>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
