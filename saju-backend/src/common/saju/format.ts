import * as CommonData from './saju-data';
import * as moment from 'moment';
import { Manse } from '../../entities/manse.entity';
import * as fortuneService from './fortune';
const tenStarData = CommonData.getTenStar();

/**
 * 멤버를 사주 포맷 변환
 * @param member
 * @param manse
 * @returns
 */
async function convertMemberToSaju(
  member: object,
  manse: object,
): Promise<object> {
  const format = {};
  format['member'] = await formatMember(member);
  format['saju'] = await formatSaju(manse);

  //****************** 대운 ******************/
  const fortunes = await fortuneService.listBigFortune(
    member['gender'],
    manse['yearSky'],
    manse['monthSky'],
    manse['monthGround'],
    manse['bigFortuneNumber'],
  );

  const bigFortunes = await formatBigFortune(fortunes, manse['daySky']);
  const age = await convertBirthToAge(member['birthday']);

  //올해 나이 기준으로 현재 대운 계산
  let index: number = null;
  for (const i in bigFortunes) {
    if (i === '0') continue;
    if (bigFortunes[i]['number'] > age) {
      index = Number(i) - 1;
      break;
    }
  }

  //****************** 현재운 ******************/
  //오늘날짜로 만세력 테이블 검색
  const solarDate = moment().format('YYYY-MM-DD');
  const currentFortune = await Manse.findOne({
    where: {
      solarDate: solarDate,
    },
  });

  const convertedFortune = await formatFortune(manse['daySky'], currentFortune);

  //현재 운
  format['fortune'] = {
    bigFortune: bigFortunes[String(index)],
    smallFortune: {
      number: new Date().getFullYear(),
      sky: convertedFortune['yearSky'],
      ground: convertedFortune['yearGround'],
    },
    monthFortune: {
      number: new Date().getMonth() + 1,
      sky: convertedFortune['monthSky'],
      ground: convertedFortune['monthGround'],
    },
    dayFortune: {
      number: new Date().getDate(),
      sky: convertedFortune['daySky'],
      ground: convertedFortune['dayGround'],
    },
  };
  return format;
}

/**
 * 멤버 포맷 변환
 * @param member 멤버
 * @returns
 */
async function formatMember(member: object): Promise<object> {
  return {
    id: member['id'],
    nickname: member['nickname'],
    age: await convertBirthToAge(member['birthday']),
    birthday: member['birthday'],
    time: member['time'],
    birthdayType: member['birthdayType'],
    gender: member['gender'],
    type: member['type'],
    createdAt: moment(member['createdAt']).format('YYYY-MM-DD HH:mm:ss'),
  };
}

/**
 * 생일을 나이로 변환
 * @param birth 생일
 * @returns
 */
async function convertBirthToAge(birth: string): Promise<number> {
  const year = await birth.split('-')[0];
  const currentYear = new Date().getFullYear();
  const age = currentYear - Number(year) + 1;
  return age;
}

/**
 * 사주 포맷 변환
 * @param manse 만세력
 * @returns
 */
async function formatSaju(manse: object): Promise<object> {
  const tenStar = await CommonData.getTenStar()[manse['daySky']];

  return {
    bigFortuneNumber: manse['bigFortuneNumber'],
    bigFortuneStartYear: manse['bigFortuneStartYear'],
    seasonStartTime: manse['seasonStartTime'],
    yearSky: await formatChinese(manse['yearSky'], tenStar, false),
    yearGround: await formatChinese(manse['yearGround'], tenStar, true),
    monthSky: await formatChinese(manse['monthSky'], tenStar, false),
    monthGround: await formatChinese(manse['monthGround'], tenStar, true),
    daySky: await formatChinese(manse['daySky'], tenStar, false),
    dayGround: await formatChinese(manse['dayGround'], tenStar, true),
    timeSky: manse['timeSky']
      ? await formatChinese(manse['timeSky'], tenStar, false)
      : null,
    timeGround: manse['timeGround']
      ? await formatChinese(manse['timeGround'], tenStar, true)
      : null,
  };
}

/**
 * 한자 포맷 변환
 * @param chinese  //한자 (10천간, 12지지)
 * @param tenStar  //십성
 * @param isGround //지장간
 * @returns
 */
async function formatChinese(
  chinese: string,
  tenStar: object,
  isGround: boolean,
): Promise<object> {
  const minusPlusData = CommonData.getMinusPlus();
  const koreanData = CommonData.convertChineseToKorean();
  const jijangganData = CommonData.getJijangan();

  return {
    chinese: chinese,
    korean: koreanData[chinese],
    fiveCircle: tenStar[chinese]['1'],
    fiveCircleColor: await getColor(tenStar[chinese]['1']),
    tenStar: tenStar[chinese]['0'],
    minusPlus: minusPlusData[chinese],
    jijangGan: isGround === true ? jijangganData[chinese] : null,
  };
}

