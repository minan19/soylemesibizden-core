# SÖYLEMESİ BİZDEN — Yapılacaklar için Hazır Promptlar

Bu dosyadaki her blok, bir yapay zekâ kod asistanına (bu sohbet, Claude Code vb.) **olduğu gibi kopyala-yapıştır** verilebilecek şekilde yazılmıştır. Önem sırasına göre dizilmiştir. Her promptun sonunda **Kabul Kriteri** vardır — iş bitince bunları doğrula.

Çalışılacak ana dizin: `Frontend/NextJS_16_Web`

> Genel kural (her prompta ekleyebilirsin): "Değişiklikten önce ilgili dosyayı oku. Mevcut çalışan davranışı bozma. Bitince `npx tsc --noEmit` çalıştır ve değiştirdiğin rotaları gözden geçir."

---

## 🔴 ÖNCELİK 1 — Güvenlik (önce bunlar)

### P1.1 — Açık GET rotalarını kapat (PII sızıntısı)
```
Aşağıdaki iki API rotasında GET fonksiyonunda oturum (getServerSession) ve sahiplik kontrolü YOK; kimliği doğrulanmamış herkes tüm kullanıcı e-postalarını ve tutarları çekebiliyor. Bunu düzelt:

1) app/api/offers/route.ts — GET: getServerSession(authOptions) ile oturum zorunlu kıl. Sadece kullanıcının kendi teklifleri VEYA sahibi olduğu ilanlara gelen teklifleri döndür: where: { OR: [{ userId }, { listing: { ownerId: userId } }] }. Kullanıcı ADMIN değilse response'taki user.email alanını çıkar.
2) app/api/deals/route.ts — GET: oturum zorunlu kıl. Sadece buyerId === userId || sellerId === userId (veya role ADMIN) olan dealRoom kayıtlarını döndür.

Aynı dosyalardaki POST davranışını bozma. Oturumsuz isteklerde 401 dön.
Kabul Kriteri: Oturumsuz GET → 401. Kullanıcı A, kullanıcı B'nin tekliflerini/anlaşmalarını ve e-postasını GÖREMEZ.
```

### P1.2 — Bildirim gönderme ucunu kapat
```
app/api/notifications/send/route.ts şu an tamamen açık: oturum yok, body'den gelen userId'ye doğrudan bildirim push'luyor. Herkes herhangi birine sahte bildirim gönderebiliyor.

Düzelt: Bu ucu yalnızca sunucu-içi çağrıya kapat. İki seçenekten birini uygula:
(a) getServerSession ile oturum zorunlu kıl ve kullanıcı SADECE kendi userId'sine bildirim gönderebilsin; ya da
(b) İç servis çağrısıysa, paylaşılan bir secret header (x-internal-token === process.env.INTERNAL_API_TOKEN) doğrula.
Body'yi Zod ile şemalandır (userId, type, message).
Kabul Kriteri: Yetkisiz/oturumsuz POST → 401/403. Başka bir kullanıcının userId'sine bildirim gönderilemez.
```

### P1.3 — API anahtarlarını hash'le
```
B2B API anahtarları DB'de düz metin saklanıyor. lib/apiKeyUtils.ts içinde zaten hashApiKey() (SHA-256) var ama kullanılmıyor.

Düzelt:
1) app/api/keys/route.ts (POST): oluştururken DB'ye key: hashApiKey(rawKey) yaz. rawKey'i kullanıcıya SADECE bu response'ta bir kez döster (bir daha gösterilemez uyarısıyla).
2) Anahtarı doğrulayan her yer gelen ham anahtarı hashApiKey ile hash'leyip karşılaştırsın. Özellikle app/api/v1/market/[city]/route.ts: prisma.apiKey.findUnique({ where: { key: apiKeyRaw, active: true }}) YANLIŞ (active unique değil). Bunu findFirst({ where: { key: hashApiKey(apiKeyRaw), active: true }}) yap.
3) Mevcut düz metin anahtarlar için kısa bir migration notu yaz (eski anahtarları geçersiz kıl, kullanıcılar yenisini üretsin).
Kabul Kriteri: DB'de hiçbir anahtar düz metin değil. Doğrulama hash üzerinden çalışıyor. v1/market geçerli/aktif anahtarla çalışıp pasif anahtarı reddediyor.
```

