'use client';

import { useState, useMemo } from 'react';

const KREDI_NOTU_PUAN: Record<string, number> = {
  '800+': 30,
  '700-799': 22,
  '600-699': 12,
  '500-599': 4,
  '500 altı': 0,
};

const ISTIHDAM_PUAN: Record<string, number> = {
  'Kadrolu (2+ yıl)': 25,
  'Kadrolu (1-2 yıl)': 18,
  'Kadrolu (1 yıl altı)': 10,
  'Serbest Meslek (3+ yıl)': 20,
  'Serbest Meslek (1-3 yıl)': 12,
  'Emekli': 22,
  'İşsiz / Gelir Yok': 0,
};

const KRITERLER = [
  { kriter: 'Kredi Notu', agirlik: '%30', aciklama: 'Findeks/KKB skoru', min: 0, max: 30 },
  { kriter: 'Gelir-Taksit Oranı', agirlik: '%25', aciklama: 'Taksit net gelirin %50\'sini geçmemeli', min: 0, max: 25 },
  { kriter: 'İstihdam Durumu', agirlik: '%25', aciklama: 'Çalışma süresi ve tipi', min: 0, max: 25 },
  { kriter: 'Peşinat Oranı', agirlik: '%15', aciklama: 'Mülk değerinin en az %20\'si', min: 0, max: 15 },
  { kriter: 'Mevcut Borç Yükü', agirlik: '%5', aciklama: 'Aktif kredi ve kredi kartı borçları', min: 0, max: 5 },
];

