import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { GroupMember } from './group-member.entity';
import { User } from './user.entity';

@Entity('groups')
export class Group extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column({
    type: 'varchar',
    length: 30,
  })
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.group, {
    onDelete: 'CASCADE',
  })
  user: User;

  @OneToMany(() => GroupMember, (groupMember) => groupMember.group)
  groupMember: GroupMember[];
}
