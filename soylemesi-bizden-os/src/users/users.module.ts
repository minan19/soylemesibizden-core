import { Module } from '@nestjs/common';
import { UsersService } from './users.service';

@Module({
  providers: [UsersService],
  exports: [UsersService], // CRITICAL: Auth modülünün kullanabilmesi için dışa aktarıyoruz
})
export class UsersModule {}
