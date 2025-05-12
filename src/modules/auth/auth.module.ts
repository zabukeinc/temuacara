import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../prisma/prisma.module';
import { CqrsModule } from '@nestjs/cqrs';
import { jwtConstant } from './constant/constants';
import { AuthController } from './controllers/auth.controller';
import { LocalStrategy } from './jwt/local.strategy';
import { JwtStrategy } from './jwt/jwt.strategy';
import { USER_REPOSITORY } from '../user/di/user.di.token';
import { UserRepositoryMysql } from '../user/infrastructure/repositories/user.repository.mysql';
import { UserMapper } from '../user/infrastructure/mappers/user.mapper';
import { AuthService } from './service/auth.service';
import { OptionalJwtAuthGuard } from './jwt/optional-auth.guard';

@Module({
  imports: [
    PrismaModule,
    CqrsModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstant.secret,
      signOptions: {
        expiresIn: jwtConstant.expireIn,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    OptionalJwtAuthGuard,
    {
      provide: USER_REPOSITORY,
      useClass: UserRepositoryMysql,
    },
    UserMapper,
  ],
  exports: [AuthService],
})
export class AuthModule {}
