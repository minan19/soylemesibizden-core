'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { TrendingUp, ArrowRight, Info, CheckCircle } from 'lucide-react';

const fmt = (n: number) => n.toLocaleString('tr-TR', { maximumFractionDigits: 0 });
const pct = (n: number) => n.toFixed(1);

const BRACKETS_2024 = [
  { limit: 110000, rate: 0.15 },
  { limit: 230000, rate: 0.20 },
  { limit: 870000, rate: 0.27 },
  { limit: 3000000, rate: 0.35 },
  { limit: Infinity, rate: 0.40 },
];

function calcIncomeTax(yillikKira: number, giderYontemi: 'goturU' | 'gercek', gercekGider: number): number {
  const istisna = 33000;
  let matrah: number;
  if (giderYontemi === 'goturU') {
    matrah = Math.max(0, yillikKira - istisna - yillikKira * 0.15);
  } else {
    matrah = Math.max(0, yillikKira - istisna - gercekGider);
  }
  let tax = 0;
  let rem = matrah;
  let prev = 0;
  for (const b of BRACKETS_2024) {
    const t = Math.min(rem, b.limit - prev);
    if (t <= 0) break;
    tax += t * b.rate;
    rem -= t;
    prev = b.limit;
    if (rem <= 0) break;
  }
  return tax;
}

