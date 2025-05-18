import { BaseRepository } from '@/modules/base/repositories/base.repository';
import { InvitationEntity } from '../../domain/entities/invitation.entity';
import {
  CreateInvitationProps,
  UpdateInvitationProps,
  DeleteInvitationProps,
  FindAllInvitationProps,
} from '../../domain/types/invitation.type';

export interface InvitationRepository
  extends BaseRepository<
    InvitationEntity,
    CreateInvitationProps,
    UpdateInvitationProps,
    DeleteInvitationProps,
    FindAllInvitationProps,
    InvitationProps
  > {
  baseUpdate(
    prop: InvitationProps,
    payload: UpdateInvitationProps,
  ): Promise<InvitationEntity>;
  bulkCreate(payload: CreateInvitationProps[]): Promise<InvitationEntity[]>;
}

export interface InvitationProps {
  updateProps?: { id: string };
  deleteProps?: { id: string };
}
