import {
  BaseCommandHandler,
  CommandActionType,
} from '@/modules/base/commands/base.command.handler';
import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { GIFT_DI } from '../../di/gift.di';
import { DeleteGiftRequestDTO } from '../../infrastructure/dtos/gift.request.dto';
import { GiftRepository } from '../interfaces/gift.interface';
import { GiftEntity } from '../../domain/entities/gift.entity';

export class DeleteGiftCommand {
  constructor(protected readonly payload: DeleteGiftRequestDTO) {
    Object.assign(this, { ...payload });
  }
}

@CommandHandler(DeleteGiftCommand)
export class DeleteGiftCommandHandler extends BaseCommandHandler<
  DeleteGiftCommand,
  GiftEntity[]
> {
  constructor(
    @Inject(GIFT_DI)
    protected readonly repository: GiftRepository,
  ) {
    super(repository);
  }

  actionType: CommandActionType = CommandActionType.DELETE;

  validate(command: DeleteGiftCommand): Promise<void | Error> {
    return;
  }
}
