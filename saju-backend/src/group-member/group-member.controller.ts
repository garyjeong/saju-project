import {
  Controller,
  Post,
  Param,
  UseGuards,
  Get,
  Query,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Token } from 'src/commons/auth/token.decorator';
import { User } from '../entities/user.entity';
import { GroupMemberService } from './group-member.service';
import {
  GroupMemberAddResponseDto,
  GroupMemberDeleteResponseDto,
  GroupMemberListResponseDto,
} from './dto/group-member.response.dto';
import { PagenationDto } from 'src/commons/dto/pagenation.dto';
import {
  ConfilctIdExceptionDto,
  ForbiddenExceptionDto,
  InternalServerErrorExceptionDto,
  TooManyRequestExceptionDto,
  UnauthorizedExceptionDto,
} from 'src/commons/dto/exception.dto';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiSecurity,
  ApiTags,
  ApiTooManyRequestsResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('그룹 멤버')
@ApiBearerAuth()
@ApiSecurity('access-token')
@ApiUnauthorizedResponse({
  description: '인증 실패',
  type: UnauthorizedExceptionDto,
})
@ApiForbiddenResponse({
  description: '접근 권한 에러',
  type: ForbiddenExceptionDto,
})
@ApiTooManyRequestsResponse({
  description: 'Too many request 에러',
  type: TooManyRequestExceptionDto,
})
@ApiInternalServerErrorResponse({
  description: '서버 에러',
  type: InternalServerErrorExceptionDto,
})
@Controller('groups')
export class GroupMemberController {
  constructor(private readonly groupMemberService: GroupMemberService) {}

  /**
   * 그룹에 멤버 추가
   * @param groupId
   * @param memberId
   * @returns GroupMemberAddResponseDto
   */
  @ApiOperation({ summary: '그룹에 멤버 추가' })
  @ApiCreatedResponse({
    description: '그룹에 멤버 추가 성공',
    type: GroupMemberAddResponseDto,
  })
  @ApiConflictResponse({
    description: '아이디 중복',
    type: ConfilctIdExceptionDto,
  })
  @Post(':groupId/members/:memberId')
  @UseGuards(AuthGuard())
  async create(
    @Token() user: User,
    @Param('groupId') groupId: string,
    @Param('memberId') memberId: string,
  ): Promise<GroupMemberAddResponseDto> {
    await this.groupMemberService.create(+user.id, +groupId, +memberId);
    return {
      statusCode: 201,
      message: '그룹에 멤버 추가 성공',
    };
  }

  /**
   * 그룹별 멤버 리스트
   * @param groupId
   * @returns GroupMemberListResponseDto
   */
  @ApiOperation({ summary: '그룹별 멤버 리스트' })
  @ApiQuery({
    type: PagenationDto,
  })
  @ApiOkResponse({
    description: '그룹별 멤버 리스트 성공',
    type: GroupMemberListResponseDto,
  })
  @Get(':groupId/members')
  @UseGuards(AuthGuard())
  async findAll(
    @Token() user: User,
    @Param('groupId') groupId: string,
    @Query() query,
  ): Promise<GroupMemberListResponseDto> {
    const groupMembers = await this.groupMemberService.findAll(
      +user.id,
      +groupId,
      query,
    );
    return {
      statusCode: 200,
      message: '그룹별 멤버 리스트 성공',
      data: groupMembers,
    };
  }

  /**
   * 그룹에서 멤버 제거
   * @param groupId
   * @param memberId
   * @returns GroupMemberDeleteResponseDto
   */
  @ApiOperation({ summary: '그룹에서 멤버 제거' })
  @ApiOkResponse({
    description: '그룹에서 멤버 제거 성공',
    type: GroupMemberDeleteResponseDto,
  })
  @Delete(':groupId/members/:memberId')
  @UseGuards(AuthGuard())
  async remove(
    @Token() user: User,
    @Param('groupId') groupId: string,
    @Param('memberId') memberId: string,
  ): Promise<GroupMemberDeleteResponseDto> {
    await this.groupMemberService.remove(+user.id, +groupId, +memberId);
    return {
      statusCode: 200,
      message: '그룹에서 멤버 제거 성공',
    };
  }
}
