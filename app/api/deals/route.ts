import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const deals = await prisma.dealRoom.findMany({
      orderBy: { createdAt: 'desc' },
      include: { listing: true, buyer: true, seller: true }
    });
    return NextResponse.json(deals);
  } catch (error) {
    console.error('Sovereign API Error [Deals GET]:', error);
    return NextResponse.json({ error: 'Anlaşma odaları çekilemedi.' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { listingId, buyerId, sellerId } = body;

    if (!listingId || !buyerId || !sellerId) {
      return NextResponse.json({ error: 'Zorunlu alanlar eksik: listingId, buyerId, sellerId' }, { status: 400 });
    }

    const deal = await prisma.dealRoom.create({
      data: { listingId, buyerId, sellerId, status: 'OPEN' },
      include: { listing: true, buyer: true, seller: true }
    });
    return NextResponse.json(deal, { status: 201 });
  } catch (error) {
    console.error('Sovereign API Error [Deals POST]:', error);
    return NextResponse.json({ error: 'Anlaşma odası oluşturulamadı.' }, { status: 500 });
  }
}
