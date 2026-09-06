'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight, Building, AlertTriangle } from 'lucide-react';

const RISK_BOLGESI: Record<string, { kiraYardimi: number; faizDestegi: string }> = {
  '1. Derece': { kiraYardimi: 15000, faizDestegi: '3 puan indirim' },
  '2. Derece': { kiraYardimi: 13000, faizDestegi: '2 puan indirim' },
  '3. Derece': { kiraYardimi: 11000, faizDestegi: '2 puan indirim' },
  '4. Derece': { kiraYardimi: 9000, faizDestegi: '1 puan indirim' },
  '5. Derece': { kiraYardimi: 7000, faizDestegi: '1 puan indirim' },
};

export default function KentselDonusumClient() {
  const [riskBolgesi, setRiskBolgesi] = useState('1. Derece');
  const [malikMi, setMalikMi] = useState(true);
  const [kiracilaDavarMi, setKiracilaDavarMi] = useState(false);
  const [kiraYardimSuresi, setKiraYardimSuresi] = useState(18);
  const [tasinmazDegeri, setTasinmazDegeri] = useState(2000000);
  const [yeniKonutDegeri, setYeniKonutDegeri] = useState(4500000);

  const sonuc = useMemo(() => {
    const bolge = RISK_BOLGESI[riskBolgesi];
    const aylikKira = bolge.kiraYardimi;
    const toplamKiraYardimi = aylikKira * kiraYardimSuresi;
    const tasinmaYardimi = malikMi ? 75000 : 35000;
    const toplamDestek = toplamKiraYardimi + tasinmaYardimi;

    const yenilemeOrani = yeniKonutDegeri / tasinmazDegeri;

    const katKarsiligi = malikMi ? tasinmazDegeri * 0.45 : 0;

    const netMaliyet = yeniKonutDegeri - tasinmazDegeri - toplamDestek;

    return {
      aylikKira,
      toplamKiraYardimi,
      tasinmaYardimi,
      toplamDestek,
      yenilemeOrani: Math.round(yenilemeOrani * 100) / 100,
      netMaliyet: Math.max(0, netMaliyet),
      katKarsiligi,
      faizDestegi: bolge.faizDestegi,
    };
  }, [riskBolgesi, malikMi, kiraYardimSuresi, tasinmazDegeri, yeniKonutDegeri, kiracilaDavarMi]);

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <Building size={13} /> Kentsel Dönüşüm Hesaplayıcı
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">Kentsel Dönüşüm Hesaplayıcı</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            Kira yardımı, taşınma desteği ve yeni konut için tahmini maliyetinizi hesaplayın.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-8">

        {/* Inputs */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-5">Taşınmaz Bilgileri</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">Deprem Risk Bölgesi</label>
              <select value={riskBolgesi} onChange={e => setRiskBolgesi(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-[#00C49F]">
                {Object.keys(RISK_BOLGESI).map(b => <option key={b} value={b}>{b} Deprem Bölgesi</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">Statünüz</label>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => setMalikMi(true)}
                  className={`rounded-xl px-3 py-2 text-xs font-black transition-colors ${malikMi ? 'bg-[#00C49F] text-white' : 'bg-gray-100 text-gray-600'}`}>
                  Malik (Ev Sahibi)
                </button>
                <button onClick={() => setMalikMi(false)}
                  className={`rounded-xl px-3 py-2 text-xs font-black transition-colors ${!malikMi ? 'bg-[#00C49F] text-white' : 'bg-gray-100 text-gray-600'}`}>
                  Kiracı
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Kira Yardımı Süresi (Ay)</label>
              <p className="text-lg font-black text-[#00C49F] mb-2">{kiraYardimSuresi} ay</p>
              <input type="range" min={6} max={18} step={3} value={kiraYardimSuresi}
                onChange={e => setKiraYardimSuresi(Number(e.target.value))}
                className="w-full accent-[#00C49F]" />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>6 ay</span><span>18 ay</span></div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Mevcut Taşınmaz Değeri</label>
              <p className="text-lg font-black text-[#00C49F] mb-2">{(tasinmazDegeri / 1000000).toFixed(1)} M ₺</p>
              <input type="range" min={500000} max={10000000} step={250000} value={tasinmazDegeri}
                onChange={e => setTasinmazDegeri(Number(e.target.value))}
                className="w-full accent-[#00C49F]" />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>500K</span><span>10M</span></div>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-gray-700 mb-1">Yeni Konut Değeri (Hedef)</label>
              <p className="text-lg font-black text-[#00C49F] mb-2">{(yeniKonutDegeri / 1000000).toFixed(1)} M ₺</p>
              <input type="range" min={1000000} max={20000000} step={500000} value={yeniKonutDegeri}
                onChange={e => setYeniKonutDegeri(Number(e.target.value))}
                className="w-full accent-[#00C49F]" />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>1M</span><span>20M</span></div>
            </div>

          </div>
        </section>

        {/* Results */}
        <section className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="bg-[#F0FDF8] rounded-2xl border border-[#00C49F]/20 p-4 text-center">
            <p className="text-2xl font-black text-[#00C49F]">{sonuc.aylikKira.toLocaleString('tr-TR')} ₺</p>
            <p className="text-xs text-gray-500 mt-1">Aylık Kira Yardımı</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm text-center">
            <p className="text-xl font-black text-gray-900">{sonuc.toplamKiraYardimi.toLocaleString('tr-TR')} ₺</p>
            <p className="text-xs text-gray-500 mt-1">Toplam Kira Desteği</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm text-center">
            <p className="text-xl font-black text-gray-900">{sonuc.tasinmaYardimi.toLocaleString('tr-TR')} ₺</p>
            <p className="text-xs text-gray-500 mt-1">Taşınma Yardımı</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm text-center">
            <p className="text-xl font-black text-gray-900">{sonuc.toplamDestek.toLocaleString('tr-TR')} ₺</p>
            <p className="text-xs text-gray-500 mt-1">Toplam Devlet Desteği</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm text-center">
            <p className="text-xl font-black text-amber-600">{sonuc.netMaliyet.toLocaleString('tr-TR')} ₺</p>
            <p className="text-xs text-gray-500 mt-1">Tahmini Net Maliyet</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm text-center">
            <p className="text-xl font-black text-blue-600">{sonuc.faizDestegi}</p>
            <p className="text-xs text-gray-500 mt-1">Faiz Desteği</p>
          </div>
        </section>

        {/* Warning */}
        <section className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <AlertTriangle size={14} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 leading-relaxed">
            <span className="font-black">Yasal Uyarı:</span> Bu hesaplayıcı yalnızca tahmini değerler sunar. Gerçek yardım miktarları Çevre, Şehircilik ve İklim Değişikliği Bakanlığı kararlarına, güncel bütçe ödeneklerine ve bireysel başvuru koşullarına göre değişir. Kesin bilgi için ilgili belediye veya bakanlık birimlerine başvurun.
          </p>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Sayfalar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/kentsel-donusum', label: 'Kentsel Dönüşüm Rehberi' },
              { href: '/dask-hesaplayici', label: 'DASK Prim Hesaplayıcı' },
              { href: '/imar-durumu', label: 'İmar Durumu Rehberi' },
              { href: '/belediye-islemleri', label: 'Belediye İşlemleri' },
              { href: '/muteahhit-secimi', label: 'Müteahhit Seçimi Rehberi' },
              { href: '/tasinma-rehberi', label: 'Taşınma Rehberi' },
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
