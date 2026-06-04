// Decision Engine Types

export interface UserProfile {
  age?: number;
  income?: number;
  totalAssets?: number;
  existingDebt?: number;
  riskTolerance: "LOW" | "MEDIUM" | "HIGH";
  holdDuration: number; // yıl
}

export interface PropertyInput {
  price: number;
  area: number;
  location: string;
  type: "RESIDENTIAL" | "COMMERCIAL" | "LAND";
  estimatedRental?: number;
}

export interface DecisionCalculationRequest {
  userProfile: UserProfile;
  propertyInput: PropertyInput;
}

export interface ComponentScore {
  financial_fit: number;        // 0-100
  market_value: number;         // 0-100
  location_quality: number;     // 0-100
  risk_management: number;      // 0-100
  trust: number;                // 0-100
  liquidity: number;            // 0-100
}

export interface Risk {
  risk: string;
  impact: "LOW" | "MEDIUM" | "HIGH";
  description: string;
}

export interface Reason {
  reason: string;
  weight: number;
  category: string;
}

export interface DecisionResult {
  score: number;                // 0-100
  recommendation: "AL" | "BEKLE" | "PAS";
  confidence: number;           // 0-100
  scores: ComponentScore;
  risks: Risk[];
  reasons: Reason[];
}
