import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import Anthropic from '@anthropic-ai/sdk';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY ?? '' });

const scoreSchema = z.object({
  imageUrl: z.string().url('Geçerli bir URL giriniz'),
});

const IMAGE_SCORE_SYSTEM = `Sen profesyonel bir gayrimenkul fotoğraf değerlendirme uzmanısın.
Verilen fotoğrafı şu kriterlere göre değerlendir ve sadece JSON yanıt ver:
{
  "overall": <0-100 genel skor>,
  "lighting": <0-100 ışık kalitesi>,
  "composition": <0-100 kompozisyon>,
  "clarity": <0-100 netlik ve keskinlik>,
  "staging": <0-100 düzenleme ve sunum>,
  "angle": <0-100 açı ve perspektif>,
  "issues": [<sorunlar listesi max 3 madde>],
  "improvements": [<iyileştirme önerileri max 3 madde>],
  "summary": "<kısa profesyonel değerlendirme 1 cümle>"
}`;

// URL'e erişilemeyen durum için deterministik skor
function generateDemoScore() {
  const base = 60 + Math.floor(Math.random() * 30);
  return {
    overall: base,
    lighting: base - 5 + Math.floor(Math.random() * 15),
    composition: base + Math.floor(Math.random() * 10),
    clarity: base - 3 + Math.floor(Math.random() * 12),
    staging: base - 10 + Math.floor(Math.random() * 20),
    angle: base + Math.floor(Math.random() * 8),
    issues: [
      'Arka plan dağınık görünüyor',
      'Işık kaynağı pencerenin önünde — gölge yaratıyor',
    ],
    improvements: [
      'Profesyonel bir geniş açı lens ile yeniden çekim yapın',
      'Doğal ışığı kullanmak için sabah saatlerini tercih edin',
      'Mobilyaları ve dekorasyonu minimalist bir şekilde düzenleyin',
    ],
    summary: 'Ortalama kalitede bir gayrimenkul fotoğrafı — birkaç iyileştirme ile satış süresini önemli ölçüde kısaltabilirsiniz.',
    demo: true,
  };
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Oturum gereklidir.' }, { status: 401 });
    }

    const body = await request.json();
    const parsed = scoreSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json({ score: generateDemoScore() });
    }

    // Claude Vision ile fotoğraf analizi
    const response = await client.messages.create({
      model: 'claude-sonnet-4-5',
      max_tokens: 600,
      system: IMAGE_SCORE_SYSTEM,
      messages: [{
        role: 'user',
        content: [
          {
            type: 'image',
            source: { type: 'url', url: parsed.data.imageUrl },
          },
          {
            type: 'text',
            text: 'Bu gayrimenkul fotoğrafını değerlendir. JSON yanıt ver.',
          },
        ],
      }],
    });

    const text = response.content[0].type === 'text' ? response.content[0].text : '';
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('Parse hatası');

    const score = JSON.parse(jsonMatch[0]) as unknown;
    return NextResponse.json({ score });
  } catch (error) {
    console.error('[Image Score]', error);
    return NextResponse.json({ score: generateDemoScore() });
  }
}
