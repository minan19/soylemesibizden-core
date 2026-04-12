import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const cases = await prisma.advisoryCase.findMany({
      orderBy: { createdAt: 'desc' },
      include: { user: true }
    });
    return NextResponse.json(cases);
  } catch (error) {
    console.error("Sovereign API Error [Concierge]:", error);
    return NextResponse.json({ error: 'Konsiyerj kayıtları çekilemedi.' }, { status: 500 });
  }
}
