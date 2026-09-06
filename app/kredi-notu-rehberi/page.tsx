import { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, AlertTriangle, ArrowRight, TrendingUp } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Kredi Notu Rehberi | Findeks Puanı Artırma | Söylemesi Bizden',
  description:
    'Kredi notu nedir, nasıl hesaplanır? Findeks (BKM) kredi puanınızı artırma yöntemleri, konut kredisi için minimum not ve pratik ipuçları.',
};

const NOT_ARALIKLARI = [
  { aralik: '1900 – 1900', durum: 'Mükemmel', renk: 'text-emerald-600', aciklama: 'En iyi faiz oranları, yüksek kredi limiti' },
  { aralik: '1600 – 1899', durum: 'İyi', renk: 'text-[#00C49F]', aciklama: 'Uygun faiz oranları, konut kredisine uygun' },
  { aralik: '1300 – 1599', durum: 'Orta', renk: 'text-amber-500', aciklama: 'Kredi alınabilir, faiz biraz yüksek olabilir' },
  { aralik: '1100 – 1299', durum: 'Zayıf', renk: 'text-orange-500', aciklama: 'Bankalar riskli görebilir; bazı krediler reddedilebilir' },
  { aralik: '0 – 1099', durum: 'Kötü', renk: 'text-rose-500', aciklama: 'Konut kredisi onayı çok zor; önce notu artırın' },
];

const HESAPLAMA_FAKTORLERI = [
  { faktor: 'Ödeme Geçmişi', agirlik: '%35', aciklama: 'En kritik faktör. Düzenli ödeme yapılması notu doğrudan artırır; gecikmeler ciddi hasar verir.' },
  { faktor: 'Kredi Kullanım Oranı', agirlik: '%30', aciklama: 'Kredi kartı limitinin kullanılan yüzdesi. %30\'un altında tutmak ideal; yüksek kullanım notu düşürür.' },
  { faktor: 'Kredi Yaşı', agirlik: '%15', aciklama: 'Uzun süreli, düzenli ödenen kredi geçmişi notu artırır. Eski hesapları kapatmamak faydalıdır.' },
  { faktor: 'Kredi Çeşitliliği', agirlik: '%10', aciklama: 'Farklı kredi türleri (tüketici, kart, ihtiyaç) olmak notu olumlu etkiler.' },
  { faktor: 'Yeni Kredi Başvuruları', agirlik: '%10', aciklama: 'Kısa sürede çok sayıda kredi başvurusu (sert sorgu) notu geçici düşürür.' },
];

const NOTU_ARTIRMA = [
  { yontem: 'Ödemeleri Zamanında Yapın', sure: 'Anında Etki', aciklama: 'Mevcut tüm borçlarınızı (kredi kartı, tüketici kredisi, faturalar) tam ve zamanında ödeyin. Otomatik ödeme talimatı kurun.' },
  { yontem: 'Kart Kullanım Oranını Düşürün', sure: '1–2 Ay', aciklama: 'Kredi kartı borcunu limitin %30\'unun altına indirin. Gerekirse limiti artırmayı veya erken ödeme yapmayı deneyin.' },
  { yontem: 'Gecikmiş Borçları Kapatın', sure: '1–3 Ay', aciklama: 'Takipteki veya gecikmiş borçlar en kritik etken. Yapılandırma imkânı varsa yararlanın; kredi kapatma belgesi alın.' },
  { yontem: 'Gereksiz Başvuru Yapmayın', sure: 'Hemen', aciklama: 'Birden fazla bankaya kısa sürede başvurmak "sert sorgu" bırakır ve notu geçici düşürür. Önce ön değerlendirme yapın.' },
  { yontem: 'Eski Hesapları Kapatmayın', sure: 'Uzun Vadeli', aciklama: 'Ödeme geçmişi olan eski kredi kartı hesapları kredi yaşını artırır. Kullanmıyor olsanız bile açık tutun.' },
  { yontem: 'Düzenli Küçük Kredi Kullanın', sure: '3–6 Ay', aciklama: 'Hiç kredi geçmişi yoksa küçük bir tüketici kredisi veya taksitli alışveriş ile geçmiş oluşturun.' },
];

const KONUT_KREDISI_ESIK = [
  { banka: 'Kamu Bankaları (Ziraat, Halk, Vakıf)', minNot: '1200', not: 'Esneklik gösterebilir; özellikle devlet destekli kampanyalarda' },
  { banka: 'Özel Bankalar (Garanti, İş, YKB)', minNot: '1300+', not: 'Genellikle daha yüksek not ve ek teminat isteyebilir' },
  { banka: 'Yabancı Bankalar (HSBC, Akbank)', minNot: '1400+', not: 'Sıkı kredi politikası; düşük not reddedilme riski yüksek' },
  { banka: 'Genel Eşik (Konut Kredisi)', minNot: '1200', not: 'Ortalama kabul eşiği; her başvuru bireysel değerlendirilir' },
];