/**
 * 오행을 색상으로 변경
 * @param value 오행
 * @returns
 */
async function getColor(value: string): Promise<string> {
  let color = '';

  if (value === '목') {
    color = '#4CAF50';
  } else if (value === '화') {
    color = '#F44336';
  } else if (value === '토') {
    color = '#FFD600';
  } else if (value === '금') {
    color = '#E0E0E0';
  } else if (value === '수') {
    color = '#039BE5';
  }

  return color;
}

//대운 포맷
async function formatBigFortune(
  fortunes: object,
  daySky: string,
): Promise<object> {
  const tenStar = tenStarData[daySky];
  const format = {};
  for (const i in fortunes) {
    format[i] = {
      number: fortunes[i].bigFortuneNumber,
      sky: await formatChinese(fortunes[i].monthSky, tenStar, false),
      ground: await formatChinese(fortunes[i].monthGround, tenStar, true),
    };
  }
  return format;
}

//운세 포맷 (연월일 운)
async function formatFortune(daySky, fortune): Promise<object> {
  const tenStar = tenStarData[daySky];
  return {
    yearSky: await formatChinese(fortune.yearSky, tenStar, false),
    yearGround: await formatChinese(fortune.yearGround, tenStar, true),
    monthSky: await formatChinese(fortune.monthSky, tenStar, false),
    monthGround: await formatChinese(fortune.monthGround, tenStar, true),
    daySky: await formatChinese(fortune.daySky, tenStar, false),
    dayGround: await formatChinese(fortune.dayGround, tenStar, true),
  };
}

//세운 포맷
async function formatSmallFortune(fortunes, daySky): Promise<object> {
  const tenStar = tenStarData[daySky];
  const format = {};
  for (const i in fortunes) {
    format[i] = {
      year: fortunes[i].year,
      sky: await formatChinese(fortunes[i].sky, tenStar, false),
      ground: await formatChinese(fortunes[i].ground, tenStar, true),
    };
  }
  return format;
}

//월운 포맷
async function formatMonthFortune(fortunes, daySky): Promise<object> {
  const tenStar = tenStarData[daySky];
  const format = {};
  for (const i in fortunes) {
    format[i] = {
      month: fortunes[i].month,
      sky: await formatChinese(fortunes[i].sky, tenStar, false),
      ground: await formatChinese(fortunes[i].ground, tenStar, false),
    };
  }
  return format;
}

/**
 * 멤버를 만세력으로 변환
 * @param member
 * @param manse
 * @returns
 */
async function convertMemberToManse(
  member: object,
  manse: object,
  clickBigFortune = null,
  clickSmallFortune = null,
): Promise<object> {
  const format = {};
  format['member'] = await formatMember(member);
  format['saju'] = await formatSaju(manse);

  //****************** 대운 ******************/
  const fortunes = await fortuneService.listBigFortune(
    member['gender'],
    manse['yearSky'],
    manse['monthSky'],
    manse['monthGround'],
    manse['bigFortuneNumber'],
  );

  const bigFortunes = await formatBigFortune(fortunes, manse['daySky']);
  const age = await convertBirthToAge(member['birthday']);
  //올해 나이 기준으로 현재 대운 계산
  let index: number = null;
  for (const i in bigFortunes) {
    if (i === '0') continue;
    if (bigFortunes[i]['number'] > age) {
      index = Number(i) - 1;
      break;
    }
  }

  //****************** 세운 ******************/
  let start = null;
  let end = null;
  if (!clickBigFortune) {
    //디폴트 대운에 의한 세운 10개
    start = manse['bigFortuneStartYear'] + (index - 1) * 10 - 1;
    end = start + 9;
  } else {
    //클릭 대운에 의한 세운 10개
    start = manse['bigFortuneStartYear'] + (clickBigFortune - 1) * 10 - 1;
    end = start + 9;
  }

  //현재 운
  format['fortune'] = {
    big: clickBigFortune ? clickBigFortune : index,
    small: start,
  };

  const smallFortunelist = await fortuneService.listSmallFortune(start, end);
  const smallFortunes = await formatSmallFortune(
    smallFortunelist,
    manse['daySky'],
  );

  //****************** 월운 ******************/
  const yearForMonth = clickSmallFortune ? clickSmallFortune : start;
  const monthFortunelist = await fortuneService.listMonthFortune(yearForMonth);
  const monthFortunes = await formatMonthFortune(
    monthFortunelist,
    manse['daySky'],
  );

  //운 리스트
  format['list'] = {
    bigFortune: bigFortunes,
    smallFortune: smallFortunes,
    monthFortune: monthFortunes,
  };

  return format;
}

export { convertMemberToManse, convertMemberToSaju };
