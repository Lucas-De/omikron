import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

const mockUserList = [{ id: 1, email: 'test@test.com' }];
const mockUserRepositoryFactory = () => ({
  find: jest.fn(() => mockUserList),
  findOne: jest.fn(() => mockUserList[0]),
});

describe('User Service', () => {
  let usersService: UsersService;
  let usersRepository: any;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useFactory: mockUserRepositoryFactory,
        },
      ],
    }).compile();

    usersService = app.get(UsersService);
    usersRepository = app.get(getRepositoryToken(User));
  });

  it('findAll', () => {
    expect(usersService.findAll({})).resolves.toEqual(mockUserList);
  });

  it('findOne', () => {
    expect(usersService.findOne(1)).resolves.toEqual(mockUserList[0]);
  });

  it('findOne 404', () => {
    usersRepository.findOne.mockReturnValueOnce(undefined);
    expect(usersService.findOne(1)).rejects.toThrow(NotFoundException);
  });
});
