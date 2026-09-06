import { Metadata } from 'next';
import Link from 'next/link';
import { Home, CheckCircle, AlertTriangle, ArrowRight, Scale } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Mal Sahibi Hakları Rehberi 2024 | Tahliye, Kira Tespit, TBK | Söylemesi Bizden',
  description:
    'Ev sahiplerinin hakları: kira tespiti, temerrüt halinde tahliye, ihtiyaç ve yeniden inşa nedeniyle tahliye, kira artışı ve sözleşme sonlandırma.',
};

const TEMEL_HAKLAR = [
  {
    hak: 'Kira Bedeli Tespiti Davası',
    aciklama: 'Kira piyasa değerinin altında kalmışsa mal sahibi mahkemeden kira tespiti isteyebilir. TBK 344 kapsamında 5 yıl sonra endeks üstü artış talep edilebilir.',
    kaynak: 'TBK 344',
    onem: 'Yüksek',
  },
  {
    hak: 'Temerrüt Halinde Tahliye',
    aciklama: 'Kiracı 2 kira döneminde temerrüde düşerse mal sahibi yazılı ihtarla tahliye sürecini başlatabilir.',
    kaynak: 'TBK 315',
    onem: 'Kritik',
  },
  {
    hak: 'İhtiyaç Nedeniyle Tahliye',
    aciklama: 'Mal sahibi veya birinci derece yakınının konut ihtiyacı olduğunda, en az 6 ay önceden ihtarla tahliye talep edilebilir.',
    kaynak: 'TBK 350',
    onem: 'Kritik',
  },
  {
    hak: 'Yeniden İnşa/Esaslı Onarım',
    aciklama: 'Binanın kullanımını engelleyen büyük onarımlar için tahliye talep edilebilir; ancak kiracıya geri dönüş hakkı tanınmalıdır.',
    kaynak: 'TBK 350',
    onem: 'Orta',
  },
  {
    hak: '10 Yıl Sonrası Fesih',
    aciklama: 'Sözleşme 10 yılı aşmışsa mal sahibi neden göstermeksizin 3 aylık bildirimle sözleşmeyi sonlandırabilir.',
    kaynak: 'TBK 347',
    onem: 'Yüksek',
  },
  {
    hak: 'Kiralananın Korunması',
    aciklama: 'Kiracı sözleşmede belirtilen amacın dışında kullanamaz, izinsiz değişiklik yapamaz, izinsiz alt kiralayamaz.',
    kaynak: 'TBK 316, 321, 322',
    onem: 'Önemli',
  },
];

const TAHLIYE_SURECI = [
  { adim: '1. İhtar Gönder', aciklama: 'Temerrüt nedeniyle tahliyede kiracıya noter aracılığıyla veya iadeli taahhütlü yazılı ihtar gönderilir. Otuz (30) günlük süre tanınır.' },
  { adim: '2. Arabuluculuk', aciklama: '2023 sonrası kira uyuşmazlıklarında dava öncesi arabuluculuk zorunludur. Anlaşma sağlanamazsa son tutanak alınır.' },
  { adim: '3. Sulh Hukuk Mahkemesi', aciklama: 'Tahliye davası, kiralananın bulunduğu yerdeki sulh hukuk mahkemesinde açılır. Basit yargılama usulü uygulanır.' },
  { adim: '4. Karar ve İcra', aciklama: 'Mahkeme tahliye kararı verirse kiracı yasal süre içinde çıkmak zorundadır; aksi halde icra yoluyla zorla tahliye uygulanır.' },
];

const TEMERRUT_PROTOKOLU = [
  'Kira ödemesi belirlenen tarihten sonra 30 günü geçtiğinde temerrüt oluşur',
  'Mal sahibi noterden ihtarname gönderir; 30 günlük süre verilir',
  'Kiracı süre içinde ödeme yaparsa bu sefer tahliye davası açılamaz',
  'Aynı kira yılında ikinci kez temerrüt gerçekleşirse tahliye hakkı doğar',
  'İki kez temerrüt belgelenmeden ihtarname gönderilmesi yeterli değildir',
  'Banka dekontu olmayan ödeme (elden) ispatta sıkıntı yaratabilir',
];

const SOZLESME_IPUCLARI = [
  { ipucu: 'Kiracı Referansı', aciklama: 'İşe yeni başlamadan önce işveren veya banka referansı, gelir belgesi isteyin.' },
  { ipucu: 'Kefalet / Teminat', aciklama: 'Kefalet senedi (noter onaylı) veya ek teminat ödeme güvencesi sağlar.' },
  { ipucu: 'Fotoğraflı Teslim', aciklama: 'Mülkü teslim ederken tüm odaların fotoğrafını çekin; depozito anlaşmazlığında belge olur.' },
  { ipucu: 'Sigorta', aciklama: 'Konut sigortasını kiracının yaptırmasını sözleşmeye ekleyin; hasar kaybını minimize eder.' },
  { ipucu: 'İletişim Kanalı', aciklama: 'Tüm yazışmaları belgelenmiş kanallardan (e-posta, noter) yapın; "söyledim" ispatsız kalır.' },
  { ipucu: 'Periyodik Kontrol', aciklama: 'Yılda bir kez randevuyla mülk kontrolü yapma hakkını sözleşmeye ekleyin.' },
];

