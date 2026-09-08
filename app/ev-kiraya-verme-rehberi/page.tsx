import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ev Kiraya Verme Rehberi 2025 | Mal Sahibi Adım Adım | Söylemesi Bizden',
  description:
    'Ev kiraya verme: kiracı seçimi, kira sözleşmesi, depozito, vergi beyanı ve ev sahibi hakları için kapsamlı rehber.',
};

const HAZIRLIK_ADIMLARI = [
  {
    adim: 'Mülkü Hazırla',
    aciklama: 'Boyayı yenile, arızaları gider, temizlik yaptır. İlk izlenim kiracı kararını belirler ve talep ettiğin kira bedelini meşrulaştırır.',
    maliyet: '5.000–30.000 ₺',
    etki: 'Kira değeri %5–15 artabilir',
  },
  {
    adim: 'Piyasa Kirası Araştır',
    aciklama: 'Aynı bölgede benzer özellikteki kiralık ilanları incele. Aşırı yüksek fiyat boş kalma süresini uzatır; çok düşük fiyat gelir kaybı yaratır.',
    maliyet: 'Ücretsiz',
    etki: 'Doğru fiyatlandırma = hızlı kiracı',
  },
  {
    adim: 'Fotoğraf ve İlan',
    aciklama: 'Gün ışığında çekilen geniş açılı fotoğraflar ilanı öne çıkarır. Detaylı ve dürüst açıklama gereksiz ziyaretleri önler.',
    maliyet: '500–3.000 ₺ (profesyonel)',
    etki: 'İlan görüntülenme 3–5x artar',
  },
  {
    adim: 'Kiracı Adaylarını Değerlendir',
    aciklama: 'Gelir belgesi, referans ve kimlik belgesi iste. Gelirin kiranın en az 3 katı olması güvenli eşiktir.',
    maliyet: 'Ücretsiz',
    etki: 'Riskli kiracıdan korunma',
  },
  {
    adim: 'Sözleşme ve Depozito',
    aciklama: 'Noterden veya yazılı imzalı sözleşme hazırla; yasal sınır olan 3 aylık kira bedelinde depozito al. Depozito banka hesabına yatır.',
    maliyet: '500–2.000 ₺ (noter)',
    etki: 'Hukuki güvence sağlar',
  },
  {
    adim: 'Anahtar Teslimi Tutanağı',
    aciklama: 'Eşya listesi, sayaç değerleri ve mülk durumunu belgeleyen ayrıntılı bir teslim tutanağı düzenle ve imzalat.',
    maliyet: 'Ücretsiz',
    etki: 'Çıkış hasarı anlaşmazlıklarını önler',
  },
];

const SOZLESME_MADDELERI = [
  { madde: 'Tarafların kimlik bilgileri', zorunlu: true },
  { madde: 'Kira bedeli ve ödeme günü', zorunlu: true },
  { madde: 'Sözleşme süresi (başlangıç–bitiş)', zorunlu: true },
  { madde: 'Depozito tutarı ve iade koşulları', zorunlu: true },
  { madde: 'Kira artış oranı/yöntemi', zorunlu: true },
  { madde: 'Aidat ve gider paylaşımı', zorunlu: true },
  { madde: 'Evcil hayvan / sigara yasağı', zorunlu: false },
  { madde: 'Alt kiralama yasağı', zorunlu: false },
  { madde: 'Onarım sorumlulukları', zorunlu: false },
  { madde: 'Tahliye bildirimi süresi', zorunlu: false },
];

const VERGI_YUKUMLULUK = [
  {
    durum: 'Yıllık kira geliri ≤ 33.000 ₺ (2024)',
    beyan: 'Beyan zorunluluğu yok (istisna kapsamında)',
    not: 'İstisna tutarı her yıl güncellenir',
  },
  {
    durum: 'Yıllık kira geliri > 33.000 ₺',
    beyan: 'Mart ayında yıllık gelir vergisi beyannamesi',
    not: 'Götürü veya gerçek gider yöntemiyle hesaplanır',
  },
  {
    durum: 'Götürü gider yöntemi',
    beyan: 'Brüt gelirin %15\'i gider olarak düşülür',
    not: 'Fiili gider belgelenmez; basit ve kolay',
  },
  {
    durum: 'Gerçek gider yöntemi',
    beyan: 'Onarım, aidat, sigorta, faiz giderleri belgeli düşülür',
    not: 'Yüksek giderlerde avantajlı; muhasebe gerektirir',
  },
];

const MAL_SAHIBI_HAKLARI = [
  { hak: 'Zamanında Kira Alma', aciklama: 'Kiracı ödeme yapmazsa 30 gün sonra 2 ihtarla tahliye davası açılabilir.' },
  { hak: 'Mülkü Hasarsız Teslim Alma', aciklama: 'Çıkışta normal yıpranma dışındaki hasarlar depozitoya mahsup edilebilir.' },
  { hak: 'Yasal Artış Uygulama', aciklama: 'Yıllık yenileme döneminde TÜFE / yasal tavan oranında artış yapılabilir.' },
  { hak: 'İhtiyaç Durumunda Tahliye', aciklama: 'Gerçek ihtiyaç (kendisi / birinci derece yakını) ispat edildiğinde dava yoluyla tahliye.' },
  { hak: 'Mülke Erişim', aciklama: 'Önceden bildirim yapılarak (genellikle 24–48 saat) mülk incelenebilir; zorla girilemez.' },
  { hak: 'Depozitoyu Saklama', aciklama: 'Depozito kira süresince elde tutulur; çıkışta hasar mahsubundan sonra iade edilir.' },
];

