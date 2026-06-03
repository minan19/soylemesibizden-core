import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { PrismaModule } from './prisma/prisma.module';
import { ListingsModule } from './listings/listings.module';
import { DiscoveryModule } from './discovery/discovery.module';
import { IntelligenceModule } from './intelligence/intelligence.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    // BÜTÜN SİSTEMİN GÜVENLİ KONFİGÜRASYON MERKEZİ (Global .env okuyucu)
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    PrismaModule,
    ListingsModule,
    DiscoveryModule,
    IntelligenceModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
