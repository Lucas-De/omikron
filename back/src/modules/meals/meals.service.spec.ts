import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Meal, MealStatus } from './entities/meal.entity';
import { MealsService } from './meals.service';
import { UsersService } from '../users/users.service';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { DeepMocked, createMock } from '@golevelup/ts-jest';
import { User } from '../users/entities/user.entity';
import { CreateMealDto } from './dto/create-meal.dto';
import { MealProducer } from './meals.producer';

const createMealDto: CreateMealDto = {
  description: '4 boiled eggs',
  date: new Date().toISOString(),
};

const meal: Meal = {
  id: 1,
  description: '4 boiled eggs',
  date: new Date().toISOString(),
  proteins: null,
  carbs: null,
  fats: null,
  calories: null,
  status: MealStatus.Pending,
  userId: 1,
};

describe('Meal Service', () => {
  let mealsService: MealsService;
  let mealsRepository: DeepMocked<Repository<Meal>>;
  let usersService: DeepMocked<UsersService>;
  let mealProducer: DeepMocked<MealProducer>;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        MealsService,
        {
          provide: UsersService,
          useValue: createMock(),
        },
        {
          provide: getRepositoryToken(Meal),
          useValue: createMock(),
        },
        {
          provide: 'MEAL_PRODUCER',
          useValue: createMock(),
        },
      ],
    }).compile();

    mealsService = app.get(MealsService);
    mealsRepository = app.get(getRepositoryToken(Meal));
    usersService = app.get(UsersService);
    mealProducer = app.get('MEAL_PRODUCER');
  });

  it('findOne', () => {
    mealsRepository.findOne.mockResolvedValue(meal);
    expect(mealsService.findOne(1)).resolves.toEqual(meal);
  });

  it('findOne 404', () => {
    mealsRepository.findOne.mockResolvedValue(undefined);
    expect(mealsService.findOne(1)).rejects.toThrow(NotFoundException);
  });

  it('findAll', () => {
    usersService.findOne.mockResolvedValue({ id: 1 } as User);
    mealsRepository.find.mockResolvedValue([meal]);
    expect(mealsService.findAll(1, {})).resolves.toEqual([meal]);
  });

  it('findAll 404', () => {
    usersService.findOne.mockRejectedValue(new NotFoundException());
    expect(mealsService.findAll(1, {})).rejects.toThrow(NotFoundException);
  });

  it('create', () => {
    mealProducer.sendMeal.mockResolvedValue();
    usersService.findOne.mockResolvedValue({ id: 1 } as User);
    mealsRepository.findOneBy.mockResolvedValue(meal);
    expect(mealsService.create(1, createMealDto)).resolves.toEqual(meal);
  });

  it('create 404', () => {
    mealProducer.sendMeal.mockResolvedValue();
    usersService.findOne.mockRejectedValue(new NotFoundException());
    expect(mealsService.create(1, createMealDto)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('udpate', () => {
    jest.spyOn(mealsService, 'findOne').mockResolvedValue(meal);
    expect(mealsService.update(1, { proteins: 1 })).resolves.toHaveProperty(
      'proteins',
      1,
    );
  });

  it('udpate 404', () => {
    jest
      .spyOn(mealsService, 'findOne')
      .mockRejectedValue(new NotFoundException());
    expect(mealsService.update(1, meal)).rejects.toThrow(NotFoundException);
  });
});
