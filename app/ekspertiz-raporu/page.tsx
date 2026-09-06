import { Metadata } from 'next';
import Link from 'next/link';
import {
  FileText, CheckCircle, AlertTriangle, ArrowRight, Scale, Building2,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Ekspertiz Raporu Rehberi | SPK Lisanslı Değerleme, Süreç, Maliyet | Söylemesi Bizden',
  description:
    'Gayrimenkul ekspertiz raporu nedir, ne işe yarar? SPK lisanslı değerleme şirketi seçimi, rapor içeriği ve banka ekspertizinin önemi.',
};

const RAPOR_TURLERI = [
  {
    tur: 'Banka / Kredi Ekspertizi',
    amac: 'Konut kredisi başvurusunda bankanın istediği değerleme.',
    zorunlu: true,
    sure: '1–3 iş günü',
    fiyat: '2.000–5.000 ₺',
    not: 'SPK lisanslı firmadan yapılmalı; banka listesinden seçilir.',
  },
  {
    tur: 'Alım-Satım Değerlemesi',
    amac: 'Tarafların gerçek piyasa değerini öğrenmesi için yaptırılır.',
    zorunlu: false,
    sure: '3–7 iş günü',
    fiyat: '3.000–8.000 ₺',
    not: 'Satış öncesi fiyat belirleme veya müzakere güçlendirme.',
  },
  {
    tur: 'Yabancı Alım Değerlemesi',
    amac: 'Yabancı uyruklu alıcılar için yasal zorunluluk (2019\'dan itibaren).',
    zorunlu: true,
    sure: '2–5 iş günü',
    fiyat: '3.000–7.000 ₺',
    not: 'SPK onaylı; tapu işleminde beyan edilir.',
  },
  {
    tur: 'Kira Değerlemesi',
    amac: 'Emsal kira tespiti; kiracı-malik uyuşmazlıklarında kullanılır.',
    zorunlu: false,
    sure: '2–4 iş günü',
    fiyat: '2.000–4.000 ₺',
    not: 'Kira tespit davalarında mahkeme bilirkişisi görevi görür.',
  },
  {
    tur: 'Ayni Sermaye / Şirket Aktifi',
    amac: 'Şirkete ayni sermaye olarak konulan gayrimenkulün değerlenmesi.',
    zorunlu: true,
    sure: '5–10 iş günü',
    fiyat: '5.000–15.000 ₺',
    not: 'TTK 342. madde uyarınca mahkeme atadığı bilirkişi de olabilir.',
  },
];

const RAPOR_ICERIGI = [
  { bolum: 'Mülkiyet Bilgileri', detay: 'Tapu sicili, maliki, üzerindeki şerhler ve kısıtlamalar.' },
  { bolum: 'Konum ve Pazar Analizi', detay: 'Mahalle, altyapı, ulaşım, piyasa karşılaştırma tablosu.' },
  { bolum: 'Fiziksel İnceleme', detay: 'Yapı yaşı, kat, alan, oda sayısı, teknik durum tespiti.' },
  { bolum: 'Değerleme Yöntemi', detay: 'Emsal karşılaştırma, gelir indirgeme veya maliyet yöntemi; gerekçeli seçim.' },
  { bolum: 'Değer Sonucu', detay: 'Piyasa değeri, kira değeri ve gerekirse zorunlu satış değeri.' },
  { bolum: 'Fotoğraf ve Ekler', detay: 'Tapu sureti, yapı fotoğrafları, harita ekleri.' },
  { bolum: 'Uzman Beyanı', detay: 'SPK lisanslı değerleme uzmanının imzalı ve mühürlü beyanı.' },
];

const SPK_KURAL = [
  'Değerleme şirketi SPK\'ya kayıtlı ve lisanslı olmalı (SPK web sitesinden sorgulanabilir).',
  'Değerleme uzmanı en az 4 yıl deneyimli ve SPK sınavını geçmiş olmalıdır.',
  'Aynı mülkü değerleyen uzman, o mülkte hissedar veya akraba olamaz (bağımsızlık ilkesi).',
  'Rapor tarihi 6 ay içinde geçerlidir; eski raporla işlem yapılamaz.',
  'Banka ekspertizinde kullanılacak firma bankanın onaylı listesinden seçilmelidir.',
  'Değerleme ücretinin mülk değeriyle oran kurulmaması gerekir (bağımsızlık).',
];

