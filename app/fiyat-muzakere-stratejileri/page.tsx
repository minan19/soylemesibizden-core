import { Metadata } from 'next';
import Link from 'next/link';
import { TrendingDown, CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Emlak Fiyat Müzakere Stratejileri 2024 | İndirim Alma Teknikleri | Söylemesi Bizden',
  description:
    'Gayrimenkul alımında fiyat müzakeresi: emsal analizi, teklif stratejileri, satıcı psikolojisi ve hata kaçınma rehberi.',
};

const HAZIRLIK_ADIMLARI = [
  {
    adim: 'Emsal Araştırması Yapın',
    detay: 'Son 3–6 aydaki benzer mülk satış fiyatlarını toplayın. Aynı bina, semt ve oda sayısı kombinasyonu için en az 3–5 emsal bulun. Bu veriler somut bir müzakere zemini oluşturur.',
  },
  {
    adim: 'Mülkün Eksikliklerini Listeleyin',
    detay: 'Kat, cephe, tadilat ihtiyacı, yaş, aidat, yönetim kalitesi, ulaşım mesafesi gibi faktörleri puanlayın. Her eksiklik indirim gerekçesidir.',
  },
  {
    adim: 'Maksimum Bütçenizi Bilin',
    detay: 'Müzakerede "biraz daha verebilirim" havası yaratmak sizi zayıf konuma sokar. İç sınırınızı baştan belirleyin ve aşmayın.',
  },
  {
    adim: 'Satıcının Motivasyonunu Araştırın',
    detay: 'İlanlık süre, taşınma tarihi, çoklu mülk, boş konut, miras gibi faktörler satıcıyı esnek yapar. Danışmana sorularla öğrenin.',
  },
  {
    adim: 'BATNA\'nızı Belirleyin',
    detay: 'En İyi Alternatif (BATNA): bu mülk olmasa ne yaparsınız? Alternatif seçeneğiniz güçlüyse müzakerede daha etkili olursunuz.',
  },
];

const TEKLIF_STRATEJILERI = [
  {
    strateji: 'Düşük Açılış Teklifi',
    ne_zaman: 'Mülk uzun süre satılmamışsa (60+ gün)',
    nasil: 'İstenen fiyatın %10–15 altından başlayın. Gerçekçi bir alt sınır; çok düşük açılış satıcıyı müzakereden kaçırır.',
    risk: 'Satıcıyı incitebilir; iyi niyetli görünmek önemli',
  },
  {
    strateji: 'Çabuk Kapanma Teklifi',
    ne_zaman: 'Satıcı hızlı nakit arıyorsa',
    nasil: '"10 gün içinde tapuya girebiliriz, belgeler hazır" mesajı fiyat konusunda esneklik yaratır.',
    risk: 'Süreç gecikirse güven kaybı; sadece gerçekten yapabilirseniz teklif edin',
  },
  {
    strateji: 'Koşullu Teklif',
    ne_zaman: 'Kredi onayı veya tadilat gerektiren durumlarda',
    nasil: '"Tadilat maliyeti düşüldüğünde X fiyat önerim var" şeklinde somut gerekçe sunun.',
    risk: 'Satıcının başka teklife açık kalması; hızlı yanıt almanız gerekir',
  },
  {
    strateji: 'Karşı Teklif Reddi',
    ne_zaman: 'Satıcı küçük indirimle geri döndüğünde',
    nasil: 'Önerinizi tekrar etmek yerine sessiz kalın veya "teklifim benim son teklifim" deyin. Satıcı genellikle konuşmak zorunda kalır.',
    risk: 'Müzakereyi kesebilir; güçlü alternatif varsa kullanın',
  },
];

const MUZAKERE_IPUCLARI = [
  'İlk teklifi sözlü değil, yazılı yapın — ciddiye alınır, geri adım atmayı zorlaştırmaz',
  'Fiyat yerine koşulları (tapu tarihi, dahil eşyalar, onarım) müzakere edin — satıcı için değer yaratırsınız',
  'Kapora miktarını yüksek tutmak kararlılık sinyali verir; satıcı teklife güvenir',
  'Her müzakerede bir şey alın, bir şey verin — "hem fiyatı hem vademi kabul ettim" deyin',
  'Acele etmeyin: "Bir gece düşüneceğim" ifadesi satıcının kaygısını artırır',
  'Ekstra taleplerle değer oluşturun: klima, perde, ankastre, otopark dahil edilmesini isteyin',
];

