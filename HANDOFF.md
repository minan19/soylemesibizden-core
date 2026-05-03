# SÖYLEMESİ BİZDEN — AI Agent Handoff Dökümanı

> Bu döküman projeyi devralacak AI agent için hazırlanmıştır.
> Tüm teknik detaylar, tamamlanan işler ve yapılacaklar buradadır.

---

## PROJE KİMLİĞİ

| Alan | Değer |
|------|-------|
| **Proje Adı** | Söylemesi Bizden Core |
| **Tip** | Kurumsal Gayrimenkul & Varlık Yönetim Platformu (Holding) |
| **Repo** | `minan19/soylemesibizden-core` |
| **Aktif Branch** | `claude/welcome-soylemesibizden-NUqP9` |
| **Local Path** | `/home/user/soylemesibizden-core` |
| **Canlı URL** | https://soylemesibizden-core.vercel.app/ |
| **Local Dev** | http://localhost:3000 |

---

## TEKNİK STACK

| Katman | Teknoloji |
|--------|-----------|
| Framework | Next.js 14.1.0 (App Router, Server Components) |
| Dil | TypeScript 5.3 (strict mode) |
| ORM | Prisma 5.22 |
| Veritabanı (local) | PostgreSQL 16 — `appuser:apppass@localhost:5432/soylemesibizden` |
| Veritabanı (cloud) | Neon Postgres — `ep-autumn-snow-am2ndsr3-pooler.c-5.us-east-1.aws.neon.tech` |
| Auth | NextAuth.js v4 (JWT + CredentialsProvider + bcryptjs 12 rounds) |
| Validasyon | Zod |
| Stil | Tailwind CSS 3.4 + Framer Motion 12 |
| Harita | MapLibre GL 5 |
| UI | Lucide React 1.8, Radix UI |
| Export | jsPDF 4 |
| Font | Montserrat |
| Deploy | Vercel |

---

## ORTAM DEĞİŞKENLERİ

### Local (`.env`)
```
DATABASE_URL="postgresql://appuser:apppass@localhost:5432/soylemesibizden"
NEXTAUTH_SECRET="sovereign-secret-key-2026-soylemesibizden-core"
NEXTAUTH_URL="http://localhost:3000"
```

### Vercel Production
```
DATABASE_URL="postgresql://neondb_owner:npg_o9LkQqp4FTiG@ep-autumn-snow-am2ndsr3-pooler.c-5.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
NEXTAUTH_SECRET="4f8b2c9e1a3d7f6b0e5c2a8d4f1b9e3c7a0d5f2b"
NEXTAUTH_URL="https://soylemesibizden-core.vercel.app"
```

---

## VERİTABANI MODELLERİ

```prisma
model User {
  id       String  @id @default(uuid())
  email    String  @unique
  name     String?
  password String?
  role     String  @default("USER") // USER | ADMIN | CONCIERGE
  listings      Listing[]
  offers        Offer[]
  dealRooms     DealRoom[]     @relation("BuyerDealRooms")
  ownedDeals    DealRoom[]     @relation("SellerDealRooms")
  advisoryCases AdvisoryCase[]
  assets        Asset[]
}

model Listing {
  id          String  @id @default(uuid())
  title       String
  description String
  price       Float
  location    String?
  status      String  @default("ACTIVE") // ACTIVE | PENDING | SOLD
  ownerId     String
  owner       User       @relation(...)
  offers      Offer[]
  dealRooms   DealRoom[]
}

model Offer {
  id        String  @id @default(uuid())
  amount    Float
  status    String  @default("PENDING") // PENDING | ACCEPTED | REJECTED
  listingId String
  userId    String
}

model DealRoom {
  id        String  @id @default(uuid())
  status    String  @default("OPEN") // OPEN | IN_PROGRESS | CLOSED
  listingId String
  buyerId   String
  sellerId  String
}

model AdvisoryCase {
  id          String  @id @default(uuid())
  subject     String
  description String
  status      String  @default("OPEN") // OPEN | RESOLVED
  userId      String
}

model Asset {
  id       String  @id @default(uuid())
  type     String
  value    Float
  location String?
  userId   String
}
```

