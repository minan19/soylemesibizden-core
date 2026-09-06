import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Apartman Yönetim Giderleri Rehberi 2025 | Bütçe ve Aidat | Söylemesi Bizden',
  description:
    'Apartman yönetim giderleri: aidat hesaplama yöntemleri, bütçe kalemleri, ihtiyat fonu ve yasal çerçeve.',
};

const AIDAT_HESAP_YONTEMLERI = [
  {
    yontem: 'Eşit Pay',
    aciklama: 'Tüm bağımsız bölümler eşit aidat öder; uygulaması kolay ama alan farklılıklarını yansıtmaz.',
    avantaj: 'Basit, anlaşılır',
    dezavantaj: 'Büyük daire ile küçük daire eşit öder',
  },
  {
    yontem: 'Arsa Payına Göre',
    aciklama: 'Tapu kütüğünde kayıtlı arsa payı oranında aidat; yasal varsayılan yöntemdir.',
    avantaj: 'Adil, yasal uyumlu',
    dezavantaj: 'Arsa payı alanla orantılı olmayabilir',
  },
  {
    yontem: 'Metrekareye Göre',
    aciklama: 'Bağımsız bölümün brüt veya net alanıyla orantılı aidat; kullanım yoğunluğunu yansıtır.',
    avantaj: 'Hakkaniyetli, kullanım bazlı',
    dezavantaj: 'Doğru alan verisi gerektirir',
  },
  {
    yontem: 'Karma (Değişken)',
    aciklama: 'Isıtma giderleri tüketim bazlı, güvenlik giderleri eşit pay, bakım arsa payı gibi karma uygulama.',
    avantaj: 'Esnek, detaylı adalet',
    dezavantaj: 'Yönetim planı detay gerektirir',
  },
];

const ORNEK_BUTCE_KALEMLERI = [
  { kalem: 'Güvenlik / Kapıcı', tutar: '15.000–40.000 ₺/ay', pay: '%25–35', not: 'SGK dahil brüt ücret' },
  { kalem: 'Temizlik Hizmeti', tutar: '3.000–8.000 ₺/ay', pay: '%10–15', not: 'Ortak alan temizliği' },
  { kalem: 'Elektrik (Ortak)', tutar: '2.000–6.000 ₺/ay', pay: '%8–12', not: 'Asansör, aydınlatma' },
  { kalem: 'Asansör Bakımı', tutar: '2.500–5.000 ₺/ay', pay: '%5–10', not: 'Periyodik servis sözleşmesi' },
  { kalem: 'Su (Ortak Alan)', tutar: '500–2.000 ₺/ay', pay: '%2–5', not: 'Bahçe, temizlik suyu' },
  { kalem: 'Doğalgaz (Kazan)', tutar: '3.000–15.000 ₺/ay', pay: '%5–15', not: 'Sezona göre değişir' },
  { kalem: 'DASK + Bina Sigortası', tutar: '500–2.000 ₺/ay', pay: '%2–5', not: 'Yıllık prim / 12' },
  { kalem: 'İhtiyat Fonu', tutar: '1.000–5.000 ₺/ay', pay: '%5–8', not: 'Büyük onarım birikimi' },
];

const IHTIYAT_FONU_KURALLAR = [
  'Yönetim planında belirtilen oranda her ay birikim yapılır',
  'Fon ayrı bir banka hesabında tutulmalıdır',
  'Büyük onarımlar (çatı, asansör değişimi, boya) için kullanılır',
  'Kullanım için kat malikleri kurulu kararı gerekir',
  'Yıllık bütçenin %10–15\'i ihtiyat fonu olarak ayrılması önerilir',
  'Birikmiş fon satış/devir durumunda yeni malik ile devam eder',
];

const ORNEK_APARTMANLAR = [
  { tip: '10 Daireli Küçük Apartman', aylikGider: '25.000–45.000 ₺', daireBasi: '2.500–4.500 ₺/ay', ozellik: 'Kapıcısız, asansörlü' },
  { tip: '20 Daireli Orta Boy Apartman', aylikGider: '60.000–100.000 ₺', daireBasi: '3.000–5.000 ₺/ay', ozellik: 'Kapıcılı, güvenlikli' },
  { tip: '50+ Daireli Site', aylikGider: '200.000–400.000 ₺', daireBasi: '4.000–8.000 ₺/ay', ozellik: 'Sosyal tesis, güvenlik, bahçe' },
  { tip: 'Lüks Rezidans (100+ Daire)', aylikGider: '500.000–1.200.000 ₺', daireBasi: '5.000–12.000 ₺/ay', ozellik: 'Havuz, spor salonu, konsiyerj' },
];

export default function ApartmanYonetimGiderleriPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <p className="text-[#00C49F] text-xs font-bold mb-3 uppercase tracking-widest">Konut Rehberi</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">Apartman Yönetim Giderleri Rehberi 2025</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            Aidat hesaplama yöntemleri, bütçe kalemleri, ihtiyat fonu kuralları ve yasal çerçeve. Hem ev sahibi hem kiracı için kapsamlı kılavuz.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">

        {/* Aidat Hesaplama Yöntemleri */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-1">Aidat Hesaplama Yöntemleri</h2>
          <p className="text-xs text-gray-400 mb-5">Kat Mülkiyeti Kanunu çerçevesinde uygulanan başlıca dört yöntem.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {AIDAT_HESAP_YONTEMLERI.map((y, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <p className="text-xs font-black text-gray-900 mb-1">{y.yontem}</p>
                <p className="text-[10px] text-gray-500 leading-relaxed mb-3">{y.aciklama}</p>
                <div className="flex gap-2 flex-wrap">
                  <span className="text-[9px] font-black bg-[#00C49F]/10 text-[#00C49F] px-2 py-0.5 rounded-full">+ {y.avantaj}</span>
                  <span className="text-[9px] font-black bg-red-50 text-red-500 px-2 py-0.5 rounded-full">− {y.dezavantaj}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Örnek Bütçe Kalemleri */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm overflow-x-auto">
          <h2 className="text-base font-black text-gray-900 mb-1">Örnek Bütçe Kalemleri</h2>
          <p className="text-xs text-gray-400 mb-5">Tipik bir orta ölçekli apartman için aylık gider dağılımı (2025).</p>
          <table className="w-full text-[10px] min-w-[480px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 font-black text-gray-500">Kalem</th>
                <th className="text-center py-2 font-black text-gray-500">Tutar</th>
                <th className="text-center py-2 font-black text-gray-500">Pay</th>
                <th className="text-right py-2 font-black text-[#00C49F]">Not</th>
              </tr>
            </thead>
            <tbody>
              {ORNEK_BUTCE_KALEMLERI.map((k, i) => (
                <tr key={i} className="border-b border-gray-50 last:border-0">
                  <td className="py-2 font-black text-gray-900">{k.kalem}</td>
                  <td className="py-2 text-center font-bold text-gray-600">{k.tutar}</td>
                  <td className="py-2 text-center font-bold text-[#00C49F]">{k.pay}</td>
                  <td className="py-2 text-right font-bold text-gray-400">{k.not}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* İhtiyat Fonu Kuralları */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-1">İhtiyat Fonu Kuralları</h2>
          <p className="text-xs text-gray-400 mb-5">Büyük onarımlar için birikim fonu hakkında bilinmesi gerekenler.</p>
          <ul className="space-y-2">
            {IHTIYAT_FONU_KURALLAR.map((kural, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-0.5 w-4 h-4 rounded-full bg-[#00C49F]/15 text-[#00C49F] flex items-center justify-center text-[9px] font-black flex-shrink-0">{i + 1}</span>
                <p className="text-[11px] text-gray-600 leading-relaxed">{kural}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Apartman Tipleri */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm overflow-x-auto">
          <h2 className="text-base font-black text-gray-900 mb-1">Apartman Tipine Göre Gider Örnekleri</h2>
          <p className="text-xs text-gray-400 mb-5">Büyüklük ve özelliğe göre aylık toplam gider ve daire başı maliyet tahmini.</p>
          <table className="w-full text-[10px] min-w-[480px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 font-black text-gray-500">Tip</th>
                <th className="text-center py-2 font-black text-gray-500">Aylık Toplam</th>
                <th className="text-center py-2 font-black text-gray-500">Daire Başı</th>
                <th className="text-right py-2 font-black text-[#00C49F]">Özellik</th>
              </tr>
            </thead>
            <tbody>
              {ORNEK_APARTMANLAR.map((a, i) => (
                <tr key={i} className="border-b border-gray-50 last:border-0">
                  <td className="py-2 font-black text-gray-900">{a.tip}</td>
                  <td className="py-2 text-center font-bold text-gray-600">{a.aylikGider}</td>
                  <td className="py-2 text-center font-bold text-[#00C49F]">{a.daireBasi}</td>
                  <td className="py-2 text-right font-bold text-gray-400">{a.ozellik}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Uyarı kutusu */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
          <p className="text-xs font-black text-amber-700 mb-2">Aidat Borcu Hukuki Uyarı</p>
          <p className="text-[11px] text-amber-700 leading-relaxed">
            Aidat borçlanması ciddi hukuki sonuçlar doğurabilir. Aidat borcunuzun üç ayı aşması halinde yönetici icra takibi başlatabilir; gecikme faizi ile birlikte artan borç tapu üzerine haciz şerhi konulmasına neden olabilir. Bütçe planlamasında aidat giderini mutlaka hesaba katın.
          </p>
        </div>

      </div>
    </main>
  );
}
