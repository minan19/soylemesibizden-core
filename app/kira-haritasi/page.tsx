import { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, TrendingUp, ArrowRight, Info } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Türkiye Kira Fiyat Haritası | Şehir Bazlı Ortalama Kira | Söylemesi Bizden',
  description:
    'Türkiye\'nin büyük şehirlerinde ortalama kira fiyatları, oda tipine göre kira aralıkları, 2024 verisi ve yıllık değişim oranları.',
};

const CITIES = [
  { city: 'İstanbul', avg1plus1: 18000, avg2plus1: 28000, avg3plus1: 45000, yoy: 62, priceM2: 58000 },
  { city: 'İzmir', avg1plus1: 12000, avg2plus1: 19000, avg3plus1: 30000, yoy: 55, priceM2: 35000 },
  { city: 'Ankara', avg1plus1: 9000, avg2plus1: 14000, avg3plus1: 22000, yoy: 48, priceM2: 24000 },
  { city: 'Antalya', avg1plus1: 13000, avg2plus1: 21000, avg3plus1: 34000, yoy: 70, priceM2: 38000 },
  { city: 'Bursa', avg1plus1: 8500, avg2plus1: 13000, avg3plus1: 20000, yoy: 45, priceM2: 28000 },
  { city: 'Muğla', avg1plus1: 14000, avg2plus1: 22000, avg3plus1: 36000, yoy: 58, priceM2: 65000 },
  { city: 'Kocaeli', avg1plus1: 8000, avg2plus1: 12500, avg3plus1: 19000, yoy: 44, priceM2: 26000 },
  { city: 'Mersin', avg1plus1: 7000, avg2plus1: 11000, avg3plus1: 17000, yoy: 42, priceM2: 20000 },
  { city: 'Konya', avg1plus1: 6000, avg2plus1: 9500, avg3plus1: 15000, yoy: 38, priceM2: 16000 },
  { city: 'Gaziantep', avg1plus1: 5500, avg2plus1: 8500, avg3plus1: 13000, yoy: 36, priceM2: 15000 },
  { city: 'Trabzon', avg1plus1: 7500, avg2plus1: 11500, avg3plus1: 18000, yoy: 52, priceM2: 22000 },
  { city: 'Eskişehir', avg1plus1: 7000, avg2plus1: 11000, avg3plus1: 17000, yoy: 40, priceM2: 18000 },
];

const FACTORS = [
  { factor: 'Konum (merkez-çevre)', detail: 'İstanbul Anadolu yakası merkez ile ilçe çevresi arasında %40-60 fark olabilir.' },
  { factor: 'Ulaşım', detail: 'Metro, metrobüs veya tramvay erişimi olan mahalleler %15-25 prim taşır.' },
  { factor: 'Bina yaşı ve özellikleri', detail: 'Asansörlü, güvenlikli, yeni bina kiraları %10-20 daha yüksektir.' },
  { factor: 'Eşyalı/eşyasız', detail: 'Eşyalı daireler eşyasıza göre %20-35 daha pahalı kiralanır.' },
  { factor: 'Sezonluk etki', detail: 'Kıyı şehirlerinde yaz sezonu yazlık kiraları 3-5 kat artabilir.' },
  { factor: 'Okul yakınlığı', detail: 'Üniversite çevresindeki mahalleler %20-30 getiri avantajı sunar.' },
];

const YIELD_TIPS = [
  'İstanbul\'da brüt kira getirisi genellikle %3-4, Anadolu şehirlerinde %5-7 arasındadır.',
  'Net getiri için kira gelirinden aidat, vergiler ve boşluk kaybı (%5-10) düşülmelidir.',
  'Tavan kira artış kuralı: TÜİK TÜFE 12 aylık ortalaması veya %25, hangisi düşükse (mevcut kural).',
  'Yeni kiracı için kira serbestçe belirlenir; mevcut kiracıda tavan uygulanır.',
];

const fmt = (n: number) => n.toLocaleString('tr-TR');

