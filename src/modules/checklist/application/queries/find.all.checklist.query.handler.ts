import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ChecklistRepository } from '../interfaces/checklist.interface';
import { CHECKLIST_DI } from '../../di/checklist.di';
import { ChecklistPaginatedResponse } from '../../infrastructure/dtos/checklist.paginated.response';
import { FindAllChecklistRequestDTO } from '../../infrastructure/dtos/get.all.checklist.request.dto';

export class FindAllChecklistQuery extends FindAllChecklistRequestDTO {
  constructor(protected readonly payload: FindAllChecklistRequestDTO) {
    super();
    Object.assign(this, { ...payload });
  }
}

@QueryHandler(FindAllChecklistQuery)
export class FindAllChecklistQueryHandler
  implements IQueryHandler<FindAllChecklistQuery, ChecklistPaginatedResponse>
{
  constructor(
    @Inject(CHECKLIST_DI)
    protected readonly repository: ChecklistRepository,
  ) {}

  async execute(query: FindAllChecklistQuery): Promise<any> {
    const result = await this.repository.findAll(query);
    return Promise.resolve(result);
  }
}
