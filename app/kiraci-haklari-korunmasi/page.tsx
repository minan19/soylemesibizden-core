import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kiracı Hakları Korunması Rehberi 2025 | TBK ve İcra | Söylemesi Bizden',
  description:
    'Kiracının yasal hakları: haksız tahliye, kira artış sınırı, depozito iadesi, mal sahibi müdahalesi ve yasal başvuru yolları.',
};

const TEMEL_HAKLAR = [
  {
    hak: 'Kira Artış Sınırı',
    aciklama: 'Konut kiraları için yıllık kira artışı TÜİK TÜFE oranını aşamaz. Üzerinde artış yapılan sözleşme farkı kiracıdan geri talep edilebilir.',
    kanun: 'TBK md. 344',
    onem: 'Kritik',
  },
  {
    hak: 'Tahliye Koruması',
    aciklama: 'Mal sahibi keyfi olarak kiracıyı çıkaramaz. Tahliye yalnızca kanunda belirtilen sebeplerle (kişisel ihtiyaç, yeniden inşa, taahhüt, temerrüt) mümkündür.',
    kanun: 'TBK md. 347–356',
    onem: 'Kritik',
  },
  {
    hak: 'Depozito Güvencesi',
    aciklama: 'Depozito 3 aylık kiradan fazla olamaz ve kiracı adına vadeli hesapta tutulmalıdır. Teslimde hasar yoksa 1 ay içinde iade edilmelidir.',
    kanun: 'TBK md. 342',
    onem: 'Yüksek',
  },
  {
    hak: 'Kiralananın Ayıpsız Teslimi',
    aciklama: 'Mal sahibi kiralananı sözleşme başında ve kira süresi boyunca kullanıma elverişli durumda tutmakla yükümlüdür.',
    kanun: 'TBK md. 301–302',
    onem: 'Yüksek',
  },
  {
    hak: 'Alt Kiralama / Devir',
    aciklama: 'Kiracı, mal sahibinin yazılı rızası olmadan kiraladığı yeri başkasına devredemez veya alt kiralayamaz.',
    kanun: 'TBK md. 322',
    onem: 'Orta',
  },
  {
    hak: 'Yenilenme (Otomatik Uzama)',
    aciklama: 'Kiracı sözleşme sonunda fesih ihbarında bulunmazsa kira sözleşmesi aynı koşullarla 1 yıl uzar. Mal sahibi bu süreyle tahliye talep edemez.',
    kanun: 'TBK md. 347',
    onem: 'Orta',
  },
];

const TAHLIYE_SEBEPLERI = [
  { sebep: 'Kişisel İhtiyaç', aciklama: 'Mal sahibi veya birinci derece yakının ikamet etmek istemesi. Taşınmadan 1 ay önce noter ihtarı şart.', sure: '10 yılın dolmasından itibaren' },
  { sebep: 'Yeniden İnşa', aciklama: 'Taşınmazın esaslı onarım veya yeniden yapım gerektirmesi.', sure: 'Sözleşme bitiminden 15 gün önce ihtar' },
  { sebep: 'Yazılı Taahhüt', aciklama: 'Kiracı başlangıçta belirli bir tarihte tahliye etmeyi yazılı taahhüt etmişse.', sure: 'Taahhüt tarihinde' },
  { sebep: 'Kira Temerrüdü', aciklama: 'Kiracı 30 günlük süre tanınmasına rağmen kira borcunu ödemezse.', sure: 'İcra takibi + 2 ihtardan sonra' },
  { sebep: 'İki Haklı İhtar', aciklama: 'Aynı sözleşme döneminde 2 kez kira gecikmesi nedeniyle ihtar gönderilmişse dönem sonunda tahliye davası açılabilir.', sure: 'Sözleşme yılı sonunda' },
  { sebep: 'Kiralanan Satışı', aciklama: 'Taşınmazın satışı kiracıyı etkilemez; yeni malik mevcut kira sözleşmesine uymak zorundadır.', sure: 'Sözleşme süresi korunur' },
];

