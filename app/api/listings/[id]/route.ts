import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const listing = await prisma.listing.findUnique({
      where: { id: params.id },
      include: { owner: true, offers: true }
    });
    if (!listing) return NextResponse.json({ error: 'İlan bulunamadı.' }, { status: 404 });
    return NextResponse.json(listing);
  } catch (error) {
    console.error('Sovereign API Error [Listing GET]:', error);
    return NextResponse.json({ error: 'İlan çekilemedi.' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const { title, description, price, location, status } = body;

    const listing = await prisma.listing.update({
      where: { id: params.id },
      data: {
        ...(title && { title }),
        ...(description && { description }),
        ...(price && { price: Number(price) }),
        ...(location !== undefined && { location }),
        ...(status && { status }),
      }
    });
    return NextResponse.json(listing);
  } catch (error) {
    console.error('Sovereign API Error [Listing PUT]:', error);
    return NextResponse.json({ error: 'İlan güncellenemedi.' }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.listing.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Sovereign API Error [Listing DELETE]:', error);
    return NextResponse.json({ error: 'İlan silinemedi.' }, { status: 500 });
  }
}
