import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { z } from 'zod';

const listingSchema = z.object({
  title: z.string().min(3, 'Başlık en az 3 karakter olmalıdır.'),
  description: z.string().optional(),
  propertyType: z.string().min(1, 'Varlık tipi zorunludur.'),
  priceAmount: z.number().positive('Fiyat pozitif olmalıdır.'),
  area: z.number().positive('Alan pozitif olmalıdır.'),
  location: z.string().optional(),
  status: z.string().optional().default('ACTIVE'),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q') ?? '';
    const type = searchParams.get('type') ?? '';
    const sort = searchParams.get('sort') ?? 'newest';
    const minPrice = Number(searchParams.get('minPrice') ?? 0);
    const maxPrice = Number(searchParams.get('maxPrice') ?? 0);

    const where: Record<string, unknown> = {};
    if (q) where.title = { contains: q, mode: 'insensitive' };
    if (type) where.propertyType = type;
    if (minPrice > 0 || maxPrice > 0) {
      where.priceAmount = {
        ...(minPrice > 0 ? { gte: minPrice } : {}),
        ...(maxPrice > 0 ? { lte: maxPrice } : {}),
      };
    }

    const orderBy =
      sort === 'price_asc' ? { priceAmount: 'asc' as const } :
      sort === 'price_desc' ? { priceAmount: 'desc' as const } :
      { createdAt: 'desc' as const };

    const listings = await prisma.listing.findMany({
      where,
      orderBy,
      include: { owner: { select: { id: true, name: true, email: true } } },
    });
    return NextResponse.json(listings);
  } catch (error) {
    console.error('Sovereign API Error [Listings GET]:', error);
    return NextResponse.json({ error: 'Veriler çekilemedi.' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Oturum gereklidir.' }, { status: 401 });
    }

    const body = await request.json();
    const parsed = listingSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
    }

    const userId = (session.user as { id?: string }).id;
    if (!userId) return NextResponse.json({ error: 'Kullanıcı kimliği bulunamadı.' }, { status: 401 });

    const listing = await prisma.listing.create({
      data: {
        ...parsed.data,
        ownerId: userId,
      },
    });

    return NextResponse.json(listing, { status: 201 });
  } catch (error) {
    console.error('Sovereign API Error [Listings POST]:', error);
    return NextResponse.json({ error: 'İlan oluşturulamadı.' }, { status: 500 });
  }
}
