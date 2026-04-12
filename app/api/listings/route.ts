import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const listings = await prisma.listing.findMany({
      orderBy: { createdAt: 'desc' },
      include: { owner: true } // İlan sahibi bilgilerini de getir
    });
    return NextResponse.json(listings);
  } catch (error) {
    console.error("Sovereign API Error [Listings]:", error);
    return NextResponse.json({ error: 'Veriler çekilemedi.' }, { status: 500 });
  }
}
