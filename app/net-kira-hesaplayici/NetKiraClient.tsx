'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight, TrendingUp } from 'lucide-react';

export default function NetKiraClient() {
  const [aylikKira, setAylikKira] = useState(20000);
  const [aylikAidat, setAylikAidat] = useState(1500);
  const [yillikVergi, setYillikVergi] = useState(8000);
  const [yillikBakimOnarim, setYillikBakimOnarim] = useState(6000);
  const [yillikSigorta, setYillikSigorta] = useState(3000);
  const [bosKalmaAy, setBosKalmaAy] = useState(1);
  const [emlakciKomisyon, setEmlakciKomisyon] = useState(0);
  const [mlkDegeri, setMlkDegeri] = useState(3000000);

  const sonuc = useMemo(() => {
    const brutYillikKira = aylikKira * (12 - bosKalmaAy);
    const toplamGider =
      aylikAidat * 12 +
      yillikVergi +
      yillikBakimOnarim +
      yillikSigorta +
      emlakciKomisyon;

    const netYillikKira = brutYillikKira - toplamGider;
    const aylikNetKira = Math.round(netYillikKira / 12);
    const brutGetiriOrani = (brutYillikKira / mlkDegeri) * 100;
    const netGetiriOrani = (netYillikKira / mlkDegeri) * 100;
    const giderOrani = (toplamGider / brutYillikKira) * 100;
    const basabas = mlkDegeri / Math.max(1, netYillikKira);

    return {
      brutYillikKira: Math.round(brutYillikKira),
      toplamGider: Math.round(toplamGider),
      netYillikKira: Math.round(netYillikKira),
      aylikNetKira,
      brutGetiriOrani: brutGetiriOrani.toFixed(2),
      netGetiriOrani: netGetiriOrani.toFixed(2),
      giderOrani: giderOrani.toFixed(1),
      basabas: basabas.toFixed(1),
    };
  }, [aylikKira, aylikAidat, yillikVergi, yillikBakimOnarim, yillikSigorta, bosKalmaAy, emlakciKomisyon, mlkDegeri]);

  const giderKalemleri = [
    { kalem: 'Aidat (yıllık)', tutar: aylikAidat * 12 },
    { kalem: 'Emlak Vergisi', tutar: yillikVergi },
    { kalem: 'Bakım & Onarım', tutar: yillikBakimOnarim },
    { kalem: 'Sigorta', tutar: yillikSigorta },
    { kalem: 'Emlakçı Komisyonu', tutar: emlakciKomisyon },
    { kalem: 'Boş Kalma Kaybı', tutar: aylikKira * bosKalmaAy },
  ];
  const maxGider = Math.max(...giderKalemleri.map(g => g.tutar));

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <TrendingUp size={13} /> Net Kira Hesaplayıcı
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">Net Kira Geliri Hesaplayıcı</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            Brüt kira gelirinizden tüm giderleri düşerek gerçek net getirinizi ve yatırım veriminizi öğrenin.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-8">

        {/* Inputs */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-5">Gelir ve Gider Parametreleri</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Aylık Kira Geliri</label>
              <p className="text-lg font-black text-[#00C49F] mb-2">{aylikKira.toLocaleString('tr-TR')} ₺</p>
              <input type="range" min={2000} max={100000} step={1000} value={aylikKira}
                onChange={e => setAylikKira(Number(e.target.value))} className="w-full accent-[#00C49F]" />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>2K</span><span>100K</span></div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Mülk Değeri</label>
              <p className="text-lg font-black text-[#00C49F] mb-2">{mlkDegeri.toLocaleString('tr-TR')} ₺</p>
              <input type="range" min={500000} max={20000000} step={100000} value={mlkDegeri}
                onChange={e => setMlkDegeri(Number(e.target.value))} className="w-full accent-[#00C49F]" />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>500K</span><span>20M</span></div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Aylık Aidat</label>
              <p className="text-lg font-black text-gray-700 mb-2">{aylikAidat.toLocaleString('tr-TR')} ₺</p>
              <input type="range" min={0} max={10000} step={250} value={aylikAidat}
                onChange={e => setAylikAidat(Number(e.target.value))} className="w-full accent-[#00C49F]" />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>0</span><span>10K</span></div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Yıllık Emlak Vergisi</label>
              <p className="text-lg font-black text-gray-700 mb-2">{yillikVergi.toLocaleString('tr-TR')} ₺</p>
              <input type="range" min={0} max={50000} step={500} value={yillikVergi}
                onChange={e => setYillikVergi(Number(e.target.value))} className="w-full accent-[#00C49F]" />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>0</span><span>50K</span></div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Yıllık Bakım & Onarım</label>
              <p className="text-lg font-black text-gray-700 mb-2">{yillikBakimOnarim.toLocaleString('tr-TR')} ₺</p>
              <input type="range" min={0} max={50000} step={500} value={yillikBakimOnarim}
                onChange={e => setYillikBakimOnarim(Number(e.target.value))} className="w-full accent-[#00C49F]" />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>0</span><span>50K</span></div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Yıllık Sigorta</label>
              <p className="text-lg font-black text-gray-700 mb-2">{yillikSigorta.toLocaleString('tr-TR')} ₺</p>
              <input type="range" min={0} max={20000} step={500} value={yillikSigorta}
                onChange={e => setYillikSigorta(Number(e.target.value))} className="w-full accent-[#00C49F]" />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>0</span><span>20K</span></div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Boş Kalma Süresi (Ay/Yıl)</label>
              <p className="text-lg font-black text-gray-700 mb-2">{bosKalmaAy} ay</p>
              <input type="range" min={0} max={4} step={1} value={bosKalmaAy}
                onChange={e => setBosKalmaAy(Number(e.target.value))} className="w-full accent-[#00C49F]" />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>0</span><span>4</span></div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Emlakçı Komisyonu (Yıllık)</label>
              <p className="text-lg font-black text-gray-700 mb-2">{emlakciKomisyon.toLocaleString('tr-TR')} ₺</p>
              <input type="range" min={0} max={50000} step={1000} value={emlakciKomisyon}
                onChange={e => setEmlakciKomisyon(Number(e.target.value))} className="w-full accent-[#00C49F]" />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>0</span><span>50K</span></div>
            </div>

          </div>
        </section>

        {/* Özet */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm text-center">
            <p className="text-lg font-black text-gray-900">{sonuc.brutYillikKira.toLocaleString('tr-TR')} ₺</p>
            <p className="text-xs text-gray-500 mt-1">Brüt Yıllık Kira</p>
          </div>
          <div className="bg-rose-50 rounded-2xl border border-rose-100 p-4 text-center">
            <p className="text-lg font-black text-rose-600">{sonuc.toplamGider.toLocaleString('tr-TR')} ₺</p>
            <p className="text-xs text-gray-500 mt-1">Toplam Gider</p>
          </div>
          <div className="bg-[#F0FDF8] rounded-2xl border border-[#00C49F]/20 p-4 text-center">
            <p className="text-lg font-black text-[#00C49F]">{sonuc.netYillikKira.toLocaleString('tr-TR')} ₺</p>
            <p className="text-xs text-gray-500 mt-1">Net Yıllık Gelir</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm text-center">
            <p className="text-lg font-black text-amber-600">%{sonuc.netGetiriOrani}</p>
            <p className="text-xs text-gray-500 mt-1">Net Getiri Oranı</p>
          </div>
        </section>

        {/* Getiri Detayı */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4">Getiri Analizi</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-xl font-black text-gray-800">%{sonuc.brutGetiriOrani}</p>
              <p className="text-[10px] text-gray-500 mt-1">Brüt Getiri</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-black text-[#00C49F]">%{sonuc.netGetiriOrani}</p>
              <p className="text-[10px] text-gray-500 mt-1">Net Getiri</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-black text-rose-600">%{sonuc.giderOrani}</p>
              <p className="text-[10px] text-gray-500 mt-1">Gider Oranı</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-black text-amber-600">{sonuc.basabas} yıl</p>
              <p className="text-[10px] text-gray-500 mt-1">Amortisman</p>
            </div>
          </div>
        </section>

        {/* Gider Dağılımı */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4">Gider Dağılımı</h2>
          <div className="space-y-3">
            {giderKalemleri.filter(g => g.tutar > 0).map((g, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between">
                  <p className="text-xs font-bold text-gray-700">{g.kalem}</p>
                  <p className="text-xs font-black text-gray-900">{g.tutar.toLocaleString('tr-TR')} ₺</p>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-rose-400 h-full rounded-full" style={{ width: `${Math.min(100, (g.tutar / Math.max(1, maxGider)) * 100)}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Araçlar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/kira-geliri-vergisi', label: 'Kira Geliri Vergisi' },
              { href: '/konut-analizi', label: 'Konut Yatırım Analizi' },
              { href: '/yatirim-analizi', label: 'Yatırım ROI Hesaplayıcı' },
              { href: '/emlak-vergisi', label: 'Emlak Vergisi Hesaplayıcı' },
              { href: '/kira-artis-hesaplama', label: 'Kira Artış Hesaplayıcı' },
              { href: '/portfoy', label: 'Portföy Takip' },
            ].map(l => (
              <Link key={l.href} href={l.href}
                className="flex items-center gap-2 p-3 rounded-xl bg-gray-50 hover:bg-[#F0FDF8] border border-transparent hover:border-[#00C49F]/20 transition-all group"
              >
                <ArrowRight size={12} className="text-gray-300 group-hover:text-[#00C49F] transition-colors shrink-0" />
                <span className="text-xs text-gray-700 group-hover:text-[#00C49F] font-medium transition-colors">{l.label}</span>
              </Link>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}
