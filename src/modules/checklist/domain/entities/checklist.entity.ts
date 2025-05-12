import { Checklist } from '@prisma/client';
import {
  ChecklistCategoryEnum,
  ChecklistSuggestionEnum,
} from '../types/checklist.type';

export class ChecklistEntity implements Checklist {
  checklist: string;
  id: number;
  category: string;
  suggestion: string;
  responsibility_groom: boolean;
  responsibility_bride: boolean;
  status_groom: boolean;
  status_bride: boolean;
  notes: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
  completed_at: Date;
}

export class ChecklistResponseEntity {
  id: number;
  checklist: string;
  category: ChecklistCategoryEnum;
  suggestion: ChecklistSuggestionEnum;
  responsibility: {
    groom: boolean;
    bride: boolean;
  };
  status: {
    groom: boolean;
    bride: boolean;
  };
  notes?: string;
  created_at: Date;
  updated_at: Date;
  completed_at?: Date;
}
