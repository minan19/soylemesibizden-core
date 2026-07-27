import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const userId = (session.user as { id?: string })?.id;
  const role = (session.user as { role?: string })?.role;

  try {
    const { searchParams } = req.nextUrl;
    const listingId = searchParams.get('listingId');

    const where = role === 'ADMIN'
      ? (listingId ? { listingId } : {})
      : { OR: [{ userId }, { listing: { ownerId: userId } }], ...(listingId ? { listingId } : {}) };

    const offers = await prisma.offer.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        listing: { select: { id: true, title: true, price: true, ownerId: true } },
        user: { select: { id: true, name: true, email: true } },
      },
    });
    return NextResponse.json(offers);
  } catch {
    return NextResponse.json({ error: 'Teklifler çekilemedi.' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Teklif vermek için giriş yapmalısınız.' }, { status: 401 });

  const userId = (session.user as { id?: string })?.id;
  if (!userId) return NextResponse.json({ error: 'Oturum bilgisi alınamadı.' }, { status: 401 });

  try {
    const body = await req.json();
    const { amount, listingId } = body;

    if (!amount || !listingId) {
      return NextResponse.json({ error: 'Zorunlu alanlar eksik: amount, listingId' }, { status: 400 });
    }

    const numericAmount = Number(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      return NextResponse.json({ error: 'Geçersiz teklif tutarı.' }, { status: 400 });
    }

    // Verify listing exists and user is not the owner
    const listing = await prisma.listing.findUnique({ where: { id: listingId }, select: { ownerId: true, status: true } });
    if (!listing) return NextResponse.json({ error: 'İlan bulunamadı.' }, { status: 404 });
    if (listing.ownerId === userId) return NextResponse.json({ error: 'Kendi ilanınıza teklif veremezsiniz.' }, { status: 400 });
    if (listing.status !== 'ACTIVE') return NextResponse.json({ error: 'Bu ilan artık aktif değil.' }, { status: 400 });

    // Prevent duplicate pending offer
    const existingPending = await prisma.offer.findFirst({
      where: { listingId, userId, status: 'PENDING' },
    });
    if (existingPending) {
      return NextResponse.json({ error: 'Bu ilan için bekleyen bir teklifiniz zaten var.' }, { status: 400 });
    }

    const offer = await prisma.offer.create({
      data: { amount: numericAmount, listingId, userId, status: 'PENDING' },
      include: {
        listing: { select: { id: true, title: true, price: true } },
        user: { select: { id: true, name: true, email: true } },
      },
    });
    return NextResponse.json(offer, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Teklif oluşturulamadı.' }, { status: 500 });
  }
}
