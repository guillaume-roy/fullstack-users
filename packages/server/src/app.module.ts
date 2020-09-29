import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongoConnectionOptions } from 'typeorm/driver/mongodb/MongoConnectionOptions';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';
import { QueueModule } from './queue/queue.module';

@Module({
  imports: [
    // Initialize environment variables
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // Initialize DB connection
    TypeOrmModule.forRoot({
      type: process.env.DATABASE_TYPE,
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10),
      database: process.env.DATABASE_NAME,
      entities: [User],
      useUnifiedTopology: true,
    } as MongoConnectionOptions),
    UsersModule,
    QueueModule,
  ],
})
export class AppModule { }
