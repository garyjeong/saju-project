import { Module } from '@nestjs/common';
import { GroupMemberService } from './group-member.service';
import { GroupMemberController } from './group-member.controller';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupMember } from '../entities/group-member.entity';
import { Member } from '../entities/member.entity';
import { Group } from '../entities/group.entity';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([Group, GroupMember, Member]),
  ],
  controllers: [GroupMemberController],
  providers: [GroupMemberService],
})
export class GroupMemberModule {}
