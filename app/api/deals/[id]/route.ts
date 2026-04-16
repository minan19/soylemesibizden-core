import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const deal = await prisma.dealRoom.findUnique({
      where: { id: params.id },
      include: { listing: true, buyer: true, seller: true }
    });
    if (!deal) return NextResponse.json({ error: 'Anlaşma odası bulunamadı.' }, { status: 404 });
    return NextResponse.json(deal);
  } catch (error) {
    console.error('Sovereign API Error [Deal GET]:', error);
    return NextResponse.json({ error: 'Anlaşma odası çekilemedi.' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const { status } = body;

    if (!['OPEN', 'IN_PROGRESS', 'CLOSED'].includes(status)) {
      return NextResponse.json({ error: 'Geçersiz status. OPEN, IN_PROGRESS veya CLOSED olmalı.' }, { status: 400 });
    }

    const deal = await prisma.dealRoom.update({
      where: { id: params.id },
      data: { status },
      include: { listing: true, buyer: true, seller: true }
    });
    return NextResponse.json(deal);
  } catch (error) {
    console.error('Sovereign API Error [Deal PUT]:', error);
    return NextResponse.json({ error: 'Anlaşma odası güncellenemedi.' }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.dealRoom.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Sovereign API Error [Deal DELETE]:', error);
    return NextResponse.json({ error: 'Anlaşma odası silinemedi.' }, { status: 500 });
  }
}
