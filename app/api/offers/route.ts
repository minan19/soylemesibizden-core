import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const offers = await prisma.offer.findMany({
      orderBy: { createdAt: 'desc' },
      include: { listing: true, user: true }
    });
    return NextResponse.json(offers);
  } catch (error) {
    console.error('Sovereign API Error [Offers GET]:', error);
    return NextResponse.json({ error: 'Teklifler çekilemedi.' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { amount, listingId, userId } = body;

    if (!amount || !listingId || !userId) {
      return NextResponse.json({ error: 'Zorunlu alanlar eksik: amount, listingId, userId' }, { status: 400 });
    }

    const offer = await prisma.offer.create({
      data: { amount: Number(amount), listingId, userId, status: 'PENDING' },
      include: { listing: true, user: true }
    });
    return NextResponse.json(offer, { status: 201 });
  } catch (error) {
    console.error('Sovereign API Error [Offers POST]:', error);
    return NextResponse.json({ error: 'Teklif oluşturulamadı.' }, { status: 500 });
  }
}
