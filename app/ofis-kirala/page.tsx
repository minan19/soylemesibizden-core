import { Metadata } from 'next';
import Link from 'next/link';
import { Briefcase, CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Ofis Kiralama Rehberi | Ticari Gayrimenkul, Sözleşme, Fiyatlar | Söylemesi Bizden',
  description:
    'Ofis kiralama rehberi: brüt/net alan farkı, şehir bazlı fiyatlar, TBK işyeri kirası hükümleri, hazır ofis vs. geleneksel ofis karşılaştırması.',
};

const OFIS_TIPLERI = [
  {
    tip: 'Geleneksel Ofis',
    aciklama: 'Uzun dönemli (1+ yıl) kira, tam özelleştirme imkanı, yüksek kurulum maliyeti. Büyük firmalar için ideal.',
    maliyet: 'Düşük birim maliyet',
    esneklik: 'Düşük',
    sure: '1–5 yıl+',
  },
  {
    tip: 'Hazır Ofis (Serviced)',
    aciklama: 'Mobilya, internet, resepsiyon dahil; aylık ödeme; faturalar dahil. KOBİ ve startup için ideal.',
    maliyet: 'Yüksek birim maliyet',
    esneklik: 'Çok Yüksek',
    sure: 'Aylık',
  },
  {
    tip: 'Coworking Alanı',
    aciklama: 'Paylaşımlı çalışma masaları, saatlik veya günlük opsiyon. Serbest çalışan ve uzak ekipler için.',
    maliyet: 'Değişken',
    esneklik: 'Çok Yüksek',
    sure: 'Günlük/Aylık',
  },
  {
    tip: 'Sanal Ofis',
    aciklama: 'Yasal adres ve posta hizmeti; fiziksel çalışma alanı yok. Vergi adresi için yeterli.',
    maliyet: 'Çok Düşük',
    esneklik: 'Tam',
    sure: 'Aylık/Yıllık',
  },
];

const SEHIR_FIYATLARI = [
  { sehir: 'İstanbul — Levent/Maslak', fiyat: '800–2.500', birim: 'USD/m²/yıl', not: 'A sınıfı' },
  { sehir: 'İstanbul — Anadolu Yakası', fiyat: '400–900', birim: 'USD/m²/yıl', not: 'B sınıfı' },
  { sehir: 'Ankara — CBD', fiyat: '250–600', birim: 'USD/m²/yıl', not: 'A/B sınıfı' },
  { sehir: 'İzmir — Konak/Alsancak', fiyat: '200–500', birim: 'USD/m²/yıl', not: 'A/B sınıfı' },
  { sehir: 'Bursa / Antalya', fiyat: '150–350', birim: 'USD/m²/yıl', not: 'B sınıfı' },
];

const ALAN_FARKI = [
  { kavram: 'Brüt Alan', tanim: 'Ortak alanlar (asansör, koridor, WC, merdiven) dahil toplam m².', not: 'İlan genellikle bu alanı verir.' },
  { kavram: 'Net Kullanım Alanı', tanim: 'Fiilen kullanılan iç alan; brütün %65–85\'i arasında değişir.', not: 'Gerçek kapasite bu alandır.' },
  { kavram: 'Kayıp Faktörü', tanim: 'Brüt ve net arasındaki fark. A sınıfı binalarda %15–25, daha eski binalarda %30+ olabilir.', not: 'Müzakere aracıdır.' },
  { kavram: 'Kişi Başı Alan', tanim: 'Modern ofislerde 8–12 m²/çalışan standart. Açık ofis daha düşük, özel odalar daha yüksek.', not: 'Planlama için kullanın.' },
];

const SOZLESME_MADDELER = [
  { madde: 'Kira Süresi ve Uzatma', aciklama: 'İş yeri kirası minimum 1 yıl genellikle beklenir; erken fesih cezası ve opsiyon maddesi netleştirilmeli.' },
  { madde: 'Kira Artışı', aciklama: 'TBK\'da işyeri kirası için özel sınır yok; ancak sözleşmede ÜFE/TÜFE bazlı artış belirlenir.' },
  { madde: 'Aidat ve Ortak Giderler', aciklama: 'Yönetim giderleri (güvenlik, temizlik, bakım) kiracı ya da kiraya veren üstlenir — açıkça belirtin.' },
  { madde: 'Tadilat ve Düzenleme', aciklama: 'Kiracının ofisi düzenleme hakkı; çıkışta eski hale getirme yükümlülüğü var mı? Yazılı izin alın.' },
  { madde: 'Alt Kiralama', aciklama: 'İzinsiz alt kiralama yasak (TBK 322). Kullanılmayan alanı devretmek için izin şart.' },
  { madde: 'Erken Fesih Cezası', aciklama: 'İş yeri kiralarında kiracı 3 ay önceden bildirim yapmalı (TBK 347). Erken fesih bedelini müzakere edin.' },
];

