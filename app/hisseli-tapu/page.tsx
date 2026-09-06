import { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, AlertTriangle, ArrowRight, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Hisseli Tapu Rehberi | Şufa Hakkı, Ortaklık Giderme | Söylemesi Bizden',
  description:
    'Hisseli tapu nedir? Şufa (önalım) hakkı, ortaklığın giderilmesi davası, hisseli mülk satışı ve yönetimi hakkında kapsamlı rehber.',
};

const HISSELI_TAPU_NEDIR = [
  { baslik: 'Paylı Mülkiyet', aciklama: 'Birden fazla kişinin aynı taşınmaz üzerinde belirli pay oranlarıyla birlikte mülkiyet hakkına sahip olmasıdır. Her hissedar tapuda payı oranında malik görünür.' },
  { baslik: 'Nasıl Oluşur?', aciklama: 'Miras yoluyla (en yaygın), ortaklaşa satın alma, tapu ifrazı veya mahkeme kararıyla oluşabilir. Kooperatif tapuları da hisseli olabilir.' },
  { baslik: 'Tapu Belgesi', aciklama: 'Hisseli tapuda her hissedarın payı kesirle gösterilir (örn. 1/3, 2/5). Tapu senedinde "paylı mülkiyet" ibaresi ve pay oranı yer alır.' },
  { baslik: 'Fiziksel Bölünme Yok', aciklama: 'Hisseli tapuda taşınmazın fiziksel olarak bölünmüş kısmı değil, soyut pay oranı sahipliği söz konusudur. Belirli bölümün kimde olduğu tapu kütüğünde yazmaz.' },
];

const HAKLAR_VE_YUKUMLULUKLER = [
  { konu: 'Kendi Payını Satma', aciklama: 'Her hissedar, diğer hissedarların onayına gerek kalmaksızın kendi payını üçüncü kişilere satabilir. Ancak satış öncesi şufa hakkı bildirimi zorunludur.' },
  { konu: 'Şufa (Önalım) Hakkı', aciklama: 'Bir hissedar payını satmak istediğinde, diğer hissedarlar 3 ay içinde aynı bedel ve koşullarda öncelikli satın alma hakkına sahiptir (TMK md. 732–735).' },
  { konu: 'Kullanım Hakkı', aciklama: 'Her hissedar, payı oranında taşınmazı kullanma hakkına sahiptir. Ortak kullanım kuralları hissedarlar arasında yazılı sözleşmeyle belirlenebilir.' },
  { konu: 'Kira Geliri Paylaşımı', aciklama: 'Kiraya verilen hisseli taşınmazda kira geliri hisse oranında paylaşılır. Bu kararı hissedarların çoğunluğu alabilir.' },
  { konu: 'Masraf Paylaşımı', aciklama: 'Taşınmazın bakım, onarım, vergi ve sigorta masrafları hisse oranında tüm hissedarlar tarafından paylaşılır.' },
  { konu: 'Önemli Kararlar', aciklama: 'Yapı onarımı, ipotek kurulması, kiraya verme gibi önemli kararlar oyçokluğuyla (pay oranına göre) alınır. Olağanüstü kararlar (yıkım, satış) oybirliği gerektirir.' },
];

const ORTAKLIK_GIDERILMESI = [
  { adim: 'Anlaşarak Bölüşme', aciklama: 'Hissedarlar kendi aralarında anlaşarak taşınmazı bölüştürebilir veya bir hissedar diğerlerinin payını satın alabilir.', sure: 'En Hızlı' },
  { adim: 'Dava Açma', aciklama: 'Anlaşma sağlanamazsa herhangi bir hissedar "ortaklığın giderilmesi (izale-i şuyu)" davası açabilir. Dava açmak için gerekçe gösterme zorunluluğu yoktur.', sure: '6–18 Ay' },
  { adim: 'Mahkeme Kararı', aciklama: 'Mahkeme, taşınmazın aynen taksiminin mümkün olup olmadığını inceler. Mümkünse aynen böler; değilse açık artırmayla satışına karar verir.', sure: 'Duruşma Süresi' },
  { adim: 'Açık Artırma', aciklama: 'Taşınmaz icra yoluyla satışa çıkarılır. Satış bedeli hissedar sayısına ve pay oranına göre paylaştırılır.', sure: '1–6 Ay' },
  { adim: 'Kesinleşme', aciklama: 'Satış tamamlandıktan sonra tapu yeni alıcı adına tescil edilir; hisseli mülkiyet sona erer.', sure: 'İşlem Bitişi' },
];

