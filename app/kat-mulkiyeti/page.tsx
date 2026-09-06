import { Metadata } from 'next';
import Link from 'next/link';
import {
  Building2, CheckCircle, AlertTriangle, ArrowRight, Scale, FileText,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Kat Mülkiyeti Rehberi | İrtifak, İskan, Yönetim Planı | Söylemesi Bizden',
  description:
    'Kat irtifakı ve kat mülkiyeti farkı, iskan belgesi şartı, yönetim planı, aidat ve kat malikleri kurulu hakları.',
};

const FARK_KARSILASTIRMA = [
  {
    kavram: 'Kat İrtifakı',
    tanim: 'İnşaat tamamlanmadan kurulan hak. Bağımsız bölüm tapu alınabilir ama iskan (yapı kullanma izni) yoktur.',
    avantaj: 'İnşaat aşamasında bölüm satın alınabilir; fiyat genellikle daha düşük.',
    dezavantaj: 'Banka konut kredisi vermeyebilir veya düşük kredi verir. İskan olmadan elektrik/su aboneliği güçlükler çıkarabilir.',
    renk: 'border-amber-200 bg-amber-50',
  },
  {
    kavram: 'Kat Mülkiyeti',
    tanim: 'İnşaat tamamlanmış, iskan alınmış ve KMK uyarınca tescil edilmiş bağımsız bölüm.',
    avantaj: 'Tam resmi statü; banka kredisi açık, abonelikler sorunsuz, sigorta tam kapsamlı.',
    dezavantaj: 'Dönüşüm için tüm bağımsız bölüm sahiplerinin onayı veya mahkeme kararı gerekebilir.',
    renk: 'border-[#00C49F]/30 bg-[#F0FDF8]',
  },
];

const KURULUS_SURECI = [
  { adim: 'Yapı Kullanma İzni (İskan)', detay: 'Belediyeden alınan iskan belgesi, kat mülkiyetinin ön koşuludur.' },
  { adim: 'Proje Uygunluğu', detay: 'Uygulama İmar Planı ve onaylı proje ile örtüşen yapılar kat mülkiyetine geçebilir.' },
  { adim: 'Yönetim Planı Hazırlanması', detay: 'Tüm maliklerin imzaladığı veya başlangıçta müteahhitin hazırladığı yönetim planı.' },
  { adim: 'Tapu Müdürlüğüne Başvuru', detay: 'İskan, proje, yönetim planı ve tapu ile Tapu Müdürlüğüne başvuru.' },
  { adim: 'Tescil', detay: 'Her bağımsız bölüm için ayrı tapu kütüğü sayfası açılır; kat mülkiyeti tesis edilir.' },
];

const KAT_MALIKLERI_HAKLARI = [
  { hak: 'Ortak Alanı Kullanma', aciklama: 'Merdiven, asansör, otopark, çatı, bahçe — arsa payı oranında.' },
  { hak: 'Toplantıya Katılma ve Oy Kullanma', aciklama: 'Kat malikleri kurulu kararlarında eşit veya arsa payına göre oy.' },
  { hak: 'Aidat İtiraz Hakkı', aciklama: 'Haksız veya yanlış hesaplanan aidata itiraz; sulh hukuk mahkemesi.' },
  { hak: 'Yönetici Görevden Alma', aciklama: 'Kurulun 4/5 çoğunluğu kararıyla yönetici veya yönetim kurulu değiştirilebilir.' },
  { hak: 'Hesap Görme Talebi', aciklama: 'Yöneticiden gelir-gider hesaplarını istemek her malikin hakkıdır.' },
  { hak: 'Anagayrimenkul Dışı Bölüm Kiralama', aciklama: 'Bağımsız bölümü kiralama; ortak alan kira geliri arsa payı oranında paylaşılır.' },
];

const AIDAT_HESABI = [
  { kalem: 'Kapıcı / Güvenlik', aciklama: 'Bordro, sigorta, ikramiye dahil. En büyük aidat kalemi.' },
  { kalem: 'Isıtma / Yakıt', aciklama: 'Merkezi ısıtmada doğalgaz veya fuel-oil; bağımsız bölüme isabet eden pay.' },
  { kalem: 'Elektrik (Ortak Alan)', aciklama: 'Merdiven, asansör, dış aydınlatma tüketimi.' },
  { kalem: 'Bakım ve Onarım', aciklama: 'Asansör bakımı, çatı onarımı, boya. Büyük onarımlar için avans toplanabilir.' },
  { kalem: 'Su (Ortak)', aciklama: 'Bahçe, ortak lavabo, havuz varsa havuz suyu.' },
  { kalem: 'İşletme Giderleri', aciklama: 'Muhasebeci, yönetim gideri, banka masrafı.' },
  { kalem: 'İşletme Projesi', aciklama: 'Yıllık tahmini bütçe — bu belgeye dayalı aidat belirlenir.' },
];

const ONEMLI_KARARLAR = [
  { karar: 'Ortak Alan Kullanımı', esik: 'Oy çokluğu (%51)', ornek: 'Bahçe düzenlemesi, kapı sistemi değişikliği.' },
  { karar: 'Yönetim Planı Değişikliği', esik: '4/5 çoğunluk', ornek: 'Aidat artışı limiti, ortak alan kullanım kuralları.' },
  { karar: 'Önemli Onarım', esik: '4/5 çoğunluk', ornek: 'Çatı yenileme, asansör değişimi, kazan sistemi.' },
  { karar: 'Kat İrtifakı → Mülkiyeti', esik: 'Oybirliği veya mahkeme', ornek: 'Tüm bağımsız bölümler katılmadığında mahkeme yolu.' },
  { karar: 'Anagayrimenkulü Değiştirme', esik: 'Oybirliği', ornek: 'Ek bina inşası, mevcut yapıyı esastan değiştirme.' },
];