### P1.4 — IDOR / sahiplik doğrulamaları
```
Şu rotalarda istemciden gelen veriye güveniliyor; sunucuda doğrula:
1) app/api/deals/route.ts (POST): sellerId'yi body'den ALMA. listingId'yi DB'den çek, sellerId = listing.ownerId olarak sunucuda türet. listing yoksa 404.
2) app/api/documents/route.ts (POST): listingId verilmişse, o ilanın sahibi (listing.ownerId === userId) ya da ilgili deal tarafı olduğunu doğrula; değilse 403.
3) app/api/deals/[id]/route.ts (GET): PUT'taki aynı kontrolü uygula — sadece alıcı/satıcı/ADMIN görebilsin; değilse 403/404.
Kabul Kriteri: Kullanıcı, sahibi olmadığı ilana belge bağlayamaz; keyfi sellerId ile anlaşma açamaz; başkasının deal'ini GET edemez.
```

### P1.5 — Rate limit'i güçlendir ve dayanıklı yap
```
lib/ratelimit.ts modül yüklenirken Redis.fromEnv() çağırıyor; Upstash env yoksa import anında patlama riski var. Ayrıca rate limit yazma/auth uçlarında eksik.

Düzelt:
1) Rate limiter'ı tembel (lazy) başlat; UPSTASH env'i yoksa graceful fallback (no-op veya basit in-memory limiter) ile çalışsın, asla import anında exception atmasın.
2) Şu uçlara kullanıcı/IP bazlı rate limit ekle: app/api/auth/register, app/api/offers (POST), app/api/keys (POST), app/api/upload.
Kabul Kriteri: Env eksikken uygulama ayağa kalkıyor (çökmüyor). Sayılan uçlar limit aşımında 429 dönüyor.
```

---

## 🟠 ÖNCELİK 2 — Build hijyeni & bağımlılık

### P2.1 — Tek Next config
```
Frontend/NextJS_16_Web içinde next.config.js, next.config.mjs ve next.config.mjs.bak birlikte duruyor. Next.js .js'i tercih edip .mjs'deki ayarları (typescript.ignoreBuildErrors, eslint.ignoreDuringBuilds, experimental.serverComponentsExternalPackages: ['undici','@vercel/blob','pusher']) yok sayabiliyor.

Düzelt: Tüm ayarları TEK dosyada birleştir (next.config.js'te kalsın, CommonJS). next.config.mjs ve next.config.mjs.bak dosyalarını sil. Birleşik config images.unoptimized + transpilePackages + serverComponentsExternalPackages + (şimdilik) ignore bayraklarını içersin.
Kabul Kriteri: Dizinde tek config dosyası var; `npm run build` başarılı; undici parse hatası yok.
```

### P2.2 — lucide-react sürümünü doğrula/düzelt
```
package.json'da lucide-react ^1.8.0 yazıyor; bu anormal bir sürüm (paketin gerçek aktif serisi 0.4xx). 199 dosya bu paketten ikon import ediyor.

Yap: Önce projede kullanılan ikonların gerçekten render olup olmadığını kontrol et (birkaç sayfayı çalıştır). İkonlar eksik/bozuksa lucide-react'i güncel kararlı sürüme (^0.4xx) güncelle, kırılan import adlarını düzelt, build'i test et. Sorun yoksa olduğu gibi bırak ama package.json'a neden 1.8.0 kullanıldığını yorum olarak not düş.
Kabul Kriteri: Tüm ikonlar render oluyor; build ve runtime'da lucide-react importu kaynaklı hata yok.
```

---

## 🟠 ÖNCELİK 3 — Mimari temizlik

