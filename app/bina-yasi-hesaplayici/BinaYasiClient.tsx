'use client';

import { useState, useMemo } from 'react';

const YAS_GRUPLARI = [
  { etiket: '0–2 yıl', min: 0, max: 2, degerKatsayi: 1.20, aciklama: 'Sıfır veya neredeyse sıfır bina' },
  { etiket: '3–5 yıl', min: 3, max: 5, degerKatsayi: 1.12, aciklama: 'Yeni bina, garantiler geçerli' },
  { etiket: '6–10 yıl', min: 6, max: 10, degerKatsayi: 1.05, aciklama: 'Genç bina, minimal bakım' },
  { etiket: '11–20 yıl', min: 11, max: 20, degerKatsayi: 0.95, aciklama: 'Orta yaş, periyodik bakım gerekir' },
  { etiket: '21–30 yıl', min: 21, max: 30, degerKatsayi: 0.85, aciklama: 'Yaşlı bina, önemli bakım olası' },
  { etiket: '31–40 yıl', min: 31, max: 40, degerKatsayi: 0.72, aciklama: 'Kentsel dönüşüm adayı' },
  { etiket: '40+ yıl', min: 41, max: 999, degerKatsayi: 0.55, aciklama: 'Yüksek risk, acil dönüşüm' },
];

const BAKIM_MALIYETLERI = [
  { yilAraligi: '0–5 yıl', yillikBakim: 0.3, buyukBakim: 0, sure: 'İlk 5 yıl sorunsuz' },
  { yilAraligi: '6–15 yıl', yillikBakim: 0.5, buyukBakim: 2.0, sure: '10–15. yılda kombi/ısıtma' },
  { yilAraligi: '16–25 yıl', yillikBakim: 1.0, buyukBakim: 5.0, sure: 'Tesisat, pencere yenileme' },
  { yilAraligi: '26–35 yıl', yillikBakim: 1.5, buyukBakim: 8.0, sure: 'Çatı, dış cephe, elektrik' },
  { yilAraligi: '35+ yıl', yillikBakim: 2.5, buyukBakim: 15.0, sure: 'Kapsamlı tadilat veya dönüşüm' },
];

