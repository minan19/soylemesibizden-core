import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fiyat Müzakere Stratejileri | Gayrimenkulde Pazarlık | Söylemesi Bizden',
  description:
    'Gayrimenkul alım satımında etkili fiyat müzakere teknikleri: piyasa analizi, pazarlık taktikleri, alıcı ve satıcı stratejileri, yasal haklar.',
};

const ALICI_STRATEJILERI = [
  {
    baslik: 'Piyasa Araştırması Yapın',
    aciklama: 'Benzer ilanları inceleyin, ortalama ₺/m² değeri hesaplayın. Gerçek piyasa verisi olmadan müzakere zayıf kalır.',
    ipucu: 'Son 3 ayda aynı mahallede satılan ilanların ortalama fiyatını referans alın.',
  },
  {
    baslik: 'İlanın Piyasada Kalma Süresini Araştırın',
    aciklama: 'Uzun süredir satılmayan ilanlar, satıcının daha esnek olduğuna işaret eder. 90+ gün ilanlar için %10-15 indirim talebi makuldür.',
    ipucu: 'Portaldaki ilan tarihini not edin; danışmandan da ilan geçmişini sorabilirsiniz.',
  },
  {
    baslik: 'Eksiklikleri Belgeleyin',
    aciklama: 'Tadilat gerektiren noktalar, eski tesisat, izinsiz yapılar — bunların maliyeti pazarlık kozu olur. Önce hesaplayıcıdan maliyet çıkarın.',
    ipucu: 'Teklifinize "tespit edilen tadilat maliyeti" olarak belgelenmiş bir rakam ekleyin.',
  },
  {
    baslik: 'Alternatif Tekliflerden Bahsedin',
    aciklama: 'Bakılan başka ilanlar olduğunu ima etmek, satıcıyı hızlı karar almaya yönlendirir. Somut olmayan tehditler işe yaramaz.',
    ipucu: 'Gerçekten alternatif taşınmazlar bulundurun; yüzü kızarmadan söyleyebildiğiniz bir koz çok daha güçlüdür.',
  },
  {
    baslik: 'Nakit veya Hızlı Kapanış Teklif Edin',
    aciklama: 'Peşin ödeme veya kısa kapanış süresi, satıcı için büyük avantajdır. Bunu karşılığında indirim talep edebilirsiniz.',
    ipucu: '30 gün içinde tapu — bu koşul çoğu satıcı için fiyat indiriminin yerini alır.',
  },
  {
    baslik: 'Birden Fazla Teklif Turunu Planlayın',
    aciklama: 'İlk teklifinizi gerçek hedef fiyatınızın %5-8 altında verin; karşı teklife hazırlıklı olun. Tek turda kapanmaya çalışmayın.',
    ipucu: 'Satıcı sayaç teklif vermişse bu iyi işarettir — müzakere başlamıştır.',
  },
];

const SATICI_STRATEJILERI = [
  {
    baslik: 'Gerçekçi Bir Liste Fiyatı Belirleyin',
    aciklama: 'Piyasanın %10+ üzerindeki fiyatlar alıcıları kaçırır; uzun bekleme satışı zorlaştırır. Doğru fiyat daha hızlı ve daha az indirimle sonuç verir.',
    ipucu: 'Benzer satışların ₺/m² ortalamasını baz alın; ondan ±%5 aralığında başlayın.',
  },
  {
    baslik: 'İlk Teklife Hemen Kabul Etmeyin',
    aciklama: 'Anında kabul, alıcıda daha düşük teklif verebileceği izlenimi yaratır. 24-48 saat düşünme süresi standart ve makuldür.',
    ipucu: 'Karşı teklifle dönün; mesaj "müzakere açığız ama fiyatımızı kolay bırakmıyoruz" olsun.',
  },
  {
    baslik: 'Taşınmazın Güçlü Yönlerini Ön Plana Çıkarın',
    aciklama: 'Konum, okul yakınlığı, ulaşım, bina yaşı, asansör/otopark gibi özellikler indirim taleplerini dengeleyebilir.',
    ipucu: 'Detay sayfasında bu özellikleri net yazın; müzakerede sözlü referans gösterin.',
  },
  {
    baslik: 'Eşya veya Değer Katın, Nakit İndirim Yerine',
    aciklama: 'Beyaz eşya, mutfak tezgahı, aydınlatma gibi eklemeler alıcı için fiyat indirimi kadar değerli ama sizin için daha az maliyetlidir.',
    ipucu: 'Bu yöntem vergi matrahını da aşağı çekmez; hem sizin hem alıcının lehinedir.',
  },
  {
    baslik: 'Birden Fazla Teklif Rekabeti Yaratın',
    aciklama: 'Aynı anda birden fazla potansiyel alıcı olduğunu duyurmak, fiyat baskısını azaltır ve alıcıyı daha hızlı karar almaya iter.',
    ipucu: 'Birden fazla gerçek ilgili varsa "teklifler için son tarih" belirleyin.',
  },
];

