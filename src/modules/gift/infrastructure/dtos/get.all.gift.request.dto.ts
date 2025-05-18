import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { FindAllGiftProps } from '../../domain/types/gift.type';
import { $Enums, Prisma } from '@prisma/client';
import { IsEnum, IsIn, IsOptional, IsString } from 'class-validator';
import { BaseFindAllRequest } from '@/modules/base/requests/base.find-all.request';

export class FindAllGiftRequestDTO
  extends BaseFindAllRequest
  implements FindAllGiftProps
{
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

  @ApiPropertyOptional({ enum: $Enums.WeddingRoleType })
  @IsOptional()
  @IsEnum($Enums.WeddingRoleType)
  assigned_to: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(Prisma.GiftScalarFieldEnum)
  @IsIn(Object.values(Prisma.GiftScalarFieldEnum))
  sort_by: string;
}
