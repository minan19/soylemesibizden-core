# CLAUDE.md — Söylemesi Bizden Core

> Bu dosya her oturum başında okunur, her oturum sonunda güncellenir.  
> Kaldığımız yerden devam etmek için kullanılır.

---

## 1. Proje Adı ve Genel Açıklama

**SÖYLEMESİ BİZDEN** — Türkiye merkezli, kurumsal düzeyde gayrimenkul & varlık yönetim platformu.  
Holding yapısı için tasarlanmış Sovereign Portal konsepti: varlık takibi, teklif yönetimi, anlaşma odaları, danışmanlık, piyasa radar ve daha fazlası.

- **Canlı URL:** https://soylemesibizden-core.vercel.app/
- **Repo:** minan19/soylemesibizden-core
- **Çalışma Branch:** `claude/welcome-soylemesibizden-NUqP9`
- **Temel Hedef:** Tasarım, hız, algoritma, işlevsellik, kurumsal kalite, kullanıcı deneyimi ve veri doğruluğu bakımından %100 mükemmel bir ürün.

---

## 2. Mimari ve Dosya Yapısı

```
soylemesibizden-core/
├── app/                        # Next.js 14 App Router
│   ├── page.tsx                # Ana sayfa (harita + son ilanlar)
│   ├── layout.tsx              # Root layout (Montserrat font, SovereignProvider)
│   ├── globals.css             # Global stiller
│   ├── compare.tsx             # (route değil, loose component)
│   ├── dashboard/              # Master Hub — Prisma canlı veri
│   ├── listings/               # Tüm ilanlar grid
│   ├── listing/[id]/           # İlan detay
│   ├── offers/                 # Teklifler
│   ├── deals/                  # Anlaşma odaları
│   ├── assets/                 # Varlık portföyü
│   ├── asset/[id]/             # Varlık detay
│   ├── concierge/              # Danışmanlık vakaları
│   ├── boardroom/ + [id]/      # Boardroom
│   ├── auction/[id]/           # Açık artırma
│   ├── dark-pool/              # Dark pool terminali
│   ├── market-radar/           # Piyasa radar
│   ├── intelligence/           # İstihbarat modülü
│   ├── legal-vault/            # Hukuki kasa
│   ├── vault/                  # Dijital tapu kasası
│   ├── analytics/              # Analitik dashboard
│   ├── security/               # Güvenlik paketi
│   ├── carbon/                 # Karbon & ESG takip
│   ├── nexus/                  # Ekosistem nexus
│   ├── radar/                  # Yield ısı haritası
│   ├── search/                 # Global arama
│   ├── auth/ + login/          # Kimlik doğrulama (stub)
│   ├── admin/
│   │   ├── _page.tsx           # ⚠️ ERİŞİLEMEZ (underscore prefix)
│   │   ├── dashboard/          # Admin komuta merkezi
│   │   ├── create-asset/       # Varlık oluşturma formu
│   │   └── defense/            # Defense engine
│   ├── api/
│   │   ├── listings/route.ts   # GET /api/listings
│   │   ├── offers/route.ts     # GET /api/offers
│   │   ├── assets/route.ts     # GET /api/assets
│   │   ├── deals/route.ts      # GET /api/deals
│   │   └── concierge/route.ts  # GET /api/concierge
│   └── [diğer modüller...]
├── components/                 # 156 component (45 aktif, 111 orphan)
├── context/
│   ├── DecisionContext.tsx     # Asset seçim state
│   ├── LanguageContext.tsx     # TR/EN/AR/RU i18n
│   └── ThemeContext.tsx        # Dark/light tema
├── providers/
│   └── SovereignProvider.tsx   # Core data provider (mock DB içeriyor)
├── lib/
│   ├── prisma.ts               # Singleton PrismaClient
│   ├── dictionary.ts           # i18n dictionary
│   ├── analytics.ts            # calculateYieldDensity()
│   ├── matching.ts             # calculateMatchScore()
│   ├── auction.ts              # calculateBidWeight()
│   ├── intelligence.ts         # Trust scoring, price analysis
│   └── simulator.ts            # Monte Carlo portfolio simulation
├── prisma/
│   └── schema.prisma           # 6 model: User, Listing, Offer, DealRoom, AdvisoryCase, Asset
├── next.config.js              # ⚠️ ignoreBuildErrors: true
├── tsconfig.json               # strict: true, @/* alias
└── CLAUDE.md                   # Bu dosya
```

