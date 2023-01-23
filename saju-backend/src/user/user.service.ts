import * as CommonConvert from '../common/saju/birth-to-saju';
import * as CommonFormat from '../common/saju/format';
import {
  ConflictException,
  Injectable,
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SigninRequestDto, SignupRequestDto } from './dto/user.request.dto';
import { User } from '../entities/user.entity';
import { Member } from '../entities/member.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { MemberManse } from '../entities/member-manse.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Member)
    private memberRepository: Repository<Member>,
    @InjectRepository(MemberManse)
    private memberManseRepository: Repository<MemberManse>,
    private jwtService: JwtService,
  ) {}

  /**
   * 회원가입
   * @param signupRequestDto
   * @returns
   */
  async signUp(signupRequestDto: SignupRequestDto) {
    const { email, password, birthdayType, birthday, gender, time, nickname } =
      signupRequestDto;

    const birthdayFormat = await String(birthday).replace(
      /(\d{4})(\d{2})(\d{2})/g,
      '$1-$2-$3',
    );
    const timeFormat = time
      ? await String(time).replace(/(\d{2})(\d{2})/g, '$1:$2')
      : null;

    try {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      const duplicatedUser = await this.userRepository.findOne({
        where: { email },
      });

      if (duplicatedUser) {
        throw new ConflictException();
      }

      const user = await this.userRepository.insert({
        email,
        password: hashedPassword,
      });

      const userId = user.raw.insertId;

      const member = await this.memberRepository.insert({
        userId,
        type: 'USER',
        nickname,
        gender,
        birthdayType,
        birthday: birthdayFormat,
        time: timeFormat,
      });

      const memberId = member.raw.insertId;
      const memberDto = {
        nickname,
        gender,
        birthdayType,
        birthday: birthdayFormat,
        time: timeFormat,
      };
      //만세력 변환
      const memberManse = await CommonConvert.convertBirthtimeToSaju(
        memberId,
        memberDto,
      );

      //멤버 만세력 추가
      await this.memberManseRepository.insert(memberManse);

      const payload = { email };
      const accessToken = await this.jwtService.sign(payload);

      return { accessToken };
    } catch (error) {
      if (error.status === 409) {
        throw new HttpException(
          '이미 사용중인 이메일 입니다.',
          HttpStatus.CONFLICT,
        );
      } else {
        throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  /**
   * 로그인
   * @param signinRequestDto
   * @returns
   */
  async signIn(signinRequestDto: SigninRequestDto) {
    const { email, password } = signinRequestDto;

    try {
      const user = await this.userRepository.findOne({ where: { email } });
      if (user && (await bcrypt.compare(password, user.password))) {
        //User 토큰 생성 (Secret + Payload)
        const payload = { email };
        const accessToken = await this.jwtService.sign(payload);

        return { accessToken };
      } else {
        throw new UnauthorizedException();
      }
    } catch (error) {
      if (error.status === 401) {
        throw new HttpException('로그인 실패', HttpStatus.UNAUTHORIZED);
      } else {
        throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  /**
   * 내 정보보기
   * @param user
   * @returns
   */
  async me(user: User) {
    try {
      const member = await this.memberRepository.find({
        where: { userId: user.id, type: 'USER' },
        relations: ['memberManse'],
        order: {
          createdAt: 'DESC',
        },
      });

      const memberFormat = member[0];
      const manseFormat = member[0].memberManse;
      delete memberFormat.memberManse;

      const me = await CommonFormat.convertMemberToSaju(
        memberFormat,
        manseFormat,
      );

      return {
        member: me['member'],
        saju: me['saju'],
        fortune: me['fortune'],
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
