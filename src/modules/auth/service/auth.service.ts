import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { jwtConstant } from '../constant/constants';
import { ApiErrorResponse } from '@/modules/base/responses/api-error-response';
import { BaseResponse } from '@/modules/base/responses/base.response';
import { UserRepository } from '@/modules/user/application/interfaces/user.repository';
import { USER_REPOSITORY } from '@/modules/user/di/user.di.token';

@Injectable()
export class AuthService {
  constructor(
    @Inject(USER_REPOSITORY)
    private userRepo: UserRepository,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userRepo.findOneByEmail(email);

    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  validateToken(token: string) {
    return this.jwtService.verify(token, {
      secret: jwtConstant.secret,
    });
  }

  async login(user: any) {
    const userData = await this.userRepo.findOneByEmail(user.email);

    if (userData.reset_token === null) {
      const payload = {
        user_id: userData.id,
        email: user.email,
      };

      return {
        user_id: userData.id,
        email: user.email,
        access_token: this.jwtService.sign(payload),
      };
    } else {
      return new ApiErrorResponse({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'User need to reset password',
        error: 'Bad Request',
        correlationId: '',
      });
    }
  }

  async forgotPassword(email: string) {
    const user = await this.userRepo.findOneByEmail(email);

    if (user !== undefined) {
      const payload = {
        user_id: user.id,
        email: user.email,
      };

      const token = this.jwtService.sign(payload, {
        secret: jwtConstant.secret,
        expiresIn: Number(jwtConstant.expireIn),
      });

      const nodemailer = require('nodemailer');
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: 'temuacara@gmail.com',
          pass: 'thvg xwuk oksy byqp',
        },
      });

      const data = {
        from: 'TemuAcara',
        to: email,
        subject: 'Reset Password',
        html: `<h1>Reset Password</h1>
        <p>Click this <a href="url/reset-password/${token}">link</a> to reset your password</p>
        `,
      };

      const isUpdate = await this.userRepo.updateToken(user.id, token);

      if (isUpdate) {
        transporter.sendMail(data, function (err, info) {
          if (err) {
            return new ApiErrorResponse({
              statusCode: HttpStatus.BAD_REQUEST,
              message: 'Mail Not Sent',
              error: 'Bad Request',
              correlationId: '',
            });
          } else {
            console.log(info);
            return new BaseResponse({
              message: 'Email sent successfully',
            });
          }
        });
      } else {
        return new ApiErrorResponse({
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Reset Password Link Error',
          error: 'Bad Request',
          correlationId: '',
        });
      }
    } else {
      return new ApiErrorResponse({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Email not found',
        error: 'Bad Request',
        correlationId: '',
      });
    }
  }

  async resetPassword(token: string, password: string) {
    try {
      const payload = this.jwtService.verify(token);

      if (payload) {
        const user = await this.userRepo.findOneByEmail(payload.email);

        if (user.reset_token !== null) {
          const salt = await bcrypt.genSalt();
          const hash = await bcrypt.hash(password, salt);
          const isUpdatePassword = await this.userRepo.updatePassword(
            user.id,
            hash,
          );

          if (isUpdatePassword) {
            return new BaseResponse({
              message: 'Password updated',
            });
          } else {
            return new ApiErrorResponse({
              statusCode: HttpStatus.BAD_REQUEST,
              message: 'Password update error',
              error: 'Bad Request',
              correlationId: '',
            });
          }
        }
        {
          return new ApiErrorResponse({
            statusCode: HttpStatus.BAD_REQUEST,
            message: 'No request for reset password',
            error: 'Bad Request',
            correlationId: '',
          });
        }
      }
    } catch (err) {
      console.log(err);
      return new ApiErrorResponse({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Token is not valid',
        error: 'Bad Request',
        correlationId: '',
      });
    }
  }
}
