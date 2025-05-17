import { Inject } from '@nestjs/common';
import {
  BaseCommandHandler,
  CommandActionType,
} from '@/modules/base/commands/base.command.handler';
import { CommandHandler } from '@nestjs/cqrs';
import { InvitationEntity } from '../../domain/entities/invitation.entity';
import { InvitationRequestDTO } from '../../infrastructure/dtos/invitation.request.dto';
import { InvitationRepository } from '../interfaces/invitation.interface';
import { INVITATION_DI } from '../../di/invitation.di';

export class CreateInvitationCommand extends InvitationRequestDTO {
  constructor(public request: InvitationRequestDTO) {
    super();

    Object.assign(this, { ...request });
  }
}

@CommandHandler(CreateInvitationCommand)
export class CreateInvitationCommandHandler extends BaseCommandHandler<
  CreateInvitationCommand,
  InvitationEntity
> {
  constructor(@Inject(INVITATION_DI) repository: InvitationRepository) {
    super(repository);
  }

  actionType: CommandActionType = CommandActionType.CREATE;

  validate(command: CreateInvitationCommand): Promise<void | Error> {
    return;
  }
}
