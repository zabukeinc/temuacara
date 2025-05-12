import { Inject, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from './create.user.command';
import { UserRepository } from '../../interfaces/user.repository';
import * as bcrypt from 'bcrypt';
import { USER_REPOSITORY } from '@/modules/user/di/user.di.token';
import { UserEntity } from '@/modules/user/domain/entities/user.entity';

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler
  implements ICommandHandler<CreateUserCommand, UserEntity>
{
  constructor(
    @Inject(USER_REPOSITORY)
    private userRepo: UserRepository,
  ) {}

  protected readonly logger = new Logger(CreateUserCommandHandler.name);

  async execute(command: CreateUserCommand): Promise<UserEntity> {
    try {
      const salt = await bcrypt.genSalt();
      command.password = await bcrypt.hash(command.password, salt);
      this.logger.log(`Executing => ${JSON.stringify(command)}`);
      return await this.userRepo.create(command);
    } catch (err) {
      return Promise.reject(err);
    }
  }
}
