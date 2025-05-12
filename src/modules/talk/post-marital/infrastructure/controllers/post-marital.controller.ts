import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import {
  DeletePostMaritalRequestDTO,
  PostMaritalRequestDTO,
} from '../dtos/post-marital.request.dto';
import { CreatePostMaritalCommand } from '../../application/commands/create.post-marital.command.handler';
import { BaseResponse } from '@/modules/base/responses/base.response';
import { PostMaritalResponseEntity } from '../../domain/entities/post-marital.entity';
import { UpdatePostMaritalCommand } from '../../application/commands/update.post-marital.command.handler';
import { FindAllPostMaritalRequestDTO } from '../dtos/get.all.post-marital.request.dto';
import { FindAllPostMaritalQuery } from '../../application/queries/find.all.post-marital.query.handler';
import { PostMaritalPaginatedResponse } from '../dtos/post-marital.paginated.response';
import { DeletePostMaritalCommand } from '../../application/commands/delete-post-marital.command.handler';

@Controller({
  version: '1',
  path: 'talks',
})
export class PostMaritalController {
  constructor(
    protected readonly commandBus: CommandBus,
    protected readonly queryBus: QueryBus,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create Talk' })
  @ApiBody({ type: PostMaritalRequestDTO })
  async create(@Body() payload: PostMaritalRequestDTO) {
    const result = await this.commandBus.execute<
      CreatePostMaritalCommand,
      PostMaritalResponseEntity
    >(new CreatePostMaritalCommand(payload));

    return new BaseResponse<typeof result>(result);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update Talk' })
  @ApiBody({ type: PostMaritalRequestDTO })
  @ApiParam({ name: 'id', type: 'number' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: PostMaritalRequestDTO,
  ) {
    const result = await this.commandBus.execute<
      UpdatePostMaritalCommand,
      PostMaritalResponseEntity
    >(new UpdatePostMaritalCommand({ updateProps: { id } }, payload));

    return new BaseResponse<typeof result>(result);
  }

  @Delete()
  @ApiOperation({ summary: 'Delete Talk' })
  @ApiBody({ type: DeletePostMaritalRequestDTO })
  async delete(@Body() payload: DeletePostMaritalRequestDTO) {
    const result = await this.commandBus.execute<
      DeletePostMaritalCommand,
      number
    >(new DeletePostMaritalCommand(payload));

    return new BaseResponse<typeof result>(result);
  }

  @Get()
  @ApiOperation({ summary: 'Get Talk By Filter' })
  @ApiResponse({ status: 200, description: 'Success' })
  async findAll(@Query() payload: FindAllPostMaritalRequestDTO) {
    const query = new FindAllPostMaritalQuery(payload);

    const result = await this.queryBus.execute<
      FindAllPostMaritalQuery,
      PostMaritalPaginatedResponse
    >(query);
    return result;
  }
}
