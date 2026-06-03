import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ error: 'Oturum gereklidir.' }, { status: 401 });

    const userId = (session.user as { id?: string }).id!;
    const doc = await prisma.document.findUnique({ where: { id: params.id } });
    if (!doc) return NextResponse.json({ error: 'Belge bulunamadı.' }, { status: 404 });
    if (doc.userId !== userId) return NextResponse.json({ error: 'Yetki yok.' }, { status: 403 });

    await prisma.document.delete({ where: { id: params.id } });
    return NextResponse.json({ message: 'Belge silindi.' });
  } catch (error) {
    console.error('[Documents DELETE]', error);
    return NextResponse.json({ error: 'Belge silinemedi.' }, { status: 500 });
  }
}
