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

// Deterministik tahmin (API key yokken)
function generateForecast(city: string, propertyType: string, months: number) {
  // Şehir bazlı başlangıç m² fiyatları
  const BASE_PRICES: Record<string, number> = {
    istanbul: 85_000, ankara: 38_000, izmir: 55_000, antalya: 48_000,
    bursa: 28_000, adana: 22_000, konya: 20_000, gaziantep: 18_000,
    default: 25_000,
  };
  const TYPE_MULT: Record<string, number> = {
    RESIDENTIAL: 1.0, COMMERCIAL: 1.4, LAND: 0.6, INDUSTRIAL: 1.1,
  };

  const cityKey = Object.keys(BASE_PRICES).find((k) => city.toLowerCase().includes(k)) ?? 'default';
  const baseM2 = BASE_PRICES[cityKey] * (TYPE_MULT[propertyType] ?? 1.0);

  // Aylık büyüme modeli: TÜFE etkisi + talep premium + mevsimsel etki
  const annualInflation = 0.40; // %40 TÜFE tahmini
  const demandPremium = cityKey === 'istanbul' ? 0.05 : cityKey === 'izmir' ? 0.03 : 0.01;
  const monthlyBase = (annualInflation + demandPremium) / 12;

  const forecastMonths = Array.from({ length: months }, (_, i) => {
    const month = i + 1;
    const seasonal = Math.sin((month / 12) * Math.PI) * 0.01; // Yaz piki
    const cumChange = (1 + monthlyBase + seasonal) ** month - 1;
    const priceM2 = Math.round(baseM2 * (1 + cumChange));
    return {
      month,
      priceM2,
      changePercent: Math.round(cumChange * 1000) / 10,
    };
  });

  const change6 = forecastMonths[5]?.changePercent ?? 0;
  const change12 = forecastMonths[11]?.changePercent ?? forecastMonths[months - 1]?.changePercent ?? 0;

  return {
    currentAvgM2: Math.round(baseM2),
    forecastMonths,
    summary6Month: `${city} ${propertyType === 'RESIDENTIAL' ? 'konut' : 'gayrimenkul'} piyasasında önümüzdeki 6 ayda yaklaşık %${change6.toFixed(1)} değer artışı öngörülmektedir.`,
    summary12Month: `12 aylık projeksiyon %${change12.toFixed(1)} kümülatif artış işaret etmektedir. TÜFE ve talep dinamikleri belirleyici faktörler olacak.`,
    keyFactors: [
      'TCMB faiz politikası ve enflasyon görünümü',
      'Konut arz-talep dengesizliği',
      `${city} bölgesel gelişim projeleri`,
      'Döviz kuru ve yabancı talep',
      'İnşaat maliyeti artışları',
    ],
    riskLevel: annualInflation > 0.35 ? 'MEDIUM' : 'LOW',
    confidence: 68,
    demo: true,
  };
}

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
      return NextResponse.json({
        forecast: generateForecast(city, propertyType, months),
        city, propertyType, months,
        generatedAt: new Date().toISOString(),
      });
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
    const body = await request.json().catch(() => ({ city: '', propertyType: 'RESIDENTIAL', months: 12 })) as { city: string; propertyType: string; months: number };
    return NextResponse.json({
      forecast: generateForecast(body.city, body.propertyType, body.months),
      generatedAt: new Date().toISOString(),
    });
  }
}
