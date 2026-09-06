import { Metadata } from 'next';
import Link from 'next/link';
import {
  Calculator, TrendingUp, Home, MapPin, BarChart2, FileText,
  Landmark, PieChart, Building2, Scale, Star, ArrowRight,
  Search, Key, ShieldCheck, Users, BookOpen, Globe,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Tüm Araçlar | Gayrimenkul Araç Merkezi | Söylemesi Bizden',
  description:
    'Söylemesi Bizden\'in tüm gayrimenkul araçları. Hesaplama, analiz, piyasa verisi, rehber ve daha fazlası tek sayfada.',
};

type Tool = {
  href: string;
  icon: React.ElementType;
  label: string;
  desc: string;
  badge?: string;
};

type Category = {
  title: string;
  color: string;
  iconColor: string;
  tools: Tool[];
};

const CATEGORIES: Category[] = [
  {
    title: 'Hesaplama Araçları',
    color: 'border-[#00C49F]/30 bg-[#F0FDF8]',
    iconColor: 'text-[#00C49F]',
    tools: [
      { href: '/hesaplama', icon: Calculator, label: 'Konut Kredisi Hesaplayıcı', desc: 'Aylık taksit ve toplam faiz' },
      { href: '/tapu-masrafi', icon: FileText, label: 'Tapu Masrafı Hesaplayıcı', desc: 'Alım maliyeti tam hesabı' },
      { href: '/emlak-vergisi', icon: Landmark, label: 'Emlak Vergisi Hesaplayıcı', desc: 'Konut/işyeri/arsa oranları' },
      { href: '/kira-artis-hesaplama', icon: TrendingUp, label: 'Kira Artış Hesaplayıcı', desc: 'TÜİK TÜFE + %25 tavan' },
      { href: '/banka-kredileri', icon: Building2, label: 'Banka Kredisi Karşılaştır', desc: '8 banka faiz karşılaştırması', badge: 'Yeni' },
      { href: '/faiz-takip', icon: TrendingUp, label: 'Faiz Takip', desc: 'Güncel banka oranları ve trend', badge: 'Yeni' },
      { href: '/dask-hesaplayici', icon: ShieldCheck, label: 'DASK Prim Hesaplayıcı', desc: 'Deprem sigortası primi' },
      { href: '/odeme-plani', icon: Calculator, label: 'Ödeme Planı Simülatörü', desc: 'Ay ay anapara + faiz tablosu', badge: 'Yeni' },
      { href: '/kira-geliri-vergisi', icon: FileText, label: 'Kira Geliri Vergisi', desc: '2024 gelir vergisi hesabı', badge: 'Yeni' },
      { href: '/kredi-karsilastirma', icon: Scale, label: 'Kredi Karşılaştırma', desc: '4 senaryoyu yan yana karşılaştır', badge: 'Yeni' },
      { href: '/kira-mi-satin-mi', icon: Scale, label: 'Kira mı, Satın mı?', desc: '30 yıl projeksiyon karşılaştırma', badge: 'Yeni' },
      { href: '/pesinat-plani', icon: TrendingUp, label: 'Peşinat Birikim Planı', desc: 'Ne zaman ev alabilirim?', badge: 'Yeni' },
      { href: '/butce-planlayici', icon: Calculator, label: 'Bütçe Planlayıcı', desc: 'Ne kadar ev alabilirim?', badge: 'Yeni' },
      { href: '/insaat-maliyeti', icon: Building2, label: 'İnşaat Maliyet Hesaplayıcı', desc: 'm² bazlı yapım maliyeti tahmini', badge: 'Yeni' },
      { href: '/aidat-hesaplayici', icon: Calculator, label: 'Aidat Hesaplayıcı', desc: 'Bina ortak gider paylaşımı', badge: 'Yeni' },
      { href: '/emlak-komisyonu', icon: Calculator, label: 'Emlak Komisyonu Hesapla', desc: 'Satıcı/alıcı komisyon + KDV', badge: 'Yeni' },
      { href: '/mortgage-simulatoru', icon: Calculator, label: 'Gelişmiş Mortgage Simülatörü', desc: 'Erken ödeme, refinansman analizi', badge: 'Yeni' },
    ],
  },
  {
    title: 'Analiz Araçları',
    color: 'border-blue-200 bg-blue-50',
    iconColor: 'text-blue-600',
    tools: [
      { href: '/valuation', icon: Home, label: 'Değerleme Aracı', desc: 'Bölge bazlı fiyat analizi' },
      { href: '/satilik-ev-degeri', icon: Home, label: 'Ev Değeri Hesapla', desc: 'Şehir+m²+özellik bazlı tahmin', badge: 'Yeni' },
      { href: '/yatirim-analizi', icon: TrendingUp, label: 'Yatırım ROI Analizi', desc: 'Getiri, al/kirala, projeksiyon', badge: 'Yeni' },
      { href: '/kira-getiri-hesaplayici', icon: TrendingUp, label: 'Kira Getiri Hesaplayıcı', desc: 'Brüt/net getiri, cap rate, geri ödeme', badge: 'Yeni' },
      { href: '/yatirim-npv', icon: TrendingUp, label: 'NBD / NPV Hesaplayıcı', desc: 'Net bugünkü değer ve IRR analizi', badge: 'Yeni' },
      { href: '/portfoy', icon: PieChart, label: 'Portföy Takibi', desc: 'Gayrimenkul portföy yönetimi', badge: 'Yeni' },
      { href: '/market-radar', icon: BarChart2, label: 'Piyasa Radarı', desc: 'Canlı piyasa analitik' },
      { href: '/yatirim-bolgesi', icon: MapPin, label: 'En İyi Yatırım Bölgeleri', desc: '10 bölge analitik skorlama', badge: 'Yeni' },
      { href: '/karsilastir', icon: Scale, label: 'Bölge Karşılaştırma', desc: 'İki şehir/ilçeyi karşılaştır' },
      { href: '/bolge-karsilastir', icon: Scale, label: '3 Şehir Karşılaştır', desc: 'Fiyat, getiri, yaşam maliyeti, skor', badge: 'Yeni' },
    ],
  },
  {
    title: 'Piyasa Verileri',
    color: 'border-amber-200 bg-amber-50',
    iconColor: 'text-amber-600',
    tools: [
      { href: '/piyasa', icon: BarChart2, label: 'Piyasa Verileri', desc: 'Türkiye geneli gayrimenkul verisi' },
      { href: '/fiyat-trendi', icon: TrendingUp, label: 'Fiyat Trendi', desc: 'Aylık fiyat değişim grafikleri', badge: 'Yeni' },
      { href: '/faiz-gecmisi', icon: TrendingUp, label: 'Faiz Geçmişi', desc: 'Tarihsel mortgage faiz oranları 2015-2024', badge: 'Yeni' },
      { href: '/istatistikler', icon: BarChart2, label: 'Platform İstatistikleri', desc: 'Kapsamlı piyasa istatistikleri' },
      { href: '/piyasa-raporu-2024', icon: BarChart2, label: '2024 Piyasa Raporu', desc: 'Yıllık konut piyasası özeti ve 2025 öngörüsü', badge: 'Yeni' },
      { href: '/mahalle-analizi', icon: MapPin, label: 'Mahalle Analizi', desc: 'Aktivite skoru ve ₺/m² verisi', badge: 'Yeni' },
      { href: '/kira-haritasi', icon: MapPin, label: 'Kira Fiyat Rehberi', desc: '12 şehir kira ortalama ve YoY artış', badge: 'Yeni' },
      { href: '/sehir', icon: MapPin, label: 'Şehir Sayfaları', desc: 'Her şehir için detaylı analiz' },
    ],
  },
  {
    title: 'İlan Arama',
    color: 'border-green-200 bg-green-50',
    iconColor: 'text-green-600',
    tools: [
      { href: '/listings', icon: Search, label: 'Tüm İlanlar', desc: '9 filtreli ilan listesi' },
      { href: '/search', icon: Search, label: 'Gelişmiş Arama', desc: '13 filtreli arama paneli' },
      { href: '/harita', icon: MapPin, label: 'İlan Haritası', desc: 'Harita üzerinde ilanlar' },
      { href: '/luks', icon: Star, label: 'Lüks Gayrimenkul', desc: 'Premium koleksiyon', badge: 'Yeni' },
      { href: '/yeni-projeler', icon: Building2, label: 'Yeni Projeler', desc: 'Sıfır bina ve yeni konutlar' },
    ],
  },
  {
    title: 'Kategori Sayfaları',
    color: 'border-violet-200 bg-violet-50',
    iconColor: 'text-violet-600',
    tools: [
      { href: '/satilik', icon: Home, label: 'Satılık İlanlar', desc: 'Satılık konut landing' },
      { href: '/kiralik', icon: Key, label: 'Kiralık İlanlar', desc: 'Kiralık mülk landing' },
      { href: '/sehir', icon: MapPin, label: 'Şehirlere Göre', desc: 'Şehir bazlı ilan index' },
    ],
  },
  {
    title: 'Rehber & Bilgi',
    color: 'border-orange-200 bg-orange-50',
    iconColor: 'text-orange-600',
    tools: [
      { href: '/rehber', icon: BookOpen, label: 'Konut Rehberi', desc: 'Satın alma, kiralama, yatırım' },
      { href: '/rehber/ev-satin-alma', icon: Home, label: 'Ev Satın Alma Rehberi', desc: 'Adım adım satın alma süreci' },
      { href: '/rehber/kiralama-rehberi', icon: Key, label: 'Kiralama Rehberi', desc: 'Sözleşme, depozito, haklar' },
      { href: '/rehber/yatirim-rehberi', icon: TrendingUp, label: 'Yatırım Rehberi', desc: 'ROI ve getiri stratejileri' },
      { href: '/gayrimenkul-sozlugu', icon: BookOpen, label: 'Gayrimenkul Sözlüğü', desc: '25 terim ve tanım', badge: 'Yeni' },
      { href: '/imar-durumu', icon: MapPin, label: 'İmar Durumu Rehberi', desc: 'TAKS, KAKS, ruhsat süreci', badge: 'Yeni' },
      { href: '/kentsel-donusum', icon: Building2, label: 'Kentsel Dönüşüm Rehberi', desc: 'Haklar, süreç, 2/3 kuralı', badge: 'Yeni' },
      { href: '/yabanci-gayrimenkul', icon: Globe, label: 'Yabancı Alıcı Rehberi', desc: 'DAB, vatandaşlık, vergi', badge: 'Yeni' },
      { href: '/konut-sigortasi', icon: ShieldCheck, label: 'Konut Sigortası Rehberi', desc: 'Kapsam, prim faktörleri, hasar', badge: 'Yeni' },
      { href: '/enflasyon-korumasi', icon: TrendingUp, label: 'Enflasyon Koruması', desc: 'Gayrimenkul ile enflasyon hedging', badge: 'Yeni' },
      { href: '/sss', icon: BookOpen, label: 'Sıkça Sorulan Sorular', desc: 'Tüm platform soruları' },
      { href: '/miras-ve-gayrimenkul', icon: FileText, label: 'Miras ve Gayrimenkul', desc: 'Veraset, intikal, mirasçı hakları', badge: 'Yeni' },
      { href: '/kira-sozlesmesi', icon: Key, label: 'Kira Sözleşmesi Rehberi', desc: 'Zorunlu maddeler, depozito, haklar', badge: 'Yeni' },
      { href: '/tapu-devir-sureci', icon: FileText, label: 'Tapu Devir Süreci', desc: '7 adım, belgeler, maliyet dökümü', badge: 'Yeni' },
      { href: '/belediye-hizmetleri', icon: Building2, label: 'Belediye Hizmetleri', desc: 'Emlak vergisi, imar, iskan', badge: 'Yeni' },
      { href: '/arsa-yatirimi', icon: MapPin, label: 'Arsa Yatırımı Rehberi', desc: 'İmar türleri, kontrol listesi, riskler', badge: 'Yeni' },
      { href: '/pismanlik-hakki', icon: FileText, label: 'Pişmanlık Hakkı ve Cayma', desc: 'Kapora, BK md. 177, hukuki süreç', badge: 'Yeni' },
      { href: '/taksitli-satis', icon: FileText, label: 'Taksitli Satış Rehberi', desc: 'Sözleşme, cayma hakkı, temerrüt', badge: 'Yeni' },
      { href: '/hisseli-tapu', icon: Users, label: 'Hisseli Tapu Rehberi', desc: 'Şufa hakkı, ortaklık giderme davası', badge: 'Yeni' },
      { href: '/ekspertiz-raporu', icon: FileText, label: 'Ekspertiz Raporu Rehberi', desc: 'SPK lisanslı değerleme, süreç, maliyet', badge: 'Yeni' },
      { href: '/enerji-kimlik-belgesi', icon: ShieldCheck, label: 'Enerji Kimlik Belgesi (EKB)', desc: 'A\'dan G\'ye sınıflar, maliyet, yükseltme', badge: 'Yeni' },
      { href: '/kat-mulkiyeti', icon: Building2, label: 'Kat Mülkiyeti Rehberi', desc: 'İrtifak vs mülkiyet, dönüşüm, yönetim', badge: 'Yeni' },
    ],
  },
  {
    title: 'Danışmanlık & Destek',
    color: 'border-rose-200 bg-rose-50',
    iconColor: 'text-rose-600',
    tools: [
      { href: '/agents', icon: Users, label: 'Emlak Danışmanları', desc: 'Onaylı danışman listesi' },
      { href: '/concierge', icon: ShieldCheck, label: 'Özel Danışmanlık', desc: 'Kişisel danışman talebi' },
      { href: '/contact', icon: Users, label: 'İletişim', desc: '7/24 destek' },
    ],
  },
];

