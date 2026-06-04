import { UserProfile, PropertyInput, ComponentScore, Reason } from './types';

export class ExplanationEngine {
  /**
   * Generate reasons for the score
   * Returns top reasons with weight
   */

  generateReasons(userProfile: UserProfile, propertyInput: PropertyInput, scores: ComponentScore): Reason[] {
    const reasons: Reason[] = [];

    // Reason 1: Financial Fit
    if (scores.financial_fit > 80) {
      reasons.push({
        reason: 'Finansal yükümlülüğünüze uygun',
        weight: 18,
        category: 'FINANCIAL',
      });
    }

    // Reason 2: Market Value
    const deviation = propertyInput.price / (propertyInput.area * 50000) - 1;
    if (deviation < -0.05) {
      reasons.push({
        reason: 'Fiyat bölge ortalamasından düşük',
        weight: 16,
        category: 'MARKET',
      });
    }

    // Reason 3: Location Quality
    if (scores.location_quality > 80) {
      reasons.push({
        reason: 'Lokasyon premium bölgede',
        weight: 14,
        category: 'LOCATION',
      });
    }

    // Reason 4: Rental Potential
    if (propertyInput.estimatedRental && propertyInput.estimatedRental > propertyInput.price * 0.04) {
      reasons.push({
        reason: 'Güçlü kira getirisi potansiyeli',
        weight: 12,
        category: 'MARKET',
      });
    }

    // Reason 5: Hold Duration
    if (userProfile.holdDuration >= 5) {
      reasons.push({
        reason: 'Yeterli tutma süresi',
        weight: 10,
        category: 'FINANCIAL',
      });
    }

    // Sort by weight descending and return top 3-5
    return reasons.sort((a, b) => b.weight - a.weight).slice(0, 5);
  }
}
