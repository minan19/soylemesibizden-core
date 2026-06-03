import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class IntelligenceService {
  private readonly logger = new Logger(IntelligenceService.name);

  getMarketIndex(): number {
    return 48500;
  }
}
