import { Metadata } from 'next';
import Link from 'next/link';
import {
  FileText, CheckCircle, AlertTriangle, ArrowRight, Scale,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Ev Değerleme Rehberi | SPK Ekspertiz, Değer Faktörleri | Söylemesi Bizden',
  description:
    'Gayrimenkul değerleme nasıl yapılır? SPK lisanslı ekspertiz, değeri etkileyen faktörler, online ve resmi değerleme yöntemleri.',
};

const DEGERLEME_YONTEMLERI = [
  {
    yontem: 'Emsal Karşılaştırma',
    aciklama: 'Aynı bölgede benzer özellikteki (konum, alan, yaş) mülklerin son satış fiyatları karşılaştırılarak değer belirlenir.',
    kullanim: 'Konut ve arsa değerlemesinde en yaygın yöntem',
    dogruluk: 'Yüksek',
  },
  {
    yontem: 'Gelir Kapitalizasyonu',
    aciklama: 'Taşınmazın elde ettiği veya edebileceği kira geliri belirli bir kapitalizasyon oranına bölünerek değer hesaplanır.',
    kullanim: 'Ticari gayrimenkul, kiralık konut portföyü',
    dogruluk: 'Orta-Yüksek',
  },
  {
    yontem: 'Maliyet Yaklaşımı',
    aciklama: 'Taşınmazı yeniden inşa etmenin maliyeti hesaplanır, yıpranma payı düşülerek arsa değeri eklenir.',
    kullanim: 'Özel yapılar, endüstriyel tesisler, sigorta değeri',
    dogruluk: 'Orta',
  },
  {
    yontem: 'İskontolu Nakit Akışı',
    aciklama: 'Gelecekteki kira gelirleri ve satış değeri bugüne iskonto edilerek net bugünkü değer hesaplanır.',
    kullanim: 'Yatırım amaçlı büyük portföyler, proje değerlemesi',
    dogruluk: 'Yüksek (varsayımlara duyarlı)',
  },
];

const DEGER_FAKTORLERI = [
  { faktor: 'Konum', etki: 'Çok Yüksek', aciklama: 'Merkeze mesafe, ulaşım, okul, hastane ve alışveriş imkânları' },
  { faktor: 'Brüt/Net Alan', etki: 'Yüksek', aciklama: 'Kullanılabilir yaşam alanı; ortak alanların oranı' },
  { faktor: 'Bina Yaşı ve Durumu', etki: 'Yüksek', aciklama: 'Bakım durumu, deprem yönetmeliği uyumu, tadilat geçmişi' },
  { faktor: 'Kat ve Cephe', etki: 'Orta-Yüksek', aciklama: 'Üst katlar ve güneyli cepheler genellikle prim taşır' },
  { faktor: 'Otopark ve Depo', etki: 'Orta', aciklama: 'Kapalı otopark ve bodrum depo varlığı değer artırır' },
  { faktor: 'Site Olanakları', etki: 'Orta', aciklama: 'Güvenlik, havuz, spor salonu, yeşil alan gibi sosyal donatılar' },
  { faktor: 'İmar Durumu', etki: 'Orta-Yüksek', aciklama: 'Yeniden yapılanma potansiyeli (TAKS/KAKS) ticari ve arsalarda kritik' },
  { faktor: 'Piyasa Koşulları', etki: 'Değişken', aciklama: 'Faiz oranları, kredi erişimi, arz-talep dengesi ve döviz kuru' },
];

const SPK_EKSPERTIZ = [
  { adim: 'Ekspertiz Talebi', detay: 'Bankalar veya bireysel alıcılar SPK lisanslı değerleme şirketine başvurur; konu ve amaç bildirilir.' },
  { adim: 'Yerinde İnceleme', detay: 'Değerleme uzmanı taşınmazı bizzat ziyaret eder; fotoğraf, ölçüm ve gözlem yapar.' },
  { adim: 'Emsal Araştırma', detay: 'Bölgedeki satış ve kira ilanları, gerçekleşen satış verileri ve tapu kayıtları incelenir.' },
  { adim: 'Rapor Hazırlama', detay: 'SPK formatına uygun ekspertiz raporu hazırlanır; metodoloji, emsaller ve değer açıklanır.' },
  { adim: 'Teslim', detay: 'Rapor talep eden kuruma (banka/müşteri) iletilir; 3–7 iş günü süreç.' },
];

const ONLINE_DEGERLEME = [
  { kaynak: 'Emlak İlan Analizi', aciklama: 'Sahibinden, Hepsiemlak gibi platformlardaki benzer ilanları filtreleyerek yaklaşık değer elde edilebilir; gerçek satış değil ilan fiyatıdır.', dogruluk: 'Tahmini' },
  { kaynak: 'Tapu/Belediye Değeri', aciklama: 'Tapu harcı ve emlak vergisi hesaplamalarında kullanılan resmi değer, piyasa değerinin altında kalır.', dogruluk: 'Düşük' },
  { kaynak: 'Banka AVM (Otomatik)', aciklama: 'Bazı bankalar AVM (Automated Valuation Model) ile anlık tahmini değer sunar; büyük ölçekli portföylerde kullanılır.', dogruluk: 'Orta' },
  { kaynak: 'SPK Lisanslı Ekspertiz', aciklama: 'Resmi, bağımsız ve mahkemede geçerli değerleme. Konut kredisi ve yasal işlemler için zorunlu.', dogruluk: 'Yüksek' },
];

