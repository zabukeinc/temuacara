import { PrismaModule } from '@/modules/prisma/prisma.module';
import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { GiftController } from './infrastructure/controllers/gift.controller';
import { GIFT_DI } from './di/gift.di';
import { GiftRepositoryMysql } from './infrastructure/repositories/gift.repository.postgresql';
import { CreateGiftCommandHandler } from './application/commands/create.gift.command.handler';
import { UpdateGiftCommandHandler } from './application/commands/update.gift.command.handler';
import { FindAllGiftQueryHandler } from './application/queries/find.all.gift.query.handler';
import { DeleteGiftCommandHandler } from './application/commands/delete-gift.command.handler';
import { CreateBulkGiftCommandHandler } from './application/commands/create-bulk.gift.command.handler';
import { FindOneGiftQueryHandler } from './application/queries/get.one.gift.query.handler';

// modules
const modules = [PrismaModule, CqrsModule];

// HTTP Controller
const httpController = [GiftController];
// Message Broker Controller
const messageController = [];

// Command Handler
const commandHandler: Provider[] = [
  CreateBulkGiftCommandHandler,
  CreateGiftCommandHandler,
  UpdateGiftCommandHandler,
  DeleteGiftCommandHandler,
];

// Query Handler
const queryHandler: Provider[] = [
  FindAllGiftQueryHandler,
  FindOneGiftQueryHandler,
];

// Data Mapper

// Services
const services: Provider[] = [];

const strategies: Provider[] = [];

const clis: Provider[] = [];

// Repository
const repositories: Provider[] = [
  {
    provide: GIFT_DI,
    useClass: GiftRepositoryMysql,
  },
];

@Module({
  imports: [...modules],
  controllers: [...httpController, ...messageController],
  providers: [
    ...commandHandler,
    ...queryHandler,
    ...services,
    ...repositories,
    ...strategies,
    ...clis,
  ],
  exports: [],
})
export class GiftModule {}
