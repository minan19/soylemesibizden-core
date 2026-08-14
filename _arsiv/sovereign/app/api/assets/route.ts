import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { z } from 'zod';

const assetSchema = z.object({
  type: z.string().min(1, 'Varlık tipi zorunludur.'),
  value: z.number().positive('Değer pozitif olmalıdır.'),
  location: z.string().optional(),
});

export async function GET() {
  try {
    const assets = await prisma.asset.findMany({
      orderBy: { createdAt: 'desc' },
      include: { user: { select: { id: true, name: true, email: true } } },
    });
    return NextResponse.json(assets);
  } catch (error) {
    console.error('Sovereign API Error [Assets GET]:', error);
    return NextResponse.json({ error: 'Varlıklar çekilemedi.' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Oturum gereklidir.' }, { status: 401 });
    }

    const body = await request.json();
    const parsed = assetSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
    }

    const userId = (session.user as { id?: string }).id;
    if (!userId) return NextResponse.json({ error: 'Kullanıcı kimliği bulunamadı.' }, { status: 401 });

    const asset = await prisma.asset.create({
      data: { ...parsed.data, userId },
    });
    return NextResponse.json(asset, { status: 201 });
  } catch (error) {
    console.error('Sovereign API Error [Assets POST]:', error);
    return NextResponse.json({ error: 'Varlık oluşturulamadı.' }, { status: 500 });
  }
}
