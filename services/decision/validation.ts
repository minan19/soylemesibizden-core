import { z } from 'zod';

// User Profile Validation
export const UserProfileSchema = z.object({
  age: z.number().int().min(18).max(100).optional().default(35),
  income: z.number().positive().max(10_000_000).optional().default(50_000),
  totalAssets: z.number().nonnegative().max(1_000_000_000).optional().default(0),
  existingDebt: z.number().nonnegative().max(100_000_000).optional().default(0),
  riskTolerance: z.enum(['LOW', 'MEDIUM', 'HIGH']).default('MEDIUM'),
  holdDuration: z.number().int().min(1).max(50).default(5),
});

// Property Input Validation
export const PropertyInputSchema = z.object({
  price: z.number().positive('Fiyat pozitif olmalı').max(1_000_000_000),
  area: z.number().positive('Alan pozitif olmalı').max(100_000),
  location: z.string().min(1).max(200),
  type: z.enum(['RESIDENTIAL', 'COMMERCIAL', 'LAND']),
  estimatedRental: z.number().nonnegative().optional(),
});

// Decision Request Validation
export const DecisionCalculationRequestSchema = z.object({
  userProfile: UserProfileSchema,
  propertyInput: PropertyInputSchema,
});

export type UserProfile = z.infer<typeof UserProfileSchema>;
export type PropertyInput = z.infer<typeof PropertyInputSchema>;
export type DecisionCalculationRequest = z.infer<typeof DecisionCalculationRequestSchema>;
