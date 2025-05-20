import {
  Prisma,
  Checklist,
  WeddingRoleType,
  SuggestionType,
  ChecklistType,
} from '@prisma/client';
import {
  CreateChecklistProps,
  FindAllChecklistProps,
  UpdateChecklistProps,
} from '../../domain/types/checklist.type';
import { ChecklistPaginatedResponse } from '../dtos/checklist.paginated.response';
import { ChecklistEntity } from '../../domain/entities/checklist.entity';

export class ChecklistMapper {
  static toCreate(props: CreateChecklistProps): Prisma.ChecklistCreateInput {
    return {
      checklist: props.checklist,
      suggestion: props.suggestion,
      type: props.type,
      responsibility: props.responsibility,
      status: props.status,
      notes: props.notes,
      assigned_to: props.assigned_to,
    };
  }

  static toUpdate(props: UpdateChecklistProps): Prisma.ChecklistUpdateInput {
    const isCompleted =
      props.status &&
      props.responsibility &&
      JSON.stringify(props.status) === JSON.stringify(props.responsibility)
        ? new Date()
        : undefined;

    return {
      ...this.toCreate(props as CreateChecklistProps),
      completed_at: isCompleted,
    };
  }

  static toFindAll(props: FindAllChecklistProps): Prisma.ChecklistFindManyArgs {
    const page = Number(props.page) || 1;
    const limit = Number(props.limit) || 25;
    const sortBy = props.sort_by ?? 'created_at';
    const sortDirection = props.sort_direction ?? 'desc';

    const aggregate: Prisma.ChecklistFindManyArgs = {
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        [sortBy]: sortDirection,
      },
    };

    const query: Prisma.ChecklistWhereInput = {};

    if (props.responsibilities) {
      query.responsibility = {
        hasEvery: props.responsibilities as WeddingRoleType[],
      };
    }

    if (props.search) {
      query.checklist = { contains: props.search, mode: 'insensitive' };
    }

    if (props.suggestions) {
      query.suggestion = {
        in: props.suggestions as SuggestionType[],
      };
    }

    if (props.types) {
      query.type = {
        in: props.types as ChecklistType[],
      };
    }

    if (props.assigneess) {
      query.assigned_to = {
        hasEvery: props.assigneess as WeddingRoleType[],
      };
    }

    aggregate.where = query;
    return aggregate;
  }

  static toDomain(model: Checklist): ChecklistEntity {
    const entity = new ChecklistEntity();
    Object.assign(entity, { ...model });

    return entity;
  }

  static toPaginated(
    models: Checklist[],
    count: number,
    page: number,
    limit: number,
  ): ChecklistPaginatedResponse {
    return {
      data: models.map((model) => this.toDomain(model)),
      count,
      limit: Number(limit) || 25,
      page: Number(page) || 1,
    };
  }
}
