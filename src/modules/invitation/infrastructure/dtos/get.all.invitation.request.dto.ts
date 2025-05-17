import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { FindAllInvitationProps } from '../../domain/types/invitation.type';

export class FindAllInvitationRequestDTO implements FindAllInvitationProps {
  @ApiProperty()
  @IsNumber()
  page: number;

  @ApiProperty()
  @IsNumber()
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
