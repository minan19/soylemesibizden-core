import { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, AlertTriangle, ArrowRight, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Depozito Yönetimi Rehberi | Kira Güvencesi, İade Koşulları | Söylemesi Bizden',
  description:
    'Kira depozitosu nedir, ne kadar olmalı? İade koşulları, yasal haklar ve depozito anlaşmazlıklarında çözüm yolları rehberi.',
};

const DEPOZITO_KURALLARI = [
  { baslik: 'Yasal Üst Sınır', aciklama: 'Türk Borçlar Kanunu m.342 gereği kira güvencesi (depozito) en fazla 3 aylık kira bedelini geçemez. Bu sınırı aşan miktarı ödeme zorunluluğunuz yoktur.', vurgu: 'Max 3 Aylık Kira' },
  { baslik: 'Saklama Yükümlülüğü', aciklama: 'Depozito olarak verilen para, kiraya veren tarafından kiracının rızası olmadan kullanılamaz; vadeli hesapta veya banka güvencesinde tutulmalıdır.', vurgu: 'Vadeli Hesap' },
  { baslik: 'Faiz Hakkı', aciklama: 'Kira sözleşmesi sona erdiğinde kiracıya depozito ile birlikte birikmiş faiz geliri de iade edilmelidir.', vurgu: 'Faiz Dahil İade' },
  { baslik: 'İade Süresi', aciklama: 'Kiralananın boşaltılması ve anahtarın tesliminden itibaren makul süre içinde (genellikle 15–30 gün) iade yapılmalıdır.', vurgu: '15–30 Gün' },
];

const KESINTI_HAKKLI = [
  { durum: 'Kira Borcu', aciklama: 'Kiracının ödemediği kira veya yan giderler (aidat, su, elektrik) depozitoda mahsup edilebilir.' },
  { durum: 'Hasarlı Taşınmaz', aciklama: 'Normal kullanım aşınması dışında oluşan zarar (kırık cam, delinmiş duvar, boyalı zemin) depozitoya yansıtılabilir.' },
  { durum: 'Eksik Eşya', aciklama: 'Eşyalı kiralamalarda teslim listesinde yer alan eksik eşyalar kesilir.' },
  { durum: 'Temizlik Masrafı', aciklama: 'Kiracının kirlettiği, ancak olağan temizliğin ötesine geçen alanlar için masraf kesilebilir.' },
];

const KESINTI_HAKSIZ = [
  { durum: 'Normal Aşınma ve Yıpranma', aciklama: 'Uzun süreli kullanımdan kaynaklanan eskime (boya solması, zemin çizikleri) olağan kabul edilir; kesilmez.' },
  { durum: 'Önceden Mevcut Hasarlar', aciklama: 'Kiracı taşınmadan önce var olan kusurlar kiracıya yüklenemez; bu yüzden giriş tutanağı kritiktir.' },
  { durum: 'Beğenilmeyen Tadilat', aciklama: 'Kiraya verenin izniyle yapılan tadilatlar, sonradan beğenilmese de kesintiye gerekçe olamaz.' },
  { durum: 'Eski Eşyalar', aciklama: 'Aşınmış/kullanım ömrü dolmuş eşyaların yenisiyle değiştirilmesi talep edilemez.' },
];

const ANLASMAZLIK_COZUM = [
  { adim: 'Yazılı İhtarname', aciklama: 'Depozitonun iadesini noter kanalıyla yazılı olarak talep edin; bu belge mahkemede delil olur.' },
  { adim: 'Arabuluculuk', aciklama: 'Dava açmadan önce Arabuluculuk Bürosu\'na başvurun; hızlı ve düşük maliyetli çözüm sağlanabilir.' },
  { adim: 'Sulh Hukuk Mahkemesi', aciklama: 'Değer 500.000 ₺ altındaki alacaklar için Sulh Hukuk Mahkemesi\'ne başvurabilirsiniz.' },
  { adim: 'İcra Takibi', aciklama: 'Mahkeme kararı kesinleşirse icra yoluyla tahsilat yapılabilir; kiraya verenin malvarlığına haciz uygulanabilir.' },
];

