import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';
import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { FindAllInvitationProps } from '../../domain/types/invitation.type';
import { Type } from 'class-transformer';

export class FindAllInvitationRequestDTO implements FindAllInvitationProps {
  @ApiProperty({ description: 'Page number', minimum: 1, default: 1 })
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page: number;

  @ApiProperty({
    description: 'Number of items per page',
    minimum: 1,
    default: 25,
  })
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  limit: number;

  @ApiPropertyOptional({
    description: 'Filter by inviter',
    enum: $Enums.WeddingRoleEnum,
  })
  @IsEnum($Enums.WeddingRoleEnum)
  @IsOptional()
  inviter: string;

  @ApiPropertyOptional({
    description: 'Filter by status',
    enum: $Enums.InvitationStatusEnum,
  })
  @IsEnum($Enums.InvitationStatusEnum)
  @IsOptional()
  status: string;

  @ApiPropertyOptional({
    description: 'Filter by type',
    enum: $Enums.InvitationTypeEnum,
  })
  @IsEnum($Enums.InvitationTypeEnum)
  @IsOptional()
  type: string;

  @ApiPropertyOptional({ description: 'Filter by origin location' })
  @IsString()
  @IsOptional()
  from: string;

  @ApiPropertyOptional({ description: 'Filter by address' })
  @IsString()
  @IsOptional()
  address: string;

  @ApiPropertyOptional({
    description: 'Filter by website tracking status',
    enum: $Enums.WebsiteTrackEnum,
  })
  @IsEnum($Enums.WebsiteTrackEnum)
  @IsOptional()
  website_track: string;

  @ApiPropertyOptional({ description: 'Filter by invitee name' })
  @IsString()
  @IsOptional()
  name: string;
}
