import { Controller, Get, Param, Query } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { AnalyticsFilterQuery } from './dto/analytics-filter-query.dto';
import { AuthUser, RequestUser } from '../../common/decorators/user.decorator';
import { AnalyticsPermissions } from './analytics.permissions';

@Controller('/users/:userId/analytics')
export class AnalyticsController {
  constructor(
    private readonly analyticsService: AnalyticsService,
    private readonly analyticsPermissions: AnalyticsPermissions,
  ) {}

  @Get('/meals')
  getMealStats(
    @AuthUser() requestUser: RequestUser,
    @Param('userId') userId: number,
    @Query() query: AnalyticsFilterQuery,
  ) {
    this.analyticsPermissions.canGetAnalyticsForUser(requestUser, userId);
    return this.analyticsService.getMealStats(userId, query.lookBackDays);
  }
}
