import { ApiProperty } from '@nestjs/swagger';
import { SajuDto } from '../../commons/dto/saju.dto';
import { MemberDto } from '../../commons/dto/member.dto';

export class ManseDto {
  @ApiProperty({
    type: MemberDto,
    description: '멤버',
  })
  readonly member: object;

  @ApiProperty({
    type: SajuDto,
    description: '사주',
  })
  readonly saju: object;

  @ApiProperty({
    example: {
      big: 4,
      small: 2019,
    },
    description: '운세',
  })
  readonly fortune: object;

  @ApiProperty({
    example: { bigFortune: {}, smallFortune: {}, monthFortune: {} },
    description: '리스트',
  })
  readonly list: [];
}

export class ManseResponseDto {
  @ApiProperty({
    example: 200,
    description: '상태코드',
  })
  readonly statusCode: number;

  @ApiProperty({
    example: '만세력 가져오기 성공',
    description: '메시지',
  })
  readonly message: string;

  @ApiProperty({
    type: ManseDto,
  })
  readonly data: object;
}
