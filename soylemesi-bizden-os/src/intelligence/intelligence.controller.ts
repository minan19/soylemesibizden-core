import { Controller, Get } from '@nestjs/common';
@Controller('intelligence')
export class IntelligenceController {
  @Get('status')
  getStatus() { return { status: 'Reel Mod Aktif' }; }
}
