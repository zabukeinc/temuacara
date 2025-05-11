import {
  BaseCommandHandler,
  CommandActionType,
} from '@/modules/base/commands/base.command.handler';
import { PostMaritalRequestDTO } from '../../infrastructure/dtos/post-marital.request.dto';
import { PostMaritalResponseEntity } from '../../domain/entities/post-marital.entity';
import { Inject } from '@nestjs/common';
import { POST_MARITAL_DI } from '../../di/post-marital.di';
import { PostMaritalRepository } from '../interfaces/post-marital.interface';
import { CommandHandler } from '@nestjs/cqrs';
import { PostMaritalRepositoryProp } from '../../domain/types/post-marital.type';

export class UpdatePostMaritalCommand extends PostMaritalRequestDTO {
  constructor(
    public identifierProp: PostMaritalRepositoryProp,
    public payload: PostMaritalRequestDTO,
  ) {
    super();
    Object.assign(this, { identifierProp, ...payload });
  }
}

@CommandHandler(UpdatePostMaritalCommand)
export class UpdatePostMaritalCommandHandler extends BaseCommandHandler<
  UpdatePostMaritalCommand,
  PostMaritalResponseEntity
> {
  constructor(@Inject(POST_MARITAL_DI) repository: PostMaritalRepository) {
    super(repository);
  }

  actionType: CommandActionType = CommandActionType.UPDATE;

  validate(command: UpdatePostMaritalCommand): Promise<void | Error> {
    return;
  }
}
