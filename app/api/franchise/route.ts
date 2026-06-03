import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const createSchema = z.object({
  companyName: z.string().min(2, 'Şirket adı en az 2 karakter').max(100),
  slug: z.string().min(3, 'Slug en az 3 karakter').max(50)
    .regex(/^[a-z0-9-]+$/, 'Slug yalnızca küçük harf, rakam ve tire içerebilir'),
  primaryColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/).optional(),
  accentColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/).optional(),
  plan: z.enum(['BASIC', 'PRO', 'ENTERPRISE']).default('BASIC'),
  contactEmail: z.string().email('Geçerli e-posta giriniz'),
  contactPhone: z.string().optional(),
  city: z.string().min(2, 'Şehir zorunludur'),
  customDomain: z.string().optional(),
});

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    const userRole = (session?.user as { role?: string } | null)?.role;
    if (userRole !== 'ADMIN') {
      return NextResponse.json({ error: 'Yetki gereklidir.' }, { status: 403 });
    }

    const partners = await prisma.franchisePartner.findMany({
      include: { owner: { select: { name: true, email: true } } },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(partners);
  } catch (error) {
    console.error('[Franchise GET]', error);
    return NextResponse.json({ error: 'Franchise listesi çekilemedi.' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ error: 'Oturum gereklidir.' }, { status: 401 });

    const body = await request.json();
    const parsed = createSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
    }

    // Slug benzersiz mi?
    const existing = await prisma.franchisePartner.findUnique({ where: { slug: parsed.data.slug } });
    if (existing) {
      return NextResponse.json({ error: 'Bu slug zaten kullanımda.' }, { status: 409 });
    }

    const ownerId = (session.user as { id?: string }).id!;

    const monthlyFee = parsed.data.plan === 'ENTERPRISE' ? 150_000
      : parsed.data.plan === 'PRO' ? 75_000 : 50_000;

    const partner = await prisma.franchisePartner.create({
      data: {
        ownerId,
        companyName: parsed.data.companyName,
        slug: parsed.data.slug,
        primaryColor: parsed.data.primaryColor ?? '#00C49F',
        accentColor: parsed.data.accentColor ?? '#0F172A',
        plan: parsed.data.plan,
        monthlyFee,
        contactEmail: parsed.data.contactEmail,
        contactPhone: parsed.data.contactPhone ?? null,
        city: parsed.data.city,
        customDomain: parsed.data.customDomain ?? null,
      },
    });

    return NextResponse.json(partner, { status: 201 });
  } catch (error) {
    console.error('[Franchise POST]', error);
    return NextResponse.json({ error: 'Franchise oluşturulamadı.' }, { status: 500 });
  }
}
