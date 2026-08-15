/**
 * Arama filtreleri · 14.08.2026 (TRT)
 *
 * Filtreler URL'de tutulur. Sebep: arama sonucu paylasilabilir olur,
 * geri tusu calisir, sayfa yenilenince kaybolmaz ve sunucuda
 * render edilebilir. Istemci tarafinda state tutan filtre panelleri
 * bu ucunu de kaybeder.
 *
 * Bu dosya URL <-> filtre donusumunu ve dogrulamayi yapar.
 * Prisma bilmez; sorgu kurma isi lib/ilanSorgu.ts'te.
 */

export type IlanTuru = 'SATILIK' | 'KIRALIK';
export type TasinmazTipi = 'KONUT' | 'ISYERI' | 'ARSA' | 'BINA' | 'DEVREMULK';

/**
 * Siralama secenekleri.
 *
 * Ilk dordu standarttir. Son ikisi RAKIPLERDE YOKTUR ve kasitlidir:
 *
 *   yayin-eski  — "en uzun suredir satilamayan". Alici icin pazarlik
 *                 gucu, satici icin fiyat sinyali. Geliri ilan
 *                 adedine bagli bir platform bunu gostermek istemez;
 *                 "bu ilan 210 gundur duruyor" kendi urununu
 *                 kotulemektir.
 *   fiyat-dusen — fiyati son donemde inen ilanlar. Ayni mantik.
 */
export const SIRALAMALAR = {
  'yayin-yeni': 'En yeni',
  'fiyat-artan': 'Fiyat: düşükten yükseğe',
  'fiyat-azalan': 'Fiyat: yüksekten düşüğe',
  'm2-fiyat': 'm² fiyatı: düşükten yükseğe',
  'yayin-eski': 'En uzun süredir yayında',
  'fiyat-dusen': 'Fiyatı düşenler',
} as const;

export type Siralama = keyof typeof SIRALAMALAR;

export interface Filtre {
  q?: string;
  ilce?: string;
  turu?: IlanTuru;
  tipi?: TasinmazTipi;
  enAzLira?: number;
  enCokLira?: number;
  enAzM2?: number;
  enCokM2?: number;
  odaSayisi?: string;
  siralama: Siralama;
  sayfa: number;
}

const TURLER: IlanTuru[] = ['SATILIK', 'KIRALIK'];
const TIPLER: TasinmazTipi[] = ['KONUT', 'ISYERI', 'ARSA', 'BINA', 'DEVREMULK'];

/**
 * Sayi ayristirma.
 *
 * Iki hata testlerle yakalandi ve burada duzeltildi:
 *
 *   "abc" -> replace(/\D/g,'') bos dize uretiyor, Number('') = 0.
 *            Yani anlamsiz bir deger "en az 0 TL" filtresine
 *            donusuyordu.
 *   "-5"  -> eksi isareti de temizlendigi icin "5" oluyordu;
 *            sayfa=-5 istegi 5. sayfayi aciyordu.
 *
 * Ayirici temizligi (2.500.000 -> 2500000) korunuyor cunku
 * kullanici bicimlenmis deger yapistirabiliyor.
 */
function sayi(v: string | undefined, enAz = 0, enCok = Number.MAX_SAFE_INTEGER) {
  if (v === undefined) return undefined;
  const t = v.trim();
  if (t.startsWith('-')) return undefined;

  const temiz = t.replace(/\D/g, '');
  if (temiz === '') return undefined;

  const n = Number(temiz);
  if (!Number.isFinite(n) || n < enAz || n > enCok) return undefined;
  return n;
}

/** URL parametrelerini dogrulanmis filtreye cevirir. Gecersiz deger yok sayilir. */
export function filtreCoz(sp: Record<string, string | string[] | undefined>): Filtre {
  const tek = (k: string) => {
    const v = sp[k];
    return Array.isArray(v) ? v[0] : v;
  };

  const turuHam = tek('turu')?.toUpperCase();
  const tipiHam = tek('tipi')?.toUpperCase();
  const siralamaHam = tek('sirala');

  return {
    q: tek('q')?.trim().slice(0, 100) || undefined,
    ilce: tek('ilce')?.trim().slice(0, 60) || undefined,
    turu: TURLER.includes(turuHam as IlanTuru) ? (turuHam as IlanTuru) : undefined,
    tipi: TIPLER.includes(tipiHam as TasinmazTipi) ? (tipiHam as TasinmazTipi) : undefined,
    enAzLira: sayi(tek('enaz')),
    enCokLira: sayi(tek('encok')),
    enAzM2: sayi(tek('m2az'), 1, 100_000),
    enCokM2: sayi(tek('m2cok'), 1, 100_000),
    odaSayisi: tek('oda')?.trim().slice(0, 10) || undefined,
    siralama:
      siralamaHam && siralamaHam in SIRALAMALAR
        ? (siralamaHam as Siralama)
        : 'yayin-yeni',
    sayfa: Math.max(1, sayi(tek('sayfa')) ?? 1),
  };
}

/** Filtreyi URL sorgu dizesine cevirir. Bos degerler yazilmaz. */
export function filtreUrl(f: Partial<Filtre>): string {
  const p = new URLSearchParams();
  if (f.q) p.set('q', f.q);
  if (f.ilce) p.set('ilce', f.ilce);
  if (f.turu) p.set('turu', f.turu);
  if (f.tipi) p.set('tipi', f.tipi);
  if (f.enAzLira) p.set('enaz', String(f.enAzLira));
  if (f.enCokLira) p.set('encok', String(f.enCokLira));
  if (f.enAzM2) p.set('m2az', String(f.enAzM2));
  if (f.enCokM2) p.set('m2cok', String(f.enCokM2));
  if (f.odaSayisi) p.set('oda', f.odaSayisi);
  if (f.siralama && f.siralama !== 'yayin-yeni') p.set('sirala', f.siralama);
  if (f.sayfa && f.sayfa > 1) p.set('sayfa', String(f.sayfa));
  const s = p.toString();
  return s ? `?${s}` : '';
}

/** Aktif filtre sayisi — arayuzde rozet olarak gosterilir. */
export function aktifFiltreSayisi(f: Filtre): number {
  return [
    f.q, f.ilce, f.turu, f.tipi,
    f.enAzLira, f.enCokLira, f.enAzM2, f.enCokM2, f.odaSayisi,
  ].filter(Boolean).length;
}

export const TIP_METIN: Record<TasinmazTipi, string> = {
  KONUT: 'Konut',
  ISYERI: 'İş yeri',
  ARSA: 'Arsa',
  BINA: 'Bina',
  DEVREMULK: 'Devremülk',
};
