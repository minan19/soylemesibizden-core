import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { z } from 'zod';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

/** PATCH: bildirim ac/kapa veya yeniden adlandir. DELETE: sil. */
const govde = z.object({
  ad: z.string().trim().min(2).max(80).optional(),
  bildirimAcik: z.boolean().optional(),
});

async function sahipMi(id: string, kullaniciId: string) {
  const a = await prisma.kayitliArama.findUnique({
    where: { id },
    select: { kullaniciId: true },
  });
  return a?.kullaniciId === kullaniciId;
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  const kullaniciId = (session?.user as { id?: string } | undefined)?.id;
  if (!kullaniciId) {
    return NextResponse.json({ error: 'Oturum gereklidir.' }, { status: 401 });
  }
  if (!(await sahipMi(params.id, kullaniciId))) {
    return NextResponse.json({ error: 'Bulunamadı.' }, { status: 404 });
  }

  const ayristirilan = govde.safeParse(await request.json());
  if (!ayristirilan.success) {
    return NextResponse.json(
      { error: ayristirilan.error.issues[0].message },
      { status: 400 }
    );
  }

  const guncel = await prisma.kayitliArama.update({
    where: { id: params.id },
    data: ayristirilan.data,
    select: { id: true, ad: true, bildirimAcik: true },
  });
  return NextResponse.json(guncel);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  const kullaniciId = (session?.user as { id?: string } | undefined)?.id;
  if (!kullaniciId) {
    return NextResponse.json({ error: 'Oturum gereklidir.' }, { status: 401 });
  }
  if (!(await sahipMi(params.id, kullaniciId))) {
    // Baskasinin kaydinin var olup olmadigini sizdirmamak icin 404.
    return NextResponse.json({ error: 'Bulunamadı.' }, { status: 404 });
  }

  await prisma.kayitliArama.delete({ where: { id: params.id } });
  return NextResponse.json({ silindi: true });
}
