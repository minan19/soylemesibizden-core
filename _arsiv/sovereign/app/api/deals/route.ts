import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { z } from 'zod';

const dealSchema = z.object({
  listingId: z.string().min(1, 'İlan ID zorunludur.'),
  sellerId: z.string().min(1, 'Satıcı ID zorunludur.'),
});

export async function GET() {
  try {
    const deals = await prisma.dealRoom.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        listing: { select: { id: true, title: true, priceAmount: true } },
        buyer: { select: { id: true, name: true, email: true } },
        seller: { select: { id: true, name: true, email: true } },
      },
    });
    return NextResponse.json(deals);
  } catch (error) {
    console.error('Sovereign API Error [Deals GET]:', error);
    return NextResponse.json({ error: 'Anlaşma odaları çekilemedi.' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Oturum gereklidir.' }, { status: 401 });
    }

    const body = await request.json();
    const parsed = dealSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
    }

    const buyerId = (session.user as { id?: string }).id;
    if (!buyerId) return NextResponse.json({ error: 'Kullanıcı kimliği bulunamadı.' }, { status: 401 });

    if (buyerId === parsed.data.sellerId) {
      return NextResponse.json({ error: 'Kendinizle anlaşma odası oluşturamazsınız.' }, { status: 400 });
    }

    const deal = await prisma.dealRoom.create({
      data: {
        listingId: parsed.data.listingId,
        buyerId,
        sellerId: parsed.data.sellerId,
        status: 'OPEN',
      },
    });
    return NextResponse.json(deal, { status: 201 });
  } catch (error) {
    console.error('Sovereign API Error [Deals POST]:', error);
    return NextResponse.json({ error: 'Anlaşma odası oluşturulamadı.' }, { status: 500 });
  }
}
