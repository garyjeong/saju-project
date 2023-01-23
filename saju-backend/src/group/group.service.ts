import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from '../entities/group.entity';
import { Repository } from 'typeorm';
import { GroupRequestDto } from './dto/group.request.dto';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
  ) {}

  /**
   * 그룹 추가
   * @param userId
   * @param groupDto
   */
  async create(userId: number, groupDto: GroupRequestDto): Promise<void> {
    try {
      groupDto['userId'] = userId;
      await this.groupRepository.insert(groupDto);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * 그룹 리스트
   * @param userId
   * @returns
   */
  async getPagination(page, size) {
    const limit = size ? +size : 10;
    const offset = page ? page * limit : 0;

    return { limit, offset };
  }

  async getPagingData(data, page, limit) {
    const { count: totalItems, rows: groupList } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);

    return { totalItems, totalPages, currentPage, groupList };
  }

  async findAll(userId: number, query: object): Promise<object> {
    const page = query['page'] !== 'NaN' ? query['page'] : 0;
    const size = query['size'];
    const { limit, offset } = await this.getPagination(page, size);

    try {
      const groups = await this.groupRepository.findAndCount({
        where: { userId: userId },
        relations: ['groupMember'],
        take: limit,
        skip: offset,
        order: {
          createdAt: 'DESC',
        },
      });

      const rows = await groups[0].map((group) => {
        return {
          id: group.id,
          userId: group.userId,
          name: group.name,
          memberCount: group.groupMember.length,
          createdAt: group.createdAt,
        };
      });

      const result = await this.getPagingData(
        { count: groups[1], rows },
        page,
        limit,
      );
      return result;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * 그룹 수정
   * @param userId
   * @param id
   * @param groupDto
   */
  async update(
    userId: number,
    id: number,
    groupRequestDto: GroupRequestDto,
  ): Promise<void> {
    try {
      const group = await this.groupRepository.findOne({
        userId,
        id,
      });
      if (!group) {
        throw new ForbiddenException();
      }
      await this.groupRepository.update(id, groupRequestDto);
    } catch (error) {
      if (error.status === 403) {
        throw new HttpException(
          '해당 그룹의 수정 권한이 없습니다.',
          HttpStatus.FORBIDDEN,
        );
      } else {
        throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  /**
   * 그룹 삭제
   * @param userId
   * @param id
   */
  async remove(userId: number, id: number): Promise<void> {
    try {
      const userGroup = await this.groupRepository.findOne({
        userId,
        id,
      });
      if (!userGroup) {
        throw new ForbiddenException();
      }
      await this.groupRepository.delete({ userId, id });
    } catch (error) {
      if (error.status === 403) {
        throw new HttpException(
          '해당 그룹의 삭제 권한이 없습니다.',
          HttpStatus.FORBIDDEN,
        );
      } else {
        throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  /**
   * 그룹명 리스트
   */
  async findGroupNames(userId: number): Promise<object> {
    try {
      const group = await this.groupRepository.find({
        where: { userId: userId },
        select: ['id', 'name'],
        order: {
          createdAt: 'DESC',
        },
      });

      return group;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
