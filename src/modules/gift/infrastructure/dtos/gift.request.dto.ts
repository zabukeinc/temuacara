import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
  IsDate,
  ValidateNested,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateGiftProps } from '../../domain/types/gift.type';
import { $Enums } from '@prisma/client';
import { Type } from 'class-transformer';

export class GiftRequestDTO implements CreateGiftProps {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  item: string;

  @ApiProperty({ enum: $Enums.GiftTypeEnum })
  @IsEnum($Enums.GiftTypeEnum)
  type: $Enums.GiftTypeEnum;

  @ApiProperty({ enum: $Enums.GiftCategoryEnum })
  @IsEnum($Enums.GiftCategoryEnum)
  category: $Enums.GiftCategoryEnum;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  store: string;

  @ApiProperty({ enum: $Enums.GiftPlatformEnum })
  @IsEnum($Enums.GiftPlatformEnum)
  platform: $Enums.GiftPlatformEnum;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  total_price: number;

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsEnum($Enums.WeddingRoleType, { each: true })
  responsibility: $Enums.WeddingRoleType[];

  @ApiProperty({ enum: $Enums.GiftStatusEnum })
  @IsEnum($Enums.GiftStatusEnum)
  status: $Enums.GiftStatusEnum;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  notes: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  created_at: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  updated_at: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  deleted_at: Date;
}

export class BulkGiftRequestdTO {
  @ApiProperty({ type: [GiftRequestDTO] })
  @Type(() => GiftRequestDTO)
  @ValidateNested({ each: true })
  payload: GiftRequestDTO[];
}

export class DeleteGiftRequestDTO {
  @ApiProperty({ type: [String], description: 'Array of IDs to delete' })
  @IsArray()
  @IsString({ each: true })
  ids: string[];
}
