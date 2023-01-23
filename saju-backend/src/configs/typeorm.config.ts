import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { GroupMember } from '../entities/group-member.entity';
import { Group } from '../entities/group.entity';
import { Manse } from '../entities/manse.entity';
import { MemberManse } from '../entities/member-manse.entity';
import { Member } from '../entities/member.entity';
import { User } from '../entities/user.entity';
import * as dotenv from 'dotenv';
dotenv.config();
const entityArr = [User, Member, MemberManse, Manse, Group, GroupMember];

export let typeORMConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: 3307,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: entityArr,
  autoLoadEntities: true,
  synchronize: true,
  logging: false,
  keepConnectionAlive: true,
  timezone: '+09:00',
};

