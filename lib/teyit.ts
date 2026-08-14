/**
 * CANLILIK TEYIDI · 14.08.2026 (TRT)
 *
 * Hayalet ilan sorununun yapisal cozumu.
 *
 * Rakiplerde ilan, sahibi kaldirana kadar yayinda kalir. Satilmis
 * daire aylarca listelenir, cunku "aktif ilan sayisi" hem pazarlama
 * hem gelir kalemidir. Bizim gelirimiz ilan adedine bagli olmadigi
 * icin tersini yapabiliyoruz: ilan, teyit edilmedigi surece DUSER.
 *
 * Kural: yayindaki her ilan periyodik olarak teyit edilmelidir.
 * Teyit edilmezse insan eli degmeden pasiflesir.
 *
 * Bu dosya saf mantik icerir — veritabani ve HTTP bilmez, test edilebilir.
 */

/** Teyit periyodu. Yonetmelikte belirtilmez; urun karari. */
export const TEYIT_PERIYODU_GUN = 30;

/** Bu esikten sonra kullaniciya hatirlatma gonderilir. */
export const HATIRLATMA_ESIGI_GUN = 7;

export type TeyitDurumu =
  | 'taze'         // suresi var
  | 'yaklasiyor'   // 7 gun veya az kaldi
  | 'gecti';       // sure doldu, pasiflesmeli

export function teyitDurumu(
  teyitSonTarih: Date | null,
  simdi: Date = new Date()
): TeyitDurumu {
  if (!teyitSonTarih) return 'gecti';
  const kalanGun = Math.floor(
    (teyitSonTarih.getTime() - simdi.getTime()) / 86_400_000
  );
  if (kalanGun < 0) return 'gecti';
  if (kalanGun <= HATIRLATMA_ESIGI_GUN) return 'yaklasiyor';
  return 'taze';
}

/**
 * Teyitten sonraki yeni son tarih.
 *
 * KRITIK: yeni tarih, EIDS yetkisinin bitisini ASLA gecemez.
 * Aksi halde yetkisi bitmis bir ilan, teyit edilerek yayinda
 * tutulabilirdi — kapinin etrafindan dolasmak olurdu.
 */
export function yeniTeyitSonTarihi(
  yetkiBitis: Date,
  simdi: Date = new Date()
): Date {
  const periyot = new Date(simdi.getTime() + TEYIT_PERIYODU_GUN * 86_400_000);
  return periyot < yetkiBitis ? periyot : yetkiBitis;
}

/** Ilanin teyit edilebilmesi icin gereken kosullar. */
export interface TeyitEdilebilirlik {
  edilebilir: boolean;
  sebep?: string;
}

export function teyitEdilebilirMi(params: {
  ilanDurumu: string;
  yetkiDurumu: string;
  yetkiBitis: Date;
  simdi?: Date;
}): TeyitEdilebilirlik {
  const simdi = params.simdi ?? new Date();

  if (!['YAYINDA', 'TEYIT_BEKLIYOR'].includes(params.ilanDurumu)) {
    return {
      edilebilir: false,
      sebep: 'Yalnızca yayındaki ilanlar teyit edilebilir.',
    };
  }

  if (params.yetkiDurumu !== 'GECERLI') {
    return {
      edilebilir: false,
      sebep: 'EİDS yetkisi geçerli değil. Teyit yetkiyi canlandırmaz.',
    };
  }

  if (params.yetkiBitis <= simdi) {
    return {
      edilebilir: false,
      sebep:
        'EİDS yetki süresi dolmuş. İlanın yayında kalabilmesi için yetkinin yenilenmesi gerekir.',
    };
  }

  return { edilebilir: true };
}

/**
 * Bir ilanin neden pasiflestigini aciklayan sebep.
 * Kullaniciya gosterilir — sessizce kaybolan ilan olmaz.
 */
export type PasiflesmeSebebi = 'TEYIT_EDILMEDI' | 'YETKI_BITTI';

export function pasiflesmeSebebi(params: {
  teyitSonTarih: Date | null;
  yetkiBitis: Date;
  simdi?: Date;
}): PasiflesmeSebebi | null {
  const simdi = params.simdi ?? new Date();

  // Yetki bitisi once kontrol edilir: yasal dayanak teyitten onceliklidir.
  if (params.yetkiBitis <= simdi) return 'YETKI_BITTI';
  if (!params.teyitSonTarih || params.teyitSonTarih <= simdi) {
    return 'TEYIT_EDILMEDI';
  }
  return null;
}

export const PASIFLESME_METNI: Record<PasiflesmeSebebi, string> = {
  TEYIT_EDILMEDI:
    'İlan sahibi ilanın hâlâ geçerli olduğunu teyit etmediği için yayından kaldırıldı.',
  YETKI_BITTI:
    'EİDS yetki süresi dolduğu için yayından kaldırıldı.',
};
