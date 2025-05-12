import { Role, User } from '@prisma/client';

export type CreateUserProps = UserProps;
export type UpdateUserProps = UserProps;
export interface UserProps extends User {}

export interface GetManyUserProps {
  page: number;
  limit: number;
  username?: string;
  email?: string;
  phone?: string;
  role?: Role;
}
