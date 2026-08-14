import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { z } from 'zod';

const updateSchema = z.object({
  title: z.string().min(3).optional(),
  description: z.string().optional(),
  propertyType: z.string().optional(),
  priceAmount: z.number().positive().optional(),
  area: z.number().positive().optional(),
  location: z.string().optional(),
  status: z.string().optional(),
});

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const listing = await prisma.listing.findUnique({
      where: { id: params.id },
      include: { owner: { select: { id: true, name: true, email: true } } },
    });

    if (!listing) {
      return NextResponse.json({ error: 'İlan bulunamadı.' }, { status: 404 });
    }

    return NextResponse.json(listing);
  } catch (error) {
    console.error('Sovereign API Error [Listings GET ID]:', error);
    return NextResponse.json({ error: 'İlan çekilemedi.' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Oturum gereklidir.' }, { status: 401 });
    }

    const listing = await prisma.listing.findUnique({ where: { id: params.id } });
    if (!listing) {
      return NextResponse.json({ error: 'İlan bulunamadı.' }, { status: 404 });
    }

    const userId = (session.user as { id?: string }).id;
    if (listing.ownerId !== userId && (session.user as { role?: string }).role !== 'ADMIN') {
      return NextResponse.json({ error: 'Yetkiniz yok.' }, { status: 403 });
    }

    const body = await request.json();
    const parsed = updateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
    }

    const updated = await prisma.listing.update({
      where: { id: params.id },
      data: parsed.data,
      include: { owner: { select: { id: true, name: true, email: true } } },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Sovereign API Error [Listings PUT]:', error);
    return NextResponse.json({ error: 'İlan güncellenemedi.' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Oturum gereklidir.' }, { status: 401 });
    }

    const listing = await prisma.listing.findUnique({ where: { id: params.id } });
    if (!listing) {
      return NextResponse.json({ error: 'İlan bulunamadı.' }, { status: 404 });
    }

    const userId = (session.user as { id?: string }).id;
    if (listing.ownerId !== userId && (session.user as { role?: string }).role !== 'ADMIN') {
      return NextResponse.json({ error: 'Yetkiniz yok.' }, { status: 403 });
    }

    await prisma.listing.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Sovereign API Error [Listings DELETE]:', error);
    return NextResponse.json({ error: 'İlan silinemedi.' }, { status: 500 });
  }
}
