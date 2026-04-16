import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const listings = await prisma.listing.findMany({
      orderBy: { createdAt: 'desc' },
      include: { owner: true }
    });
    return NextResponse.json(listings);
  } catch (error) {
    console.error('Sovereign API Error [Listings GET]:', error);
    return NextResponse.json({ error: 'Veriler çekilemedi.' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, description, price, location, status, ownerId } = body;

    if (!title || !description || !price || !ownerId) {
      return NextResponse.json({ error: 'Zorunlu alanlar eksik: title, description, price, ownerId' }, { status: 400 });
    }

    const listing = await prisma.listing.create({
      data: { title, description, price: Number(price), location, status: status ?? 'ACTIVE', ownerId }
    });
    return NextResponse.json(listing, { status: 201 });
  } catch (error) {
    console.error('Sovereign API Error [Listings POST]:', error);
    return NextResponse.json({ error: 'İlan oluşturulamadı.' }, { status: 500 });
  }
}
