import { Metadata } from 'next';
import Link from 'next/link';
import { Shield, CheckCircle, AlertTriangle, ArrowRight, Scale } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Kiracı Hakları Rehberi 2024 | TBK, Tahliye, Artış Sınırı | Söylemesi Bizden',
  description:
    'Türkiye\'de kiracı hakları: kira artış tavanı, haksız tahliyeye karşı korunma, depozito iadesi, bakım yükümlülükleri ve arabuluculuk süreci.',
};

const TEMEL_HAKLAR = [
  {
    hak: 'Kira Artış Tavanı (2024)',
    aciklama: 'Konut kiralarında yıllık artış TÜFE (bir önceki 12 aylık ortalama) ile sınırlıdır. 2024 itibarıyla bu oran ayrıca %25 ek tavan uygulaması kapsamındadır.',
    kaynak: 'TBK 344 + Geçici Madde',
    onem: 'Kritik',
  },
  {
    hak: 'Tahliyeye Karşı Güvence',
    aciklama: 'Kiraya veren, belirli yasal nedenler dışında kiracıyı çıkaramaz. İhtiyaç, yeniden inşa, 10 yıl dolması veya temerrüt bu nedenler arasındadır.',
    kaynak: 'TBK 347–356',
    onem: 'Kritik',
  },
  {
    hak: 'Depozito İadesi',
    aciklama: 'Kiracının çıkışından sonra hasar yoksa depozito iade edilir. Mal sahibi, iade için kiranın sona ermesinden itibaren 3 aya kadar bekleyebilir.',
    kaynak: 'TBK 342',
    onem: 'Yüksek',
  },
  {
    hak: 'Bakım ve Onarım Hakkı',
    aciklama: 'Büyük onarımlar (ısıtma, su tesisatı, çatı) kiraya verene aittir. Kiracı küçük bakımları yapmakla yükümlüdür; büyük onarımları talep etme hakkı vardır.',
    kaynak: 'TBK 317–319',
    onem: 'Önemli',
  },
  {
    hak: 'Sözleşmeyi Devir Hakkı',
    aciklama: 'İşyeri kiraları kiraya verenin onayıyla devredilebilir. Konut kirasında devir için mal sahibi izni şarttır (TBK 322).',
    kaynak: 'TBK 322',
    onem: 'Orta',
  },
  {
    hak: 'Sessiz Kullanım Hakkı',
    aciklama: 'Kiraya veren, kiralananı sürekli ziyaret ederek veya taciz ederek kiracının kullanımını engelleyemez.',
    kaynak: 'TBK 301',
    onem: 'Önemli',
  },
];

const TAHLIYELERE_ITIRAZ = [
  {
    neden: 'Kira Temerrüdü',
    surec: 'Mal sahibi yazılı ihtar gönderir. Kiracı 30 gün içinde borcunu öderse tahliye durur. İki kez temerrüt halinde bir kira yılı boyunca tekrar başvuru yapılabilir.',
    kiraci_hakki: '30 gün ödeme hakkı',
  },
  {
    neden: 'Ev Sahibinin İhtiyacı',
    surec: 'Mal sahibi veya birinci derece yakınının ihtiyacını bildirmesi gerekir. Tahliye kararı 6 ay önceden verilmeli; 3 yıl içinde yeniden kiralanırsa kiracıya tazminat ödenir.',
    kiraci_hakki: '3 yıl koruma / tazminat',
  },
  {
    neden: 'Yeniden İnşa veya Onarım',
    surec: 'Yapının kullanılamaz hale gelmesi veya esaslı onarım gerektirmesi. Kiracıya onarım sonrası önce kiralama hakkı tanınmalıdır.',
    kiraci_hakki: 'Geri dönüş önceliği',
  },
  {
    neden: '10 Yıl Sonrası Fesih',
    surec: 'Kiraya veren, 10 yılı aşan kiralarda herhangi bir neden göstermeksizin 3 ay bildirimle sözleşmeyi feshedebilir.',
    kiraci_hakki: '3 aylık ek süre',
  },
];

const DEPOZITO_KURALLARI = [
  'Azami 3 aylık kira bedeli alınabilir (TBK 342)',
  'Kira süresi bitiminde hasar yoksa iade edilir',
  'Mal sahibi, iade için en fazla 3 ay bekleyebilir',
  'Gereksiz kesinti yapılırsa kiracı dava açabilir',
  'Depozito, vadeli hesapta tutulabilir; faiz kiracıya ait',
  'Kira sözleşmesinde depozito miktarı ve iade koşulları açık olmalı',
];

