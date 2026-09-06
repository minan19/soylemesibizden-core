import { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, AlertTriangle, ArrowRight, TrendingUp } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Kredi Notu Rehberi 2024 | Findeks Puanı, Konut Kredisi | Söylemesi Bizden',
  description:
    'Kredi notu nasıl yükseltilir? Findeks KKB puanı, konut kredisi uygunluğu ve kredi notunu etkileyen faktörler hakkında kapsamlı rehber.',
};

const NOT_ARALIKLARI = [
  { aralik: '1900 ve üzeri', kategori: 'Mükemmel', renk: 'text-[#00C49F]', bg: 'bg-[#F0FDF8] border-[#00C49F]/20', aciklama: 'En iyi faiz oranları, hızlı onay, yüksek kredi limitleri' },
  { aralik: '1700 – 1899', kategori: 'Çok İyi', renk: 'text-blue-600', bg: 'bg-blue-50 border-blue-100', aciklama: 'Avantajlı faiz, konut kredisi onayı kolay' },
  { aralik: '1500 – 1699', kategori: 'İyi', renk: 'text-amber-600', bg: 'bg-amber-50 border-amber-100', aciklama: 'Standart faiz oranları, normal onay süreci' },
  { aralik: '1200 – 1499', kategori: 'Orta', renk: 'text-orange-600', bg: 'bg-orange-50 border-orange-100', aciklama: 'Yüksek faiz riski, ek teminat istenebilir' },
  { aralik: '1200 altı', kategori: 'Düşük', renk: 'text-rose-600', bg: 'bg-rose-50 border-rose-100', aciklama: 'Kredi onayı zor, yüksek faiz veya ret riski' },
];

const ETKILEYEN_FAKTORLER = [
  { faktor: 'Ödeme Geçmişi', agirlik: '%35', aciklama: 'Tüm kredi ve kart ödemelerinin zamanında yapılması en önemli faktördür.' },
  { faktor: 'Kredi Kullanım Oranı', agirlik: '%30', aciklama: 'Kart limitinin %30\'unun altında kullanım ideal. %70\'in üzeri notu olumsuz etkiler.' },
  { faktor: 'Kredi Geçmişi Uzunluğu', agirlik: '%15', aciklama: 'Uzun ve sağlıklı kredi geçmişi olumlu etkiler; yeni hesaplar riski artırır.' },
  { faktor: 'Kredi Çeşitliliği', agirlik: '%10', aciklama: 'Konut, taşıt ve kart gibi farklı türde kredi kullanımı notu olumlu etkiler.' },
  { faktor: 'Yeni Başvurular', agirlik: '%10', aciklama: 'Kısa sürede çok sayıda kredi başvurusu notu düşürür.' },
];

const IYILESTIRME_ADIMLARI = [
  { adim: 'Tüm ödemeleri zamanında yapın', etki: 'Çok Yüksek', sure: '1–3 ay' },
  { adim: 'Kart bakiyelerini limitin %30\'una düşürün', etki: 'Yüksek', sure: '1–2 ay' },
  { adim: 'Eski ve sağlıklı kredi hesaplarını açık tutun', etki: 'Orta', sure: 'Uzun vadeli' },
  { adim: 'Yeni kredi başvurularını sınırlandırın', etki: 'Orta', sure: '6–12 ay' },
  { adim: 'Hatalı kayıtlar için KKB itiraz başvurusu yapın', etki: 'Yüksek', sure: '30–60 gün' },
  { adim: 'Gecikmiş borçları kapatın ve ödeme planı oluşturun', etki: 'Çok Yüksek', sure: '3–6 ay' },
];

const KONUT_KREDISI_ESIGI = [
  { banka: 'Devlet Bankaları (Ziraat, Halk, Vakıf)', minNot: 1200, aciklama: 'Genellikle daha esnek; ek teminat ile düşük notlu başvuruları değerlendirebilir.' },
  { banka: 'Özel Bankalar', minNot: 1400, aciklama: 'Standart koşullarda 1400+ talep eder; 1600+ için avantajlı faiz sunar.' },
  { banka: 'Yabancı Bankalar', minNot: 1600, aciklama: 'Genellikle en yüksek eşiği talep eder, ancak en düşük faizi sunar.' },
];

