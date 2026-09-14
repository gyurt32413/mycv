import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { CurrentUserInterceptor } from './interceptor/current-user.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    UsersService,
    AuthService,

    // 註冊全局攔截器，將 CurrentUserInterceptor 應用到所有請求
    {
      provide: APP_INTERCEPTOR,
      useClass: CurrentUserInterceptor,
    },
  ],
})
export class UsersModule {}
