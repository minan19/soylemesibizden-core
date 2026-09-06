import { Metadata } from 'next';
import Link from 'next/link';
import {
  Users, CheckCircle, AlertTriangle, ArrowRight, FileText, Scale,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Kooperatif Konut Rehberi | Üyelik, Aidat, Hisse Devri | Söylemesi Bizden',
  description:
    'Kooperatifle konut edinimi: üyelik süreci, aidat yükümlülükleri, hisse devri, kooperatif tasfiyesi ve riskler.',
};

const KOOPERATIF_TURLERI = [
  {
    tur: 'Yapı Kooperatifi',
    aciklama: 'Üyelerin ortaklaşa inşaat yaptırarak konut edindiği en yaygın model.',
    dayanak: '1163 sayılı Kooperatifler Kanunu',
    avantaj: 'Piyasanın altında maliyet, üye denetimi',
    dezavantaj: 'Uzun süreç (5–15 yıl), finansman riski',
  },
  {
    tur: 'Tüketim Kooperatifi',
    aciklama: 'Konut alım-satım ve kiralama hizmeti veren kooperatif modeli.',
    dayanak: 'Kooperatifler Kanunu + TOKİ mevzuatı',
    avantaj: 'Hazır konut seçeneği, TOKİ destekleri',
    dezavantaj: 'Sınırlı konut stoğu, uzun bekleme',
  },
  {
    tur: 'Kamu Destekli (TOKİ)',
    aciklama: 'Devletin düşük gelirli vatandaşlara yönelik uygun fiyatlı konut projesi.',
    dayanak: '2985 sayılı TOKİ Kanunu',
    avantaj: 'Uygun kredi, sosyal konut imkânı',
    dezavantaj: 'Bölge seçimi sınırlı, belirli gelir kriterleri',
  },
];

const UYELIK_SURECI = [
  { adim: 'Kooperatif Araştırma', detay: 'Ticaret Sicil Gazetesi, Çevre Bakanlığı ve yerel müdürlüklerden kooperatifin tescil ve proje durumunu kontrol edin.' },
  { adim: 'Üyelik Başvurusu', detay: 'Kooperatife üyelik formu ve gerekli belgelerle (nüfus cüzdanı, ikametgah, gelir belgesi) başvuru yapın.' },
  { adim: 'Ortaklık Payı Ödeme', detay: 'Belirlenen giriş aidatı ve ortaklık payını ödeyin; makbuz almanız zorunludur.' },
  { adim: 'Genel Kurul', detay: 'Üye olarak genel kurul toplantılarına katılma hakkı kazanırsınız; projeye oy kullanabilirsiniz.' },
  { adim: 'İnşaat ve Süreç', detay: 'İnşaat başladığında aylık/kura ile parselasyon yapılır; konut tipi ve katı kura ile belirlenir.' },
  { adim: 'Tapu Teslimi', detay: 'İnşaat tamamlanıp iskan alındıktan sonra hissenize düşen bağımsız bölüm tapu devri yapılır.' },
];

const AIDAT_BILGI = [
  { konu: 'Aylık Aidat', detay: 'İnşaat süresince her ay belirli miktarda aidat ödenir; inşaat maliyetlerine göre artabilir.' },
  { konu: 'Fark Aidatı', detay: 'Proje maliyeti aşılırsa üyelerden ek ödeme (fark aidatı) talep edilebilir; sözleşmede üst limit belirtilmeli.' },
  { konu: 'Gecikme Zammı', detay: 'Ödenmemiş aidatlara sözleşmedeki faiz oranında gecikme zammı uygulanır.' },
  { konu: 'Harcamalar Denetimi', detay: 'Üyeler genel kurul kanalıyla kooperatif harcamalarını denetleme hakkına sahiptir.' },
  { konu: 'Vergi Avantajı', detay: 'Kooperatif konut için ödenen maliyet bedeli üzerinden işlem vergisi avantajı olabilir; KDV oranları farklıdır.' },
];

const HISSE_DEVRI = [
  { adim: 'Devir Onayı', detay: 'Kooperatif tüzüğüne göre hisse devri yönetim kurulunun onayına tabidir; onaysız devir geçersizdir.' },
  { adim: 'Devir Sözleşmesi', detay: 'Noterde onaylanan hisse devir sözleşmesi düzenlenir; ödeme durumu ve borçlar yazılı belirlenir.' },
  { adim: 'Borç Tespiti', detay: 'Devir öncesinde kooperatife aidatlarda borç olmadığı belgelenmelidir.' },
  { adim: 'Giriş Payı Farkı', detay: 'Yeni üyeden piyasa değeri veya tüzükte belirlenen tutar üzerinden giriş payı alınabilir.' },
  { adim: 'Tapu Güncellemesi', detay: 'Tapu tescili henüz yapılmamışsa kooperatif kayıtlarında isim güncellenir; tapu sonrası resmi devir şarttır.' },
];

