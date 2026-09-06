import { Metadata } from 'next';
import Link from 'next/link';
import {
  MapPin, TrendingUp, Star, ArrowRight, BarChart2,
  CheckCircle, AlertTriangle, Home,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'En İyi Yatırım Bölgeleri | Türkiye Gayrimenkul | Söylemesi Bizden',
  description:
    'Türkiye\'de 2024-2025 yıllarında en yüksek kira getirisi ve değer artış potansiyeli sunan şehirler ve bölgeler. Analitik karşılaştırma, risk skoru ve yatırımcı önerileri.',
};

type Region = {
  city: string;
  region: string;
  grossYield: number;
  priceGrowth: number;
  liquidity: 'Yüksek' | 'Orta' | 'Düşük';
  risk: 'Düşük' | 'Orta' | 'Yüksek';
  score: number;
  avgPriceM2: number;
  why: string;
  warning?: string;
  type: 'star' | 'growth' | 'yield' | 'emerging';
};

const REGIONS: Region[] = [
  {
    city: 'İstanbul',
    region: 'Avrupa Yakası — Başakşehir, Esenyurt',
    grossYield: 4.2,
    priceGrowth: 35,
    liquidity: 'Yüksek',
    risk: 'Düşük',
    score: 88,
    avgPriceM2: 45000,
    why: 'Ulaşım altyapısı, nüfus büyümesi ve Avrupa bağlantısıyla güçlü talep. Yeni metro hatları yakın çevrede kira artışını hızlandırıyor.',
    type: 'star',
  },
  {
    city: 'İstanbul',
    region: 'Anadolu Yakası — Çekmeköy, Sancaktepe',
    grossYield: 4.5,
    priceGrowth: 40,
    liquidity: 'Yüksek',
    risk: 'Düşük',
    score: 90,
    avgPriceM2: 42000,
    why: '3. Köprü ve metro hatlarıyla erişim kolaylaştı. Fiyatlar Avrupa yakasına kıyasla düşük, getiri yüksek.',
    type: 'star',
  },
  {
    city: 'Ankara',
    region: 'Mamak, Etimesgut',
    grossYield: 5.8,
    priceGrowth: 28,
    liquidity: 'Orta',
    risk: 'Düşük',
    score: 82,
    avgPriceM2: 22000,
    why: 'Kira getirisi Türkiye ortalamasının üzerinde. Çalışan nüfus kiralık konut talebini yüksek tutuyor.',
    type: 'yield',
  },
  {
    city: 'İzmir',
    region: 'Torbalı, Kemalpaşa',
    grossYield: 5.2,
    priceGrowth: 32,
    liquidity: 'Orta',
    risk: 'Düşük',
    score: 84,
    avgPriceM2: 28000,
    why: 'OSB yakınlığı nedeniyle çalışan talebi yüksek. Fiyatlar Alsancak/Karşıyaka\'ya kıyasla makul.',
    type: 'yield',
  },
  {
    city: 'Antalya',
    region: 'Merkez, Kepez',
    grossYield: 6.5,
    priceGrowth: 45,
    liquidity: 'Yüksek',
    risk: 'Orta',
    score: 86,
    avgPriceM2: 35000,
    why: 'Yabancı alıcı talebi, turizm ekonomisi ve kısa dönem kiralama getirisi yüksek. Dolar bazlı kira geliri mümkün.',
    warning: 'Sezonsal kira dalgalanması riski var.',
    type: 'growth',
  },
  {
    city: 'Mersin',
    region: 'Mezitli, Yenişehir',
    grossYield: 7.2,
    priceGrowth: 38,
    liquidity: 'Orta',
    risk: 'Orta',
    score: 79,
    avgPriceM2: 18000,
    why: 'Türkiye\'nin en yüksek kira getirisi sunan şehirlerinden biri. Liman kenti ekonomisi ve öğrenci nüfusu güçlü talep yaratıyor.',
    type: 'yield',
  },
  {
    city: 'Bursa',
    region: 'Osmangazi, Nilüfer',
    grossYield: 4.8,
    priceGrowth: 42,
    liquidity: 'Orta',
    risk: 'Düşük',
    score: 83,
    avgPriceM2: 26000,
    why: 'Sanayi kenti, sürekli göç alıyor. Nilüfer\'de orta-üst segment talep artışı.',
    type: 'growth',
  },
  {
    city: 'Muğla',
    region: 'Bodrum, Fethiye',
    grossYield: 8.0,
    priceGrowth: 55,
    liquidity: 'Orta',
    risk: 'Yüksek',
    score: 76,
    avgPriceM2: 75000,
    why: 'Döviz bazlı yabancı talep, yüksek sezonsal kira getirisi. Premium segment için cazip.',
    warning: 'Yüksek giriş maliyeti, sezonsal boşluk, yabancı talebin döviz kuruna bağımlılığı.',
    type: 'yield',
  },
  {
    city: 'Gaziantep',
    region: 'Şehitkamil, Nizip',
    grossYield: 6.8,
    priceGrowth: 30,
    liquidity: 'Düşük',
    risk: 'Orta',
    score: 74,
    avgPriceM2: 14000,
    why: 'Türkiye\'nin en büyük sanayi şehirlerinden biri. Düşük fiyat, yüksek kira getirisi. Likidite sınırlı.',
    type: 'emerging',
  },
  {
    city: 'Trabzon',
    region: 'Ortahisar',
    grossYield: 5.5,
    priceGrowth: 62,
    liquidity: 'Düşük',
    risk: 'Orta',
    score: 72,
    avgPriceM2: 20000,
    why: 'Arap alıcı talebiyle fiyatlar hızlı yükseldi. Spekülatif balonlara dikkat.',
    warning: 'Fiyat artışının büyük kısmı spekülatif; yabancı talep azalınca düzeltme riski var.',
    type: 'emerging',
  },
];

