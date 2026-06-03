import { PropertyCategory, TransactionType } from '@prisma/client';

export class CreateListingDto {
  title: string;
  description?: string;
  transactionType: TransactionType;
  category: PropertyCategory;
  subCategory: string;
  city: string;
  district: string;
  neighborhood?: string;
  ada?: string;
  parsel?: string;
  roomCount?: string;
  buildingAge?: string;
  floorLevel?: string;
  heating?: string;
  zoningStatus?: string;
  emsal?: string;
  area: number;
  price: number;
  creditEligible?: boolean;
}
