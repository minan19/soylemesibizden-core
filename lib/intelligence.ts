export const calculateTrustScore = (identity: number, authority: number, document: number, priceFairness: number) => {
  // Sovereign Trust Algorithm
  const score = (identity * 0.20) + (authority * 0.15) + (document * 0.15) + (priceFairness * 0.10);
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

export const calculateInvestmentScore = (asset: { price?: number; location?: string; type?: string }) => {
  const priceScore = asset.price ? Math.min(100, (asset.price / 10_000_000) * 100) : 50;
  const locationScore = asset.location ? 80 : 40;
  const typeScore = asset.type === 'CORPORATE' ? 90 : asset.type === 'INVESTMENT' ? 85 : 70;
  return ((priceScore * 0.4) + (locationScore * 0.3) + (typeScore * 0.3)).toFixed(1);
};

export const getYieldProjection = (price: number) => {
  const annualYield = price * 0.142; // %14.2 yıllık projeksiyon
  return {
    annual: annualYield.toFixed(0),
    monthly: (annualYield / 12).toFixed(0),
    fiveYear: (annualYield * 5).toFixed(0),
  };
};
