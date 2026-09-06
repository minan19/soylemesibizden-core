'use client';

import { useState, useMemo } from 'react';

export default function NetBugunkuDegerClient() {
  const [yatirimTutari, setYatirimTutari] = useState(5000000);
  const [aylikKiraGetirisi, setAylikKiraGetirisi] = useState(25000);
  const [yillikKiraArtisi, setYillikKiraArtisi] = useState(25);
  const [indirgemOrani, setIndirgemOrani] = useState(30);
  const [sure, setSure] = useState(10);
  const [cikisMultiplier, setCikisMultiplier] = useState(20);

  const hesap = useMemo(() => {
    const r = indirgemOrani / 100;
    const aylikR = Math.pow(1 + r, 1 / 12) - 1;
    let nbdKiralar = 0;
    let toplamNominalKira = 0;
    let guncelAylikKira = aylikKiraGetirisi;
    const yillikVeriler: { yil: number; kiraNominal: number; kiraReelNbd: number }[] = [];

    for (let y = 1; y <= sure; y++) {
      let yilKiraNominal = 0;
      let yilKiraNbd = 0;
      const ayBasiKira = guncelAylikKira;
      for (let m = 1; m <= 12; m++) {
        const ayNo = (y - 1) * 12 + m;
        const nominal = guncelAylikKira;
        const nbd = nominal / Math.pow(1 + aylikR, ayNo);
        yilKiraNominal += nominal;
        yilKiraNbd += nbd;
      }
      guncelAylikKira = ayBasiKira * (1 + yillikKiraArtisi / 100);
      toplamNominalKira += yilKiraNominal;
      nbdKiralar += yilKiraNbd;
      yillikVeriler.push({ yil: y, kiraNominal: yilKiraNominal, kiraReelNbd: yilKiraNbd });
    }

    const cikisDegeri = guncelAylikKira * 12 * cikisMultiplier;
    const nbdCikis = cikisDegeri / Math.pow(1 + r, sure);
    const toplamNbd = nbdKiralar + nbdCikis;
    const nbdFarki = toplamNbd - yatirimTutari;
    const irr = toplamNbd > 0 ? ((Math.pow(toplamNbd / yatirimTutari, 1 / sure) - 1) * 100) : 0;

    return { nbdKiralar, nbdCikis, toplamNbd, nbdFarki, toplamNominalKira, cikisDegeri, irr, yillikVeriler };
  }, [yatirimTutari, aylikKiraGetirisi, yillikKiraArtisi, indirgemOrani, sure, cikisMultiplier]);

  const maxNbd = Math.max(...hesap.yillikVeriler.map(v => v.kiraReelNbd));

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">

      {/* Girişler */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h2 className="text-sm font-black text-gray-900 mb-4">Yatırım Parametreleri</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

          <div>
            <label className="text-xs font-black text-gray-700 block mb-1">Yatırım Tutarı (₺)</label>
            <input type="number" value={yatirimTutari} onChange={e => setYatirimTutari(Number(e.target.value))} step={250000} min={500000}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm font-bold focus:outline-none focus:border-[#00C49F]" />
          </div>

          <div>
            <label className="text-xs font-black text-gray-700 block mb-1">Aylık Kira Getirisi (₺)</label>
            <input type="number" value={aylikKiraGetirisi} onChange={e => setAylikKiraGetirisi(Number(e.target.value))} step={1000} min={1000}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm font-bold focus:outline-none focus:border-[#00C49F]" />
          </div>

          <div>
            <label className="text-xs font-black text-gray-700 block mb-1">Yıllık Kira Artışı: %{yillikKiraArtisi}</label>
            <input type="range" min={10} max={60} step={5} value={yillikKiraArtisi} onChange={e => setYillikKiraArtisi(Number(e.target.value))}
              className="w-full accent-[#00C49F]" />
          </div>

          <div>
            <label className="text-xs font-black text-gray-700 block mb-1">İskonto (İndirgeme) Oranı: %{indirgemOrani}</label>
            <input type="range" min={10} max={60} step={5} value={indirgemOrani} onChange={e => setIndirgemOrani(Number(e.target.value))}
              className="w-full accent-[#00C49F]" />
          </div>

          <div>
            <label className="text-xs font-black text-gray-700 block mb-1">Yatırım Süresi: {sure} yıl</label>
            <input type="range" min={3} max={20} step={1} value={sure} onChange={e => setSure(Number(e.target.value))}
              className="w-full accent-[#00C49F]" />
          </div>

          <div>
            <label className="text-xs font-black text-gray-700 block mb-1">Çıkış Değeri Çarpanı: {cikisMultiplier}× yıllık kira</label>
            <input type="range" min={10} max={30} step={1} value={cikisMultiplier} onChange={e => setCikisMultiplier(Number(e.target.value))}
              className="w-full accent-[#00C49F]" />
          </div>
        </div>
      </div>

      {/* Sonuç Kartları */}
      <div className="bg-white rounded-2xl border border-[#00C49F]/30 p-6 shadow-sm">
        <h2 className="text-sm font-black text-gray-900 mb-4">NBD Analizi Sonuçları</h2>

        <div className={`text-center py-3 rounded-xl mb-5 ${hesap.nbdFarki >= 0 ? 'bg-emerald-50 border border-emerald-200' : 'bg-rose-50 border border-rose-200'}`}>
          <p className={`text-[10px] font-black mb-1 ${hesap.nbdFarki >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
            {hesap.nbdFarki >= 0 ? '✓ Pozitif NBD — Yatırım Kârlı' : '✗ Negatif NBD — Yatırım Kayıplı'}
          </p>
          <p className={`text-xl font-black ${hesap.nbdFarki >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
            {hesap.nbdFarki >= 0 ? '+' : ''}{Math.round(hesap.nbdFarki).toLocaleString('tr-TR')} ₺
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { label: 'Toplam NBD', value: `${Math.round(hesap.toplamNbd).toLocaleString('tr-TR')} ₺`, color: 'text-[#00C49F]' },
            { label: 'Kira Nakit Akışları NBD', value: `${Math.round(hesap.nbdKiralar).toLocaleString('tr-TR')} ₺`, color: 'text-blue-500' },
            { label: 'Çıkış Değeri NBD', value: `${Math.round(hesap.nbdCikis).toLocaleString('tr-TR')} ₺`, color: 'text-purple-500' },
            { label: 'Nominal Kira Toplamı', value: `${Math.round(hesap.toplamNominalKira).toLocaleString('tr-TR')} ₺`, color: 'text-gray-700' },
            { label: 'Tahmini Çıkış Değeri', value: `${Math.round(hesap.cikisDegeri).toLocaleString('tr-TR')} ₺`, color: 'text-amber-500' },
            { label: 'Yaklaşık IRR', value: `%${hesap.irr.toFixed(1)}`, color: hesap.irr >= indirgemOrani ? 'text-emerald-600' : 'text-rose-500' },
          ].map((k, i) => (
            <div key={i} className="bg-gray-50 rounded-xl p-3 text-center">
              <p className="text-[10px] text-gray-500 mb-1">{k.label}</p>
              <p className={`text-xs font-black ${k.color}`}>{k.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Yıllık Bar Chart */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h2 className="text-sm font-black text-gray-900 mb-4">Yıllık NBD Kira Nakit Akışı</h2>
        <div className="space-y-2">
          {hesap.yillikVeriler.map((v) => {
            const pct = maxNbd > 0 ? (v.kiraReelNbd / maxNbd) * 100 : 0;
            return (
              <div key={v.yil} className="flex items-center gap-3">
                <span className="text-[10px] font-black text-gray-500 w-10 shrink-0">{v.yil}. yıl</span>
                <div className="flex-1 bg-gray-100 rounded-full h-2">
                  <div className="bg-[#00C49F] h-2 rounded-full" style={{ width: `${pct}%` }} />
                </div>
                <span className="text-[10px] font-black text-[#00C49F] w-28 text-right shrink-0">{Math.round(v.kiraReelNbd).toLocaleString('tr-TR')} ₺</span>
              </div>
            );
          })}
        </div>
        <p className="text-[10px] text-gray-400 mt-3">* Her yılın kira akışının bugünkü değeri (iskonto uygulanmış)</p>
      </div>

      {/* Açıklama */}
      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
        <p className="text-xs font-black text-blue-700 mb-2">NBD Nedir?</p>
        <p className="text-[11px] text-blue-600 leading-relaxed">
          Net Bugünkü Değer (NBD), gelecekteki tüm nakit akışlarının bugünkü değere indirgenmesiyle hesaplanır. Pozitif NBD yatırımın seçilen iskonto oranının üzerinde getiri sağladığını gösterir. İskonto oranını alternatif yatırım getirisi (mevduat, enflasyon, borsa) olarak seçin.
        </p>
      </div>

    </div>
  );
}
