import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class AskedByDTO {
  @ApiProperty()
  @IsBoolean()
  groom: boolean;

  @ApiProperty()
  @IsBoolean()
  bride: boolean;
}

class AnsweredByDTO {
  @ApiProperty()
  @IsBoolean()
  groom: boolean;

  @ApiProperty()
  @IsBoolean()
  bride: boolean;
}

export class PostMaritalRequestDTO {
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
}
