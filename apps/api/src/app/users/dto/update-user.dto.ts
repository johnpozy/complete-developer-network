import { ApiProperty } from '@nestjs/swagger';

import { UserModel } from '@developer-network/models';

import Skillset from '../../skillsets/skillset.entity';
import { UpdateSkillsetDto } from '../../skillsets/dto/update-skillset.dto';

export class UpdateUserDto extends UserModel {
  @ApiProperty()
  public username: string;

  @ApiProperty()
  public email: string;

  @ApiProperty()
  public phone: string;

  @ApiProperty()
  public hobby: string;

  @ApiProperty({
    type: [UpdateSkillsetDto]
  })
  public skillsets: Array<Skillset>;
}
