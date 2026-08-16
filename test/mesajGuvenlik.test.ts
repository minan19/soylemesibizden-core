import { describe, it, expect } from 'vitest';
import { mesajDenetle, ibanMaskele } from '@/lib/mesajGuvenlik';

describe('mesajDenetle — IBAN', () => {
  it('düz IBAN yakalanır', () => {
    const d = mesajDenetle('Hesabım TR330006100519786457841326');
    expect(d.isaretler).toContain('IBAN');
    expect(d.uyariGoster).toBe(true);
  });

  it('boşluklu IBAN yakalanır', () => {
    const d = mesajDenetle('TR33 0006 1005 1978 6457 8413 26 numarasına gönderin');
    expect(d.isaretler).toContain('IBAN');
  });

  it('noktalı ve tireli IBAN yakalanır', () => {
    expect(
      mesajDenetle('TR33-0006-1005-1978-6457-8413-26').isaretler
    ).toContain('IBAN');
  });

  it('küçük harfli tr de yakalanır', () => {
    expect(mesajDenetle('tr330006100519786457841326').isaretler).toContain('IBAN');
  });

  it('eksik haneli dizi IBAN sayılmaz — yanlış pozitif üretmez', () => {
    // 24 haneden az: gecerli IBAN degil.
    expect(mesajDenetle('TR3300061005').isaretler).not.toContain('IBAN');
  });
});

describe('mesajDenetle — ödeme dili', () => {
  it('kapora ve yazım varyantları yakalanır', () => {
    for (const k of ['kapora', 'kaparo', 'kapara', 'depozito', 'ön ödeme']) {
      expect(mesajDenetle(`${k} istiyorlar`).uyariGoster).toBe(true);
    }
  });

  it('havale/EFT yakalanır', () => {
    expect(mesajDenetle('havale yapabilir misiniz').uyariGoster).toBe(true);
    expect(mesajDenetle('EFT ile gönderin').uyariGoster).toBe(true);
  });

  it('hesap bilgisi talebi yakalanır', () => {
    expect(mesajDenetle('hesap numaranızı verir misiniz').uyariGoster).toBe(true);
  });
});

describe('mesajDenetle — TELEFON ENGELLENMEZ', () => {
  it('telefon numarası uyarı üretmez', () => {
    // Kasitli karar: numara paylasimi serbest. Sürtünme yaratmak
    // kullaniciyi WhatsApp'a iter, tespit ise silahlanma yarisidir.
    const d = mesajDenetle('Beni 0532 111 22 33 numarasından arayın');
    expect(d.uyariGoster).toBe(false);
    expect(d.isaretler).toHaveLength(0);
  });

  it('adres ve randevu konuşması uyarı üretmez', () => {
    expect(
      mesajDenetle('Yarın saat 14:00 apartmanın önünde buluşalım.').uyariGoster
    ).toBe(false);
  });
});

describe('mesajDenetle — ACELE tek başına yetmez', () => {
  it('yalnızca aciliyet ifadesi uyarı üretmez', () => {
    // "hemen bakabilirim" masum bir cumledir. Aciliyet ancak
    // odeme diliyle BIRLIKTE anlamlidir.
    const d = mesajDenetle('Hemen bakabilirim, bugün içinde dönerim.');
    expect(d.isaretler).toContain('ACELE_BASKISI');
    expect(d.uyariGoster).toBe(false);
  });

  it('aciliyet + ödeme birlikte uyarı üretir', () => {
    const d = mesajDenetle('Acele edin, hemen kapora yatırmanız gerek.');
    expect(d.isaretler).toContain('ACELE_BASKISI');
    expect(d.isaretler).toContain('KAPORA');
    expect(d.uyariGoster).toBe(true);
  });
});

describe('mesajDenetle — boş ve sıradan içerik', () => {
  it('boş mesaj uyarı üretmez', () => {
    expect(mesajDenetle('').uyariGoster).toBe(false);
  });

  it('sıradan soru uyarı üretmez', () => {
    expect(
      mesajDenetle('Merhaba, daire hâlâ müsait mi? Aidat ne kadar?').uyariGoster
    ).toBe(false);
  });
});

describe('ibanMaskele', () => {
  it('IBAN ortasını maskeler, uç haneleri bırakır', () => {
    // Ham IBAN'i denetim kaydina yazmak kisisel finansal veriyi
    // gereksiz cogaltmak olur; eslestirmeye uc haneler yeter.
    const m = ibanMaskele('TR330006100519786457841326');
    expect(m).toContain('TR3300');
    expect(m).toContain('1326');
    expect(m).not.toContain('0006100519786457');
    expect(m).toContain('*');
  });

  it('boşluklu IBAN\'ı da maskeler', () => {
    const m = ibanMaskele('Kapora için TR33 0006 1005 1978 6457 8413 26 hesabına');
    expect(/TR\d{24}/.test(m.replace(/\s/g, ''))).toBe(false);
    expect(m).toContain('TR3300');
  });

  it('IBAN yoksa metni AYNEN bırakır', () => {
    // İlk yazımda bu fonksiyon tüm boşlukları siliyordu ve denetim
    // kaydı okunmaz hale geliyordu. Daha kötüsü: ilk test bu hatalı
    // davranışı "doğru" diye kaydetmişti. Test de yanılabilir.
    expect(ibanMaskele('kapora istiyorlar')).toBe('kapora istiyorlar');
  });

  it('maskeleme metnin geri kalanını korur', () => {
    const m = ibanMaskele('Kapora için TR330006100519786457841326 hesabına yatırın');
    expect(m.startsWith('Kapora için ')).toBe(true);
    expect(m.endsWith(' hesabına yatırın')).toBe(true);
  });
});

