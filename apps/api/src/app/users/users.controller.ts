import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiCreatedResponse, ApiBadRequestResponse, ApiInternalServerErrorResponse } from '@nestjs/swagger';

import User from './user.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiTags('User')
  @ApiOkResponse({ description: ' OK success.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error.' })
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':userId')
  @ApiTags('User')
  @ApiOkResponse({ description: ' OK success.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error.' })
  findOne(@Param('userId') userId: string): Promise<User> {
    return this.usersService.findOne(userId);
  }

  @Post()
  @ApiTags('User')
  @ApiCreatedResponse({ description: 'User has been successfully created.' })
  @ApiBadRequestResponse({ description: 'Bad request.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error.' })
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Put(':userId')
  @ApiTags('User')
  @ApiOkResponse({ description: ' OK success.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error.' })
  async update(@Param('userId') userId: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(userId, updateUserDto);
  }

  @Delete(':userId')
  @ApiTags('User')
  @ApiOkResponse({ description: ' OK success.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error.' })
  async delete(@Param('userId') userId: string) {
    return this.usersService.delete(userId);
  }
}