const HATA_LISTESI = [
  { hata: 'Mülke olan aşkı göstermek', sonuc: 'Satıcı indirim yapmaya gerek duymaz' },
  { hata: 'İlk teklifte maksimum bütçeyi söylemek', sonuc: 'Müzakere marjı kalmaz' },
  { hata: 'Emsal araştırmasız fiyat tartışmak', sonuc: 'Güvenilirlik kaybı; zaaf sinyali' },
  { hata: 'Birden fazla mülke aynı anda kapora vermek', sonuc: 'Hukuki risk, ciddi para kaybı' },
  { hata: 'Sözlü anlaşmayı yeterli saymak', sonuc: 'Satıcı daha iyi teklife gidebilir' },
  { hata: 'Tapu öncesi ödeme yapmak', sonuc: 'Hukuki güvencesiz para transferi riski' },
];

export default function FiyatMuzakereStratejileriPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <TrendingDown size={13} /> Müzakere Stratejileri
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Emlak Fiyat Müzakere Stratejileri 2024
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            Emsal analizinden teklif stratejilerine, satıcı psikolojisinden kritik hatalara kadar eksiksiz müzakere rehberi.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-[#00C49F]">%10–15</p>
              <p className="text-xs text-gray-400">Açılış teklif farkı</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">Yazılı</p>
              <p className="text-xs text-gray-400">Teklif formatı</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-400">BATNA</p>
              <p className="text-xs text-gray-400">Alternatifinizi bilin</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* Hazırlık */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Müzakere Öncesi Hazırlık</h2>
          <div className="space-y-3">
            {HAZIRLIK_ADIMLARI.map((a, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#00C49F] text-white text-[10px] font-black flex items-center justify-center shrink-0">{i + 1}</div>
                  <div>
                    <p className="text-xs font-black text-gray-900 mb-1">{a.adim}</p>
                    <p className="text-[10px] text-gray-600 leading-relaxed">{a.detay}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Teklif Stratejileri */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Teklif Stratejileri</h2>
          <div className="space-y-4">
            {TEKLIF_STRATEJILERI.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <p className="text-xs font-black text-gray-900 mb-3">{t.strateji}</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div className="bg-[#F0FDF8] rounded-xl p-2">
                    <p className="text-[10px] font-black text-[#00C49F] mb-0.5">Ne Zaman?</p>
                    <p className="text-[10px] text-gray-700 leading-relaxed">{t.ne_zaman}</p>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-2">
                    <p className="text-[10px] font-black text-blue-600 mb-0.5">Nasıl?</p>
                    <p className="text-[10px] text-gray-700 leading-relaxed">{t.nasil}</p>
                  </div>
                  <div className="bg-amber-50 rounded-xl p-2">
                    <p className="text-[10px] font-black text-amber-600 mb-0.5">Risk</p>
                    <p className="text-[10px] text-gray-700 leading-relaxed">{t.risk}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* İpuçları */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle size={14} className="text-[#00C49F]" /> Altın Müzakere İpuçları
          </h2>
          <div className="space-y-2">
            {MUZAKERE_IPUCLARI.map((ip, i) => (
              <div key={i} className="flex items-start gap-2 py-2 border-b border-gray-50 last:border-0">
                <CheckCircle size={12} className="text-[#00C49F] shrink-0 mt-0.5" />
                <p className="text-xs text-gray-700 leading-relaxed">{ip}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Hatalar */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Kaçınılması Gereken Hatalar</h2>
          <div className="space-y-3">
            {HATA_LISTESI.map((h, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm flex items-center justify-between gap-3">
                <p className="text-xs text-gray-800">{h.hata}</p>
                <span className="text-[10px] bg-rose-50 text-rose-600 font-black px-2 py-0.5 rounded shrink-0">{h.sonuc}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Uyarı */}
        <section className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <AlertTriangle size={14} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 leading-relaxed">
            <span className="font-black">Önemli:</span> Sözlü uzlaşma hukuki bağlayıcılık taşımaz. Anlaşma sağlandığında en kısa sürede noter tasdikli satış vaadi sözleşmesi veya kapora sözleşmesi imzalayın.
          </p>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Araçlar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/ev-alma-rehberi', label: 'Ev Alma Rehberi' },
              { href: '/satilik-ev-degeri', label: 'Satılık Ev Değer Hesaplayıcı' },
              { href: '/emlak-danismani-secme', label: 'Emlak Danışmanı Seçme' },
              { href: '/gayrimenkul-degerleme', label: 'Gayrimenkul Değerleme' },
              { href: '/emsal-karsilastirma', label: 'Emsal Karşılaştırması' },
              { href: '/pismanlik-hakki', label: 'Pişmanlık Hakkı Rehberi' },
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
