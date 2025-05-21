import { ApiPropertyOptional } from '@nestjs/swagger';
import { FindAllChecklistProps } from '../../domain/types/checklist.type';
import { $Enums, Prisma } from '@prisma/client';
import { IsEnum, IsIn, IsOptional } from 'class-validator';
import { BaseFindAllRequest } from '@/modules/base/requests/base.find-all.request';

export class FindAllChecklistRequestDTO
  extends BaseFindAllRequest
  implements FindAllChecklistProps
{
  @ApiPropertyOptional({
    type: 'string',
    enum: $Enums.ChecklistType,
    isArray: true,
  })
  @IsOptional()
  type: string

  @ApiPropertyOptional({
    type: [String],
    enum: $Enums.SuggestionType,
    isArray: true,
  })
  @IsOptional()
  suggestions: string[];

  @ApiPropertyOptional({
    type: [String],
    enum: $Enums.WeddingRoleType,
    isArray: true,
  })
  @IsOptional()
  responsibilities: string[];

  @ApiPropertyOptional({
    type: [String],
    enum: $Enums.WeddingRoleType,
    isArray: true,
  })
  @IsOptional()
  statuses: string[];

  @ApiPropertyOptional({
    type: [String],
    enum: $Enums.WeddingRoleType,
    isArray: true,
  })
  @IsOptional()
  assigneess: string[];

  @ApiPropertyOptional({ default: 'id' })
  @IsOptional()
  @IsIn(Object.values(Prisma.ChecklistScalarFieldEnum))
  sort_by: string;
}
