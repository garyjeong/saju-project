import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RateLimiterGuard, RateLimiterModule } from 'nestjs-rate-limiter';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { typeORMConfig } from './configs/typeorm.config';
import { GroupMemberModule } from './group-member/group-member.module';
import { GroupModule } from './group/group.module';
import { ManseModule } from './manse/manse.module';
import { MemberModule } from './member/member.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    UserModule,
    MemberModule,
    GroupModule,
    GroupMemberModule,
    ManseModule,
    RateLimiterModule.register({
      keyPrefix: 'test',
      points: 30,
      duration: 60,
      customResponseSchema: () => {
        return { statusCode: '429', message: 'Request has been blocked' };
      },
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RateLimiterGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
