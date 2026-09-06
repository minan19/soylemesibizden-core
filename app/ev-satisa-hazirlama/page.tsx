import { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, AlertTriangle, ArrowRight, Tag } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Evinizi Satışa Hazırlama Rehberi | Fiyat, Fotoğraf, Sunum | Söylemesi Bizden',
  description:
    'Evinizi hızlı ve yüksek fiyata satın: piyasa fiyatı belirleme, ev hazırlama, profesyonel fotoğraf, alıcı müzakeresi ve satış sonrası adımlar.',
};

const HAZIRLIK_ADIMLARI = [
  { adim: 'Piyasa Araştırması Yapın', aciklama: 'Aynı bölgedeki benzer daireler için son 3–6 ay içinde gerçekleşen satış fiyatlarını inceleyin. İlan fiyatı ile gerçek satış fiyatı farklı olabilir; gerçekçi beklenti belirleyin.', sure: '1 Hafta' },
  { adim: 'Profesyonel Değerleme', aciklama: 'SPK lisanslı bir ekspertiz firmasından değerleme raporu alın (500–2.000 ₺). Hem gerçekçi fiyat hem alıcı güveni sağlar.', sure: '3–5 Gün' },
  { adim: 'Ev Bakımı ve Onarım', aciklama: 'Küçük tamirler (sızdıran musluk, kırık prizler, çatlak duvar boyası) yaptırın. Büyük yatırım genellikle geri dönmez; küçük işler büyük fark yaratır.', sure: '1–2 Hafta' },
  { adim: 'Boşaltma ve Depolama', aciklama: 'Fazla eşyaları depolayın ya da bağışlayın. Boş ve aydınlık görünen ev, alıcıda alan algısı yaratır ve daha hızlı satılır.', sure: '3–5 Gün' },
  { adim: 'Profesyonel Fotoğraf Çekimi', aciklama: 'Kaliteli fotoğraflar ilk izlenimi belirler. Gündüz çekilmiş, geniş açılı, düzenli fotoğraflar ilanın görüntülenme sayısını katlayabilir.', sure: '1 Gün' },
  { adim: 'İlan Yayınlayın', aciklama: 'Birden fazla platforma ilan verin; fiyat, oda sayısı, m², konum ve özellikler eksiksiz yazın. Yanıltıcı bilgi vermekten kaçının — iade talepleri doğurabilir.', sure: 'İlan Günü' },
  { adim: 'Gösterimler ve Müzakere', aciklama: 'Ev gösterimlerinde evi temiz ve aydınlık tutun. Teklif alındığında karşı teklif yapın; fiyat müzakeresinde alt sınırınızı önceden belirleyin.', sure: '1–8 Hafta' },
  { adim: 'Sözleşme ve Tapu Devri', aciklama: 'Mutabık kalınan fiyat için noterden satış vaadi sözleşmesi imzalayın; tapu harcını ödeyip tapu müdürlüğünde devir yapın.', sure: '1–2 Hafta' },
];

const HOME_STAGING = [
  { ipucu: 'Temizlik ve Koku', aciklama: 'Derin temizlik yapın; kirli veya nemli koku alıcıyı anında kaybettirir. Tarafsız, hoş bir koku tercih edin.' },
  { ipucu: 'Aydınlatma', aciklama: 'Tüm lambaları çalışır halde tutun; gün ışığı için perdeleri açın. Karanlık ve loş mekanlar evi küçük gösterir.' },
  { ipucu: 'Renk Nötralizasyonu', aciklama: 'Çok canlı veya kişisel renkteki duvarları beyaz veya kırık beyaza boyamak, alıcının kendini hayal etmesini kolaylaştırır.' },
  { ipucu: 'Birinci İzlenim', aciklama: 'Kapı önü, merdiven, asansör; alıcı binaya girdiği andan değerlendirmeye başlar. Ortak alanları da temiz tutun.' },
  { ipucu: 'Kişisel Eşyaları Kaldırın', aciklama: 'Aile fotoğrafları, kişisel koleksiyonlar ve dini objeler bir kenara kaldırılmalı; alıcının "kendini görebileceği" nötr bir ortam hedeflenir.' },
];

const FIYAT_BELIRLEME = [
  { kriter: 'Karşılaştırmalı Piyasa Analizi', aciklama: 'Son 6 ayda bölgenizde satılan benzer dairelerin m² fiyatını hesaplayın ve kendi m² fiyatınızı belirleyin.' },
  { kriter: 'Üst Sınırı Ayarlayın', aciklama: 'Piyasanın %5–10 üzerinde fiyatlamak müzakere payı tanır; %20+ üzeri ciddi alıcıları kaçırır.' },
  { kriter: 'Mevsimsel Etki', aciklama: 'İlkbahar ve sonbahar gayrimenkul satışları için en aktif dönemdir. Yaz ortası ve kış dönemi alıcı sayısını düşürür.' },
  { kriter: 'Fiyat Düzeltme Eşiği', aciklama: '3–4 haftada ciddi ilgi yoksa fiyatı %5–8 düşürmeyi değerlendirin; uzun süre piyasada kalan ev "neden satılmıyor?" sorgusu yaratır.' },
];

