import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tapu Sicil Kayıt Rehberi 2025 | Tescil, Şerh, Beyan | Söylemesi Bizden',
  description:
    'Tapu sicili nasıl çalışır: tescil, şerh, beyan ve terkin işlemleri; tapu kaydı nasıl sorgulanır; dijital tapu hizmetleri rehberi.',
};

const KAYIT_TURLERI = [
  {
    tur: 'Tescil',
    tanim: 'Mülkiyet hakkı ve ayni hakların tapu siciline işlenmesi. Tescil kurucu etkiye sahiptir: tescilsiz hak üçüncü kişilere karşı ileri sürülemez.',
    ornekler: 'Satış, bağış, miras, ipotek, irtifak',
    etki: 'Kurucu',
  },
  {
    tur: 'Şerh',
    tanim: 'Kişisel hakkın tapu siciline işlenerek üçüncü kişilere karşı korunması. Şerh, hakkın varlığını değil kişilere karşı ileri sürülebilirliğini sağlar.',
    ornekler: 'Kira şerhi, ön alım şerhi, satış vaadi şerhi, haciz şerhi',
    etki: 'Açıklayıcı',
  },
  {
    tur: 'Beyan',
    tanim: 'Taşınmazla ilgili bilgilerin sicilde yer alması; hukuki sonuç doğurmaz, bilgilendirme amaçlıdır.',
    ornekler: 'İmar durumu beyanı, aile konutu beyanı, kiracı beyanı',
    etki: 'Bilgilendirici',
  },
  {
    tur: 'Terkin',
    tanim: 'Tapu sicilindeki kaydın silinmesi; hakkın sona ermesi üzerine yapılır.',
    ornekler: 'İpotek terkin, şerh kaldırma, irtifak hakkı terkin',
    etki: 'Sona erdirici',
  },
];

const SORGU_YOLLARI = [
  { yol: 'e-Devlet Üzerinden', adres: 'turkiye.gov.tr', aciklama: 'Tapuya konu taşınmazın kaydını T.C. kimlik numarasıyla sorgulanabilir. Anlık sicil özeti.' },
  { yol: 'TKGM ParselSorgu', adres: 'parselsorgu.tkgm.gov.tr', aciklama: 'Parsel ve ada numarasıyla taşınmaz bilgileri, koordinatlar ve tapu kayıt özeti.' },
  { yol: 'Tapu Müdürlüğü Fiziki', adres: 'İlgili bölge tapu müdürlüğü', aciklama: 'Resmi tapu sureti için tapu müdürlüğüne şahsen başvuru; kimlik + harç ücreti gerekir.' },
  { yol: 'Web Tapu', adres: 'webtapu.tkgm.gov.tr', aciklama: 'Online randevu ve bazı tapu işlemleri uzaktan yürütülebilir (Web Tapu sistemi).' },
];

const SIK_YAPILAN_HATALAR = [
  { hata: 'Sözlü Satış / Devir', aciklama: 'Gayrimenkul satışının sözlü ya da adi yazılı olması geçersizdir; resmi senet zorunludur. Verilen el sıkışması hukuki bağlayıcılık doğurmaz.' },
  { hata: 'Vaat Sözleşmesi = Tescil Sanmak', aciklama: 'Satış vaadi sözleşmesi noter onaylı olsa da tescile eşdeğer değildir. Gerçek hak tescille oluşur.' },
  { hata: 'Şerhleri Gözden Kaçırmak', aciklama: 'Alım öncesi tapu kaydında haciz, ipotek, ön alım ve kira şerhlerini mutlaka kontrol edin; satın aldıktan sonra şerhten kurtulamazsınız.' },
  { hata: 'Veraset İlamı Olmadan Devir', aciklama: 'Vefat eden malikin taşınmazının devri için önce veraset ilamı alınması ve intikalin tescil edilmesi gerekir.' },
  { hata: 'Eksik Belge ile İşlem Denemek', aciklama: 'Tapu işleminde eksik belge olduğunda işlem iptal edilir; yeniden randevu zorunlu olur ve zaman kaybı yaşanır.' },
  { hata: 'Tapu Harcı Eksik Beyanı', aciklama: 'Tapu harcı gerçek satış bedeli üzerinden beyan edilmelidir. Düşük beyan mali ceza ve idari işlem riski taşır.' },
];

