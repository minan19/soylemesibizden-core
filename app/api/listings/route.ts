import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const q = searchParams.get('q');
    const city = searchParams.get('city');
    const propertyType = searchParams.get('propertyType');
    const listingType = searchParams.get('listingType');
    const status = searchParams.get('status');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '50'), 100);
    const page = Math.max(1, parseInt(searchParams.get('page') ?? '1'));

    const where = {
      ...(q && { OR: [{ title: { contains: q, mode: 'insensitive' as const } }, { description: { contains: q, mode: 'insensitive' as const } }] }),
      ...(city && { city: { contains: city, mode: 'insensitive' as const } }),
      ...(propertyType && propertyType !== 'ALL' && { propertyType }),
      ...(listingType && listingType !== 'ALL' && { listingType }),
      ...(status && status !== 'ALL' ? { status } : { status: 'ACTIVE' }),
      ...(minPrice && { price: { gte: parseFloat(minPrice) } }),
      ...(maxPrice && { price: { lte: parseFloat(maxPrice) } }),
    };

    const [listings, total] = await Promise.all([
      prisma.listing.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip: (page - 1) * limit,
        include: { owner: { select: { name: true, email: true } } },
      }),
      prisma.listing.count({ where }),
    ]);

    return NextResponse.json({ listings, total, page, limit });
  } catch (error) {
    console.error('API Error [Listings GET]:', error);
    return NextResponse.json({ error: 'Veriler çekilemedi.' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Oturum açmanız gerekiyor.' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) return NextResponse.json({ error: 'Kullanıcı bulunamadı.' }, { status: 401 });

    const body = await req.json();
    const { title, description, price, location, status } = body;

    if (!title || !description || !price) {
      return NextResponse.json({ error: 'Zorunlu alanlar eksik: title, description, price' }, { status: 400 });
    }

    const listing = await prisma.listing.create({
      data: {
        title,
        description,
        price: Number(price),
        location: location || null,
        status: status ?? 'PENDING',
        ownerId: user.id,
      }
    });
    return NextResponse.json(listing, { status: 201 });
  } catch (error) {
    console.error('API Error [Listings POST]:', error);
    return NextResponse.json({ error: 'İlan oluşturulamadı.' }, { status: 500 });
  }
}
