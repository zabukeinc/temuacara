import { Inject } from '@nestjs/common';
import {
  BaseCommandHandler,
  CommandActionType,
} from '@/modules/base/commands/base.command.handler';
import { CommandHandler } from '@nestjs/cqrs';
import { InvitationEntity } from '../../domain/entities/invitation.entity';
import { BulkInvitationRequestDTO } from '../../infrastructure/dtos/invitation.request.dto';
import { InvitationRepository } from '../interfaces/invitation.interface';
import { INVITATION_DI } from '../../di/invitation.di';

export class BulkCreateInvitationCommand extends BulkInvitationRequestDTO {
  constructor(public request: BulkInvitationRequestDTO) {
    super();

    Object.assign(this, { ...request });
  }
}

@CommandHandler(BulkCreateInvitationCommand)
export class BulkCreateInvitationCommandHandler extends BaseCommandHandler<
  BulkCreateInvitationCommand,
  InvitationEntity[]
> {
  constructor(
    @Inject(INVITATION_DI) protected readonly repository: InvitationRepository,
  ) {
    super(repository);
  }

  actionType: CommandActionType = CommandActionType.CREATE;

  validate(command: BulkCreateInvitationCommand): Promise<void | Error> {
    return;
  }

  async execute(
    command: BulkCreateInvitationCommand,
  ): Promise<InvitationEntity[]> {
    return await this.repository.bulkCreate(command.request.payload);
  }
}
