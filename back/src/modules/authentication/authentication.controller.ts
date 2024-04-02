import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { Public } from './authentication.guard';
import { AuthenticationService } from './authentication.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @Post('/sign-in')
  @Public()
  @HttpCode(HttpStatus.OK)
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.getSignInInfo(signInDto.name, signInDto.password);
  }

  @Post('/sign-up')
  @Public()
  @HttpCode(HttpStatus.OK)
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUpUser(signUpDto);
  }
}