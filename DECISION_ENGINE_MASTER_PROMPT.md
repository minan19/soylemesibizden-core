# 🎯 SOVEREIGN DECISION ENGINE
## EXECUTION MASTER PROMPT

---

## SENARYO

Karar verildi.

Sovereign'in çekirdeği: **DECISION ENGINE** olacaktır.

Görevin yeni fikir üretmek değildir.

**Görevin: Decision Engine'i production seviyesinde inşa etmektir.**

---

## KURAL

- Özellik düşünme.
- Kod düşünme.
- **Önce sistem tasarla.**
- **Sonra bileşenleri sırala.**

---

## BÖLÜM 1: SYSTEM ARCHITECTURE

Decision Engine'i aşağıdaki katmanlara ayır:

### Layer Stack

```
1. INPUT LAYER
   ↓ (validation)
2. VALIDATION LAYER
   ↓ (trust check)
3. TRUST LAYER
   ↓ (calculate scores)
4. SCORING LAYER
   ↓ (identify risks)
5. RISK LAYER
   ↓ (generate explanations)
6. EXPLAINABILITY LAYER
   ↓ (formulate advice)
7. RECOMMENDATION LAYER
   ↓ (save to db)
8. PERSISTENCE LAYER
```

### Her katman için tanımla:

```typescript
interface Layer {
  purpose: string;          // Ne yapar?
  responsibility: string;   // Kimin sorumluluğu?
  inputs: Object;          // Girdi
  outputs: Object;         // Çıktı
  errors: string[];        // Olası hatalar
  validation: Function;    // Validation logic
}
```

---

## BÖLÜM 2: MVP DECISION FLOW

Bir kullanıcı şu soruyu sorduğunda:

> "Bu evi satın almalı mıyım?"

**Adım adım sistem akışı:**

```
USER QUESTION
    ↓
1. DATA COLLECTION
   - Mülk bilgileri (fiyat, konum, m², ...)
   - Kullanıcı profili (bütçe, dönem, risk)
   - Market data (bölge, faiz, trend)
    ↓
2. INPUT VALIDATION
   - Veri tamamlık kontrolü
   - Tip ve range validasyonu
   - Hata mesajları
    ↓
3. TRUST ASSESSMENT
   - İlan doğruluğu (0-100)
   - Satıcı geçmişi (0-100)
   - Bölge riski (0-100)
   - Min threshold: 70/100
    ↓
4. FINANCIAL SCORING
   - Kredi kapasitesi uyumu (0-100)
   - Aylık ödeme yeterliliği (0-100)
   - LTV ratio (0-100)
   - Weighted avg → FINANCIAL_SCORE
    ↓
5. MARKET SCORING
   - Fiyat medyandan sapma (0-100)
   - Bölge gentrification (0-100)
   - Likidite potansiyeli (0-100)
   - Weighted avg → MARKET_SCORE
    ↓
6. RISK CALCULATION
   - Faiz riski (0-100)
   - Piyasa düşüş riski (0-100)
   - İşsizlik riski (0-100)
   - Liquidity risk (0-100)
   - Weighted avg → RISK_SCORE
    ↓
7. FINAL SCORE CALCULATION
   SCORE = (
     FINANCIAL_SCORE * 0.25 +
     MARKET_SCORE * 0.25 +
     LOCATION_SCORE * 0.20 +
     RISK_SCORE * 0.15 +
     TRUST_SCORE * 0.15
   ) × CONFIDENCE_FACTOR
    ↓
8. RECOMMENDATION GENERATION
   - Score → Decision (AL/BEKLE/PAS)
   - Top 5 Reasons
   - Top 5 Risks
   - Confidence %
    ↓
9. EXPLAINABILITY
   - Why this score?
   - Why this decision?
   - What if scenarios?
    ↓
10. COPILOT CHAT
    - Claude integration
    - Natural language responses
    - Follow-up questions
    ↓
11. SAVE RESULT
    - DecisionRecord → DB
    - User session → tracking
    ↓
RETURN TO USER
```

