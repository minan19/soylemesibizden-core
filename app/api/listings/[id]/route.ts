import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
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
    console.error('API Error [Listing GET]:', error);
    return NextResponse.json({ error: 'İlan çekilemedi.' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Oturum açmanız gerekiyor.' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) return NextResponse.json({ error: 'Kullanıcı bulunamadı.' }, { status: 401 });

    const listing = await prisma.listing.findUnique({ where: { id: params.id } });
    if (!listing) return NextResponse.json({ error: 'İlan bulunamadı.' }, { status: 404 });

    if (listing.ownerId !== user.id && user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Bu işlem için yetkiniz yok.' }, { status: 403 });
    }

    const body = await req.json();
    const { title, description, price, location, status } = body;

    const updated = await prisma.listing.update({
      where: { id: params.id },
      data: {
        ...(title && { title }),
        ...(description && { description }),
        ...(price && { price: Number(price) }),
        ...(location !== undefined && { location }),
        // Owner can change status (ACTIVE/PENDING/SOLD); admin can set any status
        ...(status && ['ACTIVE', 'PENDING', 'SOLD'].includes(status) && { status }),
      }
    });
    return NextResponse.json(updated);
  } catch (error) {
    console.error('API Error [Listing PUT]:', error);
    return NextResponse.json({ error: 'İlan güncellenemedi.' }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Oturum açmanız gerekiyor.' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) return NextResponse.json({ error: 'Kullanıcı bulunamadı.' }, { status: 401 });

    const listing = await prisma.listing.findUnique({ where: { id: params.id } });
    if (!listing) return NextResponse.json({ error: 'İlan bulunamadı.' }, { status: 404 });

    if (listing.ownerId !== user.id && user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Bu işlem için yetkiniz yok.' }, { status: 403 });
    }

    await prisma.listing.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API Error [Listing DELETE]:', error);
    return NextResponse.json({ error: 'İlan silinemedi.' }, { status: 500 });
  }
}
