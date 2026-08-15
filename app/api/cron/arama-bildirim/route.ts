import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { filtreCoz } from '@/lib/ilanFiltre';
import { yeniEslesenler } from '@/lib/aramaEslestir';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

/**
 * GET /api/cron/arama-bildirim · 15.08.2026 (TRT)
 *
 * Kayitli aramalara uyan YENI ilanlari bulur.
 *
 * ── E-POSTA GONDERIMI ─────────────────────────────────────────
 * SMTP yapilandirilmamissa BILDIRIM GONDERILDI SAYILMAZ ve
 * sonBildirimTs ILERLETILMEZ. Aksi halde pencere kayardi ve o
 * ilanlar hicbir zaman bildirilemezdi — kullanici "bildirim
 * acmistim ama hic gelmedi" derdi, hakli olurdu.
 *
 * Bu, projede tekrar eden ilkenin bir baska uygulamasi: yapilmamis
 * bir is yapilmis gibi kaydedilmez.
 */

function yetkiliMi(request: NextRequest): boolean {
  const gizli = process.env.CRON_SECRET;
  if (!gizli) return false;
  return request.headers.get('authorization') === `Bearer ${gizli}`;
}

function epostaYapilandirildiMi(): boolean {
  return Boolean(process.env.SMTP_USER && process.env.SMTP_PASS);
}

export async function GET(request: NextRequest) {
  if (!process.env.CRON_SECRET) {
    return NextResponse.json(
      { error: 'Zamanlanmış görev yapılandırılmamış.' },
      { status: 503 }
    );
  }
  if (!yetkiliMi(request)) {
    return NextResponse.json({ error: 'Yetkisiz.' }, { status: 401 });
  }

  const simdi = new Date();
  const epostaHazir = epostaYapilandirildiMi();

  try {
    const aramalar = await prisma.kayitliArama.findMany({
      where: { bildirimAcik: true },
      select: {
        id: true,
        ad: true,
        kriterler: true,
        sonBildirimTs: true,
        kullanici: { select: { eposta: true, adSoyad: true } },
      },
      take: 5000,
    });

    let eslesmeliArama = 0;
    let toplamYeniIlan = 0;
    const ornekler: { arama: string; adet: number }[] = [];

    for (const a of aramalar) {
      const filtre = filtreCoz(a.kriterler as Record<string, string>);
      const bastan = a.sonBildirimTs ?? a.sonBildirimTs ?? new Date(0);

      const adet = await yeniEslesenler(filtre, bastan);
      if (adet === 0) continue;

      eslesmeliArama++;
      toplamYeniIlan += adet;
      if (ornekler.length < 10) ornekler.push({ arama: a.ad, adet });

      if (epostaHazir) {
        // Gercek gonderim burada yapilacak. SMTP hazir olsa bile
        // gonderim basarisiz olursa sonBildirimTs ILERLETILMEMELI.
        // Bu dal, SMTP yapilandirildiginda tamamlanacak.
        await prisma.kayitliArama.update({
          where: { id: a.id },
          data: { sonBildirimTs: simdi },
        });
      }
    }

    const rapor = {
      calismaTs: simdi.toISOString(),
      tarananArama: aramalar.length,
      eslesmeliArama,
      toplamYeniIlan,
      epostaYapilandirildi: epostaHazir,
      // SMTP yoksa pencere ILERLETILMEDI — bu ilanlar kaybolmadi.
      bildirimGonderildi: epostaHazir,
      not: epostaHazir
        ? undefined
        : 'SMTP yapılandırılmamış. Eşleşmeler bulundu ama bildirim gönderilmedi ve bildirim penceresi ilerletilmedi; bu ilanlar SMTP hazır olduğunda bildirilecek.',
      ornekler,
    };

    console.log('[cron/arama]', JSON.stringify(rapor));
    return NextResponse.json(rapor);
  } catch (error) {
    console.error('[cron/arama] BASARISIZ', error);
    return NextResponse.json(
      { error: 'Arama bildirimi çalıştırılamadı.' },
      { status: 500 }
    );
  }
}