---

## BÖLÜM 3: DECISION SCORE FORMULA

### Base Formula

```typescript
DECISION_SCORE = (
  FINANCIAL_FIT * 0.25 +      // Kredi kapasitesi, aylık ödeme, LTV
  MARKET_VALUE * 0.25 +        // Fiyat adilliği, bölge trendi
  LOCATION_QUALITY * 0.20 +    // Infrastruktur, gentrification, future
  RISK_MANAGEMENT * 0.15 +     // Finansal risk, piyasa riski, likidite
  TRUST_SCORE * 0.15           // İlan doğruluğu, satıcı, bölge
) * CONFIDENCE_FACTOR;

// CONFIDENCE_FACTOR = 0.7 - 1.0
// (veri eksikliği ne kadar fazla, confidence o kadar düşük)
```

### Sub-scores (0-100)

```typescript
interface DecisionScores {
  financial_fit: {
    credit_capacity_match: 0-100;      // User borç kapasitesi vs fiyat
    monthly_payment_capacity: 0-100;   // Gelire göre aylık ödeme
    down_payment_feasibility: 0-100;   // Peşin para yeterliliği
    ltv_ratio: 0-100;                  // Loan-to-value optimality
  };
  
  market_value: {
    price_fairness: 0-100;             // Bölge medyanından sapma
    region_trend: 0-100;               // Fiyat trend (artış/düşüş)
    gentrification_potential: 0-100;   // Bölge gelişimi
    rental_yield: 0-100;               // Kira potansiyeli
  };
  
  location_quality: {
    infrastructure: 0-100;             // Ulaşım, hastane, okul
    neighborhood_grade: 0-100;         // Komşu niteliği
    future_development: 0-100;         // Şehir planları
    accessibility: 0-100;              // Erişilebilirlik
  };
  
  risk_management: {
    interest_rate_risk: 0-100;         // Faiz artışı etkisi
    market_downturn_risk: 0-100;       // Fiyat düşüş riski
    liquidity_risk: 0-100;             // Satılabilirlik
    job_market_risk: 0-100;            // İşsizlik/işten çıkarma
  };
  
  trust: {
    listing_authenticity: 0-100;       // İlan gerçekliği
    seller_background: 0-100;          // Satıcı güvenilirliği
    region_stability: 0-100;           // Bölge istikrarı
    data_completeness: 0-100;          // Veri eksikliği
  };
}
```

### Score Interpretation

```
85-100   → STRONG BUY    ✅ Satın al, bilinçli tercih yapılabilir
70-84    → QUALIFIED BUY ✓ Riskler değerlendi, yapılabilir
50-69    → CAUTIOUS      ⚠️  Daha araştırma, beklemeyi düşün
30-49    → HOLD          🔴 Şartlar iyileşmeyi bekle
0-29     → AVOID         ❌ Pas geç, başka seçenek ara
```

---

## BÖLÜM 4: RISK ENGINE

### Risk Kategorileri

```typescript
interface RiskAssessment {
  financial_risks: {
    interest_rate_shock: {
      current: number;           // Şu anki %
      max_tolerance: number;     // Kullanıcı kapasitesi
      probability: 0-100;        // Artış olasılığı
      impact: "LOW"|"MEDIUM"|"HIGH";
      description: string;
    };
    
    unemployment_risk: {
      industry_stability: 0-100;
      regional_job_market: 0-100;
      personal_financial_buffer: 0-100; // Acil fon
      impact_score: 0-100;
    };
    
    property_depreciation: {
      market_cycle_position: string;  // "peak"|"trough"|"rising"
      regional_outlook: 0-100;
      property_specific_risk: 0-100;
      probability: 0-100;
    };
  };
  
  market_risks: {
    liquidity_crunch: 0-100;    // Satılamama riski
    neighborhood_decline: 0-100; // Bölge kötüleşmesi
    regulatory_changes: 0-100;   // Yeni kanunlar (rant kontrol, vergi)
    infrastructure_failure: 0-100; // Planlanan altyapı yapılmayabilir
  };
  
  personal_risks: {
    overleveraging: 0-100;      // Çok borçlanma
    concentration: 0-100;       // Gayrimenkul yoğunluğu
    time_horizon_mismatch: 0-100; // Bekleme süresi yetersiz
  };
}
```

