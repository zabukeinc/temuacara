import { BaseRepository } from '@/modules/base/repositories/base.repository';
import {
  CreateGiftProps,
  UpdateGiftProps,
  FindAllGiftProps,
  DeleteGiftProps,
} from '../../domain/types/gift.type';
import { GiftEntity } from '../../domain/entities/gift.entity';

export interface GiftRepository
  extends BaseRepository<
    GiftEntity,
    CreateGiftProps,
    UpdateGiftProps,
    DeleteGiftProps,
    FindAllGiftProps,
    GiftProps
  > {
  baseUpdate(
    prop: GiftProps,
    payload: UpdateGiftProps,
  ): Promise<GiftEntity>;
  bulkCreate(payload: CreateGiftProps[]): Promise<GiftEntity[]>;
}

export interface GiftProps {
  updateProps?: { id: string };
  deleteProps?: { id: string };
  findOneProps?: { id: string };
}
