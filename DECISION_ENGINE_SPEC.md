# 🎯 SOVEREIGN DECISION ENGINE
## MASTER SPECIFICATION v1.0

---

## BÖLÜM 1: DECISION ENGINE MISSION

**Tekil Amaç (The North Star):**

> "Kullanıcının gayrimenkul kararı verirken tüm alternatifleri görerek, her riski ölçüleyerek, finansal hedefleriyle tam uyumlu bir seçim yapmasını sağlamak."

**Neden Burada?**
- Sahibinden: Liste gösterir, karar sizin
- Hepsiemlak: Arama motoru, yine kararınız
- **Sovereign**: Karar motoru, bilinçli tercih yapmanız

---

## BÖLÜM 2: KARAR TÜRLERİ (6 MATRIX)

### 2.1 SATINALA KARARı

**Input (Zorunlu):**
```json
{
  "budget": 2500000,
  "downPayment": 500000,
  "monthlyCapacity": 15000,
  "creditCapacity": 2000000,
  "holdDuration": 7,
  "riskTolerance": "MEDIUM",
  "lifeStyle": "INVESTMENT_FOCUSED"
}
```

**Değerlendirme Kriterleri (6 Boyut):**
- **Finansal Uygunluk** (0-100): Kredi/borç oranı, aylık giderin gelire oranı, LTV ratio
- **Fiyat Uygunluğu** (0-100): Bölge medyani vs, benzer evlere kıyasla
- **Lokasyon Kalitesi** (0-100): Infrastruktur, gentrification hızı, future growth
- **Risk Skoru** (0-100): Mülk riski, bölge riski, ekonomik döngü etkisi
- **Likidite** (0-100): Satılabilirlik hızı, niche market vs mainstream
- **Getiri Potansiyeli** (0-100): Kira yield + capital appreciation

**Output Formatı:**
```
SATIN AL KARARı RAPORU
═══════════════════════

KARAR: ✅ AL (Puan: 82/100, Güven: 88%)
───────────────────────────────────────────

📊 SİSTEM SKORU
  Finansal Uygunluk:     85% ✅
  Fiyat Uygunluğu:       78% ⚠️  (Medyandan +3%)
  Lokasyon Kalitesi:     90% ✅
  Risk Skoru:            72% ✓
  Likidite:              85% ✅
  Getiri Potansiyeli:    88% ✅

🎯 KARAR ÖZETI
Beşiktaş'ta Akatlar evini al, 5-7 yıl için optimal uyum.
Piyasa timing şu anda 88/100 (zirveye 3 ay kaldı).

🔥 TOP 5 NEDEN
1. Fiyat şu anda -4% altında (tarihsel ortalama)
2. Bölge gentrification döngüsünde (property values +3.2%/yıl)
3. Metro açılış 18 ay sonra → +15% potansiyel
4. Kira getirisi 4.5% (şehir ortalaması: 3.8%)
5. Mortgage amortize edilecek (7 yıl → %0 artık değer)

⚠️ TOP 5 RİSK
1. Faiz oranı artışı → aylık ödeme +18%
2. Piyasa düşüşü (-8% → negatif equity)
3. Gentrification başarısız olabilir
4. Rant kontrolü uygulanabilir
5. İş kaybı → kredi ödeme zorluğu

📈 WHAT-IF SENARYOLARI
  Budget +20%: Puan → 85/100 (Daha seçenek)
  Faiz +2%: Puan → 78/100 (Halen yapılabilir)
  Değer -10%: Puan → 68/100 (Risk aşırı)
  Hold süresi 5 yıl: Puan → 76/100 (Dönem kısa)

💡 COPILOT ÖNERİSİ
"Şimdi al. Piyasada 3 ay içinde -2% görülerse daha
iyi koşullarla tekrar gözlem yap. Ama şu anda en
optimal pencere."

GÜVEN YÜZDESI: 88%
(Panel bağımsız doğrulama: 3/3 onay)
```

---

### 2.2 SAT KARARı