export default function KrediNotuRehberiPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <TrendingUp size={13} /> Kredi Notu
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Kredi Notu Rehberi 2024
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            Findeks KKB puanınızı nasıl yükseltirsiniz? Konut kredisi uygunluğu ve notu etkileyen faktörler.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-[#00C49F]">1900+</p>
              <p className="text-xs text-gray-400">Mükemmel puan</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">%35</p>
              <p className="text-xs text-gray-400">Ödeme geçmişi ağırlığı</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-400">3–6 ay</p>
              <p className="text-xs text-gray-400">Ortalama iyileşme süresi</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* Not Aralıkları */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Kredi Notu Aralıkları</h2>
          <div className="space-y-3">
            {NOT_ARALIKLARI.map((n, i) => (
              <div key={i} className={`rounded-2xl border p-4 ${n.bg}`}>
                <div className="flex items-center justify-between mb-1">
                  <p className={`text-xs font-black ${n.renk}`}>{n.aralik}</p>
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded ${n.renk} bg-white/60`}>{n.kategori}</span>
                </div>
                <p className="text-[10px] text-gray-600 leading-relaxed">{n.aciklama}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Etkileyen Faktörler */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4">Notu Etkileyen Faktörler</h2>
          <div className="space-y-4">
            {ETKILEYEN_FAKTORLER.map((f, i) => (
              <div key={i} className="space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-black text-gray-900">{f.faktor}</p>
                  <span className="text-xs font-black text-[#00C49F]">{f.agirlik}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="h-2 bg-[#00C49F] rounded-full" style={{ width: f.agirlik }} />
                </div>
                <p className="text-[10px] text-gray-500">{f.aciklama}</p>
              </div>
            ))}
          </div>
        </section>

        {/* İyileştirme Adımları */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Kredi Notunu İyileştirme Adımları</h2>
          <div className="space-y-3">
            {IYILESTIRME_ADIMLARI.map((a, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle size={12} className="text-[#00C49F] shrink-0 mt-0.5" />
                    <p className="text-xs text-gray-700 leading-relaxed">{a.adim}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className={`text-[10px] font-black ${a.etki === 'Çok Yüksek' ? 'text-[#00C49F]' : a.etki === 'Yüksek' ? 'text-blue-600' : 'text-amber-600'}`}>{a.etki}</p>
                    <p className="text-[10px] text-gray-400">{a.sure}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Banka Eşikleri */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4">Bankaya Göre Minimum Kredi Notu</h2>
          <div className="space-y-3">
            {KONUT_KREDISI_ESIGI.map((b, i) => (
              <div key={i} className="py-2 border-b border-gray-50 last:border-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs font-black text-gray-900">{b.banka}</p>
                  <span className="text-xs font-black text-[#00C49F]">{b.minNot}+</span>
                </div>
                <p className="text-[10px] text-gray-500">{b.aciklama}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Uyarı */}
        <section className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <AlertTriangle size={14} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 leading-relaxed">
            <span className="font-black">Not:</span> Kredi notunuzu öğrenmek için Findeks veya KKB üzerinden ücretsiz sorgulama yapabilirsiniz. Yıllık 1 sorgulama ücretsizdir.
          </p>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Araçlar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/konut-kredisi-basvuru', label: 'Konut Kredisi Başvuru Rehberi' },
              { href: '/konut-kredisi-simulatoru', label: 'Konut Kredisi Simülatörü' },
              { href: '/faiz-orani-karsilastirici', label: 'Faiz Oranı Karşılaştırıcı' },
              { href: '/banka-kredileri', label: 'Banka Kredileri Karşılaştırma' },
              { href: '/pesinat-hesaplayici', label: 'Peşinat Hesaplayıcı' },
              { href: '/mortgage-rehberi', label: 'Mortgage Rehberi' },
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
