import { Controller, Get, Param } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';

@Controller('/users/:userId/analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('/meals')
  getMealStats(@Param('userId') userId: number) {
    return this.analyticsService.getMealStats(userId);
  }
}
