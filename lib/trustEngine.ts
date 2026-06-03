/**
 * Sovereign Trust Engine
 * Her ilan için çok boyutlu güven analizi.
 * Sahte ilan tespiti, satıcı güvenilirliği, içerik tutarlılığı.
 */

export interface TrustAnalysis {
  score: number;                    // 0-100 güven skoru
  level: 'VERIFIED' | 'TRUSTED' | 'CAUTION' | 'SUSPICIOUS';
  checks: TrustCheck[];
  flags: string[];                  // Uyarılar
  badge: 'GOLD' | 'SILVER' | 'BRONZE' | 'NONE';
  summary: string;
  analyzedAt: string;
}

export interface TrustCheck {
  name: string;
  passed: boolean;
  weight: number;                   // Skordaki ağırlık
  detail: string;
}

export interface TrustInput {
  title: string;
  description: string | null;
  priceAmount: number;
  area: number;
  location: string | null;
  propertyType: string;
  imageCount: number;
  offerCount: number;
  daysOnMarket: number;
  ownerListingCount: number;        // Satıcının toplam ilan sayısı
  ownerDaysSinceJoin: number;       // Satıcının üyelik yaşı (gün)
}

// Bölge başına referans m² fiyatları (kaba tahmin)
const REGION_M2_REFS: Record<string, [number, number]> = {
  // [min, max] ₺/m²
  'istanbul': [40_000, 200_000],
  'beşiktaş': [80_000, 250_000],
  'kadıköy':  [70_000, 200_000],
  'şişli':    [65_000, 180_000],
  'ankara':   [20_000, 100_000],
  'çankaya':  [30_000, 120_000],
  'izmir':    [30_000, 130_000],
  'antalya':  [25_000, 120_000],
  'bursa':    [15_000, 80_000],
  'default':  [10_000, 300_000],
};

function getRegionRef(location: string): [number, number] {
  const loc = location.toLowerCase();
  for (const [key, range] of Object.entries(REGION_M2_REFS)) {
    if (key !== 'default' && loc.includes(key)) return range;
  }
  return REGION_M2_REFS.default;
}

