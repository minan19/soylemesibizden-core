import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { userId, category, budget, description, preferences } = await req.json();

    // 1. Advisory Case (Danışmanlık Vakası) Oluştur
    const conciergeRequest = await prisma.advisoryCase.create({
      data: {
        userId,
        status: 'INITIALIZING', // INITIALIZING, MATCHING, ACTIVE, CLOSED
        category, // EMLAK, ENERJI, TURIZM vb.
        budget,
        description,
        metadata: preferences // JSON: { privacy: high, yield: 15, duration: 24 }
      }
    });

    return NextResponse.json({ success: true, caseId: conciergeRequest.id });
  } catch (error) {
    return NextResponse.json({ error: 'Concierge Protocol Failed' }, { status: 500 });
  }
}