const BASVURU_YOLLARI = [
  { yol: 'Arabuluculuk', aciklama: 'Kira uyuşmazlıklarında dava öncesi zorunlu arabuluculuk sürecine başvurmak gerekir (2023 itibarıyla).', sure: '3 hafta ortalama', maliyet: 'Uygun' },
  { yol: 'Sulh Hukuk Mahkemesi', aciklama: 'Tahliye, depozito iadesi ve kira alacağı davaları sulh hukuk mahkemesinde görülür.', sure: '6–18 ay', maliyet: 'Orta' },
  { yol: 'İcra Takibi', aciklama: 'Ödenmemiş kira için ilamlı veya ilamsız icra takibi başlatılabilir.', sure: '1–3 ay', maliyet: 'Düşük' },
  { yol: 'Tüketici Hakem Heyeti', aciklama: 'Konut amaçlı kiralamalarda bazı uyuşmazlıklar için tüketici hakem heyetine başvurulabilir.', sure: '2–4 ay', maliyet: 'Ücretsiz' },
];

export default function KiraciHaklariKorunmasiPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <p className="text-[#00C49F] text-xs font-bold mb-3 uppercase tracking-widest">Hukuk Rehberi 2025</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">Kiracı Haklarının Korunması</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            Kira artış sınırı, tahliye güvencesi, depozito iadesi ve haksız uygulamalara karşı yasal başvuru yolları.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-4">Temel Kiracı Hakları</h2>
          <div className="space-y-3">
            {TEMEL_HAKLAR.map((h, i) => (
              <div key={i} className={`border rounded-xl p-4 ${h.onem === 'Kritik' ? 'border-emerald-200 bg-emerald-50/30' : h.onem === 'Yüksek' ? 'border-blue-100 bg-blue-50/20' : 'border-gray-100'}`}>
                <div className="flex items-start justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-black text-gray-900">{h.hak}</p>
                    <span className={`text-[9px] font-black px-1.5 py-0.5 rounded ${h.onem === 'Kritik' ? 'bg-emerald-500 text-white' : h.onem === 'Yüksek' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}>{h.onem}</span>
                  </div>
                  <span className="text-[9px] text-gray-400 shrink-0 ml-4">{h.kanun}</span>
                </div>
                <p className="text-[11px] text-gray-600 leading-relaxed">{h.aciklama}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm overflow-x-auto">
          <h2 className="text-base font-black text-gray-900 mb-1">Tahliye Sebepleri ve Süreleri</h2>
          <p className="text-xs text-gray-400 mb-5">Mal sahibinin kiracıyı çıkarabileceği yasal durumlar.</p>
          <div className="space-y-3">
            {TAHLIYE_SEBEPLERI.map((t, i) => (
              <div key={i} className="border border-gray-100 rounded-xl p-4">
                <p className="text-xs font-black text-rose-600 mb-1">{t.sebep}</p>
                <p className="text-[11px] text-gray-600 mb-1">{t.aciklama}</p>
                <p className="text-[10px] text-[#00C49F] font-bold">{t.sure}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm overflow-x-auto">
          <h2 className="text-base font-black text-gray-900 mb-4">Yasal Başvuru Yolları</h2>
          <table className="w-full text-[10px] min-w-[420px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 font-black text-gray-500">Yol</th>
                <th className="text-center py-2 font-black text-gray-500">Süre</th>
                <th className="text-right py-2 font-black text-[#00C49F]">Maliyet</th>
              </tr>
            </thead>
            <tbody>
              {BASVURU_YOLLARI.map((b, i) => (
                <tr key={i} className="border-b border-gray-50 last:border-0">
                  <td className="py-2">
                    <p className="font-black text-gray-900">{b.yol}</p>
                    <p className="text-gray-400 mt-0.5">{b.aciklama}</p>
                  </td>
                  <td className="py-2 text-center font-bold text-gray-600">{b.sure}</td>
                  <td className="py-2 text-right font-bold text-[#00C49F]">{b.maliyet}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
          <p className="text-xs font-black text-amber-700 mb-2">Önemli Hatırlatma</p>
          <p className="text-[11px] text-amber-600 leading-relaxed">
            Kira uyuşmazlıklarında 2023 yılından itibaren zorunlu arabuluculuk uygulanmaktadır; dava açmadan önce arabulucuya başvurmak şarttır. Hukuki durumunuz hakkında avukat danışmanlığı alınması önerilir. Bu rehber genel bilgilendirme amaçlıdır. Yasal dayanak: Türk Borçlar Kanunu (TBK) md. 299–378.
          </p>
        </div>

      </div>
    </main>
  );
}
