import { AggregateRoot } from '@nestjs/cqrs';
import {
  CreateUserProps,
  UpdateUserProps,
  UserProps,
} from '../types/user.type';
import { Role } from '@prisma/client';

export class UserEntity extends AggregateRoot implements UserProps {
  name: string;
  id: string;
  email: string;
  phone: string;
  password: string;
  reset_token: string;
  country: string;
  province: string;
  state: string;
  city: string;
  village: string;
  postal_code: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}
