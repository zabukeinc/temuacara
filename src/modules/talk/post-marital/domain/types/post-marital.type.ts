export interface AskedPostMarital {
  groom: boolean;
  bride: boolean;
}

export interface AnsweredPostMarital {
  groom: boolean;
  is_groom_answerd: boolean;
  bride: boolean;
  is_bride_answerd: boolean;
}

export interface CreatePostMaritalProps {
  question: string;
  suggestion: string;
  asked_by: AskedPostMarital;
  answered_by: AnsweredPostMarital;
  answer_notes: string;
}

export interface FindAllPostMaritalProps {
  page: number;
  limit: number;
  keyword: string;
}

export type UpdatePostMaritalProps = Partial<CreatePostMaritalProps>;
