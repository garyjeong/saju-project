import {
  Controller,
  Post,
  Body,
  UseGuards,
  ValidationPipe,
  Query,
  Get,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GroupService } from './group.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../entities/user.entity';
import { Token } from 'src/commons/auth/token.decorator';
import { GroupRequestDto } from './dto/group.request.dto';
import {
  GroupAddResponseDto,
  GroupListResponseDto,
  GroupUpdateResponseDto,
  GroupDeleteResponseDto,
  GroupNameListResponseDto,
} from './dto/group.response.dto';
import { PagenationDto } from 'src/commons/dto/pagenation.dto';
import {
  TooManyRequestExceptionDto,
  InternalServerErrorExceptionDto,
  BadRequestExceptionDto,
  UnauthorizedExceptionDto,
  ForbiddenExceptionDto,
} from 'src/commons/dto/exception.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
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

@ApiTags('그룹')
@ApiBearerAuth()
@ApiSecurity('access-token')
@ApiUnauthorizedResponse({
  description: '인증 실패',
  type: UnauthorizedExceptionDto,
})
@ApiTooManyRequestsResponse({
  description: 'Too many request',
  type: TooManyRequestExceptionDto,
})
@ApiInternalServerErrorResponse({
  description: '서버 에러',
  type: InternalServerErrorExceptionDto,
})
@Controller('groups')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  /**
   * 그룹 추가
   * @param GroupRequestDto
   * @returns GroupAddResponseDto
   */
  @ApiOperation({ summary: '그룹 추가' })
  @ApiCreatedResponse({
    description: '그룹 추가 성공',
    type: GroupAddResponseDto,
  })
  @ApiBadRequestResponse({
    description: '유효성 검사 실패',
    type: BadRequestExceptionDto,
  })
  @Post()
  @UseGuards(AuthGuard())
  async create(
    @Token() user: User,
    @Body(ValidationPipe) groupRequestDto: GroupRequestDto,
  ): Promise<GroupAddResponseDto> {
    await this.groupService.create(+user.id, groupRequestDto);
    return {
      statusCode: 201,
      message: '그룹 추가 성공',
    };
  }

  /**
   * 그룹 리스트
   * @returns GroupListResponseDto
   */
  @ApiOperation({ summary: '그룹 리스트' })
  @ApiQuery({
    type: PagenationDto,
  })
  @ApiOkResponse({
    description: '그룹 리스트 성공',
    type: GroupListResponseDto,
  })
  @Get()
  @UseGuards(AuthGuard())
  async findAll(
    @Token() user: User,
    @Query() query,
  ): Promise<GroupListResponseDto> {
    const groups = await this.groupService.findAll(+user.id, query);
    return {
      statusCode: 200,
      message: '그룹 리스트 성공',
      data: groups,
    };
  }

  /**
   * 그룹 수정
   * @param GroupRequestDto
   * @returns GroupUpdateResponseDto
   */
  @ApiOperation({ summary: '그룹 수정' })
  @ApiOkResponse({
    description: '그룹 수정 성공',
    type: GroupUpdateResponseDto,
  })
  @ApiBadRequestResponse({
    description: '유효성 검사 실패',
    type: BadRequestExceptionDto,
  })
  @ApiForbiddenResponse({
    description: '접근 권한 실패',
    type: ForbiddenExceptionDto,
  })
  @Patch(':id')
  @UseGuards(AuthGuard())
  async update(
    @Token() user: User,
    @Param('id') id: string,
    @Body(ValidationPipe) groupRequestDto: GroupRequestDto,
  ): Promise<GroupUpdateResponseDto> {
    await this.groupService.update(+user.id, +id, groupRequestDto);
    return {
      statusCode: 200,
      message: '그룹 수정 성공',
    };
  }

  /**
   * 그룹 삭제
   * @returns GroupDeleteResponseDto
   */
  @ApiOperation({ summary: '그룹 삭제' })
  @ApiOkResponse({
    description: '그룹 삭제 성공',
    type: GroupDeleteResponseDto,
  })
  @ApiForbiddenResponse({
    description: '접근 권한 실패',
    type: ForbiddenExceptionDto,
  })
  @Delete(':id')
  @UseGuards(AuthGuard())
  async remove(
    @Token() user: User,
    @Param('id') id: string,
  ): Promise<GroupDeleteResponseDto> {
    await this.groupService.remove(+user.id, +id);
    return {
      statusCode: 200,
      message: '그룹 삭제 성공',
    };
  }

  /**
   * 그룹명 리스트
   * @returns GroupNameListResponseDto
   */
  @ApiOperation({ summary: '그룹명 리스트' })
  @ApiOkResponse({
    description: '그룹명 리스트 성공',
    type: GroupNameListResponseDto,
  })
  @Get('names')
  @UseGuards(AuthGuard())
  async findGroupNames(@Token() user: User): Promise<GroupNameListResponseDto> {
    const group = await this.groupService.findGroupNames(+user.id);
    return {
      statusCode: 200,
      message: '그룹명 리스트 성공',
      data: group,
    };
  }
}
