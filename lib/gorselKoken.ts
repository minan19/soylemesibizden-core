import sharp, { type Metadata } from 'sharp';

/**
 * GORSEL KOKEN ANALIZI · 14.08.2026 (TRT)
 *
 * ONEMLI SINIR: bu dosya "bu gorsel yapay zeka urunudur" DEMEZ.
 *
 * Piksel analiziyle YZ uretimi goruntu tespiti guvenilir degildir;
 * yanlis pozitif orani yuksektir ve masum bir ilan sahibini
 * "sahte fotograf koydu" diye damgalamak, cozmeye calistigimiz
 * guven sorununu kendi elimizle uretmek olur. Zillow'un iklim
 * riski skorunu model dogrulugu itiraziyla geri cekmesi (Aralik
 * 2025) ayni sinifta bir ders.
 *
 * Bunun yerine DOSYANIN KENDI BEYANINI okuruz:
 *
 *   - C2PA / Content Credentials  : Adobe, OpenAI, Google'in gomdugu
 *                                   koken imzasi. Varsa kesin bilgidir.
 *   - XMP  CreatorTool / Software : "Adobe Firefly", "DALL-E",
 *                                   "Midjourney", "Stable Diffusion"
 *   - EXIF Make/Model             : kamera bilgisi. Varsa cekilmis
 *                                   fotograf olma ihtimali yuksek.
 *   - EXIF DateTimeOriginal       : cekim tarihi.
 *
 * Sonuc bir SKOR degil, bir OLGU LISTESIDIR. Kullanici okur, karar
 * verir (ADR-001).
 */

export type KokenIsareti =
  | 'C2PA_VAR'
  | 'YZ_ARACI_BEYANI'
  | 'DUZENLEME_ARACI'
  | 'KAMERA_BILGISI_VAR'
  | 'KAMERA_BILGISI_YOK'
  | 'CEKIM_TARIHI_VAR'
  | 'USTVERI_TAMAMEN_SILINMIS';

export interface KokenSonucu {
  isaretler: KokenIsareti[];
  /** Beyan eden aracin adi — bulunduysa. */
  aracAdi: string | null;
  kameraMarka: string | null;
  kameraModel: string | null;
  cekimTarihi: string | null;
  /**
   * Arayuzde gosterilecek tek cumle. Iddiali degil, betimleyici.
   */
  ozet: string;
}

/** Bilinen uretici araclar. Liste genisletilebilir; eksigi "bilinmiyor"dur. */
const YZ_ARACLARI = [
  'dall-e', 'dalle', 'midjourney', 'stable diffusion', 'stablediffusion',
  'firefly', 'imagen', 'gemini', 'grok', 'flux', 'leonardo.ai',
  'ideogram', 'generative fill', 'generative ai',
];

const DUZENLEME_ARACLARI = [
  'photoshop', 'lightroom', 'gimp', 'affinity', 'capture one',
  'luminar', 'canva', 'pixelmator', 'snapseed',
];

function metinIcinde(kaynak: string, liste: string[]): string | null {
  const k = kaynak.toLowerCase();
  for (const a of liste) if (k.includes(a)) return a;
  return null;
}

/**
 * EXIF ikili verisinden ASCII dizeleri cikarir.
 *
 * Tam bir EXIF ayristiricisi yerine bu yaklasim secildi: yeni bir
 * bagimlilik eklemeden Make/Model/Software alanlarini yakalamak
 * icin yeterli. Eksigi, alan adlarini degil yalnizca degerleri
 * gormesidir — bu yuzden sonuclar "beyan" olarak sunulur, kesin
 * alan eslemesi olarak degil.
 */
function diziCikar(tampon: Buffer): string {
  const parcalar: string[] = [];
  let simdiki = '';
  for (const bayt of tampon) {
    if (bayt >= 32 && bayt <= 126) {
      simdiki += String.fromCharCode(bayt);
    } else {
      if (simdiki.length >= 3) parcalar.push(simdiki);
      simdiki = '';
    }
  }
  if (simdiki.length >= 3) parcalar.push(simdiki);
  return parcalar.join(' | ');
}

