import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ count: 0 });

  const me = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!me) return NextResponse.json({ count: 0 });

  const cutoff = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000); // last 7 days

  const [offersOnMyListings, myOffersUpdated, inquiries] = await Promise.all([
    prisma.offer.count({ where: { listing: { ownerId: me.id }, createdAt: { gte: cutoff } } }),
    prisma.offer.count({ where: { userId: me.id, status: { not: 'PENDING' }, updatedAt: { gte: cutoff } } }),
    prisma.inquiry.count({ where: { listing: { ownerId: me.id }, createdAt: { gte: cutoff } } }),
  ]);

  return NextResponse.json({ count: offersOnMyListings + myOffersUpdated + inquiries });
}
