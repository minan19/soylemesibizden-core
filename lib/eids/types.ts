/**
 * EİDS — Elektronik İlan Doğrulama Sistemi
 * Arayüz tanımı · v1.0 · 28.07.2026 (TRT)
 *
 * Yasal dayanak: Taşınmaz Ticareti Hakkında Yönetmelik.
 * 15.02.2026'dan itibaren tüm gayrimenkul ilanları için zorunlu.
 *
 * Bu dosya SADECE sözleşmedir. Uygulamalar: gercek.ts, mock.ts
 */

export type YetkiTuru = 'MALIK' | 'HISIM' | 'YETKILI_ISLETME';
export type YetkiKaynagi = 'GERCEK' | 'MOCK';

/** EİDS'ten dönen yetki sorgusu sonucu */
export interface YetkiSonucu {
  yetkili: boolean;
  turu?: YetkiTuru;
  /** EİDS referans numarası — denetim izi */
  referansNo?: string;
  baslangic?: Date;
  bitis?: Date;
  kaynak: YetkiKaynagi;
  /** Yetkili değilse sebebi (kullanıcıya gösterilebilir) */
  redSebebi?: string;
}

/** Kimlik doğrulama sonucu (e-Devlet SSO dönüşü) */
export interface KimlikSonucu {
  dogrulandi: boolean;
  /** EİDS kullanıcı kodu. TCKN ASLA saklanmaz. */
  kullaniciKodu?: string;
  kaynak: YetkiKaynagi;
}

/** Taşınmaz bilgisi sorgusu sonucu */
export interface TasinmazSonucu {
  bulundu: boolean;
  tasinmazNo: string;
  ada?: string;
  parsel?: string;
  ilKodu?: number;
  ilceAd?: string;
  mahalleAd?: string;
  brutM2?: number;
  kaynak: YetkiKaynagi;
}

/**
 * EİDS sağlayıcı sözleşmesi.
 *
 * İki uygulaması vardır:
 *  - GercekEids : Ticaret Bakanlığı API'si (Firma Kodu + Basic Auth + IP yetkisi)
 *  - MockEids   : geliştirme içindir, production'da KULLANILAMAZ
 */
export interface EidsProvider {
  readonly kaynak: YetkiKaynagi;

  /** e-Devlet SSO dönüşünü doğrular */
  kimlikDogrula(kullaniciKodu: string, durum: string): Promise<KimlikSonucu>;

  /** Bir kişinin bir taşınmaz için ilan verme yetkisi var mı */
  yetkiSorgula(params: {
    eidsKullaniciKodu: string;
    tasinmazNo: string;
  }): Promise<YetkiSonucu>;

  /** Taşınmaz numarasından tapu bilgisi çeker */
  tasinmazSorgula(tasinmazNo: string): Promise<TasinmazSonucu>;
}
