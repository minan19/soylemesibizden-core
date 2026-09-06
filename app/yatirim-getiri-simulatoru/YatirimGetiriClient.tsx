'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { TrendingUp, ArrowRight, CheckCircle } from 'lucide-react';

const fmt = (n: number) => n.toLocaleString('tr-TR', { maximumFractionDigits: 0 });
const pct = (n: number) => n.toFixed(1);

export default function YatirimGetiriClient() {
  const [alisFiyati, setAlisFiyati] = useState(3000000);
  const [yenilemeMaliyeti, setYenilemeMaliyeti] = useState(200000);
  const [aylikKira, setAylikKira] = useState(15000);
  const [yillikKiraArtis, setYillikKiraArtis] = useState(25);
  const [yillikDegerArtis, setYillikDegerArtis] = useState(30);
  const [tutmaYili, setTutmaYili] = useState(5);
  const [giderOrani, setGiderOrani] = useState(15);
  const [vergiOrani, setVergiOrani] = useState(20);

  const result = useMemo(() => {
    const toplamMaliyet = alisFiyati + yenilemeMaliyeti;
    const tapuKomisyon = alisFiyati * 0.04;
    const baslangicMaliyet = toplamMaliyet + tapuKomisyon;

    let toplamKiraGeliri = 0;
    let mevcutKira = aylikKira * 12;
    const yillikVeriler = [];

    for (let y = 1; y <= tutmaYili; y++) {
      const brutKira = y === 1 ? mevcutKira : mevcutKira;
      const giderler = brutKira * (giderOrani / 100);
      const netKira = brutKira - giderler;
      const vergisizKira = netKira * (1 - vergiOrani / 100);
      toplamKiraGeliri += vergisizKira;
      yillikVeriler.push({ yil: y, brutKira, netKira, vergisizKira });
      mevcutKira = mevcutKira * (1 + yillikKiraArtis / 100);
    }

    const satisFiyati = alisFiyati * Math.pow(1 + yillikDegerArtis / 100, tutmaYili);
    const satisMaliyeti = satisFiyati * 0.02; // komisyon
    const netSatisGeliri = satisFiyati - satisMaliyeti;

    const toplamGetiri = toplamKiraGeliri + netSatisGeliri;
    const karZarar = toplamGetiri - baslangicMaliyet;
    const toplamROI = (karZarar / baslangicMaliyet) * 100;
    const yillikROI = (Math.pow(toplamGetiri / baslangicMaliyet, 1 / tutmaYili) - 1) * 100;

    const brutKiraGetirisi = (aylikKira * 12 / baslangicMaliyet) * 100;
    const netKiraGetirisi = brutKiraGetirisi * (1 - giderOrani / 100) * (1 - vergiOrani / 100);

    return {
      baslangicMaliyet, toplamMaliyet, tapuKomisyon,
      toplamKiraGeliri, satisFiyati, netSatisGeliri,
      toplamGetiri, karZarar, toplamROI, yillikROI,
      brutKiraGetirisi, netKiraGetirisi, yillikVeriler,
    };
  }, [alisFiyati, yenilemeMaliyeti, aylikKira, yillikKiraArtis, yillikDegerArtis, tutmaYili, giderOrani, vergiOrani]);

  const maxKira = Math.max(...result.yillikVeriler.map(d => d.brutKira));

  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-5xl mx-auto px-6 py-14">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-4">
            <TrendingUp size={13} /> Yatırım Simülatörü
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">Yatırım Getiri Simülatörü</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            Alış, yenileme, kira geliri, değer artışı ve satış senaryolarını birleştirerek toplam yatırım ROI'sini hesaplayın.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Inputs */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm space-y-5">
              <h2 className="text-sm font-black text-gray-900">Yatırım Parametreleri</h2>

              {[
                { label: 'Alış Fiyatı', val: alisFiyati, set: setAlisFiyati, min: 500000, max: 20000000, step: 50000 },
                { label: 'Yenileme Maliyeti', val: yenilemeMaliyeti, set: setYenilemeMaliyeti, min: 0, max: 2000000, step: 10000 },
                { label: 'Aylık Başlangıç Kirası', val: aylikKira, set: setAylikKira, min: 1000, max: 100000, step: 500 },
              ].map(f => (
                <div key={f.label}>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    {f.label} <span className="font-normal text-gray-400">₺{fmt(f.val)}</span>
                  </label>
                  <input type="range" min={f.min} max={f.max} step={f.step} value={f.val}
                    onChange={e => f.set(Number(e.target.value))} className="w-full accent-[#00C49F]" />
                </div>
              ))}

              {[
                { label: 'Yıllık Kira Artışı', val: yillikKiraArtis, set: setYillikKiraArtis, min: 0, max: 80, step: 1, suffix: '%' },
                { label: 'Yıllık Değer Artışı', val: yillikDegerArtis, set: setYillikDegerArtis, min: 0, max: 80, step: 1, suffix: '%' },
                { label: 'Gider Oranı (Yıllık)', val: giderOrani, set: setGiderOrani, min: 0, max: 40, step: 1, suffix: '%' },
                { label: 'Vergi Oranı (Net Kira)', val: vergiOrani, set: setVergiOrani, min: 0, max: 40, step: 1, suffix: '%' },
              ].map(f => (
                <div key={f.label}>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    {f.label} <span className="font-normal text-gray-400">%{f.val}</span>
                  </label>
                  <input type="range" min={f.min} max={f.max} step={f.step} value={f.val}
                    onChange={e => f.set(Number(e.target.value))} className="w-full accent-[#00C49F]" />
                </div>
              ))}

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">Tutma Süresi: {tutmaYili} Yıl</label>
                <div className="grid grid-cols-5 gap-1">
                  {[3, 5, 7, 10, 15].map(y => (
                    <button key={y} onClick={() => setTutmaYili(y)}
                      className={`text-xs py-2 rounded-lg font-bold transition-all ${tutmaYili === y ? 'bg-[#00C49F] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                      {y}y
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-2 space-y-4">

            <div className="bg-gradient-to-br from-[#00C49F] to-[#00a882] rounded-2xl p-6 text-white">
              <p className="text-xs text-white/70 mb-1">Toplam Net Kâr / Zarar</p>
              <p className={`text-4xl font-black mb-2 ${result.karZarar < 0 ? 'text-rose-200' : 'text-white'}`}>
                {result.karZarar >= 0 ? '+' : ''}₺{fmt(Math.round(result.karZarar))}
              </p>
              <p className="text-xs text-white/70">
                Yıllık ROI: %{pct(result.yillikROI)} — Toplam ROI: %{pct(result.toplamROI)}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                <p className="text-[10px] text-gray-400 mb-1">Başlangıç Maliyeti</p>
                <p className="text-xl font-black text-gray-900">₺{fmt(Math.round(result.baslangicMaliyet))}</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                <p className="text-[10px] text-gray-400 mb-1">Tahmini Satış Fiyatı</p>
                <p className="text-xl font-black text-[#00C49F]">₺{fmt(Math.round(result.satisFiyati))}</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                <p className="text-[10px] text-gray-400 mb-1">Toplam Kira Geliri</p>
                <p className="text-xl font-black text-blue-600">₺{fmt(Math.round(result.toplamKiraGeliri))}</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                <p className="text-[10px] text-gray-400 mb-1">Brüt Kira Getirisi</p>
                <p className="text-xl font-black text-amber-600">%{pct(result.brutKiraGetirisi)}</p>
              </div>
            </div>

            {/* Yıllık Kira Grafiği */}
            <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
              <h3 className="text-xs font-black text-gray-900 mb-3">Yıllık Kira Geliri Projeksiyonu</h3>
              <div className="space-y-1.5">
                {result.yillikVeriler.map((d, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-[10px] text-gray-500 w-10 shrink-0">Yıl {d.yil}</span>
                    <div className="flex-1 bg-gray-100 rounded-full h-4 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-[#00C49F] flex items-center justify-end pr-2"
                        style={{ width: `${(d.brutKira / maxKira) * 100}%` }}
                      >
                        <span className="text-[9px] text-white font-bold">₺{fmt(Math.round(d.brutKira / 12))}/ay</span>
                      </div>
                    </div>
                    <span className="text-[10px] text-gray-400 w-20 text-right shrink-0">Net ₺{fmt(Math.round(d.vergisizKira))}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Özet Tablo */}
            <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
              <h3 className="text-xs font-black text-gray-900 mb-3">Yatırım Özeti</h3>
              <table className="w-full text-[10px]">
                <tbody>
                  {[
                    ['Alış + Yenileme', `₺${fmt(Math.round(result.toplamMaliyet))}`],
                    ['Tapu + Komisyon (%4)', `₺${fmt(Math.round(result.tapuKomisyon))}`],
                    ['Toplam Başlangıç Maliyeti', `₺${fmt(Math.round(result.baslangicMaliyet))}`],
                    ['Toplam Kira Geliri (Net)', `₺${fmt(Math.round(result.toplamKiraGeliri))}`],
                    ['Satış Geliri (Net)', `₺${fmt(Math.round(result.netSatisGeliri))}`],
                    ['Net Kira Getirisi (Yıllık)', `%${pct(result.netKiraGetirisi)}`],
                    ['Toplam ROI', `%${pct(result.toplamROI)}`],
                    ['Yıllık ROI (CAGR)', `%${pct(result.yillikROI)}`],
                  ].map(([k, v], i) => (
                    <tr key={i} className={i % 2 === 0 ? '' : 'bg-gray-50'}>
                      <td className="py-1.5 px-2 text-gray-600">{k}</td>
                      <td className="py-1.5 px-2 text-right font-bold text-gray-900">{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Tips */}
            <div className="bg-[#F0FDF8] border border-[#00C49F]/20 rounded-xl p-4">
              <p className="text-xs font-black text-gray-900 mb-2 flex items-center gap-2">
                <CheckCircle size={12} className="text-[#00C49F]" /> Simülasyon Notları
              </p>
              <ul className="space-y-1">
                {[
                  'Kira artışı %25 tavan sınırlamasına tabi; gerçek artış farklı olabilir.',
                  'Değer artışı tahmin; enflasyon, lokasyon ve piyasa koşullarına bağlı.',
                  'Tapu ve komisyon maliyet olarak dahil edildi; KDV hariç.',
                ].map((t, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-[#00C49F] text-[10px] shrink-0">•</span>
                    <p className="text-[10px] text-gray-700">{t}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Link href="/yatirim-npv" className="group bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition-all flex items-center gap-3">
                <TrendingUp size={16} className="text-[#00C49F] shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-gray-900">NPV / IRR Hesapla</p>
                  <p className="text-[10px] text-gray-400">Net bugünkü değer analizi</p>
                </div>
                <ArrowRight size={12} className="text-gray-300 group-hover:text-gray-600 shrink-0" />
              </Link>
              <Link href="/kira-getiri-hesaplayici" className="group bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition-all flex items-center gap-3">
                <TrendingUp size={16} className="text-blue-600 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-gray-900">Kira Getiri Hesapla</p>
                  <p className="text-[10px] text-gray-400">Brüt/net getiri analizi</p>
                </div>
                <ArrowRight size={12} className="text-gray-300 group-hover:text-gray-600 shrink-0" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