**Giris:**
```json
{
  "currentValue": 2400000,
  "purchasePrice": 1800000,
  "expenses": 150000,
  "ownedMonths": 84,
  "rentIncome": 8000,
  "taxBurden": "HIGH"
}
```

**Output:**
```
SAT KARARı RAPORU
═════════════════

KARAR: ✅ SAT (Puan: 78/100, Güven: 82%)

Gerçekleşen Getiri: +33% (yıllık 4.7%)
Pazar Timing: 78/100 (zirveye yakın)
Vergi Yükü: 250K₺ (capital gains)

Alternatif getiri senaryoları:
- Sat → Tahvil: 400K₺/yıl
- Sat → Yeni konut: 600K₺/yıl
- Tut → 5 yıl: 480K₺/yıl (risk daha yüksek)
```

---

### 2.3 KİRALAMA KARARı

```
KİRALAMA RAPORU
════════════════

Brüt Yield: 4.5% (9K₺/ay ÷ 2.4M)
Net Yield: 3.2% (masraflar: 28%)
Boşluk Riski: 8%
Tenant Kalitesi: 92/100

KARAR: ✅ KİRALA
```

---

### 2.4 YATIRIM KARARı (Portfolio)

```
PORTFÖY EKLEME RAPORU
══════════════════════

Mevcut Dağılım:
  Gayrimenkul: 45%
  Borsa/Tahvil: 40%
  Nakit: 15%

İdeal Dağılım (Risk: ORTA):
  Gayrimenkul: 40%
  Borsa/Tahvil: 45%
  Nakit: 15%

KARAR: ✅ EKLE (Gayrimenkul over-concentrated değil)
```

---

### 2.5 BEKLEME KARARı

```
BEKLEME RAPORU
════════════════

Piyasa Sinyalleri:
  Satış süresi: 2.5 ay (talep azalıyor)
  Fiyat premium: +4% (ortalamadan)
  Mortgage rates: %8 (3 ay öncesi %7.5)

Bekleme Süresi: 6 ay

Senaryolar:
  Best: -5% → kazanç +250K
  Base: -2% → kazanç +100K
  Worst: +3% → kayıp -150K

KARAR: ✅ BEKLE 6 AY
```

---

### 2.6 PORTFÖY REBALANCE KARARı

```
REBALANCE RAPORU
═════════════════

Hedef Dağılım (45Y, ORTA risk):
  Gayrimenkul: 40% (şu: 65% → -25%)
  Borsa: 35% (şu: 20% → +15%)
  Tahvil: 15% (şu: 10% → +5%)
  Nakit: 10% (şu: 5% → +5%)

KARAR: ✅ REBALANCE (Gayrimenkul satış başlat)
```

---

## BÖLÜM 3: INPUT MODEL

### Zorunlu Alanlar (Core)

```typescript
interface UserProfile {
  // Demografik
  age: number;
  income: number;
  employmentStability: "HIGH" | "MEDIUM" | "LOW";
  
  // Finansal
  totalAssets: number;
  debt: number;
  creditScore: number;
  
  // Psikolojik
  riskTolerance: "LOW" | "MEDIUM" | "HIGH";
  investmentHorizon: number; // yıl
  psychologicalStressCapacity: number; // 1-10
  
  // Hedef
  primaryGoal: "HOUSING" | "INVESTMENT" | "HYBRID";
  secondaryGoals: string[];
  targetReturn: number; // %
}

interface PropertyData {
  // Temel
  type: "RESIDENTIAL" | "COMMERCIAL" | "LAND";
  price: number;
  area: number;
  
  // Lokasyon
  location: string;
  infrastructureScore: number; // 1-100
  gentrifiactionRate: number; // %/yıl
  
  // Finansal
  estimatedRental: number;
  maintenanceCost: number;
  taxBurden: number;
}
```

### Opsiyonel Alanlar

- Satıcı motivasyonu
- Zaman baskısı
- Vergi durumu
- Diğer gayrimenkuller
- Sigorta/Emeklilik ürünleri

---

## BÖLÜM 4: TRUST LAYER

Karar vermeden önce sistem şunları doğrula:

