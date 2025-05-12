import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from '../jwt/local-auth.guard';
import { LoginRequest } from '../dtos/request/login.request';
import { AuthService } from '../service/auth.service';
import { ForgotPasswordRequest } from '../dtos/request/forgot-password.request';
import { UpdatePasswordRequest } from '../dtos/request/update-password.request';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  @UseGuards(LocalAuthGuard)
  @ApiOperation({
    summary: 'Login',
  })
  @ApiBody({
    type: LoginRequest,
  })
  @ApiResponse({
    status: 200,
    description: 'Success',
  })
  async login(@Body() request: LoginRequest) {
    return this.authService.login(request);
  }

  @Post('/forgot-password')
  @ApiOperation({
    summary: 'Forgot Password',
  })
  @ApiBody({
    type: ForgotPasswordRequest,
  })
  @ApiResponse({
    status: 200,
    description: 'Success',
  })
  async forgotPassword(@Body() request: ForgotPasswordRequest) {
    return this.authService.forgotPassword(request.email);
  }

  @Post('/reset-password')
  @ApiOperation({
    summary: 'Reset Password',
  })
  @ApiBody({
    type: UpdatePasswordRequest,
  })
  @ApiResponse({
    status: 200,
    description: 'Success',
  })
  async resetPassword(@Body() request: UpdatePasswordRequest) {
    return this.authService.resetPassword(request.token, request.password);
  }
}
