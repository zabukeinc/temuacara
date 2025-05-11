import { PostMaritalRequestDTO } from '../../infrastructure/dtos/post-marital.request.dto';
import { PostMaritalRepository } from '../interfaces/post-marital.interface';
import { Inject } from '@nestjs/common';
import { PostMaritalResponseEntity } from '../../domain/entities/post-marital.entity';
import {
  BaseCommandHandler,
  CommandActionType,
} from '@/modules/base/commands/base.command.handler';
import { POST_MARITAL_DI } from '../../di/post-marital.di';
import { CommandHandler } from '@nestjs/cqrs';

export class CreatePostMaritalCommand extends PostMaritalRequestDTO {
  constructor(public payload: PostMaritalRequestDTO) {
    super();

    Object.assign(this, { ...payload });
  }
}

@CommandHandler(CreatePostMaritalCommand)
export class CreatePostMaritalCommandHandler extends BaseCommandHandler<
  CreatePostMaritalCommand,
  PostMaritalResponseEntity
> {
  constructor(@Inject(POST_MARITAL_DI) repository: PostMaritalRepository) {
    super(repository);
  }

  actionType: CommandActionType = CommandActionType.CREATE;

  validate(command: CreatePostMaritalCommand): Promise<void | Error> {
    return;
  }
}
