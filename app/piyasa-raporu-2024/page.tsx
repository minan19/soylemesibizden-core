import { Metadata } from 'next';
import Link from 'next/link';
import { BarChart2, TrendingUp, TrendingDown, ArrowRight, Info } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Türkiye Konut Piyasası 2024 Raporu | Fiyat, Satış, Kira Verileri | Söylemesi Bizden',
  description:
    'Türkiye konut piyasası 2024 yıllık özeti: satış hacmi, fiyat artışı, kira endeksi, şehir performansları ve 2025 öngörüleri.',
};

const KEY_STATS = [
  { label: 'Toplam Konut Satışı', value: '1.22M', sub: 'adet (2024)', trend: '+8%', positive: true },
  { label: 'Ortalama Fiyat Artışı', value: '+%54', sub: 'yıllık nominal', trend: 'TÜFE altında reel değer kaybı', positive: false },
  { label: 'İstanbul Ort. ₺/m²', value: '₺58.000', sub: '2024 yıl sonu', trend: '+%62 YoY', positive: true },
  { label: 'Kira Endeksi Artışı', value: '+%62', sub: 'TCMB verileri', trend: 'Tavan aşımı yaygın', positive: false },
  { label: 'Yabancı Konut Satışı', value: '35.400', sub: 'adet', trend: '-%18 YoY', positive: false },
  { label: 'Yeni Proje Ruhsatı', value: '480K', sub: 'bağımsız bölüm', trend: '+%12 YoY', positive: true },
];

const CITY_PERFORMANCE = [
  { city: 'Antalya', priceGrowth: 70, rentGrowth: 75, foreignBuyers: true, highlight: 'Yabancı talep ve turizm etkisi' },
  { city: 'İstanbul', priceGrowth: 62, rentGrowth: 68, foreignBuyers: true, highlight: 'En yüksek hacim, düşen yabancı ilgisi' },
  { city: 'İzmir', priceGrowth: 55, rentGrowth: 60, foreignBuyers: false, highlight: 'Premium segment öne çıkıyor' },
  { city: 'Muğla', priceGrowth: 58, rentGrowth: 50, foreignBuyers: true, highlight: 'Yazlık kira boomı devam etti' },
  { city: 'Trabzon', priceGrowth: 52, rentGrowth: 55, foreignBuyers: true, highlight: 'Orta Doğu yatırımcı ilgisi sürdü' },
  { city: 'Ankara', priceGrowth: 48, rentGrowth: 52, foreignBuyers: false, highlight: 'Kamu konut talebi istikrarlı' },
  { city: 'Bursa', priceGrowth: 45, rentGrowth: 48, foreignBuyers: false, highlight: 'Sanayi yakınlığı kira artışını frenliyor' },
  { city: 'Mersin', priceGrowth: 42, rentGrowth: 45, foreignBuyers: false, highlight: 'Liman ekonomisi büyüyor' },
];

const QUARTERLY = [
  { q: 'Q1 2024', sales: 285000, avgPrice: 48000 },
  { q: 'Q2 2024', sales: 310000, avgPrice: 52000 },
  { q: 'Q3 2024', sales: 340000, avgPrice: 55000 },
  { q: 'Q4 2024', sales: 285000, avgPrice: 58000 },
];

const TRENDS_2025 = [
  { trend: 'Faiz İndirimi Beklentisi', desc: 'TCMB faiz indirim döngüsüne girerken konut kredisi maliyetleri kademeli düşebilir.', impact: 'Olumlu' },
  { trend: 'Artan Stok', desc: 'Yeni proje teslimatları 2025\'te yoğunlaşacak; arz-talep dengesini etkileyecek.', impact: 'Nötr' },
  { trend: 'Kira Tavan Uygulaması', desc: 'Tavan kuralının kaldırılması veya serbest piyasaya dönüş kiralarda ani yükselişe yol açabilir.', impact: 'Riskli' },
  { trend: 'Yabancı Talep', desc: 'Orta Doğu ve Orta Asya kaynaklı talep 2025\'te toparlanma potansiyeli taşıyor.', impact: 'Olumlu' },
  { trend: 'Reel Fiyat Yönü', desc: 'Nominal artışlar enflasyona karşın yavaşlayabilir; bölge bazlı ayrışma güçlenecek.', impact: 'Nötr' },
];

const PROPERTY_DIST = [
  { type: 'Daireler', pct: 72, color: 'bg-[#00C49F]' },
  { type: 'Müstakil Konut', pct: 14, color: 'bg-blue-500' },
  { type: 'Villa / Lüks', pct: 7, color: 'bg-amber-400' },
  { type: 'Arsa', pct: 5, color: 'bg-violet-500' },
  { type: 'Ticari', pct: 2, color: 'bg-rose-400' },
];

