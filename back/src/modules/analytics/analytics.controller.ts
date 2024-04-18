import { Controller, Get, Param, Query } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { AnalyticsFilterQuery } from './dto/analytics-filter-query.dto';

@Controller('/users/:userId/analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('/meals')
  getMealStats(
    @Param('userId') userId: number,
    @Query() query: AnalyticsFilterQuery,
  ) {
    return this.analyticsService.getMealStats(userId, query.lookBackDays);
  }
}
