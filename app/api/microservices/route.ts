import { NextRequest, NextResponse } from 'next/server';

/**
 * Microservices Health Check Router
 *
 * Go microservices ile haberleşme
 * - notifications-service: User alerts + push
 * - analytics-service: Event tracking + dashboards
 */

const SERVICES = {
  notifications: process.env.NOTIFICATIONS_SERVICE_URL ?? 'http://localhost:3001',
  analytics: process.env.ANALYTICS_SERVICE_URL ?? 'http://localhost:3002',
};

interface ServiceHealth {
  name: string;
  url: string;
  status: 'UP' | 'DOWN';
  latency: number;
}

export async function GET() {
  const health: ServiceHealth[] = [];

  for (const [name, url] of Object.entries(SERVICES)) {
    const start = Date.now();
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);
      const res = await fetch(`${url}/health`, { signal: controller.signal });
      const latency = Date.now() - start;
      health.push({
        name,
        url,
        status: res.ok ? 'UP' : 'DOWN',
        latency,
      });
    } catch {
      health.push({
        name,
        url,
        status: 'DOWN',
        latency: Date.now() - start,
      });
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
  const { service, event, payload } = await request.json() as {
    service: string;
    event: string;
    payload?: unknown;
  };

  const url = SERVICES[service as keyof typeof SERVICES];
  if (!url) {
    return NextResponse.json({ error: 'Service not found' }, { status: 400 });
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
    return NextResponse.json(
      { error: 'Service unavailable' },
      { status: 503 }
    );
  }
}
