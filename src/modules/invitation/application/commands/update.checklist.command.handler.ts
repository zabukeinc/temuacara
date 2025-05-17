import {
  BaseCommandHandler,
  CommandActionType,
} from '@/modules/base/commands/base.command.handler';
import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { INVITATION_DI } from '../../di/invitation.di';
import { InvitationEntity } from '../../domain/entities/invitation.entity';
import { InvitationRequestDTO } from '../../infrastructure/dtos/invitation.request.dto';
import { InvitationRepository } from '../interfaces/invitation.interface';
import { InvitationRepositoryProp } from '../../domain/types/invitation.type';

export class UpdateInvitationCommand extends InvitationRequestDTO {
  constructor(
    public identifierProp: InvitationRepositoryProp,
    public payload: InvitationRequestDTO,
  ) {
    super();
    Object.assign(this, { identifierProp, ...payload });
  }
}

@CommandHandler(UpdateInvitationCommand)
export class UpdateInvitationCommandHandler extends BaseCommandHandler<
  UpdateInvitationCommand,
  InvitationEntity
> {
  constructor(@Inject(INVITATION_DI) repository: InvitationRepository) {
    super(repository);
  }

  actionType: CommandActionType = CommandActionType.UPDATE;

  validate(command: UpdateInvitationCommand): Promise<void | Error> {
    return;
  }
}