```typescript
interface TrustChecks {
  dataAccuracy: 0-100;      // Veri doğruluğu
  listingAuthenticity: 0-100; // İlan gerçekliği
  priceConsistency: 0-100;   // Fiyat tutarlılığı
  regionRisk: 0-100;         // Bölge riski
  sellerBackground: 0-100;   // Satıcı geçmişi
  marketSentiment: 0-100;    // Pazar duygusallığı
}

// Minimum threshold: 70/100
// < 70: "Daha fazla bilgi gerekli"
// < 50: "Bu mülkü önermiyor, risk çok yüksek"
```

---

## BÖLÜM 5: DECISION SCORE (0-100)

### Formula

```
DECISION_SCORE = (
  FINANCIAL_FIT * 0.25 +
  PRICE_FAIRNESS * 0.15 +
  LOCATION_QUALITY * 0.20 +
  RISK_MANAGEMENT * 0.15 +
  RETURN_POTENTIAL * 0.15 +
  LIQUIDITY * 0.10
)
```

### Score Interpretation

- **85-100**: Strong BUY — Bilinçli tercih yapabilirsin
- **70-84**: Qualified BUY — Riskler değerlendi, yapılabilir
- **50-69**: CAUTIOUS — Daha fazla araştırma yap
- **30-49**: HOLD — Şartlar iyileşmeyi bekle
- **0-29**: AVOID — Pas geç, başka seçenek ara

---

## BÖLÜM 6: EXPLAINABILITY SYSTEM

Her karar çıktısı şu soruyu yanıtlaması gerekir:
**"Neden bu sonucu aldım?"**

Kullanıcı görmeli:

```
WHY THIS DECISION?
═══════════════════

🎯 STRONGEST 5 REASONS
  1. [Reason] — Weight: 18%
  2. [Reason] — Weight: 16%
  3. [Reason] — Weight: 14%
  4. [Reason] — Weight: 12%
  5. [Reason] — Weight: 10%
  (Total: 70% of decision)

⚠️ BIGGEST 5 RISKS
  1. [Risk] — Impact: HIGH
  2. [Risk] — Impact: HIGH
  3. [Risk] — Impact: MEDIUM
  4. [Risk] — Impact: MEDIUM
  5. [Risk] — Impact: LOW

🔄 ALTERNATIVE SCENARIOS
  If budget +20%: Score → 85 (vs 82)
  If rates +2%: Score → 78 (vs 82)
  If hold 10yr: Score → 88 (vs 82)
```

---

## BÖLÜM 7: WHAT-IF ENGINE

Kullanıcı değiştirebilecek parametreler:

```typescript
interface WhatIfVariables {
  budget: number;           // ±50%
  downPayment: number;      // ±30%
  interestRate: number;     // ±3%
  rentalYield: number;      // ±2%
  riskTolerance: "LOW" | "MEDIUM" | "HIGH";
  holdDuration: number;     // 1-50 yıl
  targetReturn: number;     // ±10%
}

// Her değişiklik: Score yeniden hesaplanır (instant)
// Tüm outputlar güncellenir
```

**UI:**
```
Bütçe: [₺2.5M] ← Drag to adjust

📊 Instant Feedback:
  Score değişti: 82 → 85 (+3)
  Monthly payment: 15K₺ → 17K₺
  Kira yield: 4.5% → 4.2%
  ROI 5 yıl: +28% → +32%
```

---

## BÖLÜM 8: DECISION COPILOT

AI (Claude) şu sorulara yanıt verebilir:

✅ **Sorulabilecekler:**
- "Şimdi almalı mıyım?"
- "Bu fiyat pahalı mı?"
- "Ne kadar beklemeliyim?"
- "Riskleri nasıl azaltabilirim?"
- "Kira getirisi yeterli mi?"
- "Alternatif ne?"
- "Portföyüme uyuyor mu?"

❌ **Sorulama (Savunma):**
- "Bu ev al" (kesin tavsiye vermez)
- "500K kazanacaksın" (spesifik tahmin)
- "Yatırım gümrüğü yap" (legal tavsiye)