const BELGELER = [
  { islem: 'Satış / Devir', belgeler: 'Kimlik, DASK poliçesi, bina ise iskan belgesi, banka dekontu (harç), ekspertiz raporu (kredili ise)' },
  { islem: 'İpotek', belgeler: 'Kimlik, kredi sözleşmesi, DASK poliçesi, tapu senedi fotokopisi' },
  { islem: 'Veraset', belgeler: 'Veraset ilamı, mirasçı kimliği, ölüm belgesi, veraset vergisi borcu yoktur belgesi' },
  { islem: 'Şerh Talebi', belgeler: 'Kimlik, şerhe dayanak sözleşme (noter onaylı), tapu sureti' },
  { islem: 'Terkin', belgeler: 'Alacaklı feragatnamesi (noter), kimlik, tapu sureti' },
];

export default function TapuSicilKayitPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <p className="text-[#00C49F] text-xs font-bold mb-3 uppercase tracking-widest">Tapu Rehberi 2025</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">Tapu Sicil Kayıt Rehberi</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            Tescil, şerh, beyan ve terkin işlemleri; tapu kaydı nasıl sorgulanır, hangi belgeler gerekir.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-4">Tapu Sicili Kayıt Türleri</h2>
          <div className="space-y-3">
            {KAYIT_TURLERI.map((k, i) => (
              <div key={i} className="border border-gray-100 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <p className="text-xs font-black text-gray-900">{k.tur}</p>
                  <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-[#00C49F] text-white">{k.etki}</span>
                </div>
                <p className="text-[11px] text-gray-600 mb-1">{k.tanim}</p>
                <p className="text-[10px] text-gray-400 font-bold">Örnekler: {k.ornekler}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-4">Tapu Sicili Sorgulama Yolları</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {SORGU_YOLLARI.map((s, i) => (
              <div key={i} className="border border-gray-100 rounded-xl p-4">
                <p className="text-xs font-black text-gray-900 mb-1">{s.yol}</p>
                <p className="text-[9px] text-[#00C49F] font-bold mb-1">{s.adres}</p>
                <p className="text-[11px] text-gray-500 leading-relaxed">{s.aciklama}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm overflow-x-auto">
          <h2 className="text-base font-black text-gray-900 mb-4">Gerekli Belgeler</h2>
          <table className="w-full text-[10px] min-w-[420px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 font-black text-gray-500">İşlem</th>
                <th className="text-right py-2 font-black text-gray-500">Gerekli Belgeler</th>
              </tr>
            </thead>
            <tbody>
              {BELGELER.map((b, i) => (
                <tr key={i} className="border-b border-gray-50 last:border-0">
                  <td className="py-2 font-black text-gray-900 pr-4">{b.islem}</td>
                  <td className="py-2 text-right font-bold text-gray-500">{b.belgeler}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-4">Sık Yapılan Hatalar</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {SIK_YAPILAN_HATALAR.map((h, i) => (
              <div key={i} className="border border-rose-100 rounded-xl p-4 bg-rose-50/20">
                <p className="text-xs font-black text-rose-700 mb-1">{h.hata}</p>
                <p className="text-[11px] text-gray-600 leading-relaxed">{h.aciklama}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
          <p className="text-xs font-black text-amber-700 mb-2">Önemli Not</p>
          <p className="text-[11px] text-amber-600 leading-relaxed">
            Tapu sicili alenidir; herkes tapu kaydını sorgulayabilir. Tescil kurucu etki doğurduğundan, noter sözleşmesi yeterli değildir — tapuya tescil olmadan mülkiyet hakkı geçmez. İşlem öncesi TKGM ParselSorgu ile taşınmazın güncel kaydını ve şerhlerini kontrol edin. Yasal dayanak: Türk Medeni Kanunu md. 997–1010, Tapu Sicili Tüzüğü.
          </p>
        </div>

      </div>
    </main>
  );
}
