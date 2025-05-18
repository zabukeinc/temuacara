import { PrismaModule } from '@/modules/prisma/prisma.module';
import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ChecklistController } from './infrastructure/controllers/checklist.controller';
import { CHECKLIST_DI } from './di/checklist.di';
import { ChecklistRepositoryMysql } from './infrastructure/repositories/checklist.repository.postgresql';
import { CreateChecklistCommandHandler } from './application/commands/create.checklist.command.handler';
import { UpdateChecklistCommandHandler } from './application/commands/update.checklist.command.handler';
import { FindAllChecklistQueryHandler } from './application/queries/find.all.checklist.query.handler';
import { DeleteChecklistCommandHandler } from './application/commands/delete-checklist.command.handler';
import { CreateBulkChecklistCommandHandler } from './application/commands/create-bulk.checklist.command.handler';
import { FindOneChecklistQueryHandler } from './application/queries/get.one.checklist.query.handler';

// modules
const modules = [PrismaModule, CqrsModule];

// HTTP Controller
const httpController = [ChecklistController];
// Message Broker Controller
const messageController = [];

// Command Handler
const commandHandler: Provider[] = [
  CreateBulkChecklistCommandHandler,
  CreateChecklistCommandHandler,
  UpdateChecklistCommandHandler,
  DeleteChecklistCommandHandler,
];

// Query Handler
const queryHandler: Provider[] = [
  FindAllChecklistQueryHandler,
  FindOneChecklistQueryHandler,
];

// Data Mapper

// Services
const services: Provider[] = [];

const strategies: Provider[] = [];

const clis: Provider[] = [];

// Repository
const repositories: Provider[] = [
  {
    provide: CHECKLIST_DI,
    useClass: ChecklistRepositoryMysql,
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
export class ChecklistModule {}
