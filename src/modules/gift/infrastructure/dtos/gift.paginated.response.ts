import { PaginatedResponseDto } from '@/modules/base/responses/base.paginated.response';
import { GiftEntity } from '../../domain/entities/gift.entity';

export class GiftPaginatedResponse extends PaginatedResponseDto<GiftEntity> {
  data: readonly GiftEntity[];
}
