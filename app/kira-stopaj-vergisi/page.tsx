import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kira Stopaj Vergisi Rehberi 2025 | Beyan ve Hesaplama | Söylemesi Bizden',
  description:
    'Kira geliri stopaj vergisi: şirketlerin ödediği stopaj oranı, mahsup hakkı, yıllık beyan zorunluluğu ve pratik hesaplama örnekleri.',
};

const STOPAJ_ORANLARI = [
  { odeyenTip: 'Gerçek Kişi (Kiraya Veren)', oran: 'Stopaj yok', aciklama: 'Kiracı gerçek kişi ise stopaj kesilmez; kiraya veren yıllık beyan verir.' },
  { odeyenTip: 'Ticari İşletme / Şirket (Kiracı)', oran: '%20', aciklama: 'Şirket kiracı ise brüt kira üzerinden %20 stopaj keser ve devlete yatırır.' },
  { odeyenTip: 'Kamu Kurumu (Kiracı)', oran: '%20', aciklama: 'Kamu kiracıları da %20 stopaj kesmekle yükümlüdür.' },
  { odeyenTip: 'Dernek / Vakıf (Kiracı)', oran: '%20', aciklama: 'Dernek veya vakıf kiracı olduğunda stopaj yükümlülüğü doğar.' },
];

const MAHSUP_ORNEKLERI = [
  {
    senaryo: 'Şirket kiracıdan 50.000 ₺/ay kira',
    brutKira: 50000,
    stopaj: 10000,
    netOdeme: 40000,
    yillikBeyan: 600000,
    hesaplananVergi: 135000,
    mahsupEdilen: 120000,
    odenmesiGereken: 15000,
  },
  {
    senaryo: 'Şirket kiracıdan 20.000 ₺/ay kira',
    brutKira: 20000,
    stopaj: 4000,
    netOdeme: 16000,
    yillikBeyan: 240000,
    hesaplananVergi: 42500,
    mahsupEdilen: 48000,
    odenmesiGereken: 0,
  },
];

const BEYAN_TAKVIMI = [
  { tarih: '1–31 Mart', islem: 'Yıllık Gelir Vergisi Beyannamesi', detay: 'Önceki yılın tüm kira gelirleri beyan edilir' },
  { tarih: '31 Mart\'a kadar', islem: '1. taksit ödemesi', detay: 'Hesaplanan verginin yarısı ödenir' },
  { tarih: '31 Temmuz\'a kadar', islem: '2. taksit ödemesi', detay: 'Kalan vergi taksidi ödenir' },
  { tarih: 'Her ay (şirket kiracı)', islem: 'Muhtasar beyanname', detay: 'Şirket kiracı, ertesi ayın 26\'sına kadar stopajı beyan eder' },
];

const PRATIK_NOTLAR = [
  { baslik: 'Brüt mü Net mi?', aciklama: 'Stopaj kira sözleşmesindeki brüt tutar üzerinden hesaplanır. Sözleşmede net rakam yazılıysa brüt tutara çevrilerek işlem yapılır.' },
  { baslik: 'Eksik Beyan Riski', aciklama: 'Stopaj kesilen kira gelirini beyan etmemek vergi kaçakçılığı sayılır; %50 vergi ziyaı cezası + gecikme faizi uygulanır.' },
  { baslik: 'Fazla Ödenen Stopaj', aciklama: 'Yıllık beyan sonucunda ödenmesi gereken vergi sıfır veya negatif çıkarsa fazla ödenen stopaj iade alınır.' },
  { baslik: '22.000 ₺ İstisna', aciklama: '2024 yılı konut kira geliri için 22.000 ₺ istisna stopajdan değil, yıllık beyanname üzerinden uygulanır.' },
  { baslik: 'Sözleşme Kayıt', aciklama: 'Noter tasdikli veya dijital kira sözleşmesi stopaj belgelerinde gerekli; vergi dairesine kayıt ettirin.' },
  { baslik: 'Kira Teminat Mektubu', aciklama: 'Teminat mektubu kira geliri sayılmaz; iade edilen depozito için stopaj kesintisi yapılmamalıdır.' },
];

