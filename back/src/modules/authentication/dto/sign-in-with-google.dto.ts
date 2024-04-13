import { IsString } from 'class-validator';

export class SignInWithGoogleDto {
  @IsString()
  credential: string;
}
