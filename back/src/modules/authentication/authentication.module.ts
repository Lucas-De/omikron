import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { APP_GUARD } from '@nestjs/core';
import { AuthenticationGuard } from './authentication.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { OAuth2Client } from 'google-auth-library';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    AuthenticationService,
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
    {
      provide: 'GOOGLE_AUTH',
      useValue: new OAuth2Client(),
    },
  ],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
