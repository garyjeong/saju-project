import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Group } from './group.entity';
import { Member } from './member.entity';

@Entity('group_members')
export class GroupMember extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  groupId: number;

  @Column()
  memberId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Group, (group) => group.groupMember, {
    onDelete: 'CASCADE',
  })
  group: Group;

  @ManyToOne(() => Member, (member) => member.groupMember, {
    onDelete: 'CASCADE',
  })
  member: Member;
}
