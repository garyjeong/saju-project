import { ApiProperty } from '@nestjs/swagger';

export class BadRequestExceptionDto {
  @ApiProperty({
    example: 400,
    description: '상태코드',
  })
  readonly statusCode: number;

  @ApiProperty({
    example: [
      'nickname must be longer than or equal to 2 characters',
      'nickname should not be empty',
    ],
    description: '메시지',
  })
  readonly message: [];
}

export class UnauthorizedExceptionDto {
  @ApiProperty({
    example: 401,
    description: '상태코드',
  })
  readonly statusCode: number;

  @ApiProperty({
    example: 'Unauthrozied',
    description: '메시지',
  })
  readonly message: string;
}

export class ForbiddenExceptionDto {
  @ApiProperty({
    example: 403,
    description: '상태코드',
  })
  readonly statusCode: number;

  @ApiProperty({
    example: '접근 권한이 없습니다.',
    description: '메시지',
  })
  readonly message: string;
}

export class ConfilctEmailExceptionDto {
  @ApiProperty({
    example: 409,
    description: '상태코드',
  })
  readonly statusCode: number;

  @ApiProperty({
    example: '이메일 중복',
    description: '메시지',
  })
  readonly message: string;
}

export class ConfilctIdExceptionDto {
  @ApiProperty({
    example: 409,
    description: '상태코드',
  })
  readonly statusCode: number;

  @ApiProperty({
    example: '이미 존재하는 그룹, 멤버 id 입니다',
    description: '메시지',
  })
  readonly message: string;
}

export class TooManyRequestExceptionDto {
  @ApiProperty({
    example: 429,
    description: '상태코드',
  })
  readonly statusCode: number;

  @ApiProperty({
    example: 'Too Many Request',
    description: '메시지',
  })
  readonly message: string;
}

export class InternalServerErrorExceptionDto {
  @ApiProperty({
    example: 500,
    description: '상태코드',
  })
  readonly statusCode: number;

  @ApiProperty({
    example: '서버 에러',
    description: '메시지',
  })
  readonly message: string;
}