const KIRA_ARTIS_KURALLARI = [
  { kural: 'Artış Bildirimi', aciklama: 'Yeni dönem başlamadan artış miktarını kiracıya bildirin; dönem içinde artış yapılamaz.' },
  { kural: '2024 Tavan', aciklama: 'Konut kiralarında yıllık artış TÜFE ortalamasıyla sınırlı; ek %25 tavan uygulaması.' },
  { kural: '5 Yıl Kuralı', aciklama: '5 yıl sonra endeks üstü artış için mahkemeden kira tespiti istenilebilir.' },
  { kural: 'İşyeri Kirası', aciklama: 'İşyeri kiralarında özel kira artış tavanı yoktur; sözleşmede kararlaştırılan oran geçerli.' },
];

export default function MalSahibiHaklariPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <Home size={13} /> Mal Sahibi Hakları Rehberi
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Mal Sahibi Hakları Rehberi 2024
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            Kira tespiti, temerrüt halinde tahliye, ihtiyaç ve 10 yıl sonrası fesih haklarınız hakkında kapsamlı rehber.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-[#00C49F]">30 Gün</p>
              <p className="text-xs text-gray-400">Temerrüt ihtar süresi</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">10 Yıl</p>
              <p className="text-xs text-gray-400">Nedensiz fesih hakkı</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-400">TBK</p>
              <p className="text-xs text-gray-400">299–378. Madde</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* Temel Haklar */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Temel Mal Sahibi Hakları</h2>
          <div className="space-y-4">
            {TEMEL_HAKLAR.map((h, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <div className="flex items-start justify-between mb-2">
                  <p className="text-xs font-black text-gray-900">{h.hak}</p>
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded ml-2 shrink-0 ${
                    h.onem === 'Kritik' ? 'bg-rose-50 text-rose-600' :
                    h.onem === 'Yüksek' ? 'bg-amber-50 text-amber-600' :
                    'bg-gray-100 text-gray-600'
                  }`}>{h.onem}</span>
                </div>
                <p className="text-[10px] text-gray-600 mb-2 leading-relaxed">{h.aciklama}</p>
                <p className="text-[10px] text-[#00C49F] font-bold">{h.kaynak}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tahliye Süreci */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Tahliye Süreci</h2>
          <div className="space-y-3">
            {TAHLIYE_SURECI.map((a, i) => (
              <div key={i} className="flex gap-4 bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                <div className="w-8 h-8 rounded-full bg-[#00C49F] text-white text-[10px] font-black flex items-center justify-center shrink-0">{i + 1}</div>
                <div>
                  <p className="text-xs font-black text-gray-900 mb-1">{a.adim}</p>
                  <p className="text-[10px] text-gray-600 leading-relaxed">{a.aciklama}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Temerrüt Protokolü */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <Scale size={14} className="text-[#00C49F]" /> Temerrüt Protokolü
          </h2>
          <div className="space-y-2">
            {TEMERRUT_PROTOKOLU.map((t, i) => (
              <div key={i} className="flex items-start gap-2 py-2 border-b border-gray-50 last:border-0">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00C49F] mt-1.5 shrink-0" />
                <p className="text-xs text-gray-700 leading-relaxed">{t}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Kira Artış Kuralları */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Kira Artış Hakları ve Kuralları</h2>
          <div className="space-y-3">
            {KIRA_ARTIS_KURALLARI.map((k, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                <p className="text-xs font-black text-gray-900 mb-1">{k.kural}</p>
                <p className="text-[10px] text-gray-600 leading-relaxed">{k.aciklama}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Sözleşme İpuçları */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle size={14} className="text-[#00C49F]" /> Sözleşme ve Yönetim İpuçları
          </h2>
          <div className="space-y-3">
            {SOZLESME_IPUCLARI.map((s, i) => (
              <div key={i} className="py-2 border-b border-gray-50 last:border-0">
                <p className="text-xs font-black text-gray-900 mb-1">{s.ipucu}</p>
                <p className="text-[10px] text-gray-600 leading-relaxed">{s.aciklama}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Uyarı */}
        <section className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <AlertTriangle size={14} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 leading-relaxed">
            <span className="font-black">Önemli:</span> Tahliye davası uzun ve masraflı bir süreçtir. Temerrüt ihtarını noter kanalıyla göndermeyi, tüm yazışmaları belgelemeyi ve süreç boyunca bir avukattan destek almayı ihmal etmeyin.
          </p>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Araçlar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/kiraci-haklari', label: 'Kiracı Hakları Rehberi' },
              { href: '/tahliye-davasi', label: 'Tahliye Davası Rehberi' },
              { href: '/kira-tespit-davasi', label: 'Kira Tespit Davası' },
              { href: '/kira-sozlesmesi-ornegi', label: 'Kira Sözleşmesi Örneği' },
              { href: '/kira-artis-hesaplama', label: 'Kira Artış Hesaplayıcı' },
              { href: '/kira-geliri-vergisi', label: 'Kira Geliri Vergisi' },
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
