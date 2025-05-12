import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { CreateUserRequest } from '../dtos/requests/create.customer.request';
import { CreateUserCommand } from '../../application/command/create/create.user.command';
import { CreateUserResponse } from '../dtos/responses/create.user.response';
import { UpdateUserRequest } from '../dtos/requests/update.user.request';
import { UpdateUserCommand } from '../../application/command/update/update.user.command.handler';
import { GetOneUserByIdQuery } from '../../application/query/get-one-user-by-id/get.one.user.by.id.query.handler';
import { JwtAuthGuard } from '@/modules/auth/jwt/jwt-auth.guard';
import { BaseResponse } from '@/modules/base/responses/base.response';

@Controller('users')
@ApiTags('User')
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create User' })
  @ApiBody({ type: CreateUserRequest })
  @ApiResponse({ status: 200, description: 'Success' })
  async create(@Body() request: CreateUserRequest) {
    const command = new CreateUserCommand(request);

    const result = await this.commandBus.execute(command);

    return new CreateUserResponse(result);
  }

  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard)
  @Post('/update')
  @ApiOperation({ summary: 'Update User' })
  @ApiBody({ type: UpdateUserRequest })
  @ApiResponse({ status: 200, description: 'Success' })
  async update(@Body() request: UpdateUserRequest, @Req() req) {
    const userId = req?.user?.user_id ?? req?.user?.id;
    request.id = userId;
    const command = new UpdateUserCommand(request);
    const result = await this.commandBus.execute(command);
    return new BaseResponse(result);
  }

  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  @ApiOperation({ summary: 'Get User Profile' })
  @ApiResponse({ status: 200, description: 'Success' })
  async profile(@Req() req) {
    const user = req?.user?.user_id ?? req?.user?.id;

    const query = new GetOneUserByIdQuery(user);
    const result = await this.queryBus.execute(query);
    return new BaseResponse(result);
  }
}
