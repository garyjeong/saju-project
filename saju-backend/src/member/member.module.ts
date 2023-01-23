import { MemberManse } from './../entities/member-manse.entity';
import { Module } from '@nestjs/common';
import { MemberService } from './member.service';
import { MemberController } from './member.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { Member } from '../entities/member.entity';
import { Manse } from './../entities/manse.entity';
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([Member, Manse, MemberManse]),
  ],
  controllers: [MemberController],
  providers: [MemberService],
})
export class MemberModule {}
