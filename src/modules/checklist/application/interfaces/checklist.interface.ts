import { BaseRepository } from '@/modules/base/repositories/base.repository';
import {
  CreateChecklistProps,
  UpdateChecklistProps,
  FindAllChecklistProps,
  DeleteChecklistProps,
} from '../../domain/types/checklist.type';
import { ChecklistEntity } from '../../domain/entities/checklist.entity';

export interface ChecklistRepository
  extends BaseRepository<
    ChecklistEntity,
    CreateChecklistProps,
    UpdateChecklistProps,
    DeleteChecklistProps,
    FindAllChecklistProps,
    ChecklistProps
  > {
  baseUpdate(
    prop: ChecklistProps,
    payload: UpdateChecklistProps,
  ): Promise<ChecklistEntity>;
  bulkCreate(payload: CreateChecklistProps[]): Promise<ChecklistEntity[]>;
}

export interface ChecklistProps {
  updateProps?: { id: string };
  deleteProps?: { id: string };
  findOneProps?: { id: string };
}
