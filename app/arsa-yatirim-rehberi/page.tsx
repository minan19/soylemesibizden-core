import { Metadata } from 'next';
import Link from 'next/link';
import { Map, CheckCircle, AlertTriangle, ArrowRight, TrendingUp } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Arsa Yatırımı Rehberi 2024 | İmar Durumu, Riskler, Getiri | Söylemesi Bizden',
  description:
    'Arsa yatırımı nasıl yapılır? İmar durumu kontrolü, tapu araştırması, getiri hesaplama ve arsa alırken dikkat edilecekler hakkında kapsamlı rehber.',
};

const ARSA_TIPLERI = [
  { tip: 'İmarlı Konut Arsası', getiri: 'Yüksek', risk: 'Orta', aciklama: 'Belediye imar planında konut alanı olarak belirlenmiş; inşaat izni alınabilir. En likit arsa tipidir.' },
  { tip: 'İmarlı Ticari Arsa', getiri: 'Çok Yüksek', risk: 'Orta-Yüksek', aciklama: 'Alışveriş merkezi, ofis veya otel gibi ticari yapı yapılabilecek parseller. Değer artışı yüksektir.' },
  { tip: 'İmarsız (Ham) Arsa', getiri: 'Orta', risk: 'Yüksek', aciklama: 'İmar planı dışında kalan tarla veya orman arazisi. Uzun vadeli beklenti stratejisi gerektirir.' },
  { tip: 'Tarım Arazisi', getiri: 'Düşük-Orta', risk: 'Düşük', aciklama: 'Kira geliri veya tarımsal üretim. İmara açılırsa değer katlanır; ancak belirsizlik uzun sürebilir.' },
  { tip: 'Hisseli Arsa', getiri: 'Değişken', risk: 'Çok Yüksek', aciklama: 'Birden fazla kişinin ortak mülkiyetindeki parsel. Satışta tüm ortakların onayı gerektirir; riski yüksektir.' },
];

const ARAŞTIRMA_LISTESI = [
  { kontrol: 'Tapu Kaydı ve Takyidat', aciklama: 'e-Devlet veya tapu müdürlüğünden ipotek, haciz, şerh ve irtifak haklarını kontrol edin.' },
  { kontrol: 'İmar Durumu Belgesi', aciklama: 'Belediyeden KAKS (inşaat alanı katsayısı), TAKS, kat yüksekliği ve yapı düzeni hakkında bilgi alın.' },
  { kontrol: 'Parsel Sınırları ve Kadastro', aciklama: 'Tapu Kadastro Genel Müdürlüğü (TKGM) üzerinden parsel konumu ve sınırları kontrol edin.' },
  { kontrol: 'Zemin Etüdü', aciklama: 'Deprem bölgesi ve zemin sınıfı araştırması; özellikle konut inşaatı planlanıyorsa şarttır.' },
  { kontrol: 'Altyapı Durumu', aciklama: 'Elektrik, su, kanalizasyon, doğalgaz bağlantılarının varlığını ve uzaklığını sorgulayın.' },
  { kontrol: 'Orman/Hazine Sınırları', aciklama: 'Orman Genel Müdürlüğü\'nden orman sınırları içinde olup olmadığını kontrol edin.' },
  { kontrol: 'Dere/Sel Yatağı Kontrolü', aciklama: 'DSİ\'den parsel dere yatağı, taşkın alanı içinde mi diye öğrenin.' },
  { kontrol: 'Kamulaştırma Planı', aciklama: 'Belediyeden imar yoluna, okul ya da yeşil alana denk gelip gelmediğini sorun.' },
];

const GETIRI_HESABI = [
  { senaryo: 'Kısa Vade (1–3 yıl)', beklentiYuzde: '20–50%', strateji: 'Değer artışı: semtin gelişimi, imar değişikliği veya proje haberleri ana sürücüdür.' },
  { senaryo: 'Orta Vade (3–7 yıl)', beklentiYuzde: '50–200%', strateji: 'Parsellere bölerek satış veya kat karşılığı inşaat anlaşması ile değer realize edilir.' },
  { senaryo: 'Uzun Vade (7–15 yıl)', beklentiYuzde: '200%+', strateji: 'Stratejik konum, sanayi bölgesi veya şehir genişlemesi yönünde bekleme stratejisi.' },
];

