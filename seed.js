const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('[SOVEREIGN] Kasa açılıyor, elit varlıklar mühürleniyor...');
  
  await prisma.asset.deleteMany({});

  await prisma.asset.createMany({
    data: [
      { 
        title: 'Signature Waterfront Mansion', 
        price: 85000000, 
        location: 'SARIYER / YENİKÖY', 
        trustScore: 98.4, 
        investmentIq: 'AAA+', 
        type: 'RESIDENTIAL', 
        status: 'SIGNATURE', 
        coordinates: [29.0435, 41.0769], 
        dnaTags: ['luxury', 'privacy'] 
      },
      { 
        title: 'Corporate HQ Tower Floor', 
        price: 120000000, 
        location: 'MASLAK / PLAZALAR', 
        trustScore: 94.1, 
        investmentIq: 'AA', 
        type: 'COMMERCIAL', 
        status: 'VERIFIED', 
        coordinates: [29.0594, 41.1198], 
        dnaTags: ['prestige'] 
      },
      { 
        title: 'Eco-Smart Forest House', 
        price: 42500000, 
        location: 'ZEKERİYAKÖY', 
        trustScore: 96.7, 
        investmentIq: 'AAA', 
        type: 'RESIDENTIAL', 
        status: 'OPEN', 
        coordinates: [29.0326, 41.0827], 
        dnaTags: ['nature', 'privacy'] 
      }
    ]
  });
  console.log('[SOVEREIGN] Varlıklar başarıyla veritabanına işlendi. Kasa kilitlendi.');
}

main()
  .catch(e => {
    console.error('Hata:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
