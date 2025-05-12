import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserRepository } from '../../interfaces/user.repository';
import { UserEntity } from '@/modules/user/domain/entities/user.entity';
import { USER_REPOSITORY } from '@/modules/user/di/user.di.token';
import { GetOneUserByEmail } from './get.one.user.by.email';

@QueryHandler(GetOneUserByEmail)
export class GetOneUserByEmailHandler
  implements IQueryHandler<GetOneUserByEmail, UserEntity>
{
  constructor(
    @Inject(USER_REPOSITORY)
    private userRepo: UserRepository,
  ) {}

  async execute(query: GetOneUserByEmail): Promise<UserEntity> {
    const result = await this.userRepo.findOneByEmail(query.email);
    return Promise.resolve(result);
  }
}
