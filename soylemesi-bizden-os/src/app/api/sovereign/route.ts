import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Tarayıcı değil, Next.js sunucusu arka planda doğrudan Karargaha bağlanıyor (CORS engeli yok!)
    const res = await fetch('http://127.0.0.1:4000/intelligence/status', { cache: 'no-store' });
    if (!res.ok) throw new Error("Backend yanıt vermedi");
    const data = await res.json();
    return NextResponse.json(data);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
