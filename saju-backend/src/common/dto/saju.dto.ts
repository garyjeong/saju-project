import { ApiProperty } from '@nestjs/swagger';

export class SajuDto {
  @ApiProperty({
    example: 3,
    description: '대운수',
  })
  readonly bigFortuneNumber: number;

  @ApiProperty({
    example: 1990,
    description: '대운시작 년도',
  })
  readonly bigFortuneStartYear: number;

  @ApiProperty({
    example: null,
    description: '절입 시간',
  })
  readonly seasonStartTime: string;

  @ApiProperty({
    example: {
      chinese: '丁',
      korean: '정',
      fiveCircle: '화',
      fiveCircleColor: '#F44336',
      tenStar: '편재',
      minusPlus: '음',
      jijangGan: null,
    },
    description: '년간 정보',
  })
  readonly yearSky: object;

  @ApiProperty({
    example: {
      chinese: '卯',
      korean: '묘',
      fiveCircle: '목',
      fiveCircleColor: '#4CAF50',
      tenStar: '식신',
      minusPlus: '음',
      jijangGan: {
        first: {
          chinese: '甲',
          korean: '갑',
          fiveCircle: '목',
          fiveCircleColor: '#4CAF50',
          minusPlus: '양',
          rate: 10,
        },
        second: null,
        third: {
          chinese: '乙',
          korean: '을',
          fiveCircle: '목',
          fiveCircleColor: '#4CAF50',
          minusPlus: '음',
          rate: 20,
        },
      },
    },
    description: '년지 정보',
  })
  readonly yearGround: object;

  @ApiProperty({
    example: {
      chinese: '壬',
      korean: '임',
      fiveCircle: '수',
      fiveCircleColor: '#039BE5',
      tenStar: '겁재',
      minusPlus: '양',
      jijangGan: null,
    },
    description: '월간 정보',
  })
  readonly monthSky: object;

  @ApiProperty({
    example: {
      chinese: '寅',
      korean: '인',
      fiveCircle: '목',
      fiveCircleColor: '#4CAF50',
      tenStar: '상관',
      minusPlus: '양',
      jijangGan: {
        first: {
          chinese: '戊',
          korean: '무',
          fiveCircle: '토',
          fiveCircleColor: '#FFD600',
          minusPlus: '양',
          rate: 7,
        },
        second: {
          chinese: '丙',
          korean: '병',
          fiveCircle: '화',
          fiveCircleColor: '#F44336',
          minusPlus: '양',
          rate: 7,
        },
        third: {
          chinese: '甲',
          korean: '갑',
          fiveCircle: '목',
          fiveCircleColor: '#4CAF50',
          minusPlus: '양',
          rate: 16,
        },
      },
    },
    description: '월지 정보',
  })
  readonly monthGround: object;

  @ApiProperty({
    example: {
      chinese: '癸',
      korean: '계',
      fiveCircle: '수',
      fiveCircleColor: '#039BE5',
      tenStar: '비견',
      minusPlus: '음',
      jijangGan: null,
    },
    description: '일간 정보',
  })
  readonly daySky: object;

  @ApiProperty({
    example: {
      chinese: '巳',
      korean: '사',
      fiveCircle: '화',
      fiveCircleColor: '#F44336',
      tenStar: '정재',
      minusPlus: '음',
      jijangGan: {
        first: {
          chinese: '戊',
          korean: '무',
          fiveCircle: '토',
          fiveCircleColor: '#FFD600',
          minusPlus: '양',
          rate: 7,
        },
        second: {
          chinese: '庚',
          korean: '경',
          fiveCircle: '금',
          fiveCircleColor: '#E0E0E0',
          minusPlus: '양',
          rate: 7,
        },
        third: {
          chinese: '丙',
          korean: '병',
          fiveCircle: '화',
          fiveCircleColor: '#F44336',
          minusPlus: '양',
          rate: 16,
        },
      },
    },
    description: '일지 정보',
  })
  readonly dayGround: object;

  @ApiProperty({
    example: {
      chinese: '乙',
      korean: '을',
      fiveCircle: '목',
      fiveCircleColor: '#4CAF50',
      tenStar: '식신',
      minusPlus: '음',
      jijangGan: null,
    },
    description: '시간 정보',
  })
  readonly timeSky: object;

  @ApiProperty({
    example: {
      chinese: '卯',
      korean: '묘',
      fiveCircle: '목',
      fiveCircleColor: '#4CAF50',
      tenStar: '식신',
      minusPlus: '음',
      jijangGan: {
        first: {
          chinese: '甲',
          korean: '갑',
          fiveCircle: '목',
          fiveCircleColor: '#4CAF50',
          minusPlus: '양',
          rate: 10,
        },
        second: null,
        third: {
          chinese: '乙',
          korean: '을',
          fiveCircle: '목',
          fiveCircleColor: '#4CAF50',
          minusPlus: '음',
          rate: 20,
        },
      },
    },
    description: '시지 정보',
  })
  readonly timeGround: object;
}