export default function KiraStopajVergisiPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <p className="text-[#00C49F] text-xs font-bold mb-3 uppercase tracking-widest">Vergi Rehberi 2025</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">Kira Stopaj Vergisi Rehberi</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            Şirket kiracıdan kira geliri elde edenlerin stopaj yükümlülükleri, mahsup hakkı ve yıllık beyan rehberi.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-4">Kiracı Tipine Göre Stopaj Oranları</h2>
          <div className="space-y-3">
            {STOPAJ_ORANLARI.map((s, i) => (
              <div key={i} className="border border-gray-100 rounded-xl p-4">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs font-black text-gray-900">{s.odeyenTip}</p>
                  <span className={`text-[9px] font-black px-2 py-0.5 rounded ${s.oran === 'Stopaj yok' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>{s.oran}</span>
                </div>
                <p className="text-[11px] text-gray-500 leading-relaxed">{s.aciklama}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm overflow-x-auto">
          <h2 className="text-base font-black text-gray-900 mb-1">Stopaj + Yıllık Beyan Örneği</h2>
          <p className="text-xs text-gray-400 mb-5">Şirket kiracıdan kira geliri elde eden gerçek kişi için hesaplama.</p>
          {MAHSUP_ORNEKLERI.map((ornek, i) => (
            <div key={i} className="mb-6 last:mb-0">
              <p className="text-[10px] font-black text-[#00C49F] mb-3">{ornek.senaryo}</p>
              <table className="w-full text-[10px] min-w-[380px]">
                <tbody>
                  <tr className="border-b border-gray-50">
                    <td className="py-1.5 font-black text-gray-600">Brüt kira (aylık)</td>
                    <td className="py-1.5 text-right font-bold text-gray-900">{ornek.brutKira.toLocaleString('tr-TR')} ₺</td>
                  </tr>
                  <tr className="border-b border-gray-50">
                    <td className="py-1.5 font-black text-gray-600">Stopaj kesintisi (%20)</td>
                    <td className="py-1.5 text-right font-bold text-rose-500">−{ornek.stopaj.toLocaleString('tr-TR')} ₺</td>
                  </tr>
                  <tr className="border-b border-gray-50">
                    <td className="py-1.5 font-black text-gray-600">Net kira ödemesi</td>
                    <td className="py-1.5 text-right font-bold text-gray-900">{ornek.netOdeme.toLocaleString('tr-TR')} ₺</td>
                  </tr>
                  <tr className="border-b border-gray-50">
                    <td className="py-1.5 font-black text-gray-600">Yıllık brüt kira</td>
                    <td className="py-1.5 text-right font-bold text-gray-900">{ornek.yillikBeyan.toLocaleString('tr-TR')} ₺</td>
                  </tr>
                  <tr className="border-b border-gray-50">
                    <td className="py-1.5 font-black text-gray-600">Hesaplanan gelir vergisi (tahmini)</td>
                    <td className="py-1.5 text-right font-bold text-rose-500">{ornek.hesaplananVergi.toLocaleString('tr-TR')} ₺</td>
                  </tr>
                  <tr className="border-b border-gray-50">
                    <td className="py-1.5 font-black text-gray-600">Mahsup edilen stopaj (yıllık)</td>
                    <td className="py-1.5 text-right font-bold text-emerald-600">−{ornek.mahsupEdilen.toLocaleString('tr-TR')} ₺</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="py-1.5 font-black text-gray-900">Mart ayında ödenecek vergi</td>
                    <td className={`py-1.5 text-right font-black ${ornek.odenmesiGereken === 0 ? 'text-emerald-600' : 'text-[#00C49F]'}`}>
                      {ornek.odenmesiGereken === 0 ? 'İade hakkı doğar' : `${ornek.odenmesiGereken.toLocaleString('tr-TR')} ₺`}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm overflow-x-auto">
          <h2 className="text-base font-black text-gray-900 mb-4">Beyan Takvimi</h2>
          <table className="w-full text-[10px] min-w-[380px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 font-black text-gray-500">Tarih</th>
                <th className="text-center py-2 font-black text-gray-500">İşlem</th>
                <th className="text-right py-2 font-black text-[#00C49F]">Detay</th>
              </tr>
            </thead>
            <tbody>
              {BEYAN_TAKVIMI.map((b, i) => (
                <tr key={i} className="border-b border-gray-50 last:border-0">
                  <td className="py-2 font-black text-gray-900">{b.tarih}</td>
                  <td className="py-2 text-center font-bold text-[#00C49F]">{b.islem}</td>
                  <td className="py-2 text-right font-bold text-gray-400">{b.detay}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-4">Pratik Bilgiler</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {PRATIK_NOTLAR.map((n, i) => (
              <div key={i} className="border border-gray-100 rounded-xl p-4">
                <p className="text-xs font-black text-gray-900 mb-1">{n.baslik}</p>
                <p className="text-[11px] text-gray-500 leading-relaxed">{n.aciklama}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
          <p className="text-xs font-black text-amber-700 mb-2">Önemli Uyarı</p>
          <p className="text-[11px] text-amber-600 leading-relaxed">
            Stopaj oranları ve beyan süreleri Maliye Bakanlığı kararlarıyla güncellenebilir. Yüksek tutarlı kira gelirleri için mali müşavirden destek alınması önerilir. Bu içerik 2025 yılı mevzuatına göre hazırlanmış olup yasal tavsiye niteliği taşımaz. Yasal dayanak: Gelir Vergisi Kanunu md. 70, 73, 94; GVK md. 21.
          </p>
        </div>

      </div>
    </main>
  );
}
