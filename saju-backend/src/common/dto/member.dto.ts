import { ApiProperty } from '@nestjs/swagger';

export class MemberDto {
  @ApiProperty({
    example: 1,
    description: '아이디',
  })
  readonly id: number;

  @ApiProperty({
    example: 'koo',
    description: '닉네임',
  })
  readonly nickname: string;

  @ApiProperty({
    example: 36,
    description: '나이',
  })
  readonly age: number;

  @ApiProperty({
    example: '1987-02-13',
    description: '생년월일',
  })
  readonly birthday: string;

  @ApiProperty({
    example: '07:10',
    description: '태어난 시간',
  })
  readonly time: string;

  @ApiProperty({
    enum: ['SOLAR', 'LUNAR'],
    description: '양력(SOLAR), 음력(LUNAR)',
  })
  readonly birthdayType: string;

  @ApiProperty({
    enum: ['MALE', 'FEMALE'],
    description: '성별 : 남(MALE), 여(FEMALE)',
  })
  readonly gender: string;

  @ApiProperty({
    enum: ['USER', 'MEMBER'],
    description: '본인(USER), 멤버(MEMBER)',
  })
  readonly type: string;

  @ApiProperty({
    example: '2022-05-24 22:06:08',
    description: '가입 시간',
  })
  readonly createdAt: string;
}
