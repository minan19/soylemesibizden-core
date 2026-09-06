'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight, Home } from 'lucide-react';

const VADE_SECENEKLERI = [60, 84, 120, 180, 240];

export default function KonutKredisiSimulatorClient() {
  const [evDegeri, setEvDegeri] = useState(3000000);
  const [pesinatOrani, setPesinatOrani] = useState(20);
  const [aylikFaiz, setAylikFaiz] = useState(3.5);
  const [vade, setVade] = useState(120);
  const [gelir, setGelir] = useState(60000);

  const sonuc = useMemo(() => {
    const pesinat = evDegeri * (pesinatOrani / 100);
    const kredi = evDegeri - pesinat;
    const r = aylikFaiz / 100;
    const n = vade;
    const taksit = kredi * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const toplamOdeme = taksit * n;
    const toplamFaiz = toplamOdeme - kredi;
    const faizYuku = (toplamFaiz / kredi) * 100;
    const gideOran = (taksit / gelir) * 100;

    const plan: { ay: number; taksit: number; anapara: number; faiz: number; kalan: number }[] = [];
    let kalan = kredi;
    for (let ay = 1; ay <= Math.min(vade, 24); ay++) {
      const faizPay = kalan * r;
      const anapara = taksit - faizPay;
      kalan = Math.max(0, kalan - anapara);
      plan.push({ ay, taksit: Math.round(taksit), anapara: Math.round(anapara), faiz: Math.round(faizPay), kalan: Math.round(kalan) });
    }

    const vadeSonuclari = VADE_SECENEKLERI.map(v => {
      const t = kredi * (r * Math.pow(1 + r, v)) / (Math.pow(1 + r, v) - 1);
      return { vade: v, taksit: Math.round(t), toplamOdeme: Math.round(t * v), toplamFaiz: Math.round(t * v - kredi) };
    });

    return {
      pesinat: Math.round(pesinat),
      kredi: Math.round(kredi),
      taksit: Math.round(taksit),
      toplamOdeme: Math.round(toplamOdeme),
      toplamFaiz: Math.round(toplamFaiz),
      faizYuku: faizYuku.toFixed(1),
      gideOran: gideOran.toFixed(1),
      plan,
      vadeSonuclari,
    };
  }, [evDegeri, pesinatOrani, aylikFaiz, vade, gelir]);

  const gideUyari = parseFloat(sonuc.gideOran) > 40;

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <Home size={13} /> Kredi Simülatörü
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">Konut Kredisi Simülatörü</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            Aylık taksit, toplam ödeme ve faiz yükünü hesaplayın. Vade alternatiflerini karşılaştırın.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-8">

        {/* Inputs */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-5">Kredi Parametreleri</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Ev Değeri</label>
              <p className="text-lg font-black text-[#00C49F] mb-2">{evDegeri.toLocaleString('tr-TR')} ₺</p>
              <input type="range" min={500000} max={20000000} step={100000} value={evDegeri}
                onChange={e => setEvDegeri(Number(e.target.value))} className="w-full accent-[#00C49F]" />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>500K</span><span>20M</span></div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Peşinat Oranı</label>
              <p className="text-lg font-black text-[#00C49F] mb-2">%{pesinatOrani} — {sonuc.pesinat.toLocaleString('tr-TR')} ₺</p>
              <input type="range" min={10} max={50} step={5} value={pesinatOrani}
                onChange={e => setPesinatOrani(Number(e.target.value))} className="w-full accent-[#00C49F]" />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>%10</span><span>%50</span></div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Aylık Faiz Oranı</label>
              <p className="text-lg font-black text-[#00C49F] mb-2">%{aylikFaiz}</p>
              <input type="range" min={1.5} max={7} step={0.1} value={aylikFaiz}
                onChange={e => setAylikFaiz(parseFloat(e.target.value))} className="w-full accent-[#00C49F]" />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>%1.5</span><span>%7</span></div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Vade (Ay)</label>
              <p className="text-lg font-black text-[#00C49F] mb-2">{vade} ay ({Math.round(vade / 12)} yıl)</p>
              <input type="range" min={12} max={240} step={12} value={vade}
                onChange={e => setVade(Number(e.target.value))} className="w-full accent-[#00C49F]" />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>12 ay</span><span>240 ay</span></div>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-gray-700 mb-1">Aylık Net Gelir (Gelir-Gider oranı hesabı için)</label>
              <p className="text-lg font-black text-gray-700 mb-2">{gelir.toLocaleString('tr-TR')} ₺</p>
              <input type="range" min={15000} max={300000} step={5000} value={gelir}
                onChange={e => setGelir(Number(e.target.value))} className="w-full accent-[#00C49F]" />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>15K</span><span>300K</span></div>
            </div>
          </div>
        </section>

        {/* Özet */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-[#F0FDF8] rounded-2xl border border-[#00C49F]/20 p-4 text-center">
            <p className="text-2xl font-black text-[#00C49F]">{sonuc.taksit.toLocaleString('tr-TR')} ₺</p>
            <p className="text-xs text-gray-500 mt-1">Aylık Taksit</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm text-center">
            <p className="text-xl font-black text-gray-900">{(sonuc.kredi / 1000000).toFixed(2)} M ₺</p>
            <p className="text-xs text-gray-500 mt-1">Kredi Tutarı</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm text-center">
            <p className="text-xl font-black text-rose-500">{(sonuc.toplamFaiz / 1000000).toFixed(2)} M ₺</p>
            <p className="text-xs text-gray-500 mt-1">Toplam Faiz</p>
          </div>
          <div className={`rounded-2xl border p-4 text-center ${gideUyari ? 'bg-rose-50 border-rose-200' : 'bg-white border-gray-100'}`}>
            <p className={`text-2xl font-black ${gideUyari ? 'text-rose-600' : 'text-gray-900'}`}>%{sonuc.gideOran}</p>
            <p className="text-xs text-gray-500 mt-1">Gelire Oranı</p>
          </div>
        </section>

        {gideUyari && (
          <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 text-xs text-rose-800">
            <span className="font-black">Uyarı:</span> Aylık taksit gelirinizin %{sonuc.gideOran}&apos;ini oluşturuyor. Bankalar genellikle %40 üzerini riskli kabul eder.
          </div>
        )}

        {/* Vade Karşılaştırması */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm overflow-x-auto">
          <h2 className="text-sm font-black text-gray-900 mb-4">Vade Karşılaştırması</h2>
          <table className="w-full text-[10px] min-w-[400px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 font-black text-gray-500">Vade</th>
                <th className="text-right py-2 font-black text-gray-500">Aylık Taksit</th>
                <th className="text-right py-2 font-black text-gray-500">Toplam Ödeme</th>
                <th className="text-right py-2 font-black text-gray-500">Toplam Faiz</th>
              </tr>
            </thead>
            <tbody>
              {sonuc.vadeSonuclari.map(row => (
                <tr key={row.vade} className={`border-b border-gray-50 ${row.vade === vade ? 'bg-[#F0FDF8] font-black' : ''}`}>
                  <td className="py-2 font-bold text-gray-800">{row.vade} ay ({Math.round(row.vade / 12)} yıl)</td>
                  <td className="py-2 text-right text-[#00C49F] font-bold">{row.taksit.toLocaleString('tr-TR')} ₺</td>
                  <td className="py-2 text-right text-gray-700">{(row.toplamOdeme / 1000000).toFixed(2)} M ₺</td>
                  <td className="py-2 text-right text-rose-500 font-bold">{(row.toplamFaiz / 1000000).toFixed(2)} M ₺</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Ödeme Planı (ilk 24 ay) */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm overflow-x-auto">
          <h2 className="text-sm font-black text-gray-900 mb-1">İlk 24 Ay Ödeme Planı</h2>
          <p className="text-[10px] text-gray-400 mb-4">Her ödemenin anapara ve faiz dağılımı</p>
          <table className="w-full text-[10px] min-w-[400px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 font-black text-gray-500">Ay</th>
                <th className="text-right py-2 font-black text-gray-500">Taksit</th>
                <th className="text-right py-2 font-black text-gray-500">Anapara</th>
                <th className="text-right py-2 font-black text-gray-500">Faiz</th>
                <th className="text-right py-2 font-black text-gray-500">Kalan Borç</th>
              </tr>
            </thead>
            <tbody>
              {sonuc.plan.map(row => (
                <tr key={row.ay} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="py-1.5 font-bold text-gray-800">{row.ay}. Ay</td>
                  <td className="py-1.5 text-right font-bold text-[#00C49F]">{row.taksit.toLocaleString('tr-TR')} ₺</td>
                  <td className="py-1.5 text-right text-blue-600">{row.anapara.toLocaleString('tr-TR')} ₺</td>
                  <td className="py-1.5 text-right text-rose-500">{row.faiz.toLocaleString('tr-TR')} ₺</td>
                  <td className="py-1.5 text-right text-gray-700">{(row.kalan / 1000000).toFixed(3)} M ₺</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Araçlar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/faiz-orani-karsilastirici', label: 'Faiz Oranı Karşılaştırıcı' },
              { href: '/pesinat-hesaplayici', label: 'Peşinat Hesaplayıcı' },
              { href: '/odeme-plani', label: 'Ödeme Planı Simülatörü' },
              { href: '/kredi-karsilastirma', label: 'Kredi Karşılaştırma' },
              { href: '/konut-kredisi-basvuru', label: 'Kredi Başvuru Rehberi' },
              { href: '/tapu-masrafi', label: 'Tapu Masrafı Hesaplayıcı' },
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
