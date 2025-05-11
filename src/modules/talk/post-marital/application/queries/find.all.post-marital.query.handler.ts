import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindAllPostMaritalRequestDTO } from '../../infrastructure/dtos/get.all.post-marital.request.dto';
import { PostMaritalPaginatedResponse } from '../../infrastructure/dtos/post-marital.paginated.response';
import { Inject } from '@nestjs/common';
import { POST_MARITAL_DI } from '../../di/post-marital.di';
import { PostMaritalRepository } from '../interfaces/post-marital.interface';

export class FindAllPostMaritalQuery extends FindAllPostMaritalRequestDTO {
  constructor(protected readonly payload: FindAllPostMaritalRequestDTO) {
    super();
    Object.assign(this, { ...payload });
  }
}

@QueryHandler(FindAllPostMaritalQuery)
export class FindAllPostMaritalQueryHandler
  implements
    IQueryHandler<FindAllPostMaritalQuery, PostMaritalPaginatedResponse>
{
  constructor(
    @Inject(POST_MARITAL_DI)
    protected readonly repository: PostMaritalRepository,
  ) {}

  async execute(query: FindAllPostMaritalQuery): Promise<any> {
    const result = await this.repository.findAll(query);
    return Promise.resolve(result);
  }
}
