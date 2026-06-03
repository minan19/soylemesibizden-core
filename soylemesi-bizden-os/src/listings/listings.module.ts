import { Module } from '@nestjs/common';
import { ListingsService } from './listings.service';
import { ListingsController } from './listings.controller';

@Module({
  providers: [ListingsService],
  controllers: [ListingsController],
  exports: [ListingsService], // Dışarıya veri sağlamak için açıyoruz
})
export class ListingsModule {}
