import { ScoreEngine } from './ScoreEngine';
import { RiskEngine } from './RiskEngine';
import { RecommendationEngine } from './RecommendationEngine';
import { ExplanationEngine } from './ExplanationEngine';
import {
  DecisionCalculationRequest,
  DecisionResult,
} from './types';

/**
 * Main Decision Engine Service
 * Orchestrates all components to produce a decision
 */
export class DecisionService {
  private scoreEngine: ScoreEngine;
  private riskEngine: RiskEngine;
  private recommendationEngine: RecommendationEngine;
  private explanationEngine: ExplanationEngine;

  constructor() {
    this.scoreEngine = new ScoreEngine();
    this.riskEngine = new RiskEngine();
    this.recommendationEngine = new RecommendationEngine();
    this.explanationEngine = new ExplanationEngine();
  }

  /**
   * Main calculation function
   */
  calculateDecision(request: DecisionCalculationRequest): DecisionResult {
    const { userProfile, propertyInput } = request;

    // 1. Calculate component scores
    const scores = this.scoreEngine.calculateScores(userProfile, propertyInput);

    // 2. Calculate final score
    const score = this.scoreEngine.calculateFinalScore(scores);

    // 3. Get recommendation
    const recommendation = this.recommendationEngine.getRecommendation(score);

    // 4. Get confidence
    const confidence = this.recommendationEngine.getConfidence(score);

    // 5. Identify risks
    const risks = this.riskEngine.identifyRisks(userProfile, propertyInput);

    // 6. Generate reasons
    const reasons = this.explanationEngine.generateReasons(userProfile, propertyInput, scores);

    return {
      score,
      recommendation,
      confidence,
      scores,
      risks,
      reasons,
    };
  }
}

// Export singleton
export const decisionService = new DecisionService();
