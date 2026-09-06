'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight, Shield } from 'lucide-react';

const RISK_BOLGESI: Record<string, { risk: number; katsayi: number; label: string; renk: string }> = {
  'İstanbul (1. Bölge)': { risk: 1, katsayi: 1.20, label: 'Çok Yüksek', renk: 'text-rose-600 bg-rose-50' },
  'İzmir (1. Bölge)': { risk: 1, katsayi: 1.15, label: 'Çok Yüksek', renk: 'text-rose-600 bg-rose-50' },
  'Bursa (2. Bölge)': { risk: 2, katsayi: 0.90, label: 'Yüksek', renk: 'text-orange-600 bg-orange-50' },
  'Antalya (2. Bölge)': { risk: 2, katsayi: 0.85, label: 'Yüksek', renk: 'text-orange-600 bg-orange-50' },
  'Ankara (3. Bölge)': { risk: 3, katsayi: 0.70, label: 'Orta', renk: 'text-amber-600 bg-amber-50' },
  'Konya (3. Bölge)': { risk: 3, katsayi: 0.65, label: 'Orta', renk: 'text-amber-600 bg-amber-50' },
  'Trabzon (4. Bölge)': { risk: 4, katsayi: 0.50, label: 'Düşük', renk: 'text-blue-600 bg-blue-50' },
  'Samsun (4. Bölge)': { risk: 4, katsayi: 0.50, label: 'Düşük', renk: 'text-blue-600 bg-blue-50' },
  'Erzurum (5. Bölge)': { risk: 5, katsayi: 0.40, label: 'Çok Düşük', renk: 'text-[#00C49F] bg-[#F0FDF8]' },
};

const YAPI_TURU: Record<string, number> = {
  'Betonarme (yönetmeliğe uygun)': 1.0,
  'Betonarme (eski yapı, 2000 öncesi)': 1.40,
  'Yığma / Kâgir': 1.80,
  'Çelik Yapı': 0.85,
  'Ahşap': 1.10,
};

