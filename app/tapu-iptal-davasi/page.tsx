import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tapu İptal ve Tescil Davası Rehberi | TMK Haklar | Söylemesi Bizden',
  description:
    'Tapu iptal ve tescil davası: ne zaman açılır, hangi mahkeme yetkilidir, ispatın koşulları, zamanaşımı ve uygulamalar (TMK md. 705, 716, 1023).',
};

const IPTAL_NEDENLERI = [
  {
    neden: 'Muvazaalı Satış',
    aciklama: 'Gerçekte satış olmadığı halde satış gösterilen devir işlemleri (bağış veya güvence amaçlı devirler) tapu iptali ve tescile konu olabilir.',
    kanun: 'BK md. 19; TBK md. 27',
  },
  {
    neden: 'Hata, Hile veya Tehdit',
    aciklama: 'Hata, hile (aldatma) veya korkutma (ikrah) nedeniyle yapılan tapu devri, gerçek hak sahibi tarafından iptal ettirilebilir.',
    kanun: 'TBK md. 30–38',
  },
  {
    neden: 'Vekalet Yetkisinin Kötüye Kullanımı',
    aciklama: 'Satış yetkisi verilmiş vekil, irade dışı işlem yaparak taşınmazı devre etmişse asil tapu iptali talep edebilir.',
    kanun: 'TBK md. 547',
  },
  {
    neden: 'Mirasçıların Saklı Pay İhlali',
    aciklama: 'Mirasbırakanın ölümünden önce yapılan ve saklı pay mirasçılarını zarara uğratan devir işlemleri tenkis davası veya tapu iptali yoluyla iptale konu olabilir.',
    kanun: 'TMK md. 560–571',
  },
  {
    neden: 'Sahte Belge veya İmza',
    aciklama: 'Tapu müdürlüğüne sunulan belgelerin sahte olduğu ya da imzanın ait olmadığı ispat edilirse tapu iptali ve tescil talep edilir.',
    kanun: 'TCK md. 204; TMK md. 716',
  },
  {
    neden: 'Ehliyetsizlik',
    aciklama: 'Fiil ehliyeti bulunmayan kişinin (küçük, kısıtlı) vasi onayı olmaksızın yaptığı tapu devri geçersizdir.',
    kanun: 'TMK md. 10, 429',
  },
];

const YARGILAMA_SURECI = [
  { adim: 1, baslik: 'Yetkili Mahkeme', aciklama: 'Tapu iptali ve tescil davaları, taşınmazın bulunduğu yer Asliye Hukuk Mahkemesi\'nde açılır.' },
  { adim: 2, baslik: 'Dava Dilekçesi', aciklama: 'Tapu kaydı, taşınmazın tapu kütüğü bilgileri ve iptal gerekçesi dilekçeye eklenir.' },
  { adim: 3, baslik: 'İhtiyati Tedbir', aciklama: 'Dava süresince taşınmazın üçüncü kişilere devredilmemesi için ihtiyati tedbir kararı talep edilebilir.' },
  { adim: 4, baslik: 'Tapu Müdürlüğüne Bildirim', aciklama: 'Dava açıldığında mahkeme re\'sen veya talep üzerine tapu kütüğüne şerh düşer.' },
  { adim: 5, baslik: 'Keşif ve Bilirkişi', aciklama: 'Taşınmaz üzerinde keşif yapılır; muvazaa veya usulsüz devir iddiasında bilirkişi incelemesi istenir.' },
  { adim: 6, baslik: 'Karar ve İnfaz', aciklama: 'Kabul kararı kesinleşince mahkeme kararı tapu müdürlüğüne gönderilir ve tapu iptal edilerek yeniden tescil yapılır.' },
];

const ZAMANAŞIMI = [
  { durum: 'Muvazaa (Kesin Hükümsüzlük)', sure: 'Süresiz — zamanaşımı işlemez', aciklama: 'Kesin hükümsüz işlemlerde her zaman iptal talep edilebilir.' },
  { durum: 'Nispi Geçersizlik (Hata/Hile)', sure: '1 yıl öğrenmeden / 5 yıl mutlak', aciklama: 'Hatayı veya hileyi öğrenmeden itibaren 1 yıl; her hâlükârda 5 yıl.' },
  { durum: 'Sahte Belge (Cezayı Gerektiren)', sure: 'Ceza zamanaşımı uygulanır', aciklama: 'Fiil ayrıca suç teşkil ediyorsa ceza hukukunun daha uzun süreleri geçerlidir.' },
  { durum: 'Miras — Tenkis Davası', sure: '2 yıl mirasçıların bilmesinden / 10 yıl ölümden', aciklama: 'Saklı pay ihlalini öğrenmeden 2 yıl; mirasbırakanın ölümünden 10 yıl.' },
];

