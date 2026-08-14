import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { z } from 'zod';
import Anthropic from '@anthropic-ai/sdk';
import { checkRateLimit } from '@/lib/ratelimit';

export const dynamic = 'force-dynamic';

const valuationSchema = z.object({
  propertyType: z.enum(['RESIDENTIAL', 'COMMERCIAL', 'LAND', 'INDUSTRIAL']),
  area: z.number().positive('Alan pozitif olmalıdır.'),
  location: z.string().min(2, 'Konum en az 2 karakter olmalıdır.'),
  description: z.string().optional(),
  floor: z.number().optional(),
  age: z.number().optional(),
  features: z.array(z.string()).optional(),
});

type ValuationInput = z.infer<typeof valuationSchema>;

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY ?? '',
});

const VALUATION_SYSTEM_PROMPT = `Sen Sovereign Intelligence Engine'in otomatik değerleme uzmanısın.
Türkiye gayrimenkul piyasasında derin uzmanlığa sahip bir yapay zeka analistsin.
Verilen mülk özelliklerine göre piyasa değeri tahmini yap.
Yanıtını kesinlikle şu JSON formatında ver, başka hiçbir metin ekleme:
{
  "estimatedValue": <tahmini piyasa değeri TL cinsinden sayı>,
  "minValue": <minimum değer TL cinsinden sayı>,
  "maxValue": <maximum değer TL cinsinden sayı>,
  "pricePerM2": <m² başına fiyat TL cinsinden sayı>,
  "confidence": <güven skoru 0-100 arası sayı>,
  "marketTrend": <"RISING", "STABLE", "DECLINING">,
  "comparables": [
    { "description": "<benzer mülk açıklaması>", "pricePerM2": <sayı>, "location": "<konum>" }
  ],
  "factors": {
    "positive": [<değeri artıran faktörler listesi string[]>],
    "negative": [<değeri düşüren faktörler listesi string[]>]
  },
  "methodology": "<kullanılan değerleme metodolojisi kısa açıklaması>",
  "disclaimer": "Bu değerleme tahmindir ve kesin değer için uzman degerleme gereklidir."
}`;

// NOT: generateMockValuation() 14.08.2026'da kaldirildi.
// Sabit m2 carpanlariyla (Istanbul 2.8x, konut 45.000 TL/m2)
// uydurulmus bir degerleme uretiyordu ve "confidence: 76" etiketiyle
// donuyordu. Gercek degerleme yapilamiyorsa 503/502 doner.

export async function POST(request: NextRequest) {
  let rawBody: unknown = {};
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Oturum gereklidir.' }, { status: 401 });
    }

    // Rate limiting — kullanıcı başına dakikada 10 AI isteği
    const userId = (session.user as { id?: string }).id ?? session.user.email ?? 'anonymous';
    const rl = await checkRateLimit( userId);
    if (rl && !rl.success) {
      return NextResponse.json(
        { error: 'Çok fazla istek. Lütfen bir dakika bekleyin.' },
        {
          status: 429,
          headers: {
            'X-RateLimit-Remaining': String(rl.remaining),
            'X-RateLimit-Reset': String(rl.reset),
            'Retry-After': '60',
          },
        }
      );
    }

    rawBody = await request.json();
    const parsed = valuationSchema.safeParse(rawBody);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 }
      );
    }

    const input = parsed.data;

    if (!process.env.ANTHROPIC_API_KEY) {
      // Uydurma degerleme DONMEZ. Bir gayrimenkulun degerine dair
      // sayi uretmek, o sayi hesaplanmamissa, dogrudan zarar verir.
      return NextResponse.json(
        {
          error: 'Degerleme servisi yapilandirilmamis.',
          detail: 'ANTHROPIC_API_KEY tanimli degil. Degerleme uretilemez.',
        },
        { status: 503 }
      );
    }

    const prompt = `
Aşağıdaki mülk için piyasa değeri tahmini yap:

Mülk Tipi: ${input.propertyType}
Alan: ${input.area} m²
Konum: ${input.location}
${input.floor !== undefined ? `Kat: ${input.floor}` : ''}
${input.age !== undefined ? `Yapı Yaşı: ${input.age} yıl` : ''}
${input.description ? `Açıklama: ${input.description}` : ''}
${input.features && input.features.length > 0 ? `Özellikler: ${input.features.join(', ')}` : ''}

Türkiye 2024-2025 piyasa koşullarını ve bölgesel değerleme verilerini göz önünde bulundur.
JSON formatında yanıt ver.`.trim();

    const message = await client.messages.create({
      model: 'claude-sonnet-4-5',
      max_tokens: 1024,
      system: VALUATION_SYSTEM_PROMPT,
      messages: [{ role: 'user', content: prompt }],
    });

    const content = message.content[0];
    if (content.type !== 'text') {
      return NextResponse.json({ error: 'AI yanıtı alınamadı.' }, { status: 500 });
    }

    const jsonMatch = content.text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json({ error: 'AI yanıtı parse edilemedi.' }, { status: 500 });
    }

    const valuation = JSON.parse(jsonMatch[0]) as unknown;
    return NextResponse.json({
      valuation,
      generatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Sovereign AI Error [Valuation]:', error);
    // Hata durumunda uydurma degerleme DONMEZ.
    // Eski davranis: generateMockValuation() sabit m2 carpanlariyla
    // (Istanbul 2.8x, konut 45.000 TL/m2 gibi) bir deger uretip
    // "confidence: 76" ile donduruyordu. Bu sayilarin hicbiri
    // olculmus veri degildi.
    return NextResponse.json(
      { error: 'Degerleme yapilamadi. Lutfen daha sonra tekrar deneyin.' },
      { status: 502 }
    );
  }
}
