import { Inject } from '@nestjs/common';
import {
  BaseCommandHandler,
  CommandActionType,
} from '@/modules/base/commands/base.command.handler';
import { CommandHandler } from '@nestjs/cqrs';
import { GIFT_DI } from '../../di/gift.di';
import { GiftRequestDTO } from '../../infrastructure/dtos/gift.request.dto';
import { GiftRepository } from '../interfaces/gift.interface';
import { GiftEntity } from '../../domain/entities/gift.entity';

export class CreateGiftCommand extends GiftRequestDTO {
  constructor(public request: GiftRequestDTO) {
    super();

    Object.assign(this, { ...request });
  }
}

@CommandHandler(CreateGiftCommand)
export class CreateGiftCommandHandler extends BaseCommandHandler<
  CreateGiftCommand,
  GiftEntity
> {
  constructor(@Inject(GIFT_DI) repository: GiftRepository) {
    super(repository);
  }

  actionType: CommandActionType = CommandActionType.CREATE;

  validate(command: CreateGiftCommand): Promise<void | Error> {
    return;
  }
}