const SSS = [
  {
    soru: 'Kiracı kirası geç öderse ne yapabilirim?',
    cevap: 'Önce yazılı ihtar gönder. Aynı kira yılında 2 haklı ihtar birikirse bir sonraki yıl yenileme döneminde dava açılabilir. Alternatif olarak kiracının rızasıyla tahliye ve taşınma protokolü hazırlanabilir.',
  },
  {
    soru: 'Kiracı gittikten sonra depozitosunu ne zaman iade etmeliyim?',
    cevap: 'Yasal düzenleme yoktur; genellikle çıkışta hasar tespiti yapılarak kısa sürede (1–4 hafta) iade edilir. Hasar var ise depozitodan mahsup miktarı belgelenerek bildirilir.',
  },
  {
    soru: 'Emlakçı komisyonu ne kadardır?',
    cevap: 'Yasal olarak yalnızca kiraya veren öder; kiracıdan komisyon alınamaz (2023 değişikliği). Standart komisyon 1 aylık kira bedelidir.',
  },
  {
    soru: 'Sigorta yaptırmak zorunlu mu?',
    cevap: 'DASK (zorunlu deprem sigortası) zorunludur; konut sigortası isteğe bağlıdır. Kiracının oluşturabileceği hasara karşı mal sahibi ek konut sigortası yaptırabilir.',
  },
];

export default function EvKirayaVermePage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <p className="text-[#00C49F] text-xs font-bold mb-3 uppercase tracking-widest">Mal Sahibi Rehberi 2025</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">Ev Kiraya Verme Rehberi</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            Hazırlıktan sözleşmeye, vergi beyanından kiracı yönetimine: mal sahibi için adım adım kiralama rehberi.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-4">Hazırlık ve Kiralama Adımları</h2>
          <div className="space-y-3">
            {HAZIRLIK_ADIMLARI.map((a, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-6 h-6 rounded-full bg-[#00C49F] text-white text-[10px] font-black flex items-center justify-center shrink-0">{i + 1}</div>
                  {i < HAZIRLIK_ADIMLARI.length - 1 && <div className="w-px flex-1 bg-gray-100 mt-1" />}
                </div>
                <div className="pb-4">
                  <p className="text-xs font-black text-gray-900 mb-1">{a.adim}</p>
                  <p className="text-[11px] text-gray-500 mb-2">{a.aciklama}</p>
                  <div className="flex gap-4">
                    <span className="text-[9px] text-gray-400">Maliyet: {a.maliyet}</span>
                    <span className="text-[9px] text-[#00C49F] font-bold">{a.etki}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-4">Sözleşme Kontrol Listesi</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {SOZLESME_MADDELERI.map((m, i) => (
              <div key={i} className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50">
                <div className={`w-4 h-4 border-2 rounded shrink-0 flex items-center justify-center ${m.zorunlu ? 'border-[#00C49F] bg-[#00C49F]' : 'border-gray-300'}`}>
                  {m.zorunlu && <span className="text-white text-[8px]">✓</span>}
                </div>
                <p className="text-[11px] text-gray-700">{m.madde}</p>
                {m.zorunlu && <span className="text-[8px] text-[#00C49F] font-bold ml-auto shrink-0">Zorunlu</span>}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-4">Vergi Yükümlülükleri</h2>
          <div className="space-y-3">
            {VERGI_YUKUMLULUK.map((v, i) => (
              <div key={i} className="border border-gray-100 rounded-xl p-4">
                <p className="text-xs font-black text-gray-900 mb-1">{v.durum}</p>
                <p className="text-[11px] text-[#00C49F] font-bold mb-1">{v.beyan}</p>
                <p className="text-[10px] text-gray-400">{v.not}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-4">Mal Sahibi Hakları</h2>
          <div className="space-y-2">
            {MAL_SAHIBI_HAKLARI.map((h, i) => (
              <div key={i} className="flex gap-3 py-2 border-b border-gray-50 last:border-0">
                <p className="text-[10px] font-black text-gray-700 w-36 shrink-0">{h.hak}</p>
                <p className="text-[11px] text-gray-500">{h.aciklama}</p>
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

        <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5">
          <p className="text-xs font-black text-emerald-700 mb-2">Altın Kural</p>
          <p className="text-[11px] text-emerald-600 leading-relaxed">
            Doğru kiracı seçimi, sağlam sözleşme ve belgeli teslim tutanağı; mal sahibinin uzun vadede en büyük güvencesidir. Kiracı arama aşamasında zaman harcamak, sorunlu kiracı yüzünden yıllarca uğraşmaktan çok daha az maliyetlidir.
          </p>
        </div>

      </div>
    </main>
  );
}
