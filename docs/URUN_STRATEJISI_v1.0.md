# SÖYLEMESİ BİZDEN — Ürün Stratejisi ve Yol Haritası
**v1.0 · 25 Temmuz 2026 (TRT)**

> Kapsam: Sahibinden.com / Hepsiemlak sınıfında bir gayrimenkul ilan platformu olma hedefi.
> Bu belge stratejik çerçeve + faz planıdır. Kod kararları buradan türetilir.

---

## 0. YÖNETİCİ ÖZETİ

Üç tespit stratejinin tamamını belirliyor:

1. **Yasal kapı (BLOCKER):** 15 Şubat 2026'dan itibaren Türkiye'de gayrimenkul ilanı
   yayınlamak için EİDS (Elektronik İlan Doğrulama Sistemi) entegrasyonu **zorunlu**.
   Entegrasyon olmadan tek bir gerçek ilan yayınlanamaz. Bu bir "özellik" değil, ruhsattır.
2. **Rakiplerin gerçek zaafı özellik eksikliği değil, GÜVEN.** Şikayet verisi tek bir şeyi
   gösteriyor: hayalet ilan, süresi dolmuş ilan, mükerrer ilan, emlakçının "sahibinden"
   gibi görünmesi, yapay zekâ ile üretilmiş görseller, yanlış konum, yem ilan.
3. **Bu zaaf yapısaldır, çözülemez.** Rakiplerin geliri **ilan adedine** bağlı. İlan
   çöplüğünü temizlemek kendi gelirlerini kesmek demek. Bizim gelirimizi **sonuca**
   bağlarsak, kalite ile gelir aynı yöne bakar. Kopyalayamayacakları fark budur.

**Konumlandırma cümlesi:** *"Söylemesi Bizden — burada gördüğün ilan gerçekten var,
gerçekten satılık ve fiyatı gerçekten bu."*

---

## 1. YASAL KAPI — EİDS (FAZ 0, her şeyin önkoşulu)

**Mevzuat zinciri:**
- 31.08.2023 — Taşınmaz Ticareti Hakkında Yönetmelik değişikliği: ilan platformlarına
  kimlik + yetki doğrulama yükümlülüğü.
- 01.11.2023 — 1. aşama: kimlik doğrulama (E-Devlet SSO üzerinden).
- 15.09.2024 — 2. aşama: yetki doğrulama.
- 01–15.02.2026 — tüm gayrimenkul ilanları için **zorunlu** hale geldi.

**Sonuç:** İlan yalnızca (a) malikin kendisi, (b) 1./2. derece kan hısmı veya eşi,
(c) malikin e-Devlet'ten yetkilendirdiği, Taşınmaz Ticareti Yetki Belgesi sahibi
emlak işletmesi tarafından verilebilir. İlan girişinde **taşınmaz numarası** zorunlu.

**Platformun yapması gerekenler:**
- Ticaret Bakanlığı'ndan Firma Kodu + Basic Auth kimlik bilgileri + **IP bazlı yetki**
  (başvuru: `eids@ticaret.gov.tr`).
- Kurumsal evrak: MERSİS kaydı, vergi levhası, ticaret sicil gazetesi, imza sirküleri.
- E-Devlet SSO akışı: `returnUrl?kullaniciKodu=...&durum=...`
- İlan yayınlamadan **önce** yetki sorgusu; süre bitiminde ilanın **otomatik kaldırılması**.

**Doğrulanması gereken (varsayım değil):** yeni/küçük bir platformun EİDS erişim
başvurusunun kabul koşulları ve süresi. Bu, Bakanlık ile doğrudan yazışma gerektirir.
Teknik mimari bu cevaba göre kesinleşir.

> ⚠️ FAZ 0 tamamlanmadan yapılacak her ilan özelliği, gerçek veri olmadan çalışan
> bir demo olur. Bu projede daha önce "teatral bileşen" sorunu yaşandı — tekrarlamayalım.

---

## 2. RAKİP BOŞLUK HARİTASI (şikayet temelli, uydurma değil)

| Kullanıcının yaşadığı sorun | Bizim yapısal cevabımız |
|---|---|
| Aylar önce tutulmuş ilan hâlâ yayında | **Canlılık Teyidi**: periyodik zorunlu teyit; teyit yoksa ilan otomatik pasifleşir |
| Emlakçı kendini "sahibinden" gösteriyor | **EİDS rol rozeti**: Malik / Hısım / Yetkili İşletme — kullanıcı yazamaz, sistem yazar |
| Aynı daire 5 ofis tarafından kopyalanmış | **Taşınmaz numarası bazlı tekilleştirme**: bir taşınmaz = bir kart, ofisler kartın altında listelenir |
| Fotoğraflar yapay zekâ üretimi / başka eve ait | **Görsel bütünlük**: perceptual hash ile mükerrer görsel tespiti + AI-üretim şüphe işareti |
| İlandaki fiyat gerçek fiyat değil | **Fiyat geçmişi şeffaf**: her fiyat değişimi kalıcı ve herkese açık |
| Konum/adres gerçeği yansıtmıyor | **Doğrulanmış konum**: ada/parsel eşleşmesi, elle serbest pin yok |
| Yem ilan — gidince başka ev gösteriliyor | **Gösterim kaydı + gösterim sonrası doğrulama**; tekrarlayan şikâyette ofis skoru düşer |
| İlan kaldırılmıyor, şikâyete cevap yok | **Şikâyet SLA'sı açık**: kaç saatte kapandığı ofis profilinde görünür |

