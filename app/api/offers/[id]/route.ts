import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Oturum açmanız gerekiyor.' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) return NextResponse.json({ error: 'Kullanıcı bulunamadı.' }, { status: 401 });

    const offer = await prisma.offer.findUnique({
      where: { id: params.id },
      include: { listing: { select: { ownerId: true } } },
    });
    if (!offer) return NextResponse.json({ error: 'Teklif bulunamadı.' }, { status: 404 });

    // Only the listing owner or admin can accept/reject
    if (offer.listing.ownerId !== user.id && user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Bu işlem için yetkiniz yok.' }, { status: 403 });
    }

    const body = await req.json();
    const { status } = body;

    if (!['PENDING', 'ACCEPTED', 'REJECTED'].includes(status)) {
      return NextResponse.json({ error: 'Geçersiz status.' }, { status: 400 });
    }

    const updated = await prisma.offer.update({
      where: { id: params.id },
      data: { status },
      include: { listing: true, user: true }
    });
    return NextResponse.json(updated);
  } catch (error) {
    console.error('API Error [Offer PUT]:', error);
    return NextResponse.json({ error: 'Teklif güncellenemedi.' }, { status: 500 });
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

    const offer = await prisma.offer.findUnique({ where: { id: params.id } });
    if (!offer) return NextResponse.json({ error: 'Teklif bulunamadı.' }, { status: 404 });

    // Only the offer creator or admin can delete
    if (offer.userId !== user.id && user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Bu işlem için yetkiniz yok.' }, { status: 403 });
    }

    await prisma.offer.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API Error [Offer DELETE]:', error);
    return NextResponse.json({ error: 'Teklif silinemedi.' }, { status: 500 });
  }
}
