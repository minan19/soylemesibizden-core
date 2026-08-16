# Mimari Kararı Belgesi (ADR-001)
**Söylemesi Bizden · v1.0 · 28 Temmuz 2026 (TRT)**

## Karar

**Modüler monolit.** Tek Next.js uygulaması, tek PostgreSQL veritabanı.
Mikroservisler *modül* olarak var; ayrı süreç olarak değil.

## Bağlam

Rakip: Sahibinden, Hepsiemlak, Emlakjet. Hedef: hayalet/mükerrer/yem ilan
sorununu yapısal olarak çözerek fark yaratmak.

Mevcut durum (28.07.2026):
- Sıfır yayınlanmış ilan
- Tek geliştirici
- EİDS Bakanlık erişimi henüz yok
- Mevcut kod tabanı "lüks/sovereign" konsepti üzerine kurulu

## Değerlendirilen alternatif

11 mikroservis + Kafka + Kubernetes + OpenSearch + gRPC.

**Reddedildi.** Gerekçeler:

1. **Mikroservis ölçek çözümü değil, ekip çözümüdür.** Asıl faydası, farklı
   ekiplerin birbirini beklemeden deploy edebilmesidir. Tek geliştiricide
   bu fayda sıfır; maliyeti (ağ hataları, dağıtık işlem tutarlılığı,
   11 deploy hattı, gözlemlenebilirlik altyapısı) tam.

2. **Postgres bu ölçekte fazlasıyla yeterli.** PostGIS coğrafi sorguyu,
   GIN indeks tam metin aramayı karşılar. 100.000 ilanda p95 < 300 ms
   ulaşılabilir. Sahibinden ~2M ilan seviyesinde; oraya gelindiğinde
   OpenSearch'e geçiş ~2 haftalık iştir, bugün kurmak ~2 aylık.

3. **EİDS kapısı her şeyin önünde.** Entegrasyon olmadan tek gerçek ilan
   yayınlanamaz. İçinde hiç ilan olmayan mükemmel altyapı, en pahalı
   başarısızlık biçimidir.

## Modül sınırları

Ayırma günü ucuz olsun diye sınırlar bugünden çiziliyor. Her modül kendi
klasöründe, kendi tablolarına sahip, diğerine yalnızca tanımlı arayüzden
erişir. Bugün fonksiyon çağrısı, yarın HTTP — çağrı yeri değişmez.

| Modül | Sorumluluk | Sahip olduğu tablolar |
|---|---|---|
| kimlik | Kullanıcı, oturum, rol | kullanici, emlak_ofisi |
| tasinmaz | Taşınmaz kaydı, konum | tasinmaz, mahalle |
| eids | Yetki doğrulama (dış sistem) | eids_yetki |
| ilan | İlan yaşam döngüsü, fiyat | ilan, fiyat_gecmisi |
| medya | Görsel, hash, mükerrer tespiti | medya |
| arama | Sorgu, filtre, sıralama | (okuma) |
| etkilesim | Favori, kayıtlı arama, mesaj, randevu | favori, kayitli_arama, mesaj, randevu |
| guven | Şikayet, moderasyon, sinyaller | sikayet |

## İstenen özelliklerin zamanlaması

Prompt'taki yeteneklerin hiçbirinden vazgeçilmedi; taşıyıcı altyapı
ölçeğe uyarlandı.

| Yetenek | Nasıl | Ne zaman |
|---|---|---|
| Property-first model | `Tasinmaz` merkez varlık | ✅ yapıldı |
| Ownership validation | EİDS adaptörü | FAZ 0 |
| Duplicate detection | `tasinmazNo @unique` + `algiHash` | ✅ şemada |
| Real price engine | `Mahalle.ortalamaM2Kurus` + `FiyatGecmisi` | FAZ 4 |
| Freshness / auto-deactivate | `teyitSonTarih` + zamanlanmış görev | FAZ 1 |
| Trust signals | Şikayet SLA + rozet + fiyat geçmişi | FAZ 3 |
| Search + geo | Postgres GIN + PostGIS | FAZ 2 |
| → OpenSearch | Ölçek gerektirdiğinde | 50.000+ ilan |
| → Kafka | Servis ayrımı gerçekten gerektiğinde | — |
| → Kubernetes | Tek sunucu yetmediğinde | — |

## Reddedilen özellik: sayısal güven skoru

Prompt "This listing is 87% reliable" istiyor. **Uygulanmayacak.**

Ölçülemeyen bir niteliğe iki haneli kesinlik atamak sahte güven üretir —
ve bu platformun tüm konumlandırması güvene dayandığı için, kendi
temelini çürütür.

Yerine **gerçek sinyaller** gösterilir:

> Malik doğrulandı · Fiyat 3 kez değişti · 12 gün önce teyit edildi ·
> Bu ofis şikayetleri ortalama 14 saatte kapatıyor

Kullanıcı kararını kendi verir. Bu, "no unrealized action reported as
done" ilkesinin ürün yüzeyindeki karşılığıdır.

## Sonuçlar

**Olumlu:** tek deploy, tek veritabanı işlemi, yerel geliştirme basit,
EİDS'e odak, geri dönüş ucuz.

**Olumsuz:** yatay ölçekleme sınırı tek uygulamada, ağır işler (görsel
hash) ana süreçle aynı yerde. Kabul edildi — ölçek geldiğinde modül
sınırları hazır olduğu için ayırma maliyeti düşük.

## Revizyon tablosu

| Sürüm | Tarih | Değişiklik | Onaylayan |
|---|---|---|---|
| v1.0 | 28.07.2026 (TRT) | İlk sürüm. Modüler monolit kararı, 8 modül sınırı, özellik zamanlaması. | — |

---
*Söylemesi Bizden · ADR-001 · v1.0 · 28 Temmuz 2026 (TRT)*
