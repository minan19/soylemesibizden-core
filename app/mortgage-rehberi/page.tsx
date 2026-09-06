import { Metadata } from 'next';
import Link from 'next/link';
import { Home, CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Mortgage Rehberi 2024 | Konut Kredisi Nasıl Alınır? | Söylemesi Bizden',
  description:
    'Mortgage nedir, nasıl hesaplanır? Faiz türleri, vade seçimi, LTV oranı, erken ödeme ve mortgage başvuru sürecine dair kapsamlı rehber.',
};

const TEMEL_KAVRAMLAR = [
  {
    kavram: 'Anapara',
    aciklama: 'Bankadan alınan kredi tutarı. Aylık taksitlerin bir kısmı anaparayı, bir kısmı faizi kapatır; dönem başında faiz payı yüksektir.',
  },
  {
    kavram: 'Faiz Oranı',
    aciklama: 'Aylık bazda ifade edilir; yıllık faizi 12\'ye bölmek yaklaşık aylık faizi verir. Türkiye\'de konut kredisi 2024\'te aylık %3,50–4,20 aralığında.',
  },
  {
    kavram: 'Vade',
    aciklama: 'Geri ödeme süresi; 12–240 ay (1–20 yıl) arasında seçilir. Uzun vade taksiti düşürür, toplam ödenen faizi artırır.',
  },
  {
    kavram: 'LTV (Loan-to-Value)',
    aciklama: 'Kredi/mülk değeri oranı. 2024\'te maksimum %80 (ilk konut), %75 (ikinci konut). Kalan peşinat özkaynak ile karşılanır.',
  },
  {
    kavram: 'YMO (Yıllık Maliyet Oranı)',
    aciklama: 'Sadece faiz değil, dosya ücreti, sigorta ve diğer tüm maliyetleri yansıtır. Bankalar arası karşılaştırma için faiz oranı yerine YMO kullanın.',
  },
  {
    kavram: 'Erken Ödeme',
    aciklama: '2024\'te kredi bakiyesinin %2\'sine kadar erken ödeme komisyonu alınabilir. Sözleşme imzalanmadan koşulları öğrenin.',
  },
];

const FAIZ_TURLERI = [
  {
    tur: 'Sabit Faizli Mortgage',
    avantaj: 'Taksit miktarı vade boyunca değişmez; bütçe planlaması kesindir',
    dezavantaj: 'Başlangıç faiz oranı değişkenliye göre biraz daha yüksek olabilir',
    ideal: 'Uzun vadeli güvence arayan, gelir değişkenliği düşük alıcılar',
  },
  {
    tur: 'Değişken Faizli Mortgage',
    avantaj: 'Merkez Bankası faiz indirimlerinden otomatik yararlanırsınız',
    dezavantaj: 'Taksit her dönem artabilir; bütçe belirsizliği yüksektir',
    ideal: 'Kısa vadede satış planı olan veya faiz düşüşü bekleyen alıcılar',
  },
  {
    tur: 'Karma (Başlangıç Sabit)',
    avantaj: 'İlk 3–5 yıl sabit; ardından değişkene geçer. Başlangıç taksiti düşük',
    dezavantaj: 'Değişken döneme geçişte taksit artışına hazırlıklı olunmalı',
    ideal: 'Birkaç yıl içinde ek ödeme veya satış planlayan alıcılar',
  },
];

const VADE_TABLOSU = [
  { vade: '60 ay (5 yıl)', taksit: '22.980', toplamOdeme: '1.379.000', toplamFaiz: '379.000', yuzde: 38 },
  { vade: '120 ay (10 yıl)', taksit: '14.420', toplamOdeme: '1.730.000', toplamFaiz: '730.000', yuzde: 62 },
  { vade: '180 ay (15 yıl)', taksit: '11.800', toplamOdeme: '2.124.000', toplamFaiz: '1.124.000', yuzde: 78 },
  { vade: '240 ay (20 yıl)', taksit: '10.620', toplamOdeme: '2.549.000', toplamFaiz: '1.549.000', yuzde: 100 },
];

const BASVURU_BELGELERI = [
  'Kimlik belgesi (T.C. nüfus cüzdanı veya pasaport)',
  'Son 3 aylık maaş bordrosu (çalışanlar)',
  'İşveren onaylı maaş yazısı',
  'SGK hizmet dökümü (e-Devlet)',
  'Son 2 yıl vergi beyannamesi (serbest meslek / işletme sahibi)',
  'Tapu fotokopisi veya satış vaadi sözleşmesi',
  'Yapı kullanım izni (iskan belgesi)',
];

const HESAPLAMA_ADIMI = [
  { sira: 1, baslik: 'Aylık taksit formülü', aciklama: 'M = P × [r(1+r)ⁿ] / [(1+r)ⁿ−1]. P: anapara, r: aylık faiz, n: vade (ay).' },
  { sira: 2, baslik: '1M ₺ kredi, %3,90 aylık, 120 ay', aciklama: 'r = 0,039; n = 120. Aylık taksit ≈ 40.500 ₺.' },
  { sira: 3, baslik: 'Toplam ödeme', aciklama: '40.500 × 120 = 4.860.000 ₺. Toplam faiz yükü = 3.860.000 ₺.' },
  { sira: 4, baslik: 'YMO hesabı', aciklama: 'Taksitlere ek masrafları (dosya, sigorta) ekleyip iç verim hesabıyla bulunur. Bankaların sözleşme öncesi KKDF bildiriminde yer alır.' },
];

