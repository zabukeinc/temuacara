import { PrismaModule } from '@/modules/prisma/prisma.module';
import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { INVITATION_DI } from './di/invitation.di';
import { InvitationRepositoryMysql } from './infrastructure/repositories/invitation.repository.postgresql';
import { CreateInvitationCommandHandler } from './application/commands/create.invitation.command.handler';
import { DeleteInvitationCommandHandler } from './application/commands/delete-invitation.command.handler';
import { UpdateInvitationCommandHandler } from './application/commands/update.checklist.command.handler';
import { FindAllInvitationQueryHandler } from './application/queries/find.all.invitation.query';
import { InvitationController } from './infrastructure/controllers/invitation.controller';

// modules
const modules = [PrismaModule, CqrsModule];

// HTTP Controller
const httpController = [InvitationController];
// Message Broker Controller
const messageController = [];

// Command Handler
const commandHandler: Provider[] = [
  CreateInvitationCommandHandler,
  UpdateInvitationCommandHandler,
  DeleteInvitationCommandHandler,
];

// Query Handler
const queryHandler: Provider[] = [FindAllInvitationQueryHandler];

// Data Mapper

// Services
const services: Provider[] = [];

const strategies: Provider[] = [];

const clis: Provider[] = [];

// Repository
const repositories: Provider[] = [
  {
    provide: INVITATION_DI,
    useClass: InvitationRepositoryMysql,
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
export class InvitationModule {}
