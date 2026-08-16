import { describe, it, expect } from 'vitest';
import {
  kurus, kurusKisa, m2Fiyat, iyelik,
  fiyatDegisimi, tazelik, yayindaSure,
} from '@/lib/bicim';

describe('kurus — PARA KURALI (CC #6)', () => {
  it('kuruşu liraya çevirir ve Türkçe ayraçla yazar', () => {
    expect(kurus(1_275_000_000n)).toBe('12.750.000 ₺');
  });

  it('sıfır kuruşu doğru yazar', () => {
    expect(kurus(0n)).toBe('0 ₺');
  });

  it('null/undefined için tire döner — 0 TL DEMEZ', () => {
    // "0 ₺" yazmak, fiyatı olmayan ilanı bedava göstermek olurdu.
    expect(kurus(null)).toBe('—');
    expect(kurus(undefined)).toBe('—');
  });

  it('küsuratlı kuruşu aşağı yuvarlar, Number\'a düşmez', () => {
    // 1.234.567 kuruş = 12.345,67 TL -> tam sayı lira: 12.345
    expect(kurus(1_234_567n)).toBe('12.345 ₺');
  });

  it('çok büyük tutarlarda hassasiyet kaybetmez', () => {
    // Number.MAX_SAFE_INTEGER üzerindeki bir tutar.
    // Float kullanılsaydı bu test kırılırdı.
    const cokBuyuk = 12_345_678_901_234_567_890n; // kuruş
    expect(kurus(cokBuyuk)).toBe('123.456.789.012.345.678 ₺');
  });
});

describe('kurusKisa', () => {
  it('milyarı kısaltır', () => {
    // 2.500.000.000 kuruş = 2,5 milyar TL. Ondalık tam, yorum yok.
    expect(kurusKisa(250_000_000_000n)).toBe('2,5 Mr ₺');
  });

  it('tam milyonda gereksiz ondalık yazmaz', () => {
    expect(kurusKisa(1_000_000_000n)).toBe('10 Mn ₺');
  });

  it('ondalıkta AŞAĞI KESER, yuvarlamaz — bilinçli seçim', () => {
    // 12.750.000 TL tek ondalıkla 12,7 mi 12,8 mi?
    //
    // Bu gereksinimde belirtilmemişti; testi yazarken çıktıya
    // bakıp "12,7" yazmak, ibanMaskele'de düştüğüm hatanın aynısı
    // olurdu. Bu yüzden KARARI BURADA VERİYORUM ve gerekçesini
    // yazıyorum:
    //
    // Aşağı kesme seçildi. Gayrimenkulde fiyatı olduğundan yüksek
    // göstermek, düşük göstermekten daha zararlıdır; kullanıcı
    // kartta gördüğü rakamın altını değil üstünü sürpriz saymalı.
    // Tam fiyat zaten kartta ve detayda ayrıca gösteriliyor.
    expect(kurusKisa(1_275_000_000n)).toBe('12,7 Mn ₺');
    expect(kurusKisa(1_299_000_000n)).toBe('12,9 Mn ₺'); // 12,99 -> 12,9
  });
});

describe('m2Fiyat', () => {
  it('m² başına fiyatı hesaplar', () => {
    // 12.750.000 TL / 142 m² = 89.788 TL/m²
    expect(m2Fiyat(1_275_000_000n, 142)).toBe('89.788 ₺/m²');
  });

  it('m² sıfır veya yoksa tire döner — sıfıra bölme yok', () => {
    expect(m2Fiyat(1_000_000n, 0)).toBe('—');
    expect(m2Fiyat(1_000_000n, null)).toBe('—');
    expect(m2Fiyat(null, 100)).toBe('—');
  });
});

describe('iyelik — TÜRKÇE EK', () => {
  it('birler basamağına göre doğru ek verir', () => {
    expect(iyelik(1)).toBe("1'i");
    expect(iyelik(2)).toBe("2'si");
    expect(iyelik(4)).toBe("4'ü");
    expect(iyelik(6)).toBe("6'sı");
    expect(iyelik(9)).toBe("9'u");
  });

  it('onlar basamağını doğru okur', () => {
    expect(iyelik(10)).toBe("10'u");
    expect(iyelik(20)).toBe("20'si");
    expect(iyelik(40)).toBe("40'ı");
  });

  it('yüz ve bin için doğru ek verir', () => {
    expect(iyelik(100)).toBe("100'ü");
    expect(iyelik(1000)).toBe("1000'i");
  });

  it('bileşik sayıda son basamağa bakar', () => {
    expect(iyelik(247)).toBe("247'si");
    expect(iyelik(12)).toBe("12'si");
  });
});

describe('fiyatDegisimi', () => {
  it('düşüşü yüzde olarak hesaplar', () => {
    const d = fiyatDegisimi(1_000_000n, 900_000n);
    expect(d?.yon).toBe('dusus');
    expect(d?.yuzde).toBeCloseTo(-10, 1);
  });

  it('artışı işaretle gösterir', () => {
    const d = fiyatDegisimi(1_000_000n, 1_100_000n);
    expect(d?.yon).toBe('artis');
    expect(d?.metin.startsWith('+')).toBe(true);
  });

  it('eski fiyat yoksa null — ilk kayıt "değişim" değildir', () => {
    expect(fiyatDegisimi(null, 500_000n)).toBeNull();
  });

  it('eski fiyat sıfırsa null — sıfıra bölme yok', () => {
    expect(fiyatDegisimi(0n, 500_000n)).toBeNull();
  });
});

describe('tazelik', () => {
  const gun = (n: number) => new Date(Date.now() + n * 86_400_000);

  it('tarih yoksa bilinmiyor', () => {
    expect(tazelik(null)).toBe('bilinmiyor');
  });
  it('geçmiş tarih gecti', () => {
    expect(tazelik(gun(-1))).toBe('gecti');
  });
  it('7 gün içinde yaklasiyor', () => {
    expect(tazelik(gun(3))).toBe('yaklasiyor');
  });
  it('uzak tarih taze', () => {
    expect(tazelik(gun(20))).toBe('taze');
  });
});

describe('yayindaSure', () => {
  it('yayın tarihi yoksa açıkça söyler', () => {
    expect(yayindaSure(null)).toBe('yayında değil');
  });
  it('gün sayısını yazar', () => {
    const on = new Date(Date.now() - 10 * 86_400_000);
    expect(yayindaSure(on)).toBe('10 gündür yayında');
  });
});
