import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { FindAllChecklistProps } from '../../domain/types/checklist.type';
import { $Enums } from '@prisma/client';
import { IsEnum, IsOptional } from 'class-validator';

export class FindAllChecklistRequestDTO implements FindAllChecklistProps {
  @ApiProperty()
  page: number;

  @ApiProperty()
  limit: number;

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
  search: string;
}
