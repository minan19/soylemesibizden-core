import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const { status } = body;

    if (!['PENDING', 'ACCEPTED', 'REJECTED'].includes(status)) {
      return NextResponse.json({ error: 'Geçersiz status. PENDING, ACCEPTED veya REJECTED olmalı.' }, { status: 400 });
    }

    const offer = await prisma.offer.update({
      where: { id: params.id },
      data: { status },
      include: { listing: true, user: true }
    });
    return NextResponse.json(offer);
  } catch (error) {
    console.error('Sovereign API Error [Offer PUT]:', error);
    return NextResponse.json({ error: 'Teklif güncellenemedi.' }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.offer.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Sovereign API Error [Offer DELETE]:', error);
    return NextResponse.json({ error: 'Teklif silinemedi.' }, { status: 500 });
  }
}
