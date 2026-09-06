import { Metadata } from 'next';
import Link from 'next/link';
import {
  Users, CheckCircle, AlertTriangle, ArrowRight, Scale, FileText,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Ortak Mülkiyet Rehberi | Paylı, İştirak, Aile Şirketi | Söylemesi Bizden',
  description:
    'Gayrimenkul ortak mülkiyet türleri, pay devri, izale-i şüyu, aile şirketi yapısı ve ortaklıktan çıkış yolları.',
};

const ORTAKLIK_TURLERI = [
  {
    tip: 'Paylı Mülkiyet (Müşterek)',
    aciklama: 'Her ortak belirli bir pay oranına sahiptir (örn. 1/2, 1/3). Pay ayrı ayrı devredilebilir.',
    avantaj: 'Her ortağın payı bağımsız tasarruf edilebilir.',
    dezavantaj: 'Şufa hakkı — diğer ortaklar önceden satın alma hakkına sahiptir.',
    ornekkullanim: 'Kardeşler arası miras, yatırım ortaklığı, ticari gayrimenkul.',
  },
  {
    tip: 'İştirak Halinde Mülkiyet',
    aciklama: 'Paylar belirli değil; tüm ortaklar birlikte tasarruf eder. Bireysel devir yapılamaz.',
    avantaj: 'Ortaklık bütünlüğü güvende; izinsiz satış mümkün değil.',
    dezavantaj: 'Her işlem tüm ortakların mutabakatını gerektirir; yönetim güç.',
    ornekkullanim: 'Aile ortaklığı (kolektif şirket), adi ortaklık yapıları.',
  },
  {
    tip: 'Aile Şirketi (LTD/AŞ)',
    aciklama: 'Gayrimenkul bir şirket aktifine konulur; ortaklar hisse senedi veya pay üzerinden ortak olur.',
    avantaj: 'Devir ve vergi planlaması esnekliği; kurumsal yönetim imkânı.',
    dezavantaj: 'Şirket kurulum ve yönetim maliyetleri; çifte vergilendirme riski.',
    ornekkullanim: 'Büyük varlık portföyleri, nesiller arası servet aktarımı.',
  },
];

const SUFA_HAKKI = [
  { madde: 'Yasal Dayanak', detay: 'Medeni Kanun md. 732: Paylı mülkiyette paydaşların önalım hakkı.' },
  { madde: 'Süre', detay: 'Satışın öğrenilmesinden itibaren 3 ay; her durumda satıştan 2 yıl.' },
  { madde: 'Uygulama', detay: 'Satış bedeli ve koşullarıyla tapu sicil müdürlüğüne veya mahkemeye başvurulur.' },
  { madde: 'İstisna', detay: 'Paylı mülkiyet sözleşmesinde şufa hakkı kaldırılabilir (noter onaylı).' },
  { madde: 'Yabancı Payına', detay: 'Yabancı ortağın payı da şufaya tabidir; ayrımcılık söz konusu değildir.' },
];

const IZALE_SURECI = [
  { adim: 'Uzlaşı Girişimi', detay: 'Önce ortakların kendi aralarında anlaşarak ortaklığı gidermesi (en hızlı yol).' },
  { adim: 'Ortaklığın Giderilmesi Davası', detay: 'Sulh Hukuk Mahkemesi\'ne başvuru; herhangi bir ortak dava açabilir.' },
  { adim: 'Bilirkişi Değerlemesi', detay: 'Mahkeme taşınmazı değerletir; satış bedeli belirlenir.' },
  { adim: 'Ortaklar Arası Pazarlık', detay: 'Mahkeme önce ortaklara kendi aralarında uzlaşma şansı tanır.' },
  { adim: 'İcra Satışı', detay: 'Uzlaşı sağlanamazsa mahkeme kararıyla açık artırma ile satılır; gelir paylara göre bölünür.' },
];

const VERGI_PLANLAMA = [
  { yontem: 'Aile Şirketi Kuruluşu', avantaj: 'Gelecek nesle pay devri veraset vergisine göre daha avantajlı olabilir.' },
  { yontem: 'Pay Bölümlenmesi', avantaj: 'Vergi matrahını dilimler arasında bölüştürerek yük azaltılabilir.' },
  { yontem: 'Vakıf Kuruluşu', avantaj: 'Aile vakfı ile gayrimenkul nesiller arası aktarımda vergi avantajı.' },
  { yontem: 'Miras Planlaması', avantaj: 'Sağlığında yapılan devir, miras üzerinden daha düşük vergi yüküne neden olabilir.' },
];

