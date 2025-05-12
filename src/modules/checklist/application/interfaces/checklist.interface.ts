import { BaseRepository } from '@/modules/base/repositories/base.repository';
import {
  CreateChecklistProps,
  UpdateChecklistProps,
  FindAllChecklistProps,
  DeleteChecklistProps,
} from '../../domain/types/checklist.type';
import { ChecklistResponseEntity } from '../../domain/entities/checklist.entity';

export interface ChecklistRepository
  extends BaseRepository<
    ChecklistResponseEntity,
    CreateChecklistProps,
    UpdateChecklistProps,
    DeleteChecklistProps,
    FindAllChecklistProps,
    ChecklistProps
  > {
  baseUpdate(
    prop: ChecklistProps,
    payload: UpdateChecklistProps,
  ): Promise<ChecklistResponseEntity>;
}

export interface ChecklistProps {
  updateProps?: { id: number };
  deleteProps?: { id: number };
}
