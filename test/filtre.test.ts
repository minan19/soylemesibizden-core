import { describe, it, expect } from 'vitest';
import { filtreCoz, filtreUrl, aktifFiltreSayisi, SIRALAMALAR } from '@/lib/ilanFiltre';

/**
 * Filtre dogrulamasi BEYAZ LISTE mantigiyla calisir: taninmayan
 * her deger sessizce yok sayilir. Bu, arama katmaninin ham SQL
 * kullandigi icin kritik — gecersiz bir siralama degeri sorguya
 * sizarsa orasi bir enjeksiyon yuzeyi olur.
 */

describe('filtreCoz — beyaz liste', () => {
  it('boş girdide varsayılanları verir', () => {
    const f = filtreCoz({});
    expect(f.siralama).toBe('yayin-yeni');
    expect(f.sayfa).toBe(1);
    expect(aktifFiltreSayisi(f)).toBe(0);
  });

  it('geçersiz sıralamayı YOK SAYAR', () => {
    expect(filtreCoz({ sirala: "'; DROP TABLE ilan; --" }).siralama).toBe('yayin-yeni');
    expect(filtreCoz({ sirala: 'hacker' }).siralama).toBe('yayin-yeni');
  });

  it('geçerli sıralamayı kabul eder', () => {
    for (const k of Object.keys(SIRALAMALAR)) {
      expect(filtreCoz({ sirala: k }).siralama).toBe(k);
    }
  });

  it('geçersiz ilan türünü yok sayar', () => {
    expect(filtreCoz({ turu: 'HACKED' }).turu).toBeUndefined();
    expect(filtreCoz({ turu: 'satilik' }).turu).toBe('SATILIK'); // küçük harf kabul
  });

  it('geçersiz taşınmaz tipini yok sayar', () => {
    expect(filtreCoz({ tipi: 'VILLA' }).tipi).toBeUndefined();
    expect(filtreCoz({ tipi: 'konut' }).tipi).toBe('KONUT');
  });

  it('sayı alanlarından rakam dışını temizler', () => {
    expect(filtreCoz({ enaz: '2.500.000 TL' }).enAzLira).toBe(2500000);
    expect(filtreCoz({ enaz: 'abc' }).enAzLira).toBeUndefined();
  });

  it('m² sınırlarını aşan değeri reddeder', () => {
    expect(filtreCoz({ m2az: '999999' }).enAzM2).toBeUndefined();
    expect(filtreCoz({ m2az: '80' }).enAzM2).toBe(80);
  });

  it('sayfa en az 1 olur', () => {
    expect(filtreCoz({ sayfa: '0' }).sayfa).toBe(1);
    expect(filtreCoz({ sayfa: '-5' }).sayfa).toBe(1);
  });

  it('uzun metni keser', () => {
    expect(filtreCoz({ q: 'a'.repeat(500) }).q?.length).toBe(100);
  });

  it('dizi parametrede ilkini alır', () => {
    expect(filtreCoz({ ilce: ['Kadıköy', 'Beşiktaş'] }).ilce).toBe('Kadıköy');
  });
});

describe('filtreUrl — gidiş dönüş', () => {
  it('boş filtre boş dize üretir', () => {
    expect(filtreUrl(filtreCoz({}))).toBe('');
  });

  it('varsayılan sıralama ve sayfa URL\'e yazılmaz', () => {
    const url = filtreUrl(filtreCoz({ ilce: 'Çorlu' }));
    expect(url).not.toContain('sirala');
    expect(url).not.toContain('sayfa');
  });

  it('çöz → url → çöz döngüsü kriterleri korur', () => {
    const girdi = {
      ilce: 'Kadıköy', turu: 'SATILIK', enaz: '2000000',
      encok: '5000000', m2az: '60', oda: '3+1', sirala: 'fiyat-dusen',
    };
    const bir = filtreCoz(girdi);
    const url = filtreUrl(bir);
    const iki = filtreCoz(Object.fromEntries(new URLSearchParams(url.slice(1))));
    expect(iki).toEqual(bir);
  });
});

describe('aktifFiltreSayisi', () => {
  it('sıralama ve sayfa filtre sayılmaz', () => {
    // Kullanıcıya "1 filtre etkin" demek, o sadece sıralamayı
    // değiştirdiyse yanıltıcı olur.
    expect(aktifFiltreSayisi(filtreCoz({ sirala: 'fiyat-artan', sayfa: '3' }))).toBe(0);
  });

  it('kriterleri sayar', () => {
    expect(aktifFiltreSayisi(filtreCoz({ ilce: 'Çorlu', turu: 'SATILIK' }))).toBe(2);
  });
});
