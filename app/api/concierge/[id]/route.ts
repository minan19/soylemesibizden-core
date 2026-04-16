import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const advisoryCase = await prisma.advisoryCase.findUnique({
      where: { id: params.id },
      include: { user: true }
    });
    if (!advisoryCase) return NextResponse.json({ error: 'Danışmanlık vakası bulunamadı.' }, { status: 404 });
    return NextResponse.json(advisoryCase);
  } catch (error) {
    console.error('Sovereign API Error [Concierge GET]:', error);
    return NextResponse.json({ error: 'Vaka çekilemedi.' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const { subject, description, status } = body;

    if (status && !['OPEN', 'RESOLVED'].includes(status)) {
      return NextResponse.json({ error: 'Geçersiz status. OPEN veya RESOLVED olmalı.' }, { status: 400 });
    }

    const advisoryCase = await prisma.advisoryCase.update({
      where: { id: params.id },
      data: {
        ...(subject && { subject }),
        ...(description && { description }),
        ...(status && { status }),
      }
    });
    return NextResponse.json(advisoryCase);
  } catch (error) {
    console.error('Sovereign API Error [Concierge PUT]:', error);
    return NextResponse.json({ error: 'Vaka güncellenemedi.' }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.advisoryCase.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Sovereign API Error [Concierge DELETE]:', error);
    return NextResponse.json({ error: 'Vaka silinemedi.' }, { status: 500 });
  }
}