export default function TumAraclarPage() {
  const totalTools = CATEGORIES.reduce((s, c) => s + c.tools.length, 0);

  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      {/* Header */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-6xl mx-auto px-6 py-14">
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">Araç Merkezi</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            Söylemesi Bizden&apos;in tüm gayrimenkul araçları, hesaplama araçları, piyasa verileri ve
            rehber sayfaları. {totalTools} araç tek sayfada.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">
        {CATEGORIES.map(cat => (
          <div key={cat.title}>
            <h2 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className={`w-1.5 h-4 rounded-full ${cat.color.includes('green') ? 'bg-green-500' : cat.color.includes('blue') ? 'bg-blue-500' : cat.color.includes('amber') ? 'bg-amber-500' : cat.color.includes('violet') ? 'bg-violet-500' : cat.color.includes('orange') ? 'bg-orange-500' : cat.color.includes('rose') ? 'bg-rose-500' : 'bg-[#00C49F]'}`} />
              {cat.title}
              <span className="text-gray-400 font-normal">({cat.tools.length})</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
              {cat.tools.map(tool => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className={`relative group rounded-2xl border p-4 hover:shadow-md transition-all ${cat.color}`}
                >
                  {tool.badge && (
                    <span className="absolute -top-1.5 -right-1 text-[9px] bg-[#00C49F] text-white px-1.5 py-0.5 rounded-full font-bold">
                      {tool.badge}
                    </span>
                  )}
                  <tool.icon size={18} className={`${cat.iconColor} mb-2`} />
                  <p className="text-xs font-bold text-gray-800 group-hover:text-gray-900 transition-colors leading-tight">{tool.label}</p>
                  <p className="text-[10px] text-gray-400 mt-1 leading-tight">{tool.desc}</p>
                  <ArrowRight size={11} className="text-gray-300 group-hover:text-gray-500 transition-colors mt-2" />
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
