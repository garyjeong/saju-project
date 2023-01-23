import {
  ConflictException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GroupMember } from 'src/entities/group-member.entity';
import { Member } from 'src/entities/member.entity';
import { Group } from 'src/entities/group.entity';

@Injectable()
export class GroupMemberService {
  constructor(
    @InjectRepository(GroupMember)
    private groupMemberRepository: Repository<GroupMember>,
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
    @InjectRepository(Member)
    private memberRepository: Repository<Member>,
  ) {}

  /**
   * 그룹에 멤버 추가
   * @param userId
   * @param groupId
   * @param memberId
   */
  async create(
    userId: number,
    groupId: number,
    memberId: number,
  ): Promise<void> {
    try {
      const group = await this.groupRepository.findOne({
        userId,
        id: groupId,
      });

      const member = await this.memberRepository.findOne({
        userId,
        id: memberId,
      });
      if (!member || !group) {
        throw new ForbiddenException();
      }

      const groupMember = await this.groupMemberRepository.findOne({
        groupId,
        memberId,
      });

      if (groupMember) {
        throw new ConflictException();
      }

      await this.groupMemberRepository.insert({ groupId, memberId });
    } catch (error) {
      if (error.status === 403) {
        throw new HttpException(
          '해당 그룹에 멤버 추가 권한이 없습니다.',
          HttpStatus.FORBIDDEN,
        );
      } else if (error.status === 409) {
        throw new HttpException(
          '해당 그룹에 같은 멤버가 존재합니다.',
          HttpStatus.CONFLICT,
        );
      } else {
        throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  /**
   * 그룹 멤버 리스트
   * @param userId
   * @param groupId
   * @param query
   * @returns
   */
  async getPagination(page, size) {
    const limit = size ? +size : 10;
    const offset = page ? page * limit : 0;

    return { limit, offset };
  }

  async getPagingData(data, page, limit) {
    const { count: totalItems, rows: memberList } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);

    return { totalItems, totalPages, currentPage, memberList };
  }

  async findAll(
    userId: number,
    groupId: number,
    query: object,
  ): Promise<object> {
    const page = query['page'] !== 'NaN' ? query['page'] : 0;
    const size = query['size'];
    const { limit, offset } = await this.getPagination(page, size);

    try {
      const group = await this.groupRepository.findOne({
        userId,
        id: groupId,
      });

      if (!group) {
        throw new ForbiddenException();
      }

      const groupMember = await this.groupMemberRepository.findAndCount({
        where: { groupId },
        relations: ['member', 'group'],
        take: limit,
        skip: offset,
        order: {
          createdAt: 'DESC',
        },
      });

      const rows = await groupMember[0].map((groupMember) => {
        const birthYear = Number(
          String(groupMember.member.birthday).split('-')[0],
        );
        return {
          id: groupMember.member.id,
          userId: groupMember.member.userId,
          type: groupMember.member.type,
          nickname: groupMember.member.nickname,
          gender: groupMember.member.gender,
          birthdayType: groupMember.member.birthdayType,
          birthday: groupMember.member.birthday,
          time: groupMember.member.time,
          age: new Date().getFullYear() - birthYear + 1,
          createdAt: groupMember.member.createdAt,
        };
      });

      const members = await this.getPagingData(
        { count: groupMember[1], rows },
        page,
        limit,
      );

      return {
        group,
        members,
      };
    } catch (error) {
      if (error.status === 403) {
        throw new HttpException(
          '해당 그룹에 대한 권한이 없습니다.',
          HttpStatus.FORBIDDEN,
        );
      } else {
        throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  /**
   * 그룹에서 멤버 제거
   * @param userId
   * @param groupId
   * @param memberId
   */
  async remove(
    userId: number,
    groupId: number,
    memberId: number,
  ): Promise<void> {
    try {
      const group = await this.groupRepository.findOne({
        userId,
        id: groupId,
      });

      const member = await this.memberRepository.findOne({
        userId,
        id: memberId,
      });

      const groupMember = await this.groupMemberRepository.findOne({
        groupId,
        memberId,
      });
      if (!member || !group || !groupMember) {
        throw new ForbiddenException();
      }

      await this.groupMemberRepository.delete({ memberId, groupId });
    } catch (error) {
      if (error.status === 403) {
        throw new HttpException(
          '해당 그룹에서 멤버 제거 권한이 없습니다.',
          HttpStatus.FORBIDDEN,
        );
      } else {
        throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
}
