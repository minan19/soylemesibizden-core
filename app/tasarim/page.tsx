import { IlanKarti, IlanKartiIskelet, type IlanKartVerisi } from '@/components/ilan/IlanKarti';
import { FiyatGecmisi, type FiyatKaydi } from '@/components/kanit/FiyatGecmisi';
import { KanitSeridi } from '@/components/kanit/KanitSeridi';

export const metadata = { title: 'Tasarım Sistemi — Söylemesi Bizden' };

/**
 * /tasarim — bilesen onizleme sayfasi · 14.08.2026 (TRT)
 *
 * Buradaki veriler ORNEK VERIDIR ve oyle etiketlenmistir.
 * Sayfa yalnizca tasarim incelemesi icindir; urun akisinin parcasi degil.
 */

function gunOnce(g: number): Date {
  return new Date(Date.now() - g * 86_400_000);
}

const ORNEKLER: IlanKartVerisi[] = [
  {
    id: 'ornek-1',
    baslik: 'Kadıköy / Caferağa — Ada 412 Parsel 17',
    ilceAd: 'Kadıköy',
    mahalleAd: 'Caferağa',
    turu: 'SATILIK',
    fiyatKurus: 1_275_000_000n, // 12.750.000 ₺
    brutM2: 142,
    odaSayisi: '3+1',
    yayinTs: gunOnce(12),
    kapakGorselUrl: null,
    gorselSayisi: 8,
    kanitlar: {
      yetkiTuru: 'MALIK',
      yetkiDurumu: 'GECERLI',
      yetkiKaynagi: 'MOCK',
      sonTeyitTs: gunOnce(3),
      teyitSonTarih: gunOnce(-27),
      fiyatDegisimSayisi: 3,
      gorselKontrolEdilen: 8,
      gorselToplam: 8,
    },
  },
  {
    id: 'ornek-2',
    baslik: 'Beşiktaş / Levent — Ada 88 Parsel 4',
    ilceAd: 'Beşiktaş',
    mahalleAd: 'Levent',
    turu: 'KIRALIK',
    fiyatKurus: 8_500_000n, // 85.000 ₺
    brutM2: 96,
    odaSayisi: '2+1',
    yayinTs: gunOnce(94),
    kapakGorselUrl: null,
    gorselSayisi: 1,
    kanitlar: {
      yetkiTuru: 'YETKILI_ISLETME',
      yetkiDurumu: 'GECERLI',
      yetkiKaynagi: 'MOCK',
      sonTeyitTs: gunOnce(26),
      teyitSonTarih: gunOnce(-4), // 4 gun kaldi -> uyari
      fiyatDegisimSayisi: 1,
      gorselKontrolEdilen: 1,
      gorselToplam: 1,
    },
  },
  {
    id: 'ornek-3',
    baslik: 'Çorlu / Kazimiye — Ada 233 Parsel 9',
    ilceAd: 'Çorlu',
    mahalleAd: 'Kazimiye',
    turu: 'SATILIK',
    fiyatKurus: 402_000_000n,
    brutM2: 134,
    odaSayisi: '3+1',
    yayinTs: gunOnce(210),
    kapakGorselUrl: null,
    gorselSayisi: 0,
    kanitlar: {
      yetkiTuru: null,
      yetkiDurumu: 'SURESI_DOLDU',
      yetkiKaynagi: 'MOCK',
      sonTeyitTs: gunOnce(88),
      teyitSonTarih: gunOnce(31), // gecmis -> risk
      fiyatDegisimSayisi: 0,
    },
  },
];

const FIYAT_GECMISI: FiyatKaydi[] = [
  { eskiFiyatKurus: null, yeniFiyatKurus: 1_450_000_000n, degisimTs: gunOnce(96) },
  { eskiFiyatKurus: 1_450_000_000n, yeniFiyatKurus: 1_390_000_000n, degisimTs: gunOnce(61) },
  { eskiFiyatKurus: 1_390_000_000n, yeniFiyatKurus: 1_320_000_000n, degisimTs: gunOnce(28) },
  { eskiFiyatKurus: 1_320_000_000n, yeniFiyatKurus: 1_275_000_000n, degisimTs: gunOnce(6) },
];

