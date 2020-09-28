import { Injectable, NotImplementedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { getMongoRepository, MongoRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { validate, validateOrReject } from 'class-validator';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: MongoRepository<User>
  ) {

  }
  public async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.email = createUserDto.email.toLowerCase();
    user.firstname = createUserDto.firstname;
    user.lastname = createUserDto.lastname;
    user.password = await bcrypt.hash(createUserDto.password, 10);
    return this.userRepository.save(user);
  }

  public findAll(query?: string): Promise<User[]> {
    const queryFilters = query
      ? {
        where: {
          $or: [
            { email: { $regex: query, $options: 'i' } },
            { firstname: { $regex: query, $options: 'i' } },
            { lastname: { $regex: query, $options: 'i' } },
          ],
        },
      }
      : undefined;
    return this.userRepository.find(queryFilters);
  }
}
