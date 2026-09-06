'use client';

import { useState, useMemo } from 'react';

export default function NetKiraClient() {
  const [aylikKira, setAylikKira] = useState(15000);
  const [evDegeri, setEvDegeri] = useState(3000000);
  const [aylik_aidat, setAylikAidat] = useState(800);
  const [yillik_emlak_vergisi, setYillikEmlakVergisi] = useState(3000);
  const [yillik_sigorta, setYillikSigorta] = useState(2000);
  const [yillik_bakim, setYillikBakim] = useState(5000);
  const [bos_ay, setBosAy] = useState(1);
  const [gider_yontemi, setGiderYontemi] = useState<'goturu' | 'gercek'>('goturu');
  const [kredi_faizi, setKrediFaizi] = useState(0);

  const hesap = useMemo(() => {
    const yillikBrutKira = aylikKira * (12 - bos_ay);

    const gercekGiderler = (aylik_aidat * 12) + yillik_emlak_vergisi + yillik_sigorta + yillik_bakim + kredi_faizi;
    const goturuGider = yillikBrutKira * 0.15;
    const toplam_gider = gider_yontemi === 'goturu' ? goturuGider : gercekGiderler;

    const vergiMatrahi = Math.max(0, yillikBrutKira - toplam_gider);

    // 2024 GVK dilimleri (kira geliri)
    let vergi = 0;
    const istisna = 33000; // 2024 konut kira geliri istisnası
    const matrahSonrasi = Math.max(0, vergiMatrahi - istisna);
    if (matrahSonrasi <= 110000) vergi = matrahSonrasi * 0.15;
    else if (matrahSonrasi <= 230000) vergi = 110000 * 0.15 + (matrahSonrasi - 110000) * 0.20;
    else if (matrahSonrasi <= 870000) vergi = 110000 * 0.15 + 120000 * 0.20 + (matrahSonrasi - 230000) * 0.27;
    else if (matrahSonrasi <= 3000000) vergi = 110000 * 0.15 + 120000 * 0.20 + 640000 * 0.27 + (matrahSonrasi - 870000) * 0.35;
    else vergi = 110000 * 0.15 + 120000 * 0.20 + 640000 * 0.27 + 2130000 * 0.35 + (matrahSonrasi - 3000000) * 0.40;

    const netKiraGeliri = yillikBrutKira - toplam_gider - vergi;
    const brutGetiri = (yillikBrutKira / evDegeri) * 100;
    const netGetiri = (netKiraGeliri / evDegeri) * 100;
    const amortisman = evDegeri / yillikBrutKira;

    return {
      yillikBrutKira,
      gercekGiderler,
      goturuGider,
      toplam_gider,
      vergiMatrahi,
      vergi,
      netKiraGeliri,
      brutGetiri,
      netGetiri,
      amortisman,
      istisna,
    };
  }, [aylikKira, evDegeri, aylik_aidat, yillik_emlak_vergisi, yillik_sigorta, yillik_bakim, bos_ay, gider_yontemi, kredi_faizi]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">

      {/* Giriş */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h2 className="text-sm font-black text-gray-900 mb-5">Kira ve Mülk Bilgileri</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="text-xs font-black text-gray-700 block mb-1">Aylık Kira (₺)</label>
            <input type="number" value={aylikKira} onChange={e => setAylikKira(Number(e.target.value))} step={500} min={0}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm font-bold focus:outline-none focus:border-[#00C49F]" />
          </div>
          <div>
            <label className="text-xs font-black text-gray-700 block mb-1">Mülk Değeri (₺)</label>
            <input type="number" value={evDegeri} onChange={e => setEvDegeri(Number(e.target.value))} step={100000} min={0}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm font-bold focus:outline-none focus:border-[#00C49F]" />
          </div>
          <div>
            <label className="text-xs font-black text-gray-700 block mb-1">Aylık Aidat (₺)</label>
            <input type="number" value={aylik_aidat} onChange={e => setAylikAidat(Number(e.target.value))} step={100} min={0}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm font-bold focus:outline-none focus:border-[#00C49F]" />
          </div>
          <div>
            <label className="text-xs font-black text-gray-700 block mb-1">Yıllık Emlak Vergisi (₺)</label>
            <input type="number" value={yillik_emlak_vergisi} onChange={e => setYillikEmlakVergisi(Number(e.target.value))} step={100} min={0}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm font-bold focus:outline-none focus:border-[#00C49F]" />
          </div>
          <div>
            <label className="text-xs font-black text-gray-700 block mb-1">Yıllık Sigorta (₺)</label>
            <input type="number" value={yillik_sigorta} onChange={e => setYillikSigorta(Number(e.target.value))} step={100} min={0}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm font-bold focus:outline-none focus:border-[#00C49F]" />
          </div>
          <div>
            <label className="text-xs font-black text-gray-700 block mb-1">Yıllık Bakım/Onarım (₺)</label>
            <input type="number" value={yillik_bakim} onChange={e => setYillikBakim(Number(e.target.value))} step={500} min={0}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm font-bold focus:outline-none focus:border-[#00C49F]" />
          </div>
          <div>
            <label className="text-xs font-black text-gray-700 block mb-1">Yıllık Kredi Faizi (₺, varsa)</label>
            <input type="number" value={kredi_faizi} onChange={e => setKrediFaizi(Number(e.target.value))} step={1000} min={0}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm font-bold focus:outline-none focus:border-[#00C49F]" />
          </div>
          <div>
            <label className="text-xs font-black text-gray-700 block mb-1">Boş Kalan Ay: {bos_ay}</label>
            <input type="range" min={0} max={6} step={1} value={bos_ay} onChange={e => setBosAy(Number(e.target.value))}
              className="w-full accent-[#00C49F]" />
          </div>
        </div>

        <div className="mt-4">
          <label className="text-xs font-black text-gray-700 block mb-2">Gider Yöntemi</label>
          <div className="flex gap-3">
            {(['goturu', 'gercek'] as const).map(y => (
              <button key={y} onClick={() => setGiderYontemi(y)}
                className={`flex-1 py-2 rounded-xl text-xs font-black border transition-all ${gider_yontemi === y ? 'bg-[#00C49F] text-white border-[#00C49F]' : 'bg-white text-gray-600 border-gray-200'}`}>
                {y === 'goturu' ? `Götürü (%15) — ${Math.round(hesap.goturuGider).toLocaleString('tr-TR')} ₺` : `Gerçek Gider — ${Math.round(hesap.gercekGiderler).toLocaleString('tr-TR')} ₺`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Özet */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Brüt Kira Geliri', value: `${Math.round(hesap.yillikBrutKira).toLocaleString('tr-TR')} ₺`, sub: `${12 - bos_ay} aylık` },
          { label: 'Toplam Gider', value: `${Math.round(hesap.toplam_gider).toLocaleString('tr-TR')} ₺`, sub: `${gider_yontemi === 'goturu' ? 'Götürü %15' : 'Gerçek gider'}` },
          { label: 'Ödenen Vergi', value: `${Math.round(hesap.vergi).toLocaleString('tr-TR')} ₺`, sub: `${hesap.istisna.toLocaleString('tr-TR')} ₺ istisna sonrası` },
          { label: 'Net Kira Geliri', value: `${Math.round(hesap.netKiraGeliri).toLocaleString('tr-TR')} ₺`, sub: 'Yıllık net' },
        ].map((k, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm text-center">
            <p className="text-[10px] text-gray-500 mb-1">{k.label}</p>
            <p className="text-sm font-black text-[#00C49F]">{k.value}</p>
            <p className="text-[10px] text-gray-400 mt-0.5">{k.sub}</p>
          </div>
        ))}
      </div>

      {/* Getiri Analizi */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h2 className="text-sm font-black text-gray-900 mb-4">Getiri Analizi</h2>
        <div className="space-y-3">
          {[
            { label: 'Brüt Kira Getirisi', value: `%${hesap.brutGetiri.toFixed(2)}`, pct: Math.min(hesap.brutGetiri * 10, 100) },
            { label: 'Net Kira Getirisi', value: `%${hesap.netGetiri.toFixed(2)}`, pct: Math.min(hesap.netGetiri * 10, 100) },
          ].map((g, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="text-[10px] font-black text-gray-600 w-32 shrink-0">{g.label}</span>
              <div className="flex-1 bg-gray-100 rounded-full h-3">
                <div className="bg-[#00C49F] h-3 rounded-full" style={{ width: `${g.pct}%` }} />
              </div>
              <span className="text-xs font-black text-[#00C49F] w-14 text-right shrink-0">{g.value}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-gray-50">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-gray-700">Amortisman Süresi</span>
            <span className="text-sm font-black text-[#00C49F]">{hesap.amortisman.toFixed(1)} Yıl</span>
          </div>
          <p className="text-[10px] text-gray-400 mt-1">Mülk değerini kira geliriyle karşılamak için gereken süre.</p>
        </div>
      </div>

    </div>
  );
}