/**
 * ÖZELLİK TESTLERİ
 *
 * Tek bir girdi–çıktı çifti doğrulamak, o çiftin doğru olduğunu
 * varsaymayı gerektirir. ibanMaskele'de tam olarak bu yüzden hata
 * yaptım: çıktıya bakıp beklentiyi ona uydurdum.
 *
 * Özellik testi bu tuzağı kapatır: çıktının NE OLDUĞUNU değil,
 * NE SAĞLAMASI GEREKTİĞİNİ doğrular. Çok sayıda girdi üzerinde
 * çalıştığı için tek bir yanlış beklenti kaydedilemez.
 */
describe('ibanMaskele — ÖZELLİKLER', () => {
  // Farklı yazım biçimleriyle aynı IBAN + çevresinde metin
  const govdeler = [
    'TR330006100519786457841326',
    'TR33 0006 1005 1978 6457 8413 26',
    'TR33-0006-1005-1978-6457-8413-26',
    'tr330006100519786457841326',
    'TR33.0006.1005.1978.6457.8413.26',
  ];
  const cerceveler = [
    (i: string) => i,
    (i: string) => `Kapora için ${i} hesabına yatırın`,
    (i: string) => `${i} — acele`,
    (i: string) => `Merhaba.\nHesap: ${i}\nTeşekkürler.`,
  ];

  it('ÖZELLİK 1: çıktıda geçerli IBAN kalmaz', () => {
    // Güvenlik özelliği. Bu bozulursa ham finansal veri denetim
    // kaydına sızar.
    for (const g of govdeler) {
      for (const c of cerceveler) {
        const cikti = ibanMaskele(c(g));
        const sikistirilmis = cikti.replace(/[\s.\-–—]/g, '');
        expect(/TR\d{24}/i.test(sikistirilmis)).toBe(false);
      }
    }
  });

  it('ÖZELLİK 2: IBAN dışındaki metin aynen korunur', () => {
    // Okunabilirlik özelliği. İlk yazımda bu bozuktu: fonksiyon
    // tüm boşlukları siliyor, kayıt okunmaz hale geliyordu.
    for (const c of cerceveler) {
      const metin = c('TR330006100519786457841326');
      const cikti = ibanMaskele(metin);
      const ibansizGirdi = metin.replace(/TR[\s.\-–—\d]*\d/g, '');
      const ibansizCikti = cikti.replace(/TR[\dA-Za-z*]+/g, '');
      expect(ibansizCikti).toBe(ibansizGirdi.replace(/TR[\dA-Za-z*]+/g, ''));
    }
  });

  it('ÖZELLİK 3: IBAN içermeyen metin hiç değişmez', () => {
    const masumlar = [
      'kapora istiyorlar',
      'Yarın 14:00 buluşalım.',
      'Beni 0532 111 22 33 ten arayın',
      '',
      'TR ile başlayan bir cümle ama IBAN yok',
    ];
    for (const m of masumlar) {
      expect(ibanMaskele(m)).toBe(m);
    }
  });

  it('ÖZELLİK 4: iki kez maskelemek sonucu değiştirmez', () => {
    // Idempotans. Denetim kaydı yeniden işlenirse bozulmamalı.
    for (const g of govdeler) {
      const bir = ibanMaskele(`Hesap: ${g}`);
      expect(ibanMaskele(bir)).toBe(bir);
    }
  });
});

describe('mesajDenetle — ÖZELLİKLER', () => {
  it('ÖZELLİK: IBAN içeren her yazım biçimi uyarı üretir', () => {
    // Yazım varyantı bir kaçış yolu OLMAMALI.
    const varyantlar = [
      'TR330006100519786457841326',
      'TR33 0006 1005 1978 6457 8413 26',
      'tr33-0006-1005-1978-6457-8413-26',
      'TR33.0006.1005.1978.6457.8413.26',
    ];
    for (const v of varyantlar) {
      expect(mesajDenetle(`Şuraya gönderin: ${v}`).uyariGoster).toBe(true);
    }
  });

  it('ÖZELLİK: uyarı üretilen her mesajda uyarı metni de vardır', () => {
    // uyariGoster true ama uyariMetni null olan bir durum, arayüzde
    // sessizce hiçbir şey göstermemek demek olurdu.
    const ornekler = ['kapora', 'havale yapın', 'TR330006100519786457841326'];
    for (const o of ornekler) {
      const d = mesajDenetle(o);
      if (d.uyariGoster) expect(d.uyariMetni).toBeTruthy();
      else expect(d.uyariMetni).toBeNull();
    }
  });
});
