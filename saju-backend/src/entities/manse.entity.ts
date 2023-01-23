import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('manses')
export class Manse extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  solarDate: Date;

  @Column({ type: 'date' })
  lunarDate: Date;

  @Column({
    type: 'varchar',
    length: 10,
    nullable: true,
  })
  season: string; //절기

  @Column({ nullable: true })
  seasonStartTime: Date; //절입일

  @Column()
  leapMonth: boolean; //윤달

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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
