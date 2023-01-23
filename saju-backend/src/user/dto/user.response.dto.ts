import { ApiProperty } from '@nestjs/swagger';
import { FortuneDto, SajuDto } from '../../common/dto/saju.dto';
import { MemberDto } from '../../common/dto/member.dto';

export class AccessTokenDto {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imtvb0B0ZXN0LmNvbSIsImlhdCI6MTY1Mzc5MDU0MCwiZXhwIjoxNjU3MzkwNTQwfQ.3dS05AsGerUO15zdYnV6sXszbjt8j3GyzS5OLVD9WKE',
    description: 'Access Token',
  })
  readonly accessToken: string;
}

export class SignupResponseDto {
  @ApiProperty({
    example: 201,
    description: '상태코드',
  })
  readonly statusCode: number;

  @ApiProperty({
    example: '회원가입 성공',
    description: '메시지',
  })
  readonly message: string;

  @ApiProperty({
    type: AccessTokenDto,
  })
  readonly data: object;
}

export class SigninResponseDto {
  @ApiProperty({
    example: 200,
    description: '상태코드',
  })
  readonly statusCode: number;

  @ApiProperty({
    example: '로그인 성공',
    description: '메시지',
  })
  readonly message: string;

  @ApiProperty({
    type: AccessTokenDto,
  })
  readonly data: object;
}

export class MeDto {
  @ApiProperty({
    type: MemberDto,
  })
  readonly member: object;

  @ApiProperty({
    type: SajuDto,
  })
  readonly saju: object;

  @ApiProperty({
    type: FortuneDto,
  })
  readonly fortune: object;
}

export class MeResponseDto {
  @ApiProperty({
    example: 200,
    description: '상태코드',
  })
  readonly statusCode: number;

  @ApiProperty({
    example: '내정보보기 성공',
    description: '메시지',
  })
  readonly message: string;

  @ApiProperty({
    type: MeDto,
  })
  readonly data: object;
}
