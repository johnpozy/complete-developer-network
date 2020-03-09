import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';

import { SkillsetInterface } from '@developer-network/interfaces';

import User from '../users/user.entity';

@Entity()
export default class Skillset implements SkillsetInterface {
  @PrimaryGeneratedColumn('uuid')
  public readonly id: string;

  @Column({ length: 128 })
  public name: string;

  @CreateDateColumn()
  public readonly createdAt: Date;

  @UpdateDateColumn()
  public readonly updatedAt: Date;

  @ManyToOne(type => User, user => user.skillsets)
  user: User;
}
