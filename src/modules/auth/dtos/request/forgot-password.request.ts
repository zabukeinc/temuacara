import { ApiProperty } from '@nestjs/swagger';

export class ForgotPasswordRequest {
  @ApiProperty({
    type: 'string',
    required: true,
  })
  email: string;
}
