import { Injectable, Logger } from '@nestjs/common';
import { UserRepository } from '../../application/interfaces/user.repository';
import { UserMapper } from '../mappers/user.mapper';
import { UserEntity } from '../../domain/entities/user.entity';
import { CreateUserProps, UpdateUserProps } from '../../domain/types/user.type';
import { PrismaService } from '@/modules/prisma/prisma.service';

@Injectable()
export class UserRepositoryMysql implements UserRepository {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly mapper: UserMapper,
  ) {}

  protected readonly logger = new Logger(UserRepositoryMysql.name);

  async create(props: CreateUserProps): Promise<UserEntity> {
    try {
      return this.mapper.toDomain(
        await this.prismaService.user.create({
          data: props,
        }),
      );
    } catch (err) {
      this.logger.error(`[CREATE] => ${JSON.stringify(props)}:: Err`, err);
      return Promise.reject(err);
    }
  }

  async updateToken(id: string, token: string): Promise<UserEntity> {
    try {
      const result = await this.prismaService.user.update({
        where: { id },
        data: {
          reset_token: token,
        },
      });

      return this.mapper.toDomain(result);
    } catch (err) {
      this.logger.error(`[UPDATETOKEN] => ${id}:: Err`, err);
      return Promise.reject(err);
    }
  }

  async updatePassword(id: string, password: string): Promise<UserEntity> {
    try {
      const result = await this.prismaService.user.update({
        where: { id },
        data: {
          password,
          reset_token: null,
        },
      });

      return this.mapper.toDomain(result);
    } catch (err) {
      this.logger.error(`[UPDATEPASSWORD] => ${id}:: Err`, err);
      return Promise.reject(err);
    }
  }

  async findOneByEmail(email: string): Promise<UserEntity> {
    try {
      const result = await this.prismaService.user.findFirstOrThrow({
        where: { email },
      });
      return this.mapper.toDomain(result);
    } catch (err) {
      this.logger.error(`[FINDONEBYEMAIL] => ${email}:: Err`, err);
      return Promise.reject(err);
    }
  }

  async findOneById(id: string): Promise<UserEntity> {
    try {
      const result = await this.prismaService.user.findFirstOrThrow({
        where: { id },
      });
      return this.mapper.toDomain(result);
    } catch (err) {
      this.logger.error(`[FINDONEBYID] => ${id}:: Err`, err);
      return Promise.reject(err);
    }
  }

  async update(id: string, props: UpdateUserProps): Promise<UserEntity> {
    try {
      const result = await this.prismaService.user.update({
        where: { id },
        data: props,
      });
    } catch (err) {
      this.logger.error(`[UPDATE] => ${id}:: Err`, err);
      return Promise.reject(err);
    }
  }
}
