export const calculateBidWeight = (amount: number, userIQ: number, speedBonus: boolean) => {
  let baseScore = amount;
  let iqMultiplier = 1 + (userIQ / 1000); // IQ skoru teklif ağırlığını hafifçe artırır
  let totalWeight = baseScore * iqMultiplier;
  
  if (speedBonus) totalWeight *= 1.05; // 24 saat içinde gelen teklife hız bonusu
  
  return totalWeight;
};