### P3.1 — İç içe NestJS projesinin kaderini belirle
```
Frontend/NextJS_16_Web/soylemesi-bizden-os/ içinde ayrı bir NestJS uygulaması var; kendi package.json'u ve UYUMSUZ Prisma şeması (enum Role/Status) ile. Ana Next.js uygulaması bunu hiçbir yerden import etmiyor (grep "soylemesi-bizden-os" → 0).

Yap: Önce bu projenin kullanılıp kullanılmadığına karar vermem için kısa bir rapor çıkar (içindeki gerçek iş mantığı ne, ana app'le örtüşüyor mu). Sonra iki yoldan biri:
(a) Kullanılacaksa: repo köküne Backend_NestJS/ olarak TAŞI, ayrı serviste deploy edilecek şekilde ayır, tek bir kaynak-of-truth Prisma şeması seç.
(b) Kullanılmıyorsa: klasörü ve içindeki stale dist/ + node_modules'ü SİL.
Hiçbir adımda ana Next.js uygulamasının build'ini bozma.
Kabul Kriteri: Tek net backend kaynağı var; iki uyumsuz şema bir arada durmuyor; ana app build'i geçiyor.
```

### P3.2 — Ölü kodu temizle
```
components/ altında ~169 component var; ~100'ü hiçbir yerden import edilmiyor (örn. EliteCRM, EliteCRM_v2, SmartRegistryV3/V4/V5, PortfolioVault, GlobalSynergyHub, SovereignRegistryV2, TreasuryV2, NeuralOptimizationV3). Sadece V2'ler kullanımda.

Yap:
1) knip veya ts-prune kur ve kullanılmayan export/dosyaları raporla.
2) Hiçbir yerden import edilmeyen component'leri sil (silmeden önce listeyi bana göster, onay al).
3) app/compare.tsx yanlış konumda (route değil) — ya app/compare/page.tsx'e taşı ya da sil. app/admin/_page.tsx (devre dışı) için karar ver.
Kabul Kriteri: knip/ts-prune ölü export listesi belirgin şekilde küçüldü; build hâlâ geçiyor.
```

### P3.3 — Terk edilmiş polyglot stub'ları kaldır
```
Kök dizindeki şu klasörler derlenebilir proje DEĞİL (go.mod / Cargo.toml / requirements.txt yok), frontend hiçbirini çağırmıyor, içerikleri random/print ile sahte: AI_Engine, AI_Engine_Python, Backend, Backend_Go, Search_Engine_Rust, Frontend_NextJS (boş).

Yap: Bunlar gelecekteki mimari planıysa içeriklerini Docs/ altında bir "mimari yol haritası" notuna taşı ve koddan çıkar; değilse klasörleri sil. AI_Engine vs AI_Engine_Python ve Backend vs Backend_Go ikilemesini tek isimde netleştir.
Kabul Kriteri: Kök dizinde yalnızca gerçekten kullanılan/planlandığı net belgelenen yapılar kalıyor.
```

---

## ⚪ ÖNCELİK 4 — Sağlamlaştırma (test, hata, env, DB)

### P4.1 — CI + ilk testler
```
Projede hiç test ve CI yok.
Yap:
1) vitest kur; lib/ altındaki saf fonksiyonlar için unit testler yaz: investmentScore, trustEngine, auction, services/decision/ScoreEngine. En az "mutlu yol + sınır" senaryoları.
2) .github/workflows/ci.yml ekle: npm ci → npx tsc --noEmit → npx next lint → npx prisma validate → npm run build adımlarını çalıştırsın.
Kabul Kriteri: `npx vitest run` yeşil; workflow dosyası push'ta çalışacak şekilde geçerli.
```

### P4.2 — Hata sınırları + gözlemlenebilirlik
```
app/ altında error.tsx, global-error.tsx, not-found.tsx YOK; bir client hatası tüm sayfayı çökertiyor. Yapılandırılmış log da yok.
Yap:
1) app/error.tsx, app/global-error.tsx, app/not-found.tsx ekle (kullanıcı dostu, markaya uygun).
2) Sentry (@sentry/nextjs) entegre et; API route'lardaki console.error'ları yapılandırılmış log + Sentry capture ile değiştir, PII'yi maskele.
Kabul Kriteri: Bilerek atılan bir hata tüm sayfayı çökertmeyip error.tsx gösteriyor; hatalar Sentry'ye düşüyor.
```

