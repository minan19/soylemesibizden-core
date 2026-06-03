import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const VALID_TYPES = ['TAPU', 'SOZLESME', 'DEGERLEME', 'SIGORTA', 'DIGER'] as const;

const createSchema = z.object({
  name: z.string().min(1).max(200),
  type: z.enum(VALID_TYPES),
  url: z.string().url('Geçerli bir URL giriniz.'),
  size: z.number().int().min(0).optional(),
  mimeType: z.string().optional(),
  notes: z.string().max(500).optional(),
  listingId: z.string().optional(),
});

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ error: 'Oturum gereklidir.' }, { status: 401 });

    const userId = (session.user as { id?: string }).id!;
    const documents = await prisma.document.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: { listing: { select: { id: true, title: true } } },
    });

    return NextResponse.json(documents);
  } catch (error) {
    console.error('[Documents GET]', error);
    return NextResponse.json({ error: 'Belgeler çekilemedi.' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ error: 'Oturum gereklidir.' }, { status: 401 });

    const userId = (session.user as { id?: string }).id!;
    const body = await request.json();
    const parsed = createSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
    }

    const doc = await prisma.document.create({
      data: {
        userId,
        name: parsed.data.name,
        type: parsed.data.type,
        url: parsed.data.url,
        size: parsed.data.size ?? 0,
        mimeType: parsed.data.mimeType ?? 'application/pdf',
        notes: parsed.data.notes ?? null,
        listingId: parsed.data.listingId ?? null,
      },
    });

    return NextResponse.json(doc, { status: 201 });
  } catch (error) {
    console.error('[Documents POST]', error);
    return NextResponse.json({ error: 'Belge kaydedilemedi.' }, { status: 500 });
  }
}
