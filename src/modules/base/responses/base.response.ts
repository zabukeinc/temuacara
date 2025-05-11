import { ApiProperty } from '@nestjs/swagger';

export class BaseResponse<T> {
  @ApiProperty()
  status_code = 200;

  @ApiProperty()
  message = 'OK';

  @ApiProperty()
  readonly data: T;

  constructor(data: T) {
    this.data = data;
  }
}
