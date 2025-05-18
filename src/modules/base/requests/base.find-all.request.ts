import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsIn, IsNumber, IsOptional, Min } from 'class-validator';

export interface BaseFindAllProps {
  page: number;
  limit: number;
  sort_by: string;
  sort_direction: Prisma.SortOrder;
  search: string;
}

export class BaseFindAllRequest implements BaseFindAllProps {
  @ApiPropertyOptional({ description: 'Page number', minimum: 1, default: 1 })
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page: number;

  @ApiPropertyOptional({
    description: 'Number of items per page',
    minimum: 1,
    default: 25,
  })
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  limit: number;

  @IsOptional()
  @ApiProperty({
    type: 'string',
    default: 'id',
  })
  sort_by: string;

  @IsOptional()
  @ApiPropertyOptional({
    type: 'string',
    enum: ['asc', 'desc'],
    default: 'asc',
  })
  @IsIn(Object.values(Prisma.SortOrder))
  sort_direction: Prisma.SortOrder;

  @IsOptional()
  @ApiPropertyOptional({ type: 'string', required: false, nullable: true })
  search: string;
}
