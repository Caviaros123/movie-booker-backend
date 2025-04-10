import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import axios from 'axios';

@Injectable()
export class KeepAliveService {
  private readonly logger = new Logger(KeepAliveService.name);
  private readonly url = process.env.APP_URL || 'http://localhost:4000';

  @Cron('*/14 * * * *') // Toutes les 14 minutes
  async keepAlive() {
    try {
      const response = await axios.get(`${this.url}/health`);
      this.logger.log(`Site maintenu actif - Status: ${response.status}`);
    } catch (error) {
      this.logger.error('Erreur lors de la requête keep-alive:', error.message);
    }
  }
} 