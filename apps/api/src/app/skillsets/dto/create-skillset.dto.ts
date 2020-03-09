import { ApiProperty } from '@nestjs/swagger';

import { SkillsetModel } from '@developer-network/models';

export class CreateSkillsetDto extends SkillsetModel {
  @ApiProperty()
  public name: string;
}
