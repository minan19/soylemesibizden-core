import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const offers = await prisma.offer.findMany({
      orderBy: { createdAt: 'desc' },
      include: { listing: true, user: true } // Teklif yapılan ilan ve kullanıcı bilgileri
    });
    return NextResponse.json(offers);
  } catch (error) {
    console.error("Sovereign API Error [Offers]:", error);
    return NextResponse.json({ error: 'Teklifler çekilemedi.' }, { status: 500 });
  }
}
