import { UserProps } from '@/modules/user/domain/types/user.type';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength } from 'class-validator';

export class CreateUserRequest implements UserProps {
  @ApiProperty()
  @IsString()
  name: string;
  id: string;
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

  @IsEmail()
  @ApiProperty({ type: 'string', required: true })
  email: string;

  @IsString()
  @MaxLength(14)
  @ApiProperty({ type: 'string', required: false })
  phone: string;

  @IsString()
  @ApiProperty({ type: 'string', required: true })
  password: string;

  // @ApiProperty({ type: 'enum', required: false, enum: Role })
  // @IsIn(Object.values(Role))
  // @IsOptional()
  // role: Role;
}
