import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject, NotFoundException } from '@nestjs/common';
import { USER_REPOSITORY } from '../../../di/user.di.token';
import { UserRepository } from '../../interfaces/user.repository';

export class GetOneUserByIdQuery {
  constructor(public readonly id: string) {}
}

@QueryHandler(GetOneUserByIdQuery)
export class GetOneUserByIdQueryHandler
  implements IQueryHandler<GetOneUserByIdQuery>
{
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(query: GetOneUserByIdQuery) {
    const { id } = query;

    const user = await this.userRepository.findOneById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
