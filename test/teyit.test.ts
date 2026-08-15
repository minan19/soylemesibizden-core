import { describe, it, expect } from 'vitest';
import {
  teyitDurumu,
  yeniTeyitSonTarihi,
  teyitEdilebilirMi,
  pasiflesmeSebebi,
  TEYIT_PERIYODU_GUN,
  HATIRLATMA_ESIGI_GUN,
} from '@/lib/teyit';

const GUN = 86_400_000;
const simdi = new Date('2026-08-15T12:00:00Z');
const gun = (n: number) => new Date(simdi.getTime() + n * GUN);

describe('teyitDurumu', () => {
  it('tarih yoksa süresi geçmiş sayılır', () => {
    // Teyit tarihi olmayan ilan "belirsiz" değil, GEÇMİŞ sayılır.
    // Aksi halde tarihi silinen ilan sonsuza kadar yayında kalırdı.
    expect(teyitDurumu(null, simdi)).toBe('gecti');
  });

  it('süresi dolmuşsa gecti', () => {
    expect(teyitDurumu(gun(-1), simdi)).toBe('gecti');
  });

  it('eşik gününde yaklasiyor sayılır', () => {
    expect(teyitDurumu(gun(HATIRLATMA_ESIGI_GUN), simdi)).toBe('yaklasiyor');
  });

  it('eşiğin bir gün ötesi taze', () => {
    expect(teyitDurumu(gun(HATIRLATMA_ESIGI_GUN + 1), simdi)).toBe('taze');
  });
});

describe('yeniTeyitSonTarihi — YETKİ TAVANI', () => {
  it('yetki uzaksa tam periyot verir', () => {
    const yetkiBitis = gun(365);
    const yeni = yeniTeyitSonTarihi(yetkiBitis, simdi);
    expect(yeni.getTime()).toBe(simdi.getTime() + TEYIT_PERIYODU_GUN * GUN);
  });

  it('yetki periyottan ÖNCE bitiyorsa yetki bitişini verir', () => {
    // KRİTİK KURAL: teyit, yetkiyi canlandırmaz. Bu bozulursa
    // yetkisi bitmek üzere olan bir ilan teyitle 30 gün daha
    // yayında tutulabilir — EİDS kapısının etrafından dolaşılır.
    const yetkiBitis = gun(5);
    const yeni = yeniTeyitSonTarihi(yetkiBitis, simdi);
    expect(yeni.getTime()).toBe(yetkiBitis.getTime());
  });

  it('yetki tam periyot gününde bitiyorsa yetki bitişini aşmaz', () => {
    const yetkiBitis = gun(TEYIT_PERIYODU_GUN);
    const yeni = yeniTeyitSonTarihi(yetkiBitis, simdi);
    expect(yeni.getTime()).toBeLessThanOrEqual(yetkiBitis.getTime());
  });
});

describe('teyitEdilebilirMi', () => {
  const temel = {
    ilanDurumu: 'YAYINDA',
    yetkiDurumu: 'GECERLI',
    yetkiBitis: gun(100),
    simdi,
  };

  it('yayındaki ilan teyit edilebilir', () => {
    expect(teyitEdilebilirMi(temel).edilebilir).toBe(true);
  });

  it('teyit bekleyen ilan da teyit edilebilir', () => {
    // Şikâyet eşiği ilanı TEYIT_BEKLIYOR'a alıyor; sahibinin
    // oradan çıkış yolu olmalı.
    expect(
      teyitEdilebilirMi({ ...temel, ilanDurumu: 'TEYIT_BEKLIYOR' }).edilebilir
    ).toBe(true);
  });

  it('pasif ilan teyit edilemez', () => {
    expect(teyitEdilebilirMi({ ...temel, ilanDurumu: 'PASIF' }).edilebilir).toBe(
      false
    );
  });

  it('yetkisi bitmiş ilan TEYİTLE DİRİLTİLEMEZ', () => {
    const s = teyitEdilebilirMi({ ...temel, yetkiBitis: gun(-1) });
    expect(s.edilebilir).toBe(false);
    expect(s.sebep).toMatch(/yetki/i);
  });

  it('yetki durumu GECERLI değilse teyit edilemez', () => {
    expect(
      teyitEdilebilirMi({ ...temel, yetkiDurumu: 'SURESI_DOLDU' }).edilebilir
    ).toBe(false);
  });
});

describe('pasiflesmeSebebi — ÖNCELİK SIRASI', () => {
  it('yetki bitişi teyitten ÖNCE gelir', () => {
    // Her ikisi de dolmuşsa yasal dayanak (yetki) raporlanmalı.
    // Kullanıcıya "teyit etmediniz" demek, asıl sebebi gizlemek olur.
    expect(
      pasiflesmeSebebi({ teyitSonTarih: gun(-5), yetkiBitis: gun(-1), simdi })
    ).toBe('YETKI_BITTI');
  });

  it('yalnızca teyit dolmuşsa TEYIT_EDILMEDI', () => {
    expect(
      pasiflesmeSebebi({ teyitSonTarih: gun(-1), yetkiBitis: gun(100), simdi })
    ).toBe('TEYIT_EDILMEDI');
  });

  it('ikisi de tazeyse sebep yok', () => {
    expect(
      pasiflesmeSebebi({ teyitSonTarih: gun(10), yetkiBitis: gun(100), simdi })
    ).toBeNull();
  });

  it('teyit tarihi yoksa TEYIT_EDILMEDI', () => {
    expect(
      pasiflesmeSebebi({ teyitSonTarih: null, yetkiBitis: gun(100), simdi })
    ).toBe('TEYIT_EDILMEDI');
  });
});