const ARABULUCULUK = [
  { adim: '1', aciklama: 'Dava açmadan önce arabuluculuk zorunlu (2023 sonrası kira uyuşmazlıkları için).' },
  { adim: '2', aciklama: 'Taraflardan biri arabuluculuğa başvurur; diğer taraf çağrılır. Ret hakkı vardır.' },
  { adim: '3', aciklama: 'Uzlaşma sağlanırsa imzalanan tutanak mahkeme ilamı gibi icra edilir.' },
  { adim: '4', aciklama: 'Uzlaşma sağlanamazsa "arabuluculuk son tutanağı" alınarak dava yoluna gidilir.' },
];

const PRATIK_IPUCU = [
  'Her yazışmayı (ödeme, şikayet, tahliye ihtarı) yazılı ve belgelenmiş şekilde yapın.',
  'Kira ödemelerini daima banka havalesi ile yapın; elden ödeme ispat güçlüğü yaratır.',
  'Taşınmadan önce fotoğraflı teslim tutanağı düzenleyin.',
  'Sayaç endekslerini (elektrik, su, doğalgaz) giriş-çıkışta kaydedin.',
  'Artış ihbarını zamanında yapın; sözleşme yenilenmeden artış uygulanamaz.',
  'Kiranızı düzensiz ödüyorsanız "temerrüt" ihtarına karşı 30 günlük süreyi iyi kullanın.',
];

export default function KiraciHaklariPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <Shield size={13} /> Kiracı Hakları Rehberi
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Kiracı Hakları Rehberi 2024
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            Kira artış tavanı, tahliyeye karşı korunma, depozito iadesi ve TBK kapsamındaki tüm kiracı hakları.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-[#00C49F]">%25</p>
              <p className="text-xs text-gray-400">2024 artış tavanı</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">30 Gün</p>
              <p className="text-xs text-gray-400">Temerrüt ödeme hakkı</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-400">TBK</p>
              <p className="text-xs text-gray-400">Temel yasal çerçeve</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* Temel Haklar */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Temel Kiracı Hakları</h2>
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

        {/* Tahliyeye İtiraz */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Tahliye Nedenlerine Karşı Haklarınız</h2>
          <div className="space-y-4">
            {TAHLIYELERE_ITIRAZ.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <div className="flex items-start justify-between mb-2">
                  <p className="text-xs font-black text-gray-900">{t.neden}</p>
                  <span className="text-[10px] bg-[#F0FDF8] text-[#00C49F] font-black px-2 py-0.5 rounded ml-2 shrink-0">{t.kiraci_hakki}</span>
                </div>
                <p className="text-[10px] text-gray-600 leading-relaxed">{t.surec}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Depozito */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <Scale size={14} className="text-[#00C49F]" /> Depozito Hakları (TBK 342)
          </h2>
          <div className="space-y-2">
            {DEPOZITO_KURALLARI.map((d, i) => (
              <div key={i} className="flex items-start gap-2 py-2 border-b border-gray-50 last:border-0">
                <CheckCircle size={12} className="text-[#00C49F] shrink-0 mt-0.5" />
                <p className="text-xs text-gray-700">{d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Arabuluculuk */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4">Arabuluculuk Süreci (2023 Zorunlu)</h2>
          <div className="space-y-3">
            {ARABULUCULUK.map((a, i) => (
              <div key={i} className="flex gap-4 py-2 border-b border-gray-50 last:border-0">
                <div className="w-7 h-7 rounded-full bg-[#00C49F] text-white text-xs font-black flex items-center justify-center shrink-0">{a.adim}</div>
                <p className="text-xs text-gray-700 leading-relaxed self-center">{a.aciklama}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pratik İpuçları */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle size={14} className="text-[#00C49F]" /> Pratik Koruma İpuçları
          </h2>
          <div className="space-y-2">
            {PRATIK_IPUCU.map((ip, i) => (
              <div key={i} className="flex items-start gap-2 py-2 border-b border-gray-50 last:border-0">
                <CheckCircle size={12} className="text-[#00C49F] shrink-0 mt-0.5" />
                <p className="text-xs text-gray-700 leading-relaxed">{ip}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Uyarı */}
        <section className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <AlertTriangle size={14} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 leading-relaxed">
            <span className="font-black">Önemli:</span> Bu rehber genel bilgi amaçlıdır. Tahliye davası, depozito uyuşmazlığı veya kira artışına itiraz durumlarında bir avukattan destek almanız tavsiye edilir. Kira mevzuatı sık değişir; haklarınızı öğrenmek için en güncel TBK metinlerini takip edin.
          </p>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Araçlar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/kira-sozlesmesi-ornegi', label: 'Kira Sözleşmesi Örneği' },
              { href: '/tahliye-davasi', label: 'Tahliye Davası Rehberi' },
              { href: '/kira-tespit-davasi', label: 'Kira Tespit Davası' },
              { href: '/depozito', label: 'Depozito Rehberi' },
              { href: '/kira-artis-hesaplama', label: 'Kira Artış Hesaplayıcı' },
              { href: '/rehber/kiralama-rehberi', label: 'Kiralama Rehberi' },
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
