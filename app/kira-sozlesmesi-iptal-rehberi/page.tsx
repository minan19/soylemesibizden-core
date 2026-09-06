import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kira Sözleşmesi İptal Rehberi | Tahliye ve Fesih Hakları | Söylemesi Bizden',
  description:
    'Kira sözleşmesi iptal ve fesih rehberi: kiracı ve kiraya veren hakları, yasal bildirim süreleri, ihtarname örneği ve tahliye dava süreci.',
};

const KIRACININ_FESIH_HAKLARI = [
  {
    baslik: 'Süre Bitiminde Bildirimle Fesih',
    sure: '3 ay önceden ihtarname',
    aciklama: 'Belirli süreli sözleşmelerde kiracı, süre bitiminden 15 gün önce; belirsiz süreli sözleşmelerde 3 ay önceden yazılı bildirimde bulunarak sözleşmeyi sona erdirebilir.',
    kanun: 'TBK md. 347/1',
  },
  {
    baslik: 'Olağanüstü Fesih (Haklı Sebep)',
    sure: 'Derhal veya kısa süre',
    aciklama: 'Konutun kullanıma elverişsiz hale gelmesi, kiralananın ayıplı olması veya sağlığı tehdit eden koşullar oluşması halinde kiracı sözleşmeyi derhal feshedebilir.',
    kanun: 'TBK md. 331',
  },
  {
    baslik: 'Yeni İş veya Eğitim Nedeniyle',
    sure: '3 ay',
    aciklama: 'Kiracının başka bir şehre iş veya eğitim nedeniyle taşınması zorunluluğu meşru fesih sebebidir; mahkeme kararıyla fesih mümkündür.',
    kanun: 'TBK md. 331',
  },
];

const KIRAYA_VERENIN_FESIH_HAKLARI = [
  {
    baslik: 'Kira Bedelinin Ödenmemesi',
    sure: '30 gün ihtarname',
    aciklama: '2 kira bedeli ödenmezse kiraya veren noter aracılığıyla ihtarname göndererek 30 gün süre verir. Bu sürede ödenmezse tahliye davası açılabilir.',
    kanun: 'TBK md. 352',
  },
  {
    baslik: 'Malikin Konut İhtiyacı',
    sure: '6 ay önceden ihtarname',
    aciklama: 'Kiraya verenin veya birinci derece yakının konut ihtiyacı doğarsa, sözleşme süresi bitiminden 3 ay önce yazılı bildirimle tahliye istenebilir.',
    kanun: 'TBK md. 350',
  },
  {
    baslik: 'Yeniden İnşa veya Esaslı Onarım',
    sure: '6 ay önceden bildirim',
    aciklama: 'Ruhsat gerektiren esaslı tadilat veya yıkım-inşa sürecinde tahliye talep edilebilir; kiracı 2 yıl sonra öncelikli kiracılık hakkına sahiptir.',
    kanun: 'TBK md. 350/2',
  },
  {
    baslik: 'Eski Kiracı Taahhüdü',
    sure: 'Anlaşmaya göre',
    aciklama: 'Kira sözleşmesi sırasında veya sonraki dönemlerde imzalanan tahliye taahhütnamesine dayanarak icra yolu veya dava ile tahliye talep edilebilir.',
    kanun: 'TBK md. 352/1',
  },
];

const IHTARNAME_ADIMLARI = [
  { adim: 1, baslik: 'Notere Başvurun', aciklama: 'İhtarname noter kanalıyla veya iadeli taahhütlü posta ile gönderilmelidir; WhatsApp/SMS geçerli değildir.' },
  { adim: 2, baslik: 'Gerekçeyi Açıkça Yazın', aciklama: 'İhtarnamede tahliye sebebi, yasal dayanak ve verilen süre açıkça belirtilmelidir.' },
  { adim: 3, baslik: 'Tebligat Teyidi', aciklama: 'Karşı tarafın ihtarnameyi teslim aldığına dair tebligat belgesi saklanmalıdır.' },
  { adim: 4, baslik: 'Süre Takibi', aciklama: 'Kanuni bekleme süresi dolduktan sonra tahliye davası veya icra yoluna başvurulabilir.' },
];

const TAHLIYE_SURESI = [
  { yol: 'Anlaşmalı Tahliye', sure: '1–4 hafta', maliyet: 'Düşük', aciklama: 'Tarafların anlaşması, en hızlı ve masrafsız yol.' },
  { yol: 'İcra Tahliyesi (Taahhütname)', sure: '1–2 ay', maliyet: 'Orta', aciklama: 'Tahliye taahhütnamesine dayalı icra takibi.' },
  { yol: 'Tahliye Davası', sure: '6–18 ay', maliyet: 'Yüksek', aciklama: 'Mahkeme kararıyla tahliye; süreç uzun sürebilir.' },
  { yol: 'İcra (Kira Borcu)', sure: '3–6 ay', maliyet: 'Orta', aciklama: 'Ödenmemiş kira alacağı için icra takibi.' },
];

const PRATIK_BILGILER = [
  { baslik: 'Kirayı Kesmeyin', aciklama: 'Anlaşmazlık sırasında kirayı kesmek kiracıyı hukuki açıdan zayıf düşürür; kira ödenmeye devam edilmeli, itiraz ayrıca yapılmalıdır.' },
  { baslik: 'Depozito İadesi', aciklama: 'Tahliye sonrası kiracı, olası zararlar kesilerek depozitosunu geri alır. Anlaşmazlıkta sulh hukuk mahkemesi yetkilidir.' },
  { baslik: 'Ev Teslim Tutanağı', aciklama: 'Tahliyede tarafların imzaladığı ve evin durumunu belgeleyen bir teslim tutanağı düzenlenmelidir.' },
  { baslik: 'Kiracı Hakları Derneği', aciklama: 'Haksız tahliye girişimlerine karşı kiracılar, İl Tüketici Hakem Heyeti ve kiracı derneklerine başvurabilir.' },
];

export default function KiraSozlesmesiIptalRehberiPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <p className="text-[#00C49F] text-xs font-bold mb-3 uppercase tracking-widest">Hukuki Rehber</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">Kira Sözleşmesi İptal Rehberi</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            Kiracı ve kiraya veren tahliye hakları, yasal bildirim süreleri ve tahliye süreçleri hakkında kapsamlı bilgi.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">

        {/* Kiracının Fesih Hakları */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-1">Kiracının Fesih Hakları</h2>
          <p className="text-xs text-gray-400 mb-5">Kiracı hangi durumlarda kira sözleşmesini sona erdirebilir?</p>
          <div className="space-y-4">
            {KIRACININ_FESIH_HAKLARI.map((h, i) => (
              <div key={i} className="border border-gray-100 rounded-xl p-4">
                <div className="flex items-start justify-between mb-2">
                  <p className="text-xs font-black text-gray-900">{h.baslik}</p>
                  <span className="text-[9px] font-black bg-[#00C49F] text-white px-2 py-0.5 rounded-full shrink-0 ml-2">{h.sure}</span>
                </div>
                <p className="text-[11px] text-gray-600 leading-relaxed mb-1">{h.aciklama}</p>
                <p className="text-[10px] text-gray-400">{h.kanun}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Kiraya Verenin Fesih Hakları */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-1">Kiraya Verenin Tahliye Hakları</h2>
          <p className="text-xs text-gray-400 mb-5">Ev sahibi hangi durumlarda kiracıdan tahliye isteyebilir?</p>
          <div className="space-y-4">
            {KIRAYA_VERENIN_FESIH_HAKLARI.map((h, i) => (
              <div key={i} className="border border-gray-100 rounded-xl p-4">
                <div className="flex items-start justify-between mb-2">
                  <p className="text-xs font-black text-gray-900">{h.baslik}</p>
                  <span className="text-[9px] font-black bg-amber-400 text-white px-2 py-0.5 rounded-full shrink-0 ml-2">{h.sure}</span>
                </div>
                <p className="text-[11px] text-gray-600 leading-relaxed mb-1">{h.aciklama}</p>
                <p className="text-[10px] text-gray-400">{h.kanun}</p>
              </div>
            ))}
          </div>
        </div>

        {/* İhtarname Adımları */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-1">İhtarname Gönderme Adımları</h2>
          <p className="text-xs text-gray-400 mb-5">Geçerli bir ihtarname nasıl hazırlanır?</p>
          <div className="space-y-4">
            {IHTARNAME_ADIMLARI.map((a) => (
              <div key={a.adim} className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-[#00C49F] text-white text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">{a.adim}</span>
                <div>
                  <p className="text-xs font-black text-gray-900 mb-0.5">{a.baslik}</p>
                  <p className="text-[11px] text-gray-500 leading-relaxed">{a.aciklama}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tahliye Yolları Tablosu */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm overflow-x-auto">
          <h2 className="text-base font-black text-gray-900 mb-1">Tahliye Yolları Karşılaştırması</h2>
          <p className="text-xs text-gray-400 mb-5">Hangi tahliye yolu ne kadar sürer ve maliyeti nedir?</p>
          <table className="w-full text-[10px] min-w-[380px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 font-black text-gray-500">Yol</th>
                <th className="text-center py-2 font-black text-gray-500">Süre</th>
                <th className="text-center py-2 font-black text-gray-500">Maliyet</th>
                <th className="text-right py-2 font-black text-[#00C49F]">Açıklama</th>
              </tr>
            </thead>
            <tbody>
              {TAHLIYE_SURESI.map((t, i) => (
                <tr key={i} className="border-b border-gray-50 last:border-0">
                  <td className="py-2 font-black text-gray-900">{t.yol}</td>
                  <td className="py-2 text-center font-bold text-gray-600">{t.sure}</td>
                  <td className="py-2 text-center font-bold text-gray-600">{t.maliyet}</td>
                  <td className="py-2 text-right font-bold text-gray-400 max-w-[160px]">{t.aciklama}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pratik Bilgiler */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-1">Pratik Bilgiler</h2>
          <p className="text-xs text-gray-400 mb-5">Tahliye sürecinde dikkat edilmesi gerekenler.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PRATIK_BILGILER.map((b, i) => (
              <div key={i} className="border border-gray-100 rounded-xl p-4">
                <p className="text-xs font-black text-gray-900 mb-1">{b.baslik}</p>
                <p className="text-[11px] text-gray-500 leading-relaxed">{b.aciklama}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
          <p className="text-xs font-black text-amber-700 mb-1">⚠ Önemli Uyarı</p>
          <p className="text-[11px] text-amber-600 leading-relaxed">
            Bu sayfa genel bilgi amaçlıdır. Kira sözleşmesi feshi ve tahliye işlemleri hukuki süreç içerdiğinden, önemli anlaşmazlıklarda bir gayrimenkul avukatından profesyonel destek almanız önerilir.
          </p>
        </div>

      </div>
    </main>
  );
}
