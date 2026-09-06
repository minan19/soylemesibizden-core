# CLAUDE.md — Söylemesi Bizden Core

> Bu dosya her oturum başında okunur, her oturum sonunda güncellenir.  
> Kaldığımız yerden devam etmek için kullanılır.

---

## 1. Proje Adı ve Genel Açıklama

**SÖYLEMESİ BİZDEN** — Türkiye merkezli, kurumsal düzeyde gayrimenkul & varlık yönetim platformu.  
Sahibinden.com ve Hepsiemlak.com'a rakip; daha kullanışlı, daha çok tercih edilen, satışı daha fazla olan platform.

- **Canlı URL:** https://soylemesibizden-core.vercel.app/
- **Repo:** minan19/soylemesibizden-core
- **Çalışma Branch:** `claude/welcome-soylemesibizden-NUqP9`
- **Temel Hedef:** Tasarım, hız, algoritma, işlevsellik, kurumsal kalite, kullanıcı deneyimi ve veri doğruluğu bakımından %100 mükemmel bir ürün.

---

## 2. Mimari ve Dosya Yapısı

```
soylemesibizden-core/
├── app/
│   ├── page.tsx                    # ✅ Ana sayfa — hero arama, istatistikler, kategori, öne çıkan ilanlar
│   ├── layout.tsx                  # ✅ Root layout — Navbar + CompareBar global
│   ├── not-found.tsx               # ✅ Custom 404 sayfası
│   ├── error.tsx                   # ✅ Custom error boundary
│   ├── loading.tsx                 # ✅ Ana sayfa skeleton
│   ├── compare/page.tsx            # ✅ 4 ilana kadar yan yana karşılaştırma (18 özellik)
│   ├── dashboard/page.tsx          # ✅ Master Hub — canlı Prisma verisi, sidebar nav
│   ├── listings/
│   │   ├── page.tsx                # ✅ İlan grid — 9 filtre parametresi
│   │   ├── ListingsClient.tsx      # ✅ Filtreler (fiyat, oda, tip, şehir, sıralama)
│   │   └── loading.tsx             # ✅ Skeleton
│   ├── listing/[id]/
│   │   ├── page.tsx                # ✅ Detay — fotoğraf galerisi, mortgage hesap, başvuru formu, SEO meta
│   │   └── loading.tsx             # ✅ Skeleton
│   ├── search/
│   │   ├── page.tsx                # ✅ Gelişmiş arama — 13 filtre
│   │   └── SearchFilterSidebar.tsx # ✅ Yan panel filtreler (asansör/otopark/bahçe, alan, çoklu tip)
│   ├── offers/page.tsx             # ✅ Kullanıcı bazlı — gelen+verilen teklifler, OfferActions
│   ├── deals/page.tsx              # ✅ Anlaşma odaları grid
│   ├── assets/page.tsx             # ✅ Varlık portföyü
│   ├── favorites/page.tsx          # ✅ Favori ilanlar grid
│   ├── profile/
│   │   ├── page.tsx                # ✅ Kullanıcı profili — ilanlar, teklifler, favoriler
│   │   └── loading.tsx             # ✅ Skeleton
│   ├── login/page.tsx              # ✅ Giriş/Kayıt — NextAuth credentials
│   ├── admin/
│   │   ├── dashboard/page.tsx      # ✅ Gerçek Prisma verisi, stat kartları, tablolar
│   │   ├── create-listing/page.tsx # ✅ Server Action ile ilan oluşturma
│   │   ├── create-asset/page.tsx   # ✅ Server Action ile varlık oluşturma
│   │   ├── edit-listing/[id]/      # ✅ İlan düzenleme formu
│   │   ├── listings/page.tsx       # ✅ Tüm ilanlar yönetim tablosu
│   │   ├── users/page.tsx          # ✅ Tüm kullanıcılar + ChangeRoleButton
│   │   ├── offers/page.tsx         # ✅ Tüm teklifler yönetim tablosu (FAZ-13)
│   │   ├── deals/page.tsx          # ✅ Tüm anlaşma odaları (FAZ-14)
│   │   └── inquiries/page.tsx      # ✅ Tüm başvurular
│   ├── api/
│   │   ├── auth/[...nextauth]/     # ✅ NextAuth JWT CredentialsProvider
│   │   ├── auth/register/          # ✅ Kayıt (bcrypt 12 rounds, Zod)
│   │   ├── listings/route.ts       # ✅ GET + POST
│   │   ├── listings/[id]/route.ts  # ✅ GET + PUT + DELETE
│   │   ├── offers/route.ts         # ✅ GET + POST
│   │   ├── offers/[id]/route.ts    # ✅ PUT (accept/reject) + DELETE
│   │   ├── assets/route.ts         # ✅ GET
│   │   ├── deals/route.ts          # ✅ GET
│   │   ├── favorites/route.ts      # ✅ POST (toggle) + GET
│   │   └── inquiries/route.ts      # ✅ POST + GET (Zod)
│   ├── notifications/page.tsx      # ✅ 30 günlük aktivite özeti
│   ├── my-listings/
│   │   ├── page.tsx                # ✅ İlanlarım — analiz/düzenle/sil/durum
│   │   ├── loading.tsx             # ✅ Skeleton
│   │   └── [id]/analytics/page.tsx # ✅ İlan KPI analitik
│   ├── boardroom/[id]/page.tsx     # ✅ Anlaşma odası + DealStatusButton
│   ├── market-radar/page.tsx       # ✅ Piyasa analitik
│   ├── user/[id]/page.tsx          # ✅ Satıcı profil sayfası (FAZ-59)
│   ├── sehir/[slug]/page.tsx       # ✅ Şehir özet sayfası (FAZ-60)
│   ├── sitemap.ts                  # ✅ Dinamik sitemap (şehir sayfaları dahil)
│   └── robots.ts                  # ✅ Crawler kuralları
├── components/
│   ├── Navbar.tsx                  # ✅ Auth-aware, mobile hamburger, admin badge, bildirimler
│   ├── MortgageCalculator.tsx      # ✅ Kredi hesaplayıcı (client)
│   ├── InquiryForm.tsx             # ✅ Başvuru formu → /api/inquiries (client)
│   ├── FavoriteButton.tsx          # ✅ Toggle favori + router.refresh()
│   ├── OfferForm.tsx               # ✅ Teklif gönder → /api/offers (client)
│   ├── OfferActions.tsx            # ✅ Kabul/Reddet → PUT /api/offers/[id] (client)
│   ├── CompareButton.tsx           # ✅ localStorage seçim + CompareBar floating CTA
│   ├── DealStatusButton.tsx        # ✅ Anlaşma odası durum geçişi (FAZ-14)
│   ├── ChangeRoleButton.tsx        # ✅ Admin kullanıcı rol değiştirme
│   ├── CreateDealButton.tsx        # ✅ Listing'den anlaşma odası açma
│   ├── DeleteListingButton.tsx     # ✅ İlan silme
│   ├── ChangeStatusButton.tsx      # ✅ İlan durum değiştirme (ACTIVE/PENDING/SOLD)
│   ├── PhotoGallery.tsx            # ✅ Lightbox galeri (FAZ-55)
│   ├── RecentlyViewed.tsx          # ✅ Son görüntülenen ilanlar localStorage (FAZ-54)
│   ├── RecordView.tsx              # ✅ View kaydetme client bileşeni (FAZ-54)
│   ├── MobileBottomNav.tsx         # ✅ Mobil alt navigasyon (FAZ-58)
│   └── ViewingRequestForm.tsx      # ✅ Görüntüleme randevusu formu (FAZ-62)
├── prisma/
│   └── schema.prisma               # ✅ 8 model: User, Listing, Offer, DealRoom, AdvisoryCase, Asset, Favorite, Inquiry
├── middleware.ts                   # ✅ RBAC — admin/profile/favorites koruması
├── next.config.js                  # ⚠️ ignoreBuildErrors: true (değiştirilmedi)
└── CLAUDE.md                       # Bu dosya
```

