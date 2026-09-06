import { Metadata } from 'next';
import Link from 'next/link';
import {
  Shield, CheckCircle, AlertTriangle, ArrowRight, FileText, Scale,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'İpotek ve Rehin Rehberi | Konut Kredisi, İpotek Tesis, Fek | Söylemesi Bizden',
  description:
    'Gayrimenkulde ipotek nedir, nasıl kurulur? Konut kredisi ipoteği, ipotek tesis masrafları, ipotek fekki ve rehin farkı.',
};

const IPOTEK_TANIM = {
  tanim: 'Bir alacağın güvencesi olarak taşınmaz üzerinde tesis edilen ayni haktır. Borç ödenmezse alacaklı taşınmazı sattırarak alacağını alabilir.',
  medeniKanun: 'Medeni Kanun md. 850–897 — taşınmaz rehni.',
  turler: [
    { tur: 'İpotek (Mortgage)', aciklama: 'Belirli bir alacak için kurulan, tutarı sabit rehin.' },
    { tur: 'İpotekli Borç Senedi', aciklama: 'Senede bağlı, devredilebilir alacak rehni.' },
    { tur: 'İrat Senedi', aciklama: 'Taşınmazdan elde edilen gelire dayalı rehin belgesi.' },
  ],
};

const TESIS_SURECI = [
  { adim: 'Banka Onayı', detay: 'Konut kredisi başvurusu sonuçlanır; banka ekspertiz yaptırır ve ipotek derecesi ile tutarını belirler.' },
  { adim: 'Tapu Randevusu', detay: 'Banka ve borçlu birlikte ya da banka vekâletiyle tapu sicil müdürlüğüne başvurur.' },
  { adim: 'İpotek Sözleşmesi', detay: 'Tapu memuru huzurunda resmi ipotek senedi düzenlenir; her iki taraf imzalar.' },
  { adim: 'Tescil', detay: 'İpotek tapu kütüğüne kaydedilir; 1. veya 2. derece ipotek olarak belirlenir.' },
  { adim: 'Harç ve Masraflar', detay: 'Tapu harcı (ipotek tutarının binde 4,55\'i), döner sermaye ve noter/banka işlem ücretleri ödenir.' },
  { adim: 'Teslim', detay: 'İpotek tescil belgesi alınır; banka kredi kullandırımı gerçekleştirir.' },
];

const DERECE_SISTEMI = [
  { derece: '1. Derece İpotek', oncelik: 'En yüksek öncelik', aciklama: 'İcra satışında ilk sırada ödenir. Bankalar konut kredilerinde genellikle 1. derece talep eder.' },
  { derece: '2. Derece İpotek', oncelik: 'İkinci öncelik', aciklama: 'Birinci derece alacak ödendikten sonraki bakiyeden karşılanır. Ek kredi veya ikinci banka için kullanılabilir.' },
  { derece: '3. Derece +', oncelik: 'Düşük öncelik', aciklama: 'Nadir kullanılır; taşınmazın değerinin yetmeyebileceği durumlarda büyük risk taşır.' },
];

const FEK_SURECI = [
  { adim: 'Borcun Ödenmesi', detay: 'Kredi tamamen kapanır; banka "ipotek fek belgesi" veya "tapu terkin yazısı" düzenler.' },
  { adim: 'Tapu Başvurusu', detay: 'Borçlu veya banka vekili tapu sicil müdürlüğüne başvurur; fek belgesi ibraz edilir.' },
  { adim: 'Terkin Tescili', detay: 'Tapu kütüğündeki ipotek kaydı silinir (terkin edilir); taşınmaz ipotekten kurtulur.' },
  { adim: 'Harç', detay: 'İpotek fekki işleminde döner sermaye ücreti alınır; harç yoktur.' },
  { adim: 'Süre', detay: 'Fek belgesi alındıktan sonra tapu müdürlüğünde işlem aynı gün veya birkaç gün içinde tamamlanır.' },
];

const MASRAFLAR = [
  { kalem: 'İpotek Tesis Tapu Harcı', oran: 'İpotek tutarının ‰4,55\'i', ornek: '1.000.000 ₺ ipotek → ~4.550 ₺' },
  { kalem: 'Döner Sermaye Bedeli', oran: 'Yıllık belirlenen sabit tutar', ornek: '~1.000–2.000 ₺ (2024)' },
  { kalem: 'Banka İşlem Ücreti', oran: 'Bankaya göre değişir', ornek: '500–3.000 ₺ + KDV' },
  { kalem: 'Ekspertiz Ücreti', oran: 'Bağımsız ekspertiz şirketi', ornek: '2.500–5.000 ₺' },
  { kalem: 'İpotek Fekki', oran: 'Harç yok; sadece döner sermaye', ornek: '~500–1.000 ₺' },
];

const IPOTEK_REHIN_FARK = [
  { ozellik: 'Konu', ipotek: 'Taşınmaz (arsa, bina, daire)', rehin: 'Taşınır (araç, hisse, altın)' },
  { ozellik: 'Zilyetlik', ipotek: 'Malik kullanmaya devam eder', rehin: 'Alacaklıya teslim zorunlu (bazı türlerde)' },
  { ozellik: 'Tescil', ipotek: 'Tapu siciline tescil zorunlu', rehin: 'Rehne özgü siciline veya teslimle' },
  { ozellik: 'Hukuki Dayanak', ipotek: 'MK md. 850+', rehin: 'MK md. 939+ / TK' },
  { ozellik: 'Kullanım Alanı', ipotek: 'Konut kredisi, ticari kredi', rehin: 'Araç finansmanı, sermaye piyasası' },
];

