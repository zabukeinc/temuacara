import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ChecklistRepository } from '../interfaces/checklist.interface';
import { CHECKLIST_DI } from '../../di/checklist.di';
import { ChecklistEntity } from '../../domain/entities/checklist.entity';

export class FindOneChecklistQuery {
  constructor(public readonly id: string) {}
}

@QueryHandler(FindOneChecklistQuery)
export class FindOneChecklistQueryHandler
  implements IQueryHandler<FindOneChecklistQuery, ChecklistEntity>
{
  constructor(
    @Inject(CHECKLIST_DI)
    protected readonly repository: ChecklistRepository,
  ) {}

  async execute(query: FindOneChecklistQuery): Promise<ChecklistEntity> {
    const result = await this.repository.findOne({ findOneProps: query });
    return result;
  }
}
