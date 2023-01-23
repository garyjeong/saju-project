import { ApiProperty } from '@nestjs/swagger';
import { MemberDto } from '../../common/dto/member.dto';

export class MemberAddResponseDto {
  @ApiProperty({
    example: 201,
    description: '상태코드',
  })
  readonly statusCode: number;

  @ApiProperty({
    example: '멤버 추가 성공',
    description: '메시지',
  })
  readonly message: string;
}

export class MemberDeleteResponseDto {
  @ApiProperty({
    example: 200,
    description: '상태코드',
  })
  readonly statusCode: number;

  @ApiProperty({
    example: '멤버 삭제 성공',
    description: '메시지',
  })
  readonly message: string;
}

export class MemberListDto {
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
    type: [MemberDto],
    description: '멤버 리스트',
  })
  readonly memberList: [];
}

export class MemberListResponseDto {
  @ApiProperty({
    example: 200,
    description: '상태코드',
  })
  readonly statusCode: number;

  @ApiProperty({
    example: '멤버 리스트 성공',
    description: '메시지',
  })
  readonly message: string;

  @ApiProperty({
    type: MemberListDto,
    description: '멤버 리스트',
  })
  readonly data: object;
}
