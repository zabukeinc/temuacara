import { ApiProperty } from '@nestjs/swagger';

export class UpdatePasswordRequest {
  @ApiProperty({
    type: 'string',
    required: true,
  })
  token: string;

  @ApiProperty({
    type: 'string',
    required: true,
  })
  password: string;
}
