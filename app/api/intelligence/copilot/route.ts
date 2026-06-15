import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import Anthropic from '@anthropic-ai/sdk';
import { checkRateLimit } from '@/lib/ratelimit';
import { computeScore } from '@/lib/investmentScore';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY ?? '' });

const messageSchema = z.object({
  message: z.string().min(1).max(1000),
  history: z.array(z.object({
    role: z.enum(['user', 'assistant']),
    content: z.string(),
  })).max(20).optional(),
});

const COPILOT_SYSTEM = `Sen Sovereign Intelligence Platform'un AI Emlak Danışmanısın.
Türkiye'nin en gelişmiş gayrimenkul yatırım platformunda çalışan, derin piyasa bilgisine sahip bir uzmansın.
Kullanıcıların doğal dil ile anlattığı ihtiyaçları anlayıp en uygun ilanları önerin.

Özellikler:
- Türkçe konuş, profesyonel ama samimi ol
- Bütçe, lokasyon, yatırım amacı, mülk tipi sorularını doğal şekilde anla
- Piyasa bilgisi ver: m² fiyatları, bölge trendleri, yatırım tavsiyeleri
- İlanları bulduğunda Sovereign Investment Score ile birlikte sun
- Mortgage hesaplama, kira getirisi, ROI konularında yardımcı ol
- Asla 300 kelimeyi geçme, özlü ve net ol
- Eğer ilan bulamazsan alternatif öner

Yanıt formatı:
- Eğer ilan bulduysan: listeyi tablo formatında sun
- Her ilanın yanına Sovereign Score'unu yaz
- Sonunda 1-2 cümle yatırım tavsiyen olsun`;

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Oturum gereklidir.' }, { status: 401 });
    }

    // Rate limiting
    const userId = (session.user as { id?: string }).id ?? 'anon';
    const rl = await checkRateLimit( `copilot:${userId}`);
    if (rl && !rl.success) {
      return NextResponse.json(
        { error: 'Çok fazla istek. Lütfen bir dakika bekleyin.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const parsed = messageSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
    }

    const { message, history = [] } = parsed.data;

    if (!process.env.ANTHROPIC_API_KEY) {
      // Demo yanıt
      return NextResponse.json({
        reply: generateDemoReply(message),
        listings: [],
        demo: true,
      });
    }

    // Kullanıcı mesajından filtreler çıkar (basit NLP)
    const filters = extractFilters(message);

    // Prisma ile ilan ara
    const listings = await searchListings(filters);

    // İlanları skorla
    const scoredListings = listings.map((l) => {
      const daysOnMarket = Math.floor((Date.now() - new Date(l.createdAt).getTime()) / 86_400_000);
      const score = computeScore({
        priceAmount: l.priceAmount,
        area: l.area,
        location: l.location ?? '',
        propertyType: l.propertyType,
        status: l.status,
        description: l.description,
        offerCount: l._count.offers,
        daysOnMarket,
      });
      return { ...l, sovereignScore: score };
    });

    // İlan özetini Claude'a gönder
    const listingContext = scoredListings.length > 0
      ? `\n\nKriterlere uyan ilanlar:\n${scoredListings.map((l, i) =>
          `${i + 1}. ${l.title} | ${l.location ?? 'Konum belirtilmemiş'} | ₺${l.priceAmount.toLocaleString('tr-TR')} | ${l.area}m² | Sovereign Score: ${l.sovereignScore.overall}/100 (${l.sovereignScore.grade}) | Öneri: ${l.sovereignScore.recommendation}`
        ).join('\n')}`
      : '\n\nBu kriterlere uyan aktif ilan bulunamadı.';

    const messages: Anthropic.MessageParam[] = [
      ...history.map((h) => ({ role: h.role as 'user' | 'assistant', content: h.content })),
      { role: 'user', content: message + listingContext },
    ];

    const response = await client.messages.create({
      model: 'claude-sonnet-4-5',
      max_tokens: 800,
      system: COPILOT_SYSTEM,
      messages,
    });

    const reply = response.content[0].type === 'text' ? response.content[0].text : '';

    return NextResponse.json({
      reply,
      listings: scoredListings.map((l) => ({
        id: l.id,
        title: l.title,
        location: l.location,
        priceAmount: l.priceAmount,
        area: l.area,
        propertyType: l.propertyType,
        sovereignScore: l.sovereignScore,
      })),
    });
  } catch (error) {
    console.error('[Copilot]', error);
    return NextResponse.json({ error: 'Yanıt alınamadı.' }, { status: 500 });
  }
}

