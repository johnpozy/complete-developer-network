import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { environment } from '../environments/environment';
import { UsersModule } from './users/users.module';
import { SkillsetsModule } from './skillsets/skillsets.module';

@Module({
  imports: [
    UsersModule,
    SkillsetsModule,
    TypeOrmModule.forRoot(environment.typeORM)
  ]
})
export class AppModule {}
