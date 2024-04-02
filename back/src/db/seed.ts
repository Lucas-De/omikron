import { User, UserRole } from 'src/modules/users/entities/user.entity';
import { faker } from '@faker-js/faker';
import { hashPassword } from 'src/common/helper/crypto.helper';
import { Meal } from 'src/modules/meals/entities/meal.entity';
import { dataSourceOptions } from './data-source';
import { DataSource } from 'typeorm';

const passwordHash = hashPassword('password');

function generateUsers(count): User[] {
  const users = [];
  for (let i = 0; i < count; i++) {
    const user = new User();
    user.name = faker.person.firstName() + faker.person.lastName();
    user.role = faker.helpers.enumValue(UserRole);
    user.passwordHash = passwordHash;
    users.push(user);
  }
  return users;
}

function generateMeals(users): Meal[] {
  const meals = [];
  for (const user of users) {
    for (let i = 0; i < faker.number.int(8); i++) {
      const meal = new Meal();
      meal.description = faker.lorem
        .sentence({ min: 10, max: 30 })
        .slice(0, 400);
      meal.calories = faker.number.int({ min: 50, max: 1500 });
      meal.proteins = faker.number.int({ min: 0, max: 80 });
      meal.fats = faker.number.int({ min: 0, max: 80 });
      meal.carbs = faker.number.int({ min: 0, max: 120 });
      meal.date = faker.date.recent({ days: 12 }).toISOString();
      meal.user = user;
      meals.push(meal);
    }
  }
  return meals;
}

async function seed() {
  const users = generateUsers(10);
  const myDataSource = new DataSource(dataSourceOptions);
  await myDataSource.initialize();
  await myDataSource.createQueryBuilder().delete().from(User).execute();
  await myDataSource.manager.save(users);
  await myDataSource.manager.save(generateMeals(users));
}

seed();
