import { ApiProperty } from '@nestjs/swagger';

export class PagenationDto {
  @ApiProperty({
    required: true,
    description: '한 번에 가져오는 개수',
    default: 10,
  })
  readonly size: number;

  @ApiProperty({
    required: true,
    description: '불러올 페이지',
    default: 0,
  })
  readonly page: number;
}
