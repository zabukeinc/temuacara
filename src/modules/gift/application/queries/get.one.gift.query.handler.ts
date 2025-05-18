import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GiftRepository } from '../interfaces/gift.interface';
import { GIFT_DI } from '../../di/gift.di';
import { GiftEntity } from '../../domain/entities/gift.entity';

export class FindOneGiftQuery {
  constructor(public readonly id: string) {}
}

@QueryHandler(FindOneGiftQuery)
export class FindOneGiftQueryHandler
  implements IQueryHandler<FindOneGiftQuery, GiftEntity>
{
  constructor(
    @Inject(GIFT_DI)
    protected readonly repository: GiftRepository,
  ) {}

  async execute(query: FindOneGiftQuery): Promise<GiftEntity> {
    const result = await this.repository.findOne({ findOneProps: query });
    return result;
  }
}
