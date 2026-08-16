# Test Yazım Kuralları
**Söylemesi Bizden · 15 Ağustos 2026 (TRT)**

Bu dosya bir üslup rehberi değil. **Gerçekleşmiş bir hatanın** ardından
yazıldı ve o hatanın tekrarını engellemek için var.

---

## Olan şey

`lib/mesajGuvenlik.ts` içindeki `ibanMaskele()` hatalı yazıldı: IBAN'ı
maskelemeden önce metindeki **tüm boşlukları siliyordu**. Denetim kaydı
`"KaporaicinTR3300****1326hesabina..."` gibi okunmaz hale geliyordu.

Asıl sorun bu değil. Asıl sorun şu: **testi de o hatalı davranışı doğru
diye kaydetti.**

```ts
// HATALI TEST — hatayı doğru sayıyor
it('IBAN yoksa metni bozmaz', () => {
  expect(ibanMaskele('kapora istiyorlar')).toBe('kaporaistiyorlar');
});
```

Test yeşil yanıyordu. 98 test geçiyordu. Hiçbiri bu hatayı göstermedi
çünkü hatayı yazan test, hatanın kendisiydi.

## Kök neden

Sıra yanlıştı:

```
1. Fonksiyon yazıldı
2. Çalıştırıldı, çıktısına bakıldı
3. Test o çıktıya göre yazıldı        ← HATA
```

Beklenti **gereksinimden** değil **uygulamadan** türetildi. Böyle bir
test hiçbir şey doğrulamaz; mevcut davranışın fotoğrafını çeker ve
"niyet buydu" diye etiketler.

**Ayırt edici işaret:** o testin başında NEDEN açıklaması yoktu.
Yorumlu yazılan testlerin hepsi doğru çıktı — çünkü yorum yazmak,
gereksinimi düşünmeye zorluyor.

---

## Kurallar

### 1. Beklentiyi koddan ÖNCE yaz

Testin beklediği değeri, fonksiyonu çalıştırmadan belirle. Belirleyemiyorsan
gereksinim net değil demektir; önce onu netleştir.

### 2. Her `it()` NEDEN'i yazar

Testin başında, korunan gereksinim tek cümleyle açıklanır. Açıklama
yazamıyorsan o test bir gereksinimi korumuyordur.

```ts
// ✗ yorumsuz — gereksinim belirsiz
it('doğru döner', () => { ... });

// ✓ gereksinim açık
it('yetkisi bitmiş ilan TEYİTLE DİRİLTİLEMEZ', () => {
  // Bozulursa EİDS kapısının etrafından dolaşılır.
  ...
});
```

### 3. Belirtilmemiş bir davranışla karşılaşırsan KARARI VER ve YAZ

Çıktıya bakıp "herhâlde böyle olmalı" deme. Örnek: `kurusKisa()` ondalıkta
yuvarlıyor mu kesiyor mu? Gereksinimde yoktu. Karar testte verildi ve
gerekçesi yazıldı — çünkü gerekçesiz bir sayı, sonraki kişi için yine
"uygulamanın çıktısı" olur.

### 4. Uygulama detayını değil GEREKSİNİMİ doğrula

```ts
// ✗ sentinel değer bir uygulama tercihi
expect(hammingMesafesi('abc', 'abcd')).toBe(Number.MAX_SAFE_INTEGER);

// ✓ gereksinim: farklı uzunluk benzer sayılmamalı
expect(hammingMesafesi('abc', 'abcd')).toBeGreaterThan(64);
expect(benzerlik('abc', 'abcd')).toBe('farkli');
```

### 5. Güvenlik kritik fonksiyonlarda ÖZELLİK doğrula

Tek girdi–çıktı çifti, o çiftin doğru olduğunu varsaymayı gerektirir.
Özellik testi bu varsayımı ortadan kaldırır: çıktının **ne olduğunu**
değil **ne sağlaması gerektiğini** doğrular.

`ibanMaskele` için dört özellik:

1. Çıktıda geçerli IBAN kalmaz *(güvenlik)*
2. IBAN dışındaki metin aynen korunur *(okunabilirlik)*
3. IBAN içermeyen metin hiç değişmez
4. İki kez maskelemek sonucu değiştirmez *(idempotans)*

Bunlar çok sayıda girdi üzerinde çalışır; tek bir yanlış beklenti
kaydedilemez.

### 6. Testin kendisi de yanılabilir — mutasyonla sına

```bash
npm run test:mutasyon
```

Kritik kuralları bilerek bozar ve testlerin yakaladığını doğrular.
**Hayatta kalan mutasyon = korumasız kural.**

Yeni bir güven kuralı eklendiğinde `test/mutasyon.mjs` listesine
karşılık gelen mutasyon da eklenir. Mutasyon "ATLANDI" derse hedef kod
değişmiş demektir; liste güncellenmelidir.

---

## Kapsam

Test edilen: `lib/` altındaki **saf mantık** — veritabanı ve HTTP
bilmeyen modüller.

Test edilmeyen: API rotaları ve sayfalar. Bunlar gölge veritabanında
gerçek HTTP isteğiyle doğrulanır. İkisini karıştırmak, kurulumu
ağırlaştırıp kimsenin çalıştırmadığı bir takım üretir.

---

## Çalıştırma

```bash
npm test              # 106 test, ~200 ms
npm run test:izle     # değişiklikte otomatik
npm run test:mutasyon # 10 mutasyon, testleri sınar
```

---
*Bu dosya bir hatanın ardından yazıldı. Silinmemeli.*