---

## API ENDPOINTLERİ

| Endpoint | Methods | Açıklama |
|----------|---------|----------|
| `/api/listings` | GET, POST | Tüm ilanlar / yeni ilan |
| `/api/listings/[id]` | GET, PUT, DELETE | İlan detay / güncelle / sil |
| `/api/offers` | GET, POST | Teklifler |
| `/api/offers/[id]` | GET, PUT, DELETE | Teklif işlemleri |
| `/api/assets` | GET, POST | Varlıklar |
| `/api/assets/[id]` | GET, PUT, DELETE | Varlık işlemleri |
| `/api/deals` | GET, POST | Anlaşma odaları |
| `/api/deals/[id]` | GET, PUT, DELETE | Anlaşma işlemleri |
| `/api/concierge` | GET, POST | Danışmanlık vakaları |
| `/api/concierge/[id]` | GET, PUT, DELETE | Vaka işlemleri |
| `/api/auth/[...nextauth]` | NextAuth handler | Giriş/çıkış |
| `/api/auth/register` | POST | Zod validate + bcrypt hash ile kayıt |

---

## SAYFALAR (36 Route)

| Route | Açıklama | Durum |
|-------|----------|-------|
| `/` | Ana sayfa | Scaffold |
| `/dashboard` | Master Hub — canlı Prisma istatistikleri | Canlı veri ✅ |
| `/listings` | İlan listesi — URL filtre+arama+sıralama | Tam işlevsel ✅ |
| `/listing/[id]` | İlan detay — sahip, teklifler, CTA | Canlı veri ✅ |
| `/offers` | Teklifler | Scaffold |
| `/deals` | Anlaşma odaları | Scaffold |
| `/assets` | Varlık portföyü | Scaffold |
| `/asset/[id]` | Varlık detay | Scaffold |
| `/concierge` | Danışmanlık vakaları | Scaffold |
| `/login` | Giriş/Kayıt formu | Tam işlevsel ✅ |
| `/admin/dashboard` | Admin komuta merkezi | Scaffold |
| `/admin/create-asset` | Varlık oluşturma | Scaffold |
| `/admin/defense` | Defense engine | Scaffold |
| `/dark-pool` | Dark pool terminali | Scaffold |
| `/market-radar` | Piyasa radar | Scaffold |
| `/intelligence` | İstihbarat modülü | Scaffold |
| `/legal-vault` | Hukuki kasa | Scaffold |
| `/vault` | Dijital tapu kasası | Scaffold |
| `/analytics` | Analitik dashboard | Scaffold |
| `/boardroom`, `/boardroom/[id]` | Boardroom | Scaffold |
| `/auction/[id]` | Açık artırma | Scaffold |
| `/search` | Global arama | Scaffold |
| `/security` | Güvenlik | Scaffold |
| `/carbon` | Karbon & ESG | Scaffold |
| `/nexus` | Ekosistem nexus | Scaffold |
| `/radar` | Yield ısı haritası | Scaffold |
| `/typography-preview` | Font sistemi önizleme | Yardımcı |

---

## GÜVENLİK & AUTH

- **NextAuth.js v4** — JWT stratejisi, CredentialsProvider
- **bcryptjs** — 12 rounds password hashing
- **Zod** — API input validasyonu
- **`middleware.ts`** — 16 route korumalı, ADMIN role guard (`/admin/*` → sadece ADMIN rolü)
- **Korunan routelar:** `/dashboard`, `/listings`, `/offers`, `/deals`, `/assets`, `/concierge`, `/admin`, `/boardroom`, `/intelligence`, `/legal-vault`, `/vault`, `/dark-pool`, `/market-radar`, `/analytics`, `/security`
- **İlk admin oluşturma:** `/api/auth/register` ile kayıt yap → DB'de `UPDATE "User" SET role='ADMIN' WHERE email='...'`

