import { BaseResponse } from '@/modules/base/responses/base.response';
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
import { DeleteInvitationCommand } from '../../application/commands/delete-invitation.command.handler';
import { UpdateInvitationCommand } from '../../application/commands/update.checklist.command.handler';
import { FindAllInvitationQuery } from '../../application/queries/find-all.invitation.query';
import { InvitationEntity } from '../../domain/entities/invitation.entity';
import { FindAllInvitationRequestDTO } from '../dtos/get.all.invitation.request.dto';
import { InvitationPaginatedResponse } from '../dtos/invitation.paginated.response';
import {
  InvitationRequestDTO,
  DeleteInvitationRequestDTO,
  BulkInvitationRequestDTO,
} from '../dtos/invitation.request.dto';
import { BulkCreateInvitationCommand } from '../../application/commands/create-bulk.invitation.command.handler';
import { FindOneInvitationQuery } from '../../application/queries/find-one.invitation.query';

@Controller({
  version: '1',
  path: 'invitations',
})
export class InvitationController {
  constructor(
    protected readonly commandBus: CommandBus,
    protected readonly queryBus: QueryBus,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create Invitation ' })
  @ApiBody({ type: BulkInvitationRequestDTO })
  async create(@Body() payload: BulkInvitationRequestDTO) {
    const result = await this.commandBus.execute<
      BulkCreateInvitationCommand,
      InvitationEntity
    >(new BulkCreateInvitationCommand(payload));

    return new BaseResponse<typeof result>(
      result,
      'Succesfully create new Invitation data',
      HttpStatus.CREATED,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Invitation By Id' })
  @ApiParam({ name: 'id', type: 'string' })
  async findOne(@Param('id') id: string) {
    const result = await this.queryBus.execute<
      FindOneInvitationQuery,
      InvitationEntity
    >(new FindOneInvitationQuery(id));

    return new BaseResponse<typeof result>(
      result,
      'Succesfully get Invitation data',
      HttpStatus.OK,
    );
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update Invitation' })
  @ApiBody({ type: InvitationRequestDTO })
  @ApiParam({ name: 'id', type: 'string' })
  async update(@Param('id') id: string, @Body() payload: InvitationRequestDTO) {
    const result = await this.commandBus.execute<
      UpdateInvitationCommand,
      InvitationEntity
    >(new UpdateInvitationCommand({ updateProps: { id } }, payload));

    return new BaseResponse<typeof result>(
      result,
      'Succesfully update Invitation data',
      HttpStatus.OK,
    );
  }

  @Delete()
  @ApiOperation({ summary: 'Delete Invitation' })
  @ApiBody({ type: DeleteInvitationRequestDTO })
  async delete(@Body() payload: DeleteInvitationRequestDTO) {
    await this.commandBus.execute<DeleteInvitationCommand, number>(
      new DeleteInvitationCommand(payload),
    );

    return new BaseResponse(
      null,
      'Succesfully delete Invitation data',
      HttpStatus.NO_CONTENT,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Get Invitation By Filter' })
  @ApiResponse({ status: 200, description: 'Success' })
  async findAll(@Query() payload: FindAllInvitationRequestDTO) {
    const query = new FindAllInvitationQuery(payload);

    const result = await this.queryBus.execute<
      FindAllInvitationQuery,
      InvitationPaginatedResponse
    >(query);
    return result;
  }
}
