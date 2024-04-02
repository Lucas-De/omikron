import { Inject, Injectable } from '@nestjs/common';
import { CreateMealDto } from './dto/create-meal.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Meal } from './entities/meal.entity';
import { UsersService } from '../users/users.service';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { MealProducer } from './meals.producer';
import { UpdateMealDto } from './dto/update-meal.dto';

@Injectable()
export class MealsService {
  constructor(
    @InjectRepository(Meal)
    private mealRepository: Repository<Meal>,
    @Inject('MEAL_PRODUCER')
    private mealProducer: MealProducer,
    private userService: UsersService,
  ) {}

  async create(userId: number, createMealDto: CreateMealDto) {
    const user = await this.userService.findOne(userId);
    const { id } = await this.mealRepository.save({ ...createMealDto, user });
    const meal = await this.mealRepository.findOneBy({ id });
    this.mealProducer.sendMeal(meal); //TODO: revert transaction if cannot publish message
    return meal;
  }

  async update(mealId: number, updateMealDto: UpdateMealDto) {
    await this.mealRepository
      .createQueryBuilder()
      .update(Meal)
      .set({ ...updateMealDto })
      .where('id = :mealId', { mealId })
      .execute();
  }

  async findAll(userId: number, paginationQuery: PaginationQueryDto) {
    const user = await this.userService.findOne(userId);
    return this.mealRepository.find({
      where: { user },
      order: { date: 'DESC' },
      take: paginationQuery.limit,
      skip: paginationQuery.offset,
    });
  }
}