const MUZAKERE_HATALARI = [
  { hata: 'Duygusal kararlar vermek', aciklama: 'Ev satışı iş işlemidir. Kişisel bağ fiyatı yüksek tutmamalıdır.' },
  { hata: 'Alt sınırı açıklamak', aciklama: '"En az X alırım" demeyin; karşı taraf hep o rakamı hedefler.' },
  { hata: 'Sözlü anlaşmaya güvenmek', aciklama: 'Her görüşme noktası yazıya dökülmeli; imzasız taahhüt geçersizdir.' },
  { hata: 'Aceleyle karar vermek', aciklama: 'Baskı altında verilen kararlar genelde pişmanlıkla sonuçlanır; süreyi kendiniz belirleyin.' },
  { hata: 'Danışmana tamamen bırakmak', aciklama: 'Danışman rehber, siz karar vericisiniz. Kilit noktalarda bizzat müzakere edin.' },
];

const YASAL_HAKLAR = [
  {
    baslik: 'Ön Protokol (Ön Sözleşme)',
    aciklama: 'Müzakere tamamlandıktan sonra tapu devrine kadar olan süreci güvence altına alır. Noterde düzenlenmesi tavsiye edilir.',
  },
  {
    baslik: 'Cayma Bedeli (Pey Akçesi)',
    aciklama: 'TBK md. 177: Cayma bedelini ödeyen taraf sözleşmeden dönebilir. Tutar pazarlıkta kararlaştırılır.',
  },
  {
    baslik: 'Gizli Ayıp Hakkı',
    aciklama: 'Tapu devrinden sonra ortaya çıkan yapısal sorunlar için TBK md. 219 kapsamında satıcıya başvurulabilir (5 yıl zamanaşımı).',
  },
  {
    baslik: 'Emlakçı Komisyonu',
    aciklama: 'Yasal oran her iki taraf için ayrı ayrı %2 + KDV. Daha yüksek talep yasal değildir; yazılı sözleşme isteyin.',
  },
];

export default function FiyatMuzakereStratejileriPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <p className="text-[#00C49F] text-xs font-bold mb-3 uppercase tracking-widest">Alım Satım Rehberi</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">Fiyat Müzakere Stratejileri</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            Gayrimenkul alım ve satımında etkili pazarlık teknikleri, yaygın hatalar ve yasal haklarınız.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">

        {/* Alıcı Stratejileri */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-1">Alıcı Müzakere Stratejileri</h2>
          <p className="text-xs text-gray-400 mb-5">İstediğiniz fiyata ulaşmak için kanıtlanmış 6 adım.</p>
          <div className="space-y-4">
            {ALICI_STRATEJILERI.map((s, i) => (
              <div key={i} className="border border-gray-100 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#00C49F] text-white text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                  <div>
                    <p className="text-xs font-black text-gray-900 mb-1">{s.baslik}</p>
                    <p className="text-[11px] text-gray-600 leading-relaxed mb-2">{s.aciklama}</p>
                    <div className="bg-[#F0FDF8] rounded-lg px-3 py-2">
                      <p className="text-[10px] text-[#00C49F] font-black">💡 İpucu: {s.ipucu}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Satıcı Stratejileri */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-1">Satıcı Müzakere Stratejileri</h2>
          <p className="text-xs text-gray-400 mb-5">Değerinizden taviz vermeden hızlı satış için teknikler.</p>
          <div className="space-y-4">
            {SATICI_STRATEJILERI.map((s, i) => (
              <div key={i} className="border border-gray-100 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-amber-400 text-white text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                  <div>
                    <p className="text-xs font-black text-gray-900 mb-1">{s.baslik}</p>
                    <p className="text-[11px] text-gray-600 leading-relaxed mb-2">{s.aciklama}</p>
                    <div className="bg-amber-50 rounded-lg px-3 py-2">
                      <p className="text-[10px] text-amber-600 font-black">💡 İpucu: {s.ipucu}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Yaygın Hatalar */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-1">Kaçınılması Gereken Hatalar</h2>
          <p className="text-xs text-gray-400 mb-5">Müzakereyi mahveden 5 yaygın hata.</p>
          <div className="space-y-3">
            {MUZAKERE_HATALARI.map((h, i) => (
              <div key={i} className="flex gap-3 border border-rose-100 rounded-xl p-4 bg-rose-50">
                <span className="text-rose-500 font-black text-sm shrink-0">✕</span>
                <div>
                  <p className="text-xs font-black text-rose-700 mb-0.5">{h.hata}</p>
                  <p className="text-[11px] text-rose-600">{h.aciklama}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Yasal Haklar */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-1">Yasal Haklarınız</h2>
          <p className="text-xs text-gray-400 mb-5">Müzakere sürecinde bilmeniz gereken hukuki güvenceler.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {YASAL_HAKLAR.map((h, i) => (
              <div key={i} className="border border-gray-100 rounded-xl p-4">
                <p className="text-xs font-black text-gray-900 mb-1">{h.baslik}</p>
                <p className="text-[11px] text-gray-500 leading-relaxed">{h.aciklama}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-6 text-center">
          <p className="text-white font-black text-sm mb-1">Piyasa değerini öğrenmek ister misiniz?</p>
          <p className="text-gray-300 text-xs mb-4">Konut Değer Tahmini aracımızla taşınmazın gerçek değerini hesaplayın.</p>
          <a href="/konut-deger-tahmini" className="inline-block bg-[#00C49F] text-white text-xs font-black px-5 py-2.5 rounded-full hover:bg-[#00a882] transition-colors">
            Değer Tahmini Yap
          </a>
        </div>

      </div>
    </main>
  );
}
