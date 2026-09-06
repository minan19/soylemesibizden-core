import { Metadata } from 'next';
import Link from 'next/link';
import {
  BarChart2, TrendingUp, ArrowRight, Home, MapPin, FileText,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Türkiye Gayrimenkul Piyasa Raporu 2024 | Fiyat Endeksi, İşlem Hacmi | Söylemesi Bizden',
  description:
    '2024 yılı Türkiye konut piyasası raporu: satış ve kiralama verileri, şehir bazlı fiyat analizi, yabancı yatırımcı payı.',
};

const MAKRO_GOSTERGELER = [
  { gosterge: 'Konut Satış Adedi', deger: '1.22 Milyon', degisim: '+%7.2', yorum: '2023\'e göre artış; ipotek satışları hâlâ sınırlı.' },
  { gosterge: 'Yabancı Alıcı Sayısı', deger: '35.400', degisim: '-%14.8', yorum: 'Kur ve vize düzenlemelerinin etkisiyle geriledi.' },
  { gosterge: 'Ortalama m² Fiyatı (TR)', deger: '24.800 ₺/m²', degisim: '+%68', yorum: 'TL nominal artış; reel (dolar bazlı) değerleme -%4.' },
  { gosterge: 'Kira Artış Ortalaması', deger: '%62', degisim: 'TÜFE: %65', yorum: '%25 tavan nedeniyle yasal kira artışı kısıtlandı.' },
  { gosterge: 'Brüt Kira Getirisi', deger: '%3.8', degisim: '-0.4 pp', yorum: 'Fiyat artışının kira gelirini geçmesi nedeniyle geriledi.' },
  { gosterge: 'Mortgage Payı', deger: '%6.8', degisim: '-2.1 pp', yorum: 'Yüksek faiz ortamında ipotek satışları tarihî düşükte.' },
];

const SEHIR_FIYAT = [
  { sehir: 'İstanbul', ortFiyat: 52800, kiraMetre: 320, brüt: 3.5, degisim: 71 },
  { sehir: 'Ankara', ortFiyat: 28400, kiraMetre: 185, brüt: 3.9, degisim: 66 },
  { sehir: 'İzmir', ortFiyat: 38200, kiraMetre: 240, brüt: 3.8, degisim: 69 },
  { sehir: 'Antalya', ortFiyat: 44600, kiraMetre: 290, brüt: 3.6, degisim: 74 },
  { sehir: 'Bursa', ortFiyat: 22100, kiraMetre: 145, brüt: 3.7, degisim: 63 },
  { sehir: 'Kocaeli', ortFiyat: 25600, kiraMetre: 160, brüt: 3.5, degisim: 61 },
  { sehir: 'Bodrum', ortFiyat: 88400, kiraMetre: 520, brüt: 3.4, degisim: 78 },
  { sehir: 'Trabzon', ortFiyat: 19800, kiraMetre: 120, brüt: 3.5, degisim: 58 },
];

const AYLIK_TREND = [
  { ay: 'Oca', satisAdet: 78000, ortFiyat: 21200 },
  { ay: 'Şub', satisAdet: 82000, ortFiyat: 21800 },
  { ay: 'Mar', satisAdet: 95000, ortFiyat: 22400 },
  { ay: 'Nis', satisAdet: 101000, ortFiyat: 23100 },
  { ay: 'May', satisAdet: 110000, ortFiyat: 23700 },
  { ay: 'Haz', satisAdet: 118000, ortFiyat: 24400 },
  { ay: 'Tem', satisAdet: 114000, ortFiyat: 24900 },
  { ay: 'Ağu', satisAdet: 108000, ortFiyat: 25300 },
  { ay: 'Eyl', satisAdet: 103000, ortFiyat: 25600 },
  { ay: 'Eki', satisAdet: 98000, ortFiyat: 24800 },
  { ay: 'Kas', satisAdet: 94000, ortFiyat: 24200 },
  { ay: 'Ara', satisAdet: 121000, ortFiyat: 24800 },
];

const MULK_TURU_DAGILIM = [
  { tur: 'Konut', pay: 72, renk: '#00C49F' },
  { tur: 'Arsa', pay: 14, renk: '#3B82F6' },
  { tur: 'İşyeri', pay: 8, renk: '#F59E0B' },
  { tur: 'Arazi', pay: 4, renk: '#8B5CF6' },
  { tur: 'Diğer', pay: 2, renk: '#6B7280' },
];

const ONEMLI_GELISMELER = [
  {
    baslik: '%25 Kira Artış Tavanı Uygulaması',
    detay: 'Ağustos 2022\'den bu yana yürürlükte olan %25 kira artış tavanı 2024\'te de sürdü. Yüksek enflasyon ortamında kiracıları korudu; ancak kayıt dışı kira artışlarını teşvik etti.',
  },
  {
    baslik: 'Yabancı Alımı 400.000 USD Eşiği',
    detay: '2022\'den bu yana zorunlu olan 400.000 USD minimum değer şartı, yabancı yatırımcı sayısını önemli ölçüde düşürdü. Rus ve Körfez ülkesi alımları ise görece canlı kaldı.',
  },
  {
    baslik: 'Deprem Sonrası Kentsel Dönüşüm Hızlandı',
    detay: 'Şubat 2023 depremlerinin ardından hem etkilenen bölgelerde hem Türkiye genelinde riskli yapı tespiti ve kentsel dönüşüm süreçleri ivmelendi.',
  },
  {
    baslik: 'Yüksek Faiz Ortamında Mortgage Daralması',
    detay: 'TCMB faiz artışları sonucu konut kredisi faizleri %3,5–4,5/ay seviyesine yükseldi. Toplam satışların yaklaşık %7\'si ipotek aracılığıyla gerçekleşti.',
  },
];

