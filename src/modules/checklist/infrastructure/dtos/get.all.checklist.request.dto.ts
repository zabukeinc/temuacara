import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { FindAllChecklistProps } from '../../domain/types/checklist.type';

export class FindAllChecklistRequestDTO implements FindAllChecklistProps {
  @ApiProperty()
  page: number;

  @ApiProperty()
  limit: number;

  @ApiPropertyOptional()
  type: string;

  @ApiPropertyOptional()
  suggestion: string;

  @ApiPropertyOptional()
  responsibility: string;

  @ApiPropertyOptional()
  status: string;

  @ApiPropertyOptional()
  assigned_to: string;

  @ApiPropertyOptional()
  search: string;
}