const RISKLER = [
  { risk: 'Kooperatif İflası', onlem: 'Kooperatifin ticaret siciline tescil ve mali tablolarını inceleyerek kefalet veya teminat alın.' },
  { risk: 'Süre Uzaması', onlem: 'Projenin başlangıç ve bitiş tarihini sözleşmede net belirtin; gecikme tazminatı maddesi ekleyin.' },
  { risk: 'Fark Aidatı Patlaması', onlem: 'Sözleşmede maksimum fark aidatı sınırı ve harcama şeffaflığı maddesi talep edin.' },
  { risk: 'Yönetim Suistimali', onlem: 'Genel kurullara katılın; bağımsız denetçi atanması için oy kullanın.' },
  { risk: 'Konut Kalitesi', onlem: 'İnşaat sürecini yakından takip edin; teknik kontrolörden bağımsız yerinde inceleme yaptırın.' },
  { risk: 'İptal Riski', onlem: 'Sözleşmeyi feshederseniz ödediğiniz miktarın iadesini ve cayma koşullarını kontrol edin.' },
];

const KONTROL_LISTESI = [
  'Kooperatifin Ticaret Sicil kaydını ve tescil belgelerini isteyin.',
  'Son genel kurul kararlarını ve mali tablolarını inceleyin.',
  'Proje için imar durumu ve inşaat ruhsatı alındı mı kontrol edin.',
  'Sözleşmede teslim tarihi, fark aidatı üst sınırı ve cayma koşulları olsun.',
  'Yönetim kurulu üyelerinin özgeçmişini ve referanslarını araştırın.',
  'Hukuki danışmandan sözleşme incelemesi alın.',
  'Ödediklerinizin makbuzunu mutlaka alın; nakit ödemekten kaçının.',
  'Kooperatifin diğer üyeleriyle iletişime geçin, deneyimlerini öğrenin.',
];

export default function KooperatifPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <Users size={13} /> Kooperatif Konut Rehberi
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Kooperatif Konut Rehberi
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            Üyelik, aidat yükümlülükleri, hisse devri, kooperatif riskleri ve kontrol listesi.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-[#00C49F]">1163</p>
              <p className="text-xs text-gray-400">Kooperatifler Kanunu</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">5–15 Yıl</p>
              <p className="text-xs text-gray-400">Ortalama süreç</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-400">Kura</p>
              <p className="text-xs text-gray-400">Konut dağıtımı</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* Türler */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Kooperatif Türleri</h2>
          <div className="space-y-4">
            {KOOPERATIF_TURLERI.map((k, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <p className="text-xs font-black text-gray-900 mb-1">{k.tur}</p>
                <p className="text-[10px] text-gray-600 mb-3 leading-relaxed">{k.aciklama}</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  <div className="bg-gray-50 rounded-lg p-2 col-span-2 sm:col-span-1">
                    <p className="text-[10px] text-gray-400 font-bold mb-0.5">Dayanak</p>
                    <p className="text-[10px] text-gray-600">{k.dayanak}</p>
                  </div>
                  <div className="bg-[#F0FDF8] rounded-lg p-2">
                    <p className="text-[10px] text-[#00C49F] font-bold mb-0.5">Avantaj</p>
                    <p className="text-[10px] text-gray-600">{k.avantaj}</p>
                  </div>
                  <div className="bg-rose-50 rounded-lg p-2">
                    <p className="text-[10px] text-rose-500 font-bold mb-0.5">Dezavantaj</p>
                    <p className="text-[10px] text-gray-600">{k.dezavantaj}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Üyelik Süreci */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Üyelik ve Konut Edinim Süreci</h2>
          <div className="space-y-3">
            {UYELIK_SURECI.map((s, i) => (
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

        {/* Aidat Bilgisi */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <FileText size={14} className="text-[#00C49F]" /> Aidat ve Finansman
          </h2>
          <div className="space-y-3">
            {AIDAT_BILGI.map((a, i) => (
              <div key={i} className="bg-[#F0FDF8] rounded-xl p-3">
                <p className="text-xs font-black text-gray-900 mb-0.5">{a.konu}</p>
                <p className="text-[10px] text-gray-600 leading-relaxed">{a.detay}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Hisse Devri */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Hisse Devri</h2>
          <div className="space-y-3">
            {HISSE_DEVRI.map((s, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm flex items-start gap-3">
                <Scale size={13} className="text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-black text-gray-900 mb-0.5">{s.adim}</p>
                  <p className="text-[10px] text-gray-600 leading-relaxed">{s.detay}</p>
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
            <CheckCircle size={14} className="text-[#00C49F]" /> Kooperatife Girmeden Önce Kontrol Listesi
          </h2>
          <div className="space-y-2">
            {KONTROL_LISTESI.map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <div className="w-4 h-4 rounded border-2 border-[#00C49F]/40 shrink-0 mt-0.5" />
                <p className="text-xs text-gray-700 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Warning */}
        <section className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <AlertTriangle size={14} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 leading-relaxed">
            <span className="font-black">Önemli:</span> Kooperatif konutlarda tapu, inşaat tamamlanıp iskan alındıktan sonra verilir. Bu süreye kadar ödediğiniz para güvencede olmayabilir. İnşaata başlamadan aidat toplamaya devam eden kooperatiflere karşı dikkatli olun.
          </p>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Rehberler</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/kat-karsiligi', label: 'Kat Karşılığı Rehberi' },
              { href: '/taksitli-satis', label: 'Taksitli Satış Rehberi' },
              { href: '/tapu-devir-sureci', label: 'Tapu Devir Süreci' },
              { href: '/kat-mulkiyeti', label: 'Kat Mülkiyeti Rehberi' },
              { href: '/belediye-islemleri', label: 'Belediye İşlemleri' },
              { href: '/rehber/ev-satin-alma', label: 'Ev Satın Alma Rehberi' },
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
