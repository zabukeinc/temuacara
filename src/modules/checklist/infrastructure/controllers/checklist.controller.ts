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
import { CreateChecklistCommand } from '../../application/commands/create.checklist.command.handler';
import { BaseResponse } from '@/modules/base/responses/base.response';
import { ChecklistResponseEntity } from '../../domain/entities/checklist.entity';
import { UpdateChecklistCommand } from '../../application/commands/update.checklist.command.handler';
import { FindAllChecklistQuery } from '../../application/queries/find.all.checklist.query.handler';
import { DeleteChecklistCommand } from '../../application/commands/delete-checklist.command.handler';
import { ChecklistPaginatedResponse } from '../dtos/checklist.paginated.response';
import {
  ChecklistRequestDTO,
  DeleteChecklistRequestDTO,
} from '../dtos/checklist.request.dto';
import { FindAllChecklistRequestDTO } from '../dtos/get.all.checklist.request.dto';

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
  @ApiBody({ type: ChecklistRequestDTO })
  async create(@Body() payload: ChecklistRequestDTO) {
    const result = await this.commandBus.execute<
      CreateChecklistCommand,
      ChecklistResponseEntity
    >(new CreateChecklistCommand(payload));

    return new BaseResponse<typeof result>(result);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update checklist' })
  @ApiBody({ type: ChecklistRequestDTO })
  @ApiParam({ name: 'id', type: 'number' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: ChecklistRequestDTO,
  ) {
    const result = await this.commandBus.execute<
      UpdateChecklistCommand,
      ChecklistResponseEntity
    >(new UpdateChecklistCommand({ updateProps: { id } }, payload));

    return new BaseResponse<typeof result>(result);
  }

  @Delete()
  @ApiOperation({ summary: 'Delete checklist' })
  @ApiBody({ type: DeleteChecklistRequestDTO })
  async delete(@Body() payload: DeleteChecklistRequestDTO) {
    const result = await this.commandBus.execute<
      DeleteChecklistCommand,
      number
    >(new DeleteChecklistCommand(payload));

    return new BaseResponse<typeof result>(result);
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
