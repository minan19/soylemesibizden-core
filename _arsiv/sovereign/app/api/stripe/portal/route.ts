import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { stripe, isStripConfigured } from '@/lib/stripe';
import prisma from '@/lib/prisma';

export async function POST() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Oturum gereklidir.' }, { status: 401 });
    }

    if (!isStripConfigured() || !stripe) {
      return NextResponse.json({ error: 'Ödeme sistemi henüz yapılandırılmamış.' }, { status: 503 });
    }

    const userId = (session.user as { id?: string }).id!;
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { stripeCustomerId: true },
    });

    if (!user?.stripeCustomerId) {
      return NextResponse.json({ error: 'Stripe müşterisi bulunamadı.' }, { status: 404 });
    }

    const baseUrl = process.env.NEXTAUTH_URL ?? 'http://localhost:3000';

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: user.stripeCustomerId,
      return_url: `${baseUrl}/profile`,
    });

    return NextResponse.json({ url: portalSession.url });
  } catch (error) {
    console.error('[Stripe Portal]', error);
    return NextResponse.json({ error: 'Müşteri portalı açılamadı.' }, { status: 500 });
  }
}
