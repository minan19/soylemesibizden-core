import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kira Güvence Sigortası Rehberi 2025 | Mal Sahibi Koruması | Söylemesi Bizden',
  description:
    'Kira güvence sigortası: kiracı temerrüdüne karşı mal sahibi koruması, prim hesabı, teminat kapsamı ve sık sorulan sorular.',
};

const SIGORTANIN_KAPSAMI = [
  { kapsam: 'Kira Temerrüdü', aciklama: 'Kiracının kira bedelini ödememesi durumunda sigortacı belirli ay sayısı kadar kirayı öder.', tipikLimit: '3–12 ay kira' },
  { kapsam: 'Tahliye Giderleri', aciklama: 'Kiracı tahliye edilirken oluşan icra ve mahkeme masraflarının bir kısmını karşılar.', tipikLimit: '5.000–20.000 ₺' },
  { kapsam: 'Mülk Hasarı', aciklama: 'Kiracının sebep olduğu fiziksel hasar (depozitoya ek olarak) teminat altındadır.', tipikLimit: '1–3 aylık kira' },
  { kapsam: 'Avukat / Arabulucu', aciklama: 'Kiracı uyuşmazlıklarında hukuki danışmanlık desteği sağlar.', tipikLimit: 'Hizmet bazlı' },
];

const PRIM_ETKENLER = [
  { etken: 'Yıllık Kira Geliri', etki: 'Prim matrahı; kira yükseldikçe prim artar' },
  { etken: 'Teminat Süresi', etki: 'Uzun teminat (12 ay) daha yüksek prim gerektirir' },
  { etken: 'Kiracı Profili', etki: 'Şirket kiracı genellikle bireyseldan daha ucuz prim' },
  { etken: 'Mülk Tipi', etki: 'Konut < ticari; ticari amaçlı mülkler daha riskli görülür' },
  { etken: 'Konum / İl', etki: 'Büyük şehirlerde ödeme riski düşük → prim avantajı' },
  { etken: 'Kiracı Gelir Belgesi', etki: 'Belge sunulursa prim %10-20 indirim alınabilir' },
];

const ORNEK_PRIM = [
  { senaryo: '12.000 ₺/ay kira, 6 ay teminat, bireysel kiracı', yillikPrim: '3.200 ₺', oranKira: '%2.2' },
  { senaryo: '20.000 ₺/ay kira, 12 ay teminat, şirket kiracı', yillikPrim: '7.800 ₺', oranKira: '%3.25' },
  { senaryo: '8.000 ₺/ay kira, 3 ay teminat, kamu personeli', yillikPrim: '1.440 ₺', oranKira: '%1.5' },
];

const ALTERNATIFLER = [
  {
    alternatif: 'Yüksek Depozito',
    avantaj: 'Anlık nakit güvence; sigorta bedeli yok',
    dezavantaj: 'Yasal sınır 3 aylık kira; sınırlı koruma',
    uygunluk: 'Kısa vadeli kiralar',
  },
  {
    alternatif: 'Kefil',
    avantaj: 'Ücretsiz; kefil ödeme gücündeyse güçlü koruma',
    dezavantaj: 'Kefil bulunamayabilir; kişisel ilişki gerektir',
    uygunluk: 'Tanıdık kiracılar',
  },
  {
    alternatif: 'Kira Güvence Sigortası',
    avantaj: 'Çok riskli senaryolarda (temerrüt + hasar) kapsamlı koruma',
    dezavantaj: 'Yıllık prim maliyeti; tüm riskleri kapsamayabilir',
    uygunluk: 'Bilinmeyen kiracılar, yüksek kiralar',
  },
  {
    alternatif: 'Banka Teminat Mektubu',
    avantaj: 'Güvenilir ve hızlı tahsil imkânı',
    dezavantaj: 'Kiracıya ek maliyet; nadiren kullanılır',
    uygunluk: 'Ticari kiralar',
  },
];

