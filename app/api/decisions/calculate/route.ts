import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { decisionService } from '@/services/decision';
import { DecisionCalculationRequest } from '@/services/decision/types';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const userId = (session?.user as any)?.id;
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body: DecisionCalculationRequest = await request.json();

    // Validate input
    if (!body.userProfile || !body.propertyInput) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!body.propertyInput.price || !body.propertyInput.area) {
      return NextResponse.json({ error: 'Invalid property data' }, { status: 400 });
    }

    // Calculate decision
    const result = decisionService.calculateDecision(body);

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
          userProfile: body.userProfile,
          propertyInput: body.propertyInput,
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
    console.error('[POST /api/decisions/calculate]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
