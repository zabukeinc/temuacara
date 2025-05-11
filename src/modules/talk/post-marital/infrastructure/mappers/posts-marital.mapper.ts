import { Prisma, Talk, TalkEnum } from '@prisma/client';
import {
  CreatePostMaritalProps,
  FindAllPostMaritalProps,
  UpdatePostMaritalProps,
} from '../../domain/types/post-marital.type';
import { PostMaritalPaginatedResponse } from '../dtos/post-marital.paginated.response';
import { PostMaritalResponseEntity } from '../../domain/entities/post-marital.entity';

export class PostMaritalMapper {
  static toCreate(props: CreatePostMaritalProps): Prisma.TalkCreateInput {
    return {
      answered_by_bride: props.answered_by.bride,
      answered_by_groom: props.answered_by.groom,
      asked_by_bride: props.asked_by.bride,
      asked_by_groom: props.asked_by.groom,
      question: props.question,
      type: props.type,
      suggestion: props.suggestion,
      answer_notes: props.answer_notes,
      is_bride_answerd: props.answered_by.is_bride_answerd,
      is_groom_answerd: props.answered_by.is_groom_answerd,
    };
  }

  static toUpdate(props: UpdatePostMaritalProps): Prisma.TalkUpdateInput {
    return {
      answered_by_bride: props.answered_by.bride,
      answered_by_groom: props.answered_by.groom,
      asked_by_bride: props.asked_by.bride,
      asked_by_groom: props.asked_by.groom,
      question: props.question,
      type: props.type,
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

    if (props.type) {
      query.type = props.type;
    }

    aggregate.where = query;
    return aggregate;
  }

  static toResponse(model: Talk): PostMaritalResponseEntity {
    return {
      id: model.id,
      type: model.type,
      answer_notes: model.answer_notes,
      answered_at: new Date(model.answered_at),
      answered_by: {
        bride: model.answered_by_bride,
        groom: model.answered_by_groom,
        is_bride_answerd: model.is_bride_answerd,
        is_groom_answerd: model.is_groom_answerd,
      },
      asked_by: {
        bride: model.asked_by_bride,
        groom: model.asked_by_groom,
      },
      question: model.question,
      suggestion: model.suggestion,
    };
  }

  static toPaginated(
    models: Talk[],
    count: number,
    page: number,
    limit: number,
  ): PostMaritalPaginatedResponse {
    return {
      data: models.map((model) => this.toResponse(model)),
      count,
      limit: Number(limit) || 25,
      page: Number(page) || 1,
    };
  }
}
