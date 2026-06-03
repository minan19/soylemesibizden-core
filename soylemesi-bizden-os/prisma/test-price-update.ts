import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

async function main() {
  const connectionString = `postgresql://${process.env.USER}@localhost:5432/soylemesi_bizden?schema=public`;
  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  const listingId = "f69602f4-8019-4513-80e5-5b4a6762012d";
  const oldPrice = 15000000;
  const newPrice = 18750000;

  // 1. Fiyatı Güncelle
  const updatedListing = await prisma.listing.update({
    where: { id: listingId },
    data: { priceAmount: newPrice }
  });

  // 2. Sovereign IQ: Fiyat Geçmişini ve Oranı Mühürle
  const history = await prisma.listingPriceHistory.create({
    data: {
      listingId: listingId,
      oldPrice: oldPrice,
      newPrice: newPrice,
      changeRatio: (newPrice - oldPrice) / oldPrice
    }
  });

  console.log('✅ Fiyat Güncellendi:', updatedListing.priceAmount, 'TL');
  console.log('📊 IQ Analizi: %' + (Number(history.changeRatio) * 100).toFixed(2) + ' artış kaydedildi.');
  console.log('🧾 Ledger ID:', history.id);

  await prisma.$disconnect();
  await pool.end();
}

main().catch(console.error);
