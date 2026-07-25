import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ error: 'Giriş gerekli' }, { status: 401 });

  const { listingId } = await req.json();
  if (!listingId) return NextResponse.json({ error: 'listingId gerekli' }, { status: 400 });

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) return NextResponse.json({ error: 'Kullanıcı bulunamadı' }, { status: 404 });

  const existing = await prisma.favorite.findUnique({
    where: { userId_listingId: { userId: user.id, listingId } },
  });

  if (existing) {
    await prisma.favorite.delete({ where: { id: existing.id } });
    return NextResponse.json({ favorited: false });
  }

  await prisma.favorite.create({ data: { userId: user.id, listingId } });
  return NextResponse.json({ favorited: true });
}

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json([]);

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) return NextResponse.json([]);

  const favorites = await prisma.favorite.findMany({
    where: { userId: user.id },
    select: { listingId: true },
  });

  return NextResponse.json(favorites.map(f => f.listingId));
}
