import { IsDateString, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateMealDto {
  @IsString()
  @MaxLength(400)
  @MinLength(2)
  description: string;

  @IsDateString()
  date: string;
}
