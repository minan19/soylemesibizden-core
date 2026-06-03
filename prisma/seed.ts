import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Önce admin kullanıcı oluştur
  const admin = await prisma.user.upsert({
    where: { email: 'admin@soylemesibizden.com' },
    update: {},
    create: {
      email: 'admin@soylemesibizden.com',
      name: 'Sovereign Admin',
      role: 'ADMIN',
    },
  });

  // Demo ilan oluştur
  await prisma.listing.upsert({
    where: { id: 'seed-listing-alpha-one' },
    update: {},
    create: {
      id: 'seed-listing-alpha-one',
      title: 'Sovereign Estate - Alpha One',
      propertyType: 'RESIDENTIAL',
      priceAmount: 15_000_000,
      area: 500,
      status: 'ACTIVE',
      location: 'İstanbul, Beşiktaş',
      ownerId: admin.id,
    },
  });

  console.log('✔ Seed tamamlandı. Admin:', admin.email);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
