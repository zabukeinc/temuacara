import { PrismaModule } from '@/modules/prisma/prisma.module';
import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PostMaritalController } from './infrastructure/controllers/post-marital.controller';
import { POST_MARITAL_DI } from './di/post-marital.di';
import { PostMaritalRepositoryMysql } from './infrastructure/repositories/post-marital.repository.postgresql';
import { CreatePostMaritalCommandHandler } from './application/commands/create.post-marital.command.handler';
import { UpdatePostMaritalCommandHandler } from './application/commands/update.post-marital.command.handler';
import { FindAllPostMaritalQueryHandler } from './application/queries/find.all.post-marital.query.handler';
import { DeletePostMaritalCommandHandler } from './application/commands/delete-post-marital.command.handler';

// modules
const modules = [PrismaModule, CqrsModule];

// HTTP Controller
const httpController = [PostMaritalController];
// Message Broker Controller
const messageController = [];

// Command Handler
const commandHandler: Provider[] = [
  CreatePostMaritalCommandHandler,
  UpdatePostMaritalCommandHandler,
  DeletePostMaritalCommandHandler,
];

// Query Handler
const queryHandler: Provider[] = [FindAllPostMaritalQueryHandler];

// Data Mapper

// Services
const services: Provider[] = [];

const strategies: Provider[] = [];

const clis: Provider[] = [];

// Repository
const repositories: Provider[] = [
  {
    provide: POST_MARITAL_DI,
    useClass: PostMaritalRepositoryMysql,
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
export class PostMaritalModule {}
