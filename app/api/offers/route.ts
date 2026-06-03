import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { z } from 'zod';
import { sendNewOfferEmail, sendOfferConfirmationEmail } from '@/lib/emailService';

const offerSchema = z.object({
  listingId: z.string().min(1, 'İlan ID zorunludur.'),
  amount: z.number().positive('Teklif tutarı pozitif olmalıdır.'),
});

export async function GET() {
  try {
    const offers = await prisma.offer.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        listing: { select: { id: true, title: true, priceAmount: true } },
        user: { select: { id: true, name: true, email: true } },
      },
    });
    return NextResponse.json(offers);
  } catch (error) {
    console.error('Sovereign API Error [Offers GET]:', error);
    return NextResponse.json({ error: 'Teklifler çekilemedi.' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Oturum gereklidir.' }, { status: 401 });
    }

    const body = await request.json();
    const parsed = offerSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
    }

    const listing = await prisma.listing.findUnique({ where: { id: parsed.data.listingId } });
    if (!listing) return NextResponse.json({ error: 'İlan bulunamadı.' }, { status: 404 });

    const userId = (session.user as { id?: string }).id;
    if (!userId) return NextResponse.json({ error: 'Kullanıcı kimliği bulunamadı.' }, { status: 401 });

    // İlan sahibi kendi ilanına teklif veremez
    if (listing.ownerId === userId) {
      return NextResponse.json({ error: 'Kendi ilanınıza teklif veremezsiniz.' }, { status: 400 });
    }

    const offer = await prisma.offer.create({
      data: {
        amount: parsed.data.amount,
        listingId: parsed.data.listingId,
        userId,
        status: 'PENDING',
      },
    });

    // İlan sahibine gerçek zamanlı bildirim gönder
    try {
      const baseUrl = process.env.NEXTAUTH_URL ?? 'http://localhost:3000';
      await fetch(`${baseUrl}/api/notifications/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: listing.ownerId,
          type: 'offer',
          message: `Yeni teklif: ${parsed.data.amount.toLocaleString('tr-TR')} ₺ — ${listing.title}`,
          data: { offerId: offer.id, listingId: listing.id, amount: parsed.data.amount },
        }),
      });
    } catch {
      // Bildirim hatası teklif oluşturmayı etkilemesin
    }

    // Email bildirimleri — arka planda, hata teklifi etkilemesin
    try {
      const [owner, buyer] = await Promise.all([
        prisma.user.findUnique({ where: { id: listing.ownerId }, select: { email: true, name: true } }),
        prisma.user.findUnique({ where: { id: userId }, select: { email: true, name: true } }),
      ]);
      if (owner?.email) {
        void sendNewOfferEmail({
          ownerEmail: owner.email,
          ownerName: owner.name ?? 'Üye',
          listingTitle: listing.title,
          listingId: listing.id,
          offerAmount: parsed.data.amount,
          buyerName: buyer?.name ?? buyer?.email ?? 'Anonim',
        });
      }
      if (buyer?.email) {
        void sendOfferConfirmationEmail({
          buyerEmail: buyer.email,
          buyerName: buyer.name ?? 'Üye',
          listingTitle: listing.title,
          listingId: listing.id,
          offerAmount: parsed.data.amount,
        });
      }
    } catch {
      // Email hatası kritik değil
    }

    return NextResponse.json(offer, { status: 201 });
  } catch (error) {
    console.error('Sovereign API Error [Offers POST]:', error);
    return NextResponse.json({ error: 'Teklif oluşturulamadı.' }, { status: 500 });
  }
}
