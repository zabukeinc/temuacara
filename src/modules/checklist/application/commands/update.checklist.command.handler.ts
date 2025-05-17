import {
  BaseCommandHandler,
  CommandActionType,
} from '@/modules/base/commands/base.command.handler';
import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { CHECKLIST_DI } from '../../di/checklist.di';
import { ChecklistRepositoryProp } from '../../domain/types/checklist.type';
import { ChecklistRequestDTO } from '../../infrastructure/dtos/checklist.request.dto';
import { ChecklistRepository } from '../interfaces/checklist.interface';
import { ChecklistEntity } from '../../domain/entities/checklist.entity';

export class UpdateChecklistCommand extends ChecklistRequestDTO {
  constructor(
    public identifierProp: ChecklistRepositoryProp,
    public payload: ChecklistRequestDTO,
  ) {
    super();
    Object.assign(this, { identifierProp, ...payload });
  }
}

@CommandHandler(UpdateChecklistCommand)
export class UpdateChecklistCommandHandler extends BaseCommandHandler<
  UpdateChecklistCommand,
  ChecklistEntity
> {
  constructor(@Inject(CHECKLIST_DI) repository: ChecklistRepository) {
    super(repository);
  }

  actionType: CommandActionType = CommandActionType.UPDATE;

  validate(command: UpdateChecklistCommand): Promise<void | Error> {
    return;
  }
}