export class FortuneDto {
  @ApiProperty({
    example: {
      number: 33,
      sky: {
        chinese: '戊',
        korean: '무',
        fiveCircle: '토',
        fiveCircleColor: '#FFD600',
        tenStar: '정관',
        minusPlus: '양',
        jijangGan: null,
      },
      ground: {
        chinese: '戌',
        korean: '술',
        fiveCircle: '토',
        fiveCircleColor: '#FFD600',
        tenStar: '정관',
        minusPlus: '양',
        jijangGan: {
          first: {
            chinese: '辛',
            korean: '신',
            fiveCircle: '금',
            fiveCircleColor: '#E0E0E0',
            minusPlus: '음',
            rate: 9,
          },
          second: {
            chinese: '丁',
            korean: '정',
            fiveCircle: '화',
            fiveCircleColor: '#F44336',
            minusPlus: '음',
            rate: 3,
          },
          third: {
            chinese: '戊',
            korean: '무',
            fiveCircle: '토',
            fiveCircleColor: '#FFD600',
            minusPlus: '양',
            rate: 18,
          },
        },
      },
    },
    description: '현재 대운',
  })
  readonly bigFortune: object;

  @ApiProperty({
    example: {
      number: 2022,
      sky: {
        chinese: '壬',
        korean: '임',
        fiveCircle: '수',
        fiveCircleColor: '#039BE5',
        tenStar: '겁재',
        minusPlus: '양',
        jijangGan: null,
      },
      ground: {
        chinese: '寅',
        korean: '인',
        fiveCircle: '목',
        fiveCircleColor: '#4CAF50',
        tenStar: '상관',
        minusPlus: '양',
        jijangGan: {
          first: {
            chinese: '戊',
            korean: '무',
            fiveCircle: '토',
            fiveCircleColor: '#FFD600',
            minusPlus: '양',
            rate: 7,
          },
          second: {
            chinese: '丙',
            korean: '병',
            fiveCircle: '화',
            fiveCircleColor: '#F44336',
            minusPlus: '양',
            rate: 7,
          },
          third: {
            chinese: '甲',
            korean: '갑',
            fiveCircle: '목',
            fiveCircleColor: '#4CAF50',
            minusPlus: '양',
            rate: 16,
          },
        },
      },
    },
    description: '현재 세운',
  })
  readonly smallFortune: object;

  @ApiProperty({
    example: {
      number: 5,
      sky: {
        chinese: '乙',
        korean: '을',
        fiveCircle: '목',
        fiveCircleColor: '#4CAF50',
        tenStar: '식신',
        minusPlus: '음',
        jijangGan: null,
      },
      ground: {
        chinese: '巳',
        korean: '사',
        fiveCircle: '화',
        fiveCircleColor: '#F44336',
        tenStar: '정재',
        minusPlus: '음',
        jijangGan: {
          first: {
            chinese: '戊',
            korean: '무',
            fiveCircle: '토',
            fiveCircleColor: '#FFD600',
            minusPlus: '양',
            rate: 7,
          },
          second: {
            chinese: '庚',
            korean: '경',
            fiveCircle: '금',
            fiveCircleColor: '#E0E0E0',
            minusPlus: '양',
            rate: 7,
          },
          third: {
            chinese: '丙',
            korean: '병',
            fiveCircle: '화',
            fiveCircleColor: '#F44336',
            minusPlus: '양',
            rate: 16,
          },
        },
      },
    },
    description: '현재 월운',
  })
  readonly monthFortune: object;

  @ApiProperty({
    example: {
      number: 29,
      sky: {
        chinese: '壬',
        korean: '임',
        fiveCircle: '수',
        fiveCircleColor: '#039BE5',
        tenStar: '겁재',
        minusPlus: '양',
        jijangGan: null,
      },
      ground: {
        chinese: '午',
        korean: '오',
        fiveCircle: '화',
        fiveCircleColor: '#F44336',
        tenStar: '편재',
        minusPlus: '양',
        jijangGan: {
          first: {
            chinese: '丙',
            korean: '병',
            fiveCircle: '화',
            fiveCircleColor: '#F44336',
            minusPlus: '양',
            rate: 10,
          },
          second: {
            chinese: '己',
            korean: '기',
            fiveCircle: '토',
            fiveCircleColor: '#FFD600',
            minusPlus: '음',
            rate: 10,
          },
          third: {
            chinese: '丁',
            korean: '정',
            fiveCircle: '화',
            fiveCircleColor: '#F44336',
            minusPlus: '음',
            rate: 10,
          },
        },
      },
    },
    description: '현재 일운',
  })
  readonly dayFortune: object;
}
