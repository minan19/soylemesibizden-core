import { Metadata } from 'next';
import Link from 'next/link';
import {
  FileText, CheckCircle, AlertTriangle, ArrowRight,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Taşınma Rehberi | Adres Değişikliği, Nakliyeci Seçimi, Checklist | Söylemesi Bizden',
  description:
    'Konut taşıma süreci: nakliyeci seçimi, adres değişikliği işlemleri, fatura devirleri ve taşınma öncesi kontrol listesi.',
};

const TASINMA_TAKVIM = [
  { sure: '8–12 Hafta Önce', isler: ['Nakliyeci teklifleri alın (en az 3)', 'Taşınma tarihini belirleyin', 'Kira sözleşmesini/tapu belgelerini hazırlayın', 'Mevcut evden çıkış bildirimini yapın'] },
  { sure: '4–8 Hafta Önce', isler: ['Eşyaları ayıklayın, kullanılmayacakları satın/bağışlayın', 'Koli ve ambalaj malzemes temin edin', 'Sigortaları ve faturaları listeleyin', 'Çocuk/evcil hayvan için plan yapın'] },
  { sure: '2–4 Hafta Önce', isler: ['Kolilemeye başlayın (nadiren kullanılanlar önce)', 'Eşya envanteri tutun', 'Yeni evin tadilat/temizlik işlerini tamamlayın', 'Nakliyeci ile tarih teyidini alın'] },
  { sure: '1 Hafta Önce', isler: ['Hassas eşyaları (tablolar, antikalar) özel paketleyin', 'Elektronik cihazları hazırlayın', 'Fatura + sözleşme klasörü hazırlayın', 'Komşularla vedalaşın'] },
  { sure: 'Taşınma Günü', isler: ['İlk açılacak koli (temizlik, havlu, ilaç, şarj aleti)', 'Nakliyecinin eşya listesini imzalatın', 'Eski evi kontrol edin (dolap içleri, balkon)', 'Su/elektrik/gaz sayaçlarını okutun'] },
  { sure: 'Taşınmadan Sonra', isler: ['Adres değişikliği e-Devlet üzerinden bildirin', 'Fatura devirlerini tamamlayın', 'Sigortalara adres güncelleyin', 'Bankalar ve özel kurumları bilgilendirin'] },
];

const ADRES_DEGISIKLIGI = [
  { kurum: 'e-Devlet / Nüfus Müdürlüğü', aciklama: 'İkametgah adresi e-Devlet üzerinden veya nüfus müdürlüğüne bizzat gidilerek güncellenir.', sure: 'Anında (e-Devlet)' },
  { kurum: 'Bağlı Vergi Dairesi', aciklama: 'Mükellef iseniz vergi dairesine yazılı bildirim zorunludur; yeni ilçenin dairesine nakil işlemi.', sure: '1–2 hafta' },
  { kurum: 'SGK / İşkur', aciklama: 'SGK hizmet portalından veya ilgili müdürlükten adres güncellemesi yapılır.', sure: '1–5 iş günü' },
  { kurum: 'Bankalar', aciklama: 'İnternet bankacılığı veya şube üzerinden adres güncellemesi; sözleşme adresi farklıysa şube ziyareti gerekir.', sure: '1 gün' },
  { kurum: 'Araç Tescil (Emniyet)', aciklama: 'Araç ruhsatındaki adres değişikliği için trafik tescil bürosuna başvuru gerekir.', sure: '1 gün' },
  { kurum: 'Fatura Abonelikler', aciklama: 'Elektrik (TEDAŞ/BEDAŞ), doğalgaz (İGDAŞ vb.), su (İSKİ vb.) abonelik devri veya yeni açılış.', sure: '1–5 iş günü' },
];

const NAKLIYECI_SECIM = [
  'Vergi levhası, ticaret sicil belgesi ve taşıt kartı olup olmadığını kontrol edin.',
  'En az 3 firmadan yerinde keşif yaptırarak yazılı teklif alın.',
  'Taşıma sırasında hasar sigortası teklife dahil mi? Sorun.',
  'Referans ve Google yorumlarını araştırın; yakın tarihli taşımacılara bakın.',
  'Sözleşmeye taşınan eşya listesi ve değer tespiti ekleyin.',
  'Ödeme nakit değil banka havalesiyle yapın; makbuz isteyin.',
  'Taşıma günü ekibin kaç kişilik olduğunu önceden öğrenin.',
];

const FATURA_DEVIR = [
  { hizmet: 'Elektrik', adim: 'Mevcut aboneliği iptal + yeni adrese abonelik aç veya devret', online: true },
  { hizmet: 'Doğalgaz', adim: 'Bağlı olduğunuz dağıtım şirketine müracaat; sayaç okutun', online: false },
  { hizmet: 'Su', adim: 'Belediye su idaresine şahsen veya e-Devlet üzerinden bildirim', online: true },
  { hizmet: 'İnternet / Telefon', adim: 'Operatör müşteri hizmetleri üzerinden adres ve teknik hizmet güncellemesi', online: true },
  { hizmet: 'Doğalgaz (bireysel)', adim: 'BOTAŞ/dağıtım şirketi abonelik transferi; borcun olmadığını belgelemek', online: false },
];

