import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    }
  }
});

export async function GET() {
  try {
    const offers = await prisma.offer.findMany({
      orderBy: { timestamp: 'desc' }
    });
    return NextResponse.json(offers);
  } catch (error) {
    return NextResponse.json({ error: "FETCH_FAILED" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const rawData = `${body.assetId}|${body.amount}|${Date.now()}|SOVEREIGN_NODE`;
    const signature = crypto.createHash('sha256').update(rawData).digest('hex');
    const newOffer = await prisma.offer.create({
      data: {
        assetId: body.assetId,
        amount: Number(body.amount),
        signature: signature
      }
    });
    return NextResponse.json(newOffer);
  } catch (error) {
    return NextResponse.json({ error: "TRANSACTION_FAILED" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const updatedOffer = await prisma.offer.update({
      where: { id: body.id },
      data: { status: body.status }
    });
    return NextResponse.json(updatedOffer);
  } catch (error) {
    return NextResponse.json({ error: "UPDATE_FAILED" }, { status: 500 });
  }
}