const HATALAR = [
  { hata: 'Tapu Değerinden Düşük Ekspertiz', risk: 'Banka, ekspertiz değerinin %80\'ini kredi verir. Düşük ekspertiz = daha az kredi.' },
  { hata: 'Ruhsatsız veya Kaçak Alan', risk: 'Eksper raporlanmamış / ruhsatsız alanı değere katmaz. Fiili değer < rapor değeri.' },
  { hata: 'İpotek veya Şerhli Tapu', risk: 'Şerh banka onayını geciktirir veya engeller; ekspertiz öncesi tapu kontrolü şart.' },
  { hata: 'Eski Rapor Kullanımı', risk: '6 ay dolmuş rapor geçersiz sayılır; yenisi yaptırılmalıdır.' },
  { hata: 'Yetkisiz Firma Seçimi', risk: 'SPK dışı firmadan alınan rapor tapu veya bankada kabul görmez.' },
];

export default function EkspertizRaporuPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <FileText size={13} /> Ekspertiz Raporu Rehberi
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Ekspertiz Raporu Rehberi
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            SPK lisanslı değerleme firması seçimi, rapor türleri, içerik ve banka ekspertizinin önemi.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-[#00C49F]">6 Ay</p>
              <p className="text-xs text-gray-400">Rapor geçerlilik süresi</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">%80</p>
              <p className="text-xs text-gray-400">Banka ekspertiz kredi oranı</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-400">SPK</p>
              <p className="text-xs text-gray-400">Zorunlu lisans</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* Rapor Türleri */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Değerleme Raporu Türleri</h2>
          <div className="space-y-4">
            {RAPOR_TURLERI.map((r, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <p className="text-xs font-black text-gray-900">{r.tur}</p>
                  {r.zorunlu && (
                    <span className="text-[9px] bg-rose-100 text-rose-600 font-bold px-2 py-0.5 rounded-full">ZORUNLU</span>
                  )}
                </div>
                <p className="text-[10px] text-gray-600 mb-3 leading-relaxed">{r.amac}</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div className="bg-[#F0FDF8] rounded-lg p-2">
                    <p className="text-[10px] text-[#00C49F] font-bold mb-0.5">Süre</p>
                    <p className="text-[10px] text-gray-600">{r.sure}</p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-2">
                    <p className="text-[10px] text-blue-600 font-bold mb-0.5">Maliyet</p>
                    <p className="text-[10px] text-gray-600">{r.fiyat}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2">
                    <p className="text-[10px] text-gray-500 font-bold mb-0.5">Not</p>
                    <p className="text-[10px] text-gray-600">{r.not}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Rapor İçeriği */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Rapor Bölümleri</h2>
          <div className="space-y-3">
            {RAPOR_ICERIGI.map((b, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm flex items-start gap-3">
                <div className="bg-[#F0FDF8] text-[#00C49F] text-[10px] font-black px-2 py-1 rounded-lg shrink-0">{i + 1}</div>
                <div>
                  <p className="text-xs font-black text-gray-900 mb-0.5">{b.bolum}</p>
                  <p className="text-[10px] text-gray-600 leading-relaxed">{b.detay}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SPK Kurallar */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <Scale size={14} className="text-[#00C49F]" /> SPK Değerleme Kuralları
          </h2>
          <div className="space-y-2">
            {SPK_KURAL.map((kural, i) => (
              <div key={i} className="flex items-start gap-2">
                <CheckCircle size={11} className="text-[#00C49F] shrink-0 mt-0.5" />
                <p className="text-xs text-gray-700 leading-relaxed">{kural}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Hatalar */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Dikkat Edilmesi Gereken Hatalar</h2>
          <div className="space-y-3">
            {HATALAR.map((h, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                <div className="flex items-start gap-2 mb-1">
                  <AlertTriangle size={12} className="text-amber-500 shrink-0 mt-0.5" />
                  <p className="text-xs font-black text-gray-900">{h.hata}</p>
                </div>
                <p className="text-[10px] text-gray-600 leading-relaxed ml-5">{h.risk}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Warning */}
        <section className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <AlertTriangle size={14} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 leading-relaxed">
            <span className="font-black">Önemli:</span> Ekspertiz raporu, piyasa değerine yakın sonuç verir; beyan değerinden bağımsızdır. Banka, raporun düşük tutması durumunda krediyi kısıtlayabilir. Alım kararınızı her zaman rapor değerini göz önünde tutarak verin.
          </p>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Rehberler</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/tasinmaz-degerleme', label: 'Taşınmaz Değerleme Yöntemleri' },
              { href: '/tapu-devir-sureci', label: 'Tapu Devir Süreci' },
              { href: '/konut-kredisi-rehberi', label: 'Konut Kredisi Rehberi' },
              { href: '/yabanci-gayrimenkul', label: 'Yabancı Gayrimenkul Alımı' },
              { href: '/satilik-ev-degeri', label: 'Ev Değeri Hesapla' },
              { href: '/valuation', label: 'Online Değerleme Aracı' },
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
