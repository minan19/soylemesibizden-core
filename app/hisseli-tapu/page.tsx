import { Metadata } from 'next';
import Link from 'next/link';
import {
  Users, CheckCircle, AlertTriangle, ArrowRight, Scale, FileText,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Hisseli Tapu Rehberi | Şufa Hakkı, Ortaklık Giderme, Riskler | Söylemesi Bizden',
  description:
    'Hisseli tapu nedir, nasıl satılır? Şufa (önalım) hakkı, ortaklığın giderilmesi davası, kira geliri paylaşımı ve riskler.',
};

const HISSELI_TAPU_ACIKLAMA = {
  tanim: 'Birden fazla kişinin belirli pay oranlarıyla (1/2, 1/3, 1/4 gibi) aynı tapu kaydında malik olduğu taşınmaz.',
  medeniKanun: 'Medeni Kanun 688–695. maddeleri — paylı mülkiyet.',
  ornekler: ['Miras yoluyla intikal', 'Birlikte satın alınan gayrimenkul', 'Arazi kadastrosundan doğan hisseler', 'Tüzel kişi ortaklıkları'],
};

const SUFA_HAKKI = [
  { madde: 'Tanımı', detay: 'Paylı mülkiyette paydaşlardan birinin payını üçüncü kişiye satmak istemesi halinde, diğer paydaşların o payı aynı bedel ve koşullarla satın alma hakkı.' },
  { madde: 'Yasal Dayanak', detay: 'Medeni Kanun md. 732 — zorunlu önalım hakkı. Sözleşmeden doğan önalım ise md. 735.' },
  { madde: 'Kullanım Süresi', detay: 'Satışın öğrenilmesinden itibaren 3 ay; satıştan itibaren her durumda 2 yıl.' },
  { madde: 'Başvuru Yeri', detay: 'Tapu sicil müdürlüğü (satıcı tarafından önce bildirim yapılırsa) veya taşınmazın bulunduğu Sulh Hukuk Mahkemesi.' },
  { madde: 'Kaldırılması', detay: 'Paydaşların noterce imzaladığı ön alım hakkından feragat sözleşmesi; tapu siciline şerh düşülür.' },
  { madde: 'Yabancı Paydaş', detay: 'Yabancı uyruklu paydaşın payı da şufaya tabidir; uyrukluğa göre ayrım yapılmaz.' },
];

const ORTAKLIK_GIDERME = [
  { adim: 'Uzlaşı Girişimi', detay: 'Paydaşların kendi aralarında satış veya taksim anlaşması yapması en hızlı çözümdür.' },
  { adim: 'Dava Açma', detay: 'Herhangi bir paydaş Sulh Hukuk Mahkemesi\'ne ortaklığın giderilmesi (izale-i şüyu) davası açabilir.' },
  { adim: 'Bilirkişi Değerlemesi', detay: 'Mahkeme taşınmazı bilirkişiye değerlettir; tapu değeri esas alınır.' },
  { adim: 'Paydaşlara Tercih Hakkı', detay: 'Satış öncesi diğer paydaşlara teklif sunulur; ayni taksim mümkünse önceliklidir.' },
  { adim: 'İcra Satışı', detay: 'Anlaşılmazsa mahkeme kararıyla açık artırma; gelir arsa payı oranında dağıtılır.' },
  { adim: 'Süre', detay: 'Ortalama 12–36 ay; mahkeme yoğunluğu ve itirazlara bağlı değişir.' },
];

const KIRA_GELIRI = [
  { konu: 'Oy Çokluğu ile Kiraya Verme', detay: 'Taşınmazın kiraya verilmesi için paydaşların pay ve sayı çoğunluğu yeterli (MK md. 690).' },
  { konu: 'Kira Gelirinin Paylaşımı', detay: 'Her paydaş arsa payı oranında kira geliri alır; yönetim giderleri de aynı oranda paylaşılır.' },
  { konu: 'Paydaşın Taşınmazı Kullanımı', detay: 'Bir paydaş taşınmazı fiilen kullanıyorsa diğerleri ecrimisil (haksız işgal tazminatı) talep edebilir.' },
  { konu: 'Kira Sözleşmesi Tarafı', detay: 'Yönetimi üstlenen paydaş veya ortak yönetim kurulu kira sözleşmesini imzalar.' },
];