const IPUCLARI = [
  'Satış fiyatı belirlemeden önce en az 3 farklı emlakçıdan kıymet takdiri isteyin.',
  'Bölgedeki son 6 aydaki gerçekleşen satış fiyatlarına odaklanın; ilan fiyatı genellikle %5–15 pazarlık payı içerir.',
  'Ekspertiz raporunu kendiniz de sipariş edebilirsiniz; satış öncesi doğru fiyat tespiti sağlar.',
  'Banka ekspertizi düşük çıkarsa itiraz edebilirsiniz; yeniden değerleme veya farklı şirketten rapor talep hakkınız var.',
  'Değerleme tarihi önemlidir; piyasa dalgalı ise eski raporlar yanıltıcı olabilir.',
  'Yabancı alıcıya satışta zorunlu değerleme raporu 3 ay geçerlidir; güncelleme gerekebilir.',
];

export default function EvDegerlemePage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <Scale size={13} /> Ev Değerleme Rehberi
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Gayrimenkul Değerleme Rehberi
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            SPK ekspertiz süreci, değerleme yöntemleri, değeri etkileyen faktörler ve pratik ipuçları.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-[#00C49F]">3–7 Gün</p>
              <p className="text-xs text-gray-400">Ekspertiz süresi</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">SPK</p>
              <p className="text-xs text-gray-400">Lisanslı değerleme</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-400">3 Ay</p>
              <p className="text-xs text-gray-400">Yabancı alım geçerlilik</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* Değerleme Yöntemleri */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Değerleme Yöntemleri</h2>
          <div className="space-y-4">
            {DEGERLEME_YONTEMLERI.map((y, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <p className="text-xs font-black text-gray-900 mb-1">{y.yontem}</p>
                <p className="text-[10px] text-gray-600 mb-3 leading-relaxed">{y.aciklama}</p>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-[#F0FDF8] rounded-lg p-2">
                    <p className="text-[10px] text-[#00C49F] font-bold mb-0.5">Kullanım</p>
                    <p className="text-[10px] text-gray-600">{y.kullanim}</p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-2">
                    <p className="text-[10px] text-blue-600 font-bold mb-0.5">Doğruluk</p>
                    <p className="text-[10px] text-gray-600">{y.dogruluk}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Değer Faktörleri */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Değeri Etkileyen Faktörler</h2>
          <div className="space-y-3">
            {DEGER_FAKTORLERI.map((f, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm flex items-start gap-3">
                <div className={`text-[10px] font-black px-2 py-1 rounded-lg shrink-0 ${
                  f.etki === 'Çok Yüksek' ? 'bg-rose-50 text-rose-600' :
                  f.etki === 'Yüksek' ? 'bg-amber-50 text-amber-600' :
                  f.etki === 'Orta-Yüksek' ? 'bg-blue-50 text-blue-600' : 'bg-gray-100 text-gray-500'
                }`}>{f.etki}</div>
                <div>
                  <p className="text-xs font-black text-gray-900 mb-0.5">{f.faktor}</p>
                  <p className="text-[10px] text-gray-600 leading-relaxed">{f.aciklama}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SPK Ekspertiz Süreci */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">SPK Lisanslı Ekspertiz Süreci</h2>
          <div className="space-y-3">
            {SPK_EKSPERTIZ.map((s, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm flex items-start gap-3">
                <div className="bg-[#F0FDF8] text-[#00C49F] text-[10px] font-black px-2 py-1 rounded-lg shrink-0">{i + 1}</div>
                <div>
                  <p className="text-xs font-black text-gray-900 mb-0.5">{s.adim}</p>
                  <p className="text-[10px] text-gray-600 leading-relaxed">{s.detay}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Online Değerleme */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <FileText size={14} className="text-[#00C49F]" /> Değerleme Kaynakları Karşılaştırması
          </h2>
          <div className="space-y-3">
            {ONLINE_DEGERLEME.map((o, i) => (
              <div key={i} className="flex items-start gap-3 py-2 border-b border-gray-50 last:border-0">
                <div className={`text-[10px] font-black px-2 py-1 rounded-lg shrink-0 ${
                  o.dogruluk === 'Yüksek' ? 'bg-[#F0FDF8] text-[#00C49F]' :
                  o.dogruluk === 'Orta' ? 'bg-amber-50 text-amber-600' :
                  o.dogruluk === 'Tahmini' ? 'bg-blue-50 text-blue-600' : 'bg-rose-50 text-rose-500'
                }`}>{o.dogruluk}</div>
                <div>
                  <p className="text-xs font-black text-gray-900 mb-0.5">{o.kaynak}</p>
                  <p className="text-[10px] text-gray-600 leading-relaxed">{o.aciklama}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* İpuçları */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle size={14} className="text-[#00C49F]" /> Pratik İpuçları
          </h2>
          <div className="space-y-2">
            {IPUCLARI.map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00C49F] shrink-0 mt-1.5" />
                <p className="text-xs text-gray-700 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Warning */}
        <section className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <AlertTriangle size={14} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 leading-relaxed">
            <span className="font-black">Önemli:</span> Banka ekspertizi, alıcıyı değil bankayı korumak için yapılır. Alıcı olarak kendi bağımsız ekspertizinizi yaptırmak daha sağlıklı bir karar vermenizi sağlar. Ekspertiz masrafı ödenen fiyatın küçük bir kısmıdır.
          </p>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Rehberler</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/ekspertiz-raporu', label: 'Ekspertiz Raporu Rehberi' },
              { href: '/yatirim-analizi', label: 'Yatırım Analizi' },
              { href: '/tapu-masrafi', label: 'Tapu Masrafı Hesaplayıcı' },
              { href: '/banka-kredileri', label: 'Banka Kredileri Karşılaştırma' },
              { href: '/piyasa', label: 'Piyasa Verileri' },
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
