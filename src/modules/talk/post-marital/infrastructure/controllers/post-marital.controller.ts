import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiBody } from '@nestjs/swagger';
import { PostMaritalRequestDTO } from '../dtos/post-marital.request.dto';
import { CreatePostMaritalCommand } from '../../application/commands/create.post-marital.command.handler';
import { BaseResponse } from '@/modules/base/responses/base.response';
import { PostMaritalEntity } from '../../domain/entities/post-marital.entity';

@Controller({
  version: '1',
  path: 'post-maritals',
})
export class PostMaritalController {
  constructor(protected readonly commandBus: CommandBus) {}

  @Post()
  @ApiBody({ type: PostMaritalRequestDTO })
  async create(@Body() payload: PostMaritalRequestDTO) {
    const result = await this.commandBus.execute<
      CreatePostMaritalCommand,
      PostMaritalEntity
    >(new CreatePostMaritalCommand(payload));

    return new BaseResponse<typeof result>(result);
  }
}
