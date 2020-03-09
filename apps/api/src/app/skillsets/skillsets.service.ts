import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import Skillset from './skillset.entity';

@Injectable()
export class SkillsetsService {
  constructor(
    @InjectRepository(Skillset)
    private readonly skillsetsRepository: Repository<Skillset>
  ) {}
}
