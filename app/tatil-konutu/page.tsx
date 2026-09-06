import { Metadata } from 'next';
import Link from 'next/link';
import { Sun, TrendingUp, AlertTriangle, ArrowRight, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Tatil Konutu Yatırımı | Kira Getirisi, Bölge Analizi, Doluluk | Söylemesi Bizden',
  description:
    'Tatil konutu yatırımı: bölge bazlı getiri analizi, mevsimsel doluluk, 6563 sayılı Kanun yükümlülükleri ve vergi planlaması.',
};

const BOLGE_KARSILASTIRMA = [
  {
    bolge: 'Bodrum',
    satilikM2: 88400,
    haftalikKira: '25K–80K',
    yillikDoluluk: '%35',
    brutGetiri: '%4.3',
    yabanci: 'Çok Yüksek',
    artis: '+22%',
  },
  {
    bolge: 'Çeşme / Alaçatı',
    satilikM2: 72000,
    haftalikKira: '20K–60K',
    yillikDoluluk: '%32',
    brutGetiri: '%4.1',
    yabanci: 'Yüksek',
    artis: '+28%',
  },
  {
    bolge: 'Fethiye',
    satilikM2: 31500,
    haftalikKira: '15K–45K',
    yillikDoluluk: '%31',
    brutGetiri: '%4.5',
    yabanci: 'Yüksek',
    artis: '+25%',
  },
  {
    bolge: 'Antalya / Kemer',
    satilikM2: 35200,
    haftalikKira: '12K–35K',
    yillikDoluluk: '%28',
    brutGetiri: '%4.1',
    yabanci: 'Orta-Yüksek',
    artis: '+38%',
  },
  {
    bolge: 'Alanya',
    satilikM2: 22800,
    haftalikKira: '8K–25K',
    yillikDoluluk: '%42',
    brutGetiri: '%5.2',
    yabanci: 'Çok Yüksek',
    artis: '+42%',
  },
  {
    bolge: 'Marmaris',
    satilikM2: 28000,
    haftalikKira: '10K–30K',
    yillikDoluluk: '%30',
    brutGetiri: '%4.8',
    yabanci: 'Orta',
    artis: '+20%',
  },
];

const GETIRI_HESABI = [
  { kalem: 'Yıllık Brüt Kira Geliri', deger: '480.000 ₺', aciklama: '12 hafta × 40.000 ₺ ortalama' },
  { kalem: 'Yönetim ve Platform Komisyonu', deger: '−96.000 ₺', aciklama: '%20 (Airbnb/Booking)' },
  { kalem: 'Temizlik ve Çamaşır', deger: '−36.000 ₺', aciklama: '12 hafta × 3.000 ₺' },
  { kalem: 'Bakım ve Onarım', deger: '−24.000 ₺', aciklama: 'Yıllık %5 oranda' },
  { kalem: 'Sigorta ve DASK', deger: '−8.000 ₺', aciklama: 'Yıllık' },
  { kalem: 'Emlak Vergisi', deger: '−6.000 ₺', aciklama: '%0.2 × 3M' },
  { kalem: 'Net Gelir', deger: '310.000 ₺', aciklama: 'Vergi öncesi' },
];

const KANUN_OZETI = [
  {
    baslik: '6563 Sayılı Kanun (1 Ocak 2024)',
    icerik: '100 günden kısa kiralamalar için Turizm Bakanlığı\'ndan "Kısa Dönem Konut Kiralama" izin belgesi zorunlu hale geldi.',
    kritik: true,
  },
  {
    baslik: 'Kat Malikleri Onayı',
    icerik: 'Apartman ve site içindeki tatil konutları için kat malikleri kurulunun oy çokluğuyla onayı gerekli.',
    kritik: true,
  },
  {
    baslik: 'Ceza Yaptırımı',
    icerik: 'Belgesiz kısa dönem kiralama: 100.000 ₺ – 1.000.000 ₺ idari para cezası; tekrarda faaliyetin durdurulması.',
    kritik: true,
  },
  {
    baslik: 'Kira Geliri Vergisi',
    icerik: 'Yıllık gelir vergisi beyannamesiyle beyan zorunlu. 2024 istisna tutarı 33.000 ₺. Götürü veya gerçek gider yöntemi.',
    kritik: false,
  },
  {
    baslik: 'Yabancı Kiralamalarda Döviz',
    icerik: 'Yabancı uyruklu kiracıdan döviz tahsilatı serbest; Türkiye\'ye transferde TCMB kural ve limitleri geçerli.',
    kritik: false,
  },
];

