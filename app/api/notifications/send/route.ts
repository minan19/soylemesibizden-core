import { NextRequest, NextResponse } from 'next/server';
import { sendToUser } from '@/lib/notificationStore';

export const dynamic = 'force-dynamic';

interface SendPayload {
  userId: string;
  type: string;
  message: string;
  data?: unknown;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as SendPayload;
    const { userId, type, message, data } = body;

    const payload = JSON.stringify({ type, message, data, timestamp: new Date().toISOString() });
    const sent = sendToUser(userId, payload);

    return NextResponse.json({ sent, userId });
  } catch {
    return NextResponse.json({ error: 'Bildirim gönderilemedi.' }, { status: 500 });
  }
}
