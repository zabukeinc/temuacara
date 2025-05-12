import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsString } from 'class-validator';
import { ChecklistCategoryEnum } from '../../domain/types/checklist.type';

export class FindAllChecklistRequestDTO {
  @ApiProperty()
  page: number;

  @ApiProperty()
  limit: number;

  @ApiProperty({ type: 'string', enum: ChecklistCategoryEnum })
  @IsIn(Object.values(ChecklistCategoryEnum))
  category: ChecklistCategoryEnum;

  @ApiPropertyOptional()
  @IsString()
  keyword: string;
}