### Risk Score Calculation

```typescript
RISK_SCORE = 100 - (
  financial_risks.weight_avg * 0.40 +
  market_risks.weight_avg * 0.35 +
  personal_risks.weight_avg * 0.25
);

// RISK_SCORE düşük = riskli
// RISK_SCORE yüksek = güvenli
```

---

## BÖLÜM 5: EXPLAINABILITY ENGINE

### Output Formatı

```
KARAR RAPORU
════════════════════════════════════

📊 KARAR: AL (Puan: 82/100, Güven: 88%)

🎯 TOP 5 NEDEN
1. [Neden] — Weight: 18%
2. [Neden] — Weight: 16%
3. [Neden] — Weight: 14%
4. [Neden] — Weight: 12%
5. [Neden] — Weight: 10%

⚠️ TOP 5 RİSK
1. [Risk] — Impact: HIGH
2. [Risk] — Impact: HIGH
3. [Risk] — Impact: MEDIUM
4. [Risk] — Impact: MEDIUM
5. [Risk] — Impact: LOW

💡 COPILOT ÖNERİSİ
[Claude's natural language recommendation]

🔄 WHAT-IF SENARYOLARI
Budget +20%: Score → 85 (vs 82)
Faiz +2%: Score → 78 (vs 82)
Hold 10y: Score → 88 (vs 82)

✅ GÜVEN YÜZDESI: 88%
```

### Explainability Data Model

```typescript
interface Explainability {
  top_reasons: Array<{
    reason: string;
    category: "FINANCIAL"|"MARKET"|"LOCATION"|"RISK"|"TRUST";
    weight: 0-100;
    confidence: 0-100;
  }>;
  
  top_risks: Array<{
    risk: string;
    category: string;
    impact: "LOW"|"MEDIUM"|"HIGH";
    mitigation: string;
  }>;
  
  alternatives: Array<{
    type: "WAIT"|"BUY_DIFFERENT"|"DIFFERENT_STRATEGY";
    description: string;
    expected_outcome: string;
  }>;
  
  confidence_score: 0-100;
  confidence_reason: string;
}
```

---

## BÖLÜM 6: WHAT-IF SIMULATOR

### Variable Support

```typescript
interface WhatIfVariables {
  budget: {
    current: number;
    range: [min, max];     // ±50%
    step: 50000;
  };
  
  down_payment: {
    current: number;
    range: [min, max];     // ±30%
    step: 25000;
  };
  
  interest_rate: {
    current: number;
    range: [min, max];     // ±3%
    step: 0.25;
  };
  
  rental_yield: {
    current: number;
    range: [min, max];     // ±2%
    step: 0.1;
  };
  
  risk_tolerance: "LOW"|"MEDIUM"|"HIGH";
  
  hold_duration: {
    current: number;       // yıl
    range: [1, 50];
  };
  
  target_return: {
    current: number;       // %
    range: [min, max];
  };
}
```

### What-If Calculation

```
USER CHANGES: Budget ₺2.5M → ₺3M

SYSTEM RECALCULATES:
  ✓ Financial_fit score (down payment yeterli artmış)
  ✓ Loan_capacity (daha fazla ev seçeneği)
  ✓ Monthly_payment (yüksek ama still affordable)
  ✓ Risk_score (biraz daha riskli)
  ✓ Final_score (82 → 85)

INSTANT FEEDBACK:
  Score: 82 → 85 (+3)
  Monthly Payment: 15K₺ → 17K₺
  Recommendation: AL (unchanged)
  Confidence: 88% → 90%
```

---

## BÖLÜM 7: DATABASE DESIGN

### DecisionRecord Model

