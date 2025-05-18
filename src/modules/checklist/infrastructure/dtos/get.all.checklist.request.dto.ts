import { ApiPropertyOptional } from '@nestjs/swagger';
import { FindAllChecklistProps } from '../../domain/types/checklist.type';
import { $Enums, Prisma } from '@prisma/client';
import { IsEnum, IsIn, IsOptional } from 'class-validator';
import { BaseFindAllRequest } from '@/modules/base/requests/base.find-all.request';

export class FindAllChecklistRequestDTO
  extends BaseFindAllRequest
  implements FindAllChecklistProps
{
  @ApiPropertyOptional({ enum: $Enums.ChecklistType })
  @IsOptional()
  @IsEnum($Enums.ChecklistType)
  type: string;

  @ApiPropertyOptional({ enum: $Enums.SuggestionType })
  @IsOptional()
  @IsEnum($Enums.SuggestionType)
  suggestion: string;

  @ApiPropertyOptional({ enum: $Enums.WeddingRoleType })
  @IsOptional()
  @IsEnum($Enums.WeddingRoleType)
  responsibility: string;

  @ApiPropertyOptional({ enum: $Enums.WeddingRoleType })
  @IsOptional()
  @IsEnum($Enums.WeddingRoleType)
  status: string;

  @ApiPropertyOptional({ enum: $Enums.WeddingRoleType })
  @IsOptional()
  @IsEnum($Enums.WeddingRoleType)
  assigned_to: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(Prisma.ChecklistScalarFieldEnum)
  @IsIn(Object.values(Prisma.ChecklistScalarFieldEnum))
  sort_by: string;
}
