import { Controller, Get, Post, Body, Query, Param } from '@nestjs/common';
import { MealsService } from './meals.service';
import { CreateMealDto } from './dto/create-meal.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Meals')
@Controller('users/:userId/meals')
export class MealsController {
  constructor(private readonly mealsService: MealsService) {}

  @Post()
  create(
    @Param('userId') userId: number,
    @Body() createMealDto: CreateMealDto,
  ) {
    return this.mealsService.create(userId, createMealDto);
  }

  @Get()
  findAll(
    @Param('userId') userId: number,
    @Query() paginationQuery: PaginationQueryDto,
  ) {
    return this.mealsService.findAll(userId, paginationQuery);
  }
}
