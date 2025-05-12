import { User as UserModel } from '@prisma/client';
import { UserEntity } from '../../domain/entities/user.entity';
import { GetUserPaginatedResponse } from '../dtos/responses/find.many.user.response';

export class UserMapper {
  toDomain(model: UserModel): UserEntity {
    const instance = new UserEntity();
    Object.assign(instance, { ...model });
    return instance;
  }

  toDomains(models: UserModel[]): UserEntity[] {
    return models.map((model) => this.toDomain(model));
  }

  toPaginated(
    page: number,
    limit: number,
    data: UserModel[],
    count: number,
  ): GetUserPaginatedResponse {
    const mapped = this.toDomains(data);
    return { count, data: mapped, limit, page };
  }
}
