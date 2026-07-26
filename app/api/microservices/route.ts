import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

const SERVICES = {
  notifications: process.env.NOTIFICATIONS_SERVICE_URL ?? 'http://localhost:3001',
  analytics: process.env.ANALYTICS_SERVICE_URL ?? 'http://localhost:3002',
};

export const dynamic = 'force-dynamic';

interface ServiceHealth {
  name: string;
  status: 'UP' | 'DOWN';
  latency: number;
}

async function requireSession() {
  const session = await getServerSession(authOptions);
  return (session?.user as { id?: string } | undefined)?.id ?? null;
}

export async function GET() {
  if (!(await requireSession())) {
    return NextResponse.json({ error: 'Oturum gereklidir.' }, { status: 401 });
  }

  const health: ServiceHealth[] = [];

  for (const [name, url] of Object.entries(SERVICES)) {
    const start = Date.now();
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);
      const res = await fetch(`${url}/health`, { signal: controller.signal });
      clearTimeout(timeoutId);
      health.push({ name, status: res.ok ? 'UP' : 'DOWN', latency: Date.now() - start });
    } catch {
      health.push({ name, status: 'DOWN', latency: Date.now() - start });
    }
  }

  const allUp = health.every((s) => s.status === 'UP');
  return NextResponse.json({
    status: allUp ? 'HEALTHY' : 'DEGRADED',
    services: health,
    timestamp: new Date().toISOString(),
  });
}

export async function POST(request: NextRequest) {
  if (!(await requireSession())) {
    return NextResponse.json({ error: 'Oturum gereklidir.' }, { status: 401 });
  }

  const { service, event, payload } = (await request.json()) as {
    service: string;
    event: string;
    payload?: unknown;
  };

  const url = SERVICES[service as keyof typeof SERVICES];
  if (!url) {
    return NextResponse.json({ error: 'Service not found' }, { status: 400 });
  }
  if (typeof event !== 'string' || event.length === 0) {
    return NextResponse.json({ error: 'Geçersiz olay.' }, { status: 400 });
  }

  try {
    const res = await fetch(`${url}/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event, payload }),
    });

    if (!res.ok) throw new Error(`Service error: ${res.status}`);
    return NextResponse.json(await res.json());
  } catch (error) {
    console.error(`[Microservices] ${service} error:`, error);
    return NextResponse.json({ error: 'Service unavailable' }, { status: 503 });
  }
}
