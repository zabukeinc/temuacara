import { $Enums, InvitationWebsite } from '@prisma/client';
import {
  InvitationInfoRelationed,
  InvitationRelationed,
} from '../types/invitation.type';

export class InvitationEntity implements InvitationRelationed {
  name: string;
  id: string;
  pax: number;
  inviter: $Enums.WeddingRoleEnum;
  status: $Enums.InvitationStatusEnum;
  type: $Enums.InvitationTypeEnum;
  priority: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
  invitation_info?: InvitationInfoRelationed;
  invitation_website?: InvitationWebsite;
}
