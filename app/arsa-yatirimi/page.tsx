import { Metadata } from 'next';
import Link from 'next/link';
import {
  MapPin, CheckCircle, AlertTriangle, ArrowRight, Scale, TrendingUp,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Arsa Yatırımı Rehberi | İmar Türleri, Kontrol Listesi, Riskler | Söylemesi Bizden',
  description:
    'Arsa yatırımı nasıl yapılır? İmar durumu kontrolü, arsa türleri, getiri potansiyeli, yasal riskler ve alım öncesi kontrol listesi.',
};

const ARSA_TURLERI = [
  {
    tip: 'İmarlı Konut Arsası',
    tanim: 'Uygulama imar planında konut alanı olarak belirlenmiş; inşaat ruhsatı alınabilir.',
    getiri: 'Yüksek — fiyat bölgeye göre m² değeri en yüksek arsa tipi.',
    risk: 'Düşük-Orta — altyapı durumu, imar şartları değişim riski.',
    dikkat: 'TAKS ve KAKS değerleri sözlü değil yazılı imar durumuna göre kontrol edilmeli.',
  },
  {
    tip: 'İmarlı Ticari Arsa',
    tanim: 'Ticaret veya karma kullanım alanında; iş merkezi, mağaza, depo yapılabilir.',
    getiri: 'Çok Yüksek — kira geliri potansiyeli yüksek.',
    risk: 'Orta — talep bölge ekonomisine bağımlı.',
    dikkat: 'Müstakil ya da AVM projesi için imar izni ve çevre trafik raporu gerekebilir.',
  },
  {
    tip: 'İmarsız/Tarım Arazisi',
    tanim: 'Tarımsal üretim alanı; konut/ticaret yapılaşmasına kapalı.',
    getiri: 'Düşük-Orta — imar kazanımı beklentisiyle değerlenebilir.',
    risk: 'Yüksek — imar planı değişmeyebilir; uzun vadeli belirsizlik.',
    dikkat: 'Tarım dışı kullanım izni (TDİ) şartları zorludur; uzmanla danışılmalı.',
  },
  {
    tip: 'Sanayi Arsası',
    tanim: 'Sanayi bölgesi veya OSB sınırında; fabrika, depo, atölye.',
    getiri: 'Orta-Yüksek — kira bağımlı; bölge OSB mi bağımsız mi?',
    risk: 'Orta — sanayi doluluk oranı ve altyapı kritik.',
    dikkat: 'OSB içi arsalar ayrı kurallara tabidir; satış OSB yönetimi onayı gerektirebilir.',
  },
  {
    tip: 'Turizm/Korunan Alan',
    tanim: 'Turizm bölgesi veya sit alanı; sınırlı yapılaşma imkânı.',
    getiri: 'Yüksek potansiyel — doğru izin alınırsa butik otel/tatil konutu.',
    risk: 'Çok Yüksek — izin süreci uzun, belirsiz; sit alanı kısıtları.',
    dikkat: 'Kültür ve Turizm Bakanlığı veya çevre planı onayı zorunludur.',
  },
];

const GETIRI_FAKTORU = [
  { faktör: 'Konum ve Ulaşım', etki: 'Ana yola mesafe, çevre yatırımları, yeni altyapı projeleri (metro, OSB, üniversite) fiyatı doğrudan etkiler.' },
  { faktör: 'İmar Durumu', etki: 'İmarsız → imarlı geçiş tarihsel olarak 3–10x değer artışı sağlamıştır.' },
  { faktör: 'Parsel Büyüklüğü', etki: 'Küçük parseller (250–1000 m²) daha likit; büyük parseller (10 dönüm+) daha yüksek getiri ama çıkış süresi uzun.' },
  { faktör: 'Cephe ve Şekil', etki: 'Düzgün dikdörtgen/kare parsel en verimli; düzensiz veya dere yatağı yakını düşük değer.' },
  { faktör: 'Altyapı', etki: 'Yol, elektrik, su, kanalizasyon bağlı parsel; bağlı olmayan için ek maliyet.' },
  { faktör: 'Bölge Gelişim Hızı', etki: 'Yeni OSB, üniversite, hastane veya AVM projeleri çevre arsa değerini hızlandırır.' },
];

const RISKLER = [
  { risk: 'İmar Planı Değişmeyebilir', onlem: 'Değerleme raporunu beklemeden spekülatif alım yapmayın; belediye planlarına bakın.' },
  { risk: 'Hisseli Arsa', onlem: 'Tüm hissedarlara bildirim yapılmazsa izale davası açılabilir. Şufa hakkı 3 ay süre.' },
  { risk: 'Hazine Şerhi / İfraz Sorunu', onlem: 'Tapu müdürlüğünde şerh kontrolü; Hazine arsasıyla sınır komşuluğu riskli.' },
  { risk: 'Dere Yatağı / Heyelan', onlem: 'DSİ dere taşkın haritası ve zemin etüdü olmadan konut arsası almayın.' },
  { risk: 'Enerji Nakil Hattı Koridoru', onlem: 'Yüksek gerilim hattı altında veya yakınında yapılaşma engeli.' },
  { risk: 'Uzun Satış Süresi', onlem: 'Arsa likiditesi konut kadar yüksek değil; çıkış planını önceden belirleyin.' },
];

