/**
 * Sovereign Investment Score Engine
 * Her ilan için 6 boyutlu yatırım puanlama sistemi.
 * ANTHROPIC_API_KEY varsa Claude ile derinleştirilen analiz,
 * yoksa deterministik kural motoru çalışır.
 */

export interface SovereignScore {
  overall: number;          // 0-100 genel puan
  investment: number;       // Fiyat/m² piyasa karşılaştırması
  risk: number;             // Düşük risk = yüksek puan
  rentalYield: number;      // Tahmini kira getirisi endeksi
  liquidity: number;        // Bölge satış hızı endeksi
  growth: number;           // Bölge büyüme potansiyeli
  trust: number;            // İlan güven ve doğrulanmışlık
  grade: 'A' | 'B' | 'C' | 'D' | 'F';
  recommendation: 'BUY' | 'HOLD' | 'AVOID';
  summary: string;
  generatedAt: string;
}

// ── Bölge çarpanları (fiyat/m² normalize için) ────────────────────────────────

const LOCATION_MULTIPLIERS: Record<string, number> = {
  istanbul: 1.00,
  'beşiktaş': 1.25, 'şişli': 1.20, 'sarıyer': 1.18, 'kadıköy': 1.15,
  'beyoğlu': 1.12, 'üsküdar': 1.10, 'ataşehir': 1.08, 'maltepe': 1.00,
  'bağcılar': 0.80, 'sultangazi': 0.75, 'esenyurt': 0.72,
  ankara: 0.65,
  'çankaya': 0.78, 'yenimahalle': 0.60,
  izmir: 0.72,
  'konak': 0.80, 'alsancak': 0.85, 'bornova': 0.65,
  antalya: 0.68,
  'konyaaltı': 0.72, 'muratpaşa': 0.70,
  bursa: 0.55,
  adana: 0.45,
  gaziantep: 0.42,
  kayseri: 0.38,
  konya: 0.40,
};

// Bölge eşleştirme — kısmi, case-insensitive
function getLocationMultiplier(location: string): number {
  const loc = location.toLowerCase();
  for (const [key, val] of Object.entries(LOCATION_MULTIPLIERS)) {
    if (loc.includes(key)) return val;
  }
  return 0.50; // bilinmeyen bölge — orta Anadolu tahmini
}

// ── Mülk tipi parametreleri ───────────────────────────────────────────────────

const TYPE_PARAMS: Record<string, {
  rentalYieldBase: number;  // Yıllık brüt kira getirisi %
  liquidityScore: number;   // Satılabilirlik (0-100)
  growthBase: number;       // Değer artış potansiyeli
}> = {
  RESIDENTIAL: { rentalYieldBase: 4.5, liquidityScore: 72, growthBase: 65 },
  COMMERCIAL:  { rentalYieldBase: 6.2, liquidityScore: 55, growthBase: 58 },
  LAND:        { rentalYieldBase: 0.0, liquidityScore: 40, growthBase: 80 },
  INDUSTRIAL:  { rentalYieldBase: 5.8, liquidityScore: 35, growthBase: 50 },
};

// ── Puanlama algoritması ──────────────────────────────────────────────────────

export interface ScoreInput {
  priceAmount: number;
  area: number;
  location: string;
  propertyType: string;
  status: string;
  description?: string | null;
  offerCount: number;        // Gelen teklif sayısı
  daysOnMarket: number;      // İlan kaç gün yayında
}