const RISKLER = [
  { risk: 'Karar Alamama', onlem: 'Paydaşlar oy çoğunluğu sağlayamazsa mahkeme yolu veya kayyum atanması.' },
  { risk: 'Bilinmeyen Hissedar', onlem: 'Tapu devrinde tüm paydaşların şufa hakkı olduğundan bildirim zorunluluğu; gizli hissedar riski.' },
  { risk: 'Hisseli Arsa İnşaatı', onlem: 'İnşaat ruhsatı için tüm paydaşların onayı veya kat irtifakı kurulması şarttır.' },
  { risk: 'Satış Güçlüğü', onlem: 'Hisseli tapu satışında kredi bulunması güçtür; alıcı havuzu daralmış demektir.' },
  { risk: 'Miras Anlaşmazlığı', onlem: 'Mirasçıların hepsi paydaş olduğunda dava riski yüksek; uzlaşı belgesi noterde yapılmalı.' },
];

const ALICI_DIKKAT = [
  'Satın almadan önce tüm paydaşları ve paylarını tapu kaydından teyit edin.',
  'Diğer paydaşların şufa hakkını kullanıp kullanmayacağını öğrenin.',
  'Banka konut kredisi onayını önceden alın (hisseli tapuya kredi çıkmayabilir).',
  'Taşınmazda fiilen kim oturuyor? Ecrimisil riski var mı?',
  'İzale davası açılıp açılmadığını tapuya şerh sorgulayarak kontrol edin.',
  'Hisseli arsa ise imar durumu ve bölünme imkânını araştırın.',
];

export default function HisseliTapuPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <Users size={13} /> Hisseli Tapu Rehberi
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Hisseli Tapu Rehberi
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            Paylı mülkiyet, şufa (önalım) hakkı, ortaklığın giderilmesi davası ve alıcı riskleri.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-[#00C49F]">3 Ay</p>
              <p className="text-xs text-gray-400">Şufa kullanım süresi</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">MK 732</p>
              <p className="text-xs text-gray-400">Önalım hakkı maddesi</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-400">İzale</p>
              <p className="text-xs text-gray-400">Son çare dava</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* Tanım */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-3">Hisseli Tapu Nedir?</h2>
          <p className="text-xs text-gray-700 leading-relaxed mb-4">{HISSELI_TAPU_ACIKLAMA.tanim}</p>
          <p className="text-[10px] text-gray-400 mb-3"><span className="font-bold">Yasal Dayanak:</span> {HISSELI_TAPU_ACIKLAMA.medeniKanun}</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {HISSELI_TAPU_ACIKLAMA.ornekler.map((o, i) => (
              <div key={i} className="bg-[#F0FDF8] rounded-lg p-2 text-center">
                <p className="text-[10px] text-[#00C49F] font-bold">{o}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Şufa Hakkı */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Şufa (Önalım) Hakkı</h2>
          <div className="space-y-3">
            {SUFA_HAKKI.map((s, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm flex items-start gap-3">
                <Scale size={13} className="text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-black text-gray-900 mb-0.5">{s.madde}</p>
                  <p className="text-[10px] text-gray-600 leading-relaxed">{s.detay}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Ortaklığın Giderilmesi */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Ortaklığın Giderilmesi (İzale-i Şüyu)</h2>
          <div className="space-y-3">
            {ORTAKLIK_GIDERME.map((s, i) => (
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

        {/* Kira Geliri */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <FileText size={14} className="text-[#00C49F]" /> Kira Geliri ve Kullanım Hakları
          </h2>
          <div className="space-y-3">
            {KIRA_GELIRI.map((k, i) => (
              <div key={i} className="bg-[#F0FDF8] rounded-xl p-3">
                <p className="text-xs font-black text-gray-900 mb-0.5">{k.konu}</p>
                <p className="text-[10px] text-gray-600 leading-relaxed">{k.detay}</p>
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

        {/* Alıcı Dikkat */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle size={14} className="text-[#00C49F]" /> Hisseli Tapu Alırken Dikkat Edilecekler
          </h2>
          <div className="space-y-2">
            {ALICI_DIKKAT.map((item, i) => (
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
            <span className="font-black">Önemli:</span> Hisseli tapu alım kararı, tüm paydaşların profilini ve niyetini anlamadan verilmemelidir. Satış sonrası şufa davası veya izale davası ile karşılaşmak mümkündür.
          </p>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Rehberler</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/ortak-mulkiyet', label: 'Ortak Mülkiyet Rehberi' },
              { href: '/miras-ve-gayrimenkul', label: 'Miras ve Gayrimenkul' },
              { href: '/tapu-devir-sureci', label: 'Tapu Devir Süreci' },
              { href: '/sozlesme-iptal', label: 'Sözleşme İptal ve Fesih' },
              { href: '/arsa-yatirimi', label: 'Arsa Yatırımı Rehberi' },
              { href: '/ekspertiz-raporu', label: 'Ekspertiz Raporu' },
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
