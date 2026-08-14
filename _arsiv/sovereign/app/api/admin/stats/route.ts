import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ error: 'Oturum gereklidir.' }, { status: 401 });

    const userRole = (session.user as { role?: string }).role;
    if (userRole !== 'ADMIN') {
      return NextResponse.json({ error: 'Admin yetkisi gereklidir.' }, { status: 403 });
    }

    const [totalListings, totalUsers, totalOffers, totalDeals, totalAssets, recentListings] =
      await Promise.all([
        prisma.listing.count(),
        prisma.user.count(),
        prisma.offer.count(),
        prisma.dealRoom.count(),
        prisma.asset.count(),
        prisma.listing.findMany({
          take: 5,
          orderBy: { createdAt: 'desc' },
          include: { owner: { select: { name: true, email: true } } },
        }),
      ]);

    return NextResponse.json({
      totalListings,
      totalUsers,
      totalOffers,
      totalDeals,
      totalAssets,
      recentListings,
    });
  } catch (error) {
    console.error('Sovereign API Error [Admin Stats]:', error);
    return NextResponse.json({ error: 'İstatistikler çekilemedi.' }, { status: 500 });
  }
}
