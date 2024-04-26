import { Controller, Get, Param, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { IsAdmin } from '../../common/decorators/is-admin.decorator';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  @IsAdmin()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.usersService.findAll(paginationQuery);
  }

  @Get(':id')
  @IsAdmin()
  findOne(@Param('id') id: number) {
    return this.usersService.findOne(+id);
  }
}
