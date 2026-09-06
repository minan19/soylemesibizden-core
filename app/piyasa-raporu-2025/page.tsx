import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, TrendingUp } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Türkiye Gayrimenkul Piyasa Raporu 2025 | Fiyat Trendleri | Söylemesi Bizden',
  description:
    '2025 Türkiye gayrimenkul piyasa raporu: şehir bazlı fiyat artışları, kira getiri oranları, yatırım fırsatları ve piyasa beklentileri.',
};

const SEHIR_VERILERI = [
  { sehir: 'İstanbul', m2Fiyat: 75000, yillikArtis: 42, kiraCarpani: 0.0038, kiraGetiri: 4.6, hacim: 'Yüksek', trend: 'Artıyor' },
  { sehir: 'Ankara', m2Fiyat: 38000, yillikArtis: 48, kiraCarpani: 0.0045, kiraGetiri: 5.4, hacim: 'Orta', trend: 'Hızlı Artıyor' },
  { sehir: 'İzmir', m2Fiyat: 52000, yillikArtis: 45, kiraCarpani: 0.0042, kiraGetiri: 5.0, hacim: 'Orta', trend: 'Artıyor' },
  { sehir: 'Antalya', m2Fiyat: 48000, yillikArtis: 55, kiraCarpani: 0.0048, kiraGetiri: 5.8, hacim: 'Yüksek', trend: 'Hızlı Artıyor' },
  { sehir: 'Bursa', m2Fiyat: 28000, yillikArtis: 50, kiraCarpani: 0.0052, kiraGetiri: 6.2, hacim: 'Orta', trend: 'Hızlı Artıyor' },
  { sehir: 'Gaziantep', m2Fiyat: 20000, yillikArtis: 58, kiraCarpani: 0.0060, kiraGetiri: 7.2, hacim: 'Düşük', trend: 'En Hızlı' },
  { sehir: 'Kocaeli', m2Fiyat: 26000, yillikArtis: 52, kiraCarpani: 0.0053, kiraGetiri: 6.4, hacim: 'Orta', trend: 'Hızlı Artıyor' },
  { sehir: 'Bodrum', m2Fiyat: 85000, yillikArtis: 38, kiraCarpani: 0.0035, kiraGetiri: 4.2, hacim: 'Düşük', trend: 'Stabil' },
];

const PIYASA_OZETI = [
  { metrik: 'Yıllık Ortalama Fiyat Artışı', deger: '%46', aciklama: 'Türkiye geneli konut fiyatı artışı (2024 sonu)' },
  { metrik: 'Satış Hacmi (2024)', deger: '1,2 Milyon', aciklama: 'Yıllık konut satış adedi' },
  { metrik: 'Yabancı Alıcı Oranı', deger: '%5,8', aciklama: 'Toplam konut satışlarında yabancı uyruklu payı' },
  { metrik: 'Ortalama Kira Getirisi', deger: '%5,5', aciklama: 'Türkiye geneli brüt kira getirisi' },
  { metrik: 'Konut Kredisi Faizi', deger: '%3,4–3,7 Aylık', aciklama: 'Piyasa faiz oranı (Ocak 2025 itibarıyla)' },
  { metrik: 'En Hızlı Büyüyen Bölge', deger: 'Gaziantep / Bursa', aciklama: 'Sanayi ve göç etkisiyle yüksek getiri' },
];

const BEKLENTILER_2025 = [
  { baslik: 'Fiyat Artışı', beklenti: 'Türkiye geneli konut fiyatlarının 2025\'te %35–50 artması beklenmektedir. Enflasyon gerilerse reel artış pozitife dönebilir.', trend: 'olumlu' },
  { baslik: 'Kira Artışı', beklenti: 'Konut kira artış tavanı (%25) devam ettiği sürece kira getirileri nominal bazda yüksek kalacak; ancak mülk değeriyle orantısız büyüme sürebilir.', trend: 'olumlu' },
  { baslik: 'Faiz Oranları', beklenti: 'Merkez Bankası politika faizinde indirim sürecinin devam etmesi konut kredisi faizlerini aşağı çekebilir; bu talep artışına yol açabilir.', trend: 'olumlu' },
  { baslik: 'Arz Açığı', beklenti: 'Kentsel dönüşüm ihtiyacı ve konut üretimindeki gecikmeler arz baskısını artırmakta; fiyatların yüksek seyrini desteklemektedir.', trend: 'nötr' },
  { baslik: 'Yabancı Yatırım', beklenti: 'Vatandaşlık programı kapsamında 400.000 $ eşiği yabancı alıcıları etkilemiş olmakla birlikte yeniden artış sinyalleri gözlemlenmektedir.', trend: 'nötr' },
  { baslik: 'Risk Faktörleri', beklenti: 'Küresel resesyon, kur oynaklığı ve iç politikadaki belirsizlikler piyasa risklerini artırmaktadır.', trend: 'olumsuz' },
];

