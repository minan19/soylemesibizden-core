import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const assets = await prisma.asset.findMany({
      orderBy: { createdAt: 'desc' },
      include: { user: true }
    });
    return NextResponse.json(assets);
  } catch (error) {
    console.error("Sovereign API Error [Assets]:", error);
    return NextResponse.json({ error: 'Varlıklar çekilemedi.' }, { status: 500 });
  }
}
