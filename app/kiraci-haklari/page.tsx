import { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, AlertTriangle, ArrowRight, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Kiracı Hakları Rehberi | Yasal Güvenceler, Tahliye Koruması | Söylemesi Bizden',
  description:
    'Kiracıların yasal hakları: kira artış koruması, tahliyeye itiraz, depozito iadesi, gizli kusur bildirimi ve kötü niyetli ev sahiplerine karşı başvuru yolları.',
};

const TEMEL_HAKLAR = [
  { hak: 'Kira Artış Tavanı', aciklama: 'Yürürlükteki kira artış tavan düzenlemesi (2024: %25) kapsamında mal sahibi bu oranın üzerinde zam yapamaz; uygulamaz ise mahkeme yoluyla hakkınızı arayabilirsiniz.' },
  { hak: 'Tahliye Güvencesi', aciklama: 'TBK kapsamında kiraya veren, yasal bir sebep olmaksızın kiracıyı tahliye edemez. 10 yıllık uzama döneminin ardından ancak 3 ay önceden ihtar göndererek fesih hakkı doğar.' },
  { hak: 'Depozito İadesi', aciklama: 'Mülkü boşaltırken mal sahibi, haklı bir neden olmaksızın depozitoyu tutamaz; faizi ile birlikte iade etmek zorundadır.' },
  { hak: 'Gizli Kusur Bildirimi', aciklama: 'Kiralanan mülkte sonradan ortaya çıkan yapısal kusur (su basması, zemin çökmesi vb.) için mal sahibine bildirimde bulunulur; giderilmezse kira indirim veya sözleşme feshi hakkı doğabilir.' },
  { hak: 'Sessiz Kullanım Güvencesi', aciklama: 'Mal sahibi, izinsiz ve önceden haber vermeksizin kiralanan mülke giremez; gizlilik hakkınızı ihlal edemez.' },
  { hak: 'İsim Değişikliğinde Sözleşme Devamı', aciklama: 'Ev el değiştirirse yeni malik, mevcut kira sözleşmesine uymak zorundadır; mevcut koşullar korunur.' },
];

const IZIN_VERILMEYEN_DAVRANISLAR = [
  'Kiracının kapısına kilit vurulması veya su/elektrik bağlantısının kesilmesi',
  'Mal sahibinin önceden haber vermeksizin eve girmesi (acil durumlar hariç)',
  'Tavan ötesinde zam yapılması veya zam yapmak için baskı uygulanması',
  'Yasal süre dolmadan tahliye tehdidi veya baskısı',
  'Kira alındığına dair makbuz verilmesinin reddedilmesi',
  'Taşınmazı kullanılamaz hale getirecek kasıtlı bakım ihmali',
];

const BASVURU_YOLLARI = [
  { yol: 'Mal Sahibine Yazılı İhtar', aciklama: 'Hak ihlalini noter ihtarnamesiyle tebliğ edin; bu adım mahkemede delil niteliği taşır.' },
  { yol: 'Sulh Hukuk Mahkemesi', aciklama: '500.000 ₺ altındaki kira anlaşmazlıkları için doğrudan Sulh Hukuk Mahkemesi\'ne başvurabilirsiniz.' },
  { yol: 'Arabuluculuk', aciklama: 'Dava öncesi zorunlu veya ihtiyari arabuluculuk; hızlı ve düşük maliyetli çözüm sağlar.' },
  { yol: 'Tüketici Hakem Heyeti', aciklama: 'Kira ilişkisinin Tüketici Koruma Kanunu kapsamına girdiği durumlarda (ticari olmayan konutta) hakem heyetine başvurabilirsiniz.' },
  { yol: 'İl Müdürlükleri (Ticaret Bakanlığı)', aciklama: 'Haksız ticari uygulamalar için Ticaret İl Müdürlüğü\'ne şikayet yolu açıktır.' },
];

const PRATIK_BILGILER = [
  { bilgi: 'Kira Makbuzu Talep Hakkı', detay: 'Her ödeme için makbuz veya banka dekontu alın; ispat gücünüz artar.' },
  { bilgi: 'Elektronik İhtar', detay: 'Kayıtlı e-posta (KEP) yoluyla gönderilen ihtarname noter tebligatı ile eşdeğer hukuki geçerliliğe sahiptir.' },
  { bilgi: 'Kira Sözleşmesinin Kopyası', detay: 'İmzalanan sözleşmenin bir örneği kiracıya teslim edilmek zorundadır; teslim edilmezse talep edin.' },
  { bilgi: 'Komşu Zararları', detay: 'Binadaki ortak gider veya hasar nedeniyle kiracı değil mal sahibi sorumludur; kat mülkiyeti kuralları uygulanır.' },
];

export default function KiraciHaklariPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <Shield size={13} /> Kiracı Hakları
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Kiracı Hakları Rehberi
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            Yasal güvenceler, izin verilmeyen davranışlar, başvuru yolları ve pratik bilgiler.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-[#00C49F]">%25</p>
              <p className="text-xs text-gray-400">Kira artış tavanı</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">TBK</p>
              <p className="text-xs text-gray-400">Yasal dayanak</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-400">10 Yıl</p>
              <p className="text-xs text-gray-400">Tahliye güvencesi</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* Temel Haklar */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Temel Kiracı Hakları</h2>
          <div className="space-y-3">
            {TEMEL_HAKLAR.map((h, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                <div className="flex items-start gap-2">
                  <CheckCircle size={13} className="text-[#00C49F] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-black text-gray-900">{h.hak}</p>
                    <p className="text-[10px] text-gray-600 leading-relaxed mt-0.5">{h.aciklama}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* İzin Verilmeyen Davranışlar */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4">Mal Sahibinin Yapamayacakları</h2>
          <div className="space-y-2">
            {IZIN_VERILMEYEN_DAVRANISLAR.map((d, i) => (
              <div key={i} className="flex items-start gap-2 py-1.5 border-b border-gray-50 last:border-0">
                <span className="text-rose-500 text-xs shrink-0 mt-0.5">✗</span>
                <p className="text-xs text-gray-700">{d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Başvuru Yolları */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Hak İhlalinde Başvuru Yolları</h2>
          <div className="space-y-3">
            {BASVURU_YOLLARI.map((b, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-[#00C49F] text-white text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">{i + 1}</div>
                  <div>
                    <p className="text-xs font-black text-gray-900">{b.yol}</p>
                    <p className="text-[10px] text-gray-600 leading-relaxed mt-0.5">{b.aciklama}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pratik Bilgiler */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4">Pratik Bilgiler</h2>
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
            <span className="font-black">Önemli:</span> Hak ihlali yaşadığınızda makbuz, mesaj ve sözleşme gibi tüm belgeleri saklayın. Hukuki süreç başlatmadan önce bir avukattan görüş almanız önerilir.
          </p>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Araçlar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/mal-sahibi-haklari', label: 'Mal Sahibi Hakları' },
              { href: '/depozito-yonetimi', label: 'Depozito Yönetimi Rehberi' },
              { href: '/tahliye-sureci', label: 'Tahliye Süreci Rehberi' },
              { href: '/kira-artis-hesaplama', label: 'Kira Artış Hesaplayıcı' },
              { href: '/sozlesme-iptal-cayma', label: 'Sözleşme İptal Rehberi' },
              { href: '/kira-sozlesmesi-hazirlama', label: 'Kira Sözleşmesi Hazırlama' },
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
