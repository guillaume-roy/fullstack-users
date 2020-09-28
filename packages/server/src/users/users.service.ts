import { Injectable, NotImplementedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  public create(createUserDto: CreateUserDto): Promise<User> {
    throw new NotImplementedException();
  }

  public findAll(query?: string): Promise<User[]> {
    throw new NotImplementedException();
  }
}