const PRATIK_BILGILER = [
  { bilgi: 'Findeks Sorgulama', detay: 'Kendi kredi notunuzu Findeks.com veya e-Devlet üzerinden ücretsiz sorgulayabilirsiniz. Kendi sorgunuz "yumuşak sorgu" olup notu etkilemez.' },
  { bilgi: 'SGK Kaydı Etkisi', detay: 'Çalışanlar için SGK kaydı ve düzenli maaş geçmişi, kredi değerlendirmesinde kredi notuna ek pozitif etken olarak değerlendirilir.' },
  { bilgi: 'Eş Başvurusu', detay: 'Düşük notunuz varsa yüksek notlu eş veya yakın ile ortak başvuru yaparak kredi onayı almanız kolaylaşabilir.' },
  { bilgi: 'Not Artış Süresi', detay: 'Olumsuz kayıtlar genellikle 5 yıl sistemde kalır. Düzenli ödeme ile ortalama 6–12 ay içinde kayda değer not artışı sağlanabilir.' },
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
            Kredi Notu Rehberi
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            Findeks kredi puanı nasıl hesaplanır, artırılır? Konut kredisi için minimum not ve pratik iyileştirme adımları.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-[#00C49F]">1200+</p>
              <p className="text-xs text-gray-400">Konut kredisi eşiği</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">%35</p>
              <p className="text-xs text-gray-400">Ödeme geçmişi ağırlığı</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-400">6–12 Ay</p>
              <p className="text-xs text-gray-400">Not artış süresi</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* Not Aralıkları */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4">Kredi Notu Aralıkları</h2>
          <div className="space-y-3">
            {NOT_ARALIKLARI.map((n, i) => (
              <div key={i} className="grid grid-cols-3 gap-2 py-2 border-b border-gray-50 last:border-0 items-center">
                <div>
                  <p className="text-xs font-black text-gray-900">{n.aralik}</p>
                  <p className={`text-[10px] font-black ${n.renk}`}>{n.durum}</p>
                </div>
                <p className="text-[10px] text-gray-600 leading-relaxed col-span-2">{n.aciklama}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Hesaplama Faktörleri */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Kredi Notu Nasıl Hesaplanır?</h2>
          <div className="space-y-3">
            {HESAPLAMA_FAKTORLERI.map((f, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                <div className="flex items-start justify-between mb-1">
                  <p className="text-xs font-black text-gray-900">{f.faktor}</p>
                  <span className="text-[10px] bg-[#00C49F]/10 text-[#00C49F] font-black px-2 py-0.5 rounded shrink-0">{f.agirlik}</span>
                </div>
                <p className="text-[10px] text-gray-600 leading-relaxed">{f.aciklama}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Artırma Yöntemleri */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Kredi Notunu Artırma Adımları</h2>
          <div className="space-y-3">
            {NOTU_ARTIRMA.map((a, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                <div className="flex items-start justify-between mb-1">
                  <div className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-[#00C49F] text-white text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">{i + 1}</div>
                    <p className="text-xs font-black text-gray-900">{a.yontem}</p>
                  </div>
                  <span className="text-[10px] bg-amber-50 text-amber-600 font-black px-2 py-0.5 rounded shrink-0">{a.sure}</span>
                </div>
                <p className="text-[10px] text-gray-600 leading-relaxed mt-1 ml-7">{a.aciklama}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Banka Eşikleri */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm overflow-x-auto">
          <h2 className="text-sm font-black text-gray-900 mb-4">Konut Kredisi İçin Minimum Kredi Notu</h2>
          <table className="w-full text-[10px] min-w-[380px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 font-black text-gray-500">Banka</th>
                <th className="text-center py-2 font-black text-[#00C49F]">Min. Not</th>
                <th className="text-left py-2 font-black text-gray-500">Not</th>
              </tr>
            </thead>
            <tbody>
              {KONUT_KREDISI_ESIK.map((k, i) => (
                <tr key={i} className="border-b border-gray-50 last:border-0">
                  <td className="py-2 font-black text-gray-900">{k.banka}</td>
                  <td className="py-2 text-center font-black text-[#00C49F]">{k.minNot}</td>
                  <td className="py-2 text-gray-600">{k.not}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Pratik Bilgiler */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle size={14} className="text-[#00C49F]" /> Pratik Bilgiler
          </h2>
          <div className="space-y-3">
            {PRATIK_BILGILER.map((p, i) => (
              <div key={i} className="grid grid-cols-3 gap-2 py-2 border-b border-gray-50 last:border-0">
                <p className="text-xs font-black text-[#00C49F]">{p.bilgi}</p>
                <p className="text-[10px] text-gray-600 leading-relaxed col-span-2">{p.detay}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Uyarı */}
        <section className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <AlertTriangle size={14} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 leading-relaxed">
            <span className="font-black">Önemli:</span> Kredi notu anlık bir puandır ve ödeme davranışlarınıza göre sürekli güncellenir. Konut kredisi başvurusu yapmadan en az 3–6 ay önce notunuzu takibe almanız önerilir.
          </p>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Araçlar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/konut-kredisi-basvuru', label: 'Konut Kredisi Başvuru Rehberi' },
              { href: '/faiz-orani-karsilastirici', label: 'Faiz Oranı Karşılaştırıcı' },
              { href: '/konut-kredisi-simulatoru', label: 'Konut Kredisi Simülatörü' },
              { href: '/banka-kredileri', label: 'Banka Kredileri Karşılaştırma' },
              { href: '/odeme-plani', label: 'Ödeme Planı Simülatörü' },
              { href: '/pesinat-hesaplayici', label: 'Peşinat Hesaplayıcı' },
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
