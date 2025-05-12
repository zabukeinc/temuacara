import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateUserCommandHandler } from './application/command/create/create.user.command.handler';
import { UserController } from './infrastructure/controllers/user.controller';
import { UserMapper } from './infrastructure/mappers/user.mapper';
import { UserRepositoryMysql } from './infrastructure/repositories/user.repository.mysql';
import { USER_REPOSITORY } from './di/user.di.token';
import { UpdateUserCommandHandler } from './application/command/update/update.user.command.handler';
import { GetOneUserByIdQueryHandler } from './application/query/get-one-user-by-id/get.one.user.by.id.query.handler';
import { PrismaModule } from '../prisma/prisma.module';

// modules
const modules = [PrismaModule, CqrsModule];

// HTTP Controller
const httpController = [UserController];
// Message Broker Controller
const messageController = [];

// Command Handler
const commandHandler: Provider[] = [
  CreateUserCommandHandler,
  UpdateUserCommandHandler,
];
// Query Handler
const queryHandler: Provider[] = [GetOneUserByIdQueryHandler];
// Data Mapper
const dataMapper: Provider[] = [UserMapper];
// Services
const services: Provider[] = [];

// Repository
const repositories: Provider[] = [
  {
    provide: USER_REPOSITORY,
    useClass: UserRepositoryMysql,
  },
];

@Module({
  imports: [...modules],
  controllers: [...httpController, ...messageController],
  providers: [
    ...commandHandler,
    ...queryHandler,
    ...dataMapper,
    ...services,
    ...repositories,
  ],
  exports: [],
})
export class UserModule {}
