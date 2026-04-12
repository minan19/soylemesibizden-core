import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const deals = await prisma.dealRoom.findMany({
      orderBy: { createdAt: 'desc' },
      include: { listing: true, buyer: true, seller: true }
    });
    return NextResponse.json(deals);
  } catch (error) {
    console.error("Sovereign API Error [Deals]:", error);
    return NextResponse.json({ error: 'Anlaşma odaları çekilemedi.' }, { status: 500 });
  }
}
