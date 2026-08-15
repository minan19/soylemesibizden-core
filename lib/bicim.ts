/**
 * Bicimlendirme yardimcilari · 14.08.2026 (TRT)
 *
 * PARA KURALI (CC #6): para her yerde BigInt KURUS.
 * Float kullanilmaz. Bolme gerektiginde once BigInt aritmetigi yapilir,
 * yalnizca EKRANA BASARKEN Number'a dusulur.
 *
 * lib/utils.ts'teki formatCurrency() eski Float semasi icindir ve
 * v2 gecisinde kaldirilacaktir. Yeni kod bu dosyayi kullanir.
 */

const TL = '₺';

/** 450000000n (kurus) -> "4.500.000 ₺" */
export function kurus(v: bigint | null | undefined): string {
  if (v === null || v === undefined) return '—';
  const lira = v / 100n;
  return lira.toLocaleString('tr-TR') + ' ' + TL;
}

/** Kart gibi dar alanlar icin kisa gosterim: "4,5 Mn ₺" */
export function kurusKisa(v: bigint | null | undefined): string {
  if (v === null || v === undefined) return '—';
  const lira = v / 100n;

  if (lira >= 1_000_000_000n) {
    return ondalik(lira, 1_000_000_000n) + ' Mr ' + TL;
  }
  if (lira >= 1_000_000n) {
    return ondalik(lira, 1_000_000n) + ' Mn ' + TL;
  }
  if (lira >= 1_000n) {
    return ondalik(lira, 1_000n) + ' B ' + TL;
  }
  return lira.toLocaleString('tr-TR') + ' ' + TL;
}

/** BigInt bolmede tek ondalik basamak — yuvarlama hatasi olmadan. */
function ondalik(deger: bigint, bolen: bigint): string {
  const tam = deger / bolen;
  const kalan = ((deger % bolen) * 10n) / bolen;
  return kalan === 0n
    ? tam.toLocaleString('tr-TR')
    : tam.toLocaleString('tr-TR') + ',' + kalan.toString();
}

/** m2 basina fiyat: "56.250 ₺/m²" */
export function m2Fiyat(
  fiyatKurus: bigint | null | undefined,
  m2: number | null | undefined
): string {
  if (!fiyatKurus || !m2 || m2 <= 0) return '—';
  const birim = fiyatKurus / BigInt(Math.round(m2)) / 100n;
  return birim.toLocaleString('tr-TR') + ' ' + TL + '/m²';
}

/**
 * Sayiya 3. tekil iyelik eki ekler: 2 -> "2'si", 4 -> "4'u".
 *
 * Turkcede bu ek, sayinin OKUNUSUNDAKI son unluye ve son sesin
 * unlu/unsuz olmasina gore degisir; rakamdan dogrudan turetilemez.
 * "2 gosterimin 2'i" gibi ifadeler urunun cevrilmis hissettirmesine
 * yol acar, bu yuzden tablo ile cozuluyor.
 */
const IYELIK_BIRLER: Record<number, string> = {
  0: "'ı", 1: "'i", 2: "'si", 3: "'ü", 4: "'ü",
  5: "'i", 6: "'sı", 7: "'si", 8: "'i", 9: "'u",
};
const IYELIK_ONLAR: Record<number, string> = {
  10: "'u", 20: "'si", 30: "'u", 40: "'ı", 50: "'si",
  60: "'ı", 70: "'i", 80: "'i", 90: "'ı",
};

export function iyelik(n: number): string {
  const s = Math.abs(Math.trunc(n));

  // Yuzler ve binler, son sifirli basamaga gore okunur.
  if (s >= 1000 && s % 1000 === 0) return n + "'i";   // bin
  if (s >= 100 && s % 100 === 0) return n + "'ü";     // yuz
  if (s % 10 === 0 && s >= 10) {
    const on = s % 100;
    return n + (IYELIK_ONLAR[on] ?? "'ı");
  }
  return n + IYELIK_BIRLER[s % 10];
}

/** Iki tarih arasindaki tam gun sayisi. */
export function gunFarki(a: Date, b: Date = new Date()): number {
  return Math.floor((b.getTime() - a.getTime()) / 86_400_000);
}

/**
 * "3 gun once", "2 ay once".
 * Belirsiz "bir sure once" ifadelerinden kacinilir — kullanicinin
 * tazeligi kendisi degerlendirebilmesi gerekiyor.
 */
export function goreliGun(tarih: Date | string | null | undefined): string {
  if (!tarih) return '—';
  const d = typeof tarih === 'string' ? new Date(tarih) : tarih;
  const g = gunFarki(d);

  if (g < 0) return 'bugün';
  if (g === 0) return 'bugün';
  if (g === 1) return 'dün';
  if (g < 30) return g + ' gün önce';
  if (g < 365) return Math.floor(g / 30) + ' ay önce';
  return Math.floor(g / 365) + ' yıl önce';
}

/** "12 gün" — ilanin yayinda kalma suresi. */
export function yayindaSure(yayinTs: Date | string | null | undefined): string {
  if (!yayinTs) return 'yayında değil';
  const d = typeof yayinTs === 'string' ? new Date(yayinTs) : yayinTs;
  const g = gunFarki(d);
  if (g <= 0) return 'bugün yayında';
  if (g === 1) return '1 gündür yayında';
  return g + ' gündür yayında';
}

export interface FiyatDegisim {
  yuzde: number;
  yon: 'artis' | 'dusus' | 'sabit';
  metin: string;
}

/** Iki fiyat arasindaki degisim. Yuzde hesabi 4 basamak hassasiyetle. */
export function fiyatDegisimi(
  eski: bigint | null | undefined,
  yeni: bigint
): FiyatDegisim | null {
  if (eski === null || eski === undefined || eski === 0n) return null;

  const fark = yeni - eski;
  if (fark === 0n) return { yuzde: 0, yon: 'sabit', metin: 'değişmedi' };

  // (fark / eski) * 100, BigInt ile 2 ondalikli
  const binde = (fark * 10_000n) / eski;
  const yuzde = Number(binde) / 100;
  const yon = fark > 0n ? 'artis' : 'dusus';
  const isaret = fark > 0n ? '+' : '';

  return {
    yuzde,
    yon,
    metin: isaret + yuzde.toFixed(1).replace('.', ',') + '%',
  };
}

/**
 * Teyit son tarihine gore tazelik durumu.
 * Hayalet ilan sorununun kullaniciya gorunen yuzu budur.
 */
export type TazelikDurumu = 'taze' | 'yaklasiyor' | 'gecti' | 'bilinmiyor';

export function tazelik(
  teyitSonTarih: Date | string | null | undefined
): TazelikDurumu {
  if (!teyitSonTarih) return 'bilinmiyor';
  const d =
    typeof teyitSonTarih === 'string' ? new Date(teyitSonTarih) : teyitSonTarih;
  const kalan = -gunFarki(d);

  if (kalan < 0) return 'gecti';
  if (kalan <= 7) return 'yaklasiyor';
  return 'taze';
}
