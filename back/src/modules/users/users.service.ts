import { Injectable, NotFoundException } from '@nestjs/common';

import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(paginationQuery: PaginationQueryDto) {
    return await this.usersRepository.find({
      select: ['id', 'email'],
      order: { id: 'ASC' },
      take: paginationQuery.limit,
      skip: paginationQuery.offset,
    });
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOne({
      select: ['id', 'email'],
      where: { id },
    });
    if (!user) throw new NotFoundException(`User ${id} not found`);
    return user;
  }
}
