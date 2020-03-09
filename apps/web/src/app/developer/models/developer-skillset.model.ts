import { SkillsetInterface } from '@developer-network/interfaces';

export class DeveloperSkillset implements SkillsetInterface {
  public readonly id: string;

  public name: string;

  public readonly createdAt: Date;

  public readonly updatedAt: Date;

  constructor(skillset: SkillsetInterface) {
    this.id = skillset.id;
    this.name = skillset.name;
    this.createdAt = skillset.createdAt;
    this.updatedAt = skillset.updatedAt;
  }
}
