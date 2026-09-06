'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight, BarChart2 } from 'lucide-react';

type SemtVeri = { semt: string; satilik: number; kiralik: number };

const SEHIR_VERILERI: Record<string, SemtVeri[]> = {
  'İstanbul': [
    { semt: 'Beşiktaş', satilik: 95000, kiralik: 42000 },
    { semt: 'Kadıköy', satilik: 88000, kiralik: 38000 },
    { semt: 'Şişli', satilik: 82000, kiralik: 35000 },
    { semt: 'Ataşehir', satilik: 72000, kiralik: 30000 },
    { semt: 'Üsküdar', satilik: 68000, kiralik: 28000 },
    { semt: 'Bağcılar', satilik: 38000, kiralik: 16000 },
    { semt: 'Pendik', satilik: 42000, kiralik: 18000 },
    { semt: 'Esenyurt', satilik: 32000, kiralik: 13000 },
  ],
  'Ankara': [
    { semt: 'Çankaya', satilik: 52000, kiralik: 22000 },
    { semt: 'Keçiören', satilik: 28000, kiralik: 12000 },
    { semt: 'Yenimahalle', satilik: 35000, kiralik: 15000 },
    { semt: 'Mamak', satilik: 22000, kiralik: 9500 },
    { semt: 'Etimesgut', satilik: 32000, kiralik: 13500 },
    { semt: 'Sincan', satilik: 24000, kiralik: 10000 },
  ],
  'İzmir': [
    { semt: 'Konak', satilik: 62000, kiralik: 26000 },
    { semt: 'Karşıyaka', satilik: 58000, kiralik: 24000 },
    { semt: 'Bornova', satilik: 48000, kiralik: 20000 },
    { semt: 'Bayraklı', satilik: 44000, kiralik: 18500 },
    { semt: 'Gaziemir', satilik: 36000, kiralik: 15000 },
    { semt: 'Torbalı', satilik: 28000, kiralik: 11500 },
  ],
  'Antalya': [
    { semt: 'Muratpaşa', satilik: 55000, kiralik: 23000 },
    { semt: 'Konyaaltı', satilik: 48000, kiralik: 20000 },
    { semt: 'Kepez', satilik: 32000, kiralik: 13500 },
    { semt: 'Lara', satilik: 62000, kiralik: 25000 },
    { semt: 'Döşemealtı', satilik: 28000, kiralik: 11500 },
  ],
  'Bursa': [
    { semt: 'Osmangazi', satilik: 38000, kiralik: 16000 },
    { semt: 'Nilüfer', satilik: 42000, kiralik: 18000 },
    { semt: 'Yıldırım', satilik: 28000, kiralik: 12000 },
    { semt: 'Mudanya', satilik: 35000, kiralik: 14500 },
  ],
};

