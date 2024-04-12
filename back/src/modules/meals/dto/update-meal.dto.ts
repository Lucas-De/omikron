import { IsEnum, IsInt, IsPositive } from 'class-validator';
import { MealStatus } from '../entities/meal.entity';

export class UpdateMealDto {
  @IsPositive()
  @IsInt()
  calories?: number;

  @IsPositive()
  @IsInt()
  proteins?: number;

  @IsPositive()
  @IsInt()
  carbs?: number;

  @IsPositive()
  @IsInt()
  fats?: number;

  @IsEnum(MealStatus)
  status?: MealStatus;
}
