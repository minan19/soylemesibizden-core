import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.user.upsert({
    where: { email: 'admin@soylemesibizden.com' },
    update: {},
    create: {
      email: 'admin@soylemesibizden.com',
      firstName: 'Mustafa',
      lastName: 'Inan',
      password: 'secure_password_123', // Zorunlu alan eklendi
      passwordHash: 'hashed_secure_password',
      role: 'SUPER_ADMIN',
      status: 'ACTIVE',
    },
  });
  console.log('✅ Sistem Yöneticisi Mühürlendi:', admin.email);
}
main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
