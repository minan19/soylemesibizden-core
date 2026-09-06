import { Metadata } from 'next';
import Link from 'next/link';
import {
  Home, CheckCircle, AlertTriangle, ArrowRight, FileText,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Satılık Ev Hazırlık Rehberi | Fiyat Belirleme, Home Staging, Fotoğraf | Söylemesi Bizden',
  description:
    'Evinizi satışa hazırlama: doğru fiyat belirleme, home staging, ilan fotoğrafları, belgeler ve pazarlama stratejisi.',
};

const HAZIRLIK_ASAMALARI = [
  {
    asama: 'Piyasa Araştırması ve Fiyat',
    adimlar: [
      'Bölgedeki son 6 aydaki gerçekleşen satış fiyatlarını araştırın.',
      'En az 3 farklı emlakçıdan kıymet takdiri isteyin.',
      'SPK lisanslı ekspertiz raporu alın (güvenilir temel).',
      'İlan fiyatını piyasanın %5–10 üzerinde başlatın; pazarlık payı bırakın.',
    ],
  },
  {
    asama: 'Belge Hazırlığı',
    adimlar: [
      'Tapu senedinin güncel olduğunu teyit edin.',
      'Tapuya ipotek/şerh sorgulayın; varsa kaldırın.',
      'İskan (yapı kullanma izni) belgesi hazır mı?',
      'Aidat ve site borçlarını ödeyin.',
      'Elektrik, su, doğalgaz borcu kontrolü yapın.',
    ],
  },
  {
    asama: 'Fiziksel Hazırlık',
    adimlar: [
      'Ufak onarımları (akan musluk, kopuk priz, cızırtılı kapı) tamamlayın.',
      'Profesyonel temizlik yaptırın.',
      'Dağınık eşyaları kaldırın; göz alıcı minimal dekorasyon bırakın.',
      'Nötr renkte boya veya hafif makyaj uygulamayı değerlendirin.',
      'Balkon, teras veya bahçeyi düzenleyin.',
    ],
  },
  {
    asama: 'Fotoğraf ve İlan',
    adimlar: [
      'Profesyonel fotoğrafçı veya geniş açı lens kullanın.',
      'Gündüz, doğal ışıkta fotoğraf çekin.',
      'En az 15–20 fotoğraf; mutfak, banyo, her oda, balkon ve dış cephe.',
      'İlan metninde m², oda sayısı, kat, cephe, özellikler ve mesafe bilgilerini yazın.',
      'Birden fazla platformda ilan açın.',
    ],
  },
];

const HOME_STAGING = [
  { ipucu: 'Işık', detay: 'Tüm ampulleri aynı renk sıcaklığında değiştirin; perde ve stor açık bırakın.' },
  { ipucu: 'Koku', detay: 'Nötr koku sağlayın; sigara veya yoğun yemek kokusu alıcıyı kaçırır.' },
  { ipucu: 'Depolama', detay: 'Dolaplar dolu görünmemeli; fazla eşyayı dışarı taşıyın veya depoya koyun.' },
  { ipucu: 'Banyo', detay: 'Beyaz/krem havlu ve sabunluk gibi hazır aksesuarlar banyo değerini artırır.' },
  { ipucu: 'Mutfak', detay: 'Tezgahı boşaltın; yalnızca 1–2 dekoratif obje bırakın.' },
  { ipucu: 'Kişisel Eşya', detay: 'Aile fotoğrafları, kişisel eşyalar ve dini objeler gezinti sırasında kaldırılmalı.' },
];

const FIYAT_HATALARI = [
  { hata: 'Duygusal Fiyatlandırma', sonuc: 'Ev sahibinin duygusal değeri piyasayı aşarsa evin aylar boyu satılmamasına neden olur.' },
  { hata: 'Aşırı Fiyat Başlangıcı', sonuc: 'İlk 2–4 haftanın ilgisini kaybedebilirsiniz; ilk görünüm en önemli dönemdir.' },
  { hata: 'Düşük Fiyat Acelesi', sonuc: 'Hızlı satış cazipken, pazarlık payı olmadan gerçek değerin altında satmış olabilirsiniz.' },
  { hata: 'Emsal Görmezden Gelmek', sonuc: 'Bölgedeki benzer evlerin fiyatı en güçlü referanstır; görmezden gelmek büyük hata.' },
];

const GOSTERIM_IPUCU = [
  'Gösterim randevularını peş peşe değil, günlük en fazla 3–4 ile sınırlayın.',
  'Evi göstermeden önce havalandırın; kışın ılıman bir sıcaklık ayarlayın.',
  'Evcil hayvanları gösterim sırasında başka bir odada tutun.',
  'Alıcıya evin özelliklerini anlatacak kısa bir "özellikler yaprağı" hazırlayın.',
  'Gündüz gösterimlerine öncelik verin; doğal ışık evi en iyi şekilde gösterir.',
  'Alıcı soruları için hazırlıklı olun: aidat, bina yaşı, komşular, ulaşım.',
];

