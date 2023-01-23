import * as sajuDataService from './saju-data';
/**
 * 대운 리스트 가져오기
 */
async function listBigFortune(
  gender: string,
  yearSky: string,
  monthSky: string,
  monthGround: string,
  bigFortuneNumber: string,
): Promise<object> {
  //순행(true), 역행(false) 판단
  const minusPlus = sajuDataService.getMinusPlus()[yearSky];
  //남양음녀 순행, 남음여양 역행
  let direction = null;
  if (
    (gender === 'MALE' && minusPlus === '양') ||
    (gender === 'FEMALE' && minusPlus === '음')
  ) {
    direction = true;
  } else if (
    (gender === 'MALE' && minusPlus === '양') ||
    (gender === 'FEMALE' && minusPlus === '음')
  ) {
    direction = false;
  }

  const bigFortunes = {};
  bigFortunes[0] = {
    bigFortuneNumber: null,
    monthSky: monthSky,
    monthGround: monthGround,
  };

  //60갑자에서 월주 찾기
  const sixtyGapja = sajuDataService.getSixtyGapjaForBigFortuneList();
  let index = null;
  let count = 0;
  for (const i in sixtyGapja) {
    if (sixtyGapja[i][0] === monthSky && sixtyGapja[i][1] === monthGround) {
      index = i;
      count += 1;
      if (count === 2) {
        break;
      }
    }
  }

  let first = Number(index);
  let last = Number(index);
  let bigFortuneNumberValue = bigFortuneNumber;
  let count2 = 1;
  if (direction === true) {
    first += 1;
    last += 10;
    for (let i = first; i <= last; i++) {
      bigFortunes[count2] = {
        bigFortuneNumber: bigFortuneNumberValue,
        monthSky: sixtyGapja[i][0],
        monthGround: sixtyGapja[i][1],
      };
      count2 += 1;
      bigFortuneNumberValue += 10;
    }
  } else {
    first -= 1;
    last -= 10;
    for (let i = first; i >= last; i--) {
      bigFortunes[count2] = {
        bigFortuneNumber: bigFortuneNumberValue,
        monthSky: sixtyGapja[i][0],
        monthGround: sixtyGapja[i][1],
      };
      count2 += 1;
      bigFortuneNumberValue += 10;
    }
  }
  return bigFortunes;
}

/**
 * 세운 리스트 가져오기
 */
async function listSmallFortune(start, end = null): Promise<object> {
  const index = start % 60;

  if (!end) {
    return {
      year: start,
      sky: sajuDataService.getSixtyGapja()[index][0],
      ground: sajuDataService.getSixtyGapja()[index][1],
    };
  }

  const result = [];
  for (let i = start; i <= end; i++) {
    const index = i % 60;
    const arr = {
      year: i,
      sky: sajuDataService.getSixtyGapja()[index][0],
      ground: sajuDataService.getSixtyGapja()[index][1],
    };
    result.push(arr);
  }
  return result;
}

/**
 * 월운 리스트 가져오기
 */
async function listMonthFortune(year): Promise<object> {
  const tenSky = {
    0: '甲',
    1: '乙',
    2: '丙',
    3: '丁',
    4: '戊',
    5: '己',
    6: '庚',
    7: '辛',
    8: '壬',
    9: '癸',
    10: '甲',
    11: '乙',
    12: '丙',
    13: '丁',
    14: '戊',
    15: '己',
    16: '庚',
    17: '辛',
    18: '壬',
    19: '癸',
    20: '甲',
  };
  const tweleveGround = {
    0: '丑',
    1: '寅',
    2: '卯',
    3: '辰',
    4: '巳',
    5: '午',
    6: '未',
    7: '申',
    8: '酉',
    9: '戌',
    10: '亥',
    11: '子',
  };
  let start = null;
  if (year % 10 === 4 || year % 10 === 9) {
    start = '乙';
  } else if (year % 10 === 0 || year % 10 === 5) {
    start = '丁';
  } else if (year % 10 === 1 || year % 10 === 6) {
    start = '己';
  } else if (year % 10 === 2 || year % 10 === 7) {
    start = '辛';
  } else if (year % 10 === 3 || year % 10 === 8) {
    start = '癸';
  }

  let index = null;
  for (const i in tenSky) {
    if (tenSky[i] === start) {
      index = i;
      break;
    }
  }

  const monthFortunes = {};
  for (let i = 0; i < 12; i++) {
    monthFortunes[i] = {
      month: i + 1,
      sky: tenSky[Number(index) + i],
      ground: tweleveGround[i],
    };
  }
  return monthFortunes;
}

export { listBigFortune, listSmallFortune, listMonthFortune };
