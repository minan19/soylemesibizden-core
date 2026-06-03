import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ListingsService {
  private prisma = new PrismaClient();

  async getAllListings() {
    return this.prisma.listing.findMany({
      orderBy: { createdAt: 'desc' },
      include: { owner: { select: { name: true } } }
    });
  }

  // 🔍 SOVEREIGN SEARCH: %0 HATA İLE GERİ GETİRİLDİ
  async searchAssets(params: any) {
    const { city, category, transactionType } = params;
    return this.prisma.listing.findMany({
      where: {
        ...(city && { city: { contains: city, mode: 'insensitive' } }),
        ...(category && { category }),
        ...(transactionType && { transactionType }),
      },
      orderBy: { createdAt: 'desc' },
      include: { owner: { select: { name: true } } }
    });
  }

  // 💎 KUSURSUZ MÜHÜRLEME (TRANSACTIONAL INTEGRITY)
  async createListing(data: any) {
    return this.prisma.$transaction(async (tx) => {
      if (data.transactionType === 'BOTH') {
        const commonData = this.mapData(data);
        // Satılık İlanı
        const sale = await tx.listing.create({ 
          data: { ...commonData, title: data.title, transactionType: 'SALE', price: Number(data.price) } 
        });
        // Kiralık İlanı
        await tx.listing.create({ 
          data: { ...commonData, title: data.rentTitle || data.title, transactionType: 'RENT', price: Number(data.rentPrice) } 
        });
        return sale;
      }

      return tx.listing.create({
        data: { ...this.mapData(data), transactionType: data.transactionType, price: Number(data.price || data.rentPrice) }
      });
    });
  }

  private mapData(data: any) {
    // İşletme Matematiği ve Veri Doğrulama
    return {
      title: data.title,
      category: data.category,
      subCategory: data.subCategory || 'Stratejik Varlık',
      city: data.city,
      district: data.district || '',
      neighborhood: data.neighborhood || '',
      ada: data.ada || '',
      parsel: data.parsel || '',
      roomCount: data.roomCount || '',
      buildingAge: data.buildingAge || '',
      zoningStatus: data.zoningStatus || '',
      area: Math.abs(Number(data.area)) || 0,
      owner: { connect: { id: data.ownerId } }
    };
  }

  async deleteListing(id: string) {
    return this.prisma.listing.delete({ where: { id } });
  }
}
