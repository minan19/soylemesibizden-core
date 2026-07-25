import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(5),
  listingId: z.string().uuid(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    const listing = await prisma.listing.findUnique({ where: { id: data.listingId } });
    if (!listing) return NextResponse.json({ error: 'İlan bulunamadı' }, { status: 404 });

    const inquiry = await prisma.inquiry.create({ data });
    return NextResponse.json(inquiry, { status: 201 });
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ error: e.issues[0].message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 });
  }
}

export async function GET() {
  const inquiries = await prisma.inquiry.findMany({
    orderBy: { createdAt: 'desc' },
    include: { listing: { select: { title: true } } },
  });
  return NextResponse.json(inquiries);
}
