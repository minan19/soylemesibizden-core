import { Metadata } from 'next';
import Link from 'next/link';
import {
  Building, CheckCircle, AlertTriangle, ArrowRight, FileText,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Belediye İşlemleri Rehberi | Yapı Ruhsatı, İskan, Encümen | Söylemesi Bizden',
  description:
    'Gayrimenkulde belediye işlemleri: yapı ruhsatı, yapı kullanma izni (iskan), encümen kararı, imar barışı ve harç bilgileri.',
};

const TEMEL_ISLEMLER = [
  {
    islem: 'Yapı Ruhsatı',
    aciklama: 'Yeni inşaat, tadilat veya ilave kat öncesi alınması zorunlu belediye onayı.',
    dayanak: '3194 sayılı İmar Kanunu md. 21',
    sure: '30 iş günü (tamamlı başvuruda)',
    harç: 'İnşaat alanı × birim maliyet × %0,5–2 (belediyeye göre)',
  },
  {
    islem: 'Yapı Kullanma İzni (İskan)',
    aciklama: 'Yapının ruhsata ve eklerine uygun tamamlandığını belgeleyen izin belgesi.',
    dayanak: 'İmar Kanunu md. 30–31',
    sure: '30 iş günü',
    harç: 'Ruhsat harcının belirli oranı + bağımsız bölüm başına sabit ücret',
  },
  {
    islem: 'İmar Durumu Belgesi',
    aciklama: 'Parselin mevcut imar planındaki kullanımını, TAKS/KAKS değerlerini gösterir.',
    dayanak: 'İmar Kanunu md. 8',
    sure: '5–10 iş günü',
    harç: 'Düşük sabit harç (~200–500 ₺)',
  },
  {
    islem: 'Parselasyon / İfraz-Tevhit',
    aciklama: 'Parseli bölme (ifraz) veya birleştirme (tevhit) işlemi; belediye ve tapu koordinasyonu gerekir.',
    dayanak: 'İmar Kanunu md. 15–16',
    sure: '30–90 gün',
    harç: 'Parsel büyüklüğü ve niteliğine göre',
  },
  {
    islem: 'Encümen Kararı',
    aciklama: 'Kamulaştırma, imar ihlali tespiti veya yıkım kararı gibi idari kararların belediye meclisi/encümen tarafından alınması.',
    dayanak: '5393 sayılı Belediye Kanunu',
    sure: 'Gündem durumuna göre değişir',
    harç: 'Yok (idari işlem)',
  },
];

const RUHSAT_BELGELERI = [
  'Tapu senedi veya tasarruf belgesi',
  'Mimari proje (mimar onaylı, 3 takım)',
  'Statik-betonarme projesi (inşaat mühendisi)',
  'Elektrik ve tesisat projeleri',
  'Zemin etüt raporu (gerekli parsellerde)',
  'Mimarlık meslek kuruluşu onayı (TMMOB/UBF)',
  'İdare, su, elektrik idaresi uygunluk görüşleri',
  'Proje müellifi taahhütnamesi',
];

const ISKAN_KOSULLARI = [
  { konu: 'Ruhsata Uygunluk', detay: 'Yapı, onaylı projeye ve ruhsata tamamen uygun tamamlanmış olmalıdır.' },
  { konu: 'Altyapı Bağlantısı', detay: 'Su, elektrik, doğalgaz ve kanalizasyon bağlantıları tamamlanmış olmalı; bağlantı belgeleri ibraz edilmeli.' },
  { konu: 'DASK Zorunluluğu', detay: 'Yapı kullanma izni başvurusunda DASK (zorunlu deprem sigortası) poliçesi ibrazı zorunludur.' },
  { konu: 'Bağımsız Bölüm Listesi', detay: 'Kat irtifakı veya kat mülkiyeti kurulması için bağımsız bölüm listesi ve kat planları hazır olmalı.' },
  { konu: 'Yapı Denetim Raporu', detay: 'Yapı denetim firması tüm aşamaları onaylamış ve biten yapı raporunu belediyeye sunmuş olmalı.' },
];

const IMAR_BARISI = [
  { madde: 'Kapsam', detay: '31/12/2017 öncesi ruhsatsız veya ruhsata aykırı yapılar yapı kayıt belgesi alabilir.' },
  { madde: 'Başvuru', detay: 'e-Devlet veya Çevre, Şehircilik ve İklim Değişikliği Bakanlığı portalı üzerinden online başvuru.' },
  { madde: 'Ücret', detay: 'Yapı yaklaşık maliyeti üzerinden belirlenen oranda (konut için %3, ticari için %5) ödeme.' },
  { madde: 'Sağlanan Haklar', detay: 'Elektrik, su, doğalgaz bağlantısı için kullanılabilir; tapu tescil hakkı sağlamaz.' },
  { madde: 'Sınırlamalar', detay: 'Üçüncü kişi haklarını ihlal eden, kaçak yapının tamamen yıkımını gerektiren durumlarda geçersizdir.' },
];