const AVANTAJ_DEZAVANTAJ = [
  { tur: 'Avantaj', maddeler: [
    'Sezon dışı kişisel kullanım imkanı',
    'Döviz bazlı kira geliri (yabancı kiracı)',
    'Turizm bölgelerinde güçlü fiyat artışı',
    'Airbnb/Booking ile yönetim kolaylığı',
    'Tatil döneminde yüksek haftalık getiri',
  ]},
  { tur: 'Dezavantaj', maddeler: [
    'Kısa dönem kiralama lisansı zorunluluğu (6563)',
    'Sezonsal doluluk boşlukları (%30–40 doluluk)',
    'Yüksek yönetim ve operasyon giderleri',
    'Platform komisyonları (%10–25)',
    'Uzak lokasyon bakım ve kontrol güçlüğü',
  ]},
];

const KONTROL_LISTESI = [
  'İzin belgesi için bölge turizm müdürlüğüne başvuru yapıldı',
  'Site/apartman kat malikleri kararı alındı',
  'Sigorta ve DASK yenilendi',
  'Bölge platform (Airbnb/Booking) fiyat araştırması yapıldı',
  'Lokal yönetim şirketi veya temizlik ekibi organize edildi',
  'Hasara karşı depozito politikası belirlendi',
  'Vergi beyan yükümlülüğü mali müşavire danışıldı',
];