const KONTROL_LISTESI = [
  'Tapu ve kadastro durumu (hisse, şerh, ipotek)',
  'İmar durumu belgesi (belediyeden resmi yazıyla)',
  'TAKS, KAKS, yükseklik, ön bahçe — yazılı teyit',
  'Parselasyon (18. madde uygulaması) yapılmış mı?',
  'Kamulaştırma ve yol genişletme planı var mı?',
  'Dere yatağı / heyelan bölgesi kontrolü (DSİ, AFAD)',
  'Enerji nakil hattı veya doğalgaz boru hattı koridoru',
  'Altyapı: yol, elektrik, su, kanalizasyon var mı?',
  'Çevre güncel satış emsalleri karşılaştırıldı mı?',
  'Komşu parsellerde yapılaşma ve kullanım nedir?',
];

export default function ArsaYatirimiPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <MapPin size={13} /> Arsa Yatırımı Rehberi
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Arsa Yatırımı Rehberi
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            İmar türleri, arsa türleri, getiri faktörleri, yasal riskler ve alım öncesi kapsamlı kontrol listesi.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-[#00C49F]">3–10x</p>
              <p className="text-xs text-gray-400">İmar kazanımı potansiyeli</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">%0</p>
              <p className="text-xs text-gray-400">Kira getirisi (çoğunlukla)</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-400">Uzun</p>
              <p className="text-xs text-gray-400">Yatırım ufku</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* Arsa Türleri */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Arsa Türleri</h2>
          <div className="space-y-4">
            {ARSA_TURLERI.map((a, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <p className="text-xs font-black text-gray-900 mb-1">{a.tip}</p>
                <p className="text-[10px] text-gray-600 mb-3 leading-relaxed">{a.tanim}</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div className="bg-[#F0FDF8] rounded-lg p-2">
                    <p className="text-[10px] text-[#00C49F] font-bold mb-0.5">Getiri</p>
                    <p className="text-[10px] text-gray-600">{a.getiri}</p>
                  </div>
                  <div className="bg-rose-50 rounded-lg p-2">
                    <p className="text-[10px] text-rose-600 font-bold mb-0.5">Risk</p>
                    <p className="text-[10px] text-gray-600">{a.risk}</p>
                  </div>
                  <div className="bg-amber-50 rounded-lg p-2">
                    <p className="text-[10px] text-amber-600 font-bold mb-0.5">Dikkat</p>
                    <p className="text-[10px] text-gray-600">{a.dikkat}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Getiri Faktörleri */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Değer Artışını Belirleyen Faktörler</h2>
          <div className="space-y-3">
            {GETIRI_FAKTORU.map((f, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm flex items-start gap-3">
                <TrendingUp size={13} className="text-[#00C49F] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-black text-gray-900 mb-0.5">{f.faktör}</p>
                  <p className="text-[10px] text-gray-600 leading-relaxed">{f.etki}</p>
                </div>
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

        {/* Kontrol Listesi */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle size={14} className="text-[#00C49F]" /> Alım Öncesi Kontrol Listesi
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {KONTROL_LISTESI.map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <div className="w-4 h-4 rounded border-2 border-[#00C49F]/40 shrink-0 mt-0.5" />
                <p className="text-xs text-gray-700 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Vergi */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <Scale size={14} className="text-[#00C49F]" /> Arsa Alım-Satımında Vergi
          </h2>
          <div className="space-y-3">
            {[
              { kalem: 'Tapu Harcı', detay: 'Alıcı ve satıcı %2\'şer, toplam %4. Beyan değeri üzerinden hesaplanır.' },
              { kalem: 'Değer Artış Kazancı Vergisi', detay: '5 yıldan önce satışta kazanç üzerinden %15–40 gelir vergisi. 5 yıl sonra muafiyet.' },
              { kalem: 'Emlak Vergisi', detay: 'Arsa için %0.3 (konut %0.2). Büyükşehirlerde 2 kat uygulanır.' },
              { kalem: 'İnşaat Sonrası KDV', detay: 'Arsa üzerine bina inşa edip satılırsa %4 KDV (150 m² altı konut için).' },
            ].map((v, i) => (
              <div key={i} className="flex items-start gap-3 bg-[#F0FDF8] rounded-xl p-3">
                <div className="text-[10px] font-black text-[#00C49F] shrink-0 min-w-[80px]">{v.kalem}</div>
                <p className="text-[10px] text-gray-600 leading-relaxed">{v.detay}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Warning */}
        <section className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <AlertTriangle size={14} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 leading-relaxed">
            <span className="font-black">Önemli:</span> İmarsız arsa yatırımı yüksek risk taşır. İmar değişikliği yasal bir hak değil, belediye takdir yetkisindedir. Kısa vadeli planlarla imarsız arsa almaktan kaçınılmalıdır.
          </p>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Rehberler</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/imar-durumu', label: 'İmar Durumu Rehberi' },
              { href: '/sehir-planlama', label: 'Şehir Planlama ve İmar' },
              { href: '/deger-artis-vergisi', label: 'Değer Artış Vergisi' },
              { href: '/tapu-devir-sureci', label: 'Tapu Devir Süreci' },
              { href: '/yatirim-analizi', label: 'Yatırım ROI Analizi' },
              { href: '/yatirim-bolgesi', label: 'En İyi Yatırım Bölgeleri' },
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
