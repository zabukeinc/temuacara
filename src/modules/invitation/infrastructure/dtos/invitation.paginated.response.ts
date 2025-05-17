import { PaginatedResponseDto } from '@/modules/base/responses/base.paginated.response';
import { InvitationEntity } from '../../domain/entities/invitation.entity';

export class InvitationPaginatedResponse extends PaginatedResponseDto<InvitationEntity> {
  data: readonly InvitationEntity[];
}
