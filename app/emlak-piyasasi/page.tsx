import { Metadata } from 'next';
import Link from 'next/link';
import { TrendingUp, ArrowRight, BarChart2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Türkiye Emlak Piyasası 2024 | Fiyat Analizi, Şehir Karşılaştırması | Söylemesi Bizden',
  description:
    'Türkiye gayrimenkul piyasası 2024: şehir bazlı fiyat endeksleri, kira getiri oranları, alım satım hacmi ve yatırım bölgeleri.',
};

const SEHIR_VERILERI = [
  { sehir: 'İstanbul', satilik: 68400, kiralik: 28500, getiri: 5.0, artis: '+31%', hacim: 'Çok Yüksek' },
  { sehir: 'Ankara', satilik: 38200, kiralik: 17800, getiri: 5.6, artis: '+28%', hacim: 'Yüksek' },
  { sehir: 'İzmir', satilik: 52100, kiralik: 23600, getiri: 5.4, artis: '+34%', hacim: 'Yüksek' },
  { sehir: 'Antalya', satilik: 44800, kiralik: 19200, getiri: 5.1, artis: '+38%', hacim: 'Orta-Yüksek' },
  { sehir: 'Bursa', satilik: 29600, kiralik: 13400, getiri: 5.4, artis: '+26%', hacim: 'Orta' },
  { sehir: 'Bodrum', satilik: 88400, kiralik: 32000, getiri: 4.3, artis: '+22%', hacim: 'Orta' },
  { sehir: 'Gaziantep', satilik: 18900, kiralik: 8600, getiri: 5.5, artis: '+24%', hacim: 'Orta' },
  { sehir: 'Trabzon', satilik: 22400, kiralik: 9800, getiri: 5.3, artis: '+29%', hacim: 'Düşük' },
];

const SEGMENT_ANALIZ = [
  {
    segment: 'Konut (Satılık)',
    durum: 'Güçlü',
    not: '2024 yılında fiyatlar TÜFE üzerinde artmaya devam etti. İstanbul merkezi lokasyonlarda arzın kısıtlı kalması baskıyı sürdürüyor.',
    oran: 88,
  },
  {
    segment: 'Konut (Kiralık)',
    durum: 'Çok Güçlü',
    not: 'Faiz yüksekliği konut alımını zorlaştırdı; kiralık talep patlaması yaşandı. Kira endeksi düzenlemeleri baskı altında kalıyor.',
    oran: 95,
  },
  {
    segment: 'Ticari Gayrimenkul',
    durum: 'Dengeli',
    not: 'Ofis segmentinde boşluk oranı düşüyor. Perakende alanlar değişken; e-ticaret büyümesi bazı lokasyonlarda baskı yaratıyor.',
    oran: 60,
  },
  {
    segment: 'Arsa',
    durum: 'Güçlü',
    not: 'İmar çalışmaları ve yeni projeler arsa fiyatlarını yükseltiyor. Kentsel dönüşüm bölgelerinde spekülatif talep yüksek.',
    oran: 82,
  },
  {
    segment: 'Turizm Konutu',
    durum: 'Güçlü',
    not: 'Yabancı alıcı talebi sürdü; kısa dönem kira düzenlemeleri sektörü şekillendiriyor. Bodrum/Antalya en aktif bölgeler.',
    oran: 78,
  },
];

const FAKTORLER = [
  { faktor: 'Konut Kredisi Faizleri', etki: 'Negatif', aciklama: '%60+ faiz oranı konut alımını frenliyor; kiralık talep artıyor.' },
  { faktor: 'Enflasyon', etki: 'Pozitif (Fiyat)', aciklama: 'Reel varlıklar enflasyon hedge\'i olarak görülüyor; nominal fiyatlar artıyor.' },
  { faktor: 'Yabancı Alıcı', etki: 'Pozitif', aciklama: 'Rusya, İran, Körfez vatandaşları yoğun talep oluşturuyor; premium segmentte belirleyici.' },
  { faktor: 'Kentsel Dönüşüm', etki: 'Pozitif (Kısmen)', aciklama: 'Riskli yapı stoğu yenileniyor; yıkım sürecinde geçici baskı, sonrasında değer artışı.' },
  { faktor: 'Deprem Riski', etki: 'Değişken', aciklama: 'Deprem güvenli yapılara talep arttı; riskli bölgeler iskontolu fiyatlanıyor.' },
  { faktor: 'Göç ve Nüfus', etki: 'Pozitif', aciklama: 'Büyük şehirlere iç göç konut talebini besliyor. İstanbul nüfus büyümesi yavaşladı.' },
];

const TAHMINLER_2025 = [
  { konu: 'Nominal Fiyat Artışı (yıllık)', beklenti: '%15–25', aciklama: 'TÜFE ile paralel ya da üzeri bekleniyor; büyük şehirler öne çıkıyor.' },
  { konu: 'Kira Artış Baskısı', beklenti: 'Devam', aciklama: 'Arz yetersizliği ve talep artışı kira baskısını sürdürüyor.' },
  { konu: 'Konut Kredisi Faizi', beklenti: 'Kademeli düşüş', aciklama: 'TCMB faiz düşüşüyle kredi koşullarının iyileşmesi bekleniyor.' },
  { konu: 'Yabancı Alıcı', beklenti: 'Güçlü seyrediyor', aciklama: 'Döviz avantajı ve vatandaşlık programı talebi canlı tutuyor.' },
];