**Sınırlar:**
```
COPILOT: "Mevcut verilere göre bu mülk sizin için 82/100 
puan aldı. Neden? Fiyat medyandan düşük, lokasyon 
güzel, ama faiz riski var.

Şimdi almasanız, 6 ay bekleyin — piyasada düşüş 
bekleniyor ve daha iyi koşullarla tekrar değerlendirebilirsiniz.

Ama eğer bu bölge sizin için ideal ise, şimdi da yapılabilir.

Karar sizin. Ben sadece bilgi sunuyorum."
```

---

## BÖLÜM 9: SUCCESS METRICS

Decision Engine başarılı mı? Nasıl ölçeceğiz?

```json
{
  "userSatisfaction": {
    "target": 85,
    "measure": "Post-decision NPS",
    "frequency": "3 months"
  },
  "decisionQuality": {
    "target": 80,
    "measure": "User reported happiness with choice",
    "frequency": "6 months"
  },
  "timeToDecision": {
    "target": 120,
    "measure": "Minutes from first query to decision",
    "frequency": "per transaction"
  },
  "conversionRate": {
    "target": 35,
    "measure": "% of users who make purchase after using engine",
    "frequency": "monthly"
  },
  "trustScore": {
    "target": 92,
    "measure": "% users who trust the system recommendation",
    "frequency": "quarterly"
  },
  "referral": {
    "target": 40,
    "measure": "% users who recommend Sovereign to friends",
    "frequency": "quarterly"
  }
}
```

---

## BÖLÜM 10: MVP SPECIFICATION (90-Day Plan)

### Phase 1: Foundation (Week 1-2)

- [ ] Input model implementasyonu
- [ ] Basic scoring engine (6 weights)
- [ ] Database schema
- [ ] UI form component

### Phase 2: Core Logic (Week 3-4)

- [ ] SATIN_AL decision type
- [ ] What-if basic engine
- [ ] Explainability outputs
- [ ] Trust layer (basic)

### Phase 3: Integration (Week 5-8)

- [ ] Copilot (Claude API)
- [ ] Map visualization
- [ ] Listeleme integration
- [ ] User session tracking

### Phase 4: Polish (Week 9-12)

- [ ] Performance optimization
- [ ] Mobile responsiveness
- [ ] A/B testing infrastructure
- [ ] Analytics dashboard

### NOT Included (Phase 2):
- ❌ Diğer 5 karar türü
- ❌ Advanced ML modelleri
- ❌ Real estate API integrations
- ❌ Video/3D tours

---

## BÖLÜM 11: THE MOAT TEST

**Rakipler (Sahibinden, Hepsiemlak, Emlakjet) neden bunu kopyalayamaz?**

### Data Moat
- 40+ listeleme × 100+ user decision history = 4,000+ training data points
- Bölgeye spesifik gentrification patterns
- Gerçek transaction outcomes database

### AI Moat
- Claude integration → doğal dil understanding
- Explainability engine → "neden bu skoru aldı?"
- Personalization deep learning

### UX Moat
- Copilot accessibility (İnsan benzeri tavsiye)
- What-if interactivity (instant feedback)
- Trust layer (sahte ilan tespiti)

### Business Moat
- Network effect: Daha fazla kullanıcı → daha iyi tahmin
- Switching cost: Kullanıcı Sovereign'de karar verdi mi, başka platforma gitmez
- Data advantage: 2-3 yıl sonra en iyi gayrimenkul prediction engine

---

## IMPLEMENTATION ROADMAP

### v1.0 (90 days)
- SATIN_AL decision engine
- Basic Copilot
- What-if (3 variable)
- MVP UI

### v1.5 (Month 4-5)
- SAT, KİRALA decision types
- Advanced What-if (6 variable)
- Mobile optimization
- Notification system

### v2.0 (Month 6-8)
- PORTFÖY REBALANCE engine
- Investment partnership AI
- Regional analytics dashboard
- B2B API

---

**END OF SPECIFICATION**

---

*Next: Architecture Design & Wireframes*