export default function PiyasaRaporu2024Page() {
  const maxSales = Math.max(...QUARTERLY.map(q => q.sales));
  const maxPrice = Math.max(...QUARTERLY.map(q => q.avgPrice));
  const maxGrowth = Math.max(...CITY_PERFORMANCE.map(c => c.priceGrowth));

  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <BarChart2 size={13} /> Yıllık Rapor
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Türkiye Konut Piyasası 2024 Raporu
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            2024 yılının konut satış hacmi, fiyat artışları, kira endeksi, şehir performansları ve 2025 öngörülerini içeren kapsamlı piyasa özeti.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {KEY_STATS.map(s => (
              <div key={s.label} className="bg-white/10 rounded-xl px-4 py-3">
                <p className={`text-xl font-black ${s.positive ? 'text-[#00C49F]' : 'text-amber-400'}`}>{s.value}</p>
                <p className="text-xs text-gray-300 font-bold">{s.label}</p>
                <p className="text-[10px] text-gray-500">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-12 space-y-12">

        {/* Çeyreklik Satış */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Çeyreklik Konut Satışı</h2>
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-end gap-6 h-32 mb-3">
              {QUARTERLY.map(q => (
                <div key={q.q} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-[9px] text-gray-500 font-bold">{(q.sales / 1000).toFixed(0)}K</span>
                  <div
                    className="w-full rounded-t-md bg-gradient-to-t from-[#00C49F] to-[#00e5b8]"
                    style={{ height: `${(q.sales / maxSales) * 90}%` }}
                  />
                  <span className="text-[9px] text-gray-400">{q.q}</span>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-4 gap-3 pt-3 border-t border-gray-100">
              {QUARTERLY.map(q => (
                <div key={q.q} className="text-center">
                  <p className="text-[10px] text-gray-400">{q.q} Ort. ₺/m²</p>
                  <p className="text-xs font-black text-[#00C49F]">₺{q.avgPrice.toLocaleString('tr-TR')}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Şehir Performansları */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Şehir Bazlı Fiyat Artışı (YoY %)</h2>
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-3">
            {CITY_PERFORMANCE.sort((a, b) => b.priceGrowth - a.priceGrowth).map(c => (
              <div key={c.city} className="flex items-center gap-3">
                <span className="text-xs font-black text-gray-700 w-20 shrink-0">{c.city}</span>
                <div className="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#00C49F] to-[#00e5b8]"
                    style={{ width: `${(c.priceGrowth / maxGrowth) * 100}%` }}
                  />
                </div>
                <span className="text-xs font-bold text-[#00C49F] w-10 text-right">+{c.priceGrowth}%</span>
                <span className="text-[10px] text-gray-400 flex-1 hidden sm:block">{c.highlight}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Mülk Türü Dağılımı */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Satılan Konut Türü Dağılımı</h2>
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-3">
            {PROPERTY_DIST.map(p => (
              <div key={p.type} className="flex items-center gap-3">
                <span className="text-xs font-bold text-gray-700 w-28 shrink-0">{p.type}</span>
                <div className="flex-1 h-5 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${p.color}`} style={{ width: `${p.pct}%` }} />
                </div>
                <span className="text-xs font-black text-gray-800 w-8 text-right">%{p.pct}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 2025 Öngörüleri */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">2025 Piyasa Öngörüleri</h2>
          <div className="space-y-3">
            {TRENDS_2025.map((t, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm flex items-start gap-4">
                <div className={`px-2 py-1 rounded-full text-[9px] font-black shrink-0 ${t.impact === 'Olumlu' ? 'bg-[#F0FDF8] text-[#00C49F]' : t.impact === 'Riskli' ? 'bg-rose-50 text-rose-600' : 'bg-gray-100 text-gray-600'}`}>
                  {t.impact}
                </div>
                <div>
                  <p className="text-xs font-black text-gray-900 mb-0.5">{t.trend}</p>
                  <p className="text-[10px] text-gray-600 leading-relaxed">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Note */}
        <section className="flex items-start gap-3 bg-blue-50 border border-blue-200 rounded-xl p-4">
          <Info size={14} className="text-blue-500 shrink-0 mt-0.5" />
          <p className="text-xs text-blue-700 leading-relaxed">
            <span className="font-black">Veri Kaynakları:</span> TÜİK, TCMB, Tapu ve Kadastro Genel Müdürlüğü ve sektör araştırmaları baz alınarak hazırlanmıştır. Rakamlar yaklaşık piyasa tahminlerini yansıtmaktadır.
          </p>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Araçlar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/piyasa', label: 'Piyasa Verileri' },
              { href: '/fiyat-trendi', label: 'Fiyat Trendi' },
              { href: '/istatistikler', label: 'Platform İstatistikleri' },
              { href: '/kira-haritasi', label: 'Kira Fiyat Rehberi' },
              { href: '/faiz-gecmisi', label: 'Faiz Geçmişi' },
              { href: '/yatirim-bolgesi', label: 'En İyi Yatırım Bölgeleri' },
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
