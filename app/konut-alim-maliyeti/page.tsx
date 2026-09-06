import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Konut Alım Toplam Maliyet Rehberi | Gizli Masraflar | Söylemesi Bizden',
  description:
    'Konut alımında göz ardı edilen masraflar: tapu harcı, DASK, ekspertiz, sigorta, nakliye ve ilk yıl bakım giderlerinin tam listesi.',
};

const MASRAF_KATEGORILERI = [
  {
    kategori: 'Zorunlu Resmi Masraflar',
    renk: 'rose',
    masraflar: [
      { kalem: 'Tapu Harcı', oran: 'Satış bedeli × %4', not: 'Alıcı ve satıcı yarı yarıya paylaşır (her biri %2)', ornek: '5M ₺ → 100.000 ₺' },
      { kalem: 'Döner Sermaye Harcı', oran: 'Sabit tutar', not: '2024 yılı için yaklaşık 2.000–3.000 ₺', ornek: '~2.500 ₺' },
      { kalem: 'DASK (Zorunlu Deprem Sigortası)', oran: 'Alan × risk bölgesi', not: '120 m² — 1. Risk Bölgesi: ~2.500 ₺/yıl', ornek: '~1.500–5.000 ₺' },
    ],
  },
  {
    kategori: 'Banka / Kredi Masrafları',
    renk: 'amber',
    masraflar: [
      { kalem: 'Ekspertiz Ücreti', oran: 'Sabit tutar', not: 'Banka tarafından yaptırılan değerleme raporu', ornek: '~3.000–6.000 ₺' },
      { kalem: 'Dosya / İşlem Masrafı', oran: 'Sabit veya kredi × %0.5', not: 'Bankaya göre değişir; bazı bankalar ücretsiz', ornek: '~1.000–5.000 ₺' },
      { kalem: 'Hayat Sigortası (Kredi)', oran: 'Yaş ve kredi tutarına göre', not: 'Zorunlu tutulabilir; yıllık ödenir', ornek: '~3.000–8.000 ₺/yıl' },
      { kalem: 'Konut Sigortası', oran: 'Değerin %0.15–0.3\'ü/yıl', not: 'Zorunlu değil ama önerilir; banka şart koşabilir', ornek: '~2.000–5.000 ₺/yıl' },
    ],
  },
  {
    kategori: 'Profesyonel Hizmet Masrafları',
    renk: 'blue',
    masraflar: [
      { kalem: 'Emlak Danışmanı Komisyonu', oran: 'Satış bedeli × %2 + KDV', not: 'Alıcı ve satıcı ayrı ayrı %2\'şer öder', ornek: '5M ₺ → 118.000 ₺' },
      { kalem: 'Avukat / Danışman Ücreti', oran: 'Saat ücretiyle veya sabit', not: 'Özellikle ilk alımlarda önerilir', ornek: '~3.000–10.000 ₺' },
      { kalem: 'Çevre ve Şehircilik Harcı', oran: 'Sabit', not: '2024 tapu devir harcı kalemlerinden', ornek: '~1.000 ₺' },
    ],
  },
  {
    kategori: 'Taşınma ve İlk Yerleşim',
    renk: 'emerald',
    masraflar: [
      { kalem: 'Nakliye Hizmeti', oran: 'Mesafe ve eşya miktarına göre', not: 'Şehiriçi: 5K–15K; şehirlerarası: 10K–40K', ornek: '~5.000–40.000 ₺' },
      { kalem: 'Küçük Tadilat / Boya', oran: 'Daire büyüklüğüne göre', not: 'Yeni dairede bile hafif iyileştirme yapılabilir', ornek: '~10.000–50.000 ₺' },
      { kalem: 'Abonelik Açma Ücretleri', oran: 'Sabit', not: 'Elektrik, su, doğalgaz bağlantı ve depozito', ornek: '~2.000–5.000 ₺' },
      { kalem: 'Mobilya / Beyaz Eşya', oran: 'Seçime göre büyük değişim', not: 'Boş daire alımlarında önemli kalem', ornek: '30.000–200.000+ ₺' },
    ],
  },
];