export default function KiraHaritasiPage() {
  const maxAvg = Math.max(...CITIES.map(c => c.avg3plus1));

  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <MapPin size={13} /> Piyasa Verisi
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Türkiye Kira Fiyat Rehberi
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            12 büyük şehirde oda tipine göre ortalama kira fiyatları, yıllık değişim ve kira getirisi verileri. 2024 piyasa verisi.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-[#00C49F]">12</p>
              <p className="text-xs text-gray-400">Şehir verisi</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-400">+{Math.round(CITIES.reduce((s, c) => s + c.yoy, 0) / CITIES.length)}%</p>
              <p className="text-xs text-gray-400">Ort. yıllık artış</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">2024</p>
              <p className="text-xs text-gray-400">Veri yılı</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-12 space-y-12">

        {/* Şehir Tablosu */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Şehir Bazlı Kira Tablosu (₺/ay)</h2>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="text-left px-4 py-3 font-black text-gray-700">Şehir</th>
                    <th className="text-right px-4 py-3 font-black text-gray-700">1+1</th>
                    <th className="text-right px-4 py-3 font-black text-gray-700">2+1</th>
                    <th className="text-right px-4 py-3 font-black text-gray-700">3+1</th>
                    <th className="text-right px-4 py-3 font-black text-amber-600">YoY</th>
                    <th className="text-right px-4 py-3 font-black text-gray-700">₺/m² (satış)</th>
                  </tr>
                </thead>
                <tbody>
                  {CITIES.sort((a, b) => b.avg2plus1 - a.avg2plus1).map((c, i) => (
                    <tr key={c.city} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 font-black text-gray-900">
                        <Link href={`/sehir/${encodeURIComponent(c.city)}`} className="hover:text-[#00C49F] transition-colors">
                          {c.city}
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-right text-gray-700">₺{fmt(c.avg1plus1)}</td>
                      <td className="px-4 py-3 text-right font-bold text-gray-900">₺{fmt(c.avg2plus1)}</td>
                      <td className="px-4 py-3 text-right text-gray-700">₺{fmt(c.avg3plus1)}</td>
                      <td className="px-4 py-3 text-right">
                        <span className={`font-bold ${c.yoy > 50 ? 'text-rose-500' : 'text-amber-600'}`}>+{c.yoy}%</span>
                      </td>
                      <td className="px-4 py-3 text-right text-[#00C49F] font-bold">₺{fmt(c.priceM2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 3+1 bar grafik */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">3+1 Ortalama Kira Karşılaştırması</h2>
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-3">
            {CITIES.sort((a, b) => b.avg3plus1 - a.avg3plus1).map(c => (
              <div key={c.city} className="flex items-center gap-3">
                <span className="text-xs font-black text-gray-700 w-20 shrink-0">
                  <Link href={`/sehir/${encodeURIComponent(c.city)}`} className="hover:text-[#00C49F]">{c.city}</Link>
                </span>
                <div className="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#00C49F] to-[#00e5b8]"
                    style={{ width: `${(c.avg3plus1 / maxAvg) * 100}%` }}
                  />
                </div>
                <span className="text-xs font-bold text-gray-800 w-20 text-right">₺{fmt(c.avg3plus1)}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Kira artış oranları */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Yıllık Kira Artış Oranları</h2>
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-end gap-2 h-28">
              {CITIES.sort((a, b) => b.yoy - a.yoy).map(c => {
                const maxYoy = Math.max(...CITIES.map(x => x.yoy));
                return (
                  <div key={c.city} className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-[8px] text-gray-600 font-bold">%{c.yoy}</span>
                    <div
                      className={`w-full rounded-t-md ${c.yoy > 55 ? 'bg-rose-400' : 'bg-[#00C49F]'}`}
                      style={{ height: `${(c.yoy / maxYoy) * 90}%` }}
                    />
                    <span className="text-[7px] text-gray-400 text-center leading-tight">{c.city.slice(0, 3)}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Fiyatı Etkileyen Faktörler */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Kira Fiyatını Etkileyen Faktörler</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {FACTORS.map((f, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                <p className="text-xs font-black text-gray-900 mb-1">{f.factor}</p>
                <p className="text-[10px] text-gray-500 leading-relaxed">{f.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Getiri ipuçları */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp size={14} className="text-[#00C49F]" /> Kira Getirisi ve Tavan Bilgisi
          </h2>
          <ul className="space-y-3">
            {YIELD_TIPS.map((tip, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-[#F0FDF8] text-[#00C49F] text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                <p className="text-xs text-gray-600 leading-relaxed">{tip}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Note */}
        <section className="flex items-start gap-3 bg-blue-50 border border-blue-200 rounded-xl p-4">
          <Info size={14} className="text-blue-500 shrink-0 mt-0.5" />
          <p className="text-xs text-blue-700 leading-relaxed">
            <span className="font-black">Veri Notu:</span> Tablodaki rakamlar 2024 yılı ortalama piyasa fiyatlarıdır ve bölge, özellik ve dönemsel koşullara göre önemli ölçüde farklılık gösterebilir. Güncel ilan fiyatları için kiralik bölümümüzü inceleyin.
          </p>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Araçlar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/kira-artis-hesaplama', label: 'Kira Artış Hesaplayıcı' },
              { href: '/kira-getiri-hesaplayici', label: 'Kira Getirisi Hesaplayıcı' },
              { href: '/kira-geliri-vergisi', label: 'Kira Geliri Vergisi' },
              { href: '/kira-mi-satin-mi', label: 'Kira mı, Satın mı?' },
              { href: '/kira-sozlesmesi', label: 'Kira Sözleşmesi Rehberi' },
              { href: '/kiralik', label: 'Kiralık İlanlar' },
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
