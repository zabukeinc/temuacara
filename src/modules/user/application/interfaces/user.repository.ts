import { CreateUserProps, UpdateUserProps } from '../../domain/types/user.type';
import { UserEntity } from '../../domain/entities/user.entity';

export interface UserRepository {
  create(props: CreateUserProps): Promise<UserEntity>;
  updateToken(id: string, token: string): Promise<UserEntity>;
  updatePassword(id: string, password: string): Promise<UserEntity>;
  findOneByEmail(email: string): Promise<UserEntity>;
  findOneById(id: string): Promise<UserEntity>;
  update(id: string, props: UpdateUserProps): Promise<UserEntity>;
}
