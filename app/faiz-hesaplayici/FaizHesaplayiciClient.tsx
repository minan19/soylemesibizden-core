'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { TrendingUp, ArrowRight, Info } from 'lucide-react';

const fmt = (n: number) => n.toLocaleString('tr-TR', { maximumFractionDigits: 0 });
const pct = (n: number) => n.toFixed(2);

export default function FaizHesaplayiciClient() {
  const [anapara, setAnapara] = useState(1000000);
  const [yillikFaiz, setYillikFaiz] = useState(45);
  const [sure, setSure] = useState(12);
  const [birikmeSikligi, setBirikmeSikligi] = useState<'aylik' | 'ceyreklik' | 'yillik'>('aylik');
  const [mod, setMod] = useState<'mevduat' | 'kredi'>('mevduat');

  const result = useMemo(() => {
    const r = yillikFaiz / 100;
    const surem = sure; // ay cinsinden

    // Basit faiz
    const basitFaiz = anapara * r * (surem / 12);
    const basitSon = anapara + basitFaiz;

    // Bileşik faiz
    let n: number;
    if (birikmeSikligi === 'aylik') n = 12;
    else if (birikmeSikligi === 'ceyreklik') n = 4;
    else n = 1;

    const yil = surem / 12;
    const bilesikSon = anapara * Math.pow(1 + r / n, n * yil);
    const bilesikFaiz = bilesikSon - anapara;

    // Efektif yıllık faiz
    const efektifYillik = (Math.pow(1 + r / n, n) - 1) * 100;

    // Kredi modu: aylık taksit
    const aylikFaizOran = r / 12;
    const taksit = mod === 'kredi' && aylikFaizOran > 0
      ? (anapara * aylikFaizOran * Math.pow(1 + aylikFaizOran, surem)) / (Math.pow(1 + aylikFaizOran, surem) - 1)
      : 0;
    const toplamOdeme = taksit * surem;
    const toplamFaizOdeme = toplamOdeme - anapara;

    // Aylık mevduat veri
    const aylikSon: number[] = [];
    for (let ay = 1; ay <= surem; ay++) {
      const v = anapara * Math.pow(1 + r / n, n * (ay / 12));
      aylikSon.push(v);
    }

    return {
      basitFaiz, basitSon, bilesikFaiz, bilesikSon, efektifYillik,
      taksit, toplamOdeme, toplamFaizOdeme, aylikSon,
    };
  }, [anapara, yillikFaiz, sure, birikmeSikligi, mod]);

  const maxVal = Math.max(...result.aylikSon);

  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-5xl mx-auto px-6 py-14">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-4">
            <TrendingUp size={13} /> Faiz Hesaplayıcı
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">Faiz Hesaplayıcı</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            Basit ve bileşik faiz karşılaştırması, mevduat büyüme projeksiyonu ve kredi aylık taksit hesabı.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Inputs */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm space-y-5">
              <h2 className="text-sm font-black text-gray-900">Parametreler</h2>

              {/* Mod */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">Hesap Modu</label>
                <div className="grid grid-cols-2 gap-1">
                  {[{ v: 'mevduat', l: 'Mevduat' }, { v: 'kredi', l: 'Kredi' }].map(o => (
                    <button key={o.v} onClick={() => setMod(o.v as 'mevduat' | 'kredi')}
                      className={`text-xs py-2 rounded-lg font-bold transition-all ${mod === o.v ? 'bg-[#00C49F] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                      {o.l}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  {mod === 'mevduat' ? 'Anapara' : 'Kredi Tutarı'} <span className="font-normal text-gray-400">₺{fmt(anapara)}</span>
                </label>
                <input type="range" min={50000} max={10000000} step={50000} value={anapara}
                  onChange={e => setAnapara(Number(e.target.value))} className="w-full accent-[#00C49F]" />
                <div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>₺50K</span><span>₺10M</span></div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Yıllık Faiz Oranı <span className="font-normal text-gray-400">%{yillikFaiz}</span>
                </label>
                <input type="range" min={1} max={80} step={0.5} value={yillikFaiz}
                  onChange={e => setYillikFaiz(Number(e.target.value))} className="w-full accent-[#00C49F]" />
                <div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>%1</span><span>%80</span></div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Süre <span className="font-normal text-gray-400">{sure} Ay ({(sure / 12).toFixed(1)} Yıl)</span>
                </label>
                <input type="range" min={1} max={120} step={1} value={sure}
                  onChange={e => setSure(Number(e.target.value))} className="w-full accent-[#00C49F]" />
                <div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>1 Ay</span><span>120 Ay (10 Yıl)</span></div>
              </div>

              {mod === 'mevduat' && (
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2">Birikim Sıklığı</label>
                  <div className="grid grid-cols-3 gap-1">
                    {[{ v: 'aylik', l: 'Aylık' }, { v: 'ceyreklik', l: '3 Aylık' }, { v: 'yillik', l: 'Yıllık' }].map(o => (
                      <button key={o.v} onClick={() => setBirikmeSikligi(o.v as 'aylik' | 'ceyreklik' | 'yillik')}
                        className={`text-[10px] py-1.5 rounded-lg font-bold transition-all ${birikmeSikligi === o.v ? 'bg-[#00C49F] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                        {o.l}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-start gap-2 bg-blue-50 border border-blue-200 rounded-xl p-3">
                <Info size={11} className="text-blue-500 shrink-0 mt-0.5" />
                <p className="text-[10px] text-blue-700 leading-relaxed">
                  {mod === 'mevduat'
                    ? 'Mevduat: bileşik faiz birikim sıklığı arttıkça getiri yükselir.'
                    : 'Kredi: aylık eşit taksit (anüite) yöntemi kullanılmaktadır.'}
                </p>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-2 space-y-4">

            {mod === 'mevduat' ? (
              <>
                <div className="bg-gradient-to-br from-[#00C49F] to-[#00a882] rounded-2xl p-6 text-white">
                  <p className="text-xs text-white/70 mb-1">Bileşik Faiz — Son Değer</p>
                  <p className="text-4xl font-black mb-2">₺{fmt(Math.round(result.bilesikSon))}</p>
                  <p className="text-xs text-white/70">
                    Faiz Kazancı: ₺{fmt(Math.round(result.bilesikFaiz))} — Efektif Yıllık: %{pct(result.efektifYillik)}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                    <p className="text-[10px] text-gray-400 mb-1">Basit Faiz Son Değer</p>
                    <p className="text-xl font-black text-gray-900">₺{fmt(Math.round(result.basitSon))}</p>
                  </div>
                  <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                    <p className="text-[10px] text-gray-400 mb-1">Bileşik Avantajı</p>
                    <p className="text-xl font-black text-[#00C49F]">₺{fmt(Math.round(result.bilesikSon - result.basitSon))}</p>
                  </div>
                </div>

                {/* Büyüme Grafiği */}
                <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                  <h3 className="text-xs font-black text-gray-900 mb-3">Aylık Büyüme (Bileşik)</h3>
                  <div className="space-y-1">
                    {result.aylikSon.filter((_, i) => i % Math.ceil(sure / 12) === 0 || i === sure - 1).slice(0, 12).map((v, i, arr) => {
                      const ayNo = result.aylikSon.indexOf(v) + 1;
                      return (
                        <div key={i} className="flex items-center gap-2">
                          <span className="text-[10px] text-gray-500 w-12 shrink-0">Ay {ayNo}</span>
                          <div className="flex-1 bg-gray-100 rounded-full h-3">
                            <div className="h-full rounded-full bg-[#00C49F]" style={{ width: `${(v / maxVal) * 100}%` }} />
                          </div>
                          <span className="text-[10px] text-gray-600 w-20 text-right">₺{fmt(Math.round(v))}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="bg-gradient-to-br from-rose-500 to-rose-600 rounded-2xl p-6 text-white">
                  <p className="text-xs text-white/70 mb-1">Aylık Taksit</p>
                  <p className="text-4xl font-black mb-2">₺{fmt(Math.round(result.taksit))}</p>
                  <p className="text-xs text-white/70">
                    Toplam Ödeme: ₺{fmt(Math.round(result.toplamOdeme))} — Faiz Yükü: ₺{fmt(Math.round(result.toplamFaizOdeme))}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                    <p className="text-[10px] text-gray-400 mb-1">Toplam Ödeme</p>
                    <p className="text-xl font-black text-gray-900">₺{fmt(Math.round(result.toplamOdeme))}</p>
                  </div>
                  <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                    <p className="text-[10px] text-gray-400 mb-1">Toplam Faiz Maliyeti</p>
                    <p className="text-xl font-black text-rose-500">₺{fmt(Math.round(result.toplamFaizOdeme))}</p>
                  </div>
                  <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                    <p className="text-[10px] text-gray-400 mb-1">Faiz / Anapara Oranı</p>
                    <p className="text-xl font-black text-amber-600">%{pct(result.toplamFaizOdeme / anapara * 100)}</p>
                  </div>
                  <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                    <p className="text-[10px] text-gray-400 mb-1">Aylık Faiz (İlk Ay)</p>
                    <p className="text-xl font-black text-blue-600">₺{fmt(Math.round(anapara * yillikFaiz / 100 / 12))}</p>
                  </div>
                </div>
              </>
            )}

            <div className="grid grid-cols-2 gap-3">
              <Link href="/mortgage-simulatoru" className="group bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition-all flex items-center gap-3">
                <TrendingUp size={16} className="text-[#00C49F] shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-gray-900">Mortgage Simülatörü</p>
                  <p className="text-[10px] text-gray-400">Aylık detaylı plan + refinansman</p>
                </div>
                <ArrowRight size={12} className="text-gray-300 group-hover:text-gray-600 shrink-0" />
              </Link>
              <Link href="/odeme-plani" className="group bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition-all flex items-center gap-3">
                <TrendingUp size={16} className="text-blue-600 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-gray-900">Ödeme Planı</p>
                  <p className="text-[10px] text-gray-400">Ay ay anapara + faiz tablosu</p>
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
