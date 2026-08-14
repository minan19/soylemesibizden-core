import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { z } from 'zod';

const statusSchema = z.object({
  status: z.enum(['OPEN', 'IN_PROGRESS', 'CLOSED', 'CANCELLED']),
});

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const deal = await prisma.dealRoom.findUnique({
      where: { id: params.id },
      include: {
        listing: true,
        buyer: { select: { id: true, name: true, email: true } },
        seller: { select: { id: true, name: true, email: true } },
      },
    });
    if (!deal) return NextResponse.json({ error: 'Anlaşma odası bulunamadı.' }, { status: 404 });
    return NextResponse.json(deal);
  } catch (error) {
    console.error('Sovereign API Error [Deal GET]:', error);
    return NextResponse.json({ error: 'Anlaşma odası çekilemedi.' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ error: 'Oturum gereklidir.' }, { status: 401 });

    const body = await request.json();
    const parsed = statusSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
    }

    const deal = await prisma.dealRoom.findUnique({ where: { id: params.id } });
    if (!deal) return NextResponse.json({ error: 'Anlaşma odası bulunamadı.' }, { status: 404 });

    const userId = (session.user as { id?: string; role?: string }).id;
    const userRole = (session.user as { id?: string; role?: string }).role;
    const isParty = deal.buyerId === userId || deal.sellerId === userId;
    if (!isParty && userRole !== 'ADMIN') {
      return NextResponse.json({ error: 'Bu işlem için yetkiniz yok.' }, { status: 403 });
    }

    const updated = await prisma.dealRoom.update({
      where: { id: params.id },
      data: { status: parsed.data.status },
    });
    return NextResponse.json(updated);
  } catch (error) {
    console.error('Sovereign API Error [Deal PUT]:', error);
    return NextResponse.json({ error: 'Anlaşma odası güncellenemedi.' }, { status: 500 });
  }
}
