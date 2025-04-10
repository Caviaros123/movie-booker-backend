import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Santé')
@Controller('health')
export class HealthController {
  @Get()
  @ApiOperation({ summary: 'Vérifier la santé de l\'application' })
  @ApiResponse({ status: 200, description: 'Application en ligne' })
  check() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  }
} 