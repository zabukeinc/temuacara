import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { $Enums, Prisma } from '@prisma/client';
import { IsEnum, IsIn, IsOptional, IsString } from 'class-validator';
import { FindAllInvitationProps } from '../../domain/types/invitation.type';
import { BaseFindAllRequest } from '@/modules/base/requests/base.find-all.request';

export class FindAllInvitationRequestDTO
  extends BaseFindAllRequest
  implements FindAllInvitationProps
{
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

  @ApiProperty({
    type: 'string',
    enum: Object.values(Prisma.InvitationScalarFieldEnum),
    default: 'asc',
  })
  @IsIn(Object.values(Prisma.InvitationScalarFieldEnum))
  sort_by: string;
}
