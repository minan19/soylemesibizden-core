'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight, Percent } from 'lucide-react';

export default function FaizKarsilastiricClient() {
  const [krediTutari, setKrediTutari] = useState(1000000);
  const [vade, setVade] = useState(120);

  const [faiz1, setFaiz1] = useState(3.5);
  const [faiz2, setFaiz2] = useState(3.9);
  const [faiz3, setFaiz3] = useState(4.2);

  const hesapla = (faiz: number) => {
    const r = faiz / 100;
    const n = vade;
    if (r === 0) return { taksit: Math.round(krediTutari / n), toplam: krediTutari, faizYuku: 0 };
    const taksit = Math.round(krediTutari * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
    const toplam = taksit * n;
    const faizYuku = toplam - krediTutari;
    return { taksit, toplam, faizYuku };
  };

  const sonuclar = useMemo(() => [
    { label: 'Banka A', faiz: faiz1, renk: 'text-[#00C49F]', bg: 'bg-[#F0FDF8] border-[#00C49F]/20', ...hesapla(faiz1) },
    { label: 'Banka B', faiz: faiz2, renk: 'text-blue-600', bg: 'bg-blue-50 border-blue-100', ...hesapla(faiz2) },
    { label: 'Banka C', faiz: faiz3, renk: 'text-amber-600', bg: 'bg-amber-50 border-amber-100', ...hesapla(faiz3) },
  ], [krediTutari, vade, faiz1, faiz2, faiz3]);

  const minTaksit = Math.min(...sonuclar.map(s => s.taksit));
  const maxFaizYuku = Math.max(...sonuclar.map(s => s.faizYuku));

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <Percent size={13} /> Faiz Oranı Karşılaştırıcı
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">Konut Kredisi Faiz Oranı Karşılaştırıcı</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            3 farklı faiz oranını yan yana karşılaştırın: aylık taksit, toplam ödeme ve faiz yükü farkları.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-8">

        {/* Kredi Parametreleri */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-5">Kredi Parametreleri</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Kredi Tutarı</label>
              <p className="text-lg font-black text-[#00C49F] mb-2">{krediTutari.toLocaleString('tr-TR')} ₺</p>
              <input type="range" min={100000} max={10000000} step={100000} value={krediTutari}
                onChange={e => setKrediTutari(Number(e.target.value))} className="w-full accent-[#00C49F]" />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>100K</span><span>10M</span></div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Vade (Ay)</label>
              <p className="text-lg font-black text-[#00C49F] mb-2">{vade} ay ({Math.round(vade / 12)} yıl)</p>
              <input type="range" min={12} max={240} step={12} value={vade}
                onChange={e => setVade(Number(e.target.value))} className="w-full accent-[#00C49F]" />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>12</span><span>240</span></div>
            </div>
          </div>
        </section>

        {/* Faiz Oranları */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-5">Aylık Faiz Oranları</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { label: 'Banka A', value: faiz1, setter: setFaiz1, renk: 'text-[#00C49F]' },
              { label: 'Banka B', value: faiz2, setter: setFaiz2, renk: 'text-blue-600' },
              { label: 'Banka C', value: faiz3, setter: setFaiz3, renk: 'text-amber-600' },
            ].map(({ label, value, setter, renk }) => (
              <div key={label}>
                <label className="block text-xs font-bold text-gray-700 mb-1">{label}</label>
                <p className={`text-xl font-black mb-2 ${renk}`}>%{value.toFixed(1)}</p>
                <input type="range" min={1} max={7} step={0.1} value={value}
                  onChange={e => setter(Number(e.target.value))} className="w-full accent-[#00C49F]" />
                <div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>%1</span><span>%7</span></div>
              </div>
            ))}
          </div>
        </section>

        {/* Karşılaştırma */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {sonuclar.map((s, i) => (
            <div key={i} className={`rounded-2xl border p-5 ${s.bg} ${s.taksit === minTaksit ? 'ring-2 ring-[#00C49F]' : ''}`}>
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-black text-gray-900">{s.label}</p>
                {s.taksit === minTaksit && <span className="text-[10px] bg-[#00C49F] text-white font-black px-2 py-0.5 rounded">En Düşük</span>}
              </div>
              <p className={`text-2xl font-black mb-1 ${s.renk}`}>%{s.faiz.toFixed(1)}</p>
              <p className="text-[10px] text-gray-500 mb-4">Aylık faiz oranı</p>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <p className="text-[10px] text-gray-500">Aylık Taksit</p>
                  <p className="text-xs font-black text-gray-900">{s.taksit.toLocaleString('tr-TR')} ₺</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-[10px] text-gray-500">Toplam Ödeme</p>
                  <p className="text-xs font-black text-gray-700">{(s.toplam / 1000000).toFixed(2)} M ₺</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-[10px] text-gray-500">Faiz Yükü</p>
                  <p className="text-xs font-black text-rose-600">{(s.faizYuku / 1000000).toFixed(2)} M ₺</p>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Fark Tablosu */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4">Faiz Yükü Karşılaştırması</h2>
          <div className="space-y-3">
            {sonuclar.map((s, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between">
                  <p className="text-xs font-bold text-gray-700">{s.label} — %{s.faiz.toFixed(1)}</p>
                  <p className="text-xs font-black text-rose-600">{s.faizYuku.toLocaleString('tr-TR')} ₺</p>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-rose-400 h-full rounded-full" style={{ width: `${(s.faizYuku / Math.max(1, maxFaizYuku)) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-gray-400 mt-3">
            En düşük ve en yüksek faiz arasındaki toplam fark: {(Math.max(...sonuclar.map(s => s.faizYuku)) - Math.min(...sonuclar.map(s => s.faizYuku))).toLocaleString('tr-TR')} ₺
          </p>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Araçlar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/mortgage-simulatoru', label: 'Mortgage Simülatörü' },
              { href: '/banka-kredileri', label: 'Banka Kredileri Karşılaştırma' },
              { href: '/odeme-plani', label: 'Ödeme Planı Simülatörü' },
              { href: '/kredi-karsilastirma', label: 'Kredi Senaryo Karşılaştırma' },
              { href: '/konut-kredisi-basvuru', label: 'Konut Kredisi Başvurusu' },
              { href: '/mortgage-rehberi', label: 'Mortgage Rehberi' },
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
