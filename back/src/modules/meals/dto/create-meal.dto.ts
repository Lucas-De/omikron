import {
  IsDateString,
  IsString,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator';

export class CreateMealDto {
  @ValidateIf((o) => o.image === undefined)
  @IsString()
  @MaxLength(400)
  @MinLength(2)
  description?: string;

  @ValidateIf((o) => o.description === undefined)
  @IsString()
  image?: string;

  @IsDateString()
  date: string;
}