export default function KonutKredisiPuanlamaClient() {
  const [netGelir, setNetGelir] = useState(50000);
  const [tahminiTaksit, setTahminiTaksit] = useState(18000);
  const [krediNotu, setKrediNotu] = useState('700-799');
  const [istihdam, setIstihdam] = useState('Kadrolu (2+ yıl)');
  const [pesinatOran, setPesinatOran] = useState(25);
  const [mevcutBorc, setMevcutBorc] = useState(0);

  const sonuc = useMemo(() => {
    // Kredi notu puanı (max 30)
    const krediNotuPuan = KREDI_NOTU_PUAN[krediNotu] ?? 0;

    // Gelir-Taksit oranı puanı (max 25)
    const gTOran = netGelir > 0 ? (tahminiTaksit / netGelir) * 100 : 100;
    let gelirTaksitPuan = 0;
    if (gTOran <= 30) gelirTaksitPuan = 25;
    else if (gTOran <= 40) gelirTaksitPuan = 18;
    else if (gTOran <= 50) gelirTaksitPuan = 10;
    else if (gTOran <= 60) gelirTaksitPuan = 4;
    else gelirTaksitPuan = 0;

    // İstihdam puanı (max 25)
    const istihdamPuan = ISTIHDAM_PUAN[istihdam] ?? 0;

    // Peşinat puanı (max 15)
    let pesinatPuan = 0;
    if (pesinatOran >= 40) pesinatPuan = 15;
    else if (pesinatOran >= 30) pesinatPuan = 12;
    else if (pesinatOran >= 20) pesinatPuan = 8;
    else if (pesinatOran >= 10) pesinatPuan = 3;
    else pesinatPuan = 0;

    // Mevcut borç puanı (max 5)
    const borcOran = netGelir > 0 ? (mevcutBorc / netGelir) * 100 : 100;
    let borcPuan = 0;
    if (borcOran === 0) borcPuan = 5;
    else if (borcOran <= 10) borcPuan = 4;
    else if (borcOran <= 20) borcPuan = 2;
    else borcPuan = 0;

    const toplamPuan = krediNotuPuan + gelirTaksitPuan + istihdamPuan + pesinatPuan + borcPuan;

    let sonucMetni = '';
    let sonucRenk = '';
    if (toplamPuan >= 80) { sonucMetni = 'Mükemmel — Hızlı onay beklenir'; sonucRenk = 'text-emerald-600'; }
    else if (toplamPuan >= 65) { sonucMetni = 'İyi — Onay kuvvetle muhtemel'; sonucRenk = 'text-green-500'; }
    else if (toplamPuan >= 50) { sonucMetni = 'Orta — Bazı bankalar onaylayabilir'; sonucRenk = 'text-amber-500'; }
    else if (toplamPuan >= 35) { sonucMetni = 'Zayıf — Ek güvence gerekebilir'; sonucRenk = 'text-orange-500'; }
    else { sonucMetni = 'Çok Zayıf — Başvuru reddedilebilir'; sonucRenk = 'text-rose-500'; }

    return {
      toplamPuan,
      krediNotuPuan, gelirTaksitPuan, istihdamPuan, pesinatPuan, borcPuan,
      gTOran, sonucMetni, sonucRenk,
    };
  }, [netGelir, tahminiTaksit, krediNotu, istihdam, pesinatOran, mevcutBorc]);

  const puanGrubu = [
    { label: 'Kredi Notu', puan: sonuc.krediNotuPuan, max: 30 },
    { label: 'Gelir-Taksit', puan: sonuc.gelirTaksitPuan, max: 25 },
    { label: 'İstihdam', puan: sonuc.istihdamPuan, max: 25 },
    { label: 'Peşinat', puan: sonuc.pesinatPuan, max: 15 },
    { label: 'Borç Yükü', puan: sonuc.borcPuan, max: 5 },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">

      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h2 className="text-base font-black text-gray-900 mb-5">Bilgilerinizi Girin</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

          <div>
            <label className="block text-[10px] font-black text-gray-500 mb-1">Net Aylık Gelir (₺)</label>
            <input
              type="number"
              value={netGelir}
              onChange={e => setNetGelir(Number(e.target.value))}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm font-bold focus:outline-none focus:border-[#00C49F]"
            />
          </div>

          <div>
            <label className="block text-[10px] font-black text-gray-500 mb-1">Tahmini Aylık Taksit (₺)</label>
            <input
              type="number"
              value={tahminiTaksit}
              onChange={e => setTahminiTaksit(Number(e.target.value))}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm font-bold focus:outline-none focus:border-[#00C49F]"
            />
            <p className="text-[10px] text-gray-400 mt-1">Gelir-Taksit Oranı: %{sonuc.gTOran.toFixed(1)}</p>
          </div>

          <div>
            <label className="block text-[10px] font-black text-gray-500 mb-2">Kredi Notu (Findeks)</label>
            <div className="flex flex-wrap gap-2">
              {Object.keys(KREDI_NOTU_PUAN).map(k => (
                <button key={k} onClick={() => setKrediNotu(k)}
                  className={`text-[10px] font-black px-3 py-1.5 rounded-full border transition-colors ${krediNotu === k ? 'bg-[#00C49F] text-white border-[#00C49F]' : 'bg-white text-gray-600 border-gray-200 hover:border-[#00C49F]'}`}>
                  {k}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black text-gray-500 mb-2">İstihdam Durumu</label>
            <select value={istihdam} onChange={e => setIstihdam(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold focus:outline-none focus:border-[#00C49F]">
              {Object.keys(ISTIHDAM_PUAN).map(k => (
                <option key={k} value={k}>{k}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-black text-gray-500 mb-1">Peşinat Oranı: %{pesinatOran}</label>
            <input type="range" min={5} max={60} step={5} value={pesinatOran} onChange={e => setPesinatOran(Number(e.target.value))}
              className="w-full accent-[#00C49F]" />
            <div className="flex justify-between text-[9px] text-gray-400 mt-1"><span>%5</span><span>%60</span></div>
          </div>

          <div>
            <label className="block text-[10px] font-black text-gray-500 mb-1">Mevcut Aylık Borç Ödemesi (₺)</label>
            <input
              type="number"
              value={mevcutBorc}
              onChange={e => setMevcutBorc(Number(e.target.value))}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm font-bold focus:outline-none focus:border-[#00C49F]"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h2 className="text-base font-black text-gray-900 mb-2">Uygunluk Puanınız</h2>
        <div className="flex items-end gap-4 mb-6">
          <span className="text-5xl font-black text-[#00C49F]">{sonuc.toplamPuan}</span>
          <span className="text-sm text-gray-400 mb-2">/ 100</span>
          <span className={`text-xs font-black mb-2 ${sonuc.sonucRenk}`}>{sonuc.sonucMetni}</span>
        </div>
        <div className="bg-gray-100 rounded-full h-3 mb-6">
          <div className="bg-[#00C49F] h-3 rounded-full transition-all" style={{ width: `${sonuc.toplamPuan}%` }} />
        </div>

        <div className="space-y-3">
          {puanGrubu.map((g, i) => (
            <div key={i}>
              <div className="flex justify-between text-[10px] font-black text-gray-600 mb-1">
                <span>{g.label}</span>
                <span>{g.puan} / {g.max}</span>
              </div>
              <div className="bg-gray-100 rounded-full h-2">
                <div className="bg-[#00C49F] h-2 rounded-full" style={{ width: `${(g.puan / g.max) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h2 className="text-base font-black text-gray-900 mb-4">Değerlendirme Kriterleri</h2>
        <div className="space-y-3">
          {KRITERLER.map((k, i) => (
            <div key={i} className="flex items-start gap-3 border border-gray-100 rounded-xl p-3">
              <span className="text-[10px] font-black text-[#00C49F] shrink-0 w-8">{k.agirlik}</span>
              <div>
                <p className="text-xs font-black text-gray-900">{k.kriter}</p>
                <p className="text-[10px] text-gray-500">{k.aciklama}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
        <p className="text-xs font-black text-amber-700 mb-2">Önemli Uyarı</p>
        <p className="text-[11px] text-amber-600 leading-relaxed">
          Bu puanlama tahmini nitelikte olup resmi bir banka değerlendirmesi değildir. Her bankanın kendi iç skoring sistemi farklıdır. Başvuru öncesi birden fazla bankadan ön onay alarak karşılaştırmanızı öneririz.
        </p>
      </div>

    </div>
  );
}
