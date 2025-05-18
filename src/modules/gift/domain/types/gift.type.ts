import { $Enums } from '@prisma/client';

export interface CreateGiftProps {
  item: string;
  type: $Enums.GiftTypeEnum;
  category: $Enums.GiftCategoryEnum;
  store: string;
  platform: $Enums.GiftPlatformEnum;
  price: number;
  quantity: number;
  total_price: number;
  responsibility: $Enums.WeddingRoleType[];
  status: $Enums.GiftStatusEnum;
  notes: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}

export interface FindAllGiftProps {
  page: number;
  limit: number;
  type: $Enums.GiftTypeEnum;
  category: $Enums.GiftCategoryEnum;
  store: string;
  platform: $Enums.GiftPlatformEnum;
  responsibility: $Enums.WeddingRoleType;
  status: $Enums.GiftStatusEnum;
  search: string;
}

export interface DeleteGiftProps {
  ids: string[];
}

export type UpdateGiftProps = Partial<CreateGiftProps>;

export interface GiftRepositoryProp {
  updateProps?: { id: string };
  deleteProps?: { id: string };
}
