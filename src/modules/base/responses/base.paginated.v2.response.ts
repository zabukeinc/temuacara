import { ApiProperty } from '@nestjs/swagger';

export class BaseMetadataQueryDTO {
  @ApiProperty({ example: 1 })
  page: number;

  @ApiProperty({ example: 10 })
  limit: number;

  @ApiProperty({ example: 'search term', required: false })
  search?: string;
}

export class BaseMetadataDTO {
  @ApiProperty({ example: 1 })
  page: number;

  @ApiProperty({ example: 10 })
  limit: number;

  @ApiProperty({ example: 50 })
  count: number;

  @ApiProperty({ example: 5 })
  total: number;

  @ApiProperty({
    example: 'http://localhost/api/v1/resource?page=2&limit=10',
    required: false,
  })
  next?: string;

  @ApiProperty({
    example: 'http://localhost/api/v1/resource?page=1&limit=10',
    required: false,
  })
  prev?: string;

  @ApiProperty({ type: BaseMetadataQueryDTO })
  query: BaseMetadataQueryDTO;
}

export class BasePaginatedResponseDTO<T> {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 200 })
  code: number;

  @ApiProperty({ example: 'Successfully fetch data' })
  message: string;

  @ApiProperty({ type: BaseMetadataDTO })
  metadata: BaseMetadataDTO;

  @ApiProperty({ type: Array })
  data: T[];
}
