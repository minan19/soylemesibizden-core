import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Oturum gereklidir.' }, { status: 401 });
    }

    const userId = (session.user as { id?: string }).id!;
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { plan: true, role: true },
    });

    const userRole = (session.user as { role?: string }).role;
    const hasAccess = user?.plan === 'SOVEREIGN' || userRole === 'ADMIN';
    if (!hasAccess) {
      return NextResponse.json(
        { error: 'Dark Pool erişimi yalnızca Sovereign plan üyelerine açıktır.' },
        { status: 403 }
      );
    }

    // IP adresi
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
      ?? request.headers.get('x-real-ip')
      ?? null;

    // NDA kaydet (upsert — tekrar imzalarsa güncelle)
    await prisma.darkPoolNda.upsert({
      where: { userId },
      create: { userId, ipAddress: ip },
      update: { acceptedAt: new Date(), ipAddress: ip },
    });

    return NextResponse.json({ success: true, acceptedAt: new Date().toISOString() });
  } catch (error) {
    console.error('[Dark Pool NDA]', error);
    return NextResponse.json({ error: 'NDA kaydedilemedi.' }, { status: 500 });
  }
}
