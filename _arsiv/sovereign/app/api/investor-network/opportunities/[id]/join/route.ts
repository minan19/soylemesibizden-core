import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const joinSchema = z.object({
  amount: z.number().positive('Katılım tutarı pozitif olmalı'),
});

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ error: 'Oturum gereklidir.' }, { status: 401 });

    const body = await request.json();
    const parsed = joinSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
    }

    const userId = (session.user as { id?: string }).id!;
    const opp = await prisma.investmentOpportunity.findUnique({ where: { id: params.id } });

    if (!opp) return NextResponse.json({ error: 'Fırsat bulunamadı.' }, { status: 404 });
    if (opp.status !== 'OPEN') return NextResponse.json({ error: 'Bu fırsat artık açık değil.' }, { status: 400 });
    if (opp.ownerId === userId) return NextResponse.json({ error: 'Kendi fırsatınıza katılamazsınız.' }, { status: 400 });
    if (parsed.data.amount < opp.minInvestment) {
      return NextResponse.json({
        error: `Minimum katılım tutarı ${opp.minInvestment.toLocaleString('tr-TR')} ₺`,
      }, { status: 400 });
    }

    // Zaten katıldı mı?
    const existing = await prisma.investmentParticipant.findFirst({
      where: { opportunityId: params.id, userId },
    });
    if (existing) return NextResponse.json({ error: 'Bu fırsata zaten katıldınız.' }, { status: 409 });

    const participant = await prisma.investmentParticipant.create({
      data: { opportunityId: params.id, userId, amount: parsed.data.amount },
    });

    return NextResponse.json(participant, { status: 201 });
  } catch (error) {
    console.error('[Investor Join]', error);
    return NextResponse.json({ error: 'Katılım sağlanamadı.' }, { status: 500 });
  }
}
