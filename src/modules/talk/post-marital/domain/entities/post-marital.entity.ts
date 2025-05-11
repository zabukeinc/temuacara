import { TalkEnum } from '@prisma/client';

export class PostMaritalEntity {
  id: number;
  question: string;
  suggestion: string;
  answered_by_groom: boolean;
  answered_by_bride: boolean;
  asked_by_groom: boolean;
  asked_by_bride: boolean;
  is_groom_answerd: boolean;
  is_bride_answerd: boolean;
  type: TalkEnum;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
  answered_at: Date;
  user_id: string;
}

export class PostMaritalResponseEntity {
  id: number;
  type: TalkEnum;
  question: string;
  suggestion: string;
  asked_by: {
    groom: boolean;
    bride: boolean;
  };
  answered_by: {
    groom: boolean;
    is_groom_answerd: boolean;
    bride: boolean;
    is_bride_answerd: boolean;
  };
  answer_notes: string;
  answered_at: Date;
}
