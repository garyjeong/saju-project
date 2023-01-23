import { ApiProperty } from '@nestjs/swagger';
import { MemberListDto } from 'src/member/dto/member.response.dto';

export class GroupMemberAddResponseDto {
  @ApiProperty({
    example: 201,
    description: '상태코드',
  })
  readonly statusCode: number;

  @ApiProperty({
    example: '그룹에 멤버 추가 성공',
    description: '메시지',
  })
  readonly message: string;
}

export class GroupMemberDeleteResponseDto {
  @ApiProperty({
    example: 200,
    description: '상태코드',
  })
  readonly statusCode: number;

  @ApiProperty({
    example: '그룹에서 멤버 제거 성공',
    description: '메시지',
  })
  readonly message: string;
}

export class Group2Dto {
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
    example: '2022-06-19T01:37:14.000Z',
    description: '그룹 생성 시간',
  })
  readonly createdAt: string;

  @ApiProperty({
    example: '2022-06-19T01:37:14.000Z',
    description: '그룹 수정 시간',
  })
  readonly updatedAt: string;
}

export class GroupMemberListDto {
  @ApiProperty({
    type: Group2Dto,
    description: '그룹',
  })
  readonly group: object;

  @ApiProperty({
    type: MemberListDto,
    description: '멤버 리스트',
  })
  readonly members: object;
}

export class GroupMemberListResponseDto {
  @ApiProperty({
    example: 200,
    description: '상태코드',
  })
  readonly statusCode: number;

  @ApiProperty({
    example: '그룹별 멤버 리스트 성공',
    description: '메시지',
  })
  readonly message: string;

  @ApiProperty({
    type: GroupMemberListDto,
    description: '그룹 멤버 리스트',
  })
  readonly data: object;
}
