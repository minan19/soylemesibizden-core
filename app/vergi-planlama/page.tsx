import { Metadata } from 'next';
import Link from 'next/link';
import {
  FileText, CheckCircle, AlertTriangle, ArrowRight, Scale,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Gayrimenkul Vergi Planlama Rehberi | Değer Artış, Kira, Tapu | Söylemesi Bizden',
  description:
    'Gayrimenkulde vergi minimizasyonu: değer artış kazancı muafiyeti, kira beyan yöntemleri, veraset vergisi ve tapu harcı optimizasyonu.',
};

const VERGI_TURLERI = [
  {
    vergi: 'Değer Artış Kazancı Vergisi',
    oran: 'Dilime göre %15–40',
    kapsam: '5 yıl içinde alıp satılan taşınmazlar',
    muafiyet: '5 yılı aşan elde tutma süresi; 1 Ocak 2022 sonrası alınanlar için geçerli',
    not: 'Konut + iş yeri ayrımı olmaksızın uygulanır.',
  },
  {
    vergi: 'Kira Geliri Vergisi',
    oran: '%15–40 (gelir vergisi dilimleri)',
    kapsam: 'Tüm kira gelirleri; 2024 yıllık istisna: 33.000 ₺',
    muafiyet: 'İstisna tutarı altında konut kirası',
    not: 'Götürü gider (%15) veya gerçek gider yöntemi seçilebilir.',
  },
  {
    vergi: 'Tapu Harcı',
    oran: '%4 (alıcı + satıcı paylaşır)',
    kapsam: 'Her tapu devri işlemi',
    muafiyet: 'İlk konut alımı %3 indirimli (koşullar var)',
    not: 'Beyan değeri düşük tutmak yaptırım riskidir; emsal değeri esas alınır.',
  },
  {
    vergi: 'Emlak Vergisi',
    oran: 'Konut %0,2–0,4 / Ticari %0,4–0,8',
    kapsam: 'Tüm taşınmaz malikler (her yıl)',
    muafiyet: '200 m² altı tek konut + emekli/engelli muafiyeti',
    not: 'Belediyeye belediye yatırımları payıyla birlikte ödenir.',
  },
  {
    vergi: 'Veraset ve İntikal Vergisi',
    oran: '%1–%10',
    kapsam: 'Miras yoluyla veya bağış olarak intikal eden taşınmazlar',
    muafiyet: 'Eşe ve çocuklara geçen değerin ilk dilimleri',
    not: 'Miras: ölüm tarihinden 4 ay içinde beyan zorunlu.',
  },
];

const PLANLAMA_STRATEJISI = [
  {
    strateji: '5 Yıl Bekle, Vergisiz Sat',
    aciklama: 'Taşınmazı satın alım tarihinden itibaren 5 tam yıl elinizde tutarsanız değer artış kazancı vergisi ödenmez.',
    tasarruf: 'Yüksek (satış kârı büyükse %40\'a kadar vergi)',
    uygulanabilir: 'Yatırım amaçlı alımlarda',
  },
  {
    strateji: 'Götürü Gider Yöntemi',
    aciklama: 'Kira gelirinin %15\'ini belge gerekmeksizin gider olarak indirin. Az gideriniz varsa bu yöntem avantajlıdır.',
    tasarruf: 'Orta',
    uygulanabilir: 'Giderleri az olan ev sahipleri',
  },
  {
    strateji: 'Gerçek Gider Yöntemi',
    aciklama: 'Amortisman, faiz, onarım, sigorta giderlerini belgeli olarak düşün. Yüksek gideriniz varsa vergi tasarrufu sağlar.',
    tasarruf: 'Yüksek (gider oranı yüksekse)',
    uygulanabilir: 'Kredi faizi veya tadilat gideri olanlar',
  },
  {
    strateji: 'Şirket Üzerinden Yatırım',
    aciklama: 'Tüzel kişi olarak (limited şirket) taşınmaz edinimlerde kurumlar vergisi ve KDV indirim avantajlarından yararlanılabilir.',
    tasarruf: 'Değişken (şirket giderlerine bağlı)',
    uygulanabilir: 'Birden fazla mülk veya ticari amaçlı',
  },
  {
    strateji: 'Miras Planlaması',
    aciklama: 'Sağlıklıyken mirasçılara kademeli bağış veya satış yapmak veraset vergisini minimize edebilir. Hukuki danışmanlık şart.',
    tasarruf: 'Orta-Yüksek',
    uygulanabilir: 'Yaşlı ve çok mülklü malikler',
  },
];

const SATIS_TARIHI = [
  { yil: '1. Yılda Satış', katsayi: 'Nominal fiyat farkı', not: 'Enflasyon düzeltmesi yoktu; yüksek vergi riski.' },
  { yil: '2–3. Yılda Satış', katsayi: 'ÜFE endekslemesi', not: '2022 sonrası alımlarda enflasyon düzeltmesi uygulandı.' },
  { yil: '4–5. Yılda Satış', katsayi: 'ÜFE + azalan vergi', not: 'Elde tutma süresi arttıkça matrah azalabilir.' },
  { yil: '5+ Yılda Satış', katsayi: 'VERGİSİZ', not: 'Değer artış kazancı vergisinden tam muafiyet.' },
];

