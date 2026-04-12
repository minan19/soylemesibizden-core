import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { listingId, senderId, receiverId, amount } = await req.json();

    // 1. İşlem Odası Mevcut mu? Değilse Aç.
    const dealRoom = await prisma.dealRoom.upsert({
      where: { listingId },
      update: {},
      create: { listingId }
    });

    // 2. Resmi Teklifi Mühürle
    const offer = await prisma.offer.create({
      data: {
        amount,
        senderId,
        receiverId,
        dealRoomId: dealRoom.id,
        status: 'PENDING'
      }
    });

    return NextResponse.json({ success: true, offerId: offer.id, dealId: dealRoom.id });
  } catch (error) {
    return NextResponse.json({ error: 'Deal Initiation Failed' }, { status: 500 });
  }
}
