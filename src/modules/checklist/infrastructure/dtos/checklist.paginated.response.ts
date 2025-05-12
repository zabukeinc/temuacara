import { PaginatedResponseDto } from '@/modules/base/responses/base.paginated.response';
import { ChecklistResponseEntity } from '../../domain/entities/checklist.entity';

export class ChecklistPaginatedResponse extends PaginatedResponseDto<ChecklistResponseEntity> {
  data: readonly ChecklistResponseEntity[];
}
