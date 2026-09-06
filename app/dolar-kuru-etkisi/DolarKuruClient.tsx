'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { TrendingUp, ArrowRight, Info, AlertTriangle } from 'lucide-react';

const fmt = (n: number) => n.toLocaleString('tr-TR', { maximumFractionDigits: 0 });
const fmtUsd = (n: number) => n.toLocaleString('tr-TR', { maximumFractionDigits: 0 });
const pct = (n: number) => n.toFixed(1);

const KURSLAR = {
  usd: { label: 'ABD Doları (USD)', symbol: '$', rate2020: 7.5, rateCurrent: 33.5 },
  eur: { label: 'Euro (EUR)', symbol: '€', rate2020: 8.2, rateCurrent: 36.8 },
  gbp: { label: 'Sterlin (GBP)', symbol: '£', rate2020: 9.6, rateCurrent: 43.2 },
};

export default function DolarKuruClient() {
  const [dovizkuru, setDovizKuru] = useState<keyof typeof KURSLAR>('usd');
  const [alisTlFiyati, setAlisTlFiyati] = useState(2000000);
  const [alisKuru, setAlisKuru] = useState(28);
  const [mevcutKur, setMevcutKur] = useState(34);
  const [tahminKur, setTahminKur] = useState(40);
  const [alisTarihi, setAlisTarihi] = useState(2022);

  const kur = KURSLAR[dovizkuru];

  const result = useMemo(() => {
    const alisDovizDegeri = alisTlFiyati / alisKuru;
    const mevcutTlDegeri = alisDovizDegeri * mevcutKur;
    const tahminTlDegeri = alisDovizDegeri * tahminKur;

    const tlKazanciMevcut = mevcutTlDegeri - alisTlFiyati;
    const tlKazanciTahmin = tahminTlDegeri - alisTlFiyati;
    const ruhKorumasiMevcut = ((mevcutKur / alisKuru) - 1) * 100;
    const ruhKorumasiTahmin = ((tahminKur / alisKuru) - 1) * 100;

    const dovizReel = 0; // satın alma gücü nominal

    return {
      alisDovizDegeri,
      mevcutTlDegeri, tahminTlDegeri,
      tlKazanciMevcut, tlKazanciTahmin,
      ruhKorumasiMevcut, ruhKorumasiTahmin,
    };
  }, [alisTlFiyati, alisKuru, mevcutKur, tahminKur]);

  const yillar = [2020, 2021, 2022, 2023, 2024, 2025];

  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-5xl mx-auto px-6 py-14">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-4">
            <TrendingUp size={13} /> Kur Analizi
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">Döviz Kuru ve Gayrimenkul</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            Gayrimenkulünüzün dolar/euro bazındaki gerçek değeri, kur değişiminin TL kazancınıza etkisi ve kur koruması analizi.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Inputs */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm space-y-5">
              <h2 className="text-sm font-black text-gray-900">Kur Bilgileri</h2>

              {/* Para birimi */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">Döviz Türü</label>
                <div className="space-y-1.5">
                  {(Object.entries(KURSLAR) as [keyof typeof KURSLAR, typeof KURSLAR[keyof typeof KURSLAR]][]).map(([k, v]) => (
                    <button key={k} onClick={() => setDovizKuru(k)}
                      className={`w-full text-left p-2.5 rounded-xl text-xs transition-all ${dovizkuru === k ? 'bg-[#F0FDF8] border border-[#00C49F]/30 text-[#00C49F]' : 'bg-gray-50 border border-transparent hover:border-gray-200 text-gray-700'}`}>
                      <span className="font-bold">{v.symbol} {v.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Alış TL Fiyatı <span className="font-normal text-gray-400">₺{fmt(alisTlFiyati)}</span>
                </label>
                <input type="range" min={500000} max={20000000} step={50000} value={alisTlFiyati}
                  onChange={e => setAlisTlFiyati(Number(e.target.value))} className="w-full accent-[#00C49F]" />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Alış Anı Kur ({kur.symbol}/₺) <span className="font-normal text-gray-400">{alisKuru}</span>
                </label>
                <input type="range" min={5} max={50} step={0.5} value={alisKuru}
                  onChange={e => setAlisKuru(Number(e.target.value))} className="w-full accent-[#00C49F]" />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Mevcut Kur ({kur.symbol}/₺) <span className="font-normal text-gray-400">{mevcutKur}</span>
                </label>
                <input type="range" min={5} max={60} step={0.5} value={mevcutKur}
                  onChange={e => setMevcutKur(Number(e.target.value))} className="w-full accent-[#00C49F]" />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Hedef Kur Tahmini ({kur.symbol}/₺) <span className="font-normal text-gray-400">{tahminKur}</span>
                </label>
                <input type="range" min={5} max={80} step={1} value={tahminKur}
                  onChange={e => setTahminKur(Number(e.target.value))} className="w-full accent-[#00C49F]" />
              </div>

              <div className="flex items-start gap-2 bg-blue-50 border border-blue-200 rounded-xl p-3">
                <Info size={11} className="text-blue-500 shrink-0 mt-0.5" />
                <p className="text-[10px] text-blue-700 leading-relaxed">Kur değişimi sabit döviz değer varsayımıyla hesaplanmıştır. Mülkün TL değeri de değişebilir.</p>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-2 space-y-4">

            <div className="bg-gradient-to-br from-[#00C49F] to-[#00a882] rounded-2xl p-6 text-white">
              <p className="text-xs text-white/70 mb-1">Alış Anındaki Döviz Değeri</p>
              <p className="text-4xl font-black mb-2">{kur.symbol}{fmtUsd(Math.round(result.alisDovizDegeri))}</p>
              <p className="text-xs text-white/70">₺{fmt(alisTlFiyati)} ÷ {alisKuru} = {kur.symbol}{fmtUsd(Math.round(result.alisDovizDegeri))}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                <p className="text-[10px] text-gray-400 mb-1">Mevcut Kura Göre TL Değer</p>
                <p className="text-xl font-black text-gray-900">₺{fmt(Math.round(result.mevcutTlDegeri))}</p>
                <p className={`text-[10px] mt-0.5 font-bold ${result.tlKazanciMevcut >= 0 ? 'text-[#00C49F]' : 'text-rose-500'}`}>
                  {result.tlKazanciMevcut >= 0 ? '+' : ''}₺{fmt(Math.round(result.tlKazanciMevcut))}
                </p>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                <p className="text-[10px] text-gray-400 mb-1">Hedef Kura Göre TL Değer</p>
                <p className="text-xl font-black text-blue-600">₺{fmt(Math.round(result.tahminTlDegeri))}</p>
                <p className={`text-[10px] mt-0.5 font-bold ${result.tlKazanciTahmin >= 0 ? 'text-[#00C49F]' : 'text-rose-500'}`}>
                  {result.tlKazanciTahmin >= 0 ? '+' : ''}₺{fmt(Math.round(result.tlKazanciTahmin))}
                </p>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                <p className="text-[10px] text-gray-400 mb-1">Kur Değişimi (Alış → Mevcut)</p>
                <p className={`text-xl font-black ${result.ruhKorumasiMevcut >= 0 ? 'text-[#00C49F]' : 'text-rose-500'}`}>
                  {result.ruhKorumasiMevcut >= 0 ? '+' : ''}{pct(result.ruhKorumasiMevcut)}%
                </p>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                <p className="text-[10px] text-gray-400 mb-1">Kur Değişimi (Alış → Hedef)</p>
                <p className={`text-xl font-black ${result.ruhKorumasiTahmin >= 0 ? 'text-[#00C49F]' : 'text-rose-500'}`}>
                  {result.ruhKorumasiTahmin >= 0 ? '+' : ''}{pct(result.ruhKorumasiTahmin)}%
                </p>
              </div>
            </div>

            {/* Kur Karşılaştırması */}
            <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
              <h3 className="text-xs font-black text-gray-900 mb-3">Farklı Kur Senaryolarında Mülk Değeri (TL)</h3>
              {[25, 30, 35, 40, 50, 60].map(k => {
                const val = result.alisDovizDegeri * k;
                const diff = ((k - alisKuru) / alisKuru) * 100;
                return (
                  <div key={k} className="flex items-center gap-3 mb-1.5">
                    <span className="text-[10px] text-gray-500 w-12 shrink-0">{kur.symbol}{k}</span>
                    <div className="flex-1 bg-gray-100 rounded-full h-4 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-[#00C49F] flex items-center justify-end pr-2"
                        style={{ width: `${Math.min(100, (k / 60) * 100)}%` }}
                      >
                        <span className="text-[9px] text-white font-bold">₺{fmt(Math.round(val / 1000))}K</span>
                      </div>
                    </div>
                    <span className={`text-[10px] w-12 text-right ${diff >= 0 ? 'text-[#00C49F]' : 'text-rose-500'}`}>
                      {diff >= 0 ? '+' : ''}{diff.toFixed(0)}%
                    </span>
                  </div>
                );
              })}
              <p className="text-[10px] text-gray-400 mt-2">Hesaplama: Alış anındaki {kur.symbol} değeri × farklı kurlar.</p>
            </div>

            {/* Uyarı */}
            <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
              <AlertTriangle size={14} className="text-amber-600 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-800 leading-relaxed">
                <span className="font-black">Önemli:</span> Bu analiz mülkün döviz değerinin sabit kaldığını varsayar. Gerçekte mülkün TL piyasa değeri de kur hareketlerine paralel veya farklı seyredebilir.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Link href="/enflasyon-korumasi" className="group bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition-all flex items-center gap-3">
                <TrendingUp size={16} className="text-[#00C49F] shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-gray-900">Enflasyon Koruması</p>
                  <p className="text-[10px] text-gray-400">Gayrimenkul vs enflasyon analizi</p>
                </div>
                <ArrowRight size={12} className="text-gray-300 group-hover:text-gray-600 shrink-0" />
              </Link>
              <Link href="/yatirim-getiri-simulatoru" className="group bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition-all flex items-center gap-3">
                <TrendingUp size={16} className="text-blue-600 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-gray-900">Yatırım Simülatörü</p>
                  <p className="text-[10px] text-gray-400">Toplam ROI ve CAGR</p>
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
