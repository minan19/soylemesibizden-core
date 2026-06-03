import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const createSchema = z.object({
  title: z.string().min(5, 'Başlık en az 5 karakter').max(200),
  description: z.string().min(20, 'Açıklama en az 20 karakter').max(2000),
  propertyType: z.enum(['RESIDENTIAL', 'COMMERCIAL', 'LAND', 'INDUSTRIAL']),
  location: z.string().min(2),
  targetAmount: z.number().positive('Hedef tutar pozitif olmalı'),
  minInvestment: z.number().positive('Minimum yatırım pozitif olmalı'),
  expectedReturn: z.number().min(0).max(100),
  durationMonths: z.number().int().min(1).max(120),
});

export async function GET() {
  try {
    const opportunities = await prisma.investmentOpportunity.findMany({
      where: { status: 'OPEN' },
      include: {
        owner: { select: { name: true, email: true } },
        participants: { select: { amount: true, status: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    const enriched = opportunities.map((opp) => {
      const confirmedAmount = opp.participants
        .filter((p) => p.status === 'CONFIRMED')
        .reduce((s, p) => s + p.amount, 0);
      const participantCount = opp.participants.length;
      const fundingPct = opp.targetAmount > 0
        ? Math.round((confirmedAmount / opp.targetAmount) * 100)
        : 0;
      return {
        ...opp,
        confirmedAmount,
        participantCount,
        fundingPct,
        remainingAmount: Math.max(0, opp.targetAmount - confirmedAmount),
      };
    });

    return NextResponse.json(enriched);
  } catch (error) {
    console.error('[Investor Network GET]', error);
    return NextResponse.json({ error: 'Fırsatlar çekilemedi.' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ error: 'Oturum gereklidir.' }, { status: 401 });

    const body = await request.json();
    const parsed = createSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
    }

    const ownerId = (session.user as { id?: string }).id!;
    const opp = await prisma.investmentOpportunity.create({
      data: { ownerId, ...parsed.data },
    });

    return NextResponse.json(opp, { status: 201 });
  } catch (error) {
    console.error('[Investor Network POST]', error);
    return NextResponse.json({ error: 'Fırsat oluşturulamadı.' }, { status: 500 });
  }
}
