import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const userId = (session?.user as any)?.id;
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const url = new URL(request.url);
    const limit = parseInt(url.searchParams.get('limit') || '20', 10);
    const offset = parseInt(url.searchParams.get('offset') || '0', 10);

    const decisions = await prisma.decisionRecord.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset,
    });

    const total = await prisma.decisionRecord.count({
      where: { userId },
    });

    return NextResponse.json({
      success: true,
      data: {
        decisions,
        total,
        limit,
        offset,
      },
    });
  } catch (error) {
    console.error('[GET /api/decisions]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