const RISKLER = [
  { risk: 'İmar Değişikliği Riski', azaltma: 'Belediye 1/1000 ve 1/5000 planlarını düzenli takip edin.' },
  { risk: 'Kamulaştırma Riski', azaltma: 'Belediyenin uzun vadeli plan ve projesini araştırın.' },
  { risk: 'Likidite Riski', azaltma: 'Arsa nakde çevirme süreci yıllarca sürebilir; buna hazırlıklı olun.' },
  { risk: 'Tapu İptal Davası', azaltma: 'Uzman avukat ile due diligence yapın; tapu takyidat araştırması yapın.' },
  { risk: 'Kira Getirisi Yokluğu', azaltma: 'Tarım arazisi kiralaması veya güneş paneli kiralama değerlendirilebilir.' },
];

export default function ArsaYatirimRehberiPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <Map size={13} /> Arsa Yatırımı
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Arsa Yatırımı Rehberi 2024
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            Arsa türleri, araştırma kontrol listesi, getiri senaryoları ve riskler. Doğru arsayı doğru fiyata alın.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-[#00C49F]">5 Tip</p>
              <p className="text-xs text-gray-400">Arsa çeşidi</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">8 Kontrol</p>
              <p className="text-xs text-gray-400">Due diligence</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-400">200%+</p>
              <p className="text-xs text-gray-400">Uzun vade getiri</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* Arsa Tipleri */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Arsa Tipleri ve Risk/Getiri Profili</h2>
          <div className="space-y-3">
            {ARSA_TIPLERI.map((a, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                <div className="flex items-start justify-between gap-3 mb-1">
                  <p className="text-xs font-black text-gray-900">{a.tip}</p>
                  <div className="flex gap-2 shrink-0">
                    <span className="text-[10px] bg-[#F0FDF8] text-[#00C49F] font-black px-2 py-0.5 rounded">{a.getiri}</span>
                    <span className="text-[10px] bg-amber-50 text-amber-600 font-black px-2 py-0.5 rounded">{a.risk} Risk</span>
                  </div>
                </div>
                <p className="text-[10px] text-gray-600 leading-relaxed">{a.aciklama}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Araştırma Kontrol Listesi */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle size={14} className="text-[#00C49F]" /> Satın Almadan Önce Kontrol Listesi
          </h2>
          <div className="space-y-2">
            {ARAŞTIRMA_LISTESI.map((k, i) => (
              <div key={i} className="flex items-start gap-3 py-2 border-b border-gray-50 last:border-0">
                <CheckCircle size={12} className="text-[#00C49F] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-black text-gray-900">{k.kontrol}</p>
                  <p className="text-[10px] text-gray-500 mt-0.5">{k.aciklama}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Getiri Senaryoları */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp size={14} className="text-[#00C49F]" /> Getiri Senaryoları
          </h2>
          <div className="space-y-3">
            {GETIRI_HESABI.map((g, i) => (
              <div key={i} className="grid grid-cols-3 gap-2 py-2 border-b border-gray-50 last:border-0">
                <div>
                  <p className="text-xs font-black text-gray-900">{g.senaryo}</p>
                  <p className="text-[10px] font-black text-[#00C49F]">{g.beklentiYuzde}</p>
                </div>
                <p className="text-[10px] text-gray-600 leading-relaxed col-span-2">{g.strateji}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Riskler */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Riskler ve Azaltma Yolları</h2>
          <div className="space-y-3">
            {RISKLER.map((r, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                <p className="text-xs font-black text-rose-500 mb-1">{r.risk}</p>
                <p className="text-[10px] text-gray-600 leading-relaxed">{r.azaltma}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Uyarı */}
        <section className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <AlertTriangle size={14} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 leading-relaxed">
            <span className="font-black">Önemli:</span> Arsa yatırımı yüksek risk içerir ve likidite düşüktür. Satın almadan önce mutlaka bir gayrimenkul avukatı ve harita mühendisi ile çalışın.
          </p>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Araçlar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/yatirim-analizi', label: 'Yatırım ROI Hesaplayıcı' },
              { href: '/tapu-masrafi', label: 'Tapu Masrafı Hesaplayıcı' },
              { href: '/bolge-getiri-karsilastir', label: 'Bölge Getiri Karşılaştırması' },
              { href: '/amortisman-hesaplayici', label: 'Amortisman Hesaplayıcı' },
              { href: '/konut-deger-tahmini', label: 'Konut Değer Tahmini' },
              { href: '/yabanci-yatirimci-rehberi', label: 'Yabancı Yatırımcı Rehberi' },
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
