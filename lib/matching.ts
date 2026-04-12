export const calculateMatchScore = (userPrefs: any, asset: any) => {
  let score = 0;
  
  // 1. Finansal Uyum (%40)
  if (asset.priceNum <= userPrefs.maxBudget) score += 40;
  else if (asset.priceNum <= userPrefs.maxBudget * 1.1) score += 20;

  // 2. Stratejik Hedef Uyum (%30)
  if (userPrefs.targetROI === 'high' && asset.iq > 95) score += 30;
  else if (asset.iq > 90) score += 20;

  // 3. Karbon & Enerji Hassasiyeti (%30)
  if (userPrefs.carbonNeutral && asset.carbonStatus === 'OPTIMIZED') score += 30;
  
  return score;
};