### Tech Stack

| Katman | Teknoloji |
|--------|-----------|
| Framework | Next.js 14.1.0 (App Router) |
| Dil | TypeScript 5.3 |
| ORM | Prisma 5.22 |
| Veritabanı | PostgreSQL |
| Stil | Tailwind CSS 3.4 + Framer Motion 12 |
| Harita | MapLibre GL 5 |
| UI | Lucide React 1.8, Radix UI |
| Export | jsPDF 4 |
| Font | Montserrat (Google Fonts) |
| Deploy | Vercel |

---

## 3. Veritabanı Modelleri

```
User          → Listing, Offer, DealRoom (buyer/seller), AdvisoryCase, Asset
Listing       → Offer[], DealRoom[]
Offer         → Listing, User
DealRoom      → Listing, User (buyer), User (seller)
AdvisoryCase  → User
Asset         → User
```

**Status Enum'ları:**
- Listing: ACTIVE | PENDING | SOLD
- Offer: PENDING | ACCEPTED | REJECTED
- DealRoom: OPEN | IN_PROGRESS | CLOSED
- AdvisoryCase: OPEN | RESOLVED
- User.role: USER | ADMIN | CONCIERGE

---

## 4. Tamamlanan Görevler

- [x] Proje kurulumu (Next.js 14 + Prisma + Tailwind)
- [x] 6 Prisma modeli tanımlandı
- [x] 5 GET API endpoint'i oluşturuldu
- [x] 30+ sayfa scaffold edildi
- [x] Dark/Light tema altyapısı
- [x] TR/EN/AR/RU i18n altyapısı
- [x] Dashboard'da canlı Prisma verisi bağlandı
- [x] SovereignMap export hatası düzeltildi (named → default)
- [x] CLAUDE.md oluşturuldu

---

## 5. Kritik Sorunlar (Önce Bunlar Çözülecek)

### 🔴 Acil
| # | Sorun | Dosya |
|---|-------|-------|
| 1 | `ignoreBuildErrors: true` — TypeScript hataları gizli | next.config.js |
| 2 | `ignoreDuringBuilds: true` — ESLint hataları gizli | next.config.js |
| 3 | Admin ana sayfası erişilemiyor (`_page.tsx`) | app/admin/_page.tsx |
| 4 | Tüm API'lar sadece GET — POST/PUT/DELETE yok | app/api/*/route.ts |
| 5 | Dashboard sidebar linkleri tümü `href="#"` | app/dashboard/page.tsx |

### 🟡 Önemli
| # | Sorun | Dosya |
|---|-------|-------|
| 6 | 111 orphan (kullanılmayan) component | components/ |
| 7 | SovereignProvider mock data ile gerçek DB karışık | providers/SovereignProvider.tsx |
| 8 | Kimlik doğrulama tamamen stub (frontend-only) | app/auth/, app/login/ |
| 9 | Prisma migration dosyaları yok | prisma/ |
| 10 | Hata state'leri ve loading skeleton'lar eksik | tüm sayfalar |

### 🔵 İyileştirme
| # | Konu |
|---|------|
| 11 | Duplicate component versiyonları (v2, v3, v4, v5) temizlenmeli |
| 12 | Import path'ler tutarsız (@ alias vs relative) |
| 13 | Context dosyalarında `any` tip kullanımı |
| 14 | Test altyapısı yok |
| 15 | API input validasyonu yok |

---

## 6. Yol Haritası (Roadmap)

### FAZ 1 — Temel Stabilizasyon (Öncelik: Acil)
- [ ] next.config.js'den ignoreBuildErrors kaldır, tüm TS hatalarını düzelt
- [ ] Admin route'unu aktif et (`_page.tsx` → `page.tsx`)
- [ ] Dashboard sidebar gerçek routing ile bağla
- [ ] Tüm API'lara POST/PUT/DELETE ekle
- [ ] Prisma migration'larını oluştur (`prisma migrate dev`)
- [ ] Loading skeleton ve error boundary ekle

