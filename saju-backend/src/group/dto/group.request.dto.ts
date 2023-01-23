import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class GroupRequestDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(30)
  @ApiProperty({
    example: 'test0619',
    description: '그룹 명',
    required: true,
  })
  name: string; //그룹 명
}
