export const calculateTrustScore = (identity: number, authority: number, document: number, priceFairness: number) => {
  // Sovereign Trust Algorithm
  // Ağırlıklar toplamı = 1.00 (0.35 + 0.25 + 0.25 + 0.15). Önceki sürümde toplam
  // 0.60 idi; bu yüzden skor pratikte ~60'ta tıkanıp 100'e ulaşamıyordu (BUG).
  // Orijinal önem sıralaması korundu: kimlik > yetki = belge > fiyat adaleti.
  const score = (identity * 0.35) + (authority * 0.25) + (document * 0.25) + (priceFairness * 0.15);
  return Math.min(Math.max(score * 10, 0), 100).toFixed(1);
}

export const getPriceStatus = (price: number, avg: number) => {
  const margin = ((price - avg) / avg) * 100;
  if (margin < -10) return { label: 'Strategic Opportunity', color: '#1ABC9C' };
  if (margin > 15) return { label: 'Premium Asset', color: '#D4AF37' };
  return { label: 'Market Standard', color: '#888' };
}

export const calculateEnergyYield = (landSize: number, regionIrradiance: number) => {
  // GES (Güneş Enerji Santrali) Potansiyel Hesaplama
  const mwPotential = landSize / 15000; // Standart 15 dönüm / 1MW
  const annualIncome = mwPotential * regionIrradiance * 0.133; // Tahmini dolar bazlı gelir
  return { mwPotential: mwPotential.toFixed(2), annualIncome: annualIncome.toFixed(0) };
};

export const calculateHotelRevPar = (roomCount: number, avgDailyRate: number, occupancy: number) => {
  // Turizm Varlığı Gelir Projeksiyonu
  const revPar = avgDailyRate * (occupancy / 100);
  const annualGOP = revPar * roomCount * 365 * 0.40; // %40 GOP Marjı
  return annualGOP.toFixed(0);
};

// IntelligenceReport bileşeni için gerekli fonksiyonlar
export const calculateInvestmentScore = (asset: {
  value?: number;
  type?: string;
  location?: string;
}): number => {
  let base = 70;
  if (asset.type === 'TİCARİ') base += 10;
  if (asset.type === 'ARAZİ') base += 5;
  if (asset.location?.includes('İstanbul')) base += 8;
  if (asset.location?.includes('Muğla')) base += 6;
  return Math.min(base, 99);
};

// Overload: bileşenler eski imzayı (number) kullanıyor, yeni imza object alıyor
export function getYieldProjection(price: number): { period: string; value: number }[];
export function getYieldProjection(asset: { value?: number; type?: string }): { period: string; value: number }[];
export function getYieldProjection(input: number | { value?: number; type?: string }): { period: string; value: number }[] {
  const base = typeof input === 'number' ? input : (input.value ?? 5_000_000);
  const rate = typeof input === 'object' && input.type === 'TİCARİ' ? 0.065 : 0.05;
  return [
    { period: '6 Ay',  value: Math.round(base * (1 + rate * 0.5)) },
    { period: '12 Ay', value: Math.round(base * (1 + rate)) },
    { period: '18 Ay', value: Math.round(base * (1 + rate * 1.5)) },
    { period: '24 Ay', value: Math.round(base * (1 + rate * 2)) },
  ];
}
