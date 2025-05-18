import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GiftRepository } from '../interfaces/gift.interface';
import { GIFT_DI } from '../../di/gift.di';
import { GiftPaginatedResponse } from '../../infrastructure/dtos/gift.paginated.response';
import { FindAllGiftRequestDTO } from '../../infrastructure/dtos/get.all.gift.request.dto';

export class FindAllGiftQuery extends FindAllGiftRequestDTO {
  constructor(protected readonly payload: FindAllGiftRequestDTO) {
    super();
    Object.assign(this, { ...payload });
  }
}

@QueryHandler(FindAllGiftQuery)
export class FindAllGiftQueryHandler
  implements IQueryHandler<FindAllGiftQuery, GiftPaginatedResponse>
{
  constructor(
    @Inject(GIFT_DI)
    protected readonly repository: GiftRepository,
  ) {}

  async execute(query: FindAllGiftQuery): Promise<any> {
    const result = await this.repository.findAll(query);
    return Promise.resolve(result);
  }
}