```typescript
model DecisionRecord {
  id            String     @id @default(cuid())
  
  // Relationships
  userId        String
  user          User       @relation(fields: [userId], references: [id])
  
  propertyId    String?    // Optional (form input da olabilir)
  property      Listing?   @relation(fields: [propertyId], references: [id])
  
  // Decision Data
  decisionType  String     // "SATIN_AL", "SAT", "KIRALA", "BEKLE"
  score         Int        // 0-100
  recommendation String    // "AL", "BEKLE", "PAS"
  confidence    Int        // 0-100
  
  // Input Data (JSON)
  userProfile   Json       // Financial, demographic
  propertyData  Json       // Price, location, etc
  marketData    Json       // Region trends, rates
  
  // Scores (JSON)
  scores        Json       // All sub-scores
  {
    financial_fit
    market_value
    location_quality
    risk_management
    trust
  }
  
  // Risks (JSON)
  risks         Json       // Top risks + impact
  
  // Reasons (JSON)
  reasons       Json       // Top reasons + weight
  
  // What-If History
  whatIfHistory Json?      // All what-if scenarios tried
  
  // Metadata
  createdAt     DateTime   @default(now())
  updatedAt     DateTime   @updatedAt
  
  // Copilot Chat
  copilotChat   CopilotMessage[]
  
  // User Action
  userAction    String?    // "PURCHASED", "PASSED", "STILL_THINKING"
  actionDate    DateTime?
}

model CopilotMessage {
  id              String   @id @default(cuid())
  decisionRecordId String
  decisionRecord  DecisionRecord @relation(fields: [decisionRecordId], references: [id])
  
  role            String   // "user", "assistant"
  content         String
  timestamp       DateTime @default(now())
}
```

### Database Indexes

```sql
CREATE INDEX idx_user_decisions ON DecisionRecord(userId);
CREATE INDEX idx_property_decisions ON DecisionRecord(propertyId);
CREATE INDEX idx_created_at ON DecisionRecord(createdAt DESC);
CREATE INDEX idx_recommendation ON DecisionRecord(recommendation);
```

---

## BÖLÜM 8: API DESIGN

### Endpoint 1: POST /api/decisions

**Purpose:** Yeni karar hesapla

**Request:**
```typescript
interface DecisionRequest {
  decisionType: "SATIN_AL" | "SAT" | "KIRALA" | "BEKLE" | "REBALANCE";
  
  // Kullanıcı profili
  userProfile: {
    age: number;
    income: number;
    totalAssets: number;
    existingDebt: number;
    riskTolerance: "LOW" | "MEDIUM" | "HIGH";
    holdDuration: number; // yıl
  };
  
  // Mülk veya input
  propertyId?: string;    // Mevcut mülk
  propertyData?: {        // Yada form input
    price: number;
    area: number;
    location: string;
    type: "RESIDENTIAL" | "COMMERCIAL" | "LAND";
    estimatedRental?: number;
  };
}
```

**Response:**
```typescript
interface DecisionResponse {
  success: boolean;
  data: {
    decisionId: string;
    score: number;
    recommendation: "AL" | "BEKLE" | "PAS";
    confidence: number;
    
    scores: {
      financial_fit: number;
      market_value: number;
      location_quality: number;
      risk_management: number;
      trust: number;
    };
    
    topReasons: Array<{
      reason: string;
      weight: number;
    }>;
    
    topRisks: Array<{
      risk: string;
      impact: "LOW" | "MEDIUM" | "HIGH";
    }>;
    
    explainability: {
      whyThisScore: string;
      whyThisDecision: string;
    };
  };
  error?: string;
}
```

### Endpoint 2: GET /api/decisions/:id

**Purpose:** Karar detaylarını getir

**Response:** Full DecisionRecord + CopilotChat history

### Endpoint 3: GET /api/decisions/history

**Purpose:** User'ın karar geçmişi

**Query Params:**
```
?limit=20&offset=0&type=SATIN_AL&sort=createdAt
```

### Endpoint 4: POST /api/decisions/:id/what-if

**Purpose:** What-if hesaplaması

