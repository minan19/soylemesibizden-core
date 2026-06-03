import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { stripe, PLANS, isStripConfigured } from '@/lib/stripe';
import prisma from '@/lib/prisma';
import { z } from 'zod';

const checkoutSchema = z.object({
  plan: z.enum(['STANDART', 'KURUMSAL', 'SOVEREIGN']),
});

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Oturum gereklidir.' }, { status: 401 });
    }

    if (!isStripConfigured() || !stripe) {
      return NextResponse.json(
        { error: 'Ödeme sistemi henüz yapılandırılmamış.', demo: true },
        { status: 503 }
      );
    }

    const body = await request.json();
    const parsed = checkoutSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
    }

    const plan = PLANS[parsed.data.plan];
    if (!plan.priceId) {
      return NextResponse.json({ error: 'Plan fiyat ID tanımlı değil.' }, { status: 500 });
    }

    const userId = (session.user as { id?: string }).id!;
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { email: true, name: true, stripeCustomerId: true },
    });
    if (!user) return NextResponse.json({ error: 'Kullanıcı bulunamadı.' }, { status: 404 });

    // Stripe müşteri oluştur veya mevcut kullan
    let customerId = user.stripeCustomerId;
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.name ?? undefined,
        metadata: { userId },
      });
      customerId = customer.id;
      await prisma.user.update({
        where: { id: userId },
        data: { stripeCustomerId: customerId },
      });
    }

    const baseUrl = process.env.NEXTAUTH_URL ?? 'http://localhost:3000';

    const checkoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: plan.priceId, quantity: 1 }],
      success_url: `${baseUrl}/pricing?success=true&plan=${parsed.data.plan}`,
      cancel_url: `${baseUrl}/pricing?canceled=true`,
      subscription_data: {
        metadata: { userId, plan: parsed.data.plan },
      },
      metadata: { userId, plan: parsed.data.plan },
      locale: 'tr',
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error('[Stripe Checkout]', error);
    return NextResponse.json({ error: 'Ödeme oturumu oluşturulamadı.' }, { status: 500 });
  }
}
