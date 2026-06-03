import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { z } from 'zod';

const updateSchema = z.object({
  type: z.string().optional(),
  value: z.number().positive().optional(),
  location: z.string().optional(),
});

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const asset = await prisma.asset.findUnique({
      where: { id: params.id },
      include: { user: { select: { id: true, name: true, email: true } } },
    });
    if (!asset) return NextResponse.json({ error: 'Varlık bulunamadı.' }, { status: 404 });
    return NextResponse.json(asset);
  } catch (error) {
    console.error('Sovereign API Error [Asset GET]:', error);
    return NextResponse.json({ error: 'Varlık çekilemedi.' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ error: 'Oturum gereklidir.' }, { status: 401 });

    const body = await request.json();
    const parsed = updateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
    }

    const existing = await prisma.asset.findUnique({ where: { id: params.id } });
    if (!existing) return NextResponse.json({ error: 'Varlık bulunamadı.' }, { status: 404 });

    const userId = (session.user as { id?: string; role?: string }).id;
    const userRole = (session.user as { id?: string; role?: string }).role;
    if (existing.userId !== userId && userRole !== 'ADMIN') {
      return NextResponse.json({ error: 'Bu işlem için yetkiniz yok.' }, { status: 403 });
    }

    const updated = await prisma.asset.update({ where: { id: params.id }, data: parsed.data });
    return NextResponse.json(updated);
  } catch (error) {
    console.error('Sovereign API Error [Asset PUT]:', error);
    return NextResponse.json({ error: 'Varlık güncellenemedi.' }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ error: 'Oturum gereklidir.' }, { status: 401 });

    const existing = await prisma.asset.findUnique({ where: { id: params.id } });
    if (!existing) return NextResponse.json({ error: 'Varlık bulunamadı.' }, { status: 404 });

    const userId = (session.user as { id?: string; role?: string }).id;
    const userRole = (session.user as { id?: string; role?: string }).role;
    if (existing.userId !== userId && userRole !== 'ADMIN') {
      return NextResponse.json({ error: 'Bu işlem için yetkiniz yok.' }, { status: 403 });
    }

    await prisma.asset.delete({ where: { id: params.id } });
    return NextResponse.json({ message: 'Varlık silindi.' });
  } catch (error) {
    console.error('Sovereign API Error [Asset DELETE]:', error);
    return NextResponse.json({ error: 'Varlık silinemedi.' }, { status: 500 });
  }
}