const VERGI_VE_MASRAFLAR = [
  { kalem: 'Tapu Harcı (Satıcı Payı)', tutar: '%2', aciklama: 'Satış bedeli üzerinden satıcı %2 tapu harcı öder.' },
  { kalem: 'Değer Artış Kazancı Vergisi', tutar: '%15–40', aciklama: '5 yıldan kısa sürede satışta, alış-satış farkı üzerinden gelir vergisi ödenir. 5 yıl sonra muafiyet.' },
  { kalem: 'Emlakçı Komisyonu', tutar: '%2+KDV', aciklama: 'Satıcıdan da %2 komisyon alınır; önceden pazarlık yapılabilir.' },
  { kalem: 'Daire Hazırlık Masrafı', tutar: '2.000–20.000 ₺', aciklama: 'Boyama, küçük tadilat ve fotoğraf çekimi masrafları.' },
];

export default function EvSatisaHazirlama() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <Tag size={13} /> Ev Satışı
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Evinizi Satışa Hazırlama Rehberi
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            Hızlı ve yüksek fiyata satış için: piyasa araştırması, ev hazırlama, fiyat belirleme ve tapu devrine 8 adım.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-[#00C49F]">8 Adım</p>
              <p className="text-xs text-gray-400">Satış süreci</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">5 Yıl</p>
              <p className="text-xs text-gray-400">Vergi muafiyet süresi</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-400">%5–10</p>
              <p className="text-xs text-gray-400">Müzakere marjı</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* Hazırlık Adımları */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Satış Hazırlık Adımları</h2>
          <div className="space-y-3">
            {HAZIRLIK_ADIMLARI.map((a, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                <div className="flex items-start justify-between mb-1">
                  <div className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-[#00C49F] text-white text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">{i + 1}</div>
                    <p className="text-xs font-black text-gray-900">{a.adim}</p>
                  </div>
                  <span className="text-[10px] bg-amber-50 text-amber-600 font-black px-2 py-0.5 rounded shrink-0">{a.sure}</span>
                </div>
                <p className="text-[10px] text-gray-600 leading-relaxed mt-1 ml-7">{a.aciklama}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Home Staging */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle size={14} className="text-[#00C49F]" /> Ev Hazırlama (Home Staging) İpuçları
          </h2>
          <div className="space-y-3">
            {HOME_STAGING.map((h, i) => (
              <div key={i} className="grid grid-cols-3 gap-2 py-2 border-b border-gray-50 last:border-0">
                <p className="text-xs font-black text-[#00C49F]">{h.ipucu}</p>
                <p className="text-[10px] text-gray-600 leading-relaxed col-span-2">{h.aciklama}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Fiyat Belirleme */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Doğru Fiyat Belirleme</h2>
          <div className="space-y-3">
            {FIYAT_BELIRLEME.map((f, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                <p className="text-xs font-black text-[#00C49F] mb-1">{f.kriter}</p>
                <p className="text-[10px] text-gray-600 leading-relaxed">{f.aciklama}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Vergi ve Masraflar */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm overflow-x-auto">
          <h2 className="text-sm font-black text-gray-900 mb-4">Satıcının Ödediği Vergi ve Masraflar</h2>
          <table className="w-full text-[10px] min-w-[380px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 font-black text-gray-500">Kalem</th>
                <th className="text-center py-2 font-black text-[#00C49F]">Oran/Tutar</th>
                <th className="text-left py-2 font-black text-gray-500">Açıklama</th>
              </tr>
            </thead>
            <tbody>
              {VERGI_VE_MASRAFLAR.map((v, i) => (
                <tr key={i} className="border-b border-gray-50 last:border-0">
                  <td className="py-2 font-black text-gray-900">{v.kalem}</td>
                  <td className="py-2 text-center font-black text-[#00C49F]">{v.tutar}</td>
                  <td className="py-2 text-gray-600">{v.aciklama}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Uyarı */}
        <section className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <AlertTriangle size={14} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 leading-relaxed">
            <span className="font-black">5 Yıl Kuralı:</span> Satın alma tarihinden itibaren 5 yıl geçmeden satarsanız alış-satış farkı üzerinden gelir vergisi ödemeniz gerekir. Mümkünse 5 yılı tamamladıktan sonra satmayı planlayın.
          </p>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Araçlar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/tapu-masrafi', label: 'Tapu Masrafı Hesaplayıcı' },
              { href: '/gayrimenkul-vergi-optimizasyon', label: 'Vergi Optimizasyonu Rehberi' },
              { href: '/rehber/satici-rehberi', label: 'Satıcı Rehberi' },
              { href: '/tapu-devir-rehberi', label: 'Tapu Devir Rehberi' },
              { href: '/yatirim-analizi', label: 'Yatırım Analizi' },
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
