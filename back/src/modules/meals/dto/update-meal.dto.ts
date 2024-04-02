import { IsInt, IsPositive } from 'class-validator';

export class UpdateMealDto {
  @IsPositive()
  @IsInt()
  calories: number;

  @IsPositive()
  @IsInt()
  proteins: number;

  @IsPositive()
  @IsInt()
  carbs: number;

  @IsPositive()
  @IsInt()
  fats: number;
}
