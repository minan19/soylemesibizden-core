'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight, BarChart2 } from 'lucide-react';

const BOLGE_VERILERI: Record<string, {
  ortalamaSatilik: number;
  ortalamaKira: number;
  yillikArtis: number;
}> = {
  'Kadıköy (İstanbul)': { ortalamaSatilik: 75000, ortalamaKira: 28000, yillikArtis: 35 },
  'Beşiktaş (İstanbul)': { ortalamaSatilik: 110000, ortalamaKira: 35000, yillikArtis: 30 },
  'Ataşehir (İstanbul)': { ortalamaSatilik: 55000, ortalamaKira: 20000, yillikArtis: 32 },
  'Çankaya (Ankara)': { ortalamaSatilik: 32000, ortalamaKira: 14000, yillikArtis: 28 },
  'Keçiören (Ankara)': { ortalamaSatilik: 20000, ortalamaKira: 9000, yillikArtis: 25 },
  'Konak (İzmir)': { ortalamaSatilik: 40000, ortalamaKira: 16000, yillikArtis: 30 },
  'Buca (İzmir)': { ortalamaSatilik: 25000, ortalamaKira: 10000, yillikArtis: 27 },
  'Lara (Antalya)': { ortalamaSatilik: 35000, ortalamaKira: 15000, yillikArtis: 38 },
  'Konyaaltı (Antalya)': { ortalamaSatilik: 42000, ortalamaKira: 18000, yillikArtis: 40 },
  'Nilüfer (Bursa)': { ortalamaSatilik: 28000, ortalamaKira: 12000, yillikArtis: 26 },
  'Bodrum Merkez': { ortalamaSatilik: 90000, ortalamaKira: 32000, yillikArtis: 42 },
  'Alaçatı (İzmir)': { ortalamaSatilik: 75000, ortalamaKira: 25000, yillikArtis: 35 },
};

const BOLGELER = Object.keys(BOLGE_VERILERI);

