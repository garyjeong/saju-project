import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from '../entities/member.entity';
import { Repository } from 'typeorm';
import * as CommonFormat from '../common/saju/format';

@Injectable()
export class ManseService {
  constructor(
    @InjectRepository(Member)
    private memberRepository: Repository<Member>,
  ) {}
  /**
   * 만세력 리스트
   * @param userId
   * @returns
   */
  async findOne(
    userId: number,
    memberId: number,
    bigNum: number,
    smallNum: number,
  ) {
    try {
      const member = await this.memberRepository.findOne({
        where: { userId: userId, id: memberId },
        relations: ['memberManse'],
        order: {
          createdAt: 'DESC',
        },
      });

      if (!member) {
        throw new ForbiddenException();
      }

      const memberFormat = member;
      const manseFormat = member.memberManse;
      delete memberFormat.memberManse;

      return await CommonFormat.convertMemberToManse(
        memberFormat,
        manseFormat,
        bigNum,
        smallNum,
      );
    } catch (error) {
      if (error.status === 403) {
        throw new HttpException(
          '해당 멤버의 만세력 계산 권한이 없습니다.',
          HttpStatus.FORBIDDEN,
        );
      } else {
        throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
}
