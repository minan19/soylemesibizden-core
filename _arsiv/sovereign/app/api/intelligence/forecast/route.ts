import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import Anthropic from '@anthropic-ai/sdk';
import { checkRateLimit } from '@/lib/ratelimit';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY ?? '' });

const forecastSchema = z.object({
  city: z.string().min(2, 'Şehir zorunludur'),
  propertyType: z.enum(['RESIDENTIAL', 'COMMERCIAL', 'LAND', 'INDUSTRIAL']).optional(),
  months: z.number().int().min(3).max(24).default(12),
});

const FORECAST_SYSTEM = `Sen Türkiye gayrimenkul piyasasının önde gelen tahmin analistiydin.
Sovereign Intelligence Engine'nin fiyat öngörü modülü olarak çalışıyorsun.
Verilen şehir, mülk tipi ve dönem için Türkiye makroekonomik faktörlerini (TCMB faizi, TÜFE, döviz kuru, konut arzı/talebi)
göz önünde bulundurarak gerçekçi fiyat tahminleri üret.
Yanıtını SADECE şu JSON formatında ver:
{
  "currentAvgM2": <mevcut ortalama m² fiyatı TL>,
  "forecastMonths": [
    { "month": 1, "priceM2": <tahmin>, "changePercent": <değişim %> },
    ... (her ay için)
  ],
  "summary6Month": <6 ay özet metin>,
  "summary12Month": <12 ay özet metin>,
  "keyFactors": [<3-5 faktör listesi>],
  "riskLevel": <"LOW" | "MEDIUM" | "HIGH">,
  "confidence": <0-100>
}`;

// NOT: generateForecast() 14.08.2026'da kaldirildi.
// Sabit sehir m2 fiyatlari, sabit "%40 TUFE" varsayimi ve sinus
// egrisiyle uretilmis "mevsimsel etki" kullanarak 12 aylik fiyat
// projeksiyonu uretiyor, bunu "confidence: 68" ile donduruyordu.
// Hicbir girdi olculmus veri degildi. Gercek tahmin uretilemiyorsa
// 503/502 doner.

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Oturum gereklidir.' }, { status: 401 });
    }

    const userId = (session.user as { id?: string }).id ?? 'anon';
    const rl = await checkRateLimit( `forecast:${userId}`);
    if (rl && !rl.success) {
      return NextResponse.json({ error: 'Çok fazla istek.' }, { status: 429 });
    }

    const body = await request.json();
    const parsed = forecastSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
    }

    const { city, propertyType = 'RESIDENTIAL', months } = parsed.data;

    if (!process.env.ANTHROPIC_API_KEY) {
      // Uydurma fiyat tahmini DONMEZ.
      return NextResponse.json(
        {
          error: 'Tahmin servisi yapilandirilmamis.',
          detail: 'ANTHROPIC_API_KEY tanimli degil. Tahmin uretilemez.',
        },
        { status: 503 }
      );
    }

    // Platform verisi: şehirdeki ilanlar
    const listings = await prisma.listing.findMany({
      where: {
        location: { contains: city, mode: 'insensitive' },
        propertyType,
        status: 'ACTIVE',
        visibility: 'PUBLIC',
      },
      select: { priceAmount: true, area: true, createdAt: true },
      take: 100,
    });

    const validM2 = listings.filter((l) => l.area > 0).map((l) => l.priceAmount / l.area);
    const avgM2 = validM2.length > 0 ? validM2.reduce((s, v) => s + v, 0) / validM2.length : 0;

    const prompt = `
Şehir: ${city}
Mülk Tipi: ${propertyType}
Platform Verisi: ${listings.length} aktif ilan, ortalama m² fiyatı ${avgM2 > 0 ? Math.round(avgM2).toLocaleString('tr-TR') + ' ₺' : 'bilinmiyor'}
Tahmin Dönemi: ${months} ay

Türkiye 2025-2026 piyasa koşulları, TCMB kararları ve bölgesel dinamikleri göz önünde bulundurarak tahmin üret.
JSON yanıtı ver.
`.trim();

    const response = await client.messages.create({
      model: 'claude-sonnet-4-5',
      max_tokens: 2000,
      system: FORECAST_SYSTEM,
      messages: [{ role: 'user', content: prompt }],
    });

    const text = response.content[0].type === 'text' ? response.content[0].text : '';
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('Parse hatası');

    const forecast = JSON.parse(jsonMatch[0]) as unknown;
    return NextResponse.json({
      forecast,
      city, propertyType, months,
      generatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('[Forecast]', error);
    // Hata durumunda uydurma tahmin DONMEZ.
    // Eski davranis: generateForecast() sabit sehir m2 fiyatlari
    // (Istanbul 85.000 TL/m2), sabit "%40 TUFE" varsayimi ve sinus
    // egrisiyle uretilmis "mevsimsel etki" ile 12 aylik fiyat
    // projeksiyonu donduruyordu. Hicbiri olculmus veri degildi.
    return NextResponse.json(
      { error: 'Tahmin uretilemedi. Lutfen daha sonra tekrar deneyin.' },
      { status: 502 }
    );
  }
}
