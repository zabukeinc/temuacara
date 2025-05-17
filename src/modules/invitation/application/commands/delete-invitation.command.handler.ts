import {
  BaseCommandHandler,
  CommandActionType,
} from '@/modules/base/commands/base.command.handler';
import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { INVITATION_DI } from '../../di/invitation.di';
import { InvitationEntity } from '../../domain/entities/invitation.entity';
import { InvitationRepository } from '../interfaces/invitation.interface';
import { DeleteInvitationRequestDTO } from '../../infrastructure/dtos/invitation.request.dto';

export class DeleteInvitationCommand {
  constructor(protected readonly payload: DeleteInvitationRequestDTO) {
    Object.assign(this, { ...payload });
  }
}

@CommandHandler(DeleteInvitationCommand)
export class DeleteInvitationCommandHandler extends BaseCommandHandler<
  DeleteInvitationCommand,
  InvitationEntity[]
> {
  constructor(
    @Inject(INVITATION_DI)
    protected readonly repository: InvitationRepository,
  ) {
    super(repository);
  }

  actionType: CommandActionType = CommandActionType.DELETE;

  validate(command: DeleteInvitationCommand): Promise<void | Error> {
    return;
  }
}
