import { ApiProperty } from '@nestjs/swagger';

export class GroupDto {
  @ApiProperty({
    example: 5,
    description: '그룹 id',
  })
  readonly id: number;

  @ApiProperty({
    example: 3,
    description: '회원 id',
  })
  readonly userId: number;

  @ApiProperty({
    example: 'test1',
    description: '그룹 명',
  })
  readonly name: string;

  @ApiProperty({
    example: 3,
    description: '그룹 멤버 수',
  })
  readonly memberCount: number;

  @ApiProperty({
    example: '2022-06-19T01:37:14.000Z',
    description: '그룹 생성 시간',
  })
  readonly createdAt: string;
}

export class GroupAddResponseDto {
  @ApiProperty({
    example: 201,
    description: '상태코드',
  })
  readonly statusCode: number;

  @ApiProperty({
    example: '그룹 추가 성공',
    description: '메시지',
  })
  readonly message: string;
}

export class GroupUpdateResponseDto {
  @ApiProperty({
    example: 200,
    description: '상태코드',
  })
  readonly statusCode: number;

  @ApiProperty({
    example: '그룹 수정 성공',
    description: '메시지',
  })
  readonly message: string;
}

export class GroupDeleteResponseDto {
  @ApiProperty({
    example: 200,
    description: '상태코드',
  })
  readonly statusCode: number;

  @ApiProperty({
    example: '그룹 삭제 성공',
    description: '메시지',
  })
  readonly message: string;
}

export class GroupListDto {
  @ApiProperty({
    example: 3,
    description: '총 아이템 수',
  })
  readonly totalItems: number;

  @ApiProperty({
    example: 1,
    description: '총 페이지 수',
  })
  readonly totalPages: number;

  @ApiProperty({
    example: 0,
    description: '현재 페이지',
  })
  readonly currentPage: number;

  @ApiProperty({
    type: [GroupDto],
    description: '그룹 리스트',
  })
  readonly gropuList: [];
}

export class GroupListResponseDto {
  @ApiProperty({
    example: 200,
    description: '상태코드',
  })
  readonly statusCode: number;

  @ApiProperty({
    example: '그룹 리스트 성공',
    description: '메시지',
  })
  readonly message: string;

  @ApiProperty({
    type: GroupListDto,
  })
  readonly data: object;
}

export class GroupNameDto {
  @ApiProperty({
    example: 5,
    description: '그룹 아이디',
  })
  readonly id: number;

  @ApiProperty({
    example: 'test2',
    description: '그룹 명',
  })
  readonly name: string;
}

export class GroupNameListResponseDto {
  @ApiProperty({
    example: 200,
    description: '상태코드',
  })
  readonly statusCode: number;

  @ApiProperty({
    example: '그룹명 리스트 성공',
    description: '메시지',
  })
  readonly message: string;

  @ApiProperty({
    type: [GroupNameDto],
    description: '그룹명',
  })
  readonly data: object;
}
