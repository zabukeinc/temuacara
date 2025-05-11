import { TalkEnum } from '@prisma/client';

export class PostMaritalEntity {
  id: number;
  question: string;
  suggestion: string;
  answered_by_groom: boolean;
  answered_by_bride: boolean;
  asked_by_groom: boolean;
  asked_by_bride: boolean;
  type: TalkEnum;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
  user_id: string;
}
