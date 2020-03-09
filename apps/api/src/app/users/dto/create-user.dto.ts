import { ApiProperty, getSchemaPath, ApiExtraModels } from '@nestjs/swagger';

import { UserModel } from '@developer-network/models';

import Skillset from '../../skillsets/skillset.entity';
import { CreateSkillsetDto } from '../../skillsets/dto/create-skillset.dto';

export class CreateUserDto extends UserModel {
  @ApiProperty()
  public username: string;

  @ApiProperty()
  public email: string;

  @ApiProperty()
  public phone: string;

  @ApiProperty()
  public hobby: string;

  @ApiProperty({
    type: [CreateSkillsetDto]
  })
  public skillsets: Array<Skillset>;
}
