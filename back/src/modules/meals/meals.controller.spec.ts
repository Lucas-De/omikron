import { Test, TestingModule } from '@nestjs/testing';
import { MealsService } from './meals.service';
import { DeepMocked, createMock } from '@golevelup/ts-jest';
import { CreateMealDto } from './dto/create-meal.dto';
import { MealsController } from './meals.controller';
import { UserRole } from '../users/entities/user.entity';
import { RequestUser } from '../../common/decorators/user.decorator';
import { Meal, MealStatus } from './entities/meal.entity';
import { MealsPermissions } from './meals.permissions';

const createMealDto: CreateMealDto = {
  description: '4 boiled eggs',
  date: new Date().toISOString(),
};

const requestUser: RequestUser = {
  id: 1,
  role: UserRole.Common,
  email: 'test@test.com',
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

describe('Meals Controller', () => {
  let mealsService: DeepMocked<MealsService>;
  let mealsController: MealsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [MealsController],
      providers: [
        {
          provide: MealsService,
          useValue: createMock(),
        },
        {
          provide: MealsPermissions,
          useValue: createMock(),
        },
      ],
    }).compile();

    mealsService = app.get(MealsService);
    mealsController = app.get(MealsController);
  });

  test('create', () => {
    mealsService.create.mockResolvedValue(meal);
    expect(
      mealsController.create(requestUser, 1, createMealDto),
    ).resolves.toEqual(meal);
  });

  test('findOne', () => {
    mealsService.findOne.mockResolvedValue(meal);
    expect(mealsController.findOne(requestUser, 1)).resolves.toEqual(meal);
  });

  test('findAll', () => {
    mealsService.findAll.mockResolvedValue([meal]);
    expect(mealsController.findAll(requestUser, 1, {})).resolves.toEqual([
      meal,
    ]);
  });
});
