import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Member } from './member.entity';
import { Group } from './group.entity';

@Entity('users')
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 100,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Member, (member) => member.user)
  member: Member[];

  @OneToMany(() => Group, (group) => group.user)
  group: Group[];
}