// ── Filtre çıkarma (basit kural tabanlı NLP) ────────────────────────────────

interface Filters {
  maxPrice?: number;
  minPrice?: number;
  propertyType?: string;
  location?: string;
  minArea?: number;
  maxArea?: number;
}

function extractFilters(message: string): Filters {
  const filters: Filters = {};
  const m = message.toLowerCase();

  // Bütçe
  const budgetMatch = m.match(/(\d+(?:[.,]\d+)?)\s*(?:milyon|m|mn)/);
  if (budgetMatch) {
    const val = parseFloat(budgetMatch[1].replace(',', '.'));
    filters.maxPrice = val * 1_000_000;
  }

  // Mülk tipi
  if (m.includes('daire') || m.includes('konut') || m.includes('ev') || m.includes('rezidans')) {
    filters.propertyType = 'RESIDENTIAL';
  } else if (m.includes('iş yeri') || m.includes('ofis') || m.includes('ticari') || m.includes('dükkan')) {
    filters.propertyType = 'COMMERCIAL';
  } else if (m.includes('arsa') || m.includes('arazi') || m.includes('tarla')) {
    filters.propertyType = 'LAND';
  } else if (m.includes('depo') || m.includes('fabrika') || m.includes('sanayi')) {
    filters.propertyType = 'INDUSTRIAL';
  }

  // Lokasyon (büyük şehirler ve popüler ilçeler)
  const cities = [
    'istanbul', 'ankara', 'izmir', 'antalya', 'bursa', 'adana', 'konya',
    'kadıköy', 'beşiktaş', 'şişli', 'üsküdar', 'ataşehir', 'maltepe',
    'çankaya', 'keçiören', 'bornova', 'karşıyaka', 'konyaaltı',
  ];
  for (const city of cities) {
    if (m.includes(city)) { filters.location = city; break; }
  }

  return filters;
}

async function searchListings(filters: Filters) {
  const where: Record<string, unknown> = { status: 'ACTIVE' };
  if (filters.propertyType) where.propertyType = filters.propertyType;
  if (filters.maxPrice || filters.minPrice) {
    where.priceAmount = {
      ...(filters.minPrice ? { gte: filters.minPrice } : {}),
      ...(filters.maxPrice ? { lte: filters.maxPrice } : {}),
    };
  }
  if (filters.location) {
    where.location = { contains: filters.location, mode: 'insensitive' };
  }

  return prisma.listing.findMany({
    where,
    take: 5,
    orderBy: { createdAt: 'desc' },
    include: { _count: { select: { offers: true } } },
  });
}

function generateDemoReply(message: string): string {
  return `Merhaba! Ben Sovereign AI Emlak Danışmanınızım. "${message}" isteğinizi aldım.

**Demo Mod:** ANTHROPIC_API_KEY eklendiğinde gerçek AI analizi ve kişiselleştirilmiş ilan önerileri sunacağım.

Şimdilik şunu söyleyebilirim:
- Türkiye'de konut m² fiyatları İstanbul'da ortalama 85.000₺, Ankara'da 35.000₺, İzmir'de 55.000₺ seviyesinde.
- Kira getirisi açısından en avantajlı bölgeler: Antalya (%5-6), İzmir Alsancak (%4-5), İstanbul Kadıköy (%4-4.5).
- Yatırım için 2024-2025 trend bölgeleri: Ataşehir, Kartal, Pendik (İstanbul) ve İzmir Çiğli.

Gerçek AI deneyimi için ANTHROPIC_API_KEY ortam değişkeninizi ekleyin.`;
}
