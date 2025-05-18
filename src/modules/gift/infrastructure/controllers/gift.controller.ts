import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { BaseResponse } from '@/modules/base/responses/base.response';
import { UpdateGiftCommand } from '../../application/commands/update.gift.command.handler';
import { FindAllGiftQuery } from '../../application/queries/find.all.gift.query.handler';
import { DeleteGiftCommand } from '../../application/commands/delete-gift.command.handler';
import { GiftPaginatedResponse } from '../dtos/gift.paginated.response';
import {
  BulkGiftRequestdTO,
  GiftRequestDTO,
  DeleteGiftRequestDTO,
} from '../dtos/gift.request.dto';
import { FindAllGiftRequestDTO } from '../dtos/get.all.gift.request.dto';
import { GiftEntity } from '../../domain/entities/gift.entity';
import { CreateBulkGiftCommand } from '../../application/commands/create-bulk.gift.command.handler';
import { FindOneGiftQuery } from '../../application/queries/get.one.gift.query.handler';

@Controller({
  version: '1',
  path: 'gifts',
})
export class GiftController {
  constructor(
    protected readonly commandBus: CommandBus,
    protected readonly queryBus: QueryBus,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create gift' })
  @ApiBody({ type: BulkGiftRequestdTO })
  async bulkCreate(@Body() payload: BulkGiftRequestdTO) {
    const result = await this.commandBus.execute<
      CreateBulkGiftCommand,
      GiftEntity
    >(new CreateBulkGiftCommand(payload));

    return new BaseResponse<typeof result>(
      result,
      'Succesfully create new gift data',
      HttpStatus.CREATED,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get gift By Id' })
  @ApiParam({ name: 'id', type: 'string' })
  async findOne(@Param('id') id: string) {
    const result = await this.queryBus.execute<
      FindOneGiftQuery,
      GiftEntity
    >(new FindOneGiftQuery(id));

    return new BaseResponse<typeof result>(
      result,
      'Succesfully get gift data',
      HttpStatus.OK,
    );
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update gift' })
  @ApiBody({ type: GiftRequestDTO })
  @ApiParam({ name: 'id', type: 'string' })
  async update(@Param('id') id: string, @Body() payload: GiftRequestDTO) {
    const result = await this.commandBus.execute<
      UpdateGiftCommand,
      GiftEntity
    >(new UpdateGiftCommand({ updateProps: { id } }, payload));

    return new BaseResponse<typeof result>(
      result,
      'Succesfully update gift data',
      HttpStatus.OK,
    );
  }

  @Delete()
  @ApiOperation({ summary: 'Delete gift' })
  @ApiBody({ type: DeleteGiftRequestDTO })
  async delete(@Body() payload: DeleteGiftRequestDTO) {
    await this.commandBus.execute<DeleteGiftCommand, number>(
      new DeleteGiftCommand(payload),
    );

    return new BaseResponse(
      null,
      'Succesfully delete gift data',
      HttpStatus.NO_CONTENT,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Get gift By Filter' })
  @ApiResponse({ status: 200, description: 'Success' })
  async findAll(@Query() payload: FindAllGiftRequestDTO) {
    const query = new FindAllGiftQuery(payload);

    const result = await this.queryBus.execute<
      FindAllGiftQuery,
      GiftPaginatedResponse
    >(query);
    return result;
  }
}
