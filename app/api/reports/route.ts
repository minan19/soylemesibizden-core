import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';
import { z } from 'zod';

const schema = z.object({
  listingId: z.string().min(1),
  reason: z.enum(['YANILTICI', 'YANLIS_FIYAT', 'KOPYALA', 'UYGUNSUZ', 'DIGER']),
  details: z.string().max(500).optional(),
});

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Geçersiz veri.' }, { status: 400 });
  }

  const { listingId, reason, details } = parsed.data;

  // Verify listing exists
  const listing = await prisma.listing.findUnique({ where: { id: listingId } });
  if (!listing) {
    return NextResponse.json({ error: 'İlan bulunamadı.' }, { status: 404 });
  }

  const reporterEmail = session?.user?.email ?? 'anonim';

  // We use the Inquiry model as a workaround since we don't have a Report model
  // (until migration is run to add one)
  await prisma.inquiry.create({
    data: {
      name: `[ŞIKAYET] ${reason}`,
      email: reporterEmail,
      message: `Şikayet nedeni: ${reason}${details ? '\n\nDetaylar: ' + details : ''}`,
      listingId,
    },
  });

  return NextResponse.json({ success: true }, { status: 201 });
}