**Request:**
```typescript
interface WhatIfRequest {
  variables: {
    budget?: number;
    down_payment?: number;
    interest_rate?: number;
    hold_duration?: number;
    // ...
  };
}
```

**Response:**
```typescript
interface WhatIfResponse {
  original: { score, recommendation, confidence };
  scenario: { score, recommendation, confidence };
  changes: {
    scoreChange: number;
    recommendationChange: string;
    confidenceChange: number;
  };
}
```

### Endpoint 5: POST /api/decisions/:id/copilot

**Purpose:** Copilot chat

**Request:**
```typescript
interface CopilotRequest {
  message: string;
}
```

**Response:**
```typescript
interface CopilotResponse {
  message: string;
  sources: string[];  // Why this recommendation?
}
```

---

## BÖLÜM 9: UI DESIGN

### Screen 1: Decision Input Form

```
┌─────────────────────────────────┐
│ KARAR MOTORU                    │
├─────────────────────────────────┤
│                                 │
│ Karar Türü: [SATIN_AL ▼]       │
│                                 │
│ ─── KULLANICI PROFİLİ ───      │
│ Yaş: [35]                       │
│ Aylık Gelir: [₺50,000]         │
│ Toplam Varlık: [₺500,000]      │
│ Var olan Borç: [₺0]             │
│ Risk Toleransı: [ORTA ▼]       │
│ Tutma Süresi: [5 YIL]          │
│                                 │
│ ─── MÜLK BİLGİSİ ───           │
│ Mülk Seç: [Akatlar Villaları ▼] │
│                                 │
│ VEYA Bilgi Gir:                 │
│ Fiyat: [₺2,500,000]            │
│ Alan: [700 m²]                  │
│ Konum: [İstanbul, Beşiktaş]    │
│ Tahmini Kira: [₺10,000/ay]     │
│                                 │
│ [HESAPLA]                       │
│                                 │
└─────────────────────────────────┘
```

### Screen 2: Decision Result

```
┌────────────────────────────────────────┐
│ KARAR RAPORU                           │
├────────────────────────────────────────┤
│                                        │
│ 📊 KARAR: AL (82/100)                 │
│ Güven: 88%                             │
│                                        │
│ ─── BILEŞEN SKORLARI ───              │
│ Finansal Uygunluk:    ████░░░░░░ 85% │
│ Piyasa Değeri:        ███░░░░░░░ 78% │
│ Lokasyon Kalitesi:    █████░░░░░ 90% │
│ Risk Yönetimi:        ███░░░░░░░ 72% │
│ Güven Skoru:          ████░░░░░░ 80% │
│                                        │
│ ─── TOP 5 NEDEN ───                   │
│ 1. Fiyat bölge medyanından -3% [18%] │
│ 2. Lokasyon mükemmel [16%]            │
│ 3. Kira getirisi yüksek [14%]         │
│ 4. Gentrification hızlı [12%]         │
│ 5. Mortgage amortize edilecek [10%]   │
│                                        │
│ ─── TOP 5 RİSK ───                    │
│ 1. Faiz artışı → +18% aylık [HIGH]   │
│ 2. Piyasa düşüşü → -8% [HIGH]        │
│ 3. Rant kontrolü [MEDIUM]             │
│ 4. İşsizlik riski [MEDIUM]            │
│ 5. Gentrification başarısız [LOW]     │
│                                        │
│ [WHAT-IF TESPITI]  [COPILOT]  [KAYDET]
│                                        │
└────────────────────────────────────────┘
```

### Screen 3: What-If Simulator

```
┌────────────────────────────────────────┐
│ WHAT-IF SENARYOLARI                    │
├────────────────────────────────────────┤
│                                        │
│ Bütçe: [₺2.5M] ←─ Drag to adjust    │
│        Original: 82/100  Now: 85/100 │
│                                        │
│ Faiz Oranı: [%8] ←─                   │
│        Original: 82/100  Now: 78/100 │
│                                        │
│ Tutma Süresi: [5 yıl] ←─              │
│        Original: 82/100  Now: 88/100 │
│                                        │
│ ─── İTİBAREN TABLEAU ───              │
│ Senaryo       Score  Karar     İmpak  │
│ ─────────────────────────────────────│
│ Original      82     AL        —      │
│ +Budget 20%   85     AL        ↑      │
│ +Rate 2%      78     BEKLE     ↓      │
│ -Value 10%    68     CAUTIOUS  ↓↓     │
│ +Hold 10y     88     STRONG AL ↑↑     │
│                                        │
└────────────────────────────────────────┘
```

