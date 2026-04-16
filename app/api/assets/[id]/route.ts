import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const asset = await prisma.asset.findUnique({
      where: { id: params.id },
      include: { user: true }
    });
    if (!asset) return NextResponse.json({ error: 'Varlık bulunamadı.' }, { status: 404 });
    return NextResponse.json(asset);
  } catch (error) {
    console.error('Sovereign API Error [Asset GET]:', error);
    return NextResponse.json({ error: 'Varlık çekilemedi.' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const { type, value, location } = body;

    const asset = await prisma.asset.update({
      where: { id: params.id },
      data: {
        ...(type && { type }),
        ...(value !== undefined && { value: Number(value) }),
        ...(location !== undefined && { location }),
      }
    });
    return NextResponse.json(asset);
  } catch (error) {
    console.error('Sovereign API Error [Asset PUT]:', error);
    return NextResponse.json({ error: 'Varlık güncellenemedi.' }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.asset.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Sovereign API Error [Asset DELETE]:', error);
    return NextResponse.json({ error: 'Varlık silinemedi.' }, { status: 500 });
  }
}
