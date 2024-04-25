import { Module } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { AnalyticsController } from './analytics.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Meal } from '../meals/entities/meal.entity';
import { AnalyticsPermissions } from './analytics.permissions';

@Module({
  imports: [TypeOrmModule.forFeature([Meal])],
  controllers: [AnalyticsController],
  providers: [AnalyticsService, AnalyticsPermissions],
})
export class AnalyticsModule {}
