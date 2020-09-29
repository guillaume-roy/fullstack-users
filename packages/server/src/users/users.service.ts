import { Inject, Injectable, Logger, LoggerService } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { MongoRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { QueueService } from '../queue/queue.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: MongoRepository<User>,
    @Inject(Logger) private readonly logger: LoggerService,
    private readonly queueService: QueueService,
  ) { }

  public async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.email = createUserDto.email.toLowerCase();
    user.firstname = createUserDto.firstname;
    user.lastname = createUserDto.lastname;
    user.password = await bcrypt.hash(createUserDto.password, 10);
    this.queueService.send('USER_CREATION', { user });
    const userResult = await this.userRepository.save(user);
    this.logger.debug(`Creation of user ${userResult.id.toString()}`);
    return userResult
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
