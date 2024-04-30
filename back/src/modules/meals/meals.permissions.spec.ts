import { Test, TestingModule } from '@nestjs/testing';
import { UserRole } from '../users/entities/user.entity';
import { RequestUser } from '../../common/decorators/user.decorator';
import { Meal, MealStatus } from './entities/meal.entity';
import { MealsPermissions } from './meals.permissions';
import { ForbiddenException } from '@nestjs/common';

const requestUserCommon: RequestUser = {
  id: 1,
  role: UserRole.Common,
  email: 'test@test.com',
};

const requestUserAdmin: RequestUser = {
  id: 2,
  role: UserRole.Admin,
  email: 'admin@test.com',
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

describe('Meals Permissions', () => {
  let mealsPermissions: MealsPermissions;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [MealsPermissions],
    }).compile();

    mealsPermissions = app.get(MealsPermissions);
  });

  test('canCreateMealForUser', () => {
    expect(
      mealsPermissions.canCreateMealForUser(
        requestUserCommon,
        requestUserCommon.id,
      ),
    ).toBeUndefined();

    expect(() =>
      mealsPermissions.canCreateMealForUser(requestUserCommon, 10),
    ).toThrow();

    expect(() =>
      mealsPermissions.canCreateMealForUser(
        requestUserAdmin,
        requestUserCommon.id,
      ),
    ).toThrow(ForbiddenException);
  });

  test('canGetMeal', () => {
    expect(
      mealsPermissions.canGetMeal(requestUserCommon, {
        ...meal,
        userId: requestUserCommon.id,
      }),
    ).toBeUndefined();

    expect(
      mealsPermissions.canGetMeal(requestUserAdmin, {
        ...meal,
        userId: requestUserCommon.id,
      }),
    ).toBeUndefined();

    expect(() =>
      mealsPermissions.canGetMeal(requestUserCommon, {
        ...meal,
        userId: requestUserAdmin.id,
      }),
    ).toThrow();
  });

  test('canGetMealsForUser', () => {
    expect(
      mealsPermissions.canGetMealsForUser(
        requestUserCommon,
        requestUserCommon.id,
      ),
    ).toBeUndefined();

    expect(() =>
      mealsPermissions.canGetMealsForUser(requestUserCommon, 10),
    ).toThrow();

    expect(() =>
      mealsPermissions.canGetMealsForUser(
        requestUserAdmin,
        requestUserCommon.id,
      ),
    ).toBeUndefined();
  });
});
