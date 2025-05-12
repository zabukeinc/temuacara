import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  Inject,
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { UserRepository } from '../../interfaces/user.repository';
import * as bcrypt from 'bcrypt';
import { USER_REPOSITORY } from '@/modules/user/di/user.di.token';
import { UserProps } from '@/modules/user/domain/types/user.type';
import { UpdateUserRequest } from '@/modules/user/infrastructure/dtos/requests/update.user.request';
import { Guard } from '@/modules/base/helpers/guard';

export class UpdateUserCommand {
  constructor(public readonly request: UpdateUserRequest) {}
}

@Injectable()
@CommandHandler(UpdateUserCommand)
export class UpdateUserCommandHandler
  implements ICommandHandler<UpdateUserCommand>
{
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  private async validateUser(userId: string) {
    const user = await this.userRepository.findOneById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  private async validateCurrentPassword(
    currentPassword: string,
    storedPassword: string,
  ) {
    if (!Guard.hasValue(currentPassword)) return;

    const isValid = await bcrypt.compare(currentPassword, storedPassword);
    if (!isValid) {
      throw new BadRequestException('Current password is incorrect');
    }
  }

  private validatePasswordMatch(
    newPassword?: string,
    confirmPassword?: string,
  ) {
    const hasNewPassword = Guard.hasValue(newPassword);
    const hasConfirmPassword = Guard.hasValue(confirmPassword);

    if (hasNewPassword !== hasConfirmPassword) {
      throw new BadRequestException(
        'Both new password and confirm password must be provided',
      );
    }

    if (
      hasNewPassword &&
      hasConfirmPassword &&
      newPassword !== confirmPassword
    ) {
      throw new BadRequestException(
        'New password and confirm password do not match',
      );
    }
  }

  private async buildUpdatePayload(request: UpdateUserRequest) {
    const payload: Partial<UserProps> = {
      email: request.email,
      phone: request.phone,
    };

    if (Guard.hasValue(request.new_password)) {
      payload.password = await bcrypt.hash(
        request.new_password,
        await bcrypt.genSalt(),
      );
    }

    return payload;
  }

  async execute(command: UpdateUserCommand) {
    const { request } = command;
    const user = await this.validateUser(request.id);

    await this.validateCurrentPassword(request.current_password, user.password);
    this.validatePasswordMatch(request.new_password, request.confirm_password);

    const payload = await this.buildUpdatePayload(request);
    return await this.userRepository.update(user.id, payload as UserProps);
  }
}
