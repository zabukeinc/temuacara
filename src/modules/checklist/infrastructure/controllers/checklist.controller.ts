import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { CreateChecklistCommand } from '../../application/commands/create.checklist.command.handler';
import { BaseResponse } from '@/modules/base/responses/base.response';
import { UpdateChecklistCommand } from '../../application/commands/update.checklist.command.handler';
import { FindAllChecklistQuery } from '../../application/queries/find.all.checklist.query.handler';
import { DeleteChecklistCommand } from '../../application/commands/delete-checklist.command.handler';
import { ChecklistPaginatedResponse } from '../dtos/checklist.paginated.response';
import {
  BulkChecklistRequestdTO,
  ChecklistRequestDTO,
  DeleteChecklistRequestDTO,
} from '../dtos/checklist.request.dto';
import { FindAllChecklistRequestDTO } from '../dtos/get.all.checklist.request.dto';
import { ChecklistEntity } from '../../domain/entities/checklist.entity';
import { CreateBulkChecklistCommand } from '../../application/commands/create-bulk.checklist.command.handler';

@Controller({
  version: '1',
  path: 'checklists',
})
export class ChecklistController {
  constructor(
    protected readonly commandBus: CommandBus,
    protected readonly queryBus: QueryBus,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create checklist' })
  @ApiBody({ type: BulkChecklistRequestdTO })
  async bulkCreate(@Body() payload: BulkChecklistRequestdTO) {
    const result = await this.commandBus.execute<
      CreateBulkChecklistCommand,
      ChecklistEntity
    >(new CreateBulkChecklistCommand(payload));

    return new BaseResponse<typeof result>(
      result,
      'Succesfully create new checklist data',
      HttpStatus.CREATED,
    );
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update checklist' })
  @ApiBody({ type: ChecklistRequestDTO })
  @ApiParam({ name: 'id', type: 'string' })
  async update(@Param('id') id: string, @Body() payload: ChecklistRequestDTO) {
    const result = await this.commandBus.execute<
      UpdateChecklistCommand,
      ChecklistEntity
    >(new UpdateChecklistCommand({ updateProps: { id } }, payload));

    return new BaseResponse<typeof result>(
      result,
      'Succesfully update checklist data',
      HttpStatus.OK,
    );
  }

  @Delete()
  @ApiOperation({ summary: 'Delete checklist' })
  @ApiBody({ type: DeleteChecklistRequestDTO })
  async delete(@Body() payload: DeleteChecklistRequestDTO) {
    await this.commandBus.execute<DeleteChecklistCommand, number>(
      new DeleteChecklistCommand(payload),
    );

    return new BaseResponse(
      null,
      'Succesfully delete checklist data',
      HttpStatus.NO_CONTENT,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Get checklist By Filter' })
  @ApiResponse({ status: 200, description: 'Success' })
  async findAll(@Query() payload: FindAllChecklistRequestDTO) {
    const query = new FindAllChecklistQuery(payload);

    const result = await this.queryBus.execute<
      FindAllChecklistQuery,
      ChecklistPaginatedResponse
    >(query);
    return result;
  }
}
