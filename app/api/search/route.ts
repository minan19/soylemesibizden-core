import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('q') || '';
  const type = searchParams.get('type') || undefined;

  try {
    const results = await prisma.listing.findMany({
      where: {
        AND: [
          { isVerified: true },
          {
            OR: [
              { title: { contains: query, mode: 'insensitive' } },
              { location: { contains: query, mode: 'insensitive' } },
              { description: { contains: query, mode: 'insensitive' } },
            ],
          },
          type ? { assetType: type as any } : {},
        ],
      },
      orderBy: [
        { trustScore: 'desc' },
        { createdAt: 'desc' }
      ],
      include: { analysisReport: true }
    });

    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json({ error: 'Search Engine Failure' }, { status: 500 });
  }
}