const fmt = (n: number) => n.toLocaleString('tr-TR');
const maxSatis = Math.max(...AYLIK_TREND.map(a => a.satisAdet));

export default function PiyasaRaporu2024Page() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <BarChart2 size={13} /> Yıllık Piyasa Raporu
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Türkiye Gayrimenkul Piyasa Raporu 2024
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            2024 yılı satış ve kiralama verileri, şehir bazlı fiyat analizi, yabancı yatırımcı eğilimleri ve piyasayı şekillendiren temel gelişmeler.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-[#00C49F]">1.22M</p>
              <p className="text-xs text-gray-400">Yıllık konut satışı</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">+%68</p>
              <p className="text-xs text-gray-400">Nominal fiyat artışı</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-400">%3.8</p>
              <p className="text-xs text-gray-400">Ortalama kira getirisi</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-12 space-y-12">

        {/* Makro Göstergeler */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Temel Göstergeler</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {MAKRO_GOSTERGELER.map((g, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <p className="text-[10px] text-gray-400 mb-1">{g.gosterge}</p>
                <p className="text-2xl font-black text-gray-900 mb-1">{g.deger}</p>
                <p className={`text-xs font-bold mb-2 ${g.degisim.startsWith('+') ? 'text-[#00C49F]' : 'text-rose-500'}`}>{g.degisim}</p>
                <p className="text-[10px] text-gray-500 leading-relaxed">{g.yorum}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Aylık Satış Trendi */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp size={14} className="text-[#00C49F]" /> Aylık Konut Satış Adedi (2024)
          </h2>
          <div className="space-y-1.5">
            {AYLIK_TREND.map((a, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-[10px] text-gray-500 w-7 shrink-0">{a.ay}</span>
                <div className="flex-1 bg-gray-100 rounded-full h-5 overflow-hidden">
                  <div
                    className="h-full bg-[#00C49F] rounded-full flex items-center justify-end pr-2"
                    style={{ width: `${(a.satisAdet / maxSatis) * 100}%` }}
                  >
                    <span className="text-[9px] text-white font-bold">{(a.satisAdet / 1000).toFixed(0)}K</span>
                  </div>
                </div>
                <span className="text-[10px] text-gray-600 w-16 text-right shrink-0">₺{fmt(a.ortFiyat)}/m²</span>
              </div>
            ))}
          </div>
        </section>

        {/* Şehir Tablosu */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Şehir Bazlı Fiyat Analizi</h2>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full text-xs">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-4 py-3 font-black text-gray-700">Şehir</th>
                  <th className="text-right px-4 py-3 font-black text-gray-700">Ort. ₺/m²</th>
                  <th className="text-right px-4 py-3 font-black text-gray-700">Kira ₺/m²</th>
                  <th className="text-right px-4 py-3 font-black text-gray-500">Getiri</th>
                  <th className="text-right px-4 py-3 font-black text-gray-500">YoY</th>
                </tr>
              </thead>
              <tbody>
                {SEHIR_FIYAT.map((s, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-4 py-3 font-bold text-gray-800 flex items-center gap-1.5">
                      <MapPin size={11} className="text-gray-400" />{s.sehir}
                    </td>
                    <td className="px-4 py-3 text-right font-bold text-gray-900">₺{fmt(s.ortFiyat)}</td>
                    <td className="px-4 py-3 text-right text-gray-600">₺{fmt(s.kiraMetre)}</td>
                    <td className="px-4 py-3 text-right text-blue-600 font-bold">%{s.brüt}</td>
                    <td className="px-4 py-3 text-right text-[#00C49F] font-bold">+%{s.degisim}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Mülk Türü Dağılımı */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4">İşlem Hacmi — Mülk Türü Dağılımı</h2>
          <div className="space-y-2.5">
            {MULK_TURU_DAGILIM.map((m, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-[10px] text-gray-500 w-14 shrink-0">{m.tur}</span>
                <div className="flex-1 bg-gray-100 rounded-full h-5 overflow-hidden">
                  <div
                    className="h-full rounded-full flex items-center justify-end pr-2"
                    style={{ width: `${m.pay}%`, backgroundColor: m.renk }}
                  >
                    <span className="text-[9px] text-white font-bold">%{m.pay}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Önemli Gelişmeler */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">2024 Piyasasını Şekillendiren Gelişmeler</h2>
          <div className="space-y-4">
            {ONEMLI_GELISMELER.map((g, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <p className="text-xs font-black text-gray-900 mb-2">{g.baslik}</p>
                <p className="text-[10px] text-gray-600 leading-relaxed">{g.detay}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Araçlar ve Sayfalar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/fiyat-trendi', label: 'Fiyat Trendi Analizi' },
              { href: '/piyasa', label: 'Canlı Piyasa Verileri' },
              { href: '/yatirim-analizi', label: 'Yatırım ROI Analizi' },
              { href: '/kira-endeksi', label: 'Kira Endeksi ve TÜFE' },
              { href: '/yatirim-bolgesi', label: 'En İyi Yatırım Bölgeleri' },
              { href: '/dolar-kuru-etkisi', label: 'Döviz Kuru Etkisi' },
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
