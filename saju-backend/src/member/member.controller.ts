import {
  Controller,
  Post,
  Body,
  UseGuards,
  ValidationPipe,
  Get,
  Query,
  Delete,
  Param,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../entities/user.entity';
import { Token } from 'src/commons/auth/token.decorator';
import { MemberService } from './member.service';
import { MemberAddRequestDto } from './dto/member.request.dto';
import {
  MemberAddResponseDto,
  MemberListResponseDto,
  MemberDeleteResponseDto,
} from './dto/member.response.dto';
import { PagenationDto } from '../commons/dto/pagenation.dto';
import {
  BadRequestExceptionDto,
  InternalServerErrorExceptionDto,
  TooManyRequestExceptionDto,
  ForbiddenExceptionDto,
  UnauthorizedExceptionDto,
} from 'src/commons/dto/exception.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiSecurity,
  ApiTags,
  ApiTooManyRequestsResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('멤버')
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
@Controller('members')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  /**
   * 멤버 추가
   * @param MemberAddRequestDto
   * @returns MemberAddResponseDto
   */
  @ApiOperation({ summary: '멤버 추가' })
  @ApiResponse({
    status: 201,
    description: '멤버 추가 성공',
    type: MemberAddResponseDto,
  })
  @ApiBadRequestResponse({
    description: '유효성 검사 실패',
    type: BadRequestExceptionDto,
  })
  @Post()
  @UseGuards(AuthGuard())
  async create(
    @Token() user: User,
    @Body(ValidationPipe) memberAddRequestDto: MemberAddRequestDto,
  ): Promise<MemberAddResponseDto> {
    await this.memberService.create(+user.id, memberAddRequestDto);
    return {
      statusCode: 201,
      message: '멤버 추가 성공',
    };
  }

  /**
   * 멤버 리스트
   * @returns MemberListResponseDto
   */
  @ApiOperation({ summary: '멤버 리스트' })
  @ApiQuery({
    type: PagenationDto,
  })
  @ApiOkResponse({
    description: '멤버 리스트 성공',
    type: MemberListResponseDto,
  })
  @Get()
  @UseGuards(AuthGuard())
  async findAll(
    @Token() user: User,
    @Query() query,
  ): Promise<MemberListResponseDto> {
    const members = await this.memberService.findAll(+user.id, query);
    return {
      statusCode: 200,
      message: '멤버 리스트 성공',
      data: members,
    };
  }

  /**
   * 멤버 삭제
   * @returns MemberDeleteResponseDto
   */
  @ApiOperation({ summary: '멤버 삭제' })
  @ApiOkResponse({
    description: '멤버 삭제 성공',
    type: MemberDeleteResponseDto,
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
  ): Promise<MemberDeleteResponseDto> {
    await this.memberService.remove(+user.id, +id);
    return {
      statusCode: 200,
      message: '멤버 삭제 성공',
    };
  }
}