### Tech Stack

| Katman | Teknoloji |
|--------|-----------|
| Framework | Next.js 14.1.0 (App Router) |
| Dil | TypeScript 5.3 (0 hata) |
| ORM | Prisma 5.22 |
| Veritabanı | Local: PostgreSQL 16 (appuser@localhost/soylemesibizden) |
| Veritabanı Cloud | Neon PostgreSQL (ep-autumn-snow-am2ndsr3-pooler.c-5.us-east-1.aws.neon.tech) |
| Auth | NextAuth.js v4 JWT + CredentialsProvider + bcryptjs |
| Stil | Tailwind CSS 3.4 + Framer Motion 12 |
| Validation | Zod |
| UI | Lucide React, Radix UI |
| Font | Montserrat (Google Fonts) |
| Deploy | Vercel (branch: claude/welcome-soylemesibizden-NUqP9) |

---

## 3. Veritabanı Modelleri

```
User          → Listing, Offer, DealRoom (buyer/seller), AdvisoryCase, Asset, Favorite, Inquiry
Listing       → Offer[], DealRoom[], Favorite[], Inquiry[]
               + city, district, neighborhood, propertyType, listingType
               + rooms, bathrooms, area, floor, totalFloors, buildingAge
               + hasElevator, hasParking, hasGarden, isVerified
               + views, photos[], ownerId
Offer         → Listing, User (status: PENDING|ACCEPTED|REJECTED)
DealRoom      → Listing, User (buyer), User (seller) (status: OPEN|IN_PROGRESS|CLOSED)
AdvisoryCase  → User (status: OPEN|RESOLVED)
Asset         → User (type, value, location, description)
Favorite      → User, Listing (@@unique [userId, listingId])
Inquiry       → Listing, User? (name, email, phone, message)
```

**⚠️ ÖNEMLİ:** Prisma schema genişletildi ama Neon DB'de migration çalıştırılmadı!
Migration SQL kullanıcı tarafından Neon SQL Editor'da çalıştırılmalı.

---

## 4. Tamamlanan Görevler (Oturum 1-3)

