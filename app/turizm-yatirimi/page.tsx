import { Metadata } from 'next';
import Link from 'next/link';
import {
  TrendingUp, CheckCircle, AlertTriangle, ArrowRight, FileText,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Turizm Bölgesi Yatırım Rehberi | Bodrum, Antalya, Alanya, Kira Getiri | Söylemesi Bizden',
  description:
    'Türkiye turizm bölgelerinde gayrimenkul yatırımı: kısa dönem kira getirisi, sezonluk kira, yabancı alıcı etkisi ve risk analizi.',
};

const BOLGE_ANALIZI = [
  {
    bolge: 'Bodrum',
    ortalamFiyat: '88.400 ₺/m²',
    yillikGetiri: '%3.2',
    sezonKira: '500–2.500 $/gece',
    yabancıOran: '%35',
    ozellik: 'Lüks segment, villa ve bağ evi ağırlıklı, yabancı alıcı baskısı yüksek',
    risk: 'Yüksek giriş maliyeti, sezonsal kira, yönetim giderleri',
  },
  {
    bolge: 'Antalya Merkez/Konyaaltı',
    ortalamFiyat: '35.200 ₺/m²',
    yillikGetiri: '%4.1',
    sezonKira: '150–600 $/gece',
    yabancıOran: '%28',
    ozellik: 'Orta segment, uzun dönem ve turizm kirası dengeli, erişilebilir fiyat',
    risk: 'Yoğun arz artışı, lüks segmente geçiş zorluğu',
  },
  {
    bolge: 'Alanya',
    ortalamFiyat: '22.800 ₺/m²',
    yillikGetiri: '%5.2',
    sezonKira: '100–400 $/gece',
    yabancıOran: '%42',
    ozellik: 'Yabancı alıcı (Rus, Alman) yoğun, İngilizce yönetim imkânı',
    risk: 'Döviz kuru riskine duyarlı, emsal fiyat değişkenliği',
  },
  {
    bolge: 'Fethiye / Ölüdeniz',
    ortalamFiyat: '31.500 ₺/m²',
    yillikGetiri: '%4.5',
    sezonKira: '200–800 $/gece',
    yabancıOran: '%31',
    ozellik: 'Uzun sezon (9 ay), dağ-deniz manzarası, butik tatil köyü imkânı',
    risk: 'Sit alanı kısıtlamaları, yapılaşma sınırları',
  },
  {
    bolge: 'Belek (Golf)',
    ortalamFiyat: '28.600 ₺/m²',
    yillikGetiri: '%4.8',
    sezonKira: '180–700 $/gece',
    yabancıOran: '%22',
    ozellik: 'Golf turizmi, 12 ay sezonu olan nadir bölgeler, premium alıcı profili',
    risk: 'Otel yoğunluğu, bireysel yönetim zorluğu',
  },
];

const KISA_DONEM_KIRA = [
  { konu: 'Yasal Durum (2024+)', detay: 'Kısa dönem kiralık ev için belediyeden izin belgesi alınması zorunludur (6563 sayılı Kanun). İzinsiz kiralama idari para cezasıyla karşılaşır.' },
  { konu: 'Vergi', detay: 'Kısa dönem kira geliri gelir vergisine tabidir; götürü gider veya gerçek gider yöntemiyle beyan zorunludur. 2024 istisna tutarı aşılırsa beyan şarttır.' },
  { konu: 'Platform Sözleşmesi', detay: 'Airbnb, Booking gibi platformlardan elde edilen gelirler yasal kira geliri sayılır; platform komisyonu gider olarak düşülebilir.' },
  { konu: 'Sigorta', detay: 'Kısa dönem kiralama için özel konut sigortası (ev sahibi hasarı) ve misafir sorumluluk sigortası yapılması tavsiye edilir.' },
  { konu: 'Yönetim', detay: 'Uzaktan yönetim için profesyonel kiralama yönetim şirketi (%15–25 komisyon) kullanmak getiriyi düşürse de operasyonel yükü azaltır.' },
];

const GETIRI_HESABI = [
  { kalem: 'Aylık Kısa Dönem Kira (ortalama doluluk %55)', deger: '45.000 ₺' },
  { kalem: 'Yönetim Şirketi Komisyonu (%20)', deger: '−9.000 ₺' },
  { kalem: 'Platform Komisyonu (%12)', deger: '−5.400 ₺' },
  { kalem: 'Temizlik, Çamaşır, Bakım', deger: '−4.000 ₺' },
  { kalem: 'Aidat, Elektrik, Su', deger: '−2.500 ₺' },
  { kalem: 'Net Aylık Gelir (Vergi Öncesi)', deger: '~24.100 ₺' },
  { kalem: 'Vergi (%20 dilim tahmini)', deger: '−4.800 ₺' },
  { kalem: 'Net Aylık Gelir (Vergi Sonrası)', deger: '~19.300 ₺' },
];

const YABANCI_ALICI_ETKISI = [
  'Bodrum, Alanya ve Marmaris\'te yabancı alıcı talebi fiyatları piyasa ortalamasının %20–40 üzerine taşıdı.',
  'EUR ve USD bazlı talepte Türk lirasındaki değer kaybı fiyat artışını hızlandırdı.',
  'Uzun vadede yabancı talep azaldığında fiyatlar normalleşme riski taşır.',
  'Vatandaşlık için 400.000 $ eşiği lüks segmenti ve turizm bölgelerini doğrudan besledi.',
  'Sezonsal kiralar dolar bazlı olduğu için TL değer kaybı kira getirisini TL cinsinden büyüttü.',
];

