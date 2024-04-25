import { Controller, Get, Post, Body, Query, Param } from '@nestjs/common';
import { MealsService } from './meals.service';
import { CreateMealDto } from './dto/create-meal.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthUser, RequestUser } from '../../common/decorators/user.decorator';
import { MealsPermissions } from './meals.permissions';

@ApiTags('Meals')
@Controller('users/:userId/meals')
export class MealsController {
  constructor(
    private readonly mealsService: MealsService,
    private readonly mealPermissons: MealsPermissions,
  ) {}

  @Post()
  create(
    @AuthUser() requestUser: RequestUser,
    @Param('userId') userId: number,
    @Body() createMealDto: CreateMealDto,
  ) {
    this.mealPermissons.canCreateMealForUser(requestUser, userId);
    return this.mealsService.create(userId, createMealDto);
  }

  @Get('/:mealId')
  async findOne(
    @AuthUser() requestUser: RequestUser,
    @Param('mealId') mealId: number,
  ) {
    const meal = await this.mealsService.findOne(mealId);
    this.mealPermissons.canGetMeal(requestUser, meal);
    return meal;
  }

  @Get()
  findAll(
    @Param('userId') userId: number,
    @Query() paginationQuery: PaginationQueryDto,
  ) {
    return this.mealsService.findAll(userId, paginationQuery);
  }
}