export default function TatilKonutuPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <Sun size={13} /> Tatil Konutu Yatırımı
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Tatil Konutu Yatırım Rehberi
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            Bölge bazlı kira getiri analizi, 6563 sayılı Kanun yükümlülükleri, mevsimsel doluluk ve net gelir hesabı.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-[#00C49F]">%5.2</p>
              <p className="text-xs text-gray-400">En yüksek brüt getiri</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">6563</p>
              <p className="text-xs text-gray-400">Sayılı Kanun 2024</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-400">Alanya</p>
              <p className="text-xs text-gray-400">En yüksek doluluk</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* Bölge Karşılaştırması */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Bölge Bazlı Yatırım Karşılaştırması</h2>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="grid grid-cols-6 gap-1 px-4 py-2 bg-gray-50 text-[9px] font-black text-gray-500 uppercase">
              <span className="col-span-2">Bölge</span>
              <span className="text-right">₺/m²</span>
              <span className="text-right">Brüt Get.</span>
              <span className="text-right">Doluluk</span>
              <span className="text-right">Artış</span>
            </div>
            {BOLGE_KARSILASTIRMA.map((b, i) => (
              <div key={i} className="grid grid-cols-6 gap-1 px-4 py-3 border-t border-gray-50">
                <div className="col-span-2">
                  <p className="text-xs font-black text-gray-900">{b.bolge}</p>
                  <p className="text-[10px] text-gray-400">Yabancı: {b.yabanci}</p>
                </div>
                <p className="text-[10px] font-bold text-gray-700 text-right self-center">{b.satilikM2.toLocaleString('tr-TR')}</p>
                <p className="text-[10px] font-black text-[#00C49F] text-right self-center">{b.brutGetiri}</p>
                <p className="text-[10px] font-bold text-gray-700 text-right self-center">{b.yillikDoluluk}</p>
                <p className="text-[10px] font-black text-emerald-600 text-right self-center">{b.artis}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Getiri Hesabı Örneği */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-1 flex items-center gap-2">
            <TrendingUp size={14} className="text-[#00C49F]" /> Örnek Getiri Hesabı (3M ₺ Fethiye Villa)
          </h2>
          <p className="text-[10px] text-gray-400 mb-4">100 m², havuzlu, 12 hafta kiralama senaryosu</p>
          <div className="space-y-2">
            {GETIRI_HESABI.map((g, i) => (
              <div key={i} className={`flex items-center justify-between py-2 border-b border-gray-50 last:border-0 ${i === GETIRI_HESABI.length - 1 ? 'bg-[#F0FDF8] rounded-lg px-3' : ''}`}>
                <div>
                  <p className={`text-xs font-black ${i === GETIRI_HESABI.length - 1 ? 'text-[#00C49F]' : 'text-gray-900'}`}>{g.kalem}</p>
                  <p className="text-[9px] text-gray-400">{g.aciklama}</p>
                </div>
                <p className={`text-xs font-black ${g.deger.startsWith('-') ? 'text-rose-600' : i === GETIRI_HESABI.length - 1 ? 'text-[#00C49F]' : 'text-gray-800'}`}>{g.deger}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Avantaj/Dezavantaj */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {AVANTAJ_DEZAVANTAJ.map((ad, i) => (
            <div key={i} className={`rounded-2xl border p-5 ${ad.tur === 'Avantaj' ? 'bg-[#F0FDF8] border-[#00C49F]/20' : 'bg-rose-50 border-rose-100'}`}>
              <p className={`text-xs font-black mb-3 ${ad.tur === 'Avantaj' ? 'text-[#00C49F]' : 'text-rose-600'}`}>{ad.tur}</p>
              <div className="space-y-2">
                {ad.maddeler.map((m, j) => (
                  <div key={j} className="flex items-start gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${ad.tur === 'Avantaj' ? 'bg-[#00C49F]' : 'bg-rose-500'}`} />
                    <p className="text-[10px] text-gray-700">{m}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Kanun Özeti */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Yasal Düzenlemeler 2024</h2>
          <div className="space-y-3">
            {KANUN_OZETI.map((k, i) => (
              <div key={i} className={`rounded-2xl border p-5 ${k.kritik ? 'bg-rose-50 border-rose-100' : 'bg-white border-gray-100'} shadow-sm`}>
                <p className={`text-xs font-black mb-2 ${k.kritik ? 'text-rose-700' : 'text-gray-900'}`}>{k.baslik}</p>
                <p className="text-[10px] text-gray-600 leading-relaxed">{k.icerik}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Kontrol Listesi */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle size={14} className="text-[#00C49F]" /> Yatırım Öncesi Kontrol Listesi
          </h2>
          <div className="space-y-2">
            {KONTROL_LISTESI.map((k, i) => (
              <div key={i} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                <div className="w-5 h-5 rounded border-2 border-[#00C49F]/40 shrink-0" />
                <p className="text-xs text-gray-700">{k}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Uyarı */}
        <section className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <AlertTriangle size={14} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 leading-relaxed">
            <span className="font-black">Önemli:</span> Tatil konutu yatırımının getiri hesabında mevsimsel boşluklar, platform komisyonları ve operasyon giderleri çoğunlukla göz ardı edilir. Gerçekçi bir senaryo oluşturmak için en az 2–3 yıllık geçmiş kira verilerini analiz edin. 6563 Kanun kapsamındaki yükümlülükler için yerel turizm müdürlüğüne danışın.
          </p>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Araçlar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/turizm-yatirimi', label: 'Turizm Yatırımı Analizi' },
              { href: '/yazlik-kiralama', label: 'Yazlık Kiralama Rehberi' },
              { href: '/kira-geliri-vergisi', label: 'Kira Geliri Vergisi' },
              { href: '/dask-hesaplayici', label: 'DASK Prim Hesaplayıcı' },
              { href: '/konut-analizi', label: 'Konut Yatırım Analizi' },
              { href: '/vergi-planlama', label: 'Vergi Planlama' },
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
