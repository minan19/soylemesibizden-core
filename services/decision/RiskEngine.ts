import { UserProfile, PropertyInput, Risk } from './types';

export class RiskEngine {
  /**
   * Identify and classify risks
   * Returns top risks with impact level
   */

  identifyRisks(userProfile: UserProfile, propertyInput: PropertyInput): Risk[] {
    const risks: Risk[] = [];

    // Financial Risk: Interest rate shock
    if (userProfile.income && userProfile.income < 60000) {
      risks.push({
        risk: 'Faiz artışı → Aylık ödeme %15-20 artabilir',
        impact: 'HIGH',
        description: 'Faiz oranı 1% artarsa aylık ödeme signifi kant artacaktır',
      });
    }

    // Market Risk: Price depreciation
    if (userProfile.holdDuration < 5) {
      risks.push({
        risk: 'Kısa tutma süresi → Piyasa düşüşü riski',
        impact: 'MEDIUM',
        description: '5 yıldan kısa tutma süresi, piyasa düşüşü sonucu negatif equity riski',
      });
    }

    // Location Risk
    if (!propertyInput.location.includes('Istanbul') && !propertyInput.location.includes('Ankara')) {
      risks.push({
        risk: 'Bölge likidite riski',
        impact: 'MEDIUM',
        description: 'Ana şehir dışı mülkler satılması daha uzun sürebilir',
      });
    }

    // Property Type Risk
    if (propertyInput.type === 'LAND') {
      risks.push({
        risk: 'Arsa likidite riski',
        impact: 'HIGH',
        description: 'Arsalar yapılı mülklerden daha az likit',
      });
    }

    if (propertyInput.type === 'COMMERCIAL') {
      risks.push({
        risk: 'Ticari alan kira riski',
        impact: 'MEDIUM',
        description: 'Ticari alanlar ekonomik durgunlukta boş kalabilir',
      });
    }

    // Rental Income Risk
    if (propertyInput.estimatedRental && propertyInput.estimatedRental < propertyInput.price * 0.03) {
      risks.push({
        risk: 'Düşük kira getirisi',
        impact: 'MEDIUM',
        description: 'Yıllık kira getirisi %3 altında, yatırım amaçlı satın alma zayıf',
      });
    }

    // Hold Duration Risk
    if (userProfile.holdDuration < 3) {
      risks.push({
        risk: 'Çok kısa tutma süresi',
        impact: 'MEDIUM',
        description: 'Kapanış maliyetleri ve vergiler kısa sürede kazancı eritebilir',
      });
    }

    return risks;
  }
}