---

## KRİTİK DOSYALAR

```
app/
├── layout.tsx                        # Root — font, SovereignProvider, AuthSessionProvider
├── loading.tsx                       # Global loading skeleton
├── error.tsx                         # Global error boundary
├── dashboard/page.tsx                # Canlı Prisma data — 4 istatistik kartı
├── listings/page.tsx                 # Server component — URL-based filter
├── listings/ListingsClient.tsx       # Client — search/filter/sort UI (useTransition)
├── listing/[id]/page.tsx             # Detay — owner, offers, fiyat paneli
├── login/page.tsx                    # NextAuth login + register toggle + eye toggle
├── api/auth/[...nextauth]/route.ts   # NextAuth handler + authOptions
├── api/auth/register/route.ts        # Zod validate + bcrypt + Prisma create
middleware.ts                         # withAuth — route protection + admin guard
providers/
├── SovereignProvider.tsx             # Global context — gerçek API fetch (mock yok)
├── SessionProvider.tsx               # NextAuth SessionProvider wrapper
prisma/schema.prisma                  # 6 model — User, Listing, Offer, DealRoom, AdvisoryCase, Asset
lib/
├── prisma.ts                         # Singleton PrismaClient
├── analytics.ts                      # calculateYieldDensity()
├── matching.ts                       # calculateMatchScore()
├── intelligence.ts                   # calculateInvestmentScore(), getYieldProjection()
├── simulator.ts                      # Monte Carlo portfolio simulation
├── auction.ts                        # calculateBidWeight()
├── dictionary.ts                     # i18n — TR/EN/AR/RU
.env                                  # Local env vars
.claude/settings.json                 # Claude Code izin ayarları
CLAUDE.md                             # Proje dökümanı (her session güncellenir)
```

---

## LOCAL ÇALIŞTIRMA

```bash
# 1. PostgreSQL başlat
pg_ctlcluster 16 main start

# 2. Dev server
cd /home/user/soylemesibizden-core
npm run dev
# → http://localhost:3000

# 3. TypeScript kontrol
npx tsc --noEmit

# 4. Prisma client yenile
npx prisma generate
```

---

## GIT İŞ AKIŞI

```bash
# Commit
git add <dosyalar>
git commit -m "[FAZ-X] Açıklama"

# Push (remote GitHub HTTPS'e bağlı)
git push origin claude/welcome-soylemesibizden-NUqP9
```

---

## TAMAMLANAN İŞLER

| FAZ | Yapılan İş |
|-----|-----------|
| FAZ-1 | `next.config.js` — `ignoreBuildErrors` ve `ignoreDuringBuilds` kaldırıldı |
| FAZ-1 | Admin route aktif edildi (`_page.tsx` → `page.tsx`) |
| FAZ-1 | Dashboard sidebar gerçek Next.js linkleri |
| FAZ-1 | 5 modül için tam CRUD API (listings, offers, assets, deals, concierge) |
| FAZ-1 | Global loading skeleton + error boundary |
| FAZ-2 | NextAuth.js JWT auth sistemi |
| FAZ-2 | Kayıt/giriş sayfası (toggle, password eye, hata mesajları) |
| FAZ-2 | Route protection middleware (16 route) |
| FAZ-2 | bcrypt password hashing (12 rounds) |
| FAZ-2 | Zod input validasyonu |
| FAZ-3 | Dashboard — canlı Prisma sorguları (4 istatistik kartı) |
| FAZ-3 | Listings — URL-tabanlı server-side filtre + arama + sıralama |
| FAZ-3 | ListingsClient — Enter araması, durum filtreleri, useTransition |
| FAZ-3 | Listing detay sayfası — gerçek Prisma verisi |
| FAZ-3 | SovereignProvider — mock data tamamen kaldırıldı, gerçek API |
| Altyapı | Neon Postgres cloud DB kuruldu (tablolar oluşturuldu) |
| Altyapı | Vercel env vars eklendi (DATABASE_URL, NEXTAUTH_SECRET, NEXTAUTH_URL) |
| Altyapı | `.claude/settings.json` — izin ayarları |
| Altyapı | `CLAUDE.md` oluşturuldu |
| Bug Fix | SovereignMap named → default export |
| Bug Fix | VirtualTour — `pannellum-react` bağımlılığı kaldırıldı |
| Bug Fix | Dashboard JSX — `TS17008` kapanış etiketi hatası |
| Bug Fix | `intelligence.ts` — eksik export fonksiyonlar eklendi |
| Bug Fix | 10+ TypeScript / JSX hatası düzeltildi |

