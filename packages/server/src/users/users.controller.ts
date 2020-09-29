import { Controller, Get, Post, Body, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { FranceRequestGuard } from '../guards/france-request.guard';
import { ApiCreatedResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @UseGuards(FranceRequestGuard)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiCreatedResponse({ type: User })
  @ApiQuery({
    name: 'query',
    required: false,
    type: 'string',
  })
  findAll(@Query('query') query?: string) {
    return this.usersService.findAll(query);
  }
}
