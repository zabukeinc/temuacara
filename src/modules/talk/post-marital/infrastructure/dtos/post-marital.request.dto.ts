import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  AnsweredPostMarital,
  AskedPostMarital,
  CreatePostMaritalProps,
} from '../../domain/types/post-marital.type';

class AskedByDTO implements AskedPostMarital {
  @ApiProperty()
  @IsBoolean()
  groom: boolean;

  @ApiProperty()
  @IsBoolean()
  bride: boolean;
}

class AnsweredByDTO implements AnsweredPostMarital {
  @ApiProperty()
  @IsBoolean()
  groom: boolean;

  @ApiProperty()
  @IsBoolean()
  bride: boolean;

  @ApiPropertyOptional()
  is_groom_answerd: boolean;

  @ApiPropertyOptional()
  is_bride_answerd: boolean;
}

export class PostMaritalRequestDTO implements CreatePostMaritalProps {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  question: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  suggestion: string;

  @ApiProperty()
  @ValidateNested()
  @Type(() => AskedByDTO)
  asked_by: AskedByDTO;

  @ApiProperty()
  @ValidateNested()
  @Type(() => AnsweredByDTO)
  answered_by: AnsweredByDTO;

  @ApiPropertyOptional()
  answer_notes: string;
}
