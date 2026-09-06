import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gayrimenkul Portföy Çeşitlendirme Rehberi 2025 | Risk Dağıtımı | Söylemesi Bizden',
  description:
    'Gayrimenkul yatırımında portföy çeşitlendirme: konut, ticari, arsa, GYO ve coğrafi dağılım stratejileri ile risk yönetimi rehberi.',
};

const VARLIK_SINIFLARI = [
  {
    sinif: 'Konut (Rezidans)',
    getiri: '%3.5–6.0 kira + değer artışı',
    risk: 'Düşük–Orta',
    likidite: 'Orta',
    notlar: 'İstikrarlı kira talebi; düzenli gelir, giriş bariyeri orta',
  },
  {
    sinif: 'Ticari (Dükkan/Ofis)',
    getiri: '%5.0–9.0 kira getirisi',
    risk: 'Orta',
    likidite: 'Düşük',
    notlar: 'Yüksek getiri ama boş kalma riski ve uzun kiracı bulma süresi',
  },
  {
    sinif: 'Arsa',
    getiri: 'Değer artışı odaklı',
    risk: 'Yüksek',
    likidite: 'Çok Düşük',
    notlar: 'Kira geliri yok; imar değişikliğinde yüksek kazanç mümkün',
  },
  {
    sinif: 'Tatil / Yazlık',
    getiri: '%5.0–8.0 (sezon bazlı)',
    risk: 'Orta–Yüksek',
    likidite: 'Düşük',
    notlar: 'Sezonluk talep dalgalanması; kısa dönem kiralama getirisi yüksek',
  },
  {
    sinif: 'Gayrimenkul Yatırım Ortaklığı (GYO)',
    getiri: '%4.0–7.0 temettü',
    risk: 'Orta',
    likidite: 'Çok Yüksek',
    notlar: 'Borsa aracılığıyla kolayca alınıp satılır; küçük bütçelerle çeşitlendirme',
  },
  {
    sinif: 'Depo / Lojistik',
    getiri: '%7.0–10.0',
    risk: 'Orta',
    likidite: 'Düşük',
    notlar: 'E-ticaret büyümesiyle talep artıyor; uzman yatırımcı için uygun',
  },
];

const COGRAFYA_STRATEJISI = [
  { strateji: 'Tek Şehir Konsantrasyonu', avantaj: 'Piyasayı iyi bilmek, yerel ağ', dezavantaj: 'Bölgesel krize karşı savunmasız' },
  { strateji: '2–3 Büyük Şehir Dağılımı', avantaj: 'Risk dağılımı + farklı getiri profili', dezavantaj: 'Uzak mülk yönetimi zor' },
  { strateji: 'Büyük + Tatil Bölgesi Mix', avantaj: 'İstikrarlı gelir + yüksek sezon kazancı', dezavantaj: 'Sezonsal dalgalanma riski' },
  { strateji: 'Yurt İçi + Yurt Dışı', avantaj: 'Kur riski hedge, dolar getirisi', dezavantaj: 'Yasal zorluk, vergi karmaşıklığı' },
];

const PORTFOY_ORNEK = [
  { profil: 'Muhafazakâr (1M ₺ bütçe)', dagitim: [
    { tur: 'Konut (İstanbul, 2+1)', oran: 70, tutar: '700.000 ₺', neden: 'Stabil kira geliri' },
    { tur: 'GYO hisseleri', oran: 20, tutar: '200.000 ₺', neden: 'Likidite ve çeşitlilik' },
    { tur: 'Nakit / acil fon', oran: 10, tutar: '100.000 ₺', neden: 'Fırsat ve acil durum' },
  ]},
  { profil: 'Dengeli (3M ₺ bütçe)', dagitim: [
    { tur: 'Konut (büyük şehir)', oran: 50, tutar: '1.500.000 ₺', neden: 'Güvenli temel getiri' },
    { tur: 'Ticari dükkan', oran: 25, tutar: '750.000 ₺', neden: 'Yüksek kira getirisi' },
    { tur: 'Tatil / yazlık', oran: 15, tutar: '450.000 ₺', neden: 'Sezon kazancı' },
    { tur: 'GYO + nakit', oran: 10, tutar: '300.000 ₺', neden: 'Likidite' },
  ]},
];

