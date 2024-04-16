import { Module } from '@nestjs/common';
import { HealthCheckModule } from './health-check/health-check.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { MealsModule } from './meals/meals.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { typeOrmModuleOptions } from '../db/data-source';

@Module({
  imports: [
    AuthenticationModule,
    TypeOrmModule.forRoot(typeOrmModuleOptions),
    HealthCheckModule,
    UsersModule,
    MealsModule,
    AnalyticsModule,
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
