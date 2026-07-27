import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Yetkisiz erişim.' }, { status: 401 });
    }

    const admin = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!admin || admin.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Sadece adminler kullanıcı güncelleyebilir.' }, { status: 403 });
    }

    const body = await req.json();
    const { role } = body;

    const validRoles = ['USER', 'ADMIN', 'CONCIERGE'];
    if (role && !validRoles.includes(role)) {
      return NextResponse.json({ error: 'Geçersiz rol.' }, { status: 400 });
    }

    const updated = await prisma.user.update({
      where: { id: params.id },
      data: { ...(role && { role }) },
    });

    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: 'Kullanıcı güncellenemedi.' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Yetkisiz erişim.' }, { status: 401 });
    }

    const admin = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!admin || admin.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Sadece adminler kullanıcı silebilir.' }, { status: 403 });
    }

    if (admin.id === params.id) {
      return NextResponse.json({ error: 'Kendi hesabınızı silemezsiniz.' }, { status: 400 });
    }

    await prisma.user.delete({ where: { id: params.id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Kullanıcı silinemedi.' }, { status: 500 });
  }
}
