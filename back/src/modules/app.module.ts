import { Module } from '@nestjs/common';
import { HealthCheckModule } from './health-check/health-check.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { dataSourceOptions } from 'src/db/db.config';
import { MealsModule } from './meals/meals.module';
import { AuthenticationModule } from './authentication/authentication.module';

@Module({
  imports: [
    AuthenticationModule,
    TypeOrmModule.forRoot(dataSourceOptions),
    HealthCheckModule,
    UsersModule,
    MealsModule,
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
