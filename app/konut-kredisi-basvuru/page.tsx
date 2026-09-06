import { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, AlertTriangle, ArrowRight, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Konut Kredisi Başvuru Rehberi | Belgeler, Süreç, İpuçları | Söylemesi Bizden',
  description:
    'Konut kredisi başvurusu nasıl yapılır? Gerekli belgeler, kredi notu şartları, başvuru sürecinde nelere dikkat edilmeli ve onay için ipuçları.',
};

const BASVURU_ADIMLARI = [
  { adim: 'Kredi Notunuzu Kontrol Edin', aciklama: 'Bankalar genellikle 1200+ kredi notu ister; düşük notsa önce notunuzu artırın. Findeks veya e-Devlet üzerinden ücretsiz sorgulayabilirsiniz.', sure: 'Başvuru Öncesi' },
  { adim: 'Bütçenizi Belirleyin', aciklama: 'Aylık gelirinizin %40\'ını aşmayan taksit hesaplayın; ekspertiz değerinin en fazla %80\'i kredi olarak çekilebilir.', sure: 'Başvuru Öncesi' },
  { adim: 'Bankaları Karşılaştırın', aciklama: 'En az 3–5 bankadan teklif alın; yalnızca faiz oranı değil, masraf, sigorta ve esneklik koşullarını da değerlendirin.', sure: 'Başvuru Öncesi' },
  { adim: 'Ön Başvuru Yapın', aciklama: 'Seçtiğiniz bankaya belgelerle başvurun; ön onay genellikle 1–3 iş günü içinde bildirilir.', sure: '1–3 İş Günü' },
  { adim: 'Ekspertiz Değerleme', aciklama: 'Banka, satın alınacak mülkün piyasa değerini belirlemek için SPK lisanslı ekspertiz şirketi gönderir.', sure: '2–5 İş Günü' },
  { adim: 'Sigorta Yaptırın', aciklama: 'Banka, hayat sigortası ve konut sigortası yaptırmanızı zorunlu kılar; fiyat karşılaştırması yapabilirsiniz.', sure: 'Onay Sonrası' },
  { adim: 'Sözleşme İmzalama', aciklama: 'Kredi sözleşmesini dikkatlice okuyun; faiz oranı, masraflar ve erken ödeme koşullarını kontrol edin.', sure: 'Onay Günü' },
  { adim: 'Tapu ve Ödeme', aciklama: 'Sözleşme imzalandıktan sonra banka tapu işlemiyle eş zamanlı ödeme yapar; genellikle tapu müdürlüğünde gerçekleşir.', sure: '1–3 İş Günü' },
];

const GEREKLI_BELGELER = [
  { belge: 'Nüfus cüzdanı / pasaport (alıcı)', zorunlu: true },
  { belge: 'Gelir belgesi (son 3 ay maaş bordrosu / SGK dökümü)', zorunlu: true },
  { belge: 'Vergi levhası (serbest meslek / şirket sahipleri için)', zorunlu: false },
  { belge: 'Son 3 aylık banka hesap ekstresi', zorunlu: true },
  { belge: 'İkametgah belgesi (e-Devlet\'ten alınabilir)', zorunlu: true },
  { belge: 'Satılık mülkün tapusu (satıcıdan)', zorunlu: true },
  { belge: 'Satış vaadi sözleşmesi (varsa)', zorunlu: false },
  { belge: 'DASK poliçesi (satıcıdan)', zorunlu: true },
];

const ONAY_IPUCLARI = [
  { ipucu: 'Kredi Notunu Artırın', aciklama: 'Kredi kartı borçlarını ödeyin ve kullanım oranını %30\'un altına düşürün; 3–6 ay içinde ciddi artış sağlanabilir.' },
  { ipucu: 'SGK Kaydı Şart', aciklama: 'Çalışanlar için en az 6 aylık SGK kaydı genellikle zorunludur; kısa süreli çalışanlar destek eş almayı düşünebilir.' },
  { ipucu: 'Birden Fazla Gelir Kaynağı', aciklama: 'Kira geliri, emekli maaşı veya yan iş gelirlerini belgeleyerek kredi limitinizi artırabilirsiniz.' },
  { ipucu: 'Mülk Değeri Önemli', aciklama: 'Ekspertiz değeri satış fiyatının altında çıkarsa kredi miktarı düşer; bu durumu önceden hesaplayın.' },
  { ipucu: 'Önceki Kredileri Kapatın', aciklama: 'Varsa diğer kredi taksit yüklerini azaltmak, yeni kredi limitinizi artırır.' },
];

