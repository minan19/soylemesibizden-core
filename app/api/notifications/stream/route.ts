import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { addClient, removeClient } from '@/lib/notificationStore';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return new Response('Unauthorized', { status: 401 });
  }

  const userId = (session.user as { id?: string }).id ?? 'anonymous';
  const encoder = new TextEncoder();

  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      addClient(userId, controller);

      // İlk ping
      const initMsg = `data: ${JSON.stringify({ type: 'connected', message: 'Sovereign Notification Stream aktif' })}\n\n`;
      controller.enqueue(encoder.encode(initMsg));

      // Heartbeat — 25sn'de bir (proxy timeout önlemek için)
      const heartbeat = setInterval(() => {
        try {
          controller.enqueue(encoder.encode(': heartbeat\n\n'));
        } catch {
          clearInterval(heartbeat);
        }
      }, 25000);

      request.signal.addEventListener('abort', () => {
        clearInterval(heartbeat);
        removeClient(userId);
        try { controller.close(); } catch { /* already closed */ }
      });
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
      'X-Accel-Buffering': 'no',
    },
  });
}
