import {
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { hashPassword, verifyPassword } from 'src/common/helper/crypto.helper';
import { sign } from 'jsonwebtoken';
import { Equal, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from '../users/entities/user.entity';
import { SignUpDto } from './dto/sign-up.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async signUpUser(signUpDto: SignUpDto) {
    const existingUser = await this.findUserByName(signUpDto.name);

    if (existingUser) {
      throw new HttpException(`User "${signUpDto.name}" already exists`, 409);
    }

    const savedUser = await this.usersRepository.save({
      name: signUpDto.name,
      role: UserRole.Common,
      passwordHash: hashPassword(signUpDto.password),
    });

    return await this.getSignInInfo(savedUser.name, signUpDto.password);
  }

  async getSignInInfo(name: string, password: string) {
    const user = await this.findUserByName(name);
    if (!user) throw new NotFoundException(`User "${name}" not found`);

    const isPasswordCorrect = verifyPassword(password, user.passwordHash);
    if (!isPasswordCorrect) throw new UnauthorizedException();

    const token = sign(
      { sub: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '30d' },
    );

    return {
      id: user.id,
      name: user.name,
      role: user.role,
      token,
    };
  }

  async findUserByName(name: string) {
    return await this.usersRepository.findOne({
      select: ['id', 'passwordHash', 'role', 'name'],
      where: { name: Equal(name) },
    });
  }
}