const HASAR_TAZMINAT = [
  'Taşıma öncesi eşyaları fotoğraflayın; hasar tespit tutanağı düzenleyin.',
  'Nakliyeci ile sözleşmeye hasar durumunda "yeni değer" mi "piyasa değeri" mi ödeneceğini yazın.',
  'Yüksek değerli eşyalar için ayrıca nakliye sigortası poliçesi alabilirsiniz.',
  'Hasar nakliye şirketine derhal (24 saat içinde) yazılı olarak bildirin.',
  'Anlaşmazlıkta tüketici hakem heyetine başvurabilirsiniz.',
];

export default function TasinmaRehberiPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <FileText size={13} /> Taşınma Rehberi
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Taşınma Rehberi
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            Nakliyeci seçimi, adres değişikliği, fatura devri ve 8 haftaya yayılan taşınma takvimi.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-[#00C49F]">8 Hafta</p>
              <p className="text-xs text-gray-400">Planlama süresi</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">e-Devlet</p>
              <p className="text-xs text-gray-400">Adres değişikliği</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-400">3 Teklif</p>
              <p className="text-xs text-gray-400">Nakliyeci minimum</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* Taşınma Takvimi */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Taşınma Takvimi</h2>
          <div className="space-y-4">
            {TASINMA_TAKVIM.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <div className="inline-flex items-center gap-2 bg-[#00C49F]/10 text-[#00C49F] text-xs font-black px-3 py-1 rounded-full mb-3">
                  {t.sure}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {t.isler.map((is, j) => (
                    <div key={j} className="flex items-start gap-2">
                      <div className="w-4 h-4 rounded border-2 border-[#00C49F]/40 shrink-0 mt-0.5" />
                      <p className="text-xs text-gray-700 leading-relaxed">{is}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Adres Değişikliği */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Adres Değişikliği İşlemleri</h2>
          <div className="space-y-3">
            {ADRES_DEGISIKLIGI.map((a, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm flex items-start gap-3">
                <div className="bg-blue-50 text-blue-600 text-[10px] font-black px-2 py-1 rounded-lg shrink-0 text-center min-w-[60px]">{a.sure}</div>
                <div>
                  <p className="text-xs font-black text-gray-900 mb-0.5">{a.kurum}</p>
                  <p className="text-[10px] text-gray-600 leading-relaxed">{a.aciklama}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Fatura Devri */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle size={14} className="text-[#00C49F]" /> Fatura ve Abonelik Devri
          </h2>
          <div className="space-y-3">
            {FATURA_DEVIR.map((f, i) => (
              <div key={i} className="flex items-start gap-3 py-2 border-b border-gray-50 last:border-0">
                <div className={`text-[10px] font-black px-2 py-1 rounded-lg shrink-0 ${f.online ? 'bg-[#F0FDF8] text-[#00C49F]' : 'bg-amber-50 text-amber-600'}`}>
                  {f.online ? 'Online' : 'Şahsen'}
                </div>
                <div>
                  <p className="text-xs font-black text-gray-900 mb-0.5">{f.hizmet}</p>
                  <p className="text-[10px] text-gray-600 leading-relaxed">{f.adim}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Nakliyeci Seçimi */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4">Nakliyeci Seçimi İpuçları</h2>
          <div className="space-y-2">
            {NAKLIYECI_SECIM.map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00C49F] shrink-0 mt-1.5" />
                <p className="text-xs text-gray-700 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Hasar Tazminat */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4">Hasar ve Tazminat</h2>
          <div className="space-y-2">
            {HASAR_TAZMINAT.map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" />
                <p className="text-xs text-gray-700 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Warning */}
        <section className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <AlertTriangle size={14} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 leading-relaxed">
            <span className="font-black">Önemli:</span> İkametgah adresinizi güncellemek yasal yükümlülüktür. Seçimler, vergi bildirimleri ve SGK işlemleri için doğru adres kayıtlı olmalıdır. Taşındıktan sonra en geç 20 iş günü içinde güncelleyin.
          </p>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Rehberler</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/kira-sozlesmesi', label: 'Kira Sözleşmesi Rehberi' },
              { href: '/depozito', label: 'Depozito Rehberi' },
              { href: '/tadilat-rehberi', label: 'Tadilat Rehberi' },
              { href: '/konut-sigortasi', label: 'Konut Sigortası' },
              { href: '/rehber/kiralama-rehberi', label: 'Kiralama Rehberi' },
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
