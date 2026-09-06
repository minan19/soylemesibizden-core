import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gayrimenkul Vergi Rehberi 2025 | Tapu, KDV, Emlak Vergisi | Söylemesi Bizden',
  description:
    'Türkiye\'de gayrimenkul vergileri 2025: tapu harcı, KDV, değer artış kazancı, emlak vergisi, kira geliri vergisi oranları ve hesaplama rehberi.',
};

const VERGILER = [
  {
    vergi: 'Tapu Harcı',
    oran: '%4 (alıcı + satıcı = %2+%2)',
    matrah: 'Tapu değeri (beyan)',
    odeyenler: 'Alıcı ve Satıcı (ayrı ayrı %2)',
    istisna: 'Konutlarda beyan değeri piyasa altı bildirilemez',
    kanun: 'Harçlar Kanunu md. 57',
  },
  {
    vergi: 'KDV (Konut)',
    oran: '%1 (150m²\'ye kadar sıfır daire), %20 (lüks)',
    matrah: 'Satış bedeli',
    odeyenler: 'Alıcı (müteahhit faturasında)',
    istisna: '1 yıldan fazla sahip olunan ilk konut satışı KDV\'den muaf',
    kanun: 'KDV Kanunu md. 17/4-r',
  },
  {
    vergi: 'Değer Artış Kazancı Vergisi',
    oran: '%15–35 (gelir dilimi)',
    matrah: 'Alış-Satış farkı (enflasyon düzeltmesi sonrası)',
    odeyenler: 'Satıcı (gerçek kişi)',
    istisna: '5 yıldan fazla elde tutulan gayrimenkul satışı vergiden muaf',
    kanun: 'GVK Geçici md. 71, md. 80',
  },
  {
    vergi: 'Emlak Vergisi',
    oran: 'Konut: %0,1–%0,2 / Arsa: %0,3–%0,6',
    matrah: 'Vergi değeri (her yıl güncellenir)',
    odeyenler: 'Mülk sahibi (Mayıs-Kasım taksitleri)',
    istisna: '200m² altı tek konut için %50 indirim',
    kanun: 'Emlak Vergisi Kanunu',
  },
  {
    vergi: 'Kira Geliri Vergisi',
    oran: '%15–40 (gelir dilimi) | Götürü gider %15',
    matrah: 'Yıllık kira geliri (22.000 ₺ istisna — 2024)',
    odeyenler: 'Kiraya veren (gerçek kişi)',
    istisna: '22.000 ₺ yıllık istisna tutarına kadar vergi yok',
    kanun: 'GVK md. 21, md. 73',
  },
  {
    vergi: 'DASK (Zorunlu Sigorta)',
    oran: 'Prim: Risk bölgesi + yapı × alan bazlı',
    matrah: 'Bina yeniden yapım değeri',
    odeyenler: 'Mülk sahibi',
    istisna: 'Tapuya ekleniyor, sigortasız devir yapılamaz',
    kanun: '587 sayılı KHK',
  },
];

const ISTISNA_VE_MUAFIYETLER = [
  { durum: '5 Yıl Kuralı', aciklama: 'Gayrimenkulü satın alış tarihinden 5 yıl sonra satarsanız değer artış kazancı vergisi ödemezsiniz.', onem: 'Yüksek' },
  { durum: 'İlk Konut İstisnası', aciklama: 'Gerçek usulde KDV mükellefi olmayan kişilerin işyeri hariç konutlarda, 1 yıldan fazla ikamet edilen konutun satışı KDV\'den muaftır.', onem: 'Yüksek' },
  { durum: '200m² Emlak Vergisi İndirimi', aciklama: 'Tek konuta sahip kişiler, konut 200m² altındaysa emlak vergisini %50 indirimli öder.', onem: 'Orta' },
  { durum: 'Kira Geliri İstisnası', aciklama: '2024 yılı için 22.000 ₺ yıllık kira geliri istisna limitindedir. Bu tutarın altındaki kira için beyan zorunluluğu yoktur.', onem: 'Orta' },
  { durum: 'Engelli Bireylere Muafiyet', aciklama: 'Engellilik oranı %40 ve üzerinde olan kişiler konuttaki emlak vergisinden muaftır.', onem: 'Özel' },
  { durum: 'Enflasyon Düzeltmesi', aciklama: 'Değer artış kazancı hesabında alış bedeli TÜFE ile güncellenir; gerçek kazanç düşer.', onem: 'Yüksek' },
];

