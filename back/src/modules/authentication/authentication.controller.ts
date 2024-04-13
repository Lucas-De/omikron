import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { Public } from './authentication.guard';
import { AuthenticationService } from './authentication.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInWithGoogleDto } from './dto/sign-in-with-google.dto';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @Post('/sign-in/password')
  @Public()
  @HttpCode(HttpStatus.OK)
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.getSignInInfo(signInDto.email, signInDto.password);
  }

  @Post('/sign-up/password')
  @Public()
  @HttpCode(HttpStatus.OK)
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUpUser(
      signUpDto.firstName,
      signUpDto.lastName,
      signUpDto.email,
      signUpDto.password,
    );
  }

  @Post('/sign-in/google')
  @Public()
  @HttpCode(HttpStatus.OK)
  async signInWithGoolge(@Body() signWithGoogleInDto: SignInWithGoogleDto) {
    return this.authService.signInWithGoolge(signWithGoogleInDto);
  }
}
