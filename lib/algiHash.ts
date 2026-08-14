import sharp from 'sharp';
import { createHash } from 'crypto';

/**
 * GORSEL BUTUNLUGU · 14.08.2026 (TRT)
 *
 * Iki farkli parmak izi uretilir:
 *
 *  1. icerikHash (SHA-256)  — birebir ayni dosya. Ucuz, kesin.
 *  2. algiHash   (dHash)    — gorsel olarak ayni. Yeniden
 *     boyutlandirma, sikistirma, hafif kirpma ve renk oynamasina
 *     dayanikli. Kopya fotografi bunlar yakalar.
 *
 * Neden onemli: 2025-26'da ilan dolandiriciliginin bicimi degisti.
 * Ispanya'da var olmayan konutlar icin yapay zeka ile uretilmis
 * fotograflar kullanildi; New York Eyaleti Kasim 2025'te bu konuda
 * resmi uyari yayinladi. Ayni fotografin farkli mahallelerde tekrar
 * yayinlanmasi Turkiye'de de raporlanmis durumda.
 *
 * HASH SUNUCUDA HESAPLANIR. Istemciden gelen hash'e guvenilmez —
 * guven ozelligi olmasinin anlami bu.
 */

/** dHash cozunurlugu: 9x8 -> yatay komsu karsilastirmasi -> 64 bit */
const GENISLIK = 9;
const YUKSEKLIK = 8;

/**
 * Fark hash'i (difference hash).
 *
 * Ortalama hash'e (aHash) tercih edildi: aHash parlaklik kaymasina
 * duyarli, dHash degil. pHash daha guclu ama DCT gerektiriyor ve
 * yukleme yolunda ek maliyet cikariyor; dHash bu is icin yeterli.
 */
export async function algiHashHesapla(girdi: Buffer): Promise<string> {
  const ham = await sharp(girdi)
    .resize(GENISLIK, YUKSEKLIK, { fit: 'fill' })
    .grayscale()
    .raw()
    .toBuffer();

  const bitler: number[] = [];
  for (let y = 0; y < YUKSEKLIK; y++) {
    for (let x = 0; x < GENISLIK - 1; x++) {
      const sol = ham[y * GENISLIK + x];
      const sag = ham[y * GENISLIK + x + 1];
      bitler.push(sol < sag ? 1 : 0);
    }
  }

  // 64 bit -> 16 haneli onaltilik
  let onaltilik = '';
  for (let i = 0; i < bitler.length; i += 4) {
    const dortlu =
      (bitler[i] << 3) | (bitler[i + 1] << 2) | (bitler[i + 2] << 1) | bitler[i + 3];
    onaltilik += dortlu.toString(16);
  }
  return onaltilik;
}

/** Birebir ayni dosya tespiti. */
export function icerikHashHesapla(girdi: Buffer): string {
  return createHash('sha256').update(girdi).digest('hex');
}

/** Iki hash arasindaki farkli bit sayisi (Hamming mesafesi). */
export function hammingMesafesi(a: string, b: string): number {
  if (a.length !== b.length) return Number.MAX_SAFE_INTEGER;
  let mesafe = 0;
  for (let i = 0; i < a.length; i++) {
    let xor = parseInt(a[i], 16) ^ parseInt(b[i], 16);
    while (xor) {
      mesafe += xor & 1;
      xor >>= 1;
    }
  }
  return mesafe;
}

/**
 * Esik degerleri.
 *
 * 64 bitlik hash'te:
 *   0      -> gorsel olarak ayni
 *   1-6    -> ayni goruntunun varyanti (yeniden boyutlandirma,
 *             sikistirma, hafif duzenleme)
 *   7-12   -> benzer olabilir, insan bakmali
 *   13+    -> farkli
 *
 * ESIGI YUKSEK TUTMUYORUZ. Yanlis pozitif, masum bir ilan sahibini
 * "kopyaci" diye isaretler; bu, cozmeye calistigimiz guven sorununu
 * kendi elimizle uretmek olur. Supheliyi engellemiyoruz, sadece
 * ISARETLIYORUZ — karar insanin.
 */
export const AYNI_ESIGI = 0;
export const VARYANT_ESIGI = 6;
export const SUPHE_ESIGI = 12;

export type BenzerlikSonucu = 'ayni' | 'varyant' | 'supheli' | 'farkli';

export function benzerlik(a: string, b: string): BenzerlikSonucu {
  const m = hammingMesafesi(a, b);
  if (m <= AYNI_ESIGI) return 'ayni';
  if (m <= VARYANT_ESIGI) return 'varyant';
  if (m <= SUPHE_ESIGI) return 'supheli';
  return 'farkli';
}

export const BENZERLIK_METNI: Record<Exclude<BenzerlikSonucu, 'farkli'>, string> = {
  ayni: 'Bu görselin aynısı başka bir ilanda kullanılmış.',
  varyant:
    'Bu görselin yeniden boyutlandırılmış veya düzenlenmiş hâli başka bir ilanda kullanılmış.',
  supheli: 'Bu görsele benzer bir görsel başka bir ilanda kullanılmış.',
};
