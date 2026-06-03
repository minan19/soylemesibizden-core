import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { z } from 'zod';

const caseSchema = z.object({
  subject: z.string().min(5, 'Konu en az 5 karakter olmalıdır.'),
  description: z.string().min(10, 'Açıklama en az 10 karakter olmalıdır.'),
});

export async function GET() {
  try {
    const cases = await prisma.advisoryCase.findMany({
      orderBy: { createdAt: 'desc' },
      include: { user: { select: { id: true, name: true, email: true } } },
    });
    return NextResponse.json(cases);
  } catch (error) {
    console.error('Sovereign API Error [Concierge GET]:', error);
    return NextResponse.json({ error: 'Konsiyerj kayıtları çekilemedi.' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Oturum gereklidir.' }, { status: 401 });
    }

    const body = await request.json();
    const parsed = caseSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
    }

    const userId = (session.user as { id?: string }).id;
    if (!userId) return NextResponse.json({ error: 'Kullanıcı kimliği bulunamadı.' }, { status: 401 });

    const advisoryCase = await prisma.advisoryCase.create({
      data: {
        subject: parsed.data.subject,
        description: parsed.data.description,
        userId,
        status: 'OPEN',
      },
    });
    return NextResponse.json(advisoryCase, { status: 201 });
  } catch (error) {
    console.error('Sovereign API Error [Concierge POST]:', error);
    return NextResponse.json({ error: 'Danışmanlık talebi oluşturulamadı.' }, { status: 500 });
  }
}