const MASRAFLAR = [
  { masraf: 'Ekspertiz Ücreti', tutar: '500–2.000 ₺', aciklama: 'Banka tarafından talep edilir; bazı bankalar ücretsiz yapar.' },
  { masraf: 'İpotek Tesis Ücreti', tutar: '1.000–3.000 ₺', aciklama: 'Tapu müdürlüğünde ipotek işlemi için alınan ücret.' },
  { masraf: 'Hayat Sigortası', tutar: 'Kredi tutarına göre', aciklama: 'Yıllık prim; banka dışı firmadan da alınabilir.' },
  { masraf: 'DASK', tutar: '500–3.000 ₺', aciklama: 'Zorunlu deprem sigortası; alan ve risk bölgesine göre değişir.' },
  { masraf: 'Konut Sigortası', tutar: '300–1.500 ₺', aciklama: 'Zorunlu olmasa da bankalar genellikle talep eder.' },
];

export default function KonutKredisiBasvuruPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <FileText size={13} /> Konut Kredisi
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Konut Kredisi Başvuru Rehberi
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            Başvurudan tapu teslimine 8 adım, gerekli belgeler, masraflar ve onay ipuçları.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-[#00C49F]">8 Adım</p>
              <p className="text-xs text-gray-400">Başvuru süreci</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">%80</p>
              <p className="text-xs text-gray-400">Maks. kredi oranı</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-400">1200+</p>
              <p className="text-xs text-gray-400">Kredi notu eşiği</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* Başvuru Adımları */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Başvuru Adımları</h2>
          <div className="space-y-3">
            {BASVURU_ADIMLARI.map((a, i) => (
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

        {/* Belgeler */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle size={14} className="text-[#00C49F]" /> Gerekli Belgeler
          </h2>
          <div className="space-y-2">
            {GEREKLI_BELGELER.map((b, i) => (
              <div key={i} className="flex items-center gap-2 py-1.5 border-b border-gray-50 last:border-0">
                <CheckCircle size={11} className={b.zorunlu ? 'text-[#00C49F]' : 'text-gray-300'} />
                <p className="text-xs text-gray-700">{b.belge}</p>
                {!b.zorunlu && <span className="text-[10px] text-gray-400 ml-auto shrink-0">İsteğe Bağlı</span>}
              </div>
            ))}
          </div>
        </section>

        {/* Onay İpuçları */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Onay Alma İpuçları</h2>
          <div className="space-y-3">
            {ONAY_IPUCLARI.map((o, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                <p className="text-xs font-black text-[#00C49F] mb-1">{o.ipucu}</p>
                <p className="text-[10px] text-gray-600 leading-relaxed">{o.aciklama}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Masraflar */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm overflow-x-auto">
          <h2 className="text-sm font-black text-gray-900 mb-4">Kredi Masrafları</h2>
          <table className="w-full text-[10px] min-w-[400px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 font-black text-gray-500">Masraf</th>
                <th className="text-center py-2 font-black text-[#00C49F]">Tutar</th>
                <th className="text-left py-2 font-black text-gray-500">Açıklama</th>
              </tr>
            </thead>
            <tbody>
              {MASRAFLAR.map((m, i) => (
                <tr key={i} className="border-b border-gray-50">
                  <td className="py-2 font-black text-gray-900">{m.masraf}</td>
                  <td className="py-2 text-center font-black text-[#00C49F]">{m.tutar}</td>
                  <td className="py-2 text-gray-600">{m.aciklama}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Uyarı */}
        <section className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <AlertTriangle size={14} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 leading-relaxed">
            <span className="font-black">Önemli:</span> Sözleşmeyi imzalamadan önce KKDF, BSMV ve masraflar dahil toplam maliyet bildirimini (TKGB) bankadan mutlaka talep edin. Erken ödeme durumunda uygulanan ceza oranını da sözleşmede kontrol edin.
          </p>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Araçlar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/faiz-orani-karsilastirici', label: 'Faiz Oranı Karşılaştırıcı' },
              { href: '/konut-kredisi-simulatoru', label: 'Konut Kredisi Simülatörü' },
              { href: '/kredi-notu-rehberi', label: 'Kredi Notu Rehberi' },
              { href: '/odeme-plani', label: 'Ödeme Planı Simülatörü' },
              { href: '/pesinat-hesaplayici', label: 'Peşinat Hesaplayıcı' },
              { href: '/mortgage-danismani', label: 'Mortgage Danışmanı Rehberi' },
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