const RISKLER = [
  { risk: 'Sezonsal Boşluk', onlem: 'Kış aylarındaki gelir düşüşünü bütçeye dahil edin; en az 4 ay kirasız geçebilir.' },
  { risk: 'Kısa Dönem Kira Düzenlemesi', onlem: 'Yeni yasal kısıtlamalar işletmenizi etkileyebilir; uzun dönem kira planını da yapın.' },
  { risk: 'Döviz Kuru Riski', onlem: 'TL bazlı maliyet artışı ve dolar bazlı kira arasındaki farka dikkat edin.' },
  { risk: 'Bakım ve Yönetim Maliyeti', onlem: 'Turizm konutları hızlı yıpranır; yıllık bakım bütçesi toplam gelirin %10\'u olmalı.' },
  { risk: 'Talep Daralması', onlem: 'Bölgeyi ve turizm trenlerini takip edin; destinasyon popülaritesi değişebilir.' },
];

export default function TurizmYatirimiPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <TrendingUp size={13} /> Turizm Bölgesi Yatırım Rehberi
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Turizm Bölgesi Yatırım Rehberi
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            Bodrum, Antalya, Alanya ve Fethiye'de gayrimenkul getirisi, kısa dönem kira ve risk analizi.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-[#00C49F]">%3.2–5.2</p>
              <p className="text-xs text-gray-400">Yıllık kira getirisi</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">6563</p>
              <p className="text-xs text-gray-400">Kısa dönem kira kanunu</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-400">%42</p>
              <p className="text-xs text-gray-400">Alanya yabancı oran</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* Bölge Analizi */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Bölge Karşılaştırması</h2>
          <div className="space-y-4">
            {BOLGE_ANALIZI.map((b, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <p className="text-xs font-black text-gray-900 mb-3">{b.bolge}</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                  <div className="bg-[#F0FDF8] rounded-lg p-2">
                    <p className="text-[10px] text-[#00C49F] font-bold mb-0.5">Ort. Fiyat/m²</p>
                    <p className="text-xs font-black text-gray-900">{b.ortalamFiyat}</p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-2">
                    <p className="text-[10px] text-blue-600 font-bold mb-0.5">Yıllık Getiri</p>
                    <p className="text-xs font-black text-gray-900">{b.yillikGetiri}</p>
                  </div>
                  <div className="bg-amber-50 rounded-lg p-2">
                    <p className="text-[10px] text-amber-600 font-bold mb-0.5">Sezon Kira</p>
                    <p className="text-xs font-black text-gray-900">{b.sezonKira}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2">
                    <p className="text-[10px] text-gray-500 font-bold mb-0.5">Yabancı Oran</p>
                    <p className="text-xs font-black text-gray-900">{b.yabancıOran}</p>
                  </div>
                </div>
                <p className="text-[10px] text-gray-600 leading-relaxed mb-1">{b.ozellik}</p>
                <p className="text-[10px] text-rose-500">Risk: {b.risk}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Kısa Dönem Kira */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <FileText size={14} className="text-[#00C49F]" /> Kısa Dönem Kira Mevzuatı
          </h2>
          <div className="space-y-3">
            {KISA_DONEM_KIRA.map((k, i) => (
              <div key={i} className="bg-[#F0FDF8] rounded-xl p-3">
                <p className="text-xs font-black text-gray-900 mb-0.5">{k.konu}</p>
                <p className="text-[10px] text-gray-600 leading-relaxed">{k.detay}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Getiri Hesabı */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4">Örnek Getiri Hesabı (2 Oda / Antalya)</h2>
          <div className="space-y-2">
            {GETIRI_HESABI.map((g, i) => (
              <div key={i} className={`flex justify-between items-center py-2 ${i === GETIRI_HESABI.length - 1 ? 'border-t border-gray-200 mt-2 pt-3' : 'border-b border-gray-50'}`}>
                <p className={`text-xs ${i === GETIRI_HESABI.length - 1 ? 'font-black text-gray-900' : 'text-gray-700'}`}>{g.kalem}</p>
                <p className={`text-xs font-black ${
                  g.deger.startsWith('−') ? 'text-rose-500' :
                  g.deger.includes('~') ? 'text-[#00C49F]' : 'text-gray-900'
                }`}>{g.deger}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Yabancı Alıcı Etkisi */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle size={14} className="text-[#00C49F]" /> Yabancı Alıcı Etkisi
          </h2>
          <div className="space-y-2">
            {YABANCI_ALICI_ETKISI.map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0 mt-1.5" />
                <p className="text-xs text-gray-700 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Riskler */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Riskler ve Önlemler</h2>
          <div className="space-y-3">
            {RISKLER.map((r, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                <div className="flex items-start gap-2 mb-1">
                  <AlertTriangle size={12} className="text-amber-500 shrink-0 mt-0.5" />
                  <p className="text-xs font-black text-gray-900">{r.risk}</p>
                </div>
                <p className="text-[10px] text-gray-600 leading-relaxed ml-5">{r.onlem}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Warning */}
        <section className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <AlertTriangle size={14} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 leading-relaxed">
            <span className="font-black">Önemli:</span> 6563 sayılı Kanun kapsamında kısa dönem kiralama izin belgesi alınmadan faaliyet büyük para cezalarına neden olabilir. Yatırım kararı öncesinde güncel mevzuatı bir avukat veya muhasebeci ile değerlendirin.
          </p>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Rehberler</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/yatirim-analizi', label: 'Yatırım Analizi Aracı' },
              { href: '/rehber/yatirim-rehberi', label: 'Gayrimenkul Yatırım Rehberi' },
              { href: '/kira-geliri-vergisi', label: 'Kira Geliri Vergisi' },
              { href: '/yabanci-gayrimenkul', label: 'Yabancı Gayrimenkul Rehberi' },
              { href: '/konut-sigortasi', label: 'Konut Sigortası' },
              { href: '/piyasa', label: 'Türkiye Piyasa Verileri' },
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