export default function BinaYasiClient() {
  const [binaYasi, setBinaYasi] = useState(15);
  const [konutDegeri, setKonutDegeri] = useState(5000000);
  const [oda, setOda] = useState('2+1');
  const [yenileme, setYenileme] = useState<boolean[]>([false, false, false, false]);

  const yenilemeItems = ['Mutfak dolabı yenileme', 'Banyo revizyonu', 'Kombi / ısıtma değişimi', 'Pencere yenileme'];
  const yenilemeMaliyetleri = [15000, 50000, 25000, 20000];

  const toggleYenileme = (i: number) => {
    setYenileme(prev => prev.map((v, idx) => idx === i ? !v : v));
  };

  const hesap = useMemo(() => {
    const grup = YAS_GRUPLARI.find(g => binaYasi >= g.min && binaYasi <= g.max) ?? YAS_GRUPLARI[YAS_GRUPLARI.length - 1];
    const yenilemePiyasaDegeri = konutDegeri * grup.degerKatsayi;

    const bakimGrubu = BAKIM_MALIYETLERI.find(b => {
      const [minStr, maxStr] = b.yilAraligi.replace('+', '–999').split('–');
      return binaYasi >= parseInt(minStr) && binaYasi <= parseInt(maxStr);
    }) ?? BAKIM_MALIYETLERI[BAKIM_MALIYETLERI.length - 1];

    const yillikBakim = konutDegeri * (bakimGrubu.yillikBakim / 100);
    const buyukBakim5Yil = konutDegeri * (bakimGrubu.buyukBakim / 100);
    const toplamYenileme = yenilemeMaliyetleri.reduce((s, v, i) => s + (yenileme[i] ? v : 0), 0);
    const degerArtisiYenileme = toplamYenileme * 1.4;

    const yasDusumu = ((1 - grup.degerKatsayi) * 100).toFixed(1);
    const hedefDeger = yenilemePiyasaDegeri + degerArtisiYenileme - toplamYenileme;

    return { grup, yenilemePiyasaDegeri, yillikBakim, buyukBakim5Yil, toplamYenileme, degerArtisiYenileme, yasDusumu, hedefDeger };
  }, [binaYasi, konutDegeri, yenileme]);

  const degerRenk = binaYasi <= 5 ? 'text-emerald-600' : binaYasi <= 15 ? 'text-[#00C49F]' : binaYasi <= 25 ? 'text-amber-500' : 'text-rose-500';

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">

      {/* Girişler */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h2 className="text-sm font-black text-gray-900 mb-4">Bina Özellikleri</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

          <div>
            <label className="text-xs font-black text-gray-700 block mb-1">Bina Yaşı: {binaYasi} yıl</label>
            <input type="range" min={0} max={60} step={1} value={binaYasi} onChange={e => setBinaYasi(Number(e.target.value))}
              className="w-full accent-[#00C49F]" />
            <div className="flex justify-between text-[9px] text-gray-400 mt-1">
              <span>0</span><span>15</span><span>30</span><span>45</span><span>60</span>
            </div>
          </div>

          <div>
            <label className="text-xs font-black text-gray-700 block mb-1">Güncel Piyasa Değeri (₺)</label>
            <input type="number" value={konutDegeri} onChange={e => setKonutDegeri(Number(e.target.value))} step={250000} min={500000}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm font-bold focus:outline-none focus:border-[#00C49F]" />
          </div>

          <div className="sm:col-span-2">
            <label className="text-xs font-black text-gray-700 block mb-2">Yapılan / Planlanan Yenilemeler</label>
            <div className="grid grid-cols-2 gap-2">
              {yenilemeItems.map((item, i) => (
                <button key={i} onClick={() => toggleYenileme(i)}
                  className={`text-[10px] font-black px-3 py-2 rounded-lg border text-left transition-colors ${yenileme[i] ? 'border-[#00C49F] bg-[#F0FDF8] text-[#00C49F]' : 'border-gray-200 bg-white text-gray-500'}`}>
                  {yenileme[i] ? '✓ ' : '+ '}{item}
                  <span className="block text-[9px] font-bold mt-0.5 opacity-70">{yenilemeMaliyetleri[i].toLocaleString('tr-TR')} ₺</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sonuç */}
      <div className="bg-white rounded-2xl border border-[#00C49F]/30 p-6 shadow-sm">
        <h2 className="text-sm font-black text-gray-900 mb-1">Bina Yaşı Analizi</h2>
        <p className={`text-xs font-black mb-4 ${degerRenk}`}>{hesap.grup.etiket} — {hesap.grup.aciklama}</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
          {[
            { label: 'Yaşa Göre Değer Düşümü', value: `-%${hesap.yasDusumu}`, color: parseFloat(hesap.yasDusumu) > 10 ? 'text-rose-500' : 'text-amber-500' },
            { label: 'Piyasa Değer Katsayısı', value: `${hesap.grup.degerKatsayi}×`, color: 'text-gray-700' },
            { label: 'Yaşa Göre Değer', value: `${Math.round(hesap.yenilemePiyasaDegeri).toLocaleString('tr-TR')} ₺`, color: 'text-[#00C49F]' },
            { label: 'Yıllık Bakım Maliyeti', value: `${Math.round(hesap.yillikBakim).toLocaleString('tr-TR')} ₺`, color: 'text-amber-500' },
            { label: 'Büyük Bakım (5 yıl)', value: `${Math.round(hesap.buyukBakim5Yil).toLocaleString('tr-TR')} ₺`, color: 'text-rose-500' },
            { label: 'Yenileme Sonrası Değer', value: `${Math.round(hesap.hedefDeger).toLocaleString('tr-TR')} ₺`, color: 'text-emerald-600' },
          ].map((k, i) => (
            <div key={i} className="bg-gray-50 rounded-xl p-3 text-center">
              <p className="text-[10px] text-gray-500 mb-1">{k.label}</p>
              <p className={`text-xs font-black ${k.color}`}>{k.value}</p>
            </div>
          ))}
        </div>

        {/* Değer Düşümü Bar */}
        <div className="space-y-2 mt-4">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-black text-gray-500 w-32 shrink-0">Orijinal Değer</span>
            <div className="flex-1 bg-gray-100 rounded-full h-2.5">
              <div className="bg-gray-300 h-2.5 rounded-full" style={{ width: '100%' }} />
            </div>
            <span className="text-[10px] font-black text-gray-500 w-28 text-right shrink-0">{konutDegeri.toLocaleString('tr-TR')} ₺</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-black text-gray-500 w-32 shrink-0">Yaşa Göre Değer</span>
            <div className="flex-1 bg-gray-100 rounded-full h-2.5">
              <div className="bg-[#00C49F] h-2.5 rounded-full" style={{ width: `${hesap.grup.degerKatsayi * 100}%` }} />
            </div>
            <span className="text-[10px] font-black text-[#00C49F] w-28 text-right shrink-0">{Math.round(hesap.yenilemePiyasaDegeri).toLocaleString('tr-TR')} ₺</span>
          </div>
          {hesap.toplamYenileme > 0 && (
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-black text-gray-500 w-32 shrink-0">Yenileme Sonrası</span>
              <div className="flex-1 bg-gray-100 rounded-full h-2.5">
                <div className="bg-emerald-400 h-2.5 rounded-full" style={{ width: `${Math.min((hesap.hedefDeger / konutDegeri) * 100, 100)}%` }} />
              </div>
              <span className="text-[10px] font-black text-emerald-500 w-28 text-right shrink-0">{Math.round(hesap.hedefDeger).toLocaleString('tr-TR')} ₺</span>
            </div>
          )}
        </div>
      </div>

      {/* Yaş Grupları Tablosu */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm overflow-x-auto">
        <h2 className="text-sm font-black text-gray-900 mb-4">Bina Yaşı Değer Katsayıları</h2>
        <table className="w-full text-[10px] min-w-[360px]">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left py-2 font-black text-gray-500">Yaş Aralığı</th>
              <th className="text-center py-2 font-black text-gray-500">Katsayı</th>
              <th className="text-right py-2 font-black text-[#00C49F]">Açıklama</th>
            </tr>
          </thead>
          <tbody>
            {YAS_GRUPLARI.map((g, i) => (
              <tr key={i} className={`border-b border-gray-50 last:border-0 ${binaYasi >= g.min && binaYasi <= g.max ? 'bg-[#F0FDF8]' : ''}`}>
                <td className="py-2 font-black text-gray-900">{g.etiket}</td>
                <td className="py-2 text-center font-black text-[#00C49F]">{g.degerKatsayi}×</td>
                <td className="py-2 text-right font-bold text-gray-500">{g.aciklama}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
