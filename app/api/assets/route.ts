import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const assets = await prisma.asset.findMany({
      orderBy: { createdAt: 'desc' },
      include: { user: true }
    });
    return NextResponse.json(assets);
  } catch (error) {
    console.error('Sovereign API Error [Assets GET]:', error);
    return NextResponse.json({ error: 'Varlıklar çekilemedi.' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, value, location, userId } = body;

    if (!type || !value || !userId) {
      return NextResponse.json({ error: 'Zorunlu alanlar eksik: type, value, userId' }, { status: 400 });
    }

    const asset = await prisma.asset.create({
      data: { type, value: Number(value), location, userId },
      include: { user: true }
    });
    return NextResponse.json(asset, { status: 201 });
  } catch (error) {
    console.error('Sovereign API Error [Assets POST]:', error);
    return NextResponse.json({ error: 'Varlık oluşturulamadı.' }, { status: 500 });
  }
}
