import { Module } from '@nestjs/common';
import { MealsService } from './meals.service';
import { MealsController } from './meals.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Meal } from './entities/meal.entity';
import { UsersModule } from '../users/users.module';
import { mealProducerFactory } from './meals.producer';
import { analyzedMealConsumerFactory } from './meals.consumer';

@Module({
  controllers: [MealsController],
  providers: [
    MealsService,
    {
      provide: 'MEAL_PRODUCER',
      useFactory: mealProducerFactory,
    },
    {
      provide: 'ANALYZED_MEAL_CONSUMER',
      useFactory: analyzedMealConsumerFactory,
      inject: [MealsService],
    },
  ],
  imports: [UsersModule, TypeOrmModule.forFeature([Meal])],
})
export class MealsModule {}