const IPUCLARI = [
  'Peşinatı %30\'a çıkarmak aylık taksidinizi %20–25 düşürür',
  '2–3 bankaya eş zamanlı başvurarak YMO karşılaştırması yapın',
  'Dosya ücretini krediyle değil, nakit ödemeyi tercih edin',
  'Banka hayat sigortası yerine kendinizin seçtiği sigorta %30–50 daha ucuz olabilir',
  'Yıllık ikramiye veya prim ödemelerinizi anaparadan düşürün — erken ödeme maliyeti hızla azaltır',
  'Refinansman seçeneğini takip edin: TCMB faiz düşürürse mevcut kredinizi daha düşük oranlı yenisiyle kapatabilirsiniz',
];

export default function MortgageRehberiPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <Home size={13} /> Mortgage Rehberi
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Mortgage Rehberi 2024
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            Konut kredisi nasıl çalışır? Faiz türleri, vade hesabı, başvuru süreci ve akıllı ipuçları.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-[#00C49F]">%80</p>
              <p className="text-xs text-gray-400">Maks. LTV</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">20 Yıl</p>
              <p className="text-xs text-gray-400">Maks. vade</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-400">YMO</p>
              <p className="text-xs text-gray-400">Karşılaştırma ölçütü</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* Temel Kavramlar */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Temel Kavramlar</h2>
          <div className="space-y-3">
            {TEMEL_KAVRAMLAR.map((k, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                <p className="text-xs font-black text-[#00C49F] mb-1">{k.kavram}</p>
                <p className="text-[10px] text-gray-600 leading-relaxed">{k.aciklama}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Faiz Türleri */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Faiz Türleri</h2>
          <div className="space-y-4">
            {FAIZ_TURLERI.map((f, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <p className="text-xs font-black text-gray-900 mb-3">{f.tur}</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="bg-[#F0FDF8] rounded-xl p-3">
                    <p className="text-[10px] font-black text-[#00C49F] mb-1">Avantaj</p>
                    <p className="text-[10px] text-gray-700 leading-relaxed">{f.avantaj}</p>
                  </div>
                  <div className="bg-rose-50 rounded-xl p-3">
                    <p className="text-[10px] font-black text-rose-600 mb-1">Dezavantaj</p>
                    <p className="text-[10px] text-gray-700 leading-relaxed">{f.dezavantaj}</p>
                  </div>
                  <div className="bg-amber-50 rounded-xl p-3">
                    <p className="text-[10px] font-black text-amber-600 mb-1">İdeal Profil</p>
                    <p className="text-[10px] text-gray-700 leading-relaxed">{f.ideal}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Vade Karşılaştırma */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-1">Vade Karşılaştırması</h2>
          <p className="text-[10px] text-gray-500 mb-4">1.000.000 ₺ anapara, aylık %3,90 faiz ile örnek hesaplama</p>
          <div className="space-y-4">
            {VADE_TABLOSU.map((v, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between items-baseline">
                  <p className="text-xs font-black text-gray-800">{v.vade}</p>
                  <p className="text-xs text-gray-500">Taksit: <span className="font-black text-gray-900">{v.taksit} ₺/ay</span></p>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-rose-400 h-full rounded-full" style={{ width: `${v.yuzde}%` }} />
                </div>
                <p className="text-[10px] text-gray-500">Toplam faiz: <span className="text-rose-600 font-black">{v.toplamFaiz} ₺</span> — Toplam ödeme: {v.toplamOdeme} ₺</p>
              </div>
            ))}
          </div>
        </section>

        {/* Hesaplama Adımları */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4">Taksit Hesaplama Mantığı</h2>
          <div className="space-y-3">
            {HESAPLAMA_ADIMI.map((a) => (
              <div key={a.sira} className="flex gap-3">
                <div className="w-7 h-7 rounded-full bg-[#00C49F] text-white text-[10px] font-black flex items-center justify-center shrink-0">{a.sira}</div>
                <div>
                  <p className="text-xs font-black text-gray-900 mb-0.5">{a.baslik}</p>
                  <p className="text-[10px] text-gray-600 leading-relaxed">{a.aciklama}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Başvuru Belgeleri */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle size={14} className="text-[#00C49F]" /> Başvuru Belgeleri
          </h2>
          <div className="space-y-2">
            {BASVURU_BELGELERI.map((b, i) => (
              <div key={i} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                <CheckCircle size={12} className="text-[#00C49F] shrink-0" />
                <p className="text-xs text-gray-700">{b}</p>
              </div>
            ))}
          </div>
        </section>

        {/* İpuçları */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Akıllı Mortgage İpuçları</h2>
          <div className="space-y-3">
            {IPUCLARI.map((ip, i) => (
              <div key={i} className="flex items-start gap-3 bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                <div className="w-5 h-5 rounded-full bg-[#00C49F]/10 text-[#00C49F] text-[10px] font-black flex items-center justify-center shrink-0">{i + 1}</div>
                <p className="text-xs text-gray-700 leading-relaxed">{ip}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Uyarı */}
        <section className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <AlertTriangle size={14} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 leading-relaxed">
            <span className="font-black">Önemli:</span> Bu rehberdeki faiz oranları ve hesaplamalar bilgilendirme amaçlıdır; 2024 yılı verilerine dayanmaktadır. Güncel banka tekliflerini Yıllık Maliyet Oranı (YMO) üzerinden karşılaştırın; faiz oranı tek başına yeterli bir karşılaştırma ölçütü değildir.
          </p>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Araçlar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/mortgage-simulatoru', label: 'Mortgage Simülatörü' },
              { href: '/banka-kredileri', label: 'Banka Kredileri Karşılaştırma' },
              { href: '/konut-kredisi-basvuru', label: 'Konut Kredisi Başvuru Rehberi' },
              { href: '/odeme-plani', label: 'Ödeme Planı Simülatörü' },
              { href: '/kredi-karsilastirma', label: 'Kredi Karşılaştırma' },
              { href: '/kira-mi-satin-mi', label: 'Kira mı Satın mı?' },
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
