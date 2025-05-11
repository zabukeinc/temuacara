import {
  BaseCommandHandler,
  CommandActionType,
} from '@/modules/base/commands/base.command.handler';
import { DeletePostMaritalRequestDTO } from '../../infrastructure/dtos/post-marital.request.dto';
import { PostMaritalResponseEntity } from '../../domain/entities/post-marital.entity';
import { Inject } from '@nestjs/common';
import { POST_MARITAL_DI } from '../../di/post-marital.di';
import { PostMaritalRepository } from '../interfaces/post-marital.interface';
import { CommandHandler } from '@nestjs/cqrs';

export class DeletePostMaritalCommand {
  constructor(protected readonly payload: DeletePostMaritalRequestDTO) {
    Object.assign(this, { ...payload });
  }
}

@CommandHandler(DeletePostMaritalCommand)
export class DeletePostMaritalCommandHandler extends BaseCommandHandler<
  DeletePostMaritalCommand,
  PostMaritalResponseEntity[]
> {
  constructor(
    @Inject(POST_MARITAL_DI)
    protected readonly repository: PostMaritalRepository,
  ) {
    super(repository);
  }

  actionType: CommandActionType = CommandActionType.DELETE;

  validate(command: DeletePostMaritalCommand): Promise<void | Error> {
    return;
  }
}