const SATIN_ALMA_MALIYETI = [
  { kalem: 'Tapu Harcı (Alıcı)', oran: '%2', ornek: '5M ₺ konut için 100.000 ₺' },
  { kalem: 'Döner Sermaye', oran: 'Sabit (~300–1.000 ₺)', ornek: 'Tapu Müdürlüğü ücreti' },
  { kalem: 'KDV (yeni konut)', oran: '%1 veya %20', ornek: 'Müteahhitten alımda' },
  { kalem: 'Ekspertiz Ücreti', oran: '1.500–4.000 ₺ (sabit)', ornek: 'Banka kredisi için zorunlu' },
  { kalem: 'DASK Sigortası', oran: 'Prim: 200–2.000+ ₺/yıl', ornek: 'Risk bölgesi ve m² bazlı' },
  { kalem: 'Tapu Harcı (Satıcı)', oran: '%2', ornek: 'Satıcıya ait maliyet' },
];

export default function GayrimenkulVergiRehberiPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <p className="text-[#00C49F] text-xs font-bold mb-3 uppercase tracking-widest">Vergi Rehberi 2025</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">Gayrimenkul Vergi Rehberi</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            2025 yılı gayrimenkul vergileri: tapu harcı, KDV, değer artış kazancı, emlak vergisi ve kira geliri vergisi oranları.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">

        {/* Vergi Tablosu */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm overflow-x-auto">
          <h2 className="text-base font-black text-gray-900 mb-1">Tüm Gayrimenkul Vergileri</h2>
          <p className="text-xs text-gray-400 mb-5">Satın alma, elde tutma ve kira süreçlerindeki vergi yükleri.</p>
          <div className="space-y-4">
            {VERGILER.map((v, i) => (
              <div key={i} className="border border-gray-100 rounded-xl p-4">
                <div className="flex items-start justify-between mb-2">
                  <p className="text-xs font-black text-gray-900">{v.vergi}</p>
                  <span className="text-[9px] text-gray-400 shrink-0 ml-4">{v.kanun}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <p className="text-[9px] text-gray-400 mb-0.5">Oran</p>
                    <p className="text-[10px] font-black text-rose-500">{v.oran}</p>
                  </div>
                  <div>
                    <p className="text-[9px] text-gray-400 mb-0.5">Matrah</p>
                    <p className="text-[10px] font-bold text-gray-700">{v.matrah}</p>
                  </div>
                  <div>
                    <p className="text-[9px] text-gray-400 mb-0.5">Ödeyen</p>
                    <p className="text-[10px] font-bold text-gray-700">{v.odeyenler}</p>
                  </div>
                  <div>
                    <p className="text-[9px] text-gray-400 mb-0.5">İstisna / Not</p>
                    <p className="text-[10px] font-bold text-[#00C49F]">{v.istisna}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* İstisnalar */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-4">İstisna ve Muafiyetler</h2>
          <div className="space-y-3">
            {ISTISNA_VE_MUAFIYETLER.map((m, i) => (
              <div key={i} className="border border-emerald-100 rounded-xl p-4 bg-emerald-50/30">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-xs font-black text-emerald-700">{m.durum}</p>
                  <span className={`text-[9px] font-black px-1.5 py-0.5 rounded ${m.onem === 'Yüksek' ? 'bg-emerald-500 text-white' : m.onem === 'Orta' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}`}>{m.onem}</span>
                </div>
                <p className="text-[11px] text-gray-600 leading-relaxed">{m.aciklama}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Satın Alma Maliyeti */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm overflow-x-auto">
          <h2 className="text-base font-black text-gray-900 mb-1">Satın Alma Toplam Maliyet Kalemleri</h2>
          <p className="text-xs text-gray-400 mb-5">Tapu tescilinde ödenen tüm kalemler.</p>
          <table className="w-full text-[10px] min-w-[380px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 font-black text-gray-500">Kalem</th>
                <th className="text-center py-2 font-black text-gray-500">Oran</th>
                <th className="text-right py-2 font-black text-gray-500">Örnek</th>
              </tr>
            </thead>
            <tbody>
              {SATIN_ALMA_MALIYETI.map((m, i) => (
                <tr key={i} className="border-b border-gray-50 last:border-0">
                  <td className="py-2 font-black text-gray-900">{m.kalem}</td>
                  <td className="py-2 text-center font-bold text-rose-500">{m.oran}</td>
                  <td className="py-2 text-right font-bold text-gray-400">{m.ornek}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
          <p className="text-xs font-black text-amber-700 mb-2">Önemli Uyarı</p>
          <p className="text-[11px] text-amber-600 leading-relaxed">
            Vergi oranları ve istisna tutarları her yıl güncellenmektedir. Büyük gayrimenkul işlemleri öncesinde mali müşavir veya vergi avukatından güncel danışmanlık almanızı öneririz. Bu rehber bilgilendirme amaçlı olup yasal tavsiye niteliği taşımaz.
          </p>
        </div>

      </div>
    </main>
  );
}
