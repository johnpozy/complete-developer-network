import { SkillsetModel } from './skillset.model';

export class UserModel {
  public readonly id: string;

  public username: string;

  public email: string;

  public phone: string;

  public hobby: string;

  public readonly createdAt: Date;

  public readonly updatedAt: Date;

  public skillsets: Array<SkillsetModel>;
}
