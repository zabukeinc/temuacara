export enum ChecklistCategoryEnum {
  PREPARATION = 'PREPARATION',
  DOCUMENT = 'DOCUMENT',
  HEALTH = 'HEALTH',
  HONEYMOON = 'HONEYMOON',
}

export enum ChecklistSuggestionEnum {
  MUST = 'MUST',
  RECOMMENDED = 'RECOMMENDED',
  OPTIONAL = 'OPTIONAL',
}

export interface ChecklistResponsibilityProps {
  groom: boolean;
  bride: boolean;
}

export interface CreateChecklistProps {
  checklist: string;
  category: ChecklistCategoryEnum;
  suggestion: ChecklistSuggestionEnum;
  responsibility: ChecklistResponsibilityProps;
  status: ChecklistResponsibilityProps;
  notes?: string | null;
  completed_at?: string | null;
}

export interface FindAllChecklistProps {
  page: number;
  limit: number;
  keyword: string;
  category: ChecklistCategoryEnum;
}

export interface DeleteChecklistProps {
  ids: number[];
}

export type UpdateChecklistProps = Partial<CreateChecklistProps>;

export interface ChecklistRepositoryProp {
  updateProps?: { id: number };
  deleteProps?: { id: number };
}
