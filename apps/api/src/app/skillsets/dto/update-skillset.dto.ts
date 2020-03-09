import { ApiProperty } from '@nestjs/swagger';

import { SkillsetModel } from '@developer-network/models';

export class UpdateSkillsetDto extends SkillsetModel {
  @ApiProperty()
  public name: string;
}
