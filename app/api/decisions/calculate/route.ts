import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { decisionService } from '@/services/decision';
import { DecisionCalculationRequestSchema } from '@/services/decision/validation';
import { z } from 'zod';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const userId = (session?.user as any)?.id;
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
      const body = await request.json();

      // Validate with Zod
      const validatedData = DecisionCalculationRequestSchema.parse(body);

      // Calculate decision
      const result = decisionService.calculateDecision(validatedData);

      // Save to database
      const decision = await prisma.decisionRecord.create({
        data: {
          userId,
          decisionType: 'SATIN_AL',
          score: result.score,
          recommendation: result.recommendation,
          confidence: result.confidence,
          scores: result.scores as any,
          risks: result.risks as any,
          reasons: result.reasons as any,
          metadata: {
            userProfile: validatedData.userProfile,
            propertyInput: validatedData.propertyInput,
          } as any,
        },
      });

      return NextResponse.json({
        success: true,
        data: {
          decisionId: decision.id,
          ...result,
        },
      });
    } catch (error) {
      // Validation error
      if (error instanceof z.ZodError) {
        return NextResponse.json(
          { error: 'Validation failed', issues: error.issues },
          { status: 400 }
        );
      }
      throw error;
    }
  } catch (error) {
    console.error('[POST /api/decisions/calculate]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
