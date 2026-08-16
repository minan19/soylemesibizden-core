# Risk Kaydı ve Yapılacaklar
**Söylemesi Bizden · 16 Ağustos 2026 (TRT)**

Bu dosya durum raporundan ayrıdır. Rapor **anlatır**, bu kayıt
**izlenir**. Her riskin bir eylemi, bir sahibi ve bir durumu vardır.

Kapanan madde silinmez, üstü çizilir — neden kapandığı da bilgidir.

**Sahip sütunu:** `SEN` = benim yapamayacağım · `BEN` = kod tarafı ·
`İKİ` = birlikte

---

## 🔴 K — Kritik yol

| # | Risk | Eylem | Sahip | Engel | Durum |
|---|---|---|---|---|---|
| K1 | Şirket yok; EİDS erişimi alınamaz, tek gerçek ilan yayınlanamaz | Limited şirket kuruluşu → vergi levhası | SEN | — | **AÇIK** |
| K2 | EİDS firma kodu yok | `eids@ticaret.gov.tr` başvurusu | SEN | K1 | **BEKLİYOR** |
| K3 | `lib/eids/gercek.ts` yazılmadı; mock production'da reddediliyor | Bakanlık erişimi gelince yaz | BEN | K2 | **BEKLİYOR** |

> K1 çözülmeden K2 ve K3 başlayamaz. Kod ilerledikçe bu risk
> **azalmıyor**, bekleyen iş büyüyor.

---

## 🔴 D — Dağıtım engelleri

Bunlar bugün canlıya çıkmayı **imkânsız** kılıyor. Deploy kapalı
olduğu için acil değil ama açılmadan önce hepsi kapanmalı.

| # | Risk | Eylem | Sahip | Durum |
|---|---|---|---|---|
| D1 | **Prod DB v1 şemasında, kod v2 bekliyor.** Şu an deploy edilse uygulama tamamen çalışmaz | Yeni Neon branch (`v2-main`) + `migrate deploy` | İKİ | **AÇIK** |
| D2 | `CRON_SECRET` boş → iki cron ucu da 503 döner, otomatik pasifleşme çalışmaz | Vercel env'e güçlü bir değer ekle | SEN | **AÇIK** |
| D3 | `UPSTASH_*` boş → rate limit prod'da **fail-closed**, tüm istekler reddedilir | Upstash Redis kur veya limiti yeniden düşün | SEN | **AÇIK** |
| D4 | `BLOB_READ_WRITE_TOKEN` boş → görsel yüklenemez (503) | Vercel Blob etkinleştir | SEN | **AÇIK** |
| D5 | `SMTP_*` boş → kayıtlı arama bildirimi gönderilmez | SMTP sağlayıcı | SEN | **AÇIK** |
| D6 | Vercel domain projeden ayrık | Ne zaman yeniden açılacak? Karar | SEN | **AÇIK** |
| D7 | `main` dalı 18 commit geride; PR açılmadı | PR aç ve gözden geçir | SEN | **AÇIK** |

> **D3 sinsi:** Upstash yoksa `checkRateLimit` production'da
> `success: false` döner ve **her istek 429 alır**. Test sırasında
> tetiklendi ve doğru davranış olduğu doğrulandı — ama canlıda
> Upstash'siz açılırsa site tamamen kilitlenir.

---

## 🟠 S — Stratejik / ticari

| # | Risk | Eylem | Sahip | Tarih | Durum |
|---|---|---|---|---|---|
| S1 | Doping satmama kararı verilmedi; gelir modelinin bel kemiği | Karar ver | SEN | — | **AÇIK** |
| S2 | Güvenli Ödeme Sistemi 1 Eki 2026'da zorunlu; kimse konumlanmadı | Fırsatı kullan (K1'e bağlı) | SEN | **1 Eki** | **AÇIK** |
| S3 | Yetki belgesi yıllık harcı (20–40 bin TL) KOBİ ofisleri sıkıştırıyor | Hedef segment olarak seçilsin mi | SEN | — | **AÇIK** |
| S4 | Emlakjet karar-desteği kapısını kapattı | ~~O kapıyı zorla~~ → Kademe 1'e odaklanıldı | — | — | ~~KAPANDI~~ |
| S5 | Kapsam belirsizdi | ~~Karar~~ → sistem tüm TR'ye açık, odak tek koridor | — | — | ~~KAPANDI~~ |
| S6 | Ölçüm yok; "1. sıra" hedefi yönetilemez | Analytics (çerezsiz seçenek) | BEN | — | **AÇIK** |

