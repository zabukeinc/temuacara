import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateChecklistProps } from '../../domain/types/checklist.type';
import { $Enums } from '@prisma/client';

export class ChecklistRequestDTO implements CreateChecklistProps {
  id: string;
  @ApiProperty({ type: String, description: 'Checklist' })
  @IsString()
  @IsNotEmpty()
  checklist: string;

  @ApiProperty({
    type: String,
    description: 'Type',
    enum: $Enums.ChecklistType,
  })
  @IsEnum($Enums.ChecklistType)
  type: $Enums.ChecklistType;

  @ApiProperty({
    type: String,
    description: 'Suggestion',
    enum: $Enums.SuggestionType,
  })
  @IsEnum($Enums.SuggestionType)
  suggestion: $Enums.SuggestionType;

  @ApiProperty({
    type: [String],
    description: 'Wedding Role Type',
    enum: $Enums.WeddingRoleType,
    isArray: true,
  })
  @IsArray()
  @IsEnum($Enums.WeddingRoleType, { each: true })
  responsibility: $Enums.WeddingRoleType[];

  @ApiProperty({
    type: [String],
    description: 'Wedding Role Type',
    enum: $Enums.WeddingRoleType,
    isArray: true,
  })
  @IsArray()
  @IsEnum($Enums.WeddingRoleType, { each: true })
  status: $Enums.WeddingRoleType[];

  @ApiProperty({
    type: [String],
    description: 'Wedding Role Type',
    enum: $Enums.WeddingRoleType,
    isArray: true,
  })
  @IsArray()
  @IsEnum($Enums.WeddingRoleType, { each: true })
  assigned_to: $Enums.WeddingRoleType[];

  @ApiPropertyOptional({ type: String, description: 'Notes', nullable: true })
  @IsOptional()
  @IsString()
  notes: string;

  completed_at: Date;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}

export class DeleteChecklistRequestDTO {
  @ApiProperty({ type: [String], description: 'Array of IDs to delete' })
  @IsArray()
  ids: string[];
}
