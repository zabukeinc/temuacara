import { ApiProperty } from '@nestjs/swagger';

export class LoginRequest {
  @ApiProperty({
    type: 'string',
    required: true,
  })
  email: string;

  @ApiProperty({
    type: 'string',
    required: true,
  })
  password: string;
}
