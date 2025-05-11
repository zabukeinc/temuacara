import { PaginatedResponseDto } from '@/modules/base/responses/base.paginated.response';
import { PostMaritalResponseEntity } from '../../domain/entities/post-marital.entity';

export class PostMaritalPaginatedResponse extends PaginatedResponseDto<PostMaritalResponseEntity> {
  data: readonly PostMaritalResponseEntity[];
}
