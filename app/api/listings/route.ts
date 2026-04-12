import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const listings = await prisma.listing.findMany({
      include: {
        analysisReport: true,
      },
      where: {
        isVerified: true
      }
    });
    return NextResponse.json(listings);
  } catch (error) {
    return NextResponse.json({ error: 'Data Retrieval Failed' }, { status: 500 });
  }
}
