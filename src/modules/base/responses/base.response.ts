import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class BaseResponse<T> {
  @ApiProperty()
  success = true;

  @ApiProperty()
  code: number;

  @ApiProperty()
  message: string;

  @ApiProperty()
  readonly data: T;

  constructor(data: T, message = 'OK', code = HttpStatus.OK) {
    if (message) this.message = message;
    if (code) this.code = code;
    this.data = data;
  }
}
