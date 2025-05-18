import { Inject } from '@nestjs/common';
import {
  BaseCommandHandler,
  CommandActionType,
} from '@/modules/base/commands/base.command.handler';
import { CommandHandler } from '@nestjs/cqrs';
import { GIFT_DI } from '../../di/gift.di';
import { BulkGiftRequestdTO } from '../../infrastructure/dtos/gift.request.dto';
import { GiftRepository } from '../interfaces/gift.interface';
import { GiftEntity } from '../../domain/entities/gift.entity';

export class CreateBulkGiftCommand extends BulkGiftRequestdTO {
  constructor(public request: BulkGiftRequestdTO) {
    super();

    Object.assign(this, { ...request });
  }
}

@CommandHandler(CreateBulkGiftCommand)
export class CreateBulkGiftCommandHandler extends BaseCommandHandler<
  CreateBulkGiftCommand,
  GiftEntity[]
> {
  constructor(
    @Inject(GIFT_DI) protected readonly repository: GiftRepository,
  ) {
    super(repository);
  }

  actionType: CommandActionType = CommandActionType.CREATE;

  validate(command: CreateBulkGiftCommand): Promise<void | Error> {
    return;
  }

  async execute(
    command: CreateBulkGiftCommand,
  ): Promise<GiftEntity[]> {
    return await this.repository.bulkCreate(command.request.payload);
  }
}
