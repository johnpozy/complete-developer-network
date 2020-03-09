import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';

import User from './user.entity';
import Skillset from '../skillsets/skillset.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly connection: Connection
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.find({
      relations: ['skillsets']
    });
  }

  async findOne(userId: string): Promise<User> {
    return this.usersRepository.findOne(userId, {
      relations: ['skillsets']
    });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    const skillsets: Skillset[] = [];

    await this.connection.transaction(async manager => {
      for (let index = 0; index < createUserDto.skillsets.length; index++) {
        const skillset = new Skillset();
        skillset.name = createUserDto.skillsets[index].name;
        skillsets.push(skillset);

        await manager.save(skillset);
      }

      user.username = createUserDto.username;
      user.email = createUserDto.email;
      user.hobby = createUserDto.hobby;
      user.phone = createUserDto.phone;
      user.skillsets = skillsets;

      await manager.save(user);
    });

    return user;
  }

  async update(userId: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(userId);
    const skillsets: Skillset[] = [];

    await this.connection.transaction(async manager => {
      for (let index = 0; index < user.skillsets.length; index++) {
        await manager.remove(user.skillsets[index]);
      }

      for (let index = 0; index < updateUserDto.skillsets.length; index++) {
        const skillset = new Skillset();
        skillset.name = updateUserDto.skillsets[index].name;
        skillsets.push(skillset);

        await manager.save(skillset);
      }

      user.username = updateUserDto.username;
      user.email = updateUserDto.email;
      user.hobby = updateUserDto.hobby;
      user.phone = updateUserDto.phone;
      user.skillsets = skillsets;

      await manager.save(user);
    });

    return user;
  }

  async delete(userId: string): Promise<User> {
    const user = await this.findOne(userId);

    await this.connection.transaction(async manager => {
      for (let index = 0; index < user.skillsets.length; index++) {
        await manager.remove(user.skillsets[index]);
      }

      await manager.remove(user);
    });

    return user;
  }
}