export function analyzeTrust(input: TrustInput): TrustAnalysis {
  const checks: TrustCheck[] = [];
  const flags: string[] = [];

  const pricePerM2 = input.area > 0 ? input.priceAmount / input.area : 0;
  const [minRef, maxRef] = input.location ? getRegionRef(input.location) : REGION_M2_REFS.default;

  // ── Check 1: Fiyat Makullüğü (25 puan) ──────────────────────────────────
  const priceOk = pricePerM2 >= minRef * 0.4 && pricePerM2 <= maxRef * 2.5;
  const extremelyLow = pricePerM2 < minRef * 0.3;
  const extremelyHigh = pricePerM2 > maxRef * 3;
  checks.push({
    name: 'Fiyat Makullüğü',
    passed: priceOk,
    weight: 25,
    detail: extremelyLow
      ? `m² fiyatı (₺${Math.round(pricePerM2).toLocaleString('tr-TR')}) bölge minimumunun çok altında — olağandışı düşük`
      : extremelyHigh
      ? `m² fiyatı (₺${Math.round(pricePerM2).toLocaleString('tr-TR')}) bölge maksimumunun çok üstünde`
      : `m² fiyatı (₺${Math.round(pricePerM2).toLocaleString('tr-TR')}) bölge aralığında`,
  });
  if (extremelyLow) flags.push('⚠️ Fiyat olağandışı düşük — doğrulama önerilir');
  if (extremelyHigh) flags.push('⚠️ Fiyat bölge ortalamasının çok üstünde');

  // ── Check 2: İçerik Kalitesi (20 puan) ───────────────────────────────────
  const hasGoodDesc = Boolean(input.description && input.description.length >= 80);
  checks.push({
    name: 'İçerik Kalitesi',
    passed: hasGoodDesc,
    weight: 20,
    detail: !input.description
      ? 'Açıklama yok — güven düşürücü'
      : input.description.length < 80
      ? `Açıklama çok kısa (${input.description.length} karakter) — yetersiz bilgi`
      : `Açıklama yeterli (${input.description.length} karakter)`,
  });
  if (!hasGoodDesc) flags.push('📝 Açıklama eksik veya çok kısa');

  // ── Check 3: Fotoğraf Varlığı (20 puan) ──────────────────────────────────
  const hasPhotos = input.imageCount >= 3;
  checks.push({
    name: 'Fotoğraf',
    passed: hasPhotos,
    weight: 20,
    detail: input.imageCount === 0
      ? 'Fotoğraf yok — ciddi güven kaybı'
      : input.imageCount < 3
      ? `${input.imageCount} fotoğraf — yetersiz (min 3 önerilir)`
      : `${input.imageCount} fotoğraf mevcut`,
  });
  if (input.imageCount === 0) flags.push('📷 Fotoğraf eklenmemiş — satıcıdan talep edin');

  // ── Check 4: Satıcı Geçmişi (15 puan) ────────────────────────────────────
  const sellerOk = input.ownerDaysSinceJoin >= 30 && input.ownerListingCount <= 50;
  const newAccount = input.ownerDaysSinceJoin < 7;
  const tooManyListings = input.ownerListingCount > 100;
  checks.push({
    name: 'Satıcı Geçmişi',
    passed: sellerOk,
    weight: 15,
    detail: newAccount
      ? `Hesap ${input.ownerDaysSinceJoin} günlük — yeni hesap riski`
      : tooManyListings
      ? `${input.ownerListingCount} ilan — olağandışı yüksek ilan sayısı`
      : `${input.ownerListingCount} ilan, ${input.ownerDaysSinceJoin} günlük hesap`,
  });
  if (newAccount) flags.push('🆕 Yeni hesap — dikkatli olun');
  if (tooManyListings) flags.push('📋 Çok fazla ilan — broker/bayi olabilir');

  // ── Check 5: Piyasa Talebi (10 puan) ─────────────────────────────────────
  const hasInterest = input.offerCount > 0 || input.daysOnMarket < 60;
  checks.push({
    name: 'Piyasa İlgisi',
    passed: hasInterest,
    weight: 10,
    detail: input.offerCount > 0
      ? `${input.offerCount} teklif alınmış — aktif ilgi`
      : input.daysOnMarket > 180
      ? `${input.daysOnMarket} gündür ilanda, teklif yok — talep düşük`
      : `${input.daysOnMarket} gündür ilanda`,
  });
  if (input.daysOnMarket > 180 && input.offerCount === 0) {
    flags.push('⏳ 180+ gündür ilanda — fiyat veya koşullarla ilgili sorun olabilir');
  }

  // ── Check 6: Alan Tutarlılığı (10 puan) ──────────────────────────────────
  const areaOk = input.area >= 10 && input.area <= 100_000;
  checks.push({
    name: 'Alan Tutarlılığı',
    passed: areaOk,
    weight: 10,
    detail: input.area < 10
      ? `${input.area}m² — olağandışı küçük`
      : input.area > 100_000
      ? `${input.area}m² — olağandışı büyük, giriş hatası olabilir`
      : `${input.area}m² — normal aralıkta`,
  });
  if (!areaOk) flags.push('📐 Alan bilgisi olağandışı — doğrulayın');

  // ── Toplam Skor ───────────────────────────────────────────────────────────
  const score = Math.round(
    checks.reduce((sum, c) => sum + (c.passed ? c.weight : 0), 0)
  );

  // ── Seviye & Rozet ────────────────────────────────────────────────────────
  const level: TrustAnalysis['level'] =
    score >= 85 ? 'VERIFIED' :
    score >= 65 ? 'TRUSTED' :
    score >= 40 ? 'CAUTION' : 'SUSPICIOUS';

  const badge: TrustAnalysis['badge'] =
    score >= 90 ? 'GOLD' :
    score >= 70 ? 'SILVER' :
    score >= 50 ? 'BRONZE' : 'NONE';

  const summary =
    level === 'VERIFIED'   ? 'Bu ilan tüm güven kriterlerini geçti. Güvenle ilgilenebilirsiniz.' :
    level === 'TRUSTED'    ? 'Bu ilan güven kriterlerinin büyük bölümünü karşılıyor. Standart dikkat önerilir.' :
    level === 'CAUTION'    ? 'Bu ilan bazı güven kriterlerinde eksik. Satıcıyla görüşmeden karar vermeyin.' :
    'Bu ilan birden fazla güven kriterinde başarısız. Ek doğrulama yapılmadan işlem yapılması önerilmez.';

  return { score, level, checks, flags, badge, summary, analyzedAt: new Date().toISOString() };
}

// ── UI Konfigürasyonu ─────────────────────────────────────────────────────────

export const TRUST_LEVEL_CONFIG = {
  VERIFIED:   { label: 'Doğrulandı',  color: '#00C49F', bg: '#F0FDF8', icon: '✓' },
  TRUSTED:    { label: 'Güvenilir',   color: '#3B82F6', bg: '#EFF6FF', icon: '●' },
  CAUTION:    { label: 'Dikkatli Ol', color: '#F59E0B', bg: '#FFFBEB', icon: '!' },
  SUSPICIOUS: { label: 'Şüpheli',     color: '#EF4444', bg: '#FEF2F2', icon: '✕' },
} as const;

export const BADGE_CONFIG = {
  GOLD:   { label: 'Altın Güven',   color: '#D4AF37', bg: '#FFFBEB' },
  SILVER: { label: 'Gümüş Güven',  color: '#94A3B8', bg: '#F8FAFC' },
  BRONZE: { label: 'Bronz Güven',  color: '#92400E', bg: '#FEF3C7' },
  NONE:   { label: 'Doğrulanmamış', color: '#9CA3AF', bg: '#F9FAFB' },
} as const;
