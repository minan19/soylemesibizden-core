'use client';

import { useState, useMemo } from 'react';

export default function KiraGelirGiderClient() {
  const [evDegeri, setEvDegeri] = useState(3000000);
  const [aylikKira, setAylikKira] = useState(15000);
  const [aidat, setAidat] = useState(1500);
  const [bakimOrani, setBakimOrani] = useState(3);
  const [daskPrim, setDaskPrim] = useState(800);
  const [konutSigorta, setKonutSigorta] = useState(1500);
  const [emlakVergisi, setEmlakVergisi] = useState(2000);
  const [vergiliBeyan, setVergiliBeyan] = useState(true);
  const [gercekGider, setGercekGider] = useState(false);

  const sonuc = useMemo(() => {
    const yillikBrutKira = aylikKira * 12;
    const yillikAidat = aidat * 12;
    const yillikBakim = (evDegeri * bakimOrani) / 100;
    const yillikSigorta = daskPrim + konutSigorta;
    const toplamGider = yillikAidat + yillikBakim + yillikSigorta + emlakVergisi;

    const istisna = 22000;
    const vergiMatrahi = Math.max(0, yillikBrutKira - istisna);
    let gelirVergisi = 0;

    if (vergiliBeyan) {
      const goturu = gercekGider ? toplamGider : yillikBrutKira * 0.15;
      const netMatrah = Math.max(0, vergiMatrahi - goturu);
      if (netMatrah <= 110000) gelirVergisi = netMatrah * 0.15;
      else if (netMatrah <= 230000) gelirVergisi = 16500 + (netMatrah - 110000) * 0.20;
      else if (netMatrah <= 580000) gelirVergisi = 40500 + (netMatrah - 230000) * 0.27;
      else if (netMatrah <= 3000000) gelirVergisi = 135000 + (netMatrah - 580000) * 0.35;
      else gelirVergisi = 982000 + (netMatrah - 3000000) * 0.40;
    }

    const netKiraGeliri = yillikBrutKira - toplamGider - gelirVergisi;
    const brutGetiri = (yillikBrutKira / evDegeri) * 100;
    const netGetiri = (netKiraGeliri / evDegeri) * 100;
    const amortismanYil = evDegeri / netKiraGeliri;

    return { yillikBrutKira, yillikAidat, yillikBakim, yillikSigorta, toplamGider, gelirVergisi, netKiraGeliri, brutGetiri, netGetiri, amortismanYil };
  }, [evDegeri, aylikKira, aidat, bakimOrani, daskPrim, konutSigorta, emlakVergisi, vergiliBeyan, gercekGider]);

  const fmt = (n: number) => Math.round(n).toLocaleString('tr-TR');

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">

      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h2 className="text-base font-black text-gray-900 mb-6">Değerleri Girin</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="text-[10px] font-black text-gray-500 mb-1 block">Ev Değeri (₺)</label>
            <input type="number" value={evDegeri} onChange={e => setEvDegeri(Number(e.target.value))}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm font-bold focus:outline-none focus:border-[#00C49F]" />
          </div>
          <div>
            <label className="text-[10px] font-black text-gray-500 mb-1 block">Aylık Kira (₺)</label>
            <input type="number" value={aylikKira} onChange={e => setAylikKira(Number(e.target.value))}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm font-bold focus:outline-none focus:border-[#00C49F]" />
          </div>
          <div>
            <label className="text-[10px] font-black text-gray-500 mb-1 block">Aylık Aidat (₺)</label>
            <input type="number" value={aidat} onChange={e => setAidat(Number(e.target.value))}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm font-bold focus:outline-none focus:border-[#00C49F]" />
          </div>
          <div>
            <label className="text-[10px] font-black text-gray-500 mb-1 block">Yıllık Bakım Oranı (%)</label>
            <input type="number" step="0.5" value={bakimOrani} onChange={e => setBakimOrani(Number(e.target.value))}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm font-bold focus:outline-none focus:border-[#00C49F]" />
          </div>
          <div>
            <label className="text-[10px] font-black text-gray-500 mb-1 block">DASK Primi (₺/yıl)</label>
            <input type="number" value={daskPrim} onChange={e => setDaskPrim(Number(e.target.value))}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm font-bold focus:outline-none focus:border-[#00C49F]" />
          </div>
          <div>
            <label className="text-[10px] font-black text-gray-500 mb-1 block">Konut Sigortası (₺/yıl)</label>
            <input type="number" value={konutSigorta} onChange={e => setKonutSigorta(Number(e.target.value))}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm font-bold focus:outline-none focus:border-[#00C49F]" />
          </div>
          <div>
            <label className="text-[10px] font-black text-gray-500 mb-1 block">Emlak Vergisi (₺/yıl)</label>
            <input type="number" value={emlakVergisi} onChange={e => setEmlakVergisi(Number(e.target.value))}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm font-bold focus:outline-none focus:border-[#00C49F]" />
          </div>
          <div className="flex flex-col gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={vergiliBeyan} onChange={e => setVergiliBeyan(e.target.checked)} className="w-4 h-4 accent-[#00C49F]" />
              <span className="text-[11px] font-black text-gray-700">Gelir vergisi hesapla</span>
            </label>
            {vergiliBeyan && (
              <label className="flex items-center gap-2 cursor-pointer ml-6">
                <input type="checkbox" checked={gercekGider} onChange={e => setGercekGider(e.target.checked)} className="w-4 h-4 accent-[#00C49F]" />
                <span className="text-[11px] font-black text-gray-700">Gerçek gider yöntemi (%15 götürü değil)</span>
              </label>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h2 className="text-base font-black text-gray-900 mb-4">Yıllık Gelir-Gider Özeti</h2>
        <div className="space-y-2 text-[11px]">
          <div className="flex justify-between py-1.5 border-b border-gray-50">
            <span className="font-black text-gray-900">Brüt Kira Geliri (yıllık)</span>
            <span className="font-black text-[#00C49F]">{fmt(sonuc.yillikBrutKira)} ₺</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-gray-50">
            <span className="text-gray-600">Aidat Gideri</span>
            <span className="font-bold text-rose-500">−{fmt(sonuc.yillikAidat)} ₺</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-gray-50">
            <span className="text-gray-600">Bakım / Onarım</span>
            <span className="font-bold text-rose-500">−{fmt(sonuc.yillikBakim)} ₺</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-gray-50">
            <span className="text-gray-600">Sigorta (DASK + Konut)</span>
            <span className="font-bold text-rose-500">−{fmt(sonuc.yillikSigorta)} ₺</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-gray-50">
            <span className="text-gray-600">Emlak Vergisi</span>
            <span className="font-bold text-rose-500">−{fmt(emlakVergisi)} ₺</span>
          </div>
          {vergiliBeyan && (
            <div className="flex justify-between py-1.5 border-b border-gray-50">
              <span className="text-gray-600">Gelir Vergisi (tahmini)</span>
              <span className="font-bold text-rose-500">−{fmt(sonuc.gelirVergisi)} ₺</span>
            </div>
          )}
          <div className="flex justify-between py-2 bg-gray-50 rounded-xl px-3 mt-2">
            <span className="font-black text-gray-900">Net Kira Geliri</span>
            <span className="font-black text-[#00C49F]">{fmt(sonuc.netKiraGeliri)} ₺/yıl</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm text-center">
          <p className="text-[10px] text-gray-500 mb-1">Brüt Kira Getirisi</p>
          <p className="text-2xl font-black text-gray-900">%{sonuc.brutGetiri.toFixed(2)}</p>
          <p className="text-[10px] text-gray-400 mt-1">Vergisiz, gidersiz</p>
        </div>
        <div className={`bg-white rounded-2xl border p-5 shadow-sm text-center ${sonuc.netGetiri >= 4 ? 'border-emerald-200' : sonuc.netGetiri >= 3 ? 'border-amber-200' : 'border-rose-200'}`}>
          <p className="text-[10px] text-gray-500 mb-1">Net Kira Getirisi</p>
          <p className={`text-2xl font-black ${sonuc.netGetiri >= 4 ? 'text-emerald-600' : sonuc.netGetiri >= 3 ? 'text-amber-600' : 'text-rose-600'}`}>%{sonuc.netGetiri.toFixed(2)}</p>
          <p className="text-[10px] text-gray-400 mt-1">Tüm giderler düşüldükten sonra</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm text-center">
          <p className="text-[10px] text-gray-500 mb-1">Amortisman Süresi</p>
          <p className="text-2xl font-black text-gray-900">{sonuc.amortismanYil > 0 && isFinite(sonuc.amortismanYil) ? `${sonuc.amortismanYil.toFixed(0)} yıl` : '—'}</p>
          <p className="text-[10px] text-gray-400 mt-1">Net gelirle geri dönüş</p>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
        <p className="text-xs font-black text-amber-700 mb-2">Hesaplama Notları</p>
        <p className="text-[11px] text-amber-600 leading-relaxed">
          Gelir vergisi hesabı 2024 GVK dilimlerine göre yapılmıştır. 22.000 ₺ konut kira istisnası uygulanmaktadır. Boş kalma oranı ve beklenmedik giderler dahil değildir. Gerçek sonuçlar için mali müşavirden destek alın.
        </p>
      </div>

    </div>
  );
}
