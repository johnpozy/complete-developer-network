import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, Index } from 'typeorm';

import { UserInterface } from '@developer-network/interfaces';

import Skillset from '../skillsets/skillset.entity';

@Entity()
export default class User implements UserInterface {
  @PrimaryGeneratedColumn('uuid')
  public readonly id: string;

  @Column({ length: 128 })
  @Index({ unique: true })
  public username: string;

  @Column({ length: 128 })
  @Index({ unique: true })
  public email: string;

  @Column({ length: 24 })
  public phone: string;

  @Column({ length: 128 })
  public hobby: string;

  @CreateDateColumn()
  public readonly createdAt: Date;

  @UpdateDateColumn()
  public readonly updatedAt: Date;

  @OneToMany(type => Skillset, skillset => skillset.user)
  skillsets: Skillset[];
}
