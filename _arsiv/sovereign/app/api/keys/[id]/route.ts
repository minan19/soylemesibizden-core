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
    const key = await prisma.apiKey.findUnique({ where: { id: params.id } });
    if (!key) return NextResponse.json({ error: 'Anahtar bulunamadı.' }, { status: 404 });
    if (key.userId !== userId) return NextResponse.json({ error: 'Yetki yok.' }, { status: 403 });

    await prisma.apiKey.update({
      where: { id: params.id },
      data: { active: false },
    });

    return NextResponse.json({ message: 'Anahtar devre dışı bırakıldı.' });
  } catch (error) {
    console.error('[API Keys DELETE]', error);
    return NextResponse.json({ error: 'İşlem başarısız.' }, { status: 500 });
  }
}
