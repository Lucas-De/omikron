import {
  IsAlphanumeric,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SignUpDto {
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  @MaxLength(20)
  password: string;

  @MinLength(2)
  @MaxLength(100)
  @IsAlphanumeric()
  name: string;
}
