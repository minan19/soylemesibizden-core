import { PrismaClient } from '@prisma/client';

// Prisma'nın varsayılan, en hatasız başlatma yöntemi
const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.user.findFirst({ 
    where: { email: 'admin@soylemesibizden.com' } 
  });
  
  if (!admin) {
    console.error('❌ Hata: Admin bulunamadı! Lütfen önce: npx tsx prisma/seed.ts');
    return;
  }

  const listing = await prisma.listing.create({
    data: {
      title: 'Sovereign Estate - Alpha One',
      priceAmount: 15000000,
      area: 500,
      listingType: 'SALE',
      propertyType: 'LAND',
      status: 'ACTIVE',
      owner: { connect: { id: admin.id } }
    }
  });
  
  console.log('✅ Otonom Mülk Mühürlendi:', listing.title);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
