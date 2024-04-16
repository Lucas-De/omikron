import { Controller, Get, Post, Body, Query, Param } from '@nestjs/common';
import { MealsService } from './meals.service';
import { CreateMealDto } from './dto/create-meal.dto';
import { ApiTags } from '@nestjs/swagger';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';

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

  @Get('/:mealId')
  findOne(@Param('mealId') mealId: number) {
    return this.mealsService.findOne(mealId);
  }

  @Get()
  findAll(
    @Param('userId') userId: number,
    @Query() paginationQuery: PaginationQueryDto,
  ) {
    return this.mealsService.findAll(userId, paginationQuery);
  }
}
