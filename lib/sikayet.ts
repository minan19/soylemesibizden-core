/**
 * SIKAYET VE SLA · 14.08.2026 (TRT)
 *
 * Rakiplerde sikayet bir kara kutudur. Sahibinden'in son bir yildaki
 * 4.753 sikayetinin yalnizca ~780'i cozulmus gorunuyor (~%16).
 * Kullanici sikayet eder, cevap gelmez, ilan yayinda kalir.
 *
 * Bizim farkimiz iki maddede:
 *
 *   1. SLA ACIKTIR. Bir ofisin sikayetleri kac saatte kapattigi
 *      profilinde herkese gorunur. Olculen sey duzelir.
 *
 *   2. BAZI SIKAYETLER OTOMATIK ETKI YAPAR. "Satildi ama hala
 *      yayinda" sikayeti esigi asinca ilan TEYIT_BEKLIYOR'a alinir;
 *      sahibi teyit etmezse canlilik gorevi onu duserir. Yani
 *      moderator karar vermeyi beklemeden sistem kendini temizler.
 *
 * Bu dosya saf mantik icerir — veritabani ve HTTP bilmez.
 */

export type SikayetTuru =
  | 'SATILDI_HALA_YAYINDA'
  | 'YANLIS_FIYAT'
  | 'YANLIS_KONUM'
  | 'YEM_ILAN'
  | 'SAHTE_GORSEL'
  | 'YETKISIZ_ILAN'
  | 'DIGER';

export const SIKAYET_METIN: Record<SikayetTuru, string> = {
  SATILDI_HALA_YAYINDA: 'Satıldı/kiralandı ama hâlâ yayında',
  YANLIS_FIYAT: 'İlandaki fiyat gerçek değil',
  YANLIS_KONUM: 'Konum gerçeği yansıtmıyor',
  YEM_ILAN: 'Yem ilan — gidince başka yer gösterildi',
  SAHTE_GORSEL: 'Görseller bu taşınmaza ait değil',
  YETKISIZ_ILAN: 'İlanı veren yetkili değil',
  DIGER: 'Diğer',
};

/**
 * Kac farkli kullanicidan gelen sikayet ilani teyide zorlar.
 *
 * 2 secildi, 1 degil: tek kisi kotu niyetle rakip ilani dusuremesin.
 * 5 degil: gercek bir sorunun cozumu bes kisiyi beklememeli.
 * Otomatik etki ILANI SILMEZ, yalnizca sahibinden teyit ISTER —
 * yanlis alarmin bedeli bir tiktir.
 */
export const OTOMATIK_TEYIT_ESIGI = 2;

/** Hangi turler otomatik teyide zorlar. */
export const TEYIDE_ZORLAYAN_TURLER: SikayetTuru[] = [
  'SATILDI_HALA_YAYINDA',
  'YEM_ILAN',
];

export function teyideZorlarMi(turu: SikayetTuru, farkliBildirenSayisi: number) {
  return (
    TEYIDE_ZORLAYAN_TURLER.includes(turu) &&
    farkliBildirenSayisi >= OTOMATIK_TEYIT_ESIGI
  );
}

/** SLA olcumu — acilistan kapanisa gecen saat. */
export interface SlaOzeti {
  toplam: number;
  acik: number;
  kapali: number;
  /** Kapananlarin ortalama cozum suresi (saat). Kapanan yoksa null. */
  ortalamaSaat: number | null;
  /** Kapananlarin ortanca suresi — birkac uc deger ortalamayi bozmasin. */
  ortancaSaat: number | null;
  /** 48 saat icinde kapanan oran (0-1). */
  kirkSekizSaatOrani: number | null;
}

export function slaHesapla(
  kayitlar: { acilisTs: Date; kapanisTs: Date | null }[]
): SlaOzeti {
  const toplam = kayitlar.length;
  const kapananlar = kayitlar.filter((k) => k.kapanisTs !== null);
  const acik = toplam - kapananlar.length;

  if (kapananlar.length === 0) {
    return {
      toplam,
      acik,
      kapali: 0,
      ortalamaSaat: null,
      ortancaSaat: null,
      kirkSekizSaatOrani: null,
    };
  }

  const saatler = kapananlar
    .map((k) => (k.kapanisTs!.getTime() - k.acilisTs.getTime()) / 3_600_000)
    .sort((a, b) => a - b);

  const ortalama = saatler.reduce((t, s) => t + s, 0) / saatler.length;
  const orta = Math.floor(saatler.length / 2);
  const ortanca =
    saatler.length % 2 === 0
      ? (saatler[orta - 1] + saatler[orta]) / 2
      : saatler[orta];

  return {
    toplam,
    acik,
    kapali: kapananlar.length,
    ortalamaSaat: Math.round(ortalama * 10) / 10,
    ortancaSaat: Math.round(ortanca * 10) / 10,
    kirkSekizSaatOrani:
      saatler.filter((s) => s <= 48).length / saatler.length,
  };
}

/** SLA'yi kullaniciya tek cumlede anlatir. Puan degil, olgu. */
export function slaMetni(s: SlaOzeti): string {
  if (s.toplam === 0) return 'Bu ofis hakkında henüz şikâyet kaydı yok.';
  if (s.kapali === 0) {
    return `${s.toplam} şikâyet açıldı, henüz hiçbiri kapatılmadı.`;
  }
  const yuzde = Math.round((s.kirkSekizSaatOrani ?? 0) * 100);
  return (
    `${s.toplam} şikâyetin ${s.kapali}'i kapatıldı. ` +
    `Ortanca kapanma süresi ${s.ortancaSaat} saat; ` +
    `%${yuzde}'i 48 saat içinde kapandı.`
  );
}
