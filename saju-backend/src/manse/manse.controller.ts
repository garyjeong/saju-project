import { Controller, Get, UseGuards, Param } from '@nestjs/common';
import { ManseService } from './manse.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../entities/user.entity';
import { Token } from 'src/commons/auth/token.decorator';
import { ManseResponseDto } from './dto/manse.response.dto';
import {
  ForbiddenExceptionDto,
  InternalServerErrorExceptionDto,
  TooManyRequestExceptionDto,
  UnauthorizedExceptionDto,
} from 'src/commons/dto/exception.dto';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiSecurity,
  ApiTags,
  ApiTooManyRequestsResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('만세력')
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
@Controller('manse')
export class ManseController {
  constructor(private readonly manseService: ManseService) {}

  /**
   * 만세력 가져오기
   * @param id
   * @param bigNum
   * @param smallNum
   * @returns ManseResponseDto
   */
  @ApiOperation({ summary: '만세력 가져오기' })
  @ApiOkResponse({
    description: '만세력 가져오기 성공',
    type: ManseResponseDto,
  })
  @ApiForbiddenResponse({
    description: '접근 권한 에러',
    type: ForbiddenExceptionDto,
  })
  @Get('/members/:id/fortune/:bigNum?/:smallNum?')
  @UseGuards(AuthGuard())
  async findOne(
    @Token() user: User,
    @Param('id') memberId: string,
    @Param('bigNum') bigNum?: string,
    @Param('smallNum') smallNum?: string,
  ): Promise<ManseResponseDto> {
    const manse = await this.manseService.findOne(
      +user.id,
      +memberId,
      +bigNum,
      +smallNum,
    );

    return {
      statusCode: 200,
      message: '만세력 가져오기 성공',
      data: manse,
    };
  }
}
