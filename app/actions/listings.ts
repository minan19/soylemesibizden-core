"use server";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function getSignatureListings() {
  return await prisma.listing.findMany({
    include: {
      analysisReport: true,
    },
    orderBy: {
      trustScore: 'desc',
    },
    take: 4,
  });
}
