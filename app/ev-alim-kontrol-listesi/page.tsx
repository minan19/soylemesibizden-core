import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ev Alım Kontrol Listesi | Satın Almadan Önce | Söylemesi Bizden',
  description:
    'Ev satın almadan önce yapılması gereken kontroller: tapu, ekspertiz, teknik durum, hukuki durum, aidat ve çevre değerlendirme rehberi.',
};

const TAPU_KONTROLLERI = [
  { kontrol: 'Tapu senedi orijinalliği', aciklama: 'TAKBİS veya e-Devlet üzerinden tapu sorgulama', kritik: true },
  { kontrol: 'İpotek/Haciz varlığı', aciklama: 'Tapuda ipotek, haciz, şerh kontrolü', kritik: true },
  { kontrol: 'Malik bilgisi uyumu', aciklama: 'Satıcının gerçekten tapu sahibi olduğunu doğrulayın', kritik: true },
  { kontrol: 'Kat irtifakı / Kat mülkiyeti', aciklama: 'Bina iskan durumu ve kat mülkiyeti belgesi', kritik: true },
  { kontrol: 'Arsa payı', aciklama: 'Arsa payı oranının sözlü beyana uygunluğu', kritik: false },
  { kontrol: 'Hisseli tapu riski', aciklama: 'Birden fazla malik varsa tüm hisse sahiplerinin onayı', kritik: true },
];

const FIZIKSEL_KONTROLLER = [
  { kontrol: 'Su tesisatı', aciklama: 'Sızdırmazlık, tesisat yaşı, su basıncı', kritik: true },
  { kontrol: 'Elektrik tesisatı', aciklama: 'Sigorta kapasitesi, topraklama, eski kablolar', kritik: true },
  { kontrol: 'Nem ve rutubet', aciklama: 'Duvar, tavan, köşelerde nem lekesi kontrolü', kritik: true },
  { kontrol: 'Çatı ve izolasyon', aciklama: 'Üst katlarda çatı sızıntısı, ısı yalıtımı', kritik: false },
  { kontrol: 'Kapı ve pencere', aciklama: 'Yalıtım kalitesi, açılış/kapanış mekanizması', kritik: false },
  { kontrol: 'Zemin ve taban', aciklama: 'Döşeme bütünlüğü, rutubet, çatlak', kritik: false },
  { kontrol: 'Isıtma sistemi', aciklama: 'Kombinin yaşı, servisi, kapasitesi', kritik: false },
  { kontrol: 'Asansör durumu', aciklama: 'Güncel bakım sertifikası, kapasite', kritik: false },
];

const HUKUKI_KONTROLLER = [
  { kontrol: 'İskan belgesi', aciklama: 'Bina için yapı kullanma izin belgesi var mı?', kritik: true },
  { kontrol: 'İmar uygunluğu', aciklama: 'Binanın imar planına uygunluğu, kaçak kat var mı?', kritik: true },
  { kontrol: 'Belediye borcu', aciklama: 'Önceki mal sahibinin emlak vergisi ve aidat borçları', kritik: true },
  { kontrol: 'Siteye özel kurallar', aciklama: 'Yönetim planı, evcil hayvan, tadilat kısıtlamaları', kritik: false },
  { kontrol: 'Kiracı durumu', aciklama: 'Evde kiracı var mı? Kira sözleşmesi ne zaman bitiyor?', kritik: true },
];

const CEVRE_KONTROLLERI = [
  { kontrol: 'Ulaşım bağlantıları', aciklama: 'Toplu taşıma, metro, otobüs mesafesi' },
  { kontrol: 'Okul ve hastane', aciklama: 'Yakın çevredeki eğitim ve sağlık kurumları' },
  { kontrol: 'Gürültü kaynakları', aciklama: 'Cadde, inşaat, bar veya sanayi yakınlığı' },
  { kontrol: 'Deprem riski', aciklama: 'AFAD deprem bölgesi ve zemin etüdü' },
  { kontrol: 'Gelecek değer potansiyeli', aciklama: 'Bölgedeki imar planları ve yatırım projeleri' },
  { kontrol: 'Site/Bina yönetimi', aciklama: 'Yöneticinin güvenilirliği, ortak alanların bakımı' },
];

const FINANSAL_KONTROLLER = [
  { kontrol: 'Gerçek piyasa değeri', aciklama: 'Benzer ilanlarla fiyat karşılaştırması yapın', kritik: true },
  { kontrol: 'Ekspertiz raporu', aciklama: 'SPK lisanslı değerleme şirketinden bağımsız rapor', kritik: true },
  { kontrol: 'Aidat miktarı', aciklama: 'Aylık aidat ve yönetim giderleri', kritik: false },
  { kontrol: 'Kapıcı/Güvenlik gideri', aciklama: 'Varsa personel maliyeti aylık tutarı', kritik: false },
  { kontrol: 'Tapu harcı ve masraflar', aciklama: 'Toplam alım maliyetini hesaplayın (tapu %4 + diğer)', kritik: true },
  { kontrol: 'Vergi durumu', aciklama: 'Değer artış kazancı vergisi ve 5 yıl kuralı', kritik: false },
];

export default function EvAlimKontrolListesiPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <p className="text-[#00C49F] text-xs font-bold mb-3 uppercase tracking-widest">Satın Alma Rehberi</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">Ev Alım Kontrol Listesi</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            Ev satın almadan önce mutlaka yapılması gereken tapu, fiziksel, hukuki, çevre ve finansal kontrollerin tam listesi.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">

        {/* Tapu Kontrolleri */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-1">1. Tapu Kontrolleri</h2>
          <p className="text-xs text-gray-400 mb-4">En kritik adım — tapu temiz değilse satın almayın.</p>
          <div className="space-y-2">
            {TAPU_KONTROLLERI.map((k, i) => (
              <div key={i} className="flex items-start gap-3 border border-gray-100 rounded-xl p-3">
                <div className={`w-4 h-4 rounded border-2 shrink-0 mt-0.5 ${k.kritik ? 'border-rose-400' : 'border-gray-300'}`} />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-[11px] font-black text-gray-900">{k.kontrol}</p>
                    {k.kritik && <span className="text-[9px] font-black text-rose-500 bg-rose-50 px-1 py-0.5 rounded">Kritik</span>}
                  </div>
                  <p className="text-[10px] text-gray-500 mt-0.5">{k.aciklama}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fiziksel Kontroller */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-1">2. Fiziksel Durum</h2>
          <p className="text-xs text-gray-400 mb-4">Evi mutlaka gündüz ışığında ve yağmurlu havada da ziyaret edin.</p>
          <div className="space-y-2">
            {FIZIKSEL_KONTROLLER.map((k, i) => (
              <div key={i} className="flex items-start gap-3 border border-gray-100 rounded-xl p-3">
                <div className={`w-4 h-4 rounded border-2 shrink-0 mt-0.5 ${k.kritik ? 'border-amber-400' : 'border-gray-300'}`} />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-[11px] font-black text-gray-900">{k.kontrol}</p>
                    {k.kritik && <span className="text-[9px] font-black text-amber-500 bg-amber-50 px-1 py-0.5 rounded">Önemli</span>}
                  </div>
                  <p className="text-[10px] text-gray-500 mt-0.5">{k.aciklama}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hukuki Kontroller */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-1">3. Hukuki Durum</h2>
          <p className="text-xs text-gray-400 mb-4">İskan ve imar uygunsuzluğu sonradan düzeltilemeyebilir.</p>
          <div className="space-y-2">
            {HUKUKI_KONTROLLER.map((k, i) => (
              <div key={i} className="flex items-start gap-3 border border-gray-100 rounded-xl p-3">
                <div className={`w-4 h-4 rounded border-2 shrink-0 mt-0.5 ${k.kritik ? 'border-rose-400' : 'border-gray-300'}`} />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-[11px] font-black text-gray-900">{k.kontrol}</p>
                    {k.kritik && <span className="text-[9px] font-black text-rose-500 bg-rose-50 px-1 py-0.5 rounded">Kritik</span>}
                  </div>
                  <p className="text-[10px] text-gray-500 mt-0.5">{k.aciklama}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Çevre Kontrolleri */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-1">4. Çevre Değerlendirmesi</h2>
          <p className="text-xs text-gray-400 mb-4">Lokasyon kadar yaşam kalitesi de değerin ayrılmaz parçasıdır.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {CEVRE_KONTROLLERI.map((k, i) => (
              <div key={i} className="border border-gray-100 rounded-xl p-3">
                <p className="text-[11px] font-black text-gray-900 mb-1">{k.kontrol}</p>
                <p className="text-[10px] text-gray-500">{k.aciklama}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Finansal Kontroller */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-1">5. Finansal Kontroller</h2>
          <p className="text-xs text-gray-400 mb-4">Gerçek toplam maliyeti hesaplamadan karar vermeyin.</p>
          <div className="space-y-2">
            {FINANSAL_KONTROLLER.map((k, i) => (
              <div key={i} className="flex items-start gap-3 border border-gray-100 rounded-xl p-3">
                <div className={`w-4 h-4 rounded border-2 shrink-0 mt-0.5 ${k.kritik ? 'border-[#00C49F]' : 'border-gray-300'}`} />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-[11px] font-black text-gray-900">{k.kontrol}</p>
                    {k.kritik && <span className="text-[9px] font-black text-[#00C49F] bg-[#00C49F]/10 px-1 py-0.5 rounded">Öncelikli</span>}
                  </div>
                  <p className="text-[10px] text-gray-500 mt-0.5">{k.aciklama}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-rose-50 border border-rose-100 rounded-2xl p-5">
          <p className="text-xs font-black text-rose-700 mb-2">Altın Kural</p>
          <p className="text-[11px] text-rose-600 leading-relaxed">
            Hiçbir aşamada acele etmeyin. Satıcı baskısı veya &quot;başka alıcı var&quot; argümanı müzakere taktiğidir. Tüm kontroller tamamlanmadan kaparo veya sözleşme imzalamayın. Bir avukat veya deneyimli emlak danışmanı tutmak uzun vadede size tasarruf ettirir.
          </p>
        </div>

      </div>
    </main>
  );
}
