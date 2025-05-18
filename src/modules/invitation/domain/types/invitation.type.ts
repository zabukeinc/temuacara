import { BaseFindAllProps } from '@/modules/base/requests/base.find-all.request';
import {
  Invitation,
  InvitationCategory,
  InvitationInfo,
  InvitationStatusEnum,
  InvitationTypeEnum,
  InvitationWebsite,
  Prisma,
  WebsiteFeatureEnum,
  WebsiteTrackEnum,
  WeddingRoleEnum,
} from '@prisma/client';

export type InvitationInfoRelationed = InvitationInfo & {
  invitation_category?: InvitationCategory;
};

export type InvitationRelationed = Invitation & {
  invitation_info?: InvitationInfoRelationed;
  invitation_website?: InvitationWebsite;
};

export interface FindAllInvitationProps extends BaseFindAllProps {
  inviter: string;
  status: string;
  type: string;
  from: string;
  address: string;
  website_track: string;
  name: string;
}

export interface InvitationInfoProps {
  address: string;
  from: string;
  email: string;
  phone: string;
  category: string;
}

export interface InvitationWebsiteProps {
  url: string;
  track: WebsiteTrackEnum;
  features: WebsiteFeatureEnum[];
  expired_at: Date;
  sent_at: Date;
  opened_at: Date;
}
export interface CreateInvitationProps {
  name: string;
  pax: number;
  inviter: WeddingRoleEnum;
  status: InvitationStatusEnum;
  type: InvitationTypeEnum;
  priority: number;
  info: InvitationInfoProps;
  website: InvitationWebsiteProps;
}

export type UpdateInvitationProps = Partial<CreateInvitationProps>;

export interface DeleteInvitationProps {
  ids: string[];
}

export interface InvitationRepositoryProp {
  updateProps?: { id: string };
  deleteProps?: { id: string };
}
