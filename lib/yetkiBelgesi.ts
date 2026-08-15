/**
 * TASINMAZ TICARETI YETKI BELGESI · 15.08.2026 (TRT)
 *
 * Yonetmelik geregi ilan, malikin yetkilendirdigi YETKI BELGELI emlak
 * isletmesi tarafindan verilebilir. Belgesi olmayan isletme ne
 * yetkilendirilebilir ne ilan girebilir.
 *
 * 1 Ocak 2026'dan itibaren belge YILLIK HARCA tabi: 20.000 TL,
 * buyuksehirlerde 40.000 TL. Harci odemeyen isletmenin belgesi
 * yenilenmiyor. Yani "belgesi vardi" ile "belgesi gecerli" arasindaki
 * fark 2026'da her zamankinden buyuk.
 *
 * ── OTOMATIK DOGRULAMA NEDEN YOK ──────────────────────────────
 *
 * Resmi sorgulama ucu ttbs.gtb.gov.tr/Home/BelgeSorgula adresinde ve
 * CAPTCHA ile korunuyor. CAPTCHA asmak hem teknik olarak yanlis hem
 * etik olarak kabul edilemez; bu yuzden belge numarasini otomatik
 * DOGRULAMIYORUZ.
 *
 * Bunun yerine:
 *   1. Bicim kontrolu yapiyoruz (acikca eksik/hatali kayitlari eliyoruz)
 *   2. Bitis tarihini KENDIMIZ takip ediyoruz ve suresi dolani engelliyoruz
 *   3. Kullaniciya resmi sorgulama baglantisini veriyoruz
 *
 * "Dogrulandi" demiyoruz; "beyan edilen belge su, resmi kayittan
 * teyit edebilirsiniz" diyoruz. Fark, urunun tamamindaki fark.
 */

export const TTBS_SORGU_URL = 'https://ttbs.gtb.gov.tr/Home/BelgeSorgula';

/** Belge bitisine bu kadar gun kala uyari gosterilir. */
export const UYARI_ESIGI_GUN = 30;

export type BelgeDurumu =
  | 'gecerli'
  | 'yakinda_bitiyor'
  | 'suresi_doldu'
  | 'gecersiz_isaretli'
  | 'bicim_hatali';

export interface BelgeSonucu {
  durumu: BelgeDurumu;
  ilanVerebilir: boolean;
  kalanGun: number | null;
  mesaj: string;
}

/**
 * Bicim kontrolu.
 *
 * TTBS belge numarasinin resmi bicim kurali kamuya acik dokumanlarda
 * bulunamadi; bu yuzden KATI bir desen dayatmiyoruz — yanlis pozitif
 * gercek bir ofisi engellerdi. Yalnizca acikca gecersiz olani eliyoruz:
 * bos, cok kisa veya yalnizca noktalama.
 */
export function bicimGecerliMi(belgeNo: string | null | undefined): boolean {
  if (!belgeNo) return false;
  const t = belgeNo.trim();
  if (t.length < 4 || t.length > 40) return false;
  return /[A-Za-z0-9]/.test(t);
}

export function belgeDegerlendir(
  ofis: {
    yetkiBelgeNo: string | null;
    yetkiBelgeBitis: Date | null;
    yetkiBelgeGecerli: boolean;
  },
  simdi: Date = new Date()
): BelgeSonucu {
  if (!bicimGecerliMi(ofis.yetkiBelgeNo)) {
    return {
      durumu: 'bicim_hatali',
      ilanVerebilir: false,
      kalanGun: null,
      mesaj: 'Yetki belgesi numarası kayıtlı değil veya geçersiz.',
    };
  }

  // Elle "gecersiz" isaretlenmis kayit — moderasyon karari.
  if (!ofis.yetkiBelgeGecerli) {
    return {
      durumu: 'gecersiz_isaretli',
      ilanVerebilir: false,
      kalanGun: null,
      mesaj: 'Yetki belgesi geçersiz olarak işaretlenmiş.',
    };
  }

  if (!ofis.yetkiBelgeBitis) {
    return {
      durumu: 'bicim_hatali',
      ilanVerebilir: false,
      kalanGun: null,
      mesaj: 'Yetki belgesi bitiş tarihi kayıtlı değil.',
    };
  }

  const kalanGun = Math.floor(
    (ofis.yetkiBelgeBitis.getTime() - simdi.getTime()) / 86_400_000
  );

  if (kalanGun < 0) {
    return {
      durumu: 'suresi_doldu',
      ilanVerebilir: false,
      kalanGun,
      mesaj:
        'Yetki belgesinin süresi dolmuş. Belge yenilenene kadar yeni ilan verilemez ' +
        've mevcut ilanlar yayından kalkar.',
    };
  }

  if (kalanGun <= UYARI_ESIGI_GUN) {
    return {
      durumu: 'yakinda_bitiyor',
      ilanVerebilir: true,
      kalanGun,
      mesaj: `Yetki belgesinin süresi ${kalanGun} gün sonra doluyor.`,
    };
  }

  return {
    durumu: 'gecerli',
    ilanVerebilir: true,
    kalanGun,
    mesaj: 'Yetki belgesi geçerli.',
  };
}

/** Arayuzde gosterilecek kisa metin. */
export const BELGE_METIN: Record<BelgeDurumu, string> = {
  gecerli: 'Yetki belgesi geçerli',
  yakinda_bitiyor: 'Yetki belgesi yakında bitiyor',
  suresi_doldu: 'Yetki belgesi süresi dolmuş',
  gecersiz_isaretli: 'Yetki belgesi geçersiz',
  bicim_hatali: 'Yetki belgesi kayıtlı değil',
};