export async function kokenAnaliz(girdi: Buffer): Promise<KokenSonucu> {
  const isaretler: KokenIsareti[] = [];
  let aracAdi: string | null = null;
  let kameraMarka: string | null = null;
  let kameraModel: string | null = null;
  let cekimTarihi: string | null = null;

  let ustveri: Metadata;
  try {
    ustveri = await sharp(girdi).metadata();
  } catch {
    return {
      isaretler: ['USTVERI_TAMAMEN_SILINMIS'],
      aracAdi: null, kameraMarka: null, kameraModel: null, cekimTarihi: null,
      ozet: 'Görselin üstverisi okunamadı.',
    };
  }

  const exifMetin = ustveri.exif ? diziCikar(ustveri.exif) : '';
  const xmpMetin = ustveri.xmp ? ustveri.xmp.toString('utf8') : '';
  const iptcMetin = ustveri.iptc ? diziCikar(ustveri.iptc) : '';
  const hepsi = `${exifMetin} ${xmpMetin} ${iptcMetin}`;

  // ── C2PA / Content Credentials ───────────────────────────────
  // JUMBF kutusu veya XMP icinde c2pa ad alani.
  const c2paVar =
    hepsi.toLowerCase().includes('c2pa') ||
    hepsi.includes('contentauth') ||
    girdi.includes(Buffer.from('jumb'));
  if (c2paVar) isaretler.push('C2PA_VAR');

  // ── Arac beyani ──────────────────────────────────────────────
  const yz = metinIcinde(hepsi, YZ_ARACLARI);
  if (yz) {
    isaretler.push('YZ_ARACI_BEYANI');
    aracAdi = yz;
  } else {
    const duzenleme = metinIcinde(hepsi, DUZENLEME_ARACLARI);
    if (duzenleme) {
      isaretler.push('DUZENLEME_ARACI');
      aracAdi = duzenleme;
    }
  }

  // ── Kamera bilgisi ───────────────────────────────────────────
  // Yaygin uretici adlari; EXIF Make alaninda gorunur.
  const markalar = [
    'Apple', 'Samsung', 'Canon', 'NIKON', 'SONY', 'FUJIFILM',
    'Xiaomi', 'HUAWEI', 'OPPO', 'vivo', 'Google', 'OnePlus', 'Panasonic',
  ];
  for (const m of markalar) {
    if (exifMetin.includes(m)) {
      kameraMarka = m;
      break;
    }
  }
  if (kameraMarka) isaretler.push('KAMERA_BILGISI_VAR');
  else isaretler.push('KAMERA_BILGISI_YOK');

  // ── Cekim tarihi ─────────────────────────────────────────────
  const tarih = exifMetin.match(/\d{4}:\d{2}:\d{2} \d{2}:\d{2}:\d{2}/);
  if (tarih) {
    cekimTarihi = tarih[0];
    isaretler.push('CEKIM_TARIHI_VAR');
  }

  if (!ustveri.exif && !ustveri.xmp && !ustveri.iptc) {
    isaretler.push('USTVERI_TAMAMEN_SILINMIS');
  }

  return {
    isaretler, aracAdi, kameraMarka, kameraModel, cekimTarihi,
    ozet: ozetle(isaretler, aracAdi, kameraMarka, cekimTarihi),
  };
}

function ozetle(
  isaretler: KokenIsareti[],
  aracAdi: string | null,
  kameraMarka: string | null,
  cekimTarihi: string | null
): string {
  if (isaretler.includes('YZ_ARACI_BEYANI')) {
    return `Bu görselin üstverisinde yapay zekâ aracı beyanı var${aracAdi ? ` (${aracAdi})` : ''}.`;
  }
  if (isaretler.includes('C2PA_VAR')) {
    return 'Bu görselde köken imzası (Content Credentials) bulunuyor.';
  }
  if (isaretler.includes('KAMERA_BILGISI_VAR')) {
    return (
      `Üstveride kamera bilgisi var${kameraMarka ? ` (${kameraMarka})` : ''}` +
      `${cekimTarihi ? `, çekim tarihi ${cekimTarihi.slice(0, 10).replace(/:/g, '.')}` : ''}.`
    );
  }
  if (isaretler.includes('DUZENLEME_ARACI')) {
    return `Görsel bir düzenleme aracından geçmiş${aracAdi ? ` (${aracAdi})` : ''}.`;
  }
  if (isaretler.includes('USTVERI_TAMAMEN_SILINMIS')) {
    return 'Görselin üstverisi silinmiş. Bu tek başına bir sorun göstermez; birçok platform yüklemede üstveriyi siler.';
  }
  return 'Üstveride kamera bilgisi bulunamadı. Bu tek başına bir sorun göstermez.';
}

/** Arayuzde rozet gosterilmeli mi — yalnizca kesin beyanlarda. */
export function rozetGerekliMi(s: KokenSonucu): boolean {
  return (
    s.isaretler.includes('YZ_ARACI_BEYANI') ||
    s.isaretler.includes('C2PA_VAR')
  );
}