const KONTROL_LISTESI = [
  'Net ve brüt alan bilgisi karşılaştırıldı (kayıp faktörü hesaplandı)',
  'Bina sınıfı (A/B/C) ve ortak alan kalitesi incelendi',
  'Asansör, güvenlik, otopark, kafeterya özellikleri kontrol edildi',
  'İnternet altyapısı (fiber bant genişliği) soruldu',
  'Kira sözleşmesi avukata inceletildi',
  'Depozito miktarı ve iade koşulları netleştirildi',
  'Bölge ulaşım erişimi (metro, otobüs, araç) değerlendirildi',
  'Bina yönetimi referansları alındı',
];

export default function OfisKiralaPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <Briefcase size={13} /> Ofis Kiralama Rehberi
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Ofis Kiralama Rehberi
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            Geleneksel ofisten coworking&apos;e tüm ofis tipleri, şehir bazlı fiyatlar, brüt/net alan farkı ve sözleşme rehberi.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-[#00C49F]">4 Tip</p>
              <p className="text-xs text-gray-400">Ofis seçeneği</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">3 Ay</p>
              <p className="text-xs text-gray-400">İşyeri fesih bildirimi</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-400">%85</p>
              <p className="text-xs text-gray-400">Maks. net/brüt oran</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* Ofis Tipleri */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Ofis Tipleri Karşılaştırması</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {OFIS_TIPLERI.map((o, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <p className="text-xs font-black text-gray-900 mb-2">{o.tip}</p>
                <p className="text-[10px] text-gray-600 mb-3 leading-relaxed">{o.aciklama}</p>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-[10px] text-gray-500">Maliyet</span>
                    <span className="text-[10px] font-bold text-gray-700">{o.maliyet}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[10px] text-gray-500">Esneklik</span>
                    <span className={`text-[10px] font-bold ${o.esneklik === 'Çok Yüksek' || o.esneklik === 'Tam' ? 'text-[#00C49F]' : 'text-amber-600'}`}>{o.esneklik}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[10px] text-gray-500">Tipik Süre</span>
                    <span className="text-[10px] font-bold text-gray-700">{o.sure}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Şehir Fiyatları */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4">Şehir Bazlı Ofis Kira Fiyatları</h2>
          <div className="space-y-2">
            {SEHIR_FIYATLARI.map((s, i) => (
              <div key={i} className="grid grid-cols-3 gap-2 py-2 border-b border-gray-50 last:border-0">
                <p className="text-xs font-black text-gray-900">{s.sehir}</p>
                <p className="text-xs font-black text-[#00C49F] text-right">{s.fiyat} {s.birim}</p>
                <p className="text-[10px] text-gray-400 text-right self-center">{s.not}</p>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-gray-400 mt-3">* Fiyatlar 2024 piyasa gözlemlerine dayanmaktadır; USD bazlı fiyatlar kur etkisiyle değişkendir.</p>
        </section>

        {/* Alan Farkı */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Brüt / Net Alan Farkı</h2>
          <div className="space-y-3">
            {ALAN_FARKI.map((a, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <div className="flex items-start justify-between mb-1">
                  <p className="text-xs font-black text-gray-900">{a.kavram}</p>
                  <span className="text-[10px] text-amber-600 bg-amber-50 font-bold px-2 py-0.5 rounded shrink-0 ml-2">{a.not}</span>
                </div>
                <p className="text-[10px] text-gray-600 leading-relaxed">{a.tanim}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Sözleşme */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Sözleşme Kritik Maddeleri</h2>
          <div className="space-y-3">
            {SOZLESME_MADDELER.map((m, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                <p className="text-xs font-black text-gray-900 mb-1">{m.madde}</p>
                <p className="text-[10px] text-gray-600 leading-relaxed">{m.aciklama}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Kontrol Listesi */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle size={14} className="text-[#00C49F]" /> Ofis Seçim Kontrol Listesi
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
            <span className="font-black">Önemli:</span> Ticari kira sözleşmeleri TBK 299–378 kapsamındadır; konut kirası sınırlamaları (kira artış tavanı vb.) geçerli değildir. Uzun vadeli işyeri kira sözleşmelerini imzalamadan önce ticaret hukuku avukatına danışın.
          </p>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Araçlar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/kira-sozlesmesi-ornegi', label: 'Kira Sözleşmesi Örneği' },
              { href: '/kira-getiri-hesaplayici', label: 'Kira Getiri Hesaplayıcı' },
              { href: '/emlak-komisyonu', label: 'Emlak Komisyonu' },
              { href: '/yatirim-analizi', label: 'Yatırım Analizi' },
              { href: '/depozito', label: 'Depozito Rehberi' },
              { href: '/vergi-planlama', label: 'Vergi Planlama Rehberi' },
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
