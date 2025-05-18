import { $Enums, Gift } from '@prisma/client';

export class GiftEntity implements Gift {
  id: string;
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
