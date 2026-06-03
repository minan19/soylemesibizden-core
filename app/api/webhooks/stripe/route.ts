import { NextRequest, NextResponse } from 'next/server';
import { stripe, getPlanByPriceId } from '@/lib/stripe';
import prisma from '@/lib/prisma';
import type Stripe from 'stripe';

export const dynamic = 'force-dynamic';

// Next.js 14 App Router için body'yi raw oku
export async function POST(request: NextRequest) {
  if (!stripe) {
    return NextResponse.json({ error: 'Stripe yapılandırılmamış.' }, { status: 503 });
  }

  const body = await request.text();
  const sig = request.headers.get('stripe-signature');

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Webhook imzası eksik.' }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('[Stripe Webhook] İmza doğrulama hatası:', err);
    return NextResponse.json({ error: 'Webhook imzası geçersiz.' }, { status: 400 });
  }

  try {
    switch (event.type) {
      // Abonelik başladı veya güncellendi
      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        const priceId = subscription.items.data[0]?.price?.id ?? '';
        const planKey = getPlanByPriceId(priceId);
        const userId = subscription.metadata?.userId;

        if (userId && planKey) {
          await prisma.user.update({
            where: { id: userId },
            data: {
              plan: planKey,
              stripeSubscriptionId: subscription.id,
              stripePriceId: priceId,
              stripeCurrentPeriodEnd: new Date((subscription as unknown as { current_period_end: number }).current_period_end * 1000),
            },
          });
        }
        break;
      }

      // Abonelik iptal edildi veya sona erdi
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        const userId = subscription.metadata?.userId;

        if (userId) {
          await prisma.user.update({
            where: { id: userId },
            data: {
              plan: 'FREE',
              stripeSubscriptionId: null,
              stripePriceId: null,
              stripeCurrentPeriodEnd: null,
            },
          });
        }
        break;
      }

      // Ödeme başarısız — kullanıcıya bildirilebilir
      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        console.warn('[Stripe] Ödeme başarısız:', invoice.customer_email);
        // TODO: email bildirimi eklenebilir
        break;
      }

      // Checkout tamamlandı — subscription webhook'u da tetikler ama güvenli kayıt
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.userId;
        const customerId = session.customer as string;

        if (userId && customerId) {
          await prisma.user.update({
            where: { id: userId },
            data: { stripeCustomerId: customerId },
          }).catch(() => null); // zaten set ise ignore
        }
        break;
      }

      default:
        // Diğer event'ler ignored
        break;
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('[Stripe Webhook] İşlem hatası:', error);
    return NextResponse.json({ error: 'Webhook işlenemedi.' }, { status: 500 });
  }
}