export default function BolgeGetiriClient() {
  const [alan, setAlan] = useState(100);
  const [giderOrani, setGiderOrani] = useState(20);
  const [seciliBolge, setSeciliBolge] = useState<string | null>(null);

  const sonuclar = useMemo(() => {
    return BOLGELER.map(bolge => {
      const veri = BOLGE_VERILERI[bolge];
      const satisFiyati = veri.ortalamaSatilik * alan;
      const yillikKira = veri.ortalamaKira * 12 * (1 - giderOrani / 100);
      const brutGetiri = (veri.ortalamaKira * 12 / satisFiyati) * 100;
      const netGetiri = (yillikKira / satisFiyati) * 100;
      const amortisman = satisFiyati / Math.max(1, yillikKira);
      return {
        bolge,
        satisFiyati,
        aylikKira: veri.ortalamaKira,
        brutGetiri,
        netGetiri,
        amortisman,
        yillikArtis: veri.yillikArtis,
        totalReturn: netGetiri + veri.yillikArtis,
      };
    }).sort((a, b) => b.totalReturn - a.totalReturn);
  }, [alan, giderOrani]);

  const maxNetGetiri = Math.max(...sonuclar.map(s => s.netGetiri));
  const selected = seciliBolge ? sonuclar.find(s => s.bolge === seciliBolge) : null;

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <BarChart2 size={13} /> Bölge Getiri Karşılaştırması
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">Bölge Kira Getiri Karşılaştırıcı</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            12 popüler bölgenin net kira getirisi, fiyat artışı ve toplam yatırım verimini karşılaştırın.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-8">

        {/* Inputs */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-5">Parametreler</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Konut Alanı (m²)</label>
              <p className="text-lg font-black text-[#00C49F] mb-2">{alan} m²</p>
              <input type="range" min={50} max={250} step={10} value={alan}
                onChange={e => setAlan(Number(e.target.value))} className="w-full accent-[#00C49F]" />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>50</span><span>250</span></div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Gider Oranı (aidat, vergi, vb.)</label>
              <p className="text-lg font-black text-[#00C49F] mb-2">%{giderOrani}</p>
              <input type="range" min={5} max={40} step={5} value={giderOrani}
                onChange={e => setGiderOrani(Number(e.target.value))} className="w-full accent-[#00C49F]" />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>%5</span><span>%40</span></div>
            </div>
          </div>
        </section>

        {/* Tablo */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm overflow-x-auto">
          <h2 className="text-sm font-black text-gray-900 mb-4">Bölge Karşılaştırması</h2>
          <table className="w-full text-[10px] min-w-[500px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 font-black text-gray-500">Bölge</th>
                <th className="text-right py-2 font-black text-gray-500">Satış Fiyatı</th>
                <th className="text-right py-2 font-black text-gray-500">Aylık Kira</th>
                <th className="text-right py-2 font-black text-gray-500">Net Getiri</th>
                <th className="text-right py-2 font-black text-gray-500">Fiyat Artışı</th>
                <th className="text-right py-2 font-black text-gray-500">Toplam Verim</th>
              </tr>
            </thead>
            <tbody>
              {sonuclar.map((s, i) => (
                <tr
                  key={s.bolge}
                  onClick={() => setSeciliBolge(s.bolge === seciliBolge ? null : s.bolge)}
                  className={`border-b border-gray-50 cursor-pointer hover:bg-[#F0FDF8] transition-colors ${s.bolge === seciliBolge ? 'bg-[#F0FDF8]' : ''} ${i === 0 ? 'font-black' : ''}`}
                >
                  <td className="py-2 font-bold text-gray-800">{s.bolge}</td>
                  <td className="py-2 text-right text-gray-700">{(s.satisFiyati / 1000000).toFixed(2)} M ₺</td>
                  <td className="py-2 text-right text-gray-700">{s.aylikKira.toLocaleString('tr-TR')} ₺</td>
                  <td className={`py-2 text-right font-black ${s.netGetiri >= 10 ? 'text-[#00C49F]' : s.netGetiri >= 7 ? 'text-amber-600' : 'text-rose-500'}`}>%{s.netGetiri.toFixed(2)}</td>
                  <td className="py-2 text-right text-blue-600 font-bold">%{s.yillikArtis}</td>
                  <td className={`py-2 text-right font-black ${i === 0 ? 'text-[#00C49F]' : 'text-gray-800'}`}>%{s.totalReturn.toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-[10px] text-gray-400 mt-2">Satıra tıklayarak detay görün. Ortalama ₺/m² × alan üzerinden hesaplanmıştır.</p>
        </section>

        {/* Seçili Bölge Detayı */}
        {selected && (
          <section className="bg-[#F0FDF8] border border-[#00C49F]/20 rounded-2xl p-6">
            <h2 className="text-sm font-black text-gray-900 mb-4">{selected.bolge} — Detay</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-lg font-black text-gray-900">{(selected.satisFiyati / 1000000).toFixed(2)} M ₺</p>
                <p className="text-[10px] text-gray-500">{alan} m² Ortalama Değer</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-black text-[#00C49F]">%{selected.netGetiri.toFixed(2)}</p>
                <p className="text-[10px] text-gray-500">Net Kira Getirisi</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-black text-amber-600">{selected.amortisman.toFixed(1)} yıl</p>
                <p className="text-[10px] text-gray-500">Amortisman</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-black text-gray-800">{selected.aylikKira.toLocaleString('tr-TR')} ₺</p>
                <p className="text-[10px] text-gray-500">Ortalama Aylık Kira</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-black text-blue-600">%{selected.yillikArtis}</p>
                <p className="text-[10px] text-gray-500">Yıllık Fiyat Artışı</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-black text-[#00C49F]">%{selected.totalReturn.toFixed(1)}</p>
                <p className="text-[10px] text-gray-500">Toplam Yıllık Verim</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-[10px] text-gray-500 mb-1">Net Getiri Endeksi</p>
              <div className="w-full bg-white rounded-full h-3 overflow-hidden border border-[#00C49F]/20">
                <div className="bg-[#00C49F] h-full rounded-full" style={{ width: `${(selected.netGetiri / maxNetGetiri) * 100}%` }} />
              </div>
            </div>
          </section>
        )}

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Araçlar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/konut-analizi', label: 'Konut Yatırım Analizi' },
              { href: '/net-kira-hesaplayici', label: 'Net Kira Geliri Hesaplayıcı' },
              { href: '/kira-getiri-hesaplayici', label: 'Kira Getiri Hesaplayıcı' },
              { href: '/mahalle-analizi', label: 'Mahalle Analizi' },
              { href: '/bolge-karsilastir', label: 'Bölge Karşılaştırma' },
              { href: '/yatirim-analizi', label: 'Yatırım ROI Hesaplayıcı' },
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