export default function NetGelirClient() {
  const [aylikKira, setAylikKira] = useState(20000);
  const [giderYontemi, setGiderYontemi] = useState<'goturU' | 'gercek'>('goturU');
  const [aidat, setAidat] = useState(500);
  const [sigorta, setSigorta] = useState(2000);
  const [bakim, setBakim] = useState(1000);
  const [diger, setDiger] = useState(0);
  const [bosTasima, setBosTasima] = useState(1);

  const result = useMemo(() => {
    const brutYillik = aylikKira * 12;
    const brutAylik = aylikKira;

    const bosTasimaMaliyet = bosTasima > 0 ? aylikKira * bosTasima : 0;
    const yillikGiderler = (aidat + bakim + diger) * 12 + sigorta + bosTasimaMaliyet;
    const gercekGider = yillikGiderler;

    const gelirVergisi = calcIncomeTax(brutYillik, giderYontemi, gercekGider);
    const gelirVergisiAylik = gelirVergisi / 12;

    const toplamGider = yillikGiderler + gelirVergisi;
    const netYillik = brutYillik - toplamGider;
    const netAylik = netYillik / 12;

    const netGetiriOrani = brutYillik > 0 ? (netYillik / brutYillik) * 100 : 0;
    const efektifVergiOrani = brutYillik > 0 ? (gelirVergisi / brutYillik) * 100 : 0;

    return {
      brutYillik, brutAylik,
      yillikGiderler, gelirVergisi, gelirVergisiAylik,
      netYillik, netAylik,
      netGetiriOrani, efektifVergiOrani,
      bosTasimaMaliyet,
    };
  }, [aylikKira, giderYontemi, aidat, sigorta, bakim, diger, bosTasima]);

  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-5xl mx-auto px-6 py-14">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-4">
            <TrendingUp size={13} /> Hesaplama Aracı
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">Kira Net Gelir Hesaplayıcı</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            Brüt kira gelirinizden aidat, sigorta, bakım giderleri ve gelir vergisi düşüldükten sonra gerçek net kazancınız.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Inputs */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm space-y-5">
              <h2 className="text-sm font-black text-gray-900">Kira ve Gider Bilgileri</h2>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Aylık Brüt Kira <span className="font-normal text-gray-400">₺{fmt(aylikKira)}</span>
                </label>
                <input type="range" min={2000} max={200000} step={500} value={aylikKira}
                  onChange={e => setAylikKira(Number(e.target.value))} className="w-full accent-[#00C49F]" />
                <div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>₺2K</span><span>₺200K</span></div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">Gider Yöntemi</label>
                <div className="grid grid-cols-2 gap-1">
                  {[{ v: 'goturU', l: 'Götürü (%15)' }, { v: 'gercek', l: 'Gerçek Gider' }].map(o => (
                    <button key={o.v} onClick={() => setGiderYontemi(o.v as 'goturU' | 'gercek')}
                      className={`text-xs py-2 rounded-lg font-bold transition-all ${giderYontemi === o.v ? 'bg-[#00C49F] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                      {o.l}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Aylık Aidat <span className="font-normal text-gray-400">₺{fmt(aidat)}</span>
                </label>
                <input type="range" min={0} max={10000} step={100} value={aidat}
                  onChange={e => setAidat(Number(e.target.value))} className="w-full accent-[#00C49F]" />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Yıllık Sigorta (DASK + Konut) <span className="font-normal text-gray-400">₺{fmt(sigorta)}</span>
                </label>
                <input type="range" min={0} max={20000} step={500} value={sigorta}
                  onChange={e => setSigorta(Number(e.target.value))} className="w-full accent-[#00C49F]" />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Aylık Bakım/Onarım <span className="font-normal text-gray-400">₺{fmt(bakim)}</span>
                </label>
                <input type="range" min={0} max={10000} step={200} value={bakim}
                  onChange={e => setBakim(Number(e.target.value))} className="w-full accent-[#00C49F]" />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Boş Kalma Süresi (Ay/Yıl) <span className="font-normal text-gray-400">{bosTasima} ay</span>
                </label>
                <input type="range" min={0} max={6} step={1} value={bosTasima}
                  onChange={e => setBosTasima(Number(e.target.value))} className="w-full accent-[#00C49F]" />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Diğer Aylık Gider <span className="font-normal text-gray-400">₺{fmt(diger)}</span>
                </label>
                <input type="range" min={0} max={5000} step={100} value={diger}
                  onChange={e => setDiger(Number(e.target.value))} className="w-full accent-[#00C49F]" />
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-2 space-y-4">

            <div className="bg-gradient-to-br from-[#00C49F] to-[#00a882] rounded-2xl p-6 text-white">
              <p className="text-xs text-white/70 mb-1">Aylık Net Gelir</p>
              <p className="text-4xl font-black mb-2">₺{fmt(Math.round(result.netAylik))}</p>
              <p className="text-xs text-white/70">
                Brüt ₺{fmt(Math.round(result.brutAylik))} — Net getiri oranı %{pct(result.netGetiriOrani)}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                <p className="text-[10px] text-gray-400 mb-1">Yıllık Brüt Kira</p>
                <p className="text-xl font-black text-gray-900">₺{fmt(Math.round(result.brutYillik))}</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                <p className="text-[10px] text-gray-400 mb-1">Yıllık Net Gelir</p>
                <p className="text-xl font-black text-[#00C49F]">₺{fmt(Math.round(result.netYillik))}</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                <p className="text-[10px] text-gray-400 mb-1">Yıllık Giderler</p>
                <p className="text-xl font-black text-rose-500">₺{fmt(Math.round(result.yillikGiderler))}</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                <p className="text-[10px] text-gray-400 mb-1">Gelir Vergisi (Yıllık)</p>
                <p className="text-xl font-black text-amber-600">₺{fmt(Math.round(result.gelirVergisi))}</p>
              </div>
            </div>

            {/* Gider Dağılımı */}
            <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
              <h3 className="text-xs font-black text-gray-900 mb-3">Yıllık Gider Dağılımı</h3>
              {(() => {
                const items = [
                  { label: 'Aidat (12 ay)', val: aidat * 12 },
                  { label: 'Sigorta', val: sigorta },
                  { label: 'Bakım/Onarım (12 ay)', val: bakim * 12 },
                  { label: 'Boş Kalma Kaybı', val: result.bosTasimaMaliyet },
                  { label: 'Diğer (12 ay)', val: diger * 12 },
                  { label: 'Gelir Vergisi', val: result.gelirVergisi },
                ];
                const total = items.reduce((s, i) => s + i.val, 0);
                return items.filter(i => i.val > 0).map((item, i) => (
                  <div key={i} className="flex items-center gap-2 mb-1.5">
                    <span className="text-[10px] text-gray-500 w-32 shrink-0">{item.label}</span>
                    <div className="flex-1 bg-gray-100 rounded-full h-3">
                      <div className="h-full rounded-full bg-rose-300" style={{ width: `${total > 0 ? (item.val / total) * 100 : 0}%` }} />
                    </div>
                    <span className="text-[10px] text-gray-600 w-20 text-right">₺{fmt(Math.round(item.val))}</span>
                  </div>
                ));
              })()}
            </div>

            {/* Tips */}
            <div className="bg-[#F0FDF8] border border-[#00C49F]/20 rounded-xl p-4">
              <p className="text-xs font-black text-gray-900 mb-2 flex items-center gap-2">
                <CheckCircle size={12} className="text-[#00C49F]" /> Optimizasyon İpuçları
              </p>
              <ul className="space-y-1.5">
                {[
                  'Gerçek gider yöntemi toplam gideriniz yıllık kira gelirinin %15\'ini aşıyorsa avantajlıdır.',
                  'Boş kalma süresini en aza indirmek net getiri üzerinde en büyük etkiyi yaratır.',
                  '₺33.000 istisna tutarını aşmıyorsanız beyanname vermek zorunda değilsiniz.',
                ].map((tip, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-[#00C49F] text-[10px] font-bold shrink-0">•</span>
                    <p className="text-[10px] text-gray-700 leading-relaxed">{tip}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTAs */}
            <div className="grid grid-cols-2 gap-3">
              <Link href="/kira-geliri-vergisi" className="group bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition-all flex items-center gap-3">
                <TrendingUp size={16} className="text-[#00C49F] shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-gray-900">Kira Geliri Vergisi</p>
                  <p className="text-[10px] text-gray-400">Götürü vs gerçek gider detayı</p>
                </div>
                <ArrowRight size={12} className="text-gray-300 group-hover:text-gray-600 shrink-0" />
              </Link>
              <Link href="/kira-getiri-hesaplayici" className="group bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition-all flex items-center gap-3">
                <TrendingUp size={16} className="text-blue-600 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-gray-900">Kira Getiri Hesapla</p>
                  <p className="text-[10px] text-gray-400">Yatırım getiri analizi</p>
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
