import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const cases = await prisma.advisoryCase.findMany({
      orderBy: { createdAt: 'desc' },
      include: { user: true }
    });
    return NextResponse.json(cases);
  } catch (error) {
    console.error('Sovereign API Error [Concierge GET]:', error);
    return NextResponse.json({ error: 'Konsiyerj kayıtları çekilemedi.' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { subject, description, userId } = body;

    if (!subject || !description || !userId) {
      return NextResponse.json({ error: 'Zorunlu alanlar eksik: subject, description, userId' }, { status: 400 });
    }

    const advisoryCase = await prisma.advisoryCase.create({
      data: { subject, description, userId, status: 'OPEN' },
      include: { user: true }
    });
    return NextResponse.json(advisoryCase, { status: 201 });
  } catch (error) {
    console.error('Sovereign API Error [Concierge POST]:', error);
    return NextResponse.json({ error: 'Danışmanlık vakası oluşturulamadı.' }, { status: 500 });
  }
}
