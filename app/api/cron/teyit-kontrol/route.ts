import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { PASIFLESME_METNI, HATIRLATMA_ESIGI_GUN } from '@/lib/teyit';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

/**
 * GET /api/cron/teyit-kontrol · 14.08.2026 (TRT)
 *
 * OTOMATIK PASIFLESTIRME — hayalet ilan sorununun ikinci yarisi.
 *
 * Gunde bir calisir ve iki is yapar:
 *   1. Yetki suresi dolan ilanlari YETKI_BITTI ile pasiflestirir.
 *   2. Teyit suresi dolan ilanlari TEYIT_EDILMEDI ile pasiflestirir.
 *
 * "Insan eli degmeden kalkiyor" iddiasi ancak bu is calisirsa dogrudur.
 * Bu yuzden gorev sessizce basarisiz olmaz: hata durumunda 500 doner
 * ve Vercel cron'u alarm uretir.
 *
 * Yetkilendirme: CRON_SECRET. Tanimli degilse uc nokta ACILMAZ —
 * korumasiz bir toplu-guncelleme ucu birakilmaz.
 */

function yetkiliMi(request: NextRequest): boolean {
  const gizli = process.env.CRON_SECRET;
  if (!gizli) return false;

  // Vercel Cron "Authorization: Bearer <CRON_SECRET>" gonderir.
  const baslik = request.headers.get('authorization');
  return baslik === `Bearer ${gizli}`;
}

export async function GET(request: NextRequest) {
  if (!process.env.CRON_SECRET) {
    console.error('[cron/teyit] CRON_SECRET tanimli degil — uc nokta kapali.');
    return NextResponse.json(
      { error: 'Zamanlanmış görev yapılandırılmamış.' },
      { status: 503 }
    );
  }

  if (!yetkiliMi(request)) {
    return NextResponse.json({ error: 'Yetkisiz.' }, { status: 401 });
  }

  const simdi = new Date();

  try {
    // ── 1. Yetki suresi dolanlar ─────────────────────────────────
    // Once yetki kayitlari isaretlenir; yasal dayanak duser.
    const yetkiSonuc = await prisma.eidsYetki.updateMany({
      where: { durumu: 'GECERLI', bitis: { lte: simdi } },
      data: { durumu: 'SURESI_DOLDU' },
    });

    const yetkiBiten = await prisma.ilan.updateMany({
      where: {
        durumu: { in: ['YAYINDA', 'TEYIT_BEKLIYOR'] },
        yetki: { bitis: { lte: simdi } },
      },
      data: { durumu: 'PASIF', otomatikPasifTs: simdi },
    });

    // ── 2. Teyit suresi dolanlar ─────────────────────────────────
    const teyitDolan = await prisma.ilan.updateMany({
      where: {
        durumu: { in: ['YAYINDA', 'TEYIT_BEKLIYOR'] },
        teyitSonTarih: { lte: simdi },
      },
      data: { durumu: 'PASIF', otomatikPasifTs: simdi },
    });

    // ── 3. Yaklasanlar — hatirlatma icin sayilir ─────────────────
    const esik = new Date(simdi.getTime() + HATIRLATMA_ESIGI_GUN * 86_400_000);
    const hatirlatilacak = await prisma.ilan.count({
      where: {
        durumu: 'YAYINDA',
        teyitSonTarih: { gt: simdi, lte: esik },
      },
    });

    const rapor = {
      calismaTs: simdi.toISOString(),
      yetkisiDolanKayit: yetkiSonuc.count,
      yetkiNedeniylePasif: yetkiBiten.count,
      teyitNedeniylePasif: teyitDolan.count,
      hatirlatmaBekleyen: hatirlatilacak,
      sebepMetinleri: PASIFLESME_METNI,
    };

    console.log('[cron/teyit]', JSON.stringify(rapor));
    return NextResponse.json(rapor);
  } catch (error) {
    // Sessizce basarisiz OLMAZ. Bu is calismazsa hayalet ilan
    // iddiasinin tamami cokur; alarm uretmesi gerekir.
    console.error('[cron/teyit] BASARISIZ', error);
    return NextResponse.json(
      { error: 'Teyit kontrolü çalıştırılamadı.' },
      { status: 500 }
    );
  }
}
