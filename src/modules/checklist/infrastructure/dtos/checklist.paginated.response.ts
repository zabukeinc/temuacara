import { PaginatedResponseDto } from '@/modules/base/responses/base.paginated.response';
import { ChecklistEntity } from '../../domain/entities/checklist.entity';

export class ChecklistPaginatedResponse extends PaginatedResponseDto<ChecklistEntity> {
  data: readonly ChecklistEntity[];
}