### Screen 4: Copilot Chat

```
┌────────────────────────────────────────┐
│ KARAR ASISTANI                         │
├────────────────────────────────────────┤
│                                        │
│ SYSTEM:                                │
│ "Akatlar Villaları'nı 82/100 puanla   │
│ değerlendirdim. Sorularınız var mı?"  │
│                                        │
│ YOU:                                   │
│ "Şimdi almalı mıyım?"                 │
│                                        │
│ ASSISTANT:                             │
│ "Piyasa timing şu anda optimum        │
│ (88/100). Ama faiz risk var — eğer   │
│ +2% artarsa aylık ödeme 17K₺ olur.   │
│ Yine de kapasitende.                  │
│                                        │
│ 6 ay beklesen daha iyi koşullarla     │
│ tekrar değerlendirebiliriz. Ama       │
│ şimdi da yapılabilir."                │
│                                        │
│ YOU:                                   │
│ "Alternatif ne?"                      │
│                                        │
│ [message input box]                    │
│                                        │
└────────────────────────────────────────┘
```

---

## BÖLÜM 10: 90 DAY ROADMAP

### Week 1-2: Foundation

- [ ] Database schema (Prisma models)
- [ ] API skeleton (empty endpoints)
- [ ] Scoring engine (formula + calculation)
- [ ] Risk calculation logic
- [ ] Input validation schema

**Deliverable:** Database + API structure ready

### Week 3-4: Core Engine

- [ ] SATIN_AL decision type (full logic)
- [ ] Explainability engine
- [ ] What-If simulator (budget, rate, duration)
- [ ] Trust layer implementation
- [ ] Test data + manual testing

**Deliverable:** SATIN_AL fully functional, tested

### Week 5-6: UI Build

- [ ] Decision form component
- [ ] Result display component
- [ ] What-If UI + interactions
- [ ] Responsive design
- [ ] Accessibility (WCAG 2.1)

**Deliverable:** Full UI, production ready

### Week 7-8: Copilot + Integration

- [ ] Claude API integration
- [ ] Copilot chat component
- [ ] Session persistence
- [ ] Decision history page
- [ ] Analytics tracking

**Deliverable:** End-to-end working system

### Week 9-10: Polish + Testing

- [ ] Performance optimization
- [ ] Mobile responsiveness testing
- [ ] Edge cases + error handling
- [ ] Load testing (100s concurrent)
- [ ] Security audit

**Deliverable:** Production ready, fully tested

### Week 11-12: Launch + Monitor

- [ ] A/B testing setup
- [ ] Analytics dashboard
- [ ] User feedback loop
- [ ] Bug fixes + improvements
- [ ] Deployment to production

**Deliverable:** Live in production

---

## ÖNEMLİ KURAL

**Her bileşen şu soruya cevap vermelidir:**

> "Bu kullanıcıya daha iyi karar verdiriyor mu?"

**Verdirmiyorsa sistemden çıkar.**

---

## ÇIKTI LISTESI

Yarın producenize şu dosyalar çıkacak:

1. ✅ Architecture Diagram (ASCII + explanation)
2. ✅ Data Model (Prisma schema)
3. ✅ Scoring Model (formula + calculation)
4. ✅ Risk Model (risk categories + scoring)
5. ✅ Explainability Model (output format)
6. ✅ API Design (endpoints + contracts)
7. ✅ UI Design (component breakdown)
8. ✅ Roadmap (week by week)

**Then: Implementation starts.**

---

**END OF MASTER EXECUTION PROMPT**
