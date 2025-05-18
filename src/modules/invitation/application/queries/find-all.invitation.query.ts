import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { INVITATION_DI } from '../../di/invitation.di';
import { FindAllInvitationRequestDTO } from '../../infrastructure/dtos/get.all.invitation.request.dto';
import { InvitationPaginatedResponse } from '../../infrastructure/dtos/invitation.paginated.response';
import { InvitationRepository } from '../interfaces/invitation.interface';

export class FindAllInvitationQuery extends FindAllInvitationRequestDTO {
  constructor(protected readonly payload: FindAllInvitationRequestDTO) {
    super();
    Object.assign(this, { ...payload });
  }
}

@QueryHandler(FindAllInvitationQuery)
export class FindAllInvitationQueryHandler
  implements IQueryHandler<FindAllInvitationQuery, InvitationPaginatedResponse>
{
  constructor(
    @Inject(INVITATION_DI)
    protected readonly repository: InvitationRepository,
  ) {}

  async execute(query: FindAllInvitationQuery): Promise<any> {
    const result = await this.repository.findAll(query);
    return Promise.resolve(result);
  }
}