const BEYAN_TAKVIM = [
  { islem: 'Kira Geliri Beyanı', son_tarih: 'Mart ayı (yıllık)', kanal: 'e-Beyanname veya vergi dairesi' },
  { islem: 'Veraset Beyanı', son_tarih: 'Ölümden 4 ay içinde', kanal: 'Veraset ve İntikal Vergisi beyannamesi' },
  { islem: 'Emlak Vergisi', son_tarih: 'Nisan/Kasım (iki taksit)', kanal: 'Belediye veya e-Devlet' },
  { islem: 'Değer Artış Beyannnamesi', son_tarih: 'Satışı izleyen yıl Mart', kanal: 'Yıllık gelir vergisi beyannamesi' },
  { islem: 'Tapu Harcı', son_tarih: 'Tapu devri anında', kanal: 'Tapu sicil müdürlüğü' },
];

export default function VergiPlanlamaPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <FileText size={13} /> Gayrimenkul Vergi Planlama
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Gayrimenkul Vergi Planlama Rehberi
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            Değer artış vergisi muafiyeti, kira beyan yöntemleri, veraset vergisi ve tapu harcı optimizasyonu.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-[#00C49F]">5 Yıl</p>
              <p className="text-xs text-gray-400">Muafiyet eşiği</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">%15</p>
              <p className="text-xs text-gray-400">Götürü gider oranı</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-400">Mart</p>
              <p className="text-xs text-gray-400">Kira beyan ayı</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* Vergi Türleri */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Gayrimenkul Vergi Türleri</h2>
          <div className="space-y-4">
            {VERGI_TURLERI.map((v, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <div className="flex items-start justify-between mb-2">
                  <p className="text-xs font-black text-gray-900">{v.vergi}</p>
                  <span className="text-[10px] bg-rose-50 text-rose-600 font-black px-2 py-0.5 rounded ml-2 shrink-0">{v.oran}</span>
                </div>
                <p className="text-[10px] text-gray-600 mb-2 leading-relaxed">{v.kapsam}</p>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-[#F0FDF8] rounded-lg p-2">
                    <p className="text-[10px] text-[#00C49F] font-bold mb-0.5">Muafiyet</p>
                    <p className="text-[10px] text-gray-600">{v.muafiyet}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2">
                    <p className="text-[10px] text-gray-400 font-bold mb-0.5">Not</p>
                    <p className="text-[10px] text-gray-600">{v.not}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Planlama Stratejisi */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Vergi Minimizasyon Stratejileri</h2>
          <div className="space-y-4">
            {PLANLAMA_STRATEJISI.map((p, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <div className="flex items-start justify-between mb-2">
                  <p className="text-xs font-black text-gray-900">{p.strateji}</p>
                  <span className="text-[10px] bg-[#F0FDF8] text-[#00C49F] font-black px-2 py-0.5 rounded ml-2 shrink-0">{p.tasarruf}</span>
                </div>
                <p className="text-[10px] text-gray-600 mb-2 leading-relaxed">{p.aciklama}</p>
                <p className="text-[10px] text-blue-600 font-bold">Uygulanabilir: {p.uygulanabilir}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Satış Tarihi Etkisi */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <Scale size={14} className="text-[#00C49F]" /> Satış Zamanlaması ve Vergi
          </h2>
          <div className="space-y-2">
            {SATIS_TARIHI.map((s, i) => (
              <div key={i} className={`grid grid-cols-3 gap-2 py-2 border-b border-gray-50 last:border-0 ${i === SATIS_TARIHI.length - 1 ? 'bg-[#F0FDF8] rounded-lg px-2' : ''}`}>
                <p className="text-xs font-bold text-gray-900">{s.yil}</p>
                <p className={`text-xs font-black ${i === SATIS_TARIHI.length - 1 ? 'text-[#00C49F]' : 'text-gray-700'}`}>{s.katsayi}</p>
                <p className="text-[10px] text-gray-500 leading-relaxed">{s.not}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Beyan Takvimi */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle size={14} className="text-[#00C49F]" /> Vergi Beyan Takvimi
          </h2>
          <div className="space-y-2">
            {BEYAN_TAKVIM.map((b, i) => (
              <div key={i} className="flex items-start gap-3 py-2 border-b border-gray-50 last:border-0">
                <div className="bg-amber-50 text-amber-600 text-[10px] font-black px-2 py-1 rounded-lg shrink-0 text-center min-w-[70px]">{b.son_tarih}</div>
                <div>
                  <p className="text-xs font-black text-gray-900 mb-0.5">{b.islem}</p>
                  <p className="text-[10px] text-gray-500">{b.kanal}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Warning */}
        <section className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <AlertTriangle size={14} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 leading-relaxed">
            <span className="font-black">Önemli:</span> Bu rehber genel bilgi amaçlıdır. Vergi mevzuatı sık değişir; kesin hesaplama ve strateji için mali müşavir veya vergi avukatına danışın. Vergi kaçakçılığı ağır yaptırımlar doğurur; minimizasyon yasal çerçevede yapılmalıdır.
          </p>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Araçlar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/kira-geliri-vergisi', label: 'Kira Geliri Vergisi Hesaplayıcı' },
              { href: '/emlak-vergisi', label: 'Emlak Vergisi Hesaplayıcı' },
              { href: '/stopaj-vergisi', label: 'Stopaj Vergisi Hesaplayıcı' },
              { href: '/tapu-masrafi', label: 'Tapu Masrafı Hesaplayıcı' },
              { href: '/miras-ve-gayrimenkul', label: 'Miras ve Gayrimenkul' },
              { href: '/rehber/yatirim-rehberi', label: 'Yatırım Rehberi' },
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