function Bolum({
  no, baslik, aciklama, children,
}: {
  no: string; baslik: string; aciklama: string; children: React.ReactNode;
}) {
  return (
    <section className="mb-10">
      <div className="mb-3">
        <p className="text-rozet font-bold uppercase tracking-wider text-metinSonuk">
          {no}
        </p>
        <h2 className="text-lg font-bold text-metin sm:text-xl">{baslik}</h2>
        <p className="mt-1 max-w-2xl text-sm text-metinIkincil">{aciklama}</p>
      </div>
      {children}
    </section>
  );
}

export default function TasarimPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <header className="mb-10">
        <h1 className="text-2xl font-extrabold tracking-tight text-metin sm:text-3xl">
          Tasarım Sistemi
        </h1>
        <p className="mt-2 text-sm text-metinIkincil">
          Söylemesi Bizden · v2 taşınmaz modeline göre kurulmuş bileşenler.
          Aşağıdaki tüm veriler örnektir.
        </p>
        <p className="mt-3 rounded-kart border border-violet-200 bg-violet-50 p-3 text-mikro text-test">
          Bu sayfa yalnızca tasarım incelemesi içindir. Gerçek ilan verisi
          içermez, ürün akışının parçası değildir.
        </p>
      </header>

      <Bolum
        no="01"
        baslik="Kanıt şeridi"
        aciklama="Sayısal güven skoru yerine gerçek sinyaller. Her rozetin veritabanında bir karşılığı var; hiçbiri hesaplanmış bir puan değil. Kullanıcı kararını kendi verir."
      >
        <div className="kart space-y-4 p-4">
          <div>
            <p className="mb-2 text-mikro font-semibold text-metinSonuk">
              Malik doğrulanmış, teyidi taze
            </p>
            <KanitSeridi k={ORNEKLER[0].kanitlar} yogun />
          </div>
          <div className="border-t border-cizgi pt-4">
            <p className="mb-2 text-mikro font-semibold text-metinSonuk">
              Teyit süresi yaklaşıyor
            </p>
            <KanitSeridi k={ORNEKLER[1].kanitlar} yogun />
          </div>
          <div className="border-t border-cizgi pt-4">
            <p className="mb-2 text-mikro font-semibold text-metinSonuk">
              Yetki ve teyit süresi dolmuş — hayalet ilan adayı
            </p>
            <KanitSeridi k={ORNEKLER[2].kanitlar} yogun />
          </div>
        </div>
      </Bolum>

      <Bolum
        no="02"
        baslik="İlan kartı"
        aciklama="Telefonda dikey, tablet ve üstünde yatay. Fiyat en üstte ve en büyük; yanında m² başına fiyat. Emlakçı logosu ve fotoğraf sayısı yerine kullanıcının karar için ihtiyaç duyduğu bilgi öncelikli."
      >
        <div className="space-y-3">
          {ORNEKLER.map((i) => (
            <IlanKarti key={i.id} ilan={i} />
          ))}
        </div>
      </Bolum>

      <Bolum
        no="03"
        baslik="Fiyat geçmişi"
        aciklama="Ürünün tek cümlelik farkı. Türkiye'de hiçbir büyük portal bunu göstermiyor — gösteremez de: geliri ilan adedine bağlı bir platform için 'bu ilan 3 kez indirildi, 96 gündür satılamıyor' bilgisini yayınlamak kendi ürününü kötülemektir."
      >
        <div className="kart p-4">
          <FiyatGecmisi kayitlar={FIYAT_GECMISI} />
        </div>
      </Bolum>

      <Bolum
        no="04"
        baslik="Yükleme iskeleti"
        aciklama="Kartla birebir aynı ölçülerde; içerik gelince sayfa zıplamıyor."
      >
        <div className="space-y-3">
          <IlanKartiIskelet />
        </div>
      </Bolum>
    </main>
  );
}
