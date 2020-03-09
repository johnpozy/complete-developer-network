import { UserInterface, SkillsetInterface } from '@developer-network/interfaces';
import { DeveloperSkillset } from './developer-skillset.model';

export class Developer implements UserInterface {
  public readonly id: string;

  public username: string;

  public email: string;

  public phone: string;

  public hobby: string;

  public skillsets: Array<SkillsetInterface>;

  public readonly createdAt: Date;

  public readonly updatedAt: Date;

  constructor(developer: UserInterface) {
    this.id = developer.id;
    this.username = developer.username;
    this.email = developer.email;
    this.phone = developer.phone;
    this.hobby = developer.hobby;
    this.skillsets = developer.skillsets.map(skillset => new DeveloperSkillset(skillset));
    this.createdAt = developer.createdAt;
    this.updatedAt = developer.updatedAt;
  }
}