const DIKKAT = [
  'İpotek tutarı alacaktan fazla olabilir; kalan limite karşı borçlanmaya dikkat edin.',
  'Taşınmaz satılırken ipotek otomatik kalkar değil; alıcı devir öncesi ipotek fekki talep etmeli.',
  'İpotekli taşınmaz satışında bankanın onayı veya alıcı üstlenme prosedürü gereklidir.',
  'Birden fazla ipotek varsa icra satışında gelir paylaşımı derece sırasına göre yapılır.',
  'İpotek süresi sınırlanabilir; vadesi biten ipotek silinebilir (ipotek faizi vadesinden bağımsız).',
  'Noterde verilen ipotek vekâletnamesi tapu işlemi için yeterlidir; şahsen gitme zorunluluğu yoktur.',
];

export default function IpotekRehniPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <Shield size={13} /> İpotek ve Rehin Rehberi
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            İpotek ve Rehin Rehberi
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            Konut kredisi ipoteği, ipotek tesis ve fek süreci, derece sistemi ve rehin farkı.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-[#00C49F]">‰4,55</p>
              <p className="text-xs text-gray-400">Tapu harcı oranı</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">MK 850</p>
              <p className="text-xs text-gray-400">Yasal dayanak</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-400">3 Derece</p>
              <p className="text-xs text-gray-400">İpotek sıralaması</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* Tanım ve Türler */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-3">İpotek Nedir?</h2>
          <p className="text-xs text-gray-700 leading-relaxed mb-3">{IPOTEK_TANIM.tanim}</p>
          <p className="text-[10px] text-gray-400 mb-4"><span className="font-bold">Yasal Dayanak:</span> {IPOTEK_TANIM.medeniKanun}</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {IPOTEK_TANIM.turler.map((t, i) => (
              <div key={i} className="bg-[#F0FDF8] rounded-xl p-3">
                <p className="text-xs font-black text-gray-900 mb-1">{t.tur}</p>
                <p className="text-[10px] text-gray-600 leading-relaxed">{t.aciklama}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tesis Süreci */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">İpotek Tesis Süreci</h2>
          <div className="space-y-3">
            {TESIS_SURECI.map((s, i) => (
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

        {/* Derece Sistemi */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">İpotek Derece Sistemi</h2>
          <div className="space-y-3">
            {DERECE_SISTEMI.map((d, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm flex items-start gap-3">
                <Scale size={13} className="text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-xs font-black text-gray-900">{d.derece}</p>
                    <span className="text-[10px] bg-blue-50 text-blue-600 font-bold px-2 py-0.5 rounded">{d.oncelik}</span>
                  </div>
                  <p className="text-[10px] text-gray-600 leading-relaxed">{d.aciklama}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* İpotek Fekki */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">İpotek Fekki (Silinmesi)</h2>
          <div className="space-y-3">
            {FEK_SURECI.map((s, i) => (
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

        {/* Masraflar */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <FileText size={14} className="text-[#00C49F]" /> Masraflar ve Harçlar
          </h2>
          <div className="space-y-2">
            {MASRAFLAR.map((m, i) => (
              <div key={i} className="grid grid-cols-3 gap-2 py-2 border-b border-gray-50 last:border-0">
                <p className="text-xs font-bold text-gray-900">{m.kalem}</p>
                <p className="text-[10px] text-gray-600">{m.oran}</p>
                <p className="text-[10px] text-[#00C49F] font-bold">{m.ornek}</p>
              </div>
            ))}
          </div>
        </section>

        {/* İpotek vs Rehin */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">İpotek ve Rehin Farkı</h2>
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
            <div className="grid grid-cols-3 gap-0 bg-gray-50 p-3 text-[10px] font-black text-gray-500 uppercase tracking-wide">
              <div>Özellik</div>
              <div>İpotek</div>
              <div>Rehin (Taşınır)</div>
            </div>
            {IPOTEK_REHIN_FARK.map((r, i) => (
              <div key={i} className={`grid grid-cols-3 gap-0 p-3 border-t border-gray-50 ${i % 2 === 0 ? '' : 'bg-gray-50/40'}`}>
                <p className="text-[10px] font-bold text-gray-700">{r.ozellik}</p>
                <p className="text-[10px] text-gray-600">{r.ipotek}</p>
                <p className="text-[10px] text-gray-600">{r.rehin}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Dikkat */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle size={14} className="text-[#00C49F]" /> Dikkat Edilecekler
          </h2>
          <div className="space-y-2">
            {DIKKAT.map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00C49F] shrink-0 mt-1.5" />
                <p className="text-xs text-gray-700 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Warning */}
        <section className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <AlertTriangle size={14} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 leading-relaxed">
            <span className="font-black">Önemli:</span> İpotekli taşınmaz satın alırken satıcının krediyi kapatıp ipotek fekki yaptırmasını veya satış bedelinin bir kısmını doğrudan bankaya ödeyerek krediyi kapamayı talep edin. Aksi halde ipotek yeni sahibi de bağlar.
          </p>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Rehberler</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/tapu-devir-sureci', label: 'Tapu Devir Süreci' },
              { href: '/tapu-masrafi', label: 'Tapu Masrafı Hesaplayıcı' },
              { href: '/banka-kredileri', label: 'Banka Kredileri Karşılaştırma' },
              { href: '/ekspertiz-raporu', label: 'Ekspertiz Raporu' },
              { href: '/hisseli-tapu', label: 'Hisseli Tapu Rehberi' },
              { href: '/rehber/ev-satin-alma', label: 'Ev Satın Alma Rehberi' },
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
