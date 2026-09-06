import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Konut Finansman Rehberi | Kredi, Taksitli Satış ve Alternatifler | Söylemesi Bizden',
  description:
    'Konut alımında finansman yöntemleri: banka kredisi, taksitli satış, konut sertifikası, kira-satın alma modeli ve finansal planlama rehberi.',
};

const FINANSMAN_YONTEMLERI = [
  {
    yontem: 'Konut Kredisi (Mortgage)',
    artilari: ['En yaygın yöntem', 'Uzun vadeli ödeme planı (5–30 yıl)', 'Rekabetçi faiz oranları'],
    eksileri: ['Yüksek faiz ortamında maliyet artar', 'Peşinat zorunlu (%20–25)', 'Banka onay süreci'],
    kimIcin: 'Düzenli geliri olan, peşinatı hazır alıcılar için idealdir.',
    maliyetOran: 'Faiz: aylık %3.5–4.5',
  },
  {
    yontem: 'Taksitli Satış (Müteahhitten)',
    artilari: ['Banka sürecine gerek yok', 'Esnek ödeme planı', 'Faizsiz veya düşük faizli seçenekler'],
    eksileri: ['Teslim riski var', 'Hukuki güvence bankadan düşük', 'Tapu sonradan alınır'],
    kimIcin: 'Geliştiriciye güvenen veya banka kredisi alamayan alıcılar.',
    maliyetOran: 'Vade farkı: %20–40/yıl',
  },
  {
    yontem: 'Konut Sertifikası (T.C. Hazine)',
    artilari: ['Faizsiz birikim aracı', 'Devlet güvencesi', 'Küçük miktarlarla başlanabilir'],
    eksileri: ['Yalnızca TOKİ projelerinde geçerli', 'Birikim süresi uzun', 'Seçim kısıtlı'],
    kimIcin: 'Uzun vadeli birikim yaparak ev sahibi olmak isteyen kişiler.',
    maliyetOran: 'Enflasyon korumalı',
  },
  {
    yontem: 'Kira - Satın Alma Modeli',
    artilari: ['Peşinat gerektirmez', 'Kirayı ödeyerek mülk sahibi olunur', 'Esneklik'],
    eksileri: ['Türkiye\'de henüz yaygın değil', 'Özel sözleşme şartları', 'Hukuki karmaşıklık'],
    kimIcin: 'Geliri var ama birikimi olmayan, deneme amaçlı değerlendirmek isteyenler.',
    maliyetOran: 'Kira bedeli + mülk değeri üzerine anlaşma',
  },
  {
    yontem: 'Aile / Akraba Borcu',
    artilari: ['Faizsiz olabilir', 'Esnek geri ödeme', 'Bürokratik süreç yok'],
    eksileri: ['Kişisel ilişkileri zorlar', 'Hukuki güvence gerektiriyor', 'Noterde belgelenmeli'],
    kimIcin: 'Güvenilir aile finansmanı olanlar; noter onaylı senet ile.',
    maliyetOran: 'Taraflara göre değişir',
  },
];

const PESINA_PLANI = [
  { yuzde: 10, not: 'Asgari peşinat; bazı bankalar %10\'dan başlar ama faiz daha yüksektir.' },
  { yuzde: 20, not: 'Standart peşinat; rekabetçi faiz oranı için önerilen seviye.' },
  { yuzde: 30, not: 'İyi oranlar; kredi onay şansı ve aylık taksit önemli ölçüde düşer.' },
  { yuzde: 50, not: 'Yüksek peşinat; faiz maliyeti minimuma iner, kısa vadeli kredi yeterli.' },
];

