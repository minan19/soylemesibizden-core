import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import Anthropic from '@anthropic-ai/sdk';
import { aiRatelimit, checkRateLimit } from '@/lib/ratelimit';

export const dynamic = 'force-dynamic';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY ?? '',
});

const SYSTEM_PROMPT = `Sen Sovereign Intelligence Engine'in baş analisti, Türkiye'nin en gelişmiş gayrimenkul AI analiz sisteminin bir parçasısın.
Verilen mülk verisini analiz ederek kapsamlı bir yatırım raporu üret. Türkçe yaz.
Yanıtını kesinlikle şu JSON formatında ver:
{
  "trustScore": <0-100 arası sayı>,
  "investmentGrade": <"A", "B", "C", "D" veya "F">,
  "roi12Month": <yıllık tahmini ROI yüzdesi, sayı>,
  "roi24Month": <24 aylık tahmini ROI yüzdesi, sayı>,
  "riskLevel": <"LOW", "MEDIUM", "HIGH">,
  "priceAssessment": <"UNDERVALUED", "FAIR", "OVERVALUED">,
  "strengths": [<3-5 madde güçlü yönler>],
  "weaknesses": [<2-3 madde zayıf yönler>],
  "recommendation": <"BUY", "HOLD", "AVOID">,
  "summary": <2-3 cümle profesyonel özet>
}`;

export async function POST(request: NextRequest) {
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

    if (!process.env.ANTHROPIC_API_KEY) {
      // Demo mode: gerçek API key yoksa mock veri döndür
      return NextResponse.json(generateMockReport());
    }

    const body = await request.json() as { listingId?: string };
    const { listingId } = body;

    if (!listingId) {
      return NextResponse.json({ error: 'listingId zorunludur.' }, { status: 400 });
    }

    const listing = await prisma.listing.findUnique({
      where: { id: listingId },
      include: {
        owner: { select: { name: true } },
        offers: { select: { amount: true, status: true } },
      },
    });

    if (!listing) {
      return NextResponse.json({ error: 'İlan bulunamadı.' }, { status: 404 });
    }

    const avgOffer = listing.offers.length > 0
      ? listing.offers.reduce((s, o) => s + o.amount, 0) / listing.offers.length
      : null;

    const listingContext = `
Mülk Bilgileri:
- Başlık: ${listing.title}
- Tür: ${listing.propertyType}
- Fiyat: ${listing.priceAmount.toLocaleString('tr-TR')} ₺
- Alan: ${listing.area} m²
- m² Fiyatı: ${(listing.priceAmount / listing.area).toFixed(0)} ₺/m²
- Konum: ${listing.location ?? 'Belirtilmemiş'}
- Durum: ${listing.status}
- Teklif Sayısı: ${listing.offers.length}
${avgOffer ? `- Ortalama Teklif: ${avgOffer.toLocaleString('tr-TR')} ₺` : ''}
- Açıklama: ${listing.description ?? 'Yok'}
    `.trim();

    const message = await client.messages.create({
      model: 'claude-sonnet-4-5',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: `Aşağıdaki Türkiye gayrimenkul varlığını analiz et ve JSON raporu üret:\n\n${listingContext}`,
        },
      ],
    });

    const content = message.content[0];
    if (content.type !== 'text') {
      return NextResponse.json({ error: 'AI yanıtı alınamadı.' }, { status: 500 });
    }

    // JSON parse
    const jsonMatch = content.text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json({ error: 'AI yanıtı parse edilemedi.' }, { status: 500 });
    }

    const report = JSON.parse(jsonMatch[0]) as unknown;
    return NextResponse.json({ report, listingId, generatedAt: new Date().toISOString() });

  } catch (error) {
    console.error('Sovereign AI Error [Intelligence Report]:', error);
    // Hata durumunda mock veri döndür
    return NextResponse.json(generateMockReport());
  }
}

function generateMockReport() {
  return {
    report: {
      trustScore: 94.7,
      investmentGrade: 'A',
      roi12Month: 12.4,
      roi24Month: 26.8,
      riskLevel: 'LOW',
      priceAssessment: 'FAIR',
      strengths: [
        'Stratejik lokasyon avantajı',
        'Güçlü kira getiri potansiyeli',
        'Gelişen bölge dinamikleri',
        'Yüksek talep — düşük arz dengesi',
      ],
      weaknesses: [
        'Pazar volatilitesi riski mevcut',
        'Uzun vadeli değerleme belirsizliği',
      ],
      recommendation: 'BUY',
      summary: 'Bu varlık, mevcut pazar koşulları ve bölgesel büyüme potansiyeli değerlendirildiğinde güçlü bir yatırım fırsatı sunmaktadır. Sovereign IQ analizi portföye eklemeyi önermektedir.',
    },
    listingId: 'demo',
    generatedAt: new Date().toISOString(),
    demo: true,
  };
}
