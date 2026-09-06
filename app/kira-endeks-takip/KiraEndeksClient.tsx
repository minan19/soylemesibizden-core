'use client';

import { useState, useMemo } from 'react';

const TUFE_AYLIK: Record<string, number> = {
  'Ocak 2024': 6.70,
  'Şubat 2024': 4.53,
  'Mart 2024': 3.16,
  'Nisan 2024': 3.18,
  'Mayıs 2024': 3.37,
  'Haziran 2024': 1.64,
  'Temmuz 2024': 3.23,
  'Ağustos 2024': 2.47,
  'Eylül 2024': 2.97,
  'Ekim 2024': 2.88,
  'Kasım 2024': 2.24,
  'Aralık 2024': 1.03,
  'Ocak 2025': 5.03,
  'Şubat 2025': 2.27,
  'Mart 2025': 2.46,
  'Nisan 2025': 3.00,
  'Mayıs 2025': 1.61,
  'Haziran 2025': 1.38,
  'Temmuz 2025': 2.80,
  'Ağustos 2025': 2.05,
};

const AY_LISTESI = Object.keys(TUFE_AYLIK);

export default function KiraEndeksClient() {
  const [baslangicKira, setBaslangicKira] = useState(15000);
  const [baslangicAy, setBaslangicAy] = useState('Ocak 2024');
  const [bitisAy, setBitisAy] = useState('Ağustos 2025');
  const [tavanUygula, setTavanUygula] = useState(true);

  const hesap = useMemo(() => {
    const bas = AY_LISTESI.indexOf(baslangicAy);
    const bit = AY_LISTESI.indexOf(bitisAy);
    if (bas < 0 || bit < 0 || bit < bas) return null;

    const aylar = AY_LISTESI.slice(bas, bit + 1);

    let birikim = 1;
    const adet = aylar.length - 1;
    for (let i = 0; i < adet; i++) {
      birikim *= (1 + (TUFE_AYLIK[aylar[i]] ?? 0) / 100);
    }
    const tumTufe = (birikim - 1) * 100;
    const yillikTufe = adet >= 12 ? ((Math.pow(birikim, 12 / adet) - 1) * 100) : tumTufe;

    const uygulananArtis = tavanUygula ? Math.min(tumTufe, 25) : tumTufe;
    const yeniKira = baslangicKira * (1 + uygulananArtis / 100);
    const tavansizKira = baslangicKira * (1 + tumTufe / 100);
    const kayip = tavansizKira - yeniKira;
    const ayFarki = bit - bas;

    const aylikSeyir = aylar.map((ay, i) => {
      let cumTufe = 1;
      for (let j = 0; j < i; j++) {
        cumTufe *= (1 + (TUFE_AYLIK[aylar[j]] ?? 0) / 100);
      }
      const oran = (cumTufe - 1) * 100;
      const uyg = tavanUygula ? Math.min(oran, 25) : oran;
      return { ay, kira: baslangicKira * (1 + uyg / 100) };
    });

    return { tumTufe, yillikTufe, uygulananArtis, yeniKira, tavansizKira, kayip, ayFarki, aylikSeyir };
  }, [baslangicKira, baslangicAy, bitisAy, tavanUygula]);

  const maxKira = hesap ? Math.max(...hesap.aylikSeyir.map(a => a.kira)) : 1;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">

      {/* Giriş */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h2 className="text-sm font-black text-gray-900 mb-4">Kira ve Dönem Seçimi</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="text-xs font-black text-gray-700 block mb-1">Başlangıç Kirası (₺)</label>
            <input type="number" value={baslangicKira} onChange={e => setBaslangicKira(Number(e.target.value))} step={500} min={1000}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm font-bold focus:outline-none focus:border-[#00C49F]" />
          </div>
          <div>
            <label className="text-xs font-black text-gray-700 block mb-1">Başlangıç Ayı</label>
            <select value={baslangicAy} onChange={e => setBaslangicAy(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm font-bold focus:outline-none focus:border-[#00C49F] bg-white">
              {AY_LISTESI.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-black text-gray-700 block mb-1">Bitiş Ayı</label>
            <select value={bitisAy} onChange={e => setBitisAy(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm font-bold focus:outline-none focus:border-[#00C49F] bg-white">
              {AY_LISTESI.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-3 self-end pb-2">
            <input type="checkbox" id="tavan" checked={tavanUygula} onChange={e => setTavanUygula(e.target.checked)}
              className="accent-[#00C49F] w-4 h-4" />
            <label htmlFor="tavan" className="text-xs font-black text-gray-700">%25 Yasal Tavan Uygula</label>
          </div>
        </div>
      </div>

      {hesap ? (
        <>
          {/* KPI Kartları */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-white rounded-2xl border border-gray-100 p-4 text-center shadow-sm">
              <p className="text-[10px] text-gray-500 mb-1">Dönem TÜFE</p>
              <p className="text-sm font-black text-amber-500">%{hesap.tumTufe.toFixed(1)}</p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 p-4 text-center shadow-sm">
              <p className="text-[10px] text-gray-500 mb-1">Uygulanan Artış</p>
              <p className="text-sm font-black text-[#00C49F]">%{hesap.uygulananArtis.toFixed(1)}</p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 p-4 text-center shadow-sm">
              <p className="text-[10px] text-gray-500 mb-1">Yeni Kira</p>
              <p className="text-sm font-black text-gray-900">{Math.round(hesap.yeniKira).toLocaleString('tr-TR')} ₺</p>
            </div>
            <div className={`rounded-2xl border p-4 text-center shadow-sm ${hesap.kayip > 0 ? 'bg-rose-50 border-rose-100' : 'bg-gray-50 border-gray-100'}`}>
              <p className="text-[10px] text-gray-500 mb-1">{tavanUygula ? 'Tavan Kayıp' : 'Gerçek Artış'}</p>
              <p className={`text-sm font-black ${hesap.kayip > 0 ? 'text-rose-500' : 'text-gray-900'}`}>
                {hesap.kayip > 0 ? `${Math.round(hesap.kayip).toLocaleString('tr-TR')} ₺` : '—'}
              </p>
            </div>
          </div>

          {/* Karşılaştırma */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h2 className="text-sm font-black text-gray-900 mb-4">TÜFE vs %25 Tavan Karşılaştırması</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <p className="text-[10px] text-gray-500 mb-1">Başlangıç Kira</p>
                <p className="text-xs font-black text-gray-900">{baslangicKira.toLocaleString('tr-TR')} ₺</p>
              </div>
              <div className="bg-[#00C49F]/10 rounded-xl p-4 text-center">
                <p className="text-[10px] text-gray-500 mb-1">{tavanUygula ? '%25 Tavan ile' : 'TÜFE ile'} Kira</p>
                <p className="text-xs font-black text-[#00C49F]">{Math.round(hesap.yeniKira).toLocaleString('tr-TR')} ₺</p>
              </div>
              <div className="bg-rose-50 rounded-xl p-4 text-center">
                <p className="text-[10px] text-gray-500 mb-1">Tam TÜFE ile Kira</p>
                <p className="text-xs font-black text-rose-500">{Math.round(hesap.tavansizKira).toLocaleString('tr-TR')} ₺</p>
              </div>
            </div>

            {/* Kira seyri bar chart */}
            <div className="space-y-1.5">
              {hesap.aylikSeyir.map(({ ay, kira }) => {
                const pct = (kira / maxKira) * 100;
                return (
                  <div key={ay} className="flex items-center gap-2">
                    <span className="text-[9px] text-gray-400 w-24 shrink-0">{ay}</span>
                    <div className="flex-1 bg-gray-100 rounded-full h-2">
                      <div className="bg-[#00C49F] h-2 rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="text-[9px] font-black text-gray-600 w-20 text-right shrink-0">{Math.round(kira).toLocaleString('tr-TR')} ₺</span>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      ) : (
        <div className="bg-amber-50 rounded-2xl border border-amber-100 p-6 text-center">
          <p className="text-xs font-black text-amber-600">Geçerli bir dönem seçin (başlangıç ≤ bitiş)</p>
        </div>
      )}

    </div>
  );
}
