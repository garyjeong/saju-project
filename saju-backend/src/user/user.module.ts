import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Member } from '../entities/member.entity';
import { JwtStrategy } from '../common/auth/jwt.strategy';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import * as dotenv from 'dotenv';
import { MemberManse } from '../entities/member-manse.entity';
dotenv.config();

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    TypeOrmModule.forFeature([User, Member, MemberManse]),
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
})
export class UserModule {}
