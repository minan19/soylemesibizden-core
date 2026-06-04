import { UserProfile, PropertyInput, ComponentScore } from './types';

export class ScoreEngine {
  /**
   * Calculate component scores (0-100 each)
   *
   * Weights:
   * - Financial Fit: 25%
   * - Market Value: 20%
   * - Location Quality: 15%
   * - Risk Management: 15%
   * - Trust: 15%
   * - Liquidity: 10%
   */

  calculateFinancialFit(userProfile: UserProfile, propertyInput: PropertyInput): number {
    const income = userProfile.income || 50000;
    const monthlyPayment = (propertyInput.price * 0.8 * 0.08) / 12; // 80% LTV, 8% annual
    const debtToIncome = (userProfile.existingDebt || 0) + monthlyPayment;
    const monthlyIncome = income / 12;

    // Acceptable: debt-to-income < 40%
    const ratio = debtToIncome / monthlyIncome;

    if (ratio < 0.3) return 95;
    if (ratio < 0.4) return 80;
    if (ratio < 0.5) return 60;
    return 30;
  }

  calculateMarketValue(propertyInput: PropertyInput): number {
    // Simplified: assume average price per m² in Istanbul
    const avgPricePerM2 = 50000; // ₺ per m²
    const expectedPrice = propertyInput.area * avgPricePerM2;
    const actualPrice = propertyInput.price;

    const deviation = ((actualPrice - expectedPrice) / expectedPrice) * 100;

    // -5% to +5% is fair
    if (Math.abs(deviation) < 5) return 85;
    if (Math.abs(deviation) < 10) return 70;
    if (Math.abs(deviation) < 15) return 50;
    return 30;
  }

  calculateLocationQuality(propertyInput: PropertyInput): number {
    // Simplified: Istanbul premium areas score higher
    const premiumLocations = ['Beşiktaş', 'Bebek', 'Ortaköy', 'Akatlar', 'Etiler', 'Ulus'];
    const location = propertyInput.location.toLowerCase();

    if (premiumLocations.some(pl => location.includes(pl.toLowerCase()))) {
      return 85;
    }

    // Other Bosphorus areas
    if (location.includes('istanbul')) return 75;

    // Other cities
    return 60;
  }

  calculateRiskManagement(userProfile: UserProfile, propertyInput: PropertyInput): number {
    // Base: 70
    let score = 70;

    // Risk tolerance adjustment
    if (userProfile.riskTolerance === 'LOW') score -= 10;
    if (userProfile.riskTolerance === 'HIGH') score += 10;

    // Hold duration: longer is safer
    if (userProfile.holdDuration < 3) score -= 15;
    if (userProfile.holdDuration >= 10) score += 10;

    // Residential is safer than commercial/land
    if (propertyInput.type === 'RESIDENTIAL') score += 5;
    if (propertyInput.type === 'LAND') score -= 10;

    return Math.max(20, Math.min(95, score));
  }

  calculateTrust(propertyInput: PropertyInput): number {
    // Residential properties in major cities: higher trust
    let score = 70;

    if (propertyInput.type === 'RESIDENTIAL') score += 10;
    if (propertyInput.location.includes('Istanbul')) score += 5;

    return Math.min(95, score);
  }

  calculateLiquidity(propertyInput: PropertyInput): number {
    // Residential in Istanbul: high liquidity
    let score = 75;

    if (propertyInput.type === 'RESIDENTIAL') score += 10;
    if (propertyInput.location.includes('Istanbul')) score += 5;

    if (propertyInput.type === 'LAND') score -= 15;
    if (propertyInput.type === 'COMMERCIAL') score -= 5;

    return Math.max(40, Math.min(95, score));
  }

  calculateScores(userProfile: UserProfile, propertyInput: PropertyInput): ComponentScore {
    return {
      financial_fit: this.calculateFinancialFit(userProfile, propertyInput),
      market_value: this.calculateMarketValue(propertyInput),
      location_quality: this.calculateLocationQuality(propertyInput),
      risk_management: this.calculateRiskManagement(userProfile, propertyInput),
      trust: this.calculateTrust(propertyInput),
      liquidity: this.calculateLiquidity(propertyInput),
    };
  }

  /**
   * Calculate final decision score (0-100)
   *
   * Formula:
   * SCORE = (
   *   financial_fit * 0.25 +
   *   market_value * 0.20 +
   *   location_quality * 0.15 +
   *   risk_management * 0.15 +
   *   trust * 0.15 +
   *   liquidity * 0.10
   * )
   */
  calculateFinalScore(scores: ComponentScore): number {
    const score =
      scores.financial_fit * 0.25 +
      scores.market_value * 0.20 +
      scores.location_quality * 0.15 +
      scores.risk_management * 0.15 +
      scores.trust * 0.15 +
      scores.liquidity * 0.10;

    return Math.round(Math.max(0, Math.min(100, score)));
  }
}
