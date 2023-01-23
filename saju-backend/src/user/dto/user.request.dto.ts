import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SigninRequestDto {
  @IsEmail()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(100)
  @ApiProperty({
    example: 'koo@test.com',
    description: '이메일',
    required: true,
  })
  email: string; //이메일

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(100)
  @Matches(/^[a-zA-Z0-9]*$/, {
    message: 'password only accepts engilsh and number',
  })
  @ApiProperty({
    example: '1234',
    description: '패스워드',
    required: true,
  })
  password: string; //패스워드
}

export class SignupRequestDto {
  @IsEmail()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(100)
  @ApiProperty({
    example: 'koo@test.com',
    description: '이메일',
    required: true,
  })
  email: string; //이메일

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(100)
  @Matches(/^[a-zA-Z0-9]*$/, {
    message: 'password only accepts engilsh and number',
  })
  @ApiProperty({
    example: '1234',
    description: '패스워드',
    required: true,
  })
  password: string; //패스워드

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(30)
  @ApiProperty({
    example: '테스트',
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
    enum: ['MALE', 'FEMALE'],
    description: '성별 : 남성(MALE), 여성(FEMALE)',
    required: true,
  })
  gender: string; //성별

  @IsString()
  @IsNotEmpty()
  @IsIn(['SOLAR', 'LUNAR'], {
    message: 'birthdayType는 SOLAR 또는 LUNAR 만 가능합니다.',
  })
  @ApiProperty({
    enum: ['SOLAR', 'LUNAR'],
    description: '양력(SOLAR), 음력(LUNAR)',
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
    description: '생년월일',
    required: true,
  })
  birthday: string; //생일

  @IsOptional()
  @MinLength(0)
  @MaxLength(4)
  @Matches(/(0[0-9]|1[0-9]|2[0-3])(0[0-9]|[1-5][0-9])$/)
  @ApiProperty({
    example: '0710',
    description: '태어난 시간',
  })
  time: string; //시간
}
