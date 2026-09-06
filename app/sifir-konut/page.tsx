import { Metadata } from 'next';
import Link from 'next/link';
import {
  Building, CheckCircle, AlertTriangle, ArrowRight, FileText, Scale,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Sıfır Konut Rehberi | Yeni Bina Satın Alma, KDV, Teslim | Söylemesi Bizden',
  description:
    'Yeni inşaat sıfır konut satın alma: KDV oranları, iskan belgesi, teslim protokolü, ayıp bildirimi ve tüketici hakları.',
};

const AVANTAJ_DEZAVANTAJ = [
  { konu: 'Avantaj: Modern Standartlar', detay: 'Güncel deprem yönetmeliği, enerji verimliliği ve ısı yalıtım standartlarına uygun yapı.' },
  { konu: 'Avantaj: Garanti Süresi', detay: 'Müteahhit, yapı ve tesisatlar için 2–5 yıl gizli ayıp garantisi vermek zorundadır.' },
  { konu: 'Avantaj: Kişiselleştirme', detay: 'İnşaat aşamasında zemin, mutfak tezgahı gibi seçimler yapılabilir.' },
  { konu: 'Dezavantaj: Proje Riski', detay: 'Teslim gecikmesi, proje değişikliği veya iflas durumunda hak kayıpları yaşanabilir.' },
  { konu: 'Dezavantaj: Görülmeden Karar', detay: 'Maket veya proje üzerinden karar verilir; gerçek ürün farklı çıkabilir.' },
  { konu: 'Dezavantaj: Çevre Olgunlaşmamış', detay: 'Yeni projelerde sosyal çevre, yeşil alan ve ulaşım altyapısı henüz gelişmemiş olabilir.' },
];

const KDV_BILGI = [
  { tip: 'Net Alan 150 m² Altı (Konut)', kdv: '%1', notlar: '2023 sonrası bazı şartlarda artabilir; güncel mevzuatı kontrol edin.' },
  { tip: 'Net Alan 150 m² Üzeri (Konut)', kdv: '%20', notlar: 'Lüks segment daireler için tam KDV uygulanır.' },
  { tip: 'Konut (Sosyal Konut - Belediye/TOKİ)', kdv: '%1', notlar: 'Özel kota ve koşullara tabidir.' },
  { tip: 'Ticari Gayrimenkul (Dükkan/Ofis)', kdv: '%20', notlar: 'Kullanım amacına bakılmaksızın tam KDV.' },
  { tip: 'Arsa (Müstakil)', kdv: 'KDV Yok*', notlar: '*Ticari işletme satışlarında %20 uygulanabilir.' },
];

const TESLIM_SURECI = [
  { adim: 'İskan (Yapı Kullanma İzni)', detay: 'Müteahhit teslim öncesi yapı kullanma iznini (iskan belgesini) almış olmalıdır; iskansız teslim almamalısınız.' },
  { adim: 'Teslim Daveti', detay: 'Müteahhit yazılı teslim daveti gönderir; sözleşmede belirlenen tarihte teslim gerçekleşmesi gerekir.' },
  { adim: 'Teknik İnceleme', detay: 'Teslimden önce mühendis veya ekspertiz firmasıyla birlikte teknik inceleme yaptırın (çatlak, su sızıntısı, tesisat).' },
  { adim: 'Eksik ve Ayıp Listesi', detay: 'Tespit edilen eksik/ayıplı işleri liste halinde tutanağa geçirin ve müteahhide imzalatın.' },
  { adim: 'Protokol İmza', detay: 'Eksiksiz veya giderilecek eksikler belirtilerek teslim protokolü imzalanır; anahtar bu aşamada teslim edilir.' },
  { adim: 'Tapu Devri', detay: 'İskan alındıktan sonra kat mülkiyeti tapusu düzenlenir; devre hazır olduğunda tapu sicilinde devir gerçekleşir.' },
];

const AYIP_BILDIRIM = [
  { tur: 'Açık Ayıp', sure: '30 gün', aciklama: 'Teslimde görülebilecek açık kusurlar; teslim günü veya en geç 30 gün içinde bildirimi.' },
  { tur: 'Gizli Ayıp', sure: '5 yıl', aciklama: 'Teslimde fark edilemeyen, sonradan ortaya çıkan yapısal kusurlar; öğrenilmesinden itibaren 2 yıl dava süresi.' },
  { tur: 'Ağır Kusur', sure: 'Zamanaşımı yok', aciklama: 'Taşıyıcı sistemde kasıt veya ağır ihmal; zamanaşımı süresine tabi değil.' },
];

const KONTROL_LISTESI = [
  'İskan (yapı kullanma izni) var mı? Belgesini isteyin.',
  'Tapu senedi türü kat irtifakı mı kat mülkiyeti mi? (Kat mülkiyeti tercih edilmeli)',
  'Sözleşmede teslim tarihi açık ve cezai şartlı mı?',
  'Ödeme planında ne kadarı teslimde kalıyor? (%10–20 teslimde ideal)',
  'Müteahhit projesini ve mali durumunu araştırdınız mı?',
  'Teslim öncesinde bağımsız teknik inceleme (ekspertiz) yaptıracak mısınız?',
  'Sigorta ve yapı denetim belgelerini gördünüz mü?',
  'Sosyal tesis, otopark, asansör vaatleri sözleşmede yazılı mı?',
];

