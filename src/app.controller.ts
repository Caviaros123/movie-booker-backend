import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/guards/jwt.auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Get hello route' })
  @ApiResponse({ status: 200, description: 'Hello route' })
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/protected')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get protected route' })
  @ApiResponse({ status: 200, description: 'Protected route' })
  protected(@Req() req) {
    return {
      message: 'AuthGuard works 🎉',
      authenticated_user: req.user,
    };
  }

  @Get('/htlz')
  @ApiOperation({ summary: 'Get health route' })
  @ApiResponse({ status: 200, description: 'Health route' })
  health() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  }
}
