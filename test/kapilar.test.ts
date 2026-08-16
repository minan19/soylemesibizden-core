import { describe, it, expect } from 'vitest';
import {
  teyideZorlarMi, slaHesapla, slaMetni,
  OTOMATIK_TEYIT_ESIGI, TEYIDE_ZORLAYAN_TURLER,
} from '@/lib/sikayet';
import {
  gecisGecerliMi, geriBildirimVerilebilirMi,
  yemIlanSayilirMi, gosterimOzetle, YEM_ILAN_ESIGI,
} from '@/lib/randevu';
import { belgeDegerlendir, bicimGecerliMi } from '@/lib/yetkiBelgesi';
import { hammingMesafesi, benzerlik } from '@/lib/algiHash';

const GUN = 86_400_000;
const simdi = new Date('2026-08-15T12:00:00Z');
const gun = (n: number) => new Date(simdi.getTime() + n * GUN);

// ─────────────────────────────────────────────────────────────
describe('şikâyet eşiği', () => {
  it('tek bildirim ilanı teyide zorlamaz', () => {
    // 1 olsaydı tek kişi kötü niyetle rakip ilanı düşürebilirdi.
    expect(teyideZorlarMi('SATILDI_HALA_YAYINDA', 1)).toBe(false);
  });

  it('eşik sayısında zorlar', () => {
    expect(teyideZorlarMi('SATILDI_HALA_YAYINDA', OTOMATIK_TEYIT_ESIGI)).toBe(true);
  });

  it('yalnızca belirli türler zorlar', () => {
    expect(teyideZorlarMi('YANLIS_FIYAT', 10)).toBe(false);
    expect(TEYIDE_ZORLAYAN_TURLER).toContain('YEM_ILAN');
  });
});

describe('SLA hesabı', () => {
  const ac = (saat: number | null) => ({
    acilisTs: gun(-10),
    kapanisTs: saat === null ? null : new Date(gun(-10).getTime() + saat * 3_600_000),
  });

  it('kapanan yoksa ortanca null', () => {
    const s = slaHesapla([ac(null), ac(null)]);
    expect(s.kapali).toBe(0);
    expect(s.ortancaSaat).toBeNull();
  });

  it('çift sayıda kayıtta ortancayı ortalar', () => {
    const s = slaHesapla([ac(3), ac(12), ac(30), ac(96)]);
    expect(s.ortancaSaat).toBe(21); // (12+30)/2
  });

  it('tek sayıda kayıtta ortadakini alır', () => {
    expect(slaHesapla([ac(3), ac(12), ac(96)]).ortancaSaat).toBe(12);
  });

  it('ortanca uç değerden etkilenmez, ortalama etkilenir', () => {
    // Ortancayı seçmemizin sebebi: tek bir 1000 saatlik kayıt
    // ortalamayı bozar ama gerçeği yansıtmaz.
    const s = slaHesapla([ac(2), ac(3), ac(4), ac(1000)]);
    expect(s.ortancaSaat).toBe(3.5);
    expect(s.ortalamaSaat).toBeGreaterThan(200);
  });

  it('48 saat oranını doğru hesaplar', () => {
    const s = slaHesapla([ac(3), ac(12), ac(30), ac(96)]);
    expect(s.kirkSekizSaatOrani).toBe(0.75);
  });

  it('metin Türkçe ekini doğru kurar', () => {
    expect(slaMetni(slaHesapla([ac(3), ac(12), ac(30), ac(96)]))).toContain("4'ü");
  });
});

// ─────────────────────────────────────────────────────────────
describe('randevu durum geçişleri', () => {
  it('talep onaylanabilir veya iptal edilebilir', () => {
    expect(gecisGecerliMi('TALEP', 'ONAYLANDI')).toBe(true);
    expect(gecisGecerliMi('TALEP', 'IPTAL')).toBe(true);
  });

  it('talepten doğrudan gerçekleşti olmaz', () => {
    expect(gecisGecerliMi('TALEP', 'GERCEKLESTI')).toBe(false);
  });

  it('GERÇEKLEŞTİ SON DURUMDUR — kanıt silinemez', () => {
    // Bu bozulursa olumsuz geri bildirim alan ofis randevuyu
    // iptale çevirip kaydı yok edebilir.
    expect(gecisGecerliMi('GERCEKLESTI', 'IPTAL')).toBe(false);
    expect(gecisGecerliMi('GERCEKLESTI', 'ONAYLANDI')).toBe(false);
    expect(gecisGecerliMi('GELMEDI', 'IPTAL')).toBe(false);
  });
});

describe('gösterim geri bildirimi', () => {
  it('yalnızca gerçekleşmiş gösterime verilebilir', () => {
    expect(
      geriBildirimVerilebilirMi({ durumu: 'ONAYLANDI', mevcutGeriBildirim: null })
        .verilebilir
    ).toBe(false);
    expect(
      geriBildirimVerilebilirMi({ durumu: 'GERCEKLESTI', mevcutGeriBildirim: null })
        .verilebilir
    ).toBe(true);
  });

  it('ikinci kez verilemez', () => {
    expect(
      geriBildirimVerilebilirMi({ durumu: 'GERCEKLESTI', mevcutGeriBildirim: false })
        .verilebilir
    ).toBe(false);
  });
});

