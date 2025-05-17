import { Inject } from '@nestjs/common';
import {
  BaseCommandHandler,
  CommandActionType,
} from '@/modules/base/commands/base.command.handler';
import { CommandHandler } from '@nestjs/cqrs';
import { CHECKLIST_DI } from '../../di/checklist.di';
import { ChecklistRequestDTO } from '../../infrastructure/dtos/checklist.request.dto';
import { ChecklistRepository } from '../interfaces/checklist.interface';
import { ChecklistEntity } from '../../domain/entities/checklist.entity';

export class CreateChecklistCommand extends ChecklistRequestDTO {
  constructor(public request: ChecklistRequestDTO) {
    super();

    Object.assign(this, { ...request });
  }
}

@CommandHandler(CreateChecklistCommand)
export class CreateChecklistCommandHandler extends BaseCommandHandler<
  CreateChecklistCommand,
  ChecklistEntity
> {
  constructor(@Inject(CHECKLIST_DI) repository: ChecklistRepository) {
    super(repository);
  }

  actionType: CommandActionType = CommandActionType.CREATE;

  validate(command: CreateChecklistCommand): Promise<void | Error> {
    return;
  }
}
