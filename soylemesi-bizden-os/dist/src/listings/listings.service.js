"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListingsService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
let ListingsService = class ListingsService {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    async getAllListings() {
        return this.prisma.listing.findMany({
            orderBy: { createdAt: 'desc' },
            include: { owner: { select: { name: true } } }
        });
    }
    async searchAssets(params) {
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
    async createListing(data) {
        return this.prisma.$transaction(async (tx) => {
            if (data.transactionType === 'BOTH') {
                const commonData = this.mapData(data);
                const sale = await tx.listing.create({
                    data: { ...commonData, title: data.title, transactionType: 'SALE', price: Number(data.price) }
                });
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
    mapData(data) {
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
    async deleteListing(id) {
        return this.prisma.listing.delete({ where: { id } });
    }
};
exports.ListingsService = ListingsService;
exports.ListingsService = ListingsService = __decorate([
    (0, common_1.Injectable)()
], ListingsService);
//# sourceMappingURL=listings.service.js.map