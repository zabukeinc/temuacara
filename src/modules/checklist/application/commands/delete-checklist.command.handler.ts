import {
  BaseCommandHandler,
  CommandActionType,
} from '@/modules/base/commands/base.command.handler';
import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { CHECKLIST_DI } from '../../di/checklist.di';
import { DeleteChecklistRequestDTO } from '../../infrastructure/dtos/checklist.request.dto';
import { ChecklistRepository } from '../interfaces/checklist.interface';
import { ChecklistEntity } from '../../domain/entities/checklist.entity';

export class DeleteChecklistCommand {
  constructor(protected readonly payload: DeleteChecklistRequestDTO) {
    Object.assign(this, { ...payload });
  }
}

@CommandHandler(DeleteChecklistCommand)
export class DeleteChecklistCommandHandler extends BaseCommandHandler<
  DeleteChecklistCommand,
  ChecklistEntity[]
> {
  constructor(
    @Inject(CHECKLIST_DI)
    protected readonly repository: ChecklistRepository,
  ) {
    super(repository);
  }

  actionType: CommandActionType = CommandActionType.DELETE;

  validate(command: DeleteChecklistCommand): Promise<void | Error> {
    return;
  }
}
