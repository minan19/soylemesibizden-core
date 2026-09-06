import { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, AlertTriangle, ArrowRight, Home } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Mortgage Danışmanı Nedir? Nasıl Seçilir? | Söylemesi Bizden',
  description:
    'Mortgage danışmanı ne iş yapar, nasıl seçilir? Bağımsız danışman ve banka temsilcisi farkı, sorulması gereken sorular ve ücretlendirme rehberi.',
};

const DANISMANIN_ROLLERI = [
  { rol: 'Kredi Analizi', aciklama: 'Gelir, borç ve kredi notunuzu değerlendirerek alabileceğiniz maksimum kredi miktarını hesaplar.' },
  { rol: 'Banka Karşılaştırması', aciklama: 'Birden fazla bankanın faiz oranı, masraf ve koşullarını karşılaştırarak en uygun teklifi bulur.' },
  { rol: 'Başvuru Hazırlığı', aciklama: 'Gerekli belgeleri toplar, eksiklikleri tamamlar ve başvuruyu bankaya sunar.' },
  { rol: 'Müzakere', aciklama: 'Banka ile faiz oranı, vade ve masraf konusunda müzakere eder; genellikle daha iyi koşullar elde edilir.' },
  { rol: 'Süreç Takibi', aciklama: 'Değerleme, tapu ve sigorta süreçlerini takip ederek teslimata kadar koordinasyonu sağlar.' },
];

const BAGIMSIZ_VS_BANKA = [
  { kriter: 'Banka Erişimi', bagimsiz: 'Birden fazla banka', banka: 'Tek banka' },
  { kriter: 'Ücret', bagimsiz: 'Komisyon veya sabit ücret', banka: 'Genellikle ücretsiz' },
  { kriter: 'Tarafsızlık', bagimsiz: 'Müşteri çıkarını önde tutar', banka: 'Kendi ürününü satar' },
  { kriter: 'Uzmanlaşma', bagimsiz: 'Yalnızca mortgage', banka: 'Tüm bankacılık ürünleri' },
  { kriter: 'Esneklik', bagimsiz: 'Yüksek (banka seçimi)', banka: 'Düşük (tek ürün gamı)' },
];

const SECIM_KRITERLERI = [
  { kriter: 'Lisans ve Yetki', aciklama: 'Türkiye\'de konut kredisi aracılığı için BDDK veya SPK lisansı olmalıdır; yetki belgesini isteyin.' },
  { kriter: 'Deneyim', aciklama: 'En az 3–5 yıl konut kredisi aracılığı deneyimi ve referansları olması tercih edilir.' },
  { kriter: 'Çalışılan Banka Sayısı', aciklama: 'En az 5–8 farklı bankayla çalışan danışmanlar daha geniş karşılaştırma sunar.' },
  { kriter: 'Şeffaf Ücretlendirme', aciklama: 'Komisyon oranını (genellikle %0.5–1) baştan netleştirin; gizli ücret olmaması gerekir.' },
  { kriter: 'İletişim Hızı', aciklama: 'Banka evrakları için hızlı dönüş yapabilen, 7/24 ulaşılabilir danışman seçin.' },
];

const SORULACAK_SORULAR = [
  'Hangi bankalarla çalışıyorsunuz ve toplam kaç bankayla anlaşmanız var?',
  'Komisyon oranınız nedir ve bu bedeli kim öder (ben mi, banka mı)?',
  'Ortalama kaç günde kredi onayı alıyorsunuz?',
  'Değerleme ve tapu masraflarını da sizden takip edebilir miyim?',
  'Kredi onaylanmadığında ücret talep eder misiniz?',
  'Referans verebileceğiniz geçmiş müşterileriniz var mı?',
];

const UCRETLENDIRME = [
  { model: 'Bankadan Komisyon', aciklama: 'Danışman ücreti doğrudan bankadan alır; müşteri sıfır ödeme yapar. En yaygın model.', ornek: 'Kredi tutarının %0.5–1\'i' },
  { model: 'Müşteriden Sabit Ücret', aciklama: 'Başarılı veya başarısız her başvuru için önceden belirlenen tutar alınır.', ornek: '3.000–8.000 ₺ arası' },
  { model: 'Başarı Bazlı', aciklama: 'Sadece kredi onaylanırsa ücret ödenir; risk müşteriye aittir.', ornek: 'Onaylanınca %0.5–1' },
];

