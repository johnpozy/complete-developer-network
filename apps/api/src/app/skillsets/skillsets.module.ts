import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import Skillset from './skillset.entity';
import { SkillsetsController } from './skillsets.controller';
import { SkillsetsService } from './skillsets.service';

@Module({
  imports: [TypeOrmModule.forFeature([Skillset])],
  providers: [SkillsetsService],
  controllers: [SkillsetsController],
})
export class SkillsetsModule {}
