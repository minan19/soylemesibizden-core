import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { z } from 'zod';
import Anthropic from '@anthropic-ai/sdk';
import { aiRatelimit, checkRateLimit } from '@/lib/ratelimit';

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

function generateMockValuation(input: ValuationInput) {
  const baseRates: Record<string, number> = {
    RESIDENTIAL: 45000,
    COMMERCIAL: 68000,
    LAND: 22000,
    INDUSTRIAL: 35000,
  };

  const locationMultipliers: Record<string, number> = {
    istanbul: 2.8,
    ankara: 1.6,
    izmir: 1.9,
    antalya: 1.7,
    bursa: 1.3,
    default: 1.0,
  };

  const locationKey = input.location.toLowerCase();
  const locationMult = Object.keys(locationMultipliers).find((k) =>
    locationKey.includes(k)
  );
  const mult = locationMult
    ? locationMultipliers[locationMult]
    : locationMultipliers.default;

  const baseRate = baseRates[input.propertyType] ?? 45000;
  const pricePerM2 = Math.round(baseRate * mult);
  const estimatedValue = Math.round(pricePerM2 * input.area);

  return {
    estimatedValue,
    minValue: Math.round(estimatedValue * 0.88),
    maxValue: Math.round(estimatedValue * 1.12),
    pricePerM2,
    confidence: 76,
    marketTrend: 'RISING' as const,
    comparables: [
      {
        description: `Benzer ${input.propertyType.toLowerCase()} mülk`,
        pricePerM2: Math.round(pricePerM2 * 0.95),
        location: input.location,
      },
      {
        description: `Yakın bölge ${input.propertyType.toLowerCase()} referansı`,
        pricePerM2: Math.round(pricePerM2 * 1.05),
        location: input.location,
      },
    ],
    factors: {
      positive: [
        `${input.location} lokasyon avantajı`,
        `${input.area} m² kullanılabilir alan`,
        'Türkiye gayrimenkul piyasasında yükselen trend',
      ],
      negative: [
        'Makroekonomik belirsizlik faktörü',
        'Faiz oranlarının değerleme üzerindeki etkisi',
      ],
    },
    methodology:
      'Karşılaştırmalı piyasa analizi (CMA) ve bölge bazlı m² değerleme yöntemi kullanılmıştır.',
    disclaimer:
      'Bu değerleme tahmindir ve kesin değer için lisanslı eksper değerlemesi gereklidir.',
    demo: true,
  };
}

export async function POST(request: NextRequest) {
  let rawBody: unknown = {};
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Oturum gereklidir.' }, { status: 401 });
    }

    // Rate limiting — kullanıcı başına dakikada 10 AI isteği
    const userId = (session.user as { id?: string }).id ?? session.user.email ?? 'anonymous';
    const rl = await checkRateLimit(aiRatelimit, userId);
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
      return NextResponse.json({
        valuation: generateMockValuation(input),
        generatedAt: new Date().toISOString(),
      });
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
    // Only fall back to mock when we have a valid, parsed input (i.e. the AI call failed,
    // not the body parse). If rawBody was never assigned or is invalid, return 500.
    const fallbackParsed = valuationSchema.safeParse(rawBody);
    if (fallbackParsed.success) {
      return NextResponse.json({
        valuation: generateMockValuation(fallbackParsed.data),
        generatedAt: new Date().toISOString(),
      });
    }
    return NextResponse.json({ error: 'Değerleme yapılamadı.' }, { status: 500 });
  }
}
