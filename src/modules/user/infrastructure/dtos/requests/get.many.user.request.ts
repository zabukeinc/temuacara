import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class GetManyUserRequest {
  @ApiProperty({ type: 'number', name: 'page', description: 'Number of page' })
  @Transform(({ value }) => Number(value))
  page: number;

  @ApiProperty({
    type: 'number',
    name: 'limit',
    description: 'Number of limit',
  })
  @Transform(({ value }) => Number(value))
  limit: number;

  @ApiProperty({
    type: 'string',
    required: false,
    description: 'Search by username',
  })
  username: string;

  @ApiProperty({
    type: 'string',
    required: false,
    description: 'Search by email',
  })
  email: string;

  @ApiProperty({
    type: 'string',
    required: false,
    description: 'Search by phone',
  })
  phone: string;

  @ApiProperty({
    type: 'string',
    required: false,
    description: 'Search by role',
  })
  role: string;
}