const CIKIS_YOLLARI = [
  { yol: 'Payın Diğer Ortağa Satışı', sure: '1–4 hafta', not: 'Şufa hakkı noter aracılığıyla bildirilmelidir.' },
  { yol: 'Payın 3. Kişiye Satışı', sure: '2–6 hafta', not: 'Diğer ortaklar şufa hakkını kullanabilir; 3 ay süre.' },
  { yol: 'Bölünme (Fiili Taksim)', sure: '1–3 ay', not: 'Fiziksel bölünme mümkünse tapu müdürlüğünde tescil.' },
  { yol: 'İzale Davası', sure: '12–36 ay', not: 'Anlaşmazlık halinde mahkeme kanalı; maliyetli ve uzun.' },
];

export default function OrtakMulkiyetPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <Users size={13} /> Ortaklık Rehberi
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Ortak Mülkiyet Rehberi
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            Paylı mülkiyet, iştirak halinde mülkiyet ve aile şirketi yapısı — şufa hakkı, izale davası ve ortaklıktan çıkış yolları.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-[#00C49F]">3 Ay</p>
              <p className="text-xs text-gray-400">Şufa hakkı kullanma süresi</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">MK 732</p>
              <p className="text-xs text-gray-400">Yasal dayanak</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-400">İzale</p>
              <p className="text-xs text-gray-400">Son çare dava yolu</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* Ortaklık Türleri */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Ortak Mülkiyet Türleri</h2>
          <div className="space-y-4">
            {ORTAKLIK_TURLERI.map((o, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <p className="text-xs font-black text-gray-900 mb-1">{o.tip}</p>
                <p className="text-[10px] text-gray-600 mb-3 leading-relaxed">{o.aciklama}</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div className="bg-[#F0FDF8] rounded-lg p-2">
                    <p className="text-[10px] text-[#00C49F] font-bold mb-0.5">Avantaj</p>
                    <p className="text-[10px] text-gray-600">{o.avantaj}</p>
                  </div>
                  <div className="bg-rose-50 rounded-lg p-2">
                    <p className="text-[10px] text-rose-600 font-bold mb-0.5">Dezavantaj</p>
                    <p className="text-[10px] text-gray-600">{o.dezavantaj}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2">
                    <p className="text-[10px] text-gray-500 font-bold mb-0.5">Örnek Kullanım</p>
                    <p className="text-[10px] text-gray-600">{o.ornekkullanim}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Şufa Hakkı */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Önalım (Şufa) Hakkı</h2>
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

        {/* İzale Süreci */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Ortaklığın Giderilmesi (İzale) Süreci</h2>
          <div className="space-y-3">
            {IZALE_SURECI.map((s, i) => (
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

        {/* Ortaklıktan Çıkış */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Ortaklıktan Çıkış Yolları</h2>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full text-xs">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-4 py-3 font-black text-gray-700">Yol</th>
                  <th className="text-left px-4 py-3 font-black text-gray-700">Süre</th>
                  <th className="text-left px-4 py-3 font-black text-gray-500">Not</th>
                </tr>
              </thead>
              <tbody>
                {CIKIS_YOLLARI.map((r, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-4 py-3 font-bold text-gray-800">{r.yol}</td>
                    <td className="px-4 py-3 text-gray-600">{r.sure}</td>
                    <td className="px-4 py-3 text-gray-500 leading-relaxed">{r.not}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Vergi Planlama */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle size={14} className="text-[#00C49F]" /> Vergi Planlaması Yöntemleri
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {VERGI_PLANLAMA.map((v, i) => (
              <div key={i} className="bg-[#F0FDF8] rounded-xl p-3">
                <p className="text-xs font-black text-gray-900 mb-0.5">{v.yontem}</p>
                <p className="text-[10px] text-gray-600 leading-relaxed">{v.avantaj}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Warning */}
        <section className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <AlertTriangle size={14} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 leading-relaxed">
            <span className="font-black">Önemli:</span> Ortak mülkiyet uyuşmazlıkları uzun ve maliyetli davalara dönüşebilir. Ortak alım öncesinde yazılı ortaklık anlaşması (paysahipleri sözleşmesi) yapılması şiddetle tavsiye edilir.
          </p>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Rehberler</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/hisseli-tapu', label: 'Hisseli Tapu Rehberi' },
              { href: '/miras-ve-gayrimenkul', label: 'Miras ve Gayrimenkul' },
              { href: '/sozlesme-iptal', label: 'Sözleşme İptal ve Fesih' },
              { href: '/tapu-devir-sureci', label: 'Tapu Devir Süreci' },
              { href: '/kat-karsiligi', label: 'Kat Karşılığı Rehberi' },
              { href: '/gayrimenkul-komisyoncusu', label: 'Komisyoncu Rehberi' },
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
