import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Konut Alım Satım Vergileri 2025 | Tapu Harcı, KDV ve Değer Artış Vergisi | Söylemesi Bizden',
  description:
    'Konut alım satım vergileri: tapu harcı oranları, KDV istisnası, değer artış kazancı vergisi, stopaj ve beyan yükümlülükleri.',
};

const ALIM_VERGILERI = [
  {
    vergi: 'Tapu Harcı (Alıcı)',
    oran: '%2 (satış bedelinin)',
    matrah: 'Satış bedeli veya vergi değeri (hangisi yüksekse)',
    muafiyet: 'İlk konut alımında indirimli oran yok (standart %2)',
    odeme: 'Tapu devri sırasında tapu müdürlüğünde',
  },
  {
    vergi: 'Tapu Harcı (Satıcı)',
    oran: '%2 (satış bedelinin)',
    matrah: 'Satış bedeli',
    muafiyet: 'Genel muafiyet yok',
    odeme: 'Tapu devri sırasında',
  },
  {
    vergi: 'KDV (Katma Değer Vergisi)',
    oran: '%1 / %10 / %20',
    matrah: 'Net alan ve proje türüne göre değişir',
    muafiyet: '150 m² altı konutlar şartlı %1; devlet desteği projeleri muaf olabilir',
    odeme: 'Müteahhit / satıcı firması tahsil eder',
  },
  {
    vergi: 'Döner Sermaye Ücreti',
    oran: 'Sabit tarife (yılda güncellenir)',
    matrah: 'İşlem türüne göre',
    muafiyet: 'Yok',
    odeme: 'Tapu işlemi sırasında',
  },
];

const SATIS_VERGILERI = [
  {
    vergi: 'Değer Artışı Kazancı Vergisi',
    oran: '%15–40 (gelir vergisi dilimleri)',
    matrah: 'Satış bedeli − (alış bedeli + enflasyon düzeltmesi + giderler)',
    istisnalar: [
      '5 yıldan uzun süredir elde tutulan taşınmazlarda değer artışı vergisi yok',
      '2024 istisna tutarı: 87.000 ₺ (yıllık güncellenir)',
      'Miras veya bağış yoluyla edinilenlerde elde tutma süresi veraset tarihinden başlar',
    ],
    odeme: 'Satışı izleyen yıl Mart ayı beyannamesiyle',
  },
];

const VERGI_ORANLARI_DILIM = [
  { dilim: '0 – 110.000 ₺', oran: '%15' },
  { dilim: '110.001 – 230.000 ₺', oran: '%20' },
  { dilim: '230.001 – 580.000 ₺', oran: '%27' },
  { dilim: '580.001 – 3.000.000 ₺', oran: '%35' },
  { dilim: '3.000.001 ₺ üzeri', oran: '%40' },
];

const ENFLASYON_DUZELTMESI = [
  { yil: '2021 alış', tufe2021: '186,3', tufe2024: '580,5', duzeltmeCarpani: '3,12', ornek: '500.000 ₺ alış → 1.560.000 ₺ düzeltilmiş maliyet' },
  { yil: '2022 alış', tufe2022: '278,5', tufe2024: '580,5', duzeltmeCarpani: '2,08', ornek: '1.000.000 ₺ alış → 2.080.000 ₺ düzeltilmiş maliyet' },
  { yil: '2023 alış', tufe2023: '425,3', tufe2024: '580,5', duzeltmeCarpani: '1,37', ornek: '2.000.000 ₺ alış → 2.740.000 ₺ düzeltilmiş maliyet' },
];

const KDV_DURUMU = [
  { durum: 'Net alan ≤ 150 m², konut niteliği', kdv: '%1', aciklama: 'Konut projelerinde standart oran' },
  { durum: 'Net alan > 150 m²', kdv: '%20', aciklama: 'Büyük konutlarda tam oran' },
  { durum: 'Lüks konut (belirli kriterler)', kdv: '%20', aciklama: 'Yüksek bütçeli projeler' },
  { durum: 'İkinci el konut (bireysel satış)', kdv: 'Yok', aciklama: 'Bireyden bireye satışta KDV uygulanmaz' },
  { durum: 'Ticari gayrimenkul', kdv: '%20', aciklama: 'Ofis, dükkan, depo' },
];

const SSS = [
  {
    soru: '5 yıl dolmadan satarsam ne kadar vergi öderim?',
    cevap: 'Satış kazancından 87.000 ₺ istisna ve enflasyon düzeltmesi düşüldükten sonra kalan tutar gelir vergisi dilimlerine göre vergilendirilir. Hesaplama örneği: 2022\'de 1M ₺\'ye alınan konut 2024\'te 2,5M ₺\'ye satılırsa; düzeltilmiş maliyet 2,08M ₺, istisna 87K ₺ düşülünce vergilendirilebilir kazanç ~330.000 ₺ olur.',
  },
  {
    soru: 'Tapu harcını kim öder?',
    cevap: 'Hukuki olarak alıcı ve satıcı ayrı ayrı %2\'şer ödeyerek toplam %4 tapu harcı tahakkuk eder. Uygulamada taraflar anlaşarak tamamını birine yükleyebilir ancak yasal yükümlülük ikisi üzerindedir.',
  },
  {
    soru: 'Miras yoluyla aldığım konutu satsam vergi var mı?',
    cevap: 'Miras tarihinden itibaren 5 yıl geçmişse değer artışı vergisi yoktur. 5 yıl dolmadan satılırsa veraset değeri (beyan edilen vergi değeri) esas alınarak kazanç hesaplanır.',
  },
  {
    soru: 'Satışı beyan etmesem ne olur?',
    cevap: 'Tapu verileri vergi idaresiyle otomatik paylaşılmaktadır. Beyan edilmeyen değer artışı kazancı sonradan tespit edilirse vergi aslı + ceza + gecikme faizi ile birlikte tarhiyat yapılır.',
  },
];

export default function KonutAlimSatimVergileriPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <p className="text-[#00C49F] text-xs font-bold mb-3 uppercase tracking-widest">Vergi Rehberi 2025</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">Konut Alım Satım Vergileri</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            Tapu harcı, KDV, değer artışı kazancı vergisi: alıcı ve satıcı için tüm yükümlülükler ve istisnalar.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-4">Alım Aşamasındaki Vergiler</h2>
          <div className="space-y-3">
            {ALIM_VERGILERI.map((v, i) => (
              <div key={i} className="border border-gray-100 rounded-xl p-4">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs font-black text-gray-900">{v.vergi}</p>
                  <span className="text-[9px] font-black text-[#00C49F] shrink-0 ml-4">{v.oran}</span>
                </div>
                <p className="text-[10px] text-gray-500 mb-1">Matrah: {v.matrah}</p>
                <p className="text-[10px] text-gray-400">Muafiyet: {v.muafiyet}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-4">KDV Durumu</h2>
          <div className="space-y-2">
            {KDV_DURUMU.map((k, i) => (
              <div key={i} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                <p className="text-[11px] text-gray-700 flex-1">{k.durum}</p>
                <span className="text-[10px] font-black text-[#00C49F] shrink-0">{k.kdv}</span>
                <p className="text-[10px] text-gray-400 shrink-0 hidden sm:block">{k.aciklama}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-2">Değer Artışı Kazancı Vergisi (Satış)</h2>
          <p className="text-xs text-gray-400 mb-4">5 yıldan kısa sürede satışta uygulanır; 5+ yılda muaf.</p>
          <div className="border border-amber-100 bg-amber-50/30 rounded-xl p-4 mb-4">
            <p className="text-[10px] font-black text-amber-700 mb-2">İstisnalar</p>
            <ul className="space-y-1">
              {SATIS_VERGILERI[0].istisnalar.map((ist, i) => (
                <li key={i} className="text-[11px] text-gray-600 flex gap-2">
                  <span className="text-[#00C49F] shrink-0">✓</span>
                  {ist}
                </li>
              ))}
            </ul>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-[10px] min-w-[300px]">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-2 font-black text-gray-500">Kazanç Dilimi (2024)</th>
                  <th className="text-right py-2 font-black text-[#00C49F]">Vergi Oranı</th>
                </tr>
              </thead>
              <tbody>
                {VERGI_ORANLARI_DILIM.map((d, i) => (
                  <tr key={i} className="border-b border-gray-50 last:border-0">
                    <td className="py-2 font-bold text-gray-700">{d.dilim}</td>
                    <td className="py-2 text-right font-black text-[#00C49F]">{d.oran}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm overflow-x-auto">
          <h2 className="text-base font-black text-gray-900 mb-1">Enflasyon Düzeltmesi Örnekleri</h2>
          <p className="text-xs text-gray-400 mb-4">Alış maliyeti TÜFE oranıyla güncellenerek vergilendirilebilir kazanç azaltılır.</p>
          <table className="w-full text-[10px] min-w-[440px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 font-black text-gray-500">Alış Yılı</th>
                <th className="text-center py-2 font-black text-gray-500">Düzeltme Çarpanı</th>
                <th className="text-right py-2 font-black text-[#00C49F]">Örnek</th>
              </tr>
            </thead>
            <tbody>
              {ENFLASYON_DUZELTMESI.map((e, i) => (
                <tr key={i} className="border-b border-gray-50 last:border-0">
                  <td className="py-2 font-black text-gray-900">{e.yil}</td>
                  <td className="py-2 text-center font-bold text-[#00C49F]">×{e.duzeltmeCarpani}</td>
                  <td className="py-2 text-right text-gray-500">{e.ornek}</td>
                </tr>
              ))}
            </tbody>
          </table>
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

        <div className="bg-rose-50 border border-rose-100 rounded-2xl p-5">
          <p className="text-xs font-black text-rose-700 mb-2">Önemli Uyarı</p>
          <p className="text-[11px] text-rose-600 leading-relaxed">
            Vergi oranları ve istisna tutarları her yıl güncellenmektedir. Bu rehberdeki bilgiler 2024–2025 dönemi baz alınarak hazırlanmıştır. Satış işlemi öncesinde güncel oranları bir vergi danışmanıyla teyit edin. Vergi planlaması için satış tarihini 5 yıl dolumunu bekleyecek şekilde programlamak en yaygın ve yasal yöntemdir.
          </p>
        </div>

      </div>
    </main>
  );
}
