import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import prisma from '@/lib/prisma';
import { sendWelcomeEmail } from '@/lib/emailService';
import { checkRateLimit } from '@/lib/ratelimit';

export const dynamic = 'force-dynamic';

function clientIp(request: Request): string {
  const fwd = request.headers.get('x-forwarded-for');
  if (fwd) return fwd.split(',')[0].trim();
  return request.headers.get('x-real-ip') ?? 'unknown';
}

const registerSchema = z.object({
  email: z.string().email('Geçerli bir e-posta girin'),
  password: z.string().min(10, 'Şifre en az 10 karakter olmalı'),
  name: z.string().min(2, 'İsim en az 2 karakter olmalı').optional(),
});

export async function POST(request: Request) {
  try {
    const rl = await checkRateLimit('register:' + clientIp(request), { limit: 5, window: '15 m' });
    if (!rl.success) {
      return NextResponse.json({ error: 'Cok fazla deneme yapildi. Lutfen daha sonra tekrar deneyin.' }, { status: 429 });
    }

    const body = await request.json();
    const { email, password, name } = registerSchema.parse(body);

    // v2: User -> Kullanici. Rol varsayilani BIREYSEL.
    const mevcut = await prisma.kullanici.findUnique({
      where: { eposta: email },
    });
    if (mevcut) {
      return NextResponse.json({ error: 'Bu e-posta zaten kayıtlı.' }, { status: 409 });
    }

    const parolaHash = await bcrypt.hash(password, 12);

    // NOT: Kayit yalnizca hesap acar. Ilan verebilmek icin EIDS
    // kimlik dogrulamasi (e-Devlet SSO) ayrica gerekir; kimlikDogrulandi
    // varsayilan olarak false'tur ve buradan true yapilmaz.
    const user = await prisma.kullanici.create({
      data: { eposta: email, parolaHash, adSoyad: name ?? null },
      select: { id: true, eposta: true, adSoyad: true, rol: true },
    });

    // Hoş geldin emaili — arka planda
    void sendWelcomeEmail({ userEmail: email, userName: name ?? '' });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0].message }, { status: 400 });
    }
    console.error('[register]', error);
    return NextResponse.json({ error: 'Kayıt sırasında hata oluştu.' }, { status: 500 });
  }
}
