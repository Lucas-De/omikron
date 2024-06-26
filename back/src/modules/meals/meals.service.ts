import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMealDto } from './dto/create-meal.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Meal } from './entities/meal.entity';
import { UsersService } from '../users/users.service';
import { MealProducer } from './meals.producer';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
type UpdatableMealProperties =
  | 'description'
  | 'proteins'
  | 'calories'
  | 'carbs'
  | 'status'
  | 'fats';

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

    const { id } = await this.mealRepository.save({
      date: createMealDto.date,
      description: createMealDto.description,
      user,
    });

    const meal = await this.mealRepository.findOneBy({ id });
    //TODO: dual write issue
    this.mealProducer.sendMeal({ ...meal, image: createMealDto.image });
    return meal;
  }

  async update(
    mealId: number,
    meal: Partial<Pick<Meal, UpdatableMealProperties>>,
  ) {
    await this.findOne(mealId);
    return await this.mealRepository
      .createQueryBuilder()
      .update(Meal)
      .set({ ...meal })
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

  async findOne(id: number) {
    const meal = await this.mealRepository.findOne({ where: { id } });
    if (!meal) throw new NotFoundException(`Meal ${id} not found`);
    return meal;
  }
}
