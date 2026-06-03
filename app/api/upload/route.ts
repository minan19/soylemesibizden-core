import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

export const dynamic = 'force-dynamic';

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/heic'];
const MAX_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Oturum gereklidir.' }, { status: 401 });
    }

    const token = process.env.BLOB_READ_WRITE_TOKEN;
    if (!token) {
      return NextResponse.json(
        { error: 'Blob depolama henüz yapılandırılmamış.', demo: true },
        { status: 503 }
      );
    }

    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('filename');
    const contentType = request.headers.get('content-type') ?? 'image/jpeg';

    if (!filename) {
      return NextResponse.json({ error: 'Dosya adı zorunludur.' }, { status: 400 });
    }

    const safeName = filename.replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 100);

    if (!ALLOWED_TYPES.includes(contentType)) {
      return NextResponse.json(
        { error: 'Sadece JPEG, PNG, WebP veya HEIC yüklenebilir.' },
        { status: 400 }
      );
    }

    const contentLength = Number(request.headers.get('content-length') ?? 0);
    if (contentLength > MAX_SIZE_BYTES) {
      return NextResponse.json({ error: 'Dosya boyutu 10MB\'ı geçemez.' }, { status: 400 });
    }

    const userId = (session.user as { id?: string }).id ?? 'unknown';
    const blobPath = `listings/${userId}/${Date.now()}-${safeName}`;

    // Vercel Blob REST API — @vercel/blob SDK kullanmadan (undici webpack sorunu yok)
    const blobRes = await fetch(`https://blob.vercel-storage.com/${blobPath}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': contentType,
        'x-api-version': '7',
        'x-add-random-suffix': '1',
      },
      body: request.body,
      // @ts-expect-error — Node.js fetch duplex requirement
      duplex: 'half',
    });

    if (!blobRes.ok) {
      const errText = await blobRes.text();
      console.error('[Upload] Blob API hatası:', errText);
      return NextResponse.json({ error: 'Dosya yüklenemedi.' }, { status: 500 });
    }

    const blobData = await blobRes.json() as { url: string; pathname: string };
    return NextResponse.json({ url: blobData.url, pathname: blobData.pathname });
  } catch (error) {
    console.error('[Upload]', error);
    return NextResponse.json({ error: 'Dosya yüklenemedi.' }, { status: 500 });
  }
}
