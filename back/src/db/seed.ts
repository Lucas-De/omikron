import { User, UserRole } from '../modules/users/entities/user.entity';
import { faker } from '@faker-js/faker';
import { dataSourceOptions } from './data-source';
import { DataSource } from 'typeorm';
import { Meal, MealStatus } from '../modules/meals/entities/meal.entity';
import { hashPassword } from '../common/helper/crypto.helper';
const descriptions = [
  'burger and fries',
  'spaghetti carbonara',
  'chicken stir-fry',
  'taco salad',
  'grilled salmon',
  'vegetable curry',
  'shrimp scampi',
  'beef stir-fry',
  'mushroom risotto',
  'chicken parmesan',
  'pad thai',
  'caprese salad',
  'steak and potatoes',
  'vegetable stir-fry',
  'chicken Caesar salad',
  'miso soup',
  'veggie burger',
  'quesadilla',
  'pasta primavera',
  'grilled chicken',
  'beef tacos',
  'cauliflower rice bowl',
  'spinach salad',
  'sushi rolls',
  'chili con carne',
  'roast beef sandwich',
  'shrimp tacos',
  'eggplant parmesan',
  'tomato soup',
  'fish and chips',
];

const passwordHash = hashPassword('password');
faker.seed(123);

function getAdminUser() {
  const user = new User();
  user.email = 'admin@admin.com';
  user.firstName = 'Admin';
  user.lastName = 'Admin';
  user.role = UserRole.Admin;
  user.passwordHash = passwordHash;
  return user;
}

function generateUsers(count): User[] {
  const users = [getAdminUser()];
  for (let i = 0; i < count; i++) {
    const user = new User();
    user.email = faker.internet.email();
    user.firstName = faker.person.firstName();
    user.lastName = faker.person.lastName();
    user.role = UserRole.Common;
    user.passwordHash = passwordHash;
    users.push(user);
  }
  return users;
}

function generateMeals(users): Meal[] {
  const meals = [];
  for (const user of users) {
    for (let i = 0; i < faker.number.int({ min: 30, max: 50 }); i++) {
      const meal = new Meal();
      meal.description = faker.helpers.arrayElement(descriptions);
      meal.calories = faker.number.int({ min: 50, max: 1500 });
      meal.proteins = faker.number.int({ min: 0, max: 80 });
      meal.fats = faker.number.int({ min: 0, max: 80 });
      meal.carbs = faker.number.int({ min: 0, max: 120 });
      meal.date = faker.date.recent({ days: 7 }).toISOString();
      meal.user = user;
      meal.status = MealStatus.Processed;
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
