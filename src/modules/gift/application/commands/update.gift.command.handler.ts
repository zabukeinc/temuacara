import {
  BaseCommandHandler,
  CommandActionType,
} from '@/modules/base/commands/base.command.handler';
import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { GIFT_DI } from '../../di/gift.di';
import { GiftRepositoryProp } from '../../domain/types/gift.type';
import { GiftRequestDTO } from '../../infrastructure/dtos/gift.request.dto';
import { GiftRepository } from '../interfaces/gift.interface';
import { GiftEntity } from '../../domain/entities/gift.entity';

export class UpdateGiftCommand extends GiftRequestDTO {
  constructor(
    public identifierProp: GiftRepositoryProp,
    public payload: GiftRequestDTO,
  ) {
    super();
    Object.assign(this, { identifierProp, ...payload });
  }
}

@CommandHandler(UpdateGiftCommand)
export class UpdateGiftCommandHandler extends BaseCommandHandler<
  UpdateGiftCommand,
  GiftEntity
> {
  constructor(@Inject(GIFT_DI) repository: GiftRepository) {
    super(repository);
  }

  actionType: CommandActionType = CommandActionType.UPDATE;

  validate(command: UpdateGiftCommand): Promise<void | Error> {
    return;
  }
}
