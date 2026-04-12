import { PrismaClient, AssetType, UserRole } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // 1. Sistem Yöneticisi ve Örnek Danışman Oluştur
  const admin = await prisma.user.upsert({
    where: { email: 'admin@soylemesibizden.com' },
    update: {},
    create: {
      email: 'admin@soylemesibizden.com',
      name: 'Sovereign Admin',
      role: UserRole.ADMIN,
      isIdentityVerified: true,
      trustScore: 100.0,
    },
  })

  // 2. Örnek "Signature" Portföyleri Veritabanına Mühürle
  const mansion = await prisma.listing.create({
    data: {
      title: 'Signature Waterfront Mansion',
      description: 'Boğaz hattında emsalsiz, tescilli tarihi eser statüsünde rıhtımlı yalı.',
      price: 85000000,
      assetType: AssetType.EMLAK,
      location: 'SARIYER / YENİKÖY',
      trustScore: 98.4,
      investmentScore: 92.0,
      qualityScore: 100.0,
      ownerId: admin.id,
      isVerified: true,
      analysisReport: {
        create: {
          avgRegionPrice: 78000000,
          marketTrend: 'Rising',
          liquidityScore: 85.0,
          deepData: {
            crimeRate: 'Low',
            socialScore: 'Elite',
            transportation: 'Sea & Land'
          }
        }
      }
    }
  })

  const loft = await prisma.listing.create({
    data: {
      title: 'Fırsat: Modern Loft',
      description: 'Moda sahilinde, acil nakit ihtiyacı nedeniyle rayiç altı listelenen penthouse.',
      price: 14500000,
      assetType: AssetType.EMLAK,
      location: 'KADIKÖY / MODA',
      trustScore: 95.0,
      investmentScore: 98.0,
      qualityScore: 90.0,
      ownerId: admin.id,
      isVerified: true,
      analysisReport: {
        create: {
          avgRegionPrice: 16200000,
          marketTrend: 'Stable',
          liquidityScore: 95.0,
          deepData: {
            urgency: 'High',
            yieldPotential: '%42'
          }
        }
      }
    }
  })

  console.log('Sovereign veritabanı başarıyla tohumlandı.')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