const PAZARLIK_STRATEJI = [
  { durum: 'İlk Teklif Düşükse', strateji: 'Karşı teklifle cevap verin; %3–5 ineceksiniz mesajını vermeyin. "Rakamı değerlendirelim" deyin.' },
  { durum: 'Çoklu Teklif Varsa', strateji: 'En iyi teklifleri aynı güne isteyin; rekabetçi ortam oluşturun.' },
  { durum: 'Alıcı Krediyle Alıyorsa', strateji: 'Banka ekspertizi düşük çıkabilir; kredi tutarı yetersiz kalırsa anlaşma çözülmez, önceden tartışın.' },
  { durum: 'Tadilat İndirimi Talebi', strateji: 'Tadilatları fiyata yansıtmak yerine teklif fiyatından düşük sayılacak makul kontra yapın.' },
];

export default function SatilikEvHazirlikPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <Home size={13} /> Satılık Ev Hazırlık Rehberi
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Satılık Ev Hazırlık Rehberi
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            Doğru fiyat belirleme, home staging, profesyonel fotoğraf ve pazarlık stratejisi.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-[#00C49F]">%5–10</p>
              <p className="text-xs text-gray-400">Pazarlık payı önerisi</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">6 Ay</p>
              <p className="text-xs text-gray-400">Emsal fiyat penceresi</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-400">15+ Foto</p>
              <p className="text-xs text-gray-400">İdeal ilan fotoğrafı</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* Hazırlık Aşamaları */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Satış Öncesi Hazırlık Aşamaları</h2>
          <div className="space-y-4">
            {HAZIRLIK_ASAMALARI.map((a, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <div className="inline-flex items-center gap-2 bg-[#00C49F]/10 text-[#00C49F] text-xs font-black px-3 py-1 rounded-full mb-3">
                  {i + 1}. {a.asama}
                </div>
                <div className="space-y-2">
                  {a.adimlar.map((adim, j) => (
                    <div key={j} className="flex items-start gap-2">
                      <div className="w-4 h-4 rounded border-2 border-[#00C49F]/40 shrink-0 mt-0.5" />
                      <p className="text-xs text-gray-700 leading-relaxed">{adim}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Home Staging */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle size={14} className="text-[#00C49F]" /> Home Staging İpuçları
          </h2>
          <div className="space-y-3">
            {HOME_STAGING.map((h, i) => (
              <div key={i} className="bg-[#F0FDF8] rounded-xl p-3">
                <p className="text-xs font-black text-gray-900 mb-0.5">{h.ipucu}</p>
                <p className="text-[10px] text-gray-600 leading-relaxed">{h.detay}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Fiyatlandırma Hataları */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Yaygın Fiyatlandırma Hataları</h2>
          <div className="space-y-3">
            {FIYAT_HATALARI.map((f, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                <div className="flex items-start gap-2 mb-1">
                  <AlertTriangle size={12} className="text-amber-500 shrink-0 mt-0.5" />
                  <p className="text-xs font-black text-gray-900">{f.hata}</p>
                </div>
                <p className="text-[10px] text-gray-600 leading-relaxed ml-5">{f.sonuc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Gösterim */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <FileText size={14} className="text-amber-500" /> Gösterim İpuçları
          </h2>
          <div className="space-y-2">
            {GOSTERIM_IPUCU.map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" />
                <p className="text-xs text-gray-700 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pazarlık Stratejisi */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Pazarlık Stratejisi</h2>
          <div className="space-y-3">
            {PAZARLIK_STRATEJI.map((p, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                <p className="text-xs font-black text-gray-900 mb-1">{p.durum}</p>
                <p className="text-[10px] text-gray-600 leading-relaxed">{p.strateji}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Warning */}
        <section className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <AlertTriangle size={14} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 leading-relaxed">
            <span className="font-black">Önemli:</span> Satış bedelinin %4 tapu harcı (paylaşılabilir), %3–4 emlakçı komisyonu ve varsa tapu masrafları ile kira çakışması giderlerini maliyete dahil ederek net geliri hesaplayın.
          </p>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Rehberler</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/rehber/satici-rehberi', label: 'Satıcı Rehberi' },
              { href: '/ev-degerleme', label: 'Ev Değerleme Rehberi' },
              { href: '/tapu-masrafi', label: 'Tapu Masrafı Hesaplayıcı' },
              { href: '/tapu-devir-sureci', label: 'Tapu Devir Süreci' },
              { href: '/pismanlik-hakki', label: 'Pişmanlık Hakkı ve Cayma' },
              { href: '/ipotek-rehni', label: 'İpotek ve Rehin Rehberi' },
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
