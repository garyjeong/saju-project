import { ApiProperty } from '@nestjs/swagger';
import {
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class MemberAddRequestDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(30)
  @ApiProperty({
    example: 'test',
    description: '닉네임',
    required: true,
  })
  nickname: string; //닉네임

  @IsString()
  @IsNotEmpty()
  @IsIn(['MALE', 'FEMALE'], {
    message: 'gender는 MALE 또는 FEMALE 만 가능합니다.',
  })
  @ApiProperty({
    example: 'MALE',
    description: '성별',
    required: true,
  })
  gender: string; //성별

  @IsString()
  @IsNotEmpty()
  @IsIn(['SOLAR', 'LUNAR'], {
    message: 'birthType는 SOLAR 또는 LUNAR 만 가능합니다.',
  })
  @ApiProperty({
    example: 'SOLAR',
    description: '양력',
    required: true,
  })
  birthdayType: string; //양력, 음력

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(8)
  @Matches(
    /^(19[0-9][0-9]|20\d{2}|2100)(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/,
  )
  @ApiProperty({
    example: '19870213',
    description: '생일',
    required: true,
  })
  birthday: string; //생일

  @IsOptional()
  @MinLength(0)
  @MaxLength(4)
  @Matches(/(0[0-9]|1[0-9]|2[0-3])(0[0-9]|[1-5][0-9])$/)
  @ApiProperty({
    example: '0710',
    description: '시간',
    required: false,
  })
  time: string; //시간
}