const KAT_IRTIFAK_MULKIYET = {
  irtifak: 'Bina tamamlanmadan önce arsa üzerinde kurulur; kat planı ve projeye göre hazırlanır. İnşaat bitmeden tapuya işlenir.',
  mulkiyet: 'İnşaat tamamlanıp iskan alındıktan sonra kat irtifakı kat mülkiyetine dönüştürülür. Tam mülkiyet hakkı sağlar.',
  tavsiye: 'Alım sırasında kat irtifakı normal; teslimde kat mülkiyetine dönüşüm talep edin. Kat mülkiyeti olmadan banka kredisi çıkmayabilir.',
};

export default function SifirKonutPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <Building size={13} /> Sıfır Konut Rehberi
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Sıfır Konut Satın Alma Rehberi
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            KDV oranları, iskan belgesi, teslim protokolü, ayıp bildirimi ve tüketici hakları.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-[#00C49F]">%1/%20</p>
              <p className="text-xs text-gray-400">KDV oranları</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">5 Yıl</p>
              <p className="text-xs text-gray-400">Gizli ayıp garantisi</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-400">İskan</p>
              <p className="text-xs text-gray-400">Zorunlu teslim şartı</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* Avantaj/Dezavantaj */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Sıfır Konut — Artı ve Eksiler</h2>
          <div className="space-y-3">
            {AVANTAJ_DEZAVANTAJ.map((a, i) => (
              <div key={i} className={`rounded-xl p-3 ${a.konu.startsWith('Avantaj') ? 'bg-[#F0FDF8]' : 'bg-rose-50'}`}>
                <p className={`text-xs font-black mb-0.5 ${a.konu.startsWith('Avantaj') ? 'text-[#00C49F]' : 'text-rose-600'}`}>{a.konu}</p>
                <p className="text-[10px] text-gray-600 leading-relaxed">{a.detay}</p>
              </div>
            ))}
          </div>
        </section>

        {/* KDV */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <FileText size={14} className="text-[#00C49F]" /> KDV Oranları
          </h2>
          <div className="space-y-2">
            {KDV_BILGI.map((k, i) => (
              <div key={i} className="grid grid-cols-3 gap-2 py-2 border-b border-gray-50 last:border-0">
                <p className="text-xs font-bold text-gray-900 col-span-1">{k.tip}</p>
                <p className="text-xs font-black text-[#00C49F] text-center">{k.kdv}</p>
                <p className="text-[10px] text-gray-500 leading-relaxed">{k.notlar}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Teslim Süreci */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Teslim Süreci</h2>
          <div className="space-y-3">
            {TESLIM_SURECI.map((s, i) => (
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

        {/* Ayıp Bildirimi */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Ayıp Bildirimi Süreleri</h2>
          <div className="space-y-3">
            {AYIP_BILDIRIM.map((a, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm flex items-start gap-3">
                <Scale size={13} className="text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-xs font-black text-gray-900">{a.tur}</p>
                    <span className="text-[10px] bg-blue-50 text-blue-600 font-bold px-2 py-0.5 rounded">{a.sure}</span>
                  </div>
                  <p className="text-[10px] text-gray-600 leading-relaxed">{a.aciklama}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Kat İrtifakı vs Kat Mülkiyeti */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4">Kat İrtifakı ve Kat Mülkiyeti</h2>
          <div className="space-y-3">
            <div className="bg-amber-50 rounded-xl p-3">
              <p className="text-[10px] text-amber-600 font-bold mb-0.5">Kat İrtifakı</p>
              <p className="text-[10px] text-gray-600 leading-relaxed">{KAT_IRTIFAK_MULKIYET.irtifak}</p>
            </div>
            <div className="bg-[#F0FDF8] rounded-xl p-3">
              <p className="text-[10px] text-[#00C49F] font-bold mb-0.5">Kat Mülkiyeti</p>
              <p className="text-[10px] text-gray-600 leading-relaxed">{KAT_IRTIFAK_MULKIYET.mulkiyet}</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-3">
              <p className="text-[10px] text-blue-600 font-bold mb-0.5">Tavsiye</p>
              <p className="text-[10px] text-gray-600 leading-relaxed">{KAT_IRTIFAK_MULKIYET.tavsiye}</p>
            </div>
          </div>
        </section>

        {/* Kontrol Listesi */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle size={14} className="text-[#00C49F]" /> Satın Almadan Önce Kontrol Listesi
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
            <span className="font-black">Önemli:</span> İskansız konut almayın. İskan belgesi olmayan binalarda elektrik, su ve gaz abonelikleri yapılamaz; banka kredisi de çıkmaz. Satın almadan önce mutlaka iskan veya en azından ruhsat durumunu teyit edin.
          </p>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Rehberler</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/muteahhit-secimi', label: 'Müteahhit Seçimi Rehberi' },
              { href: '/tapu-devir-sureci', label: 'Tapu Devir Süreci' },
              { href: '/taksitli-satis', label: 'Taksitli Satış Rehberi' },
              { href: '/kat-mulkiyeti', label: 'Kat Mülkiyeti Rehberi' },
              { href: '/belediye-islemleri', label: 'Belediye İşlemleri' },
              { href: '/yeni-projeler', label: 'Yeni Projeler' },
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
