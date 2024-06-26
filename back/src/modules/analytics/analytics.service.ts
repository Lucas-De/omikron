import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Meal } from '../meals/entities/meal.entity';

export interface DateNutrientCount {
  calories: number;
  proteins: number;
  fats: number;
  carbs: number;
  date: string;
}

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(Meal)
    private mealsRepository: Repository<Meal>,
  ) {}

  async getMealStats(
    userId: number,
    lookBackDays: number,
  ): Promise<DateNutrientCount[]> {
    const rawCounts = await this.mealsRepository
      .createQueryBuilder('meal')
      .select([
        'sum(meal.calories) as calories',
        'sum(meal.proteins) as proteins',
        'sum(meal.fats) as fats',
        'sum(meal.carbs) as carbs',
        "to_char(meal.date,'YYYY-MM-DD')as date",
      ])
      .where('meal.userId = :userId', { userId })
      .andWhere(`meal.date > current_date - ${lookBackDays}`)
      .groupBy("to_char(meal.date,'YYYY-MM-DD')")
      .getRawMany();

    return rawCounts.map((row) => ({
      calories: parseInt(row.calories),
      proteins: parseInt(row.proteins),
      fats: parseInt(row.fats),
      carbs: parseInt(row.carbs),
      date: row.date,
    }));
  }
}