---

## YAPILACAKLAR (Roadmap)

### FAZ-4 — Kurumsal Özellikler (Sıradaki)
- [ ] Admin paneli — ilan oluştur / düzenle / sil CRUD formu
- [ ] Kullanıcı başvuru akışı + admin onay sistemi
- [ ] E-mail bildirimleri (Resend veya SendGrid entegrasyonu)
- [ ] PDF rapor export (jsPDF kurulu, entegrasyon yapılmadı)
- [ ] Audit log — her işlemin kaydı
- [ ] Holding yapısı için çoklu şirket desteği

### FAZ-5 — Performans & Kalite
- [ ] TypeScript `any` tip kullanımları temizlenmeli
- [ ] `components/` altında 111 orphan (kullanılmayan) component temizliği
- [ ] Unit + integration test altyapısı (Jest + Testing Library)
- [ ] Lighthouse skoru >95 hedefi
- [ ] SEO meta tags
- [ ] i18n gerçek içerik doldurma (altyapı var: TR/EN/AR/RU)

### FAZ-6 — Modüler Genişleme
- [ ] Real-time güncellemeler (Pusher veya Server-Sent Events)
- [ ] Dosya upload (Vercel Blob veya S3)
- [ ] Webhook altyapısı
- [ ] API key yönetimi (dış entegrasyon)
- [ ] Mobil responsive iyileştirme
- [ ] `app/compare.tsx` — yanlış konumda, `components/`'a taşınmalı

---

## ÖNEMLİ NOTLAR

1. **`next.config.js`** — `ignoreBuildErrors` ve `ignoreDuringBuilds` kaldırıldı. TypeScript ve ESLint hataları artık build'i durdurur.

2. **İlk admin kullanıcısı** — `/api/auth/register` ile kayıt yap, ardından:
   ```sql
   UPDATE "User" SET role = 'ADMIN' WHERE email = 'admin@email.com';
   ```

3. **`components/`** — 156 component var, sadece ~45'i aktif kullanımda. 111'i orphan, temizlenecek.

4. **`SovereignProvider`** — Eski hardcoded `CORE_DATABASE` mock verisi tamamen kaldırıldı. Artık `/api/listings`, `/api/assets`, `/api/offers`, `/api/deals` endpoint'lerinden gerçek veri çekiyor.

5. **Para birimi** — Tüm fiyatlar `tr-TR` locale ile formatlanıyor (`toLocaleString('tr-TR')`). Tutarlı kalmalı.

6. **Prisma migration** — `prisma migrate dev` TTY gerektiriyor. Migration yerine `prisma db push` veya manuel SQL kullanılıyor. Neon DB'ye tablolar manuel SQL ile oluşturuldu.

7. **i18n altyapısı** — `lib/dictionary.ts` ve `context/LanguageContext.tsx` mevcut. TR/EN/AR/RU destekli. İçerik henüz doldurulmadı.

8. **Vercel token** — Vercel Dashboard → Account Settings → Tokens'dan yeni token oluşturun (Vercel API erişimi için)

9. **GitHub token** — GitHub → Settings → Developer Settings → Personal Access Tokens'dan oluşturun (repo push için)

---

*Döküman tarihi: 2026-05-03 | Hazırlayan: Claude Sonnet 4.6*