export default function EmlakPiyasasiPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <TrendingUp size={13} /> Piyasa Analizi
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Türkiye Emlak Piyasası 2024
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            Şehir bazlı fiyat endeksleri, kira getiri oranları, segment analizi ve 2025 beklentileri.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-[#00C49F]">+31%</p>
              <p className="text-xs text-gray-400">İstanbul yıllık artış</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">5,2%</p>
              <p className="text-xs text-gray-400">Ortalama kira getirisi</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-400">88.400</p>
              <p className="text-xs text-gray-400">Bodrum ₺/m² zirve</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* Şehir Verileri */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Şehir Bazlı Fiyat Endeksi</h2>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="grid grid-cols-6 gap-2 px-4 py-2 bg-gray-50 text-[10px] font-black text-gray-500 uppercase">
              <span className="col-span-2">Şehir</span>
              <span className="text-right">Satılık ₺/m²</span>
              <span className="text-right">Kiralık ₺/ay</span>
              <span className="text-right">Getiri</span>
              <span className="text-right">Artış</span>
            </div>
            {SEHIR_VERILERI.map((s, i) => (
              <div key={i} className="grid grid-cols-6 gap-2 px-4 py-3 border-t border-gray-50">
                <div className="col-span-2">
                  <p className="text-xs font-black text-gray-900">{s.sehir}</p>
                  <p className="text-[10px] text-gray-400">{s.hacim} hacim</p>
                </div>
                <p className="text-xs font-bold text-gray-700 text-right self-center">{s.satilik.toLocaleString('tr-TR')}</p>
                <p className="text-xs text-gray-600 text-right self-center">{s.kiralik.toLocaleString('tr-TR')}</p>
                <p className="text-xs font-black text-[#00C49F] text-right self-center">{s.getiri}%</p>
                <p className="text-xs font-black text-emerald-600 text-right self-center">{s.artis}</p>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-gray-400 mt-2">* Veriler 2024 yıllık ortalama tahmine dayanmaktadır.</p>
        </section>

        {/* Segment Analizi */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Segment Analizi</h2>
          <div className="space-y-4">
            {SEGMENT_ANALIZ.map((s, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-black text-gray-900">{s.segment}</p>
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded ${
                    s.durum === 'Çok Güçlü' ? 'bg-emerald-100 text-emerald-700' :
                    s.durum === 'Güçlü' ? 'bg-[#F0FDF8] text-[#00C49F]' :
                    'bg-amber-50 text-amber-600'
                  }`}>{s.durum}</span>
                </div>
                <p className="text-[10px] text-gray-600 mb-3 leading-relaxed">{s.not}</p>
                <div className="w-full bg-gray-100 rounded-full h-1.5">
                  <div className="bg-[#00C49F] h-1.5 rounded-full" style={{ width: `${s.oran}%` }} />
                </div>
                <p className="text-[9px] text-gray-400 mt-1">Piyasa aktivitesi: {s.oran}%</p>
              </div>
            ))}
          </div>
        </section>

        {/* Faktörler */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Piyasayı Etkileyen Faktörler</h2>
          <div className="space-y-3">
            {FAKTORLER.map((f, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <div className="flex items-start justify-between mb-1">
                  <p className="text-xs font-black text-gray-900">{f.faktor}</p>
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded ml-2 shrink-0 ${
                    f.etki.startsWith('Pozitif') ? 'bg-[#F0FDF8] text-[#00C49F]' :
                    f.etki === 'Negatif' ? 'bg-rose-50 text-rose-600' :
                    'bg-gray-100 text-gray-600'
                  }`}>{f.etki}</span>
                </div>
                <p className="text-[10px] text-gray-600 leading-relaxed">{f.aciklama}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 2025 Tahminleri */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <BarChart2 size={14} className="text-[#00C49F]" /> 2025 Beklentileri
          </h2>
          <div className="space-y-3">
            {TAHMINLER_2025.map((t, i) => (
              <div key={i} className="grid grid-cols-3 gap-3 py-2 border-b border-gray-50 last:border-0">
                <p className="text-xs font-black text-gray-900">{t.konu}</p>
                <p className="text-xs font-black text-[#00C49F]">{t.beklenti}</p>
                <p className="text-[10px] text-gray-500 leading-relaxed">{t.aciklama}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Araçlar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/piyasa', label: 'Piyasa Verileri' },
              { href: '/fiyat-trendi', label: 'Fiyat Trendi Analizi' },
              { href: '/yatirim-analizi', label: 'Yatırım Analizi' },
              { href: '/bolge-karsilastir', label: 'Bölge Karşılaştır' },
              { href: '/kira-getiri-hesaplayici', label: 'Kira Getiri Hesaplayıcı' },
              { href: '/turizm-yatirimi', label: 'Turizm Yatırımı' },
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
