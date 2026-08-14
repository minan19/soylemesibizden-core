import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Yetkisiz erişim.' }, { status: 401 });
    }

    const body = await req.json();
    const { name, phone, avatar } = body as { name?: string; phone?: string; avatar?: string };

    const updated = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        ...(name !== undefined && { name: name || null }),
        ...(phone !== undefined && { phone: phone || null }),
        ...(avatar !== undefined && { avatar: avatar || null }),
      },
      select: { id: true, name: true, phone: true, email: true, avatar: true },
    });

    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: 'Profil güncellenemedi.' }, { status: 500 });
  }
}