const TOPLAM_OZET = [
  { senaryo: '3M ₺ Daire — Kredi ile', tahmin: '%6–8 ek maliyet', tutar: '180.000–240.000 ₺' },
  { senaryo: '5M ₺ Daire — Kredi ile', tahmin: '%5–7 ek maliyet', tutar: '250.000–350.000 ₺' },
  { senaryo: '10M ₺ Daire — Nakit', tahmin: '%4–5 ek maliyet', tutar: '400.000–500.000 ₺' },
  { senaryo: '2M ₺ Daire — İlk Alım', tahmin: '%8–10 ek maliyet', tutar: '160.000–200.000 ₺' },
];

const TASARRUF_IPUCLARI = [
  { ipucu: 'Tapu harcını belediye değer üzerinden değil gerçek satış fiyatından ödeme zorundasınız; düşük beyan yasal sorumluluk doğurur.' },
  { ipucu: 'DASK için sigorta şirketlerini karşılaştırın; aynı daire için %30 fiyat farkı çıkabilir.' },
  { ipucu: 'Kredi kullanacaksanız birden fazla bankanın ekspertiz şartını karşılaştırın; bazıları ücretsiz sunar.' },
  { ipucu: 'Nakliye için en az 3 firma teklifi alın; sezonun düşük olduğu Kasım–Ocak arası fiyatlar gerilir.' },
];

export default function KonutAlimMaliyetiPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <p className="text-[#00C49F] text-xs font-bold mb-3 uppercase tracking-widest">Alım Rehberi</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">Konut Alım Toplam Maliyet Rehberi</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            Satış fiyatının ötesinde konut alımında oluşan tüm masraflar — gizli kalemler dahil.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">

        {/* Masraf Kategorileri */}
        {MASRAF_KATEGORILERI.map((kat, ki) => {
          const renkMap: Record<string, string> = {
            rose: 'border-rose-100 bg-rose-50 text-rose-700',
            amber: 'border-amber-100 bg-amber-50 text-amber-700',
            blue: 'border-blue-100 bg-blue-50 text-blue-700',
            emerald: 'border-emerald-100 bg-emerald-50 text-emerald-700',
          };
          const baslikRenk = renkMap[kat.renk] ?? 'border-gray-100 bg-gray-50 text-gray-700';
          return (
            <div key={ki} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h2 className={`text-sm font-black mb-4 inline-block px-3 py-1 rounded-full border ${baslikRenk}`}>{kat.kategori}</h2>
              <div className="space-y-3">
                {kat.masraflar.map((m, i) => (
                  <div key={i} className="border border-gray-100 rounded-xl p-4">
                    <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                      <p className="text-xs font-black text-gray-900">{m.kalem}</p>
                      <span className="text-[10px] font-black text-[#00C49F] bg-[#00C49F]/10 px-2 py-0.5 rounded-full">{m.ornek}</span>
                    </div>
                    <p className="text-[11px] text-gray-500 mb-1">{m.not}</p>
                    <p className="text-[10px] text-gray-400 italic">{m.oran}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {/* Toplam Özet */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-4">Senaryo Bazlı Toplam Ek Maliyet</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {TOPLAM_OZET.map((s, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs font-black text-gray-900 mb-1">{s.senaryo}</p>
                <p className="text-[10px] text-gray-500 mb-2">{s.tahmin}</p>
                <p className="text-sm font-black text-rose-500">{s.tutar}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tasarruf İpuçları */}
        <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6">
          <h2 className="text-base font-black text-emerald-800 mb-4">Masrafları Azaltma İpuçları</h2>
          <div className="space-y-3">
            {TASARRUF_IPUCLARI.map((t, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-emerald-500 font-black text-xs mt-0.5">✓</span>
                <p className="text-[11px] text-emerald-700">{t.ipucu}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}