const PRATIK_IPUCLARI = [
  { ipucu: 'Giriş Tutanağı', detay: 'Taşınma günü tüm oda ve eşyaların fotoğrafını çekip her iki tarafça imzalı giriş tutanağı düzenleyin; bu, çıkışta haksız kesintilere karşı en güçlü belgeniz.' },
  { ipucu: 'Dekont Alın', detay: 'Depozitoyu nakit değil, banka havalesiyle ödeyin ve dekontu saklayın.' },
  { ipucu: 'Sözleşmeye Yazın', aciklama: 'Depozito miktarı, ödeme yöntemi ve iade koşullarını kira sözleşmesine açıkça ekletin.', detay: '' },
  { ipucu: 'Çıkış Tutanağı', detay: 'Kirayı bırakırken de fotoğraflı çıkış tutanağı düzenleyin; her iki taraf imzalamalı.' },
];

export default function DepositoYonetimiPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <Shield size={13} /> Depozito Yönetimi
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Depozito Yönetimi Rehberi
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            Kira güvencesi (depozito) kuralları, meşru ve haksız kesintiler, anlaşmazlık çözümü.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-[#00C49F]">Max 3</p>
              <p className="text-xs text-gray-400">Aylık kira sınırı</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">Faizli</p>
              <p className="text-xs text-gray-400">İade hakkı</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-400">TBK 342</p>
              <p className="text-xs text-gray-400">Yasal dayanak</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* Kurallar */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Yasal Kurallar</h2>
          <div className="space-y-3">
            {DEPOZITO_KURALLARI.map((d, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                <div className="flex items-start justify-between mb-1">
                  <p className="text-xs font-black text-gray-900">{d.baslik}</p>
                  <span className="text-[10px] bg-[#F0FDF8] text-[#00C49F] font-black px-2 py-0.5 rounded shrink-0">{d.vurgu}</span>
                </div>
                <p className="text-[10px] text-gray-600 leading-relaxed">{d.aciklama}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Meşru Kesintiler */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle size={14} className="text-[#00C49F]" /> Meşru Kesinti Nedenleri
          </h2>
          <div className="space-y-2">
            {KESINTI_HAKKLI.map((k, i) => (
              <div key={i} className="flex items-start gap-3 py-2 border-b border-gray-50 last:border-0">
                <CheckCircle size={12} className="text-[#00C49F] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-black text-gray-900">{k.durum}</p>
                  <p className="text-[10px] text-gray-500 mt-0.5">{k.aciklama}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Haksız Kesintiler */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Haksız Kesinti Sayılan Durumlar</h2>
          <div className="space-y-3">
            {KESINTI_HAKSIZ.map((k, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                <p className="text-xs font-black text-rose-500 mb-1">{k.durum}</p>
                <p className="text-[10px] text-gray-600 leading-relaxed">{k.aciklama}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Anlaşmazlık Çözümü */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4">Anlaşmazlık Durumunda Ne Yapılır?</h2>
          <div className="space-y-3">
            {ANLASMAZLIK_COZUM.map((a, i) => (
              <div key={i} className="flex items-start gap-2 py-2 border-b border-gray-50 last:border-0">
                <div className="w-5 h-5 rounded-full bg-[#00C49F] text-white text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">{i + 1}</div>
                <div>
                  <p className="text-xs font-black text-gray-900">{a.adim}</p>
                  <p className="text-[10px] text-gray-600 leading-relaxed mt-0.5">{a.aciklama}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pratik İpuçları */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4">Pratik İpuçları</h2>
          <div className="space-y-3">
            {PRATIK_IPUCLARI.map((p, i) => (
              <div key={i} className="grid grid-cols-3 gap-2 py-2 border-b border-gray-50 last:border-0">
                <p className="text-xs font-black text-[#00C49F]">{p.ipucu}</p>
                <p className="text-[10px] text-gray-600 leading-relaxed col-span-2">{p.detay}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Uyarı */}
        <section className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <AlertTriangle size={14} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 leading-relaxed">
            <span className="font-black">Önemli:</span> Depozito iade edilmezse noter ihtarnamesi çektikten sonra icra veya mahkeme yoluna başvurabilirsiniz. Giriş tutanağı olmadan haksız kesintileri ispat etmek güçleşir; mutlaka fotoğraflı tutanak düzenleyin.
          </p>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Araçlar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/kiraci-haklari', label: 'Kiracı Hakları' },
              { href: '/mal-sahibi-haklari', label: 'Mal Sahibi Hakları' },
              { href: '/tahliye-sureci', label: 'Tahliye Süreci Rehberi' },
              { href: '/kira-sozlesmesi-hazirlama', label: 'Kira Sözleşmesi Hazırlama' },
              { href: '/sozlesme-iptal-cayma', label: 'Sözleşme İptal Rehberi' },
              { href: '/kira-artis-hesaplama', label: 'Kira Artış Hesaplama' },
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
