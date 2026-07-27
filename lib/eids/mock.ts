/**
 * EİDS Mock sağlayıcı · v1.0 · 28.07.2026 (TRT)
 *
 * ⚠️ SADECE GELİŞTİRME. Production'da index.ts bunu reddeder.
 *
 * Amaç: Bakanlık başvurusu sürerken geliştirmenin durmaması.
 * Dönen her kayıt kaynak: 'MOCK' işaretlidir; arayüzde
 * "DOĞRULANMAMIŞ — TEST VERİSİ" etiketi ZORUNLUDUR.
 */

import type {
  EidsProvider,
  KimlikSonucu,
  YetkiSonucu,
  TasinmazSonucu,
} from './types';

/** Deterministik sahte veri: aynı girdi hep aynı çıktıyı verir */
function tohum(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

export class MockEids implements EidsProvider {
  readonly kaynak = 'MOCK' as const;

  async kimlikDogrula(kullaniciKodu: string): Promise<KimlikSonucu> {
    return {
      dogrulandi: Boolean(kullaniciKodu),
      kullaniciKodu,
      kaynak: 'MOCK',
    };
  }

  async yetkiSorgula(params: {
    eidsKullaniciKodu: string;
    tasinmazNo: string;
  }): Promise<YetkiSonucu> {
    const t = tohum(params.eidsKullaniciKodu + params.tasinmazNo);

    // %20 yetkisiz — red akışının da test edilebilmesi için
    if (t % 5 === 0) {
      return {
        yetkili: false,
        kaynak: 'MOCK',
        redSebebi: 'Bu taşınmaz için yetki kaydı bulunamadı. (TEST VERİSİ)',
      };
    }

    const turler = ['MALIK', 'HISIM', 'YETKILI_ISLETME'] as const;
    const simdi = new Date();
    const bitis = new Date(simdi);
    bitis.setMonth(bitis.getMonth() + 6);

    return {
      yetkili: true,
      turu: turler[t % 3],
      referansNo: 'MOCK-' + t.toString(36).toUpperCase(),
      baslangic: simdi,
      bitis,
      kaynak: 'MOCK',
    };
  }

  async tasinmazSorgula(tasinmazNo: string): Promise<TasinmazSonucu> {
    if (!/^\d{6,}$/.test(tasinmazNo)) {
      return { bulundu: false, tasinmazNo, kaynak: 'MOCK' };
    }

    const t = tohum(tasinmazNo);
    // İstanbul (34) ve Tekirdağ (59) — başlangıç koridoru
    const iller = [
      { kod: 34, ad: 'İstanbul', ilce: 'Kadıköy', mahalle: 'Caferağa' },
      { kod: 34, ad: 'İstanbul', ilce: 'Beşiktaş', mahalle: 'Levent' },
      { kod: 59, ad: 'Tekirdağ', ilce: 'Çorlu', mahalle: 'Kazimiye' },
      { kod: 59, ad: 'Tekirdağ', ilce: 'Süleymanpaşa', mahalle: 'Yavuz' },
    ];
    const il = iller[t % iller.length];

    return {
      bulundu: true,
      tasinmazNo,
      ada: String((t % 900) + 100),
      parsel: String((t % 40) + 1),
      ilKodu: il.kod,
      ilceAd: il.ilce,
      mahalleAd: il.mahalle,
      brutM2: 60 + (t % 140),
      kaynak: 'MOCK',
    };
  }
}
