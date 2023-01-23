import { Member } from '../entities/member.entity';
import {
  ConflictException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { MemberAddRequestDto } from './dto/member.request.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as CommonConvert from '../common/saju/birth-to-saju';
import { MemberManse } from '../entities/member-manse.entity';
import * as moment from 'moment';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member)
    private memberRepository: Repository<Member>,
    @InjectRepository(MemberManse)
    private memberManseRepository: Repository<MemberManse>,
  ) {}

  /**
   * 멤버 추가
   * @param userId
   * @param memberAddRequestDto
   */
  async create(
    userId: number,
    memberAddRequestDto: MemberAddRequestDto,
  ): Promise<void> {
    try {
      memberAddRequestDto['userId'] = userId;
      memberAddRequestDto['type'] = 'MEMBER';
      memberAddRequestDto['birthday'] = String(
        memberAddRequestDto.birthday,
      ).replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3');
      memberAddRequestDto['time'] = memberAddRequestDto.time
        ? await String(memberAddRequestDto.time).replace(
            /(\d{2})(\d{2})/g,
            '$1:$2',
          )
        : null;

      const member = await this.memberRepository.insert(memberAddRequestDto);
      const memberId = member.raw.insertId;

      //만세력 변환
      const memberManse = await CommonConvert.convertBirthtimeToSaju(
        +memberId,
        memberAddRequestDto,
      );

      //멤버 만세력 추가
      await this.memberManseRepository.insert(memberManse);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * 멤버 리스트
   * @param userId
   * @returns
   */
  async getPagination(page: number, size: number) {
    const limit = size ? +size : 10;
    const offset = page ? page * limit : 0;

    return { limit, offset };
  }

  async getPagingData(data, page: number, limit: number) {
    const { count: totalItems, rows: memberList } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);

    return { totalItems, totalPages, currentPage, memberList };
  }

  async findAll(userId: number, query: object): Promise<object> {
    const page = query['page'] !== 'NaN' ? query['page'] : 0;
    const size = query['size'];
    const { limit, offset } = await this.getPagination(page, size);

    try {
      const members = await this.memberRepository.findAndCount({
        where: { userId: userId },
        take: limit,
        skip: offset,
        order: {
          createdAt: 'DESC',
        },
      });

      const rows = members[0].map((member) => {
        const birthYear = Number(String(member.birthday).split('-')[0]);

        return {
          id: member.id,
          userId: member.userId,
          type: member.type,
          nickname: member.nickname,
          gender: member.gender,
          birthdayType: member.birthdayType,
          birthday: member.birthday,
          time: member.time,
          age: new Date().getFullYear() - birthYear + 1,
          createdAt: moment(member.createdAt).format('YYYY-MM-DD HH:mm:ss'),
        };
      });

      const result = await this.getPagingData(
        { count: members[1], rows },
        page,
        limit,
      );
      return result;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * 멤버 삭제
   * @param userId
   * @param id
   */
  async remove(userId: number, id: number) {
    try {
      const member = await this.memberRepository.findOne({
        userId,
        id,
      });

      if (!member) {
        throw new ForbiddenException();
      } else if (member && member.type === 'USER') {
        throw new ConflictException();
      }

      await this.memberRepository.delete({ userId, id });
    } catch (error) {
      if (error.status === 403) {
        throw new HttpException(
          '해당 멤버의 삭제 권한이 없습니다.',
          HttpStatus.FORBIDDEN,
        );
      } else if (error.status === 409) {
        throw new HttpException(
          '본인은 삭제할 수 없습니다.',
          HttpStatus.CONFLICT,
        );
      } else {
        throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
}
