import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { sendToUser } from '@/lib/notificationStore';

export const dynamic = 'force-dynamic';

interface SendPayload {
  type: string;
  message: string;
  data?: unknown;
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const userId = (session?.user as { id?: string } | undefined)?.id;
    if (!userId) {
      return NextResponse.json({ error: 'Oturum gereklidir.' }, { status: 401 });
    }

    const body = (await request.json()) as SendPayload;
    const { type, message, data } = body;

    if (typeof type !== 'string' || typeof message !== 'string') {
      return NextResponse.json({ error: 'Geçersiz istek.' }, { status: 400 });
    }

    const payload = JSON.stringify({
      type,
      message,
      data,
      timestamp: new Date().toISOString(),
    });
    const sent = sendToUser(userId, payload);

    return NextResponse.json({ sent });
  } catch {
    return NextResponse.json({ error: 'Bildirim gönderilemedi.' }, { status: 500 });
  }
}