const YATIRIM_FIRSATLARI = [
  { firsat: 'Sanayi Şehirleri', detay: 'Gaziantep, Kocaeli, Bursa gibi sanayi merkezlerinde hem fiyat artışı hem de kira getirisi güçlü.' },
  { firsat: 'Üniversite Kentleri', detay: 'Eskişehir, Konya, Trabzon gibi şehirlerde öğrenci kiracı kitlesiyle yüksek doluluk ve stabil kira geliri.' },
  { firsat: 'Yeni Metro Hatları', detay: 'İstanbul\'da açılan veya açılması planlanan metro güzergahları çevresindeki mülkler değer artış potansiyeli taşımaktadır.' },
  { firsat: 'Kentsel Dönüşüm Bölgeleri', detay: 'Riskli yapı stoğunun yüksek olduğu bölgelerde kentsel dönüşüm fırsatları; kat karşılığı anlaşmaları değerlendirilebilir.' },
];

const TREND_RENK: Record<string, string> = {
  olumlu: 'text-emerald-600',
  nötr: 'text-amber-500',
  olumsuz: 'text-rose-500',
};

export default function PiyasaRaporu2025Page() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <TrendingUp size={13} /> Piyasa Raporu 2025
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Türkiye Gayrimenkul Piyasa Raporu 2025
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            Şehir bazlı fiyat trendleri, kira getiri oranları, yatırım fırsatları ve 2025 piyasa beklentileri.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-[#00C49F]">%46</p>
              <p className="text-xs text-gray-400">2024 yıllık fiyat artışı</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">1,2M</p>
              <p className="text-xs text-gray-400">Yıllık satış adedi</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-400">%5,5</p>
              <p className="text-xs text-gray-400">Ortalama kira getirisi</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* Piyasa Özeti */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4">2024–2025 Piyasa Özeti</h2>
          <div className="space-y-3">
            {PIYASA_OZETI.map((m, i) => (
              <div key={i} className="grid grid-cols-3 gap-2 py-2 border-b border-gray-50 last:border-0 items-center">
                <p className="text-xs font-black text-gray-900">{m.metrik}</p>
                <p className="text-sm font-black text-[#00C49F]">{m.deger}</p>
                <p className="text-[10px] text-gray-500 leading-relaxed">{m.aciklama}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Şehir Verileri Tablosu */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm overflow-x-auto">
          <h2 className="text-sm font-black text-gray-900 mb-4">Şehir Bazlı Fiyat ve Getiri Verileri</h2>
          <table className="w-full text-[10px] min-w-[560px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 font-black text-gray-500">Şehir</th>
                <th className="text-right py-2 font-black text-gray-500">Ort. ₺/m²</th>
                <th className="text-right py-2 font-black text-amber-600">Yıllık Artış</th>
                <th className="text-right py-2 font-black text-[#00C49F]">Kira Getirisi</th>
                <th className="text-right py-2 font-black text-gray-500">Trend</th>
              </tr>
            </thead>
            <tbody>
              {SEHIR_VERILERI.map((s, i) => (
                <tr key={i} className="border-b border-gray-50 last:border-0">
                  <td className="py-2 font-black text-gray-900">{s.sehir}</td>
                  <td className="py-2 text-right font-bold text-gray-700">{s.m2Fiyat.toLocaleString('tr-TR')} ₺</td>
                  <td className="py-2 text-right font-black text-amber-500">%{s.yillikArtis}</td>
                  <td className="py-2 text-right font-black text-[#00C49F]">%{s.kiraGetiri}</td>
                  <td className="py-2 text-right font-bold text-gray-500">{s.trend}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* 2025 Beklentileri */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">2025 Piyasa Beklentileri</h2>
          <div className="space-y-3">
            {BEKLENTILER_2025.map((b, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-xs font-black text-gray-900">{b.baslik}</p>
                  <span className={`text-[10px] font-black ${TREND_RENK[b.trend]}`}>
                    {b.trend === 'olumlu' ? '↑ Olumlu' : b.trend === 'olumsuz' ? '↓ Olumsuz' : '→ Nötr'}
                  </span>
                </div>
                <p className="text-[10px] text-gray-600 leading-relaxed">{b.beklenti}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Yatırım Fırsatları */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4">2025 Yatırım Fırsatları</h2>
          <div className="space-y-3">
            {YATIRIM_FIRSATLARI.map((f, i) => (
              <div key={i} className="grid grid-cols-3 gap-2 py-2 border-b border-gray-50 last:border-0">
                <p className="text-xs font-black text-[#00C49F]">{f.firsat}</p>
                <p className="text-[10px] text-gray-600 leading-relaxed col-span-2">{f.detay}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Araçlar ve Sayfalar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/piyasa', label: 'Canlı Piyasa Verileri' },
              { href: '/istatistikler', label: 'Platform İstatistikleri' },
              { href: '/market-radar', label: 'Market Radar' },
              { href: '/yatirim-analizi', label: 'Yatırım ROI Analizi' },
              { href: '/bolge-getiri-karsilastir', label: 'Bölge Getiri Karşılaştır' },
              { href: '/amortisman-hesaplayici', label: 'Amortisman Hesaplayıcı' },
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
