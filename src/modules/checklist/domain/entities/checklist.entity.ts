import {
  Checklist,
  ChecklistType,
  WeddingRoleType,
  SuggestionType,
} from '@prisma/client';

export class ChecklistEntity implements Checklist {
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
