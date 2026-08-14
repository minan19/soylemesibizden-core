import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { generateApiKey } from '@/lib/apiKeyUtils';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const createSchema = z.object({
  name: z.string().min(2, 'İsim en az 2 karakter olmalı').max(100),
  plan: z.enum(['STARTER', 'GROWTH', 'ENTERPRISE']).default('STARTER'),
});

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ error: 'Oturum gereklidir.' }, { status: 401 });

    const userId = (session.user as { id?: string }).id!;
    const keys = await prisma.apiKey.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true, name: true, plan: true,
        callsToday: true, callsTotal: true,
        lastUsedAt: true, active: true, createdAt: true,
        // key alanı döndürülmez (güvenlik)
      },
    });

    return NextResponse.json(keys);
  } catch (error) {
    console.error('[API Keys GET]', error);
    return NextResponse.json({ error: 'Anahtarlar çekilemedi.' }, { status: 500 });
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

    const userId = (session.user as { id?: string }).id!;

    // Kullanıcı başına max 5 aktif anahtar
    const existingCount = await prisma.apiKey.count({ where: { userId, active: true } });
    if (existingCount >= 5) {
      return NextResponse.json({ error: 'Maksimum 5 aktif API anahtarı oluşturabilirsiniz.' }, { status: 400 });
    }

    const rawKey = generateApiKey();

    const apiKey = await prisma.apiKey.create({
      data: {
        userId,
        key: rawKey,         // İlk oluşturmada plain key saklanır (hash'e geçiş TODO)
        name: parsed.data.name,
        plan: parsed.data.plan,
      },
      select: { id: true, name: true, plan: true, createdAt: true },
    });

    // rawKey SADECE bu response'ta döner — bir daha gösterilmez
    return NextResponse.json({ ...apiKey, key: rawKey }, { status: 201 });
  } catch (error) {
    console.error('[API Keys POST]', error);
    return NextResponse.json({ error: 'Anahtar oluşturulamadı.' }, { status: 500 });
  }
}
