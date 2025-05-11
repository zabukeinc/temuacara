import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class FindAllPostMaritalRequestDTO {
  @ApiProperty()
  page: number;

  @ApiProperty()
  limit: number;

  @ApiProperty()
  @IsString()
  keyword: string;
}
