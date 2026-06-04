export class RecommendationEngine {
  /**
   * Convert score to recommendation
   *
   * 80+ → AL (Strong Buy)
   * 65-79 → BEKLE (Consider / Qualified)
   * 50-64 → CAUTION (Cautious)
   * 0-49 → PAS (Avoid)
   */

  getRecommendation(score: number): 'AL' | 'BEKLE' | 'PAS' {
    if (score >= 80) return 'AL';
    if (score >= 65) return 'BEKLE';
    if (score >= 50) return 'BEKLE';
    return 'PAS';
  }

  /**
   * Calculate confidence score based on data completeness
   * Simplified: assume full data = 85% confidence
   */
  getConfidence(score: number): number {
    // Higher scores are more confident
    if (score >= 80) return 88;
    if (score >= 65) return 80;
    if (score >= 50) return 70;
    return 60;
  }

  /**
   * Get explanation for recommendation
   */
  getRecommendationText(score: number, recommendation: string): string {
    switch (recommendation) {
      case 'AL':
        return `Bu mülk ${score}/100 puan aldı. Satın almak için iyi bir zamanlama.`;
      case 'BEKLE':
        return `Bu mülk ${score}/100 puan aldı. Riskler değerlendirilmiş, kararınız verin.`;
      case 'PAS':
        return `Bu mülk ${score}/100 puan aldı. Daha iyi seçenekler bulmaya devam edin.`;
      default:
        return '';
    }
  }
}