const typeConfig = {
  star: { label: 'Yıldız Bölge', color: 'bg-amber-100 text-amber-700', icon: Star },
  growth: { label: 'Değer Artışı', color: 'bg-[#F0FDF8] text-[#00C49F]', icon: TrendingUp },
  yield: { label: 'Kira Getirisi', color: 'bg-blue-100 text-blue-700', icon: BarChart2 },
  emerging: { label: 'Gelişen Bölge', color: 'bg-violet-100 text-violet-700', icon: MapPin },
};

const riskColors: Record<string, string> = {
  'Düşük': 'text-[#00C49F]',
  'Orta': 'text-amber-500',
  'Yüksek': 'text-rose-500',
};

const liquidityColors: Record<string, string> = {
  'Yüksek': 'text-[#00C49F]',
  'Orta': 'text-blue-600',
  'Düşük': 'text-gray-400',
};

export default function YatirimBolgesiPage() {
  const sorted = [...REGIONS].sort((a, b) => b.score - a.score);

  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <MapPin size={13} /> Bölge Analizi
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            En İyi Yatırım Bölgeleri 2024–2025
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            Kira getirisi, değer artış potansiyeli, likidite ve risk skoruna göre
            Türkiye&apos;nin önde gelen gayrimenkul yatırım bölgelerinin analitik karşılaştırması.
          </p>
          <div className="flex flex-wrap gap-3">
            {Object.entries(typeConfig).map(([, v]) => (
              <div key={v.label} className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full ${v.color}`}>
                <v.icon size={11} /> {v.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-12 space-y-10">

        {/* Regions list */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-5">Skor Sıralaması</h2>
          <div className="space-y-4">
            {sorted.map((r, i) => {
              const tc = typeConfig[r.type];
              return (
                <div key={`${r.city}-${r.region}`} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                  <div className="flex items-start gap-4">
                    {/* Rank */}
                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center shrink-0">
                      <span className={`text-lg font-black ${i === 0 ? 'text-[#00C49F]' : i < 3 ? 'text-blue-600' : 'text-gray-400'}`}>
                        {i + 1}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="text-base font-black text-gray-900">{r.city}</h3>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${tc.color}`}>
                          {tc.label}
                        </span>
                        {i === 0 && <span className="text-[10px] bg-amber-400 text-white font-black px-2 py-0.5 rounded-full">En İyi Skor</span>}
                      </div>
                      <p className="text-xs text-gray-500 mb-2">{r.region}</p>
                      <p className="text-xs text-gray-600 leading-relaxed mb-3">{r.why}</p>
                      {r.warning && (
                        <div className="flex items-start gap-2 mb-3">
                          <AlertTriangle size={12} className="text-amber-500 shrink-0 mt-0.5" />
                          <p className="text-[10px] text-amber-700">{r.warning}</p>
                        </div>
                      )}

                      {/* Metrics */}
                      <div className="flex flex-wrap gap-3">
                        <div className="text-center">
                          <p className="text-[10px] text-gray-400">Brüt Getiri</p>
                          <p className="text-sm font-black text-[#00C49F]">%{r.grossYield}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-[10px] text-gray-400">Fiyat Artışı</p>
                          <p className="text-sm font-black text-blue-600">+%{r.priceGrowth}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-[10px] text-gray-400">Ort. ₺/m²</p>
                          <p className="text-sm font-black text-gray-700">₺{(r.avgPriceM2 / 1000).toFixed(0)}K</p>
                        </div>
                        <div className="text-center">
                          <p className="text-[10px] text-gray-400">Likidite</p>
                          <p className={`text-sm font-black ${liquidityColors[r.liquidity]}`}>{r.liquidity}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-[10px] text-gray-400">Risk</p>
                          <p className={`text-sm font-black ${riskColors[r.risk]}`}>{r.risk}</p>
                        </div>
                      </div>
                    </div>

                    {/* Score */}
                    <div className="text-right shrink-0">
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${r.score >= 85 ? 'bg-[#00C49F]' : r.score >= 78 ? 'bg-blue-500' : 'bg-gray-200'}`}>
                        <span className="text-lg font-black text-white">{r.score}</span>
                      </div>
                      <p className="text-[9px] text-gray-400 mt-1">/ 100</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Scoring methodology */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-lg font-black text-gray-900 mb-3">Skor Nasıl Hesaplanır?</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { factor: 'Brüt Kira Getirisi', weight: '%30', color: 'text-[#00C49F]' },
              { factor: 'Fiyat Artış Potansiyeli', weight: '%25', color: 'text-blue-600' },
              { factor: 'Piyasa Likiditesi', weight: '%25', color: 'text-amber-600' },
              { factor: 'Risk Seviyesi', weight: '%20', color: 'text-violet-600' },
            ].map(f => (
              <div key={f.factor} className="text-center p-3 rounded-xl bg-gray-50">
                <p className={`text-xl font-black ${f.color}`}>{f.weight}</p>
                <p className="text-[10px] text-gray-500 mt-1">{f.factor}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-4">
            * Veriler 2024 piyasa analizlerine dayanmaktadır. Geçmiş getiriler gelecekteki getirileri garanti etmez.
            Yatırım kararı almadan önce uzman danışmanlık alınması önerilir.
          </p>
        </section>

        {/* Quick checklist */}
        <section className="bg-[#F0FDF8] border border-[#00C49F]/20 rounded-2xl p-6">
          <h2 className="text-lg font-black text-gray-900 mb-4">Bölge Seçiminde Kontrol Listesi</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              'Metro/ulaşım altyapısı planları kontrol edildi mi?',
              'Bölgede yeni konut arzı (proje sayısı) değerlendirildi mi?',
              'Kiralık ilan yoğunluğu (boşluk oranı) araştırıldı mı?',
              'İmar planı değişiklikleri incelendi mi?',
              'Okul, hastane, AVM gibi sosyal donatı mesafesi ölçüldü mü?',
              '5+ yıllık fiyat geçmişi analiz edildi mi?',
              'Benzer özellikteki mülklerin satış süresi araştırıldı mı?',
              'Hedef kiracı profili (öğrenci, aile, çalışan) belirlendi mi?',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 bg-white rounded-lg p-3">
                <CheckCircle size={13} className="text-[#00C49F] shrink-0 mt-0.5" />
                <p className="text-xs text-gray-600 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTAs */}
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link href="/kira-getiri-hesaplayici" className="group bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-all flex flex-col gap-3">
              <BarChart2 size={20} className="text-[#00C49F]" />
              <div>
                <p className="text-sm font-bold text-gray-900 mb-1">Kira Getirisi Hesapla</p>
                <p className="text-xs text-gray-500">Brüt/net getiri analizi</p>
              </div>
              <ArrowRight size={13} className="text-gray-300 group-hover:text-gray-600 transition-colors mt-auto" />
            </Link>
            <Link href="/karsilastir" className="group bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-all flex flex-col gap-3">
              <MapPin size={20} className="text-blue-600" />
              <div>
                <p className="text-sm font-bold text-gray-900 mb-1">Bölge Karşılaştır</p>
                <p className="text-xs text-gray-500">İki şehri yan yana</p>
              </div>
              <ArrowRight size={13} className="text-gray-300 group-hover:text-gray-600 transition-colors mt-auto" />
            </Link>
            <Link href="/yatirim-analizi" className="group bg-gradient-to-br from-[#00C49F] to-[#00a882] rounded-2xl p-5 hover:shadow-md transition-all flex flex-col gap-3">
              <TrendingUp size={20} className="text-white" />
              <div>
                <p className="text-sm font-bold text-white mb-1">Yatırım ROI Hesapla</p>
                <p className="text-xs text-white/70">Kapsamlı getiri analizi</p>
              </div>
              <ArrowRight size={13} className="text-white/60 group-hover:text-white transition-colors mt-auto" />
            </Link>
          </div>
        </section>

      </div>
    </main>
  );
}
