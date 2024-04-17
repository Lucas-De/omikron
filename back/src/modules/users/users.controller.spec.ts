import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

const mockUserList = [{ id: 1, email: 'test@test.com' }];
const mockUsersService = {
  findAll: () => mockUserList,
  findOne: () => mockUserList[0],
};

describe('AppController', () => {
  let usersController: UsersController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    usersController = app.get(UsersController);
  });

  it('findAll', () => {
    expect(usersController.findAll({})).toEqual(mockUserList);
  });

  it('findOne', () => {
    expect(usersController.findOne(1)).toEqual(mockUserList[0]);
  });
});
