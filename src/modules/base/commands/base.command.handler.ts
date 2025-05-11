import { InternalServerErrorException } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { BaseRepository } from '../repositories/base.repository';

export enum CommandActionType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
}
export abstract class BaseCommandHandler<CommandHandler, ResultCommand>
  // @ts-ignore
  implements ICommandHandler<CommandHandler, ResultCommand>
{
  constructor(protected readonly repository: BaseRepository<unknown>) {}

  actionType: CommandActionType;

  preProcess(): void {
    if (!this.actionType)
      throw new InternalServerErrorException(
        'Action type command is not Set;!',
      );
  }

  /**
   * Validate current action. The result whetever undefined|null as a void, or throwing an error.
   * @param command
   */
  abstract validate(command: CommandHandler): Promise<void | Error>;

  /**
   * Executing Command Handler based on CQRS NestJS Library.
   * @param command
   * @returns
   */
  async execute(command: CommandHandler): Promise<ResultCommand> {
    this.preProcess();
    await this.validate(command);
    const result = await this.processData(command);
    await this.afterProcess(command, result as ResultCommand);
    return result as ResultCommand;
  }

  protected async processData(command: CommandHandler): Promise<ResultCommand> {
    switch (this.actionType) {
      case CommandActionType.CREATE:
        delete command['identifierProp'];
        return (await this.repository.baseCreate(command)) as ResultCommand;
      case CommandActionType.UPDATE:
        const updateProp = command['identifierProp'];
        delete command['identifierProp'];
        return (await this.repository.baseUpdate(
          updateProp,
          command,
        )) as ResultCommand;
      case CommandActionType.DELETE:
        return (await this.repository.baseDelete(command)) as ResultCommand;
      default:
        throw new InternalServerErrorException(
          'Action type command is not set!',
        );
    }
  }

  /**
   *
   * @param command
   * @param result
   * @returns
   */
  async afterProcess(
    command: CommandHandler,
    result: ResultCommand,
  ): Promise<void> {}
}
