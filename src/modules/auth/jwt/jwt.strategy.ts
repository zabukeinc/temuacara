import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstant } from '../constant/constants';
import { PrismaService } from '@/modules/prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(protected readonly prismaService: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConstant.secret,
    });
  }

  async validate(payload: {
    user_id: string;
    email: string;
    iat: number;
    exp: number;
  }) {
    const user = await this.prismaService.user.findFirst({
      where: { id: payload.user_id },
    });
    if (!user) return null;
    delete user.password;
    return user;
  }
}