### FAZ 2 — Kimlik Doğrulama & Güvenlik
- [ ] NextAuth.js veya Clerk entegrasyonu
- [ ] Role-based access control (USER / ADMIN / CONCIERGE)
- [ ] Oturum yönetimi
- [ ] API route koruması (middleware)
- [ ] Input validasyonu (Zod)

### FAZ 3 — Veri Bütünlüğü & Gerçek Zamanlılık
- [ ] SovereignProvider mock data'yı gerçek DB verisine bağla
- [ ] Prisma schema genişletmesi (fotoğraf, döküman, kategori, vb.)
- [ ] Real-time güncellemeler (Pusher veya Server-Sent Events)
- [ ] Gelişmiş filtreleme ve arama (full-text search)
- [ ] Dosya upload (Vercel Blob veya S3)

### FAZ 4 — Kurumsal Özellikler
- [ ] Kullanıcı başvuru formu ve onay akışı
- [ ] E-mail bildirimleri (Resend veya SendGrid)
- [ ] PDF rapor export (jsPDF entegrasyonu aktif)
- [ ] Holding yapısı için çoklu şirket desteği
- [ ] Audit log (her işlem kaydı)

### FAZ 5 — Performans & Kalite
- [ ] TypeScript strict mod tamamen aktif
- [ ] 111 orphan component temizliği
- [ ] Unit + integration test altyapısı (Jest + Testing Library)
- [ ] Lighthouse skoru >95
- [ ] SEO meta tags (SovereignSEO component aktif edilecek)
- [ ] i18n gerçek içerik ile doldurulacak

### FAZ 6 — Modüler Genişleme
- [ ] Plugin/modül sistemi (yeni özellikler bağımsız eklenebilir)
- [ ] Webhook altyapısı
- [ ] API anahtarı yönetimi (dış entegrasyon için)
- [ ] Mobil responsive iyileştirme

---

## 7. Çalışma Kuralları

### Model Kullanımı
- **Rutin kodlama** (component yazma, bug fix, CRUD) → Sonnet
- **Karmaşık kararlar** (mimari, çözülemeyen bug, tasarım kararı) → Opus

### Onay Gerektiren Değişiklikler
- Prisma schema değişikliği (migration)
- Mevcut API contract'ı kıran değişiklik
- Büyük refactor (5+ dosya)
- Bağımlılık ekleme/kaldırma
- Vercel environment variable değişikliği

### Commit Kuralları
- Her tamamlanan görev → commit + push
- Commit mesajı: `[FAZ-X] Kısa açıklama`
- Branch: `claude/welcome-soylemesibizden-NUqP9`

### Oturum Yönetimi
- Oturum başında: Bu dosyayı oku, kullanıcıya kısaca özet sun
- Oturum uzayınca: `/compact` uygula
- Oturum sonunda: Bu dosyayı güncelle (tamamlananlar + sıradaki adımlar)

### Tıkanma Protokolü
Çözülemeyen sorunlarda 3 perspektiften analiz:
1. **Senior Developer** — teknik boyut
2. **Sistem Mimarı** — yapısal boyut
3. **Debug Uzmanı** — kök neden

---

## 8. Önemli Notlar

- **Veri güvenliği:** Migration öncesi her zaman DB backup alınmalı
- **Modülerlik:** Yeni özellikler mevcut kodu kırmadan eklenebilmeli
- **Geriye dönük uyumluluk:** API değişikliklerinde versiyonlama yapılmalı (`/api/v2/...`)
- **Hiçbir kayıp olmamalı:** Prisma migration'lar `--create-only` ile önce incelenmeli
- `app/compare.tsx` — route değil, yanlış konumlandırılmış, taşınmalı
- `SovereignProvider` içindeki hardcoded `CORE_DATABASE` mock data kademeli gerçek DB'ye bağlanacak
- Tüm para birimleri `tr-TR` locale ile formatlanıyor, tutarlı kalmalı

---

*Son güncelleme: 2026-04-16 — Oturum 1: Proje analizi, ilk kurulum, CLAUDE.md oluşturuldu.*
