import { ForbiddenException, Injectable } from '@nestjs/common';
import { Meal } from './entities/meal.entity';
import { RequestUser } from '../../common/decorators/user.decorator';
import { UserRole } from '../users/entities/user.entity';

@Injectable()
export class MealsPermissions {
  canGetMeal(user: RequestUser, meal: Meal) {
    const belongsToSelf = meal.userId === user.id;
    const isAdmin = user.role === UserRole.Admin;
    if (!belongsToSelf && !isAdmin) throw new ForbiddenException();
  }

  canCreateMealForUser(user: RequestUser, accessedUserId: number) {
    const isSelf = user.id === accessedUserId;
    if (!isSelf) throw new ForbiddenException();
  }

  canGetMealsForUser(user: RequestUser, accessedUserId: number) {
    const isSelf = user.id === accessedUserId;
    const isAdmin = user.role === UserRole.Admin;
    if (!isSelf && !isAdmin) throw new ForbiddenException();
  }
}