export function computeScore(input: ScoreInput): SovereignScore {
  const {
    priceAmount, area, location, propertyType,
    offerCount, daysOnMarket, description,
  } = input;

  const pricePerM2 = area > 0 ? priceAmount / area : 0;
  const locMult = getLocationMultiplier(location);
  const typeParams = TYPE_PARAMS[propertyType] ?? TYPE_PARAMS.RESIDENTIAL;

  // ── 1. Investment Score (0-100) ──────────────────────────────────────────
  // İstanbul referans m² fiyatı ~ 85.000 ₺ (2025 ortalama)
  // Bölge çarpanı ile normalize et — piyasa ortalamasına göre değerlendir
  const referencePrice = 85_000 * locMult;
  const priceRatio = referencePrice > 0 ? pricePerM2 / referencePrice : 1;
  // Piyasa altında iyi, piyasa üstünde kötü
  let investment = Math.round(100 - (priceRatio - 1) * 60);
  investment = Math.min(100, Math.max(10, investment));

  // ── 2. Risk Score (0-100, yüksek = düşük risk) ───────────────────────────
  let risk = 60; // Temel risk skoru
  // Teklif çeken ilan daha az riskli
  risk += Math.min(20, offerCount * 5);
  // Çok uzun süredir ilanda kalmak kötü işaret
  if (daysOnMarket > 180) risk -= 20;
  else if (daysOnMarket > 90) risk -= 10;
  else if (daysOnMarket < 30) risk += 10;
  // Açıklama varlığı güven artırır
  if (description && description.length > 100) risk += 10;
  risk = Math.min(100, Math.max(10, risk));

  // ── 3. Rental Yield Score (0-100) ────────────────────────────────────────
  // Yıllık brüt kira getirisi % → 0-100 skor
  // Türkiye'de %6+ mükemmel, %3 altı zayıf
  const yield_pct = typeParams.rentalYieldBase * locMult;
  let rentalYield = Math.round((yield_pct / 8) * 100); // 8% max referans
  rentalYield = Math.min(100, Math.max(0, rentalYield));

  // ── 4. Liquidity Score (0-100) ────────────────────────────────────────────
  let liquidity = typeParams.liquidityScore;
  // Yüksek talep bölgesi likiditeyi artırır
  if (locMult > 1.0) liquidity = Math.min(100, liquidity + 15);
  if (locMult < 0.5) liquidity = Math.max(10, liquidity - 15);
  // Teklif varsa daha likit
  if (offerCount > 0) liquidity = Math.min(100, liquidity + 8);

  // ── 5. Growth Score (0-100) ───────────────────────────────────────────────
  let growth = typeParams.growthBase;
  // Gelişen bölgelere bonus
  const growthBonusCities = ['istanbul', 'izmir', 'antalya', 'bodrum', 'trabzon'];
  const loc = location.toLowerCase();
  if (growthBonusCities.some((c) => loc.includes(c))) growth = Math.min(100, growth + 10);

  // ── 6. Trust Score (0-100) ───────────────────────────────────────────────
  let trust = 50; // Temel güven
  if (description && description.length > 50) trust += 20;
  if (description && description.length > 200) trust += 10;
  if (offerCount > 2) trust += 15; // Başkaları da güvenmiş
  trust = Math.min(100, Math.max(10, trust));

  // ── Overall (ağırlıklı ortalama) ─────────────────────────────────────────
  const weights = { investment: 0.30, risk: 0.20, rentalYield: 0.20, liquidity: 0.10, growth: 0.12, trust: 0.08 };
  const overall = Math.round(
    investment * weights.investment +
    risk       * weights.risk +
    rentalYield * weights.rentalYield +
    liquidity  * weights.liquidity +
    growth     * weights.growth +
    trust      * weights.trust
  );

  // ── Grade ─────────────────────────────────────────────────────────────────
  const grade: SovereignScore['grade'] =
    overall >= 80 ? 'A' :
    overall >= 65 ? 'B' :
    overall >= 50 ? 'C' :
    overall >= 35 ? 'D' : 'F';

  // ── Recommendation ────────────────────────────────────────────────────────
  const recommendation: SovereignScore['recommendation'] =
    overall >= 70 ? 'BUY' :
    overall >= 45 ? 'HOLD' : 'AVOID';

  // ── Summary ───────────────────────────────────────────────────────────────
  const summaryMap: Record<SovereignScore['recommendation'], string> = {
    BUY: `${location} lokasyonunda güçlü yatırım fırsatı. Piyasa koşulları ve bölgesel büyüme potansiyeli portföye eklemeyi destekliyor.`,
    HOLD: `${location}'da makul konumda bir varlık. Kısa vadeli alım için bekleme, uzun vadeli yatırımcılar için değerlendirilebilir.`,
    AVOID: `Mevcut piyasa verilerine göre bu varlık yatırım kriterlerini karşılamıyor. Alternatif fırsatları değerlendirmenizi öneririz.`,
  };

  return {
    overall,
    investment,
    risk,
    rentalYield,
    liquidity,
    growth,
    trust,
    grade,
    recommendation,
    summary: summaryMap[recommendation],
    generatedAt: new Date().toISOString(),
  };
}

// ── Grade renk ve etiket haritası (UI için) ───────────────────────────────────

export const GRADE_CONFIG = {
  A: { color: '#00C49F', bg: '#F0FDF8', label: 'Mükemmel' },
  B: { color: '#3B82F6', bg: '#EFF6FF', label: 'İyi' },
  C: { color: '#F59E0B', bg: '#FFFBEB', label: 'Orta' },
  D: { color: '#F97316', bg: '#FFF7ED', label: 'Zayıf' },
  F: { color: '#EF4444', bg: '#FEF2F2', label: 'Kaçın' },
} as const;

export const RECOMMENDATION_CONFIG = {
  BUY:   { color: '#00C49F', label: 'AL', icon: '▲' },
  HOLD:  { color: '#F59E0B', label: 'BEKLE', icon: '◆' },
  AVOID: { color: '#EF4444', label: 'KAÇIN', icon: '▼' },
} as const;