const RISK_YONETIMI = [
  { risk: 'Boş Kalma Riski', onlem: 'Fiyatı piyasaya uygun belirleyin; kiracısız geçen ay için %10-15 bütçe ayırın.' },
  { risk: 'Kiracı Temerrüdü', onlem: 'Kiracı ön araştırması, gelir belgesi ve banka referansı isteyin. Yüksek depozito ve kefil şartı.' },
  { risk: 'Kira Tavanı', onlem: 'TÜFE sınırı nedeniyle nominal getirinin reel anlamda erimesine karşı değer artışı güçlü bölgeleri seçin.' },
  { risk: 'Likidite Sıkışması', onlem: 'Portföyün en az %15-20\'si hızlı nakde dönebilir GYO veya mevduatta tutulmalıdır.' },
  { risk: 'Konsantrasyon Riski', onlem: 'Tek mülk veya tek bölge yerine en az 2-3 farklı varlık sınıfı ile başlayın.' },
  { risk: 'Bakım Giderleri', onlem: 'Yıllık kira gelirinin %5-10\'unu olağan bakım ve onarım giderleri için rezerv tutun.' },
];

export default function GayrimenkulPortfoyPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <p className="text-[#00C49F] text-xs font-bold mb-3 uppercase tracking-widest">Yatırım Rehberi 2025</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">Gayrimenkul Portföy Çeşitlendirme</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            Konut, ticari, arsa ve GYO arasında risk dağılımı: farklı bütçe profilleri için portföy örnekleri.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm overflow-x-auto">
          <h2 className="text-base font-black text-gray-900 mb-4">Varlık Sınıfları Karşılaştırması</h2>
          <div className="space-y-3">
            {VARLIK_SINIFLARI.map((v, i) => (
              <div key={i} className="border border-gray-100 rounded-xl p-4">
                <div className="flex items-start justify-between mb-2">
                  <p className="text-xs font-black text-gray-900">{v.sinif}</p>
                  <div className="flex gap-2 shrink-0 ml-4">
                    <span className={`text-[8px] font-black px-1.5 py-0.5 rounded ${v.risk === 'Düşük–Orta' ? 'bg-emerald-100 text-emerald-700' : v.risk === 'Orta' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'}`}>Risk: {v.risk}</span>
                    <span className="text-[8px] font-black px-1.5 py-0.5 rounded bg-blue-100 text-blue-700">Likidite: {v.likidite}</span>
                  </div>
                </div>
                <p className="text-[10px] font-bold text-[#00C49F] mb-1">{v.getiri}</p>
                <p className="text-[11px] text-gray-500">{v.notlar}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-4">Coğrafi Dağılım Stratejileri</h2>
          <div className="space-y-3">
            {COGRAFYA_STRATEJISI.map((c, i) => (
              <div key={i} className="border border-gray-100 rounded-xl p-4">
                <p className="text-xs font-black text-gray-900 mb-2">{c.strateji}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <p className="text-[9px] text-gray-400 mb-0.5">Avantaj</p>
                    <p className="text-[10px] font-bold text-emerald-600">{c.avantaj}</p>
                  </div>
                  <div>
                    <p className="text-[9px] text-gray-400 mb-0.5">Dezavantaj</p>
                    <p className="text-[10px] font-bold text-amber-600">{c.dezavantaj}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {PORTFOY_ORNEK.map((ornek, oi) => (
          <div key={oi} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h2 className="text-base font-black text-gray-900 mb-4">{ornek.profil}</h2>
            <div className="space-y-2">
              {ornek.dagitim.map((d, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <p className="text-[10px] font-black text-gray-900">{d.tur}</p>
                      <p className="text-[10px] font-black text-[#00C49F]">%{d.oran}</p>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full">
                      <div className="h-1.5 bg-[#00C49F] rounded-full" style={{ width: `${d.oran}%` }} />
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-[9px] font-bold text-gray-600">{d.tutar}</p>
                    <p className="text-[9px] text-gray-400">{d.neden}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-4">Risk Yönetimi Önlemleri</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {RISK_YONETIMI.map((r, i) => (
              <div key={i} className="border border-gray-100 rounded-xl p-4">
                <p className="text-xs font-black text-rose-600 mb-1">{r.risk}</p>
                <p className="text-[11px] text-gray-500 leading-relaxed">{r.onlem}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5">
          <p className="text-xs font-black text-emerald-700 mb-2">Temel Kural</p>
          <p className="text-[11px] text-emerald-600 leading-relaxed">
            Tüm sermayeyi tek bir mülke bağlamak yerine en az 2-3 farklı kategoride çeşitlendirme, uzun vadede daha istikrarlı getiri sağlar. Küçük bütçelerle GYO hisselerinden başlamak, büyüdükçe fiziksel mülke geçmek en yaygın başlangıç stratejisidir.
          </p>
        </div>

      </div>
    </main>
  );
}