describe('yem ilan eşiği', () => {
  it('tek olumsuz rapor yetmez', () => {
    expect(yemIlanSayilirMi(1)).toBe(false);
  });
  it('eşikte sayılır', () => {
    expect(yemIlanSayilirMi(YEM_ILAN_ESIGI)).toBe(true);
  });
});

describe('gösterim özeti', () => {
  it('yalnızca gerçekleşenleri sayar', () => {
    const o = gosterimOzetle([
      { durumu: 'GERCEKLESTI', ilanGercekMi: true },
      { durumu: 'GERCEKLESTI', ilanGercekMi: false },
      { durumu: 'TALEP', ilanGercekMi: null },
      { durumu: 'GELMEDI', ilanGercekMi: null },
    ]);
    expect(o.toplamGosterim).toBe(2);
    expect(o.gelinmedi).toBe(1);
    expect(o.dogrulamaOrani).toBe(0.5);
  });

  it('geri bildirim yoksa oran null — %0 DEMEZ', () => {
    // %0 yazmak, geri bildirim verilmemiş bir ofisi
    // "hiç doğrulanmadı" diye damgalamak olurdu.
    const o = gosterimOzetle([{ durumu: 'GERCEKLESTI', ilanGercekMi: null }]);
    expect(o.dogrulamaOrani).toBeNull();
  });
});

// ─────────────────────────────────────────────────────────────
describe('yetki belgesi kapısı', () => {
  const temel = {
    yetkiBelgeNo: 'TEST-YB-000001',
    yetkiBelgeBitis: gun(200),
    yetkiBelgeGecerli: true,
  };

  it('geçerli belgeyle ilan verilebilir', () => {
    expect(belgeDegerlendir(temel, simdi).ilanVerebilir).toBe(true);
  });

  it('süresi dolmuş belgeyle ilan VERİLEMEZ', () => {
    const s = belgeDegerlendir({ ...temel, yetkiBelgeBitis: gun(-1) }, simdi);
    expect(s.ilanVerebilir).toBe(false);
    expect(s.durumu).toBe('suresi_doldu');
  });

  it('yaklaşan bitişte hâlâ ilan verilebilir ama uyarılır', () => {
    const s = belgeDegerlendir({ ...temel, yetkiBelgeBitis: gun(10) }, simdi);
    expect(s.ilanVerebilir).toBe(true);
    expect(s.durumu).toBe('yakinda_bitiyor');
  });

  it('elle geçersiz işaretlenmiş belge engellenir', () => {
    expect(
      belgeDegerlendir({ ...temel, yetkiBelgeGecerli: false }, simdi).ilanVerebilir
    ).toBe(false);
  });

  it('biçim kontrolü katı DEĞİL — gerçek ofisi engellememeli', () => {
    expect(bicimGecerliMi('YB-2026-00042')).toBe(true);
    expect(bicimGecerliMi('12345678')).toBe(true);
    expect(bicimGecerliMi('ab')).toBe(false);
    expect(bicimGecerliMi('---')).toBe(false);
    expect(bicimGecerliMi(null)).toBe(false);
  });
});

// ─────────────────────────────────────────────────────────────
describe('algısal hash', () => {
  it('aynı hash mesafesi sıfır', () => {
    expect(hammingMesafesi('4d494955aa556945', '4d494955aa556945')).toBe(0);
    expect(benzerlik('4d494955aa556945', '4d494955aa556945')).toBe('ayni');
  });

  it('tek bit farkı 1 mesafe', () => {
    expect(hammingMesafesi('0000000000000000', '0000000000000001')).toBe(1);
  });

  it('farklı uzunlukta güvenli davranır — çakışma üretmez', () => {
    // GEREKSİNİM: farklı uzunluktaki hash'ler benzer SAYILMAMALI.
    //
    // Önceki hâlinde burada Number.MAX_SAFE_INTEGER bekleniyordu.
    // O bir uygulama detayı: sentinel değer Infinity'ye çevrilse
    // gereksinim hâlâ karşılanır ama test kırılırdı. Gereksinimi
    // doğruluyoruz, seçilen sayıyı değil.
    expect(hammingMesafesi('abc', 'abcd')).toBeGreaterThan(64);
    expect(benzerlik('abc', 'abcd')).toBe('farkli');
  });

  it('eşik sınırlarını doğru ayırır', () => {
    // 6 bit fark -> varyant, 7 -> şüpheli sınırında
    const a = '0000000000000000';
    expect(benzerlik(a, '000000000000000f')).toBe('varyant');   // 4 bit
    expect(benzerlik(a, 'ffffffffffffffff')).toBe('farkli');    // 64 bit
  });
});
