import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Token } from '../common/auth/token.decorator';
import { UserService } from './user.service';
import { User } from '../entities/user.entity';
import { SigninRequestDto, SignupRequestDto } from './dto/user.request.dto';
import {
  MeResponseDto,
  SigninResponseDto,
  SignupResponseDto,
} from './dto/user.response.dto';
import {
  BadRequestExceptionDto,
  ConfilctEmailExceptionDto,
  InternalServerErrorExceptionDto,
  TooManyRequestExceptionDto,
  UnauthorizedExceptionDto,
} from '../common/dto/exception.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiSecurity,
  ApiTags,
  ApiTooManyRequestsResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('회원')
@ApiTooManyRequestsResponse({
  description: 'Too many request',
  type: TooManyRequestExceptionDto,
})
@ApiInternalServerErrorResponse({
  description: '서버 에러',
  type: InternalServerErrorExceptionDto,
})
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  /**
   * 회원가입
   * @param SignupRequestDto
   * @returns SignupResponseDto
   */
  @ApiOperation({ summary: '회원가입' })
  @ApiCreatedResponse({
    description: '회원가입 성공',
    type: SignupResponseDto,
  })
  @ApiBadRequestResponse({
    description: '유효성 검사 실패',
    type: BadRequestExceptionDto,
  })
  @ApiConflictResponse({
    description: '이메일 중복',
    type: ConfilctEmailExceptionDto,
  })
  @Post('/signup')
  async signUp(
    @Body(ValidationPipe) signupRequestDto: SignupRequestDto,
  ): Promise<SignupResponseDto> {
    const accessToken = await this.userService.signUp(signupRequestDto);
    return {
      statusCode: 201,
      message: '회원가입 성공',
      data: accessToken,
    };
  }

  /**
   * 로그인
   * @param SigninRequestDto
   * @returns SigninResponseDto
   */
  @ApiOperation({ summary: '로그인' })
  @ApiOkResponse({
    description: '로그인 성공',
    type: SigninResponseDto,
  })
  @ApiBadRequestResponse({
    description: '유효성 검사 실패',
    type: BadRequestExceptionDto,
  })
  @ApiUnauthorizedResponse({
    description: '인증 실패',
    type: UnauthorizedExceptionDto,
  })
  @HttpCode(200)
  @Post('/signin')
  async signIn(
    @Body(ValidationPipe) signinRequestDto: SigninRequestDto,
  ): Promise<SigninResponseDto> {
    const accessToken = await this.userService.signIn(signinRequestDto);
    return {
      statusCode: 200,
      message: '로그인 성공',
      data: accessToken,
    };
  }

  /**
   * 내 정보보기
   * @param User
   * @returns MeResponseDto
   */
  @ApiOperation({ summary: '내 정보보기' })
  @ApiBearerAuth()
  @ApiSecurity('access-token')
  @ApiOkResponse({
    description: '내 정보보기 성공',
    type: MeResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: '인증 실패',
    type: UnauthorizedExceptionDto,
  })
  @Get('/me')
  @UseGuards(AuthGuard())
  async me(@Token() user: User): Promise<MeResponseDto> {
    const member = await this.userService.me(user);
    return {
      statusCode: 200,
      message: '내 정보보기 성공',
      data: member,
    };
  }
}