---

## 3. GELİR MODELİ — ASIL FARK BURADA

Rakip model: ilan başına ücret + öne çıkarma (doping). Teşvik → çok ilan, kalite umursanmaz.

Önerilen model (kademeli):
1. **Bireysel malik için ilan ücretsiz.** (Arz tarafını çekmenin en hızlı yolu; EİDS
   zaten sahteyi eliyor, bedava olması çöpü artırmıyor.)
2. **Emlak ofisi aboneliği**, ilan adedine değil **performansa** bağlı kademeler.
3. **Doğrulanmış talep (lead) satışı**: kimliği doğrulanmış, niyeti teyit edilmiş alıcı.
4. **Sonuç ücreti / hizmet pazarı**: ekspertiz, tapu danışmanlığı, kredi karşılaştırma,
   taşınma, tadilat — işlem etrafındaki gerçek ihtiyaçlar.

Doping satmıyoruz. Sıralama **kalite skoru** ile belirlenir; para ile sıra satın alınamaz.
Bu, ilk yıl gelir kaybıdır ve **kasıtlıdır** — konumlandırmanın kendisidir.

---

## 4. ÜRÜN KATMANLARI

**K1 — Güven altyapısı (farkımız):** EİDS doğrulama, rol rozetleri, canlılık teyidi,
taşınmaz tekilleştirme, fiyat geçmişi, görsel bütünlük, şeffaf şikâyet SLA'sı.

**K2 — Arama ve keşif (rakiple eşitlenme):** harita öncelikli arama, çizerek alan seçme,
zengin filtre seti, kayıtlı arama + anlık bildirim, karşılaştırma sepeti.

**K3 — Karar desteği:** bölge fiyat/kira endeksi, kira getirisi & geri dönüş süresi,
aidat/vergi/masraf dahil **gerçek aylık maliyet**, ulaşım-okul-sağlık yakınlık analizi,
deprem/zemin ve kentsel dönüşüm bilgisi.

**K4 — İşlem hattı:** randevu ve gösterim yönetimi, teklif akışı, belge kontrol listesi,
tapu randevusu hatırlatma, sözleşme şablonları.

**K5 — Mobil:** ilk günden mobil-öncelikli. (Bu pazarda trafiğin ezici çoğunluğu mobil.)

---

## 5. FAZ PLANI

| Faz | İçerik | Çıkış kriteri |
|---|---|---|
| **FAZ 0** | Tüzel yapı + EİDS başvurusu + entegrasyon; veri modelinin taşınmaz numarası etrafında yeniden kurulması | Test ortamında gerçek bir EİDS yetki sorgusu dönüyor |
| **FAZ 1** | İlan yaşam döngüsü: giriş → doğrulama → yayın → canlılık teyidi → otomatik arşiv | Süresi dolan ilan insan eli değmeden kalkıyor |
| **FAZ 2** | Arama + harita + filtre + kayıtlı arama/bildirim | 10.000 ilanda p95 arama < 300 ms |
| **FAZ 3** | Güven katmanı görünür yüzü: rozetler, fiyat geçmişi, tekilleştirilmiş taşınmaz kartı | Aynı taşınmaza ait mükerrer ilan üretilemiyor |
| **FAZ 4** | Karar desteği (endeks, getiri, gerçek maliyet) | Her sayı kaynağıyla birlikte gösteriliyor, tahmin "tahmin" diye etiketli |
| **FAZ 5** | İşlem hattı + ofis paneli + gelir modeli | İlk ödeme yapan ofis |

**Mevcut kod tabanının durumu:** repo bir "lüks gayrimenkul" konseptiyle başlamış,
103 ölü/teatral bileşen silinmeyi bekliyor (index'te, commit edilmemiş). Bu strateji
kabul edilirse veri modeli **taşınmaz numarası merkezli** olarak yeniden kurulmalı;
mevcut şema bu eksene göre gözden geçirilecek.

---

## 6. KARAR BEKLEYEN MADDELER

1. **Tüzel yapı:** EİDS başvurusu şirket gerektiriyor. Mevcut bir tüzel kişilik var mı,
   yoksa kuruluş FAZ 0'ın parçası mı?
2. **Kapsam:** Tüm Türkiye mi, önce İstanbul–Tekirdağ koridoru mu? (Yerel yoğunluk,
   dağınık ulusal varlıktan daha güçlü bir başlangıçtır.)
3. **Segment:** konut + ticari + arsa hepsi mi, yoksa önce konut mu?
4. **Gelir modeli:** "doping satmama" kararı onaylanıyor mu? (Stratejinin bel kemiği.)
5. **Mevcut kod:** üzerine mi devam, yoksa güven-merkezli veri modeliyle yeniden mi kurulur?

---

## REVİZYON TABLOSU

| Sürüm | Tarih | Değişiklik | Onaylayan |
|---|---|---|---|
| v1.0 | 25.07.2026 (TRT) | İlk sürüm. EİDS yasal kapısı, rakip boşluk haritası, gelir modeli, faz planı. | — (onay bekliyor) |

---
*Söylemesi Bizden · Ürün Stratejisi · v1.0 · 25 Temmuz 2026 (TRT)*
