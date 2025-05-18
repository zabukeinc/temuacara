import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { INVITATION_DI } from '../../di/invitation.di';
import { InvitationRepository } from '../interfaces/invitation.interface';
import { InvitationEntity } from '../../domain/entities/invitation.entity';

export class FindOneInvitationQuery {
  constructor(public readonly id: string) {}
}

@QueryHandler(FindOneInvitationQuery)
export class FindOneInvitationQueryHandler
  implements IQueryHandler<FindOneInvitationQuery, InvitationEntity>
{
  constructor(
    @Inject(INVITATION_DI)
    protected readonly repository: InvitationRepository,
  ) {}

  async execute(query: FindOneInvitationQuery): Promise<any> {
    const result = await this.repository.findOne({ findOneProps: query });
    return result;
  }
}