const SIKAYIR_ITIRAZ = [
  { yol: 'İdareye İtiraz', sure: '30 gün', aciklama: 'Belediyenin ret veya ceza kararına karşı belediyeye yazılı itiraz.' },
  { yol: 'İdare Mahkemesi', sure: '60 gün', aciklama: 'İdari işlemin iptali için taşınmazın bulunduğu yerdeki idare mahkemesine iptal davası.' },
  { yol: 'Ombudsman (Kamu Denetçiliği)', sure: 'Her zaman', aciklama: 'Yavaş, hatalı veya haksız işlemler için ücretsiz şikayet yolu.' },
  { yol: 'Danıştay', sure: '30 gün (bölge idare mahkemesinden)', aciklama: 'İdare mahkemesi kararına itiraz; üst yargı yolu.' },
];

export default function BelediyeIslemleriPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <Building size={13} /> Belediye İşlemleri Rehberi
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Belediye İşlemleri Rehberi
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            Yapı ruhsatı, iskan, encümen kararı, imar barışı ve harca ilişkin kapsamlı bilgi.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-[#00C49F]">30 Gün</p>
              <p className="text-xs text-gray-400">Ruhsat yasal süresi</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">DASK</p>
              <p className="text-xs text-gray-400">İskan zorunluluğu</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-400">3194</p>
              <p className="text-xs text-gray-400">İmar Kanunu</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* Temel İşlemler */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Temel Belediye İşlemleri</h2>
          <div className="space-y-4">
            {TEMEL_ISLEMLER.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <p className="text-xs font-black text-gray-900 mb-1">{t.islem}</p>
                <p className="text-[10px] text-gray-600 mb-3 leading-relaxed">{t.aciklama}</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  <div className="bg-gray-50 rounded-lg p-2">
                    <p className="text-[10px] text-gray-400 font-bold mb-0.5">Dayanak</p>
                    <p className="text-[10px] text-gray-600">{t.dayanak}</p>
                  </div>
                  <div className="bg-[#F0FDF8] rounded-lg p-2">
                    <p className="text-[10px] text-[#00C49F] font-bold mb-0.5">Süre</p>
                    <p className="text-[10px] text-gray-600">{t.sure}</p>
                  </div>
                  <div className="col-span-2 sm:col-span-1 bg-amber-50 rounded-lg p-2">
                    <p className="text-[10px] text-amber-600 font-bold mb-0.5">Harç</p>
                    <p className="text-[10px] text-gray-600">{t.harç}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Ruhsat Belgeleri */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle size={14} className="text-[#00C49F]" /> Yapı Ruhsatı İçin Gerekli Belgeler
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {RUHSAT_BELGELERI.map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <div className="w-4 h-4 rounded border-2 border-[#00C49F]/40 shrink-0 mt-0.5" />
                <p className="text-xs text-gray-700 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* İskan Koşulları */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Yapı Kullanma İzni (İskan) Koşulları</h2>
          <div className="space-y-3">
            {ISKAN_KOSULLARI.map((k, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                <p className="text-xs font-black text-gray-900 mb-1">{k.konu}</p>
                <p className="text-[10px] text-gray-600 leading-relaxed">{k.detay}</p>
              </div>
            ))}
          </div>
        </section>

        {/* İmar Barışı */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <FileText size={14} className="text-amber-500" /> İmar Barışı (Yapı Kayıt Belgesi)
          </h2>
          <div className="space-y-3">
            {IMAR_BARISI.map((b, i) => (
              <div key={i} className="bg-amber-50 rounded-xl p-3">
                <p className="text-xs font-black text-gray-900 mb-0.5">{b.madde}</p>
                <p className="text-[10px] text-gray-600 leading-relaxed">{b.detay}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Şikayet ve İtiraz */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">İtiraz ve Hukuki Yollar</h2>
          <div className="space-y-3">
            {SIKAYIR_ITIRAZ.map((s, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm flex items-start gap-3">
                <div className="bg-blue-50 text-blue-600 text-[10px] font-black px-2 py-1 rounded-lg shrink-0">{s.sure}</div>
                <div>
                  <p className="text-xs font-black text-gray-900 mb-0.5">{s.yol}</p>
                  <p className="text-[10px] text-gray-600 leading-relaxed">{s.aciklama}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Warning */}
        <section className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <AlertTriangle size={14} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 leading-relaxed">
            <span className="font-black">Önemli:</span> Ruhsatsız veya iskansız yapı satın almak ciddi riskler taşır: banka kredisi çıkmaz, tapu devri zorlaşabilir ve yıkım kararıyla karşılaşılabilir. Satın almadan önce belediyeden imar ve iskan durumunu yazılı olarak teyit edin.
          </p>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Rehberler</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/imar-durumu', label: 'İmar Durumu Rehberi' },
              { href: '/enerji-kimlik-belgesi', label: 'Enerji Kimlik Belgesi' },
              { href: '/dask-hesaplayici', label: 'DASK Prim Hesaplayıcı' },
              { href: '/kat-mulkiyeti', label: 'Kat Mülkiyeti Rehberi' },
              { href: '/arsa-yatirimi', label: 'Arsa Yatırımı Rehberi' },
              { href: '/tapu-masrafi', label: 'Tapu Masrafı Hesaplayıcı' },
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
