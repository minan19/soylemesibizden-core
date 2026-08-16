# main ↔ origin/main Entegrasyon Planı (FAZ 3)

Çalışma deposu: `Frontend/NextJS_16_Web` (nested git). Remote: `minan19/soylemesibizden-core`.

## Durum
İki dal paralel iki geliştirme koluna ayrılmış (merge-base: `b660477`):
- **local main** — 20 commit önde. Daha gelişmiş kol: zengin Prisma şeması (+294 satır), API rotalarında auth, dead-component temizliği (169→66), TrustScore + dashboard cold-start fix.
- **origin/main** — 11 commit önde. Benzersiz kıymeti: FAZ-1/2/3 commit geçmişi, **`add_password` migration'ı**, veri çeken `SovereignProvider`, biraz daha geniş middleware matcher, typography-preview sayfası.

**Yedekler alındı (local):** `backup/local-main-20260623` (tag), `backup/origin-main` (branch). Hiçbir şey kaybolmaz.

> ⛔ **FORCE PUSH YAPMA.** Origin'in `add_password` migration'ını ve FAZ geçmişini kalıcı siler.

---

## ADIM 1 — Migration kararı (her şeyin önkoşulu) 🔴
İki dalın migration soy ağacı **uyumsuz**:
- local: `20260414151524_init_sovereign_v2`
- origin: `20260416000000_init` + `20260420000000_add_password`

Canlı (Neon/Vercel) DB hangi sete sahipse **o** kanoniktir; yanlışını deploy edersen `prisma migrate deploy` production DB'yi bozabilir. Bunu kendi makinende öğren:

```
cd "/Users/mustafainan/Desktop/SOYLEMESIBIZDEN_PROJE/Frontend/NextJS_16_Web"
npx prisma migrate status
```

Çıktıdaki "applied" migration adlarına bak:
- `..._init_sovereign_v2` görünüyorsa → **canlı DB = LOCAL soy ağacı.**
- `..._init` + `..._add_password` görünüyorsa → **canlı DB = ORIGIN soy ağacı.**
- Hiçbiri yok / boş DB → migration'ları tek temiz init'te birleştirebiliriz.

Bu sonucu bana ilet; tüm migration/schema kararı buna göre kesinleşecek.

---

## ADIM 2 — Dosya-bazlı çözüm planı (34 çakışma)
Önerilen strateji: **local main'i temel al, origin'in yalnızca benzersiz-ve-değerli parçalarını port et** (simetrik 34-dosya merge'i yerine — daha az risk).

### A) Local kazanır (local daha ileri)
- `prisma/schema.prisma` → **LOCAL** (gerçek şema; origin +1 satır).
- API rotaları: `offers`, `deals`, `deals/[id]`, `offers/[id]`, `listings`, `listings/[id]`, `assets`, `assets/[id]`, `auth/register`, `auth/[...nextauth]`, `concierge` → **LOCAL** (auth/güvenlik local'de mevcut). *İstisna: origin bir rotada local'de olmayan ek koruma eklediyse ona bakıp taşırız.*
- `lib/intelligence.ts` → **LOCAL** (TrustScore fix burada). `calculateInvestmentScore`/`getYieldProjection` imza çakışması: local imzasını koru, origin'in çağıranları varsa local imzasına uyarla.
- `app/dashboard/page.tsx` → **LOCAL** (cold-start try/catch + temizlenmiş menü). *Karar gerekli:* origin'in menüsünde local'de olmayan kalemler var (MARKET RADAR, ANLAŞMALAR, LEGAL VAULT, INTELLIGENCE). İstersen bu linkleri local menüye ekleriz.
- `.gitignore` → birleştir (iki tarafın kuralları birlikte).

### B) Origin'den port edilecek (benzersiz değer)
- `prisma/migrations/20260420000000_add_password/` → **ADIM 1 sonucuna göre.** Canlı DB origin soy ağacındaysa korunmalı.
- `providers/SovereignProvider.tsx` → origin'de `/api/listings` çeken gerçek veri sağlayıcı. *Karar gerekli:* origin sürümünü mü alalım, yoksa local sürümü mü yeterli?
- `middleware.ts` → neredeyse aynı; sadece origin'in daha geniş `matcher` listesini al (union).
- Typography-preview sayfası (`public/typography-preview.html`, `app/.../page` preview) → zararsız; istenirse korunur.

### C) Mekanik birleştirme
- `package.json` / `package-lock.json` → bağımlılıkların **union**'ı (ikisinden de eksik paket kalmasın), sonra `npm install` ile lock yeniden üret.
- `prisma/migrations/migration_lock.toml` → tek sürüm (provider `postgresql`).

### D) Component çakışmaları (7) — çoğu teatral
- `SecureBoot.tsx` (local sildi / origin değiştirdi), `GlobalSynergyHub`, `SovereignBoardroom`, `SovereignMessaging`, `VirtualTour`, `AssetCreator`, `AssetShareModal` → kural: local'de **bilinçli silindiyse silinmiş kalsın**; origin'in eklediği gerçek (teatral olmayan) mantık varsa taşı. Tek tek bakılacak.

### E) Config
- `next.config.js` → mevcut hâlini koru (senin tercih ettiğin sade sürüm).

---

## ADIM 3 — Uygulama (Adım 1 + kararlar netleşince)
1. `integration/merge-origin` dalında strateji uygulanır (local temel + origin port).
2. `npx tsc --noEmit` temiz olmalı.
3. **Sen kendi makinende `npm run build` çalıştırıp doğrularsın** (ben sandbox'ta build çalıştıramıyorum).
4. Doğrulandıktan sonra `integration/merge-origin` → `main` merge, ardından **normal** `git push` (force değil). Vercel deploy.

---

## Karar bekleyen 3 madde
1. **Migration:** Adım 1 çıktısı (canlı DB hangi soy ağacında?).
2. **Dashboard menüsü:** origin'in ekstra linkleri local menüye eklensin mi?
3. **SovereignProvider:** origin'in veri-çeken sürümü mü, local sürümü mü?
