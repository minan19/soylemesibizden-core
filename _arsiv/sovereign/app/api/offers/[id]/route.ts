import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { z } from 'zod';
import { sendOfferStatusEmail } from '@/lib/emailService';

const statusSchema = z.object({
  status: z.enum(['PENDING', 'ACCEPTED', 'REJECTED', 'COUNTERED']),
});

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ error: 'Oturum gereklidir.' }, { status: 401 });

    const body = await request.json();
    const parsed = statusSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
    }

    const offer = await prisma.offer.findUnique({
      where: { id: params.id },
      include: { listing: true },
    });
    if (!offer) return NextResponse.json({ error: 'Teklif bulunamadı.' }, { status: 404 });

    const userId = (session.user as { id?: string; role?: string }).id;
    const userRole = (session.user as { id?: string; role?: string }).role;
    // Sadece ilan sahibi veya teklif sahibi veya admin durumu güncelleyebilir
    const isOwner = offer.listing.ownerId === userId;
    const isOfferor = offer.userId === userId;
    if (!isOwner && !isOfferor && userRole !== 'ADMIN') {
      return NextResponse.json({ error: 'Bu işlem için yetkiniz yok.' }, { status: 403 });
    }

    const updated = await prisma.offer.update({
      where: { id: params.id },
      data: { status: parsed.data.status },
    });
    // Durum ACCEPTED veya REJECTED ise teklif sahibine email at
    if (parsed.data.status === 'ACCEPTED' || parsed.data.status === 'REJECTED') {
      try {
        const buyer = await prisma.user.findUnique({
          where: { id: offer.userId },
          select: { email: true, name: true },
        });
        if (buyer?.email) {
          void sendOfferStatusEmail({
            buyerEmail: buyer.email,
            buyerName: buyer.name ?? 'Üye',
            listingTitle: offer.listing.title,
            listingId: offer.listing.id,
            offerAmount: offer.amount,
            newStatus: parsed.data.status as 'ACCEPTED' | 'REJECTED',
          });
        }
      } catch {
        // Email hatası kritik değil
      }
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Sovereign API Error [Offer PUT]:', error);
    return NextResponse.json({ error: 'Teklif güncellenemedi.' }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ error: 'Oturum gereklidir.' }, { status: 401 });

    const offer = await prisma.offer.findUnique({ where: { id: params.id } });
    if (!offer) return NextResponse.json({ error: 'Teklif bulunamadı.' }, { status: 404 });

    const userId = (session.user as { id?: string; role?: string }).id;
    const userRole = (session.user as { id?: string; role?: string }).role;
    if (offer.userId !== userId && userRole !== 'ADMIN') {
      return NextResponse.json({ error: 'Bu işlem için yetkiniz yok.' }, { status: 403 });
    }

    await prisma.offer.delete({ where: { id: params.id } });
    return NextResponse.json({ message: 'Teklif silindi.' });
  } catch (error) {
    console.error('Sovereign API Error [Offer DELETE]:', error);
    return NextResponse.json({ error: 'Teklif silinemedi.' }, { status: 500 });
  }
}
