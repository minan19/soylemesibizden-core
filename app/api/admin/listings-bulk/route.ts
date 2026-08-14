import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';
import { z } from 'zod';

const schema = z.object({
  ids: z.array(z.string()).min(1).max(100),
  action: z.enum(['approve', 'delete', 'setActive', 'setPending', 'setSold']),
});

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const role = (session?.user as { role?: string })?.role;
  if (!session || role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Geçersiz istek' }, { status: 400 });
  }

  const { ids, action } = parsed.data;

  if (action === 'delete') {
    await prisma.listing.deleteMany({ where: { id: { in: ids } } });
    return NextResponse.json({ ok: true, deleted: ids.length });
  }

  const statusMap: Record<string, string> = {
    approve: 'ACTIVE',
    setActive: 'ACTIVE',
    setPending: 'PENDING',
    setSold: 'SOLD',
  };

  const newStatus = statusMap[action];
  if (newStatus) {
    await prisma.listing.updateMany({
      where: { id: { in: ids } },
      data: { status: newStatus },
    });
    return NextResponse.json({ ok: true, updated: ids.length, status: newStatus });
  }

  return NextResponse.json({ error: 'Bilinmeyen işlem' }, { status: 400 });
}
