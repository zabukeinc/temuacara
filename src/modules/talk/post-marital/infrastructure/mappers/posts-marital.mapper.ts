import { Prisma, Talk, TalkEnum } from '@prisma/client';
import {
  CreatePostMaritalProps,
  FindAllPostMaritalProps,
  UpdatePostMaritalProps,
} from '../../domain/types/post-marital.type';
import { PostMaritalPaginatedResponse } from '../dtos/post-marital.paginated.response';

export class PostMaritalMapper {
  static toCreate(props: CreatePostMaritalProps): Prisma.TalkCreateInput {
    return {
      answered_by_bride: props.answered_by.bride,
      answered_by_groom: props.answered_by.groom,
      asked_by_bride: props.asked_by.bride,
      asked_by_groom: props.asked_by.groom,
      question: props.question,
      type: TalkEnum.POST_MARITAL,
      suggestion: props.suggestion,
      user: {
        connect: {
          id: 'bf7fc667-6f1e-4e47-90f8-b36c1d3a5d5e',
        },
      },
    };
  }

  static toUpdate(props: UpdatePostMaritalProps): Prisma.TalkUpdateInput {
    return {
      answered_by_bride: props.answered_by.bride,
      answered_by_groom: props.answered_by.groom,
      asked_by_bride: props.asked_by.bride,
      asked_by_groom: props.asked_by.groom,
      question: props.question,
      type: TalkEnum.POST_MARITAL,
      suggestion: props.suggestion,
    };
  }

  static toFindAll(props: FindAllPostMaritalProps): Prisma.TalkFindManyArgs {
    const page = Number(props.page) || 1;
    const limit = Number(props.limit) || 25;

    const aggregate: Prisma.TalkFindManyArgs = {
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        created_at: 'desc',
      },
    };

    const query: Prisma.TalkWhereInput = {};

    if (props.keyword) {
      query.question = { contains: props.keyword };
    }

    aggregate.where = query;
    return aggregate;
  }

  static toPaginated(
    models: Talk[],
    count: number,
    page: number,
    limit: number,
  ): PostMaritalPaginatedResponse {
    return {
      data: models,
      count,
      limit: Number(limit) || 25,
      page: Number(page) || 1,
    };
  }
}
