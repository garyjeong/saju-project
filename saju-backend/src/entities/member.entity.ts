import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { GroupMember } from './group-member.entity';
import { MemberManse } from './member-manse.entity';
import { User } from './user.entity';

@Entity('members')
export class Member extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column({
    type: 'varchar',
    length: 6,
  })
  type: string;

  @Column({
    type: 'varchar',
    length: 30,
  })
  nickname: string;

  @Column({
    type: 'varchar',
    length: 6,
  })
  gender: string;

  @Column({
    type: 'varchar',
    length: 5,
  })
  birthdayType: string;

  @Column({ type: 'date' })
  birthday: Date;

  @Column({ nullable: true, type: 'varchar', length: 10 })
  time: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.member, {
    onDelete: 'CASCADE',
  })
  user: User;

  @OneToMany(() => GroupMember, (groupMember) => groupMember.member)
  groupMember: GroupMember[];

  @OneToOne(() => MemberManse, (memberManse) => memberManse.member)
  memberManse: MemberManse;
}
