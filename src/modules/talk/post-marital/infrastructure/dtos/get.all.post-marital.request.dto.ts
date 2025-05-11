import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TalkEnum } from '@prisma/client';
import { IsIn, IsString } from 'class-validator';

export class FindAllPostMaritalRequestDTO {
  @ApiProperty()
  page: number;

  @ApiProperty()
  limit: number;

  @ApiProperty({ type: 'string', enum: TalkEnum })
  @IsIn(Object.values(TalkEnum))
  type: TalkEnum;

  @ApiPropertyOptional()
  @IsString()
  keyword: string;
}