---

## 🟡 G — Güvenlik ve kalite

| # | Risk | Eylem | Sahip | Durum |
|---|---|---|---|---|
| G1 | CSP `Report-Only`; zorunlu değil | 1.026 inline style Tailwind'e taşınsın, sonra zorunlu yap | BEN | **AÇIK** |
| G2 | Gerçek görsel yüklemesi hiç test edilmedi | Blob token gelince uçtan uca dene | İKİ | D4'e bağlı |
| G3 | ~~Birim testi yok~~ | ~~106 test + 10 mutasyon~~ | — | ~~KAPANDI~~ |
| G4 | dHash eşikleri sentetik görselle ayarlandı | Gerçek fotoğraf setiyle kalibre et | BEN | **AÇIK** |
| G5 | API rotaları için otomatik test yok; elle doğrulanıyor | Rota testleri (gölge DB ile) | BEN | **AÇIK** |
| G6 | Testin hatayı doğru sayması | ~~Özellik testi + mutasyon + KURALLAR.md + CC 8/9~~ | — | ~~KAPANDI~~ |
| G7 | `.env` ve `.env.local` diskte açık; içinde `DATABASE_URL`, `NEXTAUTH_SECRET` | Makine paylaşımlıysa anahtarları döndür | SEN | **DEĞERLENDİR** |
| G8 | 11 dal birleşmemiş; içlerinde görünmeyen iş olabilir | Tek tek incele, taşı veya sil | İKİ | **AÇIK** |

---

## 🟡 U — Ürün ve arayüz

| # | Eksik | Eylem | Sahip | Durum |
|---|---|---|---|---|
| U1 | Mesajlaşma ekranı yok (API var) | Yaz | BEN | **AÇIK** |
| U2 | Favorilerim / aramalarım ekranı yok (API var) | Yaz | BEN | **AÇIK** |
| U3 | Randevu — ziyaretçi tarafı ekranı yok | Yaz | BEN | **AÇIK** |
| U4 | Şikâyet formu yok (API var) | Yaz | BEN | **AÇIK** |
| U5 | Mobil: 1.026 inline style, 29 responsive prefix | Tailwind'e taşı | BEN | **AÇIK** |
| U6 | Görsel yükleme arayüzü yok | Yaz | BEN | D4'e bağlı |

---

## ⚪ E — Erişim engelleri (kod tarafında çözülemez)

| # | Konu | Durum |
|---|---|---|
| E1 | AFAD deprem verisi e-Devlet girişi istiyor | Kurumsal başvuru gerekli. `lib/zemin` sözleşmesi hazır, **mock yok** — uydurma PGA gerçeğinden zararlı |
| E2 | TTBS yetki belgesi sorgusu CAPTCHA korumalı | Otomatik doğrulama **yapılmayacak**. Biçim + süre kendimiz takip ediyoruz, kullanıcıya resmî sorgu bağlantısı veriliyor |

---

## Özet

```
AÇIK        24
BEKLİYOR     2   (K1'e bağlı)
KAPANDI      4
```

**Bugün yapılabilecek, kod gerektirmeyen üç şey:**

1. **K1** — şirket kuruluşunu başlat *(diğer her şeyin önkoşulu)*
2. **S1** — doping kararı *(gelir modelinin bel kemiği)*
3. **D2** — `CRON_SECRET` üret ve Vercel'e ekle *(5 dakika)*

**Benim sıradaki işim:** U1 → U2 → U4 → G5

---

## Bu kaydın kuralı

Yeni bir risk fark edildiğinde **buraya yazılır**, sohbette
söylenip geçilmez. Durum raporu bu kayıttan türetilir, tersi
değil.

---
*Söylemesi Bizden · Risk Kaydı · 16.08.2026 (TRT)*
