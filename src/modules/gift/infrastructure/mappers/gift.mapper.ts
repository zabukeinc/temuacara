import { Prisma, Gift } from '@prisma/client';
import {
  CreateGiftProps,
  FindAllGiftProps,
  UpdateGiftProps,
} from '../../domain/types/gift.type';
import { GiftPaginatedResponse } from '../dtos/gift.paginated.response';
import { GiftEntity } from '../../domain/entities/gift.entity';

export class GiftMapper {
  static toCreate(props: CreateGiftProps): Prisma.GiftCreateInput {
    return props;
  }

  static toUpdate(props: UpdateGiftProps): Prisma.GiftUpdateInput {
    return props;
  }

  static toFindAll(props: FindAllGiftProps): Prisma.GiftFindManyArgs {
    const page = Number(props.page) || 1;
    const limit = Number(props.limit) || 25;

    const aggregate: Prisma.GiftFindManyArgs = {
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        created_at: 'desc',
      },
    };

    const query: Prisma.GiftWhereInput = {};

    if (props.category) {
      query.category = {
        in: [props.category],
      };
    }

    if (props.platform) {
      query.platform = {
        in: [props.platform],
      };
    }

    if (props.responsibility) {
      query.responsibility = {
        hasSome: [props.responsibility],
      };
    }

    if (props.store) {
      query.store = {
        in: [props.store],
      };
    }

    if (props.status) {
      query.status = {
        in: [props.status],
      };
    }

    if (props.search) {
      query.OR = [
        {
          item: {
            contains: props.search,
            mode: 'insensitive',
          },
        },
      ];
    }

    aggregate.where = query;
    return aggregate;
  }

  static toDomain(model: Gift): GiftEntity {
    const entity = new GiftEntity();
    Object.assign(entity, { ...model });

    return entity;
  }

  static toPaginated(
    models: Gift[],
    count: number,
    page: number,
    limit: number,
  ): GiftPaginatedResponse {
    return {
      data: models.map((model) => this.toDomain(model)),
      count,
      limit: Number(limit) || 25,
      page: Number(page) || 1,
    };
  }
}
