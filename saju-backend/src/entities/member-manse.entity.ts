import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Member } from './member.entity';
@Entity('member_manse')
export class MemberManse extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  memberId: number;

  @Column()
  bigFortuneNumber: number;

  @Column()
  bigFortuneStartYear: number;

  @Column({ nullable: true })
  seasonStartTime: Date;

  @Column({
    type: 'varchar',
    length: 10,
  })
  yearSky: string;

  @Column({
    type: 'varchar',
    length: 10,
  })
  yearGround: string;

  @Column({
    type: 'varchar',
    length: 10,
  })
  monthSky: string;

  @Column({
    type: 'varchar',
    length: 10,
  })
  monthGround: string;

  @Column({
    type: 'varchar',
    length: 10,
  })
  daySky: string;

  @Column({
    type: 'varchar',
    length: 10,
  })
  dayGround: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  timeSky: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  timeGround: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Member, (member) => member.memberManse, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'memberId' })
  member: Member;
}
