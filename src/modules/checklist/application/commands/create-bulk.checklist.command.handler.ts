import { Inject } from '@nestjs/common';
import {
  BaseCommandHandler,
  CommandActionType,
} from '@/modules/base/commands/base.command.handler';
import { CommandHandler } from '@nestjs/cqrs';
import { CHECKLIST_DI } from '../../di/checklist.di';
import { BulkChecklistRequestdTO } from '../../infrastructure/dtos/checklist.request.dto';
import { ChecklistRepository } from '../interfaces/checklist.interface';
import { ChecklistEntity } from '../../domain/entities/checklist.entity';

export class CreateBulkChecklistCommand extends BulkChecklistRequestdTO {
  constructor(public request: BulkChecklistRequestdTO) {
    super();

    Object.assign(this, { ...request });
  }
}

@CommandHandler(CreateBulkChecklistCommand)
export class CreateBulkChecklistCommandHandler extends BaseCommandHandler<
  CreateBulkChecklistCommand,
  ChecklistEntity[]
> {
  constructor(
    @Inject(CHECKLIST_DI) protected readonly repository: ChecklistRepository,
  ) {
    super(repository);
  }

  actionType: CommandActionType = CommandActionType.CREATE;

  validate(command: CreateBulkChecklistCommand): Promise<void | Error> {
    return;
  }

  async execute(
    command: CreateBulkChecklistCommand,
  ): Promise<ChecklistEntity[]> {
    return await this.repository.bulkCreate(command.request.payload);
  }
}