export default function DepremSigortaClient() {
  const [bolge, setBolge] = useState('İstanbul (1. Bölge)');
  const [yapiTuru, setYapiTuru] = useState('Betonarme (yönetmeliğe uygun)');
  const [alan, setAlan] = useState(100);
  const [yenidanInsaaMaliyeti, setYenidanInsaaMaliyeti] = useState(15000);
  const [katMalikleriBinaDegeri, setKatMalikleriBinaDegeri] = useState(3000000);
  const [esyaDegeri, setEsyaDegeri] = useState(300000);
  const [sorumlulukLimiti, setSorumlulukLimiti] = useState(500000);

  const sonuc = useMemo(() => {
    const bolgeVeri = RISK_BOLGESI[bolge];
    const yapiKatsayi = YAPI_TURU[yapiTuru];

    const binaDegeri = alan * yenidanInsaaMaliyeti;
    const daskTemelPrim = binaDegeri * 0.0018 * bolgeVeri.katsayi * yapiKatsayi;
    const daskYillikPrim = Math.min(Math.max(daskTemelPrim, 1200), 12000);

    const konutSigortaTemel = (katMalikleriBinaDegeri * 0.0015 + esyaDegeri * 0.002 + sorumlulukLimiti * 0.001) * bolgeVeri.katsayi;
    const konutSigortaYillik = Math.max(konutSigortaTemel, 2000);

    const toplamYillikPrim = daskYillikPrim + konutSigortaYillik;
    const korumaNedeni = binaDegeri + esyaDegeri + sorumlulukLimiti;

    return {
      binaDegeri: Math.round(binaDegeri),
      daskYillikPrim: Math.round(daskYillikPrim),
      konutSigortaYillik: Math.round(konutSigortaYillik),
      toplamYillikPrim: Math.round(toplamYillikPrim),
      korumaNedeni: Math.round(korumaNedeni),
      bolgeRisk: bolgeVeri,
      aylikPrim: Math.round(toplamYillikPrim / 12),
    };
  }, [bolge, yapiTuru, alan, yenidanInsaaMaliyeti, katMalikleriBinaDegeri, esyaDegeri, sorumlulukLimiti]);

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <Shield size={13} /> Deprem Sigorta Hesaplayıcı
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">Deprem Sigorta Prim Hesaplayıcı</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            DASK zorunlu deprem sigortası ve konut sigortası prim tahminlerini bölge, yapı türü ve değer bazında hesaplayın.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-8">

        {/* Inputs */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-5">Mülk Bilgileri</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">Deprem Risk Bölgesi</label>
              <select value={bolge} onChange={e => setBolge(e.target.value)}
                className="w-full text-xs border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-[#00C49F]">
                {Object.keys(RISK_BOLGESI).map(b => <option key={b} value={b}>{b}</option>)}
              </select>
              <div className={`mt-2 inline-flex items-center text-[10px] font-black px-2 py-0.5 rounded ${RISK_BOLGESI[bolge].renk}`}>
                Risk: {RISK_BOLGESI[bolge].label}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">Yapı Türü</label>
              <select value={yapiTuru} onChange={e => setYapiTuru(e.target.value)}
                className="w-full text-xs border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-[#00C49F]">
                {Object.keys(YAPI_TURU).map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Brüt Alan (m²)</label>
              <p className="text-lg font-black text-[#00C49F] mb-2">{alan} m²</p>
              <input type="range" min={30} max={500} step={10} value={alan}
                onChange={e => setAlan(Number(e.target.value))} className="w-full accent-[#00C49F]" />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>30</span><span>500</span></div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Yeniden İnşa Maliyeti (₺/m²)</label>
              <p className="text-lg font-black text-[#00C49F] mb-2">{yenidanInsaaMaliyeti.toLocaleString('tr-TR')} ₺</p>
              <input type="range" min={8000} max={30000} step={1000} value={yenidanInsaaMaliyeti}
                onChange={e => setYenidanInsaaMaliyeti(Number(e.target.value))} className="w-full accent-[#00C49F]" />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>8K</span><span>30K</span></div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Konut Sigorta Değeri</label>
              <p className="text-lg font-black text-gray-700 mb-2">{katMalikleriBinaDegeri.toLocaleString('tr-TR')} ₺</p>
              <input type="range" min={500000} max={15000000} step={100000} value={katMalikleriBinaDegeri}
                onChange={e => setKatMalikleriBinaDegeri(Number(e.target.value))} className="w-full accent-[#00C49F]" />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>500K</span><span>15M</span></div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Eşya / Muhteviyat Değeri</label>
              <p className="text-lg font-black text-gray-700 mb-2">{esyaDegeri.toLocaleString('tr-TR')} ₺</p>
              <input type="range" min={0} max={2000000} step={50000} value={esyaDegeri}
                onChange={e => setEsyaDegeri(Number(e.target.value))} className="w-full accent-[#00C49F]" />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>0</span><span>2M</span></div>
            </div>

          </div>
        </section>

        {/* Özet */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-[#F0FDF8] rounded-2xl border border-[#00C49F]/20 p-4 text-center">
            <p className="text-xl font-black text-[#00C49F]">{sonuc.daskYillikPrim.toLocaleString('tr-TR')} ₺</p>
            <p className="text-xs text-gray-500 mt-1">DASK (Yıllık)</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm text-center">
            <p className="text-xl font-black text-gray-900">{sonuc.konutSigortaYillik.toLocaleString('tr-TR')} ₺</p>
            <p className="text-xs text-gray-500 mt-1">Konut Sigortası</p>
          </div>
          <div className="bg-rose-50 rounded-2xl border border-rose-100 p-4 text-center">
            <p className="text-xl font-black text-rose-600">{sonuc.toplamYillikPrim.toLocaleString('tr-TR')} ₺</p>
            <p className="text-xs text-gray-500 mt-1">Toplam (Yıllık)</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm text-center">
            <p className="text-xl font-black text-amber-600">{sonuc.aylikPrim.toLocaleString('tr-TR')} ₺</p>
            <p className="text-xs text-gray-500 mt-1">Aylık Eşdeğer</p>
          </div>
        </section>

        {/* Bina Değeri */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4">Sigorta Değerleri</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] text-gray-500 mb-0.5">Yeniden İnşa Değeri (DASK)</p>
              <p className="text-base font-black text-gray-900">{sonuc.binaDegeri.toLocaleString('tr-TR')} ₺</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-500 mb-0.5">Toplam Sigorta Güvencesi</p>
              <p className="text-base font-black text-[#00C49F]">{sonuc.korumaNedeni.toLocaleString('tr-TR')} ₺</p>
            </div>
          </div>
          <p className="text-[10px] text-gray-400 mt-3">DASK primleri TCMB tarafından belirlenir; tahmin niteliğindedir. Gerçek prim poliçe bazında değişir.</p>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Araçlar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/dask-hesaplayici', label: 'DASK Prim Hesaplayıcı' },
              { href: '/konut-sigortasi', label: 'Konut Sigortası Rehberi' },
              { href: '/deprem-riski', label: 'Deprem Risk Haritası' },
              { href: '/ev-alma-rehberi', label: 'Ev Alma Rehberi' },
              { href: '/satinalma-maliyeti', label: 'Satın Alma Maliyeti' },
              { href: '/kentsel-donusum', label: 'Kentsel Dönüşüm Rehberi' },
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
