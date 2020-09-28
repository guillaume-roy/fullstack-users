import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import * as bcrypt from 'bcryptjs';

describe('UsersService', () => {
  let service: UsersService;
  let repository: MongoRepository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: MongoRepository,
        }],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<MongoRepository<User>>('UserRepository');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const mockResult = new User();
      mockResult.email = 'test@test.com';
      mockResult.firstname = 'John';
      mockResult.lastname = 'Doe';
      mockResult.password = await bcrypt.hash('Test123456!', 10);
      jest.spyOn(repository, 'save').mockImplementation(() => Promise.resolve(mockResult));

      const dto = new CreateUserDto();
      dto.email = 'test@test.com';
      dto.firstname = 'John';
      dto.lastname = 'Doe';
      dto.password = 'Test123456!';
      const result = await service.create(dto);
      expect(result.email).toBe('test@test.com');
      expect(result.firstname).toBe('John');
      expect(result.lastname).toBe('Doe');
      expect(await bcrypt.compare('Test123456!', result.password)).toBe(true);
    });
  });

  describe('findAll', () => {
    it('should find all users', async () => {
      const mockResult = new User();
      mockResult.email = 'test@test.com';
      mockResult.firstname = 'John';
      mockResult.lastname = 'Doe';
      mockResult.password = await bcrypt.hash('Test123456!', 10);
      const mockResult2 = new User();
      mockResult2.email = 'test2@test.com';
      mockResult2.firstname = 'Jack';
      mockResult2.lastname = 'Smith';
      mockResult2.password = await bcrypt.hash('Test123456!', 10);
      jest.spyOn(repository, 'find').mockImplementation(() => Promise.resolve([mockResult, mockResult2]));

      const result = await service.findAll();

      expect(result).toHaveLength(2);

      expect(result[0].email).toBe('test@test.com');
      expect(result[0].firstname).toBe('John');
      expect(result[0].lastname).toBe('Doe');
      expect(await bcrypt.compare('Test123456!', result[0].password)).toBe(true);

      expect(result[1].email).toBe('test2@test.com');
      expect(result[1].firstname).toBe('Jack');
      expect(result[1].lastname).toBe('Smith');
      expect(await bcrypt.compare('Test123456!', result[1].password)).toBe(true);
    });

    it('should find user on firstname', async () => {
      const mockResult = new User();
      mockResult.email = 'test@test.com';
      mockResult.firstname = 'John';
      mockResult.lastname = 'Doe';
      mockResult.password = await bcrypt.hash('Test123456!', 10);
      jest.spyOn(repository, 'find').mockImplementation(() => Promise.resolve([mockResult]));

      const result = await service.findAll('John');

      expect(result).toHaveLength(1);

      expect(result[0].firstname).toBe('John');
    });

    it('should find user on lastname', async () => {
      const mockResult = new User();
      mockResult.email = 'test@test.com';
      mockResult.firstname = 'John';
      mockResult.lastname = 'Doe';
      mockResult.password = await bcrypt.hash('Test123456!', 10);
      jest.spyOn(repository, 'find').mockImplementation(() => Promise.resolve([mockResult]));

      const result = await service.findAll('Doe');

      expect(result).toHaveLength(1);

      expect(result[0].lastname).toBe('Doe');
    });

    it('should find user on email', async () => {
      const mockResult = new User();
      mockResult.email = 'test@test.com';
      mockResult.firstname = 'John';
      mockResult.lastname = 'Doe';
      mockResult.password = await bcrypt.hash('Test123456!', 10);
      jest.spyOn(repository, 'find').mockImplementation(() => Promise.resolve([mockResult]));

      const result = await service.findAll('test@test.com');

      expect(result).toHaveLength(1);

      expect(result[0].email).toBe('test@test.com');
    });
  });
});