export default function M2FiyatClient() {
  const [sehir, setSehir] = useState('İstanbul');
  const [tur, setTur] = useState<'satilik' | 'kiralik'>('satilik');
  const [fiyat, setFiyat] = useState(0);
  const [alan, setAlan] = useState(100);

  const semtVerileri = SEHIR_VERILERI[sehir] || [];

  const sonuc = useMemo(() => {
    const birimFiyat = fiyat / (alan || 1);
    const semtBirimFiyatlari = semtVerileri.map(s => ({ ...s, birim: s[tur] }));
    semtBirimFiyatlari.sort((a, b) => b.birim - a.birim);
    const maxBirim = semtBirimFiyatlari[0]?.birim || 1;
    const ortalamaFiyat = semtBirimFiyatlari.reduce((acc, s) => acc + s.birim, 0) / (semtBirimFiyatlari.length || 1);
    const konumOran = fiyat > 0 ? (birimFiyat / ortalamaFiyat) * 100 : null;

    return {
      birimFiyat: Math.round(birimFiyat),
      semtBirimFiyatlari,
      maxBirim,
      ortalamaFiyat: Math.round(ortalamaFiyat),
      konumOran: konumOran !== null ? Math.round(konumOran) : null,
      konumYorum: konumOran !== null
        ? konumOran >= 120 ? 'Piyasa Üzeri'
          : konumOran >= 80 ? 'Piyasa Ortası'
          : 'Piyasa Altı'
        : null,
    };
  }, [sehir, tur, fiyat, alan, semtVerileri]);

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <BarChart2 size={13} /> m² Fiyat Karşılaştırıcı
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">Metrekare Fiyat Karşılaştırıcı</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            Şehir ve semt bazlı ortalama ₺/m² değerlerini karşılaştırın; baktığınız mülkün piyasadaki yerini görün.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-8">

        {/* Inputs */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-5">Karşılaştırma Ayarları</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">Şehir</label>
              <select value={sehir} onChange={e => setSehir(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-[#00C49F]">
                {Object.keys(SEHIR_VERILERI).map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">Tür</label>
              <div className="flex gap-2">
                {(['satilik', 'kiralik'] as const).map(t => (
                  <button key={t} onClick={() => setTur(t)}
                    className={`flex-1 py-2 rounded-xl text-xs font-black transition-colors ${tur === t ? 'bg-[#00C49F] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                    {t === 'satilik' ? 'Satılık' : 'Kiralık'}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Baktığım Mülkün Toplam Fiyatı (₺)</label>
              <input type="number" value={fiyat || ''} onChange={e => setFiyat(Number(e.target.value))}
                placeholder="Örn: 3.500.000"
                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-[#00C49F]" />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Alan (m²)</label>
              <p className="text-lg font-black text-[#00C49F] mb-2">{alan} m²</p>
              <input type="range" min={30} max={500} step={10} value={alan}
                onChange={e => setAlan(Number(e.target.value))} className="w-full accent-[#00C49F]" />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>30</span><span>500</span></div>
            </div>

          </div>

          {fiyat > 0 && (
            <div className={`mt-5 p-4 rounded-xl border ${
              sonuc.konumYorum === 'Piyasa Üzeri' ? 'bg-rose-50 border-rose-100' :
              sonuc.konumYorum === 'Piyasa Altı' ? 'bg-[#F0FDF8] border-[#00C49F]/20' :
              'bg-amber-50 border-amber-100'
            }`}>
              <p className="text-xs font-black text-gray-900 mb-1">Mülkünüzün m² Fiyatı</p>
              <div className="flex items-center gap-3">
                <p className={`text-2xl font-black ${
                  sonuc.konumYorum === 'Piyasa Üzeri' ? 'text-rose-600' :
                  sonuc.konumYorum === 'Piyasa Altı' ? 'text-[#00C49F]' : 'text-amber-600'
                }`}>{sonuc.birimFiyat.toLocaleString('tr-TR')} ₺/m²</p>
                <span className={`text-xs font-black px-2 py-1 rounded-lg ${
                  sonuc.konumYorum === 'Piyasa Üzeri' ? 'bg-rose-100 text-rose-600' :
                  sonuc.konumYorum === 'Piyasa Altı' ? 'bg-[#00C49F]/20 text-[#00C49F]' :
                  'bg-amber-100 text-amber-700'
                }`}>{sonuc.konumYorum}</span>
              </div>
              <p className="text-[10px] text-gray-500 mt-1">{sehir} ortalama: {sonuc.ortalamaFiyat.toLocaleString('tr-TR')} ₺/m² — %{sonuc.konumOran} seviyesinde</p>
            </div>
          )}
        </section>

        {/* Semt Karşılaştırması */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4">{sehir} — Semt Bazlı {tur === 'satilik' ? 'Satılık' : 'Kiralık'} ₺/m²</h2>
          <div className="space-y-3">
            {sonuc.semtBirimFiyatlari.map((s, i) => (
              <div key={i} className="flex items-center gap-3">
                <p className="text-xs font-bold text-gray-700 w-28 shrink-0">{s.semt}</p>
                <div className="flex-1 bg-gray-100 rounded-full h-4 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${fiyat > 0 && Math.abs(sonuc.birimFiyat - s.birim) < s.birim * 0.05 ? 'bg-amber-400' : 'bg-[#00C49F]'}`}
                    style={{ width: `${(s.birim / sonuc.maxBirim) * 100}%` }}
                  />
                </div>
                <p className="text-xs font-black text-gray-800 w-28 text-right shrink-0">{s.birim.toLocaleString('tr-TR')} ₺</p>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-gray-400 mt-3">* Veriler 2024 piyasa gözlemlerine dayalı tahmindir.</p>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Araçlar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/emlak-piyasasi', label: 'Emlak Piyasası Analizi' },
              { href: '/bolge-karsilastir', label: 'Bölge Karşılaştır' },
              { href: '/konut-analizi', label: 'Konut Yatırım Analizi' },
              { href: '/fiyat-trendi', label: 'Fiyat Trendi' },
              { href: '/mahalle-analizi', label: 'Mahalle Analizi' },
              { href: '/kira-haritasi', label: 'Kira Haritası' },
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
