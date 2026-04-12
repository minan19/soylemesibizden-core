import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { userId, listingId, intent } = await req.json();

    // 1. Kullanıcı Trust Score Kontrolü
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user || user.trustScore < 80) {
      return NextResponse.json({ error: 'Inadequate Trust Score for Private Market' }, { status: 403 });
    }

    // 2. Erişim Talebi Kaydı (JSON bularak DealRoom üzerinden yönetiyoruz)
    const accessRequest = await prisma.dealRoom.create({
      data: {
        listingId,
        status: 'ACCESS_REQUESTED',
        members: {
          create: { userId }
        }
      }
    });

    return NextResponse.json({ success: true, message: 'NDA Process Initiated' });
  } catch (error) {
    return NextResponse.json({ error: 'Access Request Failed' }, { status: 500 });
  }
}
