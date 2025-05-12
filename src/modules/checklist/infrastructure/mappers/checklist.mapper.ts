import { Prisma, Checklist } from '@prisma/client';
import {
  ChecklistCategoryEnum,
  ChecklistSuggestionEnum,
  CreateChecklistProps,
  FindAllChecklistProps,
  UpdateChecklistProps,
} from '../../domain/types/checklist.type';
import { ChecklistPaginatedResponse } from '../dtos/checklist.paginated.response';
import { ChecklistResponseEntity } from '../../domain/entities/checklist.entity';

export class ChecklistMapper {
  static toCreate(props: CreateChecklistProps): Prisma.ChecklistCreateInput {
    return {
      category: props.category,
      checklist: props.checklist,
      responsibility_bride: props.responsibility.bride,
      responsibility_groom: props.responsibility.groom,
      status_bride: props.status.bride,
      status_groom: props.status.groom,
      suggestion: props.suggestion,
      notes: props.notes,
      completed_at: undefined,
    };
  }

  static toUpdate(props: UpdateChecklistProps): Prisma.ChecklistUpdateInput {
    return {
      category: props.category,
      checklist: props.checklist,
      responsibility_bride: props.responsibility.bride,
      responsibility_groom: props.responsibility.groom,
      status_bride: props.status.bride,
      status_groom: props.status.groom,
      suggestion: props.suggestion,
      notes: props.notes,
      completed_at:
        props.status.bride || props.status.groom ? new Date() : undefined,
    };
  }

  static toFindAll(props: FindAllChecklistProps): Prisma.ChecklistFindManyArgs {
    const page = Number(props.page) || 1;
    const limit = Number(props.limit) || 25;

    const aggregate: Prisma.ChecklistFindManyArgs = {
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        created_at: 'desc',
      },
    };

    const query: Prisma.ChecklistWhereInput = {};

    if (props.keyword) {
      query.checklist = { contains: props.keyword };
    }

    if (props.category) {
      query.category = props.category;
    }

    aggregate.where = query;
    return aggregate;
  }

  static toResponse(model: Checklist): ChecklistResponseEntity {
    return {
      id: model.id,
      category: model.category as ChecklistCategoryEnum,
      checklist: model.checklist,
      responsibility: {
        bride: model.responsibility_bride,
        groom: model.responsibility_groom,
      },
      status: {
        bride: model.status_bride,
        groom: model.status_groom,
      },
      suggestion: model.suggestion as ChecklistSuggestionEnum,
      completed_at: model.completed_at,
      notes: model.notes,
      created_at: model.created_at,
      updated_at: model.updated_at,
    };
  }

  static toPaginated(
    models: Checklist[],
    count: number,
    page: number,
    limit: number,
  ): ChecklistPaginatedResponse {
    return {
      data: models.map((model) => this.toResponse(model)),
      count,
      limit: Number(limit) || 25,
      page: Number(page) || 1,
    };
  }
}
