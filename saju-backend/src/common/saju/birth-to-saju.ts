import { Manse } from '../../entities/manse.entity';
import * as moment from 'moment';
import * as CommonData from './saju-data';
import { LessThanOrEqual, MoreThanOrEqual } from 'typeorm';

//생일을 사주로 변경
async function convertBirthtimeToSaju(
  memberId: number,
  memberDto,
): Promise<object> {
  // 23:30 ~ 23:59 자시에 태어난 경우 다음날로 처리
  // 1987.02.13 00:30분  (계사일주 - 임자시)
  // 1987.02.13 23:40분  (갑오일주 - 갑자시)

  const time: string = memberDto.time;
  const birthday: string =
    time >= '23:30' && time <= '23:59'
      ? moment(memberDto.birthday).add(1, 'days').format('YYYY-MM-DD')
      : moment(memberDto.birthday).format('YYYY-MM-DD');

  const birthTime: string = time ? time : '12:00'; //시간 미 입력시 대운수 계산을 위핸 디폴트 12:00로 처리
  const birthType: string = memberDto.birthdayType;
  const gender: string = memberDto.gender;

  const condition: object =
    birthType === 'SOLAR'
      ? { where: { solarDate: birthday } }
      : { where: { lunarDate: birthday } };

  const samju: Manse = await Manse.findOne(condition);
  const solarDatetime: moment.Moment = moment(birthday + ' ' + birthTime);
  const solarDatetimeFormat: string = solarDatetime.format(
    'YYYY-MM-DD HH:mm:ss',
  );

  //절입일인 경우
  if (samju.season) {
    //절입시간과 생년연월시 비교
    //1987-02-04 17:47:00 이후 입춘 - 정묘년 임인월 갑신일, 이전 병인년 신축월 계미일
    //절입일이 생일보다 큰 경우는 하루 전 만세력을 가져와야 한다.
    const seasonTime: moment.Moment = moment(samju.seasonStartTime);
    const diff: number = moment
      .duration(solarDatetime.diff(seasonTime))
      .asHours();

    if (diff < 0) {
      const manse: Manse = await Manse.findOne({
        where: {
          solarDate: new Date(
            moment(birthday).add(-1, 'days').format('YYYY-MM-DD'),
          ),
        },
      });
      samju.yearSky = manse.yearSky;
      samju.yearGround = manse.yearGround;
      samju.monthSky = manse.monthSky;
      samju.monthGround = manse.monthGround;
      samju.daySky = manse.daySky;
      samju.dayGround = manse.dayGround;
    }
  }

  //순행, 역행 판단
  const minusPlus: string = await CommonData.getMinusPlus()[samju.yearSky];
  //남양음녀 순행, 남음여양 역행
  let direction = false;
  if (
    (gender === 'MALE' && minusPlus === '양') ||
    (gender === 'FEMALE' && minusPlus === '음')
  ) {
    direction = true;
  } else if (
    (gender === 'FEMALE' && minusPlus === '양') ||
    (gender === 'MALE' && minusPlus === '음')
  ) {
    direction = false;
  }

  //절입 시간 가져오기
  let manse = null;
  if (direction === true) {
    manse = await Manse.findOne({
      where: {
        seasonStartTime: MoreThanOrEqual(solarDatetimeFormat),
      },
      order: {
        solarDate: 'ASC',
      },
    });
  } else {
    manse = await Manse.findOne({
      where: {
        seasonStartTime: LessThanOrEqual(solarDatetimeFormat),
      },
      order: {
        solarDate: 'DESC',
      },
    });
  }
  const seasonStartTime: moment.Moment = moment(manse.seasonStartTime);

  //대운수 및 대운 시작 가져오기
  const diffTime: number =
    direction === true
      ? moment.duration(seasonStartTime.diff(solarDatetime)).asDays() //순행
      : moment.duration(solarDatetime.diff(seasonStartTime)).asDays(); //역행

  const divider: number = Math.floor(diffTime / 3);
  const demainder: number = Math.floor(diffTime) % 3;

  let bigFortuneNumber: number = divider;
  if (diffTime < 4) {
    bigFortuneNumber = 1;
  }

  if (demainder === 2) {
    bigFortuneNumber += 1;
  }
  const bigFortuneStart: string = solarDatetime
    .add(bigFortuneNumber, 'years')
    .format('YYYY');

  //시주 가져오기
  //시간이 없는 경우 null 처리
  let timeSky = null;
  let timeGround = null;
  const daySky: string = samju.daySky;

  if (time) {
    let index = null;
    const timeJuData: object = CommonData.getTimeJuData(); //시간 범위
    const timeJuData2: object = CommonData.getTimeJuData2(); //일간 및 시간에 따른 시주

    for (const key in timeJuData) {
      const strKey = String(key);

      if (time >= timeJuData[strKey]['0'] && time <= timeJuData[strKey]['1']) {
        index = strKey;
        break;
      } else if (
        (time >= '23:30' && time <= '23:59') ||
        (time >= '00:00' && time <= '01:29')
      ) {
        // 0 => ['23:30:00', '01:30:00'],  //자시
        index = strKey;
        break;
      }
    }

    timeSky = timeJuData2[daySky][index][0];
    timeGround = timeJuData2[daySky][index][1];
  }
  return {
    memberId,
    yearSky: samju.yearSky,
    yearGround: samju.yearGround,
    monthSky: samju.monthSky,
    monthGround: samju.monthGround,
    daySky: samju.daySky,
    dayGround: samju.dayGround,
    timeSky: timeSky,
    timeGround: timeGround,
    bigFortuneNumber: bigFortuneNumber,
    bigFortuneStartYear: Number(bigFortuneStart),
    seasonStartTime: samju.seasonStartTime,
  };
}
export { convertBirthtimeToSaju };
