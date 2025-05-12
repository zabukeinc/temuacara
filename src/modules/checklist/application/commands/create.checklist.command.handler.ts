import { Inject } from '@nestjs/common';
import {
  BaseCommandHandler,
  CommandActionType,
} from '@/modules/base/commands/base.command.handler';
import { CommandHandler } from '@nestjs/cqrs';
import { CHECKLIST_DI } from '../../di/checklist.di';
import { ChecklistResponseEntity } from '../../domain/entities/checklist.entity';
import { ChecklistRequestDTO } from '../../infrastructure/dtos/checklist.request.dto';
import { ChecklistRepository } from '../interfaces/checklist.interface';

export class CreateChecklistCommand extends ChecklistRequestDTO {
  constructor(public payload: ChecklistRequestDTO) {
    super();

    Object.assign(this, { ...payload });
  }
}

@CommandHandler(CreateChecklistCommand)
export class CreateChecklistCommandHandler extends BaseCommandHandler<
  CreateChecklistCommand,
  ChecklistResponseEntity
> {
  constructor(@Inject(CHECKLIST_DI) repository: ChecklistRepository) {
    super(repository);
  }

  actionType: CommandActionType = CommandActionType.CREATE;

  validate(command: CreateChecklistCommand): Promise<void | Error> {
    return;
  }
}