const PRATIK_BILGILER = [
  { baslik: 'İyi Niyetli 3. Kişi Koruması', aciklama: 'Tapuya güvenerek taşınmazı edinen iyi niyetli üçüncü kişi, tapu sicilinin doğruluğundan yararlanır ve iptal talebi bu kişiye karşı ileri sürülemeyebilir (TMK md. 1023).' },
  { baslik: 'Tapu Sicilinin Açıklığı İlkesi', aciklama: 'Herkes tapu sicilini inceleme hakkına sahiptir; sicilde kayıtlı bilgiden haberdar olmadığını ileri süremez.' },
  { baslik: 'Tescilsiz Kazanım', aciklama: 'Miras, mahkeme kararı veya cebri icra gibi tescil gerekmeksizin iktisap edilen taşınmazlar da tapu tescil davası konusu olabilir (TMK md. 705).' },
  { baslik: 'Bedelsiz veya Düşük Bedelli Devir', aciklama: 'Piyasa değerinin çok altında yapılan devir, tek başına iptal nedeni sayılmaz; buna ek olarak muvazaa veya irade bozukluğunun ispatı gerekir.' },
];

export default function TapuIptalDavasiPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <p className="text-[#00C49F] text-xs font-bold mb-3 uppercase tracking-widest">Hukuki Rehber</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">Tapu İptal ve Tescil Davası</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            Tapu iptali ve tescil davası ne zaman açılır, hangi mahkeme yetkilidir, ispatın koşulları ve zamanaşımı süreleri.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">

        {/* İptal Nedenleri */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-1">Tapu İptali Nedenleri</h2>
          <p className="text-xs text-gray-400 mb-5">Hangi durumlarda tapu iptal davası açılabilir?</p>
          <div className="space-y-4">
            {IPTAL_NEDENLERI.map((n, i) => (
              <div key={i} className="border border-gray-100 rounded-xl p-4">
                <div className="flex items-start justify-between mb-2">
                  <p className="text-xs font-black text-gray-900">{n.neden}</p>
                  <span className="text-[9px] text-gray-400 shrink-0 ml-2">{n.kanun}</span>
                </div>
                <p className="text-[11px] text-gray-600 leading-relaxed">{n.aciklama}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Yargılama Süreci */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-1">Dava Süreci</h2>
          <p className="text-xs text-gray-400 mb-5">Tapu iptal ve tescil davasının aşamaları.</p>
          <div className="space-y-4">
            {YARGILAMA_SURECI.map((a) => (
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

        {/* Zamanaşımı Tablosu */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm overflow-x-auto">
          <h2 className="text-base font-black text-gray-900 mb-1">Zamanaşımı Süreleri</h2>
          <p className="text-xs text-gray-400 mb-5">İptal nedenine göre dava açma hakkının geçerli olduğu süreler.</p>
          <table className="w-full text-[10px] min-w-[400px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 font-black text-gray-500">Durum</th>
                <th className="text-center py-2 font-black text-gray-500">Süre</th>
                <th className="text-right py-2 font-black text-[#00C49F]">Açıklama</th>
              </tr>
            </thead>
            <tbody>
              {ZAMANAŞIMI.map((z, i) => (
                <tr key={i} className="border-b border-gray-50 last:border-0">
                  <td className="py-2 font-black text-gray-900">{z.durum}</td>
                  <td className="py-2 text-center font-bold text-amber-500">{z.sure}</td>
                  <td className="py-2 text-right font-bold text-gray-400">{z.aciklama}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pratik Bilgiler */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-1">Pratik Bilgiler</h2>
          <p className="text-xs text-gray-400 mb-5">Tapu iptal davalarında dikkat edilmesi gereken özel durumlar.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PRATIK_BILGILER.map((b, i) => (
              <div key={i} className="border border-gray-100 rounded-xl p-4">
                <p className="text-xs font-black text-gray-900 mb-1">{b.baslik}</p>
                <p className="text-[11px] text-gray-500 leading-relaxed">{b.aciklama}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-rose-50 border border-rose-100 rounded-2xl p-5">
          <p className="text-xs font-black text-rose-700 mb-2">Hukuki Uyarı</p>
          <p className="text-[11px] text-rose-600 leading-relaxed">
            Tapu iptal ve tescil davaları hukuki açıdan karmaşık süreçlerdir. Delil toplama, zamanaşımının korunması ve ihtiyati tedbir talepleri için bir gayrimenkul hukuku avukatından profesyonel destek almanız kritik öneme sahiptir.
          </p>
        </div>

      </div>
    </main>
  );
}
