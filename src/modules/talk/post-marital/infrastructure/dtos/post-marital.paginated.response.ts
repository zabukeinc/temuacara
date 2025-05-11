import { PaginatedResponseDto } from '@/modules/base/responses/base.paginated.response';
import { PostMaritalEntity } from '../../domain/entities/post-marital.entity';

export class PostMaritalPaginatedResponse extends PaginatedResponseDto<PostMaritalEntity> {
  data: readonly PostMaritalEntity[];
}
