import { BaseFindAllProps } from '@/modules/base/requests/base.find-all.request';
import {
  ChecklistType,
  Prisma,
  SuggestionType,
  WeddingRoleType,
} from '@prisma/client';

export interface CreateChecklistProps {
  id: string;
  checklist: string;
  type: ChecklistType;
  suggestion: SuggestionType;
  responsibility: WeddingRoleType[];
  status: WeddingRoleType[];
  assigned_to: WeddingRoleType[];
  notes: string;
  completed_at: Date;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}

export interface FindAllChecklistProps extends BaseFindAllProps {
  types: string[];
  suggestions: string[];
  responsibilities: string[];
  statuses: string[];
  assigneess: string[];
  search: string;
}

export interface DeleteChecklistProps {
  ids: string[];
}

export type UpdateChecklistProps = Partial<CreateChecklistProps>;

export interface ChecklistRepositoryProp {
  updateProps?: { id: string };
  deleteProps?: { id: string };
}
