import { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, AlertTriangle, ArrowRight, Scale } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Miras ve Gayrimenkul Rehberi | Veraset, İntikal, Hisseli Tapu | Söylemesi Bizden',
  description:
    'Miras yoluyla gayrimenkul edinimi: veraset ilamı, intikal işlemi, hisseli tapu yönetimi ve mirasçılar arası anlaşmazlık çözümü rehberi.',
};

const MIRAS_SURECI = [
  { adim: 'Veraset İlamı (Mirasçılık Belgesi)', aciklama: 'Miras bırakan kişinin vefatından sonra mirasçıların sulh hukuk mahkemesinden veya noterden veraset ilamı alması gerekir. Yabancı uyrukluların ilamı apostil ile onaylatması gerekebilir.', sure: '1–4 Hafta' },
  { adim: 'Miras Beyannamesi', aciklama: 'Vefat tarihinden itibaren 4 ay içinde (yurt dışındaysa 6 ay) vergi dairesine miras beyannamesi verilmesi zorunludur; verilmemesi cezaya yol açar.', sure: '4 Ay İçinde' },
  { adim: 'Tapu İntikal İşlemi', aciklama: 'Veraset ilamı ve vergi dairesi ilişiksizlik belgesiyle tapu müdürlüğüne başvurularak taşınmaz mirasçılar adına tescil edilir.', sure: '1–4 Hafta' },
  { adim: 'Veraset ve İntikal Vergisi', aciklama: 'Miras yoluyla edinilen taşınmazdan %1–%10 oranında veraset ve intikal vergisi ödenir (dereceye göre değişir). İki yılda eşit taksit imkânı vardır.', sure: '3 Yılda Taksit' },
  { adim: 'Hisseli Tapunun Yönetimi', aciklama: 'Birden fazla mirasçı varsa tapu "hisseli" olarak tescil edilir; ortak kullanım veya paylaşım anlaşması yapılması önerilir.', sure: 'Sonraki Adım' },
];

const VERASET_VERGISI = [
  { derece: 'Eş ve Çocuklar (1. Derece)', oran: '%1–4', aciklama: 'En düşük oran; mirasın büyük çoğunluğu bu kategoriye girer.' },
  { derece: 'Torunlar, Ana-Baba (2. Derece)', oran: '%3–8', aciklama: 'Orta vergi dilimi; 2. derece mirasçılar.' },
  { derece: 'Diğer Mirasçılar (3.+ Derece)', oran: '%5–10', aciklama: 'En yüksek vergi oranı; kardeş, yeğen, hala, amca vb.' },
  { derece: 'İvazsız İktisap (Bağış)', oran: '%10–30', aciklama: 'Miras dışı bağış yoluyla edinimde daha yüksek oran uygulanır.' },
];

const HISSELI_TAPU_YONETIM = [
  { konu: 'Satış Hakkı', aciklama: 'Her hissedar kendi payını diğerlerinin onayı olmaksızın üçüncü kişilere satabilir; ancak diğer hissedarlara "önalım hakkı" tanınmıştır (şufa hakkı).' },
  { konu: 'Şufa Hakkı', aciklama: 'Bir hissedar payını satmak istediğinde, diğer hissedarlar aynı bedelle öncelikli satın alma hakkına sahiptir; 3 ay içinde kullanılmalıdır.' },
  { konu: 'Ortaklığın Giderilmesi', aciklama: 'Hissedarlar anlaşamazsa mahkeme yoluyla ortaklığın giderilmesi (izale-i şuyu) davası açılabilir; taşınmaz satışa çıkarılır.' },
  { konu: 'Kira Geliri Paylaşımı', aciklama: 'Kiraya verilen hisseli taşınmazda kira geliri hisse oranında paylaşılır; bu kararı hissedarların çoğunluğu alabilir.' },
  { konu: 'Tadilat İzni', aciklama: 'Hisseli taşınmazda önemli tadilat veya yatırım kararları tüm hissedarların onayını gerektirir.' },
];

const PRATIK_BILGILER = [
  { bilgi: 'Reddi Miras', detay: 'Borcu varlıklarından fazla olan miras 3 ay içinde reddedilebilir; ret ifadesi sulh hukuk mahkemesine bildirilmelidir.' },
  { bilgi: 'Miras Paylaşım Sözleşmesi', detay: 'Hissedarlar, tapu yönetimi ve gelir paylaşımı için noterden miras paylaşım sözleşmesi yapabilir; uyuşmazlıkları önler.' },
  { bilgi: 'Ölüme Bağlı Tasarruf', detay: 'Vasiyet veya miras sözleşmesiyle taşınmazın belirli kişilere bırakılması yasal sınırlar (saklı pay) çerçevesinde mümkündür.' },
  { bilgi: 'Miras Danışmanlığı', detay: 'Büyük değerli mülkler veya çok hissedarlı durumlarda tereke avukatı veya noter yardımı almanız zaman ve maliyet tasarrufu sağlar.' },
];

export default function MirasVeGayrimenkulPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <Scale size={13} /> Miras ve Gayrimenkul
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Miras ve Gayrimenkul Rehberi
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            Veraset ilamı, intikal işlemi, miras vergisi ve hisseli tapu yönetimi hakkında kapsamlı rehber.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-[#00C49F]">4 Ay</p>
              <p className="text-xs text-gray-400">Beyanname süresi</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">%1–10</p>
              <p className="text-xs text-gray-400">Veraset vergisi</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-400">3 Ay</p>
              <p className="text-xs text-gray-400">Şufa hakkı süresi</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* Miras Süreci */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Miras Süreci Adım Adım</h2>
          <div className="space-y-3">
            {MIRAS_SURECI.map((a, i) => (
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

        {/* Veraset Vergisi */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4">Veraset ve İntikal Vergisi Oranları</h2>
          <div className="space-y-3">
            {VERASET_VERGISI.map((v, i) => (
              <div key={i} className="grid grid-cols-3 gap-2 py-2 border-b border-gray-50 last:border-0">
                <p className="text-xs font-black text-gray-900">{v.derece}</p>
                <p className="text-xs font-black text-[#00C49F]">{v.oran}</p>
                <p className="text-[10px] text-gray-600 leading-relaxed">{v.aciklama}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Hisseli Tapu */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Hisseli Tapu Yönetimi</h2>
          <div className="space-y-3">
            {HISSELI_TAPU_YONETIM.map((h, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                <p className="text-xs font-black text-[#00C49F] mb-1">{h.konu}</p>
                <p className="text-[10px] text-gray-600 leading-relaxed">{h.aciklama}</p>
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
            <span className="font-black">Önemli:</span> Miras hukuku karmaşık olup bireysel duruma göre farklılık gösterir. Büyük değerli mülkler için tereke avukatı veya mali danışman desteği almanız önerilir.
          </p>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Araçlar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/tapu-devir-rehberi', label: 'Tapu Devir Rehberi' },
              { href: '/hisseli-tapu', label: 'Hisseli Tapu Rehberi' },
              { href: '/gayrimenkul-vergi-optimizasyon', label: 'Vergi Optimizasyonu' },
              { href: '/emlak-vergisi', label: 'Emlak Vergisi Hesaplayıcı' },
              { href: '/kooperatif-konut-rehberi', label: 'Kooperatif Konut Rehberi' },
              { href: '/sozlesme-iptal-cayma', label: 'Sözleşme İptal Rehberi' },
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
