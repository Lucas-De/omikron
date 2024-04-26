import {
  HttpException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { Equal, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { OAuth2Client } from 'google-auth-library';
import { SignInWithGoogleDto } from './dto/sign-in-with-google.dto';
import {
  hashPassword,
  verifyPassword,
} from '../../common/helper/crypto.helper';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @Inject('GOOGLE_AUTH')
    private oAuth2Client: OAuth2Client,
  ) {}

  async signUpUser(
    firstName: string,
    lastName: string,
    email: string,
    password?: string,
  ) {
    const existingUser = await this.findUserByEmail(email);

    if (existingUser) {
      throw new HttpException(`User "${email}" already exists`, 409);
    }

    const user = await this.usersRepository.save({
      firstName,
      lastName,
      email: email,
      passwordHash: password ? hashPassword(password) : null,
    });

    return this.generateToken(user.id, user.role, user.email);
  }

  async getSignInInfo(email: string, password: string) {
    const user = await this.findUserByEmail(email);
    if (!user) throw new NotFoundException(`User ${email} not found`);

    const isPasswordCorrect = verifyPassword(password, user.passwordHash);
    if (!isPasswordCorrect) throw new UnauthorizedException();
    return this.generateToken(user.id, user.role, user.email);
  }

  async generateToken(id, role, email) {
    const token = sign({ id, role, email }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    return { id, email, role, token };
  }

  async findUserByEmail(email: string) {
    return await this.usersRepository.findOne({
      select: ['id', 'passwordHash', 'role', 'email'],
      where: { email: Equal(email) },
    });
  }

  async signInWithGoolge(signWithGoogleInDto: SignInWithGoogleDto) {
    const loginTicket = await this.oAuth2Client.verifyIdToken({
      idToken: signWithGoogleInDto.credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { given_name, family_name, email } = loginTicket.getPayload();

    const user = await this.findUserByEmail(email);

    return user
      ? this.generateToken(user.id, user.role, user.email)
      : await this.signUpUser(given_name, family_name, email);
  }
}