const SIK_SORUNLAR = [
  { sorun: 'Bilinmeyen Hissedar', cozum: 'Miras yoluyla defalarca el değiştiren mülklerde bazı hissedarlar bilinmeyebilir. Tapu müdürlüğünden ve nüfus kayıtlarından araştırma yapılır.' },
  { sorun: 'İletişim Yokluğu', cozum: 'Hissedarlar arasında iletişim kurulamazsa noter aracılığıyla tebligat yapılır; bilinen son adrese yazılı bildirim gönderilir.' },
  { sorun: 'Miras Borcları', cozum: 'Hisseli tapuya dahil varlıkta borç varsa, ortaklık giderilmesi davası öncesinde borç durumu tapu sicilinden araştırılmalıdır.' },
  { sorun: 'Satışa Engel Hissedar', cozum: 'Diğer hissedarların satışı engellemesi hukuken mümkün değildir; herhangi bir hissedar payını satabilir veya ortaklık giderimi davası açabilir.' },
];

const PRATIK_BILGILER = [
  { bilgi: 'Şufa Hakkı Süresi', detay: '3 ay kesin süre; bu süre içinde kullanılmayan şufa hakkı düşer. Satışın öğrenilmesinden itibaren süre başlar.' },
  { bilgi: 'Noterden Satış Bildirimi', detay: 'Şufa hakkı kullandırmak için payın satılacağını noter aracılığıyla diğer hissedarlara bildirmek iyi uygulama olarak önerilir.' },
  { bilgi: 'Hisseli Kredi', detay: 'Bankalar hisseli tapuya ipotek koymaktan kaçınır. Tüm hissedarların onayı olmadan kredi kullanmak oldukça güçtür.' },
  { bilgi: 'İmar Durumu', detay: 'Hisseli tapuda imar planı ve yapılaşma haklarından da ortak yararlanılır; bağımsız kat inşası için yönetim planı ve tüm hissedarların onayı gerekir.' },
];

export default function HisseliTapuPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <Users size={13} /> Hisseli Tapu
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Hisseli Tapu Rehberi
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            Paylı mülkiyet hakları, şufa hakkı, ortaklığın giderilmesi davası ve hisseli mülk yönetimi hakkında kapsamlı rehber.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-[#00C49F]">3 Ay</p>
              <p className="text-xs text-gray-400">Şufa hakkı süresi</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">TMK 732</p>
              <p className="text-xs text-gray-400">Yasal dayanak</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-400">6–18 Ay</p>
              <p className="text-xs text-gray-400">Dava süresi</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* Hisseli Tapu Nedir */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4">Hisseli Tapu Nedir?</h2>
          <div className="space-y-3">
            {HISSELI_TAPU_NEDIR.map((h, i) => (
              <div key={i} className="grid grid-cols-3 gap-2 py-2 border-b border-gray-50 last:border-0">
                <p className="text-xs font-black text-[#00C49F]">{h.baslik}</p>
                <p className="text-[10px] text-gray-600 leading-relaxed col-span-2">{h.aciklama}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Haklar ve Yükümlülükler */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Hissedar Hakları ve Yükümlülükleri</h2>
          <div className="space-y-3">
            {HAKLAR_VE_YUKUMLULUKLER.map((h, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                <p className="text-xs font-black text-[#00C49F] mb-1">{h.konu}</p>
                <p className="text-[10px] text-gray-600 leading-relaxed">{h.aciklama}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Ortaklığın Giderilmesi */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Ortaklığın Giderilmesi (İzale-i Şuyu)</h2>
          <div className="space-y-3">
            {ORTAKLIK_GIDERILMESI.map((a, i) => (
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

        {/* Sık Sorunlar */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4">Sık Karşılaşılan Sorunlar</h2>
          <div className="space-y-3">
            {SIK_SORUNLAR.map((s, i) => (
              <div key={i} className="grid grid-cols-3 gap-2 py-2 border-b border-gray-50 last:border-0">
                <p className="text-xs font-black text-rose-500">{s.sorun}</p>
                <p className="text-[10px] text-gray-600 leading-relaxed col-span-2">{s.cozum}</p>
              </div>
            ))}
          </div>
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
            <span className="font-black">Önemli:</span> Hisseli tapu ile ilgili hukuki süreçlerde (şufa hakkı kullanımı, ortaklık giderimi davası) gayrimenkul hukuku alanında uzman bir avukattan destek almanız zaman ve maliyet tasarrufu sağlar.
          </p>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Araçlar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/miras-ve-gayrimenkul', label: 'Miras ve Gayrimenkul Rehberi' },
              { href: '/tapu-devir-rehberi', label: 'Tapu Devir Rehberi' },
              { href: '/tapu-masrafi', label: 'Tapu Masrafı Hesaplayıcı' },
              { href: '/gayrimenkul-vergi-optimizasyon', label: 'Vergi Optimizasyonu' },
              { href: '/sozlesme-iptal-cayma', label: 'Sözleşme İptal Rehberi' },
              { href: '/rehber', label: 'Konut Rehberi' },
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