const SSS = [
  { soru: 'Sigortayı kim yaptırır?', cevap: 'Genellikle mal sahibi (kiraya veren) yaptırır. Bazı ürünlerde kiracı da yaptırabilir.' },
  { soru: 'Mevcut sözleşmeye de alınabilir mi?', cevap: 'Evet, devam eden kira sözleşmeleri için de yaptırılabilir; ancak bekleme süresi (30-60 gün) uygulanır.' },
  { soru: 'Hasar başvurusu nasıl yapılır?', cevap: 'Kira ödenmemesi halinde 30 gün sonra sigortacıya bildirim yapılır; ardından sigorta poliçe koşullarına göre devreye girer.' },
  { soru: 'Sigortaya karşı gelen zararı tahsil edebilir miyim?', cevap: 'Sigortacı tazminat ödedikten sonra rücu hakkıyla kiracıya başvurabilir; mal sahibi bu sürece dahil edilmez.' },
  { soru: 'Kira artışı sonrası prim güncellenir mi?', cevap: 'Kira artışı poliçe teminat limitini etkiler; sözleşme yenileme döneminde prim revize edilir.' },
];

export default function KiraGuvenceSigortasiPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <p className="text-[#00C49F] text-xs font-bold mb-3 uppercase tracking-widest">Sigorta Rehberi 2025</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">Kira Güvence Sigortası</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            Kiracı temerrüdüne karşı mal sahibini koruyan kira güvence sigortası: kapsam, prim hesabı ve alternatifler.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-4">Sigorta Kapsamı</h2>
          <div className="space-y-3">
            {SIGORTANIN_KAPSAMI.map((k, i) => (
              <div key={i} className="border border-gray-100 rounded-xl p-4">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs font-black text-gray-900">{k.kapsam}</p>
                  <span className="text-[9px] font-black text-[#00C49F] shrink-0 ml-4">{k.tipikLimit}</span>
                </div>
                <p className="text-[11px] text-gray-500 leading-relaxed">{k.aciklama}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-4">Prim Etkenleri</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {PRIM_ETKENLER.map((e, i) => (
              <div key={i} className="border border-gray-100 rounded-xl p-4">
                <p className="text-xs font-black text-gray-900 mb-1">{e.etken}</p>
                <p className="text-[11px] text-gray-500">{e.etki}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm overflow-x-auto">
          <h2 className="text-base font-black text-gray-900 mb-4">Örnek Prim Hesabı</h2>
          <table className="w-full text-[10px] min-w-[440px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 font-black text-gray-500">Senaryo</th>
                <th className="text-center py-2 font-black text-gray-500">Yıllık Prim</th>
                <th className="text-right py-2 font-black text-[#00C49F]">Kira Oranı</th>
              </tr>
            </thead>
            <tbody>
              {ORNEK_PRIM.map((p, i) => (
                <tr key={i} className="border-b border-gray-50 last:border-0">
                  <td className="py-2 font-bold text-gray-700">{p.senaryo}</td>
                  <td className="py-2 text-center font-black text-gray-900">{p.yillikPrim}</td>
                  <td className="py-2 text-right font-black text-[#00C49F]">{p.oranKira}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-4">Alternatif Güvence Yöntemleri</h2>
          <div className="space-y-3">
            {ALTERNATIFLER.map((a, i) => (
              <div key={i} className="border border-gray-100 rounded-xl p-4">
                <div className="flex justify-between mb-2">
                  <p className="text-xs font-black text-gray-900">{a.alternatif}</p>
                  <span className="text-[9px] text-gray-400 shrink-0 ml-3">{a.uygunluk}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <p className="text-[10px] text-emerald-600 font-bold">+ {a.avantaj}</p>
                  <p className="text-[10px] text-rose-500 font-bold">− {a.dezavantaj}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-4">Sık Sorulan Sorular</h2>
          <div className="space-y-3">
            {SSS.map((s, i) => (
              <div key={i} className="border-b border-gray-50 pb-3 last:border-0 last:pb-0">
                <p className="text-xs font-black text-gray-900 mb-1">{s.soru}</p>
                <p className="text-[11px] text-gray-500 leading-relaxed">{s.cevap}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
          <p className="text-xs font-black text-amber-700 mb-2">Önemli Not</p>
          <p className="text-[11px] text-amber-600 leading-relaxed">
            Prim tutarları ve kapsam detayları sigorta şirketine göre önemli ölçüde değişir. Poliçe satın almadan önce birkaç sigorta şirketinden teklif alın ve muafiyet / bekleme süresi maddelerini dikkatlice inceleyin. Bu rehber bilgilendirme amaçlıdır.
          </p>
        </div>

      </div>
    </main>
  );
}
