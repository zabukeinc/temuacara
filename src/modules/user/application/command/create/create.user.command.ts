import { UserProps } from '@/modules/user/domain/types/user.type';
import { CreateUserRequest } from '@/modules/user/infrastructure/dtos/requests/create.customer.request';
import { Role } from '@prisma/client';

export class CreateUserCommand implements UserProps {
  id: string;
  email: string;
  phone: string;
  password: string;
  role: Role;
  name: string;
  created_at: Date;
  updated_at: Date;
  reset_token: string;
  country: string;
  province: string;
  state: string;
  city: string;
  village: string;
  postal_code: string;
  deleted_at: Date;

  constructor(request: CreateUserRequest) {
    Object.assign(this, { ...request });
  }
}