### Platform Altyapısı
- [x] Next.js 14 + Prisma 5.22 + Tailwind kurulum
- [x] NextAuth.js v4 JWT auth (Credentials + bcrypt)
- [x] Role-based middleware (USER/ADMIN/CONCIERGE)
- [x] Zod validasyonu (API endpoint'lerinde)
- [x] TypeScript 0 hata (strict mode)

### Kullanıcı Arayüzü — Tüm Sayfalar
- [x] **Ana Sayfa** — Hero arama, canlı DB istatistikleri, kategori kartları, öne çıkan 6 ilan, CTA banner
- [x] **İlanlar** — 9 filtreli grid (q, status, sort, propertyType, listingType, minPrice, maxPrice, minRooms, city)
- [x] **Gelişmiş Arama** — 13 filtreli yan panel (asansör/otopark/bahçe, alan, çoklu tip seçimi, v.b.)
- [x] **İlan Detay** — Fotoğraf galerisi, 8 özellik grid, fiyat/m² analiz, mortgage hesap, başvuru formu, benzer ilanlar, SEO meta
- [x] **Favoriler** — Favori ilanlar grid
- [x] **Profil** — İlanlar, teklifler, favoriler
- [x] **Teklifler** — Gelen teklifler (kabul/ret) + verilen teklifler
- [x] **Karşılaştırma** — 4 ilana kadar 18 özellik satırı yan yana
- [x] **Admin Dashboard** — Gerçek Prisma verisi, stat kartları, son ilanlar/kullanıcılar tabloları
- [x] **Admin İlan Oluştur** — Tüm alanlar, Server Action
- [x] **Admin İlan Düzenle** — Mevcut değerler dolu, Server Action
- [x] **Admin İlanlar** — Tüm ilanlar yönetim tablosu
- [x] **Admin Kullanıcılar** — Tüm kullanıcılar, rol badge, sayılar
- [x] **Login/Register** — NextAuth credentials, bcrypt, Zod

### Bileşenler
- [x] **Navbar** — Auth-aware, mobile hamburger, admin badge, kullanıcı dropdown
- [x] **MortgageCalculator** — Aylık taksit hesaplayıcı (client)
- [x] **InquiryForm** — Başvuru formu → API (client)
- [x] **FavoriteButton** — Toggle favori → API (client)
- [x] **OfferForm** — Teklif gönder → API (client, session kontrolü)
- [x] **OfferActions** — Kabul/Reddet butonları → API (client)
- [x] **CompareButton + CompareBar** — localStorage seçim, floating CTA (client)

### API Endpoint'leri
- [x] GET/POST /api/listings
- [x] GET/PUT/DELETE /api/listings/[id]
- [x] GET/POST /api/offers
- [x] PUT/DELETE /api/offers/[id]
- [x] POST/GET /api/favorites (toggle)
- [x] POST/GET /api/inquiries (Zod)
- [x] POST /api/auth/register (Zod, bcrypt)

### UX (Oturum 1-2)
- [x] Loading skeleton sayfaları (ana sayfa, listing, profile)
- [x] Custom 404 ve error sayfaları
- [x] CompareBar global floating bar
- [x] SEO meta (generateMetadata) listing detayda

### Oturum 3 (FAZ 8-18) — Tamamlananlar
- [x] **FAZ-8:** Bildirimler (/notifications), admin kullanıcı rol değiştirme, kullanıcı bazlı dashboard, API /api/users/[id]
- [x] **FAZ-9:** Favoriler inline remove, deals/assets kullanıcı bazlı, PopÃ¼ler sıralama, şehir chip'leri
- [x] **FAZ-10:** Profil ayarları (/profile/settings), /api/profile PUT, concierge kullanıcı bazlı
- [x] **FAZ-11:** Gelişmiş arama şehir chip'leri, admin dashboard iyileştirme
- [x] **FAZ-12:** Sayfalama (pagination, PAGE_SIZE=24), sitemap.ts, robots.ts, foto thumbnail
- [x] **FAZ-13:** Admin teklif yönetimi (/admin/offers), dashboard hızlı erişim kartları
- [x] **FAZ-14:** DealStatusButton, admin anlaşma odaları (/admin/deals), ilan analitik (/my-listings/[id]/analytics)
- [x] **FAZ-15:** my-listings'e delete+status change, anasayfa "Nasıl Çalışır?" + şehirler + genişletilmiş footer
- [x] **FAZ-16:** CompareButton ilan kartlarına ve detay sayfasına eklendi
- [x] **FAZ-17:** API güvenlik: /api/listings/[id] ve /api/offers/[id] PUT/DELETE kimlik doğrulama
- [x] **FAZ-18:** listings generateMetadata SEO, loading skeleton (my-listings, notifications, deals, offers), /api/listings geliştirilmiş GET (filtreli, sayfalı) + POST auth

### Oturum 5 (FAZ 53-62) — Tamamlananlar
- [x] **FAZ-53:** Ana sayfa ilan kartları iyileştirme — YENİ badge, propertyType chip, ₺/m², neighbourhood, CompareButton
- [x] **FAZ-54:** Son görüntülenen ilanlar — RecentlyViewed + RecordView (localStorage)
- [x] **FAZ-55:** Fotoğraf galerisi lightbox — klavye navigasyonu (←→Esc), thumbnail strip, tam ekran, PhotoGallery bileşeni
- [x] **FAZ-56:** Hızlı Görüntüle modal — listing grid'de hover overlay + quick view popup
- [x] **FAZ-57:** Arama sayfasına SaveSearchButton eklendi
- [x] **FAZ-58:** Mobil alt navigasyon barı (MobileBottomNav) — 5 link, aktif durum gösterimi
- [x] **FAZ-59:** Satıcı/danışman profil sayfası /user/[id] — istatistikler, ilanlar, WhatsApp, SEO
- [x] **FAZ-60:** Şehir özet sayfaları /sehir/[slug] — fiyat analizi, ilçe dağılımı, mülk türleri, hızlı filtreler
- [x] **FAZ-61:** Ana sayfa şehir chip'lerine ilan sayısı badge, /sehir/ linklerine geçiş, sitemap güncellendi
- [x] **FAZ-62:** Görüntüleme randevusu formu (ViewingRequestForm) — tarih/saat seçimi, collapsible, inquiry API

### Yeni Bileşenler (Oturum 5)
- [x] **PhotoGallery** — Lightbox, thumbnail strip, zoom hover, klavye navigasyonu
- [x] **RecentlyViewed** — localStorage bazlı son görüntülenen ilanlar horizontal scroll
- [x] **RecordView** — Client component, listing detayda view kaydeder
- [x] **MobileBottomNav** — Mobil sticky alt nav, pathname bazlı aktif durum
- [x] **ViewingRequestForm** — Görüntüleme randevusu, collapsible accordion

### Yeni Sayfalar (Oturum 5)
- [x] **/user/[id]** — Satıcı/danışman profil sayfası
- [x] **/sehir/[slug]** — Şehir özet ve analiz sayfası

### Oturum 4 (FAZ 19-34) — Tamamlananlar
- [x] **FAZ-19:** /api/listings GET geliştirilmiş, CLAUDE.md güncellendi
- [x] **FAZ-20:** ShareButton — Web Share API + clipboard fallback
- [x] **FAZ-21:** PhotoUrlInput bileşeni — tüm form sayfalarında fotoğraf yönetimi iyileştirildi
- [x] **FAZ-22/23/24:** Listings sayfa görüntülenme sayacı, hasElevator/hasParking/hasGarden filtre butonları, admin formlara mahalle alanı
- [x] **FAZ-26:** Bildirim sayacı rozeti (Navbar) — /api/notifications/count endpoint
- [x] **FAZ-27:** Listing detayda WhatsApp iletişim butonu (telefon varsa)
- [x] **FAZ-28:** Admin kullanıcı detay sayfası (/admin/users/[id]) — ilanlar, teklifler, favoriler
- [x] **FAZ-29:** Admin ilanlar tablosu — sayfalama (PAGE_SIZE=20) + arama
- [x] **FAZ-30:** Yazdırılabilir ilan sayfası (/listing/[id]/print) — A4 format, print CSS
- [x] **FAZ-31:** İlan kartlarında görüntülenme 👁 ve favori ♡ sayısı
- [x] **FAZ-32:** Akıllı arama autocomplete — SearchAutocomplete bileşeni + /api/search endpoint
- [x] **FAZ-33:** Admin loading skeleton (dashboard, listings, users), benzer ilanlar şehir+fiyat aralığı bazlı
- [x] **FAZ-34:** Teklif formu — fiyat karşılaştırma gösterimi, hızlı seçim çipleri

### Yeni Bileşenler (Oturum 3)
- [x] **DealStatusButton** — Anlaşma odası durum geçişi (OPEN→IN_PROGRESS→CLOSED)
- [x] **ChangeRoleButton** — Admin kullanıcı rol değiştirme
- [x] **CreateDealButton** — Listing detaydan anlaşma odası açma

### Yeni Sayfalar (Oturum 3)
- [x] **/notifications** — 30 günlük aktivite özeti (gelen teklifler, durum değişimleri, başvurular, favoriler, dealroom'lar)
- [x] **/my-listings** — Kullanıcı kendi ilanları (analiz, düzenle, sil, durum değiştir)
- [x] **/my-listings/[id]/analytics** — İlan KPI analitik sayfası
- [x] **/create-listing** — Kullanıcı ilan oluşturma
- [x] **/edit-listing/[id]** — Kullanıcı ilan düzenleme
- [x] **/profile/settings** — Profil güncelleme formu
- [x] **/admin/offers** — Admin teklif yönetimi
- [x] **/admin/deals** — Admin anlaşma odaları yönetimi
- [x] **/boardroom/[id]** — Anlaşma odası detay + durum güncelleme
- [x] **/market-radar** — Piyasa analitik sayfası
- [x] **/admin/inquiries** — Admin başvuru yönetimi

### Oturum 6 (FAZ 118-132) — Tamamlananlar
- [x] **FAZ-118:** RSS 2.0 feed — /feed.xml (50 aktif ilan), layout'a autodiscovery link
- [x] **FAZ-119:** District filtresi — listings, ListingsClient, ilce page linkleri düzeltildi, breadcrumb
- [x] **FAZ-120:** Search sayfasına district filtresi — SearchFilterSidebar + /search/page.tsx
- [x] **FAZ-121:** Market Radar iyileştirme — SATILIK/KİRALIK bazlı şehir fiyat tablosu, 6 aylık trend grafik
- [x] **FAZ-122:** ListingsClient ₺/m² gösterimi, district/neighborhood location display
- [x] **FAZ-123:** İlan detay breadcrumb — /sehir/ ve /ilce/ SEO linkleri
- [x] **FAZ-124:** ListingsClient — liste görünümünde ₺/m², neighbourhood+district+city birleşik konum
- [x] **FAZ-125:** Günün Fırsatı bölümü — ana sayfaya piyasa ortalamasının ≥%15 altındaki ilanlar
- [x] **FAZ-126:** Harita sayfası — listingType/propertyType filtre, şehir badge sayısı, ₺/m² popup, URL param
- [x] **FAZ-127:** Benzer ilanlar kartları — listingType badge, ₺/m², filtreli Tümünü Gör; komşu ilanlar iyileştirme
- [x] **FAZ-128:** Avatar desteği — NextAuth JWT'e avatar, Navbar'da profil fotoğrafı gösterimi
- [x] **FAZ-129:** Admin toplu işlem — BulkActionsTable, checkbox, approve/delete/durum; /api/admin/listings-bulk
- [x] **FAZ-130:** /istatistikler — platform KPI, mülk türü dağılımı, aylık trend, şehir fiyat tablosu
- [x] **FAZ-131:** /hakkimizda — kurumsal sayfa, misyon/vizyon, değerler, timeline, CTA
- [x] **FAZ-132:** MortgagePartners — Türk banka faiz karşılaştırması, taksit hesaplama; ilan detay + hesaplama

### Yeni Bileşenler (Oturum 6)
- [x] **MortgagePartners** — Banka faiz oranları karşılaştırması, taksit hesaplama
- [x] **BulkActionsTable** — Admin toplu işlem tablosu (checkbox, approve, delete, set status)

### Yeni Sayfalar (Oturum 6)
- [x] **/feed.xml** — RSS 2.0 ilan beslemesi
- [x] **/istatistikler** — Platform istatistikleri (KPI, trend, dağılım)
- [x] **/hakkimizda** — Kurumsal hakkımızda sayfası

### Yeni API'ler (Oturum 6)
- [x] **/api/admin/listings-bulk** — Toplu ilan işlemi (approve/delete/status)

### Oturum 7 (FAZ 133-141) — Tamamlananlar
- [x] **FAZ-133:** CLAUDE.md güncelleme — oturum 5-6 özeti
- [x] **FAZ-134:** ListingsClient fiyat ve alan hızlı seçim filtreleri (1M/3M/5M/10M, 75/125/200 m²)
- [x] **FAZ-135:** Listings "Son 24s/7g/30g" tarih filtresi + bina yaşı hızlı seçim
- [x] **FAZ-136:** Konut Rehberi sayfaları (/rehber, /rehber/ev-satin-alma, /rehber/kiralama-rehberi, /rehber/yatirim-rehberi)
- [x] **FAZ-137:** Homepage Öne Çıkan Danışmanlar bölümü + Navbar Konut Rehberi linki
- [x] **FAZ-138:** Türkiye Gayrimenkul Piyasası sayfası (/piyasa) — şehir tablosu, trend grafik, kira getirisi
- [x] **FAZ-139:** Yeni Projeler sayfası (/yeni-projeler) — sıfır bina ilanları, şehir gruplandırma
- [x] **FAZ-140:** Kiralık landing sayfası (/kiralik) — şehir/oda filtreleri, fiyat tablosu
- [x] **FAZ-141:** Satılık landing sayfası (/satilik) — bütçe/oda/tür filtreleri, şehir kartları

### Yeni Sayfalar (Oturum 7)
- [x] **/rehber** — Konut rehberi index sayfası
- [x] **/rehber/ev-satin-alma** — Ev satın alma adım adım rehber
- [x] **/rehber/kiralama-rehberi** — Kira sözleşmesi ve haklar rehberi
- [x] **/rehber/yatirim-rehberi** — Gayrimenkul yatırım ve getiri rehberi
- [x] **/piyasa** — Türkiye gayrimenkul piyasa verileri sayfası
- [x] **/yeni-projeler** — Yeni inşaat ve sıfır bina ilanları
- [x] **/kiralik** — Kiralık konut landing sayfası
- [x] **/satilik** — Satılık konut landing sayfası

### Oturum 9 (FAZ 148-165) — Tamamlananlar
- [x] **FAZ-148:** Emlak vergisi hesaplayıcı (/emlak-vergisi) — 4 mülk türü, 3 belediye tipi, hisseli mülk
- [x] **FAZ-149:** Portföy takip aracı (/portfoy) — localStorage tabanlı, çoklu mülk, şehir dağılımı
- [x] **FAZ-150:** Kira artış hesaplayıcı (/kira-artis-hesaplama) — TÜİK TÜFE verileri, %25 tavan toggle
- [x] **FAZ-151:** Banka kredileri karşılaştırma (/banka-kredileri) — 8 banka, örnek hesaplama, oran bar grafik
- [x] **FAZ-152:** Hesaplama araçları güncellendi (/hesaplama) — uzman araçlar grid
- [x] **FAZ-153:** Tüm araçlar sayfası (/tum-araclar) — 7 kategori, 33+ araç
- [x] **FAZ-154:** Navbar Araçlar dropdown — araçlar menüsü desktop + mobile
- [x] **FAZ-155:** Gayrimenkul sözlüğü (/gayrimenkul-sozlugu) — 25 terim, arama, alfabetik index, GlossaryClient
- [x] **FAZ-156:** Sözlük navbar + tum-araclar entegrasyonu
- [x] **FAZ-157:** Satıcı rehberi (/rehber/satici-rehberi) — 7 adım, kontrol listesi, vergi bilgisi
- [x] **FAZ-158:** DASK prim hesaplayıcı (/dask-hesaplayici) — 5 risk bölgesi, yapı türü, prim tahmini
- [x] **FAZ-159:** Ödeme planı simülatörü (/odeme-plani) — ay ay anapara+faiz tablosu, yıllık özet
- [x] **FAZ-160:** Kira geliri vergisi hesaplayıcı (/kira-geliri-vergisi) — 2024 dilimleri, götürü/gerçek gider, istisna
- [x] **FAZ-161:** Kredi karşılaştırma aracı (/kredi-karsilastirma) — 4 senaryo yan yana, bar grafikler
- [x] **FAZ-162:** Hesaplama + footer güncellemesi — yeni araçlar bağlantılandı
- [x] **FAZ-163:** Kira mı satın mı (/kira-mi-satin-mi) — 30 yıl projeksiyon, fırsat maliyeti, net servet grafik

### Yeni Sayfalar (Oturum 9)
- [x] **/gayrimenkul-sozlugu** — 25 terim, client-side arama, alfabetik gruplandırma
- [x] **/rehber/satici-rehberi** — Satış rehberi, 7 adım, belge listesi
- [x] **/dask-hesaplayici** — Zorunlu deprem sigortası prim hesaplayıcı
- [x] **/odeme-plani** — Mortgage ödeme planı simülatörü (aylık/yıllık)
- [x] **/kira-geliri-vergisi** — Kira geliri üzerinden gelir vergisi hesaplayıcı
- [x] **/kredi-karsilastirma** — 4 senaryoyu yan yana kredi karşılaştırma
- [x] **/kira-mi-satin-mi** — Kira vs satın alma 30 yıl projeksiyon karşılaştırması

---

### Oturum 8 (FAZ 143-147) — Tamamlananlar
- [x] **FAZ-143:** Lüks Gayrimenkul sayfası (/luks) — dinamik eşik (top 10%), altın tema, premium koleksiyon
- [x] **FAZ-144:** Tapu masrafı hesaplayıcı (/tapu-masrafi) — tapu harcı, döner sermaye, DASK, KDV, emlakçı komisyonu
- [x] **FAZ-145:** Fiyat trendi sayfası (/fiyat-trendi) — aylık bar grafikler, şehir karşılaştırması, hacim analizi
- [x] **FAZ-146:** Mahalle analizi sayfası (/mahalle-analizi) — aktivite skoru, ₺/m², yoğunluk sıralaması
- [x] **FAZ-147:** Yatırım analizi sayfası (/yatirim-analizi) — ROI hesaplayıcı, al mı kirala mı, şehir kira getiri kıyaslaması
- [x] **FAZ-148:** Footer + Navbar güncellemesi — yeni sayfalar linklendi

### Yeni Sayfalar (Oturum 8)
- [x] **/luks** — Lüks gayrimenkul premium koleksiyon sayfası
- [x] **/tapu-masrafi** — Tapu ve alım masrafları interaktif hesaplayıcı
- [x] **/fiyat-trendi** — Aylık fiyat trendi analizi (ISR: 1 saat)
- [x] **/mahalle-analizi** — Mahalle bazlı aktivite skoru ve ₺/m² analizi
- [x] **/yatirim-analizi** — Yatırım ROI hesaplayıcı + al/kirala karşılaştırması

---

## 5. Kalan Kritik İşler

### 🔴 Acil
| # | İş | Notlar |
|---|-----|--------|
| 1 | Neon DB migration SQL çalıştır | Kullanıcı Neon SQL Editor'da çalıştırmalı |
| 2 | `next.config.js` ignoreBuildErrors kaldır | Sonra tüm TS hatalarını düzelt |

### 🟡 Önemli
| # | İş |
|---|-----|
| 3 | Fotoğraf yükleme — Vercel Blob veya Cloudinary entegrasyonu |
| 4 | E-posta bildirimleri — teklif geldiğinde Resend/SendGrid |
| 5 | Harita entegrasyonu — MapLibre, ilan koordinat gösterimi |
| 6 | Real-time güncellemeler (Server-Sent Events) |

### 🔵 İyileştirme
| # | İş |
|---|-----|
| 7 | i18n gerçek içerik (TR/EN/AR/RU) |
| 8 | Unit/integration test altyapısı |
| 9 | Lighthouse skoru >95 |
| 10 | Fiyat geçmişi grafiği (listing detayda) |
| 11 | PDF listing raporu (jsPDF) |
| 12 | Real-time güncellemeler (Server-Sent Events) |

---

## 6. Neon DB Migration SQL

Şema genişletmesi için bu SQL Neon SQL Editor'da çalıştırılmalı:

```sql
-- Listing tablosuna yeni alanlar
ALTER TABLE "Listing"
  ADD COLUMN IF NOT EXISTS "city" TEXT,
  ADD COLUMN IF NOT EXISTS "district" TEXT,
  ADD COLUMN IF NOT EXISTS "neighborhood" TEXT,
  ADD COLUMN IF NOT EXISTS "listingType" TEXT NOT NULL DEFAULT 'SATILIK',
  ADD COLUMN IF NOT EXISTS "propertyType" TEXT NOT NULL DEFAULT 'KONUT',
  ADD COLUMN IF NOT EXISTS "rooms" INTEGER,
  ADD COLUMN IF NOT EXISTS "bathrooms" INTEGER,
  ADD COLUMN IF NOT EXISTS "area" DOUBLE PRECISION,
  ADD COLUMN IF NOT EXISTS "floor" INTEGER,
  ADD COLUMN IF NOT EXISTS "totalFloors" INTEGER,
  ADD COLUMN IF NOT EXISTS "buildingAge" INTEGER,
  ADD COLUMN IF NOT EXISTS "hasElevator" BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS "hasParking" BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS "hasGarden" BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS "isVerified" BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS "views" INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS "photos" TEXT[] DEFAULT '{}';

-- User tablosuna phone ve avatar
ALTER TABLE "User"
  ADD COLUMN IF NOT EXISTS "phone" TEXT,
  ADD COLUMN IF NOT EXISTS "avatar" TEXT;

-- Favorite tablosu
CREATE TABLE IF NOT EXISTS "Favorite" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "listingId" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Favorite_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "Favorite_userId_listingId_key" UNIQUE ("userId", "listingId"),
  CONSTRAINT "Favorite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE,
  CONSTRAINT "Favorite_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing"("id") ON DELETE CASCADE
);

-- Inquiry tablosu
CREATE TABLE IF NOT EXISTS "Inquiry" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "phone" TEXT,
  "message" TEXT NOT NULL,
  "listingId" TEXT NOT NULL,
  "userId" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Inquiry_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "Inquiry_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing"("id") ON DELETE CASCADE,
  CONSTRAINT "Inquiry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL
);
```

---

## 7. Çalışma Kuralları

### Commit Kuralları
- Her tamamlanan görev → commit + push
- Commit mesajı: `[FAZ-X] Kısa açıklama`
- Branch: `claude/welcome-soylemesibizden-NUqP9`
- Git config: `user.email = noreply@anthropic.com`, `user.name = Claude`

### Push Komutu
```bash
git push https://minan19:<GITHUB_TOKEN>@github.com/minan19/soylemesibizden-core.git claude/welcome-soylemesibizden-NUqP9
```

### DB Bağlantı
- Local: `DATABASE_URL=postgresql://appuser:apppass@localhost:5432/soylemesibizden`
- Neon: `DATABASE_URL=postgresql://neondb_owner:npg_o9LkQqp4FTiG@ep-autumn-snow-am2ndsr3-pooler.c-5.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require`

### Design System
- Arka plan: `bg-[#F8FAFC]`
- Accent: `#00C49F`
- Kartlar: `bg-white rounded-2xl border border-gray-100`
- Font: Montserrat (black/bold/semibold)
- Para birimi: `toLocaleString('tr-TR')` ile `₺`

### Tıkanma Protokolü
1. **Senior Developer** — teknik boyut
2. **Sistem Mimarı** — yapısal boyut
3. **Debug Uzmanı** — kök neden

---

## 8. Önemli Notlar

- `app/admin/_page.tsx` — TypeScript'ten exclude edildi, erişilemiyor
- `app/compare.tsx` — Artık `app/compare/page.tsx` olarak doğru konumda
- `SovereignProvider` içindeki mock data kademeli gerçek DB'ye bağlanmakta
- Tüm Server Actions `'use server'` directive'i gerektirir
- NextAuth secret: `NEXTAUTH_SECRET` env var (local .env'de ayarlanmalı)

---

*Son güncelleme: 2026-09-06 — Oturum 13: FAZ 211-227 tamamlandı. CLAUDE.md, yatırım getiri simülatörü, taşınmaz değerleme, kira sözleşmesi örneği, faiz hesaplayıcı, dolar kuru etkisi, ortak mülkiyet, kentsel dönüşüm, yabancı gayrimenkul, konut sigortası, imar durumu, piyasa raporu 2024, stopaj vergisi hesaplayıcı, faiz geçmişi, ekspertiz raporu, EKB, kat mülkiyeti. Toplam 100+ araç ve sayfa.*

### Oturum 11 (FAZ 185-196) — Tamamlananlar
- [x] **FAZ-185:** Arsa yatırımı rehberi — imar türleri, kontrol listesi, hisseli arsa (/arsa-yatirimi)
- [x] **FAZ-186:** Pişmanlık hakkı ve cayma rehberi — kapora, BK md.177, hukuki süreç (/pismanlik-hakki)
- [x] **FAZ-187:** Gelişmiş mortgage simülatörü — erken ödeme, refinansman, tam plan (/mortgage-simulatoru)
- [x] **FAZ-188:** Konut kredisi faiz geçmişi — 2015-2024 tarihsel veriler, yıllık bant (/faiz-gecmisi)
- [x] **FAZ-189:** Ekspertiz raporu rehberi — SPK lisanslı değerleme, 4 tür, maliyet (/ekspertiz-raporu)
- [x] **FAZ-190:** Enerji Kimlik Belgesi (EKB) — A-G sınıfları, zorunluluk, yükseltme (/enerji-kimlik-belgesi)
- [x] **FAZ-191:** Kat mülkiyeti ve kat irtifakı rehberi — karşılaştırma, dönüşüm, haklar (/kat-mulkiyeti)
- [x] **FAZ-192:** NBD/NPV gayrimenkul hesaplayıcı — IRR, nakit akışı, çıkış değeri (/yatirim-npv)
- [x] **FAZ-193:** Kira fiyat rehberi — 12 şehir oda bazlı, YoY artış, kira getirisi (/kira-haritasi)
- [x] **FAZ-194:** Taksitli gayrimenkul satışı rehberi — haklar, riskler, kontrol listesi (/taksitli-satis)
- [x] **FAZ-195:** 3 şehir bölge karşılaştırma aracı — fiyat, getiri, skor (/bolge-karsilastir)
- [x] **FAZ-196:** Hisseli tapu rehberi — şufa hakkı, ortaklığın giderilmesi davası (/hisseli-tapu)

**Oturum 10 (FAZ 170-176) — Tamamlananlar:**
- FAZ-170: Yabancı alıcı rehberi (/yabanci-gayrimenkul) — DAB, vatandaşlık yolu, oturma izni, vergi, ülkeler
- FAZ-171: Konut sigortası rehberi (/konut-sigortasi) — DASK farkı, 8 kapsam türü, prim faktörleri, hasar süreci
- FAZ-172: Bütçe planlayıcı (/butce-planlayici) — DTI hesabı, max konut fiyatı, nakit gereksinim analizi
- FAZ-173: Kira getiri hesaplayıcı (/kira-getiri-hesaplayici) — brüt/net getiri, cap rate, 5 yıl projeksiyon
- FAZ-174: Enflasyon koruması rehberi (/enflasyon-korumasi) — tarihsel veri, stratejiler, varlık karşılaştırması
- FAZ-175: Miras ve gayrimenkul (/miras-ve-gayrimenkul) — veraset ilamı, tapu intikali, saklı pay, vergi dilimleri
- FAZ-176: Kira sözleşmesi rehberi (/kira-sozlesmesi) — 10 zorunlu madde, depozito, kiracı/ev sahibi hakları

**Oturum 6 (FAZ 79-88) — Tamamlananlar:**
- FAZ-79: İlan şikayet sistemi — /api/reports + ReportListingButton modal
- FAZ-80: Admin şikayetler sayfası — /admin/reports + dashboard quick link
- FAZ-81: Özel ilan notları — ListingNotes + ListingNoteIndicator (localStorage)
- FAZ-82: Profil avatar URL — fotoğraf URL girişi, önizleme, /user/[id] entegrasyonu
- FAZ-83: İlan analitik — teklif miktarları bar chart (pure CSS)
- FAZ-84: İlan embed kodu — /listing/[id]/embed iframe sayfası + EmbedCodeButton
- FAZ-85: Karşılaştırma sayfasına Yazdır/PDF butonu — ComparePrintButton
- FAZ-86: JSON-LD structured data — RealEstateListing + ItemList (sehir sayfaları)
- FAZ-87: İlçe sayfasına JSON-LD ItemList structured data
- FAZ-88: Hesaplama araçlarına Tapu & Vergiler hesaplayıcısı eklendi

**Oturum 7 (FAZ 89-99) — Tamamlananlar:**
- FAZ-89: PriceTracker bileşeni — localStorage fiyat takip, değişim göstergesi
- FAZ-90: /tracked-prices sayfası — takip edilen fiyatlar listesi, diff gösterimi
- FAZ-91: CommandPalette (Ctrl+K) — global arama, öneri, quick links, klavye nav
- FAZ-92: Komşu İlanlar widget — listing detayda aynı ilçe/mahallede ilanlar sidebar
- FAZ-93: Sitemap'e dinamik ilçe sayfaları (/ilce/[city]/[district])
- FAZ-94: /sehir index sayfası — tüm şehirler, aktif ilan sayısı, avg fiyat
- FAZ-95: Hesaplama araçlarına Yatırım ROI hesaplayıcısı (5. tab)
- FAZ-96: Admin CSV export — /api/admin/export + listings sayfasında buton
- FAZ-97: Listings sayfasına filtre bazlı fiyat istatistikleri (min/maks/ortalama)
- FAZ-98: Listing detay Quick Stats — görüntülenme piyasa karşılaştırma barı
- FAZ-99: CommandPalette son aramalar — localStorage + Clock icon

**Yeni Bileşenler (Oturum 7):**
- PriceTracker — localStorage fiyat izleme widget
- TrackedPricesClient — fiyat takip listesi client component
- CommandPalette — Ctrl+K global komut paleti

**Yeni Sayfalar (Oturum 7):**
- /tracked-prices — fiyat takip listesi
- /sehir (index) — tüm şehirler listesi
- /api/admin/export — CSV export endpoint
