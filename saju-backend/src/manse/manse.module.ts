import { Module } from '@nestjs/common';
import { ManseService } from './manse.service';
import { ManseController } from './manse.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { Member } from 'src/entities/member.entity';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([Member]),
  ],
  controllers: [ManseController],
  providers: [ManseService],
})
export class ManseModule {}
