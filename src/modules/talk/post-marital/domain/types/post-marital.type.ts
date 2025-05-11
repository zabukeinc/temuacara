export interface AskedByDTO {
  groom: boolean;
  bride: boolean;
}

export interface AnsweredByDTO {
  groom: boolean;
  bride: boolean;
}

export interface CreatePostMaritalProps {
  question: string;
  suggestion: string;
  asked_by: AskedByDTO;
  answered_by: AnsweredByDTO;
}

export interface FindAllPostMaritalProps {
  page: number;
  limit: number;
  keyword: string;
}

export type UpdatePostMaritalProps = Partial<CreatePostMaritalProps>;
