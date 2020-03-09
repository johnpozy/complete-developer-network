import { Controller} from '@nestjs/common';

import { SkillsetsService } from './skillsets.service';

@Controller('skillsets')
export class SkillsetsController {
  constructor(private readonly skillsetsService: SkillsetsService) {}
}
