import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { FindAllGiftProps } from '../../domain/types/gift.type';
import { $Enums } from '@prisma/client';
import {
  IsEnum,
  IsOptional,
  IsNumber,
  IsString,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';

export class FindAllGiftRequestDTO implements FindAllGiftProps {
  @ApiPropertyOptional({ type: 'string' })
  @IsOptional()
  @IsEnum($Enums.GiftTypeEnum)
  type: $Enums.GiftTypeEnum;

  @ApiPropertyOptional({ enum: $Enums.GiftCategoryEnum })
  @IsOptional()
  @IsEnum($Enums.GiftCategoryEnum)
  category: $Enums.GiftCategoryEnum;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  store: string;

  @ApiPropertyOptional({ enum: $Enums.GiftPlatformEnum })
  @IsOptional()
  @IsEnum($Enums.GiftPlatformEnum)
  platform: $Enums.GiftPlatformEnum;

  @ApiPropertyOptional({ type: 'string' })
  @IsOptional()
  @IsEnum($Enums.WeddingRoleType, { each: true })
  responsibility: $Enums.WeddingRoleType;

  @ApiPropertyOptional({ enum: $Enums.GiftStatusEnum })
  @IsOptional()
  @IsEnum($Enums.GiftStatusEnum)
  status: $Enums.GiftStatusEnum;

  @ApiProperty({ default: 1 })
  @Type(() => Number)
  @IsNumber()
  page: number;

  @ApiProperty({ default: 10 })
  @Type(() => Number)
  @IsNumber()
  limit: number;

  @ApiPropertyOptional({ enum: $Enums.WeddingRoleType })
  @IsOptional()
  @IsEnum($Enums.WeddingRoleType)
  assigned_to: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  search: string;
}