### P4.3 — Fail-fast env doğrulaması
```
Env değişkenleri her yerde ad-hoc okunuyor (process.env... ?? ''). Eksik NEXTAUTH_SECRET/DATABASE_URL runtime'da derinde patlıyor.
Yap: lib/env.ts oluştur; zod ile zorunlu env şeması tanımla (DATABASE_URL, NEXTAUTH_SECRET, NEXTAUTH_URL, STRIPE_*, opsiyoneller opsiyonel). Uygulama başlangıcında parse et, eksikte anlaşılır hata ver. Kod tabanında process.env doğrudan okumalarını kademeli olarak env nesnesine geçir.
Kabul Kriteri: Zorunlu env eksikken uygulama net bir mesajla başlangıçta durur (runtime'da gizli hata değil).
```

### P4.4 — Prisma: index, mesajlaşma, bildirim, arama
```
prisma/schema.prisma'da sadece DecisionRecord'da index var; mesajlaşma ve kalıcı bildirim modeli yok; tam metin arama yok.
Yap:
1) Sık sorgulanan alanlara @@index ekle: Listing(ownerId, status, propertyType, priceAmount, createdAt), Offer(listingId, userId), DealRoom(buyerId, sellerId), Document(listingId).
2) Message ve Conversation modelleri ekle (DealRoom ile ilişkili kalıcı mesajlaşma).
3) Notification modeli ekle (kalıcı bildirim geçmişi; /api/notifications/stream bununla beslensin).
4) Listing.title/description için Postgres arama indeksi (pg_trgm veya tsvector) planı ekle.
Migration üret ama yıkıcı değişiklik varsa önce uyar.
Kabul Kriteri: `npx prisma validate` geçiyor; migration üretiliyor; yeni modeller şemada.
```

---

## 🟡 ÖNCELİK 5 — Ürün dürüstlüğü & büyüme

### P5.1 — Skorlama "zekası"nı dürüstleştir veya gerçek veriye bağla
```
Şu modüller gerçek bir modele değil, el yazısı sabitlere dayanıyor: lib/investmentScore.ts, lib/intelligence.ts, app/api/intelligence/sovereign-score, esg-score, services/decision/*. Ayrıca app/api/intelligence/report/route.ts hata anında gizlice sabit bir rapora (trustScore: 94.7 vb.) düşüyor.

Yap (iki seçenek, birini uygula ve gerekçesini yaz):
(a) Bu skorları platformdaki gerçek ilan verisinden türeyen istatistiklere bağla (bölge ortalama m², gerçek arz/talep, gerçek işlem geçmişi).
(b) Gerçek veri yoksa: UI'de bu skorların "tahmini/heuristik" olduğunu açıkça etiketle ve report rotasındaki gizli sabit-fallback'i kaldır (hata varsa dürüstçe hata dön, sahte 94.7 dönme).
Kabul Kriteri: Kullanıcıya gösterilen hiçbir skor, gerçeği yanlış temsil eden gizli sabit değil; ya gerçek veriye dayanıyor ya da açıkça "tahmin" etiketli.
```

### P5.2 — i18n ve SEO
```
i18n yüzeysel (lib/dictionary.ts: 4 dil × ~5 anahtar); SEO neredeyse yok (48 sayfanın 47'sinde metadata yok, sitemap/robots yok).
Yap:
1) next-intl (veya mevcut dictionary'i gerçek anahtar setiyle doldur) ile arayüzün tamamını çevrilebilir yap.
2) app/sitemap.ts ve app/robots.ts ekle; ilan ve ana sayfalara generateMetadata (başlık, açıklama, OpenGraph) ekle.
Kabul Kriteri: Dil değiştirince arayüzün tamamı çevriliyor; /sitemap.xml ve /robots.txt üretiliyor; ilan sayfalarında meta etiketleri var.
```

---

### Kullanım önerisi
Promptları **tek tek** ve **öncelik sırasıyla** ver; her birinden sonra build + tsc kontrolü yap. Güvenlik (Öncelik 1) tamamlanmadan üretime/demoya çıkma. Büyük silme işlemlerinde (P3.2/P3.3) önce listeyi onayla, sonra sil.