export default function MortgageDanismanıPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <Home size={13} /> Mortgage Danışmanı
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Mortgage Danışmanı Rehberi
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            Mortgage danışmanı ne iş yapar, bağımsız danışman mı banka mı tercih edilmeli, nasıl seçilir?
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-[#00C49F]">%0.5–1</p>
              <p className="text-xs text-gray-400">Komisyon oranı</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">5 Rol</p>
              <p className="text-xs text-gray-400">Danışman görevi</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-400">8+</p>
              <p className="text-xs text-gray-400">Banka erişimi</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* Danışmanın Rolleri */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Mortgage Danışmanı Ne İş Yapar?</h2>
          <div className="space-y-3">
            {DANISMANIN_ROLLERI.map((r, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-[#00C49F] text-white text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">{i + 1}</div>
                  <div>
                    <p className="text-xs font-black text-gray-900">{r.rol}</p>
                    <p className="text-[10px] text-gray-600 leading-relaxed mt-0.5">{r.aciklama}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bağımsız vs Banka */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm overflow-x-auto">
          <h2 className="text-sm font-black text-gray-900 mb-4">Bağımsız Danışman vs Banka Temsilcisi</h2>
          <table className="w-full text-[10px] min-w-[400px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 font-black text-gray-500">Kriter</th>
                <th className="text-center py-2 font-black text-[#00C49F]">Bağımsız Danışman</th>
                <th className="text-center py-2 font-black text-gray-500">Banka Temsilcisi</th>
              </tr>
            </thead>
            <tbody>
              {BAGIMSIZ_VS_BANKA.map((b, i) => (
                <tr key={i} className="border-b border-gray-50">
                  <td className="py-2 font-bold text-gray-700">{b.kriter}</td>
                  <td className="py-2 text-center text-[#00C49F] font-bold">{b.bagimsiz}</td>
                  <td className="py-2 text-center text-gray-600">{b.banka}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Seçim Kriterleri */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle size={14} className="text-[#00C49F]" /> Danışman Seçim Kriterleri
          </h2>
          <div className="space-y-2">
            {SECIM_KRITERLERI.map((s, i) => (
              <div key={i} className="flex items-start gap-3 py-2 border-b border-gray-50 last:border-0">
                <CheckCircle size={12} className="text-[#00C49F] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-black text-gray-900">{s.kriter}</p>
                  <p className="text-[10px] text-gray-500 mt-0.5">{s.aciklama}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Sorulacak Sorular */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Danışmana Sormanız Gereken 6 Soru</h2>
          <div className="space-y-2">
            {SORULACAK_SORULAR.map((s, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm flex items-start gap-3">
                <span className="text-xs font-black text-[#00C49F] shrink-0">{i + 1}.</span>
                <p className="text-xs text-gray-700 leading-relaxed">{s}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Ücretlendirme */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4">Ücretlendirme Modelleri</h2>
          <div className="space-y-3">
            {UCRETLENDIRME.map((u, i) => (
              <div key={i} className="py-2 border-b border-gray-50 last:border-0">
                <div className="flex items-start justify-between mb-1">
                  <p className="text-xs font-black text-gray-900">{u.model}</p>
                  <span className="text-[10px] bg-[#F0FDF8] text-[#00C49F] font-black px-2 py-0.5 rounded shrink-0">{u.ornek}</span>
                </div>
                <p className="text-[10px] text-gray-600 leading-relaxed">{u.aciklama}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Uyarı */}
        <section className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <AlertTriangle size={14} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 leading-relaxed">
            <span className="font-black">Dikkat:</span> Danışman seçmeden önce lisans ve yetki belgesini mutlaka kontrol edin. Lisanssız aracılar aracılığıyla yapılan kredi başvurularında hukuki ve mali riskler doğabilir.
          </p>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Araçlar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/konut-kredisi-simulatoru', label: 'Konut Kredisi Simülatörü' },
              { href: '/banka-kredileri', label: 'Banka Kredileri Karşılaştırma' },
              { href: '/kredi-karsilastirma', label: 'Kredi Karşılaştırma Aracı' },
              { href: '/odeme-plani', label: 'Ödeme Planı Simülatörü' },
              { href: '/kredi-notu-rehberi', label: 'Kredi Notu Rehberi' },
              { href: '/ilk-ev-alma-rehberi', label: 'İlk Ev Alma Rehberi' },
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
