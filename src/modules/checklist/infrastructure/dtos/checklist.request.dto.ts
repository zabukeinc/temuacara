import {
  IsArray,
  IsBoolean,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  ChecklistCategoryEnum,
  ChecklistResponsibilityProps,
  ChecklistSuggestionEnum,
  CreateChecklistProps,
} from '../../domain/types/checklist.type';

export class ChecklistResponsibilityRequestDTO
  implements ChecklistResponsibilityProps
{
  @ApiProperty({ description: 'Indicates if the groom is responsible' })
  @IsBoolean()
  groom: boolean;

  @ApiProperty({ description: 'Indicates if the groom is responsible' })
  @IsBoolean()
  bride: boolean;
}

export class ChecklistRequestDTO implements CreateChecklistProps {
  @ApiProperty({ description: 'The checklist name' })
  @IsString()
  @IsNotEmpty()
  checklist: string;

  @ApiProperty({
    enum: ChecklistCategoryEnum,
    description: 'The category of the checklist',
  })
  @IsIn(Object.values(ChecklistCategoryEnum))
  category: ChecklistCategoryEnum;

  @ApiProperty({
    enum: ChecklistSuggestionEnum,
    description: 'The suggestion for the checklist',
  })
  @IsIn(Object.values(ChecklistSuggestionEnum))
  suggestion: ChecklistSuggestionEnum;

  @ApiProperty({ description: 'Responsibility details for the checklist' })
  @ValidateNested()
  @Type(() => ChecklistResponsibilityRequestDTO)
  responsibility: ChecklistResponsibilityRequestDTO;

  @ApiProperty({ description: 'Status details for the checklist' })
  @ValidateNested()
  @Type(() => ChecklistResponsibilityRequestDTO)
  status: ChecklistResponsibilityRequestDTO;

  @ApiPropertyOptional({ description: 'Optional notes for the checklist' })
  @IsString()
  notes?: string;

  @ApiPropertyOptional({
    description: 'Completion date of the checklist',
    type: String,
  })
  @IsString()
  completed_at?: string;
}

export class DeleteChecklistRequestDTO {
  @ApiProperty({ type: [Number], description: 'Array of IDs to delete' })
  @IsArray()
  @IsNumber({}, { each: true })
  ids: number[];
}