const HAZIRLIK_ADIMLARI = [
  { adim: 1, baslik: 'Kredi Skoru Kontrolü', aciklama: 'Kredi başvurusu öncesinde Findeks veya banka uygulamasından kredi skorunuzu kontrol edin. Düşükse 3–6 ay iyileştirme yapın.' },
  { adim: 2, baslik: 'Peşinat Birikimi', aciklama: 'Hedef mülk fiyatının en az %20\'sini nakit olarak hazır edin. Bununla birlikte tapu masrafı, emlakçı komisyonu ve nakliye için +%5–8 ekstra ayırın.' },
  { adim: 3, baslik: 'Banka Ön Onayı', aciklama: 'Mülk aramadan önce banka ön onayı alın; bu sayede bütçenizi netleştirirsiniz ve satıcı nezdinde güçlü konumdasınız.' },
  { adim: 4, baslik: 'Toplam Maliyet Hesabı', aciklama: 'Satış fiyatına ek olarak: tapu harcı (%4), döner sermaye, DASK ve ilk yıl aidat/bakım giderlerini de bütçenize dahil edin.' },
  { adim: 5, baslik: 'Banka Karşılaştırması', aciklama: 'En az 3 farklı bankadan kredi teklifi alın; faiz oranının yanı sıra dosya masrafı, hayat sigortası ve ekspertiz ücretlerini karşılaştırın.' },
];

export default function KonutFinansmanRehberiPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <p className="text-[#00C49F] text-xs font-bold mb-3 uppercase tracking-widest">Finansman Rehberi</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">Konut Finansman Rehberi</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            Ev alımında banka kredisinden taksitli satışa, konut sertifikasından kira-satın alma modeline kadar tüm finansman seçenekleri.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">

        {/* Finansman Yöntemleri */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-1">Finansman Yöntemleri</h2>
          <p className="text-xs text-gray-400 mb-5">Artı ve eksileriyle başlıca konut finansman seçenekleri.</p>
          <div className="space-y-5">
            {FINANSMAN_YONTEMLERI.map((f, i) => (
              <div key={i} className="border border-gray-100 rounded-xl p-5">
                <div className="flex flex-wrap justify-between items-start gap-2 mb-3">
                  <p className="text-xs font-black text-gray-900">{f.yontem}</p>
                  <span className="text-[10px] font-black text-[#00C49F] bg-[#00C49F]/10 px-2 py-0.5 rounded-full">{f.maliyetOran}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                  <div>
                    <p className="text-[10px] font-black text-emerald-600 mb-1">Artıları</p>
                    {f.artilari.map((a, j) => <p key={j} className="text-[10px] text-gray-600">• {a}</p>)}
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-rose-500 mb-1">Eksileri</p>
                    {f.eksileri.map((e, j) => <p key={j} className="text-[10px] text-gray-600">• {e}</p>)}
                  </div>
                </div>
                <p className="text-[10px] text-blue-600 bg-blue-50 rounded-lg px-3 py-2">{f.kimIcin}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Peşinat Tablosu */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-1">Peşinat Oranı Rehberi</h2>
          <p className="text-xs text-gray-400 mb-5">Farklı peşinat oranlarının kredi koşullarına etkisi.</p>
          <div className="space-y-3">
            {PESINA_PLANI.map((p, i) => (
              <div key={i} className="flex items-center gap-4 border border-gray-100 rounded-xl p-3">
                <div className="w-12 h-12 rounded-xl bg-[#00C49F]/10 flex items-center justify-center shrink-0">
                  <span className="text-xs font-black text-[#00C49F]">%{p.yuzde}</span>
                </div>
                <p className="text-[11px] text-gray-600">{p.not}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Hazırlık Adımları */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-1">Kredi Başvurusu Hazırlık Adımları</h2>
          <p className="text-xs text-gray-400 mb-5">Konut kredisi için en iyi koşulları sağlamak adına yapılması gerekenler.</p>
          <div className="space-y-4">
            {HAZIRLIK_ADIMLARI.map((a) => (
              <div key={a.adim} className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-[#00C49F] text-white text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">{a.adim}</span>
                <div>
                  <p className="text-xs font-black text-gray-900 mb-0.5">{a.baslik}</p>
                  <p className="text-[11px] text-gray-500 leading-relaxed">{a.aciklama}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
          <p className="text-xs font-black text-amber-700 mb-2">Önemli Uyarı</p>
          <p className="text-[11px] text-amber-600 leading-relaxed">
            Konut finansman kararları uzun vadeli finansal yükümlülük doğurur. Aylık taksitinizin net gelirinizin %35–40&apos;ını aşmamasına dikkat edin. Yüksek faiz dönemlerinde sabit faizli ürünleri tercih etmek uzun vadede riski azaltır.
          </p>
        </div>

      </div>
    </main>
  );
}