export default function KatMulkiyetiPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <Building2 size={13} /> Kat Mülkiyeti Rehberi
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Kat Mülkiyeti Rehberi
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            Kat irtifakı ve kat mülkiyeti farkı, iskan belgesi, yönetim planı, aidat hesabı ve kat malikleri kurulu hakları.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-[#00C49F]">KMK</p>
              <p className="text-xs text-gray-400">634 Sayılı Kanun</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">4/5</p>
              <p className="text-xs text-gray-400">Önemli karar eşiği</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-400">İskan</p>
              <p className="text-xs text-gray-400">Ön koşul</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* İrtifak vs Mülkiyet */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Kat İrtifakı ve Kat Mülkiyeti Farkı</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {FARK_KARSILASTIRMA.map((f, i) => (
              <div key={i} className={`rounded-2xl border p-5 ${f.renk}`}>
                <p className="text-xs font-black text-gray-900 mb-2">{f.kavram}</p>
                <p className="text-[10px] text-gray-600 mb-3 leading-relaxed">{f.tanim}</p>
                <div className="space-y-2">
                  <div className="bg-white rounded-lg p-2">
                    <p className="text-[10px] text-[#00C49F] font-bold mb-0.5">Avantaj</p>
                    <p className="text-[10px] text-gray-600">{f.avantaj}</p>
                  </div>
                  <div className="bg-white rounded-lg p-2">
                    <p className="text-[10px] text-rose-600 font-bold mb-0.5">Dezavantaj</p>
                    <p className="text-[10px] text-gray-600">{f.dezavantaj}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Kuruluş Süreci */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Kat Mülkiyeti Kuruluş Süreci</h2>
          <div className="space-y-3">
            {KURULUS_SURECI.map((s, i) => (
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

        {/* Kat Malikleri Hakları */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Kat Maliklerinin Hakları</h2>
          <div className="space-y-3">
            {KAT_MALIKLERI_HAKLARI.map((h, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm flex items-start gap-3">
                <Scale size={13} className="text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-black text-gray-900 mb-0.5">{h.hak}</p>
                  <p className="text-[10px] text-gray-600 leading-relaxed">{h.aciklama}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Aidat Kalemleri */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <FileText size={14} className="text-[#00C49F]" /> Aidat Kalemleri
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {AIDAT_HESABI.map((a, i) => (
              <div key={i} className="bg-[#F0FDF8] rounded-xl p-3">
                <p className="text-xs font-black text-gray-900 mb-0.5">{a.kalem}</p>
                <p className="text-[10px] text-gray-600 leading-relaxed">{a.aciklama}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Karar Eşikleri */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Kat Malikleri Kurulu Karar Eşikleri</h2>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full text-xs">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-4 py-3 font-black text-gray-700">Karar Türü</th>
                  <th className="text-left px-4 py-3 font-black text-gray-700">Gerekli Çoğunluk</th>
                  <th className="text-left px-4 py-3 font-black text-gray-400">Örnek</th>
                </tr>
              </thead>
              <tbody>
                {ONEMLI_KARARLAR.map((k, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-4 py-3 font-bold text-gray-800">{k.karar}</td>
                    <td className="px-4 py-3 font-bold text-[#00C49F]">{k.esik}</td>
                    <td className="px-4 py-3 text-gray-500">{k.ornek}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Kontrol Listesi */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle size={14} className="text-[#00C49F]" /> Alım Öncesi Kontrol Listesi
          </h2>
          <div className="space-y-2">
            {[
              'Tapu kat irtifakı mı, kat mülkiyeti mi? (tapu kütüğünde belirtilir)',
              'İskan belgesi var mı? (belediyeden veya tapudan sorgulanır)',
              'Yönetim planı incelendi mi? (aidat, kural, ortak alan kullanım)',
              'Son 3 yıl aidat borcu var mı? (yöneticiden veya tapu müdürlüğünden)',
              'Bina yöneticisi iletişim bilgisi alındı mı?',
              'Ortak giderler için işletme projesi (bütçe) talep edildi mi?',
              'Ruhsatsız tadilat veya kaçak ek yapı var mı?',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <div className="w-4 h-4 rounded border-2 border-[#00C49F]/40 shrink-0 mt-0.5" />
                <p className="text-xs text-gray-700">{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Warning */}
        <section className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <AlertTriangle size={14} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 leading-relaxed">
            <span className="font-black">Önemli:</span> Kat irtifaklı tapu, bazı bankalarca konut kredisi için yeterli bulunmayabilir. Alım yapmadan önce bankanızın koşullarını ve iskan durumunu mutlaka teyit edin.
          </p>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Rehberler</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/aidat-hesaplayici', label: 'Aidat Hesaplayıcı' },
              { href: '/kentsel-donusum', label: 'Kentsel Dönüşüm Rehberi' },
              { href: '/imar-durumu', label: 'İmar Durumu Rehberi' },
              { href: '/tapu-devir-sureci', label: 'Tapu Devir Süreci' },
              { href: '/ortak-mulkiyet', label: 'Ortak Mülkiyet Rehberi' },
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
